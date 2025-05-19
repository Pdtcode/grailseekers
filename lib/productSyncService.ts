import { client } from './sanityClient';
import prisma from './prismaClient';
import { urlForImage } from '@/sanity/lib/image';

/**
 * Fetches all products from Sanity CMS
 */
export async function fetchAllSanityProducts() {
  const query = `
    *[_type == "product"] {
      _id,
      name,
      slug,
      price,
      description,
      mainImage,
      images,
      inStock,
      categories[]->{
        _id,
        name,
        slug
      },
      collections[]->{
        _id,
        name,
        slug
      },
      variants,
      publishedAt
    }
  `;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products from Sanity:', error);
    throw error;
  }
}

/**
 * Fetches a single product from Sanity CMS by its ID
 */
export async function fetchSanityProductById(id: string) {
  const query = `
    *[_type == "product" && _id == $id][0] {
      _id,
      name,
      slug,
      price,
      description,
      mainImage,
      images,
      inStock,
      categories[]->{
        _id,
        name,
        slug
      },
      collections[]->{
        _id,
        name,
        slug
      },
      variants,
      publishedAt
    }
  `;

  try {
    const product = await client.fetch(query, { id });
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id} from Sanity:`, error);
    throw error;
  }
}

/**
 * Converts Sanity image URLs to usable format for the database
 */
function processProductImages(product: any) {
  const images = [];
  
  // Add main image if it exists
  if (product.mainImage) {
    const mainImageUrl = urlForImage(product.mainImage).url();
    if (mainImageUrl) {
      images.push(mainImageUrl);
    }
  }
  
  // Add additional images
  if (product.images && Array.isArray(product.images)) {
    for (const image of product.images) {
      const imageUrl = urlForImage(image).url();
      if (imageUrl && !images.includes(imageUrl)) {
        images.push(imageUrl);
      }
    }
  }
  
  return images;
}

/**
 * Syncs a single product from Sanity to the Prisma database
 */
export async function syncProductToDB(sanityProduct: any) {
  try {
    // Process images to convert them to URLs
    const imageUrls = processProductImages(sanityProduct);
    
    // Get primary category if available
    let category = null;
    if (sanityProduct.categories && sanityProduct.categories.length > 0) {
      category = sanityProduct.categories[0].name;
    }
    
    // Prepare product data
    const productData = {
      name: sanityProduct.name,
      description: sanityProduct.description || '',
      price: parseFloat(sanityProduct.price || 0),
      images: imageUrls,
      slug: sanityProduct.slug?.current || '',
      category: category,
      inStock: sanityProduct.inStock !== false, // Default to true if not specified
    };
    
    // Check if product already exists in database by Sanity ID
    let existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { id: sanityProduct._id },
          { slug: productData.slug }
        ]
      },
      include: {
        variants: true
      }
    });
    
    if (existingProduct) {
      // Update existing product
      existingProduct = await prisma.product.update({
        where: { id: existingProduct.id },
        data: productData,
        include: {
          variants: true
        }
      });
    } else {
      // Create new product
      existingProduct = await prisma.product.create({
        data: {
          id: sanityProduct._id, // Use Sanity ID as product ID
          ...productData
        },
        include: {
          variants: true
        }
      });
    }
    
    // Process variants if they exist
    if (sanityProduct.variants && Array.isArray(sanityProduct.variants)) {
      // First, collect all variant options into a flat list
      const variantOptions: Record<string, string[]> = {};
      
      for (const variant of sanityProduct.variants) {
        if (variant.name && variant.options && Array.isArray(variant.options)) {
          variantOptions[variant.name] = variant.options;
        }
      }
      
      // Get the variant types (e.g., 'size', 'color')
      const variantTypes = Object.keys(variantOptions);
      
      // Create/update variants if we have both size and color
      if (variantTypes.includes('size')) {
        const sizes = variantOptions['size'];
        const colors = variantTypes.includes('color') ? variantOptions['color'] : ['default'];
        
        for (const size of sizes) {
          for (const color of colors) {
            const sku = `${sanityProduct._id}-${size}-${color}`.replace(/\s+/g, '-').toLowerCase();
            
            // Check if variant already exists
            const existingVariant = existingProduct.variants.find(
              (v) => v.size === size && v.color === color
            );
            
            if (existingVariant) {
              // Update existing variant
              await prisma.productVariant.update({
                where: { id: existingVariant.id },
                data: {
                  size,
                  color: color !== 'default' ? color : null,
                  sku,
                }
              });
            } else {
              // Create new variant
              await prisma.productVariant.create({
                data: {
                  productId: existingProduct.id,
                  size,
                  color: color !== 'default' ? color : null,
                  sku,
                  stock: 10, // Default stock value
                }
              });
            }
          }
        }
        
        // Remove variants that no longer exist in Sanity
        for (const existingVariant of existingProduct.variants) {
          const sizeStillExists = sizes.includes(existingVariant.size);
          const colorStillExists = colors.includes(existingVariant.color || 'default');
          
          if (!sizeStillExists || !colorStillExists) {
            await prisma.productVariant.delete({
              where: { id: existingVariant.id }
            });
          }
        }
      }
    }
    
    return existingProduct;
  } catch (error) {
    console.error(`Error syncing product ${sanityProduct._id} to database:`, error);
    throw error;
  }
}

/**
 * Syncs all products from Sanity to the Prisma database
 */
export async function syncAllProducts() {
  try {
    console.log('Starting product sync from Sanity to database...');
    const sanityProducts = await fetchAllSanityProducts();
    console.log(`Found ${sanityProducts.length} products in Sanity`);
    
    const results = {
      total: sanityProducts.length,
      created: 0,
      updated: 0,
      failed: 0,
      failures: [] as string[]
    };
    
    for (const product of sanityProducts) {
      try {
        // Check if product exists
        const existingProduct = await prisma.product.findFirst({
          where: {
            OR: [
              { id: product._id },
              { slug: product.slug?.current || '' }
            ]
          }
        });
        
        // Sync product to database
        await syncProductToDB(product);
        
        if (existingProduct) {
          results.updated++;
        } else {
          results.created++;
        }
      } catch (error) {
        console.error(`Failed to sync product ${product._id}:`, error);
        results.failed++;
        results.failures.push(product._id);
      }
    }
    
    console.log('Product sync completed:', results);
    return results;
  } catch (error) {
    console.error('Failed to sync products:', error);
    throw error;
  }
}

/**
 * Handles product updates from Sanity webhooks
 */
export async function handleSanityProductUpdate(product: any) {
  try {
    // If we only got the ID, fetch the full product from Sanity
    let fullProduct = product;
    if (product._id && !product.name) {
      fullProduct = await fetchSanityProductById(product._id);
    }
    
    if (!fullProduct) {
      throw new Error(`Could not find product with ID ${product._id}`);
    }
    
    const updatedProduct = await syncProductToDB(fullProduct);
    return updatedProduct;
  } catch (error) {
    console.error(`Error handling Sanity product update for ${product._id}:`, error);
    throw error;
  }
}

/**
 * Handles product deletions from Sanity webhooks
 */
export async function handleSanityProductDelete(productId: string) {
  try {
    // Check if product exists
    const existingProduct = await prisma.product.findFirst({
      where: { id: productId }
    });
    
    if (existingProduct) {
      // Delete product from database
      await prisma.product.delete({
        where: { id: existingProduct.id }
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error handling Sanity product deletion for ${productId}:`, error);
    throw error;
  }
}
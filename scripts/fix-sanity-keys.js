/**
 * This script helps fix missing _key issues in Sanity arrays
 * Run with: node scripts/fix-sanity-keys.js
 */

// Load environment variables
require('dotenv').config();

const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function fixOrderItems() {
  console.log('Fetching all orders...');
  
  // Fetch all orders
  const orders = await client.fetch(`*[_type == "order"]`);
  
  console.log(`Found ${orders.length} orders to process`);
  
  for (const order of orders) {
    try {
      // Skip orders without items
      if (!order.items || !Array.isArray(order.items)) {
        console.log(`Order ${order.orderNumber} has no items, skipping`);
        continue;
      }
      
      // Check if any item is missing _key
      const needsFix = order.items.some(item => !item._key);
      
      if (needsFix) {
        console.log(`Fixing order ${order.orderNumber}...`);
        
        // Create new array with _key added
        const fixedItems = order.items.map((item, index) => {
          // Use existing itemId or generate a fallback
          const key = item.itemId || 
                    item.id || 
                    `item-${index}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
          
          return {
            ...item,
            _key: key
          };
        });
        
        // Update the document
        await client
          .patch(order._id)
          .set({ items: fixedItems })
          .commit();
          
        console.log(`Fixed order ${order.orderNumber}`);
      } else {
        console.log(`Order ${order.orderNumber} already has valid keys`);
      }
    } catch (error) {
      console.error(`Error fixing order ${order.orderNumber}:`, error);
    }
  }
  
  console.log('Finished processing orders');
}

// Fix product variants too if needed
async function fixProductVariants() {
  console.log('Fetching all products...');
  
  // Fetch all products with variants
  const products = await client.fetch(`*[_type == "product" && defined(variants)]`);
  
  console.log(`Found ${products.length} products with variants to process`);
  
  for (const product of products) {
    try {
      // Skip products without variants
      if (!product.variants || !Array.isArray(product.variants)) {
        continue;
      }
      
      // Check if any variant is missing _key
      const needsFix = product.variants.some(variant => !variant._key);
      
      if (needsFix) {
        console.log(`Fixing product ${product.name}...`);
        
        // Create new array with _key added
        const fixedVariants = product.variants.map((variant, index) => {
          // Use existing variantId or generate a fallback
          const key = variant.variantId || 
                    `variant-${index}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
          
          return {
            ...variant,
            _key: key
          };
        });
        
        // Update the document
        await client
          .patch(product._id)
          .set({ variants: fixedVariants })
          .commit();
          
        console.log(`Fixed product ${product.name}`);
      } else {
        console.log(`Product ${product.name} already has valid keys`);
      }
    } catch (error) {
      console.error(`Error fixing product ${product.name}:`, error);
    }
  }
  
  console.log('Finished processing products');
}

// Run both fixes
async function runFixes() {
  try {
    await fixOrderItems();
    await fixProductVariants();
    
    console.log('All documents processed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the fixes
runFixes();
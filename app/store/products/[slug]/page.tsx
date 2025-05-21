import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { title } from "@/components/primitives";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { productBySlugQuery } from "@/lib/queries";
import { AddToCartButtonWrapper } from "@/components/product-actions";

export const revalidate = 60; // Revalidate this page every 60 seconds

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  return await client.fetch(productBySlugQuery, { slug });
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params object before accessing its properties
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {product.mainImage && (
              <Image
                fill
                priority
                alt={product.name}
                className="object-cover"
                src={urlForImage(product.mainImage).url()}
              />
            )}
            {!product.inStock && (
              <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 text-sm rounded">
                Sold Out
              </div>
            )}
          </div>
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    fill
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover"
                    src={urlForImage(image).url()}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className={title()}>{product.name}</h1>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">${product.price}</p>
            {product.comparePrice && product.comparePrice > product.price && (
              <p className="text-lg text-gray-500 line-through">
                ${product.comparePrice}
              </p>
            )}
          </div>

          {product.categories && product.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <Link
                  key={category._id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
                  href={`/store/categories/${category.slug.current}`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {product.description && (
            <div className="prose dark:prose-invert max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4">
              {product.variants.map((variant, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium">{variant.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cart and buy buttons */}
          <AddToCartButtonWrapper product={product} />

          {/* Collection info */}
          {product.collections && product.collections.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h2 className={title({ size: "sm", className: "mb-3" })}>
                Part of Collections
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.collections.map((collection) => (
                  <Link
                    key={collection._id}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
                    href={`/store/collections/${collection.slug.current}`}
                  >
                    {collection.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
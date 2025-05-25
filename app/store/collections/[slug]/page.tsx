import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { title } from "@/components/primitives";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { collectionBySlugQuery } from "@/lib/queries";

export const revalidate = 60; // Revalidate this page every 60 seconds

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCollectionData(slug: string) {
  return await client.fetch(collectionBySlugQuery, { slug });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionData(slug);

  if (!collection) {
    notFound();
  }

  // Format dates if they exist
  const startDate = collection.startDate
    ? new Date(collection.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const endDate = collection.endDate
    ? new Date(collection.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:underline"
        href="/store"
      >
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Store
      </Link>

      {/* Collection Header */}
      <div
        className={`relative rounded-lg overflow-hidden mb-8 ${
          collection.highlight ? "h-80" : "h-64"
        }`}
      >
        {collection.mainImage && (
          <Image
            fill
            priority
            alt={collection.title}
            className="object-cover"
            src={urlForImage(collection.mainImage).url()}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
          <div className="text-white max-w-2xl">
            <h1 className={title({ size: "lg", className: "mb-2 text-white" })}>
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-gray-200 mb-2">{collection.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {collection.collectionType} Collection
              </span>
              {startDate && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {endDate ? `${startDate} - ${endDate}` : `From ${startDate}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {collection.products && collection.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection.products.map((product: any) => (
            <Link
              key={product._id}
              className="group"
              href={`/store/products/${product.slug.current}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                {product.mainImage && (
                  <Image
                    fill
                    alt={product.name}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    src={urlForImage(product.mainImage).url()}
                  />
                )}
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
                    Sold Out
                  </div>
                )}
              </div>
              <h3 className="font-medium text-lg group-hover:underline">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <p className="font-bold">${product.price}</p>
                {product.comparePrice &&
                  product.comparePrice > product.price && (
                    <p className="text-gray-500 line-through">
                      ${product.comparePrice}
                    </p>
                  )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No products found in this collection.
          </p>
        </div>
      )}
    </div>
  );
}

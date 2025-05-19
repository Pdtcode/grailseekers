"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { title } from "@/components/primitives";
import { urlForImage } from "@/sanity/lib/image";
import { Category, Collection, Product } from "@/types";

export default function StoreContent({
  products,
  categories,
  featuredCollections,
}: {
  products: Product[];
  categories: Category[];
  featuredCollections: Collection[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.categories &&
          product.categories.some((cat) => cat._id === selectedCategory._id),
      )
    : products;

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <div className="mb-12">
          <h2 className={title({ size: "md", className: "mb-4" }).toString()}>
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCollections.map((collection) => (
              <Link
                key={collection._id}
                className="group"
                href={`/store/collections/${collection.slug.current}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                  {collection.mainImage && (
                    <Image
                      fill
                      alt={collection.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      src={urlForImage(collection.mainImage).url() || ""}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                    <h3 className="text-white text-xl font-bold">
                      {collection.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {collection.collectionType} Collection
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-3">
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === null
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory && selectedCategory._id === category._id
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="">
        <h2 className={title({ size: "md", className: "mb-4" }).toString()}>
          {selectedCategory ? `${selectedCategory.title} Products` : "Products"}
          {selectedCategory && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">
              ({filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"})
            </span>
          )}
        </h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
                      src={urlForImage(product.mainImage).url() || ""}
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
                {product.categories && product.categories.length > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.categories[0].title}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

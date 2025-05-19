"use client";

import { Product } from "@/types";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function AddToCartButtonWrapper({ product }: { product: Product }) {
  return (
    <div className="flex gap-4 w-full">
      <AddToCartButton product={product} className="flex-1" />
      
      {product.shopURL && (
        <a
          href={product.shopURL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-block bg-black dark:bg-white text-white dark:text-black font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
        >
          {product.inStock ? "Buy Now" : "View Product"}
        </a>
      )}
    </div>
  );
}
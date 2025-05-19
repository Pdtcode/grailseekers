import StoreContent from "./store-content";

import { client } from "@/sanity/lib/client";
import {
  allProductsQuery,
  categoriesQuery,
  featuredCollectionsQuery,
} from "@/lib/queries";

export const revalidate = 60; // Revalidate this page every 60 seconds

async function getStoreData() {
  const products = await client.fetch(allProductsQuery);
  const categories = await client.fetch(categoriesQuery);
  const featuredCollections = await client.fetch(featuredCollectionsQuery);

  return {
    products,
    categories,
    featuredCollections,
  };
}

export default async function StorePage() {
  const { products, categories, featuredCollections } = await getStoreData();

  return (
    <StoreContent
      categories={categories}
      featuredCollections={featuredCollections}
      products={products}
    />
  );
}

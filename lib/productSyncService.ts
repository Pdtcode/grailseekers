/**
 * NOTE: This file is kept for reference only.
 * All automatic API sync functionality has been disabled.
 * Products are now created directly from checkout data when orders are placed.
 */

/**
 * Fetches all products from Sanity CMS
 */
export async function fetchAllSanityProducts() {
  console.log("WARNING: fetchAllSanityProducts is disabled");

  return [];
}

/**
 * Fetches a single product from Sanity CMS by its ID
 */
export async function fetchSanityProductById(_id: string) {
  console.log("WARNING: fetchSanityProductById is disabled");

  return null;
}

/**
 * Syncs a single product from Sanity to the Prisma database
 */
export async function syncProductToDB(_sanityProduct: any) {
  console.log("WARNING: syncProductToDB is disabled");

  return null;
}

/**
 * Syncs all products from Sanity to the Prisma database
 */
export async function syncAllProducts() {
  console.log("WARNING: syncAllProducts is disabled");

  return {
    total: 0,
    created: 0,
    updated: 0,
    failed: 0,
    failures: [],
  };
}

/**
 * Handles product updates from Sanity webhooks
 */
export async function handleSanityProductUpdate(_product: any) {
  console.log("WARNING: handleSanityProductUpdate is disabled");

  return null;
}

/**
 * Handles product deletions from Sanity webhooks
 */
export async function handleSanityProductDelete(_productId: string) {
  console.log("WARNING: handleSanityProductDelete is disabled");

  return false;
}

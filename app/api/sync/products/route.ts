import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { syncAllProducts } from "@/lib/productSyncService";

/**
 * API endpoint to sync all products from Sanity to the database
 * Can be called via a cron job or manually triggered
 * 
 * Requires an API key for authentication: ?apiKey=your_api_key
 * Or via the X-API-Key header
 */
export async function GET(request: Request) {
  try {
    // Get API key from query params or headers
    const { searchParams } = new URL(request.url);
    const apiKeyParam = searchParams.get("apiKey");
    const headersList = headers();
    const apiKeyHeader = headersList.get("X-API-Key");
    
    const providedApiKey = apiKeyParam || apiKeyHeader;
    const validApiKey = process.env.API_SYNC_KEY;
    
    // Validate API key if one is set in the environment
    if (validApiKey && providedApiKey !== validApiKey) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }
    
    // Force parameter to ignore cache and force sync even if nothing changed
    const forceSync = searchParams.get("force") === "true";
    
    console.log(`Starting product sync. Force sync: ${forceSync}`);
    
    // Track start time to measure performance
    const startTime = Date.now();
    
    // Perform the actual sync
    const results = await syncAllProducts();
    
    // Calculate duration
    const duration = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      message: "Product sync completed successfully",
      duration: `${duration / 1000} seconds`,
      results
    });
  } catch (error: any) {
    console.error("Error during product sync:", error);
    
    return NextResponse.json(
      { error: error.message || "An unknown error occurred during product sync" },
      { status: 500 }
    );
  }
}

/**
 * Example curl command to trigger sync:
 * curl -X GET "https://yourdomain.com/api/sync/products?apiKey=your_api_key"
 * 
 * Or with force parameter:
 * curl -X GET "https://yourdomain.com/api/sync/products?apiKey=your_api_key&force=true"
 */
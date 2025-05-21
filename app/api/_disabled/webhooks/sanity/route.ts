import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import {
  handleSanityProductUpdate,
  handleSanityProductDelete
} from "@/lib/productSyncService";

// Sanity webhook secret for verification
const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

/**
 * Verifies the Sanity webhook signature
 */
function verifyWebhookSignature(request: Request, body: string): boolean {
  if (!webhookSecret) {
    console.warn("SANITY_WEBHOOK_SECRET is not set, skipping verification");
    return true;
  }

  const headersList = headers();
  const signature = headersList.get("sanity-webhook-signature");

  if (!signature) {
    return false;
  }

  // Create HMAC using the webhook secret
  const hmac = crypto.createHmac("sha256", webhookSecret);
  hmac.update(body);
  const expectedSignature = hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: Request) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const rawData = JSON.parse(body);

    // Verify webhook signature
    const isSignatureValid = verifyWebhookSignature(request, body);
    
    if (!isSignatureValid) {
      console.error("Invalid Sanity webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // The expected webhook payload from Sanity
    const { operation, documentId, identity, result, transition, mutations } = rawData;

    // Skip if not a content operation or if no result
    if (!operation || !documentId) {
      return NextResponse.json({ success: false, message: "Missing required webhook data" });
    }

    console.log(`Received Sanity webhook: ${operation} on ${documentId}`);

    // Handle different document types
    if (result?._type === "product") {
      switch (operation) {
        case "create":
        case "update":
          // Handle product creation/update
          await handleSanityProductUpdate(result);
          console.log(`Product ${documentId} synchronized to database`);
          break;

        case "delete":
          // Handle product deletion
          await handleSanityProductDelete(documentId);
          console.log(`Product ${documentId} deleted from database`);
          break;

        default:
          console.log(`Unhandled operation type: ${operation}`);
      }
    } else {
      console.log(`Ignoring webhook for document type: ${result?._type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing Sanity webhook:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

import prisma from "@/lib/prismaClient";
import { getOrderById } from "@/app/actions/orderActions";

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // You need a Sanity write token with editor access
  useCdn: false,
  apiVersion: "2023-05-03",
});

async function syncOrder(orderId?: string) {
  try {
    // Get all orders or specific order
    const orders = orderId
      ? [await getOrderById(orderId)]
      : await prisma.order.findMany({
          include: {
            user: true,
            shippingAddress: true,
            items: {
              include: {
                product: true,
                variant: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

    if (!orders || orders.length === 0) {
      return { status: "error", message: "No orders found" };
    }

    const results = [];
    let deletedCount = 0;

    // If we're syncing all orders, handle deletions
    if (!orderId) {
      // Get all current order numbers from the database
      const dbOrderNumbers = orders.map((order) => order.orderNumber);

      // Get all orders from Sanity
      const sanityOrders = await client.fetch(
        `*[_type == "order"] { _id, orderNumber }`,
      );

      // Find orders that exist in Sanity but not in the database (deleted)
      const deletedOrders = sanityOrders.filter(
        (sanityOrder: { orderNumber: any }) =>
          !dbOrderNumbers.includes(sanityOrder.orderNumber),
      );

      // Delete orders from Sanity that no longer exist in the database
      for (const deletedOrder of deletedOrders) {
        try {
          await client.delete(deletedOrder._id);
          deletedCount++;

          results.push({
            orderNumber: deletedOrder.orderNumber,
            action: "deleted",
            sanityId: deletedOrder._id,
          });
        } catch (error) {
          console.error(
            `Error deleting order ${deletedOrder.orderNumber}:`,
            error,
          );
        }
      }
    }

    // Process each order
    for (const order of orders) {
      if (!order) continue;

      // Check if order already exists in Sanity
      const existingOrder = await client.fetch(
        `*[_type == "order" && orderNumber == $orderNumber][0]`,
        { orderNumber: order.orderNumber },
      );

      // Prepare order items with _key property for Sanity array items
      const orderItems = order.items.map(
        (item: {
          id: any;
          productId: any;
          variantId: any;
          product: { name: any };
          quantity: any;
          price: { toString: () => string };
        }) => ({
          _key: item.id, // Special Sanity-required system field for arrays
          itemId: item.id, // Keep our custom ID field
          productId: item.productId,
          variantId: item.variantId || "",
          name: item.product.name,
          quantity: item.quantity,
          price: parseFloat(item.price.toString()),
        }),
      );

      // Prepare shipping address
      const shippingAddress = order.shippingAddress
        ? {
            street: order.shippingAddress.street,
            city: order.shippingAddress.city,
            state: order.shippingAddress.state,
            postalCode: order.shippingAddress.postalCode,
            country: order.shippingAddress.country,
          }
        : null;

      // Prepare order document
      const orderDoc = {
        _type: "order",
        orderNumber: order.orderNumber,
        userId: order.userId,
        total: order.total,
        status: order.status,
        items: orderItems,
        shippingAddress,
        stripePaymentIntentId: order.stripePaymentIntentId || "",
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
      };

      // Update or create order in Sanity
      if (existingOrder) {
        const updated = await client
          .patch(existingOrder._id)
          .set(orderDoc)
          .commit();

        results.push({
          orderNumber: order.orderNumber,
          action: "updated",
          sanityId: updated._id,
        });
      } else {
        const created = await client.create(orderDoc);

        results.push({
          orderNumber: order.orderNumber,
          action: "created",
          sanityId: created._id,
        });
      }
    }

    return {
      status: "success",
      deleted: deletedCount,
      results,
    };
  } catch (error) {
    console.error("Error syncing orders:", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract orderId from query params if present
    const url = new URL(request.url);
    const orderId = url.searchParams.get("orderId") || undefined;

    const result = await syncOrder(orderId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}

// Handle POST requests (can be used as a webhook endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = body.orderId;

    const result = await syncOrder(orderId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}

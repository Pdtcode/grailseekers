import prisma from "./prismaClient";
import { Prisma } from "./generated/prisma";

/**
 * Creates a new order in the database
 */
export async function createOrder(
  userId: string,
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
  }>,
  total: number,
  shippingAddressId?: string,
  stripePaymentIntentId?: string,
) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!items || items.length === 0) {
      throw new Error("Order items are required");
    }

    // Generate a unique order number with timestamp
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        total,
        status: "PROCESSING",
        shippingAddressId,
        stripePaymentIntentId,
      },
    });

    // Create order items
    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: new Prisma.Decimal(item.price),
        },
      });

      // Update product variant stock if applicable
      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (variant) {
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: { stock: variant.stock - item.quantity },
          });
        }
      }
    }

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/**
 * Updates an order's status
 */
export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED",
) {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    // Sync order to Sanity after status update
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (appUrl) {
        const syncResponse = await fetch(`${appUrl}/api/sync/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order.id }),
        });

        if (!syncResponse.ok) {
          console.error(
            `Failed to sync order ${order.id} to Sanity after status update`,
          );
        }
      }
    } catch (syncError) {
      console.error("Error syncing order to Sanity:", syncError);
      // Continue processing, don't fail the order update
    }

    return order;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

/**
 * Links a Stripe payment intent to an existing order
 */
export async function linkStripePaymentToOrder(
  orderId: string,
  stripePaymentIntentId: string,
) {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    if (!stripePaymentIntentId) {
      throw new Error("Stripe payment intent ID is required");
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        stripePaymentIntentId,
        status: "PROCESSING", // Update status when payment is linked
      },
    });

    return order;
  } catch (error) {
    console.error("Error linking Stripe payment to order:", error);
    throw error;
  }
}

/**
 * Finds an order by Stripe payment intent ID
 */
export async function findOrderByStripePaymentIntent(
  stripePaymentIntentId: string,
) {
  try {
    if (!stripePaymentIntentId) {
      throw new Error("Stripe payment intent ID is required");
    }

    const order = await prisma.order.findFirst({
      where: { stripePaymentIntentId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
    });

    return order;
  } catch (error) {
    console.error("Error finding order by Stripe payment intent:", error);
    throw error;
  }
}

/* eslint-disable no-console */
import Stripe from "stripe";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismaClient";

// Make sure the Stripe secret key is defined
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { items, shipping, metadata } = await request.json();

    if (!items || !items.length) {
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 },
      );
    }

    // Extract customer info from metadata if available
    const customerName = metadata?.customer_name || "";
    const customerEmail = metadata?.customer_email || "";
    const shippingAddress = metadata?.shipping_address || "";

    // Parse shipping address for storing in shipping object
    const addressParts = shippingAddress
      .split(",")
      .map((part: string) => part.trim());
    const shippingAddressData =
      addressParts.length >= 5
        ? {
            line1: addressParts[0],
            city: addressParts[1],
            state: addressParts[2],
            postal_code: addressParts[3],
            country: addressParts[4], // ISO country codes expected
          }
        : undefined;

    // Calculate total from items
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );

    // Shipping cost (optional, could be zero)
    const shippingCost = shipping?.cost || 0;

    // Create payment intent without tax calculation
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // total in cents
      currency: "usd",
      metadata: {
        ...metadata,
        total: total.toString(),
        shipping_cost: shippingCost.toString(),
        item_count: items.length.toString(),
        created_at: new Date().toISOString(),
        items: JSON.stringify(
          items.map((item: any) => ({
            id: item.id,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
        ),
        user_id: metadata?.user_id || "",
      },
      description: `Order for ${customerName || "Customer"}`,
      receipt_email: customerEmail,
      payment_method_types: ["card"],
      statement_descriptor: "GrailSeekers Order",
      shipping: shippingAddressData
        ? {
            name: customerName,
            address: shippingAddressData,
          }
        : undefined,
      capture_method: "automatic",
    });

    // Create order in the database
    try {
      const firebaseUid = metadata?.user_id || null;

      let user = null;

      if (firebaseUid) {
        user = await prisma.user.findUnique({
          where: { firebaseUid },
        });
      }

      if (!user && customerEmail) {
        user = await prisma.user.findUnique({
          where: { email: customerEmail },
        });
      }

      if (!user && customerEmail) {
        user = await prisma.user.create({
          data: {
            email: customerEmail,
            name: customerName,
            firebaseUid: firebaseUid || null,
          },
        });
      }

      if (!user) {
        throw new Error("Could not identify user for this order");
      }

      // Create shipping address if provided
      let shippingAddressId = null;

      if (shippingAddressData) {
        const address = await prisma.address.create({
          data: {
            userId: user.id,
            street: shippingAddressData.line1,
            city: shippingAddressData.city,
            state: shippingAddressData.state,
            postalCode: shippingAddressData.postal_code,
            country: shippingAddressData.country,
          },
        });

        shippingAddressId = address.id;
      }

      // Create the order
      const order = await prisma.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}`,
          userId: user.id,
          total: total,
          status: "PROCESSING",
          stripePaymentIntentId: paymentIntent.id,
          shippingAddressId,
        },
      });

      // Create order items
      for (const item of items) {
        try {
          let product = null;

          product = await prisma.product.findFirst({
            where: { slug: item.id },
            include: { variants: true },
          });

          if (!product) {
            product = await prisma.product.findFirst({
              where: { id: item.id },
              include: { variants: true },
            });

            if (!product && item.originalId) {
              product = await prisma.product.findFirst({
                where: { id: item.originalId },
                include: { variants: true },
              });
            }

            if (!product && item.name) {
              product = await prisma.product.findFirst({
                where: { name: item.name },
                include: { variants: true },
              });
            }
          }

          if (!product) {
            product = await prisma.product.create({
              data: {
                id: item.originalId || item.id || `temp-${Date.now()}`,
                name: item.name || `Product from order ${order.id}`,
                description: item.description || "Added during checkout",
                price: item.price,
                images: item.image ? [item.image] : [],
                slug: item.id || `temp-product-${Date.now()}`,
                inStock: true,
              },
              include: { variants: true },
            });
          }

          let variantId = null;

          if (item.variantId && product) {
            const variant = product.variants.find(
              (v) => v.id === item.variantId,
            );

            if (variant) {
              variantId = variant.id;

              await prisma.productVariant.update({
                where: { id: variant.id },
                data: { stock: variant.stock - item.quantity },
              });
            }
          }

          await prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: product.id,
              variantId,
              quantity: item.quantity,
              price: product.price,
            },
          });
        } catch (error) {
          console.error(
            `Error processing item: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          );
        }
      }
    } catch (orderError) {
      console.error(
        `Error creating order: ${
          orderError instanceof Error ? orderError.message : "Unknown error"
        }`,
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      total,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

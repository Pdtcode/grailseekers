import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing Stripe webhook secret");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Creates an order in the database from a successful Stripe payment
 */
async function createOrderFromStripePayment(
  paymentIntent: Stripe.PaymentIntent,
  customer: Stripe.Customer | null
) {
  try {
    // Extract necessary data from payment intent
    const {
      id: stripePaymentIntentId,
      amount,
      metadata,
    } = paymentIntent;

    // Extract customer information
    const customerEmail = customer?.email || metadata?.customer_email || "";
    const customerName = customer?.name || metadata?.customer_name || "";

    // Get Firebase UID from metadata if available
    const firebaseUid = metadata?.user_id || null;

    // Look up user by Firebase UID first, then by email
    let user = null;
    
    if (firebaseUid) {
      user = await prisma.user.findUnique({
        where: { firebaseUid },
      });
    }
    
    // If not found by Firebase UID, try email
    if (!user && customerEmail) {
      user = await prisma.user.findUnique({
        where: { email: customerEmail },
      });
    }
    
    // If still no user found but we have an email, create a temporary user
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

    // Parse the items from metadata
    let items = [];
    if (metadata?.items) {
      try {
        items = JSON.parse(metadata.items);
      } catch (e) {
        console.error("Failed to parse items from metadata", e);
      }
    }

    // Extract shipping address if available
    let shippingAddressId = null;
    if (metadata?.shipping_address) {
      const addressParts = metadata.shipping_address.split(',').map((part: string) => part.trim());
      
      if (addressParts.length >= 5) {
        const address = await prisma.address.create({
          data: {
            userId: user.id,
            street: addressParts[0],
            city: addressParts[1],
            state: addressParts[2],
            postalCode: addressParts[3],
            country: addressParts[4],
          },
        });
        
        shippingAddressId = address.id;
      }
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        userId: user.id,
        total: amount / 100, // Convert cents to dollars
        status: "PROCESSING", // Initial status
        stripePaymentIntentId,
        shippingAddressId,
      },
    });

    // If items metadata is available, create order items
    if (items && items.length > 0) {
      for (const item of items) {
        // Look up product
        const product = await prisma.product.findFirst({
          where: { id: item.id },
          include: { variants: true },
        });

        if (product) {
          // Find variant if specified
          let variantId = null;
          if (item.variantId) {
            const variant = product.variants.find(v => v.id === item.variantId);
            if (variant) {
              variantId = variant.id;
              
              // Update variant stock
              await prisma.productVariant.update({
                where: { id: variant.id },
                data: { stock: variant.stock - item.quantity },
              });
            }
          }

          // Create order item
          await prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: product.id,
              variantId,
              quantity: item.quantity,
              price: product.price,
            },
          });
        }
      }
    }

    return order;
  } catch (error) {
    console.error("Error creating order from Stripe payment:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Get the raw request body
    const payload = await request.text();
    
    // Get the Stripe signature from headers
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    // Verify the event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        
        // Retrieve customer information if available
        let customer = null;
        if (paymentIntent.customer) {
          customer = await stripe.customers.retrieve(
            paymentIntent.customer as string
          ) as Stripe.Customer;
        }
        
        // Create order in database
        const order = await createOrderFromStripePayment(paymentIntent, customer);
        console.log(`Created order ${order.id} for payment ${paymentIntent.id}`);
        
        break;
        
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        
        // If payment intent is available in the session
        if (session.payment_intent) {
          const paymentIntentId = session.payment_intent as string;
          const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
          
          // Retrieve customer if available
          let sessionCustomer = null;
          if (session.customer) {
            sessionCustomer = await stripe.customers.retrieve(
              session.customer as string
            ) as Stripe.Customer;
          }
          
          // Create order in database
          const sessionOrder = await createOrderFromStripePayment(pi, sessionCustomer);
          console.log(`Created order ${sessionOrder.id} for session ${session.id}`);
        }
        
        break;
        
      // Add more cases as needed for other events
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
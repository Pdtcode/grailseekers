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
    console.log(`[ORDER-CREATE] Starting order creation for payment ${paymentIntent.id}`);
    
    // Extract necessary data from payment intent
    const {
      id: stripePaymentIntentId,
      amount,
      metadata,
    } = paymentIntent;

    console.log(`[ORDER-CREATE] Payment amount: ${amount}, metadata:`, metadata);

    // Extract customer information
    const customerEmail = customer?.email || metadata?.customer_email || "";
    const customerName = customer?.name || metadata?.customer_name || "";
    console.log(`[ORDER-CREATE] Customer info - Email: ${customerEmail}, Name: ${customerName}`);

    // Get Firebase UID from metadata if available
    const firebaseUid = metadata?.user_id || null;
    console.log(`[ORDER-CREATE] Firebase UID from metadata: ${firebaseUid}`);

    // Look up user by Firebase UID first, then by email
    let user = null;
    
    if (firebaseUid) {
      console.log(`[ORDER-CREATE] Looking up user by Firebase UID: ${firebaseUid}`);
      user = await prisma.user.findUnique({
        where: { firebaseUid },
      });
      if (user) {
        console.log(`[ORDER-CREATE] Found user by Firebase UID: ${user.id}`);
      } else {
        console.log(`[ORDER-CREATE] No user found with Firebase UID: ${firebaseUid}`);
      }
    }
    
    // If not found by Firebase UID, try email
    if (!user && customerEmail) {
      console.log(`[ORDER-CREATE] Looking up user by email: ${customerEmail}`);
      user = await prisma.user.findUnique({
        where: { email: customerEmail },
      });
      if (user) {
        console.log(`[ORDER-CREATE] Found user by email: ${user.id}`);
      } else {
        console.log(`[ORDER-CREATE] No user found with email: ${customerEmail}`);
      }
    }
    
    // If still no user found but we have an email, create a temporary user
    if (!user && customerEmail) {
      console.log(`[ORDER-CREATE] Creating new user with email: ${customerEmail}`);
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name: customerName,
          firebaseUid: firebaseUid || null,
        },
      });
      console.log(`[ORDER-CREATE] Created new user: ${user.id}`);
    }

    if (!user) {
      console.error(`[ORDER-CREATE] Failed to identify or create user`);
      throw new Error("Could not identify user for this order");
    }

    // Parse the items from metadata
    let items = [];
    if (metadata?.items) {
      console.log(`[ORDER-CREATE] Parsing items from metadata: ${metadata.items.substring(0, 100)}${metadata.items.length > 100 ? '...' : ''}`);
      try {
        items = JSON.parse(metadata.items);
        console.log(`[ORDER-CREATE] Successfully parsed ${items.length} items from metadata`);
      } catch (e) {
        console.error("[ORDER-CREATE] Failed to parse items from metadata", e);
      }
    } else {
      console.log(`[ORDER-CREATE] No items found in metadata`);
    }

    // Extract shipping address if available
    let shippingAddressId = null;
    if (metadata?.shipping_address) {
      console.log(`[ORDER-CREATE] Processing shipping address: ${metadata.shipping_address}`);
      const addressParts = metadata.shipping_address.split(',').map((part: string) => part.trim());
      console.log(`[ORDER-CREATE] Address parts found: ${addressParts.length}`);
      
      if (addressParts.length >= 5) {
        const street = addressParts[0];
        const city = addressParts[1];
        const state = addressParts[2];
        const postalCode = addressParts[3];
        const country = addressParts[4];

        // First, check if this is the user's default address (or an existing address) - if so, use that
        console.log(`[ORDER-CREATE] Checking for existing addresses for user ${user.id}`);
        try {
          // Look for default address first
          let existingAddress = await prisma.address.findFirst({
            where: {
              userId: user.id,
              isDefault: true
            }
          });

          // If no default address, check if this address already exists for the user
          if (!existingAddress) {
            existingAddress = await prisma.address.findFirst({
              where: {
                userId: user.id,
                street,
                city,
                state,
                postalCode
              }
            });
          }

          if (existingAddress) {
            // Use existing address
            shippingAddressId = existingAddress.id;
            console.log(`[ORDER-CREATE] Using existing address: ${existingAddress.id}`);
          } else if (metadata?.save_address === 'true') {
            // Only create a new address if explicitly requested to save it
            console.log(`[ORDER-CREATE] Creating shipping address for user ${user.id}`);
            const address = await prisma.address.create({
              data: {
                userId: user.id,
                street,
                city,
                state,
                postalCode,
                country,
              },
            });
            
            shippingAddressId = address.id;
            console.log(`[ORDER-CREATE] Created shipping address: ${address.id}`);
          } else {
            // Don't create a permanently saved address, just use the address data for the order
            console.log(`[ORDER-CREATE] Not saving address since save_address was not set to true`);
          }
        } catch (error: any) {
          console.error(`[ORDER-CREATE] Error processing shipping address: ${error.message}`);
        }
      } else {
        console.log(`[ORDER-CREATE] Invalid shipping address format, not enough parts`);
      }
    } else {
      console.log(`[ORDER-CREATE] No shipping address in metadata`);
    }

    // Create the order
    console.log(`[ORDER-CREATE] Creating order for user ${user.id}, amount ${amount/100}, payment ${stripePaymentIntentId}`);
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
    console.log(`[ORDER-CREATE] Created order: ${order.id}, number: ${order.orderNumber}`);

    // If items metadata is available, create order items
    if (items && items.length > 0) {
      console.log(`[ORDER-CREATE] Processing ${items.length} items for order ${order.id}`);
      for (const item of items) {
        console.log(`[ORDER-CREATE] Processing item: id=${item.id}, variant=${item.variantId}, qty=${item.quantity}`);
        try {
          // Look up product - first try by slug, then by ID
          let product = await prisma.product.findFirst({
            where: { slug: item.id },
            include: { variants: true },
          });
          
          // If not found by slug, try direct ID match
          if (!product) {
            product = await prisma.product.findFirst({
              where: { id: item.id },
              include: { variants: true },
            });
            
            // If still not found and originalId is available, try that
            if (!product && item.originalId) {
              product = await prisma.product.findFirst({
                where: { id: item.originalId },
                include: { variants: true },
              });
            }
          }

          if (product) {
            console.log(`[ORDER-CREATE] Found product: ${product.id}, ${product.name}`);
            
            // Find variant if specified
            let variantId = null;
            if (item.variantId) {
              console.log(`[ORDER-CREATE] Looking for variant: ${item.variantId}`);
              const variant = product.variants.find(v => v.id === item.variantId);
              if (variant) {
                variantId = variant.id;
                console.log(`[ORDER-CREATE] Found variant: ${variant.id}, current stock: ${variant.stock}`);
                
                // Update variant stock
                try {
                  const updatedVariant = await prisma.productVariant.update({
                    where: { id: variant.id },
                    data: { stock: variant.stock - item.quantity },
                  });
                  console.log(`[ORDER-CREATE] Updated variant stock to: ${updatedVariant.stock}`);
                } catch (error: any) {
                  console.error(`[ORDER-CREATE] Error updating variant stock: ${error.message}`);
                }
              } else {
                console.log(`[ORDER-CREATE] Variant ${item.variantId} not found for product ${product.id}`);
              }
            } else {
              console.log(`[ORDER-CREATE] No variant specified for this item`);
            }

            // Create order item
            try {
              const orderItem = await prisma.orderItem.create({
                data: {
                  orderId: order.id,
                  productId: product.id,
                  variantId,
                  quantity: item.quantity,
                  price: product.price,
                },
              });
              console.log(`[ORDER-CREATE] Created order item: ${orderItem.id}`);
            } catch (error: any) {
              console.error(`[ORDER-CREATE] Error creating order item: ${error.message}`);
            }
          } else {
            console.log(`[ORDER-CREATE] Product ${item.id} not found`);
          }
        } catch (error: any) {
          console.error(`[ORDER-CREATE] Error processing item ${item.id}: ${error.message}`);
        }
      }
    } else {
      console.log(`[ORDER-CREATE] No items to process for order ${order.id}`);
    }

    console.log(`[ORDER-CREATE] Order creation completed successfully for ${stripePaymentIntentId}`);
    return order;
  } catch (error: any) {
    console.error(`[ORDER-CREATE] Error creating order from Stripe payment: ${error.message}`);
    console.error(error.stack);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    console.log("[STRIPE-WEBHOOK] Received webhook request");
    
    // Get the raw request body
    const payload = await request.text();
    console.log("[STRIPE-WEBHOOK] Payload length:", payload.length);
    
    // Get the Stripe signature from headers
    const headersList = headers();
    const signature = headersList.get("stripe-signature");
    console.log("[STRIPE-WEBHOOK] Signature present:", !!signature);

    if (!signature) {
      console.error("[STRIPE-WEBHOOK] Missing Stripe signature");
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    // Verify the event
    let event: Stripe.Event;
    try {
      console.log("[STRIPE-WEBHOOK] Verifying webhook signature with secret:", webhookSecret?.substring(0, 4) + "...");
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      console.log("[STRIPE-WEBHOOK] Event verified successfully. Type:", event.type);
    } catch (err: any) {
      console.error(`[STRIPE-WEBHOOK] Signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[STRIPE-WEBHOOK] PaymentIntent ${paymentIntent.id} succeeded`);
        console.log(`[STRIPE-WEBHOOK] Payment amount: ${paymentIntent.amount}, currency: ${paymentIntent.currency}`);
        console.log(`[STRIPE-WEBHOOK] Payment metadata:`, paymentIntent.metadata);
        
        // Retrieve customer information if available
        let customer = null;
        if (paymentIntent.customer) {
          console.log(`[STRIPE-WEBHOOK] Customer found: ${paymentIntent.customer}`);
          customer = await stripe.customers.retrieve(
            paymentIntent.customer as string
          ) as Stripe.Customer;
          console.log(`[STRIPE-WEBHOOK] Customer email: ${customer.email}, name: ${customer.name}`);
        } else {
          console.log(`[STRIPE-WEBHOOK] No customer attached to payment intent`);
        }
        
        try {
          // Create order in database
          console.log(`[STRIPE-WEBHOOK] Creating order for payment ${paymentIntent.id}`);
          const order = await createOrderFromStripePayment(paymentIntent, customer);
          console.log(`[STRIPE-WEBHOOK] Created order ${order.id} for payment ${paymentIntent.id}`);
          
          // Sync order to Sanity
          try {
            console.log(`[STRIPE-WEBHOOK] Syncing order ${order.id} to Sanity`);
            const syncResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sync/orders`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: order.id }),
            });
            
            if (syncResponse.ok) {
              const syncResult = await syncResponse.json();
              console.log(`[STRIPE-WEBHOOK] Order sync result:`, syncResult);
            } else {
              console.error(`[STRIPE-WEBHOOK] Order sync failed with status ${syncResponse.status}`);
            }
          } catch (syncError: any) {
            console.error(`[STRIPE-WEBHOOK] Error syncing order to Sanity: ${syncError.message}`);
            // Don't throw, continue processing
          }
        } catch (error: any) {
          console.error(`[STRIPE-WEBHOOK] Error creating order: ${error.message}`);
          console.error(error.stack);
          // Don't throw here, allow webhook to return 200
        }
        
        break;
        
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[STRIPE-WEBHOOK] Checkout session ${session.id} completed`);
        
        // If payment intent is available in the session
        if (session.payment_intent) {
          console.log(`[STRIPE-WEBHOOK] Payment intent found in session: ${session.payment_intent}`);
          const paymentIntentId = session.payment_intent as string;
          const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
          console.log(`[STRIPE-WEBHOOK] Retrieved payment intent: ${pi.id}, status: ${pi.status}`);
          console.log(`[STRIPE-WEBHOOK] Payment intent metadata:`, pi.metadata);
          
          // Retrieve customer if available
          let sessionCustomer = null;
          if (session.customer) {
            console.log(`[STRIPE-WEBHOOK] Customer found in session: ${session.customer}`);
            sessionCustomer = await stripe.customers.retrieve(
              session.customer as string
            ) as Stripe.Customer;
            console.log(`[STRIPE-WEBHOOK] Customer email: ${sessionCustomer.email}, name: ${sessionCustomer.name}`);
          } else {
            console.log(`[STRIPE-WEBHOOK] No customer attached to session`);
          }
          
          try {
            // Create order in database
            console.log(`[STRIPE-WEBHOOK] Creating order for session ${session.id}`);
            const sessionOrder = await createOrderFromStripePayment(pi, sessionCustomer);
            console.log(`[STRIPE-WEBHOOK] Created order ${sessionOrder.id} for session ${session.id}`);
            
            // Sync order to Sanity
            try {
              console.log(`[STRIPE-WEBHOOK] Syncing order ${sessionOrder.id} to Sanity`);
              const syncResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sync/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: sessionOrder.id }),
              });
              
              if (syncResponse.ok) {
                const syncResult = await syncResponse.json();
                console.log(`[STRIPE-WEBHOOK] Order sync result:`, syncResult);
              } else {
                console.error(`[STRIPE-WEBHOOK] Order sync failed with status ${syncResponse.status}`);
              }
            } catch (syncError: any) {
              console.error(`[STRIPE-WEBHOOK] Error syncing order to Sanity: ${syncError.message}`);
              // Don't throw, continue processing
            }
          } catch (error: any) {
            console.error(`[STRIPE-WEBHOOK] Error creating order from session: ${error.message}`);
            console.error(error.stack);
            // Don't throw here, allow webhook to return 200
          }
        } else {
          console.log(`[STRIPE-WEBHOOK] No payment intent found in session ${session.id}`);
        }
        
        break;
        
      // Add more cases as needed for other events
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    console.log(`[STRIPE-WEBHOOK] Webhook processed successfully`);
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`[STRIPE-WEBHOOK] Error processing webhook: ${error.message}`);
    console.error(error.stack);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
import Stripe from "stripe";
import { NextResponse } from "next/server";

// Make sure the Stripe secret key is defined
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { items, returnUrl, shippingInfo, userId } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Format the items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
          description: item.description || undefined,
          metadata: {
            product_id: item.id || ''
          }
        },
        unit_amount: Math.round(item.price * 100), // convert dollars to cents
      },
      quantity: item.quantity,
    }));

    // Calculate total price
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Prepare shipping address if available
    let shippingAddress = '';
    if (shippingInfo) {
      shippingAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.zipCode}, ${shippingInfo.country}`;
    }

    // Get origin for success and cancel URLs
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: returnUrl
        ? `${origin}${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl
        ? `${origin}${returnUrl}?canceled=true`
        : `${origin}/checkout?canceled=true`,
      // Store detailed metadata for order creation in webhooks
      metadata: {
        order_id: `order-${Date.now()}`,
        user_id: userId || '',
        customer_email: shippingInfo?.email || '',
        customer_name: shippingInfo ? `${shippingInfo.firstName} ${shippingInfo.lastName}` : '',
        shipping_address: shippingAddress,
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price
        }))),
        total: total.toString()
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

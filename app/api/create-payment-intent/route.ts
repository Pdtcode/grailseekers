import Stripe from "stripe";
import { NextResponse } from "next/server";

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
        { status: 400 }
      );
    }
    
    // Extract customer info from metadata if available
    const customerName = metadata?.customer_name || '';
    const customerEmail = metadata?.customer_email || '';
    const shippingAddress = metadata?.shipping_address || '';
    
    // Parse shipping address for tax calculation
    const addressParts = shippingAddress.split(',').map(part => part.trim());
    const shippingAddressData = addressParts.length >= 5 ? {
      line1: addressParts[0],
      city: addressParts[1],
      state: addressParts[2],
      postal_code: addressParts[3],
      country: addressParts[4], // Already using ISO country codes
    } : undefined;
    
    // Calculate subtotal from items
    const subtotal = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0);
    
    // Shipping cost
    const shippingCost = shipping?.cost || 0;
    
    // Create line items for the checkout session
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || undefined,
          images: item.image ? [item.image] : undefined,
          tax_code: 'txcd_99999999', // General default tax code
          metadata: {
            product_id: item.id || 'unknown',
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));
    
    // Create a tax calculation for the items
    let taxCalculation = null;
    if (shippingAddressData) {
      try {
        // First create a Customer to associate with the tax calculation
        const customer = await stripe.customers.create({
          name: customerName,
          email: customerEmail,
          address: shippingAddressData,
          shipping: {
            name: customerName,
            address: shippingAddressData,
          },
        });
        
        // Calculate tax using Stripe Tax API (if you have it enabled)
        // Note: This requires Stripe Tax to be enabled in your account
        taxCalculation = await stripe.tax.calculations.create({
          currency: 'usd',
          customer: customer.id,
          customer_details: {
            address: shippingAddressData,
            address_source: 'shipping',
          },
          line_items: lineItems.map((item: any) => ({
            amount: item.price_data.unit_amount * item.quantity,
            reference: `item_${Math.random().toString(36).substring(7)}`,
            tax_code: item.price_data.product_data.tax_code,
          })),
        }).catch(err => {
          // If tax calculation fails, just log it and continue
          console.warn("Tax calculation failed, proceeding without tax:", err.message);
          return null;
        });
      } catch (err) {
        console.warn("Customer or tax creation failed:", err);
      }
    }
    
    // Add tax amount calculated by Stripe (if available)
    const taxAmount = taxCalculation?.tax_amount_exclusive || 0;
    
    // Convert tax amount from cents to dollars for consistency
    const taxAmountDollars = taxAmount / 100;
    
    // We now only use the subtotal as the total
    const total = subtotal;
    
    // Create a payment intent with additional options for better testing
    // This will only be called when the user confirms their order
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(subtotal * 100), // convert dollars to cents
      currency: "usd",
      metadata: {
        ...metadata,
        subtotal: subtotal.toString(),
        shipping_cost: shippingCost.toString(),
        tax_amount: taxAmountDollars.toString(),
        item_count: items.length.toString(),
        created_at: new Date().toISOString(),
        // Include detailed item information for order creation in webhook
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price
        }))),
        user_id: metadata?.user_id || '',
      },
      description: `Order for ${customerName || 'Customer'}`,
      receipt_email: customerEmail,
      // Explicitly specify payment methods to exclude Link
      payment_method_types: ['card'],
      // Adding statement descriptor
      statement_descriptor: 'GrailSeekers Order',
      // Add shipping info if available
      shipping: shippingAddressData ? {
        name: customerName,
        address: shippingAddressData,
      } : undefined,
      // Link to the tax calculation if available
      tax_calculation: taxCalculation?.id,
      // Capture method - automatically capture the payment
      capture_method: 'automatic',
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      total: subtotal
    });
  } catch (error: any) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
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
    
    // Prepare items for metadata
    const itemsForMetadata = items.map(item => ({
      id: item.id,
      variantId: item.variantId,
      quantity: item.quantity,
      price: item.price,
      name: item.name
    }));
    
    // Create a payment intent with additional options
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
        // Include detailed item information for order creation
        items: JSON.stringify(itemsForMetadata),
        user_id: metadata?.user_id || '',
      },
      description: `Order for ${customerName || 'Customer'}`,
      receipt_email: customerEmail,
      payment_method_types: ['card'],
      statement_descriptor: 'GrailSeekers Order',
      shipping: shippingAddressData ? {
        name: customerName,
        address: shippingAddressData,
      } : undefined,
      tax_calculation: taxCalculation?.id,
      capture_method: 'automatic',
    });
    
    // Create order directly in database after payment intent creation
    try {
      // Extract user information
      const firebaseUid = metadata?.user_id || null;
      
      // Find or create user
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
          total: subtotal,
          status: "PROCESSING",
          stripePaymentIntentId: paymentIntent.id,
          shippingAddressId,
        },
      });
      
      // Create order items
      for (const item of items) {
        try {
          // Try different ways to find the product
          let product = null;
          
          // First try by slug match since we're now using slugs as primary identifiers
          product = await prisma.product.findFirst({
            where: { slug: item.id },
            include: { variants: true },
          });
          
          if (!product) {
            // Try by direct ID match if slug lookup fails
            product = await prisma.product.findFirst({
              where: { id: item.id },
              include: { variants: true },
            });
            
            // If provided, try with the original Sanity ID
            if (!product && item.originalId) {
              // Try to find a product that might have been created using the Sanity ID before
              product = await prisma.product.findFirst({
                where: { id: item.originalId },
                include: { variants: true },
              });
            }
            
            if (!product && item.name) {
              // Try by name as a last resort
              product = await prisma.product.findFirst({
                where: { name: item.name },
                include: { variants: true },
              });
            }
          }
          
          if (!product) {
            // Create a fallback product in the database to complete the order
            product = await prisma.product.create({
              data: {
                id: item.originalId || item.id || `temp-${Date.now()}`, // Use originalId (Sanity ID) if available
                name: item.name || `Product from order ${order.id}`,
                description: item.description || 'Added during checkout',
                price: item.price,
                images: item.image ? [item.image] : [],
                slug: item.id || `temp-product-${Date.now()}`, // Use the slug/ID from cart
                inStock: true
              },
              include: { variants: true }
            });
          }
          
          // Find variant if specified
          let variantId = null;
          if (item.variantId && product) {
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
        } catch (error) {
          console.error(`Error processing item: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    } catch (orderError) {
      // Continue and return payment intent - we don't want to fail the payment
      console.error(`Error creating order: ${orderError instanceof Error ? orderError.message : 'Unknown error'}`);
    }
    
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      total: subtotal
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
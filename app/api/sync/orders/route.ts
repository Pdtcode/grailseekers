import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import prisma from '@/lib/prismaClient';
import { getOrderById, getUserOrders } from '@/lib/orderQueries';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You need a Sanity write token with editor access
  useCdn: false,
  apiVersion: '2023-05-03',
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
            createdAt: 'desc',
          },
        });

    if (!orders || orders.length === 0) {
      return { status: 'error', message: 'No orders found' };
    }

    const results = [];

    // Process each order
    for (const order of orders) {
      if (!order) continue;

      // Check if order already exists in Sanity
      const existingOrder = await client.fetch(
        `*[_type == "order" && orderNumber == $orderNumber][0]`,
        { orderNumber: order.orderNumber }
      );

      // Prepare order items
      const orderItems = order.items.map(item => ({
        productId: item.productId,
        variantId: item.variantId || '',
        name: item.product.name,
        quantity: item.quantity,
        price: parseFloat(item.price.toString()),
      }));

      // Prepare shipping address
      const shippingAddress = order.shippingAddress ? {
        name: order.shippingAddress.name,
        street: order.shippingAddress.street,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        postalCode: order.shippingAddress.postalCode,
        country: order.shippingAddress.country,
      } : null;

      // Prepare order document
      const orderDoc = {
        _type: 'order',
        orderNumber: order.orderNumber,
        userId: order.userId,
        customerEmail: order.user?.email || '',
        customerName: order.user?.name || '',
        total: order.total,
        status: order.status,
        items: orderItems,
        shippingAddress,
        stripePaymentIntentId: order.stripePaymentIntentId || '',
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
          action: 'updated',
          sanityId: updated._id,
        });
      } else {
        const created = await client.create(orderDoc);
        
        results.push({
          orderNumber: order.orderNumber,
          action: 'created',
          sanityId: created._id,
        });
      }
    }

    return {
      status: 'success',
      results,
    };
  } catch (error) {
    console.error('Error syncing orders:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract orderId from query params if present
    const url = new URL(request.url);
    const orderId = url.searchParams.get('orderId') || undefined;
    
    const result = await syncOrder(orderId);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
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
    console.error('Error processing request:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred', 
      },
      { status: 500 }
    );
  }
}
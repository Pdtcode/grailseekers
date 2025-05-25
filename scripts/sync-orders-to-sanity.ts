import prisma from '../lib/prismaClient';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You need a Sanity write token with editor access
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function syncAllOrders() {
  try {
    console.log('Starting order sync to Sanity...');
    
    // Get all orders with related data
    const orders = await prisma.order.findMany({
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

    console.log(`Found ${orders.length} orders to sync`);

    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    // Process each order
    for (const order of orders) {
      try {
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
          name: order.user.name || 'Unknown',
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
          total: parseFloat(order.total.toString()),
          status: order.status,
          items: orderItems,
          shippingAddress,
          stripePaymentIntentId: order.stripePaymentIntentId || '',
          createdAt: order.createdAt.toISOString(),
          updatedAt: order.updatedAt.toISOString(),
        };

        // Update or create order in Sanity
        if (existingOrder) {
          await client
            .patch(existingOrder._id)
            .set(orderDoc)
            .commit();
          
          updatedCount++;
          console.log(`Updated order ${order.orderNumber} in Sanity`);
        } else {
          await client.create(orderDoc);
          
          createdCount++;
          console.log(`Created order ${order.orderNumber} in Sanity`);
        }
      } catch (error) {
        errorCount++;
        console.error(`Error syncing order ${order.orderNumber}:`, error);
      }
    }

    console.log('Order sync complete');
    console.log(`Created: ${createdCount}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error syncing orders:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// Run the sync
syncAllOrders();
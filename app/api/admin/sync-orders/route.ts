import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You need a Sanity write token with editor access
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function syncOrders() {
  try {
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

    // Get all current order numbers from the database
    const dbOrderNumbers = orders.map(order => order.orderNumber);
    
    // Get all orders from Sanity
    const sanityOrders = await client.fetch(
      `*[_type == "order"] { _id, orderNumber }`
    );

    let createdCount = 0;
    let updatedCount = 0;
    let deletedCount = 0;
    let errorCount = 0;

    // Find orders that exist in Sanity but not in the database (deleted)
    const deletedOrders = sanityOrders.filter(
      sanityOrder => !dbOrderNumbers.includes(sanityOrder.orderNumber)
    );

    // Delete orders from Sanity that no longer exist in the database
    for (const deletedOrder of deletedOrders) {
      try {
        await client.delete(deletedOrder._id);
        deletedCount++;
      } catch (error) {
        errorCount++;
        console.error(`Error deleting order ${deletedOrder.orderNumber}:`, error);
      }
    }

    // Process each order
    for (const order of orders) {
      try {
        // Check if order already exists in Sanity
        const existingOrder = await client.fetch(
          `*[_type == "order" && orderNumber == $orderNumber][0]`,
          { orderNumber: order.orderNumber }
        );

        // Prepare order items - add _key and itemId properties for Sanity array items
        const orderItems = order.items.map(item => ({
          _key: item.id, // Special Sanity-required system field for arrays
          itemId: item.id, // Keep our custom ID field
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
        } else {
          await client.create(orderDoc);
          
          createdCount++;
        }
      } catch (error) {
        errorCount++;
        console.error(`Error syncing order ${order.orderNumber}:`, error);
      }
    }

    // Store the sync state in Sanity
    try {
      // Check if sync state document exists
      const existingSyncState = await client.fetch(
        `*[_type == "syncState" && key == "orders"][0]`
      );
      
      const syncStats = {
        created: createdCount,
        updated: updatedCount,
        deleted: deletedCount,
        errors: errorCount,
        total: orders.length,
      };
      
      // Create or update sync state document
      if (existingSyncState) {
        await client
          .patch(existingSyncState._id)
          .set({
            lastSyncTime: new Date().toISOString(),
            syncStatus: 'success',
            syncStats,
          })
          .commit();
      } else {
        await client.create({
          _type: 'syncState',
          key: 'orders',
          lastSyncTime: new Date().toISOString(),
          syncStatus: 'success',
          syncStats,
        });
      }
    } catch (syncStateError) {
      console.error('Error updating sync state:', syncStateError);
      // Continue - this shouldn't fail the overall sync
    }
    
    return {
      status: 'success',
      created: createdCount,
      updated: updatedCount,
      deleted: deletedCount,
      errors: errorCount,
      total: orders.length,
    };
  } catch (error) {
    console.error('Error syncing orders:', error);
    
    // Store the error in sync state
    try {
      // Check if sync state document exists
      const existingSyncState = await client.fetch(
        `*[_type == "syncState" && key == "orders"][0]`
      );
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Create or update sync state document
      if (existingSyncState) {
        await client
          .patch(existingSyncState._id)
          .set({
            lastSyncTime: new Date().toISOString(),
            syncStatus: 'failed',
            syncStats: {
              created: 0,
              updated: 0,
              deleted: 0,
              errors: 1,
              total: 0,
            },
          })
          .commit();
      } else {
        await client.create({
          _type: 'syncState',
          key: 'orders',
          lastSyncTime: new Date().toISOString(),
          syncStatus: 'failed',
          syncStats: {
            created: 0,
            updated: 0,
            deleted: 0,
            errors: 1,
            total: 0,
          },
        });
      }
    } catch (syncStateError) {
      console.error('Error updating sync state for failure:', syncStateError);
    }
    
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Optional authentication check here - you might want to restrict this
    // to admin users only in a production environment
    
    const result = await syncOrders();
    
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
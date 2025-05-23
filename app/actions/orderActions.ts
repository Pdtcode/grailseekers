'use server';

import prisma from '@/lib/prismaClient';

/**
 * Get all orders for a specific user
 * This function ensures ONLY the specified user's orders are returned
 */
export async function getUserOrders(userId: string) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Explicitly filter by userId to ensure only the current user's orders are returned
    const orders = await prisma.order.findMany({
      where: {
        userId: userId, // This guarantees only the current user's orders
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string) {
  try {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
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
    console.error('Error fetching order details:', error);
    throw error;
  }
}
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { formatOrderDate, getOrderStatusText } from '@/lib/orderQueries';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
  };
  variant?: {
    size?: string;
    color?: string;
  } | null;
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Use the user's email as an identifier
        const email = user.email;
        
        // Pass the email as a query parameter to identify the user
        const response = await fetch(`/api/user/orders?email=${encodeURIComponent(email)}`);
        

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        // Set only the orders that belong to the current user
        setOrders(data.orders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
        setLoading(false);
      }
    }

    // Only fetch orders when there's a logged-in user
    if (user) {
      fetchOrders();
    }
  }, [user]);

  // If user is not authenticated, show login message
  if (!user && !loading) {
    return (
      <div className=" shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">My Orders</h2>
        <div className="text-center py-12">
          <p className="text-gray-500">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className=" px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {formatOrderDate(new Date(order.createdAt))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${Number(order.total).toFixed(2)}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {getOrderStatusText(order.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.product.name}</p>
                        {item.variant && (item.variant.size || item.variant.color) && (
                          <p className="text-xs text-gray-500">
                            {item.variant.size && `Size: ${item.variant.size}`} 
                            {item.variant.size && item.variant.color && ' | '} 
                            {item.variant.color && `Color: ${item.variant.color}`}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  );
}
/**
 * Get order status text from enum
 */
export function getOrderStatusText(status: string) {
  const statusMap: Record<string, string> = {
    'PENDING': 'Pending',
    'PROCESSING': 'Processing',
    'SHIPPED': 'Shipped',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled'
  };

  return statusMap[status] || status;
}

/**
 * Format order date 
 */
export function formatOrderDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
// This file is now deprecated, please use:
// - app/actions/orderActions.ts for server-side actions
// - lib/orderUtils.ts for utility functions

// Re-export from orderUtils.ts for backward compatibility
import { formatOrderDate, getOrderStatusText } from './orderUtils';
export { formatOrderDate, getOrderStatusText };
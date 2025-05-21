import React from 'react'
import { definePlugin } from 'sanity'
import OrderSyncTool from './OrderSyncTool'

/**
 * Custom plugin for syncing orders from the database to Sanity
 */
export const orderSyncPlugin = definePlugin({
  name: 'order-sync',
  tools: [
    {
      name: 'order-sync',
      title: 'Sync Orders',
      icon: () => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="1em" 
          height="1em" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
          <path d="M16 21h5v-5"></path>
        </svg>
      ),
      component: OrderSyncTool,
    },
  ],
})

export default orderSyncPlugin
// This is a simple version without dynamic label
import React from 'react'
import { useToast } from '@sanity/ui'

// Action creator function
export const syncOrdersAction = (params: any) => {
  return {
    label: 'Sync Orders from Database',
    icon: () => (
      React.createElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '1em',
        height: '1em',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }, 
      React.createElement('path', {
        d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'
      }),
      React.createElement('path', {
        d: 'M3 3v5h5'
      }),
      React.createElement('path', {
        d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16'
      }),
      React.createElement('path', {
        d: 'M16 21h5v-5'
      }))
    ),
    onHandle: async () => {
      // Create a component to handle the sync
      const SyncOrdersComponent = () => {
        const toast = useToast()
        const [isSyncing, setIsSyncing] = React.useState(false)

        // Perform the sync when the component mounts
        React.useEffect(() => {
          const doSync = async () => {
            try {
              // Get the current origin
              const origin = window.location.origin
              
              // Call the API endpoint to perform the sync
              const response = await fetch(`${origin}/api/admin/sync-orders`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              
              if (!response.ok) {
                throw new Error(`Sync failed with status ${response.status}`)
              }
              
              const result = await response.json()
              
              // Show a success toast
              toast.push({
                status: 'success',
                title: 'Orders synced successfully',
                description: `Created: ${result.created}, Updated: ${result.updated}, Errors: ${result.errors}`,
              })
            } catch (error) {
              console.error('Error syncing orders:', error)
              
              // Show an error toast
              toast.push({
                status: 'error',
                title: 'Order sync failed',
                description: error instanceof Error ? error.message : 'An unknown error occurred',
              })
            }
          }
          
          // Run the sync
          doSync()
        }, [toast])
        
        return null
      }
      
      // Return the component
      return {
        component: SyncOrdersComponent
      }
    }
  }
}

// Add default export
export default syncOrdersAction
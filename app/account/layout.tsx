'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { title } from "@/components/primitives";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={title({ size: 'sm' })}>My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="w-full md:w-64">
          <nav className="space-y-1">
            <Link 
              href="/account" 
              className="block px-3 py-2 rounded-md text-sm font-medium  hover:bg-gray-100 hover:text-gray-900"
            >
              Account Information
            </Link>
            <Link 
              href="/account/addresses" 
              className="block px-3 py-2 rounded-md text-sm font-medium  hover:bg-gray-100 hover:text-gray-900"
            >
              Shipping Addresses
            </Link>
            <Link 
              href="/account/orders" 
              className="block px-3 py-2 rounded-md text-sm font-medium  hover:bg-gray-100 hover:text-gray-900"
            >
              My Orders
            </Link>
            <Link 
              href="/account/notifications" 
              className="block px-3 py-2 rounded-md text-sm font-medium  hover:bg-gray-100 hover:text-gray-900"
            >
              Notifications
            </Link>
          </nav>
        </aside>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
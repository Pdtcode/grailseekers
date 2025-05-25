"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  // Handle Stripe redirect success or cancel query params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      clearCart();
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (canceled === "true") {
      alert("Payment was canceled. Please try again.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [clearCart]);

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mt-8 py-16 border border-gray-200 dark:border-gray-800 rounded-lg">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg inline-block transition hover:opacity-90"
            href="/cart"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }
}

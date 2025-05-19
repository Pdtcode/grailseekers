"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { title } from "@/components/primitives";
import { urlForImage } from "@/sanity/lib/image";
import { StripePaymentForm } from "@/components/stripe-payment-form";
import { getIdToken } from "firebase/auth";

type ShippingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

// Payment form data is now handled by Stripe Elements

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(false);
  // Payment info is now handled by Stripe Elements
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [shippingCost, setShippingCost] = useState<number>(0); // Free shipping by default
  const [taxRate, setTaxRate] = useState<number>(0.08); // 8% tax rate by default
  
  // Check for success or canceled URL parameters from Stripe redirect
  // Fetch saved addresses for logged-in users
  useEffect(() => {
    const fetchSavedAddresses = async () => {
      if (!user) {
        setLoadingAddresses(false);
        return;
      }
      
      try {
        setLoadingAddresses(true);
        const token = await getIdToken(user);
        const response = await fetch('/api/user/addresses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error loading addresses:', errorData);
          throw new Error(errorData.message || 'Failed to load addresses');
        }
        
        const addresses = await response.json();
        setSavedAddresses(addresses);
        
        // If there's a default address, select it
        const defaultAddress = addresses.find((addr: any) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
          applyAddressToForm(defaultAddress);
        }
      } catch (error) {
        console.error('Error loading saved addresses:', error);
        // We don't show the error in the checkout page to avoid disrupting the flow
        // Just continue with empty addresses
      } finally {
        setLoadingAddresses(false);
      }
    };
    
    fetchSavedAddresses();
  }, [user]);
  
  // Apply a selected address to the form
  const applyAddressToForm = (address: any) => {
    if (!address) return;
    
    // Try to split the name into first and last based on Space
    let firstName = '', lastName = '';
    
    if (user && user.displayName) {
      const nameParts = user.displayName.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    setShippingInfo({
      firstName: firstName,
      lastName: lastName,
      email: user?.email || '',
      address: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.postalCode,
      country: address.country === 'United States' ? 'US' : 
              address.country === 'United Kingdom' ? 'GB' : 
              address.country === 'Canada' ? 'CA' : 'US',
    });
  };
  
  useEffect(() => {
    // Get URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      // Payment was successful
      setCurrentStep('confirmation');
      // Clear the cart after successful payment
      clearCart();
      
      // Remove success parameter from URL to prevent confusion on refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else if (canceled === 'true') {
      // Payment was canceled
      alert('Payment was canceled. Please try again.');
      
      // Remove canceled parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [clearCart]);

  // Tax will be calculated by Stripe
  const [calculatedTax, setCalculatedTax] = useState<number>(0);
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);
  
  // Calculate tax based on cart total (fallback if Stripe tax not available)
  const calculateTax = () => {
    return calculatedTax || (getCartTotal() * taxRate);
  };

  // Calculate final total
  // We now just use the subtotal as the total
  const calculateTotal = () => {
    return getCartTotal();
  };

  // We no longer need to handle tax calculation
  const handleTaxCalculated = () => {
    // No-op - we no longer update tax and total from Stripe
  };
  
  // Add state for loading
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Handle the payment button click
  const handlePlaceOrder = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    // Get the stripe instance and elements
    const stripe = (window as any).stripeInstance;
    const elements = (window as any).stripeElements;
    
    if (!stripe || !elements) {
      setPaymentError("Payment system not initialized. Please refresh the page.");
      setIsProcessingPayment(false);
      return;
    }
    
    // Get card element
    const cardElement = elements.getElement('card');
    if (!cardElement) {
      setPaymentError("Card information not found. Please refresh and try again.");
      setIsProcessingPayment(false);
      return;
    }
    
    try {
      // Basic validation of the card data
      const { error: validateError } = await stripe.createToken(cardElement);
      if (validateError) {
        setPaymentError(validateError.message || 'Please check your card information.');
        setIsProcessingPayment(false);
        return;
      }
      
      // Show order summary to user
      console.log("Order Details:", {
        items: cart.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        subtotal: getCartTotal(),
        total: getCartTotal(),
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.zipCode}, ${shippingInfo.country}`
      });
      
      // 1. Create the payment intent on the server - this only happens when order is confirmed
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart.map(item => ({
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.mainImage ? urlForImage(item.product.mainImage).url() : undefined,
            description: item.product.description,
            variantId: item.variant?.id // Include variant ID if available
          })),
          shipping: {
            cost: shippingCost
          },
          metadata: {
            customer_email: shippingInfo.email,
            customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.zipCode}, ${shippingInfo.country}`,
            user_id: user?.uid || '' // Include Firebase UID if available
          }
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setPaymentError(data.error);
        setIsProcessingPayment(false);
        return;
      }
      
      // We no longer need to update tax calculation from the API response
      
      // 2. Confirm the payment with the client secret returned from the server
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
              email: shippingInfo.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.zipCode,
                country: shippingInfo.country,
              }
            },
          }
        }
      );
      
      if (error) {
        // Payment failed - show error
        setPaymentError(error.message || 'An error occurred while processing your payment.');
        setIsProcessingPayment(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded! Move to confirmation step
        setCurrentStep("confirmation");
        clearCart();
      } else {
        // Payment requires additional action - handle other payment statuses
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case 'processing':
              // Payment is still processing, show waiting screen
              setPaymentError('Your payment is processing. We\'ll update you when it completes.');
              break;
            case 'requires_action':
              // Customer needs to take additional action
              setPaymentError('Please complete the additional authentication steps required by your bank.');
              break;
            default:
              setPaymentError(`Unexpected payment status: ${paymentIntent.status}`);
          }
        } else {
          setPaymentError('Something went wrong with your payment. Please try again.');
        }
        setIsProcessingPayment(false);
      }
    } catch (e: any) {
      console.error("Payment error:", e);
      setPaymentError(e.message || 'An unexpected error occurred.');
      setIsProcessingPayment(false);
    }
  };

  // Handle shipping info changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Payment info changes are now handled by Stripe Elements

  // Handle shipping method change
  const handleShippingMethodChange = (method: "standard" | "express") => {
    setShippingMethod(method);
    if (method === "standard") {
      setShippingCost(0); // Free standard shipping
    } else {
      setShippingCost(15); // $15 for express shipping
    }
  };

  // Handle form submission for shipping step
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
  };

  // We've removed the handlePaymentSubmit function since we're now using Stripe Elements directly

  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mt-8 py-16 border border-gray-200 dark:border-gray-800 rounded-lg">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/cart"
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg inline-block transition hover:opacity-90"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }

  // Order confirmation screen
  if (currentStep === "confirmation") {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className={title({ size: "lg", className: "mb-8 text-center" }).toString()}>
          Order Confirmation
        </h1>
        <div className="max-w-2xl mx-auto text-center py-16 border border-gray-200 dark:border-gray-800 rounded-lg">
          <div className="mb-6">
            <svg 
              className="w-16 h-16 mx-auto text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-4">Thank you for your order!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Your order has been received and is being processed.
            You will receive an email confirmation shortly.
          </p>
          <p className="font-medium mb-6">
            Order Total: ${getCartTotal().toFixed(2)}
          </p>
          <Link
            href="/store"
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg inline-block transition hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={title({ size: "lg", className: "mb-8" }).toString()}>
        Checkout
      </h1>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === "shipping" || currentStep === "payment" || currentStep === "confirmation" 
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}>
            1
          </div>
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700">
            <div className={`h-full ${
              currentStep === "payment" || currentStep === "confirmation" 
                ? "bg-gray-900 dark:bg-gray-100" 
                : "bg-gray-200 dark:bg-gray-700"
            }`}></div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === "payment" || currentStep === "confirmation" 
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}>
            2
          </div>
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700">
            <div className={`h-full ${
              currentStep === "confirmation" 
                ? "bg-gray-900 dark:bg-gray-100" 
                : "bg-gray-200 dark:bg-gray-700"
            }`}></div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === "confirmation" 
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}>
            3
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Form */}
        <div className="lg:col-span-2">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            {/* Shipping Info Form */}
            {currentStep === "shipping" && (
              <form onSubmit={handleShippingSubmit}>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                {/* Saved Addresses Selection for logged-in users */}
                {user && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Saved Addresses</h3>
                    {loadingAddresses ? (
                      <p className="text-sm text-gray-500">Loading your saved addresses...</p>
                    ) : savedAddresses.length > 0 ? (
                      <div className="space-y-3">
                        {savedAddresses.map((address) => (
                          <div 
                            key={address.id} 
                            className={`border p-3 rounded-md cursor-pointer ${
                              selectedAddressId === address.id 
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900' 
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                            onClick={() => {
                              setSelectedAddressId(address.id);
                              applyAddressToForm(address);
                            }}
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">{address.street}</p>
                                <p>{address.city}, {address.state} {address.postalCode}</p>
                                <p>{address.country}</p>
                              </div>
                              {address.isDefault && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        <p className="text-sm text-gray-500 mt-2">
                          Select an address above or enter a new one below
                        </p>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">You don&apos;t have any saved addresses.</p>
                        {user && (
                          <Link href="/account/addresses" className="text-sm text-indigo-600 hover:text-indigo-800">
                            Manage your addresses
                          </Link>
                        )}
                      </div>
                    )}
                    
                    {user && (
                      <div className="mt-3">
                        <Link href="/account/addresses" className="text-sm text-indigo-600 hover:text-indigo-800">
                          Manage your addresses
                        </Link>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-6 mb-3">Shipping Method</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="standard"
                      name="shippingMethod"
                      checked={shippingMethod === "standard"}
                      onChange={() => handleShippingMethodChange("standard")}
                      className="mr-2"
                    />
                    <label htmlFor="standard" className="flex-1">
                      <div className="font-medium">Standard Shipping (Free)</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Delivery in 5-7 business days
                      </div>
                    </label>
                    <div className="font-medium">$0.00</div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="express"
                      name="shippingMethod"
                      checked={shippingMethod === "express"}
                      onChange={() => handleShippingMethodChange("express")}
                      className="mr-2"
                    />
                    <label htmlFor="express" className="flex-1">
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Delivery in 1-3 business days
                      </div>
                    </label>
                    <div className="font-medium">$15.00</div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Link
                    href="/cart"
                    className="text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    Return to Cart
                  </Link>
                  <button
                    type="submit"
                    className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg transition hover:opacity-90"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {/* Payment Info Form with Stripe */}
            {currentStep === "payment" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Enter your card details below:
                  </p>
                  
                  <StripePaymentForm 
                    onReady={(stripe, elements) => {
                      // Store Stripe objects for use in handlePlaceOrder
                      (window as any).stripeInstance = stripe;
                      (window as any).stripeElements = elements;
                    }}
                  />
                  
                  <div className="pt-6">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessingPayment}
                      className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg transition hover:opacity-90 w-full disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium"
                    >
                      {isProcessingPayment ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                  
                  {paymentError && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                      {paymentError}
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("shipping")}
                    className="text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    Back to Shipping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.product._id} className="flex mb-3 pb-3 border-b border-gray-200 dark:border-gray-800">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    {item.product.mainImage && (
                      <Image
                        fill
                        alt={item.product.name}
                        className="object-cover"
                        src={urlForImage(item.product.mainImage).url() || ""}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
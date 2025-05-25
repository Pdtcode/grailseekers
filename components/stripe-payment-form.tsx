"use client";

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

// Simple Card Entry Form component that uses CardElement
const CardEntryForm = () => {
  return (
    <div className="mt-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
          hidePostalCode: false,
        }}
      />
    </div>
  );
};

// Stripe Elements Provider
const StripeElementsContext = ({
  onReady,
}: {
  onReady: (stripe: any, elements: any) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  // Pass the stripe instance up to parent when it's available
  useEffect(() => {
    if (stripe && elements) {
      onReady(stripe, elements);
    }
  }, [stripe, elements, onReady]);

  return <CardEntryForm />;
};

// Main exported component
export const StripePaymentForm = ({
  onReady,
}: {
  onReady: (stripe: any, elements: any) => void;
}) => {
  const options = {
    mode: "setup" as const,
    currency: "usd",
    appearance: {
      theme: "stripe" as const,
    },
    loader: "auto" as const,
  };

  return (
    <div className="mt-4">
      <Elements options={options} stripe={stripePromise}>
        <StripeElementsContext onReady={onReady} />
      </Elements>

      {/* Show test cards in development */}
      {process.env.NODE_ENV !== "production" && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
          <h3 className="font-medium mb-2">Test Cards:</h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              💳 Success: <code>4242 4242 4242 4242</code>
            </li>
            <li>
              ❌ Decline: <code>4000 0000 0000 0002</code>
            </li>
            <li>
              Use any future date, any 3 digits for CVC, and any postal code.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

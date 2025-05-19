# Stripe Payment Integration

This document describes how to set up Stripe payments for the GrailSeekers e-commerce platform.

## Setup Instructions

### 1. Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```

You can obtain these keys from your Stripe Dashboard:
- Go to [Stripe Dashboard](https://dashboard.stripe.com/)
- Navigate to Developers > API keys
- Copy your publishable and secret keys

### 2. Setting Up Stripe Webhooks

Webhooks are essential for syncing your database with successful payments. To set up webhooks:

#### Development Environment

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Authenticate the CLI by running:
   ```
   stripe login
   ```
3. Start forwarding events to your local webhook endpoint:
   ```
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
4. The CLI will output a webhook signing secret. Copy this and add it to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`.

#### Production Environment

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/) > Developers > Webhooks
2. Click "Add Endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select the events to listen for:
   - `payment_intent.succeeded`
   - `checkout.session.completed`
5. After creating, reveal and copy the signing secret and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`.

### 3. Testing the Webhook

To verify your webhook setup is working correctly:

1. Make a test purchase on your site
2. Check the Stripe CLI output (development) or Stripe Dashboard > Webhooks (production) to see if the event was received
3. Verify that an order was created in your database after payment

## How Payments Work

The payment flow in GrailSeekers works as follows:

1. Customer adds items to their cart and proceeds to checkout
2. At checkout, the customer enters shipping and payment information
3. When they click "Pay Now":
   - A Stripe Payment Intent is created with all order details stored in metadata
   - The customer's card is charged via Stripe
4. Stripe processes the payment and sends a webhook event if successful
5. Our webhook handler receives the event and:
   - Creates a new order in the database
   - Records all order items
   - Updates product inventory
   - Links the order to the user's account

This ensures that your database stays in sync with all successful payments.

## Troubleshooting

If orders aren't being created after successful payments:

1. Check that your webhook is correctly configured and receiving events
2. Verify that your `STRIPE_WEBHOOK_SECRET` is correct
3. Look for errors in your server logs related to webhook processing
4. Ensure that the metadata in your Payment Intent contains all necessary information

For more assistance, refer to [Stripe's webhook documentation](https://stripe.com/docs/webhooks).
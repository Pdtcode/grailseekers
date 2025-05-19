# Sanity CMS to Database Synchronization

This document explains how the GrailSeekers platform keeps product data synchronized between Sanity CMS and the PostgreSQL database.

## Overview

When products are created, updated, or deleted in Sanity CMS, these changes need to be reflected in the database. This sync happens through:

1. **Webhooks**: Sanity sends real-time notifications when content changes
2. **Scheduled Sync**: A periodic full sync to ensure database and CMS are in sync
3. **Manual Sync**: An API endpoint that can be called to force synchronization

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```
SANITY_WEBHOOK_SECRET=your_sanity_webhook_secret
API_SYNC_KEY=your_api_key_for_manual_sync
```

### 2. Setting Up Sanity Webhooks

To configure Sanity to notify your application when content changes:

1. Go to your Sanity project dashboard: `https://manage.sanity.io/projects/[your-project-id]`
2. Navigate to API > Webhooks
3. Create a new webhook:
   - Name: "Product Sync"
   - URL: `https://yourdomain.com/api/webhooks/sanity`
   - Dataset: Choose your dataset (usually "production")
   - Filter: `_type == "product"` (to only trigger on product changes)
   - Projection: (leave blank for full document)
   - Secret: Generate a random string and save it as `SANITY_WEBHOOK_SECRET` in your env variables

### 3. Setting Up Scheduled Sync

To ensure complete synchronization, set up a scheduled task (cron job) to run a full sync periodically:

#### Using a Cron Service (e.g., GitHub Actions, Vercel Cron):

Example GitHub Actions workflow:

```yaml
name: Sync Sanity Products

on:
  schedule:
    - cron: '0 */6 * * *' # Run every 6 hours

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Product Sync
        run: |
          curl -X GET "https://yourdomain.com/api/sync/products?apiKey=${{ secrets.API_SYNC_KEY }}"
```

#### Using Traditional Cron (server):

```
0 */6 * * * curl -X GET "https://yourdomain.com/api/sync/products?apiKey=your_api_key" > /dev/null 2>&1
```

## How It Works

### Product Data Flow

1. **Content Creation/Update in Sanity:**
   - Product is created or updated in Sanity CMS
   - Sanity webhook triggers a notification to `/api/webhooks/sanity`
   - The application syncs the specific product to the database

2. **Scheduled Full Sync:**
   - At scheduled intervals, a full sync runs
   - All products from Sanity are compared with the database
   - Products are created, updated, or deleted in the database as needed

3. **Manual Sync:**
   - The API endpoint `/api/sync/products` can be called with an API key
   - This forces a full sync of all products

### Data Transformation

The synchronization process:

1. Fetches products from Sanity
2. Transforms Sanity data model to match database schema
3. Handles image URLs and references
4. Creates or updates database records
5. Manages product variants

## Troubleshooting

If products aren't syncing correctly:

1. **Check Webhooks:** Verify that Sanity webhooks are configured correctly and sending data
   - In Sanity dashboard, check webhook logs for delivery status
   - Review your application logs for webhook receipt

2. **Manual Sync:** Try triggering a manual sync to force update
   ```
   curl -X GET "https://yourdomain.com/api/sync/products?apiKey=your_api_key&force=true"
   ```

3. **Data Discrepancies:** If specific products aren't syncing correctly:
   - Check Sanity document structure for consistency
   - Ensure required fields (name, slug, price) are populated
   - Review application logs for sync errors

## Resources

- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Setting up cron jobs in Vercel](https://vercel.com/docs/cron-jobs)
- [GitHub Actions Scheduled Events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
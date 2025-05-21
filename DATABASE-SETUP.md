# Database Setup Guide

## Fixing the "password authentication failed" error

If you're encountering the error: "Error querying the database: ERROR: password authentication failed for user 'grailseekers_owner'", follow these steps to resolve it:

1. **Get new database credentials from Neon**

   - Log in to [Neon Dashboard](https://console.neon.tech/)
   - Select your project (grailseekers)
   - Go to the "Connection Details" section
   - Under "Connection String", click "Get Password" to view your password
   - Copy the entire connection string

2. **Update your .env file**

   Open your `.env` file and update the DATABASE_URL variable:

   ```
   DATABASE_URL='postgresql://grailseekers_owner:your_new_password@ep-green-queen-a89na87e.eastus2.azure.neon.tech/grailseekers?sslmode=require'
   ```

   Make sure to:
   - Replace `your_new_password` with the actual new password
   - Note that we're using a direct connection (no "-pooler" in the hostname)
   - Keep the sslmode=require parameter

3. **Restart your application**

   After updating the connection string:

   ```bash
   npm run dev
   ```

## Connection Troubleshooting

If you continue to have connection issues:

1. **Try direct connection**
   - Remove "-pooler" from the hostname in your connection string
   - This connects directly to the database instead of using the connection pooler

2. **Check Neon project status**
   - Go to your Neon dashboard to verify the project is active
   - Make sure your IP is not blocked by any database access rules

3. **Test connection with psql**
   - If you have PostgreSQL installed, test with:
   ```
   psql "postgresql://grailseekers_owner:your_password@ep-green-queen-a89na87e.eastus2.azure.neon.tech/grailseekers?sslmode=require"
   ```

4. **Reset the password**
   - In the Neon dashboard, you can reset the password for the `grailseekers_owner` role
   - Update your .env file with the new password
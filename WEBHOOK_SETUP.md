# Clerk Webhook Setup Guide

This guide will help you set up Clerk webhooks to automatically sync user data to your Supabase `users` table.

## Overview

The system now includes two methods to automatically create user records:

1. **Webhook-based sync** (Recommended) - Automatically creates users when they sign up
2. **Client-side sync** (Backup) - Creates users when they log in if they don't exist

## Step 1: Get Your Webhook Secret

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Webhooks** in the sidebar
3. Click **Add Endpoint**
4. Set the following:
   - **Endpoint URL**: `https://yourdomain.com/api/webhook/clerk` (replace with your actual domain)
   - **Version**: Select the latest version
   - **Events**: Select the following events:
     - `user.created`
     - `user.updated`
     - `user.deleted`
5. Click **Add Endpoint**
6. Copy the **Signing Secret** (you'll need this for the environment variable)

## Step 2: Add Environment Variable

Add the webhook secret to your `.env.local` file:

```env
# Clerk Webhook Secret
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 3: Deploy Your Application

Make sure your application is deployed and accessible at the webhook URL you specified.

## Step 4: Test the Webhook

### Test with a New User Signup

1. Go to your application
2. Sign up with a new email address
3. Check your application logs for webhook events
4. Verify the user was created in your Supabase `users` table

### Test with Existing User Login

1. Sign in with an existing user
2. The `UserSync` component will automatically check if the user exists in your database
3. If not, it will create the user record

## How It Works

### Webhook Handler (`/api/webhook/clerk`)

The webhook handler processes the following events:

- **`user.created`**: Creates a new user record in your Supabase `users` table
- **`user.updated`**: Updates the user record if it exists, or creates it if it doesn't
- **`user.deleted`**: Logs the deletion (you can implement actual deletion if needed)

### Client-Side Sync (`UserSync` component)

The `UserSync` component runs on every page load and:

1. Checks if the current user exists in your database
2. If not, creates a new user record
3. This serves as a backup in case webhooks fail

## Environment Variables

Make sure you have all these environment variables set:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Clerk Webhook
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### Webhook Not Working

1. **Check webhook URL**: Make sure your webhook URL is correct and accessible
2. **Verify secret**: Ensure the `CLERK_WEBHOOK_SECRET` matches the one in your Clerk dashboard
3. **Check logs**: Look at your application logs for webhook errors
4. **Test locally**: Use ngrok to test webhooks locally

### User Not Created

1. **Check Supabase connection**: Verify your Supabase credentials are correct
2. **Check database permissions**: Ensure your Supabase user has INSERT permissions
3. **Check table structure**: Verify your `users` table has the correct columns
4. **Check client-side sync**: The `UserSync` component should create users as a backup

### Testing Locally with ngrok

1. Install ngrok: `npm install -g ngrok`
2. Start your development server: `npm run dev`
3. In another terminal, run: `ngrok http 3000`
4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. Set your webhook URL in Clerk to: `https://abc123.ngrok.io/api/webhook/clerk`

## Database Schema

Make sure your Supabase `users` table has this structure:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Considerations

1. **Webhook verification**: The webhook handler verifies the signature to ensure requests come from Clerk
2. **Environment variables**: Keep your webhook secret secure and never commit it to version control
3. **Error handling**: The system includes comprehensive error handling and logging
4. **Duplicate prevention**: The system checks for existing users before creating new ones

## Monitoring

You can monitor webhook activity by:

1. **Application logs**: Check your application logs for webhook events
2. **Clerk dashboard**: View webhook delivery status in your Clerk dashboard
3. **Database queries**: Check your Supabase `users` table for new records

## Production Deployment

When deploying to production:

1. Update your webhook URL to your production domain
2. Set production environment variables
3. Test the webhook with a new user signup
4. Monitor logs for any issues

## Fallback Strategy

If webhooks fail for any reason, the client-side `UserSync` component will:

1. Check if the user exists in your database on every page load
2. Create the user if they don't exist
3. This ensures users are always synced, even if webhooks are temporarily down

This dual approach ensures reliable user synchronization between Clerk and your Supabase database. 
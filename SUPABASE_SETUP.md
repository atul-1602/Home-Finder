# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Update the `.env.local` file with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-setup.sql`
3. Paste it into the SQL editor and click **Run**
4. This will create the `properties` table with sample data

## Step 4: Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see a `properties` table with 12 sample properties
3. The table should have all the columns: id, title, price, type, etc.

## Step 5: Test the Application

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit your application - it should now load properties from Supabase

## Troubleshooting

### If you get "relation does not exist" error:
- Make sure you've run the SQL script in Step 3
- Check that your environment variables are correct
- Restart your development server after updating `.env.local`

### If you get authentication errors:
- Make sure you're using the **anon key** (not the service role key)
- Check that Row Level Security (RLS) policies are set up correctly

### If images don't load:
- The sample data uses placeholder image paths
- You can upload real images to your Supabase storage or use external URLs

## Database Schema

The `properties` table has the following columns:

- `id` - Primary key (auto-increment)
- `title` - Property title
- `price` - Monthly rent price
- `type` - Property type (Apartment, Villa, Flat, etc.)
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `area` - Area in square feet
- `image_url` - Property image URL
- `furnishing` - Furnishing status
- `availability` - Availability status
- `amenities` - Comma-separated list of amenities
- `description` - Property description
- `contact_name` - Contact person name
- `contact_phone` - Contact phone number
- `posted_date` - When the property was posted
- `is_featured` - Whether the property is featured
- `tags` - Comma-separated tags
- `created_at` - Record creation timestamp
- `updated_at` - Record update timestamp 
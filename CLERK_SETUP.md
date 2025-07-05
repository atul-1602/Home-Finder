# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for your HomeFinder project.

## Prerequisites

- A Clerk account (sign up at [clerk.com](https://clerk.com))
- Your Next.js project with Clerk package installed

## Step 1: Create a Clerk Application

1. Go to [clerk.com](https://clerk.com) and sign up/login
2. Create a new application
3. Choose "Next.js" as your framework
4. Give your application a name (e.g., "HomeFinder")

## Step 2: Configure Environment Variables

1. In your Clerk dashboard, go to the "API Keys" section
2. Copy your **Publishable Key** and **Secret Key**
3. Update your `.env.local` file with the actual keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Step 3: Configure Clerk Settings

### Authentication Methods
1. In your Clerk dashboard, go to "User & Authentication" → "Email, Phone, Username"
2. Enable the authentication methods you want:
   - Email address
   - Phone number (optional)
   - Username (optional)

### Social Connections (Optional)
1. Go to "User & Authentication" → "Social Connections"
2. Enable social providers like:
   - Google
   - GitHub
   - Facebook
   - etc.

### Appearance Customization
1. Go to "Appearance" in your Clerk dashboard
2. Customize the look and feel of your authentication forms
3. You can also customize the appearance in the code using the `appearance` prop

## Step 4: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your application and test:
   - Sign up functionality
   - Sign in functionality
   - User profile management
   - Protected routes (dashboard, profile)

## Step 5: Customize Authentication Flow

### Protected Routes
The following routes are protected and require authentication:
- `/dashboard` - User dashboard
- `/profile` - User profile management

### Public Routes
The following routes are public and don't require authentication:
- `/` - Home page
- `/pricing` - Pricing page
- `/about` - About page
- `/contact` - Contact page
- `/findhome` - Property search
- `/property/*` - Property details

## Step 6: Production Deployment

### Environment Variables for Production
Make sure to update your production environment variables with production Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_publishable_key
CLERK_SECRET_KEY=sk_live_your_production_secret_key
```

### Webhook Configuration (Optional)
If you need webhooks for user events:
1. Go to "Webhooks" in your Clerk dashboard
2. Add your webhook endpoint (e.g., `https://yourdomain.com/api/webhook/clerk`)
3. Select the events you want to listen to

## Features Included

### Authentication Components
- **SignInButton**: Modal-based sign-in button in the navbar
- **SignUpButton**: Modal-based sign-up button in the navbar
- **UserButton**: User profile dropdown with account management
- **SignIn**: Full-page sign-in form at `/sign-in`
- **SignUp**: Full-page sign-up form at `/sign-up`
- **UserProfile**: User profile management at `/profile`

### User Experience
- Responsive design that works on mobile and desktop
- Custom styling that matches your application theme
- Automatic redirects after authentication
- User-friendly error messages
- Loading states and animations

### Security Features
- Route protection with middleware
- Secure session management
- CSRF protection
- Rate limiting (handled by Clerk)

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Make sure your `.env.local` file is in the root directory
   - Restart your development server after adding environment variables

2. **Authentication not working**
   - Check that your Clerk keys are correct
   - Verify that your domain is allowed in Clerk settings
   - Check the browser console for errors

3. **Styling issues**
   - The authentication components use Tailwind CSS classes
   - Make sure Tailwind CSS is properly configured
   - You can customize the appearance using the `appearance` prop

### Getting Help

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord Community](https://discord.gg/clerk)
- [Clerk Support](https://clerk.com/support)

## Next Steps

After setting up Clerk authentication, you can:

1. **Add user-specific features**:
   - Save favorite properties
   - Track search history
   - Personalize recommendations

2. **Implement role-based access**:
   - Different features for buyers vs. sellers
   - Admin dashboard for property managers

3. **Add social features**:
   - User reviews and ratings
   - Property sharing
   - User messaging

4. **Integrate with your database**:
   - Store user preferences
   - Save user-generated content
   - Track user activity 
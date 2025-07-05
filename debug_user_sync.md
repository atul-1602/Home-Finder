# Debugging User Sync Issues

If users aren't being created in your Supabase database, follow these steps:

## 1. Check Environment Variables

Make sure these are set in your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 2. Verify Supabase Connection

Test if your Supabase connection is working:

1. Go to `/test-users`
2. Try creating a user manually
3. Check browser console for errors

## 3. Check Database Permissions

Make sure your Supabase user has INSERT permissions:

1. Go to Supabase Dashboard → Authentication → Policies
2. Check if the `users` table has proper policies
3. For testing, you can temporarily disable RLS

## 4. Test API Endpoints

Test the API directly:

```bash
# Test user creation
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "clerk_id": "test_user_123",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User"
  }'

# Test getting users
curl http://localhost:3000/api/users
```

## 5. Check Browser Console

1. Open browser developer tools
2. Go to Console tab
3. Look for any error messages
4. Check Network tab for failed API calls

## 6. Check Server Logs

Look at your terminal where you're running `npm run dev` for any error messages.

## 7. Common Issues

### Issue: "Table 'users' does not exist"
**Solution**: Create the users table using the SQL script provided

### Issue: "Permission denied"
**Solution**: Check Supabase policies or temporarily disable RLS

### Issue: "Invalid API key"
**Solution**: Verify your Supabase environment variables

### Issue: "Clerk not configured"
**Solution**: Check your Clerk environment variables

## 8. Manual Test

Try this in your browser console on `/test-sync`:

```javascript
// Test if the API functions are working
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clerk_id: 'test_' + Date.now(),
    email: 'test' + Date.now() + '@example.com',
    first_name: 'Test',
    last_name: 'User'
  })
}).then(r => r.json()).then(console.log);
```

## 9. Reset and Retry

If nothing works:

1. Stop your development server
2. Delete the `.next` folder: `rm -rf .next`
3. Restart: `npm run dev`
4. Try again

## 10. Contact Support

If you're still having issues, check:
- Supabase logs in the dashboard
- Clerk webhook delivery status
- Browser network requests
- Server console output 
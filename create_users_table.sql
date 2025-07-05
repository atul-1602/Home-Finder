-- Create users table for Home-Finder application
-- This table will store user data synced from Clerk authentication

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Add comments for documentation
COMMENT ON TABLE users IS 'User accounts synced from Clerk authentication';
COMMENT ON COLUMN users.id IS 'Unique identifier for the user record';
COMMENT ON COLUMN users.clerk_id IS 'Clerk user ID (unique identifier from Clerk)';
COMMENT ON COLUMN users.email IS 'User email address (unique)';
COMMENT ON COLUMN users.first_name IS 'User first name';
COMMENT ON COLUMN users.last_name IS 'User last name';
COMMENT ON COLUMN users.created_at IS 'Timestamp when the user record was created';

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = clerk_id);

-- Create policy to allow service role to manage all users (for webhooks)
CREATE POLICY "Service role can manage all users" ON users
  FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO service_role; 
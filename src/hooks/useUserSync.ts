import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createUser, getUserByClerkId } from '../lib/api';

export function useUserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUserToDatabase = async () => {
      try {
        const clerkId = user.id;
        const email = user.primaryEmailAddress?.emailAddress;
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';

        if (!email) {
          console.error('No primary email found for user:', clerkId);
          return;
        }

        // Check if user already exists in our database
        const existingUser = await getUserByClerkId(clerkId);
        
        if (existingUser) {
          return; // User already exists
        }

        // Create new user in our database
        const newUser = await createUser({
          clerk_id: clerkId,
          email,
          first_name: firstName,
          last_name: lastName
        });

        if (!newUser) {
          console.error('Failed to sync user to database:', clerkId);
        }
      } catch (error) {
        console.error('Error syncing user to database:', error);
      }
    };

    // Sync user data when component mounts and user is loaded
    syncUserToDatabase();
  }, [user, isLoaded]);

  return { user, isLoaded };
} 
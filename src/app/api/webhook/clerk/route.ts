import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, getUserByClerkId, updateUser } from '../../../../lib/api';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  // Handle the webhook
  switch (eventType) {
    case 'user.created':
      await handleUserCreated(evt.data);
      break;
    case 'user.updated':
      await handleUserUpdated(evt.data);
      break;
    case 'user.deleted':
      await handleUserDeleted(evt.data);
      break;
    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  return new Response('Webhook processed successfully', { status: 200 });
}

async function handleUserCreated(userData: any) {
  try {
    console.log('Handling user.created event:', userData);
    
    const { id: clerk_id, email_addresses, first_name, last_name } = userData;
    
    // Get the primary email
    const primaryEmail = email_addresses?.find((email: any) => email.id === userData.primary_email_address_id);
    const email = primaryEmail?.email_address;

    if (!email) {
      console.error('No primary email found for user:', clerk_id);
      return;
    }

    // Check if user already exists in our database
    const existingUser = await getUserByClerkId(clerk_id);
    
    if (existingUser) {
      console.log('User already exists in database:', clerk_id);
      return;
    }

    // Create new user in our database
    const newUser = await createUser({
      clerk_id,
      email,
      first_name: first_name || '',
      last_name: last_name || ''
    });

    if (newUser) {
      console.log('Successfully created user in database:', newUser);
    } else {
      console.error('Failed to create user in database:', clerk_id);
    }
  } catch (error) {
    console.error('Error handling user.created event:', error);
  }
}

async function handleUserUpdated(userData: any) {
  try {
    console.log('Handling user.updated event:', userData);
    
    const { id: clerk_id, email_addresses, first_name, last_name } = userData;
    
    // Get the primary email
    const primaryEmail = email_addresses?.find((email: any) => email.id === userData.primary_email_address_id);
    const email = primaryEmail?.email_address;

    if (!email) {
      console.error('No primary email found for user:', clerk_id);
      return;
    }

    // Check if user exists in our database
    const existingUser = await getUserByClerkId(clerk_id);
    
    if (!existingUser) {
      console.log('User not found in database, creating new user:', clerk_id);
      // Create new user if they don't exist
      await createUser({
        clerk_id,
        email,
        first_name: first_name || '',
        last_name: last_name || ''
      });
      return;
    }

    // Update existing user
    const updatedUser = await updateUser(existingUser.id, {
      email,
      first_name: first_name || '',
      last_name: last_name || ''
    });

    if (updatedUser) {
      console.log('Successfully updated user in database:', updatedUser);
    } else {
      console.error('Failed to update user in database:', clerk_id);
    }
  } catch (error) {
    console.error('Error handling user.updated event:', error);
  }
}

async function handleUserDeleted(userData: any) {
  try {
    console.log('Handling user.deleted event:', userData);
    
    const { id: clerk_id } = userData;
    
    // Check if user exists in our database
    const existingUser = await getUserByClerkId(clerk_id);
    
    if (!existingUser) {
      console.log('User not found in database for deletion:', clerk_id);
      return;
    }

    // Note: You might want to implement soft delete instead of hard delete
    // For now, we'll just log the deletion
    console.log('User deleted from Clerk, consider handling in database:', clerk_id);
    
    // If you want to actually delete the user from your database, uncomment this:
    // const success = await deleteUser(existingUser.id);
    // if (success) {
    //   console.log('Successfully deleted user from database:', clerk_id);
    // } else {
    //   console.error('Failed to delete user from database:', clerk_id);
    // }
  } catch (error) {
    console.error('Error handling user.deleted event:', error);
  }
} 
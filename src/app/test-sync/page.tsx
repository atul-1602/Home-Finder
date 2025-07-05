'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { getUserByClerkId } from '../../lib/api';

export default function TestSyncPage() {
  const { user, isLoaded } = useUser();
  const [userInDatabase, setUserInDatabase] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkUserInDatabase = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const dbUser = await getUserByClerkId(user.id);
      setUserInDatabase(dbUser);
    } catch (error) {
      console.error('Error checking user in database:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      checkUserInDatabase();
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Sync Test</h1>
          <p className="text-gray-600">Please sign in to test user synchronization.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Sync Test</h1>
        
        {/* Clerk User Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Clerk User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Clerk ID</label>
              <p className="text-sm text-gray-900">{user.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-sm text-gray-900">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <p className="text-sm text-gray-900">{user.firstName || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <p className="text-sm text-gray-900">{user.lastName || 'Not set'}</p>
            </div>
          </div>
        </div>

        {/* Database Sync Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Database Sync Status</h2>
            <button
              onClick={checkUserInDatabase}
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Checking database...</p>
            </div>
          ) : userInDatabase ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">User Found in Database</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p><strong>Database ID:</strong> {userInDatabase.id}</p>
                    <p><strong>Email:</strong> {userInDatabase.email}</p>
                    <p><strong>Name:</strong> {userInDatabase.first_name} {userInDatabase.last_name}</p>
                    <p><strong>Created:</strong> {new Date(userInDatabase.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">User Not Found in Database</h3>
                  <p className="mt-2 text-sm text-yellow-700">
                    The user exists in Clerk but not in your Supabase database. 
                    This might happen if webhooks are not configured or if there was an error during sync.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">How to Test</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>1. <strong>Webhook Test:</strong> Sign up with a new email address and check if the user appears in the database</p>
            <p>2. <strong>Client-side Sync Test:</strong> If a user is not in the database, refresh this page to trigger client-side sync</p>
            <p>3. <strong>Manual Check:</strong> Use the "Refresh" button to manually check the database status</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
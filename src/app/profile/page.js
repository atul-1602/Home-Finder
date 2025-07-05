'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState('personal');
  const router = useRouter();

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkEnabled = publishableKey && publishableKey !== 'pk_test_placeholder';

  // Redirect to sign-in if not authenticated
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  if (!isClerkEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your Profile</h1>
            <p className="text-neutral-600">Manage your account settings and preferences</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Authentication Not Configured</h3>
              <p className="text-neutral-600 mb-4">
                Clerk authentication is not configured yet.
              </p>
              <p className="text-sm text-neutral-500">
                Please configure your Clerk API keys in the .env.local file to enable profile management.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-neutral-200 rounded-lg w-64 mx-auto mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-96 mx-auto mb-8"></div>
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'activity', label: 'Activity', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={user?.firstName || 'User'} 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {user?.firstName?.charAt(0)?.toUpperCase() || user?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Your Profile'}
          </h1>
          <p className="text-neutral-600 text-lg">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-primary text-white shadow-lg transform scale-105'
                  : 'bg-white/60 text-neutral-700 hover:bg-white/80 hover:shadow-md'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
          {activeTab === 'personal' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">👤</span>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                    <p className="text-lg font-semibold text-neutral-900">
                      {user?.firstName || 'Not provided'}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-secondary-50 to-accent-50 p-6 rounded-xl border border-secondary-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                    <p className="text-lg font-semibold text-neutral-900">
                      {user?.lastName || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-xl border border-accent-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                    <p className="text-lg font-semibold text-neutral-900">
                      {user?.emailAddresses[0]?.emailAddress || 'Not provided'}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-primary-50 p-6 rounded-xl border border-purple-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">User ID</label>
                    <p className="text-sm font-mono text-neutral-600 break-all">
                      {user?.id || 'Not available'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-success-50 to-warning-50 p-6 rounded-xl border border-success-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">📅</span>
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Created</label>
                    <p className="text-neutral-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Last Updated</label>
                    <p className="text-neutral-900">
                      {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800">
                      <span className="w-2 h-2 bg-success-500 rounded-full mr-2"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">🔒</span>
                Security Settings
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-warning-50 to-accent-50 p-6 rounded-xl border border-warning-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-neutral-600 mb-4">Add an extra layer of security to your account</p>
                  <button className="bg-gradient-warning text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Enable 2FA
                  </button>
                </div>

                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Password</h3>
                  <p className="text-neutral-600 mb-4">Update your password regularly for better security</p>
                  <button className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Change Password
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-primary-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Active Sessions</h3>
                  <p className="text-neutral-600 mb-4">Manage your active login sessions</p>
                  <button className="bg-gradient-purple text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">⚙️</span>
                Preferences
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-success-50 to-primary-50 p-6 rounded-xl border border-success-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-3 text-neutral-700">Property alerts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-3 text-neutral-700">Market updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-3 text-neutral-700">Newsletter</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent-50 to-secondary-50 p-6 rounded-xl border border-accent-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Search Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Default Location</label>
                      <input type="text" placeholder="Enter your preferred location" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Price Range</label>
                      <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>Any price</option>
                        <option>$100k - $200k</option>
                        <option>$200k - $300k</option>
                        <option>$300k - $500k</option>
                        <option>$500k+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">📊</span>
                Activity Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-100 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">12</div>
                  <div className="text-neutral-700">Properties Viewed</div>
                </div>
                <div className="bg-gradient-to-r from-success-50 to-primary-50 p-6 rounded-xl border border-success-100 text-center">
                  <div className="text-3xl font-bold text-success-600 mb-2">5</div>
                  <div className="text-neutral-700">Favorites Saved</div>
                </div>
                <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-xl border border-accent-100 text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">8</div>
                  <div className="text-neutral-700">Searches Made</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-neutral-50 to-primary-50 p-6 rounded-xl border border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-900 font-medium">Added property to favorites</p>
                      <p className="text-sm text-neutral-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-900 font-medium">Searched for properties in Downtown</p>
                      <p className="text-sm text-neutral-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-900 font-medium">Viewed property details</p>
                      <p className="text-sm text-neutral-600">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 
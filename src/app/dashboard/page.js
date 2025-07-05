'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkEnabled = publishableKey && publishableKey !== 'pk_test_placeholder';

  // Fetch user favorites count
  const fetchUserFavoritesCount = async () => {
    try {
      const response = await fetch('/api/users/favorites');
      const result = await response.json();
      
      if (result.success) {
        setFavoritesCount(result.data.length);
      }
    } catch (error) {
      console.error('Error fetching favorites count:', error);
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user && isLoaded) {
      fetchUserFavoritesCount();
    }
  }, [user, isLoaded]);

  // Redirect to sign-in if not authenticated
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  if (!isClerkEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
            <p className="text-neutral-600">Welcome to your HomeFinder dashboard</p>
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
                Please configure your Clerk API keys in the .env.local file to enable dashboard features.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-neutral-200 rounded-lg w-64 mx-auto mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Favorites', value: favoritesCount, icon: '❤️', color: 'from-red-50 to-pink-50', textColor: 'text-red-600' },
    { label: 'Properties Viewed', value: 12, icon: '👁️', color: 'from-blue-50 to-indigo-50', textColor: 'text-blue-600' },
    { label: 'Searches Made', value: 8, icon: '🔍', color: 'from-green-50 to-emerald-50', textColor: 'text-green-600' },
    { label: 'Alerts Set', value: 3, icon: '🔔', color: 'from-yellow-50 to-amber-50', textColor: 'text-yellow-600' }
  ];

  const quickActions = [
    {
      title: 'Find New Home',
      description: 'Search for your next dream home',
      icon: '🏠',
      href: '/findhome',
      gradient: 'from-primary-500 to-secondary-500'
    },
    {
      title: 'View Favorites',
      description: 'See all your saved properties',
      icon: '❤️',
      href: '/dashboard/favorites',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Set Alerts',
      description: 'Get notified about new properties',
      icon: '🔔',
      href: '/alerts',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Contact Agent',
      description: 'Get in touch with our experts',
      icon: '👨‍💼',
      href: '/contact',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome back, {user?.firstName || 'User'}!</h1>
          <p className="text-neutral-600">Here&apos;s what&apos;s happening with your home search</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 shadow-lg border border-white/20`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`bg-gradient-to-br ${action.gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm">❤️</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-neutral-900">Added property to favorites</p>
                <p className="text-sm text-neutral-600">Modern Downtown Apartment</p>
              </div>
              <span className="text-sm text-neutral-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔍</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-neutral-900">Searched for properties</p>
                <p className="text-sm text-neutral-600">3 bedroom apartments in downtown</p>
              </div>
              <span className="text-sm text-neutral-500">1 day ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm">👁️</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-neutral-900">Viewed property details</p>
                <p className="text-sm text-neutral-600">Luxury Penthouse Suite</p>
              </div>
              <span className="text-sm text-neutral-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
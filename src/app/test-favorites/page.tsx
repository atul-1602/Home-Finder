'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getFavoriteProperties, addToFavorites, removeFromFavorites } from '../../lib/api';
import FavoriteButton from '../../components/FavoriteButton';

export default function TestFavoritesPage() {
  const { user, isLoaded } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testPropertyId, setTestPropertyId] = useState(1);

  useEffect(() => {
    if (isLoaded && user) {
      loadFavorites();
    }
  }, [isLoaded, user]);

  const loadFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const favoriteProperties = await getFavoriteProperties(user.id);
      setFavorites(favoriteProperties);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestProperty = async () => {
    if (!user) return;

    try {
      const success = await addToFavorites(user.id, testPropertyId);
      if (success) {
        console.log(`Property ${testPropertyId} added to favorites`);
        loadFavorites(); // Reload favorites
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleRemoveTestProperty = async () => {
    if (!user) return;

    try {
      const success = await removeFromFavorites(user.id, testPropertyId);
      if (success) {
        console.log(`Property ${testPropertyId} removed from favorites`);
        loadFavorites(); // Reload favorites
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Favorites</h1>
          <p className="text-gray-600">Please sign in to test favorites functionality.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Favorites Test Page</h1>
          <p className="text-gray-600 mb-6">
            Test the favorites functionality for user: {user.emailAddresses[0]?.emailAddress}
          </p>

          {/* Test Controls */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Controls</h2>
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium text-gray-700">
                Property ID:
                <input
                  type="number"
                  value={testPropertyId}
                  onChange={(e) => setTestPropertyId(parseInt(e.target.value) || 1)}
                  className="ml-2 px-3 py-1 border border-gray-300 rounded-md"
                />
              </label>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddTestProperty}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add to Favorites
              </button>
              <button
                onClick={handleRemoveTestProperty}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove from Favorites
              </button>
              <button
                onClick={loadFavorites}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Refresh Favorites
              </button>
            </div>
          </div>

          {/* Current Favorites */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Favorites</h2>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading favorites...</p>
              </div>
            ) : favorites.length === 0 ? (
              <p className="text-gray-600">No favorite properties found.</p>
            ) : (
              <div className="space-y-2">
                {favorites.map((property) => (
                  <div key={property.id} className="flex items-center justify-between bg-white p-3 rounded-md">
                    <div>
                      <span className="font-medium">Property ID: {property.id}</span>
                      <span className="ml-4 text-gray-600">{property.title}</span>
                    </div>
                    <FavoriteButton
                      propertyId={property.id}
                      onToggle={() => loadFavorites()}
                      className="text-red-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* API Endpoints Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints</h2>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <strong>GET /api/users/favorites</strong> - Get user&apos;s favorite properties
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>POST /api/users/favorites</strong> - Add property to favorites
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>DELETE /api/users/favorites?propertyId=X</strong> - Remove property from favorites
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
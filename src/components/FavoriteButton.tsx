'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { isPropertyFavorited } from '../lib/api';

interface FavoriteButtonProps {
  propertyId: number;
  onToggle?: (isFavorited: boolean) => void;
  className?: string;
}

export default function FavoriteButton({ propertyId, onToggle, className = '' }: FavoriteButtonProps) {
  const { user, isLoaded } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    if (!user) return;
    
    try {
      const favorited = await isPropertyFavorited(user.id, propertyId);
      setIsFavorited(favorited);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  }, [user, propertyId]);

  // Check if property is favorited on component mount
  useEffect(() => {
    if (isLoaded && user) {
      checkFavoriteStatus();
    }
  }, [isLoaded, user, checkFavoriteStatus]);

  const toggleFavorite = async () => {
    if (!user || loading) return;

    setLoading(true);
    try {
      const method = isFavorited ? 'DELETE' : 'POST';
      const url = isFavorited 
        ? `/api/users/favorites?propertyId=${propertyId}`
        : '/api/users/favorites';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(method === 'POST' && {
          body: JSON.stringify({ propertyId }),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsFavorited(!isFavorited);
        onToggle?.(!isFavorited);
      } else {
        console.error('Failed to toggle favorite:', result.error);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if user is not loaded or not authenticated
  if (!isLoaded || !user) {
    return null;
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`favorite-button ${className} ${
        isFavorited ? 'text-red-500' : 'text-gray-400'
      } hover:text-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill={isFavorited ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
} 
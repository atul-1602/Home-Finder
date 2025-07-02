'use client';

import { useState, useEffect, useCallback } from 'react';
import PropertySection from '../../components/PropertySection';
import PropertyCard from '../../components/PropertyCard';
import PropertyFilters from '../../components/PropertyFilters';
import { getProperties } from '../../lib/api';

const FindHome = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const loadProperties = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setOffset(0);
      }
      
      const currentOffset = isLoadMore ? offset : 0;
      const result = await getProperties(filters, limit, currentOffset);
      
      if (isLoadMore) {
        setProperties(prev => [...prev, ...result.properties]);
      } else {
        setProperties(result.properties);
      }
      
      setHasMore(result.hasMore);
      setTotal(result.total);
      setOffset(currentOffset + limit);
    } catch (err) {
      setError('Failed to load properties');
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters, offset]);

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleLoadMore = () => {
    loadProperties(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="container-custom py-8">
          <h1 className="heading-responsive font-bold text-neutral-900 mb-4 line-clamp-1">
            Find Your Perfect Home
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Discover thousands of properties with advanced search and filtering options
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <PropertyFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container-custom py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-neutral-600">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-accent-600">{error}</p>
            <button 
              onClick={() => loadProperties()}
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">No properties found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {/* Load More Section */}
            {hasMore && (
              <div className="text-center mt-12">
                {loadingMore ? (
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="btn btn-primary"
                  >
                    Load More Properties
                  </button>
                )}
              </div>
            )}
            
            {/* Results Count */}
            {properties.length > 0 && (
              <div className="text-center mt-8 text-neutral-600">
                Showing {properties.length} of {total} properties
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FindHome; 
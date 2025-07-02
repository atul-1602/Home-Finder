'use client';

import { useState, useEffect, useCallback } from 'react';
import PropertyCard from './PropertyCard';

const PropertySection = ({ title, subtitle, fetchFunction, showLoadMore = false, maxDisplay = 3 }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      
      const result = await fetchFunction();
      
      // Handle both cases: result.properties (from API functions) or result directly (from wrapper functions)
      const propertiesArray = result.properties || result;
      setProperties(propertiesArray);
    } catch (err) {
      setError('Failed to load properties');
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  if (loading) {
    return (
      <section className="bg-red-500">
        <div className="container-custom">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="heading-responsive font-bold gradient-text mb-4">{title}</h2>
            {subtitle && (
              <p className="text-responsive text-neutral-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
            )}
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-neutral-600">Loading properties...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="heading-responsive font-bold gradient-text mb-4">{title}</h2>
            {subtitle && (
              <p className="text-responsive text-neutral-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
            )}
          </div>
          <div className="text-center py-12">
            <p className="text-accent-600 mb-4">{error}</p>
            <button onClick={() => loadProperties()} className="btn btn-accent">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (properties?.length === 0) {
    return null; // Don't render section if no properties
  }

  // Slice properties to show only maxDisplay items
  const displayProperties = properties.slice(0, maxDisplay);

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="heading-responsive font-bold gradient-text mb-4">{title}</h2>
          {subtitle && (
            <p className="text-responsive text-neutral-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>
        
        <div className="property-grid">
          {displayProperties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySection; 
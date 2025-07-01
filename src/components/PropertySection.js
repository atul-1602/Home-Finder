'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const PropertySection = ({ title, subtitle, fetchFunction, loadingText = "Loading properties..." }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction();
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties');
        console.error('Error loading properties:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [fetchFunction]);

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">{loadingText}</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No properties found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="btn btn-primary">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertySection; 
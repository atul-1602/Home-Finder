'use client';

import Image from 'next/image';
import { useState } from 'react';

const PropertyCard = ({ property }) => {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAmenitiesList = (amenities) => {
    if (!amenities) return [];
    return amenities.split(',').slice(0, 3); // Show only first 3 amenities
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200">
        {!imageError ? (
          <Image
            src={property.imageUrl || '/images/img4.jpeg'}
            alt={property.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Featured Badge */}
        {property.isFeatured && (
          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </div>
        )}
        
        {/* Property Type Badge */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-md text-xs font-semibold">
          {property.type}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-3">
          {formatPrice(property.price)}
          <span className="text-sm text-gray-600 font-normal">/month</span>
        </div>

        {/* Property Stats */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          {property.bedrooms !== undefined && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              {property.bedrooms} BHK
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {property.bathrooms} Bath
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.area} sq ft
            </div>
          )}
        </div>

        {/* Furnishing & Availability */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-gray-600">
            {property.furnishing || 'Not specified'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            property.availability === 'Available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {property.availability || 'Not specified'}
          </span>
        </div>

        {/* Amenities */}
        {property.amenities && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {getAmenitiesList(property.amenities).map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                >
                  {amenity.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Posted Date */}
        <div className="text-xs text-gray-500 mb-3">
          Posted: {property.postedDate ? formatDate(property.postedDate) : 'Recently'}
        </div>

        {/* Contact Info */}
        {property.contact_name && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{property.contact_name}</p>
                {property.contact_phone && (
                  <p className="text-sm text-gray-600">{property.contact_phone}</p>
                )}
              </div>
              <button className="btn btn-primary text-sm px-4 py-2">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard; 
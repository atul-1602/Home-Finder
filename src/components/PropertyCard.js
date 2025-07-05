'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FavoriteButton from './FavoriteButton';

const PropertyCard = ({ property }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
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

  const handleCardClick = () => {
    router.push(`/property/${property.id}`);
  };

  const handleContactClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking contact button
    // You can add contact functionality here
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
  };

  return (
    <div 
      className="card group cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image */}
      <div className="relative h-56 bg-neutral-200 overflow-hidden flex-shrink-0">
        {!imageError ? (
          <Image
            src={property.image_url || '/images/img4.jpeg'}
            alt={property.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-300 to-neutral-400">
            <svg className="w-16 h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Favorite Button */}
        <div className="absolute top-3 left-3 z-10" onClick={handleFavoriteClick}>
          <FavoriteButton
            propertyId={property.id}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
          />
        </div>
        
        {/* Featured Badge */}
        {property.isfeatured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
            <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </div>
        )}
        
        {/* Property Type Badge */}
        <div className={`absolute ${property.isfeatured ? 'top-12 right-3' : 'top-3 right-3'} bg-white/95 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
          {property.type}
        </div>

        {/* Quick Stats Overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-between text-xs text-neutral-700">
            {property.bedrooms !== undefined && (
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                {property.bedrooms} BHK
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                {property.bathrooms} Bath
              </div>
            )}
            {property.area && (
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {property.area} sq ft
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
          {property.title}
        </h3>

        {/* Price */}
        <div className="text-3xl font-bold gradient-text mb-4">
          {formatPrice(property.price)}
          <span className="text-sm text-neutral-600 font-normal">/month</span>
        </div>

        {/* Property Stats */}
        <div className="flex items-center space-x-6 mb-4 text-sm text-neutral-600">
          {property.bedrooms !== undefined && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              {property.bedrooms} BHK
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              {property.bathrooms} Bath
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              {property.area} sq ft
            </div>
          )}
        </div>

        {/* Furnishing & Availability */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full text-sm">
            {property.furnishing || 'Not specified'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            property.availability === 'Available' 
              ? 'bg-success-100 text-success-800' 
              : 'bg-accent-100 text-accent-800'
          }`}>
            {property.availability || 'Not specified'}
          </span>
        </div>

        {/* Amenities */}
        {property.amenities && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {getAmenitiesList(property.amenities).map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {amenity.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Posted Date */}
        <div className="text-xs text-neutral-500 mb-4 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Posted: {formatDate(property.posteddate)}
        </div>

        {/* Contact Info - This will be pushed to the bottom */}
        {property.contact_name && (
          <div className="border-t border-neutral-100 pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{property.contact_name}</p>
                {property.contact_phone && (
                  <p className="text-sm text-neutral-600">{property.contact_phone}</p>
                )}
              </div>
              <button 
                className="btn btn-primary text-sm"
                onClick={handleContactClick}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
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
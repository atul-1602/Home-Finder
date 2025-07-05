'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getPropertyById } from '../../../lib/api';
import FavoriteButton from '../../../components/FavoriteButton';

const PropertyDetails = () => {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await getPropertyById(parseInt(params.id));
        if (propertyData) {
          setProperty(propertyData);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Failed to load property details');
        console.error('Error loading property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProperty();
    }
  }, [params.id]);

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
      month: 'long',
      year: 'numeric'
    });
  };

  const getAmenitiesList = (amenities) => {
    if (!amenities) return [];
    return amenities.split(',').map(amenity => amenity.trim());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The property you are looking for does not exist.'}</p>
          <a href="/findhome" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">
            Browse Properties
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-red-600">Home</a>
            <span>/</span>
            <a href="/findhome" className="hover:text-red-600">Properties</a>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {property.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-lg">
            <div className="text-3xl font-bold text-red-600">
              {formatPrice(property.price)}
              <span className="text-sm text-gray-600 font-normal">/month</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              {property.bedrooms !== undefined && (
                <span>{property.bedrooms} BHK</span>
              )}
              {property.bathrooms !== undefined && (
                <span>{property.bathrooms} Bath</span>
              )}
              {property.area && (
                <span>{property.area} sq ft</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                {!imageError ? (
                  <Image
                    src={property.image_url || '/images/img4.jpeg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <svg className="w-24 h-24 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium">{property.type}</span>
                    </div>
                    {property.bedrooms !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{property.area} sq ft</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnishing:</span>
                      <span className="font-medium">{property.furnishing || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Availability:</span>
                      <span className={`font-medium ${
                        property.availability === 'Available' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {property.availability || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted Date:</span>
                      <span className="font-medium">
                        {property.posted_date ? formatDate(property.posted_date) : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    {property.is_featured && (
                      <div className="flex items-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                          Featured Property
                        </span>
                      </div>
                    )}
                    {property.tags && (
                      <div>
                        <span className="text-gray-600">Tags: </span>
                        <span className="font-medium">{property.tags}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {getAmenitiesList(property.amenities).map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              
              {property.contact_name && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-semibold text-gray-900">{property.contact_name}</p>
                </div>
              )}
              
              {property.contact_phone && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-semibold text-gray-900">{property.contact_phone}</p>
                </div>
              )}
              
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-700 transition-colors mb-4">
                Contact Owner
              </button>
              
              <button className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                Schedule Visit
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-gray-700">Add to Favorites</span>
                  </div>
                  <FavoriteButton
                    propertyId={property.id}
                    className="text-gray-600 hover:text-red-500"
                  />
                </div>
                
                <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span className="text-gray-700">Share Property</span>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-gray-700">View Similar Properties</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 
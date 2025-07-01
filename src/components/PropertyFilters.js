'use client';

import { useState } from 'react';

const PropertyFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? undefined : parseInt(value);
    handleFilterChange(type, numValue);
  };

  const clearAllFilters = () => {
    onClearFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-red-700 transition-colors"
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Price Range (₹/month)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="100000"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Property Type</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Apartment', 'Villa', 'Flat', 'Penthouse', 'Studio'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={filters.type === type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Bedrooms</h4>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, '5+'].map((beds) => (
                <label key={beds} className="flex items-center">
                  <input
                    type="radio"
                    name="bedrooms"
                    value={beds}
                    checked={filters.bedrooms === (beds === '5+' ? 5 : beds)}
                    onChange={(e) => handleFilterChange('bedrooms', beds === '5+' ? 5 : parseInt(e.target.value))}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{beds} BHK</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Bathrooms</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, '4+'].map((baths) => (
                <label key={baths} className="flex items-center">
                  <input
                    type="radio"
                    name="bathrooms"
                    value={baths}
                    checked={filters.bathrooms === (baths === '4+' ? 4 : baths)}
                    onChange={(e) => handleFilterChange('bathrooms', baths === '4+' ? 4 : parseInt(e.target.value))}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{baths}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Furnishing */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Furnishing</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((furnishing) => (
                <label key={furnishing} className="flex items-center">
                  <input
                    type="radio"
                    name="furnishing"
                    value={furnishing}
                    checked={filters.furnishing === furnishing}
                    onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{furnishing}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Available', 'Not Available'].map((availability) => (
                <label key={availability} className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    value={availability}
                    checked={filters.availability === availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{availability}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sort Field</label>
                <select
                  value={filters.sortBy || ''}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">No Sorting</option>
                  <option value="price">Price</option>
                  <option value="postedDate">Posted Date</option>
                  <option value="area">Area</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sort Order</label>
                <select
                  value={filters.sortOrder || 'asc'}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <button
              onClick={clearAllFilters}
              className="btn btn-secondary flex-1"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="btn btn-primary flex-1"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters; 
import { Property, PropertyFilters } from './types';

// Mock data for when Supabase is not configured
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern 2BHK Apartment in City Center",
    description: "Beautiful modern apartment with all amenities",
    price: 25000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    furnishing: "Semi-furnished",
    availability: "Available",
    amenities: "Parking, Gym, Swimming Pool, Security",
    image_url: "/images/img4.jpeg",
    isfeatured: true,
    posteddate: "2024-01-15",
    contact_name: "John Doe",
    contact_phone: "+91 98765 43210"
  },
  {
    id: 2,
    title: "Luxury 3BHK Villa with Garden",
    description: "Spacious villa with private garden and modern amenities",
    price: 75000,
    type: "Villa",
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    furnishing: "Fully furnished",
    availability: "Available",
    amenities: "Garden, Parking, Security, Swimming Pool",
    image_url: "/images/img5.jpeg",
    isfeatured: true,
    posteddate: "2024-01-10",
    contact_name: "Jane Smith",
    contact_phone: "+91 98765 43211"
  },
  {
    id: 3,
    title: "Cozy 1BHK Flat for Students",
    description: "Perfect for students and young professionals",
    price: 15000,
    type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    furnishing: "Unfurnished",
    availability: "Available",
    amenities: "Security, Parking",
    image_url: "/images/img6.jpeg",
    isfeatured: false,
    posteddate: "2024-01-20",
    contact_name: "Mike Johnson",
    contact_phone: "+91 98765 43212"
  }
];

// Try to import Supabase client, but provide fallback if not available
let supabase: any = null;
try {
  const { supabase: supabaseClient } = require('../config/supabaseClient');
  supabase = supabaseClient;
} catch (error) {
  console.warn('Supabase not configured, using mock data');
}

export const getProperties = async (
  filters?: PropertyFilters, 
  limit: number = 20, 
  offset: number = 0
): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const filteredProperties = mockProperties.filter(property => {
        if (!filters) return true;
        
        if (filters.minPrice && property.price < filters.minPrice) return false;
        if (filters.maxPrice && property.price > filters.maxPrice) return false;
        if (filters.type && property.type !== filters.type) return false;
        if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
        if (filters.bathrooms && property.bathrooms !== filters.bathrooms) return false;
        if (filters.furnishing && property.furnishing !== filters.furnishing) return false;
        if (filters.availability && property.availability !== filters.availability) return false;
        
        return true;
      });
      
      const paginatedProperties = filteredProperties.slice(offset, offset + limit);
      
      return {
        properties: paginatedProperties,
        total: filteredProperties.length,
        hasMore: offset + limit < filteredProperties.length
      };
    }

    let query = supabase
      .from('property')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters) {
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.bedrooms !== undefined) {
        query = query.eq('bedrooms', filters.bedrooms);
      }
      if (filters.bathrooms !== undefined) {
        query = query.eq('bathrooms', filters.bathrooms);
      }
      if (filters.furnishing) {
        query = query.eq('furnishing', filters.furnishing);
      }
      if (filters.availability) {
        query = query.eq('availability', filters.availability);
      }

      // Apply sorting
      if (filters.sortBy) {
        const order = filters.sortOrder === 'desc' ? false : true;
        query = query.order(filters.sortBy, { ascending: order });
      } else {
        // Default sorting by posted date
        query = query.order('posteddate', { ascending: false });
      }
    } else {
      // Default sorting by posted date
      query = query.order('posteddate', { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: properties, error, count } = await query;

    if (error) {
      console.error('Error fetching properties:', error);
      throw new Error('Failed to fetch properties');
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return {
      properties: properties || [],
      total,
      hasMore
    };
  } catch (error) {
    console.error('Error in getProperties:', error);
    // Return mock data as fallback
    return {
      properties: mockProperties.slice(0, limit),
      total: mockProperties.length,
      hasMore: false
    };
  }
};

export const getPropertyById = async (id: number): Promise<Property | null> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      return mockProperties.find(property => property.id === id) || null;
    }

    const { data: property, error } = await supabase
      .from('property')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }

    return property;
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    return null;
  }
};

export const getFeaturedProperties = async (
  limit: number = 20, 
  offset: number = 0
): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const featuredProperties = mockProperties.filter(property => property.isfeatured);
      const paginatedProperties = featuredProperties.slice(offset, offset + limit);
      
      return {
        properties: paginatedProperties,
        total: featuredProperties.length,
        hasMore: offset + limit < featuredProperties.length
      };
    }

    const { data: properties, error, count } = await supabase
      .from('property')
      .select('*', { count: 'exact' })
      .eq('isfeatured', true)
      .order('posteddate', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching featured properties:', error);
      throw new Error('Failed to fetch featured properties');
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return {
      properties: properties || [],
      total,
      hasMore
    };
  } catch (error) {
    console.error('Error in getFeaturedProperties:', error);
    // Return mock data as fallback
    const featuredProperties = mockProperties.filter(property => property.isfeatured);
    return {
      properties: featuredProperties.slice(0, limit),
      total: featuredProperties.length,
      hasMore: false
    };
  }
};

export const getRecentProperties = async (
  limit: number = 20, 
  offset: number = 0
): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const recentProperties = [...mockProperties].sort((a, b) => 
        new Date(b.posteddate || '').getTime() - new Date(a.posteddate || '').getTime()
      );
      const paginatedProperties = recentProperties.slice(offset, offset + limit);
      
      return {
        properties: paginatedProperties,
        total: recentProperties.length,
        hasMore: offset + limit < recentProperties.length
      };
    }

    const { data: properties, error, count } = await supabase
      .from('property')
      .select('*', { count: 'exact' })
      .order('posteddate', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching recent properties:', error);
      throw new Error('Failed to fetch recent properties');
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return {
      properties: properties || [],
      total,
      hasMore
    };
  } catch (error) {
    console.error('Error in getRecentProperties:', error);
    // Return mock data as fallback
    const recentProperties = [...mockProperties].sort((a, b) => 
      new Date(b.posteddate || '').getTime() - new Date(a.posteddate || '').getTime()
    );
    return {
      properties: recentProperties.slice(0, limit),
      total: recentProperties.length,
      hasMore: false
    };
  }
};

export const getTopRatedProperties = async (
  limit: number = 20, 
  offset: number = 0
): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const topRatedProperties = [...mockProperties].sort((a, b) => b.price - a.price);
      const paginatedProperties = topRatedProperties.slice(offset, offset + limit);
      
      return {
        properties: paginatedProperties,
        total: topRatedProperties.length,
        hasMore: offset + limit < topRatedProperties.length
      };
    }

    const { data: properties, error, count } = await supabase
      .from('property')
      .select('*', { count: 'exact' })
      .order('price', { ascending: false }) // For demo, consider higher price as "top rated"
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching top rated properties:', error);
      throw new Error('Failed to fetch top rated properties');
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return {
      properties: properties || [],
      total,
      hasMore
    };
  } catch (error) {
    console.error('Error in getTopRatedProperties:', error);
    // Return mock data as fallback
    const topRatedProperties = [...mockProperties].sort((a, b) => b.price - a.price);
    return {
      properties: topRatedProperties.slice(0, limit),
      total: topRatedProperties.length,
      hasMore: false
    };
  }
};

// Wrapper functions for backward compatibility with homepage
export const getFeaturedPropertiesForHome = async (): Promise<Property[]> => {
  const result = await getFeaturedProperties();
  return result.properties;
};

export const getRecentPropertiesForHome = async (): Promise<Property[]> => {
  const result = await getRecentProperties();
  return result.properties;
};

export const getTopRatedPropertiesForHome = async (): Promise<Property[]> => {
  const result = await getTopRatedProperties();
  return result.properties;
}; 
import { Property, PropertyFilters } from './types';
import { supabase } from '../config/supabaseClient';

export const getProperties = async (filters?: PropertyFilters): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
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

    const { data: properties, error, count } = await query;

    if (error) {
      console.error('Error fetching properties:', error);
      throw new Error('Failed to fetch properties');
    }

    const total = count || 0;

    return {
      properties: properties || [],
      total,
      hasMore: false // No pagination for now
    };
  } catch (error) {
    console.error('Error in getProperties:', error);
    throw new Error('Failed to fetch properties');
  }
};

export const getPropertyById = async (id: number): Promise<Property | null> => {
  try {
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

export const getFeaturedProperties = async (): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    const { data: properties, error, count } = await supabase
      .from('property')
      .select('*', { count: 'exact' })
      .eq('isfeatured', true)
      .order('posteddate', { ascending: false });

    if (error) {
      console.error('Error fetching featured properties:', error);
      throw new Error('Failed to fetch featured properties');
    }

    const total = count || 0;

    return {
      properties: properties || [],
      total,
      hasMore: false
    };
  } catch (error) {
    console.error('Error in getFeaturedProperties:', error);
    throw new Error('Failed to fetch featured properties');
  }
};

export const getRecentProperties = async (): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    const { data: properties, error, count } = await supabase
      .from('property')
      .select('*', { count: 'exact' })
      .order('posteddate', { ascending: false });

    if (error) {
      console.error('Error fetching recent properties:', error);
      throw new Error('Failed to fetch recent properties');
    }

    const total = count || 0;

    return {
      properties: properties || [],
      total,
      hasMore: false
    };
  } catch (error) {
    console.error('Error in getRecentProperties:', error);
    throw new Error('Failed to fetch recent properties');
  }
};

export const getTopRatedProperties = async (): Promise<{ properties: Property[], total: number, hasMore: boolean }> => {
  try {
    const { data: properties, error, count } = await supabase
      .from('property')
      .select('*', { count: 'exact' })
      .order('price', { ascending: false }); // For demo, consider higher price as "top rated"

    if (error) {
      console.error('Error fetching top rated properties:', error);
      throw new Error('Failed to fetch top rated properties');
    }

    const total = count || 0;

    return {
      properties: properties || [],
      total,
      hasMore: false
    };
  } catch (error) {
    console.error('Error in getTopRatedProperties:', error);
    throw new Error('Failed to fetch top rated properties');
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
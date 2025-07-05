import { Property, PropertyFilters, User, UserFilters } from './types';

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

// Mock data for users when Supabase is not configured
const mockUsers: User[] = [
  {
    id: "1",
    clerk_id: "user_2abc123def456",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    clerk_id: "user_3def456ghi789",
    email: "jane.smith@example.com",
    first_name: "Jane",
    last_name: "Smith",
    created_at: "2024-01-10T14:20:00Z"
  },
  {
    id: "3",
    clerk_id: "user_4ghi789jkl012",
    email: "mike.johnson@example.com",
    first_name: "Mike",
    last_name: "Johnson",
    created_at: "2024-01-20T09:15:00Z"
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

// Users API Functions
export const getUsers = async (
  filters?: UserFilters,
  limit: number = 20,
  offset: number = 0
): Promise<{ users: User[], total: number, hasMore: boolean }> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const filteredUsers = mockUsers.filter(user => {
        if (!filters) return true;
        
        if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
        if (filters.first_name && !user.first_name.toLowerCase().includes(filters.first_name.toLowerCase())) return false;
        if (filters.last_name && !user.last_name.toLowerCase().includes(filters.last_name.toLowerCase())) return false;
        
        return true;
      });
      
      // Apply sorting
      if (filters?.sortBy) {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        filteredUsers.sort((a, b) => {
          const aValue = a[filters.sortBy! as keyof User];
          const bValue = b[filters.sortBy! as keyof User];
          return aValue < bValue ? -order : order;
        });
      } else {
        // Default sorting by created_at
        filteredUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      
      const paginatedUsers = filteredUsers.slice(offset, offset + limit);
      
      return {
        users: paginatedUsers,
        total: filteredUsers.length,
        hasMore: offset + limit < filteredUsers.length
      };
    }

    let query = supabase
      .from('users')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters) {
      if (filters.email) {
        query = query.ilike('email', `%${filters.email}%`);
      }
      if (filters.first_name) {
        query = query.ilike('first_name', `%${filters.first_name}%`);
      }
      if (filters.last_name) {
        query = query.ilike('last_name', `%${filters.last_name}%`);
      }

      // Apply sorting
      if (filters.sortBy) {
        const order = filters.sortOrder === 'desc' ? false : true;
        query = query.order(filters.sortBy, { ascending: order });
      } else {
        // Default sorting by created_at
        query = query.order('created_at', { ascending: false });
      }
    } else {
      // Default sorting by created_at
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return {
      users: users || [],
      total,
      hasMore
    };
  } catch (error) {
    console.error('Error in getUsers:', error);
    // Return mock data as fallback
    return {
      users: mockUsers.slice(0, limit),
      total: mockUsers.length,
      hasMore: false
    };
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      return mockUsers.find(user => user.id === id) || null;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    return null;
  }
};

export const getUserByClerkId = async (clerkId: string): Promise<User | null> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      return mockUsers.find(user => user.clerk_id === clerkId) || null;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error) {
      console.error('Error fetching user by clerk_id:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error in getUserByClerkId:', error);
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      return mockUsers.find(user => user.email === email) || null;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return null;
  }
};

export const createUser = async (userData: Omit<User, 'id' | 'created_at'>): Promise<User | null> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        ...userData,
        created_at: new Date().toISOString()
      };
      mockUsers.push(newUser);
      return newUser;
    }

    const { data: user, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error in createUser:', error);
    return null;
  }
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User | null> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const userIndex = mockUsers.findIndex(user => user.id === id);
      if (userIndex === -1) return null;
      
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      return mockUsers[userIndex];
    }

    const { data: user, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error in updateUser:', error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      const userIndex = mockUsers.findIndex(user => user.id === id);
      if (userIndex === -1) return false;
      
      mockUsers.splice(userIndex, 1);
      return true;
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return false;
  }
};

// Favorites API Functions
export const addToFavorites = async (clerkId: string, propertyId: number): Promise<boolean> => {
  try {
    if (!supabase) {
      // Mock implementation
      const userIndex = mockUsers.findIndex(user => user.clerk_id === clerkId);
      if (userIndex === -1) return false;
      
      if (!mockUsers[userIndex].favourites) {
        mockUsers[userIndex].favourites = [];
      }
      
      if (!mockUsers[userIndex].favourites!.includes(propertyId)) {
        mockUsers[userIndex].favourites!.push(propertyId);
      }
      return true;
    }

    // Get current user's favorites
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('favourites')
      .eq('clerk_id', clerkId)
      .single();

    if (fetchError) {
      console.error('Error fetching user favorites:', fetchError);
      return false;
    }

    // Initialize favourites array if it doesn't exist
    const currentFavorites = user?.favourites || [];
    
    // Add property to favorites if not already present
    if (!currentFavorites.includes(propertyId)) {
      const updatedFavorites = [...currentFavorites, propertyId];
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ favourites: updatedFavorites })
        .eq('clerk_id', clerkId);

      if (updateError) {
        console.error('Error adding to favorites:', updateError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in addToFavorites:', error);
    return false;
  }
};

export const removeFromFavorites = async (clerkId: string, propertyId: number): Promise<boolean> => {
  try {
    if (!supabase) {
      // Mock implementation
      const userIndex = mockUsers.findIndex(user => user.clerk_id === clerkId);
      if (userIndex === -1) return false;
      
      if (mockUsers[userIndex].favourites) {
        mockUsers[userIndex].favourites = mockUsers[userIndex].favourites!.filter(id => id !== propertyId);
      }
      return true;
    }

    // Get current user's favorites
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('favourites')
      .eq('clerk_id', clerkId)
      .single();

    if (fetchError) {
      console.error('Error fetching user favorites:', fetchError);
      return false;
    }

    // Remove property from favorites
    const currentFavorites = user?.favourites || [];
    const updatedFavorites = currentFavorites.filter(id => id !== propertyId);
    
    const { error: updateError } = await supabase
      .from('users')
      .update({ favourites: updatedFavorites })
      .eq('clerk_id', clerkId);

    if (updateError) {
      console.error('Error removing from favorites:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in removeFromFavorites:', error);
    return false;
  }
};

export const getFavoriteProperties = async (clerkId: string): Promise<Property[]> => {
  try {
    if (!supabase) {
      // Mock implementation
      const user = mockUsers.find(user => user.clerk_id === clerkId);
      if (!user || !user.favourites) return [];
      
      return mockProperties.filter(property => user.favourites!.includes(property.id));
    }

    // Get user's favorite property IDs
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('favourites')
      .eq('clerk_id', clerkId)
      .single();

    if (fetchError || !user?.favourites || user.favourites.length === 0) {
      return [];
    }

    // Get the actual property data for favorite IDs
    const { data: properties, error: propertiesError } = await supabase
      .from('property')
      .select('*')
      .in('id', user.favourites);

    if (propertiesError) {
      console.error('Error fetching favorite properties:', propertiesError);
      return [];
    }

    return properties || [];
  } catch (error) {
    console.error('Error in getFavoriteProperties:', error);
    return [];
  }
};

export const isPropertyFavorited = async (clerkId: string, propertyId: number): Promise<boolean> => {
  try {
    if (!supabase) {
      // Mock implementation
      const user = mockUsers.find(user => user.clerk_id === clerkId);
      return user?.favourites?.includes(propertyId) || false;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('favourites')
      .eq('clerk_id', clerkId)
      .single();

    if (error || !user?.favourites) {
      return false;
    }

    return user.favourites.includes(propertyId);
  } catch (error) {
    console.error('Error in isPropertyFavorited:', error);
    return false;
  }
}; 
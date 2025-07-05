export interface Property {
  id: number;
  title: string;
  price: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  image_url?: string;
  furnishing?: string;
  availability?: string;
  amenities?: string;
  description?: string;
  contact_name?: string;
  contact_phone?: string;
  posteddate?: string;
  isfeatured?: boolean;
  tags?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  furnishing?: string;
  availability?: string;
  sortBy?: 'price' | 'posteddate' | 'area' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  favourites?: number[];
}

export interface UserFilters {
  email?: string;
  first_name?: string;
  last_name?: string;
  sortBy?: 'created_at' | 'first_name' | 'last_name' | 'email';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
} 
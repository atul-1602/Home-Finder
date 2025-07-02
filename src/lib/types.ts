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
} 
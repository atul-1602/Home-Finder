export interface Property {
  id: number;
  title: string;
  price: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  imageUrl?: string;
  furnishing?: string;
  availability?: string;
  amenities?: string;
  description?: string;
  contact_name?: string;
  contact_phone?: string;
  postedDate?: string;
  isFeatured?: boolean;
  tags?: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  furnishing?: string;
  availability?: string;
  sortBy?: 'price' | 'postedDate' | 'area';
  sortOrder?: 'asc' | 'desc';
} 
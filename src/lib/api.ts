import { Property, PropertyFilters } from './types';

// Mock data for development - replace with actual API calls
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern 2BHK Apartment in City Center",
    price: 25000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    imageUrl: "/images/img4.jpeg",
    furnishing: "Semi-Furnished",
    availability: "Available",
    amenities: "Parking, Gym, Swimming Pool, Security",
    description: "Beautiful modern apartment with all amenities in the heart of the city.",
    contact_name: "John Doe",
    contact_phone: "+91 98765 43210",
    postedDate: "2024-01-15T10:00:00Z",
    isFeatured: true,
    tags: "modern, city-center, amenities"
  },
  {
    id: 2,
    title: "Luxury 3BHK Villa with Garden",
    price: 45000,
    type: "Villa",
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    imageUrl: "/images/img5.jpeg",
    furnishing: "Fully Furnished",
    availability: "Available",
    amenities: "Garden, Parking, Security, Maid Room",
    description: "Spacious villa with beautiful garden and modern amenities.",
    contact_name: "Sarah Smith",
    contact_phone: "+91 98765 43211",
    postedDate: "2024-01-10T10:00:00Z",
    isFeatured: true,
    tags: "luxury, villa, garden"
  },
  {
    id: 3,
    title: "Cozy 1BHK Flat Near Metro",
    price: 18000,
    type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    imageUrl: "/images/img6.jpeg",
    furnishing: "Unfurnished",
    availability: "Available",
    amenities: "Parking, Security",
    description: "Perfect for singles or couples, close to metro station.",
    contact_name: "Mike Johnson",
    contact_phone: "+91 98765 43212",
    postedDate: "2024-01-20T10:00:00Z",
    isFeatured: false,
    tags: "cozy, metro, budget"
  },
  {
    id: 4,
    title: "Premium 4BHK Penthouse",
    price: 75000,
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    imageUrl: "/images/img4.jpeg",
    furnishing: "Fully Furnished",
    availability: "Available",
    amenities: "Terrace, Parking, Gym, Swimming Pool, Security, Concierge",
    description: "Luxurious penthouse with panoramic city views.",
    contact_name: "Emma Wilson",
    contact_phone: "+91 98765 43213",
    postedDate: "2024-01-05T10:00:00Z",
    isFeatured: true,
    tags: "premium, penthouse, luxury"
  },
  {
    id: 5,
    title: "Family 3BHK Apartment",
    price: 32000,
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    imageUrl: "/images/img5.jpeg",
    furnishing: "Semi-Furnished",
    availability: "Available",
    amenities: "Parking, Playground, Security",
    description: "Perfect family apartment in a peaceful neighborhood.",
    contact_name: "David Brown",
    contact_phone: "+91 98765 43214",
    postedDate: "2024-01-18T10:00:00Z",
    isFeatured: false,
    tags: "family, peaceful, neighborhood"
  },
  {
    id: 6,
    title: "Studio Apartment for Students",
    price: 12000,
    type: "Studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    imageUrl: "/images/img6.jpeg",
    furnishing: "Fully Furnished",
    availability: "Available",
    amenities: "WiFi, Security, Study Room",
    description: "Perfect for students, fully furnished with study amenities.",
    contact_name: "Lisa Davis",
    contact_phone: "+91 98765 43215",
    postedDate: "2024-01-22T10:00:00Z",
    isFeatured: false,
    tags: "student, studio, budget"
  }
];

export const getProperties = async (filters?: PropertyFilters): Promise<Property[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProperties = [...mockProperties];

  // Apply filters
  if (filters) {
    if (filters.minPrice !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.type) {
      filteredProperties = filteredProperties.filter(p => p.type.toLowerCase() === filters.type!.toLowerCase());
    }
    if (filters.bedrooms !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms === filters.bedrooms);
    }
    if (filters.bathrooms !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms === filters.bathrooms);
    }
    if (filters.furnishing) {
      filteredProperties = filteredProperties.filter(p => p.furnishing?.toLowerCase() === filters.furnishing!.toLowerCase());
    }
    if (filters.availability) {
      filteredProperties = filteredProperties.filter(p => p.availability?.toLowerCase() === filters.availability!.toLowerCase());
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProperties.sort((a, b) => {
        let aValue: any = a[filters.sortBy!];
        let bValue: any = b[filters.sortBy!];
        
        if (filters.sortBy === 'postedDate') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (filters.sortOrder === 'desc') {
          return bValue - aValue;
        }
        return aValue - bValue;
      });
    }
  }

  return filteredProperties;
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  const properties = await getProperties();
  return properties.filter(p => p.isFeatured).slice(0, 3);
};

export const getRecentProperties = async (): Promise<Property[]> => {
  const properties = await getProperties();
  return properties
    .sort((a, b) => new Date(b.postedDate || '').getTime() - new Date(a.postedDate || '').getTime())
    .slice(0, 3);
};

export const getTopRatedProperties = async (): Promise<Property[]> => {
  const properties = await getProperties();
  // For demo, we'll consider properties with higher prices as "top rated"
  return properties
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);
}; 
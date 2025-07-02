-- Create property table
CREATE TABLE IF NOT EXISTS property (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area INTEGER,
    image_url TEXT,
    furnishing VARCHAR(50),
    availability VARCHAR(50) DEFAULT 'Available',
    amenities TEXT,
    description TEXT,
    contact_name VARCHAR(100),
    contact_phone VARCHAR(20),
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_featured BOOLEAN DEFAULT FALSE,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_property_type ON property(type);
CREATE INDEX IF NOT EXISTS idx_property_price ON property(price);
CREATE INDEX IF NOT EXISTS idx_property_posted_date ON property(posted_date);
CREATE INDEX IF NOT EXISTS idx_property_is_featured ON property(is_featured);

-- Insert sample data
INSERT INTO property (title, price, type, bedrooms, bathrooms, area, image_url, furnishing, availability, amenities, description, contact_name, contact_phone, is_featured, tags) VALUES
('Modern 2BHK Apartment in City Center', 25000, 'Apartment', 2, 2, 1200, '/images/img4.jpeg', 'Semi-Furnished', 'Available', 'Parking, Gym, Swimming Pool, Security', 'Beautiful modern apartment with all amenities in the heart of the city.', 'John Doe', '+91 98765 43210', true, 'modern, city-center, amenities'),
('Luxury 3BHK Villa with Garden', 45000, 'Villa', 3, 3, 2500, '/images/img5.jpeg', 'Fully Furnished', 'Available', 'Garden, Parking, Security, Maid Room', 'Spacious villa with beautiful garden and modern amenities.', 'Sarah Smith', '+91 98765 43211', true, 'luxury, villa, garden'),
('Cozy 1BHK Flat Near Metro', 18000, 'Flat', 1, 1, 800, '/images/img6.jpeg', 'Unfurnished', 'Available', 'Parking, Security', 'Perfect for singles or couples, close to metro station.', 'Mike Johnson', '+91 98765 43212', false, 'cozy, metro, budget'),
('Premium 4BHK Penthouse', 75000, 'Penthouse', 4, 4, 3500, '/images/img4.jpeg', 'Fully Furnished', 'Available', 'Terrace, Parking, Gym, Swimming Pool, Security, Concierge', 'Luxurious penthouse with panoramic city views.', 'Emma Wilson', '+91 98765 43213', true, 'premium, penthouse, luxury'),
('Family 3BHK Apartment', 32000, 'Apartment', 3, 2, 1500, '/images/img5.jpeg', 'Semi-Furnished', 'Available', 'Parking, Playground, Security', 'Perfect family apartment in a peaceful neighborhood.', 'David Brown', '+91 98765 43214', false, 'family, peaceful, neighborhood'),
('Studio Apartment for Students', 12000, 'Studio', 0, 1, 500, '/images/img6.jpeg', 'Fully Furnished', 'Available', 'WiFi, Security, Study Room', 'Perfect for students, fully furnished with study amenities.', 'Lisa Davis', '+91 98765 43215', false, 'student, studio, budget'),
('Luxury 2BHK Apartment with Balcony', 28000, 'Apartment', 2, 2, 1100, '/images/img4.jpeg', 'Fully Furnished', 'Available', 'Balcony, Parking, Gym, Security, Garden', 'Elegant apartment with beautiful balcony views and modern amenities.', 'Alex Thompson', '+91 98765 43216', false, 'luxury, balcony, modern'),
('Spacious 4BHK Villa with Pool', 85000, 'Villa', 4, 4, 4000, '/images/img5.jpeg', 'Fully Furnished', 'Available', 'Swimming Pool, Garden, Parking, Security, Maid Room, Gym', 'Exclusive villa with private swimming pool and extensive garden area.', 'Maria Garcia', '+91 98765 43217', true, 'exclusive, pool, villa'),
('Compact 1BHK Near Shopping Mall', 15000, 'Flat', 1, 1, 600, '/images/img6.jpeg', 'Semi-Furnished', 'Available', 'Parking, Security, Shopping Mall Nearby', 'Convenient location near shopping mall and public transport.', 'Robert Wilson', '+91 98765 43218', false, 'compact, convenient, shopping'),
('Modern 3BHK Apartment with City View', 35000, 'Apartment', 3, 2, 1400, '/images/img4.jpeg', 'Fully Furnished', 'Available', 'City View, Parking, Gym, Security, Rooftop Garden', 'Modern apartment with stunning city views and premium amenities.', 'Jennifer Lee', '+91 98765 43219', true, 'modern, city-view, premium'),
('Affordable 2BHK in Suburban Area', 20000, 'Flat', 2, 1, 900, '/images/img5.jpeg', 'Unfurnished', 'Available', 'Parking, Security, Community Hall', 'Affordable housing option in a well-connected suburban area.', 'Rajesh Kumar', '+91 98765 43220', false, 'affordable, suburban, family'),
('Luxury Studio in Business District', 30000, 'Studio', 0, 1, 700, '/images/img6.jpeg', 'Fully Furnished', 'Available', 'Business Center, Parking, Security, Concierge', 'Premium studio apartment in the heart of the business district.', 'Priya Sharma', '+91 98765 43221', true, 'luxury, business, premium');

-- Enable Row Level Security (RLS) for better security
ALTER TABLE property ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON property
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update their own properties
CREATE POLICY "Allow authenticated users to manage properties" ON property
    FOR ALL USING (auth.role() = 'authenticated');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_property_updated_at 
    BEFORE UPDATE ON property 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 
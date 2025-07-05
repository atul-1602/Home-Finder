# HomeFinder - Modern Real Estate Platform

A comprehensive, production-ready real estate application built with Next.js 14, featuring user authentication, property management, favorites system, and a beautiful responsive design.

<img width="600" alt="Screenshot 2025-07-05 at 3 22 09 PM" src="https://github.com/user-attachments/assets/0ddf3b75-e94b-47a7-bacd-bb159f378d8a" />

<img width="600" alt="Screenshot 2025-07-05 at 3 22 49 PM" src="https://github.com/user-attachments/assets/4873b0fa-7145-4c28-8aea-4e867a24eb04" />

<img width="600" alt="Screenshot 2025-07-05 at 3 23 24 PM" src="https://github.com/user-attachments/assets/14988bff-6b7e-400c-b2d0-f57233440d93" />

<img width="600" alt="Screenshot 2025-07-05 at 3 23 11 PM" src="https://github.com/user-attachments/assets/9be569f6-e2a0-443b-997c-b6c505b095df" />

<img width="600" alt="Screenshot 2025-07-05 at 3 22 39 PM" src="https://github.com/user-attachments/assets/787aef69-8921-46a5-aeac-eaf808ab6f24" />

## 🚀 Features

### Core Features
- **🔐 User Authentication**: Secure authentication with Clerk
- **🏠 Property Search**: Advanced filtering and search capabilities
- **❤️ Favorites System**: Save and manage favorite properties
- **📊 User Dashboard**: Personalized dashboard with favorites count
- **📱 Responsive Design**: Optimized for all devices
- **🎨 Modern UI/UX**: Beautiful design with Tailwind CSS

### Property Management
- **Property Listings**: Browse properties with detailed information
- **Advanced Filtering**: Filter by price, type, bedrooms, bathrooms, etc.
- **Property Details**: Comprehensive property information pages
- **Contact Integration**: Direct contact with property owners
- **Image Gallery**: High-quality property images with fallbacks

### User Features
- **User Profiles**: Manage personal information
- **Favorites Management**: Add/remove properties from favorites
- **Dashboard Analytics**: View favorites count and activity
- **Secure Authentication**: Protected routes and user data

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript & JavaScript
- **Icons**: Heroicons (SVG)
- **Animations**: CSS Transitions & Framer Motion

### Backend & Database
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API Routes
- **Webhooks**: Svix for Clerk integration

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm
- **Version Control**: Git

## 📁 Project Structure

```
HomeFinder/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── users/         # User management APIs
│   │   │   └── webhook/       # Clerk webhook handlers
│   │   ├── dashboard/         # User dashboard
│   │   ├── property/          # Property details pages
│   │   ├── findhome/          # Property search
│   │   ├── contact/           # Contact page
│   │   ├── about/             # About page
│   │   ├── pricing/           # Pricing page
│   │   └── layout.js          # Root layout
│   ├── components/            # React components
│   │   ├── Navbar.js          # Navigation component
│   │   ├── Footer.js          # Footer component
│   │   ├── PropertyCard.js    # Property display card
│   │   ├── FavoriteButton.tsx # Favorites functionality
│   │   └── ...                # Other components
│   ├── lib/                   # Utility libraries
│   │   ├── api.ts             # API functions
│   │   └── types.ts           # TypeScript definitions
│   ├── hooks/                 # Custom React hooks
│   │   └── useUserSync.ts     # User synchronization
│   └── config/                # Configuration files
├── public/                    # Static assets
│   └── images/                # Image files
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Clerk account (for authentication)
- Supabase account (for database)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HomeFinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_WEBHOOK_SECRET=your_webhook_secret

   # Supabase Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Database Setup**
   - Create a Supabase project
   - Run the SQL scripts to create tables (see Database Schema section)
   - Configure Clerk webhooks for user synchronization

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  favourites INTEGER[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Properties Table
```sql
CREATE TABLE property (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  type TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER,
  furnishing TEXT,
  availability TEXT,
  amenities TEXT,
  image_url TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  posteddate DATE,
  isfeatured BOOLEAN DEFAULT FALSE,
  tags TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Design System

### Colors
- **Primary**: Red (#dc2626) - Main actions and branding
- **Secondary**: Green (#16a34a) - Success states and CTAs
- **Accent**: Yellow (#ca8a04) - Highlights and warnings
- **Neutral**: Gray scale for text and backgrounds

### Components
- **Buttons**: Consistent button styles with hover effects
- **Cards**: Property cards with shadows and hover animations
- **Forms**: Clean, accessible form inputs with focus states
- **Modals**: Overlay dialogs for authentication and forms

## 📱 Pages & Features

### Public Pages
- **Home (`/`)**: Landing page with hero section and featured properties
- **Find Home (`/findhome`)**: Property search with advanced filtering
- **Property Details (`/property/[id]`)**: Detailed property information
- **About (`/about`)**: Company information and testimonials
- **Contact (`/contact`)**: Contact form and company details
- **Pricing (`/pricing`)**: Service pricing plans

### Protected Pages
- **Dashboard (`/dashboard`)**: User dashboard with favorites count
- **Favorites (`/dashboard/favorites`)**: Manage favorite properties
- **Profile (`/profile`)**: User profile management

### API Endpoints
- `GET /api/users/favorites` - Get user's favorite properties
- `POST /api/users/favorites` - Add property to favorites
- `DELETE /api/users/favorites` - Remove property from favorites
- `POST /api/webhook/clerk` - Clerk webhook handler

## 🔧 Configuration

### Clerk Authentication
- User registration and login
- Protected routes
- User profile management
- Webhook integration for user sync

### Supabase Database
- PostgreSQL database
- Real-time subscriptions
- Row Level Security (RLS)
- User data synchronization

### Next.js Configuration
- App Router for file-based routing
- Image optimization
- API routes
- Middleware for authentication

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🔒 Security Features

- **Authentication**: Secure user authentication with Clerk
- **Protected Routes**: User-only access to dashboard and favorites
- **API Security**: Authenticated API endpoints
- **Database Security**: Row Level Security in Supabase
- **Environment Variables**: Secure configuration management

## 📊 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Efficient caching strategies
- **Database Queries**: Optimized database queries with pagination
- **Bundle Size**: Minimal bundle size with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication services
- Supabase for database and backend services
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful SVG icons

---

**Built with ❤️ using Next.js, Clerk, and Supabase** 

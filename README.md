# HomeFinder - Next.js Real Estate Application

A modern, responsive real estate application built with Next.js 14, Tailwind CSS, and React. This application helps users find their perfect home with advanced filtering capabilities and a beautiful user interface.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Property Search**: Advanced filtering by location, type, and purpose
- **Interactive Components**: Modal dialogs, carousels, and forms
- **Page Routing**: Clean URL structure with Next.js App Router
- **Mobile Responsive**: Optimized for all device sizes
- **Contact Forms**: Integrated contact and agent inquiry forms
- **Testimonials**: Customer reviews and ratings display

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **HTTP Client**: Axios
- **Icons**: Heroicons (SVG)
- **Animations**: CSS Transitions

## 📁 Project Structure

```
HomeFinder/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── globals.css        # Global styles
│   ├── findhome/          # Find Home page
│   ├── pricing/           # Pricing page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Navbar.js          # Navigation component
│   ├── Footer.js          # Footer component
│   ├── Findhome.js        # Property search component
│   ├── Pricing.js         # Pricing plans component
│   ├── About.js           # About us component
│   └── Contact.js         # Contact form component
├── public/                # Static assets
│   └── images/            # Image files
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HomeFinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Red (#dc2626) - Used for main actions and branding
- **Secondary**: Green (#16a34a) - Used for success states and CTAs
- **Accent**: Yellow (#ca8a04) - Used for highlights and warnings

### Components
- **Buttons**: Consistent button styles with hover effects
- **Cards**: Property cards with shadows and hover animations
- **Forms**: Clean, accessible form inputs with focus states
- **Modals**: Overlay dialogs for login, signup, and contact forms

## 📱 Pages

### Home Page (`/`)
- Hero carousel with property types
- Property search section
- Pricing plans
- About us section
- Contact form

### Find Home (`/findhome`)
- Advanced property filtering
- Property grid display
- Contact agent functionality
- Watchlist feature

### Pricing (`/pricing`)
- Three-tier pricing plans
- Feature comparisons
- Call-to-action buttons

### About (`/about`)
- Company information
- Customer testimonials
- Team highlights

### Contact (`/contact`)
- Contact form
- Company information
- Social media links

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Custom colors and components are defined in:
- `tailwind.config.js` - Custom colors and theme
- `app/globals.css` - Custom component classes

### Next.js
- App Router for file-based routing
- Image optimization with Next.js Image component
- SEO optimization with metadata

## 📊 API Integration

The application integrates with a mock API for property data:
- **Endpoint**: `https://mocki.io/v1/94768134-75c0-4cc0-a0bd-496a53a19800`
- **Data**: Property listings with images, prices, and details

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

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
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful SVG icons
- Mocki.io for the mock API service

---

**Built with ❤️ using Next.js and Tailwind CSS** 
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './globals.css'

export const metadata = {
  title: 'HomeFinder - Find Your Dream Home',
  description: 'Discover the perfect home with HomeFinder. Browse flats, villas, and apartments.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 
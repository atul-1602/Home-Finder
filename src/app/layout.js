import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './globals.css'

export const metadata = {
  title: 'HomeFinder - Find Your Dream Home',
  description: 'Discover the perfect home with HomeFinder. Browse flats, villas, and apartments.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1 pt-16 overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 
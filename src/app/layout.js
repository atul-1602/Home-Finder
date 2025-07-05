import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import UserSync from '../components/UserSync'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'HomeFinder - Find Your Dream Home',
  description: 'Discover the perfect home with HomeFinder. Browse flats, villas, and apartments.',
}

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkEnabled = publishableKey && publishableKey !== 'pk_test_placeholder';

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {isClerkEnabled ? (
            <ClerkProvider>
              <UserSync />
              <Navbar />
              <main className="flex-1 pt-16 overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </ClerkProvider>
          ) : (
            <>
              <Navbar />
              <main className="flex-1 pt-16 overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </>
          )}
        </div>
      </body>
    </html>
  )
} 
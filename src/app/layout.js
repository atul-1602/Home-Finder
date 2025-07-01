import './globals.css'

export const metadata = {
  title: 'HomeFinder - Find Your Dream Home',
  description: 'Discover the perfect home with HomeFinder. Browse flats, villas, and apartments.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 
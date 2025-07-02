import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Go to Homepage
          </Link>
          <Link href="/findhome" className="block px-4 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white">
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
} 
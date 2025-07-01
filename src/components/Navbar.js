'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-primary fixed top-0 w-full z-50 shadow-lg">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white text-xl font-bold">
              HomeFinder
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                Home
              </Link>
              <Link href="/pricing" className="text-white hover:text-gray-200 transition-colors">
                Pricing
              </Link>
              <Link href="/findhome" className="text-white hover:text-gray-200 transition-colors">
                Find Home
              </Link>
              <Link href="/about" className="text-white hover:text-gray-200 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
                Contact Us
              </Link>
            </div>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn btn-secondary"
              >
                Login
              </button>
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="btn btn-accent"
              >
                Signup
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-primary border-t border-red-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block text-white hover:text-gray-200 px-3 py-2">
                  Home
                </Link>
                <Link href="/pricing" className="block text-white hover:text-gray-200 px-3 py-2">
                  Pricing
                </Link>
                <Link href="/findhome" className="block text-white hover:text-gray-200 px-3 py-2">
                  Find Home
                </Link>
                <Link href="/about" className="block text-white hover:text-gray-200 px-3 py-2">
                  About Us
                </Link>
                <Link href="/contact" className="block text-white hover:text-gray-200 px-3 py-2">
                  Contact Us
                </Link>
                <div className="pt-4 pb-3 border-t border-red-700">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="btn btn-secondary w-full mb-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="btn btn-accent w-full"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Login to HomeFinder</h2>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Signup to HomeFinder</h2>
              <button
                onClick={() => setIsSignupModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Signup
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 
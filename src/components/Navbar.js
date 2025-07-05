'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

// Separate component for Clerk functionality
const ClerkNavbar = ({ isScrolled }) => {
  const { isSignedIn, user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isSignedIn) {
    return (
      <div className="relative z-[9999]">
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-medium ${
            isScrolled ? 'text-neutral-700' : 'text-white'
          }`}>
            Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </span>
          
          {/* User Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                isScrolled 
                  ? 'hover:bg-neutral-100 text-neutral-700' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              {/* Custom Avatar */}
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
                 user?.emailAddresses[0]?.emailAddress ? user.emailAddresses[0].emailAddress.charAt(0).toUpperCase() : 'U'}
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="fixed w-64 bg-white rounded-lg shadow-xl border border-neutral-200 pt-2 z-[9999] min-w-max"
                style={{
                  position: 'fixed',
                  top: '80px',
                  right: '20px',
                  backgroundColor: 'white',
                  // color: 'white',
                  zIndex: 9999,
                  minWidth: '12rem',
                  border: '1px solid primary.600',
                  boxShadow: '0 0 20px gray'
                }}
              >
                <Link href="/dashboard">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:font-bold hover:text-primary-600 border-b border-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4 hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Dashboard</span>
                  </button>
                </Link>
                <Link href="/profile">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:font-bold hover:text-primary-600 border-b border-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4 hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </button>
                </Link>
                <div className="px-4 py-2 flex justify-start items-center">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: 'w-6 h-6',
                        userButtonTrigger: 'focus:shadow-none text-sm text-white hover:bg-red-600 w-full text-left flex items-center space-x-2'
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    );
  } else {
    return (
      <>
        <SignInButton mode="modal">
          <button className="btn btn-ghost hover:bg-primary-50 hover:text-primary-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn btn-primary pulse-cta">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Signup
          </button>
        </SignUpButton>
      </>
    );
  }
};

// Mobile Clerk component
const MobileClerkNavbar = ({ isScrolled, setIsMenuOpen }) => {
  const { isSignedIn, user } = useUser();
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  if (isSignedIn) {
    return (
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-neutral-700">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
          </div>
          
          {/* Mobile User Dropdown Trigger */}
          <button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 hover:bg-neutral-100"
          >
            {/* Custom Avatar */}
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
               user?.emailAddresses[0]?.emailAddress ? user.emailAddresses[0].emailAddress.charAt(0).toUpperCase() : 'U'}
            </div>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Mobile User Dropdown Menu */}
        {isMobileDropdownOpen && (
          <div className="px-4 py-2 bg-neutral-50 rounded-lg mx-4">
            <Link href="/dashboard">
              <button className="btn btn-outline w-full justify-start text-neutral-700 border-neutral-300 hover:bg-neutral-50" onClick={() => {
                setIsMobileDropdownOpen(false);
                setIsMenuOpen(false);
              }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Dashboard
              </button>
            </Link>
            <Link href="/profile">
              <button className="btn btn-outline w-full justify-start text-neutral-700 border-neutral-300 hover:bg-neutral-50 mt-2" onClick={() => {
                setIsMobileDropdownOpen(false);
                setIsMenuOpen(false);
              }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
            </Link>
            <div className="border-t border-neutral-200 my-2"></div>
            <div className="px-2 py-1">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-6 h-6',
                    userButtonTrigger: 'focus:shadow-none text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center space-x-2'
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <>
        <SignInButton mode="modal">
          <button className="btn btn-ghost w-full justify-start">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn btn-primary w-full justify-start">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Signup
          </button>
        </SignUpButton>
      </>
    );
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClerkEnabled, setIsClerkEnabled] = useState(false);
  
  // Check if Clerk is enabled
  useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    setIsClerkEnabled(publishableKey && publishableKey !== 'pk_test_placeholder');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback authentication buttons when Clerk is not enabled
  const renderFallbackAuth = () => (
    <div className="flex items-center space-x-4">
      <span className={`text-sm ${isScrolled ? 'text-neutral-700' : 'text-white'}`}>
        Authentication not configured
      </span>
    </div>
  );

  // Fallback mobile auth
  const renderFallbackMobileAuth = () => (
    <div className="px-4 py-3">
      <span className="text-sm text-neutral-700">
        Authentication not configured
      </span>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
          : 'bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500'
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-neutral-900' : 'text-white'
              }`}>
                HomeFinder
              </span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: '/', label: 'Home' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/findhome', label: 'Find Home' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`nav-link ${
                    isScrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white hover:text-neutral-200'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isClerkEnabled ? (
                <ClerkNavbar isScrolled={isScrolled} />
              ) : (
                renderFallbackAuth()
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-neutral-200">
            <div className="container-custom py-4">
              <div className="flex flex-col space-y-4">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/pricing', label: 'Pricing' },
                  { href: '/findhome', label: 'Find Home' },
                  { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact Us' }
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="text-neutral-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Auth */}
                <div className="border-t border-neutral-200 pt-4 mt-4">
                  {isClerkEnabled ? (
                    <MobileClerkNavbar isScrolled={isScrolled} setIsMenuOpen={setIsMenuOpen} />
                  ) : (
                    renderFallbackMobileAuth()
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar; 
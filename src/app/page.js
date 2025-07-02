'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PropertySection from '../components/PropertySection';
import { getFeaturedPropertiesForHome, getRecentPropertiesForHome, getTopRatedPropertiesForHome } from '../lib/api';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  
  const slides = [
    {
      image: '/images/img4.jpeg',
      title: 'Find Your Dream Flats',
      subtitle: 'Discover modern apartments in prime locations with world-class amenities',
      buttonText: 'Explore Flats',
      buttonClass: 'btn-secondary',
      href: '/findhome',
      gradient: 'from-secondary-400/20 to-primary-400/20'
    },
    {
      image: '/images/img5.jpeg',
      title: 'Luxury Villas',
      subtitle: 'Premium villas with exclusive amenities and breathtaking views',
      buttonText: 'View Villas',
      buttonClass: 'btn-primary',
      href: '/findhome',
      gradient: 'from-primary-400/20 to-accent-400/20'
    },
    {
      image: '/images/img6.jpeg',
      title: 'Modern Apartments',
      subtitle: 'Contemporary living spaces designed for modern families',
      buttonText: 'Browse Apartments',
      buttonClass: 'btn-accent',
      href: '/findhome',
      gradient: 'from-accent-400/20 to-secondary-400/20'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={`transition-opacity duration-1000 overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Carousel */}
      <section className="hero-section">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} backdrop-blur-[1px]`}></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="max-w-4xl mx-auto px-4 animate-slide-up">
                <h1 className="heading-responsive font-bold mb-6 text-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-responsive mb-8 text-neutral-200 max-w-2xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    className={`btn ${slide.buttonClass} text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 px-8 py-4`}
                    onClick={() => router.push(slide.href)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    {slide.buttonText}
                  </button>
                  <button 
                    className="btn btn-ghost-white text-lg font-semibold px-8 py-4"
                    onClick={() => router.push('/contact')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-spacing bg-white">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <PropertySection
            title="Featured Properties"
            subtitle="Discover our handpicked premium properties"
            fetchFunction={getFeaturedPropertiesForHome}
            maxDisplay={3}
          />
        </div>
      </section>

      {/* Recent Properties */}
      <section className="section-spacing bg-neutral-50">
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <PropertySection
            title="Recently Added"
            subtitle="Latest properties added to our platform"
            fetchFunction={getRecentPropertiesForHome}
            maxDisplay={3}
          />
        </div>
      </section>

      {/* Top Rated Properties */}
      <section className="section-spacing bg-white">
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <PropertySection
            title="Top Rated Properties"
            subtitle="Most popular properties among our users"
            fetchFunction={getTopRatedPropertiesForHome}
            maxDisplay={3}
          />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-spacing bg-gradient-soft">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="heading-responsive font-bold gradient-text mb-6">
              Explore More
            </h2>
            <p className="text-responsive text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Discover all the features and services we offer to help you find your perfect home
            </p>
          </div>
          
          <div className="property-grid">
            {/* Find Home Card */}
            <div className="card group hover-lift flex flex-col h-full">
              <div className="p-8 text-center flex-1 flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Find Your Home</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-1">
                  Browse through thousands of properties with advanced filters and search options
                </p>
                <a href="/findhome" className="btn btn-secondary group-hover:scale-105 mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Start Searching
                </a>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="card group hover-lift flex flex-col h-full">
              <div className="p-8 text-center flex-1 flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Pricing Plans</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-1">
                  Choose from our flexible pricing plans designed to meet your needs
                </p>
                <a href="/pricing" className="btn btn-primary group-hover:scale-105 mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  View Plans
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="card group hover-lift flex flex-col h-full">
              <div className="p-8 text-center flex-1 flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Get in Touch</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-1">
                  Have questions? Our team is here to help you find your perfect home
                </p>
                <a href="/contact" className="btn btn-accent group-hover:scale-105 mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
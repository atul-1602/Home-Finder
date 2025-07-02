'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PropertySection from '../components/PropertySection';
import { getFeaturedPropertiesForHome, getRecentPropertiesForHome, getTopRatedPropertiesForHome } from '../lib/api';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/img4.jpeg',
      title: 'Flats',
      buttonText: 'Explore More',
      buttonClass: 'bg-green-600 hover:bg-green-700'
    },
    {
      image: '/images/img5.jpeg',
      title: 'Villas',
      buttonText: 'Explore More',
      buttonClass: 'bg-red-600 hover:bg-red-700'
    },
    {
      image: '/images/img6.jpeg',
      title: 'Apartments',
      buttonText: 'Explore More',
      buttonClass: 'bg-green-600 hover:bg-green-700'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>      
      {/* Hero Carousel */}
      <div className="relative h-screen mt-16">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl md:text-7xl font-bold mb-6">{slide.title}</h2>
                <button className={`px-8 py-3 text-white rounded-md text-lg font-medium ${slide.buttonClass}`}>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Featured Properties */}
      <PropertySection
        title="Featured Properties"
        subtitle="Discover our handpicked premium properties"
        fetchFunction={getFeaturedPropertiesForHome}
        maxDisplay={3}
      />

      {/* Recent Properties */}
      <PropertySection
        title="Recently Added"
        subtitle="Latest properties added to our platform"
        fetchFunction={getRecentPropertiesForHome}
        maxDisplay={3}
      />

      {/* Top Rated Properties */}
      <PropertySection
        title="Top Rated Properties"
        subtitle="Most popular properties among our users"
        fetchFunction={getTopRatedPropertiesForHome}
        maxDisplay={3}
      />

      {/* Quick Links Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore More
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover all the features and services we offer to help you find your perfect home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Find Home Card */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Your Home</h3>
              <p className="text-gray-600 mb-6">
                Browse through thousands of properties with advanced filters and search options
              </p>
              <a href="/findhome" className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Start Searching
              </a>
            </div>

            {/* Pricing Card */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pricing Plans</h3>
              <p className="text-gray-600 mb-6">
                Choose from our flexible pricing plans designed to meet your needs
              </p>
              <a href="/pricing" className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                View Plans
              </a>
            </div>

            {/* Contact Card */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions? Our team is here to help you find your perfect home
              </p>
              <a href="/contact" className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home; 
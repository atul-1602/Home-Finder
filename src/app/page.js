'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Findhome from '../components/Findhome';
import Pricing from '../components/Pricing';
import About from '../components/About';
import Contact from '../components/Contact';
import PropertySection from '../components/PropertySection';
import { getFeaturedProperties, getRecentProperties, getTopRatedProperties } from '../lib/api';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/img4.jpeg',
      title: 'Flats',
      buttonText: 'Explore More',
      buttonClass: 'btn-secondary'
    },
    {
      image: '/images/img5.jpeg',
      title: 'Villas',
      buttonText: 'Explore More',
      buttonClass: 'btn-primary'
    },
    {
      image: '/images/img6.jpeg',
      title: 'Apartments',
      buttonText: 'Explore More',
      buttonClass: 'btn-secondary'
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
      <Navbar />
      
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
                <button className={`btn ${slide.buttonClass} text-lg px-8 py-3`}>
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
        fetchFunction={getFeaturedProperties}
      />

      {/* Recent Properties */}
      <PropertySection
        title="Recently Added"
        subtitle="Latest properties added to our platform"
        fetchFunction={getRecentProperties}
      />

      {/* Top Rated Properties */}
      <PropertySection
        title="Top Rated Properties"
        subtitle="Most popular properties among our users"
        fetchFunction={getTopRatedProperties}
      />

      {/* Content Sections */}
      <Findhome />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home; 
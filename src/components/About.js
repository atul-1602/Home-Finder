'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const About = () => {
  useEffect(() => {
    // AOS initialization can be added here if needed
  }, []);

  const testimonials = [
    {
      image: '/images/customer1.jpeg',
      name: 'Harry Brook',
      rating: '4.1/5',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, eaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      image: '/images/customer2.jpeg',
      name: 'Liya Andrew',
      rating: '4.0/5',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, eaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      image: '/images/customer3.jpeg',
      name: 'Rahul',
      rating: '4.9/5',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, eaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Us
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to HomeFinder, a trusted and experienced real estate partner
              serving Delhi, Mumbai, Lucknow, Pune and beyond. With over a decade of
              industry expertise, we specialize in residential properties and are
              committed to providing exceptional service. Our client-centric
              approach ensures that your needs are our top priority, and we strive
              to deliver personalized attention and tailored solutions to help you
              find your dream home or make sound investment decisions. Backed by a
              team of dedicated professionals, we offer in-depth market knowledge
              and a seamless experience throughout the buying, selling, or renting
              process. Trust us to guide you on your real estate journey with
              integrity, expertise, and a passion for exceeding your expectations.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Our Happy Customers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(parseFloat(testimonial.rating)) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-primary font-semibold">
                      Rating: {testimonial.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 
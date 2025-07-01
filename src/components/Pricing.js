'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const Pricing = () => {
  useEffect(() => {
    // AOS initialization can be added here if needed
  }, []);

  const pricingPlans = [
    {
      icon: '/images/icon2.gif',
      title: 'Basic Plan',
      price: 'Starting from $500',
      features: ['Property listing', 'Basic search', 'Email support']
    },
    {
      icon: '/images/icon1.png',
      title: 'Premium Plan',
      price: 'Starting from $1100',
      features: ['Advanced search', 'Priority support', 'Property alerts', 'Virtual tours']
    },
    {
      icon: '/images/icon3.png',
      title: 'Enterprise Plan',
      price: 'Starting from $2000',
      features: ['All premium features', 'Dedicated agent', 'Custom reports', 'API access']
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <Image
                    src={plan.icon}
                    alt={plan.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.title}
                </h3>
                <div className="text-3xl font-bold text-primary mb-6">
                  {plan.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="btn btn-primary w-full">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 
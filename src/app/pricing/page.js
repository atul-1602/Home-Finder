'use client';

import { useState } from 'react';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 999,
      yearlyPrice: 9999,
      features: [
        'Browse up to 100 properties',
        'Basic search filters',
        'Email notifications',
        'Property alerts',
        'Basic support'
      ],
      popular: false
    },
    {
      name: 'Premium',
      monthlyPrice: 1999,
      yearlyPrice: 19999,
      features: [
        'Unlimited property browsing',
        'Advanced search filters',
        'Priority notifications',
        'Virtual property tours',
        'Priority support',
        'Property comparison tools',
        'Market insights'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 4999,
      yearlyPrice: 49999,
      features: [
        'Everything in Premium',
        'Custom property alerts',
        'Dedicated account manager',
        'API access',
        'White-label solutions',
        'Advanced analytics',
        '24/7 phone support'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="heading-responsive font-bold mb-6">
              Choose Your Plan
            </h1>
            <p className="text-responsive mb-8 max-w-3xl mx-auto">
              Select the perfect plan that fits your needs and budget
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-lg ${selectedPlan === 'monthly' ? 'text-white' : 'text-neutral-200'}`}>
                Monthly
              </span>
              <button
                onClick={() => setSelectedPlan(selectedPlan === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-white bg-opacity-20 transition-colors"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    selectedPlan === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${selectedPlan === 'yearly' ? 'text-white' : 'text-neutral-200'}`}>
                Yearly
                <span className="ml-2 text-sm bg-success-400 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="section-spacing bg-white pricing-section">
        <div className="container-custom py-5 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pricing-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative simple-pricing-card ${
                  plan.popular ? 'ring-2 ring-success-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-success-500 to-success-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">
                      ₹{selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-neutral-600 ml-2">
                      /{selectedPlan === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-neutral-600">
                        <svg className="w-5 h-5 text-success-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full btn transition-all duration-300 ${
                      plan.popular
                        ? 'btn-success'
                        : 'btn-outline'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-gradient-soft">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="simple-pricing-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Can I change my plan anytime?
              </h3>
              <p className="text-neutral-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="simple-pricing-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Is there a free trial?
              </h3>
              <p className="text-neutral-600">
                Yes, we offer a 7-day free trial for all plans. No credit card required to start your trial.
              </p>
            </div>
            <div className="simple-pricing-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-neutral-600">
                We accept all major credit cards, debit cards, and digital wallets including UPI, Paytm, and Google Pay.
              </p>
            </div>
            <div className="simple-pricing-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Can I cancel my subscription?
              </h3>
              <p className="text-neutral-600">
                Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 
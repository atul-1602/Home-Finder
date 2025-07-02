const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="heading-responsive font-bold mb-6">
              About HomeFinder
            </h1>
            <p className="text-responsive mb-8 max-w-3xl mx-auto">
              Your trusted partner in finding the perfect home
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                At HomeFinder, we believe everyone deserves to find their perfect home. Our mission is to simplify the home search process by providing a comprehensive platform that connects property seekers with their ideal living spaces.
              </p>
              <p className="text-lg text-neutral-600 mb-8">
                We&apos;ve revolutionized the way people search for properties by offering advanced filtering options, detailed property information, and a user-friendly interface that makes the home search journey enjoyable and efficient.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                  <div className="text-neutral-600">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">5K+</div>
                  <div className="text-neutral-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl h-96 flex items-center justify-center shadow-lg">
                <svg className="w-24 h-24 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-gradient-soft">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover-lift flex flex-col h-full">
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Trust & Transparency</h3>
                <p className="text-neutral-600 flex-1">
                  We believe in complete transparency in all our dealings. Every property listing is verified and accurate information is our priority.
                </p>
              </div>
            </div>

            <div className="card text-center hover-lift flex flex-col h-full">
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Innovation</h3>
                <p className="text-neutral-600 flex-1">
                  We continuously innovate our platform to provide the best user experience and cutting-edge features for property search.
                </p>
              </div>
            </div>

            <div className="card text-center hover-lift flex flex-col h-full">
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Customer First</h3>
                <p className="text-neutral-600 flex-1">
                  Our customers are at the heart of everything we do. We strive to exceed expectations and provide exceptional service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The passionate individuals behind HomeFinder
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">John Smith</h3>
              <p className="text-primary-600 mb-4 font-semibold">CEO & Founder</p>
              <p className="text-neutral-600">
                With over 15 years of experience in real estate, John leads our mission to revolutionize property search.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Sarah Johnson</h3>
              <p className="text-secondary-600 mb-4 font-semibold">CTO</p>
              <p className="text-neutral-600">
                Sarah brings technical expertise and innovation to ensure our platform stays ahead of the curve.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Mike Davis</h3>
              <p className="text-accent-600 mb-4 font-semibold">Head of Operations</p>
              <p className="text-neutral-600">
                Mike ensures smooth operations and exceptional customer service across all our services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 
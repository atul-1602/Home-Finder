import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <>
      <div className="pt-16">
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Welcome to HomeFinder, a trusted and experienced real estate partner serving Delhi, Mumbai, Lucknow, Pune and beyond.
                  With over a decade of industry expertise, we specialize in residential properties and are committed to providing exceptional service.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mt-6">
                  Our client-centric approach ensures that your needs are our top priority, and we strive to deliver personalized attention and tailored solutions to help you find your dream home or make sound investment decisions.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mt-6">
                  Backed by a team of dedicated professionals, we offer in-depth market knowledge and a seamless experience throughout the buying, selling, or renting process. Trust us to guide you on your real estate journey with integrity, expertise, and a passion for exceeding your expectations.
                </p>
              </div>
            </div>

            {/* Our Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Reliability</h3>
                <p className="text-gray-600">We build lasting relationships based on trust, transparency, and reliability.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise</h3>
                <p className="text-gray-600">Our team brings years of experience and deep market knowledge to every transaction.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
                <p className="text-gray-600">Your satisfaction and success are at the heart of everything we do.</p>
              </div>
            </div>

            {/* Our Team */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">John Smith</h3>
                  <p className="text-primary font-medium mb-2">Founder & CEO</p>
                  <p className="text-gray-600">15+ years of real estate experience</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
                  <p className="text-primary font-medium mb-2">Head of Operations</p>
                  <p className="text-gray-600">Expert in property management</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Davis</h3>
                  <p className="text-primary font-medium mb-2">Lead Property Consultant</p>
                  <p className="text-gray-600">Specialist in luxury properties</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 
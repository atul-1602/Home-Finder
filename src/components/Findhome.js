'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Findhome = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/94768134-75c0-4cc0-a0bd-496a53a19800")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Filter1 = (event) => {
    setRecords(
      data.filter((f) => f.location.toLowerCase().includes(event.target.value))
    );
  };
  
  const Filter2 = (event) => {
    setRecords(
      records.filter((f) => f.for.toLowerCase().includes(event.target.value))
    );
  };
  
  const Filter3 = (event) => {
    setRecords(
      records.filter((f) => f.type.toLowerCase().includes(event.target.value))
    );
  };

  return (
    <>
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Home
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect property that matches your lifestyle and budget
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h5 className="text-lg font-semibold text-gray-900 mb-4">Filters:</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="search"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search by location..."
                  onChange={Filter1}
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="search"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search by purpose..."
                  onChange={Filter2}
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="search"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search by type..."
                  onChange={Filter3}
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {records.map((property, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.type}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                      {property.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    <h6 className="text-sm text-gray-600">
                      <span className="font-semibold">Type:</span> {property.type}
                    </h6>
                    <h6 className="text-sm text-gray-600">
                      <span className="font-semibold">Location:</span> {property.location}
                    </h6>
                    <h6 className="text-sm text-gray-600">
                      <span className="font-semibold">For:</span> {property.for}
                    </h6>
                    <h5 className="text-lg font-bold text-primary">
                      {property.price}
                    </h5>
                  </div>
                  
                  <div className="flex space-x-2 mb-4">
                    <button className="btn btn-primary flex-1">
                      More Details
                    </button>
                    <button
                      onClick={() => setIsAgentModalOpen(true)}
                      className="btn btn-secondary flex-1"
                    >
                      Contact Agent
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span>Save to watchlist</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Contact Modal */}
      {isAgentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Contact Agent</h2>
              <button
                onClick={() => setIsAgentModalOpen(false)}
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
                  Message/Query
                </label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your message"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Findhome; 
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Assessment Management System</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Generate flexible PDF reports from assessment data with a configuration-driven approach
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md transition-colors text-lg"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-white border-2 border-indigo-800 hover:bg-gray-50 text-indigo-800 font-medium rounded-md transition-colors text-lg"
          >
            Get Started
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-800 mb-2">1</div>
            <h3 className="text-xl font-semibold mb-3">User Authentication</h3>
            <p className="text-gray-600">
              Secure user registration and login system with proper validation and session management.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-800 mb-2">2</div>
            <h3 className="text-xl font-semibold mb-3">PDF Report Generation</h3>
            <p className="text-gray-600">
              Convert assessment data to formatted PDF reports with flexible templates and dynamic field mapping.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-800 mb-2">3</div>
            <h3 className="text-xl font-semibold mb-3">Configuration-Driven</h3>
            <p className="text-gray-600">
              Add new assessment types without code modifications through configuration-only changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
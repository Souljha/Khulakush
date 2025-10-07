import React from 'react';
import { KHULA_KUSH_GREEN, LOGO_URL, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_TEXT_HEADING } from '../constants';

interface LandingPageProps {
  onEnterApp: () => void;
  onAuthNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onAuthNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo Section - Full width, dark background */}
      <div className="w-full bg-black flex items-center justify-center" style={{ minHeight: '40vh' }}>
        <img src="/images/new logo_01.png" alt="Khula Kush Logo" className="w-full h-full object-cover" style={{ height: '40vh' }} />
      </div>

      {/* Content Section - White background */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Navigation Buttons */}
          <div className="space-y-4 w-64 sm:w-72">
            <button
              onClick={onEnterApp}
              className="w-full bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300"
            >
              Our Products
            </button>
            <button
              onClick={() => onAuthNavigate('/grow-club')}
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border-2 border-green-700"
            >
              Grow Club
            </button>
            <button
               onClick={() => onAuthNavigate('/contact-us')}
               className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border-2 border-green-700"
            >
              Contact Us
            </button>
          </div>

          {/* Auth Links */}
          <div className="pt-6 w-64 sm:w-72">
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-around">
              <button
                onClick={() => onAuthNavigate('/login')}
                className="text-lg font-medium text-green-700 hover:text-green-800 transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => onAuthNavigate('/signup')}
                className="text-lg font-medium text-green-700 hover:text-green-800 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>

          <p className="mt-10 text-xs text-gray-600">© {new Date().getFullYear()} Khula Kush. All rights reserved. For ages 18+ only.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

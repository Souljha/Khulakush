import React from 'react';
import { KHULA_KUSH_GREEN, LOGO_URL, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_TEXT_HEADING } from '../constants';

interface LandingPageProps {
  onEnterApp: () => void;
  onAuthNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onAuthNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4" style={{backgroundImage: "url('/images/Background.png')"}}>
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay for contrast */}
      
      <div className="relative z-8 flex flex-col items-center text-center space-y-10">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/Khula kush logo 2.png" alt="Khula Kush Logo" className="w-48 h-auto mx-auto md:w-64 lg:w-80" />
          {/* The h1 "Khula Kush" is removed as the logo contains the name */}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4 w-64 sm:w-72">
          <button 
            onClick={onEnterApp}
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300`}
          >
            Our Products
          </button>
          <button 
            onClick={() => onAuthNavigate('/grow-club')}
            className={`w-full bg-black bg-opacity-60 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 border border-green-500`}
          >
            Grow Club
          </button>
          <button 
             onClick={() => onAuthNavigate('/contact-us')}
             className={`w-full bg-black bg-opacity-60 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 border border-green-500`}
          >
            Contact Us
          </button>
        </div>

        {/* Auth Links */}
        <div className="pt-6 w-64 sm:w-72">
          <div className="border-t border-gray-500 my-4"></div>
          <div className="flex justify-around">
            <button 
              onClick={() => onAuthNavigate('/login')}
              className={`text-lg font-medium text-green-300 hover:text-green-200 transition duration-300`}
            >
              Login
            </button>
            <button 
              onClick={() => onAuthNavigate('/signup')}
              className={`text-lg font-medium text-green-300 hover:text-green-200 transition duration-300`}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        <p className="mt-10 text-xs text-gray-300">© {new Date().getFullYear()} Khula Kush. All rights reserved. For ages 18+ only.</p>
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_BG_LIGHT, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN } from '../constants';

interface GrowClubPageProps {
  onBack: () => void;
}

const GrowClubPage: React.FC<GrowClubPageProps> = ({ onBack }) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-[${KHULA_KUSH_BG_LIGHT}] py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className={`mb-6 text-sm text-[${KHULA_KUSH_GREEN}] hover:text-green-700 flex items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <div className="text-center mb-10">
          <img src="/images/Grow Club.jpg" alt="Cannabis Plants" className="w-full max-w-md h-auto mx-auto mb-6 rounded-lg shadow-md" />
          <h1 className={`text-3xl sm:text-4xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}] font-poppins`}>
            Let's Grow Together: Your Path to Premium Cannabis
          </h1>
          <p className={`mt-3 text-lg text-[${KHULA_KUSH_TEXT_BODY}] max-w-2xl mx-auto`}>
            Experience the future of cannabis cultivation with our unique Grow Club service. We handle the growing, so you can enjoy the benefits.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className={`text-2xl font-semibold text-[${KHULA_KUSH_TEXT_HEADING}] mb-4`}>How It Works:</h2>
          <ul className="list-none space-y-4 text-[${KHULA_KUSH_TEXT_BODY}]">
            <li>
              <strong className={`text-[${KHULA_KUSH_GREEN}]`}>1. Subscribe and Become a Member:</strong> Upon subscribing, you'll automatically receive a premium cannabis seed, cultivated specifically for you.
            </li>
            <li>
              <strong className={`text-[${KHULA_KUSH_GREEN}]`}>2. Choose Your Strain:</strong> Select either a CBD-rich or THC-dominant plant, tailoring your experience to your needs.
            </li>
            <li>
              <strong className={`text-[${KHULA_KUSH_GREEN}]`}>3. Cultivation Period:</strong> From seed to harvest, our expert horticulturalists nurture your plant for approximately 3-4 months, ensuring optimal growth and yield.
            </li>
          </ul>
          <div className="mt-8 text-center">
            <p className={`text-lg text-[${KHULA_KUSH_TEXT_BODY}] mb-4`}>Ready to start your growing journey?</p>
            <button
              onClick={() => navigate('/subscribe')}
              className={`bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300`}
            >
              Subscribe to Our Membership
            </button>
          </div>
        </div>
        
        <div className={`mt-12 text-center text-xs text-[${KHULA_KUSH_TEXT_MUTED}]`}>
            <p>Grow Club services are managed securely. For ages 18+ only.</p>
            <p>© {new Date().getFullYear()} Khula Kush. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default GrowClubPage;

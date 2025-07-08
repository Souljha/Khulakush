import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { KHULA_KUSH_GREEN, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

const ProfilePage: React.FC = () => {
  const { user, logout, updateUserNewsletterSubscription } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Redirect to login, preserving the intended profile page path
    navigate('/login?redirect=/app/profile');
    return null; 
  }

  const handleNewsletterToggle = () => {
    updateUserNewsletterSubscription(!user.subscribedToNewsletter);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to landing page after logout
  };

  return (
    <div className={`p-4 min-h-screen bg-white text-[${KHULA_KUSH_TEXT_HEADING}]`}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center border-b pb-2 border-green-500">My Profile</h1>
        
        <div className={`bg-white p-6 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}] mb-6`}>
          <div className="mb-4">
            <label className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_MUTED}]`}>Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          {user.name && (
            <div className="mb-4">
              <label className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_MUTED}]`}>Name</label>
              <p className="text-lg">{user.name}</p>
            </div>
          )}
        </div>

        <div className={`bg-white p-6 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}] mb-6`}>
            <h2 className="text-xl font-semibold mb-3">My Subscription</h2>
            {user.subscriptionTierName ? (
              <div>
                <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>Current Plan: <strong className={`text-[${KHULA_KUSH_GREEN}]`}>{user.subscriptionTierName}</strong></p>
                <Link to="/subscribe" className={`mt-2 inline-block text-sm text-[${KHULA_KUSH_GREEN}] hover:text-green-700 underline`}>
                  View or Change Subscription
                </Link>
              </div>
            ) : (
              <div>
                <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>You are not currently subscribed to a monthly plan.</p>
                <Link to="/subscribe" className={`mt-2 inline-block bg-[${KHULA_KUSH_GREEN}] text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200`}>
                  Explore Subscription Tiers
                </Link>
              </div>
            )}
        </div>


        <div className={`bg-white p-6 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}] mb-6`}>
            <h2 className="text-xl font-semibold mb-3">Notifications</h2>
            <div className="flex items-center justify-between">
            <span className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>Subscribe to Newsletter</span>
            <button
                onClick={handleNewsletterToggle}
                aria-pressed={user.subscribedToNewsletter}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                user.subscribedToNewsletter ? `bg-[${KHULA_KUSH_GREEN}] focus:ring-[${KHULA_KUSH_GREEN}]` : `bg-gray-300 focus:ring-gray-400`
                }`}
            >
                <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                    user.subscribedToNewsletter ? 'translate-x-6' : 'translate-x-1'
                }`}
                />
            </button>
            </div>
            <p className={`text-xs text-[${KHULA_KUSH_TEXT_MUTED}] mt-2`}>
            {user.subscribedToNewsletter ? "You'll receive updates on new products, specials, and partner stores." : "Opt-in for email updates."}
            </p>
        </div>


        <button
          onClick={handleLogout}
          className={`w-full bg-red-600 text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75`}
        >
          Logout
        </button>

        <p className={`mt-8 text-center text-xs text-[${KHULA_KUSH_TEXT_MUTED}]`}>
            For support, please visit the <Link to="/contact-us" className="underline hover:text-green-600">Contact Us</Link> page.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
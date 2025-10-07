import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY } from '../constants';

const PaymentCancelledPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white text-[${KHULA_KUSH_TEXT_HEADING}] p-4`}>
      <div className="max-w-md w-full text-center">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 mb-6">
          <div className="text-yellow-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-yellow-700 mb-4">Payment Cancelled</h1>

          <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-6`}>
            Your payment was cancelled. Your order is still saved and you can try again.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6">
            <p className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>
              If you experienced any issues, please contact us at:<br />
              <strong>info@highgroundsblvd.com</strong>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/app/checkout')}
            className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Try Payment Again
          </button>

          <button
            onClick={() => navigate('/app/products')}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelledPage;

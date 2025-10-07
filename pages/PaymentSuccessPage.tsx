import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY } from '../constants';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white text-[${KHULA_KUSH_TEXT_HEADING}] p-4`}>
      <div className="max-w-md w-full text-center">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-6">
          <div className={`text-[${KHULA_KUSH_GREEN}] mb-6`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>

          <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-6`}>
            Thank you for your payment. Your order has been confirmed and is being processed.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6">
            <p className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}] mb-2`}>
              You will receive a WhatsApp confirmation shortly with your order details.
            </p>
            <p className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>
              <strong>Highgrounds BLVD</strong><br />
              Illovo Junction Shopping Centre<br />
              Wed-Sun: 10:00 AM - 10:00 PM
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/app/products')}
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200`}
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate('/app/profile')}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

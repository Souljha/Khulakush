import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY } from '../constants';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState<any>(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      setError('Order ID is missing');
      setLoading(false);
      return;
    }

    initializePayment();
  }, [orderId]);

  const initializePayment = async () => {
    try {
      const backendUrl = process.env.VITE_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/payment/initialize/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const data = await response.json();
      setPaymentData(data);
      setLoading(false);

      // Auto-submit the form after a short delay
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.submit();
        }
      }, 1500);

    } catch (error) {
      console.error('Error initializing payment:', error);
      setError('Failed to initialize payment. Please try again.');
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-white text-[${KHULA_KUSH_TEXT_HEADING}] p-4`}>
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Error</h2>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-4`}>{error}</p>
          <button
            onClick={() => navigate('/app/products')}
            className={`bg-[${KHULA_KUSH_GREEN}] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition`}
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-white text-[${KHULA_KUSH_TEXT_HEADING}]`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Processing Your Payment...</h2>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>Please wait while we redirect you to PayFast</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white text-[${KHULA_KUSH_TEXT_HEADING}] p-4`}>
      <div className="max-w-md w-full">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-6">
          <div className={`text-[${KHULA_KUSH_GREEN}] mb-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Redirecting to PayFast</h2>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-4`}>
            Order: <strong>{paymentData?.orderNumber}</strong>
          </p>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>
            You will be redirected to complete your payment...
          </p>
        </div>

        {paymentData && (
          <form
            ref={formRef}
            action={paymentData.paymentUrl}
            method="POST"
            className="hidden"
          >
            {Object.entries(paymentData.paymentData).map(([key, value]) => (
              <input
                key={key}
                type="hidden"
                name={key}
                value={value as string}
              />
            ))}
          </form>
        )}

        <div className="text-center">
          <button
            onClick={() => formRef.current?.submit()}
            className={`bg-[${KHULA_KUSH_GREEN}] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold`}
          >
            Click here if not redirected automatically
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

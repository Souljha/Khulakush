import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY } from '../constants';
import { useAuth } from '../hooks/useAuth';

interface Order {
  _id: string;
  orderNumber: string;
  customerInfo: {
    name: string;
    phone: string;
  };
  orderType: string;
  deliveryAddress?: {
    street: string;
    city: string;
  };
}

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      fetchOrder(orderId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchOrder = async (orderId: string) => {
    try {
      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white text-[${KHULA_KUSH_TEXT_HEADING}] p-4`}>
      <div className="max-w-md w-full text-center">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-6">
          <div className={`text-[${KHULA_KUSH_GREEN}] mb-6`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-700 mb-4">Order Placed!</h1>

          {order && (
            <>
              <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-6`}>
                Thank you for your order, {order.customerInfo.name}!
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className={`text-2xl font-bold text-[${KHULA_KUSH_GREEN}]`}>{order.orderNumber}</p>
              </div>

              <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-4`}>
                {order.orderType === 'delivery'
                  ? `Your order will be delivered to ${order.deliveryAddress?.street || 'your address'}`
                  : `Your order is ready for ${order.orderType}`
                }
              </p>
            </>
          )}

          {!order && (
            <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-6`}>
              Thank you for your payment. Your order has been confirmed and is being processed.
            </p>
          )}

          <div className="bg-white rounded-lg p-4 mb-6">
            <p className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}] mb-2`}>
              A confirmation has been sent via WhatsApp to {order?.customerInfo.phone || user?.phone || 'your number'}.
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
            className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
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

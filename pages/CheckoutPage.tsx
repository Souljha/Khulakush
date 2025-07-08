import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { KHULA_KUSH_GREEN, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!user) {
    navigate('/login?redirect=/app/checkout');
    return null;
  }

  if (cart.length === 0 && !orderConfirmed) {
     navigate('/app/products');
     return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim() || !contactNumber.trim()) {
      alert("Please fill in delivery address and contact number.");
      return;
    }

    setIsProcessing(true);
    console.log("Initiating Payfast payment for order total:", totalPrice);
    console.log("Delivery Address:", deliveryAddress);
    console.log("Contact Number:", contactNumber);
    console.log("User:", user.email);
    console.log("Cart Items:", cart);

    await new Promise(resolve => setTimeout(resolve, 2000)); // Shorter delay for testing

    setIsProcessing(false);
    setOrderConfirmed(true);
    clearCart(); 
  };

  if (orderConfirmed) {
    return (
      <div className={`p-4 min-h-screen bg-white text-[${KHULA_KUSH_TEXT_HEADING}] flex flex-col items-center justify-center`}>
        <div className={`bg-white p-8 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}] text-center max-w-md`}>
          <CheckCircleIcon className={`w-20 h-20 text-[${KHULA_KUSH_GREEN}] mx-auto mb-6`} />
          <h1 className={`text-3xl font-semibold text-[${KHULA_KUSH_GREEN}] mb-4`}>Order Confirmed!</h1>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-2`}>Thank you for your purchase, {user.name || user.email}.</p>
          <p className={`text-[${KHULA_KUSH_TEXT_MUTED}] mb-6`}>Your order is being processed and will be delivered to: <br/><strong className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>{deliveryAddress}</strong>.</p>
          <p className={`text-xs text-gray-400 mb-6`}>A confirmation email has been sent to {user.email}.</p>
          <button
            onClick={() => navigate('/app/products')}
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 min-h-screen bg-white text-[${KHULA_KUSH_TEXT_HEADING}]`}>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold mb-6 border-b pb-2 border-green-500">Checkout</h1>
        
        <form onSubmit={handlePayment} className={`bg-white p-6 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-2 border-b border-gray-200 pb-4">
            {cart.map(item => (
              <div key={item.id} className={`flex justify-between text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>
                <span>{item.name} (x{item.quantity})</span>
                <span>R {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={`flex justify-between text-lg font-bold mb-6 pt-2 text-[${KHULA_KUSH_TEXT_HEADING}]`}>
            <span>Total:</span>
            <span>R {totalPrice.toFixed(2)}</span>
          </div>

          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <div className="mb-4">
            <label htmlFor="deliveryAddress" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Delivery Address</label>
            <input
              type="text"
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="123 Green Leaf St, Suburb, City"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contactNumber" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="082 123 4567"
            />
          </div>

          <div className={`mb-6 p-3 bg-[${KHULA_KUSH_SURFACE_LIGHT}] rounded-md border border-gray-200`}>
            <p className={`text-sm text-center text-[${KHULA_KUSH_TEXT_MUTED}]`}>
              You will be redirected to <strong className={`text-[${KHULA_KUSH_GREEN}]`}>Payfast</strong> to complete your payment securely.
            </p>
            <p className={`text-center text-xs text-gray-400 mt-1`}>Please ensure you are 18+ to complete this purchase.</p>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? 'Processing Payment...' : `Pay R ${totalPrice.toFixed(2)} via Payfast`}
          </button>
        </form>
      </div>
    </div>
  );
};


const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);


export default CheckoutPage;
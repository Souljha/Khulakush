import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { KHULA_KUSH_GREEN, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState<'pickup' | 'dine-in' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    province: 'Gauteng',
    postalCode: '',
    notes: ''
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!user) {
    navigate('/login?redirect=/app/checkout');
    return null;
  }

  if (cart.length === 0 && !orderConfirmed) {
     navigate('/app/products');
     return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (orderType === 'delivery' && (!deliveryAddress.street.trim() || !deliveryAddress.city.trim() || !deliveryAddress.postalCode.trim())) {
      alert("Please fill in all delivery address fields.");
      return;
    }

    setIsProcessing(true);

    try {
      const backendUrl = process.env.VITE_APP_BACKEND_URL;

      // Prepare order data
      const orderData = {
        customerInfo: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim()
        },
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
          category: item.category,
          subCategory: item.subCategory
        })),
        totalAmount: totalPrice,
        orderType,
        ...(orderType === 'delivery' && {
          deliveryAddress: {
            street: deliveryAddress.street.trim(),
            city: deliveryAddress.city.trim(),
            province: deliveryAddress.province,
            postalCode: deliveryAddress.postalCode.trim(),
            notes: deliveryAddress.notes.trim()
          }
        }),
        specialInstructions: specialInstructions.trim()
      };

      // Send order to backend
      const response = await fetch(`${backendUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();

      // Clear cart and redirect to payment
      clearCart();

      // Redirect to payment page with order ID
      navigate(`/payment?orderId=${data.order._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className={`p-4 min-h-screen bg-white text-[${KHULA_KUSH_TEXT_HEADING}] flex flex-col items-center justify-center`}>
        <div className={`bg-white p-8 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}] text-center max-w-md`}>
          <CheckCircleIcon className={`w-20 h-20 text-[${KHULA_KUSH_GREEN}] mx-auto mb-6`} />
          <h1 className={`text-3xl font-semibold text-[${KHULA_KUSH_GREEN}] mb-4`}>Order Placed!</h1>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}] mb-2`}>Thank you for your order, {name}!</p>
          <div className={`bg-[${KHULA_KUSH_SURFACE_LIGHT}] p-4 rounded-lg mb-4`}>
            <p className={`text-sm text-[${KHULA_KUSH_TEXT_MUTED}] mb-1`}>Order Number</p>
            <p className={`text-2xl font-bold text-[${KHULA_KUSH_GREEN}]`}>{orderNumber}</p>
          </div>
          <p className={`text-[${KHULA_KUSH_TEXT_MUTED}] mb-2`}>
            {orderType === 'delivery'
              ? 'Your order will be delivered to your address'
              : orderType === 'pickup'
                ? 'Ready for pickup at:'
                : 'See you at:'
            }
            {orderType !== 'delivery' && (
              <>
                <br/>
                <strong className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>Highgrounds BLVD</strong><br/>
                <span className="text-sm">Illovo Junction Shopping Centre</span>
              </>
            )}
          </p>
          <p className={`text-xs text-gray-400 mb-6`}>A confirmation has been sent via WhatsApp to {phone}.</p>
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
        
        <form onSubmit={handlePlaceOrder} className={`bg-white p-6 rounded-lg shadow-xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-2 border-b border-gray-200 pb-4">
            {cart.map(item => (
              <div key={item._id} className={`flex justify-between text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>
                <span>{item.name} (x{item.quantity})</span>
                <span>R {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={`flex justify-between text-lg font-bold mb-6 pt-2 text-[${KHULA_KUSH_TEXT_HEADING}]`}>
            <span>Total:</span>
            <span>R {totalPrice.toFixed(2)}</span>
          </div>

          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <div className="mb-4">
            <label htmlFor="name" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Full Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Email Address *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Phone Number *</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="082 123 4567"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">Order Type</h2>
          <div className="mb-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`p-3 rounded-lg border-2 transition ${orderType === 'pickup' ? `border-[${KHULA_KUSH_GREEN}] bg-green-50` : 'border-gray-300'}`}
            >
              <p className="font-semibold">Pickup</p>
              <p className="text-xs text-gray-600">Collect at store</p>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('dine-in')}
              className={`p-3 rounded-lg border-2 transition ${orderType === 'dine-in' ? `border-[${KHULA_KUSH_GREEN}] bg-green-50` : 'border-gray-300'}`}
            >
              <p className="font-semibold">Dine-In</p>
              <p className="text-xs text-gray-600">Eat at Highgrounds</p>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`p-3 rounded-lg border-2 transition ${orderType === 'delivery' ? `border-[${KHULA_KUSH_GREEN}] bg-green-50` : 'border-gray-300'}`}
            >
              <p className="font-semibold">Delivery</p>
              <p className="text-xs text-gray-600">Get it delivered</p>
            </button>
          </div>

          {orderType === 'delivery' && (
            <div className={`mb-6 p-4 bg-[${KHULA_KUSH_SURFACE_LIGHT}] rounded-lg border border-gray-300`}>
              <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
              <div className="mb-3">
                <label htmlFor="street" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Street Address *</label>
                <input
                  type="text"
                  id="street"
                  value={deliveryAddress.street}
                  onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                  required={orderType === 'delivery'}
                  className={`w-full p-2.5 rounded-md bg-white text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="city" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>City *</label>
                  <input
                    type="text"
                    id="city"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                    required={orderType === 'delivery'}
                    className={`w-full p-2.5 rounded-md bg-white text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
                    placeholder="Sandton"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={deliveryAddress.postalCode}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, postalCode: e.target.value})}
                    required={orderType === 'delivery'}
                    className={`w-full p-2.5 rounded-md bg-white text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
                    placeholder="2196"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="province" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Province</label>
                <select
                  id="province"
                  value={deliveryAddress.province}
                  onChange={(e) => setDeliveryAddress({...deliveryAddress, province: e.target.value})}
                  className={`w-full p-2.5 rounded-md bg-white text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
                >
                  <option value="Gauteng">Gauteng</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="Eastern Cape">Eastern Cape</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  <option value="Free State">Free State</option>
                  <option value="Limpopo">Limpopo</option>
                  <option value="Mpumalanga">Mpumalanga</option>
                  <option value="North West">North West</option>
                  <option value="Northern Cape">Northern Cape</option>
                </select>
              </div>
              <div>
                <label htmlFor="addressNotes" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Additional Notes (Optional)</label>
                <textarea
                  id="addressNotes"
                  value={deliveryAddress.notes}
                  onChange={(e) => setDeliveryAddress({...deliveryAddress, notes: e.target.value})}
                  rows={2}
                  className={`w-full p-2.5 rounded-md bg-white text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
                  placeholder="Gate code, building name, etc."
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="specialInstructions" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Special Instructions (Optional)</label>
            <textarea
              id="specialInstructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="Any dietary requirements or preferences..."
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? 'Placing Order...' : `Place Order - R ${totalPrice.toFixed(2)}`}
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
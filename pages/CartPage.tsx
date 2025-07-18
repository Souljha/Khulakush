import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { TrashIcon, PlusIcon, MinusIcon } from '../components/Icons';
import { KHULA_KUSH_GREEN, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert("Please log in to proceed to checkout.");
      navigate('/login?redirect=/app/checkout'); // Redirect to login then checkout
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate('/app/checkout');
  };

  return (
    <div className={`p-4 min-h-screen bg-white text-[${KHULA_KUSH_TEXT_HEADING}]`}>
      <div className="max-w-2xl mx-auto">
        <div className={`flex justify-between items-center mb-6 pb-2 border-b border-[${KHULA_KUSH_GREEN}]`}>
            <h1 className="text-3xl font-semibold">Your Cart</h1>
            {cart.length > 0 && (
                <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-500 flex items-center"
                aria-label="Clear all items from cart"
                >
                <TrashIcon className="w-4 h-4 mr-1" /> Clear Cart
                </button>
            )}
        </div>
        

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCartIconEmpty className={`w-24 h-24 mx-auto text-[${KHULA_KUSH_TEXT_MUTED}]`} />
            <p className={`mt-4 text-xl text-[${KHULA_KUSH_TEXT_MUTED}]`}>Your cart is empty.</p>
            <button
              onClick={() => navigate('/app/products')}
              className={`mt-6 bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item._id} className={`bg-white p-4 rounded-lg shadow-md border border-[${KHULA_KUSH_SURFACE_LIGHTER}] flex items-center justify-between`}>
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>R {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className={`p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700`} aria-label={`Decrease quantity of ${item.name}`}>
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className={`p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700`} aria-label={`Increase quantity of ${item.name}`}>
                    <PlusIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeFromCart(item._id)} className={`text-red-500 hover:text-red-400 ml-2`} aria-label={`Remove ${item.name} from cart`}>
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <div className={`mt-8 pt-4 border-t border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
              <div className="flex justify-between items-center text-xl font-semibold">
                <span>Total:</span>
                <span>R {totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className={`w-full mt-6 bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder for empty cart icon
const ShoppingCartIconEmpty: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);


export default CartPage;

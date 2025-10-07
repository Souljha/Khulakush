import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface AccessoryCardProps {
  product: Product;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    // Compact view
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-gray-100 rounded-full px-4 py-3 flex items-center justify-between hover:bg-gray-200 transition duration-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-base font-medium text-gray-800">{product.name}</span>
        </div>
        <span className="text-base font-semibold text-gray-800">R {product.price.toFixed(0)}</span>
      </button>
    );
  }

  // Expanded view
  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
      <button
        onClick={() => setIsExpanded(false)}
        className="w-full text-left"
      >
        <div className="flex items-center gap-3 mb-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-base font-medium text-gray-800">{product.name}</span>
          <span className="ml-auto text-base font-semibold text-gray-800">R {product.price.toFixed(0)}</span>
        </div>
      </button>

      {/* Large product image */}
      <div className="mb-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Product details */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        {product.details && (
          <p className="text-sm text-gray-600 mb-1">{product.details}</p>
        )}
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>

      {/* Price and Order button */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">R {product.price.toFixed(0)}</span>
        <button
          onClick={() => {
            addToCart(product);
            setIsExpanded(false);
          }}
          className="bg-green-700 text-white text-base font-semibold py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default AccessoryCard;

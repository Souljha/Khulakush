import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-3 border border-khula-surface-lighter">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0" 
      />
      <div className="p-3 flex-grow text-left w-full md:ml-4">
        <h3 className="text-lg font-semibold text-khula-text-heading">{product.name}</h3>
        <p className="text-xs text-khula-text-body mt-1 h-10 overflow-hidden">{product.description}</p>
        {product.details && <p className="text-xs text-khula-green mt-1 font-medium">{product.details}</p>}
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-khula-text-heading">R {product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-khula-green text-khula-text-on-green text-sm font-semibold py-2 px-4 rounded-md hover:bg-khula-green-hover transition duration-200 focus:outline-none focus:ring-2 focus:ring-khula-green focus:ring-opacity-75"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

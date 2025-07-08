import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { KHULA_KUSH_GREEN, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-3 border border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0" 
      />
      <div className="p-3 flex-grow text-left w-full md:ml-4">
        <h3 className={`text-lg font-semibold text-[${KHULA_KUSH_TEXT_HEADING}]`}>{product.name}</h3>
        <p className={`text-xs text-[${KHULA_KUSH_TEXT_BODY}] mt-1 h-10 overflow-hidden`}>{product.description}</p>
        {product.details && <p className={`text-xs text-[${KHULA_KUSH_GREEN}] mt-1 font-medium`}>{product.details}</p>}
        <div className="flex justify-between items-center mt-3">
          <p className={`text-lg font-bold text-[${KHULA_KUSH_TEXT_HEADING}]`}>R {product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className={`bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] text-sm font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

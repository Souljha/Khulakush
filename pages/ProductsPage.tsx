import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductCategory, FlowerType, FoodType, AccessoryType } from '../types';
import { CATEGORIES_ORDER, KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN } from '../constants';
import ProductCard from '../components/ProductCard';
import FlowerCard from '../components/FlowerCard';
import FoodCard from '../components/FoodCard';
import AccessoryCard from '../components/AccessoryCard';
import { MagnifyingGlassIcon } from '../components/Icons';
import { useCart } from '../hooks/useCart';

const ProductsPage: React.FC = () => {
  // Force a rebuild to ensure VITE_APP_BACKEND_URL is picked up
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(CATEGORIES_ORDER[0]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        const fetchProducts = async () => {
          try {
            console.log('Fetching products...');
            const backendUrl = process.env.VITE_APP_BACKEND_URL;
            console.log('Backend URL:', backendUrl);
            const response = await fetch(`${backendUrl}/api/products`); // Ensure no trailing slash
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Product[] = await response.json();
            console.log('Products fetched:', data);
            setProducts(data);
          } catch (err: any) {
            console.error('Error fetching products:', err);
            setError(err.message);
          } finally {
            console.log('Setting loading to false.');
            setLoading(false);
          }
        };

    fetchProducts();
  }, []);

  // Filter products based on search term and selected category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const productsBySubCategory = useMemo(() => {
    if (selectedCategory === ProductCategory.FLOWER) {
      const greendoorFlowers = filteredProducts.filter(p => p.subCategory === FlowerType.GREENDOOR);
      const indoorFlowers = filteredProducts.filter(p => p.subCategory === FlowerType.INDOOR);
      return [
        { title: FlowerType.GREENDOOR, items: greendoorFlowers },
        { title: FlowerType.INDOOR, items: indoorFlowers },
      ];
    } else if (selectedCategory === ProductCategory.FOOD) {
      const edibles = filteredProducts.filter(p => p.subCategory === FoodType.EDIBLES);
      const breakfast = filteredProducts.filter(p => p.subCategory === FoodType.BREAKFAST);
      const breakfastAddOns = filteredProducts.filter(p => p.subCategory === FoodType.BREAKFAST_ADD_ONS);
      const tapasLunch = filteredProducts.filter(p => p.subCategory === FoodType.TAPAS_LUNCH);
      const burgers = filteredProducts.filter(p => p.subCategory === FoodType.BURGERS);
      const cafeCoffee = filteredProducts.filter(p => p.subCategory === FoodType.CAFE_COFFEE);
      return [
        { title: FoodType.EDIBLES, items: edibles },
        { title: FoodType.BREAKFAST, items: breakfast },
        { title: FoodType.TAPAS_LUNCH, items: tapasLunch },
        { title: FoodType.BURGERS, items: burgers },
        { title: FoodType.CAFE_COFFEE, items: cafeCoffee },
        { title: FoodType.BREAKFAST_ADD_ONS, items: breakfastAddOns },
      ].filter(group => group.items.length > 0); // Only include groups with items
    } else if (selectedCategory === ProductCategory.ACCESSORIES) {
      const dabs = filteredProducts.filter(p => p.subCategory === AccessoryType.DABS);
      const vetPro = filteredProducts.filter(p => p.subCategory === AccessoryType.VET_PRO);
      const general = filteredProducts.filter(p => p.subCategory === AccessoryType.GENERAL);
      return [
        { title: AccessoryType.DABS, items: dabs },
        { title: AccessoryType.VET_PRO, items: vetPro },
        { title: AccessoryType.GENERAL, items: general },
      ].filter(group => group.items.length > 0); // Only include groups with items
    }
    return [{ title: null, items: filteredProducts }];
  }, [filteredProducts, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className={`text-[${KHULA_KUSH_TEXT_MUTED}]`}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className={`text-red-500`}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-40 bg-[${KHULA_KUSH_GREEN}] p-4 shadow-md`}>
        <h1 className={`text-xl font-semibold text-[${KHULA_KUSH_TEXT_ON_GREEN}]`}>Good evening!</h1>
        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 pl-10 rounded-md bg-green-700 text-[${KHULA_KUSH_TEXT_ON_GREEN}] border border-green-800 placeholder-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none`}
          />
          <MagnifyingGlassIcon className={`w-5 h-5 text-green-300 absolute left-3 top-1/2 transform -translate-y-1/2`} />
        </div>
      </header>

      {/* Category Tabs */}
      <div className={`sticky top-[92px] z-30 bg-white border-b border-gray-200 overflow-x-auto whitespace-nowrap`}>
         <div className="flex px-2 space-x-1 sm:justify-center">
            {CATEGORIES_ORDER.map(category => (
            <button
                key={category}
                onClick={() => {
                  if (category === ProductCategory.GROW_CLUB) {
                    navigate('/grow-club');
                  } else {
                    setSelectedCategory(category);
                  }
                }}
                className={`py-3 px-4 text-sm font-medium transition-colors duration-200
                ${selectedCategory === category && category !== ProductCategory.GROW_CLUB
                    ? `border-b-2 border-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_GREEN}]` 
                    : `text-[${KHULA_KUSH_TEXT_MUTED}] hover:text-gray-700`}
                `}
            >
                {category === ProductCategory.GROW_CLUB ? 'Grow Club' : category}
            </button>
            ))}
        </div>
      </div>
      
      {/* Product Grid / List */}
      <div className="flex-grow p-4 overflow-y-auto">
        {productsBySubCategory.map((group, index) => (
          <section key={group.title || index} className="mb-8">
            {group.title && (
              <h2 className={`text-2xl font-semibold mb-4 text-[${KHULA_KUSH_TEXT_HEADING}] border-l-4 border-[${KHULA_KUSH_GREEN}] pl-2`}>
                {group.title}
              </h2>
            )}
            {group.items.length === 0 && (
                 <p className={`text-[${KHULA_KUSH_TEXT_MUTED}] text-center py-8`}>No products found in this category matching your search.</p>
            )}
            {group.title === FoodType.BREAKFAST_ADD_ONS ? (
              <ul className="list-disc pl-5 space-y-2">
                {group.items.map(product => (
                  <li key={product._id} className="text-gray-700 text-lg flex justify-between items-center pb-2 mb-2 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                    <span>{product.name} - <span className="font-semibold">R {product.price.toFixed(2)}</span></span>
                    <button
                      onClick={() => addToCart(product)}
                      className={`bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] text-sm font-semibold py-1 px-3 rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                    >
                      Add on
                    </button>
                  </li>
                ))}
              </ul>
            ) : selectedCategory === ProductCategory.FLOWER ? (
              <div className="space-y-3">
                {group.items.map(product => (
                  <FlowerCard key={product._id} product={product} />
                ))}
              </div>
            ) : selectedCategory === ProductCategory.FOOD ? (
              <div className="space-y-3">
                {group.items.map(product => (
                  <FoodCard key={product._id} product={product} />
                ))}
              </div>
            ) : selectedCategory === ProductCategory.ACCESSORIES ? (
              <div className="space-y-3">
                {group.items.map(product => (
                  <AccessoryCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.items.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

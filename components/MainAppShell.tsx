import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon } from './Icons';
import { useCart } from '../hooks/useCart';
import { KHULA_KUSH_GREEN, KHULA_KUSH_SURFACE_LIGHTER, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_BODY } from '../constants';


interface MainAppShellProps {}

const MainAppShell: React.FC<MainAppShellProps> = () => {
  const { cart } = useCart();
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { path: '/app/products', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { path: '/app/cart', label: 'Cart', icon: <ShoppingCartIcon className="w-6 h-6" />, badge: totalItemsInCart > 0 ? totalItemsInCart : undefined },
    { path: '/app/profile', label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
    { path: '/app/chat', label: 'Chat', icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Content Area */}
      <main className="flex-grow overflow-y-auto pb-20"> {/* padding-bottom to avoid overlap with fixed nav */}
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[${KHULA_KUSH_SURFACE_LIGHTER}] shadow-lg z-50`}>
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 relative ${
                  isActive ? `text-[${KHULA_KUSH_GREEN}]` : `text-[${KHULA_KUSH_TEXT_MUTED}] hover:text-[${KHULA_KUSH_TEXT_BODY}]`
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
              {item.badge && (
                <span className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainAppShell;

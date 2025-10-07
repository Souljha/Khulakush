import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainAppShell from './components/MainAppShell';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ContactUsPage from './pages/ContactUsPage';
import CheckoutPage from './pages/CheckoutPage';
import GrowClubPage from './pages/GrowClubPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelledPage from './pages/PaymentCancelledPage';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnterApp = () => {
    navigate('/app/products');
  };
  
  const handleAuthRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <Routes>
      {/* Standalone Pages (no MainAppShell) */}
      <Route path="/" element={<LandingPage onEnterApp={handleEnterApp} onAuthNavigate={handleAuthRedirect} />} />
      <Route path="/login" element={<LoginPage onSuccessfulLogin={() => {
         const queryParams = new URLSearchParams(location.search);
         const redirectPath = queryParams.get('redirect') || '/app/products';
         navigate(redirectPath, { replace: true });
      }} />} />
      <Route path="/signup" element={<SignUpPage onSuccessfulSignup={() => navigate('/app/products', { replace: true })} />} />
      <Route path="/contact-us" element={<ContactUsPage onBack={() => navigate('/')} />} />
      <Route path="/grow-club" element={<GrowClubPage onBack={() => navigate('/')} />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="/payment/cancelled" element={<PaymentCancelledPage />} />
      
      {/* Main Application Routes with Shell */}
      <Route path="/app/*" element={<MainAppShell />}>
        <Route path="products" element={<ProductsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        {/* Default route for /app -> /app/products */}
        <Route index element={<Navigate to="products" replace />} />
        {/* Fallback for /app/unknown -> /app/products */}
        <Route path="*" element={<Navigate to="products" replace />} />
      </Route>

      {/* Fallback for any other non-matched top-level path, redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;

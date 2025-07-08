import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { KHULA_KUSH_GREEN, KHULA_KUSH_YELLOW, KHULA_KUSH_BG_LIGHT, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, LOGO_URL, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

interface LoginPageProps {
  onSuccessfulLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Mock login logic
    if (email === 'user@example.com' && password === 'password123') {
      login({ id: '1', email, name: 'Test User', subscribedToNewsletter: false });
      
      const queryParams = new URLSearchParams(location.search);
      const redirectPath = queryParams.get('redirect');

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        onSuccessfulLogin();
      }
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[${KHULA_KUSH_BG_LIGHT}] p-4`}>
       <Link to="/" className={`absolute top-4 left-4 text-sm text-[${KHULA_KUSH_GREEN}] hover:text-green-700`}>&larr; Back to Home</Link>
      <div className="mb-8 text-center">
        <img src={LOGO_URL} alt="Khula Kush Logo" className="w-36 h-auto mx-auto mb-4" />
        <h1 className={`text-3xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}] font-poppins`}>Login</h1>
      </div>
      <form onSubmit={handleSubmit} className={`w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
        >
          Login
        </button>
        <p className={`mt-6 text-center text-sm text-[${KHULA_KUSH_TEXT_MUTED}]`}>
          Don't have an account? <Link to="/signup" className={`text-[${KHULA_KUSH_GREEN}] hover:underline font-medium`}>Sign Up</Link>
        </p>
      </form>
      <p className={`mt-8 text-xs text-[${KHULA_KUSH_TEXT_MUTED}]`}>© {new Date().getFullYear()} Khula Kush. Ages 18+.</p>
    </div>
  );
};

export default LoginPage;
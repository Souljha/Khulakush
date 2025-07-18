import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { KHULA_KUSH_GREEN, KHULA_KUSH_YELLOW, KHULA_KUSH_BG_LIGHT, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, LOGO_URL, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';


interface SignUpPageProps {
  onSuccessfulSignup: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSuccessfulSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth(); // Use login to set user state after signup
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!ageVerified) {
      setError('You must verify you are 18 years or older.');
      return;
    }
    // Mock signup logic
    console.log('Signing up user:', { name, email, password });
    // Simulate successful signup and login
    login({ id: Date.now().toString(), email, name, subscribedToNewsletter: false });
    onSuccessfulSignup();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[${KHULA_KUSH_BG_LIGHT}] p-4`}>
      <Link to="/" className={`absolute top-4 left-4 text-sm text-[${KHULA_KUSH_GREEN}] hover:text-green-700`}>&larr; Back to Home</Link>
      <div className="mb-8 text-center">
        <img src={LOGO_URL} alt="Khula Kush Logo" className="w-36 h-auto mx-auto mb-4" />
        <h1 className={`text-3xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}] font-poppins`}>Create Account</h1>
      </div>
      <form onSubmit={handleSubmit} className={`w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Full Name</label>
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
        <div className="mb-4">
          <label htmlFor="password" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
            placeholder="••••••••"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
            placeholder="••••••••"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="ageVerification" className="flex items-center">
            <input
              type="checkbox"
              id="ageVerification"
              checked={ageVerified}
              onChange={(e) => setAgeVerified(e.target.checked)}
              required
              className={`h-4 w-4 text-[${KHULA_KUSH_GREEN}] bg-gray-100 border-gray-300 rounded focus:ring-[${KHULA_KUSH_GREEN}] mr-2`}
            />
            <span className={`text-sm text-[${KHULA_KUSH_TEXT_BODY}]`}>I confirm I am 18 years or older.</span>
          </label>
        </div>
        <button
          type="submit"
          className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
        >
          Sign Up
        </button>
        <p className={`mt-6 text-center text-sm text-[${KHULA_KUSH_TEXT_MUTED}]`}>
          Already have an account? <Link to="/login" className={`text-[${KHULA_KUSH_GREEN}] hover:underline font-medium`}>Login</Link>
        </p>
      </form>
      <p className={`mt-8 text-xs text-[${KHULA_KUSH_TEXT_MUTED}]`}>© {new Date().getFullYear()} Khula Kush. Ages 18+.</p>
    </div>
  );
};

export default SignUpPage;
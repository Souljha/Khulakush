import React, { useState } from 'react';
import { KHULA_KUSH_GREEN, KHULA_KUSH_YELLOW, KHULA_KUSH_BG_LIGHT, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_MUTED, KHULA_KUSH_TEXT_ON_GREEN, LOGO_URL, KHULA_KUSH_SURFACE_LIGHTER } from '../constants';

interface ContactUsPageProps {
  onBack: () => void;
}

const ContactUsPage: React.FC<ContactUsPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log('Contact form submitted:', { name, email, message });
    setSubmitted(true);
    // Keep form data if user wants to send another, or clear it. Clearing for now.
    // setName(''); 
    // setEmail('');
    // setMessage('');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[${KHULA_KUSH_BG_LIGHT}] p-4`}>
      <button onClick={onBack} className={`absolute top-4 left-4 text-sm text-[${KHULA_KUSH_GREEN}] hover:text-green-700`}>&larr; Back to Home</button>
      <div className="mb-8 text-center">
        <img src={LOGO_URL} alt="Khula Kush Logo" className="w-36 h-auto mx-auto mb-4" />
        <h1 className={`text-3xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}] font-poppins`}>Contact Us</h1>
        <p className={`text-[${KHULA_KUSH_TEXT_MUTED}] mt-2`}>We'd love to hear from you!</p>
      </div>

      {submitted ? (
        <div className={`w-full max-w-md bg-white p-8 rounded-lg shadow-2xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}] text-center`}>
          <h2 className={`text-2xl font-semibold text-[${KHULA_KUSH_GREEN}] mb-4`}>Thank You!</h2>
          <p className={`text-[${KHULA_KUSH_TEXT_BODY}]`}>Your message has been sent. We'll get back to you soon.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              // Clear form fields when starting a new message
              setName(''); 
              setEmail('');
              setMessage('');
            }}
            className={`mt-6 bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`w-full max-w-md bg-white p-8 rounded-lg shadow-2xl border border-[${KHULA_KUSH_SURFACE_LIGHTER}]`}>
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
          <div className="mb-6">
            <label htmlFor="message" className={`block text-sm font-medium text-[${KHULA_KUSH_TEXT_BODY}] mb-1`}>Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className={`w-full p-2.5 rounded-md bg-[${KHULA_KUSH_SURFACE_LIGHT}] text-[${KHULA_KUSH_TEXT_HEADING}] border border-gray-300 focus:ring-2 focus:ring-[${KHULA_KUSH_GREEN}] focus:border-transparent outline-none`}
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
          >
            Send Message
          </button>
        </form>
      )}
      <p className={`mt-8 text-xs text-[${KHULA_KUSH_TEXT_MUTED}]`}>© {new Date().getFullYear()} Khula Kush.</p>
    </div>
  );
};

export default ContactUsPage;
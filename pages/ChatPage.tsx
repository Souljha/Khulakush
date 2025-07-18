import React from 'react';
import { ChatBubbleLeftEllipsisIcon } from '../components/Icons';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_TEXT_HEADING } from '../constants';


const ChatPage: React.FC = () => {
  return (
    <div className={`p-4 min-h-screen bg-white text-[${KHULA_KUSH_TEXT_BODY}] flex flex-col items-center justify-center`}>
        <ChatBubbleLeftEllipsisIcon className={`w-32 h-32 text-[${KHULA_KUSH_GREEN}] mb-6`} />
      <h1 className={`text-3xl font-semibold mb-4 text-[${KHULA_KUSH_TEXT_HEADING}]`}>Chat Support</h1>
      <p className="text-lg text-center max-w-md">
        Our live chat feature is coming soon! In the meantime, please use the Contact Us form for any inquiries.
      </p>
    </div>
  );
};

export default ChatPage;
import React from 'react';
import { SubscriptionTier } from '../types';
import { KHULA_KUSH_GREEN, KHULA_KUSH_TEXT_ON_GREEN, KHULA_KUSH_TEXT_HEADING, KHULA_KUSH_TEXT_BODY, KHULA_KUSH_SURFACE_LIGHT, KHULA_KUSH_TEXT_MUTED } from '../constants';

interface SubscriptionTierCardProps {
  tier: SubscriptionTier;
  onSubscribe: (tier: SubscriptionTier) => void;
  isCurrentTier: boolean;
  onManageSubscription?: () => void; // Optional: if already subscribed to this tier
}

const SubscriptionTierCard: React.FC<SubscriptionTierCardProps> = ({ tier, onSubscribe, isCurrentTier, onManageSubscription }) => {
  const handleMoreInfo = () => {
    alert(`More information about ${tier.level} coming soon!\n\nIncludes:\n- ${tier.productSummary.flower} of flower\n- ${tier.productSummary.treats} sweet treats\n- ${tier.productSummary.seeds} seed to grow with us`);
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col justify-between ${isCurrentTier ? `border-2 border-[${KHULA_KUSH_GREEN}]` : ''}`}>
      <div>
        <h3 className={`text-2xl font-bold text-[${KHULA_KUSH_TEXT_HEADING}] mb-2`}>{tier.level}</h3>
        <p className={`text-3xl font-extrabold text-[${KHULA_KUSH_GREEN}] mb-1`}>
          R{tier.pricePerMonth}
          <span className={`text-base font-normal text-[${KHULA_KUSH_TEXT_MUTED}]`}> p/m</span>
        </p>
        <ul className="space-y-1.5 my-4">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className={`text-[${KHULA_KUSH_TEXT_BODY}] flex items-start`}>
              <svg className={`w-5 h-5 text-[${KHULA_KUSH_GREEN}] mr-2 flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        {isCurrentTier ? (
           <button
            onClick={onManageSubscription || (() => alert("Manage your subscription via your profile or contact support."))}
            className={`w-full bg-gray-500 text-white font-semibold py-2.5 px-4 rounded-md hover:bg-gray-600 transition duration-200`}
          >
            Current Plan
          </button>
        ) : (
          <button
            onClick={() => onSubscribe(tier)}
            className={`w-full bg-[${KHULA_KUSH_GREEN}] text-[${KHULA_KUSH_TEXT_ON_GREEN}] font-semibold py-2.5 px-4 rounded-md hover:bg-green-700 transition duration-200`}
          >
            Subscribe
          </button>
        )}
        <button
          onClick={handleMoreInfo}
          className={`w-full mt-2 text-sm text-[${KHULA_KUSH_GREEN}] hover:underline`}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default SubscriptionTierCard;
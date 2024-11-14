"use client";

import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

interface EventInfoModalProps {
  onClose: () => void;
}

export default function EventInfoModal({ onClose }: EventInfoModalProps) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationForm(false);
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
        <div 
          className="bg-white rounded-xl w-full max-w-3xl relative shadow-2xl transform transition-all duration-300 scale-100 overflow-hidden max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 backdrop-blur-sm transition-all duration-300 z-10 shadow-lg"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
            {/* Image Section */}
            <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
              <Image
                src="/MYF_Image.jpeg"
                alt="Monthly Youth Festival"
                fill
                className="object-contain bg-gray-100"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="p-8 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Youth Festival</h2>
              <div className="text-gray-700 space-y-6">
                {/* Main Description */}
                <div className="text-lg">
                  Being away from home can create stress and anxiety, especially when combined with the academic pressure.

                  To overcome this, it's helpful to connect with like-minded people to tackle this anxiety together.

                  But how should we do that? 🤔

                  DO NOT WORRY!! 😌
                </div>

                {/* Event Invitation */}
                <div className="text-center font-medium text-xl">
                  Gita Life NYC is inviting you to join students, graduates, and working professionals at our Monthly Youth Festival 🥳
                </div>

                {/* What's Included Section */}
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">What's in it for you? ✨</h3>
                  <div className="grid grid-cols-2 gap-4 text-lg">
                    <div className="flex items-center gap-2">🪩 SPECIAL EVENT</div>
                    <div className="flex items-center gap-2">🎤 ENLIGHTENING TALK</div>
                    <div className="flex items-center gap-2">🎶 ECSTATIC KIRTAN</div>
                    <div className="flex items-center gap-2">🍛 PRASADAM FEAST</div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-center gap-12 text-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🗓</span>
                      <div>
                        <div className="font-semibold">Date</div>
                        <div>Nov 16, 2024 (Saturday)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <div className="font-semibold">Time</div>
                        <div>5:30 PM onwards</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center text-lg font-medium">
                  Don't hesitate! Register now and embrace the opportunity to connect, learn, and grow! 
                  <div className="mt-2">See you soon! 🌟</div>
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Important Notes ℹ️</h3>
                  <ul className="space-y-3 list-disc list-inside text-gray-700">
                    <li>This event is only for boys aged 18-30</li>
                    <li>All registered participants will be issued a wrist band which is mandatory for special feast dinner. The deadline for receiving the wrist band is 7 pm Saturday. This is done to have the feast served exclusively for the MYF participants.</li>
                    <li>If participants do not have wrist band or they fail to register, a donation of $10 will be collected for Prasadam.</li>
                  </ul>
                </div>
              </div>

              {/* Registration Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleRegisterClick}
                  className="px-8 py-3 bg-saffron text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg"
                >
                  Register for Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm onClose={handleCloseRegistration} />
      )}
    </>,
    document.body
  );
} 
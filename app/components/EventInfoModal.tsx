'use client';

import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import RegistrationForm from './RegistrationForm';

interface EventInfoModalProps {
  onClose: () => void;
}

export default function EventInfoModal({ onClose }: EventInfoModalProps) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationForm(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/80 
          flex items-center justify-center z-[9999] p-4 backdrop-blur-md transition-all duration-300 
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      >
        {/* Modal Container */}
        <div
          className={`bg-white rounded-2xl w-full max-w-4xl relative shadow-2xl 
            transform transition-all duration-300 overflow-hidden max-h-[95vh] 
            ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 bg-white/90 hover:bg-white text-gray-600 
              hover:text-gray-900 rounded-full p-3 backdrop-blur-sm transition-all duration-200 
              z-10 shadow-lg hover:shadow-xl hover:scale-105 group"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            {/* Hero Image Section */}
            <div
              className="relative w-full bg-gradient-to-br from-orange-100 to-orange-200"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src="/MYF_Image.jpeg"
                alt="Monthly Youth Festival"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-8 bg-gradient-to-br from-white to-gray-50">
              {/* Header */}
              <div className="text-center mb-8">
                <h2
                  className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 
                  bg-clip-text text-transparent mb-4"
                >
                  Monthly Youth Festival
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full" />
              </div>

              <div className="text-gray-700 space-y-8">
                {/* Main Description */}
                <div className="text-center">
                  <div
                    className="text-xl leading-relaxed bg-gradient-to-r from-orange-50 to-red-50 
                    p-6 rounded-2xl border-l-4 border-orange-400 shadow-sm"
                  >
                    🌟 Gita Life NYC invites you for our Monthly Youth Festival! 🌟
                    <br />
                    Get ready for a day full of inspiration, joy, and unforgettable memories! 🎉
                    <br />
                    Join us for a spiritual journey.
                  </div>
                </div>

                {/* Event Highlights */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    🎉 Here's why you'll love it:
                  </h3>
                </div>

                {/* What's Included Section */}
                <div
                  className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl 
                  border border-orange-200 shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center text-orange-800">
                    What's in it for you? ✨
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">Spiritual Talk</div>
                          <div className="text-gray-600">
                            Enlightening session by HG Govind Krsna Das (spiritual influencer,
                            motivational speaker, and life-changing educator)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎭</span>
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">Drama Performances</div>
                          <div className="text-gray-600">
                            Witness incredible performances that will touch your heart!
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🕺🏼</span>
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">Dancing Kirtan</div>
                          <div className="text-gray-600">
                            Let loose, groove to the beat, and celebrate with us!
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🍽️</span>
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">Feast Prasadam</div>
                          <div className="text-gray-600">
                            Enjoy delicious prasadam and great company!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div
                  className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-2xl 
                  border border-gray-300 shadow-lg"
                >
                  <div className="flex justify-center items-center gap-16">
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <span className="text-4xl mb-2 block">🗓</span>
                        <div className="font-bold text-gray-800 text-lg">Date</div>
                        <div className="text-gray-600 text-xl">23rd August</div>
                        <div className="text-gray-500">(Saturday)</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <span className="text-4xl mb-2 block">⏰</span>
                        <div className="font-bold text-gray-800 text-lg">Time</div>
                        <div className="text-gray-600 text-xl">5:45 PM</div>
                        <div className="text-gray-500">onwards</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div
                  className="text-center bg-gradient-to-r from-green-50 to-emerald-50 
                  p-6 rounded-2xl border-l-4 border-green-400"
                >
                  <div className="text-xl font-semibold text-gray-800 mb-2">
                    ✨ It's Free. It's Fun. It's Unforgettable. 🎁
                  </div>
                  <div className="text-lg text-gray-600 mb-2">
                    Bring your friends and let's make this an evening to remember.
                  </div>
                  <div className="text-lg font-medium text-green-700">
                    We look forward to seeing you! 🌟🌟🌟
                  </div>
                </div>

                {/* Important Notes */}
                <div
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl 
                  border border-blue-200 shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center text-blue-800 flex items-center justify-center gap-2">
                    <span>ℹ️</span> Important Notes
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-400">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">•</span>
                        <span className="text-gray-700">
                          This event is only for boys aged 18-30
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-400">
                      <div className="flex items-start gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        <span className="text-gray-700">
                          All registered participants will receive a wrist band mandatory for the
                          special feast dinner. Deadline for wrist band collection: 7 PM Saturday.
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400">
                      <div className="flex items-start gap-3">
                        <span className="text-red-500 font-bold">•</span>
                        <span className="text-gray-700">
                          Without registration or wrist band, a $10 donation will be collected for
                          Prasadam.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Button */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleRegisterClick}
                  className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 
                    text-white rounded-xl hover:from-orange-600 hover:to-red-600 
                    transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-xl 
                    transform hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Register for Event</span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 
                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && <RegistrationForm onClose={handleCloseRegistration} />}
    </>,
    document.body
  );
}

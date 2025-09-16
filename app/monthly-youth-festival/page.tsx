'use client';

import Image from 'next/image';
import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Link from 'next/link';

export default function MonthlyYouthFestival() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Image Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden mb-8 sm:mb-12">
          <div
            className="relative w-full bg-gradient-to-br from-orange-100 to-orange-200"
            style={{ aspectRatio: window.innerWidth < 768 ? '4/3' : '21/9' }}
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
          <div className="p-4 sm:p-6 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 
                bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
              >
                Monthly Youth Festival
              </h1>
              <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full" />
            </div>

            <div className="text-gray-700 space-y-8 sm:space-y-10 lg:space-y-12 max-w-6xl mx-auto">
              {/* Main Description */}
              <div className="text-center">
                <div
                  className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed bg-gradient-to-r from-orange-50 to-red-50 
                  p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-l-4 border-orange-400 shadow-lg"
                >
                  🌟 Gita Life NYC invites you for our Monthly Youth Festival! 🌟
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  Get ready for a day full of inspiration, joy, and unforgettable memories! 🎉
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  Join us for a spiritual journey.
                </div>
              </div>

              {/* Event Highlights */}
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
                  🎉 Here's why you'll love it:
                </h2>
              </div>

              {/* What's Included Section */}
              <div
                className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl 
                border border-orange-200 shadow-xl"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-orange-800">
                  What's in it for you? ✨
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">✨</span>
                      <div>
                        <div className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">
                          Spiritual Talk
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                          Inspiring session by HG Jai Nitai Prabhu (Temple President, spiritual
                          guide, and dynamic preacher).
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">🎭</span>
                      <div>
                        <div className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">
                          Drama Performances
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                          Witness incredible performances that will touch your heart!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">🕺🏼</span>
                      <div>
                        <div className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">
                          Dancing Kirtan
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                          Let loose, groove to the beat, and celebrate with us!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">🍽️</span>
                      <div>
                        <div className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">
                          Feast Prasadam
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                          Enjoy delicious prasadam and great company!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div
                className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl 
                border border-gray-300 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 lg:gap-20">
                  <div className="text-center">
                    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <span className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 block">
                        🗓
                      </span>
                      <div className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl">
                        Date
                      </div>
                      <div className="text-gray-600 text-lg sm:text-xl lg:text-2xl">
                        20th September
                      </div>
                      <div className="text-gray-500 text-sm sm:text-base lg:text-lg">
                        (Saturday)
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <span className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 block">
                        ⏰
                      </span>
                      <div className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl">
                        Time
                      </div>
                      <div className="text-gray-600 text-lg sm:text-xl lg:text-2xl">5:45 PM</div>
                      <div className="text-gray-500 text-sm sm:text-base lg:text-lg">onwards</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div
                className="text-center bg-gradient-to-r from-green-50 to-emerald-50 
                p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-l-4 border-green-400 shadow-lg"
              >
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  ✨ It's Free. It's Fun. It's Unforgettable. 🎁
                </div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-2 sm:mb-3">
                  Bring your friends and let's make this an evening to remember.
                </div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-green-700">
                  We look forward to seeing you! 🌟🌟🌟
                </div>
              </div>

              {/* Important Notes */}
              <div
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-2xl 
                border border-blue-200 shadow-xl"
              >
                <h3 className="text-3xl font-bold mb-8 text-center text-blue-800 flex items-center justify-center gap-3">
                  <span>ℹ️</span> Important Notes
                </h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-400">
                    <div className="flex items-start gap-4">
                      <span className="text-blue-500 font-bold text-xl">•</span>
                      <span className="text-gray-700 text-lg">
                        This event is only for boys aged 18-30
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-400">
                    <div className="flex items-start gap-4">
                      <span className="text-orange-500 font-bold text-xl">•</span>
                      <span className="text-gray-700 text-lg">
                        All registered participants will receive a wrist band mandatory for the
                        special feast dinner. Deadline for wrist band collection: 7 PM Saturday.
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-400">
                    <div className="flex items-start gap-4">
                      <span className="text-red-500 font-bold text-xl">•</span>
                      <span className="text-gray-700 text-lg">
                        Without registration or wrist band, a $10 donation will be collected for
                        Prasadam.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Button */}
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleRegisterClick}
                className="group relative px-16 py-5 bg-gradient-to-r from-orange-500 to-red-500 
                  text-white rounded-xl hover:from-orange-600 hover:to-red-600 
                  transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-2xl 
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

      {/* Registration Form Modal */}
      {showRegistrationForm && <RegistrationForm onClose={handleCloseRegistration} />}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Gita Life NYC</p>
          <p className="text-sm text-gray-400">
            Copyright © 2024 GitaLifeNYC - All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

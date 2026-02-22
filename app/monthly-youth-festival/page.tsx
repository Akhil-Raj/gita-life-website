// 'use client';

// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import RegistrationForm from '../components/RegistrationForm';
// import Link from 'next/link';
// import { date } from '@/lib/constants';

// export default function MonthlyYouthFestival() {
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Handle responsive image aspect ratio
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     // Initial check
//     checkScreenSize();

//     // Listen for resize events
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const handleRegisterClick = () => {
//     setShowRegistrationForm(true);
//   };

//   const handleCloseRegistration = () => {
//     setShowRegistrationForm(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
//       {/* Decorative background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header with Back Button */}
//       <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-orange-100">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//           <Link
//             href="/events"
//             className="inline-flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-all duration-300 group"
//           >
//             <div className="p-2 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
//               <svg
//                 className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </div>
//             <span className="font-medium">Back to Events</span>
//           </Link>
//         </div>
//       </div>

//       <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {/* Hero Section with Floating Card Design */}
//         <div className="relative">
//           {/* Main Content Card */}
//           <div className="bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-white/50">
//             {/* Hero Image */}
//             <div className="relative">
//               <div
//                 className="relative w-full bg-gradient-to-br from-orange-100 to-amber-100"
//                 style={{ aspectRatio: isMobile ? '4/3' : '21/9' }}
//               >
//                 <Image
//                   src="/MYF_Image.jpeg"
//                   alt="Monthly Youth Festival"
//                   fill
//                   className="object-contain mix-blend-multiply opacity-90"
//                   priority
//                 />
//                 {/* Subtle gradient overlays */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5" />
//               </div>
//             </div>

//             {/* Title Section Below Image */}
//             <div className="text-center py-8 sm:py-12">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
//                 Monthly Youth Festival
//               </h1>
//               <div className="flex justify-center">
//                 <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full" />
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="p-6 sm:p-8 lg:p-12 xl:p-16 space-y-8 sm:space-y-12 lg:space-y-16">
//               {/* Welcome Message with Enhanced Design */}
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-amber-100 to-red-100 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
//                 <div className="relative bg-gradient-to-r from-orange-50 to-red-50 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-l-4 border-orange-400 shadow-xl">
//                   <div className="text-center">
//                     <div className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-800 font-medium">
//                       <span className="text-2xl sm:text-3xl">🌟</span> Gita Life NYC invites you for
//                       our Monthly Youth Festival! <span className="text-2xl sm:text-3xl">🌟</span>
//                       <br className="hidden sm:block" />
//                       <span className="sm:hidden"> </span>
//                       Get ready for a day full of inspiration, joy, and unforgettable memories!{' '}
//                       <span className="text-xl sm:text-2xl">🎉</span>
//                       <br className="hidden sm:block" />
//                       <span className="sm:hidden"> </span>
//                       Join us for a spiritual journey.
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Event Highlights with Modern Cards */}
//               <div className="text-center mb-8 sm:mb-12">
//                 <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-2">
//                   Here's why you'll love it
//                 </h2>
//                 <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
//                   Experience the magic of spiritual celebration
//                 </p>
//               </div>

//               {/* Features Grid with Glassmorphism Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
//                 {[
//                   {
//                     icon: '✨',
//                     title: 'Spiritual Talk',
//                     description:
//                       'Inspiring session by HG Gaur Sharan Das (monk, spiritual teacher, and NYU chaplain sharing timeless bhakti wisdom)',
//                     gradient: 'from-yellow-100 to-orange-100',
//                     border: 'border-yellow-200'
//                   },
//                   {
//                     icon: '🎭',
//                     title: 'Drama Performances',
//                     description:
//                       'Witness incredible performances that will touch your heart and inspire your soul',
//                     gradient: 'from-pink-100 to-red-100',
//                     border: 'border-pink-200'
//                   },
//                   {
//                     icon: '🕺🏼',
//                     title: 'Dancing Kirtan',
//                     description:
//                       'Let loose, groove to the beat, and celebrate with us in joyful devotion',
//                     gradient: 'from-purple-100 to-pink-100',
//                     border: 'border-purple-200'
//                   },
//                   {
//                     icon: '🍽️',
//                     title: 'Feast Prasadam',
//                     description:
//                       'Enjoy delicious sanctified food and great company in a spiritual atmosphere',
//                     gradient: 'from-green-100 to-emerald-100',
//                     border: 'border-green-200'
//                   }
//                 ].map((feature, index) => (
//                   <div key={index} className="group relative">
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}
//                     ></div>
//                     <div
//                       className={`relative bg-white/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border ${feature.border} hover:shadow-2xl transition-all duration-300 group-hover:scale-105`}
//                     >
//                       <div className="flex items-start gap-3 sm:gap-4">
//                         <span className="text-3xl sm:text-4xl lg:text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                           {feature.icon}
//                         </span>
//                         <div>
//                           <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base lg:text-lg xl:text-xl">
//                             {feature.title}
//                           </h3>
//                           <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
//                             {feature.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Date & Time with Enhanced Visual Design */}
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 rounded-2xl sm:rounded-3xl transform -rotate-1"></div>
//                 <div className="relative bg-gradient-to-r from-gray-100 to-slate-100 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl">
//                   <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20">
//                     {[
//                       { icon: '🗓', label: 'Date', value: `${date}`, sub: '(Saturday)' },
//                       { icon: '⏰', label: 'Time', value: '5:45 PM', sub: 'onwards' }
//                     ].map((item, index) => (
//                       <div key={index} className="text-center group">
//                         <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 group-hover:scale-105 transition-all duration-300">
//                           <span className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 block group-hover:scale-110 transition-transform duration-300">
//                             {item.icon}
//                           </span>
//                           <div className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl xl:text-2xl mb-1">
//                             {item.label}
//                           </div>
//                           <div className="text-gray-700 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold">
//                             {item.value}
//                           </div>
//                           <div className="text-gray-500 text-sm sm:text-base lg:text-lg">
//                             {item.sub}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Call to Action with Animated Background */}
//               <div className="relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
//                 <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-l-4 border-green-400 shadow-xl">
//                   <div className="text-center space-y-3 sm:space-y-4">
//                     <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">
//                       <span className="text-2xl sm:text-3xl">✨</span> It's Free. It's Fun. It's
//                       Unforgettable. <span className="text-2xl sm:text-3xl">🎁</span>
//                     </div>
//                     <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">
//                       Bring your friends and let's make this an evening to remember.
//                     </div>
//                     <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-green-700">
//                       We look forward to seeing you!{' '}
//                       <span className="text-lg sm:text-xl">🌟🌟🌟</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Important Notes with Modern Card Design */}
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl transform -rotate-1"></div>
//                 <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-blue-200 shadow-2xl">
//                   <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center text-blue-800 flex items-center justify-center gap-2 sm:gap-3">
//                     <span className="text-2xl sm:text-3xl lg:text-4xl">ℹ️</span> Important Notes
//                   </h3>
//                   <div className="space-y-4 sm:space-y-6">
//                     {[
//                       { color: 'blue', text: 'This event is only for boys aged 18-30' },
//                       {
//                         color: 'orange',
//                         text: 'All registered participants will receive a wrist band mandatory for the special feast dinner. Deadline for wrist band collection: 7 PM Saturday.'
//                       },
//                       {
//                         color: 'red',
//                         text: 'Without registration or wrist band, a $10 donation will be collected for Prasadam.'
//                       }
//                     ].map((note, index) => (
//                       <div key={index} className="group relative">
//                         <div
//                           className={`absolute inset-0 bg-${note.color}-100 rounded-lg sm:rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}
//                         ></div>
//                         <div
//                           className={`relative bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-l-4 border-${note.color}-400 hover:shadow-xl transition-all duration-300`}
//                         >
//                           <div className="flex items-start gap-3 sm:gap-4">
//                             <span
//                               className={`text-${note.color}-500 font-bold text-lg sm:text-xl flex-shrink-0`}
//                             >
//                               •
//                             </span>
//                             <span className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
//                               {note.text}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Enhanced Registration Button */}
//               <div className="text-center pt-6 sm:pt-8">
//                 <div className="relative inline-block">
//                   <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl sm:rounded-2xl transform rotate-2 scale-105"></div>
//                   <button
//                     onClick={handleRegisterClick}
//                     className="relative group px-8 sm:px-12 lg:px-16 xl:px-20 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg lg:text-xl xl:text-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-3xl"
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       <span>Register for Event</span>
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 7l5 5m0 0l-5 5m5-5H6"
//                         />
//                       </svg>
//                     </span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Registration Form Modal */}
//       {showRegistrationForm && <RegistrationForm onClose={handleCloseRegistration} />}

//       {/* Enhanced Footer */}
//       <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white py-8 sm:py-12 mt-16 sm:mt-20 border-t border-gray-700">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-red-900/10"></div>
//         <div className="relative container mx-auto px-4 text-center">
//           <div className="mb-4">
//             <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
//               Gita Life NYC
//             </h3>
//           </div>
//           <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
//             Copyright © 2024 GitaLifeNYC - All Rights Reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Link from 'next/link';
import { date } from '@/lib/constants';

export default function MonthlyYouthFestival() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive image aspect ratio
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header with Back Button */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-all duration-300 group"
          >
            <div className="p-2 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="font-medium">Back to Events</span>
          </Link>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section with Floating Card Design */}
        <div className="relative">
          {/* Main Content Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-white/50">
            {/* Hero Image */}
            <div className="relative">
              <div
                className="relative w-full bg-gradient-to-br from-neutral-100 to-stone-200"
                style={{ aspectRatio: isMobile ? '4/3' : '21/9' }}
              >
                <Image
                  src="/MYF_Image.jpeg"
                  alt="Monthly Youth Festival"
                  fill
                  className="object-contain mix-blend-multiply opacity-90"
                  priority
                />
                {/* Subtle gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-600/5 to-neutral-600/5" />
              </div>
            </div>

            {/* Title Section Below Image */}
            <div className="text-center py-8 sm:py-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                Monthly Youth Festival
              </h1>
              <div className="flex justify-center">
                <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full" />
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 sm:p-8 lg:p-12 xl:p-16 space-y-8 sm:space-y-12 lg:space-y-16">
              {/* Welcome Message with Enhanced Design */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-amber-100 to-red-100 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
                <div className="relative bg-gradient-to-r from-orange-50 to-red-50 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-l-4 border-orange-400 shadow-xl">
                  <div className="text-center">
                    <div className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-800 font-medium">
                      <span className="text-2xl sm:text-3xl">🌟</span> Gita Life NYC invites you for
                      our Monthly Youth Festival! <span className="text-2xl sm:text-3xl">🌟</span>
                      <br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>
                      Get ready for a day full of inspiration, joy, and unforgettable memories!{' '}
                      <span className="text-xl sm:text-2xl">🎉</span>
                      <br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>
                      Join us for a spiritual journey.
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Highlights with Modern Cards */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-2">
                  Here's why you'll love it
                </h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  Experience the magic of spiritual celebration
                </p>
              </div>

              {/* Features Grid with Glassmorphism Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
                {[
                  {
                    icon: '✨',
                    title: 'Spiritual Talk',
                    description:
                      'Inspiring session by HG Tulsi Das — travelling monk, kirtan enthusiast, and beloved guide whose scriptural depth and heartfelt teachings have ignited bhakti in countless hearts.',
                    gradient: 'from-yellow-100 to-orange-100',
                    border: 'border-yellow-200'
                  },
                  {
                    icon: '🎭',
                    title: 'Drama Performances',
                    description:
                      'Witness incredible performances that will touch your heart and inspire your soul',
                    gradient: 'from-pink-100 to-red-100',
                    border: 'border-pink-200'
                  },
                  {
                    icon: '🕺🏼',
                    title: 'Dancing Kirtan',
                    description:
                      'Let loose, groove to the beat, and celebrate with us in joyful devotion',
                    gradient: 'from-purple-100 to-pink-100',
                    border: 'border-purple-200'
                  },
                  {
                    icon: '🍽️',
                    title: 'Feast Prasadam',
                    description:
                      'Enjoy delicious sanctified food and great company in a spiritual atmosphere',
                    gradient: 'from-green-100 to-emerald-100',
                    border: 'border-green-200'
                  }
                ].map((feature, index) => (
                  <div key={index} className="group relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}
                    ></div>
                    <div
                      className={`relative bg-white/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border ${feature.border} hover:shadow-2xl transition-all duration-300 group-hover:scale-105`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="text-3xl sm:text-4xl lg:text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base lg:text-lg xl:text-xl">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date & Time with Enhanced Visual Design */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 rounded-2xl sm:rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-gradient-to-r from-gray-100 to-slate-100 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20">
                    {[
                      { icon: '🗓', label: 'Date', value: `${date}`, sub: '(Saturday)' },
                      { icon: '⏰', label: 'Time', value: '5:45 PM', sub: 'onwards' }
                    ].map((item, index) => (
                      <div key={index} className="text-center group">
                        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 group-hover:scale-105 transition-all duration-300">
                          <span className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 block group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <div className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl xl:text-2xl mb-1">
                            {item.label}
                          </div>
                          <div className="text-gray-700 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold">
                            {item.value}
                          </div>
                          <div className="text-gray-500 text-sm sm:text-base lg:text-lg">
                            {item.sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action with Animated Background */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
                <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-l-4 border-green-400 shadow-xl">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">
                      <span className="text-2xl sm:text-3xl">✨</span> It's Free. It's Fun. It's
                      Unforgettable. <span className="text-2xl sm:text-3xl">🎁</span>
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">
                      Bring your friends and let's make this an evening to remember.
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-green-700">
                      We look forward to seeing you!{' '}
                      <span className="text-lg sm:text-xl">🌟🌟🌟</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes with Modern Card Design */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-blue-200 shadow-2xl">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center text-blue-800 flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">ℹ️</span> Important Notes
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      { color: 'blue', text: 'This event is only for boys aged 18-30' },
                      {
                        color: 'orange',
                        text: 'All registered participants will receive a wrist band mandatory for the special feast dinner. Deadline for wrist band collection: 7 PM Saturday.'
                      },
                      {
                        color: 'red',
                        text: 'Without registration or wrist band, a $10 donation will be collected for Prasadam.'
                      }
                    ].map((note, index) => (
                      <div key={index} className="group relative">
                        <div
                          className={`absolute inset-0 bg-${note.color}-100 rounded-lg sm:rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}
                        ></div>
                        <div
                          className={`relative bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-l-4 border-${note.color}-400 hover:shadow-xl transition-all duration-300`}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <span
                              className={`text-${note.color}-500 font-bold text-lg sm:text-xl flex-shrink-0`}
                            >
                              •
                            </span>
                            <span className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                              {note.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Registration Button */}
              <div className="text-center pt-6 sm:pt-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl sm:rounded-2xl transform rotate-2 scale-105"></div>
                  <button
                    onClick={handleRegisterClick}
                    className="relative group px-8 sm:px-12 lg:px-16 xl:px-20 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg lg:text-xl xl:text-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Register for Event</span>
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && <RegistrationForm onClose={handleCloseRegistration} />}

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white py-8 sm:py-12 mt-16 sm:mt-20 border-t border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-red-900/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Gita Life NYC
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Copyright © 2024 GitaLifeNYC - All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

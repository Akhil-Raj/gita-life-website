// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Header = () => {
//   const pathname = usePathname();

//   const isActive = (path: string) => {
//     if (path === '/' && pathname === '/') return true;
//     if (path !== '/' && pathname.startsWith(path)) return true;
//     return false;
//   };

//   return (
//     <header className="bg-saffron text-white p-6 shadow-md">
//       <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
//         <Link
//           href="/"
//           className="text-3xl font-bold mb-4 sm:mb-0 hover:text-indigo-200 transition duration-300"
//         >
//           Gita Life NYC
//         </Link>
//         <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-6">
//           {['Home', 'Events', 'Contact', 'Donate'].map(item => (
//             <li key={item}>
//               <Link
//                 href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
//                 className={`text-lg transition duration-300 px-3 py-2 rounded-full ${isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'bg-white bg-opacity-30 text-indigo-900 font-semibold' : 'hover:text-indigo-900 hover:bg-white hover:bg-opacity-20'}`}
//               >
//                 {item}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = ['Home', 'Events', 'Contact', 'Donate'];

  return (
    <header className="bg-saffron text-white shadow-lg relative">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold hover:text-orange-200 transition duration-300 z-20 relative"
            onClick={closeMenu}
          >
            Gita Life NYC
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-1 lg:space-x-4">
            {menuItems.map(item => (
              <li key={item}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`text-base lg:text-lg transition duration-300 px-3 lg:px-4 py-2 rounded-full whitespace-nowrap ${
                    isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                      ? 'bg-white bg-opacity-30 text-orange-900 font-semibold shadow-inner'
                      : 'hover:text-orange-900 hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-20 relative p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative flex flex-col justify-center">
              <span
                className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45' : ''
                }`}
                style={{
                  transformOrigin: 'center',
                  position: 'absolute',
                  top: isMenuOpen ? '50%' : '25%',
                  transform: isMenuOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%)'
                }}
              />
              <span
                className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <span
                className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45' : ''
                }`}
                style={{
                  transformOrigin: 'center',
                  position: 'absolute',
                  top: isMenuOpen ? '50%' : '75%',
                  transform: isMenuOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%)'
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full bg-saffron shadow-xl transform transition-all duration-300 ease-in-out z-10 ${
            isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 transform ${
                  isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                    ? 'bg-white bg-opacity-30 text-orange-900 font-semibold shadow-inner scale-105'
                    : 'hover:bg-white hover:bg-opacity-20 hover:scale-105 hover:translate-x-2'
                }`}
                onClick={closeMenu}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="px-4 py-4 border-t border-white border-opacity-20">
            <p className="text-sm text-orange-200 text-center">Spiritual Journey Begins Here 🕉️</p>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-5" onClick={closeMenu} />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

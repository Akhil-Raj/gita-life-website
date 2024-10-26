"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-saffron text-white p-6 shadow-md">
      <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-3xl font-bold mb-4 sm:mb-0 hover:text-indigo-200 transition duration-300">
          Gita Life NYC
        </Link>
        <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-6">
          {['Home', 'Events', 'Contact', 'Donate'].map((item) => (
            <li key={item}>
              <Link 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className={`text-lg transition duration-300 px-3 py-2 rounded-full ${
                  isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                    ? 'bg-white bg-opacity-30 text-indigo-900 font-semibold'
                    : 'hover:text-indigo-900 hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

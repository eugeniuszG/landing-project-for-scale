'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '../lib/siteConfig';
import { ThemeSwitcherCompact } from './ThemeSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = siteConfig.navLinks;

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src={siteConfig.logo.src} alt={siteConfig.logo.alt} width={siteConfig.logo.width} height={siteConfig.logo.height} />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    {link.label}
                  </Link>
                ))}
                <ThemeSwitcherCompact className="ml-2" />
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isOpen}
              >
                <span className="sr-only">{isOpen ? 'Zamknij menu główne' : 'Otwórz menu główne'}</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isOpen ? '' : 'opacity-0 pointer-events-none'}`}>
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMenu}></div>
          
          {/* Slide-in menu */}
          <div className={`absolute inset-y-0 left-0 w-4/5 max-w-xs bg-black transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full flex flex-col justify-between">
              <div className="px-4 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <Image src={siteConfig.logo.src} alt={siteConfig.logo.alt} width={siteConfig.logo.width} height={siteConfig.logo.height} />
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer to prevent content from being hidden under the fixed navbar */}
    </div>
  );
};

export default Navbar;

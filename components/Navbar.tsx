// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/30 shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo size="small" />
            <span className="font-700 text-lg text-black hidden sm:inline">
              Rutina Perfecta
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-black transition">
              Home
            </Link>
            <Link href="/rutinas" className="text-sm text-gray-600 hover:text-black transition">
              Rutinas
            </Link>
            <a
              href="#wizard"
              className="text-sm px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Comenzar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 space-y-2 animate-slideInDown">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-600 hover:text-black transition rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/rutinas" 
              className="block px-4 py-3 text-gray-600 hover:text-black transition rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Rutinas
            </Link>
            <a
              href="#wizard"
              className="block px-4 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Comenzar
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

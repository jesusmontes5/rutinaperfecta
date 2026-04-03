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
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <Logo size="small" />
            <span className="font-700 text-base sm:text-lg text-black hidden sm:inline">
              Rutina Perfecta
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-500 text-gray-700 hover:text-black transition">
              Inicio
            </Link>
            <Link href="/rutinas" className="text-sm font-500 text-gray-700 hover:text-black transition">
              Rutinas
            </Link>
            <a
              href="#wizard"
              className="text-sm px-6 py-2 bg-black text-white font-600 rounded-lg hover:bg-gray-900 active:scale-95 transition-all"
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
              className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
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
          <div className="md:hidden pb-4 border-t border-gray-200/50 space-y-2 animate-slideInDown">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-500 text-sm transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/rutinas" 
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-500 text-sm transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Rutinas
            </Link>
            <a
              href="#wizard"
              className="block px-4 py-3 bg-black text-white font-600 rounded-lg hover:bg-gray-900 text-sm transition text-center"
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

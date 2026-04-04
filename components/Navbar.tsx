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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gold-light/20 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0 group">
            <Logo size="small" />
            <span className="font-800 text-base sm:text-lg text-gold-dark hidden sm:inline group-hover:text-[#c9a563] transition-colors">
              Rutina Perfecta
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className="relative px-4 py-2 text-sm font-600 text-color-text group transition-colors duration-200"
            >
              <span className="relative z-10 group-hover:text-gold-dark">Inicio</span>
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-gold-dark to-[#c9a563] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            <Link 
              href="/rutinas" 
              className="relative px-4 py-2 text-sm font-600 text-color-text group transition-colors duration-200"
            >
              <span className="relative z-10 group-hover:text-gold-dark">Rutinas</span>
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-gold-dark to-[#c9a563] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gold-light/10 rounded-lg transition text-gold-dark hover:text-[#c9a563]"
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
          <div className="md:hidden pb-4 border-t border-gold-light/20 space-y-2 animate-slideDown">
            <Link 
              href="/" 
              className="block px-4 py-3 text-color-text hover:text-gold-dark hover:bg-gold-light/5 rounded-lg font-600 text-sm transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/rutinas" 
              className="block px-4 py-3 text-color-text hover:text-gold-dark hover:bg-gold-light/5 rounded-lg font-600 text-sm transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Rutinas
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

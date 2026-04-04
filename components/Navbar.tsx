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
          ? 'bg-white/95 backdrop-blur-xl border-b border-gold-light/20 shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 group">
            <Logo size="small" />
            <span className="font-900 text-base sm:text-lg text-gold-dark hidden sm:inline group-hover:scale-105 transition-transform">
              Rutina Perfecta
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-500 text-color-text hover:text-gold-primary transition">
              Inicio
            </Link>
            <Link href="/rutinas" className="text-sm font-500 text-color-text hover:text-gold-primary transition">
              Rutinas
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gold-light/10 rounded-lg transition text-gold-dark"
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
          <div className="md:hidden pb-4 border-t border-color-border-light space-y-1 animate-slideDown">
            <Link 
              href="/" 
              className="block px-4 py-2.5 text-color-text hover:text-gold-primary hover:bg-color-bg-secondary rounded-lg font-500 text-sm transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/rutinas" 
              className="block px-4 py-2.5 text-color-text hover:text-gold-primary hover:bg-color-bg-secondary rounded-lg font-500 text-sm transition"
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

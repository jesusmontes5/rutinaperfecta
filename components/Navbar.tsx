// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-10 items-center rounded-lg px-4 text-sm font-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary relative group ${
        isActive
          ? 'text-gold-dark'
          : 'text-color-text hover:text-gold-dark'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-600 to-gold-500 rounded-full"></span>
      )}
      {!isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-600 to-gold-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl border-gold-light/40 shadow-lg shadow-gold-600/10'
          : 'bg-white/95 border-gold-light/20'
      }`}
    >
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0 group">
          <Logo size="large" />
          <span className="hidden text-sm font-800 text-gold-dark sm:inline group-hover:text-gold-primary transition-colors duration-300 font-display">
            Rutina Perfecta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/" isActive={isActive('/')}>
            Inicio
          </NavLink>
          <NavLink href="/rutinas" isActive={isActive('/rutinas')}>
            Rutinas
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border-2 border-gold-light/40 bg-gradient-to-br from-white to-gold-very-light/20 px-3 text-xs font-700 text-gold-dark transition-all duration-200 hover:border-gold-primary hover:shadow-md hover:shadow-gold-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Abrir menú"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-gold-light/30 bg-gradient-to-b from-white to-gold-very-light/30 px-4 sm:px-6 lg:px-8 py-3 md:hidden animate-in slide-in-from-top-2 duration-300">
          <nav className="grid gap-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-700 text-sm transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md shadow-gold-600/30'
                  : 'text-color-text hover:bg-gold-light/20 hover:text-gold-dark'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/rutinas"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-700 text-sm transition-all duration-200 ${
                isActive('/rutinas')
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md shadow-gold-600/30'
                  : 'text-color-text hover:bg-gold-light/20 hover:text-gold-dark'
              }`}
            >
              Rutinas
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

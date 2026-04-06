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
      className={`inline-flex h-10 items-center rounded-lg px-4 text-sm font-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a563] ${
        isActive
          ? 'text-gold-dark border-b-2 border-gold-dark'
          : 'text-color-text hover:text-gold-dark'
      }`}
    >
      {children}
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
          ? 'bg-white/95 backdrop-blur-xl border-gold-light/30 shadow-lg'
          : 'bg-white border-gold-light/20'
      }`}
    >
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <Logo size="medium" />
          <span className="hidden text-sm font-700 text-gold-dark sm:inline hover:text-[#c9a563] transition-colors">
            Rutina Perfecta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
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
          className="inline-flex h-11 min-w-11 items-center justify-center rounded-lg border border-gold-light/30 bg-white px-3 text-xs font-600 text-color-text transition-colors duration-150 hover:bg-gold-light/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a563] md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Abrir menú"
        >
          {mobileOpen ? '✕' : '☰ Menú'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-gold-light/20 bg-white px-4 sm:px-6 lg:px-8 py-3 md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="grid gap-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-600 text-sm transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gold-light/20 text-gold-dark border-l-4 border-gold-dark'
                  : 'text-color-text hover:bg-gold-light/10 hover:text-gold-dark'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/rutinas"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-600 text-sm transition-all duration-200 ${
                isActive('/rutinas')
                  ? 'bg-gold-light/20 text-gold-dark border-l-4 border-gold-dark'
                  : 'text-color-text hover:bg-gold-light/10 hover:text-gold-dark'
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

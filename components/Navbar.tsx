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

  const navItems = [
    { href: '/', icon: '🏠', label: 'Inicio' },
    { href: '/rutinas', icon: '💪', label: 'Rutinas' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b hidden sm:block ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl border-gold-light/40 shadow-lg shadow-gold-600/10'
            : 'bg-white/95 border-gold-light/20'
        }`}
      >
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0 group">
          <Logo size="large" />
          <span className="text-sm font-800 text-gold-dark group-hover:text-gold-primary transition-colors duration-300 font-display">
            Rutina Perfecta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map(({ href, label }) => (
            <NavLink key={href} href={href} isActive={isActive(href)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>

    {/* Mobile Bottom Navigation */}
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex sm:hidden bg-white/95 backdrop-blur-xl border-t border-gold-light/40 shadow-lg shadow-gold-600/10">
      {navItems.map(({ href, icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-xs font-700 transition-all duration-200 relative group ${
            isActive(href)
              ? 'text-gold-dark'
              : 'text-color-text-muted hover:text-gold-dark'
          }`}
        >
          <span className="text-xl mb-1">{icon}</span>
          <span className="text-xs text-center">{label}</span>
          {isActive(href) && (
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-primary to-gold-dark rounded-b-full animate-slideDown"></span>
          )}
        </Link>
      ))}
    </nav>

    {/* Padding Spacer for Mobile Bottom Nav */}
    <div className="h-20 sm:hidden" />
    </>
  );
}

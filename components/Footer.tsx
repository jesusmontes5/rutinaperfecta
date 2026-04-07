// components/Footer.tsx
'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gold-very-light/30 border-t border-gold-light/40 mt-20 md:mt-32 pb-20 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10">
            {/* Brand */}
            <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Logo size="small" />
                <h3 className="font-display font-800 text-gold-dark text-base bg-gradient-to-r from-gold-dark to-gold-primary bg-clip-text text-transparent">
                  Rutina Perfecta
                </h3>
              </div>
              <p className="text-sm text-color-text-muted leading-relaxed max-w-xs">
                La plataforma inteligente para crear rutinas de entrenamiento personalizadas con IA.
              </p>
            </div>

            {/* Quick Links */}
            <div className="hover:translate-y-1 transition-transform duration-300">
              <h4 className="font-display font-800 text-gold-dark mb-5 text-sm uppercase tracking-wide">Navegación</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-color-text-muted hover:text-gold-primary hover:translate-x-1 transition-all font-600 duration-200 inline-block">
                    → Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/rutinas" className="text-color-text-muted hover:text-gold-primary hover:translate-x-1 transition-all font-600 duration-200 inline-block">
                    → Rutinas
                  </Link>
                </li>
                <li>
                  <a href="#wizard" className="text-color-text-muted hover:text-gold-primary hover:translate-x-1 transition-all font-600 duration-200 inline-block">
                    → Crear
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div className="hover:translate-y-1 transition-transform duration-300">
              <h4 className="font-display font-800 text-gold-dark mb-5 text-sm uppercase tracking-wide">Características</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-gold-primary">✨</span>
                  <span className="text-color-text-muted font-600">Generador IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-primary">⚙️</span>
                  <span className="text-color-text-muted font-600">Personalizadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-primary">📄</span>
                  <span className="text-color-text-muted font-600">Descarga PDF</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="hover:translate-y-1 transition-transform duration-300">
              <h4 className="font-display font-800 text-gold-dark mb-5 text-sm uppercase tracking-wide">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/legal/privacidad" className="text-color-text-muted hover:text-gold-primary hover:translate-x-1 transition-all font-600 duration-200 inline-block">
                    → Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-color-text-muted hover:text-gold-primary hover:translate-x-1 transition-all font-600 duration-200 inline-block">
                    → Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/legal/aviso-legal" className="text-color-text-muted hover:text-gold-primary hover:translate-x-1 transition-all font-600 duration-200 inline-block">
                    → Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gold-light/30 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-color-text-muted">
              <p className="font-500 text-center sm:text-left">© {currentYear} Rutina Perfecta. Todos los derechos reservados.</p>
              <p className="font-500 flex items-center gap-2">
                Hecho con <span className="text-red-500 animate-pulse text-lg leading-none">♥</span> para tu fitness
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

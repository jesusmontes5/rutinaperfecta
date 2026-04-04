// components/Footer.tsx
'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-color-border-light mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Logo size="small" />
                <h3 className="font-600 text-gold-dark text-base">Rutina Perfecta</h3>
              </div>
              <p className="text-sm text-color-text-muted">La plataforma para crear rutinas con IA.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-500 text-color-text mb-4 text-sm">Navegación</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-color-text-muted hover:text-gold-primary transition">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/rutinas" className="text-color-text-muted hover:text-gold-primary transition">
                    Rutinas
                  </Link>
                </li>
                <li>
                  <a href="#wizard" className="text-color-text-muted hover:text-gold-primary transition">
                    Crear
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-500 text-color-text mb-4 text-sm">Características</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-color-text-muted">Generador IA</span></li>
                <li><span className="text-color-text-muted">Personalizado</span></li>
                <li><span className="text-color-text-muted">PDF</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-500 text-color-text mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/legal/privacidad" className="text-color-text-muted hover:text-gold-primary transition">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-color-text-muted hover:text-gold-primary transition">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/legal/aviso-legal" className="text-color-text-muted hover:text-gold-primary transition">
                    Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-color-border-light pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-color-text-muted">
              <p>© {currentYear} Rutina Perfecta. Todos los derechos reservados.</p>
              <p>Hecho con ❤ para tu fitness</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

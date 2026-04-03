// components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-700 text-sm">RP</span>
                </div>
                <h3 className="font-700 text-black text-base">
                  Rutina Perfecta
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                La plataforma inteligente para crear rutinas de fitness personalizadas basadas en IA.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-600 text-gray-900 mb-6 text-sm uppercase tracking-wide">Navegación</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-black transition-colors duration-200">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/rutinas" className="text-gray-600 hover:text-black transition-colors duration-200">
                    Rutinas
                  </Link>
                </li>
                <li>
                  <a href="#wizard" className="text-gray-600 hover:text-black transition-colors duration-200">
                    Crear Rutina
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-600 text-gray-900 mb-6 text-sm uppercase tracking-wide">Características</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button className="text-gray-600 hover:text-black transition-colors duration-200">
                    Generador IA
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-black transition-colors duration-200">
                    Personalizado
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-black transition-colors duration-200">
                    Descargar PDF
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-600 text-gray-900 mb-6 text-sm uppercase tracking-wide">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/legal/privacidad" className="text-gray-600 hover:text-black transition-colors duration-200">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-gray-600 hover:text-black transition-colors duration-200">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/legal/aviso-legal" className="text-gray-600 hover:text-black transition-colors duration-200">
                    Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-gray-600">
                © {currentYear} <span className="font-600 text-gray-900">Rutina Perfecta</span>. Todos los derechos reservados.
              </p>
              <p className="text-sm text-gray-600">
                Hecho con ❤️ para tu fitness
              </p>
            </div>
          </div>
        </div>

        {/* Banner Ad */}
        <div className="py-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-8 text-center min-h-[100px] flex items-center justify-center border border-gray-200">
            <div className="text-gray-500 text-sm">
              <p>Espacio disponible para publicidad</p>
              <p className="text-xs mt-2 text-gray-400">728×90 Banner</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

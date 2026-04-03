// components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200/50 mt-24 sm:mt-32 md:mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16 mb-12 md:mb-16">
            {/* Brand */}
            <div className="space-y-4 sm:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-700 text-sm">RP</span>
                </div>
                <h3 className="font-700 text-black text-base leading-tight">
                  Rutina <br className="md:hidden" />Perfecta
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                La plataforma más inteligente para crear rutinas de fitness personalizadas con IA.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-600 text-gray-900 mb-4 sm:mb-6 text-xs uppercase tracking-wider">Navegación</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-black hover:font-500 transition-all duration-200">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/rutinas" className="text-gray-600 hover:text-black hover:font-500 transition-all duration-200">
                    Rutinas
                  </Link>
                </li>
                <li>
                  <a href="#wizard" className="text-gray-600 hover:text-black hover:font-500 transition-all duration-200">
                    Crear Rutina
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-600 text-gray-900 mb-4 sm:mb-6 text-xs uppercase tracking-wider">Características</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-sm">
                <li>
                  <span className="text-gray-600">Generador IA</span>
                </li>
                <li>
                  <span className="text-gray-600">100% Personalizado</span>
                </li>
                <li>
                  <span className="text-gray-600">Descarga PDF</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-600 text-gray-900 mb-4 sm:mb-6 text-xs uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-sm">
                <li>
                  <Link href="/legal/privacidad" className="text-gray-600 hover:text-black hover:font-500 transition-all duration-200">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-gray-600 hover:text-black hover:font-500 transition-all duration-200">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/legal/aviso-legal" className="text-gray-600 hover:text-black hover:font-500 transition-all duration-200">
                    Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200/50 pt-8 sm:pt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                © {currentYear} <span className="font-600 text-gray-900">Rutina Perfecta</span>. Todos los derechos reservados.
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Hecho con <span className="text-red-500">❤</span> para tu fitness
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Ad Space */}
        <div className="py-8 sm:py-12 border-t border-gray-200/50">
          <div className="bg-gray-50/50 rounded-xl p-8 sm:p-12 text-center min-h-[90px] sm:min-h-[100px] flex items-center justify-center border border-gray-200/50">
            {/* Google AdSense ad will be displayed here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

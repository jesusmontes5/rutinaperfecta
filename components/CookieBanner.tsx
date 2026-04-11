'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Revisar si ya aceptó cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      {/* Banner Premium */}
      <div className="bg-white border-t-2 border-gold-primary shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-6">
          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold-primary to-gold-dark rounded-full" />
              <h3 className="text-lg font-bold text-gray-900">Política de Cookies</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed ml-4">
              Utilizamos cookies para mejorar tu experiencia en nuestra web, analizar el tráfico y personalizar el contenido. 
              <a href="/legal/cookies" className="ml-1 text-gold-primary font-semibold hover:text-gold-dark transition-colors">
                Más información
              </a>
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 w-full md:w-auto flex-shrink-0 relative z-50">
            <button
              onClick={handleReject}
              className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all duration-300 border border-gray-300 whitespace-nowrap"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2.5 text-white font-bold rounded-lg transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #D4A574, #B8894F)',
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

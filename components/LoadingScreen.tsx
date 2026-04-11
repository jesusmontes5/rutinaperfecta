'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Only show loading screen on initial page load, not on navigation
    const hasShownLoading = sessionStorage.getItem('__loading_shown__');
    
    if (!hasShownLoading) {
      // First load - show loading screen
      setIsVisible(true);
      
      // Hide after 1 second with exit animation
      const timer = setTimeout(() => {
        setIsExiting(true);
        const exitTimer = setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('__loading_shown__', 'true');
        }, 300);
        return () => clearTimeout(exitTimer);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Control del body overflow
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-600 pointer-events-none ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Fondo premium con gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white via-gold-very-light/30 to-white transition-all duration-700 ${isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`} />

      {/* Orbes de luz animadas - Fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-b from-gold-light/20 to-transparent rounded-full blur-3xl transition-all duration-1000 ${isExiting ? 'opacity-0 scale-50' : 'opacity-100 scale-100 animate-pulse'}`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-t from-gold-light/20 to-transparent rounded-full blur-3xl transition-all duration-1000 ${isExiting ? 'opacity-0 scale-50' : 'opacity-100 scale-100 animate-pulse'}`} style={{ animationDelay: '0.5s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-gold-primary/5 via-transparent to-gold-primary/5 rounded-full blur-3xl transition-all duration-1000 animate-spin-slow ${isExiting ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} style={{ animationDuration: '8s' }} />
      </div>

      {/* Contenedor principal */}
      <div className={`relative z-10 flex flex-col items-center justify-center gap-6 px-6 transition-all duration-700 ${isExiting ? 'opacity-0 scale-90 -translate-y-10' : 'opacity-100 scale-100 translate-y-0'}`}>
        {/* Logo - Premium Scale Animation */}
        <div className={`relative animate-logo-entrance`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gold-light/40 to-gold-light/10 rounded-3xl blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-40 h-40 bg-gradient-to-br from-white to-gold-very-light rounded-3xl flex items-center justify-center shadow-2xl p-4 border border-gold-light/40">
            <img
              src="/logo.png"
              alt="Rutina Perfecta"
              className="w-full h-full object-contain rounded-2xl drop-shadow-lg"
            />
          </div>
        </div>

        {/* Marca de texto */}
        <div className={`text-center space-y-2 animate-fade-in-up transition-all duration-700`} style={{ animationDelay: '0.3s' }}>
          <h1 className="text-3xl font-800 text-color-text">Rutina Perfecta</h1>
          <p className="text-sm text-color-text-muted font-500 tracking-wide">Tu entrenamiento personalizado</p>
        </div>

        {/* Barra de progreso premium */}
        <div className={`w-64 mt-6 space-y-3 animate-fade-in-up transition-all duration-700`} style={{ animationDelay: '0.4s' }}>
          <div className="relative h-1 bg-gold-light/30 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-light via-gold-primary to-gold-light rounded-full animate-progress-bar" />
          </div>
          <p className="text-xs text-center text-color-text-muted font-500">Preparando tu experiencia...</p>
        </div>

        {/* Puntos de carga decorativos */}
        <div className={`flex items-center justify-center gap-2 mt-4 animate-fade-in-up transition-all duration-700`} style={{ animationDelay: '0.5s' }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-gold-primary rounded-full"
              style={{
                animation: `pulse-load 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
                opacity: 0.6 + (i * 0.1),
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-load {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes progress-bar {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes logo-entrance {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-logo-entrance {
          animation: logo-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-progress-bar {
          animation: progress-bar 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

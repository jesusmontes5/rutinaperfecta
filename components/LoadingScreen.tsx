'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Control del body overflow
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Mostrar loading por 2-3 segundos después de que la página cargue
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Logo - Mejorado */}
        <div className="animate-fade-in">
          <Logo size="large" />
        </div>

        {/* Loader - Líneas animadas */}
        <div className="flex items-center justify-center gap-2 h-12">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-black rounded-full"
              style={{
                height: `${20 + i * 15}px`,
                animation: `loading 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: scaleY(1);
          }
          30% {
            opacity: 1;
            transform: scaleY(1.3);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'small', showText = false }: LogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-14 h-14',
    large: 'w-20 h-20',
  };

  useEffect(() => {
    const element = logoRef.current;
    if (element) {
      // ===== LOGO FLOAT & ROTATE ANIMATION =====
      gsap.to(element, {
        duration: 3,
        y: -8,
        rotation: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ===== LOGO GLOW PULSE (Optional) =====
      gsap.to(element, {
        duration: 2,
        filter: 'drop-shadow(0 0 8px rgba(201, 165, 99, 0.6))',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 hover:opacity-90 transition-all duration-300">
      <div ref={logoRef} className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img
          src="/logo.png"
          alt="Rutina Perfecta Logo"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {showText && (
        <div className="w-20 h-8 flex items-center justify-center">
          <img
            src="/LOGOTEXTO.jpg"
            alt="Rutina Perfecta"
            className="h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

// hooks/useLenis.ts
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    // Evitar instancias múltiples
    if (lenisInstance) return;

    // Inicializar Lenis con configuración agresiva
    const lenis = new Lenis({
      duration: 1.2, // Duración base del scroll (segundos)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing personalizado para aceleración
      lerp: 0.1, // Interpolación para suavidad
      wheelMultiplier: 1.5, // Multiplicar velocidad del wheel
      touchMultiplier: 2, // Multiplicar velocidad en touch
    });

    lenisInstance = lenis;

    // RAF loop para Lenis
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Event listeners opcionales
    lenis.on('scroll', (_data) => {
      // console.log('Scroll position:', _data.scrollY);
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisInstance;
}

// Función helper para scroll programático
export function scrollToElement(element: HTMLElement, options?: { offset?: number; duration?: number }) {
  if (!lenisInstance) return;
  
  lenisInstance.scrollTo(element, {
    offset: options?.offset || 0,
    duration: options?.duration || 1.2,
  });
}

// Función para scroll suave a una posición específica
export function scrollToPosition(position: number, duration?: number) {
  if (!lenisInstance) return;
  
  lenisInstance.scrollTo(position, {
    duration: duration || 1.2,
  });
}

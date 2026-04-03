// hooks/useScrollReveal.ts
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  duration?: number; // duración de la animación
  delay?: number; // delay antes de empezar
  ease?: string; // easing function (power2.out, back.out, elastic.out, etc.)
  y?: number; // movimiento en Y (negativo = de arriba, positivo = de abajo)
  x?: number; // movimiento en X
  opacity?: number; // opacidad inicial (0 = invisible)
  scale?: number; // escala inicial (0.8 = 80%)
  rotation?: number; // rotación inicial
  stagger?: number; // delay entre múltiples elementos
  markers?: boolean; // mostrar markers de debug (solo dev)
}

/**
 * Hook para animar elementos cuando entran en viewport con GSAP
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    y = 50,
    x = 0,
    opacity = 0,
    scale = 1,
    rotation = 0,
    markers = false,
  } = options;

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Configurar estado inicial
    gsap.set(ref.current, {
      opacity,
      y,
      x,
      scale,
      rotation,
    });

    // Crear animación con ScrollTrigger
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%', // Dispara cuando el top del elemento está al 80% del viewport
        end: 'top 20%',
        markers: markers && process.env.NODE_ENV === 'development',
        toggleActions: 'play none none none', // play on enter, pause on leave, resume on re-enter, reverse on re-leave
      },
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration,
      delay,
      ease,
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, ease, y, x, opacity, scale, rotation, markers]);

  return ref;
}

/**
 * Hook para animar múltiples elementos con stagger
 */
export function useScrollRevealStagger(options: ScrollRevealOptions = {}) {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    y = 50,
    x = 0,
    opacity = 0,
    scale = 1,
    rotation = 0,
    stagger = 0.1,
    markers = false,
  } = options;

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll('[data-animate]');
    if (children.length === 0) return;

    // Configurar estado inicial para todos
    gsap.set(children, {
      opacity,
      y,
      x,
      scale,
      rotation,
    });

    // Animar con stagger
    gsap.to(children, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        markers: markers && process.env.NODE_ENV === 'development',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration,
      delay,
      ease,
      stagger: stagger,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, ease, y, x, opacity, scale, rotation, stagger, markers]);

  return containerRef;
}

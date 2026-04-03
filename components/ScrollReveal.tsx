// components/ScrollReveal.tsx
'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  rotation?: number;
  className?: string;
}

/**
 * Componente wrapper para animar children con scroll reveal
 * Uso: <ScrollReveal><div>Contenido</div></ScrollReveal>
 */
export function ScrollReveal({
  children,
  duration = 0.8,
  delay = 0,
  ease = 'power2.out',
  y = 50,
  x = 0,
  opacity = 0,
  scale = 1,
  rotation = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useScrollReveal({
    duration,
    delay,
    ease,
    y,
    x,
    opacity,
    scale,
    rotation,
  });

  return (
    <div ref={ref as any} className={className}>
      {children}
    </div>
  );
}

/**
 * Componente para animar children desde arriba
 */
export function ScrollRevealUp({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal y={50} duration={0.8} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

/**
 * Componente para animar children desde abajo
 */
export function ScrollRevealDown({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal y={-50} duration={0.8} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

/**
 * Componente para fade in
 */
export function ScrollRevealFade({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal opacity={0} y={0} duration={0.6} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

/**
 * Componente para scale up
 */
export function ScrollRevealScale({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <ScrollReveal scale={0.8} opacity={0} duration={0.8} delay={delay} ease="back.out" className={className}>
      {children}
    </ScrollReveal>
  );
}

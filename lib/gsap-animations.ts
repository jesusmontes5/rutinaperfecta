// lib/gsap-animations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Presets de animaciones para scroll reveal
 */

export const AnimationPresets = {
  // Slide desde arriba
  slideInDown: {
    duration: 0.8,
    ease: 'power2.out',
    y: -60,
    opacity: 0,
  },

  // Slide desde abajo (default)
  slideInUp: {
    duration: 0.8,
    ease: 'power2.out',
    y: 60,
    opacity: 0,
  },

  // Slide desde izquierda
  slideInLeft: {
    duration: 0.8,
    ease: 'power2.out',
    x: -60,
    opacity: 0,
  },

  // Slide desde derecha
  slideInRight: {
    duration: 0.8,
    ease: 'power2.out',
    x: 60,
    opacity: 0,
  },

  // Fade in 
  fadeIn: {
    duration: 0.6,
    ease: 'power1.out',
    opacity: 0,
  },

  // Scale up
  scaleUp: {
    duration: 0.8,
    ease: 'back.out',
    scale: 0.8,
    opacity: 0,
  },

  // Scale down
  scaleDown: {
    duration: 0.8,
    ease: 'back.out',
    scale: 1.2,
    opacity: 0,
  },

  // Rotate in
  rotateIn: {
    duration: 0.8,
    ease: 'back.out',
    rotation: -45,
    opacity: 0,
  },

  // Combo: slide + scale
  slideScaleUp: {
    duration: 0.8,
    ease: 'power2.out',
    y: 40,
    scale: 0.9,
    opacity: 0,
  },

  // Elastic bounce
  elasticBounce: {
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
    scale: 0.8,
    opacity: 0,
  },

  // Flip in
  flipIn: {
    duration: 0.8,
    ease: 'back.out',
    rotationY: 90,
    opacity: 0,
  },
};

/**
 * Aplicar animación scroll reveal a un elemento
 */
export function createScrollReveal(
  element: HTMLElement,
  animationPreset: any = AnimationPresets.slideInUp,
  options: {
    start?: string;
    delay?: number;
  } = {}
) {
  const { start = 'top 80%', delay = 0 } = options;

  // Configurar estado inicial
  gsap.set(element, {
    opacity: animationPreset.opacity ?? 1,
    y: animationPreset.y ?? 0,
    x: animationPreset.x ?? 0,
    scale: animationPreset.scale ?? 1,
    rotation: animationPreset.rotation ?? 0,
    rotationY: animationPreset.rotationY ?? 0,
  });

  // Crear animación
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotation: 0,
    rotationY: 0,
    duration: animationPreset.duration ?? 0.8,
    delay: delay,
    ease: animationPreset.ease ?? 'power2.out',
  });
}

/**
 * Animar múltiples elementos con stagger
 */
export function createScrollRevealStagger(
  elements: NodeListOf<Element> | Element[],
  animationPreset: any = AnimationPresets.slideInUp,
  options: {
    start?: string;
    delay?: number;
    stagger?: number;
  } = {}
) {
  const { start = 'top 80%', delay = 0, stagger = 0.1 } = options;

  // Configurar estado inicial
  gsap.set(elements, {
    opacity: animationPreset.opacity ?? 1,
    y: animationPreset.y ?? 0,
    x: animationPreset.x ?? 0,
    scale: animationPreset.scale ?? 1,
    rotation: animationPreset.rotation ?? 0,
  });

  // Animar con stagger
  return gsap.to(elements, {
    scrollTrigger: {
      trigger: elements[0] as Element,
      start,
      toggleActions: 'play none none none',
    },
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotation: 0,
    duration: animationPreset.duration ?? 0.8,
    delay: delay,
    ease: animationPreset.ease ?? 'power2.out',
    stagger: stagger,
  });
}

/**
 * Limpiar todas las animaciones scroll
 */
export function clearScrollAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

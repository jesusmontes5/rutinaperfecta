// lib/lenis-utils.ts
import { scrollToElement, scrollToPosition } from '@/hooks/useLenis';

/**
 * Hacer scroll suave a un elemento por ID
 */
export function smoothScrollToId(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    scrollToElement(element, { offset, duration: 1.2 });
  }
}

/**
 * Hacer scroll suave a una posición específica (en pixels)
 */
export function smoothScrollToTop() {
  scrollToPosition(0, 1.2);
}

export function smoothScrollToPosition(position: number) {
  scrollToPosition(position, 1.2);
}

/**
 * Detectar si estamos en una zona visible (útil para analytics)
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Observer para elementos que entran en viewport (útil para lazy loading)
 */
export function onElementInViewport(element: HTMLElement, callback: () => void) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(element);
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(element);
}

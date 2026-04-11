/**
 * useExerciseFiltering - Hook personalizado para filtrado de ejercicios
 * Características:
 * - Filtrado por grupo muscular
 * - Filtrado por dificultad
 * - Búsqueda por nombre
 * - Caché de resultados
 * - Debounce para performance
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { exerciseDatabase, type BodyPart, type Exercise } from '@/lib/exerciseDatabase';

interface FilterOptions {
  bodyPart?: BodyPart | null;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  searchTerm?: string;
}

/**
 * Hook para filtrar ejercicios con caché y optimización
 */
export function useExerciseFiltering(options: FilterOptions = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced' | null
  >(null);

  /**
   * Realiza el filtrado memoizado
   */
  const filteredExercises = useMemo<Exercise[]>(() => {
    let result = [...exerciseDatabase];

    // Filtro por grupo muscular
    if (options.bodyPart) {
      result = result.filter((ex) => ex.bodyPart === options.bodyPart);
    }

    // Filtro por dificultad
    if (options.difficulty || selectedDifficulty) {
      const difficulty = options.difficulty || selectedDifficulty;
      result = result.filter((ex) => ex.difficulty === difficulty);
    }

    // Filtro por búsqueda
    const search = (options.searchTerm || searchTerm).toLowerCase();
    if (search) {
      result = result.filter(
        (ex) =>
          ex.name.toLowerCase().includes(search) ||
          ex.description.toLowerCase().includes(search)
      );
    }

    return result;
  }, [options.bodyPart, options.difficulty, options.searchTerm, searchTerm, selectedDifficulty]);

  return {
    filteredExercises,
    searchTerm,
    setSearchTerm,
    selectedDifficulty,
    setSelectedDifficulty,
  };
}

/**
 * Hook para lazy loading de videos
 */
export function useVideoLazyLoad(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer para lazy load
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Silenciar errores si el video no se puede reproducir
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [videoRef]);
}

/**
 * Hook para precargar videos
 */
export function useVideoPreload(videoSrc: string) {
  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.preload = 'metadata';
  }, [videoSrc]);
}

'use client';

/**
 * ExerciseList - Lista de ejercicios filtrada
 * Características:
 * - Grid responsive
 * - Animación de entrada escalonada
 * - Estado vacío elegante
 * - Filtrado dinámico
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ExerciseCard from './ExerciseCard';
import type { Exercise, BodyPart } from '@/lib/exerciseDatabase';

interface ExerciseListProps {
  exercises: Exercise[];
  isLoading?: boolean;
  bodyPart?: BodyPart | null;
  onSelectExercise?: (exercise: Exercise) => void;
}

export default function ExerciseList({ exercises, isLoading = false, bodyPart, onSelectExercise }: ExerciseListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Anima el contenedor cuando cambian los ejercicios
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animar entrada del contenedor
    gsap.fromTo(
      container,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }
    );
  }, [exercises]);

  // Estado vacío
  if (!isLoading && exercises.length === 0) {
    return (
      <div className="w-full py-12 px-4">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h3 className="text-xl md:text-2xl font-display font-700 text-gold-dark">
            {bodyPart ? 'Selecciona una zona' : 'Sin ejercicios aún'}
          </h3>
          <p className="text-color-text-muted text-sm md:text-base">
            {bodyPart
              ? 'Selecciona un grupo muscular del mapa para ver ejercicios específicos'
              : 'Elige una zona del cuerpo para explorar ejercicios'}
          </p>

          {/* Decoración */}
          <div className="pt-4">
            <div className="inline-flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gold-light/50"
                  style={{
                    animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Estado cargando
  if (isLoading) {
    return (
      <div className="w-full py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gold-light/40 aspect-video animate-pulse"
              style={{
                background: `linear-gradient(90deg, #fafafa 0%, #f5f5f5 50%, #fafafa 100%)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full px-4">
      {/* Header con contador */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-800 text-gold-dark mb-2">
            Ejercicios Disponibles
          </h2>
          <p className="text-color-text-muted text-sm md:text-base">
            {exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''} encontrado{exercises.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Badge informativo */}
        <div className="hidden sm:block px-4 py-2 bg-gradient-to-r from-gold-light/20 to-gold-very-light/40 border border-gold-light/50 rounded-full">
          <p className="text-sm font-600 text-gold-dark">▶ Autoplay habilitado</p>
        </div>
      </div>

      {/* Grid de ejercicios */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            onSelect={onSelectExercise}
          />
        ))}
      </div>

      {/* Footer info */}
      <div className="max-w-6xl mx-auto pb-8 px-4 md:px-0">
        <div className="bg-gradient-to-r from-gold-very-light to-gold-light/10 border border-gold-light/50 rounded-2xl p-6 md:p-8 text-center">
          <p className="text-color-text-muted text-sm md:text-base">
            <span className="font-600 text-gold-dark">Consejo:</span> Realiza 3-4 series con descansos de 60-90 segundos entre cada una
          </p>
        </div>
      </div>
    </div>
  );
}

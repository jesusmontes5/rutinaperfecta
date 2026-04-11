'use client';

/**
 * ExerciseCard - Tarjeta individual de ejercicio
 * Características:
 * - Video en loop, muted, autoplay
 * - Información del ejercicio
 * - Hover effect con zoom y elevación
 * - Diseño premium minimalista
 */

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import type { Exercise } from '@/lib/exerciseDatabase';

interface ExerciseCardProps {
  exercise: Exercise;
  index?: number;
  onSelect?: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, index = 0, onSelect }: ExerciseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Animación de entrada escalonada y hover
   */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Animación inicial de entrada
    gsap.fromTo(
      card,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'back.out(1.5)',
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animar shadow
      gsap.to(card, {
        boxShadow: '0 20px 30px rgba(212, 165, 116, 0.25)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(card, {
        boxShadow: '0 8px 16px rgba(212, 165, 116, 0.1)',
        duration: 0.3,
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  /**
   * Obtiene el texto de dificultad con color
   */
  const getDifficultyBadge = () => {
    const colors: Record<string, { bg: string; text: string }> = {
      beginner: { bg: 'bg-green-100', text: 'text-green-700' },
      intermediate: { bg: 'bg-amber-100', text: 'text-amber-700' },
      advanced: { bg: 'bg-red-100', text: 'text-red-700' },
    };

    const config = colors[exercise.difficulty] || colors.beginner;
    const labels: Record<string, string> = {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    };

    return { ...config, label: labels[exercise.difficulty] };
  };

  const difficultyBadge = getDifficultyBadge();

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-b from-gold-very-light to-gold-light/10 rounded-2xl overflow-hidden border border-gold-light/40 hover:border-gold-primary/60 transition-all duration-300 group"
      style={{
        boxShadow: '0 8px 16px rgba(212, 165, 116, 0.1)',
      }}
    >
      {/* Contenido de la tarjeta */}
      <div className="p-4 md:p-5 space-y-3 flex flex-col">
        {/* Nombre y descripción */}
        <div>
          <h3 className="text-base md:text-lg font-display font-700 text-gold-dark mb-1 line-clamp-1">
            {exercise.name}
          </h3>
          <p className="text-xs md:text-sm text-color-text-muted leading-snug line-clamp-2">
            {exercise.description}
          </p>
        </div>

        {/* Stats e información */}
        <div className="flex items-center gap-3 flex-wrap pt-2">
          {/* Dificultad */}
          <span className={`inline-flex items-center gap-2 text-xs font-600 px-3 py-1.5 rounded-full ${difficultyBadge.bg} ${difficultyBadge.text}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {difficultyBadge.label}
          </span>

          {/* Series */}
          {exercise.sets && (
            <div className="flex items-center gap-2 text-xs text-gold-dark font-600 bg-gold-light/20 px-3 py-1.5 rounded-full">
              <span>{exercise.sets} series</span>
            </div>
          )}

          {/* Reps */}
          {exercise.reps && (
            <div className="flex items-center gap-2 text-xs text-gold-dark font-600 bg-gold-light/20 px-3 py-1.5 rounded-full">
              <span>{exercise.reps} reps</span>
            </div>
          )}
        </div>

        {/* CTA - Con z-index más alto */}
        <div className="mt-auto pt-4 relative z-20">
          <button
            onClick={() => onSelect?.(exercise)}
            className="w-full py-3 px-4 text-white font-bold text-base rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg relative z-10 overflow-hidden"
            style={{
              background: 'linear-gradient(to right, #D4A574, #B8894F)',
              boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 165, 116, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.3)';
            }}
          >
            <span className="relative z-10">Ver detalles</span>
          </button>
        </div>
      </div>
    </div>
  );
}

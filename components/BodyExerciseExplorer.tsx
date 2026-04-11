'use client';

/**
 * BodyExerciseExplorer - Componente principal
 * Integra:
 * - BodyMap (selección interactiva)
 * - ExerciseList (listado de ejercicios)
 * - ExerciseDetail (modal con detalles)
 * - Lógica de filtrado
 * - Animaciones coordinadas
 */

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import BodyMap from './BodyMap';
import ExerciseList from './ExerciseList';
import ExerciseDetail from './ExerciseDetail';
import { getExercisesByBodyPart } from '@/lib/exerciseDatabase';
import type { BodyPart, Exercise } from '@/lib/exerciseDatabase';

export default function BodyExerciseExplorer() {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const exercisesRef = useRef<HTMLDivElement>(null);

  /**
   * Actualiza los ejercicios filtrados cuando se selecciona una parte
   */
  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      if (selectedPart) {
        const exercises = getExercisesByBodyPart(selectedPart);
        setFilteredExercises(exercises);
      } else {
        setFilteredExercises([]);
      }
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedPart]);

  /**
   * Animación del contenedor principal
   */
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      gsap.fromTo(
        container,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  /**
   * Scroll automático a ejercicios en mobile cuando se selecciona una parte
   */
  useEffect(() => {
    if (selectedPart && exercisesRef.current) {
      // Esperar un poco para que se renderize el contenido
      const timer = setTimeout(() => {
        const isMobile = window.innerWidth < 1024; // lg breakpoint
        
        if (isMobile) {
          // Scroll suave a la sección de ejercicios
          exercisesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedPart]);

  return (
    <div ref={containerRef} className="w-full bg-gradient-to-b from-white via-gold-very-light/20 to-white min-h-screen py-10 md:py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
        {/* Sección Hero */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-900 bg-gradient-to-r from-gold-dark via-gold-primary to-gold-light bg-clip-text text-transparent">
            Explora Ejercicios por Zona
          </h1>
          <p className="text-color-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Selecciona un grupo muscular para descubrir ejercicios específicos,
            técnicas correctas y recomendaciones de series y repeticiones.
          </p>

          {/* Decoración visual */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-gold-light animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-gold-primary/50 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Layout: Mapa y Ejercicios */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Mapa del cuerpo - Sidebar izquierdo */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <BodyMap selectedPart={selectedPart} onSelectPart={setSelectedPart} />
            </div>
          </div>

          {/* Ejercicios - Contenido principal */}
          <div className="lg:col-span-3" ref={exercisesRef}>
            <div className="rounded-3xl bg-white/50 backdrop-blur-sm border border-gold-light/30 p-8 md:p-10">
              {selectedPart ? (
                <>
                  {/* Header con zona seleccionada */}
                  <div className="mb-8 pb-6 border-b border-gold-light/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-gold-primary animate-pulse" />
                      <p className="text-sm font-600 uppercase tracking-widest text-gold-dark">
                        Zona seleccionada
                      </p>
                    </div>
                  </div>

                  {/* Lista de ejercicios con transición */}
                  <div
                    className={`transition-all duration-300 ${
                      isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <ExerciseList
                      exercises={filteredExercises}
                      bodyPart={selectedPart}
                      onSelectExercise={setSelectedExercise}
                    />
                  </div>
                </>
              ) : (
                /* Estado inicial - sin selección */
                <div className="py-16 text-center space-y-6">
                  <h3 className="text-2xl md:text-3xl font-display font-700 text-gold-dark">
                    Comienza tu exploración
                  </h3>
                  <p className="text-color-text-muted text-base md:text-lg max-w-md mx-auto">
                    Selecciona un grupo muscular para ver ejercicios personalizados
                    con técnicas de ejecución paso a paso.
                  </p>

                  {/* Guía visual */}
                  <div className="pt-8 space-y-4 text-left max-w-md mx-auto">
                    <div className="flex gap-4 items-start p-4 bg-gold-very-light/50 rounded-xl border border-gold-light/50">
                      <p className="text-sm text-gold-dark">
                        <span className="font-600">Observa:</span> Cada zona está claramente marcada
                      </p>
                    </div>
                    <div className="flex gap-4 items-start p-4 bg-gold-very-light/50 rounded-xl border border-gold-light/50">
                      <p className="text-sm text-gold-dark">
                        <span className="font-600">Haz click:</span> En la zona que desees trabajar
                      </p>
                    </div>
                    <div className="flex gap-4 items-start p-4 bg-gold-very-light/50 rounded-xl border border-gold-light/50">
                      <p className="text-sm text-gold-dark">
                        <span className="font-600">Entrena:</span> Con ejercicios personalizados
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer promocional */}
        <div className="mt-20 pt-12 border-t border-gold-light/30">
          <div className="bg-gradient-to-r from-gold-primary/5 via-gold-light/5 to-gold-primary/5 rounded-3xl p-8 md:p-12 text-center border border-gold-light/30">
            <h3 className="text-2xl md:text-3xl font-display font-800 text-gold-dark mb-4">
              ¿Necesitas un plan personalizado?
            </h3>
            <p className="text-color-text-muted text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Utiliza nuestro generador de rutinas para crear planes de entrenamiento adaptados a tu
              nivel y objetivos.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-gold-primary to-gold-dark hover:from-gold-dark hover:to-gold-dark text-white font-700 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-primary/30 hover:scale-105 active:scale-95">
              <span>Crear Rutina</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>

      {/* Modal de detalle del ejercicio */}
      {selectedExercise && (
        <ExerciseDetail exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      )}
    </div>
  );
}

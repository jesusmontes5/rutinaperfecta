'use client';

import { useEffect } from 'react';
import { Exercise, bodyPartMetadata } from '@/lib/exerciseDatabase';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
}

export default function ExerciseDetail({ exercise, onClose }: ExerciseDetailProps) {
  const metadata = bodyPartMetadata[exercise.bodyPart];

  // Bloquear scroll del body cuando modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Mapa de colores por dificultad
  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500',
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-4 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold-primary to-gold-light p-4 md:p-6 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 truncate">{exercise.name}</h1>
              <p className="text-sm md:text-base text-gray-700 font-600">{metadata.label}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-900 hover:bg-white/30 rounded-full p-2 md:p-3 transition-colors text-lg md:text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto max-h-[calc(95vh-100px)] md:max-h-[calc(90vh-100px)] p-4 md:p-8">
          {/* Descripción */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gold-dark mb-3">Descripción</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{exercise.description}</p>
          </section>

          {/* Pasos de Ejecución */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gold-dark mb-4">Pasos de Ejecución</h2>
            <div className="space-y-3">
              {exercise.execution.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Información del Ejercicio */}
          <section className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gold-dark mb-4">Información</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Repeticiones */}
              <div className="border-l-4 border-gold-primary pl-4">
                <p className="text-sm text-gray-500 mb-1">Repeticiones</p>
                <p className="text-lg font-bold text-gray-800">{exercise.reps || 'N/A'}</p>
              </div>

              {/* Series */}
              {exercise.sets && (
                <div className="border-l-4 border-gold-primary pl-4">
                  <p className="text-sm text-gray-500 mb-1">Series</p>
                  <p className="text-lg font-bold text-gray-800">{exercise.sets}</p>
                </div>
              )}

              {/* Dificultad */}
              <div className="border-l-4 border-gold-primary pl-4">
                <p className="text-sm text-gray-500 mb-1">Dificultad</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      difficultyColors[exercise.difficulty] || 'bg-gray-400'
                    }`}
                  ></div>
                  <span className="text-sm font-semibold text-gray-800 capitalize">
                    {exercise.difficulty === 'beginner'
                      ? 'Principiante'
                      : exercise.difficulty === 'intermediate'
                        ? 'Intermedio'
                        : 'Avanzado'}
                  </span>
                </div>
              </div>

              {/* Grupo Muscular */}
              <div className="border-l-4 border-gold-primary pl-4">
                <p className="text-sm text-gray-500 mb-1">Grupo Muscular</p>
                <p className="text-lg font-bold text-gray-800">{metadata.label}</p>
              </div>
            </div>
          </section>

          {/* Botón cerrar al final */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-gold-primary to-gold-dark hover:shadow-lg text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

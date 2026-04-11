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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl w-full max-w-2xl lg:max-w-3xl h-[90vh] sm:h-[95vh] md:h-auto md:max-h-[85vh] lg:max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-4 flex flex-col">
        {/* Header - Fijo arriba */}
        <div className="bg-gradient-to-r from-gold-primary to-gold-light p-3 sm:p-4 md:p-6 lg:p-8 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1 line-clamp-2">{exercise.name}</h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-600 line-clamp-1">{metadata.label}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-900 hover:bg-white/30 rounded-full p-1.5 sm:p-2 md:p-3 lg:p-4 transition-colors text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenido scrolleable - Crece para llenar espacio disponible */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-4 md:p-8 lg:p-10 space-y-4 sm:space-y-6 md:space-y-8">
          {/* Descripción */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gold-dark mb-2 sm:mb-3">Descripción</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-700 leading-relaxed">{exercise.description}</p>
          </section>

          {/* Pasos de Ejecución */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gold-dark mb-3 sm:mb-4">Pasos de Ejecución</h2>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {exercise.execution.map((step, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-0.5 sm:pt-1 md:pt-1.5 text-xs sm:text-sm md:text-base lg:text-lg">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Información del Ejercicio */}
          <section className="bg-gray-50 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gold-dark mb-3 sm:mb-4 md:mb-6">Información</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {/* Repeticiones */}
              <div className="border-l-4 border-gold-primary pl-2 sm:pl-3 md:pl-4 lg:pl-5">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Repeticiones</p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">{exercise.reps || 'N/A'}</p>
              </div>

              {/* Series */}
              {exercise.sets && (
                <div className="border-l-4 border-gold-primary pl-2 sm:pl-3 md:pl-4 lg:pl-5">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Series</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">{exercise.sets}</p>
                </div>
              )}

              {/* Dificultad */}
              <div className="border-l-4 border-gold-primary pl-2 sm:pl-3 md:pl-4 lg:pl-5">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Dificultad</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full ${
                      difficultyColors[exercise.difficulty] || 'bg-gray-400'
                    }`}
                  ></div>
                  <span className="text-xs sm:text-sm md:text-base line-clamp-1 font-semibold text-gray-800 capitalize">
                    {exercise.difficulty === 'beginner'
                      ? 'Principiante'
                      : exercise.difficulty === 'intermediate'
                        ? 'Intermedio'
                        : 'Avanzado'}
                  </span>
                </div>
              </div>

              {/* Grupo Muscular */}
              <div className="border-l-4 border-gold-primary pl-2 sm:pl-3 md:pl-4 lg:pl-5">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Grupo</p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 line-clamp-1">{metadata.label}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer con Botón - Fijo abajo */}
        <div className="border-t border-gray-200 bg-white p-3 sm:p-4 md:p-6 lg:p-8 sticky bottom-0 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-gold-primary to-gold-dark hover:shadow-lg text-white font-bold py-2.5 sm:py-3 md:py-4 lg:py-4 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl md:rounded-2xl transition-all active:scale-95 text-sm md:text-base lg:text-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

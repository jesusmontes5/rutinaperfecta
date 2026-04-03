// components/RoutineDetailClient.tsx
'use client';

import Link from 'next/link';
import RoutineCard from '@/components/RoutineCard';
import { downloadRoutineAsPDF } from '@/lib/download-utils';
import type { PrebuiltRoutine, Routine } from '@/types';

interface RoutineDetailClientProps {
  routine: PrebuiltRoutine | Routine;
  allRoutines?: PrebuiltRoutine[];
}

export default function RoutineDetailClient({ routine, allRoutines }: RoutineDetailClientProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-900 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/rutinas" className="text-gray-900 hover:text-gray-700">
              Rutinas
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{routine.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exercises Breakdown */}
            {('exercises' in routine && routine.exercises) && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 animate-slide-up">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Desglose diario</h3>
                <div className="space-y-3">
                  {routine.exercises.map((dayDetail, dayIndex) => (
                    <div key={dayIndex} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-100">
                        <h4 className="font-600 text-gray-900 text-sm">{dayDetail.day}</h4>
                      </div>
                      <div className="p-4 space-y-2">
                        {dayDetail.exercises.map((exercise, exIndex) => (
                          <div key={exIndex} className="flex justify-between items-start gap-3 text-sm">
                            <div className="flex-1">
                              <div className="font-500 text-gray-900">{exercise.name}</div>
                              {exercise.rest && (
                                <div className="text-xs text-gray-500 mt-1">Descanso: {exercise.rest}</div>
                              )}
                            </div>
                            <div className="bg-white border border-gray-200 px-3 py-1 rounded font-600 text-gray-900 whitespace-nowrap">
                              {exercise.sets}×{exercise.reps}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Content - Limited Height */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 max-h-96 overflow-y-auto animate-fade-in">
              <div className="prose prose-sm sm:prose max-w-none space-y-2 text-gray-700">
                {('fullContent' in routine ? routine.fullContent : routine.content)
                  ?.split('\n\n')
                  .filter((paragraph) => paragraph.trim().length > 0)
                  .slice(0, 12)
                  .map((paragraph, i) => {
                    if (paragraph.startsWith('#')) {
                      const level = paragraph.match(/^#+/)?.[0].length || 1;
                      const text = paragraph.replace(/^#+\s*/, '');
                      const headingClass = {
                        1: 'text-2xl font-bold mt-2 mb-1',
                        2: 'text-xl font-bold mt-2 mb-1',
                        3: 'text-lg font-bold mt-1 mb-0.5',
                        4: 'text-base font-bold mt-1 mb-0.5',
                      }[level] || 'font-bold';

                      return (
                        <h2 key={i} className={`text-gray-900 ${headingClass}`}>
                          {text}
                        </h2>
                      );
                    }

                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter((l) => l.startsWith('- '));
                      return (
                        <ul key={i} className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {items.map((item, j) => (
                            <li key={j} className="leading-tight">
                              {item.replace(/^- /, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={i} className="leading-tight text-gray-700 text-sm">
                        {paragraph}
                      </p>
                    );
                  })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 animate-slide-up">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Te gusta esta rutina?
                </h3>
                <p className="text-gray-700 mb-6">
                  Descarga esta rutina o personalízala usando nuestro generador inteligente.
                </p>
              </div>

              {/* Botones de descarga */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <button
                  onClick={() => downloadRoutineAsPDF(routine as any)}
                  className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition transform hover:scale-105 flex items-center justify-center gap-2 flex-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  Descargar en PDF
                </button>
              </div>

              {/* Botón de personalización */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition transform hover:scale-105"
                >
                  Crear mi rutina personalizada →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Info Box - STICKY */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24 animate-slide-left" style={{animation: 'slideInRight 0.6s ease-out'}}>
              <h3 className="font-bold text-gray-900 text-lg mb-4">Información:</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Días</span>
                  <span className="font-semibold text-gray-900">{routine.days} días</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Nivel</span>
                  <span className="font-semibold text-gray-900 capitalize">{routine.level}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Objetivo</span>
                  <span className="font-semibold text-gray-900 capitalize">{routine.objective}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ubicación</span>
                  <span className="font-semibold text-gray-900 capitalize">Gimnasio</span>
                </div>
              </div>
            </div>

            {/* Similar Routines - Solo para PrebuiltRoutines */}
            {allRoutines && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 animate-slide-left" style={{animation: 'slideInRight 0.7s ease-out 0.1s both'}}>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Rutinas similares</h3>
                <ul className="space-y-3">
                  {allRoutines
                    .filter(
                      (r) =>
                        r.slug !== routine.slug &&
                        (r.objective === routine.objective || r.level === routine.level)
                    )
                    .slice(0, 3)
                    .map((r) => (
                      <li key={r.id}>
                        <Link
                          href={`/rutinas/${r.slug}`}
                          className="text-gray-900 hover:text-gray-700 hover:underline text-sm"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Tips - Dinámicos si están disponibles */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 animate-slide-left" style={{animation: 'slideInRight 0.7s ease-out 0.2s both'}}>
              <h3 className="font-bold text-green-900 text-lg mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-green-900">
                {('benefits' in routine && routine.benefits && routine.benefits.length > 0) ? (
                  routine.benefits.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))
                ) : (
                  <>
                    <li>• Mantén la forma correcta en cada ejercicio</li>
                    <li>• Progresa gradualmente aumentando peso</li>
                    <li>• Descansa 3-5 minutos entre sets pesados</li>
                    <li>• Come suficiente proteína</li>
                    <li>• Duerme 7-8 horas cada noche</li>
                  </>
                )}
              </ul>
            </div>

            {/* Ad Space */}
            <div className="ad-space">
              <p className="text-gray-500 text-sm">Espacio publicitario</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Routines Section */}
      {allRoutines && allRoutines.length > 0 && (
        <section className="py-8 bg-gray-50 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Otras rutinas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allRoutines
                .filter((r) => r.slug !== routine.slug)
                .map((r) => (
                  <RoutineCard key={r.id} routine={r} />
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

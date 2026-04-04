// components/RoutineDetailClient.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RoutineCard from '@/components/RoutineCard';
import { downloadRoutineAsPDF } from '@/lib/download-utils';
import type { PrebuiltRoutine, Routine } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface RoutineDetailClientProps {
  routine: PrebuiltRoutine | Routine;
  allRoutines?: PrebuiltRoutine[];
}

export default function RoutineDetailClient({ routine, allRoutines }: RoutineDetailClientProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ===== EXERCISES BREAKDOWN REVEAL =====
    const exercisesBox = contentRef.current?.querySelector('[data-exercises]');
    if (exercisesBox) {
      gsap.fromTo(
        exercisesBox,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
        }
      );
    }

    // ===== DETAILED CONTENT FADE =====
    const detailContent = contentRef.current?.querySelector('[data-detail-content]');
    if (detailContent) {
      gsap.fromTo(
        detailContent,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
        }
      );
    }

    // ===== CTA BOX ANIMATION =====
    const ctaBox = contentRef.current?.querySelector('[data-cta-box]');
    if (ctaBox) {
      gsap.fromTo(
        ctaBox,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
        }
      );
    }

    // ===== SIDEBAR BOXES STAGGER =====
    const sidebarBoxes = contentRef.current?.querySelectorAll('[data-sidebar-box]');
    if (sidebarBoxes) {
      gsap.fromTo(
        sidebarBoxes,
        {
          opacity: 0,
          x: 30,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.2,
        }
      );
    }

    // ===== OTHER ROUTINES CARDS ANIMATION =====
    const otherRoutinesCards = sectionRef.current?.querySelectorAll('[data-other-routine-card]');
    if (otherRoutinesCards) {
      gsap.fromTo(
        otherRoutinesCards,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Back Button Header */}
      <div className="bg-white border-b border-gold-light/30 py-3 sm:py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-color-text hover:text-gold-dark hover:bg-gold-light/10 px-3 py-2 rounded-xl transition-all font-500 duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Atrás</span>
          </button>
          <h1 className="text-lg sm:text-xl font-700 text-gold-dark truncate flex-1 ml-4">{routine.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exercises Breakdown */}
            {('exercises' in routine && routine.exercises) && (
              <div data-exercises className="bg-white border border-gold-light/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gold-dark mb-4">Desglose diario</h3>
                <div className="space-y-3">
                  {routine.exercises.map((dayDetail, dayIndex) => (
                    <div key={dayIndex} className="bg-color-bg-secondary rounded-lg border border-gold-light/30 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gold-light/20 bg-color-bg">
                        <h4 className="font-600 text-gold-dark text-sm">{dayDetail.day}</h4>
                      </div>
                      <div className="p-4 space-y-2">
                        {dayDetail.exercises.map((exercise, exIndex) => (
                          <div key={exIndex} className="flex justify-between items-start gap-3 text-sm">
                            <div className="flex-1">
                              <div className="font-500 text-color-text">{exercise.name}</div>
                              {exercise.rest && (
                                <div className="text-xs text-color-text-muted mt-1">Descanso: {exercise.rest}</div>
                              )}
                            </div>
                            <div className="bg-white border border-gold-light/30 px-3 py-1 rounded font-600 text-gold-dark whitespace-nowrap">
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
            <div data-detail-content className="bg-white border border-gold-light/30 rounded-2xl p-6 max-h-96 overflow-y-auto">
              <div className="space-y-2 text-color-text">
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
                        <h2 key={i} className={`text-gold-dark ${headingClass}`}>
                          {text}
                        </h2>
                      );
                    }

                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter((l) => l.startsWith('- '));
                      return (
                        <ul key={i} className="list-disc list-inside space-y-1 text-color-text text-sm">
                          {items.map((item, j) => (
                            <li key={j} className="leading-tight">
                              {item.replace(/^- /, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={i} className="leading-tight text-color-text text-sm">
                        {paragraph}
                      </p>
                    );
                  })}
              </div>
            </div>

            {/* Call to Action */}
            <div data-cta-box className="bg-color-bg-secondary border-2 border-gold-light/40 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gold-dark mb-4">
                  ¿Te gusta esta rutina?
                </h3>
                <p className="text-color-text mb-6">
                  Descarga esta rutina o personalízala usando nuestro generador inteligente.
                </p>
              </div>

              {/* Botones de descarga */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <button
                  onClick={() => downloadRoutineAsPDF(routine as any)}
                  className="px-6 py-3 bg-[#997a3c] text-white font-500 rounded-lg hover:shadow-md transition flex items-center justify-center gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  Descargar
                </button>
              </div>

              {/* Botón de personalización */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-[#997a3c] text-white font-500 rounded-lg hover:shadow-md transition"
                >
                  Personalizar →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Info Box - STICKY */}
            <div data-sidebar-box className="bg-white border border-gold-light/30 rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-gold-dark text-lg mb-4">Información:</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gold-light/20">
                  <span className="text-color-text-muted">Días</span>
                  <span className="font-semibold text-color-text">{routine.days} días</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gold-light/20">
                  <span className="text-color-text-muted">Nivel</span>
                  <span className="font-semibold text-color-text capitalize">{routine.level}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gold-light/20">
                  <span className="text-color-text-muted">Objetivo</span>
                  <span className="font-semibold text-color-text capitalize">{routine.objective}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-color-text-muted">Ubicación</span>
                  <span className="font-semibold text-color-text capitalize">Gimnasio</span>
                </div>
              </div>
            </div>

            {/* Similar Routines - Solo para PrebuiltRoutines */}
            {allRoutines && (
              <div data-sidebar-box className="bg-white border border-gold-light/30 rounded-2xl p-6">
                <h3 className="font-bold text-gold-dark text-lg mb-4">Rutinas similares</h3>
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
                          className="text-color-text hover:text-gold-dark hover:underline text-sm"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Tips - Dinámicos si están disponibles */}
            <div data-sidebar-box className="bg-gold-light/10 border border-gold-light/40 rounded-2xl p-6">
              <h3 className="font-bold text-gold-dark text-lg mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-color-text">
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
          </div>
        </div>
      </div>
      </div>

      {/* Other Routines Section */}
      {allRoutines && allRoutines.length > 0 && (
        <section ref={sectionRef} className="py-8 bg-color-bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gold-dark mb-6 text-center">Otras rutinas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allRoutines
                .filter((r) => r.slug !== routine.slug)
                .map((r) => (
                  <div key={r.id} data-other-routine-card>
                    <RoutineCard routine={r} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

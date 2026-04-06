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
      {/* Main Content */}
      <div ref={contentRef} className="min-h-screen bg-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Routine Title */}
        <h1 className="text-4xl sm:text-5xl font-display font-800 mb-8 bg-gradient-to-r from-gold-dark to-gold-primary bg-clip-text text-transparent">
          {routine.title}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exercises Breakdown */}
            {('exercises' in routine && routine.exercises) && (
              <div data-exercises className="bg-white border border-gold-light/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold-light to-gold-very-light rounded-lg flex items-center justify-center">
                    <span className="text-xl">💪</span>
                  </div>
                  <h3 className="text-2xl font-display font-800 text-gold-dark">Desglose diario</h3>
                </div>
                <div className="space-y-4">
                  {routine.exercises.map((dayDetail, dayIndex) => (
                    <div key={dayIndex} className="bg-gradient-to-r from-gold-very-light/50 to-white border border-gold-light/40 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="px-5 py-4 border-b border-gold-light/30 bg-gradient-to-r from-gold-light/20 to-transparent">
                        <h4 className="font-700 text-gold-dark text-base flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-gold-dark rounded-full"></span>
                          {dayDetail.day}
                        </h4>
                      </div>
                      <div className="p-5 space-y-3">
                        {dayDetail.exercises.map((exercise, exIndex) => (
                          <div key={exIndex} className="flex justify-between items-start gap-4 pb-3 border-b border-gold-light/20 last:border-b-0 last:pb-0">
                            <div className="flex-1">
                              <div className="font-600 text-color-text">{exercise.name}</div>
                              {exercise.rest && (
                                <div className="text-xs text-color-text-muted mt-1">⏱️ Descanso: {exercise.rest}</div>
                              )}
                            </div>
                            <div className="bg-gradient-to-r from-gold-light/30 to-gold-very-light border border-gold-light/50 px-4 py-2 rounded-lg font-700 text-gold-dark whitespace-nowrap">
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

            {/* Detailed Content - Enhanced Styling */}
            <div data-detail-content className="bg-white border border-gold-light/30 rounded-2xl p-8 max-h-96 overflow-y-auto hover:shadow-lg transition-shadow">
              <style>{`
                .routine-content h2 { color: #997a3c; font-weight: 800; margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.5rem; font-family: 'Playfair Display', serif; letter-spacing: -0.5px; }
                .routine-content h3 { color: #c9a563; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1.25rem; font-family: 'Playfair Display', serif; }
                .routine-content h4 { color: #1d1d1f; font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem; font-family: 'Plus Jakarta Sans', sans-serif; }
                .routine-content p { line-height: 1.7; margin-bottom: 1rem; color: #1d1d1f; }
                .routine-content ul { margin-left: 1.5rem; margin-bottom: 1rem; }
                .routine-content li { margin-bottom: 0.5rem; line-height: 1.6; }
                .routine-content li::marker { color: #c9a563; font-weight: bold; }
                .routine-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
                .routine-content th { background: linear-gradient(135deg, #f9f6f0 0%, #efefef 100%); color: #997a3c; font-weight: 700; padding: 0.75rem; border: 1px solid #e8dcc8; text-align: left; }
                .routine-content td { padding: 0.75rem; border: 1px solid #e8dcc8; color: #1d1d1f; }
                .routine-content td strong { color: #997a3c; }
                .routine-content tr:hover { background-color: #f9f6f0; }
                .routine-content strong { color: #997a3c; font-weight: 700; }
                .routine-content em { color: #c9a563; font-style: italic; }
                .routine-content code { background: #f5f5f7; padding: 0.25rem 0.5rem; border-radius: 4px; color: #ff3b30; font-size: 0.9em; }
              `}</style>
              <div className="routine-content space-y-3 text-color-text">
                {('fullContent' in routine ? routine.fullContent : routine.content)
                  ?.split('\n\n')
                  .filter((paragraph) => paragraph.trim().length > 0)
                  .slice(0, 12)
                  .map((paragraph, i) => {
                    if (paragraph.startsWith('|')) {
                      // Table rendering
                      const lines = paragraph.split('\n').filter(l => l.trim());
                      const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
                      const rows = lines.slice(2).map(line => 
                        line.split('|').map(cell => cell.trim()).filter((_, idx) => idx < headers.length)
                      );
                      return (
                        <table key={i}>
                          <thead>
                            <tr>
                              {headers.map((h, j) => <th key={j}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, rowIdx) => (
                              <tr key={rowIdx}>
                                {row.map((cell, cellIdx) => <td key={cellIdx}>{cell}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    }

                    if (paragraph.startsWith('#')) {
                      const level = paragraph.match(/^#+/)?.[0].length || 1;
                      const text = paragraph.replace(/^#+\s*/, '');
                      const headingClass = {
                        1: 'text-2xl font-display font-800',
                        2: 'text-xl font-display font-800',
                        3: 'text-lg font-display font-800',
                        4: 'text-base font-display font-800',
                      }[level] || 'font-bold';

                      return (
                        <h2 key={i} className={`${headingClass} bg-gradient-to-r from-gold-dark to-gold-primary bg-clip-text text-transparent`}>
                          {text}
                        </h2>
                      );
                    }

                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter((l) => l.trim().startsWith('- '));
                      return (
                        <ul key={i} className="list-disc space-y-1.5 text-color-text">
                          {items.map((item, j) => (
                            <li key={j} className="leading-relaxed ml-5">
                              {item.replace(/^- /, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (paragraph.includes('**')) {
                      // Render bold text
                      return (
                        <p key={i} className="leading-relaxed text-color-text">
                          {paragraph.split(/(\*\*.*?\*\*)/).map((part, j) => 
                            part.startsWith('**') 
                              ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
                              : part
                          )}
                        </p>
                      );
                    }

                    return (
                      <p key={i} className="leading-relaxed text-color-text">
                        {paragraph}
                      </p>
                    );
                  })}
              </div>
            </div>

            {/* Call to Action - Enhanced Design */}
            <div data-cta-box className="bg-gradient-to-br from-gold-very-light via-white to-color-bg-secondary border-2 border-gold-light/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-8">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-gold-light/40 to-gold-very-light/40 rounded-full backdrop-blur">
                  <span className="text-sm font-700 text-gold-dark">🎯 Tu rutina ideal</span>
                </div>
                <h3 className="text-4xl font-display font-800 text-gold-dark mb-4 bg-gradient-to-r from-gold-dark to-gold-primary bg-clip-text text-transparent">
                  ¿Te gusta esta rutina?
                </h3>
                <p className="text-color-text-muted text-base leading-relaxed max-w-xl mx-auto">
                  Descarga esta rutina completa en PDF o personalízala usando nuestro generador inteligente de entrenamientos.
                </p>
              </div>

              {/* Botones de descarga */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <button
                  onClick={() => downloadRoutineAsPDF(routine as any)}
                  className="btn-primary px-8 py-4 font-700 rounded-lg flex items-center justify-center gap-2 flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  Descargar PDF
                </button>
              </div>

              {/* Botón de personalización */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block btn-primary px-8 py-4 font-700 rounded-lg shadow-lg hover:shadow-xl transition-all text-white"
                >
                  Personalizar mi rutina →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Info Box - FIXED POSITION */}
            <div data-sidebar-box className="bg-gradient-to-b from-white to-gold-very-light/40 border border-gold-light/40 rounded-2xl p-7 sticky top-24 lg:fixed lg:top-32 lg:right-8 lg:w-80 lg:max-h-screen lg:overflow-y-auto shadow-lg hover:shadow-xl transition-shadow h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-dark to-gold-light rounded-lg flex items-center justify-center text-white font-display font-800">
                  ℹ
                </div>
                <h3 className="font-display font-800 text-gold-dark text-xl">Información</h3>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-gold-light/30 hover:bg-gold-light/10 px-2 py-1 rounded transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span className="text-color-text-muted font-600">Días</span>
                  </div>
                  <span className="font-700 text-gold-dark bg-gradient-to-r from-gold-light/30 to-gold-very-light px-3 py-1 rounded-lg">{routine.days}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gold-light/30 hover:bg-gold-light/10 px-2 py-1 rounded transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    <span className="text-color-text-muted font-600">Nivel</span>
                  </div>
                  <span className="font-700 text-gold-dark bg-gradient-to-r from-gold-light/30 to-gold-very-light px-3 py-1 rounded-lg capitalize">{routine.level}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gold-light/30 hover:bg-gold-light/10 px-2 py-1 rounded transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <span className="text-color-text-muted font-600">Objetivo</span>
                  </div>
                  <span className="font-700 text-gold-dark bg-gradient-to-r from-gold-light/30 to-gold-very-light px-3 py-1 rounded-lg capitalize">{routine.objective}</span>
                </div>
                <div className="flex items-center justify-between hover:bg-gold-light/10 px-2 py-1 rounded transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span className="text-color-text-muted font-600">Ubicación</span>
                  </div>
                  <span className="font-700 text-gold-dark bg-gradient-to-r from-gold-light/30 to-gold-very-light px-3 py-1 rounded-lg">Gimnasio</span>
                </div>
              </div>
            </div>

            {/* Similar Routines - Solo para PrebuiltRoutines */}
            {allRoutines && (
              <div data-sidebar-box className="bg-white border border-gold-light/30 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-display font-800 text-gold-dark text-lg mb-4">Rutinas similares</h3>
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
                          className="text-color-text hover:text-gold-primary hover:underline text-sm font-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Tips - Dinámicos si están disponibles */}
            <div data-sidebar-box className="bg-gradient-to-b from-gold-light/10 to-gold-very-light/20 border border-gold-light/40 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-display font-800 text-gold-dark text-lg mb-3">💡 Tips</h3>
              <ul className="space-y-2.5 text-sm text-color-text">
                {('benefits' in routine && routine.benefits && routine.benefits.length > 0) ? (
                  routine.benefits.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gold-primary font-bold mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold mt-0.5">•</span><span>Mantén la forma correcta en cada ejercicio</span></li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold mt-0.5">•</span><span>Progresa gradualmente aumentando peso</span></li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold mt-0.5">•</span><span>Descansa 3-5 minutos entre sets pesados</span></li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold mt-0.5">•</span><span>Come suficiente proteína</span></li>
                    <li className="flex gap-2"><span className="text-gold-primary font-bold mt-0.5">•</span><span>Duerme 7-8 horas cada noche</span></li>
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
        <section ref={sectionRef} className="py-12 bg-gradient-to-b from-color-bg-secondary to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-800 text-gold-dark mb-8 text-center bg-gradient-to-r from-gold-dark to-gold-primary bg-clip-text text-transparent">
              Otras rutinas destacadas
            </h2>
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

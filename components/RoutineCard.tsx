// components/RoutineCard.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Routine, PrebuiltRoutine } from '@/types';

interface RoutineCardProps {
  routine: Routine | PrebuiltRoutine;
  expanded?: boolean;
}

export default function RoutineCard({ routine, expanded = false }: RoutineCardProps) {
  const [showDetails, setShowDetails] = useState(expanded);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const isPrebuilt = 'fullContent' in routine;

  useEffect(() => {
    // ===== CARD HOVER ANIMATION =====
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    }

    // ===== BADGES STAGGER ANIMATION =====
    if (badgesRef.current) {
      const badges = badgesRef.current.querySelectorAll('.badge-item');
      gsap.fromTo(
        badges,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'back.out(1.5)',
        }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-br from-white via-white to-gold-very-light/40 border border-gold-light/40 rounded-2xl overflow-hidden hover:border-gold-primary/70 hover:shadow-2xl hover:shadow-gold-primary/20 transition-all duration-300 flex flex-col h-full group backdrop-blur-sm"
    >
      {/* Header - Enhanced with Display Font */}
      <div className="p-5 sm:p-6 md:p-7 border-b border-gold-light/30 group-hover:bg-gold-light/10 transition overflow-hidden bg-gradient-to-r from-white to-gold-very-light/50">
        <h3 className="text-base sm:text-lg md:text-xl font-display font-800 mb-2 text-gold-dark line-clamp-2 leading-tight">
          {routine.title}
        </h3>
        <p className="text-color-text-muted text-xs sm:text-sm md:text-base leading-snug line-clamp-2 font-500">
          {routine.description}
        </p>
      </div>

      {/* Info Grid - Improved with Animations */}
      <div
        ref={badgesRef}
        className="p-4 sm:p-5 md:p-6 border-b border-gold-light/30 bg-gradient-to-r from-gold-very-light/30 to-white"
      >
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-3">
          <div className="badge-item p-3 sm:p-4 md:p-4 bg-gradient-to-br from-gold-light/30 to-gold-very-light/50 border-2 border-gold-light/60 rounded-2xl text-center hover:border-gold-primary/80 hover:bg-gradient-to-br hover:from-gold-light/50 hover:to-gold-very-light transition-all overflow-hidden group/badge shadow-sm hover:shadow-md hover:shadow-gold-primary/20">
            <div className="text-lg sm:text-2xl md:text-2xl font-900 text-gold-dark leading-none group-hover/badge:scale-125 transition-transform">
              {routine.days}
            </div>
            <div className="text-xs sm:text-xs md:text-xs text-gold-dark font-800 uppercase tracking-wider mt-1.5">Días</div>
          </div>

          <div className="badge-item p-3 sm:p-4 md:p-4 bg-gradient-to-br from-blue-100/50 to-blue-50/50 border-2 border-accent-blue/50 rounded-2xl text-center hover:border-accent-blue/80 hover:bg-gradient-to-br hover:from-blue-100/70 hover:to-blue-50/70 transition-all overflow-hidden group/badge shadow-sm hover:shadow-md hover:shadow-accent-blue/20">
            <div className="text-xs sm:text-sm md:text-sm font-800 text-accent-blue capitalize line-clamp-1 leading-tight group-hover/badge:scale-110 transition-transform">
              {routine.level}
            </div>
            <div className="text-xs sm:text-xs md:text-xs text-accent-blue font-800 uppercase tracking-wider mt-1.5">Nivel</div>
          </div>

          <div className="badge-item p-3 sm:p-4 md:p-4 bg-gradient-to-br from-orange-100/50 to-orange-50/50 border-2 border-accent-warm/50 rounded-2xl text-center hover:border-accent-warm/80 hover:bg-gradient-to-br hover:from-orange-100/70 hover:to-orange-50/70 transition-all overflow-hidden group/badge shadow-sm hover:shadow-md hover:shadow-accent-warm/20">
            <div className="text-xs sm:text-sm md:text-sm font-800 text-accent-warm capitalize line-clamp-1 leading-tight group-hover/badge:scale-110 transition-transform">
              {routine.objective}
            </div>
            <div className="text-xs sm:text-xs md:text-xs text-accent-warm font-800 uppercase tracking-wider mt-1.5">
              Objetivo
            </div>
          </div>

          {!isPrebuilt && 'location' in routine && (
            <div className="badge-item hidden md:flex md:flex-col md:p-3 md:p-4 bg-gradient-to-br from-green-100/50 to-green-50/50 border-2 border-accent-green/50 rounded-2xl md:text-center hover:border-accent-green/80 hover:bg-gradient-to-br hover:from-green-100/70 hover:to-green-50/70 transition-all md:overflow-hidden group/badge md:shadow-sm hover:shadow-md hover:shadow-accent-green/20">
              <div className="text-xs md:text-sm font-800 text-accent-green capitalize line-clamp-1 leading-tight group-hover/badge:scale-110 transition-transform">
                {routine.location}
              </div>
              <div className="text-xs font-800 text-accent-green uppercase tracking-wider mt-1.5">Lugar</div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area - Scrollable with min-h-0 */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Benefits Section */}
        {showDetails && 'benefits' in routine && routine.benefits.length > 0 && (
          <div className="p-6 bg-gradient-to-b from-white to-gold-very-light/20 border-b border-gold-light/30">
            <h4 className="font-700 text-gold-dark mb-4 text-sm flex items-center gap-2">
              <span className="text-lg">✨</span>
              Beneficios principales
            </h4>
            <ul className="space-y-2.5 text-xs">
              {routine.benefits.map((benefit, i) => (
                <li key={i} className="text-color-text flex items-start gap-3">
                  <span className="text-accent-green font-800 shrink-0 text-lg">✓</span>
                  <span className="font-500 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exercises Section */}
        {showDetails && !isPrebuilt && 'days_detail' in routine && (
          <div className="p-6 space-y-3 bg-white border-b border-gold-light/30">
            <h4 className="font-700 text-gold-dark text-sm flex items-center gap-2">
              <span className="text-lg">📋</span>
              Desglose diario
            </h4>
            {routine.days_detail?.map((dayDetail, dayIndex) => (
              <div key={dayIndex} className="bg-gradient-to-r from-gold-very-light/40 to-white rounded-xl border border-gold-light/50 overflow-hidden text-xs hover:shadow-md transition-shadow">
                <div className="px-4 py-3 bg-gradient-to-r from-gold-light/30 to-transparent border-b border-gold-light/40">
                  <h5 className="font-700 text-gold-dark flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-gold-dark rounded-full"></span>
                    {dayDetail.day}
                  </h5>
                </div>
                <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                  {dayDetail.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex justify-between items-start gap-2 pb-2 border-b border-gold-light/20 last:border-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <span className="font-600 text-color-text block truncate">{exercise.name}</span>
                        {exercise.rest && <span className="text-xs text-color-text-muted block mt-0.5">⏱️ {exercise.rest}</span>}
                      </div>
                      <div className="bg-gradient-to-r from-gold-light/30 to-gold-very-light px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap border border-gold-light/40">
                        <div className="font-700 text-gold-dark">{exercise.sets}×{exercise.reps}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exercises Section - PREBUILT ROUTINES */}
        {showDetails && isPrebuilt && 'exercises' in routine && (
          <div className="p-6 space-y-3 bg-white border-b border-gold-light/30">
            <h4 className="font-700 text-gold-dark text-sm flex items-center gap-2">
              <span className="text-lg">📋</span>
              Desglose diario
            </h4>
            {routine.exercises?.map((dayDetail, dayIndex) => (
              <div key={dayIndex} className="bg-gradient-to-r from-gold-very-light/40 to-white rounded-xl border border-gold-light/50 overflow-hidden text-xs hover:shadow-md transition-shadow">
                <div className="px-4 py-3 bg-gradient-to-r from-gold-light/30 to-transparent border-b border-gold-light/40">
                  <h5 className="font-700 text-gold-dark flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-gold-dark rounded-full"></span>
                    {dayDetail.day}
                  </h5>
                </div>
                <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                  {dayDetail.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex justify-between items-start gap-2 pb-2 border-b border-gold-light/20 last:border-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <span className="font-600 text-color-text block truncate">{exercise.name}</span>
                        {exercise.rest && <span className="text-xs text-color-text-muted block mt-0.5">⏱️ {exercise.rest}</span>}
                      </div>
                      <div className="bg-gradient-to-r from-gold-light/30 to-gold-very-light px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap border border-gold-light/40">
                        <div className="font-700 text-gold-dark">{exercise.sets}×{exercise.reps}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Preview */}
        {showDetails && isPrebuilt && 'fullContent' in routine && (
          <div className="p-6 bg-color-bg space-y-2 text-xs text-color-text-muted leading-relaxed border-b border-gold-light/20 max-h-64 overflow-y-auto">
            {routine.fullContent
              .split('\n')
              .filter((line) => line.trim().length > 0)
              .slice(0, 15)
              .map((paragraph, i) => (
                <p key={i} className="text-color-text-muted">
                  {paragraph}
                </p>
              ))}
          </div>
        )}
      </div>

      {/* Actions - Enhanced with Better Design */}
      <div className="p-4 bg-gradient-to-r from-color-bg-secondary to-white border-t border-color-border-light flex flex-col sm:flex-row gap-2 mt-auto shrink-0 relative z-10">
        {isPrebuilt && 'slug' in routine && (
          <Link
            href={`/rutinas/${routine.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-lg hover:shadow-lg hover:shadow-gold-600/30 transition-all font-600 text-sm text-center font-display hover:scale-105 active:scale-95 duration-200"
          >
            Ver detalle
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        )}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-600 text-sm border-2 font-display ${
            showDetails
              ? 'bg-gold-50 text-gold-700 border-gold-600 hover:bg-gold-100'
              : 'bg-white text-gold-700 border-gold-400 hover:border-gold-600 hover:bg-gold-50'
          }`}
        >
          {showDetails ? '- Contraer' : '+ Expandir'}
        </button>
      </div>
    </div>
  );
}

// components/RoutineCard.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Routine, PrebuiltRoutine } from '@/types';

interface RoutineCardProps {
  routine: Routine | PrebuiltRoutine;
  expanded?: boolean;
}

export default function RoutineCard({ routine, expanded = false }: RoutineCardProps) {
  const [showDetails, setShowDetails] = useState(expanded);

  const isPrebuilt = 'fullContent' in routine;

  return (
    <div className="bg-white border border-gold-light/30 rounded-2xl overflow-hidden hover:border-gold-primary/60 hover:shadow-lg hover:shadow-gold-primary/10 transition-all duration-300 flex flex-col h-full group">
      {/* Header - Enhanced */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-gold-light/20 group-hover:bg-gold-light/5 transition overflow-hidden">
        <h3 className="text-base sm:text-lg md:text-xl font-700 mb-2 text-gold-dark line-clamp-2 leading-tight">{routine.title}</h3>
        <p className="text-color-text-muted text-xs sm:text-sm md:text-base leading-snug line-clamp-2">{routine.description}</p>
      </div>

      {/* Info Grid - Improved Responsivity */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-gold-light/20 bg-color-bg-secondary">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2 md:gap-3">
          <div className="p-2 sm:p-3 md:p-3 bg-gold-light/15 border border-gold-light/40 rounded-2xl sm:rounded-2xl text-center hover:border-gold-primary/50 hover:bg-gold-light/25 transition-all overflow-hidden">
            <div className="text-lg sm:text-xl md:text-2xl font-800 text-gold-dark leading-none">{routine.days}</div>
            <div className="text-xs sm:text-xs md:text-xs text-gold-primary font-700 uppercase tracking-wider mt-1">Días</div>
          </div>
          <div className="p-2 sm:p-3 md:p-3 bg-accent-blue/10 border border-accent-blue/30 rounded-2xl sm:rounded-2xl text-center hover:border-accent-blue/60 hover:bg-accent-blue/15 transition-all overflow-hidden">
            <div className="text-xs sm:text-sm md:text-sm font-800 text-color-text capitalize line-clamp-1 leading-tight">{routine.level}</div>
            <div className="text-xs sm:text-xs md:text-xs text-accent-blue font-700 uppercase tracking-wider mt-1">Nivel</div>
          </div>
          <div className="p-2 sm:p-3 md:p-3 bg-accent-warm/10 border border-accent-warm/30 rounded-2xl sm:rounded-2xl text-center hover:border-accent-warm/60 hover:bg-accent-warm/15 transition-all overflow-hidden">
            <div className="text-xs sm:text-sm md:text-sm font-800 text-color-text capitalize line-clamp-1 leading-tight">{routine.objective}</div>
            <div className="text-xs sm:text-xs md:text-xs text-accent-warm font-700 uppercase tracking-wider mt-1">Objetivo</div>
          </div>
          {!isPrebuilt && 'location' in routine && (
            <div className="hidden md:block p-2 sm:p-3 md:p-3 bg-accent-green/10 border border-accent-green/30 rounded-2xl sm:rounded-2xl text-center hover:border-accent-green/60 hover:bg-accent-green/15 transition-all overflow-hidden">
              <div className="text-xs sm:text-sm md:text-sm font-800 text-color-text capitalize line-clamp-1 leading-tight">{routine.location}</div>
              <div className="text-xs sm:text-xs md:text-xs text-accent-green font-700 uppercase tracking-wider mt-1">Lugar</div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area - Scrollable with min-h-0 */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Benefits Section */}
        {showDetails && 'benefits' in routine && routine.benefits.length > 0 && (
          <div className="p-6 bg-color-bg border-b border-gold-light/20">
            <h4 className="font-600 text-gold-dark mb-4 text-sm">Beneficios principales</h4>
            <ul className="space-y-2 text-xs">
              {routine.benefits.map((benefit, i) => (
                <li key={i} className="text-color-text-muted flex items-start gap-2">
                  <span className="text-accent-green font-600 shrink-0">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exercises Section */}
        {showDetails && !isPrebuilt && 'days_detail' in routine && (
          <div className="p-6 space-y-3 bg-color-bg border-b border-gold-light/20">
            <h4 className="font-600 text-gold-dark text-sm">Desglose diario</h4>
            {routine.days_detail?.map((dayDetail, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-lg border border-gold-light/30 overflow-hidden text-xs">
                <div className="px-3 py-2 bg-color-bg-secondary border-b border-gold-light/20">
                  <h5 className="font-600 text-gold-primary">{dayDetail.day}</h5>
                </div>
                <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                  {dayDetail.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-500 text-color-text block truncate">{exercise.name}</span>
                        {exercise.rest && <span className="text-xs text-color-text-muted block mt-0.5">Descanso: {exercise.rest}</span>}
                      </div>
                      <div className="text-right bg-color-bg-secondary px-2 py-1 rounded shrink-0 whitespace-nowrap border border-gold-light/20">
                        <div className="font-600 text-gold-primary">{exercise.sets}×{exercise.reps}</div>
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
          <div className="p-6 space-y-3 bg-color-bg border-b border-gold-light/20">
            <h4 className="font-600 text-gold-dark text-sm">Desglose diario</h4>
            {routine.exercises?.map((dayDetail, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-lg border border-gold-light/30 overflow-hidden text-xs">
                <div className="px-3 py-2 bg-color-bg-secondary border-b border-gold-light/20">
                  <h5 className="font-600 text-gold-primary">{dayDetail.day}</h5>
                </div>
                <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                  {dayDetail.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-500 text-color-text block truncate">{exercise.name}</span>
                        {exercise.rest && <span className="text-xs text-color-text-muted block mt-0.5">Descanso: {exercise.rest}</span>}
                      </div>
                      <div className="text-right bg-color-bg-secondary px-2 py-1 rounded shrink-0 whitespace-nowrap border border-gold-light/20">
                        <div className="font-600 text-gold-primary">{exercise.sets}×{exercise.reps}</div>
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

      {/* Actions */}
      <div className="p-4 bg-color-bg-secondary border-t border-color-border-light flex flex-col sm:flex-row gap-2 mt-auto shrink-0 relative z-10">
        {isPrebuilt && 'slug' in routine && (
          <Link
            href={`/rutinas/${routine.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#997a3c] text-white rounded-lg hover:shadow-md transition-all font-500 text-sm text-center"
          >
            Ver
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        )}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-500 text-sm border ${
            showDetails
              ? 'bg-[#997a3c] text-white border-[#997a3c]'
              : 'bg-[#997a3c] text-white border-[#997a3c] hover:shadow-md'
          }`}
        >
          {showDetails ? 'Menos' : 'Más'}
        </button>
      </div>
    </div>
  );
}

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
    <div className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Header - Enhanced */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200/50 group-hover:bg-gray-50/50 transition overflow-hidden">
        <h3 className="text-base sm:text-lg md:text-xl font-700 mb-2 text-gray-900 line-clamp-2 leading-tight">{routine.title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-snug line-clamp-2">{routine.description}</p>
      </div>

      {/* Info Grid - Improved Responsivity */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200/50 bg-white/50">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2 md:gap-3">
          <div className="p-2 sm:p-3 md:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/70 rounded-lg sm:rounded-xl text-center hover:from-gray-100 hover:to-gray-100/50 transition-all overflow-hidden">
            <div className="text-lg sm:text-xl md:text-2xl font-800 text-gray-900 leading-none">{routine.days}</div>
            <div className="text-xs sm:text-xs md:text-xs text-gray-600 font-700 uppercase tracking-wider mt-1">Días</div>
          </div>
          <div className="p-2 sm:p-3 md:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/70 rounded-lg sm:rounded-xl text-center hover:from-gray-100 hover:to-gray-100/50 transition-all overflow-hidden">
            <div className="text-xs sm:text-sm md:text-sm font-800 text-gray-900 capitalize line-clamp-1 leading-tight">{routine.level}</div>
            <div className="text-xs sm:text-xs md:text-xs text-gray-600 font-700 uppercase tracking-wider mt-1">Nivel</div>
          </div>
          <div className="p-2 sm:p-3 md:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/70 rounded-lg sm:rounded-xl text-center hover:from-gray-100 hover:to-gray-100/50 transition-all overflow-hidden">
            <div className="text-xs sm:text-sm md:text-sm font-800 text-gray-900 capitalize line-clamp-1 leading-tight">{routine.objective}</div>
            <div className="text-xs sm:text-xs md:text-xs text-gray-600 font-700 uppercase tracking-wider mt-1">Objetivo</div>
          </div>
          {!isPrebuilt && 'location' in routine && (
            <div className="hidden md:block p-2 sm:p-3 md:p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/70 rounded-lg sm:rounded-xl text-center hover:from-gray-100 hover:to-gray-100/50 transition-all overflow-hidden">
              <div className="text-xs sm:text-sm md:text-sm font-800 text-gray-900 capitalize line-clamp-1 leading-tight">{routine.location}</div>
              <div className="text-xs sm:text-xs md:text-xs text-gray-600 font-700 uppercase tracking-wider mt-1">Lugar</div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Benefits Section */}
        {showDetails && 'benefits' in routine && routine.benefits.length > 0 && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h4 className="font-600 text-gray-900 mb-4 text-sm">Beneficios principales</h4>
            <ul className="space-y-2 text-xs">
              {routine.benefits.map((benefit, i) => (
                <li key={i} className="text-gray-700 flex items-start gap-2">
                  <span className="text-gray-400 font-600 shrink-0">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exercises Section */}
        {showDetails && !isPrebuilt && 'days_detail' in routine && (
          <div className="p-6 space-y-3 bg-gray-50 border-b border-gray-200">
            <h4 className="font-600 text-gray-900 text-sm">Desglose diario</h4>
            {routine.days_detail?.map((dayDetail, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden text-xs">
                <div className="px-3 py-2 bg-gray-100 border-b border-gray-200">
                  <h5 className="font-600 text-gray-900">{dayDetail.day}</h5>
                </div>
                <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                  {dayDetail.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-500 text-gray-900 block truncate">{exercise.name}</span>
                        {exercise.rest && <span className="text-xs text-gray-500 block mt-0.5">Descanso: {exercise.rest}</span>}
                      </div>
                      <div className="text-right bg-gray-100 px-2 py-1 rounded shrink-0 whitespace-nowrap">
                        <div className="font-600 text-gray-900">{exercise.sets}×{exercise.reps}</div>
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
          <div className="p-6 space-y-3 bg-gray-50 border-b border-gray-200">
            <h4 className="font-600 text-gray-900 text-sm">Desglose diario</h4>
            {routine.exercises?.map((dayDetail, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden text-xs">
                <div className="px-3 py-2 bg-gray-100 border-b border-gray-200">
                  <h5 className="font-600 text-gray-900">{dayDetail.day}</h5>
                </div>
                <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                  {dayDetail.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-500 text-gray-900 block truncate">{exercise.name}</span>
                        {exercise.rest && <span className="text-xs text-gray-500 block mt-0.5">Descanso: {exercise.rest}</span>}
                      </div>
                      <div className="text-right bg-gray-100 px-2 py-1 rounded shrink-0 whitespace-nowrap">
                        <div className="font-600 text-gray-900">{exercise.sets}×{exercise.reps}</div>
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
          <div className="p-6 bg-gray-50 space-y-2 text-xs text-gray-700 leading-relaxed border-b border-gray-200 max-h-64 overflow-y-auto">
            {routine.fullContent
              .split('\n')
              .filter((line) => line.trim().length > 0)
              .slice(0, 15)
              .map((paragraph, i) => (
                <p key={i} className="text-gray-700">
                  {paragraph}
                </p>
              ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row gap-2 mt-auto">
        {isPrebuilt && 'slug' in routine && (
          <Link
            href={`/rutinas/${routine.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-500 text-xs text-center"
          >
            Ver completa
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-500 text-xs ${
            showDetails
              ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {showDetails ? 'Menos' : 'Más'}
        </button>
      </div>
    </div>
  );
}

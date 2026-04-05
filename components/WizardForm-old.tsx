// components/WizardForm.tsx
'use client';

import { useState } from 'react';
import { downloadRoutineAsPDF } from '@/lib/download-utils';
import type { WizardData, Routine } from '@/types';
import RoutineCard from './RoutineCard';

export default function WizardForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<Routine | null>(null);

  const [data, setData] = useState<WizardData>({
    objective: null,
    level: null,
    days: null,
    location: null,
    experience: null,
    injuries: [],
    sessionDuration: null,
    exercisePreferences: [],
    cardio: null,
    equipment: [],
  });

  const totalSteps = 8;

  const getActualTotalSteps = () => {
    // Si es casa, tiene un paso extra (equipamiento)
    return data.location === 'casa' ? 9 : 8;
  };

  const handleNext = () => {
    const actualTotal = getActualTotalSteps();
    if (step < actualTotal) {
      setStep(step + 1);
    } else {
      generateRoutineHandler();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generateRoutineHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar la rutina');
      }

      const routine: Routine = await response.json();
      setGeneratedRoutine(routine);
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Error al generar la rutina'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setData({
      objective: null,
      level: null,
      days: null,
      location: null,
      experience: null,
      injuries: [],
      sessionDuration: null,
      exercisePreferences: [],
      cardio: null,
      equipment: [],
    });
    setGeneratedRoutine(null);
  };

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center space-y-6 p-8">
          <div className="inline-block">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin border-t-black"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-700 text-gray-900">Generando tu rutina...</h2>
            <p className="text-gray-600 text-base">Estamos creando la rutina perfecta para ti</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar rutina generada
  if (generatedRoutine) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center space-y-4 pb-8">
          <h2 className="text-5xl font-700 text-gray-900">Tu rutina está lista</h2>
          <p className="text-lg text-gray-600">Está completamente personalizada y optimizada para ti</p>
        </div>

        <RoutineCard routine={generatedRoutine} expanded={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <button
            onClick={() => downloadRoutineAsPDF(generatedRoutine)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-600 rounded-lg hover:bg-gray-800 transition-all text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar PDF
          </button>

          <button
            onClick={resetWizard}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 font-600 rounded-lg hover:bg-gray-200 transition-all text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Otra rutina
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-600 text-gray-900">Paso {step} de {getActualTotalSteps()}</h3>
          </div>
          <div className="text-2xl font-700 text-gray-900">
            {Math.round((step / getActualTotalSteps()) * 100)}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-black h-full transition-all duration-500"
            style={{ width: `${(step / getActualTotalSteps()) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Objective */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <h2 className="text-2xl font-600 text-gray-900 mb-2">¿Cuál es tu objetivo principal?</h2>
            <p className="text-gray-600 text-base">Adaptaremos intensidad, volumen y ejercicios</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: 'masa', label: 'Ganar Masa' },
              { value: 'grasa', label: 'Perder Grasa' },
              { value: 'mantener', label: 'Mantener' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, objective: value as any })}
                className={`p-6 rounded-lg border-2 font-500 text-center transition ${
                  data.objective === value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Level */}
      {step === 2 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-600 text-gray-900 mb-2">¿Cuál es tu experiencia?</h2>
            <p className="text-gray-600 text-base">Determina intensidad, técnica y progresión</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: 'principiante', label: 'Principiante' },
              { value: 'intermedio', label: 'Intermedio' },
              { value: 'avanzado', label: 'Avanzado' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, level: value as any })}
                className={`p-6 rounded-lg border-2 font-500 text-center transition ${
                  data.level === value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Days */}
      {step === 3 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Cuántos días por semana puedes entrenar?</h2>
            <p className="text-gray-600">La consistencia es clave para resultados</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[2, 3, 4, 5].map((day) => (
              <button
                key={day}
                onClick={() => setData({ ...data, days: day })}
              className={`p-6 rounded-2xl transition-all text-center border-2 font-medium ${
                data.days === day
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="text-4xl font-bold">{day}</div>
                <div className={`text-sm mt-2 ${data.days === day ? 'text-blue-100' : 'text-gray-600'}`}>
                  {day === 2 ? 'Iniciador' : day === 3 ? 'Óptimo' : day === 4 ? 'Intenso' : 'Máximo'}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              � Principiantes: comienza con 2-3 días. Aumenta gradualmente según recuperación y progreso.
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Location */}
      {step === 4 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Dónde prefieres entrenar?</h2>
            <p className="text-gray-600">Personalizaremos ejercicios según equipamiento disponible</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                value: 'gimnasio',
                label: 'Gimnasio',
                icon: '🏋️',
                description: 'Con equipos y máquinas',
              },
              {
                value: 'casa',
                label: 'Casa',
                icon: '🏠',
                description: 'Con peso corporal',
              },
            ].map(({ value, label, icon, description }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, location: value as any })}
              className={`p-8 rounded-2xl transition-all border-2 font-medium text-center ${
                data.location === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="text-5xl mb-3">{icon}</div>
                <div className="font-bold text-lg">{label}</div>
                <div className={`text-sm mt-2 ${data.location === value ? 'text-blue-100' : 'text-gray-600'}`}>
                  {description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Session Duration */}
      {step === 5 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Cuánto tiempo tienes por sesión?</h2>
            <p className="text-gray-600">Ajustaremos el volumen y la intensidad de los ejercicios</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '30', label: '30 min', emoji: '⚡' },
              { value: '45', label: '45 min', emoji: '💨' },
              { value: '60', label: '60 min', emoji: '💪' },
              { value: '90', label: '90+ min', emoji: '🔥' },
            ].map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, sessionDuration: value as any })}
                className={`p-6 rounded-2xl transition-all text-center border-2 font-bold ${
                  data.sessionDuration === value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <div>{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Injuries/Limitations */}
      {step === 6 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Tienes lesiones o limitaciones?</h2>
            <p className="text-gray-600">Adaptaremos los ejercicios para mantener tu seguridad</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'espalda', label: 'Espalda baja', emoji: '🔴' },
              { id: 'rodilla', label: 'Rodillas', emoji: '🟠' },
              { id: 'hombro', label: 'Hombros', emoji: '🟡' },
              { id: 'muñeca', label: 'Muñecas', emoji: '🟢' },
              { id: 'cuello', label: 'Cuello', emoji: '🔵' },
              { id: 'ninguna', label: 'Ninguna limitación', emoji: '✅' },
            ].map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === 'ninguna') {
                    setData({ ...data, injuries: [] });
                  } else {
                    const current = data.injuries || [];
                    if (current.includes(id)) {
                      setData({ ...data, injuries: current.filter((i) => i !== id) });
                    } else {
                      setData({ ...data, injuries: [...current, id] });
                    }
                  }
                }}
                className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition ${
                  data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Exercise Preferences */}
      {step === 7 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué tipo de ejercicios prefieres?</h2>
            <p className="text-gray-600">Selecciona uno o varios estilos de entrenamiento</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'compuestos', label: 'Ejercicios Compuestos', desc: 'Sentadillas, press, deadlift...', emoji: '🏋️' },
              { id: 'aislamiento', label: 'Aislamiento', desc: 'Curls, extensiones, pectorales...', emoji: '💪' },
              { id: 'cardio', label: 'Mucho Cardio', desc: 'Circuitos, HIIT, calistenia...', emoji: '🏃' },
              { id: 'funcional', label: 'Funcional', desc: 'Movimientos naturales y equilibrio...', emoji: '🤸' },
            ].map(({ id, label, desc, emoji }) => (
              <button
                key={id}
                onClick={() => {
                  const current = data.exercisePreferences || [];
                  if (current.includes(id)) {
                    setData({ ...data, exercisePreferences: current.filter((p) => p !== id) });
                  } else {
                    setData({ ...data, exercisePreferences: [...current, id] });
                  }
                }}
                className={`p-6 rounded-lg border-2 text-center transition ${
                  data.exercisePreferences?.includes(id)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <div className="font-bold">{label}</div>
                <div className={`text-xs mt-2 ${data.exercisePreferences?.includes(id) ? 'text-blue-100' : 'text-gray-600'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 8: Cardio Level */}
      {step === 8 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Cuánto cardio deseas incluir?</h2>
            <p className="text-gray-600">Esto afecta el descanso entre series y la estructura de la rutina</p>
          </div>

          <div className="space-y-4">
            {[
              { value: 'bajo', label: 'Bajo', desc: 'Enfoque en fuerza y masa', emoji: '🏋️' },
              { value: 'moderado', label: 'Moderado', desc: 'Balance entre fuerza y cardio', emoji: '⚖️' },
              { value: 'alto', label: 'Alto', desc: 'Mucho cardio, definición y resistencia', emoji: '🔥' },
            ].map(({ value, label, desc, emoji }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, cardio: value as any })}
                className={`w-full p-6 rounded-2xl border-2 text-left transition ${
                  data.cardio === value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">{emoji} {label}</div>
                    <div className={`text-sm mt-1 ${data.cardio === value ? 'text-blue-100' : 'text-gray-600'}`}>
                      {desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conditional: Equipment for Home */}
      {data.location === 'casa' && step === 9 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué equipamiento tienes en casa?</h2>
            <p className="text-gray-600">Personalizaremos los ejercicios según tu disponibilidad</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'mancuernas', label: 'Mancuernas', emoji: '🏋️' },
              { id: 'barra', label: 'Barra', emoji: '📊' },
              { id: 'bandas', label: 'Bandas elásticas', emoji: '🔗' },
              { id: 'domina', label: 'Barra dominadas', emoji: '📍' },
              { id: 'kettlebell', label: 'Kettlebell', emoji: '⚽' },
            ].map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => {
                  const current = data.equipment || [];
                  if (current.includes(id)) {
                    setData({ ...data, equipment: current.filter((e) => e !== id) });
                  } else {
                    setData({ ...data, equipment: [...current, id] });
                  }
                }}
                className={`p-4 rounded-lg border-2 text-center font-semibold transition ${
                  data.equipment?.includes(id)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-sm">{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 md:gap-4 justify-between pt-8 md:pt-12 border-t border-gray-200">
        <button
          onClick={handleBack}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-base md:text-lg ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md active:scale-95'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Atrás</span>
        </button>

        <button
          onClick={handleNext}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-base md:text-lg ${
            ((step === 1 && !data.objective) ||
            (step === 2 && !data.level) ||
            (step === 3 && !data.days) ||
            (step === 4 && !data.location) ||
            (step === 5 && !data.sessionDuration) ||
            (step === 7 && (!data.exercisePreferences || data.exercisePreferences.length === 0)) ||
            (step === 8 && !data.cardio))
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/40 active:scale-95'
          }`}
        >
          {step === totalSteps ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 12l5 5L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Generar Rutina</span>
            </>
          ) : (
            <>
              <span>Siguiente</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

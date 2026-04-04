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

  const getActualTotalSteps = () => {
    return data.location === 'casa' ? 14 : 13;
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
              <div className="absolute inset-0 border-4 border-gold-light rounded-full animate-spin border-t-gold-primary"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-700 text-color-text">Generando tu rutina...</h2>
            <p className="text-color-text-muted text-base">Estamos creando la rutina perfecta para ti</p>
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
          <h2 className="text-5xl font-700 text-color-text">Tu rutina está lista</h2>
          <p className="text-lg text-color-text-muted">Está completamente personalizada y optimizada para ti</p>
        </div>

        <RoutineCard routine={generatedRoutine} expanded={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => downloadRoutineAsPDF(generatedRoutine)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#997a3c] text-white font-500 rounded-lg hover:shadow-md transition text-base outline-none"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar
          </button>

          <button
            onClick={resetWizard}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-color-bg-secondary text-color-text font-500 rounded-lg hover:bg-color-border transition text-base border border-color-border-light outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Nueva
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Progress Section - Modern Minimalist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-600 text-color-text-muted uppercase tracking-wider">Paso {step} de {getActualTotalSteps()}</h3>
          <div className="text-sm font-700 text-gold-primary bg-gold-light/20 px-3 py-1 rounded-full">
            {Math.round((step / getActualTotalSteps()) * 100)}%
          </div>
        </div>

        {/* Progress Bar - Clean & Modern */}
        <div className="w-full bg-color-border-light rounded-full h-1 overflow-hidden">
          <div
            className="bg-gold-primary h-full transition-all duration-500 rounded-full"
            style={{ width: `${(step / getActualTotalSteps()) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Objective */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu objetivo?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Define ejercicios, nutrición y progresión</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { value: 'masa', label: 'Ganar Masa', emoji: '💪', desc: 'Aumentar tamaño muscular' },
              { value: 'grasa', label: 'Perder Grasa', emoji: '🔥', desc: 'Definir y reducir peso' },
              { value: 'mantener', label: 'Mantener', emoji: '⚖️', desc: 'Preservar estado actual' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, objective: value as any })}
                className={`p-4 rounded-xl border-2 font-500 text-center transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.objective === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg scale-105'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.objective === value && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-2 font-400 ${data.objective === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Level */}
      {step === 2 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu experiencia?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Adapto dificultad y progresión a tu nivel</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { value: 'principiante', label: 'Principiante', emoji: '🌱', desc: 'Menos de 6 meses o soy completamente nuevo' },
              { value: 'intermedio', label: 'Intermedio', emoji: '🏋️', desc: '6-18 meses con entrenamiento consistente' },
              { value: 'avanzado', label: 'Avanzado', emoji: '🦾', desc: '+18 meses o muy entrenado' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, level: value as any })}
                className={`p-4 rounded-xl border-2 font-500 text-center transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.level === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg scale-105'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.level === value && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-2 font-400 ${data.level === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Days */}
      {step === 3 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuántos días puedes entrenar?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Consistencia &gt; Intensidad</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { days: 2, emoji: '📆', desc: 'Rápido' },
              { days: 3, emoji: '⚡', desc: 'Ideal' },
              { days: 4, emoji: '💪', desc: 'Intenso' },
              { days: 5, emoji: '🔥', desc: 'Máximo' }
            ].map(({ days, emoji, desc }) => (
              <button
                key={days}
                onClick={() => setData({ ...data, days })}
                className={`p-3.5 rounded-xl border-2 font-500 text-center transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.days === days
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg scale-105'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.days === days && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-lg">{days}</div>
                <div className="text-xl my-1.5">{emoji}</div>
                <div className={`text-xs font-500 ${data.days === days ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Location */}
      {step === 4 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Dónde entrenarás?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Define ejercicios disponibles</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { value: 'gimnasio', label: 'Gimnasio', emoji: '🏢', desc: 'Acceso a pesas, máquinas y todo equipamiento' },
              { value: 'casa', label: 'Casa', emoji: '🏠', desc: 'Peso corporal o equipamiento limitado' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, location: value as any })}
                className={`p-4 rounded-xl border-2 font-500 text-center transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.location === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg scale-105'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.location === value && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-4xl mb-2">{emoji}</div>
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-2 font-400 ${data.location === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Session Duration */}
      {step === 5 && (
        <div className="animate-slideInRight space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">¿Cuánto tiempo tienes por sesión?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Efectivo en cualquier duración</p>
          </div>

          <div className="space-y-2.5">
            {([
              { value: '30' as const, label: '⚡ 30 min', desc: 'Comprimido' },
              { value: '45' as const, label: '💪 45 min', desc: 'Balance' },
              { value: '60' as const, label: '⏱️ 60 min', desc: 'Estándar' },
              { value: '90' as const, label: '🔥 90+ min', desc: 'Máximo' },
            ] as const).map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, sessionDuration: value })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.sessionDuration === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.sessionDuration === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.sessionDuration === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Injuries */}
      {step === 6 && (
        <div className="animate-slideInRight space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">¿Tienes limitaciones?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Adaptaré ejercicios para ti (várias)</p>
          </div>

          <div className="space-y-2.5">
            {[
              { id: 'espalda', label: '🔵 Espalda baja', desc: 'Limitado' },
              { id: 'rodilla', label: '🟠 Rodillas', desc: 'Limitado' },
              { id: 'hombro', label: '🟡 Hombros', desc: 'Limitado' },
              { id: 'muñeca', label: '🟢 Muñecas', desc: 'Push limitado' },
              { id: 'cuello', label: '🔴 Cuello', desc: 'Restricción' },
              { id: 'ninguna', label: '✅ Sin limitaciones', desc: 'Acceso completo' },
            ].map(({ id, label, desc }) => (
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
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0)
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {(data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0)) && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0) ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Exercise Preferences */}
      {step === 7 && (
        <div className="animate-slideInRight space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">¿Qué ejercicios prefieres?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Selecciona tus favoritos</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { id: 'compuestos', label: '🏋️ Compuestos', desc: 'Máximo impacto' },
              { id: 'aislamiento', label: '💪 Aislamiento', desc: 'Músculo específico' },
              { id: 'cardio', label: '🏃 Cardio', desc: 'Resistencia' },
              { id: 'funcional', label: '⚙️ Funcional', desc: 'Fuerza práctica' },
            ].map(({ id, label, desc }) => (
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
                className={`p-3.5 rounded-xl border-2 font-500 text-center transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.exercisePreferences?.includes(id)
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg scale-105'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.exercisePreferences?.includes(id) && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.exercisePreferences?.includes(id) ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 8: Cardio Level */}
      {step === 8 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuánto cardio deseas?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Afecta la recuperación general</p>
          </div>

          <div className="space-y-2.5">
            {[
              { value: 'bajo', label: '🏋️ Bajo', desc: 'Máx fuerza' },
              { value: 'moderado', label: '⚖️ Moderado', desc: 'Balance pesas-cardio' },
              { value: 'alto', label: '🏃 Alto', desc: 'Resistencia + definición' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, cardio: value as any })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.cardio === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.cardio === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.cardio === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 9: Training Style */}
      {step === 9 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu estilo?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Elige tu preferencia</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'ppl', 
                label: '🔄 Push/Pull/Legs', 
                desc: 'Grupos musculares' 
              },
              { 
                value: 'upperlower', 
                label: '↕️ Upper/Lower', 
                desc: 'Tren sup/inferior' 
              },
              { 
                value: 'fullbody', 
                label: '🌟 Full Body', 
                desc: 'Cuerpo completo' 
              },
              { 
                value: 'roulet', 
                label: '⭐ Mi rutina anterior', 
                desc: 'Adaptación previa' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, trainingStyle: value as any })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.trainingStyle === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.trainingStyle === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.trainingStyle === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 10: Availability */}
      {step === 10 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿A qué hora prefieres entrenar?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Optimizaré nutrición y energía según tu horario</p>
          </div>

          <div className="space-y-2.5">
            {[
              { value: 'manana', label: '🌅 Mañana (6-9 AM)', desc: 'Energía matutina fresca' },
              { value: 'mediodía', label: '☀️ Mediodía (12-1)', desc: 'Descanso de trabajo' },
              { value: 'tarde', label: '🌤️ Tarde (3-6)', desc: 'Mejor rendimiento' },
              { value: 'noche', label: '🌙 Noche (6-9)', desc: 'Post-trabajo' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, trainingTime: value as any })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.trainingTime === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.trainingTime === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.trainingTime === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 11: Recovery Priority */}
      {step === 11 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Tu prioridad de recuperación?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Base del éxito</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'alto', 
                label: '✅ Máxima', 
                desc: 'Sueño 8+h, nutrición ok, bajo estrés' 
              },
              { 
                value: 'medio', 
                label: '⚠️ Media', 
                desc: 'Sueño 6-7h, nutrición regular' 
              },
              { 
                value: 'bajo', 
                label: '⛔ Limitada', 
                desc: 'Poco sueño, estrés alto' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, recoveryPriority: value as any })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.recoveryPriority === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.recoveryPriority === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.recoveryPriority === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 12: Equipment (if home) */}
      {data.location === 'casa' && step === 12 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Qué equipamiento tienes?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Selecciona al menos uno para personalizar ejercicios</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'mancuernas', label: '🔵 Mancuernas', desc: 'Versátil y eficaz' },
              { id: 'barra', label: '🟠 Barra + Discos', desc: 'Máxima carga' },
              { id: 'bandas', label: '🟡 Bandas Elásticas', desc: 'Resistencia variable' },
              { id: 'domina', label: '🟢 Barra Dominadas', desc: 'Tren superior' },
              { id: 'kettlebell', label: '🔴 Kettlebell', desc: 'Explosividad' },
              { id: 'poco', label: '⚪ Solo peso corporal', desc: 'Sin equipamiento' },
            ].map(({ id, label, desc }) => (
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
                className={`p-3.5 rounded-xl border-2 font-500 text-center transition-all duration-300 transform outline-none focus:outline-none relative text-sm ${
                  data.equipment?.includes(id)
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg scale-105'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.equipment?.includes(id) && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-xs">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.equipment?.includes(id) ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 12 (if gym): Experience */}
      {data.location === 'gimnasio' && step === 12 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Tu experiencia previa?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Calibra dificultad y progresión</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'novato', 
                label: '🌱 Nuevo', 
                desc: 'Sin entrenamiento previo' 
              },
              { 
                value: '0-6m', 
                label: '🌿 <6 meses', 
                desc: 'Básico, construyo fundamentos' 
              },
              { 
                value: '6-12m', 
                label: '🌳 6-12 meses', 
                desc: 'Bases sólidas de técnica' 
              },
              { 
                value: '+1año', 
                label: '🏋️ >1 año', 
                desc: 'Entrenimiento consistente' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, experienceMonths: value as any })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.experienceMonths === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.experienceMonths === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.experienceMonths === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 13 (if cas): Experience */}
      {data.location === 'casa' && step === 13 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Tu experiencia previa?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Calibra dificultad y progresión</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'novato', 
                label: '🌱 Nuevo', 
                desc: 'Sin entrenamiento' 
              },
              { 
                value: '0-6m', 
                label: '🌿 <6 meses', 
                desc: 'Bases en construcción' 
              },
              { 
                value: '6-12m', 
                label: '🌳 6-12 meses', 
                desc: 'Bases sólidas' 
              },
              { 
                value: '+1año', 
                label: '🏋️ >1 año', 
                desc: 'Consistente' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, experienceMonths: value as any })}
                className={`w-full p-3 rounded-xl border-2 font-500 text-left transition-all duration-300 transform outline-none focus:outline-none relative ${
                  data.experienceMonths === value
                    ? 'bg-[#997a3c] text-white border-[#997a3c] shadow-lg'
                    : 'bg-white text-[#997a3c] border-[#e8dcc8] hover:border-[#c9a563] hover:shadow-md'
                }`}
              >
                {data.experienceMonths === value && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="font-700 text-sm">{label}</div>
                <div className={`text-xs mt-1.5 font-400 ${data.experienceMonths === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 13 (if gym) OR Step 14 (if casa): Ready */}
      {(data.location === 'casa' ? step === 14 : step === 13) && (
        <div className="animate-slideInRight space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">✅ ¡Listo para tu rutina!</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Información personalizada</p>
          </div>

          <div className="bg-gradient-to-br from-color-bg via-color-bg-secondary to-color-bg rounded-lg p-4 space-y-2 border border-gold-light/20">
            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center p-2 bg-white/50 rounded text-sm border border-gold-light/30">
                <span className="text-color-text-muted font-500">🎯 Objetivo:</span>
                <span className="font-700 text-gold-dark bg-gold-light/40 px-2 py-0.5 rounded text-xs">{data.objective}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded text-sm border border-gold-light/30">
                <span className="text-color-text-muted font-500">📊 Nivel:</span>
                <span className="font-700 text-gold-dark bg-gold-light/40 px-2 py-0.5 rounded text-xs">{data.level}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded text-sm border border-gold-light/30">
                <span className="text-color-text-muted font-500">📅 Días:</span>
                <span className="font-700 text-gold-dark bg-gold-light/40 px-2 py-0.5 rounded text-xs">{data.days}d</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded text-sm border border-gold-light/30">
                <span className="text-color-text-muted font-500">📍 Lugar:</span>
                <span className="font-700 text-gold-dark bg-gold-light/40 px-2 py-0.5 rounded text-xs capitalize">{data.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gold-light/20 to-golden-light/10 rounded-lg p-3 border-2 border-gold-light/40">
            <p className="text-sm text-gold-dark font-600">
              ✨ 100% personalizada
            </p>
            <p className="text-xs text-color-text-muted mt-1">
              Ejercicios adaptados, nutrición y progresión para tu nivel
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 justify-between pt-6 border-t border-color-border-light bg-white/95 backdrop-blur-sm sticky bottom-0 -mx-6 px-6 pb-6 z-40">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`flex-1 px-4 py-3 rounded-xl font-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm outline-none ${
            step === 1
              ? 'bg-color-bg-secondary text-color-text-muted cursor-not-allowed'
              : 'bg-color-bg-secondary text-color-text hover:bg-color-border hover:shadow-sm'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Atrás</span>
        </button>

        <button
          onClick={handleNext}
          disabled={
            (step === 1 && !data.objective) ||
            (step === 2 && !data.level) ||
            (step === 3 && !data.days) ||
            (step === 4 && !data.location) ||
            (step === 5 && !data.sessionDuration) ||
            (step === 7 && (!data.exercisePreferences || data.exercisePreferences.length === 0)) ||
            (step === 8 && !data.cardio) ||
            (step === 9 && !data.trainingStyle) ||
            (step === 10 && !data.trainingTime) ||
            (step === 11 && !data.recoveryPriority) ||
            (step === 12 && data.location === 'casa' && (!data.equipment || data.equipment.length === 0)) ||
            (step === 13 && data.location === 'casa' && !data.experienceMonths) ||
            (step === 12 && data.location === 'gimnasio' && !data.experienceMonths)
          }
          className={`flex-1 px-4 py-3 rounded-xl font-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm outline-none ${
            (step === 1 && !data.objective) ||
            (step === 2 && !data.level) ||
            (step === 3 && !data.days) ||
            (step === 4 && !data.location) ||
            (step === 5 && !data.sessionDuration) ||
            (step === 7 && (!data.exercisePreferences || data.exercisePreferences.length === 0)) ||
            (step === 8 && !data.cardio) ||
            (step === 9 && !data.trainingStyle) ||
            (step === 10 && !data.trainingTime) ||
            (step === 11 && !data.recoveryPriority) ||
            (step === 12 && data.location === 'casa' && (!data.equipment || data.equipment.length === 0)) ||
            (step === 13 && data.location === 'casa' && !data.experienceMonths) ||
            (step === 12 && data.location === 'gimnasio' && !data.experienceMonths)
              ? 'bg-color-bg-secondary text-color-text-muted cursor-not-allowed'
              : 'bg-[#997a3c] text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          {step === getActualTotalSteps() ? (
            <>✨ Generar Rutina</>
          ) : (
            <>
              <span>Siguiente</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

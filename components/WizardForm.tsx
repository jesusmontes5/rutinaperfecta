// components/WizardForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { downloadRoutineAsPDF } from '@/lib/download-utils';
import type { WizardData, Routine } from '@/types';
import RoutineCard from './RoutineCard';

export default function WizardForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<Routine | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const stepContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Animate step transitions
    if (stepContainerRef.current) {
      gsap.fromTo(
        stepContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [step]);

  const getActualTotalSteps = () => {
    return data.location === 'casa' ? 14 : 13;
  };

  const validateCurrentStep = (): boolean => {
    setValidationError('');
    
    switch (step) {
      case 1:
        if (!data.objective) {
          setValidationError('Por favor selecciona un objetivo');
          return false;
        }
        break;
      case 2:
        if (!data.level) {
          setValidationError('Por favor selecciona tu nivel de experiencia');
          return false;
        }
        break;
      case 3:
        if (!data.days) {
          setValidationError('Por favor selecciona cuántos días puedes entrenar');
          return false;
        }
        break;
      case 4:
        if (!data.location) {
          setValidationError('Por favor selecciona dónde entrenarás');
          return false;
        }
        break;
      case 5:
        if (!data.sessionDuration) {
          setValidationError('Por favor selecciona la duración de tus sesiones');
          return false;
        }
        break;
      case 7:
        if (!data.exercisePreferences || data.exercisePreferences.length === 0) {
          setValidationError('Por favor selecciona al menos un tipo de ejercicio');
          return false;
        }
        break;
      case 8:
        if (!data.cardio) {
          setValidationError('Por favor selecciona tu preferencia de cardio');
          return false;
        }
        break;
      case 9:
        if (!data.trainingStyle) {
          setValidationError('Por favor selecciona tu estilo de entrenamiento');
          return false;
        }
        break;
      case 10:
        if (!data.trainingTime) {
          setValidationError('Por favor selecciona tu momento del día');
          return false;
        }
        break;
      case 11:
        if (!data.recoveryPriority) {
          setValidationError('Por favor selecciona tu prioridad de recuperación');
          return false;
        }
        break;
      case 12:
        if (data.location === 'casa') {
          if (!data.equipment || data.equipment.length === 0) {
            setValidationError('Por favor selecciona qué equipamiento tienes disponible');
            return false;
          }
        } else if (!data.experienceMonths) {
          setValidationError('Por favor selecciona tu experiencia en meses');
          return false;
        }
        break;
      case 13:
        if (data.location === 'casa') {
          if (!data.experienceMonths) {
            setValidationError('Por favor selecciona tu experiencia en meses');
            return false;
          }
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    const actualTotal = getActualTotalSteps();
    if (validateCurrentStep()) {
      if (step < actualTotal) {
        setStep(step + 1);
      } else {
        generateRoutineHandler();
      }
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
          <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text">Tu rutina está lista</h2>
          <p className="text-lg text-color-text-muted font-medium">Está completamente personalizada y optimizada para ti</p>
        </div>

        <RoutineCard routine={generatedRoutine} expanded={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <button
            onClick={() => downloadRoutineAsPDF(generatedRoutine)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-primary text-white font-600 rounded-lg text-base hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar PDF
          </button>

          <button
            onClick={resetWizard}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-50 text-gold-700 font-600 rounded-lg border-2 border-gold-400 hover:border-gold-600 hover:bg-gold-100 transition text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Crear otra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={stepContainerRef} className="space-y-6 sm:space-y-8">
      {/* Progress Section - Modern Minimalist */}
      <div className="space-y-4 px-0.5">
        {/* Header with Step Counter */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-700 text-color-text-muted uppercase tracking-widest">
              PASO {step}
            </h2>
            <p className="text-2xl sm:text-3xl font-700 text-color-text mt-1">
              {step === 1 && "¿Cuál es tu objetivo?"}
              {step === 2 && "¿Tu experiencia?"}
              {step === 3 && "¿Cuántos días?"}
              {step === 4 && "¿Dónde entrenarás?"}
              {step === 5 && "¿Duración de sesión?"}
              {step === 6 && "¿Lesiones o limitaciones?"}
              {step === 7 && "¿Qué ejercicios prefieres?"}
              {step === 8 && "¿Énfasis en cardio?"}
              {step === 9 && "¿Estilo de entrenamiento?"}
              {step === 10 && "¿A qué hora entrenarás?"}
              {step === 11 && "¿Recuperación?"}
              {step === 12 && (data.location === 'casa' ? "¿Equipamiento?" : "¿Experiencia de pesas?")}
              {step === 13 && (data.location === 'casa' ? "¿Tu experiencia?" : "✨ ¡Perfil completado!")}
              {step === 14 && "✨ ¡A punto de comenzar!"}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-gold-600 to-gold-700 text-white px-3.5 py-1.5 rounded-full text-xs font-700 whitespace-nowrap shadow-md shadow-gold-dark/20">
              <span>{Math.round((step / getActualTotalSteps()) * 100)}</span>
              <span className="text-gold-light">%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar - Refined */}
        <div className="w-full h-2 bg-color-bg-secondary rounded-full overflow-hidden border border-color-border-light">
          <div
            className="h-full bg-gradient-to-r from-gold-primary via-gold-dark to-gold-dark rounded-full transition-all duration-1000 ease-out shadow-md shadow-gold-dark/40"
            style={{ width: `${(step / getActualTotalSteps()) * 100}%` }}
          ></div>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-color-text-muted font-400 leading-relaxed">
          {step === 1 && "Esto determina ejercicios, volumen e intensidad"}
          {step === 2 && "Adaptaré progresión y técnica según tu nivel"}
          {step === 3 && "La consistencia es más importante que la intensidad"}
          {step === 4 && "Determina ejercicios y disponibilidad"}
          {step === 5 && "Afecta volumen y eficiencia"}
          {step === 6 && "Protegeremos zonas sensibles"}
          {step === 7 && "Adapta a tus preferencias"}
          {step === 8 && "Balance óptimo según objetivo"}
          {step === 9 && "Estructura y frecuencia de trabajo"}
          {step === 10 && "Optimiza rendimiento y energía"}
          {step === 11 && "Crítico para resultados"}
          {step === 12 && (data.location === 'casa' ? "Adaptaré ejercicios a tu equipo" : "Progresión según experiencia")}
          {step === 13 && (data.location === 'casa' ? "Adaptaré intensidad y volumen" : "¡Estamos listos para generar!")}
          {step === 14 && "Tu rutina se está generando..."}
        </p>
      </div>

      {/* Step 1: Objective */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { value: 'masa', label: 'Ganar Masa', emoji: '💪', desc: 'Superávit + hipertrofia' },
              { value: 'grasa', label: 'Perder Grasa', emoji: '🔥', desc: 'Déficit + preservación' },
              { value: 'mantener', label: 'Mantener', emoji: '⚖️', desc: 'Balance y wellness' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, objective: value as any })}
                className={`group relative p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none ${
                  data.objective === value
                    ? 'bg-gradient-to-br from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg shadow-gold-dark/40'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1'
                }`}
              >
                {/* Checkmark */}
                {data.objective === value && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg className="w-4 h-4 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className="text-4xl sm:text-5xl mb-3">{emoji}</div>
                <div className="font-700 text-lg sm:text-xl leading-tight mb-2">{label}</div>
                <div className={`text-xs sm:text-sm font-500 ${data.objective === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Level */}
      {step === 2 && (
        <div className="animate-slideInRight space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { value: 'principiante', label: 'Principiante', emoji: '🌱', desc: 'Sin experiencia. Técnica base' },
              { value: 'intermedio', label: 'Intermedio', emoji: '🏋️', desc: 'Conozco movimientos principales' },
              { value: 'avanzado', label: 'Avanzado', emoji: '🦾', desc: 'Progresión avanzada' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, level: value as any })}
                className={`group relative p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none ${
                  data.level === value
                    ? 'bg-gradient-to-br from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg shadow-gold-dark/40'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1'
                }`}
              >
                {data.level === value && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg className="w-4 h-4 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-4xl sm:text-5xl mb-3">{emoji}</div>
                <div className="font-700 text-lg sm:text-xl leading-tight mb-2">{label}</div>
                <div className={`text-xs sm:text-sm font-500 ${data.level === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Days */}
      {step === 3 && (
        <div className="animate-slideInRight space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { days: 2, emoji: '📆', desc: 'Iniciante' },
              { days: 3, emoji: '⚡', desc: 'Equilibrio' },
              { days: 4, emoji: '💪', desc: 'Moderado' },
              { days: 5, emoji: '🔥', desc: 'Intenso' }
            ].map(({ days, emoji, desc }) => (
              <button
                key={days}
                onClick={() => setData({ ...data, days })}
                className={`group relative p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none ${
                  data.days === days
                    ? 'bg-gradient-to-br from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg shadow-gold-dark/40'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1'
                }`}
              >
                {data.days === days && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-4xl mb-2.5">{emoji}</div>
                <div className="font-800 text-2xl sm:text-3xl leading-tight mb-2">{days}</div>
                <div className={`text-xs font-600 ${data.days === days ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Location */}
      {step === 4 && (
        <div className="animate-slideInRight space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { value: 'gimnasio', label: 'Gimnasio', emoji: '🏢', desc: 'Toda gama de ejercicios' },
              { value: 'casa', label: 'Casa', emoji: '🏠', desc: 'Equipamiento limitado' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, location: value as any })}
                className={`group relative p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none ${
                  data.location === value
                    ? 'bg-gradient-to-br from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg shadow-gold-dark/40'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1'
                }`}
              >
                {data.location === value && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg className="w-4 h-4 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-5xl sm:text-6xl mb-4">{emoji}</div>
                <div className="font-700 text-xl sm:text-2xl leading-tight mb-2">{label}</div>
                <div className={`text-sm font-500 ${data.location === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Session Duration */}
      {step === 5 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="space-y-1.5 md:space-y-2">
            {([
              { value: '30' as const, label: '⚡ 30 min', desc: 'Comprimido. Ejercicios clave' },
              { value: '45' as const, label: '💪 45 min', desc: 'Balance efectivo' },
              { value: '60' as const, label: '⏱️ 60 min', desc: 'Estándar ideal' },
              { value: '90' as const, label: '🔥 90+ min', desc: 'Máximo volumen' },
            ] as const).map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, sessionDuration: value })}
                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 font-600 text-left transition-all duration-300 transform focus:outline-none flex items-center justify-between group ${
                  data.sessionDuration === value
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-md hover:shadow-gold-primary/20'
                }`}
              >
                <div>
                  <div className="font-700 text-base md:text-lg">{label}</div>
                  <div className={`text-xs md:text-sm font-500 mt-1 ${data.sessionDuration === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                    {desc}
                  </div>
                </div>
                {data.sessionDuration === value && (
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center ml-3 shadow-sm animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Injuries */}
      {step === 6 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="space-y-1.5 md:space-y-2">
            {[
              { id: 'espalda', label: '🔵 Espalda baja', desc: 'Evitaré alta extensión' },
              { id: 'rodilla', label: '🟠 Rodillas', desc: 'Limitaré profundidad' },
              { id: 'hombro', label: '🟡 Hombros', desc: 'Reduciré rango' },
              { id: 'muñeca', label: '🟢 Muñecas', desc: 'Modificaré agarres' },
              { id: 'cuello', label: '🔴 Cuello', desc: 'Evitaré flexión extrema' },
              { id: 'ninguna', label: '✅ Sin limitaciones', desc: 'Todos los ejercicios' },
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
                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 font-600 text-left transition-all duration-300 transform focus:outline-none flex items-center justify-between group ${
                  data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0)
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-md hover:shadow-gold-primary/20'
                }`}
              >
                <div>
                  <div className="font-700 text-base md:text-lg">{label}</div>
                  <div className={`text-xs md:text-sm font-500 mt-1 ${data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0) ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                    {desc}
                  </div>
                </div>
                {(data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0)) && (
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center ml-3 shadow-sm animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Exercise Preferences */}
      {step === 7 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { id: 'compuestos', label: '🏋️ Compuestos', desc: 'Máxima fuerza' },
              { id: 'aislamiento', label: '💪 Aislamiento', desc: 'Trabajo específico' },
              { id: 'cardio', label: '🏃 Cardio', desc: 'Resistencia' },
              { id: 'funcional', label: '⚙️ Funcional', desc: 'Aplicada' },
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
                className={`group relative p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none ${
                  data.exercisePreferences?.includes(id)
                    ? 'bg-gradient-to-br from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg shadow-gold-dark/40'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1'
                }`}
              >
                {data.exercisePreferences?.includes(id) && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg className="w-4 h-4 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl sm:text-4xl mb-3">{label.split(' ')[0]}</div>
                <div className="font-700 text-lg sm:text-xl leading-tight mb-2">{label}</div>
                <div className={`text-xs sm:text-sm font-500 ${data.exercisePreferences?.includes(id) ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 8: Cardio Level */}
      {step === 8 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="space-y-1.5 md:space-y-2">
            {[
              { value: 'bajo', label: '🏋️ Bajo', desc: 'Máximo enfoque en fuerza' },
              { value: 'moderado', label: '⚖️ Moderado', desc: 'Balance recomendado' },
              { value: 'alto', label: '🏃 Alto', desc: 'Mucho cardio' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, cardio: value as any })}
                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 font-600 text-left transition-all duration-300 transform focus:outline-none flex items-center justify-between group ${
                  data.cardio === value
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-md hover:shadow-gold-primary/20'
                }`}
              >
                <div>
                  <div className="font-700 text-base md:text-lg">{label}</div>
                  <div className={`text-xs md:text-sm font-500 mt-1 ${data.cardio === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                    {desc}
                  </div>
                </div>
                {data.cardio === value && (
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center ml-3 shadow-sm animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 9: Training Style */}
      {step === 9 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="space-y-1.5 md:space-y-2">
            {[
              { value: 'ppl', label: '🔄 Push/Pull/Legs', desc: 'Ideal para volumen' },
              { value: 'upperlower', label: '↕️ Upper/Lower', desc: 'Muy efectivo' },
              { value: 'fullbody', label: '🌟 Full Body', desc: 'Máxima frecuencia' },
              { value: 'roulet', label: '⭐ Mi rutina anterior', desc: 'Adaptación previa' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, trainingStyle: value as any })}
                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 font-600 text-left transition-all duration-300 transform focus:outline-none flex items-center justify-between group ${
                  data.trainingStyle === value
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-md hover:shadow-gold-primary/20'
                }`}
              >
                <div>
                  <div className="font-700 text-base md:text-lg">{label}</div>
                  <div className={`text-xs md:text-sm font-500 mt-1 ${data.trainingStyle === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                    {desc}
                  </div>
                </div>
                {data.trainingStyle === value && (
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center ml-3 shadow-sm animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 10: Availability */}
      {step === 10 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="space-y-1.5 md:space-y-2">
            {[
              { value: 'manana', label: '🌅 Mañana', desc: 'Energía fresca' },
              { value: 'mediodía', label: '☀️ Mediodía', desc: 'Descanso laboral' },
              { value: 'tarde', label: '🌤️ Tarde', desc: 'Mejor rendimiento' },
              { value: 'noche', label: '🌙 Noche', desc: 'Post-trabajo' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, trainingTime: value as any })}
                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 font-600 text-left transition-all duration-300 transform focus:outline-none flex items-center justify-between group ${
                  data.trainingTime === value
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-md hover:shadow-gold-primary/20'
                }`}
              >
                <div>
                  <div className="font-700 text-base md:text-lg">{label}</div>
                  <div className={`text-xs md:text-sm font-500 mt-1 ${data.trainingTime === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                    {desc}
                  </div>
                </div>
                {data.trainingTime === value && (
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center ml-3 shadow-sm animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 11: Recovery Priority */}
      {step === 11 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="space-y-1.5 md:space-y-2">
            {[
              { value: 'alto', label: '✅ Excelente', desc: '8+ horas, nutrición, bajo estrés' },
              { value: 'medio', label: '⚠️ Promedio', desc: '6-7h, regular, estrés moderado' },
              { value: 'bajo', label: '⛔ Limitada', desc: '<6h, variable, estrés alto' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, recoveryPriority: value as any })}
                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 font-600 text-left transition-all duration-300 transform focus:outline-none flex items-center justify-between group ${
                  data.recoveryPriority === value
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-md hover:shadow-gold-primary/20'
                }`}
              >
                <div>
                  <div className="font-700 text-base md:text-lg">{label}</div>
                  <div className={`text-xs md:text-sm font-500 mt-1 ${data.recoveryPriority === value ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                    {desc}
                  </div>
                </div>
                {data.recoveryPriority === value && (
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center ml-3 shadow-sm animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 12: Equipment (if home) */}
      {data.location === 'casa' && step === 12 && (
        <div className="animate-slideInRight space-y-4 md:space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { id: 'mancuernas', label: '🔵 Mancuernas', desc: 'Versátil' },
              { id: 'barra', label: '🟠 Barra', desc: 'Máxima carga' },
              { id: 'bandas', label: '🟡 Bandas', desc: 'Variable' },
              { id: 'domina', label: '🟢 Dominadas', desc: 'Tracción' },
              { id: 'kettlebell', label: '🔴 Kettlebell', desc: 'Explosivos' },
              { id: 'poco', label: '⚪ Solo peso', desc: 'Básico' },
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
                className={`group relative p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none ${
                  data.equipment?.includes(id)
                    ? 'bg-gradient-to-br from-gold-600 to-gold-700 text-white border-gold-dark shadow-lg shadow-gold-dark/40'
                    : 'bg-white text-gold-dark border-color-border hover:border-gold-primary hover:shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1'
                }`}
              >
                {data.equipment?.includes(id) && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg className="w-3 h-3 text-gold-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-2xl sm:text-3xl mb-2">{label.split(' ')[0]}</div>
                <div className="font-700 text-sm sm:text-base leading-tight mb-2">{label}</div>
                <div className={`text-xs font-500 ${data.equipment?.includes(id) ? 'text-white' : 'text-color-text-muted group-hover:text-gold-dark'}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 12 (if gym): Experience */}
      {data.location === 'gimnasio' && step === 12 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu experiencia con pesas?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Adaptaré progresión y volumen a tu nivel actual</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'novato', 
                label: '🌱 Totalmente nuevo', 
                desc: 'Sin experiencia. Aprenderé técnica base' 
              },
              { 
                value: '0-6m', 
                label: '🌿 Menos de 6 meses', 
                desc: 'Iniciante con bases empezando' 
              },
              { 
                value: '6-12m', 
                label: '🌳 6-12 meses', 
                desc: 'Técnica sólida en ejercicios principales' 
              },
              { 
                value: '+1año', 
                label: '🏋️ Más de 1 año', 
                desc: 'Entrenamiento consistente y experiencia' 
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
                <div className={`text-xs mt-1.5 font-400 ${data.experienceMonths === value ? 'text-white' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 13 (if casa): Experience */}
      {data.location === 'casa' && step === 13 && (
        <div className="animate-slideInRight space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu experiencia en entrenamiento?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Modificaré progresión, intensidad y adaptaciones</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'novato', 
                label: '🌱 Totalmente nuevo', 
                desc: 'Sin entrenamiento previo. Aprenderé técnica base' 
              },
              { 
                value: '0-6m', 
                label: '🌿 Menos de 6 meses', 
                desc: 'Bases en construcción, técnica en aprendizaje' 
              },
              { 
                value: '6-12m', 
                label: '🌳 6-12 meses', 
                desc: 'Técnica sólida, progresión consistente' 
              },
              { 
                value: '+1año', 
                label: '🏋️ Más de 1 año', 
                desc: 'Experiencia consistente, progresión avanzada' 
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
                <div className={`text-xs mt-1.5 font-400 ${data.experienceMonths === value ? 'text-white' : 'text-color-text-muted'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 13 (if gym) OR Step 14 (if casa): Ready */}
      {(data.location === 'casa' ? step === 14 : step === 13) && (
        <div className="animate-slideInRight space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">✅ ¡Perfil completado! 🎯</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Generando tu rutina personalizada basada en tus datos...</p>
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
                <span className="text-color-text-muted font-500">📅 Días/Semana:</span>
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

      {/* Validation Error Message - Minimalist */}
      {validationError && (
        <div className="px-4 md:px-6 py-4 md:py-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3 mb-4 animate-pulse">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm md:text-base font-600 text-red-700">{validationError}</p>
        </div>
      )}

      {/* Buttons - Optimized for mobile & desktop */}
      <div className="flex flex-col-reverse sm:flex-row gap-2 md:gap-3 pt-6 md:pt-8 border-t border-color-border-light bg-gradient-to-t from-white via-white to-transparent sticky bottom-0 -mx-6 sm:-mx-8 px-6 sm:px-8 pb-6 md:pb-8 z-40">
        <button
          onClick={handleBack}
          className={`flex-1 px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base outline-none ${
            step === 1
              ? 'bg-color-bg-secondary text-color-text-muted cursor-not-allowed'
              : 'bg-color-bg-secondary text-color-text hover:bg-color-border hover:shadow-md active:scale-95'
          }`}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Atrás</span>
        </button>

        <button
          onClick={handleNext}
          className={`flex-1 px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base outline-none ${
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
              ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white opacity-60 cursor-not-allowed'
              : 'bg-gradient-to-r from-gold-600 to-gold-700 text-white hover:shadow-lg shadow-gold-dark/30 active:scale-95'
          }`}
        >
          {step === getActualTotalSteps() ? (
            <span>✨ Generar Rutina</span>
          ) : (
            <>
              <span>Siguiente</span>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

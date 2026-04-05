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
  const [validationError, setValidationError] = useState<string>('');

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
        } else {
          if (!data.experienceMonths) {
            setValidationError('Por favor selecciona tu experiencia en meses');
            return false;
          }
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu objetivo principal?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Esto determinará ejercicios, volumen, intensidad y nutrición recomendada para máximos resultados</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { value: 'masa', label: 'Ganar Masa', emoji: '💪', desc: 'Aumentar tamaño muscular (superávit calórico + hipertrofia)' },
              { value: 'grasa', label: 'Perder Grasa', emoji: '🔥', desc: 'Definición muscular (déficit + preservación de masa)' },
              { value: 'mantener', label: 'Mantener', emoji: '⚖️', desc: 'Preservar forma actual (equilibrio y wellness)' },
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
                <div className="text-3xl mb-2">{emoji} </div>
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu experiencia en entrenamiento?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Esto determina progresión, técnica y adaptación del programa a tu capacidad actual</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { value: 'principiante', label: 'Principiante', emoji: '🌱', desc: 'Menos de 6 meses o sin experiencia previa. Aprenderé técnica básica.' },
              { value: 'intermedio', label: 'Intermedio', emoji: '🏋️', desc: '6-18 meses de entrenamiento consistente. Conozco movimientos principales.' },
              { value: 'avanzado', label: 'Avanzado', emoji: '🦾', desc: '+18 meses o muy entrenado. Busco progresión avanzada y periodización.' },
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuántos días puedes entrenar por semana?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">La consistencia es más importante que la intensidad. Elige lo que puedas mantener regularmente</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { days: 2, emoji: '📆', desc: 'Iniciante. 1 sesión cada 3-4 días' },
              { days: 3, emoji: '⚡', desc: 'Ideal. Balance y recuperación óptima' },
              { days: 4, emoji: '💪', desc: 'Volumen moderado. Mayor frecuencia' },
              { days: 5, emoji: '🔥', desc: 'Máximo volumen. Muy dedicado' }
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Dónde realizarás tus entrenamientos?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Esto determina disponibilidad de equipamiento, ejercicios y progresión posible</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { value: 'gimnasio', label: 'Gimnasio', emoji: '🏢', desc: 'Acceso a pesas, mancuernas, máquinas y toda gama de ejercicios' },
              { value: 'casa', label: 'Casa', emoji: '🏠', desc: 'Peso corporal o equipamiento limitado. Usaré movimientos adaptados' },
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
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">¿Cuánto tiempo disponible tienes por sesión?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Determina volumen de ejercicios, descanso entre series y eficiencia del entrenamiento</p>
          </div>

          <div className="space-y-2.5">
            {([
              { value: '30' as const, label: '⚡ 30 min', desc: 'Muy comprimido. Solo ejercicios clave' },
              { value: '45' as const, label: '💪 45 min', desc: 'Balance efectivo. Tiempo suficiente' },
              { value: '60' as const, label: '⏱️ 60 min', desc: 'Estándar ideal. Calentamiento + volumen' },
              { value: '90' as const, label: '🔥 90+ min', desc: 'Máximo tiempo. Más volumen y accesorios' },
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
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">¿Tienes lesiones o limitaciones físicas?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Selecciona las que apliquen. Adaptaré ejercicios para proteger esas zonas (puedes seleccionar varias)</p>
          </div>

          <div className="space-y-2.5">
            {[
              { id: 'espalda', label: '🔵 Espalda baja', desc: 'Evitaré extensión forzada de columna' },
              { id: 'rodilla', label: '🟠 Rodillas', desc: 'Limitaré profundidad y impacto' },
              { id: 'hombro', label: '🟡 Hombros', desc: 'Reduciré rango y presión' },
              { id: 'muñeca', label: '🟢 Muñecas', desc: 'Modificaré agarres y empujes' },
              { id: 'cuello', label: '🔴 Cuello', desc: 'Evitaré flexión/extensión extrema' },
              { id: 'ninguna', label: '✅ Sin limitaciones', desc: 'Acceso a todos los ejercicios' },
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
            <h2 className="text-lg sm:text-xl font-700 text-color-text mb-1">¿Qué tipos de ejercicios prefieres?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Selecciona los que más te gustan. Prioridad en tu plan (puedes marcar varios)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { id: 'compuestos', label: '🏋️ Compuestos', desc: 'Sentadilla, press, remo. Máxima fuerza' },
              { id: 'aislamiento', label: '💪 Aislamiento', desc: 'Rosca, extensión. Trabajo específico' },
              { id: 'cardio', label: '🏃 Cardio', desc: 'Correr, bicicleta. Resistencia cardiovascular' },
              { id: 'funcional', label: '⚙️ Funcional', desc: 'Movimientos prácticos. Fuerza aplicada' },
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuánto énfasis en cardio?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Balance entre fuerza y resistencia según tu objetivo y recuperación</p>
          </div>

          <div className="space-y-2.5">
            {[
              { value: 'bajo', label: '🏋️ Bajo', desc: 'Máximo enfoque en fuerza e hipertrofia' },
              { value: 'moderado', label: '⚖️ Moderado', desc: 'Balance entre pesas y cardio. Recomendado' },
              { value: 'alto', label: '🏃 Alto', desc: 'Mucho cardio. Resistencia y definición' },
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuáles es tu estilo de entrenamiento preferido?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Determina estructura, frecuencia y cómo se agrupan los ejercicios</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'ppl', 
                label: '🔄 Push/Pull/Legs', 
                desc: 'Divide por tracción/empuje. Ideal para volumen' 
              },
              { 
                value: 'upperlower', 
                label: '↕️ Upper/Lower', 
                desc: 'Tren superior e inferior alternados. Muy efectivo' 
              },
              { 
                value: 'fullbody', 
                label: '🌟 Full Body', 
                desc: 'Todo el cuerpo cada sesión. Máxima frecuencia muscular' 
              },
              { 
                value: 'roulet', 
                label: '⭐ Mi rutina anterior', 
                desc: 'Adaptación de tu estilo previo' 
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
              { value: 'manana', label: '🌅 Mañana (6-9 AM)', desc: 'Energía matutina fresca. Hormonal óptimo' },
              { value: 'mediodía', label: '☀️ Mediodía (12-1 PM)', desc: 'Descanso laboral. Nutrición pre-entreno' },
              { value: 'tarde', label: '🌤️ Tarde (3-6 PM)', desc: 'Mejor rendimiento y máxima fuerza' },
              { value: 'noche', label: '🌙 Noche (6-9 PM)', desc: 'Post-trabajo. Mayor volumen posible' },
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Cuál es tu capacidad de recuperación?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Sueño, nutrición y estrés. CRÍTICO para resultados</p>
          </div>

          <div className="space-y-2.5">
            {[
              { 
                value: 'alto', 
                label: '✅ Excelente', 
                desc: '8+ h de sueño, nutrición consistente, bajo estrés' 
              },
              { 
                value: 'medio', 
                label: '⚠️ Promedio', 
                desc: '6-7h de sueño, nutrición regular, estrés moderado' 
              },
              { 
                value: 'bajo', 
                label: '⛔ Limitada', 
                desc: '<6h de sueño, nutrición variable, estrés alto' 
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
            <h2 className="text-xl sm:text-2xl font-700 text-color-text mb-1">¿Qué equipamiento tienes en casa?</h2>
            <p className="text-color-text-muted text-xs sm:text-sm">Determina ejercicios posibles. Puedes seleccionar múltiples opciones</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'mancuernas', label: '🔵 Mancuernas', desc: 'Versátil y con progresión' },
              { id: 'barra', label: '🟠 Barra + Discos', desc: 'Máxima carga posible' },
              { id: 'bandas', label: '🟡 Bandas Elásticas', desc: 'Resistencia variable' },
              { id: 'domina', label: '🟢 Barra Dominadas', desc: 'Ejercicios tracción' },
              { id: 'kettlebell', label: '🔴 Kettlebell', desc: 'Movimientos explosivos' },
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
                <div className={`text-xs mt-1.5 font-400 ${data.experienceMonths === value ? 'text-white/90' : 'text-color-text-muted'}`}>{desc}</div>
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

      {/* Validation Error Message */}
      {validationError && (
        <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3 mb-4 animate-pulse">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-600 text-red-700">{validationError}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 justify-between pt-6 border-t border-color-border-light bg-white/95 backdrop-blur-sm sticky bottom-0 -mx-6 px-6 pb-6 z-40">
        <button
          onClick={handleBack}
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
              ? 'bg-gold-light/30 text-color-text-muted cursor-not-allowed'
              : 'bg-[#997a3c] text-white hover:bg-[#8a6a34] hover:shadow-lg shadow-[#997a3c]/20'
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

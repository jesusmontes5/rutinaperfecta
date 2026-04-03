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
    <div className="space-y-6 sm:space-y-8">
      {/* Progress Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50 p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-6 gap-4">
          <div className="flex-1">
            <h3 className="font-700 text-gray-900 text-lg md:text-xl">Paso {step} de {getActualTotalSteps()}</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">Casi listo para generar tu rutina perfecta</p>
          </div>
          <div className="text-2xl md:text-4xl font-700 text-gray-900 bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl border border-gray-200/50 flex-shrink-0">
            {Math.round((step / getActualTotalSteps()) * 100)}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200/50 rounded-full h-2 md:h-3 overflow-hidden">
          <div
            className="bg-black h-full transition-all duration-500 rounded-full"
            style={{ width: `${(step / getActualTotalSteps()) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Objective */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-700 text-gray-900 mb-2 md:mb-3">¿Cuál es tu objetivo?</h2>
            <p className="text-gray-600 text-sm md:text-base">Esto define todo: ejercicios, nutrición y progresión personalizada</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { value: 'masa', label: 'Ganar Masa', emoji: '💪', desc: 'Aumentar tamaño muscular' },
              { value: 'grasa', label: 'Perder Grasa', emoji: '🔥', desc: 'Definir y reducir peso' },
              { value: 'mantener', label: 'Mantener', emoji: '⚖️', desc: 'Preservar estado actual' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, objective: value as any })}
                className={`p-5 md:p-6 rounded-xl md:rounded-2xl border-2 font-600 text-center transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  data.objective === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200/50 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{emoji}</div>
                <div className="font-700 text-base md:text-lg">{label}</div>
                <div className={`text-xs md:text-sm mt-2 md:mt-3 ${data.objective === value ? 'text-gray-200' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Level */}
      {step === 2 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuál es tu experiencia?</h2>
            <p className="text-gray-600 text-base">Esto define la dificultad y progresión de tu rutina</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: 'principiante', label: 'Principiante', emoji: '🌱', desc: 'Menos de 6 meses o soy completamente nuevo' },
              { value: 'intermedio', label: 'Intermedio', emoji: '🏋️', desc: '6-18 meses con entrenamiento consistente' },
              { value: 'avanzado', label: 'Avanzado', emoji: '🦾', desc: '+18 meses o muy entrenado' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, level: value as any })}
                className={`p-6 rounded-xl border-2 font-500 text-center transition-all transform hover:scale-105 ${
                  data.level === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <div className="font-700 text-lg">{label}</div>
                <div className={`text-xs mt-2 ${data.level === value ? 'text-gray-200' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Days */}
      {step === 3 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuántos días puedes entrenar?</h2>
            <p className="text-gray-600 text-base">La consistencia es más importante que la intensidad</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { days: 2, emoji: '📆', desc: 'Rápido' },
              { days: 3, emoji: '⚡', desc: 'Ideal' },
              { days: 4, emoji: '💪', desc: 'Intenso' },
              { days: 5, emoji: '🔥', desc: 'Máximo' }
            ].map(({ days, emoji, desc }) => (
              <button
                key={days}
                onClick={() => setData({ ...data, days })}
                className={`p-6 rounded-xl border-2 font-600 text-center transition-all transform hover:scale-105 ${
                  data.days === days
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl font-700">{days}</div>
                <div className="text-2xl my-2">{emoji}</div>
                <div className={`text-xs font-500 ${data.days === days ? 'text-gray-200' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Location */}
      {step === 4 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Dónde entrenarás?</h2>
            <p className="text-gray-600 text-base">Esto determina los ejercicios que te recomendaré</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: 'gimnasio', label: 'Gimnasio', emoji: '🏢', desc: 'Acceso a pesas, máquinas y todo equipamiento' },
              { value: 'casa', label: 'Casa', emoji: '🏠', desc: 'Peso corporal o equipamiento limitado' },
            ].map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, location: value as any })}
                className={`p-6 rounded-xl border-2 font-500 text-center transition-all transform hover:scale-105 ${
                  data.location === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="text-5xl mb-3">{emoji}</div>
                <div className="font-700 text-lg">{label}</div>
                <div className={`text-sm mt-3 ${data.location === value ? 'text-gray-200' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Session Duration */}
      {step === 5 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuánto tiempo tienes por sesión?</h2>
            <p className="text-gray-600 text-base">Puedes entrenar efectivamente en cualquier duración</p>
          </div>

          <div className="space-y-3">
            {([
              { value: '30' as const, label: '⚡ 30 minutos', desc: 'Comprimido y enfocado, ideal para ocupados' },
              { value: '45' as const, label: '💪 45 minutos', desc: 'Balance perfecto entre trabajo y recuperación' },
              { value: '60' as const, label: '⏱️ 60 minutos', desc: 'Estándar recomendado para óptimos resultados' },
              { value: '90' as const, label: '🔥 90+ minutos', desc: 'Máximo volumen y variedad de ejercicios' },
            ] as const).map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, sessionDuration: value })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.sessionDuration === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-sm mt-2 ${data.sessionDuration === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Injuries */}
      {step === 6 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Tienes lesiones o limitaciones?</h2>
            <p className="text-gray-600 text-base">Adaptaré ejercicios para entrenar seguro (puedes marcar varias)</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'espalda', label: '🔵 Espalda baja', desc: 'Evitaré peso muerto y flexiones' },
              { id: 'rodilla', label: '🟠 Rodillas', desc: 'Adaptaré sentadillas y saltos' },
              { id: 'hombro', label: '🟡 Hombros', desc: 'Limitaré press y movimientos overhead' },
              { id: 'muñeca', label: '🟢 Muñecas', desc: 'Reducir movimientos de push' },
              { id: 'cuello', label: '🔴 Cuello', desc: 'Evitaré movimientos de torsión' },
              { id: 'ninguna', label: '✅ Sin limitaciones', desc: 'Acceso completo a todos los ejercicios' },
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
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0)
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700">{label}</div>
                <div className={`text-sm mt-1 ${data.injuries?.includes(id) || (id === 'ninguna' && data.injuries?.length === 0) ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Exercise Preferences */}
      {step === 7 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Qué tipo de ejercicios prefieres?</h2>
            <p className="text-gray-600 text-base">Puedes seleccionar varios estilos que te gusten</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'compuestos', label: '🏋️ Compuestos', desc: 'Sentadillas, press, peso muerto - máximo impacto' },
              { id: 'aislamiento', label: '💪 Aislamiento', desc: 'Flexiones, ristre, curls - músculo específico' },
              { id: 'cardio', label: '🏃 Cardio', desc: 'Correr, bicicleta, HIIT - resistencia' },
              { id: 'funcional', label: '⚙️ Funcional', desc: 'Movimientos naturales - fuerza práctica' },
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
                className={`p-6 rounded-xl border-2 font-500 text-center transition-all transform hover:scale-105 ${
                  data.exercisePreferences?.includes(id)
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-xs mt-2 ${data.exercisePreferences?.includes(id) ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 8: Cardio Level */}
      {step === 8 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuánto cardio deseas?</h2>
            <p className="text-gray-600 text-base">Afecta la recuperación entre grupos musculares</p>
          </div>

          <div className="space-y-3">
            {[
              { value: 'bajo', label: '🏋️ Bajo', desc: 'Mínimo cardio, máximo enfoque en fuerza y masa' },
              { value: 'moderado', label: '⚖️ Moderado', desc: 'Balance perfecto entre pesas y cardio' },
              { value: 'alto', label: '🏃 Alto', desc: 'Cardio intenso, énfasis en resistencia y definición' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, cardio: value as any })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.cardio === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-sm mt-2 ${data.cardio === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 9: Training Style */}
      {step === 9 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuál es tu estilo de entrenamiento?</h2>
            <p className="text-gray-600 text-base">Elige lo que mejor se adapte a tus preferencias</p>
          </div>

          <div className="space-y-3">
            {[
              { 
                value: 'ppl', 
                label: '🔄 Push/Pull/Legs', 
                desc: 'Divide por grupos musculares: Empuje/Tirón/Pierna' 
              },
              { 
                value: 'upperlower', 
                label: '↕️ Upper/Lower', 
                desc: 'Alterna entre tren superior e inferior' 
              },
              { 
                value: 'fullbody', 
                label: '🌟 Full Body', 
                desc: 'Entrena todo el cuerpo en cada sesión' 
              },
              { 
                value: 'roulet', 
                label: '⭐ Mi rutina anterior', 
                desc: 'Adaptación de una rutina que ya me funciona' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, trainingStyle: value as any })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.trainingStyle === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-sm mt-2 ${data.trainingStyle === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 10: Availability */}
      {step === 10 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿A qué hora prefieres entrenar?</h2>
            <p className="text-gray-600 text-base">Optimizaré nutrición y energía según tu horario</p>
          </div>

          <div className="space-y-3">
            {[
              { value: 'manana', label: '🌅 Mañana (6-9 AM)', desc: 'Aprovechar energía matutina fresca' },
              { value: 'mediodía', label: '☀️ Mediodía (12-1 PM)', desc: 'Durante el descanso de trabajo/estudio' },
              { value: 'tarde', label: '🌤️ Tarde (3-6 PM)', desc: 'Mejor rendimiento general del día' },
              { value: 'noche', label: '🌙 Noche (6-9 PM)', desc: 'Después del trabajo o estudios' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, trainingTime: value as any })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.trainingTime === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700">{label}</div>
                <div className={`text-sm mt-2 ${data.trainingTime === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 11: Recovery Priority */}
      {step === 11 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuál es tu prioridad de recuperación?</h2>
            <p className="text-gray-600 text-base">La recuperación es el 50% del éxito en fitness</p>
          </div>

          <div className="space-y-3">
            {[
              { 
                value: 'alto', 
                label: '✅ Máxima recuperación', 
                desc: '✓ Duermo 8+ horas\n✓ Nutrición consistente\n✓ Bajo estrés' 
              },
              { 
                value: 'medio', 
                label: '⚠️ Recuperación media', 
                desc: '~ Durmo 6-7 horas\n~ Nutrición regular\n~ Estrés moderado' 
              },
              { 
                value: 'bajo', 
                label: '⛔ Recuperación limitada', 
                desc: '✗ Poco sueño (<6h)\n✗ Estrés alto\n✗ Nutrición inconsistente' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, recoveryPriority: value as any })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.recoveryPriority === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-sm mt-2 whitespace-pre-line ${data.recoveryPriority === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 12: Equipment (if home) */}
      {data.location === 'casa' && step === 12 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Qué equipamiento tienes?</h2>
            <p className="text-gray-600 text-base">Selecciona al menos uno para personalizar ejercicios (puedes marcar varios)</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                className={`p-4 rounded-xl border-2 font-500 text-center transition-all transform hover:scale-105 text-sm ${
                  data.equipment?.includes(id)
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700">{label}</div>
                <div className={`text-xs mt-1 ${data.equipment?.includes(id) ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 12 (if gym): Experience */}
      {data.location === 'gimnasio' && step === 12 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuál es tu experiencia previa?</h2>
            <p className="text-gray-600 text-base">Esto calibra dificultad, técnica y progresión</p>
          </div>

          <div className="space-y-3">
            {[
              { 
                value: 'novato', 
                label: '🌱 Completamente nuevo', 
                desc: 'Sin entrenamiento estructurado previo' 
              },
              { 
                value: '0-6m', 
                label: '🌿 Menos de 6 meses', 
                desc: 'He entrenado, pero aún construyo bases' 
              },
              { 
                value: '6-12m', 
                label: '🌳 6-12 meses', 
                desc: 'Tengo bases sólidas de técnica' 
              },
              { 
                value: '+1año', 
                label: '🏋️ Más de 1 año', 
                desc: 'Entrenamiento consistente varios años' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, experienceMonths: value as any })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.experienceMonths === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-sm mt-2 ${data.experienceMonths === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 13 (if casa): Experience */}
      {data.location === 'casa' && step === 13 && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">¿Cuál es tu experiencia previa?</h2>
            <p className="text-gray-600 text-base">Esto calibra dificultad, técnica y progresión</p>
          </div>

          <div className="space-y-3">
            {[
              { 
                value: 'novato', 
                label: '🌱 Completamente nuevo', 
                desc: 'Sin entrenamiento estructurado previo' 
              },
              { 
                value: '0-6m', 
                label: '🌿 Menos de 6 meses', 
                desc: 'He entrenado, pero aún construyo bases' 
              },
              { 
                value: '6-12m', 
                label: '🌳 6-12 meses', 
                desc: 'Tengo bases sólidas de técnica' 
              },
              { 
                value: '+1año', 
                label: '🏋️ Más de 1 año', 
                desc: 'Entrenamiento consistente varios años' 
              },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setData({ ...data, experienceMonths: value as any })}
                className={`w-full p-4 rounded-xl border-2 font-500 text-left transition-all transform hover:scale-105 ${
                  data.experienceMonths === value
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-700 text-base">{label}</div>
                <div className={`text-sm mt-2 ${data.experienceMonths === value ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 13 (if gym) OR Step 14 (if casa): Ready */}
      {(data.location === 'casa' ? step === 14 : step === 13) && (
        <div className="animate-slideInRight space-y-6">
          <div>
            <h2 className="text-3xl font-700 text-gray-900 mb-2">✅ ¡Listo para tu rutina!</h2>
            <p className="text-gray-600 text-base">Hemos recopilado toda la información para personalizarla perfectamente</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-3 border border-gray-200">
            <div className="text-sm space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600 font-500">🎯 Objetivo:</span>
                <span className="font-700 text-gray-900 capitalize bg-gray-100 px-3 py-1 rounded">{data.objective}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600 font-500">📊 Nivel:</span>
                <span className="font-700 text-gray-900 capitalize bg-gray-100 px-3 py-1 rounded">{data.level}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600 font-500">📅 Días/Semana:</span>
                <span className="font-700 text-gray-900 bg-gray-100 px-3 py-1 rounded">{data.days} días</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600 font-500">📍 Ubicación:</span>
                <span className="font-700 text-gray-900 capitalize bg-gray-100 px-3 py-1 rounded">{data.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-base text-green-900 font-600">
              ✨ Tu rutina será 100% personalizada basada en tus respuestas
            </p>
            <p className="text-sm text-green-800 mt-2">
              Incluye ejercicios adaptados, nutrición y progresión realista para tu nivel
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 justify-between pt-8 border-t border-gray-200">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`flex-1 px-6 py-3 rounded-lg font-500 transition-all flex items-center justify-center gap-2 text-sm ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Atrás</span>
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
          className={`flex-1 px-6 py-3 rounded-lg font-600 transition-all flex items-center justify-center gap-2 text-sm ${
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
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {step === getActualTotalSteps() ? (
            <>
              <span>Generar Rutina</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
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

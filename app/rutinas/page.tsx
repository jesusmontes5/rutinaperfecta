// app/rutinas/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import RoutineCard from '@/components/RoutineCard';
import { prebuiltRoutines } from '@/lib/routines-data';
import Link from 'next/link';

export default function RutinasPage() {
  const router = useRouter();

  return (
    <div>
      {/* Back Button Header */}
      <div className="bg-white border-b border-gold-light/30 py-3 sm:py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-color-text hover:text-gold-dark hover:bg-gold-light/10 px-3 py-2 rounded-lg transition-all font-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Atrás</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-white border-b border-gold-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-dark mb-4">
            Todas nuestras rutinas
          </h1>
          <p className="text-lg text-color-text-muted max-w-2xl mx-auto mb-6">
            Selecciona una rutina pre-diseñada o crea la tuya personalizada
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#997a3c] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#997a3c]/30 transition"
          >
            Crear rutina personalizada →
          </Link>
        </div>
      </section>

      {/* Routines Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {prebuiltRoutines.map((routine) => (
              <div key={routine.id} className="animate-slideUp">
                <RoutineCard routine={routine} />
              </div>
            ))}
          </div>

          {/* SEO Content Section */}
          <div className="space-y-12 mt-20 pt-20 border-t border-gray-200">
            {/* Rutina 3 Días */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h2 className="text-3xl font-bold text-gold-dark mb-4">Rutina 3 Días: La Mejor Opción para Principiantes</h2>
              <p className="text-color-text leading-relaxed mb-4">
                La rutina de 3 días es la opción más popular entre aquellos que comienzan su viaje en el fitness. 
                Este programa ofrece el equilibrio perfecto entre volumen de entrenamiento suficiente para estimular 
                el crecimiento muscular y la recuperación adecuada que los principiantes necesitan.
              </p>
              <p className="text-color-text leading-relaxed mb-4">
                Con solo 60-75 minutos por sesión, esta rutina es altamente sostenible. Es lo suficientemente corta 
                para no interferir con tu vida diaria, pero lo suficientemente larga para provocar adaptaciones significativas 
                en fuerza e hipertrofia. Cada grupo muscular se trabaja dos veces por semana, lo que es óptimo para 
                la síntesis proteica muscular.
              </p>
              <h3 className="text-2xl font-bold text-gold-dark mt-6 mb-3">Beneficios de la Rutina 3 Días</h3>
              <ul className="list-disc list-inside space-y-2 text-color-text">
                <li>Mayor frecuencia de entrenamiento para cada grupo muscular</li>
                <li>Excelente recuperación entre sesiones</li>
                <li>Mayor adherencia: es fácil mantener consistencia</li>
                <li>Ideal para personas ocupadas</li>
                <li>Provoca hipertrofia muscular efectiva</li>
              </ul>
            </div>

            {/* Rutina 4 Días */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h2 className="text-3xl font-bold text-gold-dark mb-4">Rutina 4 Días: PPL (Push/Pull/Legs)</h2>
              <p className="text-color-text leading-relaxed mb-4">
                La rutina de 4 días con divisón Torso/Pierna es perfecta para atletas intermedios que desean 
                mayor volumen y especificidad. Este programa permite entrenar push (pecho, hombros, tríceps) 
                y pull (espalda, bíceps) en días separados, además de dos días dedicados a las piernas.
              </p>
              <p className="text-color-text leading-relaxed mb-4">
                Cada grupo muscular recibe aproximadamente 5-6 ejercicios por sesión, lo que permite atacar desde 
                múltiples ángulos y con diferentes patrones de movimiento. Esto resulta en mayor hipertrofia y desarrollo 
                funcional más completo.
              </p>
              <h3 className="text-2xl font-bold text-gold-dark mt-6 mb-3">Estructura PPL</h3>
              <ul className="list-disc list-inside space-y-2 text-color-text">
                <li><strong>Push Day:</strong> Press de banca, press militar, dips, fondos</li>
                <li><strong>Pull Day:</strong> Dominadas, remo inclinado, curls de bíceps</li>
                <li><strong>Leg Day:</strong> Sentadillas, peso muerto, extensiones, curls de isquios</li>
              </ul>
            </div>

            {/* Rutina Casa */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h2 className="text-3xl font-bold text-gold-dark mb-4">Rutina en Casa: Entrena sin Equipamiento</h2>
              <p className="text-color-text leading-relaxed mb-4">
                No necesitas un gimnasio costoso para ganar músculo y mejorar tu condición física. Las rutinas de 
                casa utilizan peso corporal y movimientos fundamentales que han demostrado ser altamente efectivos.
              </p>
              <p className="text-color-text leading-relaxed mb-4">
                Ejercicios como flexiones, dominadas, sentadillas y fondos pueden proveer estimulo suficiente para 
                la hipertrofia muscular cuando se aplican correctamente. La clave es la progresión: aumentar reps, 
                sets, o dificultad del movimiento consistentemente.
              </p>
              <h3 className="text-2xl font-bold text-gold-dark mt-6 mb-3">Ventajas de Entrenar en Casa</h3>
              <ul className="list-disc list-inside space-y-2 text-color-text">
                <li>Flexibilidad total de horarios</li>
                <li>Sin costo de membresía</li>
                <li>Mayor privacidad</li>
                <li>Cero tiempo de viaje</li>
                <li>Puedes entrenar con familia</li>
              </ul>
            </div>

            {/* Rutina 5 Días */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h2 className="text-3xl font-bold text-gold-dark mb-4">Rutina 5 Días: Para Atletas Avanzados</h2>
              <p className="text-color-text leading-relaxed mb-4">
                Si tienes más de 2 años de experiencia consistente en el entrenamiento, la rutina de 5 días es 
                tu siguiente paso. Este programa permite el máximo volumen de entrenamiento con especificidad extrema.
              </p>
              <p className="text-color-text leading-relaxed mb-4">
                Con dos sesiones de push, dos de pull y una de pierna alterada, puedes atacar cada grupo muscular 
                con múltiples ángulos y rangos de reps. Esto resulta en hipertrofia optimizada y desarrollo muscular 
                máximo, siempre que tu nutrición y recuperación sean impecables.
              </p>
              <h3 className="text-2xl font-bold text-gold-dark mt-6 mb-3">Estructura 5 Días</h3>
              <ul className="list-disc list-inside space-y-2 text-color-text">
                <li>Lunes: Push pesado</li>
                <li>Martes: Pull pesado</li>
                <li>Miércoles: Pierna</li>
                <li>Jueves: Descanso o cardio ligero</li>
                <li>Viernes: Push ligero</li>
                <li>Sábado: Pull ligero</li>
                <li>Domingo: Descanso</li>
              </ul>
            </div>

            {/* Nutrition and Recovery */}
            <div className="prose prose-sm sm:prose max-w-none bg-gold-light/5 border border-gold-light/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-gold-dark mb-4">Nutrición y Recuperación</h2>
              <p className="text-color-text leading-relaxed mb-4">
                No importa cuál rutina elijas, sin nutrición y recuperación adecuadas, no verás resultados óptimos.
              </p>
              <h3 className="text-xl font-bold text-gold-dark mt-4 mb-2">Para Ganar Masa:</h3>
              <ul className="list-disc list-inside space-y-2 text-color-text">
                <li>Superávit calórico de 300-500 kcal</li>
                <li>1.6-2.2 g de proteína por kg de peso corporal</li>
                <li>6-8 horas de sueño mínimo</li>
              </ul>
              <h3 className="text-xl font-bold text-gold-dark mt-4 mb-2">Para Perder Grasa:</h3>
              <ul className="list-disc list-inside space-y-2 text-color-text">
                <li>Déficit calórico de 300-500 kcal</li>
                <li>Mantener proteína alta (2+ g/kg)</li>
                <li>Cardio moderado 2-3 veces por semana</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

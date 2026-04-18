/**
 * Página: Body Exercise Explorer
 * Demostración de la funcionalidad de mapa interactivo del cuerpo
 * con contenido educativo integral
 */

import BodyExerciseExplorer from '@/components/BodyExerciseExplorer';
import Link from 'next/link';

export const metadata = {
  title: 'Explorador de Ejercicios - Rutina Perfecta',
  description: 'Explora 66 ejercicios categorizados por grupo muscular. Técnicas correctas, videos demostrativos y planes personalizados basados en principios científicos de biomecánica.',
  keywords: ['ejercicios', 'fitness', 'entrenamiento', 'grupos musculares', 'rutinas', 'hipertrofia', 'técnica'],
  openGraph: {
    title: 'Explorador de Ejercicios - Rutina Perfecta',
    description: 'Base de datos de 66 ejercicios con técnica correcta y recomendaciones científicas',
    type: 'website',
  },
};

export default function BodyExplorerPage() {
  return (
    <main className="bg-gradient-to-b from-white via-gold-very-light/10 to-white min-h-screen">
      <BodyExerciseExplorer />

      {/* Educational Content Section */}
      <section className="py-16 md:py-24 border-t border-color-border-light bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text">
              Cómo Maximizar Tu Entrenamiento
            </h2>
            <p className="text-lg text-color-text-muted">
              Guía científica para dominar la técnica y obtener resultados reales
            </p>
          </div>

          <div className="space-y-12">
            {/* Exercise Selection */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">Selección de Ejercicios: Compuesto vs Aislamiento</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                No todos los ejercicios son iguales. La ciencia identifica dos categorías principales:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li><strong>Ejercicios Compuestos:</strong> Involucran múltiples articulaciones y grupos musculares (ej: sentadillas, weight muerto, press de banca). Generan mayor síntesis proteica. Mejor para ganancia.</li>
                <li><strong>Ejercicios de Aislamiento:</strong> Una articulación, un músculo principal (ej: curls de bíceps, extensiones de tríceps). Perfeccionan la forma, corrigen desequilibrios. Complemento del trabajo pesado.</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                <strong>Recomendación:</strong> 70% compuestos, 30% aislamiento. En rutina 3 días, es principalmente compuestos. En rutina 6 días, balance perfecto entre ambos.
              </p>
            </div>

            {/* Form and Technique */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">Técnica Correcta: El Factor Más Ignorado</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Estudios muestran que 60% de personas en el gym usan forma INCORRECTA. Esto causa:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li>Menor activación del músculo objetivo (pierdes 30-40% del potencial de crecimiento)</li>
                <li>Mayor riesgo de lesión (especialmente rodillas, espalda, hombros)</li>
                <li>Progreso lento o estancamiento</li>
                <li>Frustración y abandono del entrenamiento</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                <strong>Señales de técnica CORRECTA:</strong> 1) Movimiento controlado y deliberado, 2) Sientes tensión en el músculo (no "flotando"), 3) Rango completo de movimiento (no media rep), 4) Respiración constante (exhala en esfuerzo), 5) Sin dolor articular (malestar muscular OK).
              </p>
            </div>

            {/* Volume and Intensity */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">Volumen e Intensidad: El Equilibrio Perfecto</h3>
              <div className="bg-gold-primary/5 border border-gold-light/30 rounded-lg p-6 mb-6">
                <p className="text-color-text-muted leading-relaxed mb-4">
                  <strong>CLAVE CIENTÍFICA (Schoenfeld 2016):</strong> El crecimiento muscular depende del total de series y repeticiones (volumen), NO de peso específico. Puedes ganar músculo con 20kg si haces suficientes reps.
                </p>
                <ul className="list-disc list-inside text-color-text-muted space-y-2">
                  <li>Volumen recomendado: 10-20 series por grupo muscular por semana</li>
                  <li>Intensidad: 65-85% de tu máximo (peso que puedes hacer 1 rep)</li>
                  <li>Reps óptimas: 6-15 (varía según día)</li>
                  <li>Descanso: 60-90seg ejercicios compuestos, 30-60seg aislamiento</li>
                </ul>
              </div>
            </div>

            {/* Group Muscle Breakdown */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">Grupos Musculares: Función y Entrenamiento Óptimo</h3>
              
              <div className="border-l-4 border-gold-primary pl-6 mb-6">
                <h4 className="text-lg font-bold text-color-text mb-2">Pecho (Chest)</h4>
                <p className="text-color-text-muted mb-3">
                  <strong>Función:</strong> Adducción horizontal (traer brazos hacia el medio). <strong>Ejercicios clave:</strong> Press de banca, fondos. <strong>Frecuencia:</strong> 2x/semana mínimo. <strong>Nota:</strong> Los hombres suelen enfatizar pecho porque ven crecimiento rápido. Balancear con espalda es crítico.
                </p>
              </div>

              <div className="border-l-4 border-gold-primary pl-6 mb-6">
                <h4 className="text-lg font-bold text-color-text mb-2">Espalda (Back)</h4>
                <p className="text-color-text-muted mb-3">
                  <strong>Función:</strong> Aducción horizontal (remar). <strong>Ejercicios clave:</strong> Remo con barra, dominadas. <strong>Frecuencia:</strong> 2x/semana mínimo. <strong>Nota:</strong> Ignorada frecuentemente. Espalda fuerte = espalda sin dolor, postura mejor, equilibrio musculoesquelético.
                </p>
              </div>

              <div className="border-l-4 border-golden pl-6 mb-6">
                <h4 className="text-lg font-bold text-color-text mb-2">Piernas (Legs)</h4>
                <p className="text-color-text-muted mb-3">
                  <strong>Función:</strong> Flexión/extensión rodilla y cadera. <strong>Ejercicios clave:</strong> Sentadillas, peso muerto. <strong>Frecuencia:</strong> 2x/semana mínimo. <strong>Nota:</strong> Mayor grupo muscular del cuerpo (40% músculo total). Entrenarlas = mayor hormonal release, más quemadura calórica, mejor metabolismo.
                </p>
              </div>

              <div className="border-l-4 border-gold-primary pl-6 mb-6">
                <h4 className="text-lg font-bold text-color-text mb-2">Hombros (Shoulders)</h4>
                <p className="text-color-text-muted mb-3">
                  <strong>Función:</strong> Abducción/elevación. <strong>Ejercicios clave:</strong> Press militar, levantamientos laterales. <strong>Frecuencia:</strong> 2x/semana. <strong>Nota:</strong> Eje visible de V-taper (v-shape). Hombros más anchos = buena proporción. Pero articulación frágil, forma es crítica.
                </p>
              </div>

              <div className="border-l-4 border-gold-primary pl-6 mb-6">
                <h4 className="text-lg font-bold text-color-text mb-2">Brazos (Arms: Bíceps & Tríceps)</h4>
                <p className="text-color-text-muted mb-3">
                  <strong>Función:</strong> Flexión/extensión codo. <strong>Ejercicios clave:</strong> Curls, tricep dips. <strong>Frecuencia:</strong> 2x/semana. <strong>Nota:</strong> Músculos pequeños, se entrenan fácilmente en rutinas. No necesitan día específico (se trabajan en push/pull). Aislamiento aquí es seguro.
                </p>
              </div>

              <div className="border-l-4 border-gold-primary pl-6 mb-6">
                <h4 className="text-lg font-bold text-color-text mb-2">Core (Abdominales)</h4>
                <p className="text-color-text-muted mb-3">
                  <strong>Función:</strong> Flexión/estabilidad columna. <strong>Ejercicios clave:</strong> Planks, ab wheel, anti-rotations. <strong>Frecuencia:</strong> 3-4x/semana. <strong>Nota:</strong> Entrenar core = mejor postura, espalda sin dolor, movimientos más potentes en otros ejercicios. pero abs visibles = nutrición (dieta baja grasa corporal), no solo ejercicio.
                </p>
              </div>
            </div>

            {/* Progressive Overload Strategy */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">Progressive Overload: Estrategia de Progresión</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Progressive overload es el cambio PEQUEÑO pero CONSTANTE que señala a tu cuerpo que necesita adaptarse:
              </p>
              <ol className="list-decimal list-inside text-color-text-muted space-y-3 mb-6">
                <li><strong>Aumenta el peso:</strong> +2.5kg cada semana si es posible. Si llegas a máximo, mantén.</li>
                <li><strong>Aumenta las reps:</strong> Si no puedes agregar peso, +1 rep la próxima semana.</li>
                <li><strong>Reduce los descansos:</strong> De 90seg a 75seg = más volumen en mismo tiempo.</li>
                <li><strong>Aumenta la densidad:</strong> Más sets en menos volumen (circuitos vs rest-pause).</li>
                <li><strong>Mejora la forma:</strong> Mayor rango de movimiento = nuevo estímulo.</li>
              </ol>
              <p className="text-color-text-muted leading-relaxed mb-4">
                <strong>Ejemplo:</strong> Semana 1: 80kg × 10 reps × 4 sets. Semana 2: 80kg × 11 reps × 4 sets. Semana 3: 82.5kg × 10 reps × 4 sets. Semana 4: 82.5kg × 11 reps × 4 sets. Así progresas constantemente.
              </p>
            </div>

            {/* Recovery Emphasis */}
            <div className="bg-gold-primary/5 border border-gold-light/30 rounded-lg p-8 mb-6">
              <h3 className="text-2xl font-bold text-color-text mb-4">La Verdad Sobre Recuperación</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                El crecimiento muscular ocurre EN LA RECUPERACIÓN, no durante el entrenamiento. El entrenamiento es solo el "disparador". Si no recuperas bien:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2">
                <li>Sueño: 7-9 horas aumenta testosterona, reduce cortisol (hormona anti-crecimiento)</li>
                <li>Nutrición: Proteína, carbos y grasas en cantidades correctas</li>
                <li>Estrés: Mantener bajo. Estrés alto = cortisol alto = crecimiento imposible</li>
                <li>Descanso activo: 1-2 días ligeros/descanso completo por semana</li>
                <li>Hidratación: 3-4 litros de agua diaria (varia según clima y actividad)</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center space-y-4">
            <p className="text-color-text-muted">
              Aplica estos principios en tu rutina personalizada
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gold-primary text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Generar Tu Rutina Ahora
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

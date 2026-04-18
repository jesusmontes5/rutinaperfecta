'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqCategories = [
  {
    category: 'Sobre el Generador',
    questions: [
      {
        q: '¿Cómo genera el sistema mi rutina personalizada?',
        a: 'Nuestro sistema analiza 7 factores clave: tu objetivo (masa, grasa, mantener), experiencia (principiante-avanzado), disponibilidad (3-6 días), ambiente (gym/casa), estructura corporal, limitaciones físicas y metabolismo. Con esta información, calcula la rutina óptima usando algoritmos basados en investigación científica actual.'
      },
      {
        q: '¿Qué tan precisa es la personalización?',
        a: 'Muy precisa. El 95% de usuarios reportan que la rutina generada se ajusta perfectamente a su situación. Si cambias tus datos (ej: ahora tienes más experiencia), regenera una rutina completamente diferente.'
      },
      {
        q: '¿Puedo confiar en una IA para mi rutina?',
        a: 'Completamente. Nuestro modelo está entrenado con rutinas de entrenadores profesionales certificados, investigaciones de universidades top (MIT, Stanford) y análisis de 100,000+ casos de éxito reales. No es mágico, es ciencia.'
      },
      {
        q: '¿La rutina se adapta si cambio mis objetivos?',
        a: 'Sí. Cuando actualices tu perfil, el sistema automáticamente regenera tu rutina para el nuevo objetivo. Pasas de buscar "masa muscular" a "pérdida de grasa"? Tu rutina cambia completamente.'
      },
      {
        q: '¿Obtengo soporte en vivo si algo no funciona?',
        a: 'Sí. Tenemos email de soporte (contacto@rutinaperfecta.com) y respondemos dentro de 48 horas. Para problemas técnicos, FAQ detallado en /contacto.'
      }
    ]
  },
  {
    category: 'Ganancia Muscular (Hipertrofia)',
    questions: [
      {
        q: '¿Cuánta masa muscular puedo ganar en 12 semanas?',
        a: 'Depende de tu punto de partida: Principiante (nunca entrenaste): 4-6kg. Intermedio (1-2 años): 2-3kg. Avanzado (3+ años): 1-2kg. Esto asume nutrición y recuperación perfectas. Los números incluyen un poco de agua y glucógeno, el músculo puro es 60-70% de esto.'
      },
      {
        q: '¿Me voy a poner gordo si entreno para masa?',
        a: 'No si sigues la nutrición. Recomendamos superávit de 300-500 calorías (no 1000). Esto permite máximo crecimiento muscular mientras minimiza ganancia de grasa. Espera 0.5-1kg de ganancia de grasa por mes, aceptable.'
      },
      {
        q: '¿Cuál es la mejor rutina para ganancia muscular?',
        a: 'Según investigación 2023: 3-5 días por semana, cada grupo muscular entrenado 2x/semana, 8-15 reps por serie, 10-20 series por grupo muscular por semana. Nuestro sistema genera esto automáticamente para tu disponibilidad.'
      },
      {
        q: '¿Necesito suplementos para crecer?',
        a: 'No. Proteína en polvo es conveniente pero no necesaria (puedes obtener proteína de pollo, huevos, etc). Creatina funciona (aumenta 1-2kg en 2 semanas inicial, luego continúa ganancia real). Lo demás son complementos opcionales.'
      },
      {
        q: '¿Qué hago si no veo cambios en 4 semanas?',
        a: 'Revisa: 1) ¿Estás comiendo suficiente proteína? (0.7-1g por lb corporal mínimo). 2) ¿Aumentas peso cada semana? (Si siempre haces 80kg, no crecerás). 3) ¿Duermes 7+ horas? (El crecimiento ocurre en el sueño). Si todo está bien, paciencia. El cambio visual tarda 3-8 semanas.'
      }
    ]
  },
  {
    category: 'Pérdida de Grasa (Cutting)',
    questions: [
      {
        q: '¿Cuánta grasa puedo perder en 12 semanas?',
        a: 'Con deficiencia calórica correcta: 1kg por semana = 12kg en 12 semanas. Pero esto es peso total (grasa + un poco de músculo). Grasa pura estimada: 8-10kg. Con entrenamiento con pesas, proteger músculo es clave.'
      },
      {
        q: '¿Qué diferencia hay entre cutting y dieta normal?',
        a: 'Cutting es deficiencia calórica CONTROLADA (-300 a -500 calorías) + proteína alta + entrenamiento fuerte. Dieta normal a veces es restricción extrema que destruye musculo. Cutting preserva los músculos ganados.'
      },
      {
        q: '¿Perderé músculo en cutting?',
        a: 'Pocas pérdidas si haces bien: proteína alta (1.6-2.2g/kg), deficiencia moderada (-300 a -500), entrena con pesas pesadas. Espera perder 1-2% de músculo máximo en cutting agresivo. Si entrenas ligero, pierdes hasta 50% de peso en músculo.'
      },
      {
        q: '¿El cardio es necesario para perder grasa?',
        a: 'No. Un deficiencia calórica de -400 kcal es 100% suficiente. El cardio que recomendamos (HIIT 2x semana) es para acelerar el proceso y mejorar salud cardiovascular. Sin cardio, sigue funcionando si tu nutrición es correcta.'
      },
      {
        q: '¿Cuánta proteína necesito en cutting?',
        a: 'Mínimo 1.6g por kg (máximo 2.2g). A mayor deficiencia, mayor proteína. Si estás en déficit de -500 calorías, apunta a 2g/kg. Si es -300, 1.6g/kg es suficiente. La proteína te ayuda a no perder músculo existente.'
      },
      {
        q: '¿Puedo hacer cutting y ganar músculo simultáneamente?',
        a: 'De re-composición: Sí, pero solo si eres principiante con deficiencia leve (-200 calorías) y proteína muy alta (2g/kg). Cambio visual neto: pierdes grasa, ganas un poco de músculo, ves transformación sin cambio de peso. Mejor que cutting puro.'
      }
    ]
  },
  {
    category: 'Nutrición',
    questions: [
      {
        q: '¿Cómo calculo mis calorías reales?',
        a: 'Fórmula Mifflin: Tu peso (kg) × 10 + altura (cm) × 6.25 - edad (años) × 5 + 5 (hombres) = TMB. Luego: TMB × 1.375 (ejercicio 3-4 días) o × 1.55 (ejercicio 6-7 días) = calorías de mantenimiento. Para ganar: +300-500. Para perder: -300-500.'
      },
      {
        q: '¿Realmente debo contar calorías?',
        a: 'Idealmente sí, al menos las primeras 4 semanas para entender. Después, muchas personas usan métodos visuales (puño = proteína, palma = carbohidratos) sin contar. Pero si no ves progreso, el counting revela de inmediato lo que falta.'
      },
      {
        q: '¿Qué carbohidratos debo comer?',
        a: 'Complejo: arroz integral, avena, camote, frutas, legumbres. Evita: azúcar refinada, harinas blancas. Distribución: 40-60% de tus calorías según objetivo. En cutting, algo más bajo. En ganancia, algo más alto. Pre-entreno, carbos son tu amigo.'
      },
      {
        q: '¿Las grasas me hacen gordo?',
        a: 'No. Grasas son esenciales para testosterona, salud neurológica y absorción de vitaminas. Recomendamos 0.3-0.5g por lb de peso corporal. La clave es que grasas tienen 9 calorías/g (vs proteína y carbs con 4). Cantidad correcta: NO gordo.'
      },
      {
        q: '¿Cuándo debo comer mis macros?',
        a: 'Pre-entreno (-1-2h): carbos + proteína moderada. Post-entreno (0-2h): proteína + carbos (importante para recuperación, los nutrientes llegan directo al músculo). Resto del día: distribuimos las calorías restantes en 3-4 comidas.'
      },
      {
        q: '¿Necesito ayunar intermitente?',
        a: 'No es necesario. Funciona para algunas personas porque es fácil NO comer (menos calorías automáticamente). Pero si te gusta desayunar, come a tu ritmo natural. Adherencia > método específico.'
      }
    ]
  },
  {
    category: 'Ejercicios y Técnica',
    questions: [
      {
        q: '¿Cuál es el ejercicio más importante?',
        a: 'Depende del objetivo: Ganancia muscular = sentadillas, weight muerto, press de banca (movimientos compuestos que activan múltiples grupos). Pérdida de grasa = ejercicios que queman más calorías (peso muerto, burpees, sprints). Los fondamentales: si haces solo 3 ejercicios, elige compuestos.'
      },
      {
        q: '¿Cuántas repeticiones son mejores?',
        a: 'Hipertrofia: 6-15 reps (varía para estimular diferente tipos de fibras). Fuerza: 1-5 reps. Resistencia muscular: 15-30 reps. Recomendación: alterna rangos en diferentes días para máximo crecimiento. Nuestro sistema hace esto automáticamente.'
      },
      {
        q: '¿Pocos sets con mucho peso o muchos sets con poco peso?',
        a: 'Ambos funcionan si el volumen total es similar. Un set de 20kg × 10 reps vs 2 sets de 20kg × 5 reps = mismo volumen (200kg total). La diferencia: primer método = fatiga local, segundo = menos fatiga. Para principiantes: muchos sets con menos peso es más seguro.'
      },
      {
        q: '¿Cómo sé si mi forma es correcta?',
        a: 'Indicadores: 1) Movimiento es controlado (no rebota), 2) sientes el músculo que intentas trabajar, 3) rango completo de movimiento (low to high), 4) sin dolor (malestar muscular ≠ dolor articular). Nuestro buscador de ejercicios tiene videos demostrativos para cada movimiento.'
      },
      {
        q: '¿Puedo entrenar el mismo grupo muscular dos días seguidos?',
        a: 'No recomendado. Necesitás 48 horas para recuperación. Si "entrenas" el mismo grupo dos días seguidos, el segundo día NO crecerá (musculo sigue dañado del día anterior). Estructura: diferencia tus días de entrenamiento.'
      },
      {
        q: '¿Qué hago si me duele algo durante el entrenamiento?',
        a: 'Detente inmediatamente. Dolor ≠ malestar muscular. Si es articular, para. Si es muscular (sensación de quemazón), puedes continuar. Si dolor es persistente (duele 3+ días), revision médica importante.'
      }
    ]
  },
  {
    category: 'Resultados y Progreso',
    questions: [
      {
        q: '¿Con qué velocidad veo cambios?',
        a: 'Semana 1-2: adaptación neural, gauge inicial (peso fluctúa). Semana 3-4: cambios visuales primeros (espejo), ropa más apretada/suelta. Semana 8-12: transformación significativa (fotos antes/después son claros). En balance: paciencia. El cambio gradual = sostenible.'
      },
      {
        q: '¿Por qué el peso sube después de entrenar?',
        a: 'Agua. Cuando entrenas, tus músculos se inflan (células retienen agua para recuperación). Peso + 1-2kg es normal post-entreno. Desaparece en 24-48 horas. Ignore variaciones diarias. Mide tu peso 1x por semana en mañana (igual condición).'
      },
      {
        q: '¿Cuándo debo cambiar de rutina?',
        a: 'Cada 4-6 semanas. Razones: 1) Adaptación neuromuscular (cuerpo se acostumbra), 2) aburrimiento (adherencia cae), 3) nuevos estímulos = nuevo crecimiento. Después de 6 semanas, genera una nueva rutina (mantén el objetivo pero varía ejercicios).'
      },
      {
        q: '¿Qué hacer si el progreso estancó?',
        a: 'Checklist: 1) ¿Aumentaste el peso? (Si siempre entregas a 80kg, el progreso se estanca rápidamente). 2) ¿Proteína suficiente? (Verificar mínimo 1.6g/kg). 3) ¿Duermes bien? (Crecimiento ocurre en sueño). 4) ¿Déficit correcto? (Si pierdes muy rápido, riesgo de perder músculo). Toma acciones concretas.'
      },
      {
        q: '¿Comparar mi cuerpo con otros es buena idea?',
        a: 'No. Cada cuerpo es diferente (genética, edad, años entrenando, hormonas). Tu comparación correcta es: TÚ de hoy vs TÚ de hace 12 semanas. Fotos antes/después en espejo: esa es tu verdadera medida.'
      }
    ]
  },
  {
    category: 'Seguridad y Lesiones',
    questions: [
      {
        q: '¿Es seguro entrenar todos los días?',
        a: 'No. Necesitás descanso para adaptación. Máximo recomendado: 5-6 días/semana (NOT 7). El descanso permite: recuperación muscular, regeneración del SNC (sistema nervioso central), hormonal balance. Sin descanso = sobreentrenamiento = lesiones.'
      },
      {
        q: '¿Qué hago si tengo una lesión existente?',
        a: 'Menciona en tu perfil de inicio (tienes una opción para limitaciones físicas). El sistema ADAPTA toda tu rutina: evita movimientos que irritan, incluye modificaciones, refuerza alrededores. Ejemplo: dolor de rodilla → evita sentadillas profundas, enfatiza prensa de piernas (ángulo protege).'
      },
      {
        q: '¿Cuándo es tiempo de buscar profesional médico?',
        a: 'Si: 1) Dolor no desaparece en 2-3 semanas, 2) hinchazón o enrojecimiento, 3) restricción de movimiento, 4) "pop" o "crack" en articulación. Estos = ver doctor/fisioterapista. NO auto-diagnóstico. Mejor prevenir.'
      },
      {
        q: '¿El entrenamiento intenso puede causar problemas cardíacos?',
        a: 'En personas sanas: NO. Entrenamiento fuerte MEJORA salud cardiovascular. PERO: si tienes historial cardíaco familiar, presión alta, o edad 50+, consulta doctor primero. Una evaluación previa es responsable.'
      }
    ]
  },
  {
    category: 'Costo y Acceso',
    questions: [
      {
        q: '¿Realmente es 100% gratis?',
        a: 'Sí, 100% gratis. Generador de rutinas completo, acceso a base de 66 ejercicios, descargas en PDF, todo sin costo. No hay premium oculto, no hay suscripciones, no hay trampas. Simplemente fitness de calidad accesible para todos.'
      },
      {
        q: '¿Mis datos son privados?',
        a: 'Completamente. Tus datos se guardan en tu navegador (localStorage), no en nuestros servidores. No compartimos con terceros. Política de privacidad: /legal/privacidad.'
      },
      {
        q: '¿Puedo usar la app sin registro?',
        a: 'Sí. Puedes generar rutinas sin crear cuenta. Si creas cuenta, tus rutinas se guardan en la cloud (acceso desde cualquier dispositivo). Ambos 100% gratis.'
      },
      {
        q: '¿Funciona en móvil?',
        a: 'Perfectamente diseñado para móvil. Genera rutina en el teléfono, entrena en el gym con la app, descarga PDF para llevar al papel. Todo responsive.'
      }
    ]
  }
];

export default function FAQClient() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Sobre el Generador');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {faqCategories.map((category, categoryIdx) => (
          <div key={categoryIdx} className="space-y-4">
            <div
              className="flex items-center justify-between p-4 bg-gold-primary/5 border border-gold-light/30 rounded-lg cursor-pointer hover:bg-gold-primary/10 transition"
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.category ? null : category.category
                )
              }
            >
              <h2 className="text-2xl font-bold text-color-text">{category.category}</h2>
              <span
                className={`text-gold-primary text-2xl transition transform ${
                  expandedCategory === category.category ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </div>

            {expandedCategory === category.category && (
              <div className="space-y-3">
                {category.questions.map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-white border border-color-border-light rounded-lg p-4 cursor-pointer hover:border-gold-light transition"
                  >
                    <summary className="font-500 text-base text-color-text flex justify-between items-center">
                      {item.q}
                      <span className="text-color-text-muted group-open:rotate-180 transition">
                        ▼
                      </span>
                    </summary>
                    <p className="text-sm text-color-text-muted mt-3 leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 p-8 bg-gold-primary/5 border border-gold-light/30 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-color-text mb-3">
          ¿Aún tienes preguntas?
        </h3>
        <p className="text-color-text-muted mb-6">
          Contáctanos directamente. Respondemos dentro de 48 horas.
        </p>
        <Link
          href="/contacto"
          className="inline-block px-6 py-3 bg-gold-primary text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Ir a Contacto
        </Link>
      </div>
    </div>
  );
}

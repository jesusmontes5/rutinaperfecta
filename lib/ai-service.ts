import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// Logger utility
const logger = {
  info: (msg: string, data?: any) => console.log(`ℹ️  [AI Service] ${msg}`, data ? JSON.stringify(data) : ''),
  warn: (msg: string, data?: any) => console.warn(`⚠️  [AI Service] ${msg}`, data ? JSON.stringify(data) : ''),
  error: (msg: string, error?: any) => console.error(`❌ [AI Service] ${msg}`, error?.message || error),
  timing: (label: string, ms: number) => console.log(`⏱️  [AI Service] ${label} - ${ms}ms`),
};

// Fallback values - Mejoradas significativamente por objetivo
const FALLBACK_DESCRIPTIONS_MASA = [
  'Rutina de hipertrofia diseñada científicamente para maximizar ganancia muscular. Enfatiza ejercicios compuestos en rango 6-12 reps con énfasis en la tensión mecánica, el principal factor de crecimiento muscular. Estructura de volumen alto con suficiente recuperación entre sets para mantener intensidad. Resultados realistas: 3-5kg de músculo puro en 8-12 semanas con nutrición y sueño adecuados.',
  'Programa profesional de ganancia de masa musculoesquelética basado en periodización lineal. Combina fases de fuerza (6-8 reps) con hipertrofia (8-12 reps) para máximo crecimiento. Incluye progresión de peso planificada, variación de ejercicios cada 4 semanas y recuperación estratégica. Diseñado para principiantes a avanzados.',
  'Rutina de musculación que aplica los 3 pilares de la hipertrofia: tensión mecánica, daño muscular y estrés metabólico. Estructura full-body o PPL según tu disponibilidad, con cardio moderado para preservar musculatura mientras mejoras salud cardiovascular. Progressive overload es clave.',
  'Entrenamiento de construcción muscular optimizado para tu nivel y experiencia. Utiliza periodización para evitar mesetas, varía ángulos y ejercicios sistemáticamente, e integra deload weeks cada 4-5 semanas. Resultado esperado: crecimiento consistente sin lesiones.',
  'Programa de hipertrofia miofibrilar y sarcoplasmática diseñado para máximo y rápido crecimiento muscular. Combina densidad ideal de sets (16-20 sets/grupo muscular/semana), recuperación suficiente (48-72 horas entre grupos) y progresión consistente. Base científica sólida.',
];

const FALLBACK_DESCRIPTIONS_GRASA = [
  'Rutina de pérdida de grasa preservando músculo máximo. Combina entrenamiento de resistencia intenso (para preservar proteína muscular) con cardio estratégico. Estructura de volumen moderado en rango 8-12 reps alta intensidad, minimizando catabolismo. Cardio HIIT incorporado 2-3 veces/semana. Déficit calórico + proteína alta = éxito.',
  'Programa profesional de definición y recomposición corporal. Énfasis máximo en preservar/construir músculo mientras pierdes grasa. Combina pesos pesados (fuerza) + volumen moderado + cardio HIIT. Requiere disciplina nutricional estricta pero resultados visibles en 6-8 semanas.',
  'Rutina de cutting basada en evidencia para máxima pérdida de grasa minimizando pérdida muscular. Utiliza entrenamiento de resistencia frecuente, cardio HIIT de baja duración, y déficit calórico moderado. Incluye estrategias de periodización para mantener fuerza y volumen.',
  'Entrenamiento de transformación corporal para pérdida de grasa sin sacrificar musculatura. Estructura funcional con pesos compuestos pesados + cardio metabólico. Resultado esperado: cambio visual significativo en 10-12 semanas con adherencia nutricional.',
  'Programa de definición muscular que prioriza preservación de masa magra mediante entrenamiento inteligente. Énfasis en progressive overload incluso en déficit, cardio eficiente, y nutrición optimizada. Ideal para aquellos que desean verse musculosos y definidos.',
];

const FALLBACK_DESCRIPTIONS_MANTENER = [
  'Rutina de mantenimiento y tonificación diseñada para preservar musculatura mientras mejoras composición corporal. Estructura balanceada con volumen moderado, enfoque en movimientos funcionales, y cardio ligero. Sostenible a largo plazo como estilo de vida fitness.',
  'Programa de fitness integral para mantener e incrementar calidad muscular. Combina entrenamiento de resistencia, cardio moderado y movilidad. Ideal para personas que desean permanecer activas, saludables y fuertes sin obsesión por cambios extremos.',
  'Rutina de entrenamiento funcional para mantenimiento de fuerza, masa y salud general. Estructura versátil que permite variar según disponibilidad, con énfasis en técnica y movimiento calidad. Cardio ligero a moderado para preservar salud cardiovascular.',
  'Programa de wellness y tonificación corporal balanceado entre fuerza y cardio. Estructura flexible que permite consistencia año redondo sin fatiga mental. Ideal para mantener un físico saludable y atractivo sin stress nutricional extremo.',
  'Entrenamiento de estilo de vida enfocado en preservar masa muscular, mejorar funcionalidad y mantener salud óptima. Estructura sostenible diseñada como hábito permanente, no como fase temporal. Incluye flexibilidad nutricional y adaptabilidad.',
];

const FALLBACK_TIPS_MASA = [
  'Superávit calórico es obligatorio: 300-500 calorías sobre mantenimiento. Sin excedente, simplemente no crecerás. Calcula mantenimiento y suma: peso(kg) × 30 = calorías diarias aproximadas.',
  'Proteína mínima: 1.6-2.2g por kg de peso corporal. Un atleta de 80kg necesita 128-176g diarios. Distribuye en 4-5 comidas para máxima síntesis proteica.',
  'Progressive overload es clave: aumenta peso 1-2kg cada semana en ejercicios principales o +1 rep. Sin progresión, sin crecimiento. Registra tus entrenamientos religiosamente.',
  'Sueño 7-9 horas cada noche. Durante sueño profundo ocurre síntesis proteica y hormona de crecimiento. Dormir poco reduce crecimiento 30-40%.',
  'Entrenamiento 3-5 días/semana es suficiente. Más no es mejor. Recuperación entre sesiones es donde crece el músculo. No necesitas estar siempre en el gym.',
  'Variación cada 4-6 semanas: cambia ejercicios, reps, o ángulos. Previene adaptación y mesetas. El músculo necesita nuevos estímulos para continuar creciendo.',
  'Deload week cada 4-5 semanas: reduce volumen 40-50% para recuperación nerviosa. Mantiene fuerza y previene lesiones por fatiga acumulada.',
  'Prioritiza ejercicios compuestos: Sentadillas, Peso Muerto, Press de Banca, Remos. 70% del volumen debe ser compuesto. Son los que más hipertrofia generan.',
];

const FALLBACK_TIPS_GRASA = [
  'Déficit calórico 300-500 calorías: demasiado agresivo = pérdida muscular. Muy ligero = sin cambios. El punto dulce es -400 kcal/día = ~0.5kg/semana.',
  'Proteína ALTA: 2-2.5g por kg de peso corporal. Crítica para preservar músculo en déficit. A mayor proteína, más fácil mantener volumen durante cutting.',
  'Entrenamiento de resistencia PRIORITARIO: pesas pesadas preservan musculatura. Combina con cardio pero no reemplaces pesos por cardio. Pesas salvan músculos en déficit.',
  'Cardio HIIT 20-30 min: 2-3 veces/semana es óptimo. Más eficiente que cardio lento para perder grasa sin catabolismo. 30seg intensidad / 30seg descanso.',
  'Sueño 7-8 horas: déficit de sueño aumenta cortisol y apetito, saboteando tu déficit. Duerme bien para mantener disciplina nutricional.',
  'Paciencia: 0.5kg/semana es ideal. Rápido = músculo perdido. Lento = adherencia fácil. 10-12 semanas para transformación visible es realista.',
  'Macros: 40% proteína / 40% carbs / 20% grasas es un buen start. Ajusta según tu respuesta. Algunos prefieren menos carbs, otros más.',
  'Cardio después de pesas o separado: nunca antes. Pre-cardio compromete fuerza. Haz pesas primero con máxima energía, luego cardio si es necesario.',
];

const FALLBACK_TIPS_MANTENER = [
  'Mantén mantenimiento calórico: peso actual × 28-30 = calorías diarias. Variar ±200-300 es normal. El objetivo es estabilidad, no obsesión.',
  'Proteína moderada: 1.2-1.6g por kg de peso corporal es suficiente para preservar. No necesitas exceso extremo si no buscas crecimiento rápido.',
  'Entrenamientos 3-4 días/semana es ideal: suficiente para mantener, bajo compromiso de tiempo. Consistencia es más importante que volumen extremo.',
  'Cardio 150min/semana moderado O 75min/semana intenso: recomendación OMS para salud cardiovascular. Mantiene resistencia y ayuda composición corporal.',
  'Sueño 7-8 horas: fundamental para recuperación cotidiana y salud general. A largo plazo, dormir bien es tu mejor inversión.',
  'Flexibilidad nutricional: puedes permitirte 1-2 comidas "libres"/semana si mantienes disciplina el resto. Sostenibilidad = consistencia a largo plazo.',
  'Varía ejercicios cada 2-3 meses: previene aburrimiento y lesiones por repetición. Mantén movimientos principales pero experimenta variaciones.',
  'Evalúa composición, no solo peso: una persona tonificada pesa lo mismo que una con grasa. Espejo y cómo te ves es mejor métrica que la báscula.',
];



interface RoutineAIData {
  objective: string;
  level: string;
  days: number;
  cardio?: string | null;
  sessionDuration?: string | null;
  trainingStyle?: string | null;
  recoveryPriority?: string | null;
}

/**
 * Generate routine description using Groq AI
 * Falls back to hardcoded values if API fails
 * ALWAYS returns a string (never null)
 */
export async function generateRoutineDescriptionAI(data: RoutineAIData): Promise<string> {
  const startTime = Date.now();
  
  try {
    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      logger.warn('GROQ_API_KEY not configured');
      return getFallbackDescription(data.objective);
    }

    const objectiveLabel = {
      masa: 'ganancia de masa muscular con énfasis en hipertrofia',
      grasa: 'pérdida de grasa preservando músculo y mejorando definición',
      mantener: 'mantenimiento y tonificación muscular',
    }[data.objective] || 'fitness general';

    const cardioNote = data.cardio === 'alto' ? 'con cardio estratégico e intenso' : data.cardio === 'moderado' ? 'con cardio moderado incorporado' : '';
    const durationNote = data.sessionDuration ? ` sesiones de ${data.sessionDuration} minutos` : '';
    const styleNote = data.trainingStyle ? ` estructura ${data.trainingStyle}` : '';
    const recoveryNote = data.recoveryPriority === 'bajo' ? 'adaptada a recuperación limitada' : data.recoveryPriority === 'alto' ? 'maximizando recuperación' : '';

    const prompt = `
Eres un entrenador personal profesional con 15+ años certificado en programación de strength training y periodización. 
Tu tarea es generar una descripción de rutina EXPERTA, motivadora y altamente técnica.

╔═ CONTEXTO DEL CLIENTE ═╗
• Objetivo Principal: ${objectiveLabel}
• Nivel: ${data.level === 'principiante' ? 'Principiante (0-6 meses experiencia)' : data.level === 'intermedio' ? 'Intermedio (1-3 años)' : 'Avanzado (3+ años)'}
• Frecuencia: ${data.days} días/semana
${durationNote ? `• Sesiones: ${data.sessionDuration}` : ''}
${cardioNote ? `• Cardio: ${cardioNote}` : ''}
${styleNote ? `• Estructura: ${styleNote}` : ''}
${recoveryNote ? `• Énfasis: ${recoveryNote}` : ''}

╔═ ESTRUCTURA REQUERIDA ═╗
1. **Párrafo 1 (Visión General)**: Define el propósito específico, qué hace única esta rutina y resultados esperados con timeline realista
2. **Párrafo 2 (Metodología)**: Explica principios científicos, periodización, rango de reps, recuperación y por qué funciona
3. **Párrafo 3 (Progresión)**: Detalles de progressive overload, cómo escalar y adaptarse después de 4-6 semanas
4. **Párrafo 4 (Optimización)**: Tips prácticos, nutrición, sueño y factores clave de éxito

╔═ REQUISITOS TÉCNICOS ═╗
✓ Tono: Experto pero accesible, motivador sin ser ficticio
✓ Incluye: Datos científicos, términos correctos, evidencia-based
✓ Varía: Según objetivo (hipertrofia, fuerza, conditioning)
✓ Realismo: Promete resultados reales en timeframes realistas (8-12 semanas mínimo)
✓ Personalización: Adapta específicamente al nivel y objetivo
✓ Máximo: 350 palabras, párrafos bien estructurados
✓ Responde: SOLO la descripción, sin explicaciones extras

╔═ EJEMPLOS DE CUALIDAD ═╗
MAL: "Esta es una rutina buena para ganar músculo"
BIEN: "Rutina de hipertrofia basada en periodización lineal con enfoque en rango 8-12 reps que genera tensión mecánica sostenida..."

Adelante, genera la descripción profesional ahora:
`;

    logger.info('Requesting detailed routine description from Groq', { model: 'llama-3.1-8b-instant', objective: data.objective });

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ] as any,
      model: 'llama-3.1-8b-instant',
      max_tokens: 500,
      temperature: 0.7,
    });

    // Validate response
    if (!message.choices || message.choices.length === 0) {
      logger.warn('Empty response from Groq API');
      return getFallbackDescription(data.objective);
    }

    const content = message.choices[0].message.content;
    if (content && content.trim().length > 50) {  // At least 50 chars for a good description
      const result = content.trim();
      logger.timing('generateRoutineDescription', Date.now() - startTime);
      return result;
    }

    logger.warn('Invalid response format from API');
    return getFallbackDescription(data.objective);
  } catch (error: any) {
    logger.error('Failed to generate routine description', error);
    logger.info('Using fallback description');
    return getFallbackDescription(data.objective);
  }
}

/**
 * Fallback function for routine description by objective
 */
function getFallbackDescription(objective: string): string {
  const descriptions = {
    masa: FALLBACK_DESCRIPTIONS_MASA,
    grasa: FALLBACK_DESCRIPTIONS_GRASA,
    mantener: FALLBACK_DESCRIPTIONS_MANTENER,
  };
  
  const array = descriptions[objective as keyof typeof descriptions] || FALLBACK_DESCRIPTIONS_MASA;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Fallback function for motivational tips by objective
 */
function getFallbackTips(objective: string): string[] {
  const tips = {
    masa: FALLBACK_TIPS_MASA,
    grasa: FALLBACK_TIPS_GRASA,
    mantener: FALLBACK_TIPS_MANTENER,
  };
  
  const array = tips[objective as keyof typeof tips] || FALLBACK_TIPS_MASA;
  
  // Retorna 5-6 tips aleatorios de la lista
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 6);
}

/**
 * Generate exercise variations using Groq AI
 * Falls back to null if API fails (will use wizard defaults)
 */
export async function generateExerciseVariationsAI(exerciseName: string, level: string): Promise<string[] | null> {
  const startTime = Date.now();
  
  try {
    if (!process.env.GROQ_API_KEY) {
      logger.warn('GROQ_API_KEY not configured');
      return null;
    }

    const prompt = `
Eres un entrenador personal. Para el ejercicio "${exerciseName}" en nivel ${level}, 
sugiere 2-3 variaciones o alternativas que sirvan al mismo propósito.

Responde como una lista simple, una variación por línea.
IMPORTANTE: Solo responde con los nombres, nada más.
`;

    logger.info('Requesting exercise variations', { exercise: exerciseName, level });

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ] as any,
      model: 'llama-3.1-8b-instant',
      max_tokens: 100,
      temperature: 0.7,
    });

    // Validate response
    if (!message.choices || message.choices.length === 0) {
      logger.warn('Empty response from Groq API for exercise variations');
      return null;
    }

    const content = message.choices[0].message.content;
    if (content && content.trim().length > 0) {
      const variations = content
        .trim()
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^[-*•]\s?/, '').trim())
        .filter((line) => line.length > 0);
      
      if (variations.length > 0) {
        logger.timing('generateExerciseVariations', Date.now() - startTime);
        return variations;
      }
    }

    logger.warn('Invalid or empty variations response', { exercise: exerciseName });
    return null;
  } catch (error: any) {
    logger.error(`Failed to generate exercise variations for ${exerciseName}`, error);
    return null;
  }
}

/**
 * Generate motivational tips for a routine
 * Falls back to hardcoded tips if API fails
 * ALWAYS returns an array with 3+ tips (never null)
 */
export async function generateMotivationalTipsAI(objective: string, level: string, trainingStyle?: string | null): Promise<string[]> {
  const startTime = Date.now();
  
  try {
    if (!process.env.GROQ_API_KEY) {
      logger.warn('GROQ_API_KEY not configured');
      return getFallbackTips(objective);
    }

    const styleContext = trainingStyle ? ` con enfoque ${trainingStyle}` : '';

    const prompt = `
Eres un coach profesional de fitness con certificación NASM/ISSN y experiencia real. 
Tu tarea: Genera 6 tips ESPECÍFICOS, ACCIONABLES y CIENTÍFICAMENTE RESPALDADOS para máximo éxito.

╔═ PERFIL DEL ATLETA ═╗
• Objetivo: ${objective === 'masa' ? 'Ganancia de masa muscular e hipertrofia' : objective === 'grasa' ? 'Pérdida de grasa preservando músculo' : 'Mantenimiento y tonificación'}
• Nivel: ${level}${styleContext ? ` (${styleContext})` : ''}

╔═ ESTRUCTURA DE TIPS ═╗
Genera 6 tips mezclando estos áreas:
1. Progressive Overload / Periodización (cómo progresar)
2. Nutrición Específica (macro/micro según objetivo)
3. Recuperación (sueño, mobility, active recovery)
4. Técnica / Ejecución (form perfecta, evitar lesiones)
5. Tracking / Medición (cómo medir éxito real)
6. Mentalidad / Consistencia (adherencia a largo plazo)

╔═ CRITERIOS OBLIGATORIOS ═╗
✓ ESPECÍFICO: "Aumenta sentadillas de 140 a 145kg cada semana" NO "levanta más peso"
✓ NUMÉRICO: Incluye números concretos (reps, minutos, gramos, porcentajes)
✓ TEMPORAL: Define timeframe ("cada semana", "8 semanas", "cada sesión")
✓ ACCIONABLE: Puede implementarse HOY sin equipo especial
✓ CIENTÍFICO: Menciona principio (periodización, NEAT, hipertrofia, etc.)
✓ PERSONALIZADO: Varía según objetivo (hipertrofia ≠ cutting)

╔═ FORMATO DE RESPUESTA ═╗
Un tip por línea
SIN números, bullets, emojis ni formateo
SIN explicaciones extras
SOLO el tip procesable y completo

Ejemplo CORRECTO: "Programa 3-4 ejercicios compuestos/sesión en rango 6-12 reps con 3-4 sets manteniendo progresión de peso semanal"
Ejemplo INCORRECTO: "Hazle más duro" o "Come proteína" o "📈 Sube peso"

Adelante - genera los 6 tips ahora:
`;

    logger.info('Requesting professional tips', { objective, level, style: trainingStyle });

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ] as any,
      model: 'llama-3.1-8b-instant',
      max_tokens: 400,
      temperature: 0.8,
    });

    // Validate response
    if (!message.choices || message.choices.length === 0) {
      logger.warn('Empty response from Groq API for tips');
      return getFallbackTips(objective);
    }

    const content = message.choices[0].message.content;
    if (content && content.trim().length > 0) {
      const tips = content
        .trim()
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^[-*•\d+.]\s?/, '').trim())
        .filter((line) => line.length > 5 && !line.toLowerCase().includes('responde'))
        .slice(0, 6);  // Límitar a 6 tips
      
      if (tips.length >= 3) {
        logger.timing('generateMotivationalTips', Date.now() - startTime);
        return tips;
      }
    }

    logger.warn('Invalid or insufficient tips response', { objective, level });
    return getFallbackTips(objective);
  } catch (error: any) {
    logger.error(`Failed to generate motivational tips for ${objective}`, error);
    logger.info('Using fallback tips');
    return getFallbackTips(objective);
  }
}

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

// Fallback values - MEJORADAS Y MÁS DETALLADAS
const FALLBACK_DESCRIPTIONS = [
  'Rutina personalizada de alto rendimiento diseñada científicamente para maximizar tus resultados. Este programa combina principios de periodización con ejercicios compuestos efectivos, permitiéndote progresar de forma consistente.',
  'Programa de entrenamiento profesional estructurado estratégicamente para tu nivel. Incluye progresión planificada, variación de estímulos y recuperación optimizada para resultados visibles en 4-6 semanas.',
  'Rutina intensiva y bien planificada que aplica las últimas metodologías de entrenamiento de fuerza. Diseñada para maximizar ganancia muscular, mejorar rendimiento y prevenir lesiones con técnica correcta.',
  'Entrenamiento personalizado adaptado a tu objetivo específico y limitaciones. Estructura progresiva que balancean volumen, intensidad y recuperación para resultados sostenibles a largo plazo.',
  'Programa de fitness basado en evidencia científica, optimizado para tu nivel y disponibilidad. Combina ejercicios principales con accesorios estratégicos para máxima efectividad y adherencia.',
];

const FALLBACK_TIPS = [
  '📈 Progressive Overload: Aumenta peso, reps o sets cada semana. La progresión constante es la clave del éxito en cualquier entrenamiento.',
  '💪 Consistencia > Perfección: Entrenar 3 días de forma disciplinada supera entrenar 6 días sin compromiso. La consistencia gana siempre.',
  '⏱️ Descansa Activamente: Los días de descanso son cuando crece el músculo. Incorpora caminar, estirar o movilidad para recuperación óptima.',
  '🥗 Nutrición es 70%: Sin superávit calórico (masa) o déficit (grasa), entrenar es solo la mitad de la ecuación. Come inteligentemente.',
  '😴 Sueño es Anabólico: 7-9 horas de calidad permite síntesis proteica. Duerme suficiente para que tu entrenamiento vale la pena.',
  '📱 Registra tu Progreso: Apunta sets, reps y peso. Datos visuales mantienen motivación y permiten ajustes inteligentes.',
  '🔄 Varía los Ejercicios: Cada 4-6 semanas, cambia movimientos. La variación previene mesetas y lesiones por uso repetitivo.',
  '🎯 Forma > Ego: Un ejercicio con técnica perfecta supera un peso más pesado con movimiento marrullero. Lesionarse retrocede meses.',
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
      return getFallbackDescription();
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
      return getFallbackDescription();
    }

    const content = message.choices[0].message.content;
    if (content && content.trim().length > 50) {  // At least 50 chars for a good description
      const result = content.trim();
      logger.timing('generateRoutineDescription', Date.now() - startTime);
      return result;
    }

    logger.warn('Invalid response format from API');
    return getFallbackDescription();
  } catch (error: any) {
    logger.error('Failed to generate routine description', error);
    logger.info('Using fallback description');
    return getFallbackDescription();
  }
}

/**
 * Fallback function for routine description
 */
function getFallbackDescription(): string {
  return FALLBACK_DESCRIPTIONS[Math.floor(Math.random() * FALLBACK_DESCRIPTIONS.length)];
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
      return getFallbackTips();
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
      return getFallbackTips();
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
    return getFallbackTips();
  } catch (error: any) {
    logger.error(`Failed to generate motivational tips for ${objective}`, error);
    logger.info('Using fallback tips');
    return getFallbackTips();
  }
}

/**
 * Fallback function for motivational tips
 */
function getFallbackTips(): string[] {
  // Shuffle and return 3 random fallback tips
  const shuffled = [...FALLBACK_TIPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

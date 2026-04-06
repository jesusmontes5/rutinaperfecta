import Groq from 'groq-sdk';
import TokenManager from './token-manager';

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

/* ==============================
   MEJORADAS DESCRIPCIÓN PROFESIONAL
   ============================== */

const FALLBACK_DESCRIPTIONS_MASA = [
  'Rutina de hipertrofia científicamente diseñada para maximizar ganancia muscular. Estructura: 3-4 días Full Body o PPL, con énfasis en ejercicios compuestos pesados (6-10 reps) combinado con accesorios en rango 10-15 reps para estrés metabólico. Frecuencia de 2x/semana por grupo muscular es óptima según investigación reciente (Schoenfeld). Recuperación: 48-72 horas entre grupos, 4 días entre entrenamientos. Progressive overload es fundamentales cada semana (+2.5-5kg o +1-2 reps). Resultados: 0.5-1kg músculo puro/semana = 4-8kg en 8-12 semanas con nutrición correcta.',
  
  'Programa profesional de ganancia de masa musculoesquelética usando periodización lineal. Ciclo: Semanas 1-2 (adaptación), 3-4 (fuerza 6-8 reps), 5-8 (hipertrofia 8-12 reps), 9-12 (volumen 10-15 reps), luego deload. Combina 3 pilares de hipertrofia: (1) Tensión Mecánica 40% (ejercicios pesados), (2) Daño Muscular 30% (rango completo), (3) Estrés Metabólico 30% (altos reps, descansos cortos). Volumen: 60-70 sets/semana distribuidos. Nutrición: Superávit +300-500 kcal, proteína 2.0-2.2g/kg. Cardio: Moderado (LISS 20-30min, 2x/semana).',
  
  'Rutina de construcción muscular que aplica ciencia moderna de hipertrofia. Estructura adaptativa: principiantes = Full Body 3x/semana, intermedios = PPL o Upper/Lower, avanzados = split specializado. Enfoque: Máxima frecuencia de entreno (2-3x por grupo/semana), volumen óptimo (50-70 sets/semana), intensidad consistente (RPE 7-9), progresión planificada. Incluye: Movimientos variados cada 4-6 semanas, deload weeks, recuperación estratégica. Nutrición crítica: 2000-2800 kcal según peso, proteína 160-200g, carbs 4-5g/kg para energía entreno.',
  
  'Entrenamiento periodizado para ganancia muscular máxima sin lesiones. Diseño científico basado en síntesis proteica muscular (MPS), que pico a 24-48h post-entreno. Cada grupo muscular se entrena 2-3 veces/semana para múltiples picos MPS. Estructura: Ejercicios compuestos pesados (3-4 series × 6-10 reps con 2-3min descanso) seguido de accesorios eficientes (3 series × 10-15 reps con 60-90s descanso). Resultados: Consistencia > Perfección. 2kg extra ganancia natural por año es norma realista.',
  
  'Rutina de hipertrofia miofibrilar y sarcoplasmática integrada. Volumen distribuido: Compuestos pesados (60% de volumen) desarrollan fuerza pura + activación neural máxima. Accesorios moderados (40% de volumen) crean pump, daño microscópico y estrés metabólico. Frecuencia: Cada músculo entrenado 2 veces/semana en diferentes ángulos. Progresión: Semana 1-2 establecer línea base, semana 3-4 aumentar peso, semana 5-6 aumentar reps o sets, semana 7-8 variar ejercicios. Sin deload = meseta garantizada.',
];

const FALLBACK_DESCRIPTIONS_GRASA = [
  'Rutina de pérdida de grasa maximizando preservación muscular. Fundamento: En déficit calórico, tu cuerpo degrada músculo si no lo estimulas suficientemente. Solución: Entrenamientos frecuentes, pesados e intensos. Estructura: 4-5 días/semana con énfasis en compuestos fuertes (6-10 reps, RPE 8-9) para mantener fuerza, seguidos accesorios en 10-12 reps con descansós cortos (45-60s) para HIIT metabólico. Cardio: HIIT 2-3 veces/semana (20-30min máximo) + LISS 1x/semana (30-45min). Nutrición: Déficit -400 a -500 kcal, proteína MÁXIMA 2.4-2.6g/kg (crítico), carbos moderados. Resultados: -0.5 a -1kg/semana grasa con preservación 100% músculo.',
  
  'Programa de cutting basado en recomposición corporal inteligente. Objetivo: Perder grasa sin perder fuerza ni músculo. Estrategia: Entrenamiento pesado 4x/semana (movimientos compuestos en 6-10 reps = máxima retención muscular), cardio metabólico inteligente (HIIT 2x/semana no circuito sino series cortas pesadas), deficiencia calórica moderada (-400 a -500, no -1000). Macros: Proteína prioritaria (204-220g para 85kg), carbos post-entreno, grasas mínimas. Suplementos recomendados: Creatina (preserva fuerza en déficit), cafeína (mejora enfoque y EPOC), Beta-alanina (resiste fatiga en HIIT). Resultados: -10kg en 12 semanas donde 80% es grasa, no músculo.',
  
  'Rutina de transformación corporal para definición visible. Enfoque dual: Mantener/construir músculo MIENTRAS pierdes grasa = recomposición. Clave: Frecuencia alta de entreno (cada grupo muscular 2-3x/semana) con intensidad sostenida. Volumen: 40-50 sets/semana (menos que ganancia pero suficiente para preservar). Estructura: A) Movimientos pesados (squat, bench, fila, press) 80kg+ per 4-6 reps × 3-4 series = fuerza pura. B) Ejercicios secundarios 10-12 reps × 3 series = eficiencia. C) Finalizadores 12-15 reps × 2-3 series = pump. Cardio: Integrado (no separado): 30-60 segundos cardio entre ejercicios compuestos. Resultado: Músculo visible, definición clara, fuerza preservada.',
  
  'Entrenamiento de eliminación grasa con énfasis en preservación de masa magra. Metodología: Déficit mínimo (300-400 kcal) sostenible, proteína máxima (2.4-2.6g/kg), entrenamiento de resistencia pesado (denso en series cortas intensas). Estructura: 4-5 días, ejercicios compuestos en primero 45-50 minutos (squat, bench, fila, press + movimiento complementario), luego finalizador de 10-15 minutos (cardio HIIT o circuito). Cardio separado: LISS 1 x/semana 45-60min OR HIIT 2x/semana 20-30min. Una comida semanal flexible (cheat meal) ayuda psicología + leptina. Resultados: Visible body transformation en 10 semanas.',
  
  'Rutina científica de cutting preservando músculo máximo. Basada en: (1) Proteína alta mantiene MPS incluso en déficit, (2) Entrenamiento pesado manda señal al cuerpo "necesito este músculo", (3) Déficit moderado -400 a -500 es tolerable vs -1000 (insostenible). Estructura: Lunes (pierna pesada) → Martes (pecho/tris) → Miércoles (cardio/active recovery) → Jueves (espalda/bis) → Viernes (pierna vol) → Sábado (cardio HIIT) → Domingo (descanso). Progresión: Semana 1-4 establecer baseline, 5-8 small decreases (-5kg) manteniendo reps, 9-12 increase conditioning. Final: Composición 12-15% grasa corporal visible.',
];

const FALLBACK_DESCRIPTIONS_MANTENER = [
  'Rutina de mantenimiento y bienestar diseñada para preservar musculatura mientras mejoras composición corporal. Estructura flexible: 3-4 días/semana con movimientos funcionales balanceados. Énfasis: Calidad sobre cantidad. Cada grupo muscular entrenado 1-2 veces/semana suficiente en mantenimiento. Volumen: 40-50 sets/semana (menos que ganancia pero previene atrofia). Intensidad: RPE 6-8 (no exhaustivo pero suficiente). Cardio: Moderado (LISS 30-45min 2-3x/semana, sin HIIT agresivo). Nutrición: Balance calórico exacto (TDEE), proteína 1.6-1.8g/kg (suficiente). Dieta flexible, sostenible de por vida.',
  
  'Programa de fitness integral para mantener fuerza y salud año redondo. Filosofía: Entrenamiento como hábito NO como tortura. Estructura: 3-4 días pesas (movimientos clave: squat, bench, fila, press + accesorios), 1-2 días cardio ligero (caminar, bicicleta, natación). Variación: Cambia ejercicios mensualmente para evitar aburrimiento. Técnica: Enfoque en movimiento limpio, control, conexión muscular. Nutrición: Come cuando tienes hambre, respeta tus macro aproximadamente, 80/20 alimentos limpios vs disfrute. Resultado: Físico atractivo + funcional + sostenible.',
  
  'Rutina funcional para mantenimiento de fuerza y movilidad. Objetivo: Estar fuerte, móvil, sin lesiones, con vida social activa. Estructura: 3 días compuestos clave (Full Body o Upper/Lower alternando), 1-2 cardio moderado, 1-2 movilidad/yoga. Ejercicios: 5-8 por sesión, 3 series × 8-12 reps (peso moderado), enfoque en forma perfecta. Recuperación: 48-72 horas entre sesiones es suficiente. Nutrición: No conteo estricto, come balanceado, proteína en cada comida, carbos sano, grasas variadas. Flexibilidad: Viajes, eventos sociales, comidas fuera = NORMAL, no desrail plan.',
];

/* ==============================
   TIPS MOTIVACIONALES PROFESIONALES - MASA (GANANCIA)
   ============================== */

const FALLBACK_TIPS_MASA = [
  'Superávit calórico 300-500 kcal es obligatorio: sin excedente, simplemente no crecerás. Calcula: peso(kg) × 30-32 = calorías mantenimiento, luego suma 300-500 extra.',
  'Proteína 1.6-2.2g/kg corporal es clave. Un atleta de 80kg necesita 128-176g diarios. Distribuye en 4-5 comidas para máxima síntesis proteica (MPS) cada 3-4 horas.',
  'Progressive overload CADA SEMANA: suma +2.5-5kg a ejercicios compuestos O +1-2 reps. Sin progresión = sin crecimiento. Registra entrenamientos en app o libreta religiosamente.',
  'Sueño 7-9 horas cada noche: síntesis proteica y hormona de crecimiento ocurren en sueño profundo. Dormir poco reduce crecimiento 30-40%. Prioridad 1.',
  'Entrenamientos 3-5 días/semana es suficiente. Más no es mejor. Musculatura crece FUERA del gym, en recuperación. No necesitas estar siempre entrenando.',
  'Variación de ejercicios cada 4-6 semanas: cambia ángulos, rangos, equipamiento. Previene adaptación y mesetas. Mantén ejercicios clave pero varía accesorios.',
  'Deload week cada 4-5 semanas: reduce volumen 40-50% para recuperación nerviosa. Mantiene fuerza, previene lesiones por fatiga acumulada, reinicia con más fuerza.',
  'Ejercicios compuestos primero: Sentadillas, Peso Muerto, Press de Banca, Remos. 70% de tu volumen debe ser compuesto. Generan máxima ganancia hormonal y muscular.',
];

/* ==============================
   TIPS MOTIVACIONALES PROFESIONALES - CUTTING (PÉRDIDA GRASA)
   ============================== */

const FALLBACK_TIPS_GRASA = [
  'Proteína MÁXIMA es crítico en cutting: 2.4-2.6g/kg corporal. Un atleta de 85kg necesita 204-221g diarios. Previene catabolismo muscular en déficit. Distribuye en 4-5 comidas.',
  'Déficit calórico moderado (-400 a -500 kcal) es sostenible. Déficit extremo (-1000+) destruye músculo y metabolismo. Mejor perder 0.5-1kg/semana 12 semanas que 2kg/semana 4 semanas.',
  'Progressive overload incluso en cutting: mantén pesos pesados o sube reps. Si bajaste peso tanto, mandas señal "no necesito este músculo". Fuerza preserva masa en déficit.',
  'HIIT 2-3 veces/semana (20-30 min máximo) quema grasa estratégico sin destruir músculo. Mejor que 60 min cardio lento que consume masa. Alta intensidad = preserva fuerza.',
  'Cardio después de pesas o separado completamente: NUNCA antes. Pre-cardio quema glucógeno que necesitas para fuerza. Pesas primero (al máximo), luego cardio si queda energía.',
  'Agua infinita: 3-4 litros diarios mínimo. Mayor hidratación = mejor metabolismo, menos hambre, mejor rendimiento, recuperación mejorada. Cero calorías pero tremendo impacto.',
  'Creatina 5g diarios en cutting: preserva fuerza y volumen muscular cuando caen calorías. Ganancia de investigación última década: creatina marca la diferencia muscular vs grasa pura.',
  'Una comida "flexible" semanal: 1x/semana una comida que disfrutes (pizza, hamburguesa, postre). Mantiene psicología positiva, lepina elevada, adherencia real. NO desbarata progreso si es 1x/semana.',
];

/* ==============================
   TIPS MOTIVACIONALES PROFESIONALES - MANTENIMIENTO
   ============================== */

const FALLBACK_TIPS_MANTENER = [
  'Mantén balance calórico aproximado: peso actual (kg) × 28-30 = calorías mantenimiento. Variar ±200-300 es completamente normal. Objetivo = ESTABILIDAD, no precisión obsesiva.',
  'Proteína moderada 1.6-1.8g/kg es suficiente para preservar. No necesitas extremo 2.2g/kg si no buscas crecimiento rápido. Come proteína en cada comida principales.',
  'Entrenamientos 3-4 días/semana es IDEAL en mantenimiento: suficiente para preservar fuerza/músculo, bajo compromiso tiempo, mejor balance vida. Consistencia > volumen.',
  'Cardio 150 minutos/semana moderado O 75 minutos/semana intenso: recomendación OMS para salud cardiovascular. Mantiene corazón fuerte, composición estable, energía óptima.',
  'Sueño 7-8 horas noche: fundamento de recuperación cotidiana. A largo plazo, dormir bien es tu mejor inversión fitness. Sin sueño, todo lo demás se desmorona lentamente.',
  'Flexibilidad nutricional: disfruta 1-2 comidas "libres" semanales sin afectar progreso. Sostenibilidad = consistencia 80% de años, no perfección 100% de semanas.',
  'Varía ejercicios cada 2-3 meses: previene aburrimiento mental y lesiones por repetición. Mantén principales (squat, bench, fila) pero experimenta variaciones nuevas.',
  'Mentalidad: Estar fit es viaje infinito, no destino final. Aprecia fuerza actual, disfruta entrenamientos, celebra consistencia. Objetivo = vida larga, saludable, fuerte sin estrés.',
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
 * Implementa: Cache + Token Manager + Fallbacks inteligentes
 */
export async function generateRoutineDescriptionAI(data: RoutineAIData): Promise<string> {
  const startTime = Date.now();
  const cacheKey = TokenManager.getCacheKey(data.objective, data.level, data.days);
  
  try {
    // 1. Intentar desde cache primero
    const cached = TokenManager.getFromCache(cacheKey);
    if (cached) {
      logger.info('✅ Obteniendo descripción desde CACHE');
      return cached.description;
    }

    // 2. Verificar disponibilidad de tokens
    const tokenStatus = TokenManager.canMakeAPICall(150); // Descripción usa ~150 tokens
    const fallbackMode = TokenManager.getFallbackMode();

    if (!tokenStatus.allowed) {
      logger.warn(`❌ ${tokenStatus.reason}`);
      return getFallbackDescription(data.objective);
    }

    if (fallbackMode === 'cache_only' || fallbackMode === 'fallback_only') {
      logger.warn(`⚠️ Modo ${fallbackMode}: usando fallback local`);
      return getFallbackDescription(data.objective);
    }

    // 3. Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      logger.warn('GROQ_API_KEY not configured');
      return getFallbackDescription(data.objective);
    }

    const objectiveLabel = {
      masa: 'ganancia de masa muscular con énfasis en hipertrofia',
      grasa: 'pérdida de grasa preservando músculo y mejorando definición',
      mantener: 'mantenimiento y tonificación muscular',
    }[data.objective] || 'fitness general';

    const objectiveDetails = {
      masa: 'Hipertrofia muscular: tensión mecánica, volumen progresivo, 8-12 reps, superávit calórico +300-500kcal',
      grasa: 'Pérdida de grasa: déficit controlado -300-500kcal, preservación muscular, HIIT estratégico, proteína elevada',
      mantener: 'Mantenimiento: balance calórico, resistencia + cardio, tono muscular, sostenibilidad a largo plazo'
    };

    const cardioNote = data.cardio === 'alto' ? 'con cardio estratégico e intenso (energía determinista)' : data.cardio === 'moderado' ? 'con cardio moderado incorporado (balance)' : 'con cardio mínimo (máximo enfoque fuerza)';
    const durationNote = data.sessionDuration ? ` sesiones de ${data.sessionDuration} minutos` : '';
    const styleNote = data.trainingStyle ? ` estructura ${data.trainingStyle}` : '';
    const recoveryNote = data.recoveryPriority === 'bajo' ? 'adaptada a recuperación limitada (volumen controlado)' : data.recoveryPriority === 'alto' ? 'maximizando recuperación (volumen óptimo)' : 'recuperación promedio';
    const levelDetail = data.level === 'principiante' ? 'Principiante (0-6m): Focus en técnica base, aclimatación, fundamentos' : data.level === 'intermedio' ? 'Intermedio (1-3a): Progresión sostenida, técnica sólida, adaptaciones' : 'Avanzado (3+a): Periodización compleja, periodización adaptada, máxima especialización';

    const prompt = `
Eres un coach profesional de strength training certificado (NASM, ISSN, USSF) con 15+ años dirigiendo atletas reales.
TAREA: Genera descripción de RUTINA PROFESIONAL, técnica, motivadora, específica y realista.

╔═ CONTEXTO EXACTO DEL CLIENTE ═╗
Objetivo: ${objectiveLabel}
Detalles: ${objectiveDetails[data.objective as keyof typeof objectiveDetails]}
Nivel: ${levelDetail}
Volumen: ${data.days} días/semana${durationNote}
Cardio: ${cardioNote}
${styleNote ? `Estructura: ${styleNote}` : ''}
Recuperación: ${recoveryNote}

╔═ ESTRUCTURA OBLIGATORIA (4 PÁRRAFOS) ═╗
Párrafo 1 (PROPÓSITO): Define qué es esta rutina, POR QUÉ funciona para su objetivo específico, resultados esperados con timeline (8-12 semanas mínimo)
Párrafo 2 (CIENCIA): Principios periodización, rango reps/series, frecuencia muscular, mecanismos adaptativos, por qué vencerá plateaus
Párrafo 3 (PROGRESIÓN): Progressive overload específico, cuándo incrementar peso/volumen, cómo escalar post-4-6 semanas, flexibilidad adaptativa
Párrafo 4 (SUCCESS FACTORS): Nutrición exacta (macros), sueño crítico, movilidad, factores no-negociables

╔═ CRITERIOS TÉCNICOS ESTRICTOS ═╗
✓ Tono: Experto, confianza basada en evidencia, motivador SIN promesas falsas
✓ Específico: Incluye números (reps 8-12, 3-4 sets, +2.5kg/semana, 2.2g proteína/kg)
✓ Científico: Menciona mecanismos (MTor, NEAT, periodización, frecuencia muscular, etc)
✓ Realista: Promete cambios verificables en 8-12 semanas, no milagros
✓ Personal: Diferente según objetivo (masa≠grasa≠mantener)
✓ Accionable: Cliente entiende exactamente qué hacer lunes a viernes
✓ Máximo: 400 palabras, 4 párrafos claros, SIN excepciones

╔═ FORMATO RESPUESTA ═╗
- CUATRO párrafos separados por línea en blanco
- SIN números romanos, bullets, emojis
- NO meta-explicación ("Aquí va el párrafo de...")
- SOLO contenido directo, profesional, listo para leer

EJEMPLO PÁRRAFO 1 (BUENO):
"Esta rutina de 4 días/semana está diseñada específicamente para ganancia muscular sostenida mediante periodización lineal que alterna 3 semanas de volumen alto (8-12 reps, 4 sets) con 1 semana de descarga técnica. Espera ganar 0.5-1kg de masa muscular mensual si mantienes superávit de +400kcal, llegando a +4-6kg en 12 semanas mientras normalizas patrones de movimiento fundamentales."

EJEMPLO PÁRRAFO 2 (BUENO):
"Científicamente, esta estructura genera tensión mecánica sostenida (estimulo primario hipertrofia) mediante rango 8-12 reps que maximiza eficiencia de tiempo bajo tensión. La frecuencia de 2x por semana per grupo muscular optimiza MPS (síntesis proteica muscular) sin exceder capacidad de recuperación, todo sustentado en periodización de Prilepin y Block Periodization moderna."

PROHIBIDO absolutamente:
❌ "Esta rutina es buena"
❌ "Sigue la rutina y verás resultados"
❌ "Entrena duro"
❌ Emojis, formatting raro
❌ Menos de 300 palabras totales
❌ Generic fitness advice

ADELANTE: Genera la descripción profesional COMPLETA ahora (solo descripción, nada más):
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
      max_tokens: 600,
      temperature: 0.7,
    });

    // Validate response
    if (!message.choices || message.choices.length === 0) {
      logger.warn('Empty response from Groq API');
      return getFallbackDescription(data.objective);
    }

    const content = message.choices[0].message.content;
    if (content && content.trim().length > 100) {  // At least 100 chars for a good description
      const result = content.trim();
      
      // 4. Registrar tokens usados (estimado)
      const estimatedTokensUsed = Math.ceil(prompt.length / 4 + result.length / 4);
      TokenManager.recordTokenUsage('generateRoutineDescription', estimatedTokensUsed, true);
      
      // 5. Guardar en cache para futuras llamadas similares
      TokenManager.saveToCache(cacheKey, result, []);
      
      logger.timing('generateRoutineDescription', Date.now() - startTime);
      logger.info(`✅ Description generada y cacheada (${estimatedTokensUsed} tokens)`);
      return result;
    }

    logger.warn('Invalid response format from API');
    return getFallbackDescription(data.objective);
  } catch (error: any) {
    logger.error('Failed to generate routine description', error);
    
    // Registrar intento fallido
    if ((error as any).error?.error?.message?.includes('rate_limit')) {
      logger.warn('⚠️ Rate limit alcanzado - activando fallback permanente');
      TokenManager.recordTokenUsage('generateRoutineDescription', 0, false);
    }
    
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
 * Con cache + token manager
 */
export async function generateMotivationalTipsAI(objective: string, level: string, trainingStyle?: string | null): Promise<string[]> {
  const startTime = Date.now();
  const cacheKey = TokenManager.getCacheKey(objective, level, 0);
  
  try {
    // 1. Intentar desde cache
    const cached = TokenManager.getFromCache(cacheKey);
    if (cached && cached.tips.length > 0) {
      logger.info('✅ Tips obtenidos desde CACHE');
      return cached.tips;
    }

    // 2. Verificar tokens
    const tokenStatus = TokenManager.canMakeAPICall(100);
    const fallbackMode = TokenManager.getFallbackMode();

    if (!tokenStatus.allowed || fallbackMode !== 'full_ai') {
      logger.warn(`Mode: ${fallbackMode} - usando fallback`);
      return getFallbackTips(objective);
    }

    if (!process.env.GROQ_API_KEY) {
      logger.warn('GROQ_API_KEY not configured');
      return getFallbackTips(objective);
    }

    const styleContext = trainingStyle ? ` con enfoque ${trainingStyle}` : '';
    
    // Enhanced objective context
    const objectiveContext = {
      'masa': 'Ganancia de masa muscular (hipertrofia): enfoque en volumen, reps 8-12, superávit calórico +300-500kcal, proteína 1.6-2.2g/kg',
      'grasa': 'Pérdida de grasa preservando masa: déficit controlado -300-500kcal, proteína 2-2.4g/kg, cardio HIIT estratégico',
      'mantener': 'Mantenimiento y tonificación: balance calórico, resistencia + cardio equilibrado, proteína 1.2-1.6g/kg'
    };

    const prompt = `
Eres un coach profesional de fitness certificado (NASM/ISSN) con 10+ años de experiencia real.
Genera 6 tips PROFESIONALES, ESPECÍFICOS y CIENTÍFICAMENTE RESPALDADOS para máximo éxito garantizado.

╔═ CONTEXTO DEL ATLETA ═╗
Objetivo Específico: ${objectiveContext[objective as keyof typeof objectiveContext] || objectiveContext['mantener']}
Nivel de Experiencia: ${level}${styleContext}

╔═ MIX OBLIGATORIO DE TEMAS ═╗
1. Progressive Overload / Carga (cómo incrementar estímulo cada semana)
2. Nutrición Exacta (macros concretos, timing, suplementación)
3. Recuperación Avanzada (sueño, movilidad, deload strategy)
4. Técnica y Prevención (form perfecta, évita lesiones crónicas)
5. Medición y Tracking (métricas reales que importan)
6. Mentalidad y Consistencia (adherencia 12+ meses)

╔═ REQUISITOS ESTRICTOS POR TIP ═╗
✓ ESPECÍFICO: NÚMEROS concretos ("+5 reps" o "120min" o "2.2g/kg", nunca genérico)
✓ TEMPORAL: Define ciclo exacto ("cada semana", "cada 3 semanas", "cada sesión")
✓ ACCIONABLE: Implementable HOY con recursos disponibles
✓ CIENTÍFICO: Menciona mecanismo (hipertrofia, NEAT, neuromusculación, etc)
✓ PERSONALIZADO: Diferente para masa vs grasa vs mantener
✓ REALISTA: Resultados verificables en 4-12 semanas

╔═ FORMATO ESTRICTO ═╗
- UNA línea por tip (natural, sin bullets)
- Máximo 2 frases por tip
- SIN emojis, SIN números romanos
- SIN explicación innecesaria
- Directo: "Tip completo que puedo ejecutar"

EJEMPLOS CORRECTOS (10/10):
"Programa 4 ejercicios compuestos por sesión en rango 8-12 reps, 3-4 series cada uno, aumentando peso +2.5-5kg cada semana cuando completes todos los reps"
"Consume 2.2g de proteína por kilogramo de peso corporal distribuido en 4-5 comidas, con 30g post-entreno dentro de 60 minutos"
"Duerme 7-9 horas consistentes, incluyendo 2-3 dias de movilidad activa (yoga suave, foam roll) para recuperación nervios centrales"

EJEMPLOS INCORRECTOS (1/10):
❌ "Come más proteína" - NO es específico
❌ "Levanta más" - Muy genérico
❌ "📈 Progressive overload semanal" - Emojis + sin detalles
❌ "Recupera bien" - Vago y no accionable

Adelante - GENERA LOS 6 TIPS PROFESIONALES AHORA (nada más, solo los tips limpios):
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
      max_tokens: 500,
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
        // Registrar tokens y cachear
        const estimatedTokens = Math.ceil(prompt.length / 4 + content.length / 4);
        TokenManager.recordTokenUsage('generateMotivationalTips', estimatedTokens, true);
        TokenManager.saveToCache(cacheKey, '', tips);
        
        logger.timing('generateMotivationalTips', Date.now() - startTime);
        logger.info(`✅ Tips generados y cacheados (${estimatedTokens} tokens)`);
        return tips;
      }
    }

    logger.warn('Invalid or insufficient tips response', { objective, level });
    return getFallbackTips(objective);
  } catch (error: any) {
    logger.error(`Failed to generate motivational tips for ${objective}`, error);
    
    if ((error as any).error?.error?.message?.includes('rate_limit')) {
      logger.warn('⚠️ Rate limit alcanzado');
      TokenManager.recordTokenUsage('generateMotivationalTips', 0, false);
    }
    
    logger.info('Using fallback tips');
    return getFallbackTips(objective);
  }
}

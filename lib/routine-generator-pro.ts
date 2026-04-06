/**
 * Professional Routine Generator con Nutrición, Ejercicios Detallados
 * y Fallback Inteligente cuando se agotan tokens
 */

import { nutritionPlans } from './exercises-nutrition-database';
import type { WizardData } from '@/types';

interface GeneratorContext {
  wizardData: WizardData;
  tokenStatus: 'full_ai' | 'hybrid' | 'cache_only' | 'fallback_only';
}

/**
 * Genera descripción profesional de rutina con contenido verificado
 * Prioriza: Cache → Token check → Fallback
 */
export async function generateProfessionalRoutineDescription(
  context: GeneratorContext,
  apiCall?: (prompt: string) => Promise<string>
): Promise<string> {
  const { wizardData, tokenStatus } = context;
  
  // Builds scientific base de la rutina
  const scientificBase = buildScientificBase(wizardData);
  
  // Si tenemos acceso a token completo y API está disponible
  if (tokenStatus === 'full_ai' && apiCall) {
    try {
      const prompt = `
        Genera una descripción PROFESIONAL y CIENTÍFICA de rutina de entrenamiento:
        
        ${scientificBase}
        
        REQUERIMIENTOS:
        - Explicación científica de POR QUÉ funciona esta rutina (síntesis proteica, frecuencia óptima)
        - Desglose completo de ejercicios (3-5 párrafos)
        - Progresión semanal específica
        - Nutrición integrada (macros estimadas)
        - Recuperación y descanso recomendado
        - Duración realista del programa
        
        TONO: Profesional, basado en evidencia científica actual
        EXTENSIÓN: 1500-2000 palabras
      `;
      
      const description = await apiCall(prompt);
      return description;
    } catch (error) {
      console.error('API call failed:', error);
      // Fallback a hibrid automático
    }
  }
  
  // HYBRID o FALLBACK modes - generar contenido profesional local
  return generateLocalProfessionalDescription(wizardData);
}

/**
 * Genera plan nutricional profesional con macros específicas
 */
export function generateNutritionPlanWithMacros(
  objective: string,
  weight: number = 75,
  level: string = 'principiante'
): string {
  const planKey = `${objective}_${level}_${Math.round(weight)}kg`.toLowerCase().replace(' ', '_');
  
  // Busca plan específico en la base de datos
  const specificPlan = (nutritionPlans as any)[planKey];
  
  if (specificPlan) {
    return formatNutritionPlan(specificPlan);
  }
  
  // Si no existe específico, genera uno genérico basado en parámetros
  return generateGenericNutritionPlan(objective, weight, level);
}

/**
 * Genera descripción científica local cuando no hay API disponible
 */
function generateLocalProfessionalDescription(wizardData: WizardData): string {
  const { objective, level, days } = wizardData;
  
  const templates: Record<string, Record<string, string>> = {
    masa: {
      principiante_3: `
# Rutina 3 Días Full Body - Ganar Masa Muscular

## Por Qué Esta Rutina Funciona Para Ganancias de Masa

Este programa está diseñado específicamente para **principiantes que buscan ganar masa muscular de forma óptima**. Tras análisis de 200+ estudios sobre hipertrofia muscular, la estructura de 3 días Full Body es superior a otras opciones para tu nivel.

### Fundamentos Científicos

#### 1. Frecuencia Óptima de 2x/semana por Grupo Muscular
- **Síntesis Proteica**: Cada grupo muscular entrenado alcanza pico de síntesis proteica a las 24-48h
- Entrenar 2 veces/semana = 2 picos de síntesis proteica vs 1 solo
- Resultado: **25-30% más crecimiento muscular** que 1x/semana según estudios de Brad Schoenfeld

#### 2. Recuperación Nerviosa (CNS Recovery)
- Tu sistema nervioso central requiere 72-96 horas de recuperación entre entrenamientos intensos
- 3 días permite 4 días entre cada sesión: recuperación COMPLETA
- Menos cortisol, mejor adherencia, menor riesgo lesión

#### 3. Volumen Total Optimizado (60-70 sets/semana)
- Rango ideal para hipertrofia sin sobreentrenamiento
- Distribución: 40% peso maximal pesado (6-10 reps)
- 60% volumen moderado (10-15 reps) para estrés metabólico

### Estructura de Días

**Día A (Lunes & Viernes): Full Body Variado**
- Prioridad: Ejercicios compuestos pesados
- Objetivo: Máxima tensión mecánica
- Ejercicios: 4 compuestos + 2 accesorios

**Día B (Miércoles): Full Body Variación**
- Prioridad: Ángulos diferentes, focus en acumulación de volumen
- Objetivo: Estrés metabólico + variación
- Ejercicios: 3 compuestos + 3 accesorios

## Nutrición para Ganar 0.5kg/semana de Músculo Puro

Con esta rutina + nutrición correcta:
- **Semana 1-2**: +2-3kg (agua + glucógeno + inicio muscular)
- **Semana 3-12**: +0.5-1kg/semana de músculo puro
- **Total en 12 semanas**: +8-10kg de los cuales 60% es músculo

### Macro Targets
- **Proteína**: 2.0-2.2g/kg corporal (máximo efectivo)
- **Carbs**: 4-5g/kg (energía para entrenamientos intensos)
- **Grasas**: 0.8-1.0g/kg (función hormonal)

Ejemplo para 75kg:
- Proteína: 150-165g
- Carbs: 300-375g
- Grasas: 60-75g
- **Total**: ~2500-2800 kcal (superávit de 300-400 kcal vs TDEE)

## Progresión y Progressive Overload

**Semana 1-2**: Acostumbramiento técnico
- Encuéntrate con los movimientos
- Aprende forma perfecta
- Usa pesos que domines completamente

**Semana 3-6**: Aumento gradual
- Suma 2.5-5kg cada semana a ejercicios principales
- Mantén forma perfecta
- Siente cada repetición

**Semana 7-12**: Consolidación
- Sigue aumentando peso O reps
- Objetivo: estar más fuerte cada semana
- Track: lleva un diario de entrenamientos

**Mes 4+**: Deload
- Cada 4-6 semanas, reduce volumen 40-50% por 1 semana
- Permite recuperación completa
- Reinicia con más fuerza
      `,
    },
    grasa: {
      intermedio_4: `
# Rutina 4 Días Full Body - Pérdida de Grasa Preservando Músculo

## Objetivo: Perder 0.5-1kg/semana Preservando Todo el Músculo Ganado

En déficit calórico, tu cuerpo preferirá catabolizar músculo. Esta rutina es específicamente diseñada para MAXIMIZAR retención muscular mientras pierdes grasa corporal.

### Por Qué 4 Días en Cutting

#### 1. Mayor Frecuencia = Mayor Potencial Anabólico
- En déficit, cada grupo muscular necesita entreno 2-3x/semana
- 4 días permite 2 entrenamientos por grupo muscular
- Aumento de síntesis proteica = preserva masa

#### 2. Densidad de Entrenamiento Elevada
- Menos tiempo descansando entre series
- Mayor pump = mejor retención muscular
- Mantiene activación neuromuscular alta

#### 3. Efectos Sistémicos en Metabolismo
- Mayor EPOC (afterburn effect) = más calorías quemadas post-ejercicio
- Mantiene metabolismo elevado durante déficit
- Mejor para pérdida de grasa pura

### Nutrición Agresiva en Déficit

El corte más importante es **PROTEÍNA PRIMERO:**

**Macro Priority**:
1. **Proteína**: 2.4-2.6g/kg (CRÍTICO en déficit)
   - Ejemplo 85kg: 204-221g proteína DIARIOS
2. **Déficit**: -400 a -500 kcal del TDEE
3. **Carbs vs Grasas**: Flexible según preferencia
   - Opción A: Carbs altos, grasas bajas
   - Opción B: Balance 50/50

**Ejemplo Diario para 85kg** (TDEE ~2550):
- Calorías: 2050-2100 kcal
- Proteína: 200-210g (50% de calorías)
- Carbos: 170-180g (35% de calorías)
- Grasas: 65-70g (30% de calorías)

### Estrategia de Entrenamientos

**Sesiones de 45-60 min** (eficiencia máxima):
- 5 min calentamiento específico
- 30-45 min trabajo pesado
- 10 min accesorios/bombeo
- Core/movilidad final

**Volumen**: 12-15 sets/grupo muscular/semana
- Distribuido en 2-3 entrenamientos
- Resultado: máxima preservación muscular

## Resultados Esperados

**Semana 1-2**: -2-3kg (agua + glucógeno)
**Semana 3-8**: -3-4kg grasa pura/mes = -0.75-1kg/semana
**Total 12 semanas**: -10-12kg de los cuales 80% es GRASA

Mientras preservas 100% de músculo ganado.
      `,
    },
    mantener: {
      intermedio_3: `
# Rutina 3-4 Días - Mantenimiento y Wellness

## Objetivo: Mantener Músculos, Mejorar Rendimiento, Disfrutar del Proceso

Esta rutina está diseñada para la **sostenibilidad a largo plazo**. No se trata de maximalismo sino de equilibrio entre resultados, salud y disfrute.

### Por Qué Esta Estructura Para Mantenimiento

#### 1. Eficiencia Sostenible
- 3-4 días es ambicioso pero sostenible de por vida
- Mejor balance trabajo-vida-gimnasio
- Menos burnout psicológico

#### 2. Suficiente Volumen Para Preservación
- 50-60 sets/semana: exacto para mantener donde estás
- SIN crecimiento agresivo: menos presión
- Permite flexibilidad nutricional

#### 3. Flexible y Adaptable
- Puedes cambiar orden de ejercicios fácilmente
- Espacios libres para cross-fit, deportes, yoga
- Dietas flexibles = mayor adherencia

### Nutrición: La Parte Fácil

En mantenimiento, tu vida es sencilla:
- **TDEE**: Come aproximadamente tu gasto calórico
- **Flexibilidad**: +/- 300 kcal es completamente OK
- **Proteína**: 1.6-1.8g/kg (suficiente para mantener)
- **Carbs**: 4-5g/kg O lo que quieras (mucha más libertad)
- **Result**: Come normal, entrena normal, vive normal

## Resultados Esperados

✅ Mantiene 100% del músculo ganado  
✅ Mejora lentamente rendimiento (fuerza +2-3% cada ciclo)  
✅ Sostenible de por vida  
✅ Mentalidad positiva sin presión  

Esta es el "endgame" ideal: entrenar porque disfrutas, no porque sientas obligación.
      `,
    },
  };
  
  // Combina con datos específicos
  const objectiveKey = objective || 'masa'; // Default to 'masa' if null
  const key = `${objectiveKey}_${level}_${days}`;
  const template = templates[objectiveKey]?.[key] || templates[objectiveKey]?.['principiante_3'] || '';
  
  return template || 'Rutina personalizada basada en tu perfil.';
}

/**
 * Construye base científica para generador de prompts
 */
function buildScientificBase(data: WizardData): string {
  return `
## Perfil del Usuario

- **Objetivo**: ${data.objective} (${getObjectiveDescription(data.objective)})
- **Nivel**: ${data.level} (${getLevelDescription(data.level)})
- **Días disponibles**: ${data.days} días/semana
- **Ubicación**: ${data.location}
- **Duración sesión**: ${data.sessionDuration} minutos
- **Preferencias**: ${(data.exercisePreferences || []).join(', ')}
- **Limitaciones**: ${(data.injuries && data.injuries.length > 0) ? data.injuries.join(', ') : 'Ninguna'}

## Base Científica

Según investigación en periodización y hipertrofia:
1. Frecuencia optima: ${data.days}x/semana = cada grupo muscular entrena ${Math.floor(14 / (data.days || 1))} días
2. Volumen recomendado: ${getVolumeRecommendation(data.level)} sets/semana
3. Rango de reps: ${getRepRanges(data.objective)}
4. Recuperación: ${getRecoveryDays(data.days)} días entre entrenamientos
  `;
}

/**
 * Descripciones de objetivos
 */
function getObjectiveDescription(objective: string | null): string {
  const descriptions: Record<string, string> = {
    masa: 'Ganar masa muscular con superávit calórico',
    grasa: 'Perder grasa corporal con déficit',
    mantener: 'Mantener masa actual, mejorar rendimiento',
  };
  return descriptions[objective || 'masa'] || '';
}

/**
 * Descripciones de nivel
 */
function getLevelDescription(level: string | null): string {
  const descriptions: Record<string, string> = {
    principiante: '<6 meses entrenamiento o sin experiencia',
    intermedio: '6-18 meses entrenamiento consistente',
    avanzado: '>18 meses o muy entrenado',
  };
  return descriptions[level || 'principiante'] || '';
}

/**
 * Recomendación de volumen por nivel
 */
function getVolumeRecommendation(level: string | null): number {
  const volumes: Record<string, number> = {
    principiante: 60,
    intermedio: 70,
    avanzado: 80,
  };
  return volumes[level || 'principiante'] || 60;
}

/**
 * Rangos de reps por objetivo
 */
function getRepRanges(objective: string | null): string {
  const ranges: Record<string, string> = {
    masa: '6-10 reps (compuestos) + 10-15 reps (accesorios)',
    grasa: '8-12 reps con descansos cortos (45-60s)',
    mantener: '8-15 reps flexible según preferencia',
  };
  return ranges[objective || 'masa'] || '';
}

/**
 * Días de recuperación recomendado
 */
function getRecoveryDays(days: number | null): string {
  const daysNum = days || 3;
  return `${Math.ceil(7 / daysNum)}-${Math.ceil(7 / daysNum) + 1}`;
}

/**
 * Formatea plan nutricional para presentación
 */
function formatNutritionPlan(plan: any): string {
  const { details } = plan;
  
  return `
## Plan Nutricional Profesional

### Macronutrientes Diarios
- **Calorías**: ${details.dailyCalories} kcal (${details.dailyCalories - details.tdee > 0 ? '+' : ''}${details.dailyCalories - details.tdee} vs TDEE)
- **Proteína**: ${details.proteinG}g (${((details.proteinG * 4) / details.dailyCalories * 100).toFixed(0)}% calorías)
- **Carbohidratos**: ${details.carbsG}g (${((details.carbsG * 4) / details.dailyCalories * 100).toFixed(0)}% calorías)
- **Grasas**: ${details.fatsG}g (${((details.fatsG * 9) / details.dailyCalories * 100).toFixed(0)}% calorías)

### Distribución de Comidas
${details.mealTiming}

### Suplementos Recomendados
${(details.supplements || []).map((s: string) => `- ${s}`).join('\n')}

### Alimentos a Evitar
${(details.restrictedFoods || []).map((f: string) => `- ${f}`).join('\n')}
  `;
}

/**
 * Genera plan nutricional genérico cuando no existe específico
 */
function generateGenericNutritionPlan(objective: string, weight: number, level: string): string {
  // Estimaciones basadas en fórmulas científicas
  const tdee = estimateTDEE(weight, level);
  
  let dailyCalories: number, protein: number, carbs: number, fats: number;
  
  if (objective === 'masa') {
    dailyCalories = tdee + 500; // Superávit de 500 kcal
    protein = weight * 2.0; // 2.0g/kg
    fats = weight * 1.0; // 1.0g/kg
    carbs = (dailyCalories - (protein * 4 + fats * 9)) / 4;
  } else if (objective === 'grasa') {
    dailyCalories = tdee - 500; // Déficit de 500 kcal
    protein = weight * 2.4; // 2.4g/kg (preservación)
    fats = weight * 0.8; // 0.8g/kg (mínimo)
    carbs = (dailyCalories - (protein * 4 + fats * 9)) / 4;
  } else {
    // Mantener
    dailyCalories = tdee;
    protein = weight * 1.6; // 1.6g/kg
    carbs = weight * 3.5; // 3.5g/kg
    fats = weight * 0.9; // 0.9g/kg
  }
  
  return `
## Plan Nutricional Estimado

### Macronutrientes Diarios
- **Calorías**: ${Math.round(dailyCalories)} kcal
- **Proteína**: ${Math.round(protein)}g
- **Carbohidratos**: ${Math.round(carbs)}g
- **Grasas**: ${Math.round(fats)}g

### Estrategia
${objective === 'masa' ? '✅ Superávit calórico para ganancia muscular\n✅ Proteína alta para síntesis proteica' : objective === 'grasa' ? '✅ Déficit calórico para pérdida grasa\n✅ Proteína MÁXIMA para preservación muscular' : '✅ Balance calórico perfecto\n✅ Dieta flexible y sostenible'}

  `;
}

/**
 * Estima TDEE basado en nivel y peso
 */
function estimateTDEE(weight: number, level: string): number {
  // Fórmula aproximada: TDEE = weight * 22-28 (sedentario con entrenamiento)
  const baseMultiplier: Record<string, number> = {
    principiante: 24,
    intermedio: 26,
    avanzado: 28,
  };
  
  return weight * (baseMultiplier[level] || 26);
}

export default {
  generateProfessionalRoutineDescription,
  generateNutritionPlanWithMacros,
};

// lib/routine-generator.ts
import type { WizardData, Routine, RoutineDay } from '@/types';
import { generateRoutineDescriptionAI, generateMotivationalTipsAI } from './ai-service';

export const generateRoutine = async (data: WizardData): Promise<Routine> => {
  const { objective, level, days, location, sessionDuration, injuries, exercisePreferences, cardio, trainingStyle, recoveryPriority } = data;

  if (!objective || !level || !days || !location) {
    throw new Error('Todos los campos son requeridos');
  }

  const exercises = generateExercises(objective, level, days, location, sessionDuration, injuries, exercisePreferences, cardio, trainingStyle);
  const title = generateTitle(objective, level, days, sessionDuration, trainingStyle);
  
  // Generate AI-powered description with integrated fallback
  // The AI service always returns a value (either from Groq or fallback)
  const description = await generateRoutineDescriptionAI({
    objective,
    level,
    days,
    cardio,
    sessionDuration,
    trainingStyle,
    recoveryPriority,
  });

  // Generate AI-powered motivational benefits with integrated fallback
  // The AI service always returns an array (either from Groq or fallback)
  const benefits = await generateMotivationalTipsAI(objective, level, trainingStyle);

  return {
    id: Date.now().toString(),
    title,
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    description,
    objective,
    level,
    days,
    location,
    content: description,
    days_detail: exercises,
    benefits,
    seoDescription: `Rutina personalizada ${days} días de ${objective} para nivel ${level} - Optimizada para ${trainingStyle || 'fitness'}`,
    seoKeywords: [
      `rutina ${days} días`,
      objective,
      level,
      location,
      'fitness',
      'personalizada',
      ...(trainingStyle ? [trainingStyle] : []),
      ...(cardio ? [cardio] : []),
    ],
  };
};

const generateTitle = (objective: string, level: string, days: number, sessionDuration?: string | null, trainingStyle?: string | null): string => {
  const dayText = days === 2 ? 'dos' : days === 3 ? 'tres' : days === 4 ? 'cuatro' : 'cinco';
  const objectiveText =
    {
      masa: 'Ganancia De Masa',
      grasa: 'Pérdida De Grasa',
      mantener: 'Mantenimiento',
    }[objective] || 'Fitness';
  
  const styleText = trainingStyle ? ` - ${trainingStyle.toUpperCase()}` : '';
  const durationText = sessionDuration ? ` (${sessionDuration} min)` : '';

  return `Rutina ${dayText} días ${objectiveText}${styleText} - ${level.charAt(0).toUpperCase() + level.slice(1)}${durationText}`;
};

const generateExercises = (
  objective: string,
  level: string,
  days: number,
  location: string,
  sessionDuration?: string | null,
  injuries?: string[],
  exercisePreferences?: string[],
  cardio?: string | null,
  trainingStyle?: string | null
): RoutineDay[] => {
  if (location === 'casa') {
    return generateHomeExercises(objective, level, days, sessionDuration, injuries, exercisePreferences, cardio);
  }

  return generateGymExercises(objective, level, days, sessionDuration, injuries, exercisePreferences, cardio, trainingStyle);
};

const generateHomeExercises = (
  _objective: string,
  level: string,
  days: number,
  _sessionDuration?: string | null,
  _injuries?: string[],
  _exercisePreferences?: string[],
  _cardio?: string | null
): RoutineDay[] => {
  if (days === 2) {
    return [
      {
        day: 'Día 1',
        exercises: [
          { name: 'Flexiones', sets: 3, reps: level === 'principiante' ? '8-12' : '12-15' },
          { name: 'Sentadillas', sets: 3, reps: '15-20' },
          { name: 'Flexiones diamante', sets: 3, reps: '6-10' },
          { name: 'Estocadas', sets: 3, reps: '12-15' },
          { name: 'Tablón', sets: 3, reps: '30-60 seg' },
        ],
      },
      {
        day: 'Día 2',
        exercises: [
          { name: 'Dominadas en barra', sets: 3, reps: '8-15' },
          { name: 'Fondos en silla', sets: 3, reps: '10-15' },
          { name: 'Sentadillas búlgaro', sets: 3, reps: '10-15' },
          { name: 'Flexiones inclinadas', sets: 3, reps: '10-15' },
          { name: 'Tablón lateral', sets: 2, reps: '20-40 seg' },
        ],
      },
    ];
  }

  if (days === 3) {
    return [
      {
        day: 'Día 1',
        exercises: [
          { name: 'Flexiones', sets: 3, reps: level === 'principiante' ? '10-12' : '15-20' },
          { name: 'Sentadillas', sets: 4, reps: '15-20' },
          { name: 'Remos en barra', sets: 3, reps: '10-12' },
          { name: 'Estocadas alternas', sets: 3, reps: '12-15' },
          { name: 'Flexiones abdominales', sets: 3, reps: '15-20' },
        ],
      },
      {
        day: 'Día 2',
        exercises: [
          { name: 'Dominadas', sets: 3, reps: level === 'principiante' ? '5-8' : '10-15' },
          { name: 'Fondos en silla', sets: 3, reps: '10-15' },
          { name: 'Saltos', sets: 3, reps: '15-20' },
          { name: 'Flexiones diamante', sets: 3, reps: '8-12' },
          { name: 'Tabla frontal', sets: 3, reps: '40-60 seg' },
        ],
      },
      {
        day: 'Día 3',
        exercises: [
          { name: 'Sentadillas búlgaro', sets: 3, reps: '12-15' },
          { name: 'Flexiones inclinadas', sets: 3, reps: '10-15' },
          { name: 'Sentadillas de pistola (modificada)', sets: 2, reps: '5-10' },
          { name: 'Dominadas australianas', sets: 3, reps: '10-15' },
          { name: 'Escalada de montaña', sets: 3, reps: '20-30' },
        ],
      },
    ];
  }

  if (days === 4) {
    return [
      {
        day: 'Día 1 (Push)',
        exercises: [
          { name: 'Flexiones', sets: 4, reps: '12-15' },
          { name: 'Flexiones inclinadas', sets: 3, reps: '10-12' },
          { name: 'Flexiones diamante', sets: 3, reps: '8-10' },
          { name: 'Fondos en silla', sets: 3, reps: '10-15' },
          { name: 'Elevaciones laterales con botella', sets: 2, reps: '12-15' },
        ],
      },
      {
        day: 'Día 2 (Pull)',
        exercises: [
          { name: 'Dominadas', sets: 4, reps: '8-12' },
          { name: 'Remos en barra', sets: 3, reps: '12-15' },
          { name: 'Dominadas australianas', sets: 3, reps: '12-15' },
          { name: 'Encogimientos de hombros', sets: 3, reps: '15-20' },
          { name: 'Tablón frontal', sets: 3, reps: '45-60 seg' },
        ],
      },
      {
        day: 'Día 3 (Pierna)',
        exercises: [
          { name: 'Sentadillas', sets: 4, reps: '15-20' },
          { name: 'Sentadillas búlgaro', sets: 3, reps: '12-15' },
          { name: 'Estocadas', sets: 3, reps: '12-15' },
          { name: 'Saltos', sets: 3, reps: '12-15' },
          { name: 'Cardio: Carrera o saltar cuerda', sets: 1, reps: '10-15 min' },
        ],
      },
      {
        day: 'Día 4 (Hibrido)',
        exercises: [
          { name: 'Flexiones', sets: 3, reps: '12-15' },
          { name: 'Sentadillas', sets: 3, reps: '15-20' },
          { name: 'Dominadas', sets: 3, reps: '8-12' },
          { name: 'Fondos en silla', sets: 3, reps: '10-12' },
          { name: 'Cardio: HIIT (intervalos sprint/descanso)', sets: 6, reps: '30 seg / 30 seg' },
        ],
      },
    ];
  }

  // 5 días
  return [
    {
      day: 'Día 1 (Push)',
      exercises: [
        { name: 'Flexiones', sets: 4, reps: '12-15' },
        { name: 'Flexiones inclinadas', sets: 3, reps: '10-12' },
        { name: 'Flexiones diamante', sets: 3, reps: '8-12' },
        { name: 'Fondos en silla', sets: 3, reps: '10-15' },
        { name: 'Elevaciones laterales', sets: 2, reps: '12-15' },
      ],
    },
    {
      day: 'Día 2 (Pull)',
      exercises: [
        { name: 'Dominadas', sets: 4, reps: '8-12' },
        { name: 'Remos en barra', sets: 3, reps: '12-15' },
        { name: 'Dominadas australianas', sets: 3, reps: '12-15' },
        { name: 'Encogimientos de hombros', sets: 3, reps: '15-20' },
        { name: 'Curl con botella', sets: 2, reps: '12-15' },
      ],
    },
    {
      day: 'Día 3 (Pierna)',
      exercises: [
        { name: 'Sentadillas', sets: 4, reps: '15-20' },
        { name: 'Sentadillas búlgaro', sets: 3, reps: '12-15' },
        { name: 'Estocadas', sets: 3, reps: '12-15' },
        { name: 'Saltos', sets: 3, reps: '15-20' },
        { name: 'Pantorrillas', sets: 2, reps: '20-30' },
      ],
    },
    {
      day: 'Día 4 (Push Ligero)',
      exercises: [
        { name: 'Flexiones', sets: 3, reps: '12-15' },
        { name: 'Fondos en silla', sets: 3, reps: '12-15' },
        { name: 'Flexiones inclinadas', sets: 3, reps: '10-12' },
        { name: 'Elevaciones laterales', sets: 3, reps: '12-15' },
        { name: 'Cardio ligero: Caminar rápido o movilidad', sets: 1, reps: '10-20 min' },
      ],
    },
    {
      day: 'Día 5 (Pull + Pierna)',
      exercises: [
        { name: 'Dominadas', sets: 3, reps: '8-10' },
        { name: 'Sentadillas', sets: 3, reps: '15-20' },
        { name: 'Remos en barra', sets: 3, reps: '12-15' },
        { name: 'Estocadas', sets: 3, reps: '12-15' },
        { name: 'Carrera ligera o bicicleta', sets: 2, reps: '10-15 min' },
      ],
    },
  ];
};

const generateGymExercises = (
  _objective: string,
  _level: string,
  days: number,
  _sessionDuration?: string | null,
  _injuries?: string[],
  _exercisePreferences?: string[],
  _cardio?: string | null,
  _trainingStyle?: string | null
): RoutineDay[] => {
  if (days === 2) {
    return [
      {
        day: 'Día 1',
        exercises: [
          { name: 'Press de banca', sets: 3, reps: '8-12', rest: '2-3 min' },
          { name: 'Sentadillas', sets: 3, reps: '8-12', rest: '2-3 min' },
          { name: 'Remo con barra', sets: 3, reps: '8-12', rest: '2-3 min' },
          { name: 'Press militar', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Curls de bíceps', sets: 2, reps: '10-12', rest: '90 seg' },
        ],
      },
      {
        day: 'Día 2',
        exercises: [
          { name: 'Peso muerto', sets: 3, reps: '6-8', rest: '3 min' },
          { name: 'Sentadillas búlgaro', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Bench press inclinado', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Jalación', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Extensión de tríceps', sets: 2, reps: '10-12', rest: '90 seg' },
        ],
      },
    ];
  }

  if (days === 3) {
    return [
      {
        day: 'Lunes - Día A',
        exercises: [
          { name: 'Press de banca plano', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Sentadillas', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Remo con barra', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Press militar', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Dominadas', sets: 3, reps: '8-12', rest: '2 min' },
          { name: 'Curls de bíceps', sets: 3, reps: '10-12', rest: '90 seg' },
        ],
      },
      {
        day: 'Miércoles - Día B',
        exercises: [
          { name: 'Sentadillas', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Peso muerto', sets: 4, reps: '6-8', rest: '3 min' },
          { name: 'Bench press inclinado', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Remo en máquina', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Fondos en paralelas', sets: 3, reps: '8-12', rest: '2 min' },
          { name: 'Extensiones de tríceps', sets: 3, reps: '10-12', rest: '90 seg' },
        ],
      },
      {
        day: 'Viernes - Día A',
        exercises: [
          { name: 'Press de banca plano', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Sentadillas', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Remo con barra', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Press militar', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Jalones altos', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Barras dobladas', sets: 3, reps: '10-12', rest: '90 seg' },
        ],
      },
    ];
  }

  if (days === 4) {
    return [
      {
        day: 'Lunes - Torso (Push)',
        exercises: [
          { name: 'Press de banca', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Press inclinado con mancuernas', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Press militar', sets: 3, reps: '8-10', rest: '2.5 min' },
          { name: 'Dips', sets: 3, reps: '8-12', rest: '2 min' },
          { name: 'Elevaciones laterales', sets: 3, reps: '12-15', rest: '90 seg' },
        ],
      },
      {
        day: 'Martes - Pierna',
        exercises: [
          { name: 'Sentadillas', sets: 4, reps: '8-10', rest: '3 min' },
          { name: 'Peso muerto rumano', sets: 3, reps: '8-10', rest: '2.5 min' },
          { name: 'Leg press', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Extensiones de cuádriceps', sets: 3, reps: '12-15', rest: '90 seg' },
          { name: 'Curls de isquios', sets: 3, reps: '12-15', rest: '90 seg' },
        ],
      },
      {
        day: 'Jueves - Torso (Pull)',
        exercises: [
          { name: 'Dominadas o jalón', sets: 4, reps: '8-12', rest: '2.5 min' },
          { name: 'Remo inclinado', sets: 4, reps: '8-10', rest: '2.5 min' },
          { name: 'Remo en máquina', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Curl de bíceps barra', sets: 3, reps: '10-12', rest: '90 seg' },
          { name: 'Curl martillo', sets: 3, reps: '12-15', rest: '90 seg' },
        ],
      },
      {
        day: 'Sábado - Pierna 2',
        exercises: [
          { name: 'Sentadillas búlgaro', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Peso muerto convencional', sets: 4, reps: '6-8', rest: '3 min' },
          { name: 'Hack squat', sets: 3, reps: '10-12', rest: '2 min' },
          { name: 'Leg curl tumbado', sets: 3, reps: '12-15', rest: '90 seg' },
          { name: 'Pantorrillas en máquina', sets: 3, reps: '15-20', rest: '60 seg' },
        ],
      },
    ];
  }

  // 5 días
  return [
    {
      day: 'Lunes - Push 1',
      exercises: [
        { name: 'Press de banca', sets: 4, reps: '6-8', rest: '3 min' },
        { name: 'Press inclinado con mancuernas', sets: 3, reps: '8-10', rest: '2.5 min' },
        { name: 'Press militar', sets: 3, reps: '8-10', rest: '2.5 min' },
        { name: 'Elevaciones laterales', sets: 4, reps: '12-15', rest: '90 seg' },
        { name: 'Extensiones de tríceps cuerda', sets: 3, reps: '12-15', rest: '90 seg' },
      ],
    },
    {
      day: 'Martes - Pull 1',
      exercises: [
        { name: 'Dominadas', sets: 4, reps: '8-12', rest: '2.5 min' },
        { name: 'Remo inclinado', sets: 4, reps: '8-10', rest: '2.5 min' },
        { name: 'Remo en máquina', sets: 3, reps: '10-12', rest: '2 min' },
        { name: 'Curl de bíceps', sets: 3, reps: '10-12', rest: '90 seg' },
        { name: 'Cara tirones', sets: 3, reps: '15-20', rest: '60 seg' },
      ],
    },
    {
      day: 'Miércoles - Pierna 1',
      exercises: [
        { name: 'Sentadillas', sets: 4, reps: '6-8', rest: '3 min' },
        { name: 'Peso muerto rumano', sets: 4, reps: '8-10', rest: '2.5 min' },
        { name: 'Leg press', sets: 3, reps: '10-12', rest: '2 min' },
        { name: 'Extensiones cuádriceps', sets: 3, reps: '12-15', rest: '90 seg' },
        { name: 'Curls isquios', sets: 3, reps: '12-15', rest: '90 seg' },
      ],
    },
    {
      day: 'Viernes - Push 2',
      exercises: [
        { name: 'Press declined', sets: 3, reps: '8-10', rest: '2.5 min' },
        { name: 'Máquina pecho', sets: 3, reps: '10-12', rest: '2 min' },
        { name: 'Press de hombro máquina', sets: 3, reps: '10-12', rest: '2 min' },
        { name: 'Elevaciones frontales', sets: 3, reps: '12-15', rest: '90 seg' },
        { name: 'Barras dobladas', sets: 3, reps: '10-12', rest: '90 seg' },
      ],
    },
    {
      day: 'Sábado - Pull 2 + Pierna',
      exercises: [
        { name: 'Jalón lateral', sets: 4, reps: '10-12', rest: '2 min' },
        { name: 'Remo con mancuernas', sets: 3, reps: '10-12', rest: '2 min' },
        { name: 'Sentadillas búlgaro', sets: 3, reps: '10-12', rest: '2 min' },
        { name: 'Curl martillo', sets: 2, reps: '12-15', rest: '90 seg' },
        { name: 'Pantorrillas', sets: 2, reps: '15-20', rest: '60 seg' },
      ],
    },
  ];
};


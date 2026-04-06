// types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  goal?: string;
  level?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface WizardData {
  // Básicos
  objective: 'masa' | 'grasa' | 'mantener' | null;
  level: 'principiante' | 'intermedio' | 'avanzado' | null;
  days: number | null;
  location: 'gimnasio' | 'casa' | null;
  
  // Experiencia
  experience?: 'novato' | 'menos_1año' | '1a2años' | 'mas_2años' | null;
  experienceMonths?: 'novato' | '0-6m' | '6-12m' | '+1año' | null;
  
  // Datos personales (nuevos - para cálculos nutricionales)
  weight?: number; // kg
  height?: number; // cm
  age?: number; // años
  
  // Limitaciones
  injuries?: string[]; // p.ej: ['espalda', 'rodilla']
  
  // Tiempo disponible
  sessionDuration?: '30' | '45' | '60' | '90' | null;
  
  // Preferencias
  exercisePreferences?: string[]; // p.ej: ['compuestos', 'aislamiento']
  cardio?: 'bajo' | 'moderado' | 'alto' | null;
  trainingStyle?: 'ppl' | 'upperlower' | 'fullbody' | 'roulet' | null;
  trainingTime?: 'manana' | 'mediodía' | 'tarde' | 'noche' | null;
  recoveryPriority?: 'alto' | 'medio' | 'bajo' | null;
  
  // Nutrición (nuevos - para recomendaciones específicas)
  dietarySensitivity?: string[]; // p.ej: ['lactosa', 'gluten', 'vegetariano']
  supplementInterest?: string[]; // p.ej: ['proteína', 'creatina', 'vitaminas']
  mealFrequency?: '3' | '4' | '5' | '6'; // comidas por día
  
  // Equipamiento disponible (para casa)
  equipment?: string[]; // p.ej: ['mancuernas', 'barra', 'bandas']
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest?: string;
}

export interface RoutineDay {
  day: string;
  exercises: Exercise[];
}

export interface Routine {
  id: string;
  title: string;
  slug: string;
  description: string;
  objective: string;
  level: string;
  days: number;
  location: string;
  content: string;
  days_detail: RoutineDay[];
  benefits: string[];
  seoDescription: string;
  seoKeywords: string[];
}

export interface PrebuiltRoutine {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullContent: string;
  exercises: RoutineDay[];
  objective: string;
  level: string;
  days: number;
}

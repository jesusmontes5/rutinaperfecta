/**
 * exerciseUtils - Utilidades para manipulación de ejercicios
 * Funciones helper para búsqueda, filtrado, agrupación y análisis
 */

import { exerciseDatabase, type Exercise, type BodyPart, bodyPartMetadata } from './exerciseDatabase';

/**
 * Busca ejercicios por término de búsqueda (nombre o descripción)
 */
export function searchExercises(term: string): Exercise[] {
  const lowerTerm = term.toLowerCase().trim();

  if (!lowerTerm) return [];

  return exerciseDatabase.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(lowerTerm) ||
      exercise.description.toLowerCase().includes(lowerTerm) ||
      exercise.bodyPart.toLowerCase().includes(lowerTerm)
  );
}

/**
 * Agrupa ejercicios por grupo muscular
 */
export function groupExercisesByBodyPart(): Record<BodyPart, Exercise[]> {
  const grouped: Partial<Record<BodyPart, Exercise[]>> = {};

  exerciseDatabase.forEach((exercise) => {
    if (!grouped[exercise.bodyPart]) {
      grouped[exercise.bodyPart] = [];
    }
    grouped[exercise.bodyPart]!.push(exercise);
  });

  return grouped as Record<BodyPart, Exercise[]>;
}

/**
 * Obtiene ejercicios por nivel de dificultad
 */
export function getExercisesByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Exercise[] {
  return exerciseDatabase.filter((ex) => ex.difficulty === difficulty);
}

/**
 * Obtiene estadísticas de ejercicios
 */
export function getExerciseStats() {
  const stats = {
    total: exerciseDatabase.length,
    byBodyPart: {} as Record<BodyPart, number>,
    byDifficulty: {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    },
    averageReps: 0,
    totalSeries: 0,
  };

  exerciseDatabase.forEach((ex) => {
    // Por grupo muscular
    stats.byBodyPart[ex.bodyPart] = (stats.byBodyPart[ex.bodyPart] || 0) + 1;

    // Por dificultad
    stats.byDifficulty[ex.difficulty]++;

    // Series totales
    if (ex.sets) {
      stats.totalSeries += ex.sets;
    }
  });

  return stats;
}

/**
 * Sugiere ejercicios complementarios para un grupo muscular
 */
export function getSuggestedExercises(
  bodyPart: BodyPart,
  limit: number = 3
): Exercise[] {
  const exercises = exerciseDatabase.filter((ex) => ex.bodyPart === bodyPart);

  // Retorna un subconjunto variado
  const difficulty: ('beginner' | 'intermediate' | 'advanced')[] = [
    'beginner',
    'intermediate',
    'advanced',
  ];

  const suggested: Exercise[] = [];

  for (const diff of difficulty) {
    const found = exercises.find((ex) => ex.difficulty === diff && !suggested.includes(ex));
    if (found) {
      suggested.push(found);
    }
  }

  return suggested.slice(0, limit);
}

/**
 * Genera un resumen de ejercicios para una rutina
 */
export function createWorkoutSummary(
  selectedExercises: Exercise[]
): {
  totalTime: number; // minutos aprox
  totalSeries: number;
  totalReps: string;
  difficulty: string;
  muscleGroups: BodyPart[];
} {
  let totalSeries = 0;
  const muscleGroups = new Set<BodyPart>();
  const difficulties = { beginner: 0, intermediate: 0, advanced: 0 };

  selectedExercises.forEach((ex) => {
    totalSeries += ex.sets || 0;
    muscleGroups.add(ex.bodyPart);
    difficulties[ex.difficulty]++;
  });

  const totalExercises = selectedExercises.length;
  const avgTimePerExercise = 6; // minutos
  const totalTime = totalExercises * avgTimePerExercise + totalSeries * 1; // + 1 min por serie de descanso

  // Determinar dificultad dominante
  const maxDifficulty = Math.max(
    difficulties.beginner,
    difficulties.intermediate,
    difficulties.advanced
  );
  let difficulty = 'Mixed';
  if (difficulties.advanced === maxDifficulty && difficulties.advanced > 0) {
    difficulty = 'Avanzado';
  } else if (difficulties.intermediate === maxDifficulty && difficulties.intermediate > 0) {
    difficulty = 'Intermedio';
  } else if (difficulties.beginner === maxDifficulty) {
    difficulty = 'Principiante';
  }

  return {
    totalTime: Math.round(totalTime),
    totalSeries,
    totalReps: selectedExercises.map((ex) => ex.reps).join(' / '),
    difficulty,
    muscleGroups: Array.from(muscleGroups),
  };
}

/**
 * Retorna nombres legibles para etiquetas
 */
export function getBodyPartLabel(bodyPart: BodyPart): string {
  return bodyPartMetadata[bodyPart]?.label || bodyPart;
}

/**
 * Valida si un ejercicio es válido
 */
export function validateExercise(exercise: Partial<Exercise>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!exercise.id) errors.push('ID requerido');
  if (!exercise.name) errors.push('Nombre requerido');
  if (!exercise.bodyPart) errors.push('Grupo muscular requerido');
  if (!exercise.description) errors.push('Descripción requerida');
  if (!exercise.media) errors.push('URL de video requerida');
  if (!exercise.difficulty) errors.push('Dificultad requerida');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Exporta ejercicios a formato CSV
 */
export function exportExercisesDataCSV(exercises: Exercise[] = exerciseDatabase): string {
  const headers = ['ID', 'Nombre', 'Grupo Muscular', 'Descripción', 'Dificultad', 'Series', 'Reps'];
  const rows = exercises.map((ex) => [
    ex.id,
    ex.name,
    getBodyPartLabel(ex.bodyPart),
    ex.description,
    ex.difficulty,
    ex.sets || '-',
    ex.reps || '-',
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  return csv;
}

/**
 * Descarga CSV de ejercicios
 */
export function downloadExercisesCSV(exercises: Exercise[] = exerciseDatabase): void {
  const csv = exportExercisesDataCSV(exercises);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `ejercicios-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

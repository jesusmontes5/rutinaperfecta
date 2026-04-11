/**
 * Ejemplos de Uso Avanzado - Body Exercise Explorer
 * Implementaciones comunes y patrones reutilizables
 */

// =====================================================
// EJEMPLO 1: Búsqueda de Ejercicios
// =====================================================

import { searchExercises, getExercisesByDifficulty } from '@/lib/exerciseUtils';

export function SearchExample() {
  const handleSearch = (term: string) => {
    const results = searchExercises(term);
    console.log(`Encontrados ${results.length} ejercicios:`);
    results.forEach((ex) => console.log(`- ${ex.name}`));
  };

  return (
    <div>
      <input
        placeholder="Buscar ejercicio..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

// =====================================================
// EJEMPLO 2: Filtro por Dificultad
// =====================================================

import { useExerciseFiltering } from '@/hooks/useExerciseFiltering';

export function DifficultyFilterExample() {
  const { filteredExercises, selectedDifficulty, setSelectedDifficulty } = useExerciseFiltering({
    difficulty: 'beginner',
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['beginner', 'intermediate', 'advanced'].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level as any)}
            className={`px-4 py-2 rounded ${
              selectedDifficulty === level ? 'bg-gold-primary text-white' : 'bg-gold-light/20'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div>
        <p className="text-sm text-gray-600">Ejercicios encontrados: {filteredExercises.length}</p>
      </div>
    </div>
  );
}

// =====================================================
// EJEMPLO 3: Crear Rutina Personalizada
// =====================================================

import { createWorkoutSummary } from '@/lib/exerciseUtils';
import { useState } from 'react';
import type { Exercise } from '@/lib/exerciseDatabase';

export function CustomWorkoutExample() {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const summary = createWorkoutSummary(selectedExercises);

  const handleAddExercise = (exercise: Exercise) => {
    setSelectedExercises((prev) => [...prev, exercise]);
  };

  const handleRemoveExercise = (id: string) => {
    setSelectedExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">Tiempo Total</p>
          <p className="text-2xl font-bold text-blue-600">{summary.totalTime} min</p>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <p className="text-sm text-gray-600">Series</p>
          <p className="text-2xl font-bold text-green-600">{summary.totalSeries}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded col-span-2">
          <p className="text-sm text-gray-600">Nivel</p>
          <p className="text-lg font-bold text-purple-600">{summary.difficulty}</p>
        </div>
      </div>

      <div className="space-y-2">
        {selectedExercises.map((ex) => (
          <div key={ex.id} className="flex justify-between items-center p-3 bg-gold-light/20 rounded">
            <span className="font-600">{ex.name}</span>
            <button
              onClick={() => handleRemoveExercise(ex.id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// EJEMPLO 4: Estadísticas de Ejercicios
// =====================================================

import { getExerciseStats, groupExercisesByBodyPart } from '@/lib/exerciseUtils';

export function ExerciseStatsExample() {
  const stats = getExerciseStats();
  const grouped = groupExercisesByBodyPart();

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="p-6 bg-gradient-to-br from-gold-light/20 to-gold-very-light/40 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Total de Ejercicios</h3>
        <p className="text-3xl font-bold text-gold-dark">{stats.total}</p>
      </div>

      {/* Por Grupo Muscular */}
      <div>
        <h3 className="font-bold text-lg mb-4">Por Grupo Muscular</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(stats.byBodyPart).map(([bodyPart, count]) => (
            <div key={bodyPart} className="p-4 bg-white border border-gold-light/50 rounded-lg">
              <p className="text-sm text-gray-600 capitalize">{bodyPart}</p>
              <p className="text-2xl font-bold text-gold-primary">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Por Dificultad */}
      <div>
        <h3 className="font-bold text-lg mb-4">Por Dificultad</h3>
        <div className="space-y-2">
          {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
            <div key={difficulty} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-gold-primary/20" />
              <span className="capitalize">{difficulty}</span>
              <span className="ml-auto font-bold text-gold-dark">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// EJEMPLO 5: Exportar Ejercicios
// =====================================================

import { downloadExercisesCSV, exportExercisesDataCSV } from '@/lib/exerciseUtils';

export function ExportExample() {
  return (
    <div className="space-y-4">
      <button
        onClick={() => downloadExercisesCSV()}
        className="w-full px-4 py-3 bg-gold-primary text-white font-bold rounded-lg hover:bg-gold-dark transition"
      >
        📥 Descargar todos los ejercicios (CSV)
      </button>

      <button
        onClick={() => {
          const csv = exportExercisesDataCSV();
          console.log('CSV:', csv);
        }}
        className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
      >
        📋 Ver CSV en consola
      </button>
    </div>
  );
}

// =====================================================
// EJEMPLO 6: Componente de Filtro Avanzado
// =====================================================

'use client';

import { useState } from 'react';
import { useExerciseFiltering } from '@/hooks/useExerciseFiltering';
import ExerciseCard from '@/components/ExerciseCard';
import type { BodyPart } from '@/lib/exerciseDatabase';

export function AdvancedFilterComponent() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const { filteredExercises, searchTerm, setSearchTerm } = useExerciseFiltering({
    bodyPart: selectedBodyPart,
  });

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gold-light rounded-lg focus:outline-none focus:border-gold-primary focus:ring-2 focus:ring-gold-primary/10"
        />
      </div>

      {/* Botones de grupo muscular */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedBodyPart(null)}
          className={`px-4 py-2 rounded-full font-600 transition ${
            selectedBodyPart === null ? 'bg-gold-primary text-white' : 'bg-gold-light/20 text-gold-dark'
          }`}
        >
          Todos
        </button>
        {(['chest', 'back', 'shoulders', 'arms', 'abs', 'legs'] as BodyPart[]).map((part) => (
          <button
            key={part}
            onClick={() => setSelectedBodyPart(part)}
            className={`px-4 py-2 rounded-full font-600 transition capitalize ${
              selectedBodyPart === part
                ? 'bg-gold-primary text-white'
                : 'bg-gold-light/20 text-gold-dark hover:bg-gold-light/30'
            }`}
          >
            {part}
          </button>
        ))}
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={i} />
        ))}
      </div>

      {/* Estado vacío */}
      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No se encontraron ejercicios</p>
        </div>
      )}
    </div>
  );
}

// =====================================================
// EJEMPLO 7: Validar Ejercicio
// =====================================================

import { validateExercise } from '@/lib/exerciseUtils';

export function ValidateExerciseExample() {
  const handleValidate = (exerciseData: any) => {
    const { isValid, errors } = validateExercise(exerciseData);

    if (isValid) {
      console.log('✓ Ejercicio válido');
    } else {
      console.log('✗ Errores encontrados:');
      errors.forEach((error) => console.log(`  - ${error}`));
    }
  };

  return (
    <button
      onClick={() =>
        handleValidate({
          id: 'test-001',
          name: 'Mi Ejercicio',
          bodyPart: 'chest',
          description: 'Test',
          media: '/videos/test.mp4',
          difficulty: 'beginner',
        })
      }
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Validar Ejercicio
    </button>
  );
}

// =====================================================
// EXPORTAR TODOS LOS EJEMPLOS
// =====================================================

export const ExamplesRegistry = {
  SearchExample,
  DifficultyFilterExample,
  CustomWorkoutExample,
  ExerciseStatsExample,
  ExportExample,
  AdvancedFilterComponent,
  ValidateExerciseExample,
};

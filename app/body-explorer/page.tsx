/**
 * Página: Body Exercise Explorer
 * Demostración de la funcionalidad de mapa interactivo del cuerpo
 * con una moderna interfaz de fitness premium
 */

import BodyExerciseExplorer from '@/components/BodyExerciseExplorer';

export const metadata = {
  title: 'Explorador de Ejercicios - Rutina Perfecta',
  description:
    'Explora ejercicios por grupo muscular con nuestro mapa interactivo. Videos demostrativos, técnicas correctas y planes personalizados.',
  keywords: ['ejercicios', 'fitness', 'entrenamiento', 'groups musculares', 'rutinas'],
};

export default function BodyExplorerPage() {
  return (
    <main className="bg-gradient-to-b from-white via-gold-very-light/10 to-white min-h-screen">
      <BodyExerciseExplorer />
    </main>
  );
}

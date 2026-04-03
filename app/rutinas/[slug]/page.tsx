// app/rutinas/[slug]/page.tsx
import { Metadata } from 'next';
import { prebuiltRoutines } from '@/lib/routines-data';
import RoutineDetailClient from '@/components/RoutineDetailClient';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

// Generate static params para SSG
export async function generateStaticParams() {
  return prebuiltRoutines.map((routine) => ({
    slug: routine.slug,
  }));
}

// Generate metadata dynamic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const routine = prebuiltRoutines.find((r) => r.slug === params.slug);

  if (!routine) {
    return {
      title: 'Rutina no encontrada',
    };
  }

  return {
    title: `${routine.title} - Rutina Perfecta`,
    description: routine.description,
    keywords: [
      routine.title,
      `rutina ${routine.days} días`,
      routine.objective,
      routine.level,
      'fitness',
    ],
    openGraph: {
      title: routine.title,
      description: routine.description,
      type: 'article',
    },
  };
}

export default function RoutinePage({ params }: Props) {
  const routine = prebuiltRoutines.find((r) => r.slug === params.slug);

  if (!routine) {
    notFound();
  }

  return <RoutineDetailClient routine={routine} allRoutines={prebuiltRoutines} />;
}

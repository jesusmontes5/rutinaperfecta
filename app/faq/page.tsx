import { Metadata } from 'next';
import FAQClient from '@/components/FAQClient';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Rutina Perfecta',
  description: 'Respuestas a todas tus preguntas sobre cómo funciona nuestro generador de rutinas, nutrición, ejercicios y transformación corporal.',
  keywords: 'faq, preguntas, respuestas, fitness, rutinas, ejercicios, nutrición',
  openGraph: {
    title: 'Preguntas Frecuentes - Rutina Perfecta',
    description: 'Respuestas detalladas a todas tus dudas sobre fitness y rutinas personalizadas',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}

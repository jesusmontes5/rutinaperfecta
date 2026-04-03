// app/page.tsx
'use client';

import WizardForm from '@/components/WizardForm';
import RoutineCard from '@/components/RoutineCard';
import { prebuiltRoutines } from '@/lib/routines-data';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section - Apple Style */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 text-center py-20">
          <div className="space-y-8 animate-fadeIn">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-600 tracking-tight leading-tight">
              Tu rutina de entrenamiento
              <br />
              <span className="text-6xl sm:text-7xl md:text-8xl font-700">personalizada.</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Genera rutinas completamente adaptadas a ti. IA inteligente, científicamente diseñada para máximos resultados.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="#wizard"
                className="px-8 py-3 bg-black text-white text-lg font-500 rounded-full hover:bg-gray-800 transition"
              >
                Comenzar ahora
              </a>
              <Link
                href="/rutinas"
                className="px-8 py-3 bg-gray-100 text-black text-lg font-500 rounded-full hover:bg-gray-200 transition"
              >
                Explorar rutinas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-700 mb-2">2 min</div>
              <p className="text-gray-600">Genera tu rutina</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-700 mb-2">∞</div>
              <p className="text-gray-600">Rutinas personalizadas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-700 mb-2">100%</div>
              <p className="text-gray-600">Basado en ciencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section id="wizard" className="py-20 md:py-32 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-700 mb-4">
              Crea tu rutina
            </h2>
            <p className="text-lg text-gray-600">
              Solo responde a unas preguntas. Nosotros hacemos el resto.
            </p>
          </div>
          <WizardForm />
        </div>
      </section>

      {/* Routines Showcase */}
      <section className="py-20 md:py-32 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-700 mb-4">
              Rutinas populares
            </h2>
            <p className="text-lg text-gray-600">
              Hechas por expertos. Diseñadas para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prebuiltRoutines.map((routine) => (
              <div key={routine.id} className="w-full">
                <RoutineCard routine={routine} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/rutinas"
              className="inline-block px-8 py-3 text-black font-500 hover:underline text-base md:text-lg"
            >
              Ver todas las rutinas →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-700 mb-4">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: '¿Realmente funciona?',
                a: 'Sí. Nuestro sistema usa IA para analizar tu perfil y generar rutinas optimizadas basadas en principios científicos de entrenamiento comprobados.'
              },
              {
                q: '¿Necesito experiencia?',
                a: 'No. Nos adaptamos a tu nivel, desde principiante hasta avanzado. El sistema ajusta intensidad, volumen y ejercicios automáticamente.'
              },
              {
                q: '¿Funciona sin gimnasio?',
                a: 'Completamente. Puedes elegir entrenar en casa con peso corporal, o con equipamiento que tengas disponible.'
              },
              {
                q: '¿Puedo cambiar de rutina?',
                a: 'Sí, cuando quieras. Recomendamos cambiar cada 4-6 semanas para evitar adaptación muscular.'
              }
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
              >
                <summary className="font-600 text-lg flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition text-xl">▶</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-black text-white border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-5xl md:text-6xl font-700 mb-6">
            Comienza hoy
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Obtén tu rutina personalizada en 2 minutos. Sin suscripción. Sin sorpresas.
          </p>
          <a
            href="#wizard"
            className="inline-block px-8 py-3 bg-white text-black text-lg font-600 rounded-full hover:bg-gray-100 transition"
          >
            Crear rutina
          </a>
        </div>
      </section>
    </main>
  );
}

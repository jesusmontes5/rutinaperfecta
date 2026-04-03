// app/page.tsx
'use client';

import WizardForm from '@/components/WizardForm';
import RoutineCard from '@/components/RoutineCard';
import { prebuiltRoutines } from '@/lib/routines-data';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section - Apple Style Premium */}
      <section className="relative w-full bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-20 md:py-32">
            <div className="space-y-6 sm:space-y-8 md:space-y-10 animate-fadeIn">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 border border-black/10 rounded-full">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-sm font-500 text-gray-700">Generador de rutinas con IA</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-700 tracking-tight leading-[1.1] text-gray-900">
                Tu rutina perfecta en 
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-black via-gray-800 to-gray-700 bg-clip-text text-transparent">2 minutos</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-400">
                Genera rutinas completamente personalizadas con IA inteligente. Científicamente diseñadas para máximos resultados. Sin suscripción, 100% gratis.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8">
                <a
                  href="#wizard"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-600 rounded-xl hover:bg-gray-900 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  Comenzar ahora
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <Link
                  href="/rutinas"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-600 rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-200 text-base sm:text-lg"
                >
                  Explorar rutinas
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-8 sm:pt-12 border-t border-gray-200/50 mt-8 sm:mt-12">
                <p className="text-xs sm:text-sm text-gray-600 mb-4">Usado por miles de usuarios</p>
                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <span className="text-sm font-500 text-gray-700">4.9/5</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                  <span className="text-sm text-gray-600">Generador de IA + Descarga PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Improved */}
      <section className="py-12 sm:py-16 md:py-20 border-t border-gray-200/50 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-12">
            <div className="text-center group">
              <div className="text-5xl sm:text-4xl md:text-5xl font-800 text-gray-900 mb-3 group-hover:text-black transition">
                2<span className="text-2xl sm:text-xl md:text-2xl">min</span>
              </div>
              <p className="text-gray-600 font-500 text-sm sm:text-base">Genera tu rutina personalizada</p>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-4xl md:text-5xl font-800 text-gray-900 mb-3 group-hover:text-black transition">
                ∞
              </div>
              <p className="text-gray-600 font-500 text-sm sm:text-base">Combinaciones posibles</p>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-4xl md:text-5xl font-800 text-gray-900 mb-3 group-hover:text-black transition">
                100%
              </div>
              <p className="text-gray-600 font-500 text-sm sm:text-base">Basado en ciencia fitness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section - Enhanced */}
      <section id="wizard" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-700 text-gray-900">
              Crea tu rutina
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Solo responde a unas preguntas. Nuestro IA hace el resto. 100% personalizado para ti.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 border border-gray-100">
            <WizardForm />
          </div>
        </div>
      </section>

      {/* Routines Showcase - Enhanced */}
      <section className="py-16 sm:py-24 md:py-32 bg-white border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-700 text-gray-900">
              Rutinas populares
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Hechas por expertos en fitness. Optimizadas con IA. Personalizables para cualquier nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {prebuiltRoutines.slice(0, 3).map((routine) => (
              <div key={routine.id} className="w-full">
                <RoutineCard routine={routine} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/rutinas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-600 rounded-xl hover:bg-gray-900 active:scale-95 transition-all duration-200 text-base md:text-lg"
            >
              Ver todas las rutinas
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
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

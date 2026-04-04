// app/legal/aviso-legal/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function AvisoLegalPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ===== HEADING ANIMATION =====
    const heading = contentRef.current?.querySelector('h1');
    if (heading) {
      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
        }
      );
    }

    // ===== SECTIONS ANIMATION =====
    const sections = contentRef.current?.querySelectorAll('section');
    if (sections) {
      gsap.fromTo(
        sections,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      );
    }

    // ===== SUBTITLE ANIMATION =====
    const subtitle = contentRef.current?.querySelector('p:first-of-type');
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Back Button Header */}
      <div className="bg-white border-b border-gold-light/20 py-3 sm:py-4 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-color-text-muted hover:text-gold-dark hover:bg-gold-light/10 px-3 py-2 rounded-xl transition-all font-500 duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Atrás</span>
          </button>
        </div>
      </div>

      <div ref={contentRef} className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

      <article className="prose prose-sm sm:prose max-w-none">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Aviso Legal</h1>

        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">1. Identificación del Proveedor</h2>
          <p>
            <strong>Rutina Perfecta</strong> es un servicio de generación de rutinas de fitness personalizado.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Email: info@rutinaperfecta.com</li>
            <li>Sitio Web: www.rutinaperfecta.com</li>
          </ul>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">2. Términos de Uso</h2>
          <p>
            El acceso y uso de este sitio web está sujeto a los siguientes términos y condiciones. Si
            no aceptas alguno de estos términos, por favor no uses este sitio.
          </p>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">3. Licencia de Uso</h2>
          <p>
            Se te otorga permiso para usar este sitio web solo para fines personales y no comerciales.
            Está prohibido:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Reproducir, copiar o transmitir contenido sin autorización</li>
            <li>Intentar piratear o ganar acceso no autorizado</li>
            <li>Usar bots, spiders o scrapers automáticos</li>
            <li>Interferir con el funcionamiento normal del sitio web</li>
            <li>Usar el contenido para propósitos ilegales</li>
          </ul>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">4. Exención de Responsabilidad Médica</h2>
          <p>
            <strong>IMPORTANTE:</strong> Las rutinas generadas en Rutina Perfecta son solo con propósitos
            educativos e informativos. NO somos profesionales médicos ni entrenadores personales certificados.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-red-700">
            <li>
              Antes de comenzar cualquier programa de ejercicio, consulta con un profesional médico
            </li>
            <li>
              Si tienes condiciones de salud preexistentes, lesiones o estás tomando medicamentos,
              consulta con tu médico
            </li>
            <li>
              Usa las rutinas bajo tu propio riesgo y responsabilidad
            </li>
            <li>
              No somos responsables por lesiones resultantes del uso de nuestras rutinas
            </li>
          </ul>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">5. Garantía de Resultados</h2>
          <p>
            Rutina Perfecta no garantiza resultados específicos. Los resultados varían según cada individuo
            y dependen de factores como:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Consistencia en el entrenamiento</li>
            <li>Nutrición adecuada</li>
            <li>Recuperación y descanso</li>
            <li>Genética individual</li>
            <li>Estado físico inicial</li>
          </ul>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">6. Limitación de Responsabilidad</h2>
          <p>
            En la medida permitida por la ley, Rutina Perfecta no será responsable por:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Daños directos, indirectos, incidentales o consecuentes</li>
            <li>Pérdida de datos o ingresos</li>
            <li>Interrupciones en el servicio</li>
            <li>Errores o imprecisiones en el contenido</li>
            <li>Acceso no autorizado a tu información</li>
          </ul>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">7. Cambios al Contenido</h2>
          <p>
            Nos reservamos el derecho de modificar o discontinuar el contenido del sitio en cualquier
            momento sin previo aviso.
          </p>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">8. Enlaces Externos</h2>
          <p>
            Este sitio puede contener enlaces a sitios web externos. No somos responsables por el
            contenido, precisión o prácticas de privacidad de esos sitios.
          </p>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">9. Derechos de Autor</h2>
          <p>
            Todo el contenido en Rutina Perfecta (texto, imágenes, gráficos) está protegido por derechos
            de autor. La reproducción no autorizada está prohibida.
          </p>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">10. Modificaciones a los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Continuando
            el uso del sitio después de cambios significa que aceptas los nuevos términos.
          </p>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">11. Ley Aplicable</h2>
          <p>
            Este aviso legal se rige por las leyes aplicables. Cualquier disputa se resolverá en los
            tribunales competentes.
          </p>
        </section>

        <section className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gold-dark mb-4">12. Contacto</h2>
          <p>
            Para preguntas sobre este Aviso Legal, contáctanos en: info@rutinaperfecta.com
          </p>
        </section>

        {/* Warning Box */}
        <div className="bg-gradient-to-br from-yellow-50/80 to-amber-50/80 border-2 border-yellow-300/50 rounded-2xl p-6 mt-8 backdrop-blur-sm">
          <h3 className="font-bold text-yellow-900 mb-3">⚠️ Descargo de Responsabilidad Importante</h3>
          <p className="text-yellow-900 text-sm">
            Las rutinas de fitness generadas por Rutina Perfecta son solo para propósitos informativos.
            No reemplazan el asesoramiento profesional médico, nutricional o de entrenamiento personal.
            Siempre consulta con profesionales calificados antes de iniciar cualquier programa de ejercicio.
          </p>
        </div>
      </article>
      </div>
      </div>
    </div>
  );
}

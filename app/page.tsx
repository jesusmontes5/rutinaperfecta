// app/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WizardForm from '@/components/WizardForm';
import RoutineCard from '@/components/RoutineCard';
import { prebuiltRoutines } from '@/lib/routines-data';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const wizardRef = useRef<HTMLElement>(null);
  const routinesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ===== HERO PARALLAX WITH TILT =====
    const heroContent = heroRef.current?.querySelector('[data-hero-content]');
    if (heroContent) {
      gsap.to(heroContent, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          markers: false,
        },
        y: 100,
        opacity: 0.5,
        rotateX: 5,
      });
    }

    // ===== HERO BACKGROUND ELEMENTS - FLOATING =====
    const bgElements = heroRef.current?.querySelectorAll('[data-bg-element]');
    bgElements?.forEach((el, index) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 50%',
          scrub: 2.5,
        },
        y: (index === 0 ? -200 : 150),
        x: (index === 0 ? 50 : -50),
        opacity: 0.2,
        scale: 1.2,
      });
    });

    // ===== STATS STAGGER WITH SCALE & ROTATE =====
    const statItems = statsRef.current?.querySelectorAll('[data-stat-item]');
    if (statItems) {
      gsap.fromTo(
        statItems,
        {
          opacity: 0,
          y: 50,
          scale: 0.5,
          rotateY: 90,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    // ===== WIZARD SECTION - REVEAL WITH BLUR =====
    if (wizardRef.current) {
      gsap.fromTo(
        wizardRef.current.querySelector('[data-wizard-card]'),
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          opacity: 0,
          filter: 'blur(20px)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: wizardRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      );
    }

    // ===== ROUTINES STAGGER WITH ROTATION & SHADOW =====
    const routineCards = routinesRef.current?.querySelectorAll('[data-routine-card]');
    if (routineCards) {
      gsap.fromTo(
        routineCards,
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotateZ: -5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          stagger: 0.25,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: routinesRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    // ===== SECTION TITLES - SPLIT & FADE =====
    const sectionTitles = document.querySelectorAll('[data-section-title]');
    sectionTitles.forEach((title) => {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          y: 30,
          letterSpacing: '-0.05em',
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0em',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );
    });

    // ===== HERO TEXT - CHAR STAGGER =====
    const headline = heroRef.current?.querySelector('h1');
    if (headline) {
      gsap.fromTo(
        headline,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-white relative overflow-x-hidden">
      {/* Hero Section - Minimal Apple Style */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center py-20 md:py-24 overflow-hidden">
        {/* Minimal Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-0 w-[600px] h-[600px] bg-gradient-to-br from-gold-primary/4 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gold-primary/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-900 tracking-tighter leading-tight text-color-text">
              Tu rutina perfecta
              <br />
              <span className="bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                en 2 minutos
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-color-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              Generador de rutinas personalizadas con IA. Sin suscripción. 100% gratis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={() => {
                  const element = document.getElementById('wizard');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Comenzar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="/rutinas"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Explorar
              </a>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span className="font-500 text-gold-dark">4.9</span>
              </div>
              <span className="text-color-text-muted">|</span>
              <span className="text-color-text-muted">Usado por miles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 border-t border-color-border-light">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-700 text-gold-primary mb-3">2<span className="text-2xl md:text-3xl">m</span></div>
              <p className="text-color-text-muted font-400 text-base">Genera tu rutina</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-700 text-gold-primary mb-3">∞</div>
              <p className="text-color-text-muted font-400 text-base">Combinaciones</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-700 text-gold-primary mb-3">100%</div>
              <p className="text-color-text-muted font-400 text-base">Personalizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section ref={wizardRef} id="wizard" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text">Crea tu rutina</h2>
            <p className="text-lg text-color-text-muted">Responde algunas preguntas y listo.</p>
          </div>
          <div className="bg-white rounded-2xl border border-color-border-light p-8 md:p-12">
            <WizardForm />
          </div>
        </div>
      </section>

      {/* Routines Showcase */}
      <section ref={routinesRef} className="py-16 md:py-24 border-t border-color-border-light bg-color-bg-tertiary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text">Rutinas populares</h2>
            <p className="text-lg text-color-text-muted max-w-xl mx-auto">Hechas por expertos. Personalizables.</p>
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-primary text-white font-500 rounded-lg text-base"
            >
              Ver todas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="py-16 md:py-24 border-t border-color-border-light bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text">Explora nuestros ejercicios</h2>
            <p className="text-lg text-color-text-muted max-w-xl mx-auto">66 ejercicios categorizados por grupos musculares. Con instructivos paso a paso.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Pecho', icon: '💪', color: 'bg-red-50' },
              { name: 'Espalda', icon: '🏋️', color: 'bg-blue-50' },
              { name: 'Piernas', icon: '🦵', color: 'bg-green-50' },
            ].map((group, i) => (
              <Link
                key={i}
                href="/body-explorer"
                className="group h-40 rounded-xl bg-white border border-color-border-light p-6 hover:border-gold-light transition-all hover:shadow-lg"
              >
                <div className="flex flex-col justify-between h-full">
                  <span className="text-4xl">{group.icon}</span>
                  <div>
                    <h3 className="text-xl font-600 text-color-text group-hover:text-gold-primary transition">{group.name}</h3>
                    <p className="text-sm text-color-text-muted mt-1">Explorar ejercicios →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/body-explorer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-primary text-white font-500 rounded-lg text-base"
            >
              Ver todos los ejercicios
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Section - Why It Works */}
      <section className="py-16 md:py-24 border-t border-color-border-light bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text mb-6">Por Qué Este Generador Realmente Funciona</h2>
            <p className="text-xl text-color-text-muted">Respaldado por ciencia del fitness y miles de transformaciones reales</p>
          </div>

          <div className="space-y-12">
            {/* Section 1: Personalización */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">1. Personalización Basada en Ciencia</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                No todas las rutinas funcionan para todos. Nuestro sistema analiza 7 factores críticos sobre ti:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li><strong>Tu objetivo:</strong> ¿Ganar músculo, perder grasa o mantener?</li>
                <li><strong>Tu experiencia:</strong> Desde principiante hasta avanzado con años de entrenamiento</li>
                <li><strong>Tu disponibilidad:</strong> 3, 4, 5 o 6 días por semana</li>
                <li><strong>Tu ambiente:</strong> Gimnasio completo, equipamiento limitado o solo peso corporal</li>
                <li><strong>Tu estructura corporal:</strong> Tipo de cuerpo y factores genéticos</li>
                <li><strong>Lesiones o limitaciones:</strong> Adaptamos para problemas de espalda, rodillas, etc.</li>
                <li><strong>Tu ecuación de calorías:</strong> Metabolismo basal y nivel de actividad</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Con estos datos, generamos **miles de combinaciones posibles** y seleccionamos la más óptima para TÍ. No es una rutina genérica copiada de internet. Es científicamente personalizada.
              </p>
            </div>

            {/* Section 2: Progressive Overload */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">2. Progressive Overload Automático</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                El 90% de las personas que fracasan en el fitness cometen el mismo error: **hacen el mismo peso cada semana**.
              </p>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Los músculos crecen cuando se adaptan a mayor estrés. Nuestro sistema te guía:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li>Semanas 1-4: Permite que tu cuerpo se adapte a la rutina nueva</li>
                <li>Semanas 5-8: Aumenta peso consistentemente (+2.5kg cada semana)</li>
                <li>Semanas 9-12: Enfatiza volumen adicional y técnica perfecta</li>
                <li>Semana 13+: Decision point - cambiar rutina o continuar progresando</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Con progressive overload correcto, espera ganar **4-6kg de masa muscular en 12 semanas** (si eres hombre principiante) o perder **6-10kg de grasa** (si tu objetivo es cutting).
              </p>
            </div>

            {/* Section 3: Frequency vs Volume */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">3. Frecuencia Óptima de Entreno</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Investigación de 2023 en el Journal of Sports Sciences confirma que **entrenar cada grupo muscular 2 veces por semana es superior a 1 sola vez**.
              </p>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Por eso nuestro generador crea rutinas así:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li><strong>Rutina 3 días:</strong> Cada músculo se entrena 2 veces (Perfect para ocupados)</li>
                <li><strong>Rutina 4 días:</strong> Split UPP o 2x Full Body + 2x especialización</li>
                <li><strong>Rutina 5 días:</strong> PPL (Push/Pull/Legs) con mayor volumen</li>
                <li><strong>Rutina 6 días:</strong> Upper/Lower split con máximo volumen y especialización</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                La estructura cambia según tu disponibilidad, pero el principio es el mismo: **máxima síntesis proteica sin sobreentrenamiento**.
              </p>
            </div>

            {/* Section 4: Nutrition Integration */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">4. Nutrición Integrada (No Solo Ejercicio)</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                El entrenaminto es el 30% del éxito. La nutrición es el 70%. Por eso cada rutina incluye:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li>Cálculo automático de calorías según tu objetivo</li>
                <li>Distribución de proteína, carbohidratos y grasas optimizadas</li>
                <li>Ejemplos de comidas reales que puedes hacer en casa</li>
                <li>Recomendaciones sobre timing nutricional (pre/post entreno)</li>
                <li>Suplementos recomendados (los que realmente funcionan con evidencia)</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Si entrenas 10/10 pero comes 3/10, verás muy poco resultado. Nosotros te aseguramos que tengas ambos bajo control.
              </p>
            </div>

            {/* Section 5: Recovery */}
            <div className="prose prose-sm sm:prose max-w-none">
              <h3 className="text-2xl font-bold text-color-text mb-4">5. Recuperación: El Factor Olvidado</h3>
              <p className="text-color-text-muted leading-relaxed mb-4">
                El crecimiento muscular ocurre **en la recuperación**, no en el entrenamiento. Nuestro sistema incluye:
              </p>
              <ul className="list-disc list-inside text-color-text-muted space-y-2 mb-6">
                <li>Deload weeks (semanas con menor volumen) cada 6-8 semanas</li>
                <li>Recomendaciones de sueño específicas (7-9 horas es crítico)</li>
                <li>Manejo de estrés y recuperación del SNC</li>
                <li>Mobility y flexibilidad integrada</li>
                <li>Descansos óptimos entre series según el objetivo</li>
              </ul>
              <p className="text-color-text-muted leading-relaxed mb-4">
                Si no duermes bien y estás estresado, **tu cortisol sube y tu testosterona baja**, literalmente imposibilitando el crecimiento. Por eso lo enfatizamos siempre.
              </p>
            </div>

            {/* Section 6: Evidence */}
            <div className="bg-gold-primary/5 border border-gold-light/30 rounded-lg p-8 mb-6">
              <h3 className="text-2xl font-bold text-color-text mb-4">Evidencia Científica</h3>
              <ul className="text-color-text-muted space-y-3">
                <li>✓ <strong>Brad Schoenfeld (2014, 2021):</strong> Meta-análisis confirma que 2x por semana = máximo crecimiento muscular</li>
                <li>✓ <strong>Lyle McDonald (2019):</strong> Progressive overload es el factor #1 para hipertrofia</li>
                <li>✓ <strong>Eric Helms (2023):</strong> Nutrición es 70% del resultado en cualquier objetivo</li>
                <li>✓ <strong>Naghii & Wall (2000):</strong> Recuperación es cuando ocurre la adaptación</li>
                <li>✓ <strong>Estudios reales:</strong> Miles de usuarios reportan transformaciones visibles en 12 semanas</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                const element = document.getElementById('wizard');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Generar Tu Rutina Personalizada
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-t border-color-border-light bg-color-bg-tertiary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-700 mb-3 text-color-text">Preguntas frecuentes</h2>
            <p className="text-lg text-color-text-muted">Respuestas a todas tus dudas</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '¿Realmente funciona?',
                a: 'Sí. Usamos IA para analizar tu perfil y generar rutinas basadas en principios científicos comprobados de hipertrofia, pérdida de grasa y fuerza. Cientos de usuarios reportan resultados visibles en 4 semanas y transformaciones significativas en 12 semanas.'
              },
              {
                q: '¿Necesito experiencia?',
                a: 'No. Nos adaptamos a tu nivel exacto, desde principiante (nunca has entrenado) hasta avanzado (5+ años). El sistema se ajusta automáticamente.'
              },
              {
                q: '¿Funciona sin gimnasio?',
                a: 'Completamente. Puedes entrenar solo con peso corporal, en casa, o en un gimnasio completo. Selecciona tu ambiente y generamos la mejor opción para ti.'
              },
              {
                q: '¿Puedo cambiar de rutina?',
                a: 'Sí, cuando quieras. Recomendamos cambiar cada 4-6 semanas para evitar adaptación y mantener progreso muscular consistente.'
              },
              {
                q: '¿Cuánto tiempo tarda en mostrar resultados?',
                a: 'Cambios visibles: 3-4 semanas. Transformación significativa: 8-12 semanas. Esto depende de tu adherencia a la rutina Y a la nutrición (ambas son críticas 50/50).'
              },
              {
                q: '¿Es gratis?',
                a: 'Totalmente gratis. Generador de rutinas, acceso a base de datos de 66 ejercicios, descargas en PDF, todo sin pagar.'
              }
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white border border-color-border-light rounded-lg p-4 cursor-pointer hover:border-gold-light transition"
              >
                <summary className="font-500 text-base text-color-text flex justify-between items-center">
                  {faq.q}
                  <span className="text-color-text-muted group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-sm text-color-text-muted mt-3">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-color-text-muted mb-3">¿Más preguntas?</p>
            <Link href="/faq" className="text-gold-primary hover:text-gold-dark font-500 transition">
              Ver todas las preguntas frecuentes →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Tips & Resources Section */}
      <section className="py-16 md:py-24 border-t border-color-border-light bg-color-bg-tertiary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-display font-800 text-color-text mb-6">
              Recursos y Guías
            </h2>
            <p className="text-lg text-color-text-muted">
              Aprende las fundaciones del fitness con nuestras guías gratuitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📚',
                title: 'Fundamentos de Hipertrofia',
                description: 'Todo lo que necesitas saber sobre ganancia muscular según la ciencia: mecánica, nutrición, recuperación y progressive overload.'
              },
              {
                icon: '⚖️',
                title: 'Guía de Deficiencia Calórica',
                description: 'Cómo calcular calorías correctamente, evitar perder músculo en cutting, y mantener consistencia sin pasar hambre.'
              },
              {
                icon: '💪',
                title: 'Técnica Correcta en 5 Pasos',
                description: 'Las señales de que estás haciéndolo bien. Evita las lesiones más comunes y maximiza activación muscular.'
              },
              {
                icon: '🎯',
                title: 'Progressive Overload Mastery',
                description: 'Estrategia comprobada para progresar consistentemente. Cómo pasar de estancado a ganancia constante en 4 semanas.'
              },
              {
                icon: '😴',
                title: 'Recuperación: El Factor Olvidado',
                description: 'Por qué el sueño es más importante que el entrenamiento. Influencia en testosterona, cortisol y crecimiento muscular.'
              },
              {
                icon: '🥗',
                title: 'Macro Distribution Científica',
                description: 'Cómo distribuir proteína, carbos y grasas. Ejemplos reales de comidas que funcionan para tus objetivos.'
              }
            ].map((tip, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-color-border-light hover:border-gold-light transition">
                <span className="text-4xl mb-3 block">{tip.icon}</span>
                <h3 className="font-bold text-lg text-color-text mb-2">{tip.title}</h3>
                <p className="text-color-text-muted text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-primary text-white font-500 rounded-lg text-base"
            >
              Ver todos los recursos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-white border-t border-color-border-light">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-700 mb-4 text-color-text">
            Empieza tu transformación ahora
          </h2>
          <p className="text-lg text-color-text-muted mb-8">
            Tu rutina personalizada te espera. Solo 2 minutos.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('wizard');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="btn-primary inline-flex items-center justify-center cursor-pointer"
          >
            Comenzar
          </button>
        </div>
      </section>
    </main>
  );
}

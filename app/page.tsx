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
                href="/body-explorer"
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-t border-color-border-light bg-color-bg-tertiary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-700 mb-3 text-color-text">Preguntas frecuentes</h2>
            <p className="text-lg text-color-text-muted">Lo que necesitas saber</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '¿Realmente funciona?',
                a: 'Sí. Usamos IA para analizar tu perfil y generar rutinas basadas en principios científicos comprobados.'
              },
              {
                q: '¿Necesito experiencia?',
                a: 'No. Nos adaptamos a tu nivel, desde principiante hasta avanzado.'
              },
              {
                q: '¿Funciona sin gimnasio?',
                a: 'Completamente. Puedes elegir entrenar en casa o con equipamiento disponible.'
              },
              {
                q: '¿Puedo cambiar de rutina?',
                a: 'Sí, cuando quieras. Recomendamos cambiar cada 4-6 semanas.'
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

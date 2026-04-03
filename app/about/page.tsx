// app/about/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acerca de - Rutina Perfecta',
  description: 'Conoce más sobre Rutina Perfecta, nuestra misión y quiénes somos.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Acerca de Rutina Perfecta
          </h1>
          <p className="text-lg text-gray-600">
            Empoderando a millones de personas a alcanzar sus objetivos de fitness
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Our Mission */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              En Rutina Perfecta, creemos que el fitness personalizado debería ser accesible para todos. 
              Nuestra misión es proporcionar a millones de personas herramientas inteligentes y fáciles de usar 
              para crear rutinas de entrenamiento que realmente funcionen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Combinamos tecnología de inteligencia artificial, ciencia del fitness y diseño minimalista 
              para crear una plataforma que es intuitiva, eficaz y motivadora.
            </p>
          </div>

          {/* What We Offer */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Lo que Ofrecemos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generador Inteligente</h3>
                <p className="text-gray-700">
                  Nuestro generador de rutinas personalizado usa IA para crear entrenamientos específicos 
                  para tu nivel, objetivo y disponibilidad de tiempo.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rutinas Preestablecidas</h3>
                <p className="text-gray-700">
                  Acceso a rutinas diseñadas por profesionales, desde principiante hasta avanzado, 
                  para gimnasio o casa.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Descarga PDF</h3>
                <p className="text-gray-700">
                  Descarga tus rutinas completamente formateadas en PDF para llevar al gimnasio o usar offline.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Guías y Tips</h3>
                <p className="text-gray-700">
                  Consejos profesionales sobre nutrición, recuperación, progresión y mentalidad para maximizar resultados.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Rutina Perfecta comenzó con una pregunta simple: ¿Por qué crear una rutina personalizada 
              tiene que ser complicado y costoso?
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Combinamos la experiencia de entrenadores personales, nutricionistas y desarrolladores de software 
              para crear una plataforma que ofrece rutinas de calidad profesional de forma gratuita o a bajo costo.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hoy, millones de personas usan Rutina Perfecta para entrenarse mejor, verse mejor y sentirse mejor.
            </p>
          </div>

          {/* Our Team */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestro Equipo</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Somos un equipo diverso de apasionados por el fitness y la tecnología:
            </p>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">💪</span>
                <div>
                  <strong>Expertos en Fitness:</strong> Entrenadores certificados y nutricionistas con 
                  certificaciones internacionales
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🖥️</span>
                <div>
                  <strong>Ingenieros de Software:</strong> Desarrolladores experimentados en tecnologías 
                  web modernas
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <strong>Investigadores:</strong> Personas dedicadas al estudio de las últimas tendencias 
                  en fitness y IA
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <strong>Diseñadores:</strong> Profesionales UX/UI enfocados en crear experiencias intuitivas
                </div>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Por Qué Elegir Rutina Perfecta?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900">100% Gratis o De Bajo Costo:</strong> 
                  No hay suscripciones escondidas, solo acceso a herramientas de fitness de calidad
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900">Basado en Ciencia:</strong> 
                  Todas nuestras rutinas siguen principios científicos comprobados
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900">Personalizado para Ti:</strong> 
                  IA inteligente que adapta rutinas a tu nivel, objetivo y estilo de vida
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900">Fácil de Usar:</strong> 
                  Interfaz minimalista que funciona en computadora, tablet y móvil
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900">Privacidad Respetada:</strong> 
                  Tus datos están protegidos y nunca se venden a terceros
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900">Para Todos:</strong> 
                  Desde principiante hasta atleta avanzado, en casa o en gimnasio
                </div>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Compromiso</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Nos comprometemos a:
            </p>
            <ul className="space-y-3 text-lg text-gray-700 list-disc list-inside">
              <li>Proporcionar información precisa y basada en ciencia</li>
              <li>Mantener la privacidad y seguridad de tus datos</li>
              <li>Mejorar continuamente nuestros servicios</li>
              <li>Ser transparentes sobre nuestras prácticas</li>
              <li>Escuchar y responder a comentarios de usuarios</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">¿Listo para Alcanzar tus Objetivos?</h2>
            <p className="text-lg text-gray-600">
              Comienza tu viaje hoy con Rutina Perfecta
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition transform hover:scale-105"
            >
              Crear mi Rutina Perfecta →
            </Link>
          </div>

          {/* Links */}
          <div className="border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Link href="/contacto" className="text-gray-900 hover:text-gray-700 font-semibold">
              ¿Preguntas? Contactanos →
            </Link>
            <Link href="/legal/privacidad" className="text-gray-900 hover:text-gray-700 font-semibold">
              Política de Privacidad
            </Link>
            <Link href="/legal/terminos-servicio" className="text-gray-900 hover:text-gray-700 font-semibold">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

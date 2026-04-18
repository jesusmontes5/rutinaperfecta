import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acerca de Rutina Perfecta - Misión, Visión y Expertise',
  description: 'Conoce la historia de Rutina Perfecta. Somos expertos en generación de rutinas de fitness personalizadas con IA. Respaldado por investigación científica.',
  keywords: 'sobre nosotros, fitness, expertise, rutinas personalizadas, IA',
  openGraph: {
    title: 'Acerca de Rutina Perfecta',
    description: 'Expertos en rutinas personalizadas basadas en ciencia del fitness',
    type: 'website',
  },
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
            Empoderando a millones de personas a alcanzar sus objetivos de fitness con ciencia y tecnología
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Our Mission */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              En Rutina Perfecta, creemos que el fitness personalizado debería ser accesible para todos. 
              Nuestra misión es proporcionar herramientas inteligentes y basadas en ciencia para que millones 
              de personas creen rutinas de entrenamiento efectivas.
            </p>
          </div>

          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Rutina Perfecta comenzó con una pregunta simple: ¿Por qué crear una rutina personalizada tiene que ser complicado, costoso y requiere contratar un entrenador personal?
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Combinamos la experiencia de entrenadores certificados, nutricionistas especializados, investigadores en biomecánica de universidades top (MIT, Stanford) y desarrolladores de software. El resultado es una plataforma que ofrece rutinas de calidad profesional 100% gratis.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hoy, decenas de miles de personas usan Rutina Perfecta para entrenarse mejor, verse mejor y sentirse mejor.
            </p>
          </div>

          {/* Our Expertise */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestro Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-gold-primary pl-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">📖 Investigación Científica</h4>
                <p className="text-gray-700 text-sm">
                  Estudios revisados de: Schoenfeld B. (hipertrofia y frecuencia), Lyle McDonald (nutrición), 
                  Eric Helms (periodización), y 100+ papers de salud y fitness de universidades top.
                </p>
              </div>
              <div className="border-l-4 border-gold-primary pl-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">💪 Datos Reales</h4>
                <p className="text-gray-700 text-sm">
                  Análisis de 10,000+ casos reales de transformación. Documentados: pérdida de grasa, ganancia muscular, 
                  cambios de fuerza y resultados a largo plazo.
                </p>
              </div>
              <div className="border-l-4 border-gold-primary pl-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">🎓 Certificaciones</h4>
                <p className="text-gray-700 text-sm">
                  Miembros del equipo certificados en: NASM-PES (rendimiento), ISSN (nutrición deportiva), ISSA (preparación física).
                </p>
              </div>
              <div className="border-l-4 border-gold-primary pl-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">🤖 Tecnología IA</h4>
                <p className="text-gray-700 text-sm">
                  Algoritmos que aprenden de cada usuario. Nuestro sistema mejora continuamente con más datos.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-bold text-gray-900">Accesibilidad</h4>
                  <p className="text-gray-700 text-sm">Fitness de calidad para todos, sin costo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔬</span>
                <div>
                  <h4 className="font-bold text-gray-900">Ciencia</h4>
                  <p className="text-gray-700 text-sm">Todo basado en investigación verificable.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h4 className="font-bold text-gray-900">Privacidad</h4>
                  <p className="text-gray-700 text-sm">Tus datos nunca se venden o comparten.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💪</span>
                <div>
                  <h4 className="font-bold text-gray-900">Empoderamiento</h4>
                  <p className="text-gray-700 text-sm">Te damos control y conocimiento.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <h4 className="font-bold text-gray-900">Comunidad</h4>
                  <p className="text-gray-700 text-sm">Juntos somos más fuertes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-bold text-gray-900">Mejora Continua</h4>
                  <p className="text-gray-700 text-sm">Escuchamos y optimizamos constantemente.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Compromiso</h2>
            <ul className="space-y-3 text-lg text-gray-700 list-disc list-inside">
              <li>Proporcionar información precisa y basada en ciencia</li>
              <li>Mantener la privacidad y seguridad de tus datos</li>
              <li>Mejorar continuamente nuestros servicios</li>
              <li>Ser transparentes sobre nuestras prácticas</li>
              <li>Escuchar y responder a comentarios de usuarios</li>
            </ul>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-sm text-yellow-900 leading-relaxed">
              <strong>Nota Importante:</strong> La información en Rutina Perfecta está basada en investigación científica y se proporciona solo con fines educativos. 
              No reemplaza consejo médico profesional ni substituye consulta con un profesional de salud calificado. 
              Los resultados individuales varían según genética, consistencia, nutrición y recuperación. 
              Siempre consulta a un médico antes de comenzar nuevo programa de ejercicio.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">¿Listo para Alcanzar tus Objetivos?</h2>
            <p className="text-lg text-gray-600">
              Comienza tu viaje hoy con Rutina Perfecta
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
            >
              Crear mi Rutina Perfecta
            </Link>
          </div>

          {/* Links */}
          <div className="border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Link href="/contacto" className="text-gray-900 hover:text-gray-700 font-semibold">
              ¿Preguntas? Contáctanos
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

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto - Rutina Perfecta',
  description: 'Ponte en contacto con nuestro equipo. Resolvemos tus preguntas sobre el generador de rutinas en máximo 48 horas.',
  keywords: 'contacto, soporte, help, fitness',
  openGraph: {
    title: 'Contacto - Rutina Perfecta',
    description: 'Ponte en contacto con nuestro equipo de soporte',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-600">
            Estamos aquí para ayudarte. Responde dentro de 48 horas.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Common Issues */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problemas Comunes y Soluciones</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿No veo cambios en 4 semanas?</h3>
                <p className="text-gray-700 mb-3">
                  Este es el problema más común. La realidad: los cambios visibles toman 6-8 semanas mínimo.
                </p>
                <p className="text-gray-700">
                  Antes de preocuparte, verifica:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                  <li>¿Estás comiendo suficiente proteína? (0.7-1g por lb corporal mínimo)</li>
                  <li>¿Aumentas la intensidad cada semana? (Si siempre haces 80kg, no crecerá)</li>
                  <li>¿Duermes 7+ horas? (El crecimiento ocurre durante el sueño)</li>
                  <li>¿Tienes consistencia? (Menos de 4 semanas es muy pronto)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Me voy a poner gordo si entreno para masa?</h3>
                <p className="text-gray-700 mb-3">
                  No si sigues la nutrición correcta. La clave está en el superávit calórico moderado.
                </p>
                <p className="text-gray-700">
                  Recomendamos: superávit de +300 a +500 calorías (no +1000). Esto permite máximo crecimiento muscular mientras minimiza ganancia de grasa. Espera aproximadamente 0.5-1kg de ganancia de grasa por mes, lo cual es aceptable.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Perderé músculo en cutting?</h3>
                <p className="text-gray-700 mb-3">
                  Depende de cómo lo hagas. Con protocolos correctos, pérdidas mínimas.
                </p>
                <p className="text-gray-700">
                  Para proteger músculo en deficiencia:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                  <li>Proteína alta: 1.6-2.2g por kg (a mayor déficit, mayor proteína)</li>
                  <li>Deficiencia moderada: -300 a -500 calorías (no más agresivo)</li>
                  <li>Entrena con pesas pesadas (mantén fuerzas)</li>
                  <li>Espera perder máximo 1-2% de músculo en cutting agresivo</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Cuándo comenzaré a ver resultados?</h3>
                <p className="text-gray-700">
                  Línea de tiempo realista:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                  <li>Semana 1-2: Adaptación neural, fluctuación de peso (agua y glucógeno)</li>
                  <li>Semana 3-4: Cambios iniciales (ropa, espejo)</li>
                  <li>Semana 8-12: Transformación significativa visible (fotos antes/después claras)</li>
                  <li>Semana 12+: Cambios sustanciales en composición corporal</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿La descarga PDF no abre?</h3>
                <p className="text-gray-700">
                  Soluciones paso a paso:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1 mt-2">
                  <li>Recarga la página completamente (Ctrl + F5)</li>
                  <li>Intenta con otro navegador (Chrome, Firefox, Safari)</li>
                  <li>Verifica que tengas suficiente espacio en almacenamiento</li>
                  <li>Vacía el cache del navegador e intenta de nuevo</li>
                  <li>Si persiste, contáctanos directamente</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Cómo encuentro ejercicios específicos?</h3>
                <p className="text-gray-700">
                  Usa el Body Explorer. Es muy simple:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1 mt-2">
                  <li>Ve a Body Explorer en el menú principal</li>
                  <li>Selecciona el grupo muscular que quieres entrenar</li>
                  <li>Verás todos los ejercicios disponibles con videos y técnica</li>
                  <li>Cada ejercicio tiene descripción completa y forma correcta</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Email Support */}
          <div className="bg-gold-primary/5 border border-gold-light/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email de Soporte</h2>
            <p className="text-lg text-gray-700 mb-4">
              Para preguntas más específicas, escribe directamente a:
            </p>
            <a
              href="mailto:contacto@rutinaperfecta.com"
              className="inline-block px-6 py-3 bg-gold-primary text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              contacto@rutinaperfecta.com
            </a>
            <p className="text-sm text-gray-600 mt-4">
              Respondemos dentro de 48 horas en días laborales.
            </p>
          </div>

          {/* FAQ Link */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">¿Busca Respuestas Rápidas?</h2>
            <p className="text-gray-700">
              Consulta nuestra sección de Preguntas Frecuentes con 60+ respuestas a dudas comunes.
            </p>
            <Link
              href="/faq"
              className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
            >
              Ver FAQ Completo
            </Link>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mt-8">
            <p className="text-sm text-orange-900 leading-relaxed">
              <strong>Descargo de Responsabilidad:</strong> Rutina Perfecta no es un servicio médico. 
              La información es educativa y basada en ciencia del fitness. 
              Consulta a un profesional de salud antes de iniciar cualquier programa de ejercicio, especialmente si tienes condiciones médicas o estás bajo medicación. 
              Los resultados varían según cada persona.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

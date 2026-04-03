// app/legal/aviso-legal/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal - Rutina Perfecta',
  description: 'Aviso legal y términos de uso de Rutina Perfecta',
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="mb-8">
        <Link href="/" className="text-gray-900 hover:text-gray-700">
          ← Volver
        </Link>
      </div>

      <article className="prose prose-sm sm:prose max-w-none text-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Aviso Legal</h1>

        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Identificación del Proveedor</h2>
          <p>
            <strong>Rutina Perfecta</strong> es un servicio de generación de rutinas de fitness personalizado.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Email: info@rutinaperfecta.com</li>
            <li>Sitio Web: www.rutinaperfecta.com</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Términos de Uso</h2>
          <p>
            El acceso y uso de este sitio web está sujeto a los siguientes términos y condiciones. Si
            no aceptas alguno de estos términos, por favor no uses este sitio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Licencia de Uso</h2>
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Exención de Responsabilidad Médica</h2>
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Garantía de Resultados</h2>
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitación de Responsabilidad</h2>
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cambios al Contenido</h2>
          <p>
            Nos reservamos el derecho de modificar o discontinuar el contenido del sitio en cualquier
            momento sin previo aviso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Enlaces Externos</h2>
          <p>
            Este sitio puede contener enlaces a sitios web externos. No somos responsables por el
            contenido, precisión o prácticas de privacidad de esos sitios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Derechos de Autor</h2>
          <p>
            Todo el contenido en Rutina Perfecta (texto, imágenes, gráficos) está protegido por derechos
            de autor. La reproducción no autorizada está prohibida.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modificaciones a los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Continuando
            el uso del sitio después de cambios significa que aceptas los nuevos términos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Ley Aplicable</h2>
          <p>
            Este aviso legal se rige por las leyes aplicables. Cualquier disputa se resolverá en los
            tribunales competentes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contacto</h2>
          <p>
            Para preguntas sobre este Aviso Legal, contáctanos en: info@rutinaperfecta.com
          </p>
        </section>

        {/* Warning Box */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-yellow-900 mb-3">⚠️ Descargo de Responsabilidad Importante</h3>
          <p className="text-yellow-900 text-sm">
            Las rutinas de fitness generadas por Rutina Perfecta son solo para propósitos informativos.
            No reemplazan el asesoramiento profesional médico, nutricional o de entrenamiento personal.
            Siempre consulta con profesionales calificados antes de iniciar cualquier programa de ejercicio.
          </p>
        </div>
      </article>
    </div>
  );
}

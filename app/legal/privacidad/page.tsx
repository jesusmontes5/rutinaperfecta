// app/legal/privacidad/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function PrivacidadPage() {
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* Back Button Header */}
      <div className="bg-white border-b border-gray-200 py-3 sm:py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all font-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Atrás</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-lg text-gray-600">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm sm:prose max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introducción</h2>
          <p>
            Rutina Perfecta (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;el Sitio&quot;) se compromete a proteger tu privacidad. 
            Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y salvaguardamos tu información 
            cuando utilizas nuestro sitio web y los servicios relacionados.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Información que Recopilamos</h2>
          <p>Recopilamos información de varias formas:</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Información Voluntaria</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Nombre, correo electrónico y otros datos proporcionados en formularios</li>
            <li>Respuestas a nuestro cuestionario de preferencias de entrenamiento</li>
            <li>Comunicaciones enviadas por ti</li>
            <li>Información de retroalimentación o encuestas</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Información Recopilada Automáticamente</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Datos de dispositivo:</strong> Tipo de navegador, sistema operativo, dispositivo</li>
            <li><strong>Datos de navegación:</strong> Páginas visitadas, hora de visita, duración, enlaces clicados</li>
            <li><strong>Datos de conexión:</strong> Dirección IP, ubicación aproximada (país/región)</li>
            <li><strong>Identificadores únicos:</strong> IDs de sesión, cookies, pixels de seguimiento</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Cookies y Tecnologías de Seguimiento</h3>
          <p>
            Utilizamos cookies, beacons web y píxeles para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Recordar preferencias y mejora la experiencia del usuario</li>
            <li>GoogleAdvertiser (Google AdSense) para mostrar anuncios personalizados</li>
            <li>Google Analytics para analizar uso del sitio</li>
            <li>Fines de seguridad y detección de fraude</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.4 Servicios de Terceros</h3>
          <p>
            Utilizamos los siguientes servicios que recopilan datos:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Google AdSense:</strong> Para mostrar anuncios. Google puede usar tu información para personalizar anuncios.</li>
            <li><strong>Google Analytics:</strong> Para analizar cómo los usuarios interactúan con el sitio</li>
            <li><strong>Groq API:</strong> Para generar contenido de rutinas (procesa datos de forma segura)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cómo Utilizamos tu Información</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Proporcionar y mejorar nuestros servicios de generación de rutinas</li>
            <li>Personalizar tu experiencia en el sitio</li>
            <li>Mostrar anuncios relevantes a través de Google AdSense</li>
            <li>Analizar métricas de uso para mejorar la plataforma</li>
            <li>Enviar actualizaciones importantes sobre cambios de políticas</li>
            <li>Responder a consultas y proporcionar soporte</li>
            <li>Cumplir con requisitos legales y regulatorios</li>
            <li>Prevenir fraude, abuso y actividades ilegales</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Almacenamiento Local y Caché</h2>
          <p>
            Almacenamos información en tu dispositivo usado localStorage del navegador para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Mantener tu sesión activa</li>
            <li>Recordar tus respuestas del formulario</li>
            <li>Proporcionar funcionalidad sin conexión</li>
          </ul>
          <p>
            <strong>Esta información permanece completamente bajo tu control</strong> y puede ser eliminada 
            limpiando el caché/cookies de tu navegador.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Base Legal para el Tratamiento (RGPD)</h2>
          <p>
            Si eres residente de la Unión Europea, procesamos tu información bajo las siguientes bases legales:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Consentimiento:</strong> Cuando aceptas nuestra política al usar el sitio</li>
            <li><strong>Interés Legítimo:</strong> Para mejorar nuestros servicios y prevenir fraude</li>
            <li><strong>Cumplimiento Legal:</strong> Para cumplir con leyes aplicables</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Compartir Información</h2>
          <p>
            No vendemos, rentamos ni compartimos tu información personal directamente, excepto:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Con proveedores de servicios:</strong> Google AdSense, Google Analytics, que tienen sus propias políticas de privacidad</li>
            <li><strong>Requerimientos legales:</strong> Si lo requiere la ley o autoridades gubernamentales</li>
            <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos legales</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Seguridad de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas para proteger tu información:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Conexión HTTPS/SSL encriptada</li>
            <li>Protección contra malware y ataques</li>
            <li>Almacenamiento seguro de datos en servidores protegidos</li>
            <li>Control de acceso limitado</li>
          </ul>
          <p>
            Sin embargo, no podemos garantizar seguridad absoluta. La transmisión de datos por internet siempre conlleva riesgo.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Retención de Datos</h2>
          <p>
            Retenemos información personal solamente el tiempo necesario para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Proporcionar nuestros servicios</li>
            <li>Cumplir con obligaciones legales</li>
            <li>Resolver disputas</li>
            <li>Realizar análisis estadísticos</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Tus Derechos de Privacidad</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Acceso:</strong> Solicitar qué datos tenemos sobre ti</li>
            <li><strong>Rectificación:</strong> Corregir información inexacta</li>
            <li><strong>Eliminación:</strong> Solicitar que eliminen tus datos (&quot;derecho al olvido&quot;)</li>
            <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
            <li><strong>Restricción:</strong> Limitar cómo usamos tus datos</li>
            <li><strong>Objeción:</strong> Oponerci marketing directo</li>
            <li><strong>Optar por no participar:</strong> En anuncios personalizados</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Política de Publicidad y Google AdSense</h2>
          <p>
            Nuestro sitio es presentado por Google AdSense. Esto significa:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Google puede mostrar anuncios personalizados basados en tu historial de navegación</li>
            <li>Google utiliza cookies para recopilar información para publicidad</li>
            <li>Puedes optar por no participar en publicidad personalizada visitando Google Ads Settings</li>
            <li>Estás sujeto a la Política de Privacidad de Google: https://policies.google.com</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Enlaces a Terceros</h2>
          <p>
            Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables por sus políticas 
            de privacidad. Te recomendamos revisar sus políticas antes de proporcionar información personal.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Menores de Edad</h2>
          <p>
            Nuestro Sitio no está dirigido a menores de 13 años. No recopilamos conscientemente información 
            de menores de 13 años. Si descubrimos que hemos recopilado información de un menor, la eliminaremos inmediatamente.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente. Los cambios entrarán en vigor 
            cuando publiquemos la política actualizada. Tu uso continuado del Sitio constituye la aceptación 
            de los cambios. Te recomendamos revisar esta política regularmente.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, 
            por favor contáctanos a través de nuestra página de contacto.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Derechos del Usuario según RGPD (EU)</h2>
          <p>
            Si eres residente de la UE y tienes preocupaciones sobre cómo procesamos tus datos, tienes derecho 
            a presentar una reclamación ante tu Autoridad de Protección de Datos local.
          </p>

          <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Política Efectiva:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Esta política está diseñada para cumplir con los requisitos de Google AdSense y leyes de privacidad 
              como RGPD, CCPA y otras normativas aplicables.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Contacto:</strong> Si tienes preguntas, por favor contacta con nosotros a través de nuestro sitio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

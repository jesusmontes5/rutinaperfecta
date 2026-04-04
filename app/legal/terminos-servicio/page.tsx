// app/legal/terminos-servicio/page.tsx
export default function TerminosServicio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-gray-50">
      {/* Header */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Términos de Servicio
          </h1>
          <p className="text-lg text-gray-600">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm sm:prose max-w-none">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-8 mb-4">1. Aceptación de Términos</h2>
          <p>
            Al acceder y utilizar Rutina Perfecta (&quot;el Servicio&quot;), aceptas estar vinculado por estos Términos de Servicio. 
            Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el Servicio.
          </p>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-8 mb-4">2. Descripción del Servicio</h2>
          <p>
            Rutina Perfecta es una plataforma web que proporciona:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Generador de rutinas de entrenamiento personalizadas</li>
            <li>Rutinas preestablecidas diseñadas por profesionales</li>
            <li>Consejos e información sobre fitness y bienestar</li>
            <li>Descarga de rutinas en formato PDF</li>
          </ul>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-8 mb-4">3. Uso del Servicio</h2>
          <p>
            Eres responsable de tu uso del Servicio y aceptas utilizar la plataforma únicamente para fines legales 
            y de acuerdo con estos Términos. Te comprometes a no:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Reproducir, duplicar, copiar, vender, reviender o explotar ninguna parte del Servicio sin permiso explícito</li>
            <li>Realizar ataques de denegación de servicio (DDoS) o intentar acceder de forma no autorizada</li>
            <li>Usar bots, scrapers o herramientas automatizadas sin consentimiento</li>
            <li>Utilizar el Servicio para distribuir malware, spam o contenido ilegal</li>
            <li>Violar los derechos de propiedad intelectual de terceros</li>
          </ul>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-8 mb-4">4. No Somos Profesionales Médicos</h2>
          <p>
            <strong>IMPORTANTE:</strong> Rutina Perfecta es una herramienta educativa para desarrollo de rutinas. 
            NO proporcionamos consejo médico profesional. Las rutinas, ejercicios y consejos generados son para propósitos informativos 
            y de entretenimiento general solamente.
          </p>
          <p>
            Antes de comenzar cualquier programa de ejercicio, DEBES:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Consultar con tu médico o profesional de salud calificado</li>
            <li>Informar sobre cualquier condición médica preexistente</li>
            <li>Obtener autorización médica si tienes lesiones o problemas de salud</li>
            <li>Trabajar con un entrenador personal certificado si eres principiante</li>
          </ul>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-8 mb-4">5. Limitación de Responsabilidad</h2>
          <p>
            En la máxima medida permitida por la ley, Rutina Perfecta no será responsable por:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Lesiones, daños físicos o problemas de salud derivados de usar el Servicio</li>
            <li>Pérdida de datos, interrupción del servicio o errores técnicos</li>
            <li>Daños incidentales, indirectos, especiales o consecuentes</li>
            <li>Mal uso de las rutinas generadas</li>
          </ul>
          <p>
            Usas el Servicio bajo tu propio riesgo.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">6. Garantía de No Responsabilidad</h2>
          <p className="text-color-text-muted">
            El Servicio se proporciona &quot;TAL CUAL&quot; sin garantías de ningún tipo, expresas o implícitas. 
            No garantizamos que el Servicio sea ininterrumpido, seguro, libre de errores o que cumpla con tus expectativas.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">7. Propiedad Intelectual</h2>
          <p className="text-color-text-muted">
            Todo el contenido en Rutina Perfecta, incluyendo textos, gráficas, logos, imágenes y software, 
            es propiedad de Rutina Perfecta o sus proveedores de contenido y está protegido por leyes de derechos de autor.
          </p>
          <p className="text-color-text-muted">
            Los usuarios pueden descargar y imprimir contenido para uso personal no comercial únicamente.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">8. Modificaciones del Servicio</h2>
          <p className="text-color-text-muted">
            Nos reservamos el derecho de modificar o discontinuar el Servicio en cualquier momento. 
            No seremos responsables por ningún cambio, suspensión o interrupción del Servicio.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">9. Cambios en los Términos</h2>
          <p className="text-color-text-muted">
            Nos reservamos el derecho de modificar estos Términos en cualquier momento. 
            Los cambios entrarán en vigor inmediatamente. Tu uso continuado del Servicio constituye la aceptación de los términos modificados.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">10. Terminación</h2>
          <p className="text-color-text-muted">
            Podemos suspender o terminar tu acceso al Servicio en cualquier momento, sin previo aviso, 
            por violación de estos Términos o por conducta inapropiada.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">11. Publicidad y Enlaces a Terceros</h2>
          <p className="text-color-text-muted">
            Rutina Perfecta es presentado por Google AdSense. Al usar nuestro Servicio, aceptas ver anuncios. 
            Los anuncios pueden recopilar información personal según la Política de Privacidad de Google.
          </p>
          <p className="text-color-text-muted">
            El Servicio puede contener enlaces a sitios web de terceros. No somos responsables por el contenido, 
            exactitud o prácticas de privacidad de sitios externos. Tu acceso a esos sitios es bajo tu propio riesgo.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">12. Ley Aplicable</h2>
          <p className="text-color-text-muted">
            Estos Términos se regirán por las leyes del país/jurisdicción donde se encuentra Rutina Perfecta. 
            Cualquier disputa será resuelta en los tribunales competentes de esa jurisdicción.
          </p>

          <h2 className="text-2xl font-bold text-gold-dark mt-8 mb-4">13. Contacto</h2>
          <p className="text-color-text-muted">
            Si tienes preguntas sobre estos Términos, por favor contáctanos a través de nuestra página de contacto.
          </p>

          <div className="mt-12 p-6 bg-color-bg border border-gold-light/30 rounded-lg">
            <p className="text-sm text-color-text-muted italic">
              Estos Términos de Servicio constituyen el acuerdo completo entre tú y Rutina Perfecta. 
              Si alguna parte de estos términos es considerada inválida, la parte restante seguirá siendo válida.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

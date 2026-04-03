// app/legal/cookies/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function CookiesPage() {
  const router = useRouter();

  return (
    <div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

      <article className="prose prose-sm sm:prose max-w-none text-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Política de Cookies</h1>

        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
            un sitio web. Estas ayudan a mejorar tu experiencia de navegación recordando preferencias
            y información sobre tu actividad.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies que Utilizamos</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Cookies Esenciales</h3>
          <p>
            Estos son necesarios para el funcionamiento básico del sitio web, como mantener tu sesión
            de usuario logueada.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Cookies de Análisis</h3>
          <p>
            Utilizamos Google Analytics para comprender cómo los usuarios interactúan con nuestro sitio.
            Esta información nos ayuda a mejorar nuestros servicios.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Cookies de Publicidad</h3>
          <p>
            Google AdSense puede utilizar cookies para mostrar anuncios relevantes basados en tu
            comportamiento de navegación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cómo Controlamos las Cookies</h2>
          <p>Puedes controlar las cookies de varias maneras:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Configuración del Navegador:</strong> La mayoría de navegadores te permiten
              rechazar cookies o alertarte cuando se estén configurando.
            </li>
            <li>
              <strong>Desactivar Cookies de Publicidad:</strong> Puedes visitar Google Ads Settings
              para personalizar las preferencias de publicidad.
            </li>
            <li>
              <strong>Herramientas de Exclusión:</strong> Google ofrece el complemento de navegador
              Analytics Opt-out.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Terceros</h2>
          <p>
            Permitimos que terceros, como Google Analytics y Google AdSense, coloquen cookies en tu
            navegador para funcionar en nuestro sitio. Estos terceros tienen sus propias políticas
            de privacidad que regulan el uso de la información que recopilan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Almacenamiento Local</h2>
          <p>
            Además de cookies, utilizamos el almacenamiento local del navegador (localStorage) para
            guardar información como preferencias de usuario y datos de sesión localmente en tu dispositivo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta Política de Cookies de vez en cuando. Te sugerimos revisar esta
            página periódicamente para estar informado de cómo protegemos tu información.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contacto</h2>
          <p>
            Si tienes preguntas sobre nuestro uso de cookies, por favor contacta con nosotros en:
            info@rutinaperfecta.com
          </p>
        </section>
      </article>
      </div>
    </div>
  );
}

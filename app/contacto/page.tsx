// app/contacto/page.tsx
'use client';

import { useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Contacto - Rutina Perfecta',
//   description: 'Ponte en contacto con el equipo de Rutina Perfecta. Resolvemos tus preguntas y dudas.',
// };

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Aquí puedes enviar el formulario a un servidor
      // Por ahora, solo mostramos un mensaje de éxito
      console.log('Formulario enviado:', formData);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEnviado(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-600">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:contacto@rutinaperfecta.com"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      contacto@rutinaperfecta.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Soporte Técnico</h3>
                    <p className="text-gray-700">
                      Si tienes problemas técnicos, envía un email detallando:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                      <li>El navegador que usas</li>
                      <li>Tu dispositivo (móvil, tablet, PC)</li>
                      <li>Descripción del problema</li>
                      <li>Pasos para reproducir el error</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Preguntas Frecuentes</h3>
                    <p className="text-gray-700 mb-3">
                      Antes de contactar, revisa nuestras preguntas frecuentes:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>¿Es gratis?</strong> Sí, totalmente gratis.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>¿Necesito una cuenta?</strong> No, puedes usar sin registrarte.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>¿Es seguro?</strong> Sí, usamos encriptación HTTPS.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>¿Funciona offline?</strong> Parcialmente, algunas funciones requieren internet.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Tiempo de Respuesta</h3>
                    <p className="text-gray-700 text-sm">
                      Respondemos a todos los emails dentro de 48 horas. Si no recibes respuesta, 
                      revisa tu carpeta de spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
              
              {enviado && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-900 font-semibold">
                    ✓ Mensaje enviado con éxito. Te responderemos pronto.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-900 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-semibold text-gray-900 mb-1">
                    Asunto *
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="pregunta">Pregunta General</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="reporte">Reporte de Bug</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-900 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {cargando ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

                <p className="text-sm text-gray-600">
                  * Campos obligatorios. Tu información será usada solo para responder a tu consulta.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Otras Formas de Ayuda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Centro de Ayuda</h3>
              <p className="text-gray-700 text-sm">
                Explora nuestros artículos y guías sobre fitness y uso de la plataforma.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacidad</h3>
              <p className="text-gray-700 text-sm">
                Lee nuestra política de privacidad completa y cómo protegemos tus datos.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Términos Legales</h3>
              <p className="text-gray-700 text-sm">
                Revisa nuestros términos de servicio y acuerdos legales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

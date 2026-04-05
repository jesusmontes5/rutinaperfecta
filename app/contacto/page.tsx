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
      <section className="py-12 md:py-16 bg-white border-b border-gold-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-dark mb-4">
            Contacto
          </h1>
          <p className="text-lg text-color-text-muted">
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
                <h2 className="text-2xl font-bold text-gold-dark mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-color-text mb-2">Email</h3>
                    <a 
                      href="mailto:contacto@rutinaperfecta.com"
                      className="text-color-text-muted hover:text-gold-dark transition-colors"
                    >
                      contacto@rutinaperfecta.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-color-text mb-2">Soporte Técnico</h3>
                    <p className="text-color-text-muted">
                      Si tienes problemas técnicos, envía un email detallando:
                    </p>
                    <ul className="list-disc list-inside text-color-text-muted mt-2 space-y-1">
                      <li>El navegador que usas</li>
                      <li>Tu dispositivo (móvil, tablet, PC)</li>
                      <li>Descripción del problema</li>
                      <li>Pasos para reproducir el error</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-color-text mb-2">Preguntas Frecuentes</h3>
                    <p className="text-color-text-muted mb-3">
                      Antes de contactar, revisa nuestras preguntas frecuentes:
                    </p>
                    <ul className="space-y-2 text-color-text-muted">
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

                  <div className="bg-color-bg-secondary p-4 rounded-lg border border-gold-light/30">
                    <h3 className="font-semibold text-color-text mb-2">Tiempo de Respuesta</h3>
                    <p className="text-color-text-muted text-sm">
                      Respondemos a todos los emails dentro de 48 horas. Si no recibes respuesta, 
                      revisa tu carpeta de spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gold-dark mb-6">Envía nos un Mensaje</h2>
              
              {enviado && (
                <div className="mb-6 p-4 bg-gold-light/20 border border-gold-light/40 rounded-lg">
                  <p className="text-gold-dark font-semibold">
                    ✓ Mensaje enviado con éxito. Te responderemos pronto.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-color-text mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gold-light/30 rounded-lg focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold-primary bg-white text-color-text placeholder-color-text-muted/50"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-color-text mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gold-light/30 rounded-lg focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold-primary bg-white text-color-text placeholder-color-text-muted/50"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-semibold text-color-text mb-1">
                    Asunto *
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gold-light/30 rounded-lg focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold-primary bg-white text-color-text"
                  >
                    <option value="" className="text-color-text-muted">Selecciona un asunto</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="pregunta">Pregunta General</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="reporte">Reporte de Bug</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-color-text mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gold-light/30 rounded-lg focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold-primary resize-none bg-white text-color-text placeholder-color-text-muted/50"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full px-6 py-3 font-semibold rounded-lg transition ${
                    cargando
                      ? 'bg-[#e8dcc8]/30 text-color-text-muted cursor-not-allowed'
                      : 'bg-[#997a3c] text-white hover:shadow-lg hover:shadow-[#997a3c]/30'
                  }`}
                >
                  {cargando ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

                <p className="text-sm text-color-text-muted">
                  * Campos obligatorios. Tu información será usada solo para responder a tu consulta.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-color-bg-secondary border-t border-gold-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gold-dark mb-8 text-center">
            Otras Formas de Ayuda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold text-color-text mb-2">Centro de Ayuda</h3>
              <p className="text-color-text-muted text-sm">
                Explora nuestros artículos y guías sobre fitness y uso de la plataforma.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="font-semibold text-color-text mb-2">Privacidad</h3>
              <p className="text-color-text-muted text-sm">
                Lee nuestra política de privacidad completa y cómo protegemos tus datos.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-semibold text-color-text mb-2">Términos Legales</h3>
              <p className="text-color-text-muted text-sm">
                Revisa nuestros términos de servicio y acuerdos legales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// lib/download-utils.ts
import type { Routine, PrebuiltRoutine } from '@/types';

export const downloadRoutineAsPDF = (routine: Routine | PrebuiltRoutine) => {
  // Obtener datos según el tipo de rutina
  const isPrebuilt = 'fullContent' in routine;
  
  const objective = isPrebuilt ? (routine as PrebuiltRoutine).objective : (routine as any).objective || 'General';
  const level = isPrebuilt ? (routine as PrebuiltRoutine).level : (routine as any).level || 'Intermedio';
  const daysPerWeek = isPrebuilt ? (routine as PrebuiltRoutine).days : (routine as any).days || 4;
  const location = isPrebuilt ? 'Gimnasio' : (routine as any).location || 'Gimnasio';
  const description = routine.description;
  const exercises = isPrebuilt ? (routine as PrebuiltRoutine).exercises : (routine as any).exercises || [];

  // Crear contenido HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${routine.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
          background: #ffffff;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 30px;
        }
        h1 {
          color: #000000;
          font-size: 32px;
          font-weight: 700;
          margin: 0;
        }
        .subtitle {
          color: #6b7280;
          font-size: 14px;
          margin-top: 12px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          background: #f9fafb;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .info-item {
          padding: 12px;
        }
        .info-label {
          font-weight: 600;
          color: #6b7280;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .info-value {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin-top: 8px;
        }
        .section {
          margin-bottom: 40px;
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .section h2 {
          color: #000000;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 12px;
          margin-top: 0;
          font-size: 20px;
          font-weight: 700;
        }
        .section p {
          color: #374151;
          margin: 0;
          line-height: 1.8;
        }
        .exercise {
          margin-bottom: 16px;
          padding: 12px;
          background: #f9fafb;
          border-left: 3px solid #000000;
          border-radius: 6px;
        }
        .exercise-title {
          font-weight: 600;
          font-size: 15px;
          color: #000000;
          margin-bottom: 6px;
        }
        .exercise-detail {
          font-size: 13px;
          color: #6b7280;
          margin: 3px 0;
        }
        .footer {
          text-align: center;
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #9ca3af;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${routine.title}</h1>
        <p class="subtitle">Rutina personalizada de Rutina Perfecta</p>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Objetivo</div>
          <div class="info-value">${capitalizeFirstLetter(objective)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Nivel</div>
          <div class="info-value">${capitalizeFirstLetter(level)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Días por semana</div>
          <div class="info-value">${daysPerWeek}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Ubicación</div>
          <div class="info-value">${capitalizeFirstLetter(location)}</div>
        </div>
      </div>

      <div class="section">
        <h2>Descripción</h2>
        <p>${description}</p>
      </div>

      ${exercises
        .map(
          (exercise: any) => `
        <div class="section">
          <h2>${exercise.day}</h2>
          ${exercise.exercises
            .map(
              (ex: any) => `
            <div class="exercise">
              <div class="exercise-title">${ex.name}</div>
              <div class="exercise-detail"><strong>Series:</strong> ${ex.sets}</div>
              <div class="exercise-detail"><strong>Repeticiones:</strong> ${ex.reps}</div>
              ${ex.rest ? `<div class="exercise-detail"><strong>Descanso:</strong> ${ex.rest}</div>` : ''}
              ${ex.notes ? `<div class="exercise-detail"><strong>Notas:</strong> ${ex.notes}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
      `
        )
        .join('')}

      <div class="footer">
        <p>Descargado desde Rutina Perfecta</p>
        <p>Fecha: ${new Date().toLocaleDateString('es-ES')}</p>
      </div>
    </body>
    </html>
  `;

  // Crear blob y descargar
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${routine.title.replace(/\s+/g, '-').toLowerCase()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

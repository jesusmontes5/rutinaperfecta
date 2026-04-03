// lib/download-utils.ts
'use client';

import type { Routine, PrebuiltRoutine } from '@/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const downloadRoutineAsPDF = async (routine: Routine | PrebuiltRoutine) => {
  try {
    // Obtener datos según el tipo de rutina
    const isPrebuilt = 'fullContent' in routine;
    
    const objective = isPrebuilt ? (routine as PrebuiltRoutine).objective : (routine as any).objective || 'General';
    const level = isPrebuilt ? (routine as PrebuiltRoutine).level : (routine as any).level || 'Intermedio';
    const daysPerWeek = isPrebuilt ? (routine as PrebuiltRoutine).days : (routine as any).days || 4;
    const location = isPrebuilt ? 'Gimnasio' : (routine as any).location || 'Gimnasio';
    const description = routine.description;
    const exercises = isPrebuilt ? (routine as PrebuiltRoutine).exercises : (routine as any).exercises || [];

    // Crear contenido HTML temporal
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            padding: 40px;
            background: #ffffff;
            max-width: 800px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
          }
          h1 {
            color: #000000;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .subtitle {
            color: #6b7280;
            font-size: 12px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
            background: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
          }
          .info-item {
            padding: 10px;
          }
          .info-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-top: 5px;
          }
          .section {
            margin-bottom: 25px;
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            page-break-inside: avoid;
          }
          .section h2 {
            color: #000000;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 12px;
            font-size: 16px;
            font-weight: 700;
          }
          .exercise {
            margin-bottom: 12px;
            padding: 10px;
            background: #ffffff;
            border-left: 3px solid #000000;
          }
          .exercise-title {
            font-weight: 600;
            font-size: 13px;
            color: #000000;
            margin-bottom: 4px;
          }
          .exercise-detail {
            font-size: 11px;
            color: #6b7280;
            margin: 2px 0;
          }
          .day-header {
            background: #e5e7eb;
            padding: 8px;
            font-weight: 600;
            margin-bottom: 10px;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 10px;
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
            <div class="day-header">${exercise.day}</div>
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

    // Crear elemento temporal para renderizar
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.position = 'fixed';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.width = '800px';
    element.style.background = 'white';
    document.body.appendChild(element);

    // Convertir a canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Crear PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // Ancho A4 en mm
    const pageHeight = 295; // Alto A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const imageData = canvas.toDataURL('image/png');

    // Agregar páginas según sea necesario
    while (heightLeft >= 0) {
      pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      if (heightLeft >= 0) {
        pdf.addPage();
        position = heightLeft - imgHeight;
      }
    }

    // Descargar PDF
    pdf.save(`${routine.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);

    // Limpiar
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al descargar el PDF. Intenta de nuevo.');
  }
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

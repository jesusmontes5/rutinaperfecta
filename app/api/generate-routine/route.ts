import { NextRequest, NextResponse } from 'next/server';
import type { WizardData } from '@/types';
import { generateRoutine } from '@/lib/routine-generator';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const data: WizardData = await request.json();

    // Validate required fields
    if (!data.objective || !data.level || !data.days || !data.location) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Generate routine (this runs on server, so Groq API is safe)
    const routine = await generateRoutine(data);

    return NextResponse.json(routine, { status: 200 });
  } catch (error: any) {
    console.error('Error generating routine:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Error al generar la rutina',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

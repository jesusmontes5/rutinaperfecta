'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BodyPart } from '@/lib/exerciseDatabase';
import { bodyPartMetadata } from '@/lib/exerciseDatabase';

const BODY_PARTS: BodyPart[] = [
  'chest',
  'back',
  'shoulders',
  'trapezius',
  'biceps',
  'triceps',
  'forearm',
  'abs',
  'quadriceps',
  'hamstring',
  'calves',
];

// Mapeo de bodyPart a nombre de archivo de imagen
const BODY_PART_IMAGES: Record<BodyPart, string> = {
  chest: 'pecho.png',
  back: 'espalda.png',
  shoulders: 'hombro.png',
  trapezius: 'trapecio.png',
  biceps: 'biceps.png',
  triceps: 'triceps.png',
  forearm: 'antebrazo.png',
  abs: 'abdomen.png',
  quadriceps: 'cuadriceps.png',
  hamstring: 'femoral.png',
  calves: 'gemelos.png',
};

interface BodyMapProps {
  selectedPart: BodyPart | null;
  onSelectPart: (part: BodyPart | null) => void;
}

export default function BodyMap({ selectedPart, onSelectPart }: BodyMapProps) {
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);

  const handlePartClick = (part: BodyPart) => {
    onSelectPart(selectedPart === part ? null : part);
  };

  const handlePartHover = (part: BodyPart | null) => {
    setHoveredPart(part);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-display font-800 text-gold-dark mb-2">
          Selecciona un Grupo Muscular
        </h2>
        <p className="text-color-text-muted text-sm md:text-base">
          Haz clic en una imagen para ver ejercicios específicos
        </p>
      </div>

      {/* Grilla de imágenes de grupos musculares */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-4">
        {BODY_PARTS.map((part) => (
          <button
            key={part}
            onClick={() => handlePartClick(part)}
            onMouseEnter={() => handlePartHover(part)}
            onMouseLeave={() => handlePartHover(null)}
            className={`relative group overflow-hidden rounded-2xl transition-all duration-300 transform ${
              selectedPart === part
                ? 'ring-4 ring-gold-primary scale-105 shadow-2xl'
                : hoveredPart === part
                  ? 'scale-105 shadow-xl ring-2 ring-gold-light'
                  : 'shadow-lg hover:shadow-xl'
            }`}
          >
            {/* Imagen del grupo muscular */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-gold-light/20 to-gold-primary/20">
              <Image
                src={`/${BODY_PART_IMAGES[part]}`}
                alt={bodyPartMetadata[part].label}
                fill
                className={`object-cover transition-transform duration-300 ${
                  selectedPart === part ? 'scale-110' : 'group-hover:scale-105'
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            {/* Indicador de selección */}
            {selectedPart === part && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold-primary rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Información de la parte seleccionada */}
      {selectedPart && (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-gold-primary/15 to-gold-light/10 border-2 border-gold-primary/40 rounded-2xl p-5 text-center">
            <p className="text-xl font-display font-700 text-gold-dark mb-1">
              {bodyPartMetadata[selectedPart].label}
            </p>
            <p className="text-sm text-color-text-muted">
              {bodyPartMetadata[selectedPart].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

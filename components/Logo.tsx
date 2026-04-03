'use client';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'small', showText = false }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} hover:opacity-80 transition-opacity`}>
        <img
          src="/rutinaperfecta.svg"
          alt="Rutina Perfecta Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <span className={`${textSizes[size]} font-700 text-black`}>
          Rutina Perfecta
        </span>
      )}
    </div>
  );
}

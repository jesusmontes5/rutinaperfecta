'use client';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'small', showText = false }: LogoProps) {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-14 h-14',
    large: 'w-20 h-20',
  };

  return (
    <div className="flex items-center gap-2 hover:opacity-90 transition-all duration-300">
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img
          src="/logo.png"
          alt="Rutina Perfecta Logo"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {showText && (
        <div className="w-20 h-8 flex items-center justify-center">
          <img
            src="/LOGOTEXTO.jpg"
            alt="Rutina Perfecta"
            className="h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

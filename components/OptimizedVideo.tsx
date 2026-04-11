/**
 * OptimizedVideo - Componente de video optimizado
 * Características:
 * - Lazy loading con Intersection Observer
 * - Fallback graceful si el video no carga
 * - Preload metadata
 * - Error handling
 * - Loading state
 */

import { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  alt: string;
  fallbackEmoji?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function OptimizedVideo({
  src,
  alt,
  fallbackEmoji = '🎬',
  className = 'w-full h-full object-cover',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Intersection Observer para lazy loading
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current && autoPlay) {
            videoRef.current.play().catch(() => {
              // Silenciar errores de autoplay
            });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlay]);

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  /*
   * Render fallback si hay error
   */
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold-light/20 to-gold-very-light/40 flex-col gap-3">
        <div className="text-5xl">{fallbackEmoji}</div>
        <p className="text-sm text-gold-dark font-600">{alt}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Loading skeleton */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gold-light/20 via-gold-very-light/30 to-gold-light/20 animate-pulse"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />
      )}

      {/* Video */}
      {isVisible && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          onCanPlay={handleCanPlay}
          onError={handleError}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  );
}

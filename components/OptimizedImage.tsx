import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  quality = 75,
  sizes,
  style,
  onError
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Générer les chemins pour les formats modernes
  const getModernFormats = (originalSrc: string) => {
    // Si c'est déjà une URL externe, retourner l'original
    if (originalSrc.startsWith('http')) {
      return { webp: originalSrc, avif: originalSrc, fallback: originalSrc };
    }

    // Pour les images locales, essayer les formats modernes
    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const webpSrc = `${baseSrc}.webp`;
    const avifSrc = `${baseSrc}.avif`;

    return {
      webp: webpSrc,
      avif: avifSrc,
      fallback: originalSrc
    };
  };

  const formats = getModernFormats(imgSrc);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Si le format moderne échoue, retomber sur l'original
    if (imgSrc !== formats.fallback) {
      setImgSrc(formats.fallback);
    }
    
    // Appeler le handler externe si fourni
    if (onError) {
      onError(e);
    }
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    priority,
    quality,
    sizes,
    style: {
      ...style,
      opacity: isLoading ? 0.7 : 1,
      transition: 'opacity 0.3s ease'
    },
    onLoad: () => setIsLoading(false),
    onError: handleError
  };

  if (fill) {
    return (
      <div className={`relative ${className}`} style={style}>
        <Image
          {...imageProps}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        />
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
}

// Hook pour générer des srcsets optimisés
export function useOptimizedSrcSet(src: string, sizes: number[]) {
  // Générer les chemins pour les formats modernes
  const getModernFormats = (originalSrc: string) => {
    // Si c'est déjà une URL externe, retourner l'original
    if (originalSrc.startsWith('http')) {
      return { webp: originalSrc, avif: originalSrc, fallback: originalSrc };
    }

    // Pour les images locales, essayer les formats modernes
    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const webpSrc = `${baseSrc}.webp`;
    const avifSrc = `${baseSrc}.avif`;

    return {
      webp: webpSrc,
      avif: avifSrc,
      fallback: originalSrc
    };
  };
  
  const formats = getModernFormats(src);
  
  const generateSrcSet = (baseSrc: string) => {
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  };

  return {
    srcSet: generateSrcSet(formats.fallback),
    webpSrcSet: generateSrcSet(formats.webp),
    avifSrcSet: generateSrcSet(formats.avif)
  };
}

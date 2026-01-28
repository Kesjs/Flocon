"use client";

import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadProps {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyLoad({ 
  threshold = 0.1, 
  rootMargin = '50px' 
}: UseLazyLoadProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return { isVisible, hasLoaded, elementRef };
}

// Hook pour les images avec placeholder
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { isVisible, elementRef } = useLazyLoad();

  useEffect(() => {
    if (isVisible && src && imageSrc === placeholder) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        setHasError(false);
      };
      
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      
      img.src = src;
    }
  }, [isVisible, src, placeholder, imageSrc]);

  return { 
    imageSrc, 
    isLoading, 
    hasError, 
    elementRef,
    isVisible 
  };
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      // Délai minimum pour voir l'animation
      setTimeout(() => setIsLoading(false), 300);
    };

    // Écouter les événements de route
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (url: string) => {
      handleStart();
      setTimeout(() => {
        originalPush(url);
        handleComplete();
      }, 100);
      return Promise.resolve(true);
    };

    router.replace = (url: string) => {
      handleStart();
      setTimeout(() => {
        originalReplace(url);
        handleComplete();
      }, 100);
      return Promise.resolve(true);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return { isLoading };
}

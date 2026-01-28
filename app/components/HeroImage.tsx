"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroImage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <img
      src="/white-rose-flower-red-tablecloth-blue.webp"
      alt="Hero background - Fleurs élégantes pour Flocon"
      className="w-full h-full object-cover"
    />
  );
}

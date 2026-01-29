'use client'

export default function imageLoader({ src, width, quality }) {
  // Si l'URL est déjà complète (commence par http), la retourner telle quelle
  if (src.startsWith('http')) {
    return src
  }
  
  // Sinon, ajouter les paramètres pour les images locales
  return `/${src}?w=${width}&q=${quality || 75}`
}

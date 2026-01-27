import { NextRequest, NextResponse } from 'next/server'

// Configuration CORS sécurisée pour les API routes
export function corsMiddleware(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get('origin')
  
  // Liste des domaines autorisés en production
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3000',
    // Ajouter votre domaine de production ici
    ...(process.env.NODE_ENV === 'production' 
      ? ['https://votredomaine.com', 'https://www.votredomaine.com'] 
      : []
    )
  ]

  // Vérifier si l'origine est autorisée
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else if (!origin) {
    // Requêtes same-origin (pas de header origin)
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0])
  }

  // Headers CORS nécessaires
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Max-Age', '86400') // 24 heures

  return response
}

// Handler pour les requêtes OPTIONS (pre-flight)
export function handleOptions(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    return corsMiddleware(request, response)
  }
  return null
}

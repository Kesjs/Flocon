// Rate limiting simple en mémoire pour les webhooks et API routes
const requestCounts = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs?: number; // Fenêtre de temps en millisecondes
  maxRequests?: number; // Nombre max de requêtes
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = {}
): { allowed: boolean; resetTime?: number } {
  const { windowMs = 60 * 1000, maxRequests = 10 } = config; // 10 requêtes par minute par défaut
  
  const now = Date.now();
  const key = identifier;
  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    // Nouvelle fenêtre ou expiration
    requestCounts.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    return { 
      allowed: false, 
      resetTime: record.resetTime 
    };
  }

  // Incrémenter le compteur
  record.count++;
  return { allowed: true };
}

// Nettoyage périodique des enregistrements expirés
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60 * 1000); // Nettoyer toutes les 5 minutes

// Rate limiting spécifique pour les webhooks Stripe (plus strict)
export function webhookRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  return rateLimit(`webhook:${ip}`, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5 // 5 webhooks par minute maximum
  });
}

// Rate limiting pour les API routes publiques
export function apiRateLimit(ip: string, endpoint: string): { allowed: boolean; resetTime?: number } {
  return rateLimit(`api:${endpoint}:${ip}`, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30 // 30 requêtes par minute par IP
  });
}

// Schémas de validation pour les inputs côté serveur

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface CheckoutRequest {
  cartItems: CartItem[];
  customerEmail: string;
}

// Validation email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

// Validation des items du panier
export function validateCartItem(item: any): item is CartItem {
  return (
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    item.id.length > 0 && item.id.length <= 100 &&
    typeof item.name === 'string' &&
    item.name.length > 0 && item.name.length <= 200 &&
    typeof item.price === 'number' &&
    item.price > 0 && item.price <= 10000 &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 && item.quantity <= 100 &&
    (item.image === undefined || (typeof item.image === 'string' && item.image.length <= 500)) &&
    (item.description === undefined || (typeof item.description === 'string' && item.description.length <= 1000))
  );
}

// Validation complète de la requête checkout
export function validateCheckoutRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Requête invalide');
    return { isValid: false, errors };
  }

  // Validation email
  if (!data.customerEmail || !isValidEmail(data.customerEmail)) {
    errors.push('Email invalide');
  }

  // Validation cartItems
  if (!Array.isArray(data.cartItems) || data.cartItems.length === 0) {
    errors.push('Panier vide ou invalide');
  } else if (data.cartItems.length > 50) {
    errors.push('Trop d\'articles dans le panier');
  } else {
    data.cartItems.forEach((item: any, index: number) => {
      if (!validateCartItem(item)) {
        errors.push(`Article ${index + 1} invalide`);
      }
    });
  }

  // Validation du montant total
  if (Array.isArray(data.cartItems)) {
    const total = data.cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    if (total > 50000) { // 500€ maximum
      errors.push('Montant total trop élevé');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Nettoyage des inputs pour prévenir XSS
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Supprimer les chevrons
    .trim()
    .substring(0, 1000); // Limiter la longueur
}

// Validation des IDs de produits
export function isValidProductId(id: string): boolean {
  return typeof id === 'string' && 
         id.length > 0 && 
         id.length <= 100 && 
         /^[a-zA-Z0-9_-]+$/.test(id);
}

// Validation des montants
export function isValidAmount(amount: number): boolean {
  return typeof amount === 'number' && 
         amount > 0 && 
         amount <= 10000 && 
         Number.isFinite(amount) &&
         Number((amount).toFixed(2)) === amount; // 2 décimales max
}

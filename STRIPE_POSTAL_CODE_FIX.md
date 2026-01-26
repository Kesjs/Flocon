# Configuration Stripe pour résoudre "Invalid postal code"

## Problème
Stripe Checkout valide strictement les codes postaux, ce qui peut causer des erreurs.

## Solutions appliquées

### 1. Configuration simplifiée (actuelle)
- `billing_address_collection: 'auto'` - Plus flexible
- Pas de `shipping_address_collection` - Moins de validations
- `automatic_tax: enabled` - Gère les taxes automatiquement

### 2. Si l'erreur persiste, utilisez cette configuration :

```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
  customer_email: customerEmail,
  metadata: {
    cartItems: JSON.stringify(cartItems),
  },
  // Configuration minimale - aucune validation d'adresse
  billing_address_collection: 'auto',
});
```

### 3. Alternative extrême (si nécessaire) :

```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
  customer_email: customerEmail,
  metadata: {
    cartItems: JSON.stringify(cartItems),
  },
  // Pas de collection d'adresse du tout
});
```

## Test
1. Redémarrez le serveur : `npm run dev`
2. Testez le paiement avec différents codes postaux
3. Si l'erreur persiste, utilisez la configuration minimale

## Notes
- La configuration actuelle devrait résoudre 90% des cas
- Stripe est plus strict sur les codes postaux internationaux
- Les cartes test françaises fonctionnent mieux avec les codes postaux français

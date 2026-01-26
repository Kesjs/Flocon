# Configuration Stripe ULTRA-minimale pour "Invalid postal code"

## Si l'erreur persiste, remplacez complètement la session par :

```javascript
// Version ULTRA-minimale - aucune validation du tout
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cancel`,
  customer_email: customerEmail,
  metadata: {
    cartItems: JSON.stringify(cartItems),
  },
  // RIEN D'AUTRE - configuration la plus basique possible
});
```

## Alternative : utiliser un autre mode

```javascript
// Mode setup (sans validation immédiate)
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'setup', // Au lieu de 'payment'
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
  customer_email: customerEmail,
});
```

## Tests avec cartes de test

Utilisez ces cartes de test Stripe :

### Cartes françaises (devraient fonctionner) :
- **Visa** : 4242 4242 4242 4242
- **Mastercard** : 5555 5555 5555 4444
- **Code postal** : 75001 (Paris)

### Cartes internationales :
- **Visa** : 4000 0000 0000 0002
- **Mastercard** : 5200 8282 8282 8210
- **Code postal** : 1000 (générique)

## Étapes de dépannage

1. **Redémarrez le serveur** : `npm run dev`
2. **Videz le cache** navigateur
3. **Utilisez une carte de test** officielle Stripe
4. **Essayez avec un code postal français** : 75001

## Si rien ne fonctionne

Le problème vient peut-être de :
- **Compte Stripe** en mode test avec restrictions
- **Pays du compte** différent des pays autorisés
- **Configuration du compte** Stripe

Contactez le support Stripe ou vérifiez les paramètres de votre compte.

# Configuration Stripe pour Flocon E-commerce

Ce guide explique comment configurer Stripe pour accepter les paiements dans votre boutique e-commerce.

## Étapes de configuration

### 1. Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte ou connectez-vous
3. Activez le mode test pour commencer

### 2. Récupérer vos clés API

Dans votre dashboard Stripe :
- Allez dans **Developers** → **API keys**
- Vous aurez besoin de :
  - **Publishable key** (commence par `pk_test_`)
  - **Secret key** (commence par `sk_test_`)

### 3. Configurer le Webhook

1. Allez dans **Developers** → **Webhooks**
2. Cliquez sur **Add endpoint**
3. URL du webhook : `https://votredomaine.com/api/webhook`
4. Sélectionnez ces événements :
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
5. Copiez la **Signing Secret** (commence par `whsec_`)

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet :

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_WEBHOOK_SECRET=whsec_votre_cle_webhook

# URL de votre site (important pour les redirections)
NEXT_PUBLIC_SITE_URL=https://votredomaine.com
```

### 5. Base de données (optionnel)

Pour sauvegarder les commandes, créez une table `orders` dans Supabase :

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_email TEXT,
  status TEXT,
  total DECIMAL,
  items INTEGER,
  products TEXT[],
  stripe_session_id TEXT,
  payment_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE
);
```

## Fonctionnalités implémentées

### ✅ Pages de paiement
- **Checkout** (`/checkout`) : Formulaire de paiement avec Stripe
- **Succès** (`/checkout/success`) : Page de confirmation après paiement
- **Annulation** (`/checkout/cancel`) : Page si le paiement est annulé

### ✅ API Routes
- **`/api/create-checkout-session`** : Crée une session de paiement Stripe
- **`/api/webhook`** : Traite les événements Stripe (webhook)

### ✅ Intégration
- Paiement sécurisé via Stripe Checkout
- Support des cartes de crédit
- Sauvegarde automatique des commandes
- Vidage du panier après paiement réussi

## Test du paiement

1. Ajoutez des produits au panier
2. Allez à la page checkout
3. Remplissez le formulaire
4. Cliquez sur "Payer avec Stripe"
5. Utilisez les cartes de test Stripe :
   - **Succès** : `4242 4242 4242 4242`
   - **Échec** : `4000 0000 0000 0002`

## Passage en production

Pour passer en production :

1. Activez le mode live dans Stripe
2. Récupérez les clés live (`pk_live_` et `sk_live_`)
3. Mettez à jour vos variables d'environnement
4. Configurez le webhook pour l'URL de production
5. Testez avec de vraies transactions

## Sécurité

- Les clés secrètes ne sont jamais exposées au client
- Le webhook vérifie la signature des événements
- Les paiements sont traités directement par Stripe
- Aucune donnée de carte bancaire n'est stockée sur vos serveurs

## Support

- Documentation Stripe : [stripe.com/docs](https://stripe.com/docs)
- Support développeur : [support.stripe.com](https://support.stripe.com)

## Dépannage

### Problèmes courants
- **Erreur 400** : Vérifiez vos clés API
- **Webhook non reçu** : Vérifiez l'URL et la signature
- **Paiement échoue** : Utilisez les cartes de test appropriées

### Logs
Les erreurs sont loggées dans la console du serveur et dans les logs Next.js.

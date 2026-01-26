// Script de test pour vérifier la configuration Stripe
// Exécutez: node test-stripe.js

const Stripe = require('stripe');

console.log('🔍 Test de configuration Stripe...\n');

// Vérifier les variables d'environnement
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

console.log('📋 Variables d\'environnement:');
console.log('STRIPE_SECRET_KEY:', stripeSecretKey ? `${stripeSecretKey.substring(0, 7)}...` : '❌ MANQUANTE');
console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', publishableKey ? `${publishableKey.substring(0, 7)}...` : '❌ MANQUANTE');

if (!stripeSecretKey) {
  console.log('\n❌ ERREUR: STRIPE_SECRET_KEY manquante');
  console.log('💡 Solution: Ajoutez cette ligne dans votre fichier .env.local:');
  console.log('STRIPE_SECRET_KEY=sk_test_votre_cle_secrete');
  process.exit(1);
}

if (!publishableKey) {
  console.log('\n❌ ERREUR: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante');
  console.log('💡 Solution: Ajoutez cette ligne dans votre fichier .env.local:');
  console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique');
  process.exit(1);
}

// Tester la connexion à Stripe
console.log('\n🔗 Test de connexion à Stripe...');
try {
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-12-15.clover',
  });

  // Test simple: récupérer les informations du compte
  stripe.account.retrieve()
    .then(account => {
      console.log('✅ Connexion Stripe réussie!');
      console.log(`📧 Email du compte: ${account.email}`);
      console.log(`🏪 Pays: ${account.country}`);
      console.log(`📅 Compte créé: ${account.created}`);
      console.log('\n🎉 Configuration Stripe valide!');
    })
    .catch(error => {
      console.log('❌ Erreur de connexion Stripe:', error.message);
      console.log('\n💡 Solutions possibles:');
      console.log('1. Vérifiez que votre clé Stripe est correcte');
      console.log('2. Assurez-vous que la clé commence par "sk_test_"');
      console.log('3. Vérifiez que votre compte Stripe est actif');
    });

} catch (error) {
  console.log('❌ Erreur lors de l\'initialisation Stripe:', error.message);
}

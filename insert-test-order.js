const testOrder = {
  id: `CMD-FST-${Date.now()}`,
  user_email: 'kenkenbabatounde@gmail.com',
  total: 62.98,
  fst_status: 'confirmed', // Directement confirmé pour tester
  status: 'paid',
  payment_confirmed_at: new Date().toISOString(),
  tracking_number: `FLCN${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString().slice(-6)}`,
  items: 1,
  products: [{
    id: 'fst-test-1',
    name: 'Produit FST Test',
    price: 62.98,
    quantity: 1,
    image: '/test-product.jpg'
  }],
  shipping_address: {
    full_name: 'Kenken Babatounde',
    address: '123 Test Street',
    city: 'Test City',
    postal_code: '75001',
    phone: '0123456789'
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

console.log('🚀 Insertion de la commande FST de test...');
console.log('📧 Email:', testOrder.user_email);
console.log('💰 Montant:', testOrder.total + '€');
console.log('📊 Statut FST:', testOrder.fst_status);
console.log('📦 Numéro de suivi:', testOrder.tracking_number);

// Appel API pour créer la commande
fetch('http://localhost:3000/api/admin/create-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ order: testOrder })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('✅ Commande créée avec succès !');
    console.log('🆔 ID:', data.order.id);
    console.log('📊 Statut:', data.order.fst_status);
    console.log('📦 Suivi:', data.order.tracking_number);
    
    console.log('\n🎯 Test immédiat:');
    console.log('1. Allez sur http://localhost:3000/dashboard');
    console.log('2. Rafraîchissez la page');
    console.log('3. Vous devriez voir la commande apparaître !');
    
    console.log('\n📋 Résultats attendus:');
    console.log('✅ "1 au total" au lieu de "0"');
    console.log('✅ Statut "En préparation"');
    console.log('✅ Numéro de suivi visible');
  } else {
    console.error('❌ Erreur création commande:', data.error);
  }
})
.catch(error => {
  console.error('💥 Erreur appel API:', error);
  console.log('\n🔧 Alternatives:');
  console.log('1. Vérifiez que le serveur localhost:3000 est démarré');
  console.log('2. Copiez manuellement les données dans Supabase');
  console.log('3. Créez une vraie commande via la boutique');
});

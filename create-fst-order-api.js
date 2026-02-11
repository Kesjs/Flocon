// Script pour créer une commande FST via API locale
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

console.log('📦 Création d\'une commande FST de test...');
console.log('📧 Email:', testOrder.user_email);
console.log('💰 Montant:', testOrder.total + '€');
console.log('📊 Statut FST:', testOrder.fst_status);
console.log('📦 Numéro de suivi:', testOrder.tracking_number);

console.log('\n🎯 Test immédiat:');
console.log('1. Copiez ces données dans votre dashboard admin');
console.log('2. Allez sur http://localhost:3000/dashboard');
console.log('3. Vous devriez voir la commande apparaître');

console.log('\n📋 Données JSON à insérer:');
console.log(JSON.stringify(testOrder, null, 2));

// Option: Créer via API si disponible
console.log('\n🔗 Pour créer via API (si disponible):');
console.log('POST http://localhost:3000/api/admin/create-order');
console.log('Body:', JSON.stringify({ order: testOrder }));

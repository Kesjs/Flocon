// Script pour créer une commande FST de test pour kenkenbabatounde@gmail.com
const testOrder = {
  id: `CMD-FST-${Date.now()}`,
  user_email: 'kenkenbabatounde@gmail.com',
  total: 62.98,
  fst_status: 'confirmed',
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

console.log('📦 Commande FST de test créée:');
console.log('ID:', testOrder.id);
console.log('Email:', testOrder.user_email);
console.log('Statut FST:', testOrder.fst_status);
console.log('Numéro de suivi:', testOrder.tracking_number);
console.log('Total:', testOrder.total + '€');

console.log('\n🎯 Instructions:');
console.log('1. Copiez cette commande dans Supabase manuellement');
console.log('2. Allez sur http://localhost:3000/dashboard');
console.log('3. La commande devrait apparaître avec le statut "En préparation"');

console.log('\n📋 Données à insérer dans Supabase:');
console.log(JSON.stringify(testOrder, null, 2));

const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabase = createClient(
  'https://xvczqjkmbfpjkdghvomc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2Y3pxamttYmZwamtkZ2h2b21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NzI4MTIsImV4cCI6MjA1MjE0ODgxMn0.6s0qH6ZqjR3kHlJH8gJgq8hNzqWzqQ8hNzqWzqQ8hNzqWzqQ8h'
);

async function testDashboardUser() {
  console.log('🧪 Test du dashboard utilisateur...\n');

  try {
    // 1. Créer une commande FST de test
    console.log('📦 Création d\'une commande FST de test...');
    const testOrder = {
      id: `CMD-TEST-${Date.now()}`,
      user_email: 'test@example.com',
      total: 62.98,
      fst_status: 'confirmed', // Confirmé pour tester
      status: 'paid',
      payment_confirmed_at: new Date().toISOString(),
      tracking_number: `FLCN${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString().slice(-6)}`,
      items: 1,
      products: [{
        id: 'prod-1',
        name: 'Test FST Product',
        price: 62.98,
        quantity: 1,
        image: '/test.jpg'
      }],
      shipping_address: {
        full_name: 'Test User',
        address: '123 Test Street',
        city: 'Test City',
        postal_code: '75001',
        phone: '0123456789'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: createdOrder, error: createError } = await supabase
      .from('orders')
      .insert(testOrder)
      .select()
      .single();

    if (createError) {
      console.error('❌ Erreur création commande:', createError);
      return;
    }

    console.log('✅ Commande créée:', createdOrder.id);
    console.log('📊 Statut FST:', createdOrder.fst_status);
    console.log('📦 Numéro de suivi:', createdOrder.tracking_number);

    // 2. Vérifier que la commande est bien dans la base
    console.log('\n🔍 Vérification de la commande dans la base...');
    const { data: verifiedOrder, error: verifyError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', createdOrder.id)
      .single();

    if (verifyError) {
      console.error('❌ Erreur vérification:', verifyError);
      return;
    }

    console.log('✅ Commande vérifiée dans la base');
    console.log('📧 Email utilisateur:', verifiedOrder.user_email);
    console.log('📈 Statut pour dashboard:', verifiedOrder.fst_status, '→ En préparation');

    // 3. Instructions pour le test
    console.log('\n📋 Instructions pour le test:');
    console.log('1. Allez sur: http://localhost:3000/dashboard');
    console.log('2. Connectez-vous avec: test@example.com');
    console.log('3. La commande devrait apparaître dans "Mes Commandes"');
    console.log('4. Statut attendu: "En préparation" (pas "Livré")');
    console.log(`5. ID de commande: ${createdOrder.id}`);

    console.log('\n🎯 Le bug est corrigé si vous voyez:');
    console.log('✅ Commande dans la liste');
    console.log('✅ Statut "En préparation"');
    console.log('✅ Numéro de suivi visible');

  } catch (error) {
    console.error('💥 Erreur générale:', error);
  }
}

testDashboardUser();

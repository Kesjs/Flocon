// Script de diagnostic pour la production
async function debugProduction() {
  try {
    console.log('🔍 Diagnostic production...');
    
    // 1. Vérifier les commandes
    const ordersResponse = await fetch('https://flocon-market.fr/api/admin/orders');
    const ordersData = await ordersResponse.json();
    
    console.log(`📊 Commandes trouvées: ${ordersData.count}`);
    ordersData.orders.forEach(order => {
      console.log(`  - ${order.id}: ${order.fst_status} (${order.total}€)`);
    });
    
    // 2. Tenter la réinitialisation
    console.log('\n🔄 Test réinitialisation...');
    const resetResponse = await fetch('https://flocon-market.fr/api/admin/reset-revenue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const resetData = await resetResponse.json();
    
    console.log('📊 Résultat réinitialisation:', resetData);
    
    // 3. Revérifier les commandes
    console.log('\n🔄 Vérification après réinitialisation...');
    const afterResponse = await fetch('https://flocon-market.fr/api/admin/orders');
    const afterData = await afterResponse.json();
    
    console.log(`📊 Commandes après: ${afterData.count}`);
    afterData.orders.forEach(order => {
      console.log(`  - ${order.id}: ${order.fst_status} (${order.total}€)`);
    });
    
  } catch (error) {
    console.error('💥 Erreur:', error);
  }
}

debugProduction();

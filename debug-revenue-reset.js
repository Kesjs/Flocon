// Script de diagnostic pour la réinitialisation des revenus
const { createClient } = require('@supabase/supabase-js');

// Lecture depuis .env.local
const fs = require('fs');
const path = require('path');

function loadEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const env = {};
    
    lines.forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        env[match[1]] = match[2];
      }
    });
    
    return env;
  } catch (err) {
    return {};
  }
}

const env = loadEnvFile('.env.local');
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Diagnostic de la réinitialisation des revenus...');
console.log('URL:', SUPABASE_URL);
console.log('Service Key:', SUPABASE_SERVICE_KEY ? 'Configuré' : 'Manquant');

if (!SUPABASE_URL.includes('your-project') && SUPABASE_SERVICE_KEY !== 'your-service-role-key') {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  async function diagnose() {
    try {
      console.log('\n📊 Étape 1: Toutes les commandes');
      const { data: allOrders, error: allError } = await supabase
        .from('orders')
        .select('id, fst_status, total, created_at')
        .order('created_at', { ascending: false });
      
      if (allError) {
        console.log('❌ Erreur récupération toutes les commandes:', allError.message);
        return;
      }
      
      console.log(`✅ ${allOrders.length} commandes trouvées au total`);
      allOrders.forEach(order => {
        console.log(`  - ${order.id}: ${order.fst_status} (${order.total}€)`);
      });
      
      console.log('\n🎯 Étape 2: Commandes avec fst_status = confirmed');
      const { data: confirmedOrders, error: confirmedError } = await supabase
        .from('orders')
        .select('id, fst_status, total, created_at')
        .eq('fst_status', 'confirmed');
      
      if (confirmedError) {
        console.log('❌ Erreur récupération commandes confirmées:', confirmedError.message);
        return;
      }
      
      console.log(`✅ ${confirmedOrders.length} commandes confirmées trouvées`);
      confirmedOrders.forEach(order => {
        console.log(`  - ${order.id}: ${order.fst_status} (${order.total}€)`);
      });
      
      console.log('\n🔄 Étape 3: Test d\'archivage');
      if (confirmedOrders.length > 0) {
        const { error: updateError } = await supabase
          .from('orders')
          .update({ fst_status: 'archived' })
          .eq('fst_status', 'confirmed');
        
        if (updateError) {
          console.log('❌ Erreur archivage:', updateError.message);
          console.log('Code:', updateError.code);
        } else {
          console.log('✅ Archivage réussi !');
          
          // Vérifier après archivage
          const { data: afterArchived } = await supabase
            .from('orders')
            .select('id, fst_status, total')
            .eq('fst_status', 'confirmed');
          
          console.log(`📊 Commandes confirmées restantes: ${afterArchived.length}`);
          
          const { data: archivedOrders } = await supabase
            .from('orders')
            .select('id, fst_status, total')
            .eq('fst_status', 'archived');
          
          console.log(`📊 Commandes archivées: ${archivedOrders.length}`);
        }
      } else {
        console.log('ℹ️ Aucune commande à archiver');
      }
      
    } catch (error) {
      console.log('💥 Exception:', error.message);
    }
  }
  
  diagnose();
} else {
  console.log('\n❌ Veuillez configurer vos vraies clés Supabase dans ce script');
}

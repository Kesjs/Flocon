import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    console.log('🚨 RÉINITIALISATION D\'URGENCE DES REVENUS...');
    
    // 1. D'abord, voir TOUTES les commandes
    const { data: allOrders, error: allError } = await supabaseAdmin
      .from('orders')
      .select('id, fst_status, total, created_at')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('❌ Erreur récupération toutes les commandes:', allError);
      return NextResponse.json({ error: 'Erreur: ' + allError.message }, { status: 500 });
    }

    console.log(`📊 Commandes totales trouvées: ${allOrders?.length || 0}`);
    allOrders?.forEach(order => {
      console.log(`  - ${order.id}: ${order.fst_status} (${order.total}€)`);
    });

    // 2. Chercher spécifiquement les commandes confirmed
    const { data: confirmedOrders, error: confirmedError } = await supabaseAdmin
      .from('orders')
      .select('id, fst_status, total')
      .eq('fst_status', 'confirmed');

    if (confirmedError) {
      console.error('❌ Erreur récupération commandes confirmées:', confirmedError);
      return NextResponse.json({ error: 'Erreur: ' + confirmedError.message }, { status: 500 });
    }

    console.log(`🎯 Commandes confirmées trouvées: ${confirmedOrders?.length || 0}`);

    // 3. Archiver TOUTES les commandes confirmed
    let archivedCount = 0;
    if (confirmedOrders && confirmedOrders.length > 0) {
      console.log('🔄 Archivage des commandes confirmées...');
      
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ fst_status: 'archived' })
        .eq('fst_status', 'confirmed');

      if (updateError) {
        console.error('❌ Erreur archivage:', updateError);
        
        // Si archived ne fonctionne pas, essayer rejected
        if (updateError.code === '23514' || updateError.message?.includes('invalid input value')) {
          console.log('⚠️ Tentative avec statut rejected...');
          const { error: fallbackError } = await supabaseAdmin
            .from('orders')
            .update({ fst_status: 'rejected' })
            .eq('fst_status', 'confirmed');
            
          if (fallbackError) {
            return NextResponse.json({ error: 'Erreur archivage: ' + fallbackError.message }, { status: 500 });
          }
        } else {
          return NextResponse.json({ error: 'Erreur archivage: ' + updateError.message }, { status: 500 });
        }
      }
      
      archivedCount = confirmedOrders.length;
    }

    // 4. Vérification finale
    const { data: finalOrders } = await supabaseAdmin
      .from('orders')
      .select('id, fst_status, total')
      .eq('fst_status', 'confirmed');

    const remainingCount = finalOrders?.length || 0;

    return NextResponse.json({ 
      success: true, 
      message: `Réinitialisation d'urgence terminée. ${archivedCount} commande(s) archivée(s), ${remainingCount} restante(s).`,
      archivedCount,
      remainingCount,
      totalOrders: allOrders?.length || 0
    });

  } catch (error) {
    console.error('💥 Erreur réinitialisation d\'urgence:', error);
    return NextResponse.json({ error: 'Erreur serveur: ' + (error as Error).message }, { status: 500 });
  }
}

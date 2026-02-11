import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID de commande requis' },
        { status: 400 }
      );
    }

    console.log('🔍 Recherche de commande:', orderId);

    // Rechercher par ID OU par numéro de suivi
    let order = null;
    let searchField = '';

    // D'abord essayer par ID de commande
    const { data: orderById, error: idError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (!idError && orderById) {
      order = orderById;
      searchField = 'ID';
    } else {
      // Si pas trouvé par ID, essayer par numéro de suivi
      const { data: orderByTracking, error: trackingError } = await supabase
        .from('orders')
        .select('*')
        .eq('tracking_number', orderId)
        .single();

      if (!trackingError && orderByTracking) {
        order = orderByTracking;
        searchField = 'tracking_number';
      }
    }

    if (!order) {
      console.log('❌ Commande non trouvée:', orderId, 'recherché par:', searchField || 'ID');
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    console.log('✅ Commande trouvée:', order.id, 'statut:', order.fst_status, 'recherché par:', searchField);

    // Déterminer le statut de suivi en fonction du statut FST et du numéro de suivi
    let trackingStatus = 'confirmed'; // Par défaut
    
    if (order.fst_status === 'confirmed') {
      if (order.tracking_number && !order.tracking_number.startsWith('EN_PREPARATION_')) {
        trackingStatus = 'shipped'; // Expédié si numéro de suivi présent
      } else {
        trackingStatus = 'preparing'; // En préparation si confirmé mais pas encore de suivi
      }
    } else if (order.fst_status === 'rejected') {
      return NextResponse.json(
        { error: 'Commande rejetée' },
        { status: 400 }
      );
    } else if (order.fst_status === 'declared') {
      trackingStatus = 'confirmed'; // En attente de validation
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: trackingStatus,
        trackingNumber: order.tracking_number,
        fstStatus: order.fst_status,
        total: order.total,
        created_at: order.created_at,
        updated_at: order.updated_at,
        user_email: order.user_email
      }
    });

  } catch (error) {
    console.error('💥 Erreur serveur track-order:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la recherche de commande' },
      { status: 500 }
    );
  }
}

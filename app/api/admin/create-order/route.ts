import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { order } = await request.json();

    if (!order) {
      return NextResponse.json(
        { error: 'Données de commande requises' },
        { status: 400 }
      );
    }

    console.log('📦 Création commande FST pour:', order.user_email);

    // S'assurer que tous les champs requis sont présents
    const completeOrder = {
      ...order,
      payment_status: 'confirmed', // Ajout du champ manquant
      customer_name: order.shipping_address?.full_name || 'Client',
      customer_phone: order.shipping_address?.phone || ''
    };

    // Insérer la commande directement
    const { data: createdOrder, error } = await supabase
      .from('orders')
      .insert(completeOrder)
      .select()
      .single();

    if (error) {
      console.error('❌ Erreur création commande:', error);
      return NextResponse.json(
        { error: 'Erreur création commande', details: error.message },
        { status: 500 }
      );
    }

    if (!createdOrder) {
      return NextResponse.json(
        { error: 'Échec création commande' },
        { status: 500 }
      );
    }

    console.log('✅ Commande FST créée:', createdOrder.id);

    return NextResponse.json({
      success: true,
      message: 'Commande FST créée avec succès',
      order: createdOrder
    });

  } catch (error) {
    console.error('💥 Erreur serveur create-order:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création' },
      { status: 500 }
    );
  }
}

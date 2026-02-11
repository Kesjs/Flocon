import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID de commande requis' },
        { status: 400 }
      );
    }

    console.log('📡 Déclaration paiement FST pour:', orderId);

    // Vérifier l'authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header manquant ou invalide' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Vérifier le token avec Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user || !user.email) {
      console.error('Erreur auth:', authError);
      return NextResponse.json(
        { error: 'Utilisateur invalide ou email manquant' },
        { status: 401 }
      );
    }

    // 🔍 Vérifier si l'utilisateur a déjà des fausses déclarations
    const { data: userOrders, error: ordersError } = await supabase
      .from('orders')
      .select('fst_status, payment_declared_at, payment_confirmed_at')
      .eq('user_email', user.email)
      .in('fst_status', ['declared', 'rejected']);

    if (!ordersError && userOrders) {
      const rejectedCount = userOrders.filter(o => o.fst_status === 'rejected').length;
      const declaredCount = userOrders.filter(o => o.fst_status === 'declared').length;
      
      // ⚠️ Alertes si trop de déclarations suspectes
      if (rejectedCount >= 2) {
        console.log('🚨 Utilisateur avec trop de rejets:', user.email, rejectedCount);
        return NextResponse.json({
          error: 'Trop de déclarations rejetées. Veuillez contacter le support.',
          code: 'TO_MANY_REJECTIONS'
        }, { status: 403 });
      }
      
      if (declaredCount >= 3) {
        console.log('⚠️ Utilisateur avec beaucoup de déclarations en attente:', user.email, declaredCount);
        // On autorise mais on marque pour vérification admin
      }
    }

    // Mettre à jour le statut FST de la commande
    const { data: order, error } = await supabase
      .from('orders')
      .update({ 
        fst_status: 'declared',
        payment_declared_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // 🏷️ Marquer pour vérification si suspect
        metadata: userOrders && userOrders.filter(o => o.fst_status === 'rejected').length >= 1 
          ? { requires_verification: true, previous_rejections: userOrders.filter(o => o.fst_status === 'rejected').length }
          : null
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Erreur mise à jour commande:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la déclaration du paiement', details: error.message },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée ou non autorisée' },
        { status: 404 }
      );
    }

    console.log('✅ Paiement FST déclaré avec succès:', order.id);

    return NextResponse.json({
      success: true,
      message: 'Paiement déclaré avec succès',
      order
    });

  } catch (error) {
    console.error('💥 Erreur serveur declare-payment:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la déclaration' },
      { status: 500 }
    );
  }
}

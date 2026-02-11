import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    console.log('🔍 Debug dashboard - Vérification complète...');
    
    const debug = {
      timestamp: new Date().toISOString(),
      orders: {},
      payments: {},
      users: {},
      stats: {}
    };

    // 1. Vérifier les commandes
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('id, fst_status, total, created_at')
      .order('created_at', { ascending: false });

    debug.orders = {
      count: orders?.length || 0,
      error: ordersError?.message || null,
      data: orders?.map(o => ({
        id: o.id,
        fst_status: o.fst_status,
        total: o.total,
        created_at: o.created_at
      })) || []
    };

    // 2. Vérifier les paiements FST
    const { data: payments, error: paymentsError } = await supabaseAdmin
      .from('orders')
      .select('id, fst_status, total, payment_declared_at')
      .eq('fst_status', 'declared');

    debug.payments = {
      count: payments?.length || 0,
      error: paymentsError?.message || null,
      data: payments || []
    };

    // 3. Vérifier les utilisateurs
    const { data: users, error: usersError } = await supabaseAdmin
      .from('auth.users')
      .select('id, email, created_at, last_sign_in_at')
      .order('created_at', { ascending: false })
      .limit(10);

    debug.users = {
      count: users?.length || 0,
      error: usersError?.message || null,
      data: users?.slice(0, 3) || []
    };

    // 4. Calculer les stats manuellement
    const confirmedOrders = orders?.filter(o => o.fst_status === 'confirmed') || [];
    const archivedOrders = orders?.filter(o => o.fst_status === 'archived') || [];
    const rejectedOrders = orders?.filter(o => o.fst_status === 'rejected') || [];
    const declaredPayments = payments || [];

    debug.stats = {
      totalOrders: orders?.length || 0,
      confirmedOrders: confirmedOrders.length,
      archivedOrders: archivedOrders.length,
      rejectedOrders: rejectedOrders.length,
      declaredPayments: declaredPayments.length,
      totalRevenue: confirmedOrders.reduce((sum, o) => sum + (o.total || 0), 0),
      confirmedRevenueDetails: confirmedOrders.map(o => ({
        id: o.id,
        total: o.total,
        created_at: o.created_at
      }))
    };

    return NextResponse.json(debug);

  } catch (error) {
    console.error('💥 Erreur debug dashboard:', error);
    return NextResponse.json({ 
      error: 'Erreur debug: ' + (error as Error).message 
    }, { status: 500 });
  }
}

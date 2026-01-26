import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
  try {
    console.log('Début de la création de session Stripe...');
    
    // Vérifier les variables d'environnement
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY manquant');
      return NextResponse.json(
        { error: 'Configuration Stripe manquante' },
        { status: 500 }
      );
    }

    const { cartItems, customerEmail } = await request.json();
    console.log('Données reçues:', { cartItems: cartItems?.length, customerEmail });

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
    }

    // Créer les line items pour Stripe
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description && item.description.trim() ? item.description : `Produit: ${item.name}`,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convertir en centimes
      },
      quantity: item.quantity,
    }));

    console.log('Line items créés:', lineItems.length);

    // Créer la session de paiement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: customerEmail,
      metadata: {
        cartItems: JSON.stringify(cartItems),
      },
      // Configuration minimale - aucune validation d'adresse
      // Pas de billing_address_collection ni shipping_address_collection
      payment_method_options: {
        card: {
          // Désactiver la validation 3D Secure si nécessaire
          request_three_d_secure: 'automatic',
        },
      },
    });

    console.log('Session Stripe créée:', session.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Afficher plus de détails sur l'erreur
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la session de paiement',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// Configuration Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kenkenbabatounde@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, customerEmail, customerName, paymentMethod } = body;

    if (!orderId || !amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Données manquantes pour l\'envoi d\'email' },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      console.log('📧 Simulation email - Resend non configuré');
      console.log('📧 Données:', { orderId, amount, customerEmail, customerName, paymentMethod });
      return NextResponse.json(
        { success: true, message: 'Email simulé (Resend non configuré)' }
      );
    }

    // Template HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau paiement FST</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; border-radius: 5px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nouveau Paiement FST Déclaré</h1>
            <p>Un client vient de déclarer un paiement par virement bancaire</p>
          </div>
          
          <div class="content">
            <div class="detail">
              <strong>📋 Référence commande:</strong> ${orderId}
            </div>
            
            <div class="detail">
              <strong>💰 Montant:</strong> ${amount.toFixed(2)} €
            </div>
            
            <div class="detail">
              <strong>👤 Client:</strong> ${customerEmail}
              ${customerName ? `<br><strong>Nom:</strong> ${customerName}` : ''}
            </div>
            
            <div class="detail">
              <strong>🏦 Méthode:</strong> ${paymentMethod}
            </div>
            
            <div class="detail">
              <strong>📅 Date:</strong> ${new Date().toLocaleString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            
            <center>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/dashboard" class="button">
                📊 Voir sur le Dashboard Admin
              </a>
            </center>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <strong>⚠️ Action requise:</strong> Veuillez vérifier et valider ce paiement dans votre dashboard admin.
            </div>
          </div>
          
          <div class="footer">
            <p>Cet email a été généré automatiquement par le système de paiement FST</p>
            <p>Flocon Market - Système de Paiement Sécurisé</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Envoyer avec Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Flocon Market <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: `🔔 Nouveau paiement FST déclaré - ${orderId}`,
        html: htmlContent,
        replyTo: customerEmail
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Email Resend envoyé avec succès:', result.id);
      return NextResponse.json({ 
        success: true, 
        messageId: result.id,
        message: 'Email de notification envoyé avec succès'
      });
    } else {
      console.error('❌ Erreur Resend:', result);
      return NextResponse.json(
        { error: result.message || 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Erreur API send-notification:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

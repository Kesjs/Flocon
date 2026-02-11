import nodemailer from 'nodemailer';

interface PaymentNotificationData {
  orderId: string;
  amount: number;
  customerEmail: string;
  customerName?: string;
  paymentMethod: string;
}

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kenkenbabatounde@gmail.com';

if (!GMAIL_USER || !GMAIL_PASS) {
  console.warn('⚠️ GMAIL_USER ou GMAIL_PASS non configurés - les emails ne seront pas envoyés');
}

// Créer le transporter (réutilisable)
let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (!transporter && GMAIL_USER && GMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
      }
    });
  }
  return transporter;
};

export async function sendPaymentNotification(data: PaymentNotificationData) {
  const transporter = getTransporter();
  
  if (!transporter) {
    console.log('📧 Simulation email - Gmail non configuré');
    console.log('📧 Données:', data);
    return { success: true, message: 'Email simulé (Gmail non configuré)' };
  }

  try {
    // Créer le template HTML
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
              <strong>📋 Référence commande:</strong> ${data.orderId}
            </div>
            
            <div class="detail">
              <strong>💰 Montant:</strong> ${data.amount.toFixed(2)} €
            </div>
            
            <div class="detail">
              <strong>👤 Client:</strong> ${data.customerEmail}
              ${data.customerName ? `<br><strong>Nom:</strong> ${data.customerName}` : ''}
            </div>
            
            <div class="detail">
              <strong>🏦 Méthode:</strong> ${data.paymentMethod}
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

    // Envoyer l'email
    console.log('📧 Envoi email Gmail en cours...');
    
    const result = await transporter.sendMail({
      from: `"Flocon Market - Paiements FST" <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🔔 Nouveau paiement FST déclaré - ${data.orderId}`,
      html: htmlContent,
      replyTo: data.customerEmail
    });
    
    console.log('✅ Email Gmail envoyé avec succès:', result.messageId);
    return { 
      success: true, 
      messageId: result.messageId,
      message: 'Email de notification envoyé avec succès'
    };

  } catch (error) {
    console.error('❌ Erreur envoi email Gmail:', error);
    
    // En cas d'erreur, on logue mais on ne bloque pas le processus
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      message: 'Erreur lors de l\'envoi de l\'email de notification'
    };
  }
}

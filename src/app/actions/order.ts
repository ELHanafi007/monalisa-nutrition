"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(customerInfo: { name: string; phone: string; address: string }, cart: any[], grandTotal: number) {
  try {
    const itemsHtml = cart.map(item => `
      <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #eee; border-radius: 10px;">
        <p><strong>Produit:</strong> ${item.name}</p>
        <p><strong>Quantité:</strong> ${item.quantity}</p>
        <p><strong>Prix:</strong> ${item.price} MAD</p>
      </div>
    `).join('');

    const { data, error } = await resend.emails.send({
      from: 'Monaliza House <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'monalizahouse598@gmail.com'],
      subject: `Nouvelle Commande - ${customerInfo.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 20px;">
          <h1 style="color: #8b0000; text-transform: uppercase;">Nouvelle Commande</h1>
          <hr />
          <h2>Client:</h2>
          <p><strong>Nom:</strong> ${customerInfo.name}</p>
          <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
          <p><strong>Adresse:</strong> ${customerInfo.address}</p>
          <hr />
          <h2>Produits:</h2>
          ${itemsHtml}
          <hr />
          <h2 style="text-align: right;">Total: <span style="color: #8b0000;">${grandTotal} MAD</span></h2>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: error.message || 'Email service failure' };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Order Email Error:', error);
    return { success: false, error: error.message || 'System email failure' };
  }
}

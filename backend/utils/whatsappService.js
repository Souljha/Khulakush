const twilio = require('twilio');

let twilioClient = null;

// Initialize Twilio client
try {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // e.g., whatsapp:+14155238886

  if (accountSid && authToken && whatsappFrom) {
    twilioClient = twilio(accountSid, authToken);
    console.log('✅ WhatsApp service initialized successfully');
  } else {
    console.log('⚠️  WhatsApp service not configured');
    console.log('   Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_WHATSAPP_FROM to .env');
  }
} catch (error) {
  console.log('⚠️  WhatsApp service unavailable:', error.message);
}

// Send WhatsApp notification to Highgrounds BLVD
async function sendOrderWhatsAppNotification(order) {
  if (!twilioClient) {
    console.log('WhatsApp service not available - skipping notification');
    return { success: false, error: 'WhatsApp service not configured' };
  }

  try {
    const orderType = order.orderType.toUpperCase();
    const deliveryInfo = order.orderType === 'delivery'
      ? `\n📍 *Delivery Address:*\n${order.deliveryAddress.street}\n${order.deliveryAddress.city}, ${order.deliveryAddress.postalCode}`
      : '';

    const itemsList = order.items.map(item =>
      `• ${item.name} x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const specialInstructions = order.specialInstructions
      ? `\n\n⚠️ *Special Instructions:*\n${order.specialInstructions}`
      : '';

    const message = `🔔 *NEW ORDER RECEIVED!*

📋 *Order #${order.orderNumber}*
📅 ${new Date(order.createdAt).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}

👤 *Customer Information:*
Name: ${order.customerInfo.name}
Phone: ${order.customerInfo.phone}
Email: ${order.customerInfo.email}

📦 *Order Type:* ${orderType}${deliveryInfo}

🛒 *Items:*
${itemsList}

💰 *Total: R${order.totalAmount.toFixed(2)}*${specialInstructions}

Status: ${order.status.toUpperCase()}`;

    const result = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.HIGHGROUNDS_WHATSAPP_NUMBER, // e.g., whatsapp:+27XXXXXXXXX
      body: message
    });

    console.log('WhatsApp notification sent:', result.sid);
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return { success: false, error: error.message };
  }
}

// Send WhatsApp confirmation to customer (optional)
async function sendCustomerWhatsAppConfirmation(order) {
  if (!twilioClient) {
    console.log('WhatsApp service not available - skipping customer confirmation');
    return { success: false, error: 'WhatsApp service not configured' };
  }

  try {
    const orderType = order.orderType.toUpperCase();
    const deliveryInfo = order.orderType === 'delivery'
      ? `\n\n📍 *Delivery to:*\n${order.deliveryAddress.street}\n${order.deliveryAddress.city}, ${order.deliveryAddress.postalCode}`
      : '';

    const itemsList = order.items.map(item =>
      `• ${item.name} x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `✅ *Order Confirmed - Highgrounds BLVD*

Hi ${order.customerInfo.name}! 👋

Thank you for your order!

📋 *Order #${order.orderNumber}*
📦 *Type:* ${orderType}${deliveryInfo}

🛒 *Your Items:*
${itemsList}

💰 *Total: R${order.totalAmount.toFixed(2)}*

📍 *Highgrounds BLVD*
Illovo Junction Shopping Centre
⏰ Wed-Sun: 10:00 AM - 10:00 PM

Questions? Reply to this message or call us!`;

    const result = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${order.customerInfo.phone}`, // Customer's WhatsApp number
      body: message
    });

    console.log('Customer WhatsApp confirmation sent:', result.sid);
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('Error sending customer WhatsApp confirmation:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendOrderWhatsAppNotification,
  sendCustomerWhatsAppConfirmation
};

# WhatsApp Notifications Setup Guide

This guide will help you configure WhatsApp notifications for Highgrounds BLVD order management system using Twilio.

## What's New

✅ **Removed:** Email notifications (nodemailer)
✅ **Added:** WhatsApp notifications via Twilio
✅ **Added:** Delivery option (pickup, dine-in, delivery)
✅ **Updated:** Admin dashboard to show delivery addresses
✅ **Updated:** Checkout page with delivery address form

## Features

### 1. **Three Order Types**
- **Pickup** - Customer collects order at Highgrounds BLVD
- **Dine-In** - Customer eats at the restaurant
- **Delivery** - Order is delivered to customer's address

### 2. **WhatsApp Notifications**
- Highgrounds BLVD receives WhatsApp message when order is placed
- Customer receives order confirmation via WhatsApp
- Messages include order details, customer info, and delivery address (if applicable)

### 3. **Admin Dashboard**
- View all orders with filtering by status
- See delivery addresses for delivery orders
- Update order status
- Track revenue and order statistics

## Twilio WhatsApp Setup

### Step 1: Create a Twilio Account

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email and phone number

### Step 2: Get Your Twilio Credentials

1. After logging in, go to your [Twilio Console](https://console.twilio.com/)
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Copy these values - you'll need them for the `.env` file

### Step 3: Set Up WhatsApp Sandbox (For Testing)

**For testing purposes**, you can use Twilio's WhatsApp Sandbox:

1. In Twilio Console, go to **Messaging** > **Try it out** > **Send a WhatsApp message**
2. Follow the instructions to join the sandbox by sending a WhatsApp message to the Twilio number
3. The sandbox number is usually: `whatsapp:+14155238886`
4. You'll need to send a message like "join <your-sandbox-code>" to join

**Important:** In the sandbox, you can only send WhatsApp messages to phone numbers that have joined your sandbox by sending the join code.

### Step 4: Production WhatsApp Setup (For Live Use)

For production, you need to:

1. Apply for WhatsApp Business API access through Twilio
2. Get your own WhatsApp Business number
3. Complete Twilio's verification process
4. This can take a few days to weeks for approval

**Resources:**
- [Twilio WhatsApp API Docs](https://www.twilio.com/docs/whatsapp/api)
- [Request WhatsApp Business Access](https://www.twilio.com/whatsapp/request-access)

### Step 5: Configure Environment Variables

Update your `.env` file with your Twilio credentials:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your-actual-account-sid-from-twilio-console
TWILIO_AUTH_TOKEN=your-actual-auth-token-from-twilio-console
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
HIGHGROUNDS_WHATSAPP_NUMBER=whatsapp:+27XXXXXXXXX
```

**Important Notes:**

- `TWILIO_ACCOUNT_SID` - Get this from Twilio Console dashboard
- `TWILIO_AUTH_TOKEN` - Get this from Twilio Console dashboard (keep it secret!)
- `TWILIO_WHATSAPP_FROM` - For sandbox: `whatsapp:+14155238886`, For production: your Twilio WhatsApp number
- `HIGHGROUNDS_WHATSAPP_NUMBER` - Highgrounds BLVD's WhatsApp number in format `whatsapp:+27XXXXXXXXX`

**Example for South African number:**
```
HIGHGROUNDS_WHATSAPP_NUMBER=whatsapp:+27823456789
```

### Step 6: Test the Setup

1. **Join the Twilio Sandbox** (if using sandbox):
   - From your WhatsApp, send the join code to the Twilio sandbox number
   - Also have the Highgrounds BLVD number join the sandbox

2. **Restart your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Place a test order**:
   - Go to http://localhost:5173
   - Add items to cart
   - Go to checkout
   - Select "Delivery" as order type
   - Fill in delivery address
   - Complete the order

4. **Check WhatsApp**:
   - Highgrounds BLVD should receive a WhatsApp message with order details
   - Customer should receive a confirmation message

## WhatsApp Message Format

### Message to Highgrounds BLVD:
```
🔔 *NEW ORDER RECEIVED!*

📋 *Order #HG-20251007-1234*
📅 [Date and Time]

👤 *Customer Information:*
Name: John Doe
Phone: +27823456789
Email: john@example.com

📦 *Order Type:* DELIVERY

📍 *Delivery Address:*
123 Main Street, Apt 4B
Sandton, Gauteng 2196

🛒 *Items:*
• Blue Cheese x2 - R420.00
• Pineapple Halos x1 - R340.00

💰 *Total: R760.00*

⚠️ *Special Instructions:*
Please ring the doorbell

Status: PENDING
```

### Message to Customer:
```
✅ *Order Confirmed - Highgrounds BLVD*

Hi John Doe! 👋

Thank you for your order!

📋 *Order #HG-20251007-1234*
📦 *Type:* DELIVERY

📍 *Delivery to:*
123 Main Street, Apt 4B
Sandton, Gauteng 2196

🛒 *Your Items:*
• Blue Cheese x2 - R420.00
• Pineapple Halos x1 - R340.00

💰 *Total: R760.00*

📍 *Highgrounds BLVD*
Illovo Junction Shopping Centre
⏰ Wed-Sun: 10:00 AM - 10:00 PM

Questions? Reply to this message or call us!
```

## Troubleshooting

### WhatsApp messages not sending?

1. **Check your Twilio credentials** in `.env`
2. **Verify both numbers have joined the sandbox** (for testing)
3. **Check backend console** for error messages
4. **Verify phone number format**: Must include country code with `whatsapp:` prefix

### Error: "The number +XXXXXXXXX is not available"

- This means the number hasn't joined your Twilio sandbox
- Send the join code from WhatsApp to activate it

### Orders saving but no notifications?

- Check the backend console for WhatsApp service warnings
- Verify `.env` file has correct Twilio credentials
- Make sure backend server was restarted after updating `.env`

## Production Checklist

Before going live:

- [ ] Apply for Twilio WhatsApp Business API access
- [ ] Get approval and WhatsApp Business number
- [ ] Update `TWILIO_WHATSAPP_FROM` with your approved number
- [ ] Update `HIGHGROUNDS_WHATSAPP_NUMBER` with business number
- [ ] Remove sandbox join requirement
- [ ] Test with real customer phone numbers
- [ ] Set up Twilio billing for production use

## Cost Considerations

**Twilio WhatsApp Pricing (as of 2024):**
- Sandbox: Free for testing
- Production: Pay-as-you-go
  - Outbound messages: ~$0.005 - $0.01 per message
  - Inbound messages: Usually free

**Estimated monthly cost for 100 orders/month:** ~$1-2 USD

Check current pricing: [Twilio WhatsApp Pricing](https://www.twilio.com/whatsapp/pricing)

## Support

- **Twilio Support:** [https://support.twilio.com](https://support.twilio.com)
- **Twilio WhatsApp Docs:** [https://www.twilio.com/docs/whatsapp](https://www.twilio.com/docs/whatsapp)
- **Twilio Console:** [https://console.twilio.com](https://console.twilio.com)

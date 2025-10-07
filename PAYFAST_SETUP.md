# PayFast Payment Integration Setup Guide

This guide explains how to set up and use the PayFast payment gateway integration in Highgrounds BLVD.

## Overview

PayFast is integrated to handle customer payments for orders. The payment flow works as follows:

1. Customer places an order through the checkout page
2. Order is created in the database with `paymentStatus: 'pending'`
3. Customer is redirected to the payment page
4. Payment page auto-submits to PayFast with signed payment data
5. Customer completes payment on PayFast
6. PayFast sends webhook notification (ITN) to confirm payment
7. Customer is redirected to success/cancel page
8. Admin can view payment status in the dashboard

## Current Configuration (Sandbox Mode)

The application is currently configured for PayFast Sandbox (testing) mode with the following credentials in `.env`:

```env
PAYFAST_MODE=sandbox
PAYFAST_MERCHANT_ID=10000100
PAYFAST_MERCHANT_KEY=46f0cd694581a
PAYFAST_PASSPHRASE=your-secure-passphrase-here
```

**Note**: These are PayFast's default sandbox credentials for testing purposes.

## Testing the Payment Flow

### 1. Place a Test Order
- Navigate to the products page
- Add items to cart
- Go to checkout and fill in delivery/pickup details
- Click "Place Order"
- You'll be redirected to the payment page

### 2. PayFast Sandbox Payment
The payment page will auto-redirect to PayFast sandbox. You'll see test payment options:
- **Test successful payment**: Use the "Complete" button
- **Test cancelled payment**: Use the "Cancel" button
- **Test failed payment**: Use specific test card numbers

### 3. Webhook Notification (ITN)
After payment completion, PayFast sends a webhook to:
```
POST http://your-domain.com/api/payment/notify
```

This webhook automatically updates the order's `paymentStatus` to `paid` and triggers a WhatsApp notification to Highgrounds BLVD.

### 4. View Order Status
- Go to admin dashboard: `http://localhost:5173/admin/orders`
- View the order details
- Check the payment status badge (green = paid, yellow = pending, red = failed)

## Production Setup

When you're ready to go live, follow these steps:

### 1. Create PayFast Account
- Go to https://www.payfast.co.za
- Sign up for a merchant account
- Complete the verification process (can take 1-3 business days)

### 2. Get Production Credentials
After verification, login to PayFast dashboard and get:
- **Merchant ID**: Found in Settings > Merchant Details
- **Merchant Key**: Found in Settings > Merchant Details
- **Passphrase**: Create one in Settings > Security > Passphrase

### 3. Update Environment Variables
Update your `.env` file with production credentials:

```env
PAYFAST_MODE=live
PAYFAST_MERCHANT_ID=your-actual-merchant-id
PAYFAST_MERCHANT_KEY=your-actual-merchant-key
PAYFAST_PASSPHRASE=your-secure-passphrase
```

**Important**: Keep your passphrase secure and don't commit it to version control.

### 4. Configure ITN (Webhook) URL
In your PayFast dashboard:
1. Go to Settings > Integration
2. Set the ITN (Instant Transaction Notification) URL to:
   ```
   https://your-production-domain.com/api/payment/notify
   ```
3. Enable ITN notifications
4. Make sure your server is publicly accessible

### 5. Test Production Mode
Before going fully live:
1. Place a small test order (minimum R5.00)
2. Complete the payment with a real card
3. Verify the webhook is received (check server logs)
4. Confirm order status updates in admin dashboard
5. Check WhatsApp notification is sent

## Payment Statuses

Orders can have the following payment statuses:

- **pending** (yellow badge) - Order created, payment not completed
- **paid** (green badge) - Payment successful, order confirmed
- **failed** (red badge) - Payment attempt failed
- **cancelled** (gray badge) - Customer cancelled payment

## Return URLs

The application has three return URLs configured:

1. **Success URL**: `/payment/success`
   - Shown when payment is completed successfully
   - Displays confirmation message
   - Links to continue shopping or view orders

2. **Cancel URL**: `/payment/cancelled`
   - Shown when customer cancels payment on PayFast
   - Order remains in database with status 'pending'
   - Customer can retry payment

3. **Notify URL** (ITN Webhook): `/api/payment/notify`
   - Backend endpoint for PayFast to confirm payment
   - Updates order status and sends WhatsApp notification
   - Should be publicly accessible in production

## Security Notes

1. **Signature Validation**: All payment data is signed with MD5 hash using your passphrase. This prevents tampering.

2. **Webhook Verification**: The ITN handler validates the signature from PayFast before updating order status.

3. **HTTPS Required**: In production, use HTTPS for all payment pages and webhook URLs.

4. **Passphrase Security**:
   - Use a strong, unique passphrase (minimum 16 characters)
   - Never commit it to version control
   - Store it securely in environment variables

## Troubleshooting

### Payment not updating order status
- Check backend logs for webhook errors
- Verify ITN URL is publicly accessible
- Confirm passphrase matches in both .env and PayFast dashboard
- Check signature validation in webhook handler

### Customer not redirected after payment
- Verify return URLs are correct in payment initialization
- Check browser console for navigation errors
- Ensure frontend routes are properly configured

### Webhook not receiving notifications
- Confirm ITN URL is correct in PayFast dashboard
- Check if server is publicly accessible (no localhost)
- Review server logs for incoming requests
- Test webhook with PayFast sandbox first

## Testing Checklist

Before going live, test the following scenarios:

- [ ] Successful payment flow (order to payment to success)
- [ ] Cancelled payment (order remains pending)
- [ ] Failed payment handling
- [ ] Webhook receives and processes ITN correctly
- [ ] Order status updates in admin dashboard
- [ ] WhatsApp notification sent after successful payment
- [ ] Payment status badge displays correctly
- [ ] Return URLs work properly
- [ ] Multiple orders can be processed
- [ ] Delivery and pickup orders both work

## Support

- **PayFast Documentation**: https://developers.payfast.co.za/
- **PayFast Support**: support@payfast.co.za
- **PayFast Sandbox Guide**: https://sandbox.payfast.co.za/

## API Endpoints

The following payment endpoints are available:

- `POST /api/payment/initialize/:orderId` - Initialize payment for an order
- `POST /api/payment/notify` - ITN webhook for payment confirmations
- `GET /api/payment/return` - Success redirect handler
- `GET /api/payment/cancel` - Cancellation redirect handler
- `GET /api/payment/status/:orderId` - Check payment status

## Next Steps

1. Test the payment flow in sandbox mode
2. Verify admin dashboard shows payment status correctly
3. Create PayFast merchant account
4. Switch to production credentials
5. Configure ITN webhook URL
6. Test with real payment (small amount)
7. Monitor first few orders closely
8. Go fully live!

---

**Note**: The application is currently in sandbox mode. Remember to switch to production credentials and update the ITN URL before accepting real payments.

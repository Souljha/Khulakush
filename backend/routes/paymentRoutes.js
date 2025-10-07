const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/Order');

// PayFast configuration
const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE;
const PAYFAST_URL = process.env.PAYFAST_MODE === 'live'
  ? 'https://www.payfast.co.za/eng/process'
  : 'https://sandbox.payfast.co.za/eng/process';

// Generate PayFast signature
function generateSignature(data, passphrase = null) {
  // Create parameter string
  let pfOutput = '';
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== '') {
        pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}&`;
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passphrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }

  return crypto.createHash('md5').update(getString).digest('hex');
}

// POST - Initialize payment for an order
router.post('/initialize/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if payment credentials are configured
    if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY) {
      return res.status(500).json({
        error: 'Payment system not configured',
        message: 'PayFast credentials are missing'
      });
    }

    // Generate unique payment ID
    const paymentId = `${order.orderNumber}-${Date.now()}`;

    // Prepare PayFast data
    const payfastData = {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: `${process.env.VITE_APP_BACKEND_URL || 'https://khulakush-production.up.railway.app'}/api/payment/return?orderId=${orderId}`,
      cancel_url: `${process.env.VITE_APP_BACKEND_URL || 'https://khulakush-production.up.railway.app'}/api/payment/cancel?orderId=${orderId}`,
      notify_url: `${process.env.VITE_APP_BACKEND_URL || 'https://khulakush-production.up.railway.app'}/api/payment/notify`,
      name_first: order.customerInfo.name.split(' ')[0] || 'Customer',
      name_last: order.customerInfo.name.split(' ').slice(1).join(' ') || 'User',
      email_address: order.customerInfo.email,
      cell_number: order.customerInfo.phone.replace(/\s+/g, ''),
      m_payment_id: paymentId,
      amount: order.totalAmount.toFixed(2),
      item_name: `Order ${order.orderNumber}`,
      item_description: `Highgrounds BLVD Order - ${order.items.length} item(s)`,
      custom_str1: orderId.toString(),
      custom_str2: order.orderNumber,
      email_confirmation: '1',
      confirmation_address: order.customerInfo.email
    };

    // Generate signature
    const signature = generateSignature(payfastData, PAYFAST_PASSPHRASE);
    payfastData.signature = signature;

    // Update order with payment ID
    order.payfastPaymentId = paymentId;
    await order.save();

    res.json({
      success: true,
      paymentUrl: PAYFAST_URL,
      paymentData: payfastData,
      orderId: order._id,
      orderNumber: order.orderNumber
    });

  } catch (error) {
    console.error('Error initializing payment:', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
});

// POST - PayFast ITN (Instant Transaction Notification) webhook
router.post('/notify', async (req, res) => {
  try {
    console.log('PayFast ITN received:', req.body);

    const pfData = req.body;

    // Validate signature
    const pfParamString = Object.keys(pfData)
      .filter(key => key !== 'signature')
      .map(key => `${key}=${encodeURIComponent(pfData[key]).replace(/%20/g, '+')}`)
      .join('&');

    const pfPassphrase = PAYFAST_PASSPHRASE ? `&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE)}` : '';
    const pfSignature = crypto.createHash('md5').update(pfParamString + pfPassphrase).digest('hex');

    // Verify signature
    if (pfSignature !== pfData.signature) {
      console.error('Invalid signature');
      return res.status(400).send('Invalid signature');
    }

    // Get order ID from custom_str1
    const orderId = pfData.custom_str1;
    const order = await Order.findById(orderId);

    if (!order) {
      console.error('Order not found:', orderId);
      return res.status(404).send('Order not found');
    }

    // Update order based on payment status
    if (pfData.payment_status === 'COMPLETE') {
      order.paymentStatus = 'paid';
      order.status = 'confirmed';
    } else if (pfData.payment_status === 'FAILED') {
      order.paymentStatus = 'failed';
    } else if (pfData.payment_status === 'CANCELLED') {
      order.paymentStatus = 'cancelled';
    }

    order.payfastData = pfData;
    await order.save();

    console.log(`Order ${order.orderNumber} payment status updated to: ${order.paymentStatus}`);

    res.status(200).send('OK');

  } catch (error) {
    console.error('Error processing PayFast ITN:', error);
    res.status(500).send('Error processing notification');
  }
});

// GET - Payment return (success)
router.get('/return', async (req, res) => {
  const orderId = req.query.orderId;
  const frontendUrl = process.env.FRONTEND_URL || 'https://khulakush.store';
  res.redirect(`${frontendUrl}/payment/success?orderId=${orderId}`);
});

// GET - Payment cancel
router.get('/cancel', async (req, res) => {
  const orderId = req.query.orderId;
  const frontendUrl = process.env.FRONTEND_URL || 'https://khulakush.store';
  res.redirect(`${frontendUrl}/payment/cancelled?orderId=${orderId}`);
});

// GET - Check payment status for an order
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      orderId: order._id,
      orderNumber: order.orderNumber,
      paymentStatus: order.paymentStatus,
      totalAmount: order.totalAmount
    });

  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

module.exports = router;

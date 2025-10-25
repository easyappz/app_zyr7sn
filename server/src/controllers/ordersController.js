const mongoose = require('mongoose');
const Order = require('@src/models/Order');
const Product = require('@src/models/Product');
const User = require('@src/models/User');
const { calcCashbackEarned } = require('@src/utils/bonus');
const { sendPush } = require('@src/utils/push');

function toMoney(n) {
  const num = Number(n || 0);
  return Math.round(num * 100) / 100;
}

function normalizeStatus(status) {
  const allowed = ['new', 'in_progress', 'ready', 'completed', 'cancelled'];
  if (!allowed.includes(status)) return null;
  return status;
}

async function create(req, res) {
  try {
    const userId = req.userId;
    const { items, fulfillmentType, pickupTime, deliveryAddress, paymentMethod } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: { message: 'items must be a non-empty array' } });
    }

    if (!['pickup', 'delivery'].includes(fulfillmentType)) {
      return res.status(400).json({ error: { message: "fulfillmentType must be 'pickup' or 'delivery'" } });
    }

    if (!['e-wallet', 'cod'].includes(paymentMethod)) {
      return res.status(400).json({ error: { message: "paymentMethod must be 'e-wallet' or 'cod'" } });
    }

    if (fulfillmentType === 'delivery' && !deliveryAddress) {
      return res.status(400).json({ error: { message: 'deliveryAddress is required for delivery' } });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }

    // Load products and prepare order items
    let subtotal = 0;
    const orderItems = [];
    const cashbackItems = [];

    for (const it of items) {
      const { productId, quantity, options } = it || {};
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: { message: `Invalid productId: ${productId}` } });
      }
      const q = Number(quantity || 0);
      if (!q || q < 1) {
        return res.status(400).json({ error: { message: 'quantity must be >= 1' } });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: { message: `Product not found: ${productId}` } });
      }
      const linePrice = toMoney(product.price * q);
      subtotal = toMoney(subtotal + linePrice);

      orderItems.push({
        product: product._id,
        quantity: q,
        priceAtPurchase: toMoney(product.price),
        options: {
          syrups: Array.isArray(options && options.syrups) ? options.syrups : []
        }
      });

      cashbackItems.push({
        lineTotal: linePrice,
        isPromo: Boolean(product.isPromo),
        promoBonusPercent: Number(product.promoBonusPercent || 0)
      });
    }

    const bonusApplied = 0; // no redemption at creation step
    const cashbackEarned = toMoney(calcCashbackEarned(user.totalSpend, cashbackItems, subtotal));
    const grandTotal = toMoney(subtotal - bonusApplied);

    const order = new Order({
      user: user._id,
      items: orderItems,
      fulfillmentType,
      pickupTime: pickupTime ? new Date(pickupTime) : undefined,
      deliveryAddress: deliveryAddress || undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'cod' : 'pending',
      status: 'new',
      totals: { subtotal, bonusApplied, cashbackEarned, grandTotal }
    });

    await order.save();

    // Update user totals
    user.totalSpend = toMoney(Number(user.totalSpend || 0) + grandTotal);
    user.bonuses = user.bonuses || { balance: 0, totalEarned: 0, totalRedeemed: 0 };
    user.bonuses.balance = toMoney(Number(user.bonuses.balance || 0) + cashbackEarned);
    user.bonuses.totalEarned = toMoney(Number(user.bonuses.totalEarned || 0) + cashbackEarned);
    await user.save();

    const payment = paymentMethod === 'e-wallet'
      ? {
          paymentProvider: 'e-wallet-mock',
          actionUrl: '/api/payments/e-wallet/mock',
          method: 'POST',
          payloadExample: { orderId: order._id.toString(), action: 'success' },
          acceptableActions: ['success', 'fail']
        }
      : null;

    return res.status(201).json({ order, payment });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: { message: 'Invalid order id' } });
    }

    const order = await Order.findById(id).lean();
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }

    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: { message: 'Invalid order id' } });
    }

    const normalized = normalizeStatus(status);
    if (!normalized) {
      return res.status(400).json({ error: { message: 'Invalid status' } });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }

    // For simplicity, allow owner to update. In real systems, restrict to staff.
    if (order.user.toString() !== req.userId) {
      // Allow non-owner to update in this demo (e.g., staff) but still require auth
      // If you want to forbid, uncomment next line
      // return res.status(403).json({ error: { message: 'Forbidden' } });
    }

    order.status = normalized;
    await order.save();

    const title = 'Order status updated';
    const pretty = normalized.replace('_', ' ');
    const body = `Your order ${order._id.toString()} is now ${pretty}.`;
    await sendPush(order.user, title, body);

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { create, getById, updateStatus };

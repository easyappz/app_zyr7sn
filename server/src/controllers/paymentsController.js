const mongoose = require('mongoose');
const Order = require('@src/models/Order');

async function eWalletMock(req, res) {
  try {
    const { orderId, action } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: { message: 'Invalid orderId' } });
    }

    if (!['success', 'fail'].includes(action)) {
      return res.status(400).json({ error: { message: "action must be 'success' or 'fail'" } });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }

    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }

    if (order.paymentMethod !== 'e-wallet') {
      return res.status(400).json({ error: { message: 'Order paymentMethod is not e-wallet' } });
    }

    if (action === 'success') {
      order.paymentStatus = 'paid';
    } else {
      order.paymentStatus = 'failed';
    }

    await order.save();
    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { eWalletMock };

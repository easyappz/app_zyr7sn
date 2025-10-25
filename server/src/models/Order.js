const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true, min: 0 },
    options: {
      syrups: { type: [String], default: [] }
    }
  },
  { _id: false }
);

const TotalsSchema = new mongoose.Schema(
  {
    subtotal: { type: Number, required: true, min: 0 },
    bonusApplied: { type: Number, required: true, min: 0, default: 0 },
    cashbackEarned: { type: Number, required: true, min: 0 },
    grandTotal: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [OrderItemSchema], required: true, validate: v => Array.isArray(v) && v.length > 0 },
    fulfillmentType: { type: String, enum: ['pickup', 'delivery'], required: true },
    pickupTime: { type: Date },
    deliveryAddress: { type: String },
    paymentMethod: { type: String, enum: ['e-wallet', 'cod'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'cod'], default: 'pending' },
    status: { type: String, enum: ['new', 'in_progress', 'ready', 'completed', 'cancelled'], default: 'new' },
    totals: { type: TotalsSchema, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

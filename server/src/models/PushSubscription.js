const mongoose = require('mongoose');

const PushSubscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscription: { type: Object, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

PushSubscriptionSchema.index({ 'subscription.endpoint': 1 }, { unique: true });
PushSubscriptionSchema.index({ user: 1 });

module.exports = mongoose.model('PushSubscription', PushSubscriptionSchema);

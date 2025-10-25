const mongoose = require('mongoose');

const BonusesSchema = new mongoose.Schema(
  {
    balance: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    totalRedeemed: { type: Number, default: 0 }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, trim: true },
    name: { type: String, default: '' },
    bonuses: { type: BonusesSchema, default: () => ({}) },
    totalSpend: { type: Number, default: 0 }
  },
  { timestamps: true }
);

UserSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);

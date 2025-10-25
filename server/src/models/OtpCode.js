const mongoose = require('mongoose');

const OtpCodeSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, trim: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

OtpCodeSchema.index({ phone: 1 });
OtpCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OtpCode', OtpCodeSchema);

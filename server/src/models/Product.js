const mongoose = require('mongoose');

const DEFAULT_SYRUPS = ['Карамель', 'Яблоко', 'Малина', 'Клубника', 'Лаванда'];

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['drink', 'dessert'], required: true },
    price: { type: Number, required: true, min: 0 },
    isPromo: { type: Boolean, default: false },
    promoBonusPercent: { type: Number, min: 0 },
    availableSyrups: { type: [String], default: DEFAULT_SYRUPS }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);

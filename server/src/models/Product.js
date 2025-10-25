const mongoose = require('mongoose');

const DEFAULT_SYRUPS = ['Карамель', 'Яблоко', 'Малина', 'Клубника', 'Лаванда'];

const NutritionSchema = new mongoose.Schema(
  {
    kcal: { type: Number, min: 0, default: 0 },
    proteins: { type: Number, min: 0, default: 0 },
    fats: { type: Number, min: 0, default: 0 },
    carbs: { type: Number, min: 0, default: 0 }
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['drink', 'dessert'], required: true },
    price: { type: Number, required: true, min: 0 },
    isPromo: { type: Boolean, default: false },
    promoBonusPercent: { type: Number, min: 0 },

    imageUrl: { type: String, default: '' },
    size: { type: String, default: '' },
    category: {
      type: String,
      enum: ['coffee', 'drink', 'dessert'],
      default: function () {
        return this.type === 'dessert' ? 'dessert' : 'drink';
      }
    },
    isPopular: { type: Boolean, default: false },
    popularityScore: { type: Number, default: 0, min: 0 },
    nutrition: { type: NutritionSchema, default: () => ({}) },

    availableSyrups: { type: [String], default: DEFAULT_SYRUPS }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);

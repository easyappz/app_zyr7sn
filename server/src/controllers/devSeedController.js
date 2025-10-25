const Product = require('@src/models/Product');

async function run(req, res) {
  try {
    const secret = req.query.secret;
    const EXPECTED = 'DEV_SEED_SECRET';
    if (secret !== EXPECTED) {
      return res.status(403).json({ error: { message: 'Invalid secret' } });
    }

    const existing = await Product.countDocuments();
    if (existing > 0) {
      return res.json({ created: false, message: 'Products collection is not empty', count: existing });
    }

    const items = [
      { name: 'Espresso', description: 'Rich and bold espresso shot', type: 'drink', price: 150 },
      { name: 'Latte', description: 'Espresso with steamed milk', type: 'drink', price: 220, isPromo: true, promoBonusPercent: 2 },
      { name: 'Cappuccino', description: 'Espresso with frothed milk', type: 'drink', price: 210 },
      { name: 'Iced Tea', description: 'Refreshing iced tea', type: 'drink', price: 160, isPromo: true, promoBonusPercent: 2 },
      { name: 'Cheesecake', description: 'Creamy classic cheesecake', type: 'dessert', price: 300 },
      { name: 'Chocolate Muffin', description: 'Moist chocolate muffin', type: 'dessert', price: 180 },
      { name: 'Apple Pie', description: 'Warm apple pie slice', type: 'dessert', price: 220, isPromo: true, promoBonusPercent: 2 },
      { name: 'Croissant', description: 'Flaky butter croissant', type: 'dessert', price: 140 }
    ];

    const inserted = await Product.insertMany(items);
    const count = await Product.countDocuments();

    res.json({ created: true, inserted: inserted.length, count });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { run };

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

    const DRINK_SYRUPS = ['Caramel', 'Vanilla', 'Hazelnut', 'Raspberry', 'Lavender'];

    const items = [
      // Coffee drinks
      {
        name: 'Espresso',
        description: 'Rich and bold espresso shot',
        type: 'drink',
        category: 'coffee',
        price: 150,
        size: '30 ml',
        isPopular: true,
        popularityScore: 95,
        imageUrl: 'https://cdn.easyappz.dev/images/espresso.jpg',
        nutrition: { kcal: 5, proteins: 0.3, fats: 0.1, carbs: 0.5 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Americano',
        description: 'Espresso diluted with hot water',
        type: 'drink',
        category: 'coffee',
        price: 170,
        size: '250 ml',
        isPopular: true,
        popularityScore: 90,
        imageUrl: 'https://cdn.easyappz.dev/images/americano.jpg',
        nutrition: { kcal: 8, proteins: 0.4, fats: 0.1, carbs: 1 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and foam',
        type: 'drink',
        category: 'coffee',
        price: 210,
        size: '250 ml',
        isPopular: true,
        popularityScore: 96,
        imageUrl: 'https://cdn.easyappz.dev/images/cappuccino.jpg',
        nutrition: { kcal: 120, proteins: 6, fats: 5, carbs: 12 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Latte',
        description: 'Espresso with lots of steamed milk',
        type: 'drink',
        category: 'coffee',
        price: 220,
        size: '300 ml',
        isPopular: true,
        popularityScore: 97,
        isPromo: true,
        promoBonusPercent: 2,
        imageUrl: 'https://cdn.easyappz.dev/images/latte.jpg',
        nutrition: { kcal: 160, proteins: 8, fats: 6, carbs: 16 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Flat White',
        description: 'Velvety double espresso with microfoam milk',
        type: 'drink',
        category: 'coffee',
        price: 230,
        size: '250 ml',
        isPopular: true,
        popularityScore: 92,
        imageUrl: 'https://cdn.easyappz.dev/images/flat-white.jpg',
        nutrition: { kcal: 150, proteins: 8, fats: 6, carbs: 14 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Raf',
        description: 'Espresso with cream and vanilla sugar',
        type: 'drink',
        category: 'coffee',
        price: 260,
        size: '300 ml',
        isPopular: true,
        popularityScore: 91,
        imageUrl: 'https://cdn.easyappz.dev/images/raf.jpg',
        nutrition: { kcal: 250, proteins: 5, fats: 12, carbs: 28 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Mocha',
        description: 'Espresso with chocolate and milk',
        type: 'drink',
        category: 'coffee',
        price: 250,
        size: '300 ml',
        isPopular: true,
        popularityScore: 88,
        imageUrl: 'https://cdn.easyappz.dev/images/mocha.jpg',
        nutrition: { kcal: 290, proteins: 8, fats: 9, carbs: 40 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Cold Brew',
        description: 'Slow cold-extracted coffee for smooth taste',
        type: 'drink',
        category: 'coffee',
        price: 240,
        size: '300 ml',
        isPopular: true,
        popularityScore: 85,
        imageUrl: 'https://cdn.easyappz.dev/images/cold-brew.jpg',
        nutrition: { kcal: 10, proteins: 0.5, fats: 0.1, carbs: 1 },
        availableSyrups: DRINK_SYRUPS
      },

      // Other drinks
      {
        name: 'Lemonade Lemon-Mint',
        description: 'Sparkling lemonade with lemon and mint',
        type: 'drink',
        category: 'drink',
        price: 200,
        size: '400 ml',
        isPopular: true,
        popularityScore: 80,
        imageUrl: 'https://cdn.easyappz.dev/images/lemonade-lemon-mint.jpg',
        nutrition: { kcal: 150, proteins: 0, fats: 0, carbs: 36 },
        availableSyrups: ['Lemon', 'Mint', 'Raspberry']
      },
      {
        name: 'Matcha Latte',
        description: 'Japanese green tea powder with milk',
        type: 'drink',
        category: 'drink',
        price: 270,
        size: '300 ml',
        isPopular: true,
        popularityScore: 83,
        imageUrl: 'https://cdn.easyappz.dev/images/matcha-latte.jpg',
        nutrition: { kcal: 180, proteins: 8, fats: 6, carbs: 20 },
        availableSyrups: DRINK_SYRUPS
      },
      {
        name: 'Black Tea',
        description: 'Premium black tea',
        type: 'drink',
        category: 'drink',
        price: 150,
        size: '300 ml',
        isPopular: false,
        popularityScore: 60,
        imageUrl: 'https://cdn.easyappz.dev/images/black-tea.jpg',
        nutrition: { kcal: 2, proteins: 0, fats: 0, carbs: 0 }
      },
      {
        name: 'Green Tea',
        description: 'Refreshing green tea',
        type: 'drink',
        category: 'drink',
        price: 150,
        size: '300 ml',
        isPopular: false,
        popularityScore: 58,
        imageUrl: 'https://cdn.easyappz.dev/images/green-tea.jpg',
        nutrition: { kcal: 2, proteins: 0, fats: 0, carbs: 0 }
      },

      // Desserts
      {
        name: 'Cheesecake New York',
        description: 'Classic New York style cheesecake',
        type: 'dessert',
        category: 'dessert',
        price: 320,
        size: '120 g',
        isPopular: true,
        popularityScore: 94,
        imageUrl: 'https://cdn.easyappz.dev/images/cheesecake-ny.jpg',
        nutrition: { kcal: 410, proteins: 8, fats: 28, carbs: 32 }
      },
      {
        name: 'Tiramisu',
        description: 'Italian dessert with coffee and mascarpone',
        type: 'dessert',
        category: 'dessert',
        price: 330,
        size: '120 g',
        isPopular: true,
        popularityScore: 92,
        imageUrl: 'https://cdn.easyappz.dev/images/tiramisu.jpg',
        nutrition: { kcal: 420, proteins: 7, fats: 26, carbs: 38 }
      },
      {
        name: 'Brownie',
        description: 'Chocolate brownie with a fudgy center',
        type: 'dessert',
        category: 'dessert',
        price: 180,
        size: '90 g',
        isPopular: true,
        popularityScore: 88,
        imageUrl: 'https://cdn.easyappz.dev/images/brownie.jpg',
        nutrition: { kcal: 360, proteins: 4, fats: 18, carbs: 45 }
      },
      {
        name: 'Carrot Cake',
        description: 'Moist carrot cake with cream cheese frosting',
        type: 'dessert',
        category: 'dessert',
        price: 280,
        size: '120 g',
        isPopular: true,
        popularityScore: 85,
        imageUrl: 'https://cdn.easyappz.dev/images/carrot-cake.jpg',
        nutrition: { kcal: 390, proteins: 6, fats: 22, carbs: 44 }
      },
      {
        name: 'Almond Croissant',
        description: 'Flaky croissant filled with almond cream',
        type: 'dessert',
        category: 'dessert',
        price: 200,
        size: '100 g',
        isPopular: true,
        popularityScore: 86,
        imageUrl: 'https://cdn.easyappz.dev/images/almond-croissant.jpg',
        nutrition: { kcal: 420, proteins: 8, fats: 24, carbs: 42 }
      }
    ];

    const inserted = await Product.insertMany(items);
    const count = await Product.countDocuments();

    res.json({ created: true, inserted: inserted.length, count });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { run };

const mongoose = require('mongoose');
const Product = require('@src/models/Product');

function parseSort(sort) {
  const allowed = ['price', 'name', 'createdAt'];
  if (!sort || typeof sort !== 'string') return { createdAt: -1 };
  let desc = false;
  let field = sort;
  if (sort.startsWith('-')) {
    desc = true;
    field = sort.slice(1);
  }
  if (!allowed.includes(field)) return { createdAt: -1 };
  return { [field]: desc ? -1 : 1 };
}

async function list(req, res) {
  try {
    const { type, page: qPage, limit: qLimit, sort } = req.query;

    const filter = {};
    if (type && ['drink', 'dessert'].includes(type)) {
      filter.type = type;
    }

    const page = Math.max(parseInt(qPage, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(qLimit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const sortObj = parseSort(sort);

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limit),
      Product.countDocuments(filter)
    ]);

    const pages = Math.ceil(total / limit) || 1;

    res.json({ items, page, limit, total, pages });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: { message: 'Invalid product id' } });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
}

module.exports = { list, getById };

const express = require('express');

const router = express.Router();

// Health endpoints
router.get('/hello', async (req, res) => {
  try {
    res.json({ message: 'Hello from API!' });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

router.get('/status', async (req, res) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

// Placeholder sub-routers for future modules
function buildPlaceholderRouter(name) {
  const r = express.Router();
  r.get('/_placeholder', async (req, res) => {
    try {
      res.json({
        module: name,
        message: `${name} module placeholder`,
        ready: false
      });
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
    }
  });
  return r;
}

router.use('/auth', buildPlaceholderRouter('auth'));
router.use('/products', buildPlaceholderRouter('products'));
router.use('/orders', buildPlaceholderRouter('orders'));
router.use('/bonus', buildPlaceholderRouter('bonus'));
router.use('/push', buildPlaceholderRouter('push'));

module.exports = router;

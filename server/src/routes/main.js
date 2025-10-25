const express = require('express');
const authController = require('@src/controllers/authController');
const auth = require('@src/middleware/auth');
const productsController = require('@src/controllers/productsController');
const bonusController = require('@src/controllers/bonusController');
const devSeedController = require('@src/controllers/devSeedController');

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

// Auth routes
const authRouter = express.Router();
authRouter.post('/send-otp', authController.sendOtp);
authRouter.post('/verify-otp', authController.verifyOtp);
authRouter.get('/me', auth, authController.me);
router.use('/auth', authRouter);

// Products routes
const productsRouter = express.Router();
productsRouter.get('/', productsController.list);
productsRouter.get('/:id', productsController.getById);
router.use('/products', productsRouter);

// Bonus routes
const bonusRouter = express.Router();
bonusRouter.get('/summary', auth, bonusController.summary);
router.use('/bonus', bonusRouter);

// Dev seed route (development only)
router.get('/dev/seed', devSeedController.run);

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

router.use('/orders', buildPlaceholderRouter('orders'));
router.use('/push', buildPlaceholderRouter('push'));

module.exports = router;

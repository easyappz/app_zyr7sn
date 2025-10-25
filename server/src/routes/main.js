const express = require('express');
const authController = require('@src/controllers/authController');
const auth = require('@src/middleware/auth');
const productsController = require('@src/controllers/productsController');
const bonusController = require('@src/controllers/bonusController');
const devSeedController = require('@src/controllers/devSeedController');
const ordersController = require('@src/controllers/ordersController');
const paymentsController = require('@src/controllers/paymentsController');
const pushController = require('@src/controllers/pushController');

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

// Orders routes
const ordersRouter = express.Router();
ordersRouter.post('/', auth, ordersController.create);
ordersRouter.get('/:id', auth, ordersController.getById);
ordersRouter.patch('/:id/status', auth, ordersController.updateStatus);
router.use('/orders', ordersRouter);

// Payments routes
const paymentsRouter = express.Router();
paymentsRouter.post('/e-wallet/mock', auth, paymentsController.eWalletMock);
router.use('/payments', paymentsRouter);

// Push routes
const pushRouter = express.Router();
pushRouter.post('/subscribe', auth, pushController.subscribe);
pushRouter.get('/public-key', pushController.publicKey);
router.use('/push', pushRouter);

module.exports = router;

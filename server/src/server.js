require('module-alias/register');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// Routes
const apiRoutes = require('@src/routes/main');
app.use('/api', apiRoutes);

// Centralized error handler
// Always return specific error messages
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  res.status(status).json({ error: { message, ...(details ? { details } : {}) } });
});

// Server listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

// MongoDB connection (must use process.env.MONGO_URI)
(async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
})();

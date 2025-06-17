const express = require('express');
const mongoose = require('mongoose');

const apiRoutes = require('./apiRoutes');

// Для работы с express
const app = express();

app.use('/api', apiRoutes);

/**
 * Пример создания и записи данных в базу данных
 */
const MONGO_URI = process.env.MONGO_URI;

const mongoDb = mongoose.createConnection(MONGO_URI);

mongoDb
  .asPromise()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// const MongoTestSchema = new mongoose.Schema({
//   value: { type: String, required: true },
// });

// const MongoModelTest = global.mongoDb.model('Test', MongoTestSchema);

// const newTest = new MongoModelTest({
//   value: 'test-value',
// });

// newTest.save();

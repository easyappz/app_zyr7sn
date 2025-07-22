/** Не редактируй вообще код этого файла */
/**
 * Импортируй и используй базу данных в других файлах.
 * const { mongoDb } = require('path to db.js')
 */
const mongoose = require('mongoose');

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

exports.mongoDb = mongoDb;

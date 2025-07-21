const express = require('express');

const apiRoutes = require('./apiRoutes');

/** Это подключение к базе данных */
/** Никогда не удаляй этот код  */
require('./db');

const app = express();

app.use('/api', apiRoutes);

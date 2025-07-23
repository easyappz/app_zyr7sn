const express = require('express');
const apiRoutes = require('@src/routes/main');

const app = express();

console.log(apiRoutes);

app.use('/api', apiRoutes);

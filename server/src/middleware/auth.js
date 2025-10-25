const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@src/config/jwt');

module.exports = function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: { message: 'Authorization header must be: Bearer <token>' } });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;

    return next();
  } catch (error) {
    return res.status(401).json({ error: { message: error.message } });
  }
};

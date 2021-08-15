const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  if (!req.headers['x-access-token']) {
    throw new ClientError(401, 'authentication required');
  } else {
    try {
      const payload = jwt.verify(req.headers['x-access-token'], process.env.TOKEN_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authorizationMiddleware;

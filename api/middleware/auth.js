const authMiddleware = (req, res, next) => {
  if (req.headers['access-token'] === 'alamakota') {
    next();
  } else {
    res.status(401).send('bad password');
  }
};

module.exports = authMiddleware;

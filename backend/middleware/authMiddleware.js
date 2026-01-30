const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // adjust the path as needed

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // Ensure JWT_SECRET is set in .env
    const user = await User.findById(_id).select('_id');

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = authMiddleware;

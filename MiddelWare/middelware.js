const jwt = require('jsonwebtoken');



const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Error verifying token:', err.message);
      return res.sendStatus(403);
    }
    console.log('Decoded Token:', user);
    req.user = user;
    next();
  });
};


  const isAdmin = (req, res, next) => {
    if (req.user && req.user.userType === 'admin') {
      return next();
    }
    res.status(403).json({ error: 'Permission denied' });
  };
  

  module.exports= {authenticateToken,isAdmin}
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');

  if(!authorizationHeader) return res.status(401).send({error: 'No authorization header'});

  const [name, token] = authorizationHeader.split(' ');

  if(name !== 'Token' || !token) return res.status(401).send({error: 'Unauthorized or no token'});

  const user = await User.findOne({token});

  if(!user) return res.status(401).send({error: 'NO such user or invalid token'});

  req.user = user;

  next();
};

module.exports = auth;
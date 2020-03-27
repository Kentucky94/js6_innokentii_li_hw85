const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };

  const user = new User(userData);

  user.generateToken();

  try{
    await user.save();

    res.send(user);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({username});

  if(!user) return res.status(400).send({error: 'User not found!'});

  const isMatch = await user.checkPassword(password);

  if(!isMatch) return res.status(400).send({error: 'Wrong password!'});

  user.generateToken();

  await user.save();

  res.send(user);
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try{
    const token = req.get('Authorization').split(' ')[1];

    if(!token) return res.send(success);

    const user = await User.findOne({token});

    if(!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  }catch(error){
    res.send(success);
  }
});

module.exports = router;
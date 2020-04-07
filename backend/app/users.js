const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const config = require('../config');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try{
      await fs.promises.access(config.uploadAvatarPath);
    }catch{
      await fs.promises.mkdir(config.uploadAvatarPath);
    }

    cb(null, config.uploadAvatarPath)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.post('/', upload.single('avatarImage'),async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
  };

  if(req.file){
    userData.avatarImage = 'http://localhost:8080/uploads/avatar/' + req.file.filename;
  }

  const user = new User(userData);

  user.generateToken();

  try{
    await user.save();

    res.send(user);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/facebook', async (req, res) => {
  try{
    const facebookData = req.body;
    const inputToken = facebookData.accessToken;
    const accessToken = config.facebookAccess + '|' + config.facebookSecret;
    const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(url);

    if(response.data.data.error) return res.status(401).send({message: 'Facebook registration error'});

    if(response.data.data.user_id !== facebookData.id) return res.status(401).send({message: 'Incorrect user ID'});

    let user = await User.findOne({'username': facebookData.id});

    if(!user){
      user = new User({
        username: facebookData.id,
        password: nanoid(),
        displayName: facebookData.name,
        avatarImage: 'haha',
      });
    }

    user.generateToken();
    await user.save();

    res.send(user);

  }catch(error){
    res.status(500).send(error);
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
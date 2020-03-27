const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const Artist = require('../models/Artist');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const artists = await Artist.find({isPublished: true});

    res.send(artists);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/all', async (req, res) => {
  try{
    const artists = await Artist.find();

    res.send(artists);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const artist = await Artist.findOne({_id: req.params.id});

    res.send(artist);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', [auth, permit('admin', 'user')], upload.single('photo'), async (req, res) => {
  const artistData = req.body;

  if(req.file){
    artistData.photo = req.file.filename;
  }

  const artist = new Artist(artistData);

  try{
    await artist.save();

    res.send({id: artist._id})
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
  try{
    const artist = await Artist.findOne({_id: req.params.id});

    artist.isPublished = true;

    await artist.save();

    res.send(artist);
  }catch(e){
    res.status(400).send(e);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try{
    await Artist.deleteOne({_id: req.params.id});

    res.send({message: 'Successful delete'});
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;
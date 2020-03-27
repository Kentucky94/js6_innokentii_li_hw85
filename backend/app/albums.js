const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const Album = require('../models/Album');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
}
});

const upload = multer({storage});

const router = express.Router();

router.get('/all', async (req, res) => {
  try{
    const albums = await Album.find();

    res.send(albums);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const album = await Album.findOne({_id: req.params.id}).populate('artist');

    res.send(album);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/byArtist/:artist_id', async (req, res) => {
  try{
    const albums = await Album.find({artist: req.params.artist_id, isPublished: true}).sort({release_year: 1});

    res.send(albums);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', upload.single('cover_image'), async (req, res) => {
  const albumData = req.body;

  if(req.file){
    albumData.cover_image = req.file.filename;
  }

  const album = new Album(albumData);

  try{
    await album.save();

    res.send({id: album._id});
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
  try{
    const album = await Album.findOne({_id: req.params.id});

    album.isPublished = true;

    await album.save();

    res.send(album);
  }catch(e){
    res.status(400).send(e);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try{
    await Album.deleteOne({_id: req.params.id});

    res.send({message: 'Successful delete'});
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;


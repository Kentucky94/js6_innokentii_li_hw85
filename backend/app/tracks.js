const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Track = require('../models/Track');

const router = express.Router();

router.get('/all', async (req, res) => {
  try{
    const tracks = await Track.find().populate('album');

    res.send(tracks);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/byArtist/:artist_id', async(req, res) => {
  try{
    const tracksByArtist = await Track.find().populate('album', {artist: req.params.artist_id});

    res.send(tracksByArtist);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/byAlbum/:album_id', async (req, res) => {
  try{
    const tracks = await Track.find({album: req.params.album_id, isPublished: true});

    res.send(tracks);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', async (req, res) => {
  const trackData = req.body;

  const track = new Track(trackData);

  try{
    await track.save();

    res.send({id: track._id});
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
  try{
    const track = await Track.findOne({_id: req.params.id});

    track.isPublished = true;

    await track.save();

    res.send(track);
  }catch(e){
    res.status(400).send(e);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try{
    await Track.deleteOne({_id: req.params.id});

    res.send({message: 'Successful delete'});
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;
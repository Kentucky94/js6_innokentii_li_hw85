const express = require('express');

const auth = require('../middleware/auth');
const Track = require('../models/Track');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const user = req.user;

  const track = await Track.findOne({_id: req.body.trackId});
  if(!track) return res.status(400).send({error: 'Track Not Found!'});

  const trackHistoryData = {track: track._id, user: user._id};

  const trackHistory = new TrackHistory(trackHistoryData);

  try{
    await trackHistory.save();

    res.send(trackHistory);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  const user = req.user;

  try{
    const trackHistories = await TrackHistory.find({user: user._id});

    res.send(trackHistories);
  }catch(error){
    res.status(404).send({error})
  }
});

module.exports = router;
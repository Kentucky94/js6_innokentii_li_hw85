const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectID,
    ref: 'Album',
    require: true,
  },
  track_number: Number,
  duration: Number,
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
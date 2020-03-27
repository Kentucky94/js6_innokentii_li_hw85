const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectID,
    ref: 'Artist',
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  cover_image: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
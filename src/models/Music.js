const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: [{
    name: {
      type: String,
      required: true
    }
  }],
  album: [{
    name: {
      type: String,
      required: true,
      default: 'none'
    }
  }],
  url: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model('Music', MusicSchema);
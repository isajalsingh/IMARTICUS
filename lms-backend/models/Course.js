const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);
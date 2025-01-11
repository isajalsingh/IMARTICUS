const mongoose = require('mongoose');

// Check if the model already exists
const Lecture = mongoose.models.Lecture || mongoose.model('Lecture', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: false
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: false
  }
}, {
  timestamps: false
}));

module.exports = Lecture;

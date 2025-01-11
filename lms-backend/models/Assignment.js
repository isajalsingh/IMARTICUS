const mongoose = require('mongoose');

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
}));

module.exports = Assignment;

const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // questions: [
  //   {
  //     questionText: { type: String, required: true },
  //     options: [{ type: String, required: true }],
  //     correctOption: { type: Number, required: true }
  //   }
  // ],
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true }
  // createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);

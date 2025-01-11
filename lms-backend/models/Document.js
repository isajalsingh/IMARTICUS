const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: String,
  content: String,
  uploadedBy: String,
});

module.exports = mongoose.model('Document', DocumentSchema);

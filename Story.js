const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mediaUrl: String,
  mediaType: String,
  createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours
});

module.exports = mongoose.model('Story', storySchema);

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
  },
  isApproved: {
    type: Boolean,
    default: true, // Auto-approve for now, can be changed to false if moderation is needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);

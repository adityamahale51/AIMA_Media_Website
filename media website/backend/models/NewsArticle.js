const mongoose = require('mongoose');

const NewsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  category: {
    type: String, // Keeping as String for now to match old structure, but could be ObjectId ref Category
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  district: {
    type: String,
    default: '',
  },
  images: [String],
  image: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: { // Denormalized for performance and compatibility
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'reviewed', 'approved', 'published', 'rejected'],
    default: 'submitted',
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  is_trending: {
    type: Boolean,
    default: false,
  },
  rejectionReason: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  published_at: {
    type: Date,
  },
}, { timestamps: true });

NewsArticleSchema.index({ slug: 1 });
NewsArticleSchema.index({ author: 1 });
NewsArticleSchema.index({ status: 1 });
NewsArticleSchema.index({ is_featured: 1 });
NewsArticleSchema.index({ is_trending: 1 });

module.exports = mongoose.model('NewsArticle', NewsArticleSchema);

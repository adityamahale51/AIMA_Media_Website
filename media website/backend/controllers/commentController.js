const Comment = require('../models/Comment');
const News = require('../models/News');

// @desc    Get all comments for a news article
// @route   GET /api/comments/news/:newsId
// @access  Public
exports.getNewsComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ news: req.params.newsId, isApproved: true })
      .populate('user', 'firstName lastName profilePhoto')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a comment
// @route   POST /api/comments
// @access  Private
exports.createComment = async (req, res, next) => {
  try {
    const { newsId, content } = req.body;

    if (!newsId || !content) {
      return res.status(400).json({ success: false, message: 'News ID and content are required' });
    }

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    const comment = await Comment.create({
      news: newsId,
      user: req.user.id,
      content,
    });

    const populatedComment = await Comment.findById(comment._id).populate('user', 'firstName lastName profilePhoto');

    res.status(201).json({
      success: true,
      data: populatedComment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (Owner or Admin)
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Check ownership or admin role
    if (comment.user.toString() !== req.user.id && !['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Comment removed',
    });
  } catch (err) {
    next(err);
  }
};

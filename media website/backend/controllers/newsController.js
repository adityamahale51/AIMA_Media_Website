const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const News = require('../models/News');
const User = require('../models/User');

// Helper: optionally get requester role (if token present)
const getRequester = async (req) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user || null;
  } catch (err) {
    return null;
  }
};

exports.createNews = async (req, res, next) => {
  // accept common alternative field names from various clients
  const body = req.body || {};
  const pick = (names) => {
    for (const n of names) {
      if (body[n] !== undefined && body[n] !== null && String(body[n]).trim() !== '') return body[n];
    }
    return undefined;
  };

  const title = pick(['title', 'newsTitle', 'headline', 'news_title', 'name']);
  const content = pick(['content', 'newsContent', 'body', 'description']);
  const category = pick(['category']);
  const state = pick(['state']);
  const district = pick(['district', 'city']);

  if (!title || !content) {
    // produce a clear error showing what was received to help debugging
    const receivedKeys = Object.keys(body);
    const filesInfo = (req.files || []).map(f => ({ fieldname: f.fieldname, originalname: f.originalname }));
    return res.status(400).json({
      success: false,
      message: 'Title and content are required',
      received: { bodyKeys: receivedKeys, sampleBody: body, files: filesInfo },
    });
  }
  const files = req.files || [];
  if (files.length > 5) return res.status(400).json({ success: false, message: 'Max 5 images allowed' });
  const images = files.map((f) => `news/${f.filename}`);
  const news = await News.create({
    title,
    content,
    category,
    state,
    district,
    images,
    author: req.user.id,
  });
  res.status(201).json({ success: true, data: news });
};

exports.getAllNews = async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const { state, category, search } = req.query;

  const requester = await getRequester(req);
  const isAdmin = requester && requester.role === 'admin';

  const filter = {};
  if (!isAdmin) filter.isApproved = true;
  if (state) filter.state = state;
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const total = await News.countDocuments(filter);
  const news = await News.find(filter)
    .populate('author', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.json({ success: true, count: news.length, total, page, pages: Math.ceil(total / limit), data: news });
};

// GET /api/news/my - current user's articles
exports.getMyNews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = { author: req.user.id };
    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({ success: true, count: news.length, total, page, pages: Math.ceil(total / limit), data: news });
  } catch (err) {
    next(err);
  }
};

// GET /api/news/trending - simple trending: newest approved articles (limit)
exports.getTrending = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const news = await News.find({ isApproved: true })
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json({ success: true, count: news.length, data: news });
  } catch (err) {
    next(err);
  }
};

// GET /api/news/featured - featured placeholder: approved and category maybe featured
exports.getFeatured = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 6;
    const news = await News.find({ isApproved: true })
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json({ success: true, count: news.length, data: news });
  } catch (err) {
    next(err);
  }
};

exports.getNewsById = async (req, res, next) => {
  const { id } = req.params;
  // validate id to avoid Mongoose CastError when path segments like 'my' or 'trending' are requested
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid news id' });
  }

  const news = await News.findById(id).populate('author', 'firstName lastName email');
  if (!news) return res.status(404).json({ success: false, message: 'News not found' });

  const requester = await getRequester(req);
  const isAdmin = requester && requester.role === 'admin';
  const isAuthor = requester && news.author && news.author._id && requester.id === news.author._id.toString();
  if (!news.isApproved && !(isAdmin || isAuthor)) {
    return res.status(403).json({ success: false, message: 'Not allowed to view this news' });
  }

  res.json({ success: true, data: news });
};

exports.updateNews = async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findById(id);
  if (!news) return res.status(404).json({ success: false, message: 'News not found' });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ success: false, message: 'Not authorized' });

  const isAuthor = news.author.toString() === req.user.id;
  const isAdmin = user.role === 'admin';
  if (!isAuthor && !isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' });

  const { title, content, category, state, district } = req.body;
  if (title) news.title = title;
  if (content) news.content = content;
  if (category) news.category = category;
  if (state) news.state = state;
  if (district) news.district = district;

  // handle images: append new images (if any) but enforce max 5
  const files = req.files || [];
  if (files.length) {
    const newImages = files.map((f) => `news/${f.filename}`);
    if ((news.images ? news.images.length : 0) + newImages.length > 5) {
      return res.status(400).json({ success: false, message: 'Exceeds max 5 images' });
    }
    news.images = (news.images || []).concat(newImages);
  }

  await news.save();
  res.json({ success: true, data: news });
};

exports.deleteNews = async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findById(id);
  if (!news) return res.status(404).json({ success: false, message: 'News not found' });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ success: false, message: 'Not authorized' });

  const isAuthor = news.author.toString() === req.user.id;
  const isAdmin = user.role === 'admin';
  if (!isAuthor && !isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' });

  // remove files from disk if present
  if (news.images && news.images.length) {
    news.images.forEach((img) => {
      const filePath = path.join(__dirname, '..', 'uploads', img);
      fs.unlink(filePath, (err) => {});
    });
  }

  await news.remove();
  res.json({ success: true, message: 'News removed' });
};

exports.approveNews = async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findById(id);
  if (!news) return res.status(404).json({ success: false, message: 'News not found' });
  news.isApproved = true;
  await news.save();
  res.json({ success: true, data: news });
};

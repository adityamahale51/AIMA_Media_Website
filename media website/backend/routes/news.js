const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const JsonDB = require('../utils/db');
const { authRequired, authOptional } = require('../middleware/auth');

const router = express.Router();
const newsDB = new JsonDB('news.json');
const usersDB = new JsonDB('users.json');

// Multer config for image/audio uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp3|wav|ogg|m4a|mpeg/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype.split('/')[1]);
    if (ext || mime) cb(null, true);
    else cb(new Error('Only image and audio files are allowed'));
  },
});

// GET /api/news — Get all news posts (only published for public)
router.get('/', authOptional, (req, res) => {
  try {
    let news = newsDB.findAll();
    // Public users only see published articles
    news = news.filter(n => n.status === 'published' || !n.status);
    // Sort by date descending (newest first)
    news.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: news });
  } catch (err) {
    console.error('Get news error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/news/featured — Get featured articles
router.get('/featured', (req, res) => {
  try {
    let news = newsDB.findAll();
    news = news.filter(n => n.is_featured && (n.status === 'published' || !n.status));
    news.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: news.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/news/trending — Get trending articles
router.get('/trending', (req, res) => {
  try {
    let news = newsDB.findAll();
    news = news.filter(n => n.is_trending && (n.status === 'published' || !n.status));
    news.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: news.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/news/my — Get current user's articles (all statuses)
router.get('/my', authRequired, (req, res) => {
  try {
    let news = newsDB.findAll();
    news = news.filter(n => n.authorId === req.user.id);
    news.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/news/category/:category — Get articles by category
router.get('/category/:category', (req, res) => {
  try {
    let news = newsDB.findAll();
    news = news.filter(n => n.category === req.params.category && (n.status === 'published' || !n.status));
    news.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/news/:id — Get single news post
router.get('/:id', (req, res) => {
  try {
    const post = newsDB.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'News post not found' });
    }
    // Increment views
    newsDB.update(req.params.id, { views: (post.views || 0) + 1 });
    res.json({ success: true, data: { ...post, views: (post.views || 0) + 1 } });
  } catch (err) {
    console.error('Get news by id error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/news — Create news post (auth required)
router.post('/', authRequired, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
]), (req, res) => {
  try {
    const user = usersDB.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { title, body, category, state } = req.body;
    if (!title || !body) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;
    const image2File = req.files && req.files['image2'] ? req.files['image2'][0] : null;
    const image3File = req.files && req.files['image3'] ? req.files['image3'][0] : null;
    const audioFile = req.files && req.files['audio'] ? req.files['audio'][0] : null;

    const extraImages = [];
    if (image2File) extraImages.push('/uploads/' + image2File.filename);
    if (image3File) extraImages.push('/uploads/' + image3File.filename);

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]+/g, '-').replace(/^-|-$/g, '').substring(0, 80) || 'article-' + Date.now();
    const tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const submitAction = req.body.submitAction || 'publish'; // 'draft' or 'publish'

    const newPost = newsDB.create({
      authorId: user.id,
      author: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=1a237e&color=fff`,
      location: `${user.city || ''}, ${user.state || ''}`,
      date: new Date().toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      title,
      slug,
      body,
      category: category || 'General',
      state: state || 'India',
      tags,
      image: imageFile ? '/uploads/' + imageFile.filename : null,
      extraImages,
      audio: audioFile ? '/uploads/' + audioFile.filename : null,
      status: submitAction === 'draft' ? 'draft' : 'submitted',
      is_featured: false,
      is_trending: false,
      published_at: null,
      likes: 0,
      views: 0,
      shares: 0,
      comments: 0,
      likedBy: [],
    });

    // Update user post count
    usersDB.update(user.id, { postsCount: (user.postsCount || 0) + 1 });

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error('Create news error:', err);
    res.status(500).json({ success: false, message: 'Server error creating news post' });
  }
});

// PUT /api/news/:id/like — Like/unlike a post
router.put('/:id/like', authRequired, (req, res) => {
  try {
    const post = newsDB.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const likedBy = post.likedBy || [];
    const userId = req.user.id;
    let newLikes;

    if (likedBy.includes(userId)) {
      // Unlike
      const filtered = likedBy.filter(id => id !== userId);
      newLikes = Math.max(0, (post.likes || 1) - 1);
      newsDB.update(req.params.id, { likedBy: filtered, likes: newLikes });
    } else {
      // Like
      likedBy.push(userId);
      newLikes = (post.likes || 0) + 1;
      newsDB.update(req.params.id, { likedBy, likes: newLikes });
    }

    res.json({ success: true, likes: newLikes, liked: !likedBy.includes(userId) ? false : true });
  } catch (err) {
    console.error('Like error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/news/:id — Delete a post (auth required, only author)
router.delete('/:id', authRequired, (req, res) => {
  try {
    const post = newsDB.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.authorId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }
    newsDB.delete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    console.error('Delete news error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

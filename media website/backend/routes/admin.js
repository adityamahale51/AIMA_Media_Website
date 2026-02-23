const express = require('express');
const JsonDB = require('../utils/db');
const { adminRequired } = require('../middleware/admin');

const router = express.Router();
const usersDB = new JsonDB('users.json');
const newsDB = new JsonDB('news.json');
const plansDB = new JsonDB('plans.json');
const transactionsDB = new JsonDB('transactions.json');
const contactsDB = new JsonDB('contacts.json');

// ==================== DASHBOARD / ANALYTICS ====================

// GET /api/admin/stats — Revenue & overview analytics
router.get('/stats', adminRequired, (req, res) => {
  try {
    const users = usersDB.findAll();
    const news = newsDB.findAll();
    const transactions = transactionsDB.findAll();

    const totalMembers = users.filter(u => u.role !== 'admin').length;
    const pendingMembers = users.filter(u => u.membershipStatus === 'pending').length;
    const approvedMembers = users.filter(u => u.membershipStatus === 'approved').length;
    const suspendedMembers = users.filter(u => u.membershipStatus === 'suspended').length;

    const totalArticles = news.length;
    const pendingArticles = news.filter(n => n.status === 'submitted').length;
    const publishedArticles = news.filter(n => n.status === 'published').length;
    const rejectedArticles = news.filter(n => n.status === 'rejected').length;
    const draftArticles = news.filter(n => n.status === 'draft').length;
    const featuredArticles = news.filter(n => n.is_featured).length;
    const trendingArticles = news.filter(n => n.is_trending).length;

    const paidTransactions = transactions.filter(t => t.payment_status === 'paid');
    const totalRevenue = paidTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const monthlyRevenue = paidTransactions
      .filter(t => {
        const d = new Date(t.createdAt);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    res.json({
      success: true,
      data: {
        members: { total: totalMembers, pending: pendingMembers, approved: approvedMembers, suspended: suspendedMembers },
        articles: { total: totalArticles, pending: pendingArticles, published: publishedArticles, rejected: rejectedArticles, draft: draftArticles, featured: featuredArticles, trending: trendingArticles },
        revenue: { total: totalRevenue, monthly: monthlyRevenue, transactions: transactions.length },
      },
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== MEMBER MANAGEMENT ====================

// GET /api/admin/members — Get all members with filters
router.get('/members', adminRequired, (req, res) => {
  try {
    let users = usersDB.findAll().filter(u => u.role !== 'admin');
    const { status, search } = req.query;

    if (status && status !== 'all') {
      users = users.filter(u => u.membershipStatus === status);
    }
    if (search) {
      const s = search.toLowerCase();
      users = users.filter(u =>
        (u.firstName + ' ' + u.lastName).toLowerCase().includes(s) ||
        (u.email || '').toLowerCase().includes(s) ||
        (u.membershipId || '').toLowerCase().includes(s)
      );
    }

    // Remove password from response
    const safeUsers = users.map(({ password, ...u }) => u);
    res.json({ success: true, data: safeUsers });
  } catch (err) {
    console.error('Admin get members error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/members/:id/approve — Approve member
router.put('/members/:id/approve', adminRequired, (req, res) => {
  try {
    const user = usersDB.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Member not found' });

    const now = new Date();
    const expiry = new Date(now);
    expiry.setFullYear(expiry.getFullYear() + 1);

    const updated = usersDB.update(req.params.id, {
      membershipStatus: 'approved',
      verification_status: 'verified',
      membership_start: now.toISOString(),
      membership_expiry: expiry.toISOString(),
      approvedAt: now.toISOString(),
      approvedBy: req.user.id,
    });

    const { password, ...safe } = updated;
    res.json({ success: true, message: 'Member approved successfully', user: safe });
  } catch (err) {
    console.error('Admin approve member error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/members/:id/reject — Reject member
router.put('/members/:id/reject', adminRequired, (req, res) => {
  try {
    const user = usersDB.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Member not found' });

    const updated = usersDB.update(req.params.id, {
      membershipStatus: 'rejected',
      verification_status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectedBy: req.user.id,
      rejectionReason: req.body.reason || '',
    });

    const { password, ...safe } = updated;
    res.json({ success: true, message: 'Member rejected', user: safe });
  } catch (err) {
    console.error('Admin reject member error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/members/:id/suspend — Suspend member
router.put('/members/:id/suspend', adminRequired, (req, res) => {
  try {
    const user = usersDB.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Member not found' });

    const updated = usersDB.update(req.params.id, {
      membershipStatus: 'suspended',
      suspendedAt: new Date().toISOString(),
      suspendedBy: req.user.id,
      suspensionReason: req.body.reason || '',
    });

    const { password, ...safe } = updated;
    res.json({ success: true, message: 'Member suspended', user: safe });
  } catch (err) {
    console.error('Admin suspend member error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== ARTICLE MANAGEMENT ====================

// GET /api/admin/articles — Get all articles with filters
router.get('/articles', adminRequired, (req, res) => {
  try {
    let articles = newsDB.findAll();
    const { status, search } = req.query;

    if (status && status !== 'all') {
      articles = articles.filter(a => a.status === status);
    }
    if (search) {
      const s = search.toLowerCase();
      articles = articles.filter(a =>
        (a.title || '').toLowerCase().includes(s) ||
        (a.author || '').toLowerCase().includes(s)
      );
    }

    articles.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: articles });
  } catch (err) {
    console.error('Admin get articles error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/articles/:id/approve — Approve article
router.put('/articles/:id/approve', adminRequired, (req, res) => {
  try {
    const article = newsDB.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

    const updated = newsDB.update(req.params.id, {
      status: 'published',
      published_at: new Date().toISOString(),
      approvedBy: req.user.id,
    });

    res.json({ success: true, message: 'Article approved and published', data: updated });
  } catch (err) {
    console.error('Admin approve article error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/articles/:id/reject — Reject article
router.put('/articles/:id/reject', adminRequired, (req, res) => {
  try {
    const article = newsDB.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

    const updated = newsDB.update(req.params.id, {
      status: 'rejected',
      rejectedBy: req.user.id,
      rejectionReason: req.body.reason || '',
    });

    res.json({ success: true, message: 'Article rejected', data: updated });
  } catch (err) {
    console.error('Admin reject article error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/articles/:id/feature — Toggle featured article
router.put('/articles/:id/feature', adminRequired, (req, res) => {
  try {
    const article = newsDB.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

    const updated = newsDB.update(req.params.id, {
      is_featured: !article.is_featured,
    });

    res.json({ success: true, message: updated.is_featured ? 'Article featured' : 'Article unfeatured', data: updated });
  } catch (err) {
    console.error('Admin feature article error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/articles/:id/trending — Toggle trending article
router.put('/articles/:id/trending', adminRequired, (req, res) => {
  try {
    const article = newsDB.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

    const updated = newsDB.update(req.params.id, {
      is_trending: !article.is_trending,
    });

    res.json({ success: true, message: updated.is_trending ? 'Article marked trending' : 'Article unmarked trending', data: updated });
  } catch (err) {
    console.error('Admin trending article error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/admin/articles/:id — Delete article (admin)
router.delete('/articles/:id', adminRequired, (req, res) => {
  try {
    const article = newsDB.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

    newsDB.delete(req.params.id);
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    console.error('Admin delete article error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== PLAN MANAGEMENT ====================

// GET /api/admin/plans — Get all plans
router.get('/plans', adminRequired, (req, res) => {
  try {
    const plans = plansDB.findAll();
    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/plans/:id — Update plan
router.put('/plans/:id', adminRequired, (req, res) => {
  try {
    const { name, price, duration, features } = req.body;
    const updated = plansDB.update(req.params.id, { name, price, duration, features });
    if (!updated) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== CONTACTS / MESSAGES ====================

// GET /api/admin/contacts — Get all contact messages
router.get('/contacts', adminRequired, (req, res) => {
  try {
    let contacts = contactsDB.findAll();
    contacts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/contacts/:id/read — Mark contact as read
router.put('/contacts/:id/read', adminRequired, (req, res) => {
  try {
    const updated = contactsDB.update(req.params.id, { status: 'read', readAt: new Date().toISOString() });
    if (!updated) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== EXPORT ====================

// GET /api/admin/export/members — Export member data as JSON
router.get('/export/members', adminRequired, (req, res) => {
  try {
    const users = usersDB.findAll().filter(u => u.role !== 'admin');
    const exportData = users.map(({ password, ...u }) => u);
    res.setHeader('Content-Disposition', 'attachment; filename=idma-members-export.json');
    res.setHeader('Content-Type', 'application/json');
    res.json(exportData);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

const User = require('../models/User');
const News = require('../models/News');
const Contact = require('../models/Contact');
const Transaction = require('../models/Transaction');

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const mapMember = (u) => ({
  id: u._id,
  firstName: u.firstName || '',
  lastName: u.lastName || '',
  email: u.email,
  city: u.city || u.district || '',
  state: u.state || '',
  membershipId: u.membershipId || '',
  selectedPlanName: u.selectedPlanName || '',
  membershipStatus: u.membershipStatus || 'pending',
  role: u.role,
});

const mapArticle = (a) => ({
  id: a._id,
  title: a.title,
  author: a.author && typeof a.author === 'object'
    ? `${a.author.firstName || ''} ${a.author.lastName || ''}`.trim()
    : 'Member',
  category: a.category || '',
  date: formatDate(a.date || a.createdAt),
  image: a.image || (a.images && a.images[0] ? `/uploads/${a.images[0]}` : ''),
  views: a.views || 0,
  likes: a.likes || 0,
  status: a.status || (a.isApproved ? 'published' : 'submitted'),
  is_featured: !!a.is_featured,
  is_trending: !!a.is_trending,
  rejectionReason: a.rejectionReason || '',
});

exports.getStats = async (req, res, next) => {
  try {
    const [membersTotal, pending, approved, suspended, rejected, totalArticles, published, featured, transactions] = await Promise.all([
      User.countDocuments({ role: 'member' }),
      User.countDocuments({ role: 'member', membershipStatus: 'pending' }),
      User.countDocuments({ role: 'member', membershipStatus: 'approved' }),
      User.countDocuments({ role: 'member', membershipStatus: 'suspended' }),
      User.countDocuments({ role: 'member', membershipStatus: 'rejected' }),
      News.countDocuments({}),
      News.countDocuments({ status: 'published' }),
      News.countDocuments({ is_featured: true }),
      Transaction.find({ status: 'paid' }).select('amount createdAt'),
    ]);

    const monthlyStart = new Date();
    monthlyStart.setDate(1);
    monthlyStart.setHours(0, 0, 0, 0);

    const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const monthlyRevenue = transactions
      .filter((t) => t.createdAt >= monthlyStart)
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    res.json({
      success: true,
      data: {
        members: {
          total: membersTotal,
          pending,
          approved,
          suspended,
          rejected,
        },
        articles: {
          total: totalArticles,
          pending: Math.max(totalArticles - published, 0),
          published,
          featured,
        },
        revenue: {
          total: totalRevenue,
          monthly: monthlyRevenue,
          transactions: transactions.length,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMembers = async (req, res, next) => {
  try {
    const status = req.query.status || 'all';
    const search = req.query.search || '';
    const query = { role: 'member' };
    if (status !== 'all') query.membershipStatus = status;
    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { city: regex },
        { state: regex },
        { membershipId: regex },
      ];
    }
    const members = await User.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: members.map(mapMember) });
  } catch (err) {
    next(err);
  }
};

exports.approveMember = async (req, res, next) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member || member.role !== 'member') {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    member.membershipStatus = 'approved';
    member.membershipStatusReason = '';
    await member.save();
    res.json({ success: true, data: mapMember(member) });
  } catch (err) {
    next(err);
  }
};

exports.rejectMember = async (req, res, next) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member || member.role !== 'member') {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    member.membershipStatus = 'rejected';
    member.membershipStatusReason = req.body.reason || '';
    await member.save();
    res.json({ success: true, data: mapMember(member) });
  } catch (err) {
    next(err);
  }
};

exports.suspendMember = async (req, res, next) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member || member.role !== 'member') {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    member.membershipStatus = 'suspended';
    member.membershipStatusReason = req.body.reason || '';
    await member.save();
    res.json({ success: true, data: mapMember(member) });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const status = req.query.status || 'all';
    const search = req.query.search || '';
    const query = {};
    if (status !== 'all') query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };
    const rows = await News.find(query).populate('author', 'firstName lastName').sort({ createdAt: -1 });
    res.json({ success: true, data: rows.map(mapArticle) });
  } catch (err) {
    next(err);
  }
};

exports.approveArticle = async (req, res, next) => {
  try {
    const row = await News.findById(req.params.id).populate('author', 'firstName lastName');
    if (!row) return res.status(404).json({ success: false, message: 'Article not found' });
    row.status = 'published';
    row.isApproved = true;
    row.rejectionReason = '';
    await row.save();
    res.json({ success: true, data: mapArticle(row) });
  } catch (err) {
    next(err);
  }
};

exports.rejectArticle = async (req, res, next) => {
  try {
    const row = await News.findById(req.params.id).populate('author', 'firstName lastName');
    if (!row) return res.status(404).json({ success: false, message: 'Article not found' });
    row.status = 'rejected';
    row.isApproved = false;
    row.rejectionReason = req.body.reason || '';
    await row.save();
    res.json({ success: true, data: mapArticle(row) });
  } catch (err) {
    next(err);
  }
};

exports.toggleFeatured = async (req, res, next) => {
  try {
    const row = await News.findById(req.params.id).populate('author', 'firstName lastName');
    if (!row) return res.status(404).json({ success: false, message: 'Article not found' });
    row.is_featured = !row.is_featured;
    await row.save();
    res.json({ success: true, data: mapArticle(row) });
  } catch (err) {
    next(err);
  }
};

exports.toggleTrending = async (req, res, next) => {
  try {
    const row = await News.findById(req.params.id).populate('author', 'firstName lastName');
    if (!row) return res.status(404).json({ success: false, message: 'Article not found' });
    row.is_trending = !row.is_trending;
    await row.save();
    res.json({ success: true, data: mapArticle(row) });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const row = await News.findById(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Article not found' });
    await row.deleteOne();
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};

exports.markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

exports.exportMembers = async (req, res, next) => {
  try {
    const members = await User.find({ role: 'member' }).sort({ createdAt: -1 });
    res.json({ success: true, data: members.map(mapMember) });
  } catch (err) {
    next(err);
  }
};

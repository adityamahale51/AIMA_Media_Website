const News = require('../models/News');

exports.getGallery = async (req, res, next) => {
  try {
    // Fetch all published news with images
    const newsWithImages = await News.find({ 
      status: 'published', 
      $or: [
        { images: { $exists: true, $not: { $size: 0 } } },
        { image: { $ne: '' } }
      ]
    })
    .select('title images image category createdAt')
    .sort({ createdAt: -1 })
    .limit(50);

    const galleryItems = [];
    
    newsWithImages.forEach(news => {
      if (news.images && news.images.length > 0) {
        news.images.forEach((img, index) => {
          galleryItems.push({
            id: `${news._id}-${index}`,
            url: img.startsWith('http') ? img : (img.startsWith('/uploads/') ? img : `/uploads/${img}`),
            caption: news.title,
            category: news.category || 'General',
            newsId: news._id
          });
        });
      } else if (news.image) {
        galleryItems.push({
          id: `${news._id}-main`,
          url: news.image.startsWith('http') ? news.image : (news.image.startsWith('/uploads/') ? news.image : `/uploads/${news.image}`),
          caption: news.title,
          category: news.category || 'General',
          newsId: news._id
        });
      }
    });

    // If no news images, return fallback static items
    if (galleryItems.length === 0) {
      return res.json({
        success: true,
        data: [
          { id: 'g1', url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200', caption: 'National Media Summit', category: 'Conferences' },
          { id: 'g2', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200', caption: 'Press Meet Highlights', category: 'Events' },
          { id: 'g3', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200', caption: 'Editorial Workshop', category: 'Meetings' },
        ]
      });
    }

    res.json({ success: true, data: galleryItems });
  } catch (err) {
    next(err);
  }
};

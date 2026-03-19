const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    
    // If no items in DB, return the default items for compatibility/demo
    if (items.length === 0) {
      const galleryItems = [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200', caption: 'National Media Summit', category: 'Conferences' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200', caption: 'Press Meet Highlights', category: 'Events' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200', caption: 'Editorial Workshop', category: 'Meetings' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200', caption: 'Journalism Excellence Awards', category: 'Awards' },
        { id: 'g5', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200', caption: 'District Press Committee', category: 'Meetings' },
        { id: 'g6', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200', caption: 'Media Networking Event', category: 'Events' },
      ];
      return res.json({ success: true, data: galleryItems });
    }

    const data = items.map(item => ({
      id: item._id.toString(),
      url: item.image,
      caption: item.title,
      category: item.category,
      description: item.description
    }));

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

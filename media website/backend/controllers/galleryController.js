const galleryItems = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200', caption: 'National Media Summit', category: 'Conferences' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200', caption: 'Press Meet Highlights', category: 'Events' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200', caption: 'Editorial Workshop', category: 'Meetings' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200', caption: 'Journalism Excellence Awards', category: 'Awards' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200', caption: 'District Press Committee', category: 'Meetings' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200', caption: 'Media Networking Event', category: 'Events' },
];

exports.getGallery = async (req, res) => {
  res.json({ success: true, data: galleryItems });
};

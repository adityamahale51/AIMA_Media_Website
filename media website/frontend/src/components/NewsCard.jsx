import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

export default function NewsCard({ post }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLike = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      const res = await api.likeNews(post.id);
      setLikes(res.likes);
      setLiked(res.liked);
    } catch {
      setLikes(l => liked ? l - 1 : l + 1);
      setLiked(!liked);
    }
  };

  const handleAction = (action) => {
    if (!user) { navigate('/login'); return; }
    if (action === 'comment') alert('Comment feature coming soon!');
    if (action === 'share') alert('Link copied to clipboard!');
  };

  const body = post.body || '';
  const shortBody = body.length > 250 ? body.substring(0, 250) + '...' : body;

  return (
    <div className="news-card">
      <div className="news-card-header">
        <div className="avatar">
          <img src={post.avatar} alt={post.author} onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author) + '&background=e0e0e0&color=888'; }} />
        </div>
        <div className="info">
          <a href="#" className="name" onClick={e => e.preventDefault()}>{post.author}</a>
          <div className="meta">
            <span>{post.location}</span>
            <span className="badge">AIMAMEDIA</span>
            <span>{post.date}</span>
          </div>
        </div>
        <span className="report-btn"><i className="fas fa-flag"></i> Report</span>
      </div>
      <div className="news-card-title">{post.title}</div>
      <div className="news-card-body">
        {expanded ? body : shortBody}
        {body.length > 250 && (
          <a href="#" className="read-more" onClick={e => { e.preventDefault(); setExpanded(!expanded); }}>
            {expanded ? ' Show Less' : ' Read More'}
          </a>
        )}
      </div>
      {post.extraImages && post.extraImages.length > 0 && (
        <div className="news-card-extra-images">
          {post.extraImages.map((img, i) => (
            <img key={i} src={img} alt={`Extra ${i + 1}`} onError={e => { e.target.style.display = 'none'; }} />
          ))}
        </div>
      )}
      {post.image && (
        <div className="news-card-image">
          <img src={post.image} alt="News" onError={e => { e.target.style.display = 'none'; }} />
        </div>
      )}
      <div className="news-card-stats">
        <span className="stat"><i className="fas fa-heart"></i> {likes}</span>
        <span className="stat"><i className="fas fa-eye"></i> {post.views || 0} Views</span>
        <span className="stat"><i className="fas fa-share"></i> {post.shares || 0} Shares</span>
        <span className="stat"><i className="fas fa-comment"></i> {post.comments || 0} Comments</span>
      </div>
      <div className="news-card-actions">
        <button onClick={handleLike} style={liked ? { color: 'var(--secondary)' } : {}}><i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i> Like</button>
        <button onClick={() => handleAction('comment')}><i className="far fa-comment"></i> Comment</button>
        <button onClick={() => handleAction('comment')}><i className="far fa-comment"></i> Comment</button>
        <button onClick={() => handleAction('share')}><i className="fas fa-share"></i> Share</button>
      </div>
      <div className="news-card-comments">
        <audio controls style={{ width: '100%', height: '30px', marginBottom: '6px' }}>
          {post.audio && <source src={post.audio} type="audio/mpeg" />}
          Your browser does not support the audio element.
        </audio>
        <a href="#" onClick={e => e.preventDefault()}><i className="fas fa-comment"></i> {post.comments || 0} comment</a>
      </div>
    </div>
  );
}

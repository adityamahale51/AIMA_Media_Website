import { Link } from 'react-router-dom';
import './news.css';

export default function NewsCard({ item }) {
  const preview = item.content ? (item.content.length > 180 ? item.content.slice(0, 180) + '...' : item.content) : '';
  const img = item.images && item.images.length ? item.images[0] : null;
  return (
    <div className="nw-card">
      {img && <img className="nw-thumb" src={img.startsWith('/') ? img : img} alt={item.title} />}
      <div className="nw-body">
        <h3 className="nw-title"><Link to={`/news/${item._id}`}>{item.title}</Link></h3>
        <div className="nw-meta">{item.category} • {item.state} • {new Date(item.createdAt).toLocaleString()} • {item.author && (item.author.firstName || item.author.email)}</div>
        <p className="nw-preview">{preview}</p>
      </div>
    </div>
  );
}

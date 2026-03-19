import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { api } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function NewsDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItem = async () => {
    setLoading(true); setError('');
    try{
      const res = await api.getNewsById(id);
      if (res && res.data) setItem(res.data);
      else setItem(res);
    }catch(err){ setError(err.message || 'Failed to load'); }
    finally{ setLoading(false); }
  };

  useEffect(()=>{ fetchItem(); },[id]);

  const handleApprove = async () => {
    try{ await api.approveNews(id); fetchItem(); }
    catch(err){ alert(err.message || 'Failed'); }
  };
  const handleDelete = async () => {
    if(!confirm('Delete this news?')) return;
    try{ await api.deleteNews(id); navigate('/news'); }
    catch(err){ alert(err.message || 'Failed'); }
  };

  if(loading) return <Layout><div>Loading...</div></Layout>;
  if(error) return <Layout><div style={{color:'red'}}>{error}</div></Layout>;
  if(!item) return <Layout><div>No news found</div></Layout>;

  const isAdmin = user && user.role === 'admin';
  const isAuthor = user && item.author && item.author._id === user._id;

  return (
    <Layout>
      <div style={{ maxWidth:900, margin:'24px auto' }}>
        <h1>{item.title}</h1>
        <div style={{ color:'#7b8b9a' }}>{item.category} • {item.state} • {new Date(item.createdAt).toLocaleString()}</div>
        <div style={{ marginTop:12 }} dangerouslySetInnerHTML={{ __html: item.content }} />
        {item.images && item.images.length>0 && (
          <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
            {item.images.map((img,i)=> <img key={i} src={img} alt={`img-${i}`} style={{ width:240, height:160, objectFit:'cover', borderRadius:6 }} />)}
          </div>
        )}

        <div style={{ marginTop:16, display:'flex', gap:8 }}>
          {(isAdmin) && <button onClick={handleApprove}>Approve</button>}
          {(isAdmin || isAuthor) && <button onClick={handleDelete} style={{ background:'#c62828', color:'#fff' }}>Delete</button>}
        </div>
      </div>
    </Layout>
  );
}

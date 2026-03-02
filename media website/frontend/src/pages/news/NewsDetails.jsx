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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItem = async () => {
    setLoading(true); setError('');
    try{
      const res = await api.getNewsById(id);
      if (res && res.data) setItem(res.data);
      else setItem(res);
      
      // Fetch comments
      const commRes = await api.getComments(id);
      if (commRes && commRes.data) setComments(commRes.data);
    }catch(err){ setError(err.message || 'Failed to load'); }
    finally{ setLoading(false); }
  };

  useEffect(()=>{ fetchItem(); },[id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentLoading(true);
    try {
      await api.createComment(id, newComment);
      setNewComment('');
      // Refresh comments
      const commRes = await api.getComments(id);
      if (commRes && commRes.data) setComments(commRes.data);
    } catch (err) {
      alert(err.message || 'Failed to post comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await api.deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      alert(err.message || 'Failed to delete comment');
    }
  };

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

        <div style={{ marginTop:32, borderTop:'1px solid #eee', paddingTop:16 }}>
          <h3>Comments ({comments.length})</h3>
          
          {user ? (
            <form onSubmit={handleCommentSubmit} style={{ marginBottom:24 }}>
              <textarea 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                style={{ width:'100%', padding:8, borderRadius:4, border:'1px solid #ccc', minHeight:80 }}
              />
              <button type="submit" disabled={commentLoading} style={{ marginTop:8 }}>
                {commentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <p>Please <a href="/login">login</a> to comment.</p>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {comments.length > 0 ? comments.map(c => (
              <div key={c._id} style={{ padding:12, background:'#f9f9f9', borderRadius:6 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ fontWeight:'bold', fontSize:14 }}>
                    {c.user?.firstName} {c.user?.lastName}
                  </div>
                  <div style={{ fontSize:12, color:'#999' }}>
                    {new Date(c.createdAt).toLocaleDateString()}
                    {(isAdmin || (user && c.user?._id === user._id)) && (
                      <button 
                        onClick={() => handleCommentDelete(c._id)}
                        style={{ marginLeft:8, background:'none', border:'none', color:'red', cursor:'pointer', padding:0 }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ marginTop:4, fontSize:15 }}>{c.content}</div>
              </div>
            )) : (
              <p style={{ color:'#999' }}>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

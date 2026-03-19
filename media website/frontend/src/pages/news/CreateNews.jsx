import { useState } from 'react';
import Layout from '../../components/Layout';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateNews(){
  const [form, setForm] = useState({ title:'', content:'', category:'', state:'', district:'' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFiles = e => setFiles(Array.from(e.target.files || []).slice(0,5));

  const handleSubmit = async (e) =>{
    e.preventDefault(); setLoading(true); setError(''); setSuccess('');
    try{
      const fd = new FormData();
      Object.entries(form).forEach(([k,v])=> fd.append(k,v));
      files.forEach(f=> fd.append('images', f));
      const res = await api.createNews(fd);
      setSuccess('News created successfully');
      setLoading(false);
      if(res && res.data && res.data._id) navigate(`/news/${res.data._id}`);
    }catch(err){ setLoading(false); setError(err.message || 'Submit failed'); }
  };

  return (
    <Layout>
      <div style={{ maxWidth:780, margin:'24px auto' }}>
        <h2>Create News</h2>
        {error && <div style={{ color:'red' }}>{error}</div>}
        {success && <div style={{ color:'green' }}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:8 }}>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom:8 }}>
            <label>Content (HTML allowed)</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={8} required />
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ flex:1 }}>
              <label>Category</label>
              <input name="category" value={form.category} onChange={handleChange} />
            </div>
            <div style={{ flex:1 }}>
              <label>State</label>
              <input name="state" value={form.state} onChange={handleChange} />
            </div>
            <div style={{ flex:1 }}>
              <label>District</label>
              <input name="district" value={form.district} onChange={handleChange} />
            </div>
          </div>

          <div style={{ marginTop:12 }}>
            <label>Images (max 5)</label>
            <input type="file" accept="image/*" multiple onChange={handleFiles} />
            <div style={{ display:'flex', gap:8, marginTop:8, flexWrap:'wrap' }}>
              {files.map((f,i)=> <div key={i} style={{ width:120,height:80,overflow:'hidden',borderRadius:6 }}><img src={URL.createObjectURL(f)} alt={f.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>)}
            </div>
          </div>

          <div style={{ marginTop:12 }}>
            <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

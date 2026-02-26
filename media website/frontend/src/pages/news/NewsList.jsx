import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { api } from '../../api/api';
import NewsCard from '../../components/news/NewsCard';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [stateFilter, setStateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchNews = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.getNews({ page, limit, state: stateFilter, category: categoryFilter, search });
      if (res && res.data) {
        setNews(res.data);
        setTotal(res.total || 0);
      } else if (Array.isArray(res)) {
        setNews(res);
      }
    } catch (err) {
      setError(err.message || 'Failed to load news');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchNews(); }, [page, stateFilter, categoryFilter, search]);

  return (
    <Layout>
      <div style={{ maxWidth:1100, margin:'24px auto' }}>
        <h2>News</h2>
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          <input placeholder="Search title" value={search} onChange={e=>setSearch(e.target.value)} />
          <input placeholder="State" value={stateFilter} onChange={e=>setStateFilter(e.target.value)} />
          <input placeholder="Category" value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} />
          <button onClick={() => { setPage(1); fetchNews(); }}>Filter</button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color:'red' }}>{error}</div>}

        <div style={{ display:'grid', gap:12 }}>
          {news.map(n => <NewsCard key={n._id} item={n} />)}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', marginTop:12 }}>
          <div>Showing {news.length} of {total}</div>
          <div>
            <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
            <button onClick={()=>setPage(p=>p+1)} style={{ marginLeft:8 }}>Next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

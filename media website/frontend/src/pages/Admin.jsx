import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

function StatCard({ num, label, icon, color }) {
  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', textAlign: 'center', borderTop: `4px solid ${color}` }}>
      <div style={{ fontSize: '28px', fontWeight: 800, color }}>{num}</div>
      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}><i className={icon}></i> {label}</div>
    </div>
  );
}

function MembersTab() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadMembers = () => {
    setLoading(true);
    api.getAdminMembers(filter, search)
      .then(res => setMembers(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadMembers(); }, [filter]);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      if (action === 'approve') await api.approveMember(id);
      else if (action === 'reject') await api.rejectMember(id, prompt('Rejection reason:') || '');
      else if (action === 'suspend') await api.suspendMember(id, prompt('Suspension reason:') || '');
      loadMembers();
    } catch (err) { alert(err.message); }
    setActionLoading(null);
  };

  const statusColors = { pending: '#ff8f00', approved: '#2e7d32', rejected: '#c62828', suspended: '#616161' };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'approved', 'rejected', 'suspended'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: filter === s ? 'var(--primary)' : 'var(--bg-light)', color: filter === s ? 'white' : 'var(--text-medium)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '8px 14px', border: '2px solid var(--border-color)', borderRadius: 'var(--radius)', fontSize: '13px' }} />
          <button onClick={loadMembers} style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer' }}><i className="fas fa-search"></i></button>
        </div>
      </div>
      {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--primary)', color: 'white' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Member</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Plan</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{m.firstName} {m.lastName}<br /><span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{m.city}, {m.state}</span></td>
                  <td style={{ padding: '10px 12px' }}>{m.email}</td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{m.membershipId}</td>
                  <td style={{ padding: '10px 12px' }}>{m.selectedPlanName || '-'}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, color: 'white', background: statusColors[m.membershipStatus] || '#888' }}>{m.membershipStatus || 'pending'}</span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      {m.membershipStatus !== 'approved' && <button onClick={() => handleAction(m.id, 'approve')} disabled={actionLoading === m.id} style={{ padding: '4px 10px', border: 'none', background: '#2e7d32', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}><i className="fas fa-check"></i></button>}
                      {m.membershipStatus !== 'rejected' && <button onClick={() => handleAction(m.id, 'reject')} disabled={actionLoading === m.id} style={{ padding: '4px 10px', border: 'none', background: '#c62828', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}><i className="fas fa-times"></i></button>}
                      {m.membershipStatus === 'approved' && <button onClick={() => handleAction(m.id, 'suspend')} disabled={actionLoading === m.id} style={{ padding: '4px 10px', border: 'none', background: '#616161', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}><i className="fas fa-ban"></i></button>}
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>No members found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ArticlesTab() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadArticles = () => {
    setLoading(true);
    api.getAdminArticles(filter, search)
      .then(res => setArticles(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadArticles(); }, [filter]);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      if (action === 'approve') await api.approveArticle(id);
      else if (action === 'reject') await api.rejectArticle(id, prompt('Rejection reason:') || '');
      else if (action === 'feature') await api.featureArticle(id);
      else if (action === 'trending') await api.trendingArticle(id);
      else if (action === 'delete') { if (window.confirm('Delete this article?')) await api.deleteArticleAdmin(id); }
      loadArticles();
    } catch (err) { alert(err.message); }
    setActionLoading(null);
  };

  const statusColors = { draft: '#616161', submitted: '#ff8f00', published: '#2e7d32', rejected: '#c62828' };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['all', 'submitted', 'published', 'draft', 'rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: filter === s ? 'var(--primary)' : 'var(--bg-light)', color: filter === s ? 'white' : 'var(--text-medium)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '8px 14px', border: '2px solid var(--border-color)', borderRadius: 'var(--radius)', fontSize: '13px' }} />
          <button onClick={loadArticles} style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer' }}><i className="fas fa-search"></i></button>
        </div>
      </div>
      {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {articles.map(a => (
            <div key={a.id} style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {a.image && <img src={a.image} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} alt="" />}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{a.title}</h4>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                  By {a.author} | {a.category} | {a.date} | <i className="fas fa-eye"></i> {a.views || 0} | <i className="fas fa-heart"></i> {a.likes || 0}
                </div>
                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ padding: '2px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, color: 'white', background: statusColors[a.status] || '#888' }}>{a.status || 'published'}</span>
                  {a.is_featured && <span style={{ padding: '2px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, color: 'white', background: 'var(--accent)' }}>Featured</span>}
                  {a.is_trending && <span style={{ padding: '2px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, color: 'white', background: '#7b1fa2' }}>Trending</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {a.status === 'submitted' && <button onClick={() => handleAction(a.id, 'approve')} disabled={actionLoading === a.id} style={{ padding: '6px 12px', border: 'none', background: '#2e7d32', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}><i className="fas fa-check"></i> Approve</button>}
                {a.status === 'submitted' && <button onClick={() => handleAction(a.id, 'reject')} disabled={actionLoading === a.id} style={{ padding: '6px 12px', border: 'none', background: '#c62828', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}><i className="fas fa-times"></i> Reject</button>}
                <button onClick={() => handleAction(a.id, 'feature')} disabled={actionLoading === a.id} style={{ padding: '6px 12px', border: 'none', background: a.is_featured ? 'var(--accent)' : 'var(--bg-light)', color: a.is_featured ? 'white' : 'var(--text-medium)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}><i className="fas fa-star"></i></button>
                <button onClick={() => handleAction(a.id, 'trending')} disabled={actionLoading === a.id} style={{ padding: '6px 12px', border: 'none', background: a.is_trending ? '#7b1fa2' : 'var(--bg-light)', color: a.is_trending ? 'white' : 'var(--text-medium)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}><i className="fas fa-fire"></i></button>
                <button onClick={() => handleAction(a.id, 'delete')} disabled={actionLoading === a.id} style={{ padding: '6px 12px', border: 'none', background: '#ffebee', color: '#c62828', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
          {articles.length === 0 && <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>No articles found</p>}
        </div>
      )}
    </div>
  );
}

function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminContacts()
      .then(res => setContacts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    try {
      await api.markContactRead(id);
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'read' } : c));
    } catch {}
  };

  return (
    <div>
      {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i></div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {contacts.map(c => (
            <div key={c.id} style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '16px', borderLeft: `4px solid ${c.status === 'new' ? 'var(--accent)' : 'var(--border-color)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '14px' }}>{c.subject}</h4>
                {c.status === 'new' && <button onClick={() => markRead(c.id)} style={{ padding: '4px 10px', border: 'none', background: 'var(--primary)', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Mark Read</button>}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '6px' }}>From: {c.name} ({c.email}) {c.phone && `| ${c.phone}`}</div>
              <p style={{ fontSize: '13px', color: 'var(--text-medium)' }}>{c.message}</p>
            </div>
          ))}
          {contacts.length === 0 && <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>No messages</p>}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    api.getAdminStats().then(res => setStats(res.data)).catch(() => {});
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
    { id: 'members', label: 'Members', icon: 'fas fa-users' },
    { id: 'articles', label: 'Articles', icon: 'fas fa-newspaper' },
    { id: 'contacts', label: 'Messages', icon: 'fas fa-envelope' },
  ];

  return (
    <Layout>
      <div className="page-header"><div className="container"><h1><i className="fas fa-shield-alt"></i> Admin Panel</h1><div className="breadcrumb"><a href="/">Home</a> / Admin</div></div></div>
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '10px 20px', borderRadius: 'var(--radius)', border: 'none', background: activeTab === t.id ? 'var(--primary)' : 'white', color: activeTab === t.id ? 'white' : 'var(--text-medium)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, boxShadow: 'var(--shadow)' }}><i className={t.icon}></i> {t.label}</button>
          ))}
          <button onClick={() => api.exportMembers().then(data => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'idma-members-export.json'; a.click(); }).catch(err => alert(err.message))} style={{ marginLeft: 'auto', padding: '10px 20px', borderRadius: 'var(--radius)', border: 'none', background: '#2e7d32', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, boxShadow: 'var(--shadow)' }}><i className="fas fa-download"></i> Export Members</button>
        </div>

        {activeTab === 'overview' && stats && (
          <div>
            <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}><i className="fas fa-users"></i> Members</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <StatCard num={stats.members.total} label="Total Members" icon="fas fa-users" color="var(--primary)" />
              <StatCard num={stats.members.pending} label="Pending" icon="fas fa-clock" color="#ff8f00" />
              <StatCard num={stats.members.approved} label="Approved" icon="fas fa-check-circle" color="#2e7d32" />
              <StatCard num={stats.members.suspended} label="Suspended" icon="fas fa-ban" color="#616161" />
            </div>
            <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}><i className="fas fa-newspaper"></i> Articles</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <StatCard num={stats.articles.total} label="Total Articles" icon="fas fa-newspaper" color="var(--primary)" />
              <StatCard num={stats.articles.pending} label="Pending Review" icon="fas fa-clock" color="#ff8f00" />
              <StatCard num={stats.articles.published} label="Published" icon="fas fa-check-circle" color="#2e7d32" />
              <StatCard num={stats.articles.featured} label="Featured" icon="fas fa-star" color="var(--accent)" />
            </div>
            <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}><i className="fas fa-rupee-sign"></i> Revenue</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <StatCard num={`₹${stats.revenue.total}`} label="Total Revenue" icon="fas fa-rupee-sign" color="#2e7d32" />
              <StatCard num={`₹${stats.revenue.monthly}`} label="This Month" icon="fas fa-calendar" color="var(--accent)" />
              <StatCard num={stats.revenue.transactions} label="Transactions" icon="fas fa-receipt" color="var(--primary)" />
            </div>
          </div>
        )}

        {activeTab === 'members' && <MembersTab />}
        {activeTab === 'articles' && <ArticlesTab />}
        {activeTab === 'contacts' && <ContactsTab />}
      </div>
    </Layout>
  );
}

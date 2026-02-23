// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';
// import { api } from '../api/api';

// export default function ArticleStatus() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     if (!user) { navigate('/login'); return; }
//     api.getMyArticles()
//       .then(res => setArticles(res.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [user, navigate]);

//   if (!user) return null;

//   const statusColors = { draft: '#616161', submitted: '#ff8f00', published: '#2e7d32', rejected: '#c62828', approved: '#2e7d32' };
//   const statusIcons = { draft: 'fas fa-pencil-alt', submitted: 'fas fa-clock', published: 'fas fa-check-circle', rejected: 'fas fa-times-circle', approved: 'fas fa-check' };

//   const filtered = filter === 'all' ? articles : articles.filter(a => a.status === filter);

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-tasks"></i> My Articles</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/dashboard">Dashboard</Link> / My Articles</div></div></div>
//       <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 15px', paddingBottom: '80px' }}>
//         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
//           {['all', 'draft', 'submitted', 'published', 'rejected'].map(s => (
//             <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: filter === s ? 'var(--primary)' : 'white', color: filter === s ? 'white' : 'var(--text-medium)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize', boxShadow: 'var(--shadow)' }}>
//               {s} {s !== 'all' && `(${articles.filter(a => a.status === s).length})`}
//             </button>
//           ))}
//           <Link to="/news-upload" style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: 'var(--radius)', background: 'var(--primary)', color: 'white', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: 'var(--shadow)' }}><i className="fas fa-plus"></i> New Article</Link>
//         </div>

//         {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Loading articles...</div> : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//             {filtered.map(a => (
//               <div key={a.id} style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: `4px solid ${statusColors[a.status] || '#888'}` }}>
//                 {a.image && <img src={a.image} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} alt="" />}
//                 <div style={{ flex: 1 }}>
//                   <h4 style={{ fontSize: '14px', marginBottom: '4px', color: 'var(--text-dark)' }}>{a.title}</h4>
//                   <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '6px' }}>
//                     {a.category} | {a.date} | <i className="fas fa-eye"></i> {a.views || 0} views | <i className="fas fa-heart"></i> {a.likes || 0} likes
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, color: 'white', background: statusColors[a.status] || '#888' }}>
//                       <i className={statusIcons[a.status] || 'fas fa-circle'}></i> {a.status || 'draft'}
//                     </span>
//                     {a.is_featured && <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, background: '#fff3e0', color: 'var(--accent)' }}><i className="fas fa-star"></i> Featured</span>}
//                     {a.is_trending && <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, background: '#f3e5f5', color: '#7b1fa2' }}><i className="fas fa-fire"></i> Trending</span>}
//                     {a.rejectionReason && <span style={{ fontSize: '11px', color: '#c62828' }}>Reason: {a.rejectionReason}</span>}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {filtered.length === 0 && (
//               <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
//                 <i className="fas fa-newspaper" style={{ fontSize: '40px', marginBottom: '12px', display: 'block' }}></i>
//                 <p>No articles found. <Link to="/news-upload" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create your first article</Link></p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }





import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

/* ── Global Styles ────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn        { from{opacity:0} to{opacity:1} }
    @keyframes spin          { to{transform:rotate(360deg)} }
    @keyframes pulseDot      { 0%,100%{opacity:1} 50%{opacity:.25} }
    @keyframes shimmer       { 0%{background-position:-400px 0} 100%{background-position:400px 0} }

    .as-anim-down  { animation:fadeSlideDown .7s ease both; }
    .as-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .as-anim-up-d1 { animation:fadeSlideUp   .7s .1s ease both; }
    .as-anim-fade  { animation:fadeIn .35s ease both; }
    .as-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .as-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .as-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .as-hdr-glow { position:absolute; border-radius:50%; pointer-events:none; }
    .as-header-inner {
      max-width:940px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .as-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .as-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .as-header-title em { font-style:italic; color:#c8972a; }
    .as-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .as-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .as-breadcrumb a:hover { color:#c8972a; }
    .as-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .as-body {
      background:#fafaf8;
      padding:32px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .as-container { max-width:940px; margin:0 auto; }

    /* ── Toolbar ── */
    .as-toolbar {
      display:flex; align-items:center;
      gap:8px; margin-bottom:22px;
      flex-wrap:wrap;
    }

    .as-filter-btn {
      padding:8px 16px; border-radius:20px;
      border:1.5px solid #dde2ea;
      background:#fff; cursor:pointer;
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; font-weight:600;
      text-transform:capitalize; color:#64748b;
      transition:background .18s, border-color .18s, color .18s;
    }
    .as-filter-btn:hover {
      border-color:#1e3a5f; color:#1e3a5f;
    }
    .as-filter-btn.active {
      background:#1e3a5f; color:#fff;
      border-color:#1e3a5f;
    }
    /* status-tinted active filters */
    .as-filter-btn.active.draft     { background:#475569; border-color:#475569; }
    .as-filter-btn.active.published,
    .as-filter-btn.active.approved  { background:#166534; border-color:#166534; }
    .as-filter-btn.active.submitted { background:#92600a; border-color:#92600a; }
    .as-filter-btn.active.rejected  { background:#c62828; border-color:#c62828; }

    .as-new-btn {
      margin-left:auto;
      display:inline-flex; align-items:center; gap:8px;
      padding:9px 18px; border-radius:6px;
      background:#1e3a5f; color:#fff;
      font-family:'DM Sans',sans-serif;
      font-size:13px; font-weight:600;
      text-decoration:none; letter-spacing:.3px;
      position:relative; overflow:hidden;
      transition:background .22s;
    }
    .as-new-btn::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.2) 100%);
      opacity:0; transition:opacity .3s;
    }
    .as-new-btn:hover::after { opacity:1; }
    .as-new-btn:hover { background:#162d4a; }
    .as-new-btn i { color:#c8972a; }

    /* ── Stats strip ── */
    .as-stats-strip {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
      gap:12px; margin-bottom:22px;
    }
    .as-stat-pill {
      background:#fff;
      border:1px solid #dde2ea; border-radius:8px;
      padding:14px 16px;
      display:flex; align-items:center; gap:12px;
      box-shadow:0 1px 4px rgba(15,31,51,.04);
    }
    .as-stat-dot {
      width:10px; height:10px; border-radius:50%; flex-shrink:0;
    }
    .as-stat-count {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700; color:#0f1f33; line-height:1;
    }
    .as-stat-lbl {
      font-size:11px; font-weight:600;
      text-transform:uppercase; letter-spacing:1px;
      color:#94a3b8; margin-top:2px;
    }

    /* ── Article card ── */
    .as-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:8px;
      box-shadow:0 1px 6px rgba(15,31,51,.04);
      display:flex; gap:0; overflow:hidden;
      border-left-width:4px;
      transition:transform .22s, box-shadow .22s;
      margin-bottom:12px;
    }
    .as-card:hover {
      transform:translateY(-2px);
      box-shadow:0 6px 22px rgba(15,31,51,.08);
    }

    .as-card-thumb {
      width:96px; height:80px;
      object-fit:cover; flex-shrink:0;
      align-self:stretch;
    }
    .as-card-no-thumb {
      width:96px; flex-shrink:0;
      background:#f1f5f9;
      display:flex; align-items:center; justify-content:center;
      color:#dde2ea; font-size:22px;
    }

    .as-card-body {
      flex:1; padding:14px 18px;
      display:flex; flex-direction:column; gap:6px;
      min-width:0;
    }
    .as-card-title {
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; font-weight:600;
      color:#0f1f33; line-height:1.4;
      margin:0;
      display:-webkit-box; -webkit-line-clamp:2;
      -webkit-box-orient:vertical; overflow:hidden;
    }
    .as-card-meta {
      font-size:12px; color:#94a3b8;
      display:flex; align-items:center; gap:10px;
      flex-wrap:wrap;
    }
    .as-card-meta span { display:flex; align-items:center; gap:4px; }
    .as-card-meta i   { font-size:10px; color:#c8972a; }

    .as-card-tags {
      display:flex; align-items:center; gap:7px; flex-wrap:wrap;
    }

    /* status pill */
    .as-status-pill {
      display:inline-flex; align-items:center; gap:5px;
      padding:3px 11px; border-radius:20px;
      font-size:11px; font-weight:700;
      letter-spacing:.5px; text-transform:capitalize;
    }
    .as-status-pill i { font-size:9px; }

    .st-draft     { background:#f1f5f9; color:#475569; }
    .st-submitted { background:rgba(200,151,42,.1); color:#92600a; }
    .st-published,
    .st-approved  { background:rgba(34,197,94,.1); color:#166534; }
    .st-rejected  { background:rgba(198,40,40,.08); color:#c62828; }

    /* extra tags */
    .as-tag {
      display:inline-flex; align-items:center; gap:4px;
      padding:2px 9px; border-radius:20px;
      font-size:10.5px; font-weight:600;
    }
    .as-tag.featured  { background:rgba(200,151,42,.1); color:#92600a; }
    .as-tag.trending  { background:rgba(123,31,162,.08); color:#7b1fa2; }

    .as-rejection-note {
      font-size:11.5px; color:#c62828;
      display:flex; align-items:flex-start; gap:5px;
      padding:6px 10px; background:rgba(198,40,40,.05);
      border-radius:5px; border-left:3px solid #c62828;
      margin-top:2px;
    }

    /* ── Empty state ── */
    .as-empty {
      text-align:center; padding:60px 20px;
      background:#fff; border:1px solid #dde2ea;
      border-radius:10px;
    }
    .as-empty-icon {
      width:64px; height:64px; border-radius:14px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-size:26px; color:#c8972a;
      margin:0 auto 18px;
    }
    .as-empty h3 {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700; color:#0f1f33; margin-bottom:6px;
    }
    .as-empty p { font-size:14px; color:#94a3b8; margin-bottom:18px; }
    .as-empty-link {
      display:inline-flex; align-items:center; gap:8px;
      padding:12px 24px; border-radius:6px;
      background:#1e3a5f; color:#fff; text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:14px; font-weight:600;
      transition:background .22s;
    }
    .as-empty-link:hover { background:#162d4a; }
    .as-empty-link i { color:#c8972a; }

    /* ── Loading shimmer ── */
    .as-shimmer-card {
      background:#fff; border-radius:8px;
      border:1px solid #dde2ea; padding:18px;
      margin-bottom:12px; display:flex; gap:14px;
    }
    .as-shimmer-thumb {
      width:96px; height:72px; border-radius:6px; flex-shrink:0;
      background:linear-gradient(90deg,#f0f3f6 25%,#e4e8ed 50%,#f0f3f6 75%);
      background-size:400px 100%;
      animation:shimmer 1.4s ease infinite;
    }
    .as-shimmer-line {
      height:13px; border-radius:4px; margin-bottom:9px;
      background:linear-gradient(90deg,#f0f3f6 25%,#e4e8ed 50%,#f0f3f6 75%);
      background-size:400px 100%;
      animation:shimmer 1.4s ease infinite;
    }

    /* border-left color per status */
    .bl-draft     { border-left-color:#94a3b8; }
    .bl-submitted { border-left-color:#c8972a; }
    .bl-published,
    .bl-approved  { border-left-color:#22c55e; }
    .bl-rejected  { border-left-color:#c62828; }
    .bl-default   { border-left-color:#dde2ea; }
  `}</style>
);

/* ── Status config ─────────────────────────────────────────── */
const STATUS = {
  draft:     { pill:'st-draft',     border:'bl-draft',     icon:'fas fa-pencil-alt',    dot:'#94a3b8' },
  submitted: { pill:'st-submitted', border:'bl-submitted', icon:'fas fa-clock',          dot:'#c8972a' },
  published: { pill:'st-published', border:'bl-published', icon:'fas fa-check-circle',   dot:'#22c55e' },
  approved:  { pill:'st-approved',  border:'bl-approved',  icon:'fas fa-check',          dot:'#22c55e' },
  rejected:  { pill:'st-rejected',  border:'bl-rejected',  icon:'fas fa-times-circle',   dot:'#c62828' },
};

const statuses = ['all','draft','submitted','published','rejected'];

export default function ArticleStatus() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.getMyArticles()
      .then(res => setArticles(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  const filtered = filter === 'all' ? articles : articles.filter(a => a.status === filter);
  const countOf  = s => articles.filter(a => a.status === s).length;

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="as-page-header as-anim-down">
        <div className="as-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="as-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="as-header-inner">
          <div className="as-header-eyebrow">
            <span className="as-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Member Portal
          </div>
          <h1 className="as-header-title">My <em>Articles</em></h1>
          <nav className="as-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/dashboard">Dashboard</Link>
            <span>/</span>
            My Articles
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="as-body">
        <div className="as-container">

          {/* Stats strip */}
          {!loading && articles.length > 0 && (
            <div className="as-stats-strip as-anim-up">
              {['draft','submitted','published','rejected'].map(s => (
                <div className="as-stat-pill" key={s}>
                  <div className="as-stat-dot" style={{ background: STATUS[s]?.dot }} />
                  <div>
                    <div className="as-stat-count">{countOf(s)}</div>
                    <div className="as-stat-lbl">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Toolbar */}
          <div className="as-toolbar as-anim-up-d1">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`as-filter-btn ${s} ${filter === s ? 'active' : ''}`}
              >
                {s} {s !== 'all' && `(${countOf(s)})`}
              </button>
            ))}
            <Link to="/news-upload" className="as-new-btn">
              <i className="fas fa-plus" /> New Article
            </Link>
          </div>

          {/* Content */}
          {loading ? (
            [1,2,3].map(i => (
              <div className="as-shimmer-card" key={i}>
                <div className="as-shimmer-thumb" />
                <div style={{ flex:1 }}>
                  <div className="as-shimmer-line" style={{ width:'80%' }} />
                  <div className="as-shimmer-line" style={{ width:'55%' }} />
                  <div className="as-shimmer-line" style={{ width:'35%', marginBottom:0 }} />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="as-empty as-anim-fade">
              <div className="as-empty-icon"><i className="fas fa-newspaper" /></div>
              <h3>No articles {filter !== 'all' ? `with status "${filter}"` : 'yet'}</h3>
              <p>Start writing to share your voice with the media community.</p>
              <Link to="/news-upload" className="as-empty-link">
                <i className="fas fa-pen-fancy" /> Write Your First Article
              </Link>
            </div>
          ) : (
            <div className="as-anim-fade">
              {filtered.map(a => {
                const sc = STATUS[a.status] || STATUS.draft;
                return (
                  <div
                    key={a.id}
                    className={`as-card ${sc.border || 'bl-default'}`}
                  >
                    {a.image
                      ? <img src={a.image} className="as-card-thumb" alt="" onError={e => { e.target.style.display = 'none'; }} />
                      : <div className="as-card-no-thumb"><i className="fas fa-image" /></div>
                    }

                    <div className="as-card-body">
                      <h4 className="as-card-title">{a.title}</h4>

                      <div className="as-card-meta">
                        {a.category && <span><i className="fas fa-tag" /> {a.category}</span>}
                        {a.date     && <span><i className="fas fa-calendar-alt" /> {a.date}</span>}
                        <span><i className="fas fa-eye" /> {a.views || 0}</span>
                        <span><i className="fas fa-heart" /> {a.likes || 0}</span>
                      </div>

                      <div className="as-card-tags">
                        <span className={`as-status-pill ${sc.pill}`}>
                          <i className={sc.icon} /> {a.status || 'draft'}
                        </span>
                        {a.is_featured && (
                          <span className="as-tag featured">
                            <i className="fas fa-star" /> Featured
                          </span>
                        )}
                        {a.is_trending && (
                          <span className="as-tag trending">
                            <i className="fas fa-fire" /> Trending
                          </span>
                        )}
                      </div>

                      {a.rejectionReason && (
                        <div className="as-rejection-note">
                          <i className="fas fa-exclamation-circle" style={{ marginTop:'1px', flexShrink:0 }} />
                          <span><strong>Reason:</strong> {a.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
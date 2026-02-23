// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';
// import Carousel from '../components/Carousel';
// import NewsCard from '../components/NewsCard';
// import Sidebar from '../components/Sidebar';
// import { api } from '../api/api';

// function TrendingSection({ articles }) {
//   if (!articles || articles.length === 0) return null;
//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 15px 0' }}>
//       <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//         <i className="fas fa-fire" style={{ color: 'var(--secondary)' }}></i> Trending Now
//       </h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
//         {articles.slice(0, 4).map(a => (
//           <div key={a.id} style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', overflow: 'hidden', transition: 'transform 0.3s' }}>
//             {a.image && <img src={a.image} style={{ width: '100%', height: '130px', objectFit: 'cover' }} alt="" onError={e => { e.target.style.display = 'none'; }} />}
//             <div style={{ padding: '12px' }}>
//               <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.title}</div>
//               <div style={{ fontSize: '11px', color: 'var(--text-light)' }}><i className="fas fa-user"></i> {a.author} | <i className="fas fa-eye"></i> {a.views || 0}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function CategoryBlocks() {
//   const categories = [
//     { name: 'Politics', icon: 'fas fa-landmark', color: '#1a237e' },
//     { name: 'Technology', icon: 'fas fa-microchip', color: '#00796b' },
//     { name: 'Business', icon: 'fas fa-chart-line', color: '#e65100' },
//     { name: 'Local News', icon: 'fas fa-map-marker-alt', color: '#c62828' },
//     { name: 'Media', icon: 'fas fa-tv', color: '#7b1fa2' },
//     { name: 'Sports', icon: 'fas fa-futbol', color: '#2e7d32' },
//   ];

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 15px' }}>
//       <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//         <i className="fas fa-th-large"></i> Browse by Category
//       </h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
//         {categories.map(c => (
//           <Link to={`/`} key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', borderLeft: `4px solid ${c.color}`, transition: 'transform 0.3s' }}>
//             <i className={c.icon} style={{ fontSize: '20px', color: c.color }}></i>
//             <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)' }}>{c.name}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// function JoinCTA() {
//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 15px' }}>
//       <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 'var(--radius)', padding: '30px', textAlign: 'center', color: 'white', boxShadow: 'var(--shadow)' }}>
//         <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Join IDMA - India's Digital Media Network</h3>
//         <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '16px' }}>Get your verified Digital ID, publish articles, and connect with media professionals across India.</p>
//         <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
//           <Link to="/membership-plans" style={{ padding: '12px 28px', background: 'var(--accent)', color: 'white', borderRadius: '25px', fontWeight: 600, fontSize: '14px' }}><i className="fas fa-rocket"></i> View Plans</Link>
//           <Link to="/register" style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '25px', fontWeight: 600, fontSize: '14px', border: '2px solid rgba(255,255,255,0.4)' }}><i className="fas fa-user-plus"></i> Register Free</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const [news, setNews] = useState([]);
//   const [trending, setTrending] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([
//       api.getNews().then(res => setNews(res.data || [])).catch(() => {}),
//       api.getNewsTrending().then(res => setTrending(res.data || [])).catch(() => {}),
//     ]).finally(() => setLoading(false));
//   }, []);

//   return (
//     <Layout showSubNav showStateTabs>
//       <Carousel />
//       <TrendingSection articles={trending} />
//       <div className="main-content">
//         <div className="news-feed">
//           <Link to="/login" className="write-post-box">
//             <div className="avatar">
//               <img src="https://aimamedia.org/img/noimage.jpg" alt="User" onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=U&background=e0e0e0&color=888'; }} />
//             </div>
//             <div className="input-placeholder">अपने विचार लिखें....</div>
//           </Link>
//           {loading && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}><i className="fas fa-spinner fa-spin"></i> Loading news...</div>}
//           {news.map(post => <NewsCard key={post.id} post={post} />)}
//         </div>
//         <Sidebar />
//       </div>
//       <CategoryBlocks />
//       <JoinCTA />
//     </Layout>
//   );
// }



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { api } from '../api/api';

/* ── Global Styles ────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    .font-playfair { font-family: 'Playfair Display', serif; }
    .font-dm       { font-family: 'DM Sans', sans-serif; }

    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeSlideDown {
      from { opacity:0; transform:translateY(-18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes spin    { to{transform:rotate(360deg)} }
    @keyframes pulseDot{ 0%,100%{opacity:1} 50%{opacity:.25} }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }

    .anim-down  { animation: fadeSlideDown .7s ease both; }
    .anim-up    { animation: fadeSlideUp   .7s ease both; }
    .anim-up-d1 { animation: fadeSlideUp   .7s .1s  ease both; }
    .anim-up-d2 { animation: fadeSlideUp   .7s .2s  ease both; }
    .anim-up-d3 { animation: fadeSlideUp   .7s .3s  ease both; }
    .anim-fade  { animation: fadeIn        .4s  ease both; }

    .pulse-dot  { animation: pulseDot 2s ease-in-out infinite; }

    .h-spinner {
      width:20px; height:20px;
      border:2px solid rgba(30,58,95,.15);
      border-top-color:#1e3a5f;
      border-radius:50%;
      animation:spin .7s linear infinite;
      display:inline-block; vertical-align:middle;
      margin-right:8px;
    }

    .grid-texture {
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }

    /* ── Section wrapper ── */
    .h-section {
      max-width:1200px;
      margin:0 auto;
      padding:28px 20px;
    }

    /* ── Section heading ── */
    .h-section-head {
      display:flex; align-items:center; gap:12px;
      margin-bottom:20px;
    }
    .h-section-label {
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a;
    }
    .h-section-title {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700;
      color:#0f1f33; line-height:1.1;
      margin:0;
    }
    .h-section-title em { font-style:italic; color:#c8972a; }
    .h-section-divider {
      flex:1; height:1px;
      background:linear-gradient(to right, #dde2ea, transparent);
    }

    /* ─────────────────────────────────────────
       TRENDING SECTION
    ───────────────────────────────────────── */
    .trending-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
      gap:16px;
    }

    .trending-card {
      background:#fff;
      border-radius:8px;
      overflow:hidden;
      border:1px solid #dde2ea;
      box-shadow:0 2px 10px rgba(15,31,51,.05);
      transition:transform .25s, box-shadow .25s;
      cursor:pointer;
    }
    .trending-card:hover {
      transform:translateY(-4px);
      box-shadow:0 8px 28px rgba(15,31,51,.10);
    }
    .trending-card img {
      width:100%; height:136px; object-fit:cover;
      display:block;
    }
    .trending-card-body { padding:14px; }
    .trending-rank {
      display:inline-flex; align-items:center; justify-content:center;
      width:22px; height:22px; border-radius:4px;
      background:#1e3a5f; color:#fff;
      font-family:'DM Sans',sans-serif;
      font-size:11px; font-weight:700;
      margin-bottom:8px;
    }
    .trending-card-title {
      font-family:'DM Sans',sans-serif;
      font-size:13.5px; font-weight:600;
      color:#0f1f33; line-height:1.45;
      margin-bottom:8px;
      display:-webkit-box; -webkit-line-clamp:2;
      -webkit-box-orient:vertical; overflow:hidden;
    }
    .trending-meta {
      font-family:'DM Sans',sans-serif;
      font-size:11.5px; color:#94a3b8;
      display:flex; align-items:center; gap:10px;
    }
    .trending-meta span { display:flex; align-items:center; gap:4px; }

    /* fire badge */
    .fire-badge {
      display:inline-flex; align-items:center; gap:6px;
      padding:3px 10px; border-radius:20px;
      background:rgba(200,151,42,.1);
      border:1px solid rgba(200,151,42,.25);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#c8972a; margin-bottom:6px;
    }

    /* ─────────────────────────────────────────
       WRITE POST BOX
    ───────────────────────────────────────── */
    .write-post-box {
      display:flex; align-items:center; gap:14px;
      background:#fff;
      border:1.5px solid #dde2ea;
      border-radius:8px;
      padding:16px 20px;
      margin-bottom:20px;
      cursor:pointer;
      text-decoration:none;
      transition:border-color .2s, box-shadow .2s;
    }
    .write-post-box:hover {
      border-color:#1e3a5f;
      box-shadow:0 0 0 3px rgba(30,58,95,.07);
    }
    .write-post-avatar {
      width:42px; height:42px; border-radius:50%;
      overflow:hidden; flex-shrink:0;
      border:2px solid #dde2ea;
    }
    .write-post-avatar img { width:100%; height:100%; object-fit:cover; }
    .write-post-placeholder {
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; color:#b0bac6;
      flex:1;
    }
    .write-post-btn {
      padding:8px 18px;
      background:#1e3a5f; color:#fff;
      border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:13px; font-weight:600;
      letter-spacing:.3px; flex-shrink:0;
      transition:background .2s;
    }
    .write-post-box:hover .write-post-btn { background:#162d4a; }

    /* ─────────────────────────────────────────
       MAIN LAYOUT
    ───────────────────────────────────────── */
    .h-main-layout {
      max-width:1200px; margin:0 auto;
      padding:0 20px 28px;
      display:grid;
      grid-template-columns:1fr 320px;
      gap:24px;
      align-items:start;
    }
    @media(max-width:900px){
      .h-main-layout { grid-template-columns:1fr; }
    }

    .h-news-feed { min-width:0; }

    /* loading shimmer */
    .shimmer-card {
      background:#fff; border-radius:8px;
      border:1px solid #dde2ea; padding:20px;
      margin-bottom:16px;
    }
    .shimmer-line {
      height:14px; border-radius:4px; margin-bottom:10px;
      background:linear-gradient(90deg,#f0f3f6 25%,#e4e8ed 50%,#f0f3f6 75%);
      background-size:400px 100%;
      animation:shimmer 1.4s ease infinite;
    }
    .shimmer-img {
      height:180px; border-radius:6px; margin-bottom:12px;
      background:linear-gradient(90deg,#f0f3f6 25%,#e4e8ed 50%,#f0f3f6 75%);
      background-size:400px 100%;
      animation:shimmer 1.4s ease infinite;
    }

    /* ─────────────────────────────────────────
       CATEGORY BLOCKS
    ───────────────────────────────────────── */
    .cat-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
      gap:12px;
    }
    .cat-card {
      display:flex; align-items:center; gap:12px;
      padding:16px; background:#fff;
      border-radius:8px;
      border:1px solid #dde2ea;
      border-left-width:4px;
      box-shadow:0 1px 6px rgba(15,31,51,.04);
      text-decoration:none;
      transition:transform .22s, box-shadow .22s;
    }
    .cat-card:hover {
      transform:translateY(-3px);
      box-shadow:0 6px 20px rgba(15,31,51,.09);
    }
    .cat-icon {
      width:38px; height:38px; border-radius:8px;
      display:flex; align-items:center; justify-content:center;
      font-size:16px; flex-shrink:0;
    }
    .cat-name {
      font-family:'DM Sans',sans-serif;
      font-size:13.5px; font-weight:600;
      color:#0f1f33;
    }

    /* ─────────────────────────────────────────
       JOIN CTA
    ───────────────────────────────────────── */
    .cta-box {
      background:#1e3a5f;
      border-radius:10px;
      padding:48px 40px;
      text-align:center;
      position:relative;
      overflow:hidden;
    }
    .cta-box::before {
      content:'';
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
      pointer-events:none;
    }
    .cta-glow {
      position:absolute; border-radius:50%;
      pointer-events:none;
    }
    .cta-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:4px 14px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:16px;
      position:relative; z-index:1;
    }
    .cta-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(26px,4vw,38px);
      font-weight:900; color:#fff;
      line-height:1.15; margin:0 0 10px;
      position:relative; z-index:1;
    }
    .cta-title em { font-style:italic; color:#c8972a; }
    .cta-desc {
      font-family:'DM Sans',sans-serif;
      font-size:15px; color:rgba(255,255,255,.6);
      max-width:520px; margin:0 auto 28px;
      line-height:1.65;
      position:relative; z-index:1;
    }
    .cta-actions {
      display:flex; gap:14px;
      justify-content:center; flex-wrap:wrap;
      position:relative; z-index:1;
    }
    .cta-btn-primary {
      display:inline-flex; align-items:center; gap:8px;
      padding:14px 32px;
      background:#c8972a; color:#fff;
      border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:15px; font-weight:600;
      letter-spacing:.3px; text-decoration:none;
      transition:background .22s, transform .12s;
      position:relative; overflow:hidden;
    }
    .cta-btn-primary::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 40%,rgba(255,255,255,.15) 100%);
      opacity:0; transition:opacity .3s;
    }
    .cta-btn-primary:hover::after { opacity:1; }
    .cta-btn-primary:hover { background:#b5841f; }
    .cta-btn-primary:active { transform:scale(.985); }

    .cta-btn-ghost {
      display:inline-flex; align-items:center; gap:8px;
      padding:14px 32px;
      background:rgba(255,255,255,.08);
      border:1.5px solid rgba(255,255,255,.25);
      color:#fff; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:15px; font-weight:600;
      letter-spacing:.3px; text-decoration:none;
      transition:background .22s, border-color .22s;
    }
    .cta-btn-ghost:hover {
      background:rgba(255,255,255,.14);
      border-color:rgba(255,255,255,.4);
    }

    /* ── CTA stats strip ── */
    .cta-stats {
      display:flex; justify-content:center; gap:40px;
      margin-top:36px; padding-top:28px;
      border-top:1px solid rgba(255,255,255,.08);
      position:relative; z-index:1;
      flex-wrap:wrap;
    }
    .cta-stat-num {
      font-family:'Playfair Display',serif;
      font-size:28px; font-weight:700;
      color:#c8972a; line-height:1;
    }
    .cta-stat-lbl {
      font-family:'DM Sans',sans-serif;
      font-size:10px; letter-spacing:2px;
      text-transform:uppercase;
      color:rgba(255,255,255,.35);
      margin-top:5px;
    }
  `}</style>
);

/* ── Tiny SVG icons ───────────────────────────────────────── */
const Ic = {
  Fire:    ()=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-5-5-9-5-9z"/><path d="M12 12c0 0-2 1.5-2 3a2 2 0 0 0 4 0c0-1.5-2-3-2-3z"/></svg>,
  Grid:    ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Rocket:  ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  User:    ()=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Eye:     ()=><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Pencil:  ()=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  News:    ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>,
};

/* ─────────────────────────────────────────
   TRENDING SECTION
───────────────────────────────────────── */
function TrendingSection({ articles }) {
  if (!articles || articles.length === 0) return null;
  return (
    <div className="h-section anim-up">
      <div className="h-section-head">
        <span className="fire-badge">
          <span className="pulse-dot" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
          Hot
        </span>
        <h2 className="h-section-title">Trending <em>Now</em></h2>
        <div className="h-section-divider" />
      </div>

      <div className="trending-grid">
        {articles.slice(0, 4).map((a, i) => (
          <div className="trending-card" key={a.id}>
            {a.image && (
              <img src={a.image} alt=""
                onError={e => { e.target.style.display = 'none'; }} />
            )}
            <div className="trending-card-body">
              <div className="trending-rank">#{i + 1}</div>
              <div className="trending-card-title">{a.title}</div>
              <div className="trending-meta">
                <span><Ic.User /> {a.author}</span>
                <span><Ic.Eye /> {a.views || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CATEGORY BLOCKS
───────────────────────────────────────── */
const categories = [
  { name: 'Politics',   icon: 'fas fa-landmark',       color: '#1a237e', bg: 'rgba(26,35,126,.08)' },
  { name: 'Technology', icon: 'fas fa-microchip',       color: '#00796b', bg: 'rgba(0,121,107,.08)' },
  { name: 'Business',   icon: 'fas fa-chart-line',      color: '#e65100', bg: 'rgba(230,81,0,.08)'  },
  { name: 'Local News', icon: 'fas fa-map-marker-alt',  color: '#c62828', bg: 'rgba(198,40,40,.08)' },
  { name: 'Media',      icon: 'fas fa-tv',              color: '#7b1fa2', bg: 'rgba(123,31,162,.08)'},
  { name: 'Sports',     icon: 'fas fa-futbol',          color: '#2e7d32', bg: 'rgba(46,125,50,.08)' },
];

function CategoryBlocks() {
  return (
    <div className="h-section anim-up-d1">
      <div className="h-section-head">
        <span className="h-section-label">Explore</span>
        <h2 className="h-section-title">Browse by <em>Category</em></h2>
        <div className="h-section-divider" />
      </div>
      <div className="cat-grid">
        {categories.map(c => (
          <Link to="/" key={c.name} className="cat-card"
            style={{ borderLeftColor: c.color }}>
            <div className="cat-icon" style={{ background: c.bg, color: c.color }}>
              <i className={c.icon} />
            </div>
            <span className="cat-name">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   JOIN CTA
───────────────────────────────────────── */
function JoinCTA() {
  return (
    <div className="h-section anim-up-d2">
      <div className="cta-box">
        {/* glows */}
        <div className="cta-glow" style={{
          width:'320px', height:'320px',
          top:'-80px', left:'-80px',
          background:'radial-gradient(circle,rgba(200,151,42,.14) 0%,transparent 70%)',
        }} />
        <div className="cta-glow" style={{
          width:'240px', height:'240px',
          bottom:'-60px', right:'-60px',
          background:'radial-gradient(circle,rgba(200,151,42,.09) 0%,transparent 70%)',
        }} />
        {/* right edge gold line */}
        <div style={{
          position:'absolute', top:0, right:0,
          width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />

        <div>
          <div className="cta-eyebrow">
            <span className="pulse-dot" style={{
              width:'7px', height:'7px', borderRadius:'50%',
              background:'#c8972a', display:'inline-block',
            }} />
            Member Portal
          </div>
        </div>

        <h2 className="cta-title">
          Join <em>AIMA</em> — India's Media Network
        </h2>
        <p className="cta-desc">
          Get your verified Digital ID, publish articles, and connect with media professionals across India.
        </p>

        <div className="cta-actions">
          <Link to="/membership-plans" className="cta-btn-primary">
            <Ic.Rocket /> View Plans
          </Link>
          <Link to="/register" className="cta-btn-ghost">
            <Ic.User /> Register Free
          </Link>
        </div>

        <div className="cta-stats">
          {[['50K+','Members'],['28','States'],['12+','Years']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div className="cta-stat-num">{n}</div>
              <div className="cta-stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LOADING SHIMMER
───────────────────────────────────────── */
function LoadingShimmer() {
  return (
    <>
      {[1,2,3].map(i => (
        <div className="shimmer-card" key={i}>
          <div className="shimmer-img" />
          <div className="shimmer-line" style={{ width:'80%' }} />
          <div className="shimmer-line" style={{ width:'60%' }} />
          <div className="shimmer-line" style={{ width:'40%', marginBottom:0 }} />
        </div>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function Home() {
  const [news, setNews]         = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      api.getNews().then(res => setNews(res.data || [])).catch(() => {}),
      api.getNewsTrending().then(res => setTrending(res.data || [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <Layout showSubNav showStateTabs>
      <GlobalStyles />

      {/* Carousel */}
      <div className="anim-down"><Carousel /></div>

      {/* Trending */}
      <TrendingSection articles={trending} />

      {/* Main feed + sidebar */}
      <div className="h-main-layout anim-up">
        <div className="h-news-feed">

          {/* Write post prompt */}
          <Link to="/login" className="write-post-box">
            <div className="write-post-avatar">
              <img
                src="https://aimamedia.org/img/noimage.jpg"
                alt="User"
                onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=U&background=dde2ea&color=1e3a5f'; }}
              />
            </div>
            <div className="write-post-placeholder">अपने विचार लिखें....</div>
            <div className="write-post-btn">
              <Ic.Pencil />&nbsp; Write
            </div>
          </Link>

          {/* Feed */}
          {loading
            ? <LoadingShimmer />
            : news.map(post => <NewsCard key={post.id} post={post} />)
          }
        </div>

        <Sidebar />
      </div>

      {/* Categories */}
      <CategoryBlocks />

      {/* CTA */}
      <JoinCTA />
    </Layout>
  );
}
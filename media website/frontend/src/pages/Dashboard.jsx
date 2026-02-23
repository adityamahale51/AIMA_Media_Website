// import { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';

// export default function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
//   if (!user) return null;

//   const cards = [
//     { title: 'List', desc: 'View your members & readers', icon: 'fas fa-list', bg: 'bg-primary', links: [{ to: '#', icon: 'fas fa-users', label: 'My Members' }, { to: '#', icon: 'fas fa-book-reader', label: 'My News Readers' }] },
//     { title: 'Create', desc: 'Post news & add members', icon: 'fas fa-plus-circle', bg: 'bg-secondary', links: [{ to: '/news-upload', icon: 'fas fa-pen-fancy', label: 'Create Post' }, { to: '#', icon: 'fas fa-user-plus', label: 'Add Member' }, { to: '#', icon: 'fas fa-user-friends', label: 'Add News Reader' }] },
//     { title: 'My Articles', desc: 'Track article status', icon: 'fas fa-newspaper', bg: 'bg-accent', links: [{ to: '/my-articles', icon: 'fas fa-tasks', label: 'Track Article Status' }, { to: '/news-upload', icon: 'fas fa-pen-fancy', label: 'Submit New Article' }] },
//     { title: 'Downloads', desc: 'ID Card & Certificates', icon: 'fas fa-download', bg: 'bg-green', links: [{ to: '/digital-id', icon: 'fas fa-id-card', label: 'Digital ID Card' }, { to: '#', icon: 'fas fa-certificate', label: 'Membership Certificate' }, { to: '#', icon: 'fas fa-award', label: 'Course Certificate' }] },
//     { title: 'Profile', desc: 'Manage your account', icon: 'fas fa-user-circle', bg: 'bg-purple', links: [{ to: '/profile', icon: 'fas fa-user', label: 'View Profile' }, { to: '/edit-profile', icon: 'fas fa-edit', label: 'Edit Profile' }, { to: '#', icon: 'fas fa-chart-line', label: 'Profile Status' }] },
//     { title: 'Membership', desc: 'Plans & Invoices', icon: 'fas fa-crown', bg: 'bg-teal', links: [{ to: '/membership-plans', icon: 'fas fa-tags', label: 'View Plans' }, { to: '/membership-plans', icon: 'fas fa-sync', label: 'Renew Membership' }, { to: '/membership-plans', icon: 'fas fa-arrow-up', label: 'Upgrade Plan' }, { to: '/invoices', icon: 'fas fa-file-invoice', label: 'Invoice History' }] },
//   ];

//   // Show membership status banner
//   const showStatusBanner = user.membershipStatus && user.membershipStatus !== 'approved';

//   return (
//     <Layout>
//       <div className="dashboard-welcome">
//         <h2>Welcome, {user.firstName} {user.lastName}!</h2>
//         <p>AIMA Media Dashboard — Manage your news, members, and profile</p>
//         {user.selectedPlanName && <p style={{ marginTop: '6px', fontSize: '12px', opacity: 0.8 }}><i className="fas fa-crown"></i> {user.selectedPlanName} Member | ID: {user.membershipId}</p>}
//       </div>

//       {showStatusBanner && (
//         <div style={{ maxWidth: '1200px', margin: '16px auto', padding: '0 15px' }}>
//           <div style={{ background: user.membershipStatus === 'pending' ? '#fff3e0' : '#ffebee', padding: '14px 20px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `4px solid ${user.membershipStatus === 'pending' ? '#ff8f00' : '#c62828'}` }}>
//             <i className={`fas fa-${user.membershipStatus === 'pending' ? 'clock' : 'exclamation-circle'}`} style={{ fontSize: '20px', color: user.membershipStatus === 'pending' ? '#ff8f00' : '#c62828' }}></i>
//             <div>
//               <strong style={{ fontSize: '14px', color: user.membershipStatus === 'pending' ? '#e65100' : '#c62828' }}>
//                 {user.membershipStatus === 'pending' ? 'Membership Pending Approval' : user.membershipStatus === 'rejected' ? 'Membership Rejected' : 'Membership Suspended'}
//               </strong>
//               <p style={{ fontSize: '12px', color: 'var(--text-medium)', marginTop: '2px' }}>
//                 {user.membershipStatus === 'pending' ? 'Your membership is under review. You will be notified once approved.' : 'Please contact support for more information.'}
//               </p>
//             </div>
//             {user.membershipStatus === 'pending' && !user.selectedPlan && (
//               <Link to="/membership-plans" style={{ marginLeft: 'auto', padding: '8px 16px', background: '#ff8f00', color: 'white', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}><i className="fas fa-tags"></i> Select Plan</Link>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="dash-stats">
//         {[
//           { num: user.postsCount || 0, label: 'My News Posts', icon: 'fas fa-newspaper' },
//           { num: user.membersCount || 0, label: 'My Members', icon: 'fas fa-users' },
//           { num: user.viewsCount || 0, label: 'Total Views', icon: 'fas fa-eye' },
//           { num: user.readersCount || 0, label: 'News Readers', icon: 'fas fa-book-reader' },
//         ].map((s, i) => (
//           <div className="stat-card" key={i}><div className="stat-number">{s.num}</div><div className="stat-label"><i className={s.icon}></i> {s.label}</div></div>
//         ))}
//       </div>
//       <div className="dashboard-grid">
//         {cards.map((card, i) => (
//           <div className="dash-card" key={i}>
//             <div className="dash-card-header">
//               <div className={`icon ${card.bg}`}><i className={card.icon}></i></div>
//               <div className="text"><h4>{card.title}</h4><p>{card.desc}</p></div>
//             </div>
//             <div className="dash-card-body"><ul>{card.links.map((l, j) => <li key={j}><Link to={l.to}><i className={l.icon}></i> {l.label}</Link></li>)}</ul></div>
//           </div>
//         ))}
//       </div>

//       {user.role === 'admin' && (
//         <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}>
//           <Link to="/admin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', color: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', fontSize: '16px', fontWeight: 600 }}>
//             <i className="fas fa-shield-alt"></i> Open Admin Panel
//           </Link>
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

/* ── Global Styles ────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn        { from{opacity:0} to{opacity:1} }
    @keyframes spin          { to{transform:rotate(360deg)} }
    @keyframes pulseDot      { 0%,100%{opacity:1} 50%{opacity:.25} }

    .db-anim-down  { animation:fadeSlideDown .7s ease both; }
    .db-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .db-anim-up-d1 { animation:fadeSlideUp   .7s .08s ease both; }
    .db-anim-up-d2 { animation:fadeSlideUp   .7s .16s ease both; }
    .db-anim-up-d3 { animation:fadeSlideUp   .7s .24s ease both; }
    .db-anim-fade  { animation:fadeIn        .4s  ease both; }
    .db-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    .db-grid-texture {
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }

    /* ── Welcome banner ── */
    .db-welcome {
      background:#1e3a5f;
      padding:44px 0 36px;
      position:relative; overflow:hidden;
    }
    .db-welcome::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .db-welcome-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .db-welcome-inner {
      max-width:1200px; margin:0 auto;
      padding:0 24px;
      position:relative; z-index:1;
      display:flex; align-items:center; gap:22px;
      flex-wrap:wrap;
    }
    .db-avatar {
      width:66px; height:66px; border-radius:50%;
      border:2.5px solid rgba(200,151,42,.5);
      overflow:hidden; flex-shrink:0;
      background:#162d4a;
    }
    .db-avatar img { width:100%; height:100%; object-fit:cover; }

    .db-welcome-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:8px;
    }
    .db-welcome-name {
      font-family:'Playfair Display',serif;
      font-size:clamp(26px,3.5vw,38px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 6px;
    }
    .db-welcome-name em { font-style:italic; color:#c8972a; }
    .db-welcome-sub {
      font-family:'DM Sans',sans-serif;
      font-size:14px; color:rgba(255,255,255,.55);
      margin:0;
    }
    .db-plan-pill {
      display:inline-flex; align-items:center; gap:6px;
      margin-top:8px; padding:4px 12px;
      background:rgba(200,151,42,.12);
      border:1px solid rgba(200,151,42,.25);
      border-radius:20px;
      font-family:'DM Sans',sans-serif;
      font-size:11.5px; font-weight:600;
      color:#e8c97a;
    }

    /* ── Page body ── */
    .db-body {
      background:#fafaf8;
      min-height:60vh;
      padding:28px 24px 48px;
    }
    .db-container { max-width:1200px; margin:0 auto; }

    /* ── Status banner ── */
    .db-status-banner {
      display:flex; align-items:center; gap:14px;
      padding:16px 20px; border-radius:8px;
      border-left:4px solid; margin-bottom:24px;
      font-family:'DM Sans',sans-serif;
    }
    .db-status-icon {
      width:40px; height:40px; border-radius:8px;
      display:flex; align-items:center; justify-content:center;
      font-size:16px; flex-shrink:0;
    }
    .db-status-title {
      font-size:14px; font-weight:700; margin:0 0 3px;
    }
    .db-status-desc {
      font-size:12.5px; color:#64748b; margin:0;
    }
    .db-status-btn {
      margin-left:auto; padding:9px 18px;
      border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; font-weight:600;
      color:#fff; text-decoration:none;
      white-space:nowrap; flex-shrink:0;
      transition:opacity .2s;
    }
    .db-status-btn:hover { opacity:.88; }

    /* ── Stat cards ── */
    .db-stats-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:16px; margin-bottom:28px;
    }
    .db-stat-card {
      background:#fff;
      border:1px solid #dde2ea;
      border-radius:8px; padding:22px 20px;
      display:flex; align-items:center; gap:16px;
      box-shadow:0 1px 6px rgba(15,31,51,.04);
      transition:transform .22s, box-shadow .22s;
    }
    .db-stat-card:hover {
      transform:translateY(-3px);
      box-shadow:0 6px 20px rgba(15,31,51,.08);
    }
    .db-stat-icon-wrap {
      width:48px; height:48px; border-radius:10px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-size:18px; color:#c8972a; flex-shrink:0;
    }
    .db-stat-num {
      font-family:'Playfair Display',serif;
      font-size:30px; font-weight:700;
      color:#0f1f33; line-height:1;
    }
    .db-stat-label {
      font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:600;
      letter-spacing:.5px; text-transform:uppercase;
      color:#94a3b8; margin-top:4px;
    }

    /* ── Section heading ── */
    .db-section-head {
      display:flex; align-items:center; gap:12px;
      margin-bottom:18px;
    }
    .db-section-eyebrow {
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a;
    }
    .db-section-title {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700;
      color:#0f1f33; margin:0;
    }
    .db-section-title em { font-style:italic; color:#c8972a; }
    .db-section-divider {
      flex:1; height:1px;
      background:linear-gradient(to right,#dde2ea,transparent);
    }

    /* ── Dashboard cards grid ── */
    .db-cards-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
      gap:18px;
    }
    .db-card {
      background:#fff;
      border:1px solid #dde2ea;
      border-radius:8px;
      overflow:hidden;
      box-shadow:0 1px 6px rgba(15,31,51,.04);
      transition:transform .22s, box-shadow .22s;
    }
    .db-card:hover {
      transform:translateY(-3px);
      box-shadow:0 8px 28px rgba(15,31,51,.09);
    }

    .db-card-header {
      display:flex; align-items:center; gap:16px;
      padding:18px 20px;
      border-bottom:1px solid #f1f5f9;
      background:#fafbfc;
    }
    .db-card-icon {
      width:46px; height:46px; border-radius:10px;
      display:flex; align-items:center; justify-content:center;
      font-size:18px; flex-shrink:0;
    }
    /* icon color variants */
    .dbi-navy   { background:#1e3a5f; color:#c8972a; }
    .dbi-gold   { background:rgba(200,151,42,.12); color:#c8972a; border:1px solid rgba(200,151,42,.25); }
    .dbi-teal   { background:rgba(0,121,107,.1); color:#00796b; }
    .dbi-red    { background:rgba(198,40,40,.08); color:#c62828; }
    .dbi-purple { background:rgba(123,31,162,.08); color:#7b1fa2; }
    .dbi-green  { background:rgba(46,125,50,.08); color:#2e7d32; }

    .db-card-title {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700;
      color:#0f1f33; margin:0 0 2px;
    }
    .db-card-desc {
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; color:#94a3b8; margin:0;
    }

    .db-card-body { padding:10px 0; }
    .db-card-body ul { list-style:none; margin:0; padding:0; }
    .db-card-body li a {
      display:flex; align-items:center; gap:12px;
      padding:11px 20px;
      font-family:'DM Sans',sans-serif;
      font-size:14px; font-weight:500;
      color:#374151; text-decoration:none;
      transition:background .15s, color .15s, padding-left .15s;
      border-left:3px solid transparent;
    }
    .db-card-body li a:hover {
      background:#f8fafc;
      color:#1e3a5f;
      padding-left:24px;
      border-left-color:#c8972a;
    }
    .db-card-body li a i {
      width:16px; text-align:center;
      font-size:13px; color:#94a3b8;
      transition:color .15s;
      flex-shrink:0;
    }
    .db-card-body li a:hover i { color:#c8972a; }

    /* ── Admin panel link ── */
    .db-admin-link {
      display:flex; align-items:center; justify-content:center; gap:12px;
      padding:18px 28px; margin-top:28px;
      background:#1e3a5f; color:#fff;
      border-radius:8px; text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:15px; font-weight:600;
      letter-spacing:.3px;
      position:relative; overflow:hidden;
      box-shadow:0 4px 16px rgba(30,58,95,.25);
      transition:background .22s, transform .12s;
    }
    .db-admin-link::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .db-admin-link:hover::after { opacity:1; }
    .db-admin-link:hover { background:#162d4a; }
    .db-admin-link:active { transform:scale(.985); }
    .db-admin-link i { color:#c8972a; }
  `}</style>
);

/* ── Icon color class map ─────────────────────────────────── */
const iconVariants = ['dbi-navy','dbi-gold','dbi-teal','dbi-red','dbi-purple','dbi-green'];

const cards = [
  {
    title:'List', desc:'View your members & readers',
    icon:'fas fa-list',
    links:[
      { to:'#',            icon:'fas fa-users',       label:'My Members' },
      { to:'#',            icon:'fas fa-book-reader',  label:'My News Readers' },
    ],
  },
  {
    title:'Create', desc:'Post news & add members',
    icon:'fas fa-plus-circle',
    links:[
      { to:'/news-upload', icon:'fas fa-pen-fancy',    label:'Create Post' },
      { to:'#',            icon:'fas fa-user-plus',    label:'Add Member' },
      { to:'#',            icon:'fas fa-user-friends', label:'Add News Reader' },
    ],
  },
  {
    title:'My Articles', desc:'Track article status',
    icon:'fas fa-newspaper',
    links:[
      { to:'/my-articles', icon:'fas fa-tasks',        label:'Track Article Status' },
      { to:'/news-upload', icon:'fas fa-pen-fancy',    label:'Submit New Article' },
    ],
  },
  {
    title:'Downloads', desc:'ID Card & Certificates',
    icon:'fas fa-download',
    links:[
      { to:'/digital-id',  icon:'fas fa-id-card',      label:'Digital ID Card' },
      { to:'#',            icon:'fas fa-certificate',  label:'Membership Certificate' },
      { to:'#',            icon:'fas fa-award',        label:'Course Certificate' },
    ],
  },
  {
    title:'Profile', desc:'Manage your account',
    icon:'fas fa-user-circle',
    links:[
      { to:'/profile',     icon:'fas fa-user',         label:'View Profile' },
      { to:'/edit-profile',icon:'fas fa-edit',         label:'Edit Profile' },
      { to:'#',            icon:'fas fa-chart-line',   label:'Profile Status' },
    ],
  },
  {
    title:'Membership', desc:'Plans & Invoices',
    icon:'fas fa-crown',
    links:[
      { to:'/membership-plans', icon:'fas fa-tags',         label:'View Plans' },
      { to:'/membership-plans', icon:'fas fa-sync',         label:'Renew Membership' },
      { to:'/membership-plans', icon:'fas fa-arrow-up',     label:'Upgrade Plan' },
      { to:'/invoices',         icon:'fas fa-file-invoice', label:'Invoice History' },
    ],
  },
];

const statDefs = [
  { key:'postsCount',   label:'News Posts',    icon:'fas fa-newspaper' },
  { key:'membersCount', label:'My Members',    icon:'fas fa-users'     },
  { key:'viewsCount',   label:'Total Views',   icon:'fas fa-eye'       },
  { key:'readersCount', label:'News Readers',  icon:'fas fa-book-reader'},
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
  if (!user) return null;

  const showStatusBanner = user.membershipStatus && user.membershipStatus !== 'approved';

  const bannerConfig = {
    pending:   { bg:'#fff8ed', border:'#c8972a', iconBg:'rgba(200,151,42,.12)', iconColor:'#c8972a', faIcon:'fas fa-clock',              titleColor:'#92600a', title:'Membership Pending Approval',  desc:'Your membership is under review. You will be notified once approved.' },
    rejected:  { bg:'#fff1f1', border:'#c62828', iconBg:'rgba(198,40,40,.08)', iconColor:'#c62828', faIcon:'fas fa-exclamation-circle',   titleColor:'#c62828', title:'Membership Rejected',           desc:'Please contact support for more information.' },
    suspended: { bg:'#fff1f1', border:'#c62828', iconBg:'rgba(198,40,40,.08)', iconColor:'#c62828', faIcon:'fas fa-ban',                  titleColor:'#c62828', title:'Membership Suspended',          desc:'Please contact support for more information.' },
  };
  const bConf = bannerConfig[user.membershipStatus] || bannerConfig.suspended;

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Welcome Banner ───────────────────────────────── */}
      <div className="db-welcome db-anim-down">
        {/* glows */}
        <div className="db-welcome-glow" style={{
          width:'320px', height:'320px', top:'-80px', left:'-80px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="db-welcome-glow" style={{
          width:'200px', height:'200px', bottom:'-50px', right:'-50px',
          background:'radial-gradient(circle,rgba(200,151,42,.08) 0%,transparent 70%)',
        }} />
        {/* right edge gold line */}
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />

        <div className="db-welcome-inner">
          <div className="db-avatar">
            <img
              src={user.profilePhoto || 'https://aimamedia.org/img/noimage.jpg'}
              alt={user.firstName}
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=162d4a&color=c8972a`; }}
            />
          </div>

          <div>
            <div className="db-welcome-eyebrow">
              <span className="db-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
              Member Dashboard
            </div>
            <h2 className="db-welcome-name">
              Welcome, <em>{user.firstName} {user.lastName}</em>!
            </h2>
            <p className="db-welcome-sub">AIMA Media — Manage your news, members, and profile</p>
            {user.selectedPlanName && (
              <div className="db-plan-pill">
                <i className="fas fa-crown" />
                {user.selectedPlanName} Member &nbsp;·&nbsp; ID: {user.membershipId}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="db-body">
        <div className="db-container">

          {/* Status Banner */}
          {showStatusBanner && (
            <div className="db-status-banner db-anim-fade"
              style={{ background: bConf.bg, borderColor: bConf.border }}>
              <div className="db-status-icon" style={{ background: bConf.iconBg, color: bConf.iconColor }}>
                <i className={bConf.faIcon} />
              </div>
              <div>
                <p className="db-status-title" style={{ color: bConf.titleColor }}>{bConf.title}</p>
                <p className="db-status-desc">{bConf.desc}</p>
              </div>
              {user.membershipStatus === 'pending' && !user.selectedPlan && (
                <Link to="/membership-plans" className="db-status-btn"
                  style={{ background: '#c8972a' }}>
                  <i className="fas fa-tags" /> Select Plan
                </Link>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="db-stats-grid db-anim-up">
            {statDefs.map(({ key, label, icon }, i) => (
              <div className="db-stat-card" key={i}>
                <div className="db-stat-icon-wrap">
                  <i className={icon} />
                </div>
                <div>
                  <div className="db-stat-num">{user[key] || 0}</div>
                  <div className="db-stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Section heading */}
          <div className="db-section-head db-anim-up-d1">
            <span className="db-section-eyebrow">Quick Access</span>
            <h3 className="db-section-title">Your <em>Dashboard</em></h3>
            <div className="db-section-divider" />
          </div>

          {/* Cards */}
          <div className="db-cards-grid db-anim-up-d2">
            {cards.map((card, i) => (
              <div className="db-card" key={i}>
                <div className="db-card-header">
                  <div className={`db-card-icon ${iconVariants[i % iconVariants.length]}`}>
                    <i className={card.icon} />
                  </div>
                  <div>
                    <h4 className="db-card-title">{card.title}</h4>
                    <p className="db-card-desc">{card.desc}</p>
                  </div>
                </div>
                <div className="db-card-body">
                  <ul>
                    {card.links.map((l, j) => (
                      <li key={j}>
                        <Link to={l.to}>
                          <i className={l.icon} />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Admin link */}
          {user.role === 'admin' && (
            <Link to="/admin" className="db-admin-link db-anim-up-d3">
              <i className="fas fa-shield-alt" />
              Open Admin Panel
            </Link>
          )}

        </div>
      </div>
    </Layout>
  );
}
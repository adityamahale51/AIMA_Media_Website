// import { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';

// export default function Profile() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
//   if (!user) return null;

//   const fullName = `${user.firstName} ${user.lastName}`;

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-user"></i> My Profile</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/dashboard">Dashboard</Link> / Profile</div></div></div>
//       <div className="profile-container" style={{ paddingBottom: '80px' }}>
//         <div className="profile-header-card">
//           <div className="profile-cover"></div>
//           <div className="profile-info">
//             <div className="avatar"><img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=1a237e&color=fff&size=200`} alt="Profile" /></div>
//             <div className="details">
//               <h2>{fullName}</h2>
//               <p><i className="fas fa-map-marker-alt"></i> {user.city || ''}, {user.state || ''}</p>
//               <p style={{ marginTop: '4px' }}><span style={{ background: 'var(--primary)', color: 'white', padding: '2px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>AIMAMEDIA Member</span></p>
//             </div>
//             <div style={{ marginLeft: 'auto' }}><Link to="/edit-profile" className="btn btn-outline btn-sm"><i className="fas fa-edit"></i> Edit Profile</Link></div>
//           </div>
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
//           {[{ num: user.postsCount || 0, label: 'Posts', color: 'var(--primary)' }, { num: user.membersCount || 0, label: 'Members', color: 'var(--secondary)' }, { num: user.viewsCount || 0, label: 'Views', color: 'var(--accent)' }, { num: 89, label: 'Likes', color: '#2e7d32' }].map((s, i) => (
//             <div key={i} style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
//               <div style={{ fontSize: '24px', fontWeight: 800, color: s.color }}>{s.num}</div>
//               <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//         <div className="profile-body">
//           <h3><i className="fas fa-info-circle"></i> Personal Information</h3>
//           {[{ label: 'Full Name', value: fullName }, { label: 'Email', value: user.email }, { label: 'Mobile', value: user.mobile }, { label: 'State', value: user.state }, { label: 'City', value: user.city }, { label: 'Organization', value: user.organization }, { label: 'Designation', value: user.designation }, { label: 'Membership ID', value: user.membershipId }, { label: 'Plan', value: user.selectedPlanName || 'None' }, { label: 'Status', value: user.membershipStatus || 'pending' }, { label: 'LinkedIn', value: user.linkedin || '-' }, { label: 'Website', value: user.website || '-' }, { label: 'Skills', value: user.skills || '-' }, { label: 'Member Since', value: user.joinedDate }].map((d, i) => (
//             <div className="profile-detail" key={i}><div className="label">{d.label}</div><div className="value">{d.value || '-'}</div></div>
//           ))}
//         </div>
//         <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
//           <Link to="/edit-profile" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}><i className="fas fa-edit"></i> Edit Profile</Link>
//           <Link to="/digital-id" className="btn btn-accent" style={{ flex: 1, textAlign: 'center' }}><i className="fas fa-id-card"></i> Digital ID Card</Link>
//           <Link to="/membership-plans" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}><i className="fas fa-crown"></i> {user.selectedPlan ? 'Upgrade Plan' : 'Select Plan'}</Link>
//         </div>
//       </div>
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
    @keyframes pulseDot      { 0%,100%{opacity:1} 50%{opacity:.25} }

    .pf-anim-down  { animation:fadeSlideDown .7s ease both; }
    .pf-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .pf-anim-up-d1 { animation:fadeSlideUp   .7s .1s ease both; }
    .pf-anim-up-d2 { animation:fadeSlideUp   .7s .2s ease both; }
    .pf-anim-up-d3 { animation:fadeSlideUp   .7s .3s ease both; }
    .pf-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .pf-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .pf-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .pf-hdr-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .pf-header-inner {
      max-width:1100px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .pf-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .pf-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .pf-header-title em { font-style:italic; color:#c8972a; }
    .pf-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .pf-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .pf-breadcrumb a:hover { color:#c8972a; }
    .pf-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .pf-body {
      background:#fafaf8;
      padding:32px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .pf-container { max-width:1100px; margin:0 auto; }

    /* ── Hero card ── */
    .pf-hero-card {
      background:#fff;
      border:1px solid #dde2ea;
      border-radius:10px;
      overflow:hidden;
      box-shadow:0 2px 16px rgba(15,31,51,.06);
      margin-bottom:20px;
    }

    /* cover strip */
    .pf-cover {
      height:130px;
      background:#1e3a5f;
      position:relative; overflow:hidden;
    }
    .pf-cover::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }
    .pf-cover-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    /* gold accent line at bottom of cover */
    .pf-cover::after {
      content:''; position:absolute; bottom:0; left:0; right:0;
      height:3px;
      background:linear-gradient(to right,transparent,#c8972a 30%,#e8c97a 60%,transparent);
    }

    /* profile identity row */
    .pf-identity {
      display:flex; align-items:flex-end; gap:20px;
      padding:0 28px 24px;
      margin-top:-46px; position:relative; z-index:1;
      flex-wrap:wrap;
    }
    .pf-avatar-wrap {
      width:92px; height:92px; border-radius:50%;
      border:4px solid #fff;
      box-shadow:0 0 0 3px rgba(200,151,42,.4);
      overflow:hidden; flex-shrink:0;
      background:#162d4a;
    }
    .pf-avatar-wrap img { width:100%; height:100%; object-fit:cover; }

    .pf-identity-info { flex:1; padding-top:52px; min-width:160px; }
    .pf-name {
      font-family:'Playfair Display',serif;
      font-size:26px; font-weight:700;
      color:#0f1f33; margin:0 0 4px; line-height:1.1;
    }
    .pf-location {
      font-size:13.5px; color:#94a3b8;
      display:flex; align-items:center; gap:6px; margin-bottom:8px;
    }
    .pf-member-badge {
      display:inline-flex; align-items:center; gap:6px;
      padding:3px 12px; border-radius:20px;
      background:rgba(200,151,42,.1);
      border:1px solid rgba(200,151,42,.25);
      font-size:10.5px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#c8972a;
    }

    .pf-edit-btn {
      margin-left:auto; align-self:flex-end; padding-bottom:24px;
    }
    .pf-btn-outline {
      display:inline-flex; align-items:center; gap:8px;
      padding:10px 20px;
      background:#fff; color:#1e3a5f;
      border:1.5px solid #dde2ea; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:13.5px; font-weight:600;
      text-decoration:none; letter-spacing:.3px;
      transition:border-color .2s, background .2s, box-shadow .2s;
    }
    .pf-btn-outline:hover {
      border-color:#1e3a5f;
      background:#f8fafc;
      box-shadow:0 0 0 3px rgba(30,58,95,.08);
    }
    .pf-btn-outline i { color:#c8972a; }

    /* ── Stats row ── */
    .pf-stats-grid {
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:14px; margin-bottom:20px;
    }
    @media(max-width:640px){ .pf-stats-grid { grid-template-columns:repeat(2,1fr); } }

    .pf-stat-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:8px;
      padding:20px 14px; text-align:center;
      box-shadow:0 1px 6px rgba(15,31,51,.04);
      transition:transform .22s, box-shadow .22s;
    }
    .pf-stat-card:hover {
      transform:translateY(-3px);
      box-shadow:0 6px 20px rgba(15,31,51,.08);
    }
    .pf-stat-num {
      font-family:'Playfair Display',serif;
      font-size:28px; font-weight:700;
      color:#1e3a5f; line-height:1;
    }
    /* nth-child accent on numbers */
    .pf-stat-card:nth-child(2) .pf-stat-num { color:#c8972a; }
    .pf-stat-card:nth-child(3) .pf-stat-num { color:#00796b; }
    .pf-stat-card:nth-child(4) .pf-stat-num { color:#c62828; }

    .pf-stat-label {
      font-size:11px; font-weight:600;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#94a3b8; margin-top:6px;
    }

    /* ── Main body grid ── */
    .pf-main-grid {
      display:grid;
      grid-template-columns:1fr 300px;
      gap:20px; align-items:start;
    }
    @media(max-width:820px){ .pf-main-grid { grid-template-columns:1fr; } }

    /* ── Info card (left) ── */
    .pf-info-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:10px;
      box-shadow:0 1px 8px rgba(15,31,51,.04);
      overflow:hidden;
    }
    .pf-info-header {
      display:flex; align-items:center; gap:14px;
      padding:18px 22px;
      border-bottom:1px solid #f1f5f9;
      background:#fafbfc;
    }
    .pf-info-icon {
      width:38px; height:38px; border-radius:8px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-size:14px; color:#c8972a; flex-shrink:0;
    }
    .pf-info-title {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700; color:#0f1f33; margin:0;
    }
    .pf-info-title em { font-style:italic; color:#c8972a; }

    .pf-detail-row {
      display:flex; align-items:flex-start;
      padding:13px 22px;
      border-bottom:1px solid #f8fafc;
      transition:background .15s;
    }
    .pf-detail-row:last-child { border-bottom:none; }
    .pf-detail-row:hover { background:#fafbfc; }

    .pf-detail-label {
      font-size:11.5px; font-weight:600;
      letter-spacing:.5px; text-transform:uppercase;
      color:#94a3b8; width:140px; flex-shrink:0; padding-top:1px;
    }
    .pf-detail-value {
      font-size:14px; color:#0f1f33; flex:1; word-break:break-word;
    }

    /* status badge inside table */
    .pf-status-badge {
      display:inline-flex; align-items:center; gap:5px;
      padding:2px 10px; border-radius:20px;
      font-size:11px; font-weight:700;
      letter-spacing:1px; text-transform:uppercase;
    }
    .pf-status-badge.approved  { background:rgba(34,197,94,.1);  color:#166534; }
    .pf-status-badge.pending   { background:rgba(200,151,42,.1); color:#92600a; }
    .pf-status-badge.rejected  { background:rgba(198,40,40,.08); color:#c62828; }
    .pf-status-badge.suspended { background:rgba(198,40,40,.08); color:#c62828; }

    /* ── Side panel (right) ── */
    .pf-side-card {
      background:#1e3a5f;
      border-radius:10px; padding:24px 20px;
      position:relative; overflow:hidden;
    }
    .pf-side-card::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .pf-side-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .pf-side-label {
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a; margin-bottom:16px;
      display:flex; align-items:center; gap:8px;
      position:relative; z-index:1;
    }
    .pf-side-label::after {
      content:''; flex:1; height:1px;
      background:rgba(200,151,42,.3);
    }
    .pf-quick-link {
      display:flex; align-items:center; gap:12px;
      padding:12px 14px; border-radius:7px;
      text-decoration:none; margin-bottom:6px;
      background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.06);
      font-family:'DM Sans',sans-serif;
      font-size:13.5px; font-weight:500;
      color:rgba(255,255,255,.7);
      position:relative; z-index:1;
      transition:background .18s, color .18s, border-color .18s;
    }
    .pf-quick-link:last-child { margin-bottom:0; }
    .pf-quick-link:hover {
      background:rgba(255,255,255,.09);
      color:#fff; border-color:rgba(200,151,42,.3);
    }
    .pf-quick-link i {
      width:32px; height:32px; border-radius:7px;
      background:rgba(200,151,42,.12);
      border:1px solid rgba(200,151,42,.2);
      display:flex; align-items:center; justify-content:center;
      font-size:13px; color:#c8972a; flex-shrink:0;
    }

    /* membership info strip */
    .pf-plan-strip {
      margin-top:18px; padding-top:18px;
      border-top:1px solid rgba(255,255,255,.07);
      position:relative; z-index:1;
    }
    .pf-plan-strip-label {
      font-size:9.5px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:rgba(255,255,255,.3); margin-bottom:10px;
    }
    .pf-plan-name {
      font-family:'Playfair Display',serif;
      font-size:18px; font-weight:700; color:#c8972a;
    }
    .pf-plan-id {
      font-family:'DM Sans',sans-serif;
      font-size:12px; color:rgba(255,255,255,.4);
      margin-top:3px;
    }

    /* ── Bottom action bar ── */
    .pf-action-bar {
      display:flex; gap:12px; margin-top:20px;
      flex-wrap:wrap;
    }
    .pf-btn-primary {
      flex:1; min-width:140px;
      display:inline-flex; align-items:center; justify-content:center; gap:9px;
      padding:14px 20px;
      background:#1e3a5f; color:#fff;
      border-radius:6px; text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; font-weight:600; letter-spacing:.3px;
      position:relative; overflow:hidden;
      transition:background .22s, transform .12s;
    }
    .pf-btn-primary::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .pf-btn-primary:hover::after { opacity:1; }
    .pf-btn-primary:hover { background:#162d4a; }
    .pf-btn-primary:active { transform:scale(.985); }

    .pf-btn-gold {
      flex:1; min-width:140px;
      display:inline-flex; align-items:center; justify-content:center; gap:9px;
      padding:14px 20px;
      background:#c8972a; color:#fff;
      border-radius:6px; text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; font-weight:600; letter-spacing:.3px;
      transition:background .22s, transform .12s;
    }
    .pf-btn-gold:hover { background:#b5841f; }
    .pf-btn-gold:active { transform:scale(.985); }

    .pf-btn-ghost {
      flex:1; min-width:140px;
      display:inline-flex; align-items:center; justify-content:center; gap:9px;
      padding:14px 20px;
      background:#fff; color:#1e3a5f;
      border:1.5px solid #dde2ea; border-radius:6px;
      text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; font-weight:600; letter-spacing:.3px;
      transition:border-color .2s, background .2s;
    }
    .pf-btn-ghost:hover { border-color:#1e3a5f; background:#f8fafc; }
  `}</style>
);

const detailFields = (user, fullName) => [
  { label:'Full Name',      value:fullName },
  { label:'Email',          value:user.email },
  { label:'Mobile',         value:user.mobile },
  { label:'State',          value:user.state },
  { label:'District',       value:user.district },
  { label:'Organization',   value:user.organization },
  { label:'Designation',    value:user.designation },
  { label:'Membership ID',  value:user.membershipId },
  { label:'Plan',           value:user.selectedPlanName || 'None' },
  { label:'Status',         value:user.membershipStatus || 'pending', isStatus:true },
  { label:'LinkedIn',       value:user.linkedin || '-' },
  { label:'Website',        value:user.website || '-' },
  { label:'Skills',         value:user.skills || '-' },
  { label:'Member Since',   value:user.joinedDate },
];

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const fields   = detailFields(user, fullName);

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="pf-page-header pf-anim-down">
        <div className="pf-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="pf-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="pf-header-inner">
          <div className="pf-header-eyebrow">
            <span className="pf-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Member Portal
          </div>
          <h1 className="pf-header-title">My <em>Profile</em></h1>
          <nav className="pf-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/dashboard">Dashboard</Link>
            <span>/</span>
            Profile
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="pf-body">
        <div className="pf-container">

          {/* Hero card */}
          <div className="pf-hero-card pf-anim-up">
            {/* Cover strip */}
            <div className="pf-cover">
              <div className="pf-cover-glow" style={{
                width:'280px', height:'280px', top:'-100px', left:'-60px',
                background:'radial-gradient(circle,rgba(200,151,42,.16) 0%,transparent 70%)',
              }} />
            </div>

            {/* Identity row */}
            <div className="pf-identity">
              <div className="pf-avatar-wrap">
                <img
                  src={user.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=162d4a&color=c8972a&size=200`}
                  alt="Profile"
                  onError={e => { e.target.src = 'https://aimamedia.org/img/noimage.jpg'; }}
                />
              </div>
              <div className="pf-identity-info">
                <h2 className="pf-name">{fullName}</h2>
                {(user.district || user.state) && (
                  <p className="pf-location">
                    <i className="fas fa-map-marker-alt" style={{ color:'#c8972a', fontSize:'12px' }} />
                    {[user.district, user.state].filter(Boolean).join(', ')}
                  </p>
                )}
                <span className="pf-member-badge">
                  <i className="fas fa-crown" style={{ fontSize:'9px' }} />
                  AIMA Media Member
                </span>
              </div>
              <div className="pf-edit-btn">
                <Link to="/edit-profile" className="pf-btn-outline">
                  <i className="fas fa-edit" /> Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="pf-stats-grid pf-anim-up-d1">
            {[
              { num: user.postsCount   || 0, label:'Posts'   },
              { num: user.membersCount || 0, label:'Members' },
              { num: user.viewsCount   || 0, label:'Views'   },
              { num: 89,                     label:'Likes'   },
            ].map((s, i) => (
              <div className="pf-stat-card" key={i}>
                <div className="pf-stat-num">{s.num}</div>
                <div className="pf-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Main 2-col grid */}
          <div className="pf-main-grid pf-anim-up-d2">

            {/* Left — info table */}
            <div className="pf-info-card">
              <div className="pf-info-header">
                <div className="pf-info-icon"><i className="fas fa-info-circle" /></div>
                <h3 className="pf-info-title">Personal <em>Information</em></h3>
              </div>

              {fields.map((d, i) => (
                <div className="pf-detail-row" key={i}>
                  <span className="pf-detail-label">{d.label}</span>
                  {d.isStatus
                    ? <span className={`pf-status-badge ${d.value}`}>
                        <i className={`fas fa-${d.value === 'approved' ? 'check' : d.value === 'pending' ? 'clock' : 'ban'}`} style={{ fontSize:'9px' }} />
                        {d.value}
                      </span>
                    : <span className="pf-detail-value">{d.value || '—'}</span>
                  }
                </div>
              ))}
            </div>

            {/* Right — side panel */}
            <div className="pf-side-card pf-anim-up-d3">
              <div className="pf-side-glow" style={{
                width:'200px', height:'200px', top:'-50px', left:'-50px',
                background:'radial-gradient(circle,rgba(200,151,42,.12) 0%,transparent 70%)',
              }} />

              <div className="pf-side-label">Quick Actions</div>

              <Link to="/edit-profile" className="pf-quick-link">
                <i className="fas fa-edit" /> Edit Profile
              </Link>
              <Link to="/digital-id" className="pf-quick-link">
                <i className="fas fa-id-card" /> Digital ID Card
              </Link>
              <Link to="/membership-plans" className="pf-quick-link">
                <i className="fas fa-crown" /> {user.selectedPlan ? 'Upgrade Plan' : 'Select Plan'}
              </Link>
              <Link to="/my-articles" className="pf-quick-link">
                <i className="fas fa-newspaper" /> My Articles
              </Link>
              <Link to="/dashboard" className="pf-quick-link">
                <i className="fas fa-th-large" /> Dashboard
              </Link>

              {/* Membership strip */}
              {user.selectedPlanName && (
                <div className="pf-plan-strip">
                  <div className="pf-plan-strip-label">Current Plan</div>
                  <div className="pf-plan-name">{user.selectedPlanName}</div>
                  {user.membershipId && (
                    <div className="pf-plan-id">ID: {user.membershipId}</div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Action bar */}
          <div className="pf-action-bar pf-anim-up-d3">
            <Link to="/edit-profile" className="pf-btn-primary">
              <i className="fas fa-edit" /> Edit Profile
            </Link>
            <Link to="/digital-id" className="pf-btn-gold">
              <i className="fas fa-id-card" /> Digital ID Card
            </Link>
            <Link to="/membership-plans" className="pf-btn-ghost">
              <i className="fas fa-crown" /> {user.selectedPlan ? 'Upgrade Plan' : 'Select Plan'}
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
}
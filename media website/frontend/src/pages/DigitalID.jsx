// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';
// import { api } from '../api/api';

// export default function DigitalID() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [idData, setIdData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) { navigate('/login'); return; }
//     api.getDigitalId()
//       .then(res => setIdData(res.data))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [user, navigate]);

//   if (!user) return null;

//   const handlePrint = () => {
//     const printContent = document.getElementById('digital-id-card');
//     if (!printContent) return;
//     const w = window.open('', '_blank');
//     w.document.write(`<html><head><title>IDMA Digital ID - ${idData?.name}</title><style>
//       * { margin: 0; padding: 0; box-sizing: border-box; }
//       body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f5f5f5; }
//       .id-card { width: 380px; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
//       .id-header { background: linear-gradient(135deg, #1a237e, #3949ab); color: white; padding: 20px; text-align: center; }
//       .id-header h2 { font-size: 20px; letter-spacing: 2px; }
//       .id-header p { font-size: 11px; opacity: 0.8; margin-top: 4px; }
//       .id-body { padding: 20px; text-align: center; }
//       .id-avatar { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 12px; background: #1a237e; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: bold; }
//       .id-name { font-size: 18px; font-weight: 700; color: #212121; }
//       .id-tier { display: inline-block; background: #1a237e; color: white; padding: 3px 14px; border-radius: 12px; font-size: 11px; font-weight: 600; margin: 6px 0; }
//       .id-details { margin-top: 12px; text-align: left; }
//       .id-detail { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e0e0e0; font-size: 12px; }
//       .id-detail .label { color: #888; }
//       .id-detail .value { font-weight: 600; color: #212121; }
//       .id-qr { text-align: center; margin-top: 12px; }
//       .id-qr img { width: 120px; height: 120px; }
//       .id-footer { background: #f5f5f5; padding: 10px; text-align: center; }
//       .id-footer p { font-size: 9px; color: #888; line-height: 1.4; }
//       .id-status { display: inline-block; padding: 3px 14px; border-radius: 12px; font-size: 11px; font-weight: 600; }
//       .id-status.approved { background: #e8f5e9; color: #2e7d32; }
//       .id-status.pending { background: #fff3e0; color: #ff8f00; }
//       @media print { body { background: white; } .id-card { box-shadow: none; } }
//     </style></head><body>${printContent.innerHTML}</body></html>`);
//     w.document.close();
//     setTimeout(() => { w.print(); w.close(); }, 300);
//   };

//   const qrUrl = idData ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(idData.qrData)}` : '';

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-id-card"></i> Digital ID Card</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/dashboard">Dashboard</Link> / Digital ID</div></div></div>
//       <div style={{ maxWidth: '500px', margin: '30px auto', padding: '0 15px', paddingBottom: '80px' }}>
//         {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div> : idData ? (
//           <>
//             <div id="digital-id-card">
//               <div className="id-card" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
//                 <div style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-light))', color: 'white', padding: '20px', textAlign: 'center' }}>
//                   <h2 style={{ fontSize: '22px', letterSpacing: '3px', fontWeight: 800 }}>IDMA</h2>
//                   <p style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>Indian Digital Media Association</p>
//                 </div>
//                 <div style={{ padding: '20px', textAlign: 'center' }}>
//                   <div style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 700, border: '3px solid var(--accent)' }}>
//                     {idData.name.charAt(0)}
//                   </div>
//                   <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)' }}>{idData.name}</div>
//                   {idData.designation && <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '2px' }}>{idData.designation}</div>}
//                   {idData.organization && <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{idData.organization}</div>}
//                   <div style={{ marginTop: '8px' }}>
//                     <span style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '3px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{idData.tier} Member</span>
//                     <span style={{ display: 'inline-block', marginLeft: '6px', padding: '3px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: idData.status === 'approved' ? '#e8f5e9' : '#fff3e0', color: idData.status === 'approved' ? '#2e7d32' : '#ff8f00' }}>{idData.status === 'approved' ? 'Verified' : 'Pending'}</span>
//                   </div>
//                   <div style={{ marginTop: '16px', textAlign: 'left' }}>
//                     {[
//                       { label: 'Membership ID', value: idData.membershipId },
//                       { label: 'Location', value: `${idData.city}, ${idData.state}` },
//                       { label: 'Valid Until', value: idData.validity },
//                       { label: 'Joined', value: idData.joinedDate },
//                     ].map((d, i) => (
//                       <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
//                         <span style={{ color: 'var(--text-light)' }}>{d.label}</span>
//                         <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{d.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ marginTop: '16px', textAlign: 'center' }}>
//                     <img src={qrUrl} alt="QR Code" style={{ width: '120px', height: '120px', borderRadius: '8px', border: '2px solid var(--border-color)' }} />
//                     <p style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '6px' }}>Scan to verify membership</p>
//                   </div>
//                 </div>
//                 <div style={{ background: 'var(--bg-light)', padding: '10px', textAlign: 'center' }}>
//                   <p style={{ fontSize: '9px', color: 'var(--text-light)', lineHeight: 1.4 }}>{idData.disclaimer}</p>
//                 </div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
//               <button onClick={handlePrint} className="btn btn-primary" style={{ flex: 1 }}><i className="fas fa-print"></i> Print / Download</button>
//               <Link to="/dashboard" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}><i className="fas fa-arrow-left"></i> Back</Link>
//             </div>
//           </>
//         ) : <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>Unable to load Digital ID data.</p>}
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
    @keyframes spin          { to{transform:rotate(360deg)} }
    @keyframes pulseDot      { 0%,100%{opacity:1} 50%{opacity:.25} }
    @keyframes shimmer       { 0%{background-position:-400px 0} 100%{background-position:400px 0} }

    .di-anim-down  { animation:fadeSlideDown .7s ease both; }
    .di-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .di-anim-up-d1 { animation:fadeSlideUp   .7s .1s ease both; }
    .di-anim-up-d2 { animation:fadeSlideUp   .7s .2s ease both; }
    .di-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .di-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .di-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .di-hdr-glow { position:absolute; border-radius:50%; pointer-events:none; }
    .di-header-inner {
      max-width:1100px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .di-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .di-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .di-header-title em { font-style:italic; color:#c8972a; }
    .di-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .di-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .di-breadcrumb a:hover { color:#c8972a; }
    .di-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .di-body {
      background:#fafaf8;
      padding:36px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .di-container { max-width:520px; margin:0 auto; }

    /* ── Loading ── */
    .di-loading {
      text-align:center; padding:60px 20px;
      color:#94a3b8;
      font-family:'DM Sans',sans-serif; font-size:15px;
    }
    .di-spinner {
      width:28px; height:28px;
      border:3px solid rgba(30,58,95,.12);
      border-top-color:#1e3a5f;
      border-radius:50%;
      animation:spin .7s linear infinite;
      display:inline-block; margin-bottom:14px;
    }

    /* ── Error state ── */
    .di-error {
      text-align:center; padding:50px 20px;
      font-family:'DM Sans',sans-serif;
      color:#94a3b8; font-size:14.5px;
    }
    .di-error i { font-size:36px; color:#dde2ea; display:block; margin-bottom:12px; }

    /* ══ THE ID CARD ══════════════════════════════════════ */
    .di-card-wrap {
      background:#fff;
      border:1px solid #dde2ea;
      border-radius:14px;
      overflow:hidden;
      box-shadow:0 4px 32px rgba(15,31,51,.10);
    }

    /* card header — navy panel */
    .di-card-header {
      background:#1e3a5f;
      padding:22px 24px 20px;
      text-align:center;
      position:relative; overflow:hidden;
    }
    .di-card-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    /* gold bottom accent */
    .di-card-header::after {
      content:''; position:absolute; bottom:0; left:0; right:0;
      height:3px;
      background:linear-gradient(to right,transparent,#c8972a 30%,#e8c97a 60%,transparent);
    }
    .di-card-header-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .di-org-tag {
      display:inline-flex; align-items:center; gap:6px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:9.5px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:8px;
      position:relative; z-index:1;
    }
    .di-card-org {
      font-family:'Playfair Display',serif;
      font-size:26px; font-weight:900;
      color:#fff; letter-spacing:2px;
      line-height:1; margin-bottom:2px;
      position:relative; z-index:1;
    }
    .di-card-org em { font-style:italic; color:#c8972a; }
    .di-card-org-sub {
      font-family:'DM Sans',sans-serif;
      font-size:11px; color:rgba(255,255,255,.5);
      letter-spacing:.5px;
      position:relative; z-index:1;
    }

    /* card body */
    .di-card-body { padding:24px; text-align:center; }

    .di-avatar-ring {
      width:86px; height:86px; border-radius:50%;
      border:3px solid #fff;
      box-shadow:0 0 0 3px rgba(200,151,42,.4);
      margin:0 auto 14px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-family:'Playfair Display',serif;
      font-size:34px; font-weight:700; color:#c8972a;
      overflow:hidden;
    }
    .di-avatar-ring img { width:100%; height:100%; object-fit:cover; }

    .di-card-name {
      font-family:'Playfair Display',serif;
      font-size:20px; font-weight:700;
      color:#0f1f33; margin-bottom:3px;
    }
    .di-card-desig {
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; color:#94a3b8; margin-bottom:2px;
    }
    .di-card-org-name {
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; color:#94a3b8; margin-bottom:12px;
    }

    /* badges row */
    .di-badges {
      display:flex; align-items:center; justify-content:center;
      gap:8px; flex-wrap:wrap; margin-bottom:18px;
    }
    .di-badge-tier {
      display:inline-flex; align-items:center; gap:5px;
      padding:3px 12px; border-radius:20px;
      background:#1e3a5f; color:#c8972a;
      font-family:'DM Sans',sans-serif;
      font-size:11px; font-weight:700;
      letter-spacing:1px;
    }
    .di-badge-status {
      display:inline-flex; align-items:center; gap:5px;
      padding:3px 12px; border-radius:20px;
      font-family:'DM Sans',sans-serif;
      font-size:11px; font-weight:700;
      letter-spacing:1px;
    }
    .di-badge-status.approved  { background:rgba(34,197,94,.1);  color:#166534; }
    .di-badge-status.pending   { background:rgba(200,151,42,.1); color:#92600a; }

    /* detail rows */
    .di-detail-table { text-align:left; margin-bottom:18px; }
    .di-detail-row {
      display:flex; justify-content:space-between; align-items:center;
      padding:9px 0;
      border-bottom:1px solid #f1f5f9;
      font-family:'DM Sans',sans-serif;
    }
    .di-detail-row:last-child { border-bottom:none; }
    .di-detail-lbl { font-size:11.5px; color:#94a3b8; font-weight:500; }
    .di-detail-val { font-size:12.5px; color:#0f1f33; font-weight:600; text-align:right; }

    /* QR section */
    .di-qr-wrap {
      padding:16px; margin-top:4px;
      background:#fafbfc; border-radius:8px;
      border:1px solid #f1f5f9;
      display:inline-block;
    }
    .di-qr-wrap img {
      width:120px; height:120px;
      border-radius:6px; display:block;
    }
    .di-qr-label {
      font-family:'DM Sans',sans-serif;
      font-size:10px; color:#94a3b8;
      margin-top:8px; letter-spacing:.5px;
      text-transform:uppercase; font-weight:600;
    }

    /* card footer */
    .di-card-footer {
      background:#f8fafc;
      border-top:1px solid #f1f5f9;
      padding:12px 20px; text-align:center;
    }
    .di-card-footer p {
      font-family:'DM Sans',sans-serif;
      font-size:9.5px; color:#94a3b8;
      line-height:1.6; margin:0;
    }

    /* ── Action buttons ── */
    .di-action-bar {
      display:flex; gap:12px; margin-top:18px;
    }
    .di-btn-primary {
      flex:1; padding:15px 20px;
      background:#1e3a5f; color:#fff;
      border:none; border-radius:6px; cursor:pointer;
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; font-weight:600; letter-spacing:.3px;
      display:flex; align-items:center; justify-content:center; gap:9px;
      position:relative; overflow:hidden;
      transition:background .22s, transform .12s;
    }
    .di-btn-primary::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .di-btn-primary:hover::after { opacity:1; }
    .di-btn-primary:hover { background:#162d4a; }
    .di-btn-primary:active { transform:scale(.985); }

    .di-btn-ghost {
      flex:1; padding:15px 20px;
      background:#fff; color:#1e3a5f;
      border:1.5px solid #dde2ea; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; font-weight:600; letter-spacing:.3px;
      display:flex; align-items:center; justify-content:center; gap:9px;
      text-decoration:none;
      transition:border-color .2s, background .2s;
    }
    .di-btn-ghost:hover { border-color:#1e3a5f; background:#f8fafc; }
  `}</style>
);

export default function DigitalID() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [idData, setIdData]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.getDigitalId()
      .then(res => setIdData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  const qrUrl = idData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(idData.qrData)}`
    : '';

  const handlePrint = () => {
    const printContent = document.getElementById('di-printable');
    if (!printContent) return;
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>AIMA Digital ID — ${idData?.name}</title><style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900&family=DM+Sans:wght@400;600&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:'DM Sans',sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f5f5f5; }
      .card { width:380px; background:white; border-radius:14px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.12); }
      .ch { background:#1e3a5f; padding:20px; text-align:center; position:relative; }
      .ch::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(to right,transparent,#c8972a 30%,#e8c97a 60%,transparent); }
      .ch h2 { font-family:'Playfair Display',serif; font-size:26px; font-weight:900; color:#fff; letter-spacing:2px; }
      .ch h2 em { font-style:italic; color:#c8972a; }
      .ch p { font-size:10px; color:rgba(255,255,255,.5); margin-top:3px; }
      .cb { padding:20px; text-align:center; }
      .av { width:80px; height:80px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 0 3px rgba(200,151,42,.4); margin:0 auto 12px; background:#1e3a5f; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:#c8972a; }
      .nm { font-family:'Playfair Display',serif; font-size:19px; font-weight:700; color:#0f1f33; margin-bottom:2px; }
      .ds { font-size:12px; color:#94a3b8; margin-bottom:10px; }
      .bg { display:inline-block; background:#1e3a5f; color:#c8972a; padding:2px 12px; border-radius:12px; font-size:10px; font-weight:700; margin-right:5px; }
      .bs { display:inline-block; background:rgba(34,197,94,.1); color:#166534; padding:2px 12px; border-radius:12px; font-size:10px; font-weight:700; }
      .dt { margin:14px 0; text-align:left; }
      .dr { display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid #f1f5f9; font-size:11px; }
      .dl { color:#94a3b8; } .dv { font-weight:600; color:#0f1f33; }
      .qr { margin-top:12px; } .qr img { width:110px; height:110px; border-radius:6px; }
      .qrl { font-size:9px; color:#94a3b8; text-transform:uppercase; letter-spacing:.5px; margin-top:5px; }
      .cf { background:#f8fafc; border-top:1px solid #f1f5f9; padding:10px; text-align:center; }
      .cf p { font-size:9px; color:#94a3b8; line-height:1.5; }
      @media print { body{background:white;} .card{box-shadow:none;} }
    </style></head><body>
      <div class="card">
        <div class="ch">
          <h2>AIMA <em>Media</em></h2>
          <p>All India Media Association</p>
        </div>
        <div class="cb">
          <div class="av">${idData?.name?.charAt(0) || 'A'}</div>
          <div class="nm">${idData?.name || ''}</div>
          <div class="ds">${[idData?.designation, idData?.organization].filter(Boolean).join(' · ')}</div>
          <span class="bg"><i>&#9733;</i> ${idData?.tier || ''} Member</span>
          <span class="bs">&#10003; ${idData?.status === 'approved' ? 'Verified' : 'Pending'}</span>
          <div class="dt">
            <div class="dr"><span class="dl">Membership ID</span><span class="dv">${idData?.membershipId || ''}</span></div>
            <div class="dr"><span class="dl">Location</span><span class="dv">${[idData?.city, idData?.state].filter(Boolean).join(', ')}</span></div>
            <div class="dr"><span class="dl">Valid Until</span><span class="dv">${idData?.validity || ''}</span></div>
            <div class="dr"><span class="dl">Joined</span><span class="dv">${idData?.joinedDate || ''}</span></div>
          </div>
          <div class="qr">
            <img src="${qrUrl}" alt="QR Code" />
            <div class="qrl">Scan to verify membership</div>
          </div>
        </div>
        <div class="cf"><p>${idData?.disclaimer || 'This is an official AIMA Media digital membership card.'}</p></div>
      </div>
    </body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 400);
  };

  const detailRows = idData ? [
    { label:'Membership ID', value: idData.membershipId },
    { label:'Location',      value: [idData.city, idData.state].filter(Boolean).join(', ') },
    { label:'Valid Until',   value: idData.validity },
    { label:'Joined',        value: idData.joinedDate },
  ] : [];

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="di-page-header di-anim-down">
        <div className="di-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="di-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="di-header-inner">
          <div className="di-header-eyebrow">
            <span className="di-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Member Portal
          </div>
          <h1 className="di-header-title">Digital <em>ID Card</em></h1>
          <nav className="di-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/dashboard">Dashboard</Link>
            <span>/</span>
            Digital ID
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="di-body">
        <div className="di-container">

          {loading ? (
            <div className="di-loading">
              <div className="di-spinner" />
              <br />Loading your Digital ID…
            </div>
          ) : !idData ? (
            <div className="di-error">
              <i className="fas fa-id-card" />
              Unable to load Digital ID data.
            </div>
          ) : (
            <>
              {/* ── The Card ── */}
              <div id="di-printable" className="di-card-wrap di-anim-up">

                {/* Navy header */}
                <div className="di-card-header">
                  <div className="di-card-header-glow" style={{
                    width:'200px', height:'200px', top:'-60px', left:'-60px',
                    background:'radial-gradient(circle,rgba(200,151,42,.15) 0%,transparent 70%)',
                  }} />
                  <div className="di-org-tag">
                    <span className="di-pulse" style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
                    Official ID
                  </div>
                  <div className="di-card-org">AIMA <em>Media</em></div>
                  <div className="di-card-org-sub">All India Media Association</div>
                </div>

                {/* Body */}
                <div className="di-card-body">
                  {/* Avatar */}
                  <div className="di-avatar-ring">
                    {idData.name?.charAt(0) || 'A'}
                  </div>

                  <div className="di-card-name">{idData.name}</div>
                  {idData.designation && <div className="di-card-desig">{idData.designation}</div>}
                  {idData.organization && <div className="di-card-org-name">{idData.organization}</div>}

                  {/* Badges */}
                  <div className="di-badges">
                    <span className="di-badge-tier">
                      <i className="fas fa-crown" style={{ fontSize:'9px' }} />
                      {idData.tier} Member
                    </span>
                    <span className={`di-badge-status ${idData.status}`}>
                      <i className={`fas fa-${idData.status === 'approved' ? 'check' : 'clock'}`} style={{ fontSize:'9px' }} />
                      {idData.status === 'approved' ? 'Verified' : 'Pending'}
                    </span>
                  </div>

                  {/* Detail rows */}
                  <div className="di-detail-table">
                    {detailRows.map((d, i) => (
                      <div className="di-detail-row" key={i}>
                        <span className="di-detail-lbl">{d.label}</span>
                        <span className="di-detail-val">{d.value || '—'}</span>
                      </div>
                    ))}
                  </div>

                  {/* QR Code */}
                  <div className="di-qr-wrap">
                    <img src={qrUrl} alt="QR Code" />
                    <div className="di-qr-label">Scan to verify</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="di-card-footer">
                  <p>{idData.disclaimer || 'This is an official AIMA Media digital membership card.'}</p>
                </div>
              </div>

              {/* ── Actions ── */}
              <div className="di-action-bar di-anim-up-d1">
                <button onClick={handlePrint} className="di-btn-primary">
                  <i className="fas fa-print" /> Print / Download
                </button>
                <Link to="/dashboard" className="di-btn-ghost">
                  <i className="fas fa-arrow-left" /> Back
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </Layout>
  );
}
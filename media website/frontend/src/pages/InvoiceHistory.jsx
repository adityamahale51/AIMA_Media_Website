// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';
// import { api } from '../api/api';

// export default function InvoiceHistory() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) { navigate('/login'); return; }
//     api.getMyInvoices()
//       .then(res => setInvoices(res.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [user, navigate]);

//   if (!user) return null;

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-file-invoice"></i> Invoice History</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/dashboard">Dashboard</Link> / Invoices</div></div></div>
//       <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 15px', paddingBottom: '80px' }}>
//         <div style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '20px', marginBottom: '20px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//             <h3 style={{ fontSize: '18px', color: 'var(--primary)' }}><i className="fas fa-receipt"></i> Your Invoices</h3>
//             <Link to="/membership-plans" className="btn btn-primary btn-sm"><i className="fas fa-plus"></i> Renew / Upgrade</Link>
//           </div>

//           {/* Current Membership Info */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
//             <div style={{ background: 'var(--bg-light)', padding: '14px', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--primary)' }}>
//               <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Current Plan</div>
//               <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{user.selectedPlanName || 'None'}</div>
//             </div>
//             <div style={{ background: 'var(--bg-light)', padding: '14px', borderRadius: 'var(--radius)', borderLeft: '4px solid #2e7d32' }}>
//               <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Status</div>
//               <div style={{ fontSize: '16px', fontWeight: 700, color: user.membershipStatus === 'approved' ? '#2e7d32' : '#ff8f00' }}>{user.membershipStatus || 'Pending'}</div>
//             </div>
//             <div style={{ background: 'var(--bg-light)', padding: '14px', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--accent)' }}>
//               <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Valid Until</div>
//               <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)' }}>{user.membership_expiry ? new Date(user.membership_expiry).toLocaleDateString('en-IN') : 'N/A'}</div>
//             </div>
//           </div>
//         </div>

//         {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Loading invoices...</div> : (
//           <div style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
//             {invoices.length > 0 ? (
//               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
//                 <thead>
//                   <tr style={{ background: 'var(--primary)', color: 'white' }}>
//                     <th style={{ padding: '12px 16px', textAlign: 'left' }}>Invoice #</th>
//                     <th style={{ padding: '12px 16px', textAlign: 'left' }}>Plan</th>
//                     <th style={{ padding: '12px 16px', textAlign: 'right' }}>Amount</th>
//                     <th style={{ padding: '12px 16px', textAlign: 'center' }}>Date</th>
//                     <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoices.map(inv => (
//                     <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
//                       <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 600 }}>{inv.invoice_number}</td>
//                       <td style={{ padding: '12px 16px' }}>{inv.plan_name}</td>
//                       <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#2e7d32' }}>₹{inv.amount}</td>
//                       <td style={{ padding: '12px 16px', textAlign: 'center' }}>{inv.date ? new Date(inv.date).toLocaleDateString('en-IN') : '-'}</td>
//                       <td style={{ padding: '12px 16px', textAlign: 'center' }}>
//                         <span style={{ padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: inv.status === 'paid' ? '#e8f5e9' : '#fff3e0', color: inv.status === 'paid' ? '#2e7d32' : '#ff8f00' }}>{inv.status}</span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
//                 <i className="fas fa-file-invoice" style={{ fontSize: '40px', marginBottom: '12px', display: 'block' }}></i>
//                 <p>No invoices yet. <Link to="/membership-plans" style={{ color: 'var(--primary)', fontWeight: 600 }}>Subscribe to a plan</Link></p>
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

    .iv-anim-down  { animation:fadeSlideDown .7s ease both; }
    .iv-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .iv-anim-up-d1 { animation:fadeSlideUp   .7s .1s ease both; }
    .iv-anim-up-d2 { animation:fadeSlideUp   .7s .2s ease both; }
    .iv-anim-fade  { animation:fadeIn .35s ease both; }
    .iv-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .iv-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .iv-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .iv-hdr-glow { position:absolute; border-radius:50%; pointer-events:none; }
    .iv-header-inner {
      max-width:960px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .iv-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .iv-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .iv-header-title em { font-style:italic; color:#c8972a; }
    .iv-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .iv-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .iv-breadcrumb a:hover { color:#c8972a; }
    .iv-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .iv-body {
      background:#fafaf8;
      padding:32px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .iv-container { max-width:960px; margin:0 auto; }

    /* ── Membership summary cards ── */
    .iv-summary-wrap {
      background:#fff;
      border:1px solid #dde2ea; border-radius:10px;
      box-shadow:0 1px 8px rgba(15,31,51,.05);
      overflow:hidden; margin-bottom:20px;
    }
    .iv-summary-head {
      display:flex; align-items:center; justify-content:space-between;
      padding:18px 24px;
      border-bottom:1px solid #f1f5f9;
      background:#fafbfc; flex-wrap:wrap; gap:10px;
    }
    .iv-summary-head-title {
      font-family:'Playfair Display',serif;
      font-size:18px; font-weight:700; color:#0f1f33; margin:0;
      display:flex; align-items:center; gap:10px;
    }
    .iv-summary-head-title i { color:#c8972a; }

    .iv-renew-btn {
      display:inline-flex; align-items:center; gap:8px;
      padding:9px 18px; border-radius:6px;
      background:#1e3a5f; color:#fff; text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:13px; font-weight:600; letter-spacing:.3px;
      position:relative; overflow:hidden;
      transition:background .22s;
    }
    .iv-renew-btn::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.2) 100%);
      opacity:0; transition:opacity .3s;
    }
    .iv-renew-btn:hover::after { opacity:1; }
    .iv-renew-btn:hover { background:#162d4a; }
    .iv-renew-btn i { color:#c8972a; }

    .iv-summary-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
      gap:0;
    }
    .iv-summary-cell {
      padding:18px 22px;
      border-right:1px solid #f1f5f9;
    }
    .iv-summary-cell:last-child { border-right:none; }
    @media(max-width:600px){
      .iv-summary-cell { border-right:none; border-bottom:1px solid #f1f5f9; }
      .iv-summary-cell:last-child { border-bottom:none; }
    }
    .iv-summary-accent {
      display:block; width:28px; height:3px;
      border-radius:2px; margin-bottom:10px;
    }
    .iv-summary-label {
      font-size:10.5px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#94a3b8; margin-bottom:5px;
    }
    .iv-summary-value {
      font-family:'Playfair Display',serif;
      font-size:20px; font-weight:700; line-height:1;
    }

    /* ── Invoice table card ── */
    .iv-table-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:10px;
      box-shadow:0 1px 8px rgba(15,31,51,.05);
      overflow:hidden;
    }
    .iv-table-head-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:18px 24px;
      border-bottom:1px solid #f1f5f9;
      background:#fafbfc;
    }
    .iv-table-head-title {
      font-family:'Playfair Display',serif;
      font-size:18px; font-weight:700; color:#0f1f33; margin:0;
    }
    .iv-table-head-title em { font-style:italic; color:#c8972a; }
    .iv-table-count {
      font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:600;
      color:#94a3b8; letter-spacing:.5px;
    }

    /* table */
    .iv-table {
      width:100%; border-collapse:collapse;
      font-family:'DM Sans',sans-serif; font-size:13.5px;
    }
    .iv-table thead tr {
      background:#1e3a5f;
    }
    .iv-table thead th {
      padding:13px 18px;
      font-family:'DM Sans',sans-serif;
      font-size:10.5px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:rgba(255,255,255,.65);
      text-align:left; border:none;
    }
    .iv-table thead th.right { text-align:right; }
    .iv-table thead th.center { text-align:center; }

    .iv-table tbody tr {
      border-bottom:1px solid #f1f5f9;
      transition:background .15s;
    }
    .iv-table tbody tr:last-child { border-bottom:none; }
    .iv-table tbody tr:hover { background:#fafbfc; }

    .iv-table td {
      padding:14px 18px; color:#374151;
      vertical-align:middle;
    }
    .iv-table td.right  { text-align:right; }
    .iv-table td.center { text-align:center; }

    .iv-invoice-num {
      font-family:'DM Sans',sans-serif;
      font-size:13px; font-weight:700;
      color:#1e3a5f; letter-spacing:.3px;
      display:flex; align-items:center; gap:7px;
    }
    .iv-invoice-num i { color:#c8972a; font-size:11px; }

    .iv-plan-name { font-weight:600; color:#0f1f33; }

    .iv-amount {
      font-family:'Playfair Display',serif;
      font-size:16px; font-weight:700; color:#166534;
    }

    .iv-date { color:#94a3b8; font-size:13px; }

    .iv-status-pill {
      display:inline-flex; align-items:center; gap:5px;
      padding:3px 12px; border-radius:20px;
      font-size:11px; font-weight:700;
      letter-spacing:.5px; text-transform:capitalize;
    }
    .iv-status-pill.paid    { background:rgba(34,197,94,.1); color:#166534; }
    .iv-status-pill.pending { background:rgba(200,151,42,.1); color:#92600a; }
    .iv-status-pill.failed  { background:rgba(198,40,40,.08); color:#c62828; }

    /* ── Empty state ── */
    .iv-empty {
      text-align:center; padding:56px 20px;
    }
    .iv-empty-icon {
      width:64px; height:64px; border-radius:14px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-size:26px; color:#c8972a;
      margin:0 auto 18px;
    }
    .iv-empty h3 {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700; color:#0f1f33; margin-bottom:6px;
    }
    .iv-empty p { font-size:14px; color:#94a3b8; margin-bottom:20px; }
    .iv-empty-link {
      display:inline-flex; align-items:center; gap:8px;
      padding:12px 24px; border-radius:6px;
      background:#1e3a5f; color:#fff; text-decoration:none;
      font-family:'DM Sans',sans-serif;
      font-size:14px; font-weight:600;
      transition:background .22s;
      position:relative; overflow:hidden;
    }
    .iv-empty-link::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.2) 100%);
      opacity:0; transition:opacity .3s;
    }
    .iv-empty-link:hover::after { opacity:1; }
    .iv-empty-link:hover { background:#162d4a; }
    .iv-empty-link i { color:#c8972a; }

    /* ── Loading shimmer ── */
    .iv-shimmer-row {
      padding:16px 20px; border-bottom:1px solid #f1f5f9;
      display:flex; gap:16px; align-items:center;
    }
    .iv-shimmer-line {
      height:13px; border-radius:4px;
      background:linear-gradient(90deg,#f0f3f6 25%,#e4e8ed 50%,#f0f3f6 75%);
      background-size:400px 100%;
      animation:shimmer 1.4s ease infinite;
    }

    /* ── Spinner ── */
    .iv-spinner {
      width:24px; height:24px;
      border:3px solid rgba(30,58,95,.12);
      border-top-color:#1e3a5f;
      border-radius:50%;
      animation:spin .7s linear infinite;
      display:inline-block; margin-bottom:12px;
    }
  `}</style>
);

export default function InvoiceHistory() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.getMyInvoices()
      .then(res => setInvoices(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  const statusColor = s => s === 'approved' ? '#1e3a5f' : s === 'pending' ? '#c8972a' : '#c62828';
  const expiryStr = user.membership_expiry
    ? new Date(user.membership_expiry).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })
    : 'N/A';

  const summaryItems = [
    { label:'Current Plan',  value: user.selectedPlanName || 'None',           color:'#1e3a5f', accentColor:'#1e3a5f' },
    { label:'Status',        value: user.membershipStatus || 'Pending',        color: statusColor(user.membershipStatus), accentColor: statusColor(user.membershipStatus) },
    { label:'Valid Until',   value: expiryStr,                                 color:'#c8972a', accentColor:'#c8972a'  },
    { label:'Total Invoices',value: invoices.length || 0,                      color:'#0f1f33', accentColor:'#94a3b8'  },
  ];

  const pillClass = s => {
    if (s === 'paid') return 'paid';
    if (s === 'failed') return 'failed';
    return 'pending';
  };

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="iv-page-header iv-anim-down">
        <div className="iv-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="iv-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="iv-header-inner">
          <div className="iv-header-eyebrow">
            <span className="iv-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Member Portal
          </div>
          <h1 className="iv-header-title">Invoice <em>History</em></h1>
          <nav className="iv-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/dashboard">Dashboard</Link>
            <span>/</span>
            Invoices
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="iv-body">
        <div className="iv-container">

          {/* Membership summary */}
          <div className="iv-summary-wrap iv-anim-up">
            <div className="iv-summary-head">
              <h3 className="iv-summary-head-title">
                <i className="fas fa-crown" /> Membership Overview
              </h3>
              <Link to="/membership-plans" className="iv-renew-btn">
                <i className="fas fa-sync-alt" /> Renew / Upgrade
              </Link>
            </div>
            <div className="iv-summary-grid">
              {summaryItems.map((s, i) => (
                <div className="iv-summary-cell" key={i}>
                  <span className="iv-summary-accent" style={{ background: s.accentColor }} />
                  <div className="iv-summary-label">{s.label}</div>
                  <div className="iv-summary-value" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice table */}
          <div className="iv-table-card iv-anim-up-d1">
            <div className="iv-table-head-row">
              <h3 className="iv-table-head-title">Your <em>Invoices</em></h3>
              {!loading && invoices.length > 0 && (
                <span className="iv-table-count">{invoices.length} record{invoices.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            {loading ? (
              <div style={{ padding:'40px', textAlign:'center' }}>
                <div className="iv-spinner" />
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color:'#94a3b8' }}>Loading invoices…</div>
              </div>
            ) : invoices.length > 0 ? (
              <div style={{ overflowX:'auto' }}>
                <table className="iv-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Plan</th>
                      <th className="right">Amount</th>
                      <th className="center">Date</th>
                      <th className="center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.id}>
                        <td>
                          <div className="iv-invoice-num">
                            <i className="fas fa-file-invoice" />
                            {inv.invoice_number}
                          </div>
                        </td>
                        <td><span className="iv-plan-name">{inv.plan_name}</span></td>
                        <td className="right">
                          <span className="iv-amount">₹{Number(inv.amount).toLocaleString('en-IN')}</span>
                        </td>
                        <td className="center">
                          <span className="iv-date">
                            {inv.date ? new Date(inv.date).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                          </span>
                        </td>
                        <td className="center">
                          <span className={`iv-status-pill ${pillClass(inv.status)}`}>
                            <i className={`fas fa-${inv.status === 'paid' ? 'check-circle' : inv.status === 'failed' ? 'times-circle' : 'clock'}`} style={{ fontSize:'9px' }} />
                            {inv.status || 'pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="iv-empty iv-anim-fade">
                <div className="iv-empty-icon"><i className="fas fa-file-invoice" /></div>
                <h3>No Invoices Yet</h3>
                <p>Subscribe to a plan to start generating invoices for your membership.</p>
                <Link to="/membership-plans" className="iv-empty-link">
                  <i className="fas fa-crown" /> View Membership Plans
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function PrivacyPolicy() {
//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-user-shield"></i> Privacy Policy</h1><div className="breadcrumb"><Link to="/">Home</Link> / Privacy Policy</div></div></div>
//       <div className="about-content" style={{ paddingBottom: '80px' }}>
//         <div className="about-card">
//           <h2>Privacy Policy</h2>
//           <p><strong>Effective Date:</strong> January 1, 2026</p>
//           <p><strong>Organization:</strong> IDMA – Indian Digital Media Association</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>1. Information We Collect</h3>
//           <p><strong>Personal Information:</strong> Name, email address, phone number, state, city, organization, designation, bio, profile photo, LinkedIn URL, website URL, skills.</p>
//           <p><strong>Identity Verification:</strong> ID proof and work proof documents submitted during membership application.</p>
//           <p><strong>Payment Information:</strong> Transaction details processed through Razorpay (card details are handled by Razorpay and not stored by IDMA).</p>
//           <p><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent, articles read.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>2. How We Use Information</h3>
//           <p>We use collected information to: process membership applications; generate Digital IDs; facilitate article publishing; improve platform services; send transactional emails; comply with legal obligations.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>3. Data Sharing</h3>
//           <p>We do not sell your personal data. We may share information with: payment processors (Razorpay) for processing transactions; law enforcement if required by law; authorized service providers who assist in operating the platform.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>4. Public Information</h3>
//           <p>Your name, membership tier, location, and verification status are publicly accessible through the QR verification system. Your published articles are publicly accessible on the platform.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>5. Data Security</h3>
//           <p>We implement reasonable security measures including: encrypted passwords, secure HTTPS connections, regular database backups, and access controls. However, no system is 100% secure.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>6. Data Retention</h3>
//           <p>We retain your data for as long as your account is active. Upon account deletion, we retain records for up to 12 months for legal and compliance purposes.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>7. Your Rights</h3>
//           <p>You have the right to: access your personal data; correct inaccurate data; request deletion of your data; withdraw consent; lodge a complaint with regulatory authorities.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>8. Cookies</h3>
//           <p>We use essential cookies for authentication and session management. We do not use third-party tracking cookies without consent.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>9. Contact</h3>
//           <p>For privacy-related queries, contact us at: <strong>privacy@idma.org</strong></p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>10. Changes</h3>
//           <p>We may update this policy from time to time. We will notify members of significant changes via email.</p>
//         </div>
//       </div>
//     </Layout>
//   );
// }




import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

/* ── Global Styles ────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes pulseDot      { 0%,100%{opacity:1} 50%{opacity:.25} }

    .pp-anim-down  { animation:fadeSlideDown .7s ease both; }
    .pp-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .pp-anim-up-d1 { animation:fadeSlideUp   .7s .12s ease both; }
    .pp-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .pp-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .pp-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .pp-hdr-glow { position:absolute; border-radius:50%; pointer-events:none; }
    .pp-header-inner {
      max-width:1000px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .pp-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .pp-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .pp-header-title em { font-style:italic; color:#c8972a; }
    .pp-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .pp-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .pp-breadcrumb a:hover { color:#c8972a; }
    .pp-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .pp-body {
      background:#fafaf8;
      padding:36px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .pp-container {
      max-width:1000px; margin:0 auto;
      display:grid;
      grid-template-columns:220px 1fr;
      gap:24px; align-items:start;
    }
    @media(max-width:760px){
      .pp-container { grid-template-columns:1fr; }
      .pp-sidebar   { display:none; }
    }

    /* ── Sidebar TOC ── */
    .pp-sidebar {
      background:#1e3a5f;
      border-radius:10px; padding:22px 18px;
      position:sticky; top:24px;
      overflow:hidden;
    }
    .pp-sidebar::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .pp-sidebar-glow { position:absolute; border-radius:50%; pointer-events:none; }

    .pp-toc-label {
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a; margin-bottom:14px;
      display:flex; align-items:center; gap:8px;
      position:relative; z-index:1;
    }
    .pp-toc-label::after {
      content:''; flex:1; height:1px;
      background:rgba(200,151,42,.3);
    }
    .pp-toc-list {
      list-style:none; margin:0; padding:0;
      position:relative; z-index:1;
    }
    .pp-toc-list li { margin-bottom:2px; }
    .pp-toc-list a {
      display:flex; align-items:flex-start; gap:9px;
      padding:8px 10px; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:500;
      color:rgba(255,255,255,.5); text-decoration:none;
      transition:background .15s, color .15s;
      line-height:1.45;
    }
    .pp-toc-list a:hover {
      background:rgba(255,255,255,.07);
      color:#fff;
    }
    .pp-toc-num {
      width:18px; height:18px; border-radius:4px;
      background:rgba(200,151,42,.15);
      border:1px solid rgba(200,151,42,.2);
      display:flex; align-items:center; justify-content:center;
      font-size:9px; font-weight:700; color:#c8972a;
      flex-shrink:0; margin-top:1px;
    }

    .pp-sidebar-meta {
      margin-top:18px; padding-top:16px;
      border-top:1px solid rgba(255,255,255,.07);
      position:relative; z-index:1;
    }
    .pp-sidebar-meta-row { margin-bottom:10px; }
    .pp-sidebar-meta-lbl {
      font-size:9.5px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:rgba(255,255,255,.3); margin-bottom:3px; display:block;
    }
    .pp-sidebar-meta-val {
      font-size:12px; color:rgba(255,255,255,.6); font-weight:500;
    }

    /* ── Main card ── */
    .pp-main-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:10px;
      box-shadow:0 2px 16px rgba(15,31,51,.05);
      overflow:hidden;
    }

    .pp-card-top {
      background:#1e3a5f;
      padding:22px 28px 18px;
      position:relative; overflow:hidden;
    }
    .pp-card-top::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .pp-card-top::after {
      content:''; position:absolute; bottom:0; left:0; right:0;
      height:3px;
      background:linear-gradient(to right,transparent,#c8972a 30%,#e8c97a 60%,transparent);
    }
    .pp-card-top-title {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700; color:#fff; margin:0 0 4px;
      position:relative; z-index:1;
    }
    .pp-card-top-title em { font-style:italic; color:#c8972a; }
    .pp-card-top-sub {
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; color:rgba(255,255,255,.5);
      position:relative; z-index:1;
    }

    .pp-card-body { padding:32px 32px 36px; }
    @media(max-width:600px){ .pp-card-body { padding:22px 18px 28px; } }

    /* ── Section ── */
    .pp-section {
      margin-bottom:30px; padding-bottom:26px;
      border-bottom:1px solid #f1f5f9;
    }
    .pp-section:last-child { margin-bottom:0; padding-bottom:0; border-bottom:none; }

    .pp-section-header {
      display:flex; align-items:center; gap:12px; margin-bottom:14px;
    }
    .pp-section-num {
      width:32px; height:32px; border-radius:8px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-family:'DM Sans',sans-serif;
      font-size:13px; font-weight:700; color:#c8972a; flex-shrink:0;
    }
    .pp-section-title {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700; color:#0f1f33; margin:0;
    }

    .pp-section-body {
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; line-height:1.75;
      color:#374151; padding-left:44px;
    }
    .pp-section-body p { margin:0 0 10px; }
    .pp-section-body p:last-child { margin-bottom:0; }
    .pp-section-body strong { color:#0f1f33; font-weight:600; }

    /* data type pill */
    .pp-data-pill {
      display:inline-flex; align-items:center; gap:5px;
      padding:2px 10px; border-radius:20px;
      font-size:11px; font-weight:700;
      background:rgba(30,58,95,.07);
      color:#1e3a5f; margin-bottom:6px;
      border:1px solid rgba(30,58,95,.1);
    }
    .pp-data-pill i { color:#c8972a; font-size:9px; }

    /* rights list */
    .pp-rights-list {
      list-style:none; margin:0; padding:0;
    }
    .pp-rights-list li {
      display:flex; align-items:flex-start; gap:10px;
      padding:8px 0;
      border-bottom:1px solid #f8fafc;
      font-family:'DM Sans',sans-serif;
      font-size:14px; color:#374151; line-height:1.5;
    }
    .pp-rights-list li:last-child { border-bottom:none; }
    .pp-rights-list li i {
      color:#c8972a; font-size:11px; margin-top:3px; flex-shrink:0;
    }

    /* ── Info / highlight boxes ── */
    .pp-highlight-box {
      padding:14px 16px; border-radius:8px;
      border-left:4px solid #c8972a;
      background:rgba(200,151,42,.06);
      border:1px solid rgba(200,151,42,.18);
      border-left-width:4px;
      font-family:'DM Sans',sans-serif;
      font-size:13.5px; color:#64748b; line-height:1.65;
      margin-bottom:10px;
      display:flex; gap:10px; align-items:flex-start;
    }
    .pp-highlight-box i { color:#c8972a; margin-top:2px; flex-shrink:0; }
    .pp-highlight-box:last-child { margin-bottom:0; }

    /* ── Footer note ── */
    .pp-footer-note {
      margin-top:28px; padding:16px 20px;
      background:rgba(200,151,42,.06);
      border:1px solid rgba(200,151,42,.2);
      border-radius:8px; border-left:4px solid #c8972a;
      display:flex; align-items:flex-start; gap:12px;
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:#64748b; line-height:1.6;
    }
    .pp-footer-note i { color:#c8972a; margin-top:2px; flex-shrink:0; }
  `}</style>
);

const tocItems = [
  'Information We Collect', 'How We Use Information', 'Data Sharing',
  'Public Information', 'Data Security', 'Data Retention',
  'Your Rights', 'Cookies', 'Contact', 'Changes',
];

export default function PrivacyPolicy() {
  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="pp-page-header pp-anim-down">
        <div className="pp-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="pp-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="pp-header-inner">
          <div className="pp-header-eyebrow">
            <span className="pp-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Legal
          </div>
          <h1 className="pp-header-title">Privacy <em>Policy</em></h1>
          <nav className="pp-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            Privacy Policy
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="pp-body">
        <div className="pp-container">

          {/* Sidebar TOC */}
          <aside className="pp-sidebar pp-anim-up">
            <div className="pp-sidebar-glow" style={{
              width:'180px', height:'180px', top:'-50px', left:'-50px',
              background:'radial-gradient(circle,rgba(200,151,42,.12) 0%,transparent 70%)',
            }} />

            <div className="pp-toc-label">Contents</div>
            <ul className="pp-toc-list">
              {tocItems.map((item, i) => (
                <li key={i}>
                  <a href={`#pp-section-${i + 1}`}>
                    <span className="pp-toc-num">{i + 1}</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pp-sidebar-meta">
              <div className="pp-sidebar-meta-row">
                <span className="pp-sidebar-meta-lbl">Effective Date</span>
                <span className="pp-sidebar-meta-val">January 1, 2026</span>
              </div>
              <div className="pp-sidebar-meta-row">
                <span className="pp-sidebar-meta-lbl">Organization</span>
                <span className="pp-sidebar-meta-val">AIMA Media</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="pp-main-card pp-anim-up-d1">

            {/* Card header strip */}
            <div className="pp-card-top">
              <h2 className="pp-card-top-title">Privacy <em>Policy</em></h2>
              <p className="pp-card-top-sub">Effective January 1, 2026 &nbsp;·&nbsp; All India Media Association</p>
            </div>

            <div className="pp-card-body">

              {/* 1. Information We Collect */}
              <div className="pp-section" id="pp-section-1">
                <div className="pp-section-header">
                  <div className="pp-section-num">1</div>
                  <h3 className="pp-section-title">Information We Collect</h3>
                </div>
                <div className="pp-section-body">
                  <div className="pp-highlight-box">
                    <i className="fas fa-user" />
                    <div><strong>Personal Information:</strong> Name, email address, phone number, state, city, organization, designation, bio, profile photo, LinkedIn URL, website URL, skills.</div>
                  </div>
                  <div className="pp-highlight-box">
                    <i className="fas fa-id-card" />
                    <div><strong>Identity Verification:</strong> ID proof and work proof documents submitted during membership application.</div>
                  </div>
                  <div className="pp-highlight-box">
                    <i className="fas fa-credit-card" />
                    <div><strong>Payment Information:</strong> Transaction details processed through Razorpay. Card details are handled by Razorpay and not stored by AIMA Media.</div>
                  </div>
                  <div className="pp-highlight-box">
                    <i className="fas fa-chart-bar" />
                    <div><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent, articles read.</div>
                  </div>
                </div>
              </div>

              {/* 2. How We Use Information */}
              <div className="pp-section" id="pp-section-2">
                <div className="pp-section-header">
                  <div className="pp-section-num">2</div>
                  <h3 className="pp-section-title">How We Use Information</h3>
                </div>
                <div className="pp-section-body">
                  <p>We use collected information to:</p>
                  <ul className="pp-rights-list" style={{ marginTop:'8px' }}>
                    {['Process membership applications','Generate Digital IDs','Facilitate article publishing','Improve platform services','Send transactional emails','Comply with legal obligations'].map((item, i) => (
                      <li key={i}><i className="fas fa-check-circle" /> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. Data Sharing */}
              <div className="pp-section" id="pp-section-3">
                <div className="pp-section-header">
                  <div className="pp-section-num">3</div>
                  <h3 className="pp-section-title">Data Sharing</h3>
                </div>
                <div className="pp-section-body">
                  <p>We do not sell your personal data. We may share information with:</p>
                  <ul className="pp-rights-list" style={{ marginTop:'8px' }}>
                    <li><i className="fas fa-arrow-right" /> Payment processors (Razorpay) for processing transactions</li>
                    <li><i className="fas fa-arrow-right" /> Law enforcement if required by law</li>
                    <li><i className="fas fa-arrow-right" /> Authorized service providers who assist in operating the platform</li>
                  </ul>
                </div>
              </div>

              {/* 4. Public Information */}
              <div className="pp-section" id="pp-section-4">
                <div className="pp-section-header">
                  <div className="pp-section-num">4</div>
                  <h3 className="pp-section-title">Public Information</h3>
                </div>
                <div className="pp-section-body">
                  <p>Your <strong>name, membership tier, location,</strong> and <strong>verification status</strong> are publicly accessible through the QR verification system. Your published articles are publicly accessible on the platform.</p>
                </div>
              </div>

              {/* 5. Data Security */}
              <div className="pp-section" id="pp-section-5">
                <div className="pp-section-header">
                  <div className="pp-section-num">5</div>
                  <h3 className="pp-section-title">Data Security</h3>
                </div>
                <div className="pp-section-body">
                  <p>We implement reasonable security measures including:</p>
                  <ul className="pp-rights-list" style={{ marginTop:'8px' }}>
                    {['Encrypted passwords','Secure HTTPS connections','Regular database backups','Strict access controls'].map((item, i) => (
                      <li key={i}><i className="fas fa-shield-alt" /> {item}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop:'10px', color:'#94a3b8', fontSize:'13px' }}>Note: No system is 100% secure. We continuously work to improve our security posture.</p>
                </div>
              </div>

              {/* 6. Data Retention */}
              <div className="pp-section" id="pp-section-6">
                <div className="pp-section-header">
                  <div className="pp-section-num">6</div>
                  <h3 className="pp-section-title">Data Retention</h3>
                </div>
                <div className="pp-section-body">
                  <p>We retain your data for as long as your account is active. Upon account deletion, we retain records for up to <strong>12 months</strong> for legal and compliance purposes.</p>
                </div>
              </div>

              {/* 7. Your Rights */}
              <div className="pp-section" id="pp-section-7">
                <div className="pp-section-header">
                  <div className="pp-section-num">7</div>
                  <h3 className="pp-section-title">Your Rights</h3>
                </div>
                <div className="pp-section-body">
                  <p>You have the right to:</p>
                  <ul className="pp-rights-list" style={{ marginTop:'8px' }}>
                    {[
                      { icon:'fas fa-eye',         text:'Access your personal data' },
                      { icon:'fas fa-edit',        text:'Correct inaccurate data' },
                      { icon:'fas fa-trash-alt',   text:'Request deletion of your data' },
                      { icon:'fas fa-times-circle',text:'Withdraw consent' },
                      { icon:'fas fa-balance-scale',text:'Lodge a complaint with regulatory authorities' },
                    ].map((item, i) => (
                      <li key={i}><i className={item.icon} /> {item.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 8. Cookies */}
              <div className="pp-section" id="pp-section-8">
                <div className="pp-section-header">
                  <div className="pp-section-num">8</div>
                  <h3 className="pp-section-title">Cookies</h3>
                </div>
                <div className="pp-section-body">
                  <p>We use <strong>essential cookies</strong> for authentication and session management. We do not use third-party tracking cookies without consent.</p>
                </div>
              </div>

              {/* 9. Contact */}
              <div className="pp-section" id="pp-section-9">
                <div className="pp-section-header">
                  <div className="pp-section-num">9</div>
                  <h3 className="pp-section-title">Contact</h3>
                </div>
                <div className="pp-section-body">
                  <p>For privacy-related queries, reach us at:</p>
                  <div className="pp-highlight-box" style={{ marginTop:'10px' }}>
                    <i className="fas fa-envelope" />
                    <div>
                      <strong>privacy@aimamedia.org</strong>
                      <div style={{ fontSize:'12.5px', color:'#94a3b8', marginTop:'2px' }}>We aim to respond within 48 hours on business days.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10. Changes */}
              <div className="pp-section" id="pp-section-10">
                <div className="pp-section-header">
                  <div className="pp-section-num">10</div>
                  <h3 className="pp-section-title">Changes</h3>
                </div>
                <div className="pp-section-body">
                  <p>We may update this policy from time to time. We will notify members of significant changes via email.</p>
                </div>
              </div>

              {/* Footer note */}
              <div className="pp-footer-note">
                <i className="fas fa-info-circle" />
                <span>
                  This Privacy Policy is effective as of <strong style={{ color:'#1e3a5f' }}>January 1, 2026</strong>.
                  By using the AIMA Media platform, you agree to the collection and use of information as described in this policy.
                  Contact us at <strong style={{ color:'#1e3a5f' }}>privacy@aimamedia.org</strong> for any concerns.
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
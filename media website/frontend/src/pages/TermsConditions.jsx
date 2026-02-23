// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function TermsConditions() {
//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-file-contract"></i> Terms & Conditions</h1><div className="breadcrumb"><Link to="/">Home</Link> / Terms & Conditions</div></div></div>
//       <div className="about-content" style={{ paddingBottom: '80px' }}>
//         <div className="about-card">
//           <h2>Terms & Conditions</h2>
//           <p><strong>Effective Date:</strong> January 1, 2026</p>
//           <p><strong>Organization:</strong> IDMA – Indian Digital Media Association</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>1. Acceptance of Terms</h3>
//           <p>By accessing or using the IDMA platform, you agree to be bound by these Terms and Conditions. If you do not agree, you may not access or use the platform.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>2. Nature of Membership</h3>
//           <p>IDMA is a private digital membership network. Membership does not represent government accreditation, press card issuance, or any official media credentials from any government body. IDMA provides a verified contributor-based media community and digital identity system.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>3. Eligibility</h3>
//           <p>You must be at least 18 years of age (or a student enrolled in a recognized institution for Student membership) to register. You must provide accurate, truthful information during registration.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>4. Account Responsibilities</h3>
//           <p>You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activities that occur under your account. IDMA may suspend or terminate accounts that violate these terms.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>5. Membership Plans & Payment</h3>
//           <p>Membership plans are offered at published prices and are subject to change. All payments are processed through Razorpay or other authorized payment gateways. Membership is activated only after admin approval and successful payment verification.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>6. Content Publishing</h3>
//           <p>Members may submit articles for review and publication. All content is subject to editorial review before publishing. IDMA reserves the right to reject, modify, or remove any content that violates our editorial policy.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>7. Prohibited Conduct</h3>
//           <p>Members must not: publish false, misleading, or defamatory content; impersonate any person or entity; use the platform for illegal activities; misuse the Digital ID for unauthorized purposes; violate intellectual property rights.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>8. Intellectual Property</h3>
//           <p>Content submitted by members remains the property of the author but grants IDMA a non-exclusive license to publish and distribute. The IDMA brand, logo, and platform design are proprietary to IDMA.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>9. Termination</h3>
//           <p>IDMA reserves the right to suspend or terminate any membership at its sole discretion, with or without cause. Members may cancel their membership by contacting support.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>10. Limitation of Liability</h3>
//           <p>IDMA shall not be liable for any indirect, incidental, or consequential damages arising from the use of the platform. The platform is provided "as is" without warranties of any kind.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>11. Jurisdiction</h3>
//           <p>These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Punjab, India.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>12. Changes to Terms</h3>
//           <p>IDMA reserves the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
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

    .tc-anim-down  { animation:fadeSlideDown .7s ease both; }
    .tc-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .tc-anim-up-d1 { animation:fadeSlideUp   .7s .12s ease both; }
    .tc-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .tc-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .tc-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .tc-hdr-glow { position:absolute; border-radius:50%; pointer-events:none; }
    .tc-header-inner {
      max-width:1000px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .tc-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .tc-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .tc-header-title em { font-style:italic; color:#c8972a; }
    .tc-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .tc-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .tc-breadcrumb a:hover { color:#c8972a; }
    .tc-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .tc-body {
      background:#fafaf8;
      padding:36px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .tc-container {
      max-width:1000px; margin:0 auto;
      display:grid;
      grid-template-columns:220px 1fr;
      gap:24px; align-items:start;
    }
    @media(max-width:760px){
      .tc-container { grid-template-columns:1fr; }
      .tc-sidebar   { display:none; }
    }

    /* ── Sidebar (TOC) ── */
    .tc-sidebar {
      background:#1e3a5f;
      border-radius:10px; padding:22px 18px;
      position:sticky; top:24px;
      overflow:hidden;
    }
    .tc-sidebar::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .tc-sidebar-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .tc-toc-label {
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a; margin-bottom:14px;
      display:flex; align-items:center; gap:8px;
      position:relative; z-index:1;
    }
    .tc-toc-label::after {
      content:''; flex:1; height:1px;
      background:rgba(200,151,42,.3);
    }
    .tc-toc-list {
      list-style:none; margin:0; padding:0;
      position:relative; z-index:1;
    }
    .tc-toc-list li { margin-bottom:2px; }
    .tc-toc-list a {
      display:flex; align-items:flex-start; gap:9px;
      padding:8px 10px; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:500;
      color:rgba(255,255,255,.5); text-decoration:none;
      transition:background .15s, color .15s;
      line-height:1.45;
    }
    .tc-toc-list a:hover {
      background:rgba(255,255,255,.07);
      color:#fff;
    }
    .tc-toc-num {
      width:18px; height:18px; border-radius:4px;
      background:rgba(200,151,42,.15);
      border:1px solid rgba(200,151,42,.2);
      display:flex; align-items:center; justify-content:center;
      font-size:9px; font-weight:700; color:#c8972a;
      flex-shrink:0; margin-top:1px;
    }

    /* meta strip */
    .tc-sidebar-meta {
      margin-top:18px; padding-top:16px;
      border-top:1px solid rgba(255,255,255,.07);
      position:relative; z-index:1;
    }
    .tc-sidebar-meta-row {
      display:flex; flex-direction:column;
      margin-bottom:10px;
    }
    .tc-sidebar-meta-lbl {
      font-size:9.5px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:rgba(255,255,255,.3); margin-bottom:3px;
    }
    .tc-sidebar-meta-val {
      font-size:12px; color:rgba(255,255,255,.6); font-weight:500;
    }

    /* ── Main card ── */
    .tc-main-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:10px;
      box-shadow:0 2px 16px rgba(15,31,51,.05);
      overflow:hidden;
    }

    /* card top strip */
    .tc-card-top {
      background:#1e3a5f;
      padding:22px 28px 18px;
      position:relative; overflow:hidden;
    }
    .tc-card-top::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .tc-card-top::after {
      content:''; position:absolute; bottom:0; left:0; right:0;
      height:3px;
      background:linear-gradient(to right,transparent,#c8972a 30%,#e8c97a 60%,transparent);
    }
    .tc-card-top-title {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700; color:#fff; margin:0 0 4px;
      position:relative; z-index:1;
    }
    .tc-card-top-title em { font-style:italic; color:#c8972a; }
    .tc-card-top-sub {
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; color:rgba(255,255,255,.5);
      position:relative; z-index:1;
    }

    /* card body */
    .tc-card-body { padding:32px 32px 36px; }
    @media(max-width:600px){ .tc-card-body { padding:22px 18px 28px; } }

    /* ── Section blocks ── */
    .tc-section {
      margin-bottom:32px; padding-bottom:28px;
      border-bottom:1px solid #f1f5f9;
    }
    .tc-section:last-child { margin-bottom:0; padding-bottom:0; border-bottom:none; }

    .tc-section-header {
      display:flex; align-items:center; gap:12px; margin-bottom:14px;
    }
    .tc-section-num {
      width:32px; height:32px; border-radius:8px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-family:'DM Sans',sans-serif;
      font-size:13px; font-weight:700; color:#c8972a;
      flex-shrink:0;
    }
    .tc-section-title {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700; color:#0f1f33; margin:0;
    }

    .tc-section-body {
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; line-height:1.75;
      color:#374151; padding-left:44px;
    }

    /* highlight keywords */
    .tc-section-body strong {
      color:#0f1f33; font-weight:600;
    }

    /* ── Footer note ── */
    .tc-footer-note {
      margin-top:28px; padding:16px 20px;
      background:rgba(200,151,42,.06);
      border:1px solid rgba(200,151,42,.2);
      border-radius:8px; border-left:4px solid #c8972a;
      display:flex; align-items:flex-start; gap:12px;
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:#64748b; line-height:1.6;
    }
    .tc-footer-note i { color:#c8972a; margin-top:2px; flex-shrink:0; }
  `}</style>
);

const sections = [
  { num:1,  title:'Acceptance of Terms',       body:'By accessing or using the AIMA Media platform, you agree to be bound by these Terms and Conditions. If you do not agree, you may not access or use the platform.' },
  { num:2,  title:'Nature of Membership',      body:'AIMA Media is a private digital membership network. Membership does not represent government accreditation, press card issuance, or any official media credentials from any government body. AIMA provides a verified contributor-based media community and digital identity system.' },
  { num:3,  title:'Eligibility',               body:'You must be at least 18 years of age (or a student enrolled in a recognized institution for Student membership) to register. You must provide accurate, truthful information during registration.' },
  { num:4,  title:'Account Responsibilities',  body:'You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activities that occur under your account. AIMA Media may suspend or terminate accounts that violate these terms.' },
  { num:5,  title:'Membership Plans & Payment',body:'Membership plans are offered at published prices and are subject to change. All payments are processed through Razorpay or other authorized payment gateways. Membership is activated only after admin approval and successful payment verification.' },
  { num:6,  title:'Content Publishing',        body:'Members may submit articles for review and publication. All content is subject to editorial review before publishing. AIMA Media reserves the right to reject, modify, or remove any content that violates our editorial policy.' },
  { num:7,  title:'Prohibited Conduct',        body:'Members must not: publish false, misleading, or defamatory content; impersonate any person or entity; use the platform for illegal activities; misuse the Digital ID for unauthorized purposes; or violate intellectual property rights.' },
  { num:8,  title:'Intellectual Property',     body:'Content submitted by members remains the property of the author but grants AIMA Media a non-exclusive license to publish and distribute. The AIMA brand, logo, and platform design are proprietary to AIMA Media.' },
  { num:9,  title:'Termination',               body:'AIMA Media reserves the right to suspend or terminate any membership at its sole discretion, with or without cause. Members may cancel their membership by contacting support.' },
  { num:10, title:'Limitation of Liability',   body:'AIMA Media shall not be liable for any indirect, incidental, or consequential damages arising from the use of the platform. The platform is provided "as is" without warranties of any kind.' },
  { num:11, title:'Jurisdiction',              body:'These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Uttar Pradesh, India.' },
  { num:12, title:'Changes to Terms',          body:'AIMA Media reserves the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the modified terms.' },
];

export default function TermsConditions() {
  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="tc-page-header tc-anim-down">
        <div className="tc-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="tc-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="tc-header-inner">
          <div className="tc-header-eyebrow">
            <span className="tc-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Legal
          </div>
          <h1 className="tc-header-title">Terms & <em>Conditions</em></h1>
          <nav className="tc-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            Terms &amp; Conditions
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="tc-body">
        <div className="tc-container">

          {/* Sidebar TOC */}
          <aside className="tc-sidebar tc-anim-up">
            <div className="tc-sidebar-glow" style={{
              width:'180px', height:'180px', top:'-50px', left:'-50px',
              background:'radial-gradient(circle,rgba(200,151,42,.12) 0%,transparent 70%)',
            }} />

            <div className="tc-toc-label">Contents</div>
            <ul className="tc-toc-list">
              {sections.map(s => (
                <li key={s.num}>
                  <a href={`#section-${s.num}`}>
                    <span className="tc-toc-num">{s.num}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="tc-sidebar-meta">
              <div className="tc-sidebar-meta-row">
                <span className="tc-sidebar-meta-lbl">Effective Date</span>
                <span className="tc-sidebar-meta-val">January 1, 2026</span>
              </div>
              <div className="tc-sidebar-meta-row">
                <span className="tc-sidebar-meta-lbl">Organization</span>
                <span className="tc-sidebar-meta-val">AIMA Media</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="tc-main-card tc-anim-up-d1">

            {/* Card header strip */}
            <div className="tc-card-top">
              <h2 className="tc-card-top-title">Terms & <em>Conditions</em></h2>
              <p className="tc-card-top-sub">Effective January 1, 2026 &nbsp;·&nbsp; All India Media Association</p>
            </div>

            <div className="tc-card-body">
              {sections.map(s => (
                <div className="tc-section" key={s.num} id={`section-${s.num}`}>
                  <div className="tc-section-header">
                    <div className="tc-section-num">{s.num}</div>
                    <h3 className="tc-section-title">{s.title}</h3>
                  </div>
                  <p className="tc-section-body">{s.body}</p>
                </div>
              ))}

              {/* Footer note */}
              <div className="tc-footer-note">
                <i className="fas fa-info-circle" />
                <span>
                  For questions about these Terms &amp; Conditions, please contact us at&nbsp;
                  <strong style={{ color:'#1e3a5f' }}>info@aimamedia.org</strong>.
                  These terms were last updated on <strong style={{ color:'#1e3a5f' }}>January 1, 2026</strong>.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
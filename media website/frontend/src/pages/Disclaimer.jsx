// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function Disclaimer() {
//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-exclamation-circle"></i> Disclaimer</h1><div className="breadcrumb"><Link to="/">Home</Link> / Disclaimer</div></div></div>
//       <div className="about-content" style={{ paddingBottom: '80px' }}>
//         <div className="about-card">
//           <h2>Disclaimer</h2>

//           <div style={{ background: '#fff3e0', padding: '20px', borderRadius: 'var(--radius)', marginTop: '16px', borderLeft: '4px solid var(--accent)' }}>
//             <h3 style={{ fontSize: '16px', color: '#e65100', marginBottom: '8px' }}><i className="fas fa-exclamation-triangle"></i> Important Notice</h3>
//             <p style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.7, fontWeight: 600 }}>IDMA (Indian Digital Media Association) is a private digital membership network. This membership does NOT represent government accreditation, press card issuance, or any official media credentials from any government body of India.</p>
//           </div>

//           <h3 style={{ marginTop: '24px', fontSize: '16px', color: 'var(--primary)' }}>What IDMA Is</h3>
//           <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
//             {[
//               'A verified media membership platform',
//               'A contributor-based news publishing network',
//               'A verified digital identity system for media professionals',
//               'A digital credibility directory',
//               'An ethical media community',
//             ].map((item, i) => (
//               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#e8f5e9', borderRadius: 'var(--radius)', fontSize: '14px', color: '#2e7d32' }}>
//                 <i className="fas fa-check-circle"></i> {item}
//               </div>
//             ))}
//           </div>

//           <h3 style={{ marginTop: '24px', fontSize: '16px', color: 'var(--primary)' }}>What IDMA Is NOT</h3>
//           <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
//             {[
//               'Not a government accreditation body',
//               'Not a press pass provider',
//               'Not affiliated with any government institution',
//               'Not authorized to issue official press credentials',
//             ].map((item, i) => (
//               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#ffebee', borderRadius: 'var(--radius)', fontSize: '14px', color: '#c62828' }}>
//                 <i className="fas fa-times-circle"></i> {item}
//               </div>
//             ))}
//           </div>

//           <h3 style={{ marginTop: '24px', fontSize: '16px', color: 'var(--primary)' }}>Content Disclaimer</h3>
//           <p>The views and opinions expressed in articles published on this platform are solely those of the individual authors/contributors and do not necessarily represent the views of IDMA. IDMA does not endorse or guarantee the accuracy of any user-submitted content.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>Liability Limitation</h3>
//           <p>IDMA shall not be held liable for any loss, damage, or inconvenience caused by the use of information published on this platform. Users are advised to independently verify any information before acting upon it.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>Digital ID Disclaimer</h3>
//           <p>The IDMA Digital ID is a membership verification tool only. It does not grant any legal rights, press privileges, or government-recognized credentials. Misuse of the Digital ID for unauthorized purposes may result in immediate membership revocation and legal action.</p>

//           <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>Jurisdiction</h3>
//           <p>All matters relating to this disclaimer and the use of the IDMA platform shall be governed by the laws of India, subject to the jurisdiction of courts in Punjab, India.</p>
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

    .dl-anim-down  { animation:fadeSlideDown .7s ease both; }
    .dl-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .dl-anim-up-d1 { animation:fadeSlideUp   .7s .12s ease both; }
    .dl-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .dl-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .dl-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .dl-hdr-glow { position:absolute; border-radius:50%; pointer-events:none; }
    .dl-header-inner {
      max-width:1000px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .dl-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .dl-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .dl-header-title em { font-style:italic; color:#c8972a; }
    .dl-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .dl-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .dl-breadcrumb a:hover { color:#c8972a; }
    .dl-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .dl-body {
      background:#fafaf8;
      padding:36px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .dl-container {
      max-width:1000px; margin:0 auto;
      display:grid;
      grid-template-columns:220px 1fr;
      gap:24px; align-items:start;
    }
    @media(max-width:760px){
      .dl-container { grid-template-columns:1fr; }
      .dl-sidebar   { display:none; }
    }

    /* ── Sidebar ── */
    .dl-sidebar {
      background:#1e3a5f;
      border-radius:10px; padding:22px 18px;
      position:sticky; top:24px;
      overflow:hidden;
    }
    .dl-sidebar::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .dl-sidebar-glow { position:absolute; border-radius:50%; pointer-events:none; }

    .dl-toc-label {
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a; margin-bottom:14px;
      display:flex; align-items:center; gap:8px;
      position:relative; z-index:1;
    }
    .dl-toc-label::after {
      content:''; flex:1; height:1px;
      background:rgba(200,151,42,.3);
    }
    .dl-toc-list {
      list-style:none; margin:0; padding:0;
      position:relative; z-index:1;
    }
    .dl-toc-list li { margin-bottom:2px; }
    .dl-toc-list a {
      display:flex; align-items:flex-start; gap:9px;
      padding:8px 10px; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:500;
      color:rgba(255,255,255,.5); text-decoration:none;
      transition:background .15s, color .15s;
      line-height:1.45;
    }
    .dl-toc-list a:hover {
      background:rgba(255,255,255,.07); color:#fff;
    }
    .dl-toc-icon {
      width:18px; height:18px; border-radius:4px;
      background:rgba(200,151,42,.15);
      border:1px solid rgba(200,151,42,.2);
      display:flex; align-items:center; justify-content:center;
      font-size:8px; color:#c8972a;
      flex-shrink:0; margin-top:1px;
    }

    .dl-sidebar-notice {
      margin-top:18px; padding:14px;
      border-top:1px solid rgba(255,255,255,.07);
      position:relative; z-index:1;
      background:rgba(198,40,40,.08);
      border-radius:7px;
      border:1px solid rgba(198,40,40,.2);
    }
    .dl-sidebar-notice-label {
      font-size:9.5px; font-weight:700;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#f87171; margin-bottom:6px; display:block;
    }
    .dl-sidebar-notice p {
      font-size:11.5px; color:rgba(255,255,255,.45);
      line-height:1.55; margin:0;
    }

    /* ── Main card ── */
    .dl-main-card {
      background:#fff;
      border:1px solid #dde2ea; border-radius:10px;
      box-shadow:0 2px 16px rgba(15,31,51,.05);
      overflow:hidden;
    }

    .dl-card-top {
      background:#1e3a5f;
      padding:22px 28px 18px;
      position:relative; overflow:hidden;
    }
    .dl-card-top::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .dl-card-top::after {
      content:''; position:absolute; bottom:0; left:0; right:0;
      height:3px;
      background:linear-gradient(to right,transparent,#c8972a 30%,#e8c97a 60%,transparent);
    }
    .dl-card-top-title {
      font-family:'Playfair Display',serif;
      font-size:22px; font-weight:700; color:#fff; margin:0 0 4px;
      position:relative; z-index:1;
    }
    .dl-card-top-title em { font-style:italic; color:#c8972a; }
    .dl-card-top-sub {
      font-family:'DM Sans',sans-serif;
      font-size:12.5px; color:rgba(255,255,255,.5);
      position:relative; z-index:1;
    }

    .dl-card-body { padding:28px 32px 36px; }
    @media(max-width:600px){ .dl-card-body { padding:20px 18px 28px; } }

    /* ── Important notice banner ── */
    .dl-notice-banner {
      background:rgba(198,40,40,.05);
      border:1px solid rgba(198,40,40,.2);
      border-left:4px solid #c62828;
      border-radius:8px;
      padding:18px 20px;
      margin-bottom:28px;
      display:flex; gap:14px; align-items:flex-start;
    }
    .dl-notice-icon {
      width:38px; height:38px; border-radius:8px;
      background:rgba(198,40,40,.1);
      display:flex; align-items:center; justify-content:center;
      font-size:15px; color:#c62828; flex-shrink:0;
    }
    .dl-notice-title {
      font-family:'Playfair Display',serif;
      font-size:16px; font-weight:700; color:#c62828;
      margin:0 0 6px;
    }
    .dl-notice-body {
      font-family:'DM Sans',sans-serif;
      font-size:14px; color:#374151; line-height:1.7; margin:0;
      font-weight:500;
    }

    /* ── Section ── */
    .dl-section {
      margin-bottom:28px; padding-bottom:24px;
      border-bottom:1px solid #f1f5f9;
    }
    .dl-section:last-child { margin-bottom:0; padding-bottom:0; border-bottom:none; }

    .dl-section-header {
      display:flex; align-items:center; gap:12px; margin-bottom:14px;
    }
    .dl-section-icon {
      width:32px; height:32px; border-radius:8px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-size:13px; color:#c8972a; flex-shrink:0;
    }
    .dl-section-title {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700; color:#0f1f33; margin:0;
    }

    .dl-section-body {
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; line-height:1.75;
      color:#374151; padding-left:44px;
    }

    /* ── Is / Is Not grids ── */
    .dl-check-grid {
      display:grid; gap:8px; padding-left:44px;
    }
    .dl-check-item {
      display:flex; align-items:center; gap:10px;
      padding:11px 16px; border-radius:7px;
      font-family:'DM Sans',sans-serif;
      font-size:13.5px; font-weight:500;
    }
    .dl-check-item.yes {
      background:rgba(34,197,94,.07);
      border:1px solid rgba(34,197,94,.15);
      color:#166534;
    }
    .dl-check-item.no {
      background:rgba(198,40,40,.05);
      border:1px solid rgba(198,40,40,.12);
      color:#c62828;
    }
    .dl-check-item i { font-size:13px; flex-shrink:0; }

    /* ── Footer note ── */
    .dl-footer-note {
      margin-top:24px; padding:15px 18px;
      background:rgba(200,151,42,.06);
      border:1px solid rgba(200,151,42,.2);
      border-left:4px solid #c8972a;
      border-radius:8px;
      display:flex; gap:12px; align-items:flex-start;
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:#64748b; line-height:1.65;
    }
    .dl-footer-note i { color:#c8972a; margin-top:2px; flex-shrink:0; }
  `}</style>
);

const tocItems = [
  { icon:'fas fa-exclamation-triangle', label:'Important Notice'    },
  { icon:'fas fa-check-circle',         label:'What IDMA Is'        },
  { icon:'fas fa-times-circle',         label:'What IDMA Is Not'    },
  { icon:'fas fa-newspaper',            label:'Content Disclaimer'  },
  { icon:'fas fa-shield-alt',           label:'Liability Limitation'},
  { icon:'fas fa-id-card',              label:'Digital ID Disclaimer'},
  { icon:'fas fa-balance-scale',        label:'Jurisdiction'        },
];

const isItems = [
  'A verified media membership platform',
  'A contributor-based news publishing network',
  'A verified digital identity system for media professionals',
  'A digital credibility directory',
  'An ethical media community',
];

const isNotItems = [
  'Not a government accreditation body',
  'Not a press pass provider',
  'Not affiliated with any government institution',
  'Not authorized to issue official press credentials',
];

export default function Disclaimer() {
  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="dl-page-header dl-anim-down">
        <div className="dl-hdr-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="dl-hdr-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />
        <div className="dl-header-inner">
          <div className="dl-header-eyebrow">
            <span className="dl-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Legal
          </div>
          <h1 className="dl-header-title">Important <em>Disclaimer</em></h1>
          <nav className="dl-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            Disclaimer
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="dl-body">
        <div className="dl-container">

          {/* Sidebar */}
          <aside className="dl-sidebar dl-anim-up">
            <div className="dl-sidebar-glow" style={{
              width:'180px', height:'180px', top:'-50px', left:'-50px',
              background:'radial-gradient(circle,rgba(200,151,42,.12) 0%,transparent 70%)',
            }} />

            <div className="dl-toc-label">Contents</div>
            <ul className="dl-toc-list">
              {tocItems.map((item, i) => (
                <li key={i}>
                  <a href={`#dl-section-${i}`}>
                    <span className="dl-toc-icon"><i className={item.icon} /></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="dl-sidebar-notice">
              <span className="dl-sidebar-notice-label">⚠ Please Note</span>
              <p>IDMA membership is a private credential and does not represent any government-issued press accreditation.</p>
            </div>
          </aside>

          {/* Main card */}
          <div className="dl-main-card dl-anim-up-d1">

            {/* Card header strip */}
            <div className="dl-card-top">
              <h2 className="dl-card-top-title">Important <em>Disclaimer</em></h2>
              <p className="dl-card-top-sub">Indian Digital Media Association &nbsp;·&nbsp; Please read carefully</p>
            </div>

            <div className="dl-card-body">

              {/* Important Notice Banner */}
              <div className="dl-notice-banner" id="dl-section-0">
                <div className="dl-notice-icon">
                  <i className="fas fa-exclamation-triangle" />
                </div>
                <div>
                  <h3 className="dl-notice-title">Important Notice</h3>
                  <p className="dl-notice-body">
                    IDMA (Indian Digital Media Association) is a <strong>private digital membership network</strong>. This membership does <strong>NOT</strong> represent government accreditation, press card issuance, or any official media credentials from any government body of India.
                  </p>
                </div>
              </div>

              {/* What IDMA Is */}
              <div className="dl-section" id="dl-section-1">
                <div className="dl-section-header">
                  <div className="dl-section-icon" style={{ background:'rgba(34,197,94,.1)', color:'#166534' }}>
                    <i className="fas fa-check-circle" />
                  </div>
                  <h3 className="dl-section-title">What IDMA <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#c8972a' }}>Is</span></h3>
                </div>
                <div className="dl-check-grid">
                  {isItems.map((item, i) => (
                    <div className="dl-check-item yes" key={i}>
                      <i className="fas fa-check-circle" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* What IDMA Is Not */}
              <div className="dl-section" id="dl-section-2">
                <div className="dl-section-header">
                  <div className="dl-section-icon" style={{ background:'rgba(198,40,40,.08)', color:'#c62828' }}>
                    <i className="fas fa-times-circle" />
                  </div>
                  <h3 className="dl-section-title">What IDMA Is <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#c62828' }}>Not</span></h3>
                </div>
                <div className="dl-check-grid">
                  {isNotItems.map((item, i) => (
                    <div className="dl-check-item no" key={i}>
                      <i className="fas fa-times-circle" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Disclaimer */}
              <div className="dl-section" id="dl-section-3">
                <div className="dl-section-header">
                  <div className="dl-section-icon">
                    <i className="fas fa-newspaper" />
                  </div>
                  <h3 className="dl-section-title">Content <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#c8972a' }}>Disclaimer</span></h3>
                </div>
                <p className="dl-section-body">
                  The views and opinions expressed in articles published on this platform are solely those of the individual authors/contributors and do not necessarily represent the views of IDMA. IDMA does not endorse or guarantee the accuracy of any user-submitted content.
                </p>
              </div>

              {/* Liability Limitation */}
              <div className="dl-section" id="dl-section-4">
                <div className="dl-section-header">
                  <div className="dl-section-icon">
                    <i className="fas fa-shield-alt" />
                  </div>
                  <h3 className="dl-section-title">Liability <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#c8972a' }}>Limitation</span></h3>
                </div>
                <p className="dl-section-body">
                  IDMA shall not be held liable for any loss, damage, or inconvenience caused by the use of information published on this platform. Users are advised to independently verify any information before acting upon it.
                </p>
              </div>

              {/* Digital ID Disclaimer */}
              <div className="dl-section" id="dl-section-5">
                <div className="dl-section-header">
                  <div className="dl-section-icon">
                    <i className="fas fa-id-card" />
                  </div>
                  <h3 className="dl-section-title">Digital ID <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#c8972a' }}>Disclaimer</span></h3>
                </div>
                <p className="dl-section-body">
                  The IDMA Digital ID is a <strong>membership verification tool only</strong>. It does not grant any legal rights, press privileges, or government-recognized credentials. Misuse of the Digital ID for unauthorized purposes may result in immediate membership revocation and legal action.
                </p>
              </div>

              {/* Jurisdiction */}
              <div className="dl-section" id="dl-section-6">
                <div className="dl-section-header">
                  <div className="dl-section-icon">
                    <i className="fas fa-balance-scale" />
                  </div>
                  <h3 className="dl-section-title"><span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#c8972a' }}>Jurisdiction</span></h3>
                </div>
                <p className="dl-section-body">
                  All matters relating to this disclaimer and the use of the IDMA platform shall be governed by the laws of India, subject to the jurisdiction of courts in Punjab, India.
                </p>
              </div>

              {/* Footer note */}
              <div className="dl-footer-note">
                <i className="fas fa-info-circle" />
                <span>
                  For any clarifications regarding this disclaimer, please contact us at{' '}
                  <strong style={{ color:'#1e3a5f' }}>info@idma.org</strong>.
                  By using this platform, you acknowledge that you have read and understood this disclaimer.
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
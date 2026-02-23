// import { useState } from 'react';
// import Layout from '../components/Layout';
// import { api } from '../api/api';

// export default function Contact() {
//   const [alert, setAlert] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     try {
//       const res = await api.sendContact({
//         name: formData.get('name'), email: formData.get('email'),
//         phone: formData.get('phone'), subject: formData.get('subject'), message: formData.get('message'),
//       });
//       setAlert({ type: 'success', msg: res.message });
//       e.target.reset();
//     } catch (err) {
//       setAlert({ type: 'error', msg: err.message });
//     }
//     setLoading(false);
//     setTimeout(() => setAlert(null), 4000);
//   };

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-envelope"></i> Contact Us</h1><div className="breadcrumb"><a href="/">Home</a> / Contact Us</div></div></div>
//       <div className="contact-grid">
//         <div className="contact-info-card">
//           <h3><i className="fas fa-address-book"></i> Get in Touch</h3>
//           {[
//             { icon: 'fas fa-map-marker-alt', title: 'Address', text: 'AIMA Media Foundation\nMeerut, Uttar Pradesh, India' },
//             { icon: 'fas fa-phone', title: 'Phone', text: '+91 XXXXX XXXXX' },
//             { icon: 'fas fa-envelope', title: 'Email', text: 'info@aimamedia.org' },
//             { icon: 'fas fa-globe', title: 'Website', text: 'www.aimamedia.org' },
//             { icon: 'fas fa-clock', title: 'Working Hours', text: 'Monday - Saturday: 10:00 AM - 6:00 PM' },
//           ].map((item, i) => (
//             <div className="contact-item" key={i}><i className={item.icon}></i><div className="details"><h4>{item.title}</h4><p style={{ whiteSpace: 'pre-line' }}>{item.text}</p></div></div>
//           ))}
//         </div>
//         <div className="contact-form-card">
//           <h3><i className="fas fa-paper-plane"></i> Send us a Message</h3>
//           {alert && <div className={`alert alert-${alert.type}`}><i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i> {alert.msg}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group"><label><i className="fas fa-user"></i> Your Name</label><input name="name" type="text" placeholder="Enter your full name" required /></div>
//             <div className="form-group"><label><i className="fas fa-envelope"></i> Email</label><input name="email" type="email" placeholder="Enter your email" required /></div>
//             <div className="form-group"><label><i className="fas fa-phone"></i> Phone</label><input name="phone" type="tel" placeholder="Enter your phone number" /></div>
//             <div className="form-group"><label><i className="fas fa-tag"></i> Subject</label><input name="subject" type="text" placeholder="Enter subject" required /></div>
//             <div className="form-group"><label><i className="fas fa-comment-dots"></i> Message</label><textarea name="message" placeholder="Write your message here..." required></textarea></div>
//             <button type="submit" className="btn btn-primary btn-block" disabled={loading}>{loading ? <><i className="fas fa-spinner fa-spin"></i> Sending...</> : <><i className="fas fa-paper-plane"></i> Send Message</>}</button>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../api/api';

/* ── Global Styles (same token set as Login) ──────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    .font-playfair { font-family: 'Playfair Display', serif; }
    .font-dm       { font-family: 'DM Sans', sans-serif; }

    @keyframes fadeSlideDown {
      from { opacity:0; transform:translateY(-18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes spin   { to{transform:rotate(360deg)} }
    @keyframes pulseDot{ 0%,100%{opacity:1} 50%{opacity:.25} }

    .anim-down  { animation: fadeSlideDown .7s ease both; }
    .anim-up    { animation: fadeSlideUp   .7s ease both; }
    .anim-up-d1 { animation: fadeSlideUp   .7s .13s ease both; }
    .anim-fade  { animation: fadeIn        .35s ease both; }

    .spinner {
      width:18px; height:18px;
      border:2px solid rgba(255,255,255,.3);
      border-top-color:#fff;
      border-radius:50%;
      animation:spin .7s linear infinite;
      display:inline-block;
    }
    .pulse-dot { animation:pulseDot 2s ease-in-out infinite; }

    .grid-texture {
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }

    /* ── Page header ── */
    .contact-page-header {
      background: #1e3a5f;
      padding: 52px 0 40px;
      position: relative;
      overflow: hidden;
    }
    .contact-page-header::before {
      content:'';
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }
    .contact-page-header .container {
      position:relative; z-index:1;
      max-width:1200px; margin:0 auto; padding:0 32px;
    }
    .contact-page-header h1 {
      font-family:'Playfair Display',serif;
      font-size:clamp(36px,5vw,56px);
      font-weight:900; color:#fff;
      letter-spacing:-.5px; line-height:1.1;
      margin:0 0 10px;
    }
    .contact-page-header h1 em {
      font-style:italic; color:#c8972a;
    }
    .contact-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      letter-spacing:.5px;
    }
    .contact-breadcrumb a {
      color:rgba(255,255,255,.55);
      text-decoration:none;
      transition:color .2s;
    }
    .contact-breadcrumb a:hover { color:#c8972a; }
    .contact-breadcrumb span { color:#c8972a; margin:0 6px; }

    /* ── Layout grid ── */
    .contact-wrapper {
      font-family:'DM Sans',sans-serif;
      background:#fafaf8;
      min-height:60vh;
      padding:60px 32px;
    }
    .contact-inner {
      max-width:1100px; margin:0 auto;
      display:grid;
      grid-template-columns:1fr 1.45fr;
      gap:32px;
      align-items:start;
    }
    @media(max-width:820px){
      .contact-inner { grid-template-columns:1fr; }
    }

    /* ── Info card (navy panel — mirrors Login left panel) ── */
    .info-card {
      background:#1e3a5f;
      border-radius:10px;
      padding:40px 36px;
      position:relative;
      overflow:hidden;
      color:#fff;
    }
    .info-card::before {
      content:'';
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
      pointer-events:none;
    }
    .info-card-glow {
      position:absolute;
      border-radius:50%;
      pointer-events:none;
    }
    .info-card h3 {
      font-family:'Playfair Display',serif;
      font-size:28px; font-weight:700;
      color:#fff; margin:0 0 28px;
      position:relative; z-index:1;
    }
    .info-card h3 em { font-style:italic; color:#c8972a; }

    .info-label {
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a; display:flex;
      align-items:center; gap:8px;
      margin-bottom:20px; position:relative; z-index:1;
    }
    .info-label::after {
      content:''; flex:1; height:1px;
      background:rgba(200,151,42,.3);
    }

    .contact-item {
      display:flex; align-items:flex-start;
      gap:16px; padding:16px 0;
      border-bottom:1px solid rgba(255,255,255,.07);
      position:relative; z-index:1;
    }
    .contact-item:last-child { border-bottom:none; }

    .item-icon-wrap {
      width:40px; height:40px; border-radius:8px;
      background:rgba(200,151,42,.12);
      border:1px solid rgba(200,151,42,.25);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; color:#c8972a; font-size:15px;
    }
    .contact-item h4 {
      font-size:11px; font-weight:600;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#c8972a; margin:0 0 4px;
    }
    .contact-item p {
      font-size:14px; color:rgba(255,255,255,.65);
      margin:0; line-height:1.6;
      white-space:pre-line;
    }

    /* Stats row */
    .info-stats {
      display:grid; grid-template-columns:repeat(3,1fr);
      gap:8px; margin-top:28px;
      padding-top:24px;
      border-top:1px solid rgba(255,255,255,.07);
      position:relative; z-index:1;
    }
    .stat-box {
      text-align:center; padding:12px 4px;
      background:rgba(255,255,255,.04);
      border-radius:6px;
      border:1px solid rgba(255,255,255,.06);
    }
    .stat-num {
      font-family:'Playfair Display',serif;
      font-size:24px; font-weight:700;
      color:#c8972a; line-height:1;
    }
    .stat-lbl {
      font-size:9px; letter-spacing:2px;
      text-transform:uppercase;
      color:rgba(255,255,255,.35);
      margin-top:5px;
    }

    /* ── Form card ── */
    .form-card {
      background:#fff;
      border-radius:10px;
      padding:44px 40px;
      border:1px solid #dde2ea;
      box-shadow:0 2px 24px rgba(15,31,51,.06);
    }
    @media(max-width:600px){ .form-card { padding:28px 20px; } }

    .form-card h3 {
      font-family:'Playfair Display',serif;
      font-size:30px; font-weight:700;
      color:#0f1f33; margin:0 0 6px;
    }
    .form-card-sub {
      font-size:15px; color:#94a3b8;
      margin:0 0 28px; line-height:1.5;
    }

    .form-section-label {
      font-size:10px; font-weight:700;
      letter-spacing:2.5px; text-transform:uppercase;
      color:#c8972a; display:flex;
      align-items:center; gap:8px;
      margin-bottom:22px;
    }
    .form-section-label::after {
      content:''; flex:1; max-width:80px; height:1px;
      background:#dde2ea;
    }

    .form-row {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:18px;
    }
    @media(max-width:540px){ .form-row { grid-template-columns:1fr; } }

    .form-group { margin-bottom:20px; }

    .form-label {
      display:flex; align-items:center; gap:7px;
      font-size:12px; font-weight:600;
      letter-spacing:.6px; text-transform:uppercase;
      color:#64748b; margin-bottom:9px;
    }
    .form-label i { color:#1e3a5f; font-size:11px; }

    /* reuse Login's .field pattern */
    .c-field {
      width:100%; padding:14px 16px;
      border:1.5px solid #dde2ea;
      border-radius:6px; background:#fafaf8;
      font-family:'DM Sans',sans-serif;
      font-size:15px; color:#0f1f33;
      outline:none;
      transition:border-color .2s, box-shadow .2s, background .2s;
      box-sizing:border-box;
    }
    .c-field::placeholder { color:#b0bac6; font-size:14px; }
    .c-field:focus {
      border-color:#1e3a5f;
      background:#fff;
      box-shadow:0 0 0 3px rgba(30,58,95,.09);
    }
    textarea.c-field { resize:vertical; min-height:130px; }

    /* reuse Login's .btn-primary */
    .c-btn-primary {
      width:100%; padding:16px 28px;
      background:#1e3a5f; color:#fff;
      border:none; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:16px; font-weight:600;
      letter-spacing:.4px; cursor:pointer;
      display:flex; align-items:center; justify-content:center; gap:10px;
      position:relative; overflow:hidden;
      transition:background .25s, transform .12s;
      margin-top:8px;
    }
    .c-btn-primary::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .c-btn-primary:hover:not(:disabled)::after { opacity:1; }
    .c-btn-primary:hover:not(:disabled) { background:#162d4a; }
    .c-btn-primary:active:not(:disabled) { transform:scale(.985); }
    .c-btn-primary:disabled { opacity:.6; cursor:not-allowed; }

    /* ── Alert ── */
    .c-alert {
      display:flex; align-items:center; gap:10px;
      padding:14px 18px; border-radius:6px;
      font-size:14.5px; font-weight:500;
      margin-bottom:22px; border-left:4px solid;
    }
    .c-alert.success {
      background:#f0fdf4; color:#166534;
      border-color:#22c55e;
    }
    .c-alert.error {
      background:#eff6ff; color:#1e3a5f;
      border-color:#1e3a5f;
    }
  `}</style>
);

/* ── Icons (inline SVG — no external dep) ─────────────────── */
const Ic = {
  Map:    ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone:  ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.82-.82a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail:   ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Globe:  ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Clock:  ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  User:   ()=><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Tag:    ()=><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41L13.42 20.59a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Msg:    ()=><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Send:   ()=><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Check:  ()=><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  Warn:   ()=><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const infoItems = [
  { Icon: Ic.Map,   title: 'Address',       text: 'AIMA Media Foundation\nMeerut, Uttar Pradesh, India' },
  { Icon: Ic.Phone, title: 'Phone',          text: '+91 XXXXX XXXXX' },
  { Icon: Ic.Mail,  title: 'Email',          text: 'info@aimamedia.org' },
  { Icon: Ic.Globe, title: 'Website',        text: 'www.aimamedia.org' },
  { Icon: Ic.Clock, title: 'Working Hours',  text: 'Monday – Saturday: 10:00 AM – 6:00 PM' },
];

export default function Contact() {
  const [alert, setAlert]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    try {
      const res = await api.sendContact({
        name: fd.get('name'), email: fd.get('email'),
        phone: fd.get('phone'), subject: fd.get('subject'), message: fd.get('message'),
      });
      setAlert({ type: 'success', msg: res.message });
      e.target.reset();
    } catch (err) {
      setAlert({ type: 'error', msg: err.message });
    }
    setLoading(false);
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────── */}
      <div className="contact-page-header anim-down">
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
            <span style={{
              fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase',
              color:'#c8972a', fontFamily:'DM Sans,sans-serif',
              border:'1px solid rgba(200,151,42,.35)', background:'rgba(200,151,42,.08)',
              padding:'4px 12px', borderRadius:'3px',
              display:'flex', alignItems:'center', gap:'6px',
            }}>
              <span className="pulse-dot" style={{
                width:'7px', height:'7px', borderRadius:'50%',
                background:'#c8972a', display:'inline-block',
              }} />
              Contact
            </span>
          </div>
          <h1>
            Get in <em>Touch</em>
          </h1>
          <div className="contact-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            Contact Us
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────── */}
      <div className="contact-wrapper">
        <div className="contact-inner">

          {/* Left — Info Panel */}
          <div className="info-card anim-up">
            {/* decorative glows */}
            <div className="info-card-glow" style={{
              width:'240px', height:'240px',
              top:'-60px', left:'-60px',
              background:'radial-gradient(circle,rgba(200,151,42,.12) 0%,transparent 70%)',
            }} />
            <div className="info-card-glow" style={{
              width:'180px', height:'180px',
              bottom:'-40px', right:'-40px',
              background:'radial-gradient(circle,rgba(200,151,42,.08) 0%,transparent 70%)',
            }} />
            {/* right-edge gold line */}
            <div style={{
              position:'absolute', top:0, right:0,
              width:'1px', height:'100%',
              background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.45) 40%,rgba(200,151,42,.2) 70%,transparent)',
              pointerEvents:'none',
            }} />

            <div className="info-label">Contact Info</div>

            <h3>We'd love to <em>hear</em> from you</h3>

            {infoItems.map(({ Icon, title, text }, i) => (
              <div className="contact-item" key={i}>
                <div className="item-icon-wrap"><Icon /></div>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="info-stats">
              {[['50K+','Members'],['28','States'],['12+','Years']].map(([n,l]) => (
                <div className="stat-box" key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form Card */}
          <div className="form-card anim-up-d1">
            <div className="form-section-label">Send Message</div>
            <h3>Send us a Message</h3>
            <p className="form-card-sub">
              Fill in the form below and our team will get back to you within 24 hours.
            </p>

            {alert && (
              <div className={`c-alert anim-fade ${alert.type}`}>
                {alert.type === 'success' ? <Ic.Check /> : <Ic.Warn />}
                {alert.msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><Ic.User /> Your Name</label>
                  <input className="c-field" name="name" type="text" placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label className="form-label"><Ic.Mail /> Email</label>
                  <input className="c-field" name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><Ic.Phone /> Phone</label>
                  <input className="c-field" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group">
                  <label className="form-label"><Ic.Tag /> Subject</label>
                  <input className="c-field" name="subject" type="text" placeholder="Subject" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label"><Ic.Msg /> Message</label>
                <textarea className="c-field" name="message" placeholder="Write your message here…" required />
              </div>

              <button type="submit" className="c-btn-primary" disabled={loading}>
                {loading
                  ? <><div className="spinner" /> Sending…</>
                  : <><Ic.Send /> Send Message</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
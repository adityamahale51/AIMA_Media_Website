// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';
// import { api } from '../api/api';

// export default function NewsUpload() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [alert, setAlert] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = e => {
//     const file = e.target.files[0];
//     if (file) { const r = new FileReader(); r.onload = ev => setPreview(ev.target.result); r.readAsDataURL(file); }
//   };

//   const handleSubmit = async (e, submitAction = 'publish') => {
//     e.preventDefault();
//     if (!user) { window.alert('Please login first to upload news.'); navigate('/login'); return; }
//     setLoading(true);
//     const formData = new FormData(e.target);
//     formData.set('submitAction', submitAction);
//     try {
//       await api.createNews(formData);
//       const msg = submitAction === 'draft'
//         ? 'Article saved as draft! You can submit it later from My Articles.'
//         : 'Article submitted for review! It will be published after admin approval.';
//       setAlert({ type: 'success', msg });
//       e.target.reset(); setPreview(null); window.scrollTo(0, 0);
//     } catch (err) {
//       setAlert({ type: 'error', msg: err.message });
//     }
//     setLoading(false);
//   };

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-upload"></i> News Upload</h1><div className="breadcrumb"><a href="/">Home</a> / News Upload</div></div></div>
//       <div className="upload-container" style={{ paddingBottom: '80px' }}>
//         <div className="upload-card">
//           <h2><i className="fas fa-pen-fancy"></i> Create News Post</h2>
//           {alert && <div className={`alert alert-${alert.type}`}><i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i> {alert.msg}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group"><label><i className="fas fa-heading"></i> News Title / Headline</label><input name="title" type="text" placeholder="Enter news headline" required /></div>
//             <div className="form-row">
//               <div className="form-group"><label><i className="fas fa-tags"></i> Category</label>
//                 <select name="category" required><option value="">Select Category</option>{['Politics','Sports','Business','Education','Entertainment','Crime','Health','Technology','Local News','National','International','Other'].map(c => <option key={c}>{c}</option>)}</select>
//               </div>
//               <div className="form-group"><label><i className="fas fa-map-marker-alt"></i> State</label>
//                 <select name="state" required><option value="">Select State</option>{['India (National)','Uttar Pradesh','Madhya Pradesh','Rajasthan','Bihar','Punjab','Haryana','Delhi','Maharashtra','Karnataka','Gujarat','Orissa','Telangana','Other'].map(s => <option key={s}>{s}</option>)}</select>
//               </div>
//             </div>
//             <div className="form-group"><label><i className="fas fa-align-left"></i> News Content</label><textarea name="body" placeholder="Write your news article here..." style={{ minHeight: '200px' }} required></textarea></div>
//             <div className="form-group"><label><i className="fas fa-tags"></i> Tags (comma separated)</label><input name="tags" type="text" placeholder="e.g. politics, local, education" /></div>
//             <div className="form-group">
//               <label><i className="fas fa-image"></i> Upload Image</label>
//               <div className="file-upload" onClick={() => document.getElementById('newsImage').click()}>
//                 <i className="fas fa-cloud-upload-alt"></i><p>Click to upload image</p><p style={{ fontSize: '12px', marginTop: '5px' }}>Supports: JPG, PNG, GIF (Max 5MB)</p>
//                 <input type="file" id="newsImage" name="image" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
//               </div>
//               {preview && <div style={{ marginTop: '10px' }}><img src={preview} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: 'var(--radius)', border: '2px solid var(--border-color)' }} alt="Preview" /></div>}
//             </div>
//             <div className="form-group">
//               <label><i className="fas fa-microphone"></i> Audio (Optional)</label>
//               <div className="file-upload" onClick={() => document.getElementById('newsAudio').click()} style={{ padding: '20px' }}>
//                 <i className="fas fa-music" style={{ fontSize: '30px' }}></i><p>Click to upload audio file</p>
//                 <input type="file" id="newsAudio" name="audio" accept="audio/*" style={{ display: 'none' }} />
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
//               <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={loading}>{loading ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : <><i className="fas fa-paper-plane"></i> Submit for Review</>}</button>
//               <button type="button" className="btn btn-outline btn-lg" disabled={loading} onClick={(e) => { const form = e.target.closest('form'); if (form && form.checkValidity()) { handleSubmit({ preventDefault: () => {}, target: form }, 'draft'); } else { form && form.reportValidity(); } }}><i className="fas fa-save"></i> Save Draft</button>
//             </div>
//             <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '8px', textAlign: 'center' }}><i className="fas fa-info-circle"></i> All articles are reviewed before publishing. No auto-publishing.</p>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-dm        { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp  { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
  @keyframes shimmer { from { background-position:-200% center } to { background-position:200% center } }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes spin    { to { transform:rotate(360deg) } }
  @keyframes slideIn { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }

  .anim-1     { animation: fadeUp  .4s cubic-bezier(.22,.68,0,1.2) .05s both; }
  .anim-2     { animation: fadeUp  .4s cubic-bezier(.22,.68,0,1.2) .15s both; }
  .anim-3     { animation: fadeUp  .4s cubic-bezier(.22,.68,0,1.2) .25s both; }
  .anim-alert { animation: slideIn .3s cubic-bezier(.22,.68,0,1.2) both; }

  .shimmer-gold {
    background: linear-gradient(90deg,#c8972a 0%,#e8c97a 40%,#c8972a 70%,#e8c97a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }

  .gold-rule      { height:2px; background:linear-gradient(90deg,transparent,#c8972a 30%,#e8c97a 50%,#c8972a 70%,transparent); }
  .gold-rule-thin { height:1px; background:linear-gradient(90deg,transparent,rgba(200,151,42,.5) 40%,transparent); }

  /* ── Hero ── */
  .upload-hero {
    background: linear-gradient(135deg,#0a1929 0%,#1e3a5f 60%,#162d4a 100%);
    position:relative; overflow:hidden;
  }
  .upload-hero::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse 55% 70% at 85% 50%, rgba(200,151,42,.08) 0%, transparent 65%),
      radial-gradient(ellipse 40% 60% at 5%  80%, rgba(30,58,95,.5)    0%, transparent 60%);
    pointer-events:none;
  }
  .upload-hero::after {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(200,151,42,.035) 1px, transparent 1px),
      linear-gradient(90deg,rgba(200,151,42,.035) 1px, transparent 1px);
    background-size:52px 52px; pointer-events:none;
  }

  /* ── Form card ── */
  .form-card {
    background:#fff;
    border:1.5px solid #dde2ea;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 4px 32px rgba(30,58,95,.07);
    position:relative;
  }
  .form-card::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:4px;
    background:linear-gradient(to bottom,#1e3a5f,#c8972a,#e8c97a,#c8972a,#1e3a5f);
    border-radius:0 2px 2px 0;
  }

  .form-card-header {
    padding:28px 36px 24px;
    border-bottom:1px solid #dde2ea;
    background:linear-gradient(135deg,#fafaf8,#fff);
    display:flex; align-items:center; gap:16px;
  }
  .form-card-icon {
    width:48px; height:48px; border-radius:12px;
    background:linear-gradient(135deg,#1e3a5f,#2d5185);
    display:flex; align-items:center; justify-content:center;
    color:#c8972a; font-size:20px; flex-shrink:0;
    box-shadow:0 4px 14px rgba(30,58,95,.2);
  }
  .form-card-body { padding:32px 36px; }

  /* ── Alerts ── */
  .alert-box {
    display:flex; align-items:flex-start; gap:12px;
    padding:14px 18px; border-radius:10px;
    margin-bottom:24px; font-size:13.5px;
    font-family:'DM Sans',sans-serif; line-height:1.55;
  }
  .alert-success { background:rgba(45,122,74,.07); border:1.5px solid rgba(45,122,74,.25); color:#1a5c35; }
  .alert-error   { background:rgba(200,50,50,.07);  border:1.5px solid rgba(200,50,50,.25);  color:#8b1a1a; }
  .alert-icon {
    width:32px; height:32px; border-radius:8px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:15px;
  }
  .alert-success .alert-icon { background:rgba(45,122,74,.12); color:#2d7a4a; }
  .alert-error   .alert-icon { background:rgba(200,50,50,.12);  color:#c83232; }

  /* ── Form elements ── */
  .field-group { margin-bottom:20px; }
  .field-label {
    display:flex; align-items:center; gap:7px;
    font-size:12px; font-weight:600; letter-spacing:.8px; text-transform:uppercase;
    color:#1e3a5f; margin-bottom:8px; font-family:'DM Sans',sans-serif;
  }
  .field-label i { color:#c8972a; font-size:11px; }

  .field-input, .field-select, .field-textarea {
    width:100%; padding:11px 14px;
    border-radius:8px; border:1.5px solid #dde2ea;
    background:#fafaf8; color:#0f1f33;
    font-size:14px; font-family:'DM Sans',sans-serif;
    outline:none;
    transition:border-color .2s, box-shadow .2s, background .2s;
    -webkit-appearance:none; appearance:none;
  }
  .field-input:focus, .field-select:focus, .field-textarea:focus {
    border-color:#c8972a;
    box-shadow:0 0 0 3px rgba(200,151,42,.1);
    background:#fff;
  }
  .field-input::placeholder, .field-textarea::placeholder { color:#aab0bb; }
  .field-textarea { resize:vertical; min-height:200px; line-height:1.7; }

  .select-wrap { position:relative; }
  .select-wrap::after {
    content:''; position:absolute; right:14px; top:50%; transform:translateY(-50%);
    border:5px solid transparent; border-top-color:#c8972a; border-bottom:none;
    pointer-events:none;
  }

  .field-row { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }

  /* ── Upload zone ── */
  .upload-zone {
    border:2px dashed #dde2ea; border-radius:12px;
    padding:32px 20px; text-align:center; cursor:pointer;
    transition:all .25s; background:#fafaf8;
  }
  .upload-zone:hover {
    border-color:#c8972a; background:rgba(200,151,42,.04);
    transform:translateY(-1px); box-shadow:0 4px 18px rgba(200,151,42,.1);
  }
  .upload-zone-icon {
    width:52px; height:52px; border-radius:14px;
    background:linear-gradient(135deg,rgba(30,58,95,.08),rgba(200,151,42,.08));
    border:1.5px solid rgba(200,151,42,.2);
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 12px; font-size:22px; color:#c8972a; transition:all .25s;
  }
  .upload-zone:hover .upload-zone-icon {
    background:linear-gradient(135deg,#1e3a5f,#c8972a);
    border-color:transparent; color:#fff;
  }
  .upload-zone-title { font-size:14px; font-weight:600; color:#1e3a5f; font-family:'DM Sans',sans-serif; margin-bottom:4px; }
  .upload-zone-sub   { font-size:12px; color:#6b7a8d; font-family:'DM Sans',sans-serif; }

  .img-preview-wrap  { margin-top:14px; position:relative; display:inline-block; }
  .img-preview       { max-width:100%; max-height:220px; border-radius:10px; border:2px solid #dde2ea; box-shadow:0 4px 18px rgba(30,58,95,.1); display:block; }
  .img-preview-badge {
    position:absolute; top:8px; left:8px; padding:3px 8px; border-radius:4px;
    font-size:10px; font-weight:700; letter-spacing:1px;
    background:rgba(30,58,95,.75); color:#c8972a; backdrop-filter:blur(6px);
    font-family:'DM Sans',sans-serif;
  }

  /* ── Divider ── */
  .form-divider { display:flex; align-items:center; gap:14px; margin:28px 0; }
  .form-divider-line  { flex:1; height:1px; background:#dde2ea; }
  .form-divider-label { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#c8972a; font-family:'DM Sans',sans-serif; }

  /* ── Buttons ── */
  .btn-primary {
    display:flex; align-items:center; justify-content:center; gap:9px;
    padding:13px 24px; border-radius:8px; border:none; cursor:pointer;
    font-size:14px; font-weight:600; font-family:'DM Sans',sans-serif;
    background:linear-gradient(135deg,#1e3a5f,#2d5185); color:#fff;
    box-shadow:0 4px 18px rgba(30,58,95,.25); transition:all .25s;
    flex:1; letter-spacing:.2px;
  }
  .btn-primary:hover:not(:disabled) {
    background:linear-gradient(135deg,#152d4a,#1e3a5f);
    transform:translateY(-2px); box-shadow:0 8px 28px rgba(30,58,95,.35);
  }
  .btn-primary:disabled { opacity:.6; cursor:not-allowed; transform:none; }

  .btn-outline {
    display:flex; align-items:center; justify-content:center; gap:9px;
    padding:13px 24px; border-radius:8px; cursor:pointer;
    font-size:14px; font-weight:600; font-family:'DM Sans',sans-serif;
    background:transparent; color:#1e3a5f; border:1.5px solid #dde2ea;
    transition:all .25s; letter-spacing:.2px;
  }
  .btn-outline:hover:not(:disabled) {
    border-color:#c8972a; color:#c8972a;
    background:rgba(200,151,42,.05); transform:translateY(-1px);
  }
  .btn-outline:disabled { opacity:.5; cursor:not-allowed; }

  .btn-spinner {
    width:16px; height:16px; border-radius:50%;
    border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff;
    animation:spin 1s linear infinite; flex-shrink:0;
  }

  /* ── Info note ── */
  .info-note {
    display:flex; align-items:center; gap:8px; justify-content:center;
    font-size:12px; color:#6b7a8d; font-family:'DM Sans',sans-serif; margin-top:14px;
    padding:10px 16px; border-radius:8px; background:#f3f5f8; border:1px solid #dde2ea;
  }
  .info-note i { color:#c8972a; }

  /* ── Sidebar cards ── */
  .tip-card {
    background:#fff; border:1.5px solid #dde2ea;
    border-radius:12px; padding:20px; position:relative; overflow:hidden;
  }
  .tip-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,#1e3a5f,#c8972a,#e8c97a);
  }
  .tip-title {
    font-family:'Cormorant Garamond',serif;
    font-size:17px; font-weight:700; color:#0f1f33;
    margin-bottom:14px; display:flex; align-items:center; gap:8px;
  }
  .tip-item {
    display:flex; align-items:flex-start; gap:10px;
    padding:8px 0; border-bottom:1px solid #f3f5f8;
    font-size:12.5px; color:#4a5568; font-family:'DM Sans',sans-serif; line-height:1.6;
  }
  .tip-item:last-child { border-bottom:none; padding-bottom:0; }
  .tip-item i { color:#c8972a; font-size:11px; margin-top:3px; flex-shrink:0; }

  /* ── Step flow ── */
  .step-row   { display:flex; gap:12px; padding-bottom:14px; position:relative; }
  .step-line  { position:absolute; left:13px; top:28px; bottom:0; width:1px; background:#dde2ea; }
  .step-circle {
    width:28px; height:28px; border-radius:50%;
    border:2px solid #c8972a;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700;
    flex-shrink:0; z-index:1; font-family:'DM Sans',sans-serif;
  }
  .step-circle.active { background:#c8972a; color:#fff; }
  .step-circle.idle   { background:#fff;    color:#c8972a; }

  @media (max-width:900px) {
    .upload-layout { grid-template-columns:1fr !important; }
    .form-card-header { padding:20px 20px 18px; }
    .form-card-body   { padding:20px; }
  }
`;

const CATEGORIES = [
  'Politics','Sports','Business','Education','Entertainment',
  'Crime','Health','Technology','Local News','National','International','Other',
];
const STATES = [
  'India (National)','Uttar Pradesh','Madhya Pradesh','Rajasthan','Bihar',
  'Punjab','Haryana','Delhi','Maharashtra','Karnataka','Gujarat','Orissa','Telangana','Other',
];
const STEPS = [
  { num:1, label:'You Submit',       desc:'Your article is received by our system.' },
  { num:2, label:'Editorial Review', desc:'Our team checks for quality & accuracy.' },
  { num:3, label:'Published',        desc:'Approved articles go live on the platform.' },
];
const TIPS = [
  'Use a clear, factual headline — avoid clickbait.',
  'Answer Who, What, When, Where, Why in the first paragraph.',
  'Keep sentences short and paragraphs scannable.',
  'Add 3–6 relevant tags to improve discoverability.',
  'High-resolution images (min 800px wide) look best.',
];

export default function NewsUpload() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [alert, setAlert]         = useState(null);
  const [preview, setPreview]     = useState(null);
  const [audioName, setAudioName] = useState('');
  const [loading, setLoading]     = useState(false);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const r = new FileReader();
      r.onload = ev => setPreview(ev.target.result);
      r.readAsDataURL(file);
    }
  };

  const handleAudioChange = e => {
    const file = e.target.files[0];
    if (file) setAudioName(file.name);
  };

  const handleSubmit = async (e, submitAction = 'publish') => {
    e.preventDefault();
    if (!user) { window.alert('Please login first to upload news.'); navigate('/login'); return; }
    setLoading(true);
    const formData = new FormData(e.target);
    formData.set('submitAction', submitAction);
    try {
      await api.createNews(formData);
      const msg = submitAction === 'draft'
        ? 'Article saved as draft! You can submit it later from My Articles.'
        : 'Article submitted for review! It will be published after admin approval.';
      setAlert({ type: 'success', msg });
      e.target.reset();
      setPreview(null);
      setAudioName('');
      window.scrollTo(0, 0);
    } catch (err) {
      setAlert({ type: 'error', msg: err.message });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <section className="upload-hero font-dm">
        <div className="max-w-7xl mx-auto px-5 py-12 relative" style={{ zIndex: 1 }}>
          <div className="anim-1">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <div className="gold-rule" style={{ width:32 }} />
              <span style={{
                fontSize:10, fontWeight:700, letterSpacing:'2.5px',
                textTransform:'uppercase', color:'rgba(200,151,42,.8)', fontFamily:'DM Sans,sans-serif',
              }}>
                Content Studio
              </span>
            </div>

            <h1 className="font-cormorant" style={{ fontSize:'clamp(34px,5vw,50px)', fontWeight:700, color:'#fff', lineHeight:1.1, margin:'0 0 10px' }}>
              Upload{' '}
              <em className="shimmer-gold" style={{ fontStyle:'italic' }}>Your Story</em>
            </h1>
            <p className="font-dm" style={{ fontSize:14, color:'rgba(255,255,255,.45)', maxWidth:440, lineHeight:1.75, margin:'0 0 18px' }}>
              Share breaking news, investigations, and stories with India's verified media network.
            </p>

            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'rgba(255,255,255,.3)', fontFamily:'DM Sans,sans-serif' }}>
              <a href="/"
                style={{ color:'rgba(255,255,255,.4)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c8972a'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.4)'; }}
              >
                Home
              </a>
              <span style={{ color:'rgba(200,151,42,.4)' }}>›</span>
              <span style={{ color:'rgba(255,255,255,.55)' }}>News Upload</span>
            </div>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* ── Body ── */}
      <main className="max-w-7xl mx-auto px-5 font-dm" style={{ paddingTop:40, paddingBottom:80 }}>
        <div
          className="upload-layout"
          style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:28, alignItems:'start' }}
        >

          {/* ═══ FORM ═══ */}
          <div className="form-card anim-2">

            {/* Header */}
            <div className="form-card-header">
              <div className="form-card-icon">
                <i className="fas fa-pen-fancy" />
              </div>
              <div>
                <h2 className="font-cormorant" style={{ fontSize:24, fontWeight:700, color:'#0f1f33', margin:0, lineHeight:1.15 }}>
                  Create News Post
                </h2>
                <p style={{ fontSize:12.5, color:'#6b7a8d', margin:'4px 0 0', fontFamily:'DM Sans,sans-serif' }}>
                  Fill in the details below to submit your article
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="form-card-body">

              {/* Alert */}
              {alert && (
                <div className={`alert-box alert-${alert.type} anim-alert`}>
                  <div className="alert-icon">
                    <i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation-triangle'}`} />
                  </div>
                  <div>
                    <p style={{ fontWeight:600, margin:'0 0 3px', fontSize:13 }}>
                      {alert.type === 'success' ? 'Success!' : 'Something went wrong'}
                    </p>
                    <p style={{ margin:0, fontSize:13 }}>{alert.msg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="field-group">
                  <label className="field-label">
                    <i className="fas fa-heading" /> News Title / Headline
                  </label>
                  <input
                    name="title" type="text" className="field-input"
                    placeholder="Enter a compelling headline…" required
                  />
                </div>

                {/* Category + State */}
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label"><i className="fas fa-tags" /> Category</label>
                    <div className="select-wrap">
                      <select name="category" className="field-select" required>
                        <option value="">Select category…</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label"><i className="fas fa-map-marker-alt" /> State</label>
                    <div className="select-wrap">
                      <select name="state" className="field-select" required>
                        <option value="">Select state…</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="field-group">
                  <label className="field-label"><i className="fas fa-align-left" /> News Content</label>
                  <textarea
                    name="body" className="field-textarea"
                    placeholder="Write your news article here. Be clear, factual, and objective…"
                    required
                  />
                </div>

                {/* Tags */}
                <div className="field-group">
                  <label className="field-label">
                    <i className="fas fa-hashtag" /> Tags
                    <span style={{ fontWeight:400, textTransform:'none', letterSpacing:0, color:'#aab0bb', marginLeft:4 }}>
                      (comma separated)
                    </span>
                  </label>
                  <input
                    name="tags" type="text" className="field-input"
                    placeholder="e.g. politics, local, education"
                  />
                </div>

                {/* Media divider */}
                <div className="form-divider">
                  <div className="form-divider-line" />
                  <span className="form-divider-label">Media Attachments</span>
                  <div className="form-divider-line" />
                </div>

                {/* Image upload */}
                <div className="field-group">
                  <label className="field-label"><i className="fas fa-image" /> Cover Image</label>
                  <div className="upload-zone" onClick={() => document.getElementById('newsImage').click()}>
                    <div className="upload-zone-icon"><i className="fas fa-cloud-upload-alt" /></div>
                    <div className="upload-zone-title">Click to upload image</div>
                    <div className="upload-zone-sub">JPG, PNG, GIF · Max 5 MB</div>
                    <input
                      type="file" id="newsImage" name="image" accept="image/*"
                      style={{ display:'none' }} onChange={handleImageChange}
                    />
                  </div>
                  {preview && (
                    <div className="img-preview-wrap">
                      <img src={preview} className="img-preview" alt="Preview" />
                      <span className="img-preview-badge">PREVIEW</span>
                    </div>
                  )}
                </div>

                {/* Audio upload */}
                <div className="field-group">
                  <label className="field-label">
                    <i className="fas fa-microphone" /> Audio
                    <span style={{ fontWeight:400, textTransform:'none', letterSpacing:0, color:'#aab0bb', marginLeft:4 }}>
                      (optional)
                    </span>
                  </label>
                  <div
                    className="upload-zone"
                    style={{ padding:'24px 20px' }}
                    onClick={() => document.getElementById('newsAudio').click()}
                  >
                    <div className="upload-zone-icon" style={{ width:40, height:40, fontSize:18 }}>
                      <i className="fas fa-music" />
                    </div>
                    {audioName
                      ? (
                        <div className="upload-zone-title" style={{ color:'#2d7a4a' }}>
                          <i className="fas fa-check-circle" style={{ color:'#2d7a4a', marginRight:6 }} />
                          {audioName}
                        </div>
                      ) : (
                        <>
                          <div className="upload-zone-title">Click to upload audio</div>
                          <div className="upload-zone-sub">MP3, WAV, OGG</div>
                        </>
                      )
                    }
                    <input
                      type="file" id="newsAudio" name="audio" accept="audio/*"
                      style={{ display:'none' }} onChange={handleAudioChange}
                    />
                  </div>
                </div>

                {/* Submit divider */}
                <div className="form-divider">
                  <div className="form-divider-line" />
                  <span className="form-divider-label">Submit</span>
                  <div className="form-divider-line" />
                </div>

                {/* Action buttons */}
                <div style={{ display:'flex', gap:12 }}>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading
                      ? <><div className="btn-spinner" /> Submitting…</>
                      : <><i className="fas fa-paper-plane" /> Submit for Review</>
                    }
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    disabled={loading}
                    onClick={e => {
                      const form = e.target.closest('form');
                      if (form && form.checkValidity()) {
                        handleSubmit({ preventDefault: () => {}, target: form }, 'draft');
                      } else {
                        form && form.reportValidity();
                      }
                    }}
                  >
                    <i className="fas fa-save" /> Save Draft
                  </button>
                </div>

                <div className="info-note">
                  <i className="fas fa-shield-alt" />
                  All articles are reviewed by our editorial team before publishing. No auto-publishing.
                </div>

              </form>
            </div>
          </div>

          {/* ═══ SIDEBAR ═══ */}
          <div className="anim-3" style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Submission flow */}
            <div className="tip-card">
              <div className="tip-title">
                <span style={{
                  width:32, height:32, borderRadius:8,
                  background:'rgba(200,151,42,.1)',
                  border:'1px solid rgba(200,151,42,.25)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#c8972a', fontSize:14,
                }}>
                  <i className="fas fa-info-circle" />
                </span>
                Submission Flow
              </div>

              {STEPS.map((s, i) => (
                <div key={i} className="step-row">
                  {i < STEPS.length - 1 && <div className="step-line" />}
                  <div className={`step-circle ${i === 0 ? 'active' : 'idle'}`}>
                    {s.num}
                  </div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:13, color:'#0f1f33', margin:'4px 0 2px', fontFamily:'DM Sans,sans-serif' }}>
                      {s.label}
                    </p>
                    <p style={{ fontSize:12, color:'#6b7a8d', margin:0, fontFamily:'DM Sans,sans-serif', lineHeight:1.55 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Writing tips */}
            <div className="tip-card">
              <div className="tip-title">
                <span style={{
                  width:32, height:32, borderRadius:8,
                  background:'rgba(30,58,95,.08)',
                  border:'1px solid rgba(30,58,95,.15)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#1e3a5f', fontSize:14,
                }}>
                  <i className="fas fa-lightbulb" />
                </span>
                Writing Tips
              </div>
              {TIPS.map((t, i) => (
                <div key={i} className="tip-item">
                  <i className="fas fa-check-circle" />
                  {t}
                </div>
              ))}
            </div>

            {/* Draft reminder */}
            <div style={{
              padding:'16px 18px', borderRadius:10,
              background:'linear-gradient(135deg,#1e3a5f,#243f6a)',
              border:'1px solid rgba(200,151,42,.2)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <i className="fas fa-save" style={{ color:'#c8972a', fontSize:14 }} />
                <span style={{ fontSize:13, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>
                  Save a Draft First
                </span>
              </div>
              <p style={{ fontSize:12, color:'rgba(255,255,255,.55)', lineHeight:1.65, margin:0, fontFamily:'DM Sans,sans-serif' }}>
                Not ready? Use{' '}
                <strong style={{ color:'rgba(200,151,42,.8)' }}>Save Draft</strong>
                {' '}to preserve your work and submit later from My Articles.
              </p>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}
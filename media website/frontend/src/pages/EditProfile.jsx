// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';

// export default function EditProfile() {
//   const { user, updateProfile } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({});
//   const [alert, setAlert] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!user) { navigate('/login'); return; }
//     setForm({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '', mobile: user.mobile || '', state: user.state || '', city: user.city || '', organization: user.organization || '', designation: user.designation || '', bio: user.bio || '', linkedin: user.linkedin || '', website: user.website || '', skills: user.skills || '' });
//   }, [user, navigate]);

//   if (!user) return null;
//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
//   const fullName = `${form.firstName} ${form.lastName}`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = await updateProfile(form);
//     setLoading(false);
//     if (result.success) { setAlert({ type: 'success', msg: 'Profile updated successfully!' }); window.scrollTo(0, 0); }
//     else setAlert({ type: 'error', msg: result.message });
//   };

//   const states = ['Uttar Pradesh','Madhya Pradesh','Rajasthan','Bihar','Punjab','Haryana','Delhi','Maharashtra','Karnataka','Gujarat','Chandigarh','Andhra Pradesh','Tamil Nadu','West Bengal','Orissa','Telangana','Other'];
//   const designations = ['Editor','Reporter','Journalist','Photographer','Cameraman','Anchor','Bureau Chief','Freelancer','Other'];

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-edit"></i> Edit Profile</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/dashboard">Dashboard</Link> / Edit Profile</div></div></div>
//       <div className="upload-container" style={{ paddingBottom: '80px' }}>
//         <div className="upload-card">
//           <h2><i className="fas fa-user-edit"></i> Update Your Profile</h2>
//           {alert && <div className={`alert alert-${alert.type}`}><i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i> {alert.msg}</div>}
//           <div style={{ textAlign: 'center', marginBottom: '25px' }}>
//             <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px', border: '3px solid var(--primary)' }}>
//               <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=1a237e&color=fff&size=200`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group"><label><i className="fas fa-user"></i> First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} required /></div>
//               <div className="form-group"><label>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} required /></div>
//             </div>
//             <div className="form-group"><label><i className="fas fa-envelope"></i> Email Address</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
//             <div className="form-group"><label><i className="fas fa-phone"></i> Mobile Number</label><input name="mobile" type="tel" value={form.mobile} onChange={handleChange} required /></div>
//             <div className="form-row">
//               <div className="form-group"><label><i className="fas fa-map-marker-alt"></i> State</label>
//                 <select name="state" value={form.state} onChange={handleChange} required><option value="">Select State</option>{states.map(s => <option key={s}>{s}</option>)}</select>
//               </div>
//               <div className="form-group"><label>City / District</label><input name="city" value={form.city} onChange={handleChange} required /></div>
//             </div>
//             <div className="form-group"><label><i className="fas fa-building"></i> Media Organization</label><input name="organization" value={form.organization} onChange={handleChange} /></div>
//             <div className="form-group"><label><i className="fas fa-briefcase"></i> Designation</label>
//               <select name="designation" value={form.designation} onChange={handleChange}><option value="">Select Designation</option>{designations.map(d => <option key={d}>{d}</option>)}</select>
//             </div>
//             <div className="form-group"><label><i className="fas fa-pen"></i> Bio / About</label><textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Write something about yourself..."></textarea></div>
//             <div className="form-group"><label><i className="fab fa-linkedin"></i> LinkedIn Profile</label><input name="linkedin" type="url" value={form.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" /></div>
//             <div className="form-group"><label><i className="fas fa-globe"></i> Website</label><input name="website" type="url" value={form.website || ''} onChange={handleChange} placeholder="https://yourwebsite.com" /></div>
//             <div className="form-group"><label><i className="fas fa-tools"></i> Skills</label><input name="skills" value={form.skills || ''} onChange={handleChange} placeholder="e.g. Journalism, Photography, Editing" /></div>
//             <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
//               <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={loading}>{loading ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Changes</>}</button>
//               <Link to="/profile" className="btn btn-outline btn-lg" style={{ flex: 1, textAlign: 'center' }}><i className="fas fa-times"></i> Cancel</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }



import { useState, useEffect } from 'react';
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

    .ep-anim-down  { animation:fadeSlideDown .7s ease both; }
    .ep-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .ep-anim-up-d1 { animation:fadeSlideUp   .7s .1s ease both; }
    .ep-anim-up-d2 { animation:fadeSlideUp   .7s .2s ease both; }
    .ep-anim-fade  { animation:fadeIn .35s ease both; }
    .ep-pulse      { animation:pulseDot 2s ease-in-out infinite; }

    /* ── Page header ── */
    .ep-page-header {
      background:#1e3a5f;
      padding:44px 0 34px;
      position:relative; overflow:hidden;
    }
    .ep-page-header::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .ep-header-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .ep-header-inner {
      max-width:1200px; margin:0 auto;
      padding:0 24px; position:relative; z-index:1;
    }
    .ep-header-eyebrow {
      display:inline-flex; align-items:center; gap:7px;
      padding:3px 12px; border-radius:20px;
      border:1px solid rgba(200,151,42,.35);
      background:rgba(200,151,42,.08);
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase;
      color:#c8972a; margin-bottom:10px;
    }
    .ep-header-title {
      font-family:'Playfair Display',serif;
      font-size:clamp(30px,4vw,46px);
      font-weight:900; color:#fff;
      line-height:1.1; margin:0 0 10px;
    }
    .ep-header-title em { font-style:italic; color:#c8972a; }
    .ep-breadcrumb {
      font-family:'DM Sans',sans-serif;
      font-size:13px; color:rgba(255,255,255,.45);
      display:flex; align-items:center; gap:6px;
    }
    .ep-breadcrumb a { color:rgba(255,255,255,.55); text-decoration:none; transition:color .2s; }
    .ep-breadcrumb a:hover { color:#c8972a; }
    .ep-breadcrumb span { color:rgba(200,151,42,.5); }

    /* ── Body ── */
    .ep-body {
      background:#fafaf8;
      min-height:60vh;
      padding:36px 24px 60px;
      font-family:'DM Sans',sans-serif;
    }
    .ep-container {
      max-width:860px; margin:0 auto;
      display:grid;
      grid-template-columns:220px 1fr;
      gap:24px; align-items:start;
    }
    @media(max-width:760px){
      .ep-container { grid-template-columns:1fr; }
    }

    /* ── Left sidebar card (avatar + quick info) ── */
    .ep-sidebar-card {
      background:#1e3a5f;
      border-radius:10px; padding:28px 20px;
      position:relative; overflow:hidden;
      text-align:center;
    }
    .ep-sidebar-card::before {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px; pointer-events:none;
    }
    .ep-sidebar-glow {
      position:absolute; border-radius:50%; pointer-events:none;
    }
    .ep-avatar-wrap {
      width:90px; height:90px; border-radius:50%;
      border:3px solid rgba(200,151,42,.5);
      overflow:hidden; margin:0 auto 14px;
      position:relative; z-index:1;
      background:#162d4a;
    }
    .ep-avatar-wrap img { width:100%; height:100%; object-fit:cover; }
    .ep-sidebar-name {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700;
      color:#fff; margin:0 0 4px;
      position:relative; z-index:1;
    }
    .ep-sidebar-role {
      font-size:11px; font-weight:600;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#c8972a; margin-bottom:18px;
      position:relative; z-index:1;
    }
    .ep-sidebar-divider {
      height:1px; background:rgba(255,255,255,.08);
      margin:0 0 16px; position:relative; z-index:1;
    }
    .ep-sidebar-tip {
      font-size:12px; color:rgba(255,255,255,.45);
      line-height:1.6; position:relative; z-index:1;
    }

    /* nav links inside sidebar */
    .ep-sidebar-nav { margin-top:16px; position:relative; z-index:1; }
    .ep-sidebar-nav a {
      display:flex; align-items:center; gap:10px;
      padding:10px 14px; border-radius:6px;
      font-size:13px; font-weight:500;
      color:rgba(255,255,255,.55); text-decoration:none;
      transition:background .18s, color .18s;
      margin-bottom:4px;
    }
    .ep-sidebar-nav a:hover {
      background:rgba(255,255,255,.07);
      color:#fff;
    }
    .ep-sidebar-nav a i { color:#c8972a; width:14px; text-align:center; }

    /* ── Form card ── */
    .ep-form-card {
      background:#fff;
      border:1px solid #dde2ea;
      border-radius:10px;
      box-shadow:0 2px 16px rgba(15,31,51,.05);
    }

    .ep-form-section {
      padding:24px 28px;
      border-bottom:1px solid #f1f5f9;
    }
    .ep-form-section:last-child { border-bottom:none; }

    .ep-section-label {
      display:flex; align-items:center; gap:10px;
      margin-bottom:18px;
    }
    .ep-section-icon {
      width:34px; height:34px; border-radius:8px;
      background:#1e3a5f;
      display:flex; align-items:center; justify-content:center;
      font-size:13px; color:#c8972a; flex-shrink:0;
    }
    .ep-section-title {
      font-family:'Playfair Display',serif;
      font-size:17px; font-weight:700;
      color:#0f1f33; margin:0;
    }
    .ep-section-title em { font-style:italic; color:#c8972a; }

    /* form rows */
    .ep-form-row {
      display:grid; grid-template-columns:1fr 1fr; gap:16px;
    }
    @media(max-width:540px){ .ep-form-row { grid-template-columns:1fr; } }

    .ep-form-group { margin-bottom:18px; }
    .ep-form-group:last-child { margin-bottom:0; }

    .ep-label {
      display:flex; align-items:center; gap:7px;
      font-size:12px; font-weight:600;
      letter-spacing:.6px; text-transform:uppercase;
      color:#64748b; margin-bottom:8px;
    }
    .ep-label i { color:#1e3a5f; font-size:11px; }

    .ep-field {
      width:100%; padding:13px 15px;
      border:1.5px solid #dde2ea;
      border-radius:6px; background:#fafaf8;
      font-family:'DM Sans',sans-serif;
      font-size:14.5px; color:#0f1f33;
      outline:none;
      transition:border-color .2s, box-shadow .2s, background .2s;
      box-sizing:border-box;
    }
    .ep-field::placeholder { color:#b0bac6; font-size:13.5px; }
    .ep-field:focus {
      border-color:#1e3a5f;
      background:#fff;
      box-shadow:0 0 0 3px rgba(30,58,95,.09);
    }
    select.ep-field { appearance:none; cursor:pointer; }
    textarea.ep-field { resize:vertical; min-height:110px; }

    /* ── Alert ── */
    .ep-alert {
      display:flex; align-items:center; gap:10px;
      padding:14px 18px; border-radius:6px;
      font-size:14px; font-weight:500;
      border-left:4px solid; margin-bottom:0;
    }
    .ep-alert.success { background:#f0fdf4; color:#166534; border-color:#22c55e; }
    .ep-alert.error   { background:#eff6ff; color:#1e3a5f; border-color:#1e3a5f; }

    /* ── Action bar (sticky bottom of form) ── */
    .ep-action-bar {
      padding:20px 28px;
      display:flex; gap:12px;
      border-top:1px solid #f1f5f9;
    }
    .ep-btn-primary {
      flex:1; padding:15px 28px;
      background:#1e3a5f; color:#fff;
      border:none; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:15px; font-weight:600;
      letter-spacing:.4px; cursor:pointer;
      display:flex; align-items:center; justify-content:center; gap:10px;
      position:relative; overflow:hidden;
      transition:background .25s, transform .12s;
    }
    .ep-btn-primary::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .ep-btn-primary:hover:not(:disabled)::after { opacity:1; }
    .ep-btn-primary:hover:not(:disabled) { background:#162d4a; }
    .ep-btn-primary:active:not(:disabled) { transform:scale(.985); }
    .ep-btn-primary:disabled { opacity:.6; cursor:not-allowed; }

    .ep-btn-ghost {
      flex:1; padding:15px 28px;
      background:#fff; color:#1e3a5f;
      border:1.5px solid #dde2ea; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:15px; font-weight:600;
      letter-spacing:.4px; cursor:pointer;
      display:flex; align-items:center; justify-content:center; gap:10px;
      text-decoration:none;
      transition:border-color .2s, background .2s;
    }
    .ep-btn-ghost:hover {
      border-color:#1e3a5f;
      background:#f8fafc;
    }

    .ep-spinner {
      width:17px; height:17px;
      border:2px solid rgba(255,255,255,.3);
      border-top-color:#fff; border-radius:50%;
      animation:spin .7s linear infinite;
      display:inline-block;
    }
  `}</style>
);

/* ── Tiny icons ───────────────────────────────────────────── */
const Ic = {
  Check: ()=><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  Warn:  ()=><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Save:  ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  X:     ()=><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
};

const states = ['Uttar Pradesh','Madhya Pradesh','Rajasthan','Bihar','Punjab','Haryana','Delhi','Maharashtra','Karnataka','Gujarat','Chandigarh','Andhra Pradesh','Tamil Nadu','West Bengal','Orissa','Telangana','Other'];
const designations = ['Editor','Reporter','Journalist','Photographer','Cameraman','Anchor','Bureau Chief','Freelancer','Other'];

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({});
  const [alert, setAlert]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    setForm({
      firstName: user.firstName || '', lastName: user.lastName || '',
      email: user.email || '', mobile: user.mobile || '',
      state: user.state || '', district: user.district || '',
      organization: user.organization || '', designation: user.designation || '',
      bio: user.bio || '', linkedin: user.linkedin || '',
      website: user.website || '', skills: user.skills || '',
    });
    setPreview(user.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent((user.firstName||'') + ' ' + (user.lastName||''))}&background=162d4a&color=c8972a&size=200`);
  }, [user, navigate]);

  if (!user) return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };
  const fullName = `${form.firstName || ''} ${form.lastName || ''}`.trim() || 'User';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach(key => {
        if (form[key] !== undefined && form[key] !== null) fd.append(key, form[key]);
      });
      if (file) fd.append('profilePhoto', file);
      const result = await updateProfile(fd);
      setLoading(false);
      if (result.success) {
        setAlert({ type: 'success', msg: 'Profile updated successfully!' });
        window.scrollTo(0, 0);
      } else {
        setAlert({ type: 'error', msg: result.message });
      }
    } catch (err) {
      setLoading(false);
      setAlert({ type: 'error', msg: err.message });
    }
  };

  return (
    <Layout>
      <GlobalStyles />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="ep-page-header ep-anim-down">
        <div className="ep-header-glow" style={{
          width:'300px', height:'300px', top:'-70px', left:'-70px',
          background:'radial-gradient(circle,rgba(200,151,42,.13) 0%,transparent 70%)',
        }} />
        <div className="ep-header-glow" style={{
          width:'180px', height:'180px', bottom:'-40px', right:'-40px',
          background:'radial-gradient(circle,rgba(200,151,42,.07) 0%,transparent 70%)',
        }} />
        <div style={{
          position:'absolute', top:0, right:0, width:'1px', height:'100%',
          background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.4) 45%,rgba(200,151,42,.15) 75%,transparent)',
          pointerEvents:'none',
        }} />

        <div className="ep-header-inner">
          <div className="ep-header-eyebrow">
            <span className="ep-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
            Member Portal
          </div>
          <h1 className="ep-header-title">Edit <em>Profile</em></h1>
          <nav className="ep-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/dashboard">Dashboard</Link>
            <span>/</span>
            Edit Profile
          </nav>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="ep-body">
        <div className="ep-container">

          {/* Left sidebar */}
          <div className="ep-sidebar-card ep-anim-up">
            <div className="ep-sidebar-glow" style={{
              width:'180px', height:'180px', top:'-40px', left:'-40px',
              background:'radial-gradient(circle,rgba(200,151,42,.12) 0%,transparent 70%)',
            }} />
            <div className="ep-avatar-wrap">
              <img
                src={preview || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=162d4a&color=c8972a&size=200`}
                alt="Profile"
                onError={e => { e.target.src = 'https://aimamedia.org/img/noimage.jpg'; }}
              />
            </div>
            <div style={{ marginTop:12, textAlign:'center' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="ep-sidebar-name">{fullName}</div>
            <div className="ep-sidebar-role">{form.designation || 'Member'}</div>
            <div className="ep-sidebar-divider" />
            <p className="ep-sidebar-tip">Your avatar updates automatically from your name.</p>

            <nav className="ep-sidebar-nav">
              <Link to="/profile"><i className="fas fa-user" /> View Profile</Link>
              <Link to="/dashboard"><i className="fas fa-th-large" /> Dashboard</Link>
              <Link to="/digital-id"><i className="fas fa-id-card" /> Digital ID</Link>
            </nav>
          </div>

          {/* Form card */}
          <div className="ep-form-card ep-anim-up-d1">

            {/* Alert */}
            {alert && (
              <div style={{ padding:'16px 28px', borderBottom:'1px solid #f1f5f9' }}>
                <div className={`ep-alert ep-anim-fade ${alert.type}`}>
                  {alert.type === 'success' ? <Ic.Check /> : <Ic.Warn />}
                  {alert.msg}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* ── Personal Info ── */}
              <div className="ep-form-section">
                <div className="ep-section-label">
                  <div className="ep-section-icon"><i className="fas fa-user" /></div>
                  <h3 className="ep-section-title">Personal <em>Info</em></h3>
                </div>

                <div className="ep-form-row">
                  <div className="ep-form-group">
                    <label className="ep-label"><i className="fas fa-user" /> First Name</label>
                    <input className="ep-field" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" required />
                  </div>
                  <div className="ep-form-group">
                    <label className="ep-label">Last Name</label>
                    <input className="ep-field" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required />
                  </div>
                </div>

                <div className="ep-form-group">
                  <label className="ep-label"><i className="fas fa-envelope" /> Email Address</label>
                  <input className="ep-field" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="ep-form-group" style={{ marginBottom:0 }}>
                  <label className="ep-label"><i className="fas fa-phone" /> Mobile Number</label>
                  <input className="ep-field" name="mobile" type="tel" value={form.mobile} onChange={handleChange} required />
                </div>
              </div>

              {/* ── Location ── */}
              <div className="ep-form-section">
                <div className="ep-section-label">
                  <div className="ep-section-icon"><i className="fas fa-map-marker-alt" /></div>
                  <h3 className="ep-section-title">Location <em>Details</em></h3>
                </div>

                <div className="ep-form-row">
                  <div className="ep-form-group" style={{ marginBottom:0 }}>
                    <label className="ep-label"><i className="fas fa-map-marker-alt" /> State</label>
                    <select className="ep-field" name="state" value={form.state} onChange={handleChange} required>
                      <option value="">Select State</option>
                      {states.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="ep-form-group" style={{ marginBottom:0 }}>
                    <label className="ep-label">City / District</label>
                    <input className="ep-field" name="city" value={form.city} onChange={handleChange} placeholder="Your city" required />
                  </div>
                </div>
              </div>

              {/* ── Professional ── */}
              <div className="ep-form-section">
                <div className="ep-section-label">
                  <div className="ep-section-icon"><i className="fas fa-briefcase" /></div>
                  <h3 className="ep-section-title">Professional <em>Details</em></h3>
                </div>

                <div className="ep-form-group">
                  <label className="ep-label"><i className="fas fa-building" /> Media Organization</label>
                  <input className="ep-field" name="organization" value={form.organization} onChange={handleChange} placeholder="Your organization" />
                </div>

                <div className="ep-form-group">
                  <label className="ep-label"><i className="fas fa-briefcase" /> Designation</label>
                  <select className="ep-field" name="designation" value={form.designation} onChange={handleChange}>
                    <option value="">Select Designation</option>
                    {designations.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                <div className="ep-form-group" style={{ marginBottom:0 }}>
                  <label className="ep-label"><i className="fas fa-tools" /> Skills</label>
                  <input className="ep-field" name="skills" value={form.skills} onChange={handleChange} placeholder="e.g. Journalism, Photography, Editing" />
                </div>
              </div>

              {/* ── About & Links ── */}
              <div className="ep-form-section">
                <div className="ep-section-label">
                  <div className="ep-section-icon"><i className="fas fa-pen" /></div>
                  <h3 className="ep-section-title">About & <em>Links</em></h3>
                </div>

                <div className="ep-form-group">
                  <label className="ep-label"><i className="fas fa-pen" /> Bio / About</label>
                  <textarea className="ep-field" name="bio" value={form.bio} onChange={handleChange} placeholder="Write something about yourself…" />
                </div>

                <div className="ep-form-group">
                  <label className="ep-label"><i className="fab fa-linkedin" /> LinkedIn Profile</label>
                  <input className="ep-field" name="linkedin" type="url" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
                </div>

                <div className="ep-form-group" style={{ marginBottom:0 }}>
                  <label className="ep-label"><i className="fas fa-globe" /> Website</label>
                  <input className="ep-field" name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://yourwebsite.com" />
                </div>
              </div>

              {/* ── Action bar ── */}
              <div className="ep-action-bar">
                <button type="submit" className="ep-btn-primary" disabled={loading}>
                  {loading
                    ? <><div className="ep-spinner" /> Saving…</>
                    : <><Ic.Save /> Save Changes</>}
                </button>
                <Link to="/profile" className="ep-btn-ghost">
                  <Ic.X /> Cancel
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
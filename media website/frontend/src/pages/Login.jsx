// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [alert, setAlert] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = await login(email, password);
//     setLoading(false);
//     if (result.success) {
//       setAlert({ type: 'success', msg: 'Login successful! Redirecting...' });
//       setTimeout(() => navigate('/dashboard'), 1000);
//     } else {
//       setAlert({ type: 'error', msg: result.message });
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-header">
//           <div className="logo">AIMA <span>MEDIA</span></div>
//           <p>All India Media Association</p>
//         </div>
//         <div className="auth-body">
//           {alert && <div className={`alert alert-${alert.type}`}><i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i> {alert.msg}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label><i className="fas fa-envelope"></i> Email / Mobile Number</label>
//               <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email or mobile number" required />
//             </div>
//             <div className="form-group">
//               <label><i className="fas fa-lock"></i> Password</label>
//               <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}><input type="checkbox" /> Remember me</label>
//               <a href="#" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }} onClick={e => e.preventDefault()}>Forgot Password?</a>
//             </div>
//             <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
//               {loading ? <><i className="fas fa-spinner fa-spin"></i> Logging in...</> : <><i className="fas fa-sign-in-alt"></i> Login</>}
//             </button>
//           </form>
//           <div style={{ textAlign: 'center', marginTop: '15px', padding: '10px', background: 'var(--bg-light)', borderRadius: 'var(--radius)', fontSize: '12px', color: 'var(--text-light)' }}>
//             <strong>Demo:</strong> demo@aimamedia.org / demo123
//           </div>
//         </div>
//         <div className="auth-footer">
//           <p>Don't have an account? <Link to="/register">Join Us / Register</Link></p>
//           <p style={{ marginTop: '10px' }}><Link to="/"><i className="fas fa-arrow-left"></i> Back to Home</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes spin    { to{transform:rotate(360deg)} }
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
    }
    .pulse-dot { animation:pulseDot 2s ease-in-out infinite; }

    .grid-texture {
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }

    /* ── INPUT — bigger padding & font ── */
    .field {
      width:100%; padding:15px 18px;
      border:1.5px solid #dde2ea;
      border-radius:6px; background:#fff;
      font-family:'DM Sans',sans-serif;
      font-size:15.5px; color:#0f1f33;
      outline:none; transition:border-color .2s, box-shadow .2s;
    }
    .field::placeholder { color:#b0bac6; font-size:14.5px; }
    .field:focus {
      border-color:#1e3a5f;
      box-shadow:0 0 0 3px rgba(30,58,95,.09);
    }

    /* ── BUTTON — taller, bigger text ── */
    .btn-primary {
      width:100%; padding:17px 28px;
      background:#1e3a5f; color:#fff;
      border:none; border-radius:6px;
      font-family:'DM Sans',sans-serif;
      font-size:16px; font-weight:600;
      letter-spacing:.4px; cursor:pointer;
      display:flex; align-items:center; justify-content:center; gap:12px;
      position:relative; overflow:hidden;
      transition:background .25s, transform .12s;
    }
    .btn-primary::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(120deg, transparent 30%, rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .btn-primary:hover:not(:disabled)::after { opacity:1; }
    .btn-primary:hover:not(:disabled) { background:#162d4a; }
    .btn-primary:active:not(:disabled) { transform:scale(.985); }
    .btn-primary:disabled { opacity:.6; cursor:not-allowed; }
  `}</style>
);

/* ── Icons ─────────────────────────────────────────── */
const IconMail     = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconLock     = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconCheck    = () => <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>;
const IconX        = () => <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IconInfo     = () => <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>;
const IconSignIn   = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>;
const IconArrowLeft= () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;

const newsItems = [
  { bold: 'Press Freedom Summit 2025', text: ' — New Delhi, March 15–17' },
  { bold: 'Membership renewal',        text: ' now open for FY 2025–26' },
  { bold: 'Digital Media Guidelines',  text: ' updated by the committee' },
];

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      setAlert({ type: 'success', msg: 'Login successful! Redirecting…' });
      setTimeout(() => {
        const role = result.user?.role;
        if (role === 'super_admin') navigate('/super-admin');
        else if (role === 'admin') navigate('/admin');
        else navigate('/dashboard');
      }, 1000);
    } else {
      setAlert({ type: 'error', msg: result.message });
    }
  };

  return (
    <>
      <GlobalStyles />

      <div className="font-dm min-h-screen flex bg-[#fafaf8] overflow-hidden">

        {/* ══ LEFT PANEL ══════════════════════════════════════ */}
        <div className="hidden lg:flex flex-[1.1] flex-col justify-between relative bg-[#1e3a5f] px-14 py-14 overflow-hidden">

          {/* Textures & glows */}
          <div className="pointer-events-none absolute inset-0 grid-texture" />
          <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-[.13]"
               style={{ background:'radial-gradient(circle, #c8972a 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[.08]"
               style={{ background:'radial-gradient(circle, #c8972a 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute top-0 right-0 w-px h-full"
               style={{ background:'linear-gradient(to bottom, transparent, rgba(200,151,42,.5) 40%, rgba(200,151,42,.25) 70%, transparent)' }} />

          {/* Masthead */}
          <div className="relative z-10 anim-down">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-[11px] font-bold tracking-[2.5px] uppercase border rounded-sm"
                 style={{ color:'#e8c97a', borderColor:'rgba(200,151,42,.35)', background:'rgba(200,151,42,.08)' }}>
              <span className="pulse-dot w-2 h-2 rounded-full inline-block" style={{ background:'#c8972a' }} />
              Member Portal
            </div>

            <h1 className="font-playfair font-black text-white leading-none tracking-tight mb-2"
                style={{ fontSize:'clamp(58px,6vw,88px)' }}>
              AIMA{' '}
              <em style={{ fontStyle:'italic', color:'#c8972a' }}>Media</em>
            </h1>
            <p className="font-medium tracking-[4px] uppercase mb-8"
               style={{ fontSize:'12px', color:'rgba(255,255,255,.35)' }}>
              All India Media Association
            </p>

            <div className="w-14 h-[2px] mb-8 rounded-full"
                 style={{ background:'linear-gradient(to right,#c8972a,#e8c97a)' }} />

            <blockquote className="font-playfair italic leading-relaxed max-w-[320px]"
                        style={{ fontSize:'20px', color:'rgba(255,255,255,.65)' }}>
              "The press is the watchdog of democracy — independent, vigilant, and fearless."
            </blockquote>
          </div>

          {/* News ticker */}
          <div className="relative z-10 anim-up-d1">
            <p className="font-bold tracking-[3px] uppercase mb-4"
               style={{ fontSize:'10px', color:'#c8972a' }}>
              Latest Updates
            </p>
            <div className="pt-5 flex flex-col gap-4"
                 style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
              {newsItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full shrink-0"
                        style={{ background:'#c8972a' }} />
                  <p style={{ fontSize:'13.5px', color:'rgba(255,255,255,.48)', lineHeight:'1.6' }}>
                    <strong style={{ color:'rgba(255,255,255,.80)', fontWeight:500 }}>{item.bold}</strong>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-7 grid grid-cols-3 gap-3"
                 style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
              {[['50K+','Members'],['28','States'],['12+','Years']].map(([n,l]) => (
                <div key={l} className="text-center">
                  <div className="font-playfair font-bold" style={{ fontSize:'26px', color:'#c8972a' }}>{n}</div>
                  <div className="tracking-widest uppercase mt-1" style={{ fontSize:'10px', color:'rgba(255,255,255,.35)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ═════════════════════════════════════ */}
        <div className="flex flex-1 items-center justify-center px-8 py-14 sm:px-14 relative">

          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full"
               style={{ background:'radial-gradient(circle, rgba(30,58,95,.04) 0%, transparent 70%)' }} />

          <div className="relative w-full max-w-[460px] anim-up">

            {/* Mobile logo */}
            <div className="lg:hidden mb-10 text-center">
              <div className="font-playfair font-black tracking-tight leading-none"
                   style={{ fontSize:'40px', color:'#1e3a5f' }}>
                AIMA <em style={{ fontStyle:'italic', color:'#c8972a' }}>Media</em>
              </div>
              <p className="tracking-[3px] uppercase text-slate-400 mt-2" style={{ fontSize:'11px' }}>
                All India Media Association
              </p>
            </div>

            {/* Form header */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-bold tracking-[3px] uppercase"
                      style={{ fontSize:'11px', color:'#c8972a' }}>
                  Secure Access
                </span>
                <div className="h-px bg-slate-200 flex-1 max-w-[90px]" />
              </div>
              <h2 className="font-playfair font-bold leading-tight mb-2"
                  style={{ fontSize:'38px', color:'#0f1f33' }}>
                Member Sign In
              </h2>
              <p className="text-slate-400 leading-relaxed" style={{ fontSize:'15px' }}>
                Access your dashboard, press credentials, and member resources.
              </p>
            </div>

            {/* Alert */}
            {alert && (
              <div className={`anim-fade flex items-center gap-3 px-5 py-4 mb-6 font-medium rounded border-l-4
                ${alert.type === 'success'
                  ? 'bg-green-50 text-green-800 border-green-500'
                  : 'bg-blue-50 border-[#1e3a5f]'}`}
                style={{ fontSize:'14.5px', color: alert.type !== 'success' ? '#1e3a5f' : undefined }}>
                {alert.type === 'success' ? <IconCheck /> : <IconX />}
                {alert.msg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} autoComplete="off">

              {/* Email */}
              <div className="mb-6">
                <label className="flex items-center gap-2 font-semibold tracking-[0.6px] uppercase text-slate-500 mb-2.5"
                       style={{ fontSize:'12px' }}>
                  <IconMail /> Email / Mobile
                </label>
                <input className="field" type="text" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter email or mobile number" required />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="flex items-center gap-2 font-semibold tracking-[0.6px] uppercase text-slate-500 mb-2.5"
                       style={{ fontSize:'12px' }}>
                  <IconLock /> Password
                </label>
                <input className="field" type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password" required />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between mb-7">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none"
                       style={{ fontSize:'14px' }}>
                  <input type="checkbox" className="w-4 h-4 cursor-pointer"
                         style={{ accentColor:'#1e3a5f' }} />
                  Remember me
                </label>
                <a href="#" onClick={e => e.preventDefault()}
                   className="font-semibold hover:underline transition-colors"
                   style={{ fontSize:'14px', color:'#1e3a5f' }}>
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading
                  ? <><div className="spinner" /> Signing in…</>
                  : <><IconSignIn /> Sign In to Portal</>}
              </button>
            </form>

            {/* Demo box */}
            <div className="mt-6 flex items-center gap-3 px-5 py-4 rounded text-slate-400"
                 style={{ fontSize:'13.5px', background:'#f3f5f8', border:'1px dashed #dde2ea' }}>
              <IconInfo />
              <span>
                <strong className="text-slate-500 font-semibold">Demo:</strong>&nbsp;
                demo@aimamedia.org &nbsp;/&nbsp; demo123
              </span>
            </div>

            {/* Footer links */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-400" style={{ fontSize:'14.5px' }}>
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold hover:underline"
                      style={{ color:'#1e3a5f' }}>
                  Join AIMA / Register
                </Link>
              </p>
              <Link to="/"
                className="inline-flex items-center gap-2 mt-3 text-slate-400 hover:text-slate-700 transition-colors"
                style={{ fontSize:'13.5px' }}>
                <IconArrowLeft /> Back to Homepage
              </Link>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
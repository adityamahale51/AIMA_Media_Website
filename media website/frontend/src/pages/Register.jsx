// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Register() {
//   const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', state: '', city: '', organization: '', designation: '', password: '', confirmPassword: '' });
//   const [alert, setAlert] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = await register(form);
//     setLoading(false);
//     if (result.success) {
//       setAlert({ type: 'success', msg: `Registration successful! Membership ID: ${result.membershipId}. Redirecting...` });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } else {
//       setAlert({ type: 'error', msg: result.message });
//     }
//   };

//   const states = ['Uttar Pradesh','Madhya Pradesh','Rajasthan','Bihar','Punjab','Haryana','Delhi','Maharashtra','Karnataka','Gujarat','Chandigarh','Andhra Pradesh','Tamil Nadu','West Bengal','Orissa','Telangana','Other'];
//   const designations = ['Editor','Reporter','Journalist','Photographer','Cameraman','Anchor','Bureau Chief','Freelancer','Other'];

//   return (
//     <div className="auth-page">
//       <div className="auth-container" style={{ maxWidth: '550px' }}>
//         <div className="auth-header"><div className="logo">AIMA <span>MEDIA</span></div><p>Join All India Media Association</p></div>
//         <div className="auth-body">
//           {alert && <div className={`alert alert-${alert.type}`}><i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i> {alert.msg}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group"><label><i className="fas fa-user"></i> First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" required /></div>
//               <div className="form-group"><label>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required /></div>
//             </div>
//             <div className="form-group"><label><i className="fas fa-envelope"></i> Email Address</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email address" required /></div>
//             <div className="form-group"><label><i className="fas fa-phone"></i> Mobile Number</label><input name="mobile" type="tel" value={form.mobile} onChange={handleChange} placeholder="Enter mobile number" required /></div>
//             <div className="form-row">
//               <div className="form-group"><label><i className="fas fa-map-marker-alt"></i> State</label>
//                 <select name="state" value={form.state} onChange={handleChange} required><option value="">Select State</option>{states.map(s => <option key={s}>{s}</option>)}</select>
//               </div>
//               <div className="form-group"><label>City / District</label><input name="city" value={form.city} onChange={handleChange} placeholder="Enter city" required /></div>
//             </div>
//             <div className="form-group"><label><i className="fas fa-building"></i> Media Organization</label><input name="organization" value={form.organization} onChange={handleChange} placeholder="Your media organization name" /></div>
//             <div className="form-group"><label><i className="fas fa-briefcase"></i> Designation</label>
//               <select name="designation" value={form.designation} onChange={handleChange}><option value="">Select Designation</option>{designations.map(d => <option key={d}>{d}</option>)}</select>
//             </div>
//             <div className="form-row">
//               <div className="form-group"><label><i className="fas fa-lock"></i> Password</label><input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create password" required /></div>
//               <div className="form-group"><label>Confirm Password</label><input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required /></div>
//             </div>
//             <div style={{ marginBottom: '18px' }}><label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer' }}><input type="checkbox" required style={{ marginTop: '3px' }} />I agree to the Terms &amp; Conditions and Privacy Policy of AIMA Media.</label></div>
//             <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>{loading ? <><i className="fas fa-spinner fa-spin"></i> Registering...</> : <><i className="fas fa-user-plus"></i> Register / Join</>}</button>
//           </form>
//         </div>
//         <div className="auth-footer">
//           <p>Already have an account? <Link to="/login">Login here</Link></p>
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

    @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn        { from{opacity:0} to{opacity:1} }
    @keyframes spin          { to{transform:rotate(360deg)} }
    @keyframes pulseDot      { 0%,100%{opacity:1} 50%{opacity:.25} }

    .anim-down  { animation:fadeSlideDown .7s ease both; }
    .anim-up    { animation:fadeSlideUp   .7s ease both; }
    .anim-up-d1 { animation:fadeSlideUp   .7s .13s ease both; }
    .anim-fade  { animation:fadeIn        .35s ease both; }

    .spinner {
      width:18px; height:18px;
      border:2px solid rgba(255,255,255,.3);
      border-top-color:#fff;
      border-radius:50%;
      animation:spin .7s linear infinite;
      flex-shrink:0;
    }
    .pulse-dot { animation:pulseDot 2s ease-in-out infinite; }

    .grid-texture {
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:56px 56px;
    }

    .field {
      width:100%; padding:14px 17px;
      border:1.5px solid #dde2ea;
      border-radius:6px; background:#fff;
      font-family:'DM Sans',sans-serif;
      font-size:15px; color:#0f1f33;
      outline:none; transition:border-color .2s, box-shadow .2s;
      appearance:none;
    }
    .field::placeholder { color:#b0bac6; font-size:14px; }
    .field:focus {
      border-color:#1e3a5f;
      box-shadow:0 0 0 3px rgba(30,58,95,.09);
    }
    select.field {
      cursor:pointer;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat:no-repeat;
      background-position:right 14px center;
      padding-right:40px;
    }

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
      background:linear-gradient(120deg,transparent 30%,rgba(200,151,42,.18) 100%);
      opacity:0; transition:opacity .3s;
    }
    .btn-primary:hover:not(:disabled)::after { opacity:1; }
    .btn-primary:hover:not(:disabled) { background:#162d4a; }
    .btn-primary:active:not(:disabled) { transform:scale(.985); }
    .btn-primary:disabled { opacity:.6; cursor:not-allowed; }

    /* Only right panel scrolls */
    .right-scroll {
      overflow-y: auto;
      height: 100vh;
    }
    .right-scroll::-webkit-scrollbar { width:5px; }
    .right-scroll::-webkit-scrollbar-track { background:transparent; }
    .right-scroll::-webkit-scrollbar-thumb { background:#dde2ea; border-radius:4px; }
    .right-scroll::-webkit-scrollbar-thumb:hover { background:#c8d0db; }
  `}</style>
);

/* ── Icons ──────────────────────────────────────────────── */
const IUser      = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IMail      = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IPhone     = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.65a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IMap       = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IBuilding  = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const IBriefcase = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const ILock      = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const ICheck     = () => <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>;
const IXIcon     = () => <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IUserPlus  = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>;
const IArrow     = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const IShield    = () => <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

const STATES = ['Uttar Pradesh','Madhya Pradesh','Rajasthan','Bihar','Punjab','Haryana','Delhi','Maharashtra','Karnataka','Gujarat','Chandigarh','Andhra Pradesh','Tamil Nadu','West Bengal','Orissa','Telangana','Other'];
const DESIGNATIONS = ['Editor','Reporter','Journalist','Photographer','Cameraman','Anchor','Bureau Chief','Freelancer','Other'];

const perks = [
  'Official Press ID Card issued by AIMA',
  'Access to exclusive media events & summits',
  'Legal support & press freedom protection',
  'Pan-India network of 50,000+ journalists',
];

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-5 mt-1">
    <span className="font-bold tracking-[2.5px] uppercase whitespace-nowrap"
          style={{ fontSize:'11px', color:'#c8972a' }}>
      {children}
    </span>
    <div className="flex-1 h-px bg-slate-200" />
  </div>
);

const Label = ({ icon, children }) => (
  <label className="flex items-center gap-2 font-semibold tracking-[0.6px] uppercase text-slate-500 mb-2.5"
         style={{ fontSize:'12px' }}>
    {icon} {children}
  </label>
);

export default function Register() {
  const [form, setForm] = useState({
    firstName:'', lastName:'', email:'', mobile:'',
    state:'', city:'', organization:'', designation:'',
    password:'', confirmPassword:'',
  });
  const [alert, setAlert]     = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate     = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      setAlert({ type:'success', msg:`Registration successful! Membership ID: ${result.membershipId}. Redirecting…` });
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      setAlert({ type:'error', msg: result.message });
    }
  };

  return (
    <>
      <GlobalStyles />

      {/*
        KEY LAYOUT:
        - Root is h-screen overflow-hidden (page never scrolls)
        - Left panel: h-full, overflow-hidden (fixed, never scrolls)
        - Right panel: h-screen overflow-y-auto (only this scrolls)
      */}
      <div className="font-dm h-screen overflow-hidden flex bg-[#fafaf8]">

        {/* ══ LEFT PANEL — fixed, never scrolls ══════════════ */}
        <div className="hidden lg:flex w-[420px] xl:w-[760px] shrink-0 flex-col justify-between
                        relative bg-[#1e3a5f] px-12 py-14 overflow-hidden h-full">

          {/* Textures & glows */}
          <div className="pointer-events-none absolute inset-0 grid-texture" />
          <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-[.13]"
               style={{ background:'radial-gradient(circle,#c8972a 0%,transparent 70%)' }} />
          <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[.08]"
               style={{ background:'radial-gradient(circle,#c8972a 0%,transparent 70%)' }} />
          {/* Gold right-edge accent */}
          <div className="pointer-events-none absolute top-0 right-0 w-px h-full"
               style={{ background:'linear-gradient(to bottom,transparent,rgba(200,151,42,.55) 40%,rgba(200,151,42,.28) 70%,transparent)' }} />

          {/* ── Masthead ── */}
          <div className="relative z-10 anim-down">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border rounded-sm"
                 style={{ fontSize:'11px', fontWeight:700, letterSpacing:'2.5px',
                          textTransform:'uppercase', color:'#e8c97a',
                          borderColor:'rgba(200,151,42,.35)', background:'rgba(200,151,42,.08)' }}>
              <span className="pulse-dot w-2 h-2 rounded-full inline-block" style={{ background:'#c8972a' }} />
              New Member Registration
            </div>

            <h1 className="font-playfair font-black text-white leading-none tracking-tight mb-2"
                style={{ fontSize:'clamp(48px,4.5vw,72px)' }}>
              AIMA{' '}
              <em style={{ fontStyle:'italic', color:'#c8972a' }}>Media</em>
            </h1>
            <p className="font-medium tracking-[4px] uppercase mb-8"
               style={{ fontSize:'11px', color:'rgba(255,255,255,.35)' }}>
              All India Media Association
            </p>

            <div className="w-14 h-[2px] mb-8 rounded-full"
                 style={{ background:'linear-gradient(to right,#c8972a,#e8c97a)' }} />

            <p className="font-playfair italic leading-relaxed"
               style={{ fontSize:'19px', color:'rgba(255,255,255,.65)' }}>
              Join India's largest network of verified media professionals.
            </p>
          </div>

          {/* ── Benefits + Stats ── */}
          <div className="relative z-10 anim-up-d1">
            <p className="font-bold tracking-[3px] uppercase mb-4"
               style={{ fontSize:'30px', color:'#c8972a' }}>
              Member Benefits
            </p>
            <div className="pt-5 flex flex-col gap-3.5"
                 style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
              {perks.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background:'#c8972a' }} />
                  <p style={{ fontSize:'17px', color:'rgba(255,255,255,.52)', lineHeight:'1.65' }}>{p}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-7 pt-6 grid grid-cols-3 gap-3"
                 style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
              {[['50K+','Members'],['28','States'],['12+','Years']].map(([n,l]) => (
                <div key={l} className="text-center">
                  <div className="font-playfair font-bold" style={{ fontSize:'40px', color:'#c8972a' }}>{n}</div>
                  <div className="tracking-widest uppercase mt-1"
                       style={{ fontSize:'15px', color:'rgba(255,255,255,.32)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL — only this scrolls ════════════════ */}
        <div className="flex-1 right-scroll">
          {/* Inner wrapper centers content and adds padding */}
          <div className="min-h-full flex items-start justify-center px-8 py-12 sm:px-12">
            <div className="w-full max-w-[520px] anim-up">

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
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bold tracking-[3px] uppercase"
                        style={{ fontSize:'11px', color:'#c8972a' }}>
                    Join Us
                  </span>
                  <div className="h-px bg-slate-200 w-16" />
                </div>
                <h2 className="font-playfair font-bold leading-tight mb-2"
                    style={{ fontSize:'38px', color:'#0f1f33' }}>
                  Create Your Account
                </h2>
                <p className="text-slate-400 leading-relaxed" style={{ fontSize:'15px' }}>
                  Fill in your details below to apply for AIMA Media membership.
                </p>
              </div>

              {/* Alert */}
              {alert && (
                <div className={`anim-fade flex items-start gap-3 px-5 py-4 mb-7 font-medium rounded border-l-4
                  ${alert.type === 'success'
                    ? 'bg-green-50 text-green-800 border-green-500'
                    : 'bg-blue-50 border-[#1e3a5f]'}`}
                  style={{ fontSize:'14.5px', color: alert.type !== 'success' ? '#1e3a5f' : undefined }}>
                  {alert.type === 'success' ? <ICheck /> : <IXIcon />}
                  <span>{alert.msg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} autoComplete="off">

                {/* ── Personal ── */}
                <SectionLabel>Personal Information</SectionLabel>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <Label icon={<IUser />}>First Name</Label>
                    <input className="field" name="firstName" value={form.firstName}
                      onChange={handleChange} placeholder="First name" required />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <input className="field" name="lastName" value={form.lastName}
                      onChange={handleChange} placeholder="Last name" required />
                  </div>
                </div>

                <div className="mb-5">
                  <Label icon={<IMail />}>Email Address</Label>
                  <input className="field" name="email" type="email" value={form.email}
                    onChange={handleChange} placeholder="Enter email address" required />
                </div>

                <div className="mb-6">
                  <Label icon={<IPhone />}>Mobile Number</Label>
                  <input className="field" name="mobile" type="tel" value={form.mobile}
                    onChange={handleChange} placeholder="Enter mobile number" required />
                </div>

                {/* ── Location ── */}
                <SectionLabel>Location</SectionLabel>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label icon={<IMap />}>State</Label>
                    <select className="field" name="state" value={form.state}
                      onChange={handleChange} required>
                      <option value="">Select State</option>
                      {STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>City / District</Label>
                    <input className="field" name="city" value={form.city}
                      onChange={handleChange} placeholder="Enter city" required />
                  </div>
                </div>

                {/* ── Professional ── */}
                <SectionLabel>Professional Details</SectionLabel>

                <div className="mb-5">
                  <Label icon={<IBuilding />}>Media Organization</Label>
                  <input className="field" name="organization" value={form.organization}
                    onChange={handleChange} placeholder="Your media organization name" />
                </div>

                <div className="mb-6">
                  <Label icon={<IBriefcase />}>Designation</Label>
                  <select className="field" name="designation" value={form.designation}
                    onChange={handleChange}>
                    <option value="">Select Designation</option>
                    {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                {/* ── Security ── */}
                <SectionLabel>Account Security</SectionLabel>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label icon={<ILock />}>Password</Label>
                    <input className="field" name="password" type="password" value={form.password}
                      onChange={handleChange} placeholder="Create password" required />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <input className="field" name="confirmPassword" type="password" value={form.confirmPassword}
                      onChange={handleChange} placeholder="Confirm password" required />
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-7 px-5 py-4 rounded-lg"
                     style={{ background:'#f3f5f8', border:'1px solid #dde2ea' }}>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input type="checkbox" required className="mt-1 w-4 h-4 cursor-pointer shrink-0"
                           style={{ accentColor:'#1e3a5f' }} />
                    <span className="text-slate-500 leading-relaxed" style={{ fontSize:'14px' }}>
                      I agree to the{' '}
                      <a href="#" onClick={e => e.preventDefault()}
                         className="font-semibold hover:underline" style={{ color:'#1e3a5f' }}>
                        Terms &amp; Conditions
                      </a>{' '}and{' '}
                      <a href="#" onClick={e => e.preventDefault()}
                         className="font-semibold hover:underline" style={{ color:'#1e3a5f' }}>
                        Privacy Policy
                      </a>{' '}of AIMA Media.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading
                    ? <><div className="spinner" /> Registering…</>
                    : <><IUserPlus /> Register / Join AIMA</>}
                </button>

                {/* Privacy note */}
                <div className="mt-4 flex items-center gap-2 text-slate-400"
                     style={{ fontSize:'13px' }}>
                  <IShield />
                  Your data is encrypted and never shared with third parties.
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-400" style={{ fontSize:'14.5px' }}>
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold hover:underline"
                        style={{ color:'#1e3a5f' }}>
                    Login here
                  </Link>
                </p>
                <Link to="/"
                  className="inline-flex items-center gap-2 mt-3 text-slate-400 hover:text-slate-700 transition-colors"
                  style={{ fontSize:'13.5px' }}>
                  <IArrow /> Back to Homepage
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
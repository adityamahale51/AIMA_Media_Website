// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useAuth } from '../context/AuthContext';
// import { api } from '../api/api';

// export default function MembershipPlans() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(null);
//   const [alert, setAlert] = useState(null);

//   useEffect(() => {
//     api.getPlans()
//       .then(res => setPlans(res.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   const handleSubscribe = async (planId) => {
//     if (!user) { navigate('/login'); return; }
//     setSubscribing(planId);
//     try {
//       const res = await api.subscribePlan(planId);
//       // In production, integrate Razorpay checkout here
//       // For now, simulate payment confirmation
//       const confirmed = window.confirm(
//         `Plan: ${res.data.plan.name}\nAmount: ₹${res.data.plan.price}\n\nClick OK to simulate payment (Razorpay integration required for production).`
//       );
//       if (confirmed) {
//         await api.confirmPayment(res.data.transaction.id, 'simulated-' + Date.now());
//         setAlert({ type: 'success', msg: 'Payment successful! Your membership is now pending admin approval. You will be notified once approved.' });
//         window.scrollTo(0, 0);
//       }
//     } catch (err) {
//       setAlert({ type: 'error', msg: err.message });
//     }
//     setSubscribing(null);
//   };

//   const planColors = ['#7b1fa2', 'var(--primary)', 'var(--accent)', '#2e7d32'];
//   const planIcons = ['fas fa-graduation-cap', 'fas fa-id-card', 'fas fa-crown', 'fas fa-building'];

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-tags"></i> Membership Plans</h1><div className="breadcrumb"><Link to="/">Home</Link> / Membership Plans</div></div></div>
//       <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 15px', paddingBottom: '80px' }}>
//         {alert && <div className={`alert alert-${alert.type}`} style={{ marginBottom: '20px' }}><i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i> {alert.msg}</div>}

//         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//           <h2 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '8px' }}>Choose Your Membership</h2>
//           <p style={{ color: 'var(--text-light)', fontSize: '15px' }}>Join India's Digital-First Verified Media Professionals Network</p>
//         </div>

//         {loading ? <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Loading plans...</div> : (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
//             {plans.map((plan, i) => (
//               <div key={plan.id} style={{ background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow)', overflow: 'hidden', position: 'relative', transition: 'transform 0.3s', border: plan.is_popular ? `3px solid ${planColors[i]}` : '1px solid var(--border-color)' }}>
//                 {plan.is_popular && <div style={{ position: 'absolute', top: '12px', right: '-30px', background: 'var(--secondary)', color: 'white', padding: '4px 40px', fontSize: '11px', fontWeight: 700, transform: 'rotate(45deg)' }}>POPULAR</div>}
//                 <div style={{ background: planColors[i] || 'var(--primary)', color: 'white', padding: '24px', textAlign: 'center' }}>
//                   <i className={planIcons[i]} style={{ fontSize: '36px', marginBottom: '10px', display: 'block' }}></i>
//                   <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>{plan.name}</h3>
//                   <div style={{ fontSize: '32px', fontWeight: 800 }}>₹{plan.price}<span style={{ fontSize: '14px', fontWeight: 400, opacity: 0.8 }}>/{plan.duration}</span></div>
//                 </div>
//                 <div style={{ padding: '24px' }}>
//                   <ul style={{ marginBottom: '20px' }}>
//                     {(plan.features || []).map((f, j) => (
//                       <li key={j} style={{ padding: '8px 0', fontSize: '13px', color: 'var(--text-medium)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                         <i className="fas fa-check-circle" style={{ color: planColors[i], fontSize: '14px' }}></i> {f}
//                       </li>
//                     ))}
//                   </ul>
//                   <button onClick={() => handleSubscribe(plan.id)} disabled={subscribing === plan.id} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: 'var(--radius)', background: planColors[i], color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.3s' }}>
//                     {subscribing === plan.id ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : <><i className="fas fa-rocket"></i> Get Started</>}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={{ marginTop: '40px', background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '30px' }}>
//           <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '16px' }}><i className="fas fa-info-circle"></i> Membership Flow</h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', textAlign: 'center' }}>
//             {[
//               { icon: 'fas fa-tags', label: '1. Select Plan', color: 'var(--primary)' },
//               { icon: 'fas fa-edit', label: '2. Fill Details', color: '#7b1fa2' },
//               { icon: 'fas fa-upload', label: '3. Upload ID Proof', color: 'var(--accent)' },
//               { icon: 'fas fa-rupee-sign', label: '4. Payment', color: '#2e7d32' },
//               { icon: 'fas fa-clock', label: '5. Admin Review', color: '#ff8f00' },
//               { icon: 'fas fa-id-card', label: '6. Digital ID', color: 'var(--secondary)' },
//             ].map((step, i) => (
//               <div key={i} style={{ padding: '16px' }}>
//                 <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: step.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '20px' }}><i className={step.icon}></i></div>
//                 <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-medium)' }}>{step.label}</p>
//               </div>
//             ))}
//           </div>
//           <p style={{ fontSize: '12px', color: 'var(--text-light)', textAlign: 'center', marginTop: '12px' }}>No automatic approval. All memberships are manually reviewed by our team.</p>
//         </div>
//       </div>
//     </Layout>
//   );
// }



import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  @keyframes popIn   { from { opacity:0; transform:scale(.92) } to { opacity:1; transform:scale(1) } }

  .anim-1     { animation: fadeUp  .4s cubic-bezier(.22,.68,0,1.2) .05s both; }
  .anim-2     { animation: fadeUp  .4s cubic-bezier(.22,.68,0,1.2) .15s both; }
  .anim-3     { animation: fadeUp  .4s cubic-bezier(.22,.68,0,1.2) .25s both; }
  .anim-alert { animation: slideIn .3s cubic-bezier(.22,.68,0,1.2) both; }

  .plan-card-wrap:nth-child(1) { animation: popIn .45s cubic-bezier(.22,.68,0,1.2) .10s both; }
  .plan-card-wrap:nth-child(2) { animation: popIn .45s cubic-bezier(.22,.68,0,1.2) .18s both; }
  .plan-card-wrap:nth-child(3) { animation: popIn .45s cubic-bezier(.22,.68,0,1.2) .26s both; }
  .plan-card-wrap:nth-child(4) { animation: popIn .45s cubic-bezier(.22,.68,0,1.2) .34s both; }

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
  .plans-hero {
    background: linear-gradient(135deg,#0a1929 0%,#1e3a5f 60%,#162d4a 100%);
    position:relative; overflow:hidden;
  }
  .plans-hero::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse 55% 70% at 85% 50%, rgba(200,151,42,.08) 0%, transparent 65%),
      radial-gradient(ellipse 40% 60% at 5%  80%, rgba(30,58,95,.5)    0%, transparent 60%);
    pointer-events:none;
  }
  .plans-hero::after {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(200,151,42,.035) 1px, transparent 1px),
      linear-gradient(90deg,rgba(200,151,42,.035) 1px, transparent 1px);
    background-size:52px 52px; pointer-events:none;
  }

  /* ── Alert ── */
  .alert-box {
    display:flex; align-items:flex-start; gap:12px;
    padding:14px 18px; border-radius:10px;
    margin-bottom:28px; font-size:13.5px;
    font-family:'DM Sans',sans-serif; line-height:1.55;
  }
  .alert-success { background:rgba(45,122,74,.07); border:1.5px solid rgba(45,122,74,.25); color:#1a5c35; }
  .alert-error   { background:rgba(200,50,50,.07);  border:1.5px solid rgba(200,50,50,.25);  color:#8b1a1a; }
  .alert-icon {
    width:32px; height:32px; borderRadius:8px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:15px;
  }
  .alert-success .alert-icon { background:rgba(45,122,74,.12); color:#2d7a4a; }
  .alert-error   .alert-icon { background:rgba(200,50,50,.12);  color:#c83232; }

  /* ── Plan card ── */
  .plan-card {
    background:#fff;
    border:1.5px solid #dde2ea;
    border-radius:18px;
    overflow:hidden;
    display:flex; flex-direction:column;
    transition:all .3s cubic-bezier(.22,.68,0,1.2);
    position:relative;
  }
  .plan-card:hover {
    transform:translateY(-6px);
    box-shadow:0 20px 48px rgba(30,58,95,.14);
  }
  .plan-card.popular {
    border-color:rgba(200,151,42,.5);
    box-shadow:0 8px 32px rgba(200,151,42,.15);
  }
  .plan-card.popular:hover {
    box-shadow:0 20px 52px rgba(200,151,42,.22);
  }

  /* Popular ribbon */
  .popular-ribbon {
    position:absolute; top:16px; right:-28px;
    background:linear-gradient(135deg,#c8972a,#e8c97a);
    color:#0f1f33; padding:4px 44px;
    font-size:9px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase;
    transform:rotate(45deg); z-index:2;
    font-family:'DM Sans',sans-serif;
    box-shadow:0 2px 8px rgba(200,151,42,.4);
  }

  /* Plan header */
  .plan-header {
    padding:28px 24px 24px;
    text-align:center;
    position:relative; overflow:hidden;
  }
  .plan-header::after {
    content:'';
    position:absolute; bottom:0; left:10%; right:10%; height:1px;
    background:rgba(255,255,255,.15);
  }
  .plan-icon-wrap {
    width:60px; height:60px; border-radius:16px;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 14px;
    font-size:24px; color:#fff;
    background:rgba(255,255,255,.15);
    border:1.5px solid rgba(255,255,255,.25);
    backdrop-filter:blur(8px);
  }
  .plan-name {
    font-family:'Cormorant Garamond',serif;
    font-size:22px; font-weight:700; color:#fff; margin:0 0 8px;
  }
  .plan-price {
    display:flex; align-items:baseline; gap:3px; justify-content:center;
    color:#fff; line-height:1;
  }
  .plan-price-symbol { font-size:20px; font-weight:600; margin-top:4px; opacity:.85; }
  .plan-price-amount { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:700; }
  .plan-price-period { font-size:13px; opacity:.7; font-family:'DM Sans',sans-serif; }

  /* Plan body */
  .plan-body { padding:24px; flex:1; display:flex; flex-direction:column; gap:16px; }

  .feature-list { display:flex; flex-direction:column; gap:0; flex:1; }
  .feature-item {
    display:flex; align-items:flex-start; gap:10px;
    padding:9px 0; border-bottom:1px solid #f3f5f8;
    font-size:13px; color:#4a5568; font-family:'DM Sans',sans-serif; line-height:1.5;
  }
  .feature-item:last-child { border-bottom:none; }
  .feature-item i { font-size:12px; margin-top:2px; flex-shrink:0; }

  /* Subscribe button */
  .plan-btn {
    width:100%; padding:13px;
    border-radius:10px; border:none; cursor:pointer;
    font-size:14px; font-weight:600; font-family:'DM Sans',sans-serif;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:all .25s; letter-spacing:.2px;
    color:#fff;
  }
  .plan-btn:hover:not(:disabled) { transform:translateY(-2px); filter:brightness(1.1); }
  .plan-btn:disabled { opacity:.6; cursor:not-allowed; transform:none; }

  .btn-spinner {
    width:15px; height:15px; border-radius:50%;
    border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff;
    animation:spin 1s linear infinite; flex-shrink:0;
  }

  /* ── Flow section ── */
  .flow-card {
    background:#fff; border:1.5px solid #dde2ea; border-radius:16px;
    padding:32px 36px; position:relative; overflow:hidden;
  }
  .flow-card::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:4px;
    background:linear-gradient(to bottom,#1e3a5f,#c8972a,#e8c97a,#c8972a,#1e3a5f);
  }

  .flow-step {
    display:flex; flex-direction:column; align-items:center;
    gap:10px; padding:16px 8px; text-align:center; position:relative;
  }
  .flow-step-icon {
    width:52px; height:52px; border-radius:14px;
    display:flex; align-items:center; justify-content:center;
    font-size:20px; color:#fff;
    box-shadow:0 4px 14px rgba(0,0,0,.15);
    transition:transform .25s;
  }
  .flow-step:hover .flow-step-icon { transform:translateY(-3px) scale(1.05); }
  .flow-step-num {
    position:absolute; top:-6px; right:calc(50% - 32px);
    width:18px; height:18px; border-radius:50%;
    background:#fff; border:2px solid #c8972a;
    font-size:9px; font-weight:700; color:#c8972a;
    display:flex; align-items:center; justify-content:center;
    font-family:'DM Sans',sans-serif;
  }
  .flow-step-label {
    font-size:12px; font-weight:600; color:#1e3a5f;
    font-family:'DM Sans',sans-serif; line-height:1.4;
  }

  /* connector arrow between steps */
  .flow-arrow {
    display:flex; align-items:center; padding-top:20px;
    color:#dde2ea; font-size:18px; flex-shrink:0;
  }

  /* loading spinner */
  .page-spinner {
    width:40px; height:40px; border-radius:50%;
    border:3px solid #dde2ea; border-top-color:#c8972a;
    animation:spin 1s linear infinite; margin:0 auto;
  }

  @media (max-width:768px) {
    .flow-card { padding:20px 16px; }
    .form-card-body { padding:20px; }
  }
`;

/* Plan colour palette — navy, gold, deep teal, forest */
const PLAN_COLORS = [
  { bg:'linear-gradient(135deg,#1e3a5f,#2d5185)',   accent:'#1e3a5f', light:'rgba(30,58,95,.08)',   check:'#1e3a5f' },
  { bg:'linear-gradient(135deg,#b8800a,#c8972a)',   accent:'#c8972a', light:'rgba(200,151,42,.08)', check:'#c8972a' },
  { bg:'linear-gradient(135deg,#0f1f33,#1e3a5f)',   accent:'#0f1f33', light:'rgba(15,31,51,.08)',   check:'#1e3a5f' },
  { bg:'linear-gradient(135deg,#1a5c35,#2d7a4a)',   accent:'#2d7a4a', light:'rgba(45,122,74,.08)',  check:'#2d7a4a' },
];
const PLAN_ICONS = [
  'fas fa-graduation-cap',
  'fas fa-id-card',
  'fas fa-crown',
  'fas fa-building',
];

const FLOW_STEPS = [
  { icon:'fas fa-tags',       label:'Select Plan',    bg:'linear-gradient(135deg,#1e3a5f,#2d5185)' },
  { icon:'fas fa-edit',       label:'Fill Details',   bg:'linear-gradient(135deg,#7b1fa2,#9c27b0)' },
  { icon:'fas fa-upload',     label:'Upload ID Proof',bg:'linear-gradient(135deg,#b8800a,#c8972a)' },
  { icon:'fas fa-rupee-sign', label:'Payment',        bg:'linear-gradient(135deg,#1a5c35,#2d7a4a)' },
  { icon:'fas fa-clock',      label:'Admin Review',   bg:'linear-gradient(135deg,#c46000,#e07800)' },
  { icon:'fas fa-id-card',    label:'Digital ID',     bg:'linear-gradient(135deg,#0f1f33,#1e3a5f)' },
];

export default function MembershipPlans() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [subscribing, setSubscribing] = useState(null);
  const [alert, setAlert]           = useState(null);

  useEffect(() => {
    api.getPlans()
      .then(res => setPlans(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = async (planId) => {
    if (!user) { navigate('/login'); return; }
    setSubscribing(planId);
    try {
      const res = await api.subscribePlan(planId);
      const confirmed = window.confirm(
        `Plan: ${res.data.plan.name}\nAmount: ₹${res.data.plan.price}\n\nClick OK to simulate payment (Razorpay integration required for production).`
      );
      if (confirmed) {
        await api.confirmPayment(res.data.transaction.id, 'simulated-' + Date.now());
        setAlert({ type: 'success', msg: 'Payment successful! Your membership is now pending admin approval. You will be notified once approved.' });
        window.scrollTo(0, 0);
      }
    } catch (err) {
      setAlert({ type: 'error', msg: err.message });
    }
    setSubscribing(null);
  };

  return (
    <Layout>
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <section className="plans-hero font-dm">
        <div className="max-w-7xl mx-auto px-5 py-12 relative" style={{ zIndex:1 }}>
          <div className="anim-1">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <div className="gold-rule" style={{ width:32 }} />
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(200,151,42,.8)', fontFamily:'DM Sans,sans-serif' }}>
                Join AIMA
              </span>
            </div>

            <h1 className="font-cormorant" style={{ fontSize:'clamp(34px,5vw,52px)', fontWeight:700, color:'#fff', lineHeight:1.1, margin:'0 0 10px' }}>
              Membership{' '}
              <em className="shimmer-gold" style={{ fontStyle:'italic' }}>Plans</em>
            </h1>
            <p className="font-dm" style={{ fontSize:14, color:'rgba(255,255,255,.45)', maxWidth:460, lineHeight:1.75, margin:'0 0 18px' }}>
              Join India's Digital-First Verified Media Professionals Network. Pick the plan that fits your journey.
            </p>

            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'rgba(255,255,255,.3)', fontFamily:'DM Sans,sans-serif' }}>
              <Link to="/" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#c8972a'; }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,.4)'; }}>
                Home
              </Link>
              <span style={{ color:'rgba(200,151,42,.4)' }}>›</span>
              <span style={{ color:'rgba(255,255,255,.55)' }}>Membership Plans</span>
            </div>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-5 font-dm" style={{ paddingTop:40, paddingBottom:80 }}>

        {/* Alert */}
        {alert && (
          <div className={`alert-box alert-${alert.type} anim-alert`}>
            <div className="alert-icon" style={{ borderRadius:8 }}>
              <i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation-triangle'}`} />
            </div>
            <div>
              <p style={{ fontWeight:600, margin:'0 0 3px', fontSize:13 }}>
                {alert.type === 'success' ? 'Payment Successful!' : 'Something went wrong'}
              </p>
              <p style={{ margin:0, fontSize:13 }}>{alert.msg}</p>
            </div>
          </div>
        )}

        {/* Section heading */}
        <div className="anim-2" style={{ textAlign:'center', marginBottom:36 }}>
          <h2 className="font-cormorant" style={{ fontSize:'clamp(28px,4vw,38px)', fontWeight:700, color:'#0f1f33', margin:'0 0 10px' }}>
            Choose Your Membership
          </h2>
          <div className="gold-rule-thin" style={{ maxWidth:120, margin:'12px auto 14px' }} />
          <p style={{ fontSize:14, color:'#6b7a8d', maxWidth:420, margin:'0 auto', lineHeight:1.7 }}>
            All memberships include a digital ID card and access to India's verified media network.
          </p>
        </div>

        {/* Plans grid */}
        {loading ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'60px 0' }}>
            <div className="page-spinner" />
            <p style={{ fontSize:13, color:'#6b7a8d', fontFamily:'DM Sans,sans-serif' }}>Loading plans…</p>
          </div>
        ) : (
          <div
            className="anim-2"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20, marginBottom:40 }}
          >
            {plans.map((plan, i) => {
              const color = PLAN_COLORS[i % PLAN_COLORS.length];
              const isPopular = plan.is_popular;
              return (
                <div key={plan.id} className={`plan-card-wrap`}>
                  <div className={`plan-card ${isPopular ? 'popular' : ''}`} style={{ height:'100%' }}>

                    {/* Ribbon */}
                    {isPopular && <div className="popular-ribbon">POPULAR</div>}

                    {/* Header */}
                    <div className="plan-header" style={{ background: color.bg }}>
                      <div className="plan-icon-wrap">
                        <i className={PLAN_ICONS[i % PLAN_ICONS.length]} />
                      </div>
                      <div className="plan-name">{plan.name}</div>
                      <div className="plan-price">
                        <span className="plan-price-symbol">₹</span>
                        <span className="plan-price-amount">{plan.price}</span>
                        <span className="plan-price-period">/{plan.duration}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="plan-body">
                      <ul className="feature-list" style={{ listStyle:'none', margin:0, padding:0 }}>
                        {(plan.features || []).map((f, j) => (
                          <li key={j} className="feature-item">
                            <i className="fas fa-check-circle" style={{ color: color.check }} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <button
                        className="plan-btn"
                        style={{ background: color.bg, boxShadow:`0 4px 18px ${color.accent}44` }}
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={subscribing === plan.id}
                      >
                        {subscribing === plan.id
                          ? <><div className="btn-spinner" /> Processing…</>
                          : <><i className="fas fa-rocket" /> Get Started</>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Membership flow ── */}
        <div className="flow-card anim-3">
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
              <span style={{
                width:34, height:34, borderRadius:8,
                background:'rgba(200,151,42,.1)', border:'1px solid rgba(200,151,42,.25)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#c8972a', fontSize:14,
              }}>
                <i className="fas fa-map-signs" />
              </span>
              <h3 className="font-cormorant" style={{ fontSize:22, fontWeight:700, color:'#0f1f33', margin:0 }}>
                Membership Flow
              </h3>
            </div>
            <p style={{ fontSize:12.5, color:'#6b7a8d', margin:'4px 0 0 44px', fontFamily:'DM Sans,sans-serif' }}>
              How it works — from selection to your digital press ID
            </p>
          </div>

          <div className="gold-rule-thin" style={{ marginBottom:24 }} />

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(100px,1fr))', gap:8, alignItems:'start' }}>
            {FLOW_STEPS.map((step, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', position:'relative' }}>
                {/* connector line */}
                {i < FLOW_STEPS.length - 1 && (
                  <div style={{
                    position:'absolute', top:26, left:'calc(50% + 32px)', right:'calc(-50% + 32px)',
                    height:2,
                    background:'linear-gradient(90deg,#dde2ea,#dde2ea)',
                    zIndex:0,
                  }} />
                )}
                <div className="flow-step">
                  <div className="flow-step-num">{i + 1}</div>
                  <div className="flow-step-icon" style={{ background: step.bg }}>
                    <i className={step.icon} />
                  </div>
                  <div className="flow-step-label">{step.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display:'flex', alignItems:'center', gap:8, justifyContent:'center',
            marginTop:20, padding:'10px 16px', borderRadius:8,
            background:'#f3f5f8', border:'1px solid #dde2ea',
          }}>
            <i className="fas fa-shield-alt" style={{ color:'#c8972a', fontSize:13 }} />
            <p style={{ fontSize:12, color:'#6b7a8d', margin:0, fontFamily:'DM Sans,sans-serif' }}>
              No automatic approval. All memberships are <strong style={{ color:'#1e3a5f' }}>manually reviewed</strong> by our team.
            </p>
          </div>
        </div>

        {/* ── Trust badges ── */}
        <div className="anim-3" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginTop:24 }}>
          {[
            { icon:'fas fa-lock',       title:'Secure Payments',    desc:'256-bit SSL encryption via Razorpay', color:'#1e3a5f' },
            { icon:'fas fa-undo',       title:'Easy Refunds',       desc:'Hassle-free refund within 7 days',    color:'#c8972a' },
            { icon:'fas fa-headset',    title:'24/7 Support',       desc:'Our team is always here to help',     color:'#2d7a4a' },
            { icon:'fas fa-certificate',title:'Verified Badge',     desc:'Get your press ID upon approval',     color:'#7b1fa2' },
          ].map((b, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'flex-start', gap:12,
              padding:'16px 18px', borderRadius:12,
              background:'#fff', border:'1.5px solid #dde2ea',
              transition:'all .25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(200,151,42,.35)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(30,58,95,.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#dde2ea'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
            >
              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background:`${b.color}14`, border:`1px solid ${b.color}33`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:b.color, fontSize:16,
              }}>
                <i className={b.icon} />
              </div>
              <div>
                <p style={{ fontWeight:600, fontSize:13, color:'#0f1f33', margin:'0 0 3px', fontFamily:'DM Sans,sans-serif' }}>{b.title}</p>
                <p style={{ fontSize:12, color:'#6b7a8d', margin:0, fontFamily:'DM Sans,sans-serif', lineHeight:1.5 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </Layout>
  );
}
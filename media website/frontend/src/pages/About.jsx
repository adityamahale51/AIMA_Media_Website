// import Layout from '../components/Layout';

// export default function About() {
//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-info-circle"></i> About Us</h1><div className="breadcrumb"><a href="/">Home</a> / About Us</div></div></div>
//       <div className="about-content">
//         <div className="about-card">
//           <h2><i className="fas fa-building"></i> About AIMA Media Foundation</h2>
//           <p>All India Media Association (AIMA) is a premier organization dedicated to supporting and empowering media professionals across India. Founded with the vision of creating a unified platform for journalists, editors, reporters, and other media personnel, AIMA has grown into one of the most respected media bodies in the country.</p>
//           <p>AIMA Media Foundation works tirelessly to protect the rights of journalists, promote ethical journalism, and provide a platform for media professionals to connect, collaborate, and grow.</p>
//         </div>
//         <div className="about-card"><h2><i className="fas fa-bullseye"></i> Our Mission</h2><p>To create a strong, unified community of media professionals in India that upholds the highest standards of journalism, protects press freedom, and serves the public interest through fair, accurate, and responsible reporting.</p></div>
//         <div className="about-card"><h2><i className="fas fa-eye"></i> Our Vision</h2><p>To be India's leading media association that empowers every journalist and media professional to excel in their field, contribute to democratic values, and maintain the integrity of the fourth estate.</p></div>
//         <div className="about-card">
//           <h2><i className="fas fa-tasks"></i> Our Activities</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '10px' }}>
//             {[
//               { icon: 'fas fa-shield-alt', title: 'Journalist Protection', desc: 'Providing legal support and assistance to journalists facing threats.', color: 'var(--primary)' },
//               { icon: 'fas fa-chalkboard-teacher', title: 'Training & Workshops', desc: 'Regular training programs to enhance journalistic skills.', color: 'var(--secondary)' },
//               { icon: 'fas fa-trophy', title: 'Awards & Recognition', desc: 'Honoring outstanding journalism through annual awards.', color: 'var(--accent)' },
//               { icon: 'fas fa-handshake', title: 'Networking', desc: 'Creating opportunities for media professionals to connect.', color: '#2e7d32' },
//             ].map((a, i) => (
//               <div key={i} style={{ padding: '16px', background: 'var(--bg-light)', borderRadius: 'var(--radius)', borderLeft: `4px solid ${a.color}` }}>
//                 <h4 style={{ fontSize: '14px', color: a.color, marginBottom: '6px' }}><i className={a.icon}></i> {a.title}</h4>
//                 <p style={{ fontSize: '13px' }}>{a.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="about-card">
//           <h2><i className="fas fa-users"></i> Our Leadership</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '10px' }}>
//             {[
//               { name: 'Mahesh Sharma', role: 'President, AIMA', initial: 'M', bg: 'var(--primary)' },
//               { name: 'Ramkumar Sharma', role: 'Senior Patron', initial: 'R', bg: 'var(--secondary)' },
//               { name: 'Charan Singh Swami', role: 'District President', initial: 'C', bg: 'var(--accent)' },
//             ].map((l, i) => (
//               <div key={i} style={{ textAlign: 'center', padding: '16px' }}>
//                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: l.bg, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 700 }}>{l.initial}</div>
//                 <h4 style={{ fontSize: '14px' }}>{l.name}</h4>
//                 <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>{l.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import Layout from '../components/Layout';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-dm        { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp  { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
  @keyframes shimmer { from { background-position:-200% center } to { background-position:200% center } }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes spin    { to { transform:rotate(360deg) } }
  @keyframes drawLine { from { width:0 } to { width:100% } }

  .anim-1 { animation: fadeUp .45s cubic-bezier(.22,.68,0,1.2) .05s both; }
  .anim-2 { animation: fadeUp .45s cubic-bezier(.22,.68,0,1.2) .13s both; }
  .anim-3 { animation: fadeUp .45s cubic-bezier(.22,.68,0,1.2) .21s both; }
  .anim-4 { animation: fadeUp .45s cubic-bezier(.22,.68,0,1.2) .29s both; }
  .anim-5 { animation: fadeUp .45s cubic-bezier(.22,.68,0,1.2) .37s both; }

  /* ── shimmer text ── */
  .shimmer-gold {
    background: linear-gradient(90deg,#c8972a 0%,#e8c97a 40%,#c8972a 70%,#e8c97a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }

  /* ── gold rules ── */
  .gold-rule {
    height: 2px;
    background: linear-gradient(90deg,transparent,#c8972a 30%,#e8c97a 50%,#c8972a 70%,transparent);
  }
  .gold-rule-thin {
    height: 1px;
    background: linear-gradient(90deg,transparent,rgba(200,151,42,.5) 40%,transparent);
  }

  /* ── hero ── */
  .about-hero {
    background: linear-gradient(135deg,#0a1929 0%,#1e3a5f 60%,#162d4a 100%);
    position: relative;
    overflow: hidden;
  }
  .about-hero::before {
    content:'';
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 55% 70% at 85% 50%, rgba(200,151,42,.08) 0%, transparent 65%),
      radial-gradient(ellipse 40% 60% at 5%  80%, rgba(30,58,95,.5)    0%, transparent 60%);
    pointer-events:none;
  }
  .about-hero::after {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(200,151,42,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,151,42,.035) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events:none;
  }

  /* ── section card ── */
  .about-card {
    background: #fff;
    border: 1.5px solid #dde2ea;
    border-radius: 16px;
    padding: 36px 40px;
    position: relative;
    overflow: hidden;
    transition: box-shadow .25s, border-color .25s;
  }
  .about-card:hover {
    box-shadow: 0 8px 36px rgba(30,58,95,.09);
    border-color: rgba(200,151,42,.3);
  }
  /* left gold accent bar */
  .about-card::before {
    content:'';
    position:absolute; left:0; top:0; bottom:0;
    width:3px;
    background:linear-gradient(to bottom,#1e3a5f,#c8972a,#e8c97a,#c8972a,#1e3a5f);
    border-radius:0 2px 2px 0;
    opacity:.6;
    transition: opacity .25s, width .25s;
  }
  .about-card:hover::before { opacity:1; width:4px; }

  /* ── section heading ── */
  .section-eyebrow {
    display:flex; align-items:center; gap:10px;
    font-size:10px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase;
    color:#c8972a; margin-bottom:10px;
    font-family:'DM Sans',sans-serif;
  }
  .section-eyebrow .dot {
    width:5px; height:5px; border-radius:50%;
    background:#c8972a; animation:pulse 2.5s ease-in-out infinite;
  }
  .section-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(22px,3vw,28px);
    font-weight:700; color:#0f1f33;
    line-height:1.15; margin:0 0 16px;
  }
  .section-body {
    font-size:14.5px; line-height:1.8;
    color:#4a5568; font-family:'DM Sans',sans-serif;
    margin:0 0 14px;
  }
  .section-body:last-child { margin-bottom:0; }

  /* ── activity card ── */
  .activity-card {
    background:#fafaf8;
    border:1.5px solid #dde2ea;
    border-radius:12px;
    padding:20px;
    display:flex; flex-direction:column; gap:10px;
    transition:all .25s cubic-bezier(.22,.68,0,1.2);
    position:relative; overflow:hidden;
  }
  .activity-card::after {
    content:'';
    position:absolute; bottom:0; left:0; right:0;
    height:2px;
    background:var(--ac-color,#1e3a5f);
    transform:scaleX(0); transform-origin:left;
    transition:transform .3s ease;
  }
  .activity-card:hover { transform:translateY(-4px); box-shadow:0 10px 32px rgba(30,58,95,.1); border-color:rgba(200,151,42,.25); }
  .activity-card:hover::after { transform:scaleX(1); }

  .activity-icon {
    width:44px; height:44px; border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    font-size:18px; color:#fff; flex-shrink:0;
    box-shadow:0 4px 14px rgba(0,0,0,.15);
  }
  .activity-title {
    font-family:'Cormorant Garamond',serif;
    font-size:17px; font-weight:700; color:#0f1f33;
  }
  .activity-desc {
    font-size:13px; line-height:1.65; color:#6b7a8d;
    font-family:'DM Sans',sans-serif; margin:0;
  }

  /* ── leader card ── */
  .leader-card {
    display:flex; flex-direction:column; align-items:center;
    padding:28px 20px;
    background:#fafaf8;
    border:1.5px solid #dde2ea;
    border-radius:14px;
    gap:12px;
    transition:all .25s cubic-bezier(.22,.68,0,1.2);
    position:relative; overflow:hidden;
    text-align:center;
  }
  .leader-card:hover {
    transform:translateY(-5px);
    box-shadow:0 12px 36px rgba(30,58,95,.12);
    border-color:rgba(200,151,42,.35);
  }
  /* subtle top shimmer on hover */
  .leader-card::before {
    content:'';
    position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,#1e3a5f,#c8972a,#e8c97a);
    opacity:0; transition:opacity .3s;
    animation:shimmer 3s linear infinite;
    background-size:200% auto;
  }
  .leader-card:hover::before { opacity:1; }

  .leader-avatar-ring {
    width:88px; height:88px;
    border-radius:50%;
    padding:3px;
    background:linear-gradient(135deg,#1e3a5f,#c8972a,#e8c97a);
    box-shadow:0 4px 20px rgba(30,58,95,.2);
    transition:box-shadow .3s, transform .3s;
  }
  .leader-card:hover .leader-avatar-ring {
    box-shadow:0 6px 28px rgba(200,151,42,.35);
    transform:scale(1.05);
  }
  .leader-avatar-inner {
    width:100%; height:100%;
    border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    color:#fff; font-weight:700; font-size:30px;
    border:3px solid #fff;
    font-family:'Cormorant Garamond',serif;
  }

  .leader-name {
    font-family:'Cormorant Garamond',serif;
    font-size:18px; font-weight:700; color:#0f1f33;
    line-height:1.2;
  }
  .leader-role {
    display:inline-flex; align-items:center; gap:6px;
    padding:4px 12px; border-radius:4px;
    font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase;
    color:#c8972a;
    background:rgba(200,151,42,.08);
    border:1px solid rgba(200,151,42,.22);
    font-family:'DM Sans',sans-serif;
  }

  /* ── highlight strip (between hero & content) ── */
  .highlight-strip {
    background:linear-gradient(90deg,#1e3a5f 0%,#243f6a 50%,#1e3a5f 100%);
    border-bottom:1px solid rgba(200,151,42,.2);
  }
  .highlight-item {
    display:flex; flex-direction:column; align-items:center; gap:4px;
    padding:18px 24px;
    position:relative;
    flex:1;
  }
  .highlight-item + .highlight-item::before {
    content:'';
    position:absolute; left:0; top:20%; bottom:20%;
    width:1px; background:rgba(200,151,42,.2);
  }
  .highlight-num {
    font-family:'Cormorant Garamond',serif;
    font-size:30px; font-weight:700; color:#fff; line-height:1;
  }
  .highlight-label {
    font-size:10px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase;
    color:rgba(200,151,42,.75); font-family:'DM Sans',sans-serif;
  }
`;

const ACTIVITIES = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Journalist Protection',
    desc:  'Providing legal support and assistance to journalists facing threats or harassment.',
    color: '#1e3a5f',
  },
  {
    icon: 'fas fa-chalkboard-teacher',
    title: 'Training & Workshops',
    desc:  'Regular programs to sharpen journalistic skills and embrace digital storytelling.',
    color: '#c8972a',
  },
  {
    icon: 'fas fa-trophy',
    title: 'Awards & Recognition',
    desc:  'Honoring outstanding contributions to journalism through our annual awards ceremony.',
    color: '#0f1f33',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Networking',
    desc:  'Creating meaningful opportunities for media professionals to connect and collaborate.',
    color: '#2d6a4f',
  },
];

const LEADERS = [
  { name: 'Mahesh Sharma',       role: 'President, AIMA',    initial: 'M', colors: ['#1e3a5f','#2d5185'] },
  { name: 'Ramkumar Sharma',     role: 'Senior Patron',      initial: 'R', colors: ['#c8972a','#e8c97a'] },
  { name: 'Charan Singh Swami',  role: 'District President', initial: 'C', colors: ['#0f1f33','#1e3a5f'] },
];

export default function About() {
  return (
    <Layout>
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <section className="about-hero font-dm">
        <div className="max-w-7xl mx-auto px-5 py-14 relative" style={{ zIndex:1 }}>
          <div className="anim-1">
            {/* Eyebrow */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div className="gold-rule" style={{ width:32 }} />
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(200,151,42,.8)', fontFamily:'DM Sans,sans-serif' }}>
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-cormorant" style={{ fontSize:'clamp(38px,5vw,56px)', fontWeight:700, color:'#fff', lineHeight:1.05, margin:'0 0 14px' }}>
              About{' '}
              <em className="shimmer-gold" style={{ fontStyle:'italic' }}>AIMA Media</em>
            </h1>
            <p className="font-dm" style={{ fontSize:14.5, color:'rgba(255,255,255,.45)', maxWidth:480, lineHeight:1.75, margin:'0 0 20px' }}>
              A unified platform empowering India's journalists, editors, and media professionals since founding.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 font-dm" style={{ fontSize:12, color:'rgba(255,255,255,.3)' }}>
              <a href="/" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#c8972a'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.4)'}>Home</a>
              <span style={{ color:'rgba(200,151,42,.4)' }}>›</span>
              <span style={{ color:'rgba(255,255,255,.55)' }}>About Us</span>
            </div>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* ── Highlight strip ── */}
      <div className="highlight-strip">
        <div className="max-w-7xl mx-auto px-5">
          <div style={{ display:'flex', flexWrap:'wrap' }}>
            {[
              { num:'5000+', label:'Verified Members' },
              { num:'28',    label:'States Covered' },
              { num:'10+',   label:'Years of Service' },
              { num:'100%',  label:'Press Freedom' },
            ].map((h,i) => (
              <div key={i} className="highlight-item">
                <div className="highlight-num">{h.num}</div>
                <div className="highlight-label">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-5 font-dm" style={{ paddingTop:48, paddingBottom:80 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

          {/* About card */}
          <div className="about-card anim-2">
            <div className="section-eyebrow"><span className="dot" /> Foundation</div>
            <h2 className="section-title">About AIMA Media Foundation</h2>
            <p className="section-body">
              All India Media Association (AIMA) is a premier organization dedicated to supporting and empowering media professionals across India. Founded with the vision of creating a unified platform for journalists, editors, reporters, and other media personnel, AIMA has grown into one of the most respected media bodies in the country.
            </p>
            <p className="section-body">
              AIMA Media Foundation works tirelessly to protect the rights of journalists, promote ethical journalism, and provide a platform for media professionals to connect, collaborate, and grow.
            </p>
          </div>

          {/* Mission & Vision — two col */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>

            <div className="about-card anim-3">
              <div className="section-eyebrow"><span className="dot" /> Purpose</div>
              <h2 className="section-title">
                <span style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
                  <span style={{
                    width:36, height:36, borderRadius:8, background:'linear-gradient(135deg,#1e3a5f,#2d5185)',
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    color:'#c8972a', fontSize:16, flexShrink:0,
                  }}>
                    <i className="fas fa-bullseye" />
                  </span>
                  Our Mission
                </span>
              </h2>
              <p className="section-body">
                To create a strong, unified community of media professionals in India that upholds the highest standards of journalism, protects press freedom, and serves the public interest through fair, accurate, and responsible reporting.
              </p>
            </div>

            <div className="about-card anim-3">
              <div className="section-eyebrow"><span className="dot" /> Direction</div>
              <h2 className="section-title">
                <span style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
                  <span style={{
                    width:36, height:36, borderRadius:8, background:'linear-gradient(135deg,#c8972a,#e8c97a)',
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    color:'#0f1f33', fontSize:16, flexShrink:0,
                  }}>
                    <i className="fas fa-eye" />
                  </span>
                  Our Vision
                </span>
              </h2>
              <p className="section-body">
                To be India's leading media association that empowers every journalist and media professional to excel in their field, contribute to democratic values, and maintain the integrity of the fourth estate.
              </p>
            </div>
          </div>

          {/* Activities */}
          <div className="about-card anim-4">
            <div className="section-eyebrow"><span className="dot" /> What We Do</div>
            <h2 className="section-title">Our Activities</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:14, marginTop:8 }}>
              {ACTIVITIES.map((a,i) => (
                <div key={i} className="activity-card" style={{ '--ac-color': a.color }}>
                  <div className="activity-icon" style={{ background:`linear-gradient(135deg,${a.color},${a.color}cc)` }}>
                    <i className={a.icon} />
                  </div>
                  <div className="activity-title">{a.title}</div>
                  <p className="activity-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="about-card anim-5">
            <div className="section-eyebrow"><span className="dot" /> Team</div>
            <h2 className="section-title">Our Leadership</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginTop:8 }}>
              {LEADERS.map((l,i) => (
                <div key={i} className="leader-card">
                  <div className="leader-avatar-ring">
                    <div className="leader-avatar-inner"
                         style={{ background:`linear-gradient(135deg,${l.colors[0]},${l.colors[1]})` }}>
                      {l.initial}
                    </div>
                  </div>
                  <div className="leader-name">{l.name}</div>
                  <span className="leader-role">
                    <i className="fas fa-star" style={{ fontSize:8 }} />
                    {l.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}
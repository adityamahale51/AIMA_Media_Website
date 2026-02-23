// import { useState, useEffect } from 'react';
// import Layout from '../components/Layout';
// import { api } from '../api/api';
// import { stateFilters } from '../data/staticData';

// export default function Members() {
//   const [activeState, setActiveState] = useState('All');
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     api.getMembers(activeState)
//       .then(res => setMembers(res.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [activeState]);

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-users"></i> Members</h1><div className="breadcrumb"><a href="/">Home</a> / Members</div></div></div>
//       <div className="state-tabs" style={{ padding: '12px 0' }}>
//         <div className="container">
//           {stateFilters.map(s => (
//             <a href="#" key={s} className={activeState === s ? 'active' : ''} onClick={e => { e.preventDefault(); setActiveState(s); }}>{s}</a>
//           ))}
//         </div>
//       </div>
//       <div className="container" style={{ paddingBottom: '80px' }}>
//         {loading && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}><i className="fas fa-spinner fa-spin"></i> Loading members...</div>}
//         <div className="members-grid">
//           {members.map((m, i) => (
//             <div className="member-card" key={i}>
//               <div className="avatar"><img src={m.avatar} alt={m.name} onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(m.name) + '&background=1a237e&color=fff'; }} /></div>
//               <div className="name">{m.name}</div>
//               <div className="location"><i className="fas fa-map-marker-alt"></i> {m.location}</div>
//               <div className="member-badge">AIMAMEDIA</div>
//             </div>
//           ))}
//           {!loading && members.length === 0 && <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>No members found for this state.</p>}
//         </div>
//       </div>
//     </Layout>
//   );
// }




import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { api } from '../api/api';
import { stateFilters } from '../data/staticData';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-dm        { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
  @keyframes shimmer  { from { background-position:-200% center } to { background-position:200% center } }
  @keyframes spin     { to   { transform: rotate(360deg) } }
  @keyframes pulse    { 0%,100% { opacity:1 } 50% { opacity:.3 } }

  .anim-fade-up { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) both; }

  /* staggered card entrance */
  .member-card-wrap:nth-child(1)  { animation-delay: .04s }
  .member-card-wrap:nth-child(2)  { animation-delay: .08s }
  .member-card-wrap:nth-child(3)  { animation-delay: .12s }
  .member-card-wrap:nth-child(4)  { animation-delay: .16s }
  .member-card-wrap:nth-child(5)  { animation-delay: .20s }
  .member-card-wrap:nth-child(6)  { animation-delay: .24s }
  .member-card-wrap:nth-child(7)  { animation-delay: .28s }
  .member-card-wrap:nth-child(8)  { animation-delay: .32s }
  .member-card-wrap:nth-child(n+9){ animation-delay: .36s }

  /* ── page hero ── */
  .members-hero {
    background: linear-gradient(135deg, #0a1929 0%, #1e3a5f 60%, #162d4a 100%);
    position: relative;
    overflow: hidden;
  }
  .members-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 90% 50%, rgba(200,151,42,.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(30,58,95,.6) 0%, transparent 60%);
    pointer-events: none;
  }
  /* decorative grid lines */
  .members-hero::after {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(200,151,42,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,151,42,.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* gold shimmer */
  .shimmer-gold {
    background: linear-gradient(90deg,#c8972a 0%,#e8c97a 40%,#c8972a 70%,#e8c97a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }

  /* gold rule */
  .gold-rule {
    height: 2px;
    background: linear-gradient(90deg,transparent,#c8972a 30%,#e8c97a 50%,#c8972a 70%,transparent);
  }
  .gold-rule-thin {
    height: 1px;
    background: linear-gradient(90deg,transparent,rgba(200,151,42,.5) 40%,transparent);
  }

  /* ── state filter bar ── */
  .state-bar {
    background: #fff;
    border-bottom: 1px solid #dde2ea;
    position: sticky;
    z-index: 20;
    top: 133px;        /* header(81) + navbar(52) */
  }
  .state-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 12.5px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    border: 1.5px solid #dde2ea;
    background: #fafaf8;
    color: #6b7a8d;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: all .2s;
    letter-spacing: .1px;
  }
  .state-chip:hover {
    border-color: #c8972a;
    color: #c8972a;
    background: #fff;
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(200,151,42,.12);
  }
  .state-chip.active {
    background: #1e3a5f;
    border-color: #1e3a5f;
    color: #fff;
    box-shadow: 0 4px 14px rgba(30,58,95,.25);
  }
  .state-chip.active:hover {
    background: #1e3a5f;
    color: #fff;
    transform: translateY(-1px);
  }

  /* ── member card ── */
  .member-card {
    background: #fff;
    border: 1.5px solid #dde2ea;
    border-radius: 14px;
    padding: 28px 20px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    transition: all .28s cubic-bezier(.22,.68,0,1.2);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .member-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #1e3a5f, #c8972a, #e8c97a, #c8972a, #1e3a5f);
    background-size: 200% auto;
    opacity: 0;
    transition: opacity .3s;
    animation: shimmer 3s linear infinite;
  }
  .member-card:hover {
    border-color: rgba(200,151,42,.4);
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(30,58,95,.13);
  }
  .member-card:hover::before { opacity: 1; }

  /* avatar ring */
  .avatar-ring {
    width: 80px; height: 80px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(135deg, #1e3a5f, #c8972a, #e8c97a);
    box-shadow: 0 4px 18px rgba(30,58,95,.18);
    transition: box-shadow .3s, transform .3s;
    flex-shrink: 0;
  }
  .member-card:hover .avatar-ring {
    box-shadow: 0 6px 24px rgba(200,151,42,.3);
    transform: scale(1.04);
  }
  .avatar-inner {
    width: 100%; height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: #f3f5f8;
    border: 2px solid #fff;
  }
  .avatar-inner img {
    width: 100%; height: 100%;
    object-fit: cover;
  }

  /* member name */
  .member-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-weight: 700;
    color: #0f1f33;
    text-align: center;
    line-height: 1.2;
    letter-spacing: .2px;
  }

  /* location */
  .member-location {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #6b7a8d;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }
  .member-location i { color: #c8972a; font-size: 10px; }

  /* badge */
  .member-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #c8972a;
    background: rgba(200,151,42,.08);
    border: 1px solid rgba(200,151,42,.22);
    font-family: 'DM Sans', sans-serif;
    margin-top: 2px;
  }
  .member-badge::before {
    content: '';
    display: inline-block;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #c8972a;
    animation: pulse 2.5s ease-in-out infinite;
  }

  /* ── stat strip ── */
  .stat-strip {
    display: flex;
    align-items: center;
    gap: 2px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(200,151,42,.18);
    border-radius: 10px;
    overflow: hidden;
  }
  .stat-item {
    flex: 1;
    padding: 12px 16px;
    text-align: center;
    position: relative;
  }
  .stat-item + .stat-item::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 1px;
    background: rgba(200,151,42,.2);
  }
  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
  }
  .stat-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: rgba(200,151,42,.7);
    margin-top: 3px;
  }

  /* loading spinner */
  .spinner {
    width: 36px; height: 36px;
    border: 3px solid #dde2ea;
    border-top-color: #c8972a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
  .scrollbar-hide::-webkit-scrollbar { display:none; }
`;

export default function Members() {
  const [activeState, setActiveState] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.getMembers(activeState)
      .then(res => setMembers(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeState]);

  const filtered = members.filter(m =>
    !search || m.name?.toLowerCase().includes(search.toLowerCase()) || m.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <section className="members-hero font-dm">
        <div className="max-w-7xl mx-auto px-5 py-12 relative" style={{ zIndex: 1 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

            {/* Left: heading */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-rule" style={{ width: 32, height: 2 }} />
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '2.5px',
                  textTransform: 'uppercase', color: 'rgba(200,151,42,.8)',
                }}>
                  Network Directory
                </span>
              </div>

              <h1 className="font-cormorant" style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0 }}>
                Our{' '}
                <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Members</span>
              </h1>
              <p className="font-dm" style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', marginTop: 10, maxWidth: 420, lineHeight: 1.7 }}>
                Verified media professionals from across India — journalists, reporters, editors &amp; broadcasters.
              </p>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 font-dm" style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
                <a href="/" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#c8972a'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.4)'}>Home</a>
                <span style={{ color: 'rgba(200,151,42,.4)' }}>›</span>
                <span style={{ color: 'rgba(255,255,255,.55)' }}>Members</span>
              </div>
            </div>

            {/* Right: stats + search */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
              {/* Stat strip */}
              <div className="stat-strip">
                {[
                  { number: members.length || '—', label: activeState === 'All' ? 'Total Members' : `${activeState} Members` },
                  { number: stateFilters.length - 1, label: 'States' },
                  { number: '100%', label: 'Verified' },
                ].map((s, i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-number">{s.number}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: 'rgba(200,151,42,.6)', fontSize: 13, pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  placeholder="Search by name or location…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px 10px 38px',
                    borderRadius: 8,
                    border: '1.5px solid rgba(200,151,42,.25)',
                    background: 'rgba(255,255,255,.07)',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'DM Sans, sans-serif',
                    outline: 'none',
                    backdropFilter: 'blur(8px)',
                    transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor='rgba(200,151,42,.6)'}
                  onBlur={e => e.target.style.borderColor='rgba(200,151,42,.25)'}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: 15,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* ── State filter bar ── */}
      <div className="state-bar">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {/* Count badge */}
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#6b7a8d', whiteSpace: 'nowrap',
              paddingRight: 8, borderRight: '1px solid #dde2ea', marginRight: 4,
              fontFamily: 'DM Sans, sans-serif',
            }}>
              {filtered.length} shown
            </span>

            {stateFilters.map(s => (
              <a
                href="#"
                key={s}
                className={`state-chip ${activeState === s ? 'active' : ''}`}
                onClick={e => { e.preventDefault(); setActiveState(s); setSearch(''); }}
              >
                {s === 'All' && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                )}
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Members grid ── */}
      <main className="max-w-7xl mx-auto px-5 font-dm" style={{ paddingTop: 36, paddingBottom: 80 }}>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '80px 0' }}>
            <div className="spinner" />
            <p style={{ fontSize: 13, color: '#6b7a8d', fontFamily: 'DM Sans, sans-serif' }}>
              Loading members…
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
          }}>
            {filtered.map((m, i) => (
              <div key={i} className="member-card-wrap anim-fade-up">
                <div className="member-card">
                  {/* Avatar */}
                  <div className="avatar-ring">
                    <div className="avatar-inner">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        onError={e => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=1e3a5f&color=fff&bold=true`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="member-name">{m.name}</div>

                  {m.location && (
                    <div className="member-location">
                      <i className="fas fa-map-marker-alt" />
                      {m.location}
                    </div>
                  )}

                  {m.role && (
                    <p style={{ fontSize: 11.5, color: '#6b7a8d', textAlign: 'center', margin: 0, fontFamily: 'DM Sans,sans-serif' }}>
                      {m.role}
                    </p>
                  )}

                  <div className="member-badge">AIMAMEDIA</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px', gap: 14 }}>
            {/* Decorative icon */}
            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: 'linear-gradient(135deg,#f3f5f8,#fff)',
              border: '2px solid #dde2ea',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, color: '#dde2ea',
            }}>
              <i className="fas fa-users" />
            </div>
            <h3 className="font-cormorant" style={{ fontSize: 22, fontWeight: 700, color: '#0f1f33', margin: 0 }}>
              No Members Found
            </h3>
            <p style={{ fontSize: 13, color: '#6b7a8d', textAlign: 'center', maxWidth: 320, lineHeight: 1.7, margin: 0 }}>
              {search
                ? `No results for "${search}". Try a different name or location.`
                : `No members registered for ${activeState} yet.`}
            </p>
            {(search || activeState !== 'All') && (
              <button
                onClick={() => { setActiveState('All'); setSearch(''); }}
                style={{
                  marginTop: 8,
                  padding: '8px 20px',
                  borderRadius: 6,
                  border: '1.5px solid #1e3a5f',
                  background: '#1e3a5f',
                  color: '#fff',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif',
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background='#c8972a'}
                onMouseLeave={e => e.currentTarget.style.background='#1e3a5f'}
              >
                Show All Members
              </button>
            )}
          </div>
        )}
      </main>
    </Layout>
  );
}
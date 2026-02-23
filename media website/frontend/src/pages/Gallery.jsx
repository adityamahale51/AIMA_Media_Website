// import { useState, useEffect } from 'react';
// import Layout from '../components/Layout';
// import { api } from '../api/api';

// export default function Gallery() {
//   const [images, setImages] = useState([]);
//   const [lightbox, setLightbox] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.getGallery()
//       .then(res => setImages(res.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <Layout>
//       <div className="page-header"><div className="container"><h1><i className="fas fa-images"></i> Photo Gallery</h1><div className="breadcrumb"><a href="/">Home</a> / Gallery</div></div></div>
//       <div className="state-tabs" style={{ padding: '12px 0' }}>
//         <div className="container">
//           {['All Photos', 'Events', 'Awards', 'Conferences', 'Meetings'].map((f, i) => (
//             <a href="#" key={f} className={i === 0 ? 'active' : ''} onClick={e => e.preventDefault()}>{f}</a>
//           ))}
//         </div>
//       </div>
//       <div className="gallery-grid" style={{ paddingBottom: '80px' }}>
//         {loading && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}><i className="fas fa-spinner fa-spin"></i> Loading gallery...</div>}
//         {images.map((img, i) => (
//           <div className="gallery-item" key={i} onClick={() => setLightbox(img.url)}>
//             <img src={img.url} alt={img.caption || `Gallery ${i + 1}`} />
//           </div>
//         ))}
//       </div>
//       {lightbox && (
//         <div style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 9999, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setLightbox(null)}>
//           <img src={lightbox} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px' }} alt="Gallery" />
//           <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '30px', cursor: 'pointer' }}>&times;</button>
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import { api } from '../api/api';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-dm        { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp  { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
  @keyframes shimmer { from { background-position:-200% center } to { background-position:200% center } }
  @keyframes spin    { to { transform:rotate(360deg) } }
  @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
  @keyframes zoomIn  { from { opacity:0; transform:scale(.94) } to { opacity:1; transform:scale(1) } }

  .anim-1 { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) .05s both; }
  .anim-2 { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) .15s both; }
  .anim-lightbox     { animation: fadeIn .25s ease both; }
  .anim-lightbox-img { animation: zoomIn .3s cubic-bezier(.22,.68,0,1.2) both; }

  .gallery-item-wrap { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) both; }
  .gallery-item-wrap:nth-child(1)  { animation-delay:.04s }
  .gallery-item-wrap:nth-child(2)  { animation-delay:.08s }
  .gallery-item-wrap:nth-child(3)  { animation-delay:.12s }
  .gallery-item-wrap:nth-child(4)  { animation-delay:.16s }
  .gallery-item-wrap:nth-child(5)  { animation-delay:.20s }
  .gallery-item-wrap:nth-child(6)  { animation-delay:.24s }
  .gallery-item-wrap:nth-child(n+7){ animation-delay:.28s }

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
  .gallery-hero {
    background: linear-gradient(135deg,#0a1929 0%,#1e3a5f 60%,#162d4a 100%);
    position:relative; overflow:hidden;
  }
  .gallery-hero::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse 55% 70% at 85% 50%, rgba(200,151,42,.08) 0%, transparent 65%),
      radial-gradient(ellipse 40% 60% at 5%  80%, rgba(30,58,95,.5)    0%, transparent 60%);
    pointer-events:none;
  }
  .gallery-hero::after {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(200,151,42,.035) 1px, transparent 1px),
      linear-gradient(90deg,rgba(200,151,42,.035) 1px, transparent 1px);
    background-size:52px 52px; pointer-events:none;
  }

  /* ── Filter bar ── */
  .filter-bar {
    background:#fff; border-bottom:1px solid #dde2ea;
    position:sticky; z-index:20; top:133px;
  }
  .filter-chip {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 16px; border-radius:6px;
    font-size:12.5px; font-weight:500; white-space:nowrap; cursor:pointer;
    border:1.5px solid #dde2ea; background:#fafaf8; color:#6b7a8d;
    font-family:'DM Sans',sans-serif; text-decoration:none;
    transition:all .2s; letter-spacing:.1px;
  }
  .filter-chip:hover { border-color:#c8972a; color:#c8972a; background:#fff; transform:translateY(-1px); box-shadow:0 3px 10px rgba(200,151,42,.12); }
  .filter-chip.active { background:#1e3a5f; border-color:#1e3a5f; color:#fff; box-shadow:0 4px 14px rgba(30,58,95,.25); }
  .filter-chip.active:hover { background:#1e3a5f; color:#fff; }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
  .scrollbar-hide::-webkit-scrollbar { display:none; }

  /* ── Gallery grid — uniform rows, all images fully visible ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  /* ── Gallery item ── */
  .gallery-item-wrap {
    /* fixed aspect ratio so every card is same height */
    aspect-ratio: 4 / 3;
    min-height: 0;
  }
  .gallery-item {
    width: 100%; height: 100%;
    border-radius: 14px; overflow: hidden; cursor: pointer;
    position: relative;
    border: 1.5px solid #dde2ea;
    background: #f3f5f8;
    transition: all .3s cubic-bezier(.22,.68,0,1.2);
  }
  .gallery-item:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 14px 42px rgba(30,58,95,.16);
    border-color: rgba(200,151,42,.45);
  }
  .gallery-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .5s ease;
  }
  .gallery-item:hover img { transform: scale(1.05); }

  /* Gradient overlay */
  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,25,41,.85) 0%, rgba(10,25,41,.15) 45%, transparent 100%);
    opacity: 0; transition: opacity .3s;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 16px;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }

  .gallery-caption {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-weight: 600; color: #fff;
    line-height: 1.3; margin-bottom: 6px;
  }
  .gallery-tag {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 8px; border-radius: 4px;
    font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    background: rgba(200,151,42,.88); color: #0f1f33;
    font-family: 'DM Sans', sans-serif; width: fit-content;
  }

  /* Zoom icon */
  .gallery-zoom {
    position: absolute; top: 10px; right: 10px;
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,.92); border: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; color: #1e3a5f; cursor: pointer;
    opacity: 0; transform: scale(.8);
    transition: all .22s;
    backdrop-filter: blur(4px);
  }
  .gallery-item:hover .gallery-zoom { opacity: 1; transform: scale(1); }
  .gallery-zoom:hover { background: #c8972a !important; color: #fff !important; }

  /* page spinner */
  .page-spinner {
    width: 40px; height: 40px; border-radius: 50%;
    border: 3px solid #dde2ea; border-top-color: #c8972a;
    animation: spin 1s linear infinite; margin: 0 auto;
  }

  /* ── Lightbox ── */
  .lightbox-bg {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5,12,22,.96);
    backdrop-filter: blur(14px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; cursor: zoom-out;
  }
  .lightbox-inner {
    position: relative; cursor: default;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    max-width: 90vw;
  }
  .lightbox-img {
    max-width: 88vw; max-height: 80vh;
    border-radius: 12px;
    border: 2px solid rgba(200,151,42,.35);
    box-shadow: 0 28px 80px rgba(0,0,0,.75);
    object-fit: contain; display: block;
  }
  .lightbox-caption {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 600; color: rgba(255,255,255,.75);
    text-align: center;
  }
  .lightbox-close {
    position: fixed; top: 18px; right: 18px;
    width: 42px; height: 42px; border-radius: 10px;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; color: #fff; cursor: pointer;
    transition: all .2s; backdrop-filter: blur(8px); line-height:1;
  }
  .lightbox-close:hover { background: rgba(200,151,42,.35); border-color: rgba(200,151,42,.6); }
  .lightbox-nav {
    position: fixed; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 10px;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; color: #fff; cursor: pointer;
    transition: all .2s; backdrop-filter: blur(8px);
  }
  .lightbox-nav:hover { background: rgba(200,151,42,.35); border-color: rgba(200,151,42,.6); }
  .lightbox-nav.prev { left: 14px; }
  .lightbox-nav.next { right: 14px; }
  .lightbox-counter {
    position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
    padding: 6px 18px; border-radius: 20px;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,.7);
    font-family: 'DM Sans', sans-serif; backdrop-filter: blur(8px); letter-spacing: .4px;
  }

  /* empty state */
  .empty-state {
    display: flex; flex-direction: column; align-items: center;
    padding: 80px 20px; gap: 14px;
  }
  .empty-icon {
    width: 72px; height: 72px; border-radius: 18px;
    background: linear-gradient(135deg,#f3f5f8,#fff);
    border: 2px solid #dde2ea;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; color: #dde2ea;
  }

  @media (max-width:600px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .gallery-item-wrap { aspect-ratio: 1; }
  }
`;

const FILTERS = ['All Photos', 'Events', 'Awards', 'Conferences', 'Meetings'];

export default function Gallery() {
  const [images, setImages]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Photos');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.getGallery()
      .then(res => setImages(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useCallback(() => {
    if (activeFilter === 'All Photos') return images;
    return images.filter(img => img.category === activeFilter);
  }, [images, activeFilter])();

  // keyboard nav
  useEffect(() => {
    if (!lightbox) return;
    const handler = e => {
      if (e.key === 'Escape')      setLightbox(null);
      if (e.key === 'ArrowRight')  setLightbox(lb => ({ ...lb, index: Math.min(lb.index + 1, filtered.length - 1) }));
      if (e.key === 'ArrowLeft')   setLightbox(lb => ({ ...lb, index: Math.max(lb.index - 1, 0) }));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, filtered]);

  const currentImg = lightbox ? filtered[lightbox.index] : null;

  return (
    <Layout>
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <section className="gallery-hero font-dm">
        <div className="max-w-7xl mx-auto px-5 py-12 relative" style={{ zIndex:1 }}>
          <div className="anim-1">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <div className="gold-rule" style={{ width:32 }} />
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(200,151,42,.8)', fontFamily:'DM Sans,sans-serif' }}>
                Visual Archive
              </span>
            </div>
            <h1 className="font-cormorant" style={{ fontSize:'clamp(34px,5vw,52px)', fontWeight:700, color:'#fff', lineHeight:1.1, margin:'0 0 10px' }}>
              Photo <em className="shimmer-gold" style={{ fontStyle:'italic' }}>Gallery</em>
            </h1>
            <p className="font-dm" style={{ fontSize:14, color:'rgba(255,255,255,.45)', maxWidth:440, lineHeight:1.75, margin:'0 0 18px' }}>
              Moments from events, award ceremonies, conferences and gatherings across India.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'rgba(255,255,255,.3)', fontFamily:'DM Sans,sans-serif' }}>
              <a href="/"
                style={{ color:'rgba(255,255,255,.4)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#c8972a'; }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,.4)'; }}>
                Home
              </a>
              <span style={{ color:'rgba(200,151,42,.4)' }}>›</span>
              <span style={{ color:'rgba(255,255,255,.55)' }}>Gallery</span>
            </div>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* ── Filter bar ── */}
      <div className="filter-bar">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <span style={{
              fontSize:11, fontWeight:600, color:'#6b7a8d', whiteSpace:'nowrap',
              paddingRight:10, borderRight:'1px solid #dde2ea', marginRight:4,
              fontFamily:'DM Sans,sans-serif',
            }}>
              {filtered.length} photos
            </span>
            {FILTERS.map(f => (
              <a href="#" key={f}
                className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                onClick={e => { e.preventDefault(); setActiveFilter(f); }}
              >
                {f}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <main className="max-w-7xl mx-auto px-5 font-dm" style={{ paddingTop:32, paddingBottom:80 }}>

        {loading && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'60px 0' }}>
            <div className="page-spinner" />
            <p style={{ fontSize:13, color:'#6b7a8d', fontFamily:'DM Sans,sans-serif' }}>Loading gallery…</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><i className="fas fa-images" /></div>
            <h3 className="font-cormorant" style={{ fontSize:22, fontWeight:700, color:'#0f1f33', margin:0 }}>
              No Photos Found
            </h3>
            <p style={{ fontSize:13, color:'#6b7a8d', textAlign:'center', maxWidth:300, lineHeight:1.7, margin:0 }}>
              {activeFilter === 'All Photos'
                ? 'No gallery images have been uploaded yet.'
                : `No photos in the "${activeFilter}" category yet.`}
            </p>
            {activeFilter !== 'All Photos' && (
              <button
                onClick={() => setActiveFilter('All Photos')}
                style={{
                  padding:'8px 20px', borderRadius:6,
                  border:'1.5px solid #1e3a5f', background:'#1e3a5f',
                  color:'#fff', fontSize:13, fontWeight:600,
                  fontFamily:'DM Sans,sans-serif', cursor:'pointer', marginTop:4,
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#c8972a'; e.currentTarget.style.borderColor='#c8972a'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#1e3a5f'; e.currentTarget.style.borderColor='#1e3a5f'; }}
              >
                View All Photos
              </button>
            )}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="gallery-item-wrap"
                onClick={() => setLightbox({ index: i })}
              >
                <div className="gallery-item">
                  <img
                    src={img.url}
                    alt={img.caption || `Gallery ${i + 1}`}
                    loading="lazy"
                    onError={e => { e.target.src = `https://picsum.photos/seed/${i + 10}/600/450`; }}
                  />

                  {/* Overlay */}
                  <div className="gallery-overlay">
                    {img.caption && <div className="gallery-caption">{img.caption}</div>}
                    {img.category && (
                      <div className="gallery-tag">
                        <i className="fas fa-tag" style={{ fontSize:8 }} /> {img.category}
                      </div>
                    )}
                  </div>

                  {/* Zoom btn */}
                  <button
                    className="gallery-zoom"
                    onClick={e => { e.stopPropagation(); setLightbox({ index: i }); }}
                  >
                    <i className="fas fa-expand-alt" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Lightbox ── */}
      {lightbox && currentImg && (
        <div className="lightbox-bg anim-lightbox" onClick={() => setLightbox(null)}>

          {/* Close */}
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>

          {/* Prev */}
          {lightbox.index > 0 && (
            <button className="lightbox-nav prev"
              onClick={e => { e.stopPropagation(); setLightbox(lb => ({ index: lb.index - 1 })); }}>
              ‹
            </button>
          )}

          {/* Image */}
          <div className="lightbox-inner anim-lightbox-img" onClick={e => e.stopPropagation()}>
            <img src={currentImg.url} className="lightbox-img" alt={currentImg.caption || 'Gallery'} />
            {currentImg.caption && (
              <div className="lightbox-caption">{currentImg.caption}</div>
            )}
          </div>

          {/* Next */}
          {lightbox.index < filtered.length - 1 && (
            <button className="lightbox-nav next"
              onClick={e => { e.stopPropagation(); setLightbox(lb => ({ index: lb.index + 1 })); }}>
              ›
            </button>
          )}

          {/* Counter */}
          <div className="lightbox-counter">
            {lightbox.index + 1} / {filtered.length}
          </div>
        </div>
      )}
    </Layout>
  );
}
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function EditorialPolicy() {
  return (
    <Layout>
      <div className="page-header"><div className="container"><h1><i className="fas fa-gavel"></i> Editorial Policy</h1><div className="breadcrumb"><Link to="/">Home</Link> / Editorial Policy</div></div></div>
      <div className="about-content" style={{ paddingBottom: '80px' }}>
        <div className="about-card">
          <h2>Editorial Policy</h2>
          <p><strong>Organization:</strong> IDMA – Indian Digital Media Association</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>1. Content Responsibility</h3>
          <p>Members are fully responsible for the content they submit. All articles, images, and media uploaded to the platform must be original or properly attributed.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>2. Prohibited Content</h3>
          <p>IDMA strictly prohibits the following types of content:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
            {[
              { icon: 'fas fa-ban', label: 'Defamation', desc: 'Content that damages the reputation of individuals or organizations', color: '#c62828' },
              { icon: 'fas fa-fist-raised', label: 'Hate Speech', desc: 'Content promoting hatred against any community, religion, or group', color: '#c62828' },
              { icon: 'fas fa-exclamation-triangle', label: 'Fake News', desc: 'Deliberately false or misleading information', color: '#e65100' },
              { icon: 'fas fa-copyright', label: 'Copyright Violations', desc: 'Use of copyrighted material without proper authorization', color: '#7b1fa2' },
              { icon: 'fas fa-user-secret', label: 'Impersonation', desc: 'Pretending to be another person or organization', color: '#616161' },
              { icon: 'fas fa-skull-crossbones', label: 'Illegal Content', desc: 'Content that violates Indian law or promotes illegal activities', color: '#212121' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg-light)', padding: '12px', borderRadius: 'var(--radius)', borderLeft: `4px solid ${item.color}` }}>
                <h4 style={{ fontSize: '13px', color: item.color, marginBottom: '4px' }}><i className={item.icon}></i> {item.label}</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>3. Editorial Review Process</h3>
          <p>All articles are reviewed before publishing through the following workflow:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            {['Draft', 'Submitted', 'Reviewed', 'Approved', 'Published'].map((s, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ padding: '6px 14px', borderRadius: '20px', background: i === 4 ? '#2e7d32' : 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 600 }}>{s}</span>
                {i < 4 && <i className="fas fa-arrow-right" style={{ color: 'var(--text-light)', fontSize: '12px' }}></i>}
              </span>
            ))}
          </div>
          <p style={{ marginTop: '10px' }}>No auto-publishing. Every article goes through manual review.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>4. Content Moderation</h3>
          <p><strong>Automated Checks:</strong> Spam detection, duplicate content check.</p>
          <p><strong>Manual Review:</strong> Fact plausibility, legal sensitivity, defamation risk assessment.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>5. Immediate Suspension</h3>
          <p>A member's account may be immediately suspended if:</p>
          <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>
            <li style={{ fontSize: '14px', marginBottom: '6px' }}>Fake or fabricated reporting is detected</li>
            <li style={{ fontSize: '14px', marginBottom: '6px' }}>Illegal use of IDMA Digital ID</li>
            <li style={{ fontSize: '14px', marginBottom: '6px' }}>A legal complaint is received against the member</li>
          </ul>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>6. Content Removal</h3>
          <p>IDMA reserves the right to remove any content at any time without prior notice if it violates this policy or any applicable laws.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>7. Appeals</h3>
          <p>If your content is rejected or removed, you may appeal by contacting <strong>editorial@idma.org</strong> with your article ID and reason for appeal.</p>
        </div>
      </div>
    </Layout>
  );
}

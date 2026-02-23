import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CodeOfEthics() {
  return (
    <Layout>
      <div className="page-header"><div className="container"><h1><i className="fas fa-balance-scale"></i> Code of Ethics</h1><div className="breadcrumb"><Link to="/">Home</Link> / Code of Ethics</div></div></div>
      <div className="about-content" style={{ paddingBottom: '80px' }}>
        <div className="about-card">
          <h2>Code of Ethics for IDMA Members</h2>
          <p>As a member of IDMA – Indian Digital Media Association, you agree to uphold the following ethical standards in all your professional activities.</p>

          <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
            {[
              { icon: 'fas fa-check-double', title: 'Accuracy & Truth', desc: 'Report facts truthfully and verify information before publishing. Correct errors promptly and transparently.', color: '#2e7d32' },
              { icon: 'fas fa-balance-scale', title: 'Fairness & Impartiality', desc: 'Present all sides of a story. Avoid bias, prejudice, or discrimination in reporting. Distinguish clearly between news and opinion.', color: 'var(--primary)' },
              { icon: 'fas fa-shield-alt', title: 'Independence', desc: 'Maintain editorial independence. Do not accept bribes, gifts, or favors that could influence reporting. Disclose conflicts of interest.', color: 'var(--accent)' },
              { icon: 'fas fa-user-lock', title: 'Privacy & Dignity', desc: 'Respect the privacy of individuals. Obtain consent before publishing personal information. Show sensitivity in covering tragedies.', color: '#7b1fa2' },
              { icon: 'fas fa-hands-helping', title: 'Accountability', desc: 'Accept responsibility for your work. Respond to public concerns about accuracy and fairness. Cooperate with IDMA editorial review.', color: 'var(--secondary)' },
              { icon: 'fas fa-gavel', title: 'Legal Compliance', desc: 'Obey all applicable laws. Respect copyright and intellectual property. Do not publish content that incites violence or hatred.', color: '#616161' },
              { icon: 'fas fa-id-card', title: 'ID Card Usage', desc: 'Use IDMA Digital ID only for legitimate media purposes. Do not misrepresent your membership tier, role, or affiliation.', color: '#00796b' },
              { icon: 'fas fa-handshake', title: 'Professional Conduct', desc: 'Treat colleagues, sources, and the public with respect. Do not engage in harassment, bullying, or unethical behavior.', color: '#e65100' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg-light)', padding: '20px', borderRadius: 'var(--radius)', borderLeft: `4px solid ${item.color}`, display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: item.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}><i className={item.icon}></i></div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-dark)', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-medium)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', background: '#e8f5e9', padding: '20px', borderRadius: 'var(--radius)', borderLeft: '4px solid #2e7d32' }}>
            <h3 style={{ fontSize: '16px', color: '#2e7d32', marginBottom: '8px' }}><i className="fas fa-lightbulb"></i> Our Commitment</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-medium)' }}>IDMA is committed to maintaining the highest standards of ethical journalism. Members who violate this code may face content removal, account suspension, or permanent expulsion from the network.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

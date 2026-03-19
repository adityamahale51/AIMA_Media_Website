import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api/api';

export default function Verification() {
  const { membershipId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!membershipId) { setLoading(false); setError('No membership ID provided.'); return; }
    api.verifyMember(membershipId)
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [membershipId]);

  return (
    <Layout>
      <div className="page-header"><div className="container"><h1><i className="fas fa-check-circle"></i> Member Verification</h1><div className="breadcrumb"><Link to="/">Home</Link> / Verification</div></div></div>
      <div style={{ maxWidth: '600px', margin: '30px auto', padding: '0 15px', paddingBottom: '80px' }}>
        {loading && <div style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-spinner fa-spin"></i> Verifying membership...</div>}

        {error && (
          <div style={{ background: '#ffebee', borderRadius: 'var(--radius)', padding: '30px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
            <i className="fas fa-times-circle" style={{ fontSize: '48px', color: '#c62828', marginBottom: '12px', display: 'block' }}></i>
            <h3 style={{ color: '#c62828', marginBottom: '8px' }}>Verification Failed</h3>
            <p style={{ color: 'var(--text-medium)', fontSize: '14px' }}>{error}</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}><i className="fas fa-home"></i> Go Home</Link>
          </div>
        )}

        {data && (
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ background: data.status === 'approved' ? 'linear-gradient(135deg, #1b5e20, #2e7d32)' : 'linear-gradient(135deg, #e65100, #ff8f00)', color: 'white', padding: '30px', textAlign: 'center' }}>
              <i className={`fas fa-${data.status === 'approved' ? 'check-circle' : 'clock'}`} style={{ fontSize: '48px', marginBottom: '12px', display: 'block' }}></i>
              <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
                {data.status === 'approved' ? 'Verified Member' : 'Verification Pending'}
              </h2>
              <p style={{ opacity: 0.9, fontSize: '13px', marginTop: '4px' }}>IDMA - Indian Digital Media Association</p>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, margin: '0 auto 10px' }}>{data.name.charAt(0)}</div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-dark)' }}>{data.name}</h3>
                {data.designation && <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>{data.designation}</p>}
                {data.organization && <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>{data.organization}</p>}
              </div>
              <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '16px' }}>
                {[
                  { label: 'Membership ID', value: data.membershipId, icon: 'fas fa-fingerprint' },
                  { label: 'Membership Tier', value: data.tier, icon: 'fas fa-crown' },
                  { label: 'Location', value: `${data.city}, ${data.state}`, icon: 'fas fa-map-marker-alt' },
                  { label: 'Valid Until', value: data.validity, icon: 'fas fa-calendar-alt' },
                  { label: 'Status', value: data.status === 'approved' ? 'Active & Verified' : 'Pending Review', icon: 'fas fa-shield-alt' },
                  { label: 'Joined', value: data.joinedDate, icon: 'fas fa-user-plus' },
                ].map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <i className={d.icon} style={{ width: '30px', color: 'var(--primary)', fontSize: '14px' }}></i>
                    <span style={{ width: '130px', fontSize: '13px', color: 'var(--text-light)' }}>{d.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)' }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff3e0', padding: '14px 24px', borderTop: '2px solid var(--accent)' }}>
              <p style={{ fontSize: '11px', color: '#e65100', lineHeight: 1.5 }}>
                <i className="fas fa-exclamation-triangle"></i> <strong>Disclaimer:</strong> {data.disclaimer}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

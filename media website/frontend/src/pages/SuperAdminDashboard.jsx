import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'super_admin') {
      if (user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'super_admin') return null;

  return (
    <Layout>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-user-shield"></i> Super Admin Dashboard</h1>
          <div className="breadcrumb"><Link to="/">Home</Link> / Super Admin</div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px 80px' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>System Control</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>
            You can access all member and admin areas. Use this panel for top-level governance and role-sensitive operations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
          <Link to="/admin" style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '16px', textDecoration: 'none', color: 'var(--text-dark)' }}>
            <h4><i className="fas fa-shield-alt"></i> Admin Dashboard</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Open moderation, member and content controls.</p>
          </Link>
          <Link to="/dashboard" style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '16px', textDecoration: 'none', color: 'var(--text-dark)' }}>
            <h4><i className="fas fa-th-large"></i> Member Dashboard View</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Access member-facing workflow and tools.</p>
          </Link>
          <Link to="/membership-plans" style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '16px', textDecoration: 'none', color: 'var(--text-dark)' }}>
            <h4><i className="fas fa-tags"></i> Plans & Billing</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Review plan catalog and transactions.</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

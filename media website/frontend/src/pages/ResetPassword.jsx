import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api/api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    setError(null);

    try {
      await api.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. The link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e3a5f', marginBottom: '10px', textAlign: 'center' }}>Reset Password</h2>
          <p style={{ fontSize: '14px', color: '#6b7a8d', marginBottom: '24px', textAlign: 'center' }}>
            Enter your new password below.
          </p>

          {success ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ padding: '12px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                <i className="fas fa-check-circle" style={{ display: 'block', fontSize: '30px', marginBottom: '10px' }}></i>
                Password has been reset successfully! Redirecting to login...
              </div>
              <Link to="/login" style={{ color: '#1e3a5f', fontWeight: 600 }}>Click here if not redirected</Link>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ padding: '12px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                  <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e3a5f', marginBottom: '8px' }}>New Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #dde2ea', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e3a5f', marginBottom: '8px' }}>Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #dde2ea', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '14px', background: '#1e3a5f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Reset Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

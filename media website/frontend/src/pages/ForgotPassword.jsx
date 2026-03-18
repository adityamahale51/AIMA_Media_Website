import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await api.forgotPassword(email);
      setMessage('Password reset link has been sent to your email.');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e3a5f', marginBottom: '10px', textAlign: 'center' }}>Forgot Password</h2>
          <p style={{ fontSize: '14px', color: '#6b7a8d', marginBottom: '24px', textAlign: 'center' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {message && (
            <div style={{ padding: '12px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> {message}
            </div>
          )}

          {error && (
            <div style={{ padding: '12px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e3a5f', marginBottom: '8px' }}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #dde2ea', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: '#1e3a5f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Send Reset Link'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/login" style={{ fontSize: '14px', color: '#c8972a', textDecoration: 'none', fontWeight: 600 }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '6px' }}></i> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

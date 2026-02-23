import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function RefundPolicy() {
  return (
    <Layout>
      <div className="page-header"><div className="container"><h1><i className="fas fa-undo"></i> Refund Policy</h1><div className="breadcrumb"><Link to="/">Home</Link> / Refund Policy</div></div></div>
      <div className="about-content" style={{ paddingBottom: '80px' }}>
        <div className="about-card">
          <h2>Refund Policy</h2>
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p><strong>Organization:</strong> IDMA – Indian Digital Media Association</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>1. Refund Eligibility</h3>
          <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--radius)', marginTop: '10px', borderLeft: '4px solid #2e7d32' }}>
            <h4 style={{ fontSize: '14px', color: '#2e7d32', marginBottom: '6px' }}><i className="fas fa-check-circle"></i> Eligible for Refund</h4>
            <p style={{ fontSize: '13px' }}>If your membership application is <strong>rejected</strong> by the admin review team, you are entitled to a full refund within <strong>7 business days</strong> of rejection.</p>
          </div>
          <div style={{ background: '#ffebee', padding: '16px', borderRadius: 'var(--radius)', marginTop: '10px', borderLeft: '4px solid #c62828' }}>
            <h4 style={{ fontSize: '14px', color: '#c62828', marginBottom: '6px' }}><i className="fas fa-times-circle"></i> Not Eligible for Refund</h4>
            <p style={{ fontSize: '13px' }}>Once your membership is <strong>approved</strong>, the membership fee is <strong>non-refundable</strong>. This includes mid-term cancellations, voluntary exits, or account suspensions due to policy violations.</p>
          </div>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>2. How to Request a Refund</h3>
          <p>Send an email to <strong>refunds@idma.org</strong> with your membership ID and reason for refund request. Include your payment receipt or transaction ID.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>3. Refund Processing</h3>
          <p>Approved refunds will be processed to the original payment method within 7 business days. The refund amount will be the full membership fee paid.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>4. Additional Services</h3>
          <p>Fees paid for additional services (featured articles, homepage features, webinars, PR publishing, portfolio boost) are non-refundable once the service has been delivered or the content has been published.</p>

          <h3 style={{ marginTop: '20px', fontSize: '16px', color: 'var(--primary)' }}>5. Disputes</h3>
          <p>If you disagree with a refund decision, you may escalate the matter to <strong>support@idma.org</strong>. All disputes are subject to the jurisdiction of courts in Punjab, India.</p>
        </div>
      </div>
    </Layout>
  );
}

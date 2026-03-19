import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
    .pp-anim-down  { animation:fadeSlideDown .7s ease both; }
    .pp-anim-up    { animation:fadeSlideUp   .7s ease both; }
    .pp-page-header { background:#1e3a5f; padding:44px 0 34px; position:relative; overflow:hidden; }
    .pp-header-inner { max-width:1000px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }
    .pp-header-title { font-family:'Playfair Display',serif; font-size:clamp(30px,4vw,46px); font-weight:900; color:#fff; line-height:1.1; margin:0 0 10px; }
    .pp-header-title em { font-style:italic; color:#c8972a; }
    .pp-body { background:#fafaf8; padding:36px 24px 60px; font-family:'DM Sans',sans-serif; }
    .pp-main-card { background:#fff; border:1px solid #dde2ea; border-radius:10px; box-shadow:0 2px 16px rgba(15,31,51,.05); overflow:hidden; max-width:1000px; margin:0 auto; }
    .pp-card-top { background:#1e3a5f; padding:22px 28px 18px; position:relative; }
    .pp-card-top-title { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#fff; margin:0; }
    .pp-card-body { padding:32px; }
    .pp-section { margin-bottom:30px; }
    .pp-section-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#0f1f33; margin-bottom:12px; }
    .pp-section-body { font-size:14.5px; line-height:1.75; color:#374151; }
    .pp-highlight-box { padding:14px 16px; border-radius:8px; border-left:4px solid #c8972a; background:rgba(200,151,42,.06); margin-bottom:15px; }
  `}</style>
);

export default function EditorialPolicy() {
  return (
    <Layout>
      <GlobalStyles />
      <div className="pp-page-header pp-anim-down">
        <div className="pp-header-inner">
          <h1 className="pp-header-title">Editorial <em>Policy</em></h1>
        </div>
      </div>
      <div className="pp-body">
        <div className="pp-main-card pp-anim-up">
          <div className="pp-card-top">
            <h2 className="pp-card-top-title">IDMA Editorial Standards</h2>
          </div>
          <div className="pp-card-body">
            <div className="pp-section">
              <h3 className="pp-section-title">1. Responsibility for Content</h3>
              <div className="pp-section-body">
                <p>Members of the Indian Digital Media Association (IDMA) are solely responsible for the content they submit. IDMA provides a platform for verified media professionals but does not endorse the views expressed in individual articles.</p>
              </div>
            </div>
            <div className="pp-section">
              <h3 className="pp-section-title">2. Prohibited Content</h3>
              <div className="pp-section-body">
                <div className="pp-highlight-box">
                  <strong>IDMA strictly prohibits:</strong>
                  <ul style={{ marginTop: '10px' }}>
                    <li>Defamation and Libel</li>
                    <li>Hate speech or incitement to violence</li>
                    <li>Fake news or intentionally misleading information</li>
                    <li>Copyright violations and plagiarism</li>
                    <li>Impersonation of individuals or organizations</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pp-section">
              <h3 className="pp-section-title">3. Review Process</h3>
              <div className="pp-section-body">
                <p>All articles submitted by members undergo a review process before being published. Our editorial team checks for compliance with our core principles and legal safety. No article is automatically published.</p>
              </div>
            </div>
            <div className="pp-section">
              <h3 className="pp-section-title">4. Right to Remove</h3>
              <div className="pp-section-body">
                <p>IDMA reserves the right to remove any content that is found to be in violation of our policies or receives a valid legal complaint. We also reserve the right to suspend members who repeatedly violate editorial standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

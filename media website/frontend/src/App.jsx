import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import NewsUpload from './pages/NewsUpload';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Admin from './pages/Admin';
import MembershipPlans from './pages/MembershipPlans';
import DigitalID from './pages/DigitalID';
import Verification from './pages/Verification';
import ArticleStatus from './pages/ArticleStatus';
import InvoiceHistory from './pages/InvoiceHistory';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import EditorialPolicy from './pages/EditorialPolicy';
import CodeOfEthics from './pages/CodeOfEthics';
import Disclaimer from './pages/Disclaimer';
import './styles.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/members" element={<Members />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news-upload" element={<NewsUpload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/membership-plans" element={<MembershipPlans />} />
          <Route path="/digital-id" element={<DigitalID />} />
          <Route path="/verify/:membershipId" element={<Verification />} />
          <Route path="/my-articles" element={<ArticleStatus />} />
          <Route path="/invoices" element={<InvoiceHistory />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/code-of-ethics" element={<CodeOfEthics />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

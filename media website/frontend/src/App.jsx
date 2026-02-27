import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import NewsUpload from './pages/NewsUpload';
import NewsList from './pages/news/NewsList';
import NewsDetails from './pages/news/NewsDetails';
import CreateNews from './pages/news/CreateNews';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import AdminDashboard from './pages/Admin';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
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

function ProtectedRoute({ children, allowRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const role = user.role;
  if (allowRoles.includes(role)) return children;

  if (role === 'member') return <Navigate to="/dashboard" replace />;
  if (role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'super_admin') return <Navigate to="/super-admin" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowRoles={['member', 'admin', 'super_admin']}>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/members" element={<Members />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news-upload" element={<NewsUpload />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/create" element={<CreateNews />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowRoles={['admin', 'super_admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowRoles={['super_admin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

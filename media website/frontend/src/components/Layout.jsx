// import { Link, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { stateTabs } from '../data/staticData';

// function TopBar() {
//   return (
//     <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
//         <div className="flex items-center gap-2 text-slate-700 font-semibold">
//           <span className="inline-block w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
//           AIMA MEDIA
//         </div>
//         <div className="flex gap-6 text-slate-600">
//           <Link to="/about" className="hover:text-teal-600 transition-colors duration-300">
//             About
//           </Link>
//           <Link to="/terms" className="hover:text-teal-600 transition-colors duration-300">
//             Terms & Conditions
//           </Link>
//           <Link to="/contact" className="hover:text-teal-600 transition-colors duration-300">
//             Contact
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Header() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <header 
//         className={`sticky top-0 z-40 bg-white shadow-md transition-all duration-300 ${
//           scrolled ? 'shadow-lg' : 'shadow-sm'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link to="/" className="group flex items-center gap-3">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-70"></div>
//                 <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 p-3 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
//                   <i className="fas fa-newspaper text-2xl text-white"></i>
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                   AIMA MEDIA
//                 </h1>
//                 <p className="text-xs text-slate-500 font-medium">All India Media Association</p>
//               </div>
//             </Link>
            
//             <div className="hidden md:flex items-center gap-4">
//               <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full border border-teal-200">
//                 <i className="fas fa-phone-alt text-teal-600"></i>
//                 <span className="text-sm font-semibold text-slate-700">+91 1234567890</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
//                 <i className="fas fa-envelope text-blue-600"></i>
//                 <span className="text-sm font-semibold text-slate-700">info@aimamedia.org</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const path = useLocation().pathname;

//   const publicLinks = [
//     { to: '/', icon: 'fas fa-home', label: 'Home' },
//     { to: '/login', icon: 'fas fa-sign-in-alt', label: 'Login' },
//     { to: '/news-upload', icon: 'fas fa-upload', label: 'News Upload' },
//     { to: '/about', icon: 'fas fa-info-circle', label: 'About Us' },
//     { to: '/members', icon: 'fas fa-users', label: 'Members' },
//     { to: '/register', icon: 'fas fa-user-plus', label: 'Join Us' },
//     { to: '/membership-plans', icon: 'fas fa-tags', label: 'Membership' },
//     { to: '/gallery', icon: 'fas fa-images', label: 'Gallery' },
//     { to: '/profile', icon: 'fas fa-chart-line', label: 'Profile Status' },
//     { to: '/edit-profile', icon: 'fas fa-edit', label: 'Edit Profile' },
//     { to: '/contact', icon: 'fas fa-envelope', label: 'Contact Us' },
//   ];

//   const authLinks = [
//     { to: '/', icon: 'fas fa-home', label: 'Home' },
//     { to: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
//     { to: '/about', icon: 'fas fa-info-circle', label: 'About Us' },
//     { to: '/members', icon: 'fas fa-users', label: 'Members' },
//     { to: '/membership-plans', icon: 'fas fa-tags', label: 'Membership' },
//     { to: '/gallery', icon: 'fas fa-images', label: 'Gallery' },
//     { to: '/my-articles', icon: 'fas fa-newspaper', label: 'My Articles' },
//     { to: '/profile', icon: 'fas fa-chart-line', label: 'Profile' },
//     ...(user && user.role === 'admin' ? [{ to: '/admin', icon: 'fas fa-shield-alt', label: 'Admin' }] : []),
//   ];

//   const links = user ? authLinks : publicLinks;

//   return (
//     <nav className="bg-gradient-to-r from-slate-800 to-slate-700 sticky top-[73px] z-30 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-14">
//           <ul className="hidden lg:flex items-center gap-1 flex-1">
//             {links.slice(0, 8).map((l, i) => (
//               <li key={i} className="relative group">
//                 <Link
//                   to={l.to}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                     path === l.to
//                       ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
//                       : 'text-slate-200 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <i className={l.icon}></i>
//                   <span>{l.label}</span>
//                 </Link>
//                 {path === l.to && (
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></div>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <div className="hidden lg:flex items-center gap-2">
//             {user ? (
//               <>
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
//                     {user.name?.charAt(0) || 'U'}
//                   </div>
//                   <span className="text-sm font-medium text-white">{user.name}</span>
//                 </div>
//                 <button
//                   onClick={logout}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
//                 >
//                   <i className="fas fa-sign-out-alt"></i>
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 <i className="fas fa-sign-in-alt"></i>
//                 <span>Login</span>
//               </Link>
//             )}
//           </div>

//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
//           >
//             <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-white text-xl`}></i>
//           </button>
//         </div>

//         <div
//           className={`lg:hidden overflow-hidden transition-all duration-300 ${
//             menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
//           }`}
//         >
//           <ul className="py-4 space-y-1">
//             {links.map((l, i) => (
//               <li key={i}>
//                 <Link
//                   to={l.to}
//                   onClick={() => setMenuOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
//                     path === l.to
//                       ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg transform scale-105'
//                       : 'text-slate-200 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <i className={`${l.icon} w-5`}></i>
//                   <span className="font-medium">{l.label}</span>
//                 </Link>
//               </li>
//             ))}
//             {user && (
//               <li>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     logout();
//                     setMenuOpen(false);
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-300 font-medium"
//                 >
//                   <i className="fas fa-sign-out-alt w-5"></i>
//                   <span>Logout</span>
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function Footer() {
//   return (
//     <footer className="bg-gradient-to-br from-slate-50 to-blue-50 border-t border-slate-200 mt-20">
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
//               About AIMA Media
//             </h3>
//             <p className="text-slate-600 text-sm leading-relaxed">
//               All India Media Association (AIMA) is a platform for media professionals across India. 
//               India's Digital-First Verified Media Professionals Network.
//             </p>
//             <div className="flex gap-3">
//               {['facebook-f', 'twitter', 'linkedin-in', 'instagram', 'youtube'].map((icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gradient-to-br hover:from-teal-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
//                 >
//                   <i className={`fab fa-${icon}`}></i>
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
//               Quick Links
//             </h3>
//             <ul className="space-y-2">
//               {[
//                 { to: '/', label: 'Home' },
//                 { to: '/about', label: 'About Us' },
//                 { to: '/members', label: 'Members' },
//                 { to: '/gallery', label: 'Gallery' },
//                 { to: '/membership-plans', label: 'Membership Plans' },
//                 { to: '/contact', label: 'Contact Us' },
//               ].map((link, i) => (
//                 <li key={i}>
//                   <Link
//                     to={link.to}
//                     className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm flex items-center gap-2 group"
//                   >
//                     <i className="fas fa-chevron-right text-xs text-teal-500 group-hover:translate-x-1 transition-transform duration-300"></i>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
//               Member Area
//             </h3>
//             <ul className="space-y-2">
//               {[
//                 { to: '/login', label: 'Login' },
//                 { to: '/register', label: 'Join Us' },
//                 { to: '/news-upload', label: 'Upload News' },
//                 { to: '/id-card', label: 'Digital ID Card' },
//                 { to: '/my-articles', label: 'My Articles' },
//                 { to: '/invoices', label: 'Invoice History' },
//               ].map((link, i) => (
//                 <li key={i}>
//                   <Link
//                     to={link.to}
//                     className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm flex items-center gap-2 group"
//                   >
//                     <i className="fas fa-chevron-right text-xs text-teal-500 group-hover:translate-x-1 transition-transform duration-300"></i>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
//               Legal
//             </h3>
//             <ul className="space-y-2">
//               {[
//                 { to: '/terms', label: 'Terms & Conditions' },
//                 { to: '/privacy', label: 'Privacy Policy' },
//                 { to: '/refund', label: 'Refund Policy' },
//                 { to: '/editorial', label: 'Editorial Policy' },
//                 { to: '/ethics', label: 'Code of Ethics' },
//                 { to: '/disclaimer', label: 'Disclaimer' },
//               ].map((link, i) => (
//                 <li key={i}>
//                   <Link
//                     to={link.to}
//                     className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm flex items-center gap-2 group"
//                   >
//                     <i className="fas fa-chevron-right text-xs text-teal-500 group-hover:translate-x-1 transition-transform duration-300"></i>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="mt-12 pt-8 border-t border-slate-200">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
//             <p>Copyright © AIMAMEDIA FOUNDATION 2026</p>
//             <div className="flex gap-6">
//               <Link to="/disclaimer" className="hover:text-teal-600 transition-colors duration-300">
//                 Disclaimer
//               </Link>
//               <Link to="/privacy" className="hover:text-teal-600 transition-colors duration-300">
//                 Privacy
//               </Link>
//               <Link to="/terms" className="hover:text-teal-600 transition-colors duration-300">
//                 Terms
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function BottomNav() {
//   const [openMenu, setOpenMenu] = useState(null);
//   const loc = useLocation();
//   const toggle = m => setOpenMenu(openMenu === m ? null : m);

//   return (
//     <>
//       {openMenu && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
//           onClick={() => setOpenMenu(null)}
//         />
//       )}

//       {openMenu === 'list' && (
//         <div className="fixed bottom-20 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 lg:hidden animate-slideUp max-h-[70vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-slate-800">List</h3>
//               <button
//                 onClick={() => setOpenMenu(null)}
//                 className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-300"
//               >
//                 <i className="fas fa-times text-slate-600"></i>
//               </button>
//             </div>
//             <div className="space-y-2">
//               {[
//                 { to: '/my-members', icon: 'fas fa-users', label: 'My Members', color: 'from-blue-500 to-indigo-500' },
//                 { to: '/my-news', icon: 'fas fa-newspaper', label: 'My News', color: 'from-teal-500 to-cyan-500' },
//                 { to: '/readers', icon: 'fas fa-book-reader', label: 'Readers', color: 'from-purple-500 to-pink-500' },
//               ].map((item, i) => (
//                 <Link
//                   key={i}
//                   to={item.to}
//                   onClick={() => setOpenMenu(null)}
//                   className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 border border-slate-200 hover:border-teal-300 transition-all duration-300 transform hover:scale-102 group"
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
//                     <i className={item.icon}></i>
//                   </div>
//                   <span className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors duration-300">
//                     {item.label}
//                   </span>
//                 </Link>
//               ))}
//             </div>
            
//             <div className="mt-6 pt-6 border-t border-slate-200">
//               <h4 className="text-sm font-bold text-slate-800 mb-4">Create</h4>
//               <div className="space-y-2">
//                 {[
//                   { to: '/create-post', icon: 'fas fa-pen', label: 'Create Post', color: 'from-green-500 to-emerald-500' },
//                   { to: '/add-member', icon: 'fas fa-user-plus', label: 'Add Member', color: 'from-orange-500 to-red-500' },
//                   { to: '/add-reader', icon: 'fas fa-plus-circle', label: 'Add News Reader', color: 'from-violet-500 to-purple-500' },
//                 ].map((item, i) => (
//                   <Link
//                     key={i}
//                     to={item.to}
//                     onClick={() => setOpenMenu(null)}
//                     className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 border border-slate-200 hover:border-teal-300 transition-all duration-300 transform hover:scale-102 group"
//                   >
//                     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
//                       <i className={item.icon}></i>
//                     </div>
//                     <span className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors duration-300">
//                       {item.label}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {openMenu === 'course' && (
//         <div className="fixed bottom-20 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 lg:hidden animate-slideUp max-h-[70vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-slate-800">Course</h3>
//               <button
//                 onClick={() => setOpenMenu(null)}
//                 className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-300"
//               >
//                 <i className="fas fa-times text-slate-600"></i>
//               </button>
//             </div>
//             <div className="space-y-2">
//               {[
//                 { label: 'Course', color: 'from-blue-500 to-indigo-500' },
//                 { label: 'Course1', color: 'from-teal-500 to-cyan-500' },
//               ].map((item, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   onClick={(e) => e.preventDefault()}
//                   className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 border border-slate-200 hover:border-teal-300 transition-all duration-300 transform hover:scale-102 group"
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
//                     <i className="fas fa-graduation-cap"></i>
//                   </div>
//                   <span className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors duration-300">
//                     {item.label}
//                   </span>
//                 </a>
//               ))}
//             </div>

//             <div className="mt-6 pt-6 border-t border-slate-200">
//               <h4 className="text-sm font-bold text-slate-800 mb-4">Download</h4>
//               <div className="space-y-2">
//                 {[
//                   { to: '/id-card', icon: 'fas fa-id-card', label: 'Membership I-Card', color: 'from-green-500 to-emerald-500' },
//                   { to: '/membership-cert', icon: 'fas fa-certificate', label: 'Membership Certificate', color: 'from-orange-500 to-red-500' },
//                   { to: '/course-cert', icon: 'fas fa-award', label: 'Course Certificate', color: 'from-violet-500 to-purple-500' },
//                 ].map((item, i) => (
//                   <Link
//                     key={i}
//                     to={item.to}
//                     onClick={() => setOpenMenu(null)}
//                     className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 border border-slate-200 hover:border-teal-300 transition-all duration-300 transform hover:scale-102 group"
//                   >
//                     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
//                       <i className={item.icon}></i>
//                     </div>
//                     <span className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors duration-300">
//                       {item.label}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 lg:hidden shadow-2xl">
//         <div className="flex items-center justify-around h-16 px-2">
//           {[
//             { to: '/', icon: 'fas fa-home', label: 'Home', active: loc.pathname === '/' },
//             { icon: 'fas fa-list', label: 'List', onClick: (e) => { e.preventDefault(); toggle('list'); } },
//             { icon: 'fas fa-graduation-cap', label: 'Course', onClick: (e) => { e.preventDefault(); toggle('course'); } },
//             { to: '/id-card', icon: 'fas fa-id-card', label: 'I-Card', active: loc.pathname === '/id-card' },
//           ].map((item, i) => {
//             const isActive = item.active || (item.label === 'List' && openMenu === 'list') || (item.label === 'Course' && openMenu === 'course');
            
//             if (item.to) {
//               return (
//                 <Link
//                   key={i}
//                   to={item.to}
//                   onClick={() => setOpenMenu(null)}
//                   className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
//                     isActive
//                       ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg transform scale-110'
//                       : 'text-slate-600 hover:text-teal-600'
//                   }`}
//                 >
//                   <i className={`${item.icon} text-lg`}></i>
//                   <span className="text-xs font-medium">{item.label}</span>
//                 </Link>
//               );
//             }

//             return (
//               <button
//                 key={i}
//                 onClick={item.onClick}
//                 className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
//                   isActive
//                     ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg transform scale-110'
//                     : 'text-slate-600 hover:text-teal-600'
//                 }`}
//               >
//                 <i className={`${item.icon} text-lg`}></i>
//                 <span className="text-xs font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default function Layout({ children, showSubNav = false, showStateTabs: showST = false }) {
//   const [activeState, setActiveState] = useState(0);

//   return (
//     <>
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.3s ease-out;
//         }
        
//         .hover\:scale-102:hover {
//           transform: scale(1.02);
//         }
        
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
        
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
//         <TopBar />
//         <Header />
//         <Navbar />
        
//         {showSubNav && (
//           <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[127px] z-20">
//             <div className="max-w-7xl mx-auto px-4">
//               <div className="flex items-center gap-4 h-14 overflow-x-auto scrollbar-hide">
//                 {[
//                   { to: '/news', icon: 'fas fa-newspaper', label: 'News' },
//                   { to: '/members', icon: 'fas fa-users', label: 'Members' },
//                   { label: 'Committee', onClick: (e) => e.preventDefault() },
//                   { label: 'Problems', onClick: (e) => e.preventDefault() },
//                 ].map((item, i) => {
//                   if (item.to) {
//                     return (
//                       <Link
//                         key={i}
//                         to={item.to}
//                         className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 hover:border-teal-300 hover:shadow-md text-slate-700 hover:text-teal-600 font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105"
//                       >
//                         {item.icon && <i className={item.icon}></i>}
//                         <span>{item.label}</span>
//                       </Link>
//                     );
//                   }

//                   return (
//                     <a
//                       key={i}
//                       href="#"
//                       onClick={item.onClick}
//                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 hover:border-teal-300 hover:shadow-md text-slate-700 hover:text-teal-600 font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105"
//                     >
//                       <span>{item.label}</span>
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {showST && (
//           <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 sticky top-[141px] z-20">
//             <div className="max-w-7xl mx-auto px-4">
//               <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
//                 {stateTabs.map((s, i) => (
//                   <button
//                     key={i}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setActiveState(i);
//                     }}
//                     className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
//                       activeState === i
//                         ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
//                         : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         <main className="flex-1 pb-20 lg:pb-0">
//           {children}
//         </main>

//         <Footer />
//         <BottomNav />
//       </div>
//     </>
//   );
// }
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { stateTabs } from '../data/staticData';

/*
  ╔══════════════════════════════════════════════════════╗
  ║  AIMA MEDIA — REDESIGNED LAYOUT                      ║
  ║  Aesthetic: Editorial Luxury / Press Heritage        ║
  ║                                                      ║
  ║  Primary   : #1e3a5f  (deep navy)                   ║
  ║  Secondary : #c8972a  (warm gold)                   ║
  ║  Gold Lt   : #e8c97a  (light gold)                  ║
  ║  Paper     : #fafaf8  (warm off-white)               ║
  ║  Ink       : #0f1f33  (darkest navy)                 ║
  ║  Border    : #dde2ea                                 ║
  ║  Muted     : #6b7a8d                                 ║
  ╚══════════════════════════════════════════════════════╝
*/

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-dm        { font-family: 'DM Sans', sans-serif; }

  /* ── Animations ── */
  @keyframes fadeDown   { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeUp     { from { opacity:0; transform:translateY(8px)  } to { opacity:1; transform:translateY(0) } }
  @keyframes slideRight { from { opacity:0; transform:translateX(-10px) } to { opacity:1; transform:translateX(0) } }
  @keyframes sheetUp    { from { transform:translateY(100%); opacity:0 } to { transform:translateY(0); opacity:1 } }
  @keyframes pulse      { 0%,100% { opacity:1 } 50% { opacity:.3 } }
  @keyframes shimmer    { from { background-position: -200% center } to { background-position: 200% center } }
  @keyframes spin       { to { transform: rotate(360deg) } }

  .anim-fade-down  { animation: fadeDown  .35s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-fade-up    { animation: fadeUp    .35s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-slide-right{ animation: slideRight .3s ease-out both; }
  .anim-sheet-up   { animation: sheetUp   .4s cubic-bezier(.22,.68,0,1.2) both; }

  .pulse-live { animation: pulse 2.5s ease-in-out infinite; }

  /* Gold shimmer text */
  .shimmer-gold {
    background: linear-gradient(90deg, #c8972a 0%, #e8c97a 40%, #c8972a 70%, #e8c97a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }

  /* ── Scrollbars ── */
  .scrollbar-hide   { -ms-overflow-style:none; scrollbar-width:none; }
  .scrollbar-hide::-webkit-scrollbar { display:none; }
  .sheet-scroll::-webkit-scrollbar { width:3px; }
  .sheet-scroll::-webkit-scrollbar-thumb { background: #dde2ea; border-radius:4px; }

  /* ── Topbar link hover ── */
  .topbar-link {
    position: relative;
    color: rgba(255,255,255,.45);
    transition: color .2s;
    font-size: 11.5px;
    letter-spacing: .3px;
  }
  .topbar-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -2px;
    width: 0; height: 1px;
    background: #c8972a;
    transition: width .25s ease;
  }
  .topbar-link:hover { color: #c8972a; }
  .topbar-link:hover::after { width: 100%; }

  /* ── Nav items ── */
  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,.6);
    border-radius: 4px;
    transition: all .2s;
    letter-spacing: .15px;
    white-space: nowrap;
    text-decoration: none;
  }
  .nav-item:hover {
    color: #fff;
    background: rgba(200,151,42,.12);
  }
  .nav-item.active {
    color: #fff;
    background: rgba(200,151,42,.18);
  }
  .nav-item.active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 20%; right: 20%;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background: linear-gradient(90deg, #c8972a, #e8c97a);
  }
  .nav-item .nav-icon { color: rgba(200,151,42,.55); transition: color .2s; }
  .nav-item:hover .nav-icon,
  .nav-item.active .nav-icon { color: #c8972a; }

  /* ── Gold rule ── */
  .gold-rule {
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #c8972a 30%, #e8c97a 50%, #c8972a 70%, transparent 100%);
  }
  .gold-rule-thin {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #c8972a 40%, #e8c97a 60%, transparent 100%);
  }

  /* ── Header contact pill ── */
  .contact-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 12.5px;
    font-weight: 500;
    color: #1e3a5f;
    background: #fff;
    border: 1.5px solid #dde2ea;
    transition: all .2s;
    box-shadow: 0 1px 4px rgba(30,58,95,.06);
  }
  .contact-pill:hover {
    border-color: #c8972a;
    box-shadow: 0 2px 12px rgba(200,151,42,.15);
    transform: translateY(-1px);
  }

  /* ── Footer ── */
  .footer-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #6b7a8d;
    text-decoration: none;
    transition: color .2s, gap .2s;
    padding: 3px 0;
  }
  .footer-link:hover { color: #c8972a; gap: 10px; }
  .footer-link .fl-arrow {
    width: 14px; height: 14px;
    opacity: .4;
    transition: opacity .2s, transform .2s;
  }
  .footer-link:hover .fl-arrow { opacity: 1; transform: translateX(2px); }

  /* ── Mobile bottom nav ── */
  .bottom-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: all .2s;
    color: #6b7a8d;
    font-size: 10.5px;
    font-weight: 500;
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: .2px;
  }
  .bottom-tab.active, .bottom-tab:hover {
    color: #fff;
    background: #1e3a5f;
    box-shadow: 0 4px 16px rgba(30,58,95,.35);
    transform: translateY(-2px);
  }

  /* ── Sheet items ── */
  .sheet-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1.5px solid #dde2ea;
    background: #fafaf8;
    transition: all .2s;
    cursor: pointer;
    text-decoration: none;
    color: #0f1f33;
  }
  .sheet-item:hover {
    border-color: #c8972a;
    background: #fff;
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(200,151,42,.12);
  }
  .sheet-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    color: #fff;
    flex-shrink: 0;
  }

  /* ── State tab ── */
  .state-tab {
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 12.5px;
    font-weight: 500;
    white-space: nowrap;
    border: none;
    cursor: pointer;
    transition: all .2s;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: .15px;
  }
  .state-tab.active {
    background: #c8972a;
    color: #fff;
    box-shadow: 0 3px 12px rgba(200,151,42,.35);
  }
  .state-tab:not(.active) {
    background: rgba(255,255,255,.09);
    color: rgba(255,255,255,.55);
  }
  .state-tab:not(.active):hover {
    background: rgba(255,255,255,.16);
    color: rgba(255,255,255,.85);
  }

  /* Logo badge */
  .logo-badge {
    background: linear-gradient(135deg, #1e3a5f 0%, #2d5185 50%, #1e3a5f 100%);
    border: 2px solid rgba(200,151,42,.4);
    box-shadow: 0 0 0 1px rgba(200,151,42,.15), 0 6px 24px rgba(30,58,95,.35);
    transition: all .3s;
  }
  .logo-badge:hover {
    border-color: rgba(200,151,42,.7);
    box-shadow: 0 0 0 1px rgba(200,151,42,.3), 0 8px 32px rgba(30,58,95,.45);
    transform: scale(1.04);
  }

  /* Decorative serif divider */
  .serif-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(200,151,42,.6);
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    letter-spacing: 3px;
  }
  .serif-divider::before, .serif-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,151,42,.4));
  }
  .serif-divider::after {
    background: linear-gradient(90deg, rgba(200,151,42,.4), transparent);
  }
`;

/* ── Icons ── */
const Icon = {
  Phone:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.65a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  News:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>,
  Menu:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Logout:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Login:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>,
  Home:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  List:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Grad:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  Card:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  Arrow:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  User:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Shield:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Tag:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Image:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Users:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Register: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  Edit:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Grid:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Info:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>,
};

/* Nav icon map */
const NAV_ICONS = {
  '/':                  <Icon.Home />,
  '/login':             <Icon.Login />,
  '/news-upload':       <Icon.News />,
  '/about':             <Icon.Info />,
  '/members':           <Icon.Users />,
  '/register':          <Icon.Register />,
  '/membership-plans':  <Icon.Tag />,
  '/gallery':           <Icon.Image />,
  '/dashboard':         <Icon.Grid />,
  '/profile':           <Icon.User />,
  '/edit-profile':      <Icon.Edit />,
  '/contact':           <Icon.Mail />,
  '/my-articles':       <Icon.News />,
  '/admin':             <Icon.Shield />,
};

/* ══════════════════════════════════════════════
   TOP BAR  — slim utility strip
════════════════════════════════════════════════ */
function TopBar() {
  return (
    <div style={{ background: '#0a1929', borderBottom: '1px solid rgba(200,151,42,.12)' }}>
      <div className="max-w-7xl mx-auto px-5 py-2 flex justify-between items-center font-dm">
        {/* Live ticker */}
        <div className="flex items-center gap-2.5" style={{ fontSize: '11px' }}>
          <span className="pulse-live inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#c8972a' }} />
          <span style={{ color: 'rgba(255,255,255,.35)', letterSpacing: '.6px', textTransform: 'uppercase', fontWeight: 600 }}>
            AIMA MEDIA
          </span>
          <span style={{ color: 'rgba(200,151,42,.4)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,.25)', letterSpacing: '.3px' }}>
            India's Verified Media Network
          </span>
        </div>

        {/* Top links */}
        <nav className="hidden sm:flex items-center gap-5">
          {[
            { to: '/about',   label: 'About' },
            { to: '/terms',   label: 'Terms' },
            { to: '/contact', label: 'Contact' },
          ].map(l => (
            <Link key={l.to} to={l.to} className="topbar-link font-dm">{l.label}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HEADER — brand + contacts
════════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 font-dm transition-all duration-300`}
      style={{
        background: scrolled ? 'rgba(250,250,248,.97)' : '#fafaf8',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #dde2ea',
        boxShadow: scrolled ? '0 4px 28px rgba(15,31,51,.1)' : '0 1px 0 #dde2ea',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-4 group" style={{ textDecoration: 'none' }}>
            {/* Badge */}
            <div className="logo-badge relative p-3 rounded-xl" style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Gold corner accents */}
              <span style={{
                position:'absolute', top:3, left:3, width:8, height:8,
                borderTop:'2px solid #c8972a', borderLeft:'2px solid #c8972a', borderRadius:'2px 0 0 0'
              }} />
              <span style={{
                position:'absolute', bottom:3, right:3, width:8, height:8,
                borderBottom:'2px solid #c8972a', borderRight:'2px solid #c8972a', borderRadius:'0 0 2px 0'
              }} />
              <span style={{ color: '#fff', display:'flex' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
                </svg>
              </span>
            </div>

            {/* Brand text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  className="font-cormorant"
                  style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 700, color: '#0f1f33', lineHeight: 1, letterSpacing: '-0.5px' }}
                >
                  AIMA
                </span>
                <span
                  className="font-cormorant shimmer-gold"
                  style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1 }}
                >
                  MEDIA
                </span>
              </div>
              <p
                className="font-dm"
                style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7a8d', marginTop: 3 }}
              >
                All India Media Association
              </p>
            </div>
          </Link>

          {/* ── Decorative divider (hidden sm) ── */}
          <div className="hidden lg:block flex-1" style={{ height: 1, background: 'linear-gradient(90deg,#dde2ea,transparent)' }} />

          {/* ── Contact pills ── */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+911234567890" className="contact-pill" style={{ textDecoration: 'none' }}>
              <span style={{ color: '#1e3a5f', display: 'flex', width: 15, height: 15 }}><Icon.Phone /></span>
              +91 1234567890
            </a>
            <a href="mailto:info@aimamedia.org" className="contact-pill" style={{ textDecoration: 'none' }}>
              <span style={{ color: '#1e3a5f', display: 'flex', width: 15, height: 15 }}><Icon.Mail /></span>
              info@aimamedia.org
            </a>
          </div>
        </div>
      </div>

      {/* Thin gold bottom accent */}
      <div className="gold-rule-thin" />
    </header>
  );
}


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const path = useLocation().pathname;

  const publicLinks = [
    { to: '/',                 label: 'Home' },
    { to: '/news-upload',      label: 'News' },
    { to: '/about',            label: 'About' },
    { to: '/members',          label: 'Members' },
    { to: '/register',         label: 'Join Us' },
    { to: '/membership-plans', label: 'Membership' },
    { to: '/gallery',          label: 'Gallery' },
    { to: '/contact',          label: 'Contact' },
  ];

  const authLinks = [
    { to: '/',                 label: 'Home' },
    { to: '/dashboard',        label: 'Dashboard' },
    { to: '/about',            label: 'About' },
    { to: '/members',          label: 'Members' },
    { to: '/membership-plans', label: 'Membership' },
    { to: '/gallery',          label: 'Gallery' },
    { to: '/my-articles',      label: 'Articles' },
    { to: '/profile',          label: 'Profile' },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin' }] : []),
  ];

  const links = user ? authLinks : publicLinks;

  return (
    <nav
      className="font-dm sticky z-30"
      style={{ background: '#1e3a5f', top: '81px' }}
    >
      {/* Gold accent top */}
      <div className="gold-rule" />

      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between" style={{ height: 52 }}>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map((l, i) => (
              <li key={i}>
                <Link
                  to={l.to}
                  className={`nav-item ${path === l.to ? 'active' : ''}`}
                >
                  <span className="nav-icon" style={{ display: 'flex', width: 14, height: 14 }}>
                    {NAV_ICONS[l.to]}
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop auth area */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* User avatar pill */}
                <div
                  className="flex items-center"
                  style={{
                    padding: '6px 6px 6px 6px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.12)',
                  }}
                >
                  <div
                    style={{
                      width: 32, height: 32,
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, #c8972a, #e8c97a)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14, color: '#0f1f33',
                      fontFamily: 'Cormorant Garamond, serif',
                    }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.85)' }}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2"
                  style={{
                    padding: '7px 16px',
                    borderRadius: 6,
                    background: 'rgba(220,60,60,.75)',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(220,60,60,1)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(220,60,60,.75)'}
                >
                  <span style={{ display: 'flex', width: 15, height: 15 }}><Icon.Logout /></span>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 20px',
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #c8972a, #b8800a)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(200,151,42,.4)',
                  transition: 'all .2s',
                  border: '1px solid rgba(255,255,255,.15)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(200,151,42,.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 16px rgba(200,151,42,.4)'; }}
              >
                <span style={{ display: 'flex', width: 15, height: 15 }}><Icon.Login /></span>
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
            style={{
              padding: 8, borderRadius: 6, border: 'none', cursor: 'pointer',
              background: menuOpen ? 'rgba(200,151,42,.2)' : 'transparent',
              color: '#fff',
              display: 'flex', alignItems: 'center',
              transition: 'background .2s',
            }}
          >
            <span style={{ display: 'flex', width: 20, height: 20 }}>
              {menuOpen ? <Icon.Close /> : <Icon.Menu />}
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: menuOpen ? '80vh' : 0,
            opacity: menuOpen ? 1 : 0,
            transition: 'max-height .35s cubic-bezier(.22,.68,0,1.2), opacity .25s',
            paddingBottom: menuOpen ? 16 : 0,
          }}
        >
          <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map((l, i) => {
              const active = path === l.to;
              return (
                <Link
                  key={i}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px',
                    borderRadius: 8,
                    fontSize: 14, fontWeight: 500,
                    textDecoration: 'none',
                    color: active ? '#fff' : 'rgba(255,255,255,.6)',
                    background: active ? 'rgba(200,151,42,.2)' : 'transparent',
                    borderLeft: active ? '3px solid #c8972a' : '3px solid transparent',
                    transition: 'all .15s',
                  }}
                >
                  <span style={{ display: 'flex', width: 16, height: 16, color: active ? '#c8972a' : 'rgba(255,255,255,.35)' }}>
                    {NAV_ICONS[l.to]}
                  </span>
                  {l.label}
                </Link>
              );
            })}
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px',
                  borderRadius: 8,
                  marginTop: 8,
                  background: 'rgba(220,60,60,.75)',
                  border: 'none', cursor: 'pointer',
                  color: '#fff',
                  fontSize: 14, fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                <span style={{ display: 'flex', width: 16, height: 16 }}><Icon.Logout /></span>
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px',
                  borderRadius: 8,
                  marginTop: 8,
                  background: 'linear-gradient(135deg,#c8972a,#b8800a)',
                  color: '#fff',
                  fontSize: 14, fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span style={{ display: 'flex', width: 16, height: 16 }}><Icon.Login /></span>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
function Footer() {
  const socials = [
    { icon: 'fab fa-facebook-f',  href: '#' },
    { icon: 'fab fa-twitter',     href: '#' },
    { icon: 'fab fa-linkedin-in', href: '#' },
    { icon: 'fab fa-instagram',   href: '#' },
    { icon: 'fab fa-youtube',     href: '#' },
  ];

  return (
    <footer
      className="font-dm"
      style={{ background: '#0a1929', borderTop: '1px solid rgba(200,151,42,.15)', marginTop: 80 }}
    >
      {/* Top gold accent */}
      <div className="gold-rule" />

      <div className="max-w-7xl mx-auto px-5 py-16">

        {/* Brand row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14"
             style={{ paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-cormorant" style={{ fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                AIMA
              </span>
              <span className="font-cormorant shimmer-gold" style={{ fontSize: 36, fontWeight: 700, fontStyle: 'italic', lineHeight: 1 }}>
                MEDIA
              </span>
            </div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(200,151,42,.6)' }}>
              All India Media Association
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', marginTop: 10, maxWidth: 360, lineHeight: 1.7 }}>
              India's Digital-First Verified Media Professionals Network — connecting journalists, reporters, and media
              professionals across all 28 states.
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-2">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                style={{
                  width: 38, height: 38,
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.1)',
                  color: 'rgba(255,255,255,.45)',
                  textDecoration: 'none',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background='#c8972a';
                  e.currentTarget.style.color='#fff';
                  e.currentTarget.style.borderColor='#c8972a';
                  e.currentTarget.style.transform='translateY(-3px)';
                  e.currentTarget.style.boxShadow='0 6px 16px rgba(200,151,42,.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background='rgba(255,255,255,.06)';
                  e.currentTarget.style.color='rgba(255,255,255,.45)';
                  e.currentTarget.style.borderColor='rgba(255,255,255,.1)';
                  e.currentTarget.style.transform='';
                  e.currentTarget.style.boxShadow='';
                }}
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Quick Links */}
          <div>
            <h4 className="font-cormorant" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '.3px' }}>
              Quick Links
              <div style={{ width: 28, height: 2, background: '#c8972a', marginTop: 6, borderRadius: 2 }} />
            </h4>
            {[
              { to: '/',                 label: 'Home' },
              { to: '/about',            label: 'About Us' },
              { to: '/members',          label: 'Members' },
              { to: '/gallery',          label: 'Gallery' },
              { to: '/membership-plans', label: 'Membership Plans' },
              { to: '/contact',          label: 'Contact Us' },
            ].map((l, i) => (
              <Link key={i} to={l.to} className="footer-link">
                <svg className="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Member Area */}
          <div>
            <h4 className="font-cormorant" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Member Area
              <div style={{ width: 28, height: 2, background: '#c8972a', marginTop: 6, borderRadius: 2 }} />
            </h4>
            {[
              { to: '/login',       label: 'Login' },
              { to: '/register',    label: 'Join Us' },
              { to: '/news-upload', label: 'Upload News' },
              { to: '/id-card',     label: 'Digital ID Card' },
              { to: '/my-articles', label: 'My Articles' },
              { to: '/invoices',    label: 'Invoice History' },
            ].map((l, i) => (
              <Link key={i} to={l.to} className="footer-link">
                <svg className="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-cormorant" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Legal
              <div style={{ width: 28, height: 2, background: '#c8972a', marginTop: 6, borderRadius: 2 }} />
            </h4>
            {[
              { to: '/terms',      label: 'Terms & Conditions' },
              { to: '/privacy',    label: 'Privacy Policy' },
              { to: '/refund',     label: 'Refund Policy' },
              { to: '/editorial',  label: 'Editorial Policy' },
              { to: '/ethics',     label: 'Code of Ethics' },
              { to: '/disclaimer', label: 'Disclaimer' },
            ].map((l, i) => (
              <Link key={i} to={l.to} className="footer-link">
                <svg className="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cormorant" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Get In Touch
              <div style={{ width: 28, height: 2, background: '#c8972a', marginTop: 6, borderRadius: 2 }} />
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <Icon.Phone />, text: '+91 1234567890' },
                { icon: <Icon.Mail />,  text: 'info@aimamedia.org' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(200,151,42,.12)',
                    border: '1px solid rgba(200,151,42,.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#c8972a', flexShrink: 0,
                  }}>
                    <span style={{ display: 'flex', width: 15, height: 15 }}>{c.icon}</span>
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{c.text}</span>
                </div>
              ))}

              {/* Newsletter mini */}
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(200,151,42,.6)', marginBottom: 8 }}>
                  Stay Updated
                </p>
                <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(200,151,42,.25)' }}>
                  <input
                    type="email"
                    placeholder="Your email"
                    style={{
                      flex: 1, padding: '8px 12px',
                      background: 'rgba(255,255,255,.05)',
                      border: 'none', outline: 'none',
                      color: '#fff', fontSize: 12,
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  />
                  <button style={{
                    padding: '8px 14px',
                    background: '#c8972a',
                    border: 'none', cursor: 'pointer',
                    color: '#fff', fontSize: 12, fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif',
                  }}>
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 48, paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,.07)',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.25)', fontFamily: 'DM Sans,sans-serif' }}>
            Copyright © <span style={{ color: 'rgba(200,151,42,.6)' }}>AIMAMEDIA FOUNDATION</span> 2026. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { to: '/disclaimer', label: 'Disclaimer' },
              { to: '/privacy',    label: 'Privacy' },
              { to: '/terms',      label: 'Terms' },
            ].map(l => (
              <Link
                key={l.to} to={l.to}
                style={{ fontSize: 12, color: 'rgba(255,255,255,.25)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#c8972a'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.25)'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   BOTTOM NAV (mobile)
════════════════════════════════════════════════ */
function BottomNav() {
  const [openMenu, setOpenMenu] = useState(null);
  const loc = useLocation();
  const toggle = m => setOpenMenu(openMenu === m ? null : m);

  const SheetSection = ({ title, items }) => (
    <div>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
        color: '#c8972a', marginBottom: 12, marginTop: 20,
      }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => {
          const inner = (
            <div
              key={i}
              className="sheet-item"
              onClick={() => setOpenMenu(null)}
            >
              <div className="sheet-icon" style={{ background: item.color }}>
                <i className={item.icon} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#0f1f33', margin: 0 }}>{item.label}</p>
                {item.sub && <p style={{ fontSize: 11, color: '#6b7a8d', margin: '2px 0 0' }}>{item.sub}</p>}
              </div>
              <span style={{ marginLeft: 'auto', color: '#dde2ea', display: 'flex', width: 16, height: 16 }}>
                <Icon.Arrow />
              </span>
            </div>
          );
          return item.to
            ? <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>{inner}</Link>
            : <a key={i} href="#" onClick={e => e.preventDefault()} style={{ textDecoration: 'none' }}>{inner}</a>;
        })}
      </div>
    </div>
  );

  const Sheet = ({ title, children }) => (
    <div
      className="anim-sheet-up font-dm"
      style={{
        position: 'fixed', bottom: 64, left: 0, right: 0, zIndex: 50,
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -12px 48px rgba(15,31,51,.18)',
        maxHeight: '72vh', overflowY: 'auto',
      }}
    >
      {/* Handle */}
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 40, height: 4, borderRadius: 4, background: '#dde2ea', margin: '0 auto 0 0' }} />
        <h3 className="font-cormorant" style={{ fontSize: 20, fontWeight: 700, color: '#0f1f33', margin: 0 }}>
          {title}
        </h3>
        <button
          onClick={() => setOpenMenu(null)}
          style={{
            width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
            background: '#f3f5f8', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ display: 'flex', width: 16, height: 16 }}><Icon.Close /></span>
        </button>
      </div>
      <div style={{ padding: '4px 24px 24px' }}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {openMenu && (
        <div
          className="anim-fade-down lg:hidden"
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(10,25,41,.6)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={() => setOpenMenu(null)}
        />
      )}

      {/* LIST sheet */}
      {openMenu === 'list' && (
        <Sheet title="Resources">
          <SheetSection title="Browse" items={[
            { to: '/my-members', icon: 'fas fa-users',       label: 'My Members',    sub: 'Manage your connections',    color: '#1e3a5f' },
            { to: '/my-news',    icon: 'fas fa-newspaper',   label: 'My News',       sub: 'Your published articles',    color: '#c8972a' },
            { to: '/readers',    icon: 'fas fa-book-reader', label: 'Readers',       sub: 'Track your audience',        color: '#0f1f33' },
          ]} />
          <SheetSection title="Create" items={[
            { to: '/create-post', icon: 'fas fa-pen',         label: 'Create Post',     sub: 'Write a new article',    color: '#1e3a5f' },
            { to: '/add-member',  icon: 'fas fa-user-plus',   label: 'Add Member',      sub: 'Invite to network',      color: '#c8972a' },
            { to: '/add-reader',  icon: 'fas fa-plus-circle', label: 'Add News Reader', sub: 'Grow your readers',      color: '#0f1f33' },
          ]} />
        </Sheet>
      )}

      {/* COURSE sheet */}
      {openMenu === 'course' && (
        <Sheet title="Courses">
          <SheetSection title="Enroll" items={[
            { icon: 'fas fa-graduation-cap', label: 'Journalism Essentials', sub: 'Foundation course',    color: '#1e3a5f' },
            { icon: 'fas fa-graduation-cap', label: 'Digital Media Pro',     sub: 'Advanced program',     color: '#c8972a' },
          ]} />
          <SheetSection title="Downloads" items={[
            { to: '/id-card',          icon: 'fas fa-id-card',    label: 'Membership I-Card',       sub: 'Download your card',      color: '#1e3a5f' },
            { to: '/membership-cert',  icon: 'fas fa-certificate', label: 'Membership Certificate', sub: 'Official certificate',    color: '#c8972a' },
            { to: '/course-cert',      icon: 'fas fa-award',       label: 'Course Certificate',     sub: 'On completion',           color: '#0f1f33' },
          ]} />
        </Sheet>
      )}

      {/* Tab bar */}
      <nav
        className="lg:hidden font-dm"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
          background: 'rgba(250,250,248,.97)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #dde2ea',
          boxShadow: '0 -4px 24px rgba(15,31,51,.08)',
        }}
      >
        <div className="gold-rule-thin" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 60, padding: '0 8px' }}>
          {[
            { to: '/',        icon: <Icon.Home />, label: 'Home',   active: loc.pathname === '/' },
            { menu: 'list',   icon: <Icon.List />, label: 'List' },
            { menu: 'course', icon: <Icon.Grad />, label: 'Course' },
            { to: '/id-card', icon: <Icon.Card />, label: 'I-Card', active: loc.pathname === '/id-card' },
          ].map((item, i) => {
            const isActive = item.active || (item.menu && openMenu === item.menu);

            if (item.to) return (
              <Link key={i} to={item.to} onClick={() => setOpenMenu(null)} className={`bottom-tab ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', width: 20, height: 20 }}>{item.icon}</span>
                {item.label}
              </Link>
            );

            return (
              <button key={i} onClick={() => toggle(item.menu)} className={`bottom-tab ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', width: 20, height: 20 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

/* ══════════════════════════════════════════════
   LAYOUT — main export
════════════════════════════════════════════════ */
export default function Layout({ children, showSubNav = false, showStateTabs: showST = false }) {
  const [activeState, setActiveState] = useState(0);

  return (
    <>
      <style>{STYLES}</style>
      <div className="font-dm min-h-screen flex flex-col" style={{ background: '#fafaf8' }}>

        <TopBar />
        <Header />
        <Navbar />

        {/* ── Sub Nav ── */}
        {showSubNav && (
          <div
            className="sticky z-20 font-dm"
            style={{ top: 133, background: '#fff', borderBottom: '1px solid #dde2ea' }}
          >
            <div className="max-w-7xl mx-auto px-5">
              <div className="flex items-center gap-2 h-12 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {[
                  { to: '/news',    icon: 'fas fa-newspaper', label: 'News' },
                  { to: '/members', icon: 'fas fa-users',     label: 'Members' },
                  { label: 'Committee' },
                  { label: 'Problems' },
                ].map((item, i) => {
                  const cls = {
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px',
                    borderRadius: 6,
                    fontSize: 13, fontWeight: 500,
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    color: '#1e3a5f',
                    background: '#f3f5f8',
                    border: '1.5px solid #dde2ea',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    fontFamily: 'DM Sans, sans-serif',
                  };
                  const El = item.to ? Link : 'a';
                  return (
                    <El
                      key={i}
                      to={item.to}
                      href={item.to ? undefined : '#'}
                      onClick={!item.to ? e => e.preventDefault() : undefined}
                      style={cls}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#c8972a'; e.currentTarget.style.color='#c8972a'; e.currentTarget.style.background='#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='#dde2ea'; e.currentTarget.style.color='#1e3a5f'; e.currentTarget.style.background='#f3f5f8'; }}
                    >
                      {item.icon && <i className={item.icon} style={{ fontSize: 12 }} />}
                      <span>{item.label}</span>
                    </El>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── State Tabs ── */}
        {showST && (
          <div
            className="sticky z-20 font-dm"
            style={{ top: showSubNav ? 181 : 133, background: '#1e3a5f', borderBottom: '1px solid rgba(200,151,42,.2)' }}
          >
            <div className="max-w-7xl mx-auto px-5">
              <div className="flex items-center gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {stateTabs.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveState(i)}
                    className={`state-tab ${activeState === i ? 'active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <main className="flex-1" style={{ paddingBottom: 80 }}>
          {children}
        </main>

        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
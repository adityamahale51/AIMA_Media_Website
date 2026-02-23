const API_URL = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('aimaToken');
  const headers = { ...options.headers };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  register: (formData) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(formData) }),

  getMe: () =>
    request('/auth/me'),

  updateProfile: (data) =>
    request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

  getDigitalId: () =>
    request('/auth/digital-id'),

  verifyMember: (membershipId) =>
    request(`/auth/verify/${membershipId}`),

  // News
  getNews: () =>
    request('/news'),

  getNewsById: (id) =>
    request(`/news/${id}`),

  getNewsFeatured: () =>
    request('/news/featured'),

  getNewsTrending: () =>
    request('/news/trending'),

  getMyArticles: () =>
    request('/news/my'),

  getNewsByCategory: (category) =>
    request(`/news/category/${encodeURIComponent(category)}`),

  createNews: (formData) =>
    request('/news', { method: 'POST', body: formData }), // FormData for file upload

  likeNews: (id) =>
    request(`/news/${id}/like`, { method: 'PUT' }),

  deleteNews: (id) =>
    request(`/news/${id}`, { method: 'DELETE' }),

  // Members
  getMembers: (state) =>
    request(`/members${state && state !== 'All' ? `?state=${encodeURIComponent(state)}` : ''}`),

  getActiveMembers: () =>
    request('/members/active'),

  // Gallery
  getGallery: () =>
    request('/gallery'),

  // Contact
  sendContact: (data) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Plans
  getPlans: () =>
    request('/plans'),

  getPlan: (id) =>
    request(`/plans/${id}`),

  subscribePlan: (plan_id) =>
    request('/plans/subscribe', { method: 'POST', body: JSON.stringify({ plan_id }) }),

  confirmPayment: (transaction_id, payment_gateway_id) =>
    request('/plans/payment-success', { method: 'POST', body: JSON.stringify({ transaction_id, payment_gateway_id }) }),

  getMyTransactions: () =>
    request('/plans/my/transactions'),

  getMyInvoices: () =>
    request('/plans/my/invoices'),

  // Admin
  getAdminStats: () =>
    request('/admin/stats'),

  getAdminMembers: (status, search) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    return request(`/admin/members?${params.toString()}`);
  },

  approveMember: (id) =>
    request(`/admin/members/${id}/approve`, { method: 'PUT' }),

  rejectMember: (id, reason) =>
    request(`/admin/members/${id}/reject`, { method: 'PUT', body: JSON.stringify({ reason }) }),

  suspendMember: (id, reason) =>
    request(`/admin/members/${id}/suspend`, { method: 'PUT', body: JSON.stringify({ reason }) }),

  getAdminArticles: (status, search) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    return request(`/admin/articles?${params.toString()}`);
  },

  approveArticle: (id) =>
    request(`/admin/articles/${id}/approve`, { method: 'PUT' }),

  rejectArticle: (id, reason) =>
    request(`/admin/articles/${id}/reject`, { method: 'PUT', body: JSON.stringify({ reason }) }),

  featureArticle: (id) =>
    request(`/admin/articles/${id}/feature`, { method: 'PUT' }),

  trendingArticle: (id) =>
    request(`/admin/articles/${id}/trending`, { method: 'PUT' }),

  deleteArticleAdmin: (id) =>
    request(`/admin/articles/${id}`, { method: 'DELETE' }),

  getAdminContacts: () =>
    request('/admin/contacts'),

  markContactRead: (id) =>
    request(`/admin/contacts/${id}/read`, { method: 'PUT' }),

  exportMembers: () =>
    request('/admin/export/members'),
};

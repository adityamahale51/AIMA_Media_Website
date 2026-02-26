const API_URL = 'http://localhost:5000/api';

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

  // read response as text first — some responses may be empty
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (err) {
      // not JSON — return raw text for callers if needed
      data = text;
    }
  }

  if (!res.ok) {
    const message = data && data.message ? data.message : res.statusText || 'Something went wrong';
    throw new Error(message);
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
    request('/users/me'),

  updateProfile: (body) =>
    request('/users/me', { method: 'PUT', body }),

  getDigitalId: () =>
    request('/auth/digital-id'),

  verifyMember: (membershipId) =>
    request(`/auth/verify/${membershipId}`),

  // News
  getNewsById: (id) =>
    request(`/news/${id}`),

  getNews: (params) => {
    if (!params) return request('/news');
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
    return request(`/news?${qs.toString()}`);
  },

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

  approveNews: (id) =>
    request(`/news/${id}/approve`, { method: 'PATCH' }),

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

import api from './api';

export const locationService = {
  getAll: async () => {
    const res = await api.get('/locations');
    return res.data || [];
  },

  getFeatured: async () => {
    const res = await api.get('/locations/featured');
    return res.data || [];
  },

  getBySlug: async (slug) => {
    const res = await api.get(`/locations/${slug}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/locations', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/locations/${id}`, data);
    return res.data;
  }
};

export const futureDevService = {
  getAll: async () => {
    const res = await api.get('/future-development');
    return res.data || [];
  },

  getByCategory: async (category) => {
    const res = await api.get(`/future-development/category/${category}`);
    return res.data || [];
  },

  create: async (data) => {
    const res = await api.post('/future-development', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/future-development/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/future-development/${id}`);
    return res;
  }
};

export const leadService = {
  submitEnquiry: async (enquiryData) => {
    const res = await api.post('/enquiries', enquiryData);
    return res;
  },

  getLeads: async (params = {}) => {
    const res = await api.get('/leads', { params });
    return res.data || { content: [], totalElements: 0 };
  },

  updateStatus: async (id, statusData) => {
    const res = await api.put(`/leads/${id}/status`, statusData);
    return res.data;
  },

  addNote: async (id, note) => {
    const res = await api.post(`/leads/${id}/notes`, { note });
    return res.data;
  }
};

export const siteVisitService = {
  book: async (bookingData) => {
    const res = await api.post('/site-visits', bookingData);
    return res;
  },

  getVisits: async (params = {}) => {
    const res = await api.get('/site-visits', { params });
    return res.data || { content: [], totalElements: 0 };
  },

  updateStatus: async (id, statusData) => {
    const res = await api.put(`/site-visits/${id}/status`, statusData);
    return res.data;
  }
};

export const adminService = {
  getStats: async () => {
    const res = await api.get('/admin/dashboard/stats');
    return res.data;
  }
};

export const blogService = {
  getAll: async () => {
    const res = await api.get('/blogs');
    return res.data || [];
  },

  getBySlug: async (slug) => {
    const res = await api.get(`/blogs/${slug}`);
    return res.data;
  }
};

import api from './api';

export const projectService = {
  getFeatured: async () => {
    const res = await api.get('/projects/featured');
    return res.data || [];
  },

  search: async (params = {}) => {
    const res = await api.get('/projects/search', { params });
    return res.data || { content: [], totalElements: 0, totalPages: 0 };
  },

  getBySlug: async (slug) => {
    const res = await api.get(`/projects/${slug}`);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/projects/id/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/projects', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/projects/${id}`);
    return res;
  }
};

import api from './api';

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data?.accessToken) {
      localStorage.setItem('aurum_token', res.data.accessToken);
      localStorage.setItem('aurum_refresh_token', res.data.refreshToken);
      localStorage.setItem('aurum_user', JSON.stringify({
        id: res.data.userId,
        email: res.data.email,
        fullName: res.data.fullName,
        roles: res.data.roles,
      }));
    }
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    if (res.data?.accessToken) {
      localStorage.setItem('aurum_token', res.data.accessToken);
      localStorage.setItem('aurum_refresh_token', res.data.refreshToken);
      localStorage.setItem('aurum_user', JSON.stringify({
        id: res.data.userId,
        email: res.data.email,
        fullName: res.data.fullName,
        roles: res.data.roles,
      }));
    }
    return res.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('aurum_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  logout: () => {
    localStorage.removeItem('aurum_token');
    localStorage.removeItem('aurum_refresh_token');
    localStorage.removeItem('aurum_user');
  }
};

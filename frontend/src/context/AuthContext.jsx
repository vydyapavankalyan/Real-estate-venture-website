import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setUser({
      id: res.userId,
      email: res.email,
      fullName: res.fullName,
      roles: res.roles,
    });
    return res;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    setUser({
      id: res.userId,
      email: res.email,
      fullName: res.fullName,
      roles: res.roles,
    });
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = user?.roles?.some(r => r === 'ROLE_ADMIN' || r === 'ROLE_SALES_MANAGER' || r === 'ROLE_CONTENT_MANAGER');

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

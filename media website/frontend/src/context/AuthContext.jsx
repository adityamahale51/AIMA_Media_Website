import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for existing token and load user
  useEffect(() => {
    const token = localStorage.getItem('aimaToken');
    if (token) {
      api.getMe()
        .then(data => setUser(data.user))
        .catch(() => localStorage.removeItem('aimaToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      localStorage.setItem('aimaToken', data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const register = async (formData) => {
    try {
      const payload = {
        name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };
      const data = await api.register(payload);
      localStorage.setItem('aimaToken', data.token);
      setUser(data.user);
      return { success: true, membershipId: data.user.membershipId || data.user.id };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('aimaToken');
    setUser(null);
  };

  const updateProfile = async (data) => {
    try {
      // allow callers to pass FormData (for file upload) or plain object
      const result = await api.updateProfile(data instanceof FormData ? data : data);
      setUser(result.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

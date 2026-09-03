import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const logoutTimerRef = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAdmin(false);
  }, []);

  const scheduleAutoLogout = useCallback((timeout) => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      logout();
      window.location.href = '/login';
      toast.success('Session expired. Please log in again.');
    }, timeout);
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setIsAdmin(true);
        scheduleAutoLogout(decoded.exp * 1000 - Date.now());
      } else {
        logout();
      }
    }
  }, [scheduleAutoLogout, logout]);

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    setIsAdmin(true);
    const decoded = jwt_decode(token);
    const timeout = decoded.exp * 1000 - Date.now();
    scheduleAutoLogout(timeout);
  }, [scheduleAutoLogout]);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

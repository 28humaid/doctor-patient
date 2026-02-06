// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple cookie check (we don't verify JWT on client — middleware already did)
    const checkAuth = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin_token='));
      
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
    // Optional: add interval or listen to cookie change if needed (rare)
  }, []);

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error("Logout failed", err);
        }
        // Clear client-side anyway
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setIsAuthenticated(false);
        window.location.href = '/admin';
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
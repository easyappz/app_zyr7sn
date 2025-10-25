import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { me } from '../api/auth';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  setAuth: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    let cancelled = false;
    async function init() {
      setLoading(true);
      try {
        const data = await me();
        if (!cancelled) setUser(data?.user || data || null);
      } catch (e) {
        if (!cancelled) {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    init();
    return () => { cancelled = true; };
  }, [token]);

  const setAuth = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser || null);
    if (nextToken) {
      localStorage.setItem('token', nextToken);
    } else {
      localStorage.removeItem('token');
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  const value = useMemo(() => ({ user, token, loading, setAuth, logout }), [user, token, loading, setAuth, logout]);

  return (
    <div data-easytag="id1-react/src/context/AuthContext.jsx">
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
}

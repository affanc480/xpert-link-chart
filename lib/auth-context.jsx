'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    ready: false,
    authed: false,
    user: null,
  });

  // Read authenticated user from backend. Called once on mount, and again
  // after login/logout/profile updates — never on a timer/loop.
  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        setState({ ready: true, authed: false, user: null });
        return null;
      }

      const json = await response.json();

      setState({ ready: true, authed: true, user: json.data });
      return json.data;
    } catch (err) {
      console.error(err);
      setState({ ready: true, authed: false, user: null });
      return null;
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async () => {
    // Cookie is already set by /api/auth/login — just pull the fresh user.
    return refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setState({ ready: true, authed: false, user: null });
    }
  }, []);

  const updateUser = useCallback(async (partial) => {
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partial),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Failed to update profile.');
    }

    setState((prev) => ({ ...prev, user: json.data }));
    return json.data;
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      refresh,
    }),
    [state, login, logout, updateUser, refresh]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

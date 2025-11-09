import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * AuthContext provides authentication state and helpers for the application.
 * The provider stores the current user, a loading flag, and exposes methods
 * for login, signup, logout and user refresh. Tokens are persisted in
 * localStorage to survive page reloads.
 */
const AuthContext = createContext();

/**
 * AuthProvider wraps the application and maintains authentication state.
 * On mount it attempts to read a stored JWT from localStorage and fetch
 * the current user. Subsequent login/signup calls will update the state.
 */
export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://lead-surge-backend2.vercel.app/api';

  // Fetch the current user's profile from the backend using the stored token.
  async function fetchMe(token, { showLoading = true } = {}) {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        // Token invalid or expired; remove it
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (err) {
      // Network error: keep the user null but don't crash
      console.error('Failed to fetch current user:', err);
      setUser(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  }

  async function refreshUser({ silent = true } = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setUser(null);
      if (!silent) {
        setLoading(false);
      }
      return;
    }
    await fetchMe(token, { showLoading: !silent });
  }

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      fetchMe(token, { showLoading: true });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Login with email and password. On success the token is stored and the
   * current user is fetched. Throws on error so callers can show feedback.
   */
  async function login(email, password) {
    const res = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    localStorage.setItem('token', data.token);
    await fetchMe(data.token, { showLoading: true });
  }

  /**
   * Register a new account. Accepts email and password. On success the
   * returned token is stored and the current user state is set. Throws on
   * error so callers can show feedback.
   */
  async function signup(email, password) {
    const res = await fetch(`${apiBaseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    localStorage.setItem('token', data.token);
    await fetchMe(data.token, { showLoading: true });
  }

  /**
   * Log the user out by clearing the stored token and user state. Redirect
   * to the login page afterwards.
   */
  function logout({ redirectToLanding = true } = {}) {
    localStorage.removeItem('token');
    setUser(null);
    router.push(redirectToLanding ? '/' : '/login');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refresh: refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming the AuthContext in function components.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, loginAdmin as loginAdminApi, googleLogin as googleLoginApi, getAuthProfile } from '../services/api.js';
import { getStoredAuth, setStoredAuth, clearStoredAuth, isTokenExpired } from '../utils/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and validate session from storage
  const initializeAuth = useCallback(async () => {
    try {
      const stored = getStoredAuth();

      if (!stored || !stored.token || isTokenExpired(stored.token)) {
        clearStoredAuth();
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      // Initialize with stored state immediately to prevent layout shifts
      setUser(stored.user);
      setToken(stored.token);

      // Verify token freshness against backend profile endpoint
      try {
        const response = await getAuthProfile(stored.token);
        if (response && response.data) {
          setUser(response.data);
          setStoredAuth({ user: response.data, token: stored.token });
        }
      } catch (err) {
        // If server rejects token as expired/invalid (401) or account deleted/not found (404), wipe session
        if (err.status === 401 || err.status === 404) {
          clearStoredAuth();
          setUser(null);
          setToken(null);
        }
        // If server is 503 or offline, maintain existing valid JWT session locally
      }
    } catch {
      clearStoredAuth();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();

    // Listen for cross-tab storage changes (e.g., logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'codeforge_token' || e.key === 'codeforge_user') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initializeAuth]);

  // Student Login handler
  const login = async ({ email, password }) => {
    const response = await loginUser({ email, password });
    const { user: loggedInUser, token: authToken } = response.data;

    // Enforce student role
    if (loggedInUser.role !== 'student') {
      const error = new Error('Access denied. Student credentials required.');
      error.status = 403;
      throw error;
    }

    setStoredAuth({ user: loggedInUser, token: authToken });
    setUser(loggedInUser);
    setToken(authToken);

    return { user: loggedInUser, token: authToken };
  };

  // Administrator Login handler
  const loginAdmin = async ({ email, password }) => {
    const response = await loginAdminApi({ email, password });
    const { user: loggedInUser, token: authToken } = response.data;

    // Enforce admin role
    if (loggedInUser.role !== 'admin') {
      const error = new Error('Access denied. Administrator credentials required.');
      error.status = 403;
      throw error;
    }

    setStoredAuth({ user: loggedInUser, token: authToken });
    setUser(loggedInUser);
    setToken(authToken);

    return { user: loggedInUser, token: authToken };
  };

  // Google Login handler
  const loginGoogle = async (googlePayload) => {
    const response = await googleLoginApi(googlePayload);
    const { user: loggedInUser, token: authToken } = response.data;

    setStoredAuth({ user: loggedInUser, token: authToken });
    setUser(loggedInUser);
    setToken(authToken);

    return { user: loggedInUser, token: authToken };
  };

  // Logout handler
  const logout = () => {
    clearStoredAuth();
    setUser(null);
    setToken(null);
  };

  // Check if session is authenticated and token is unexpired
  const isAuthenticated = Boolean(user && token && !isTokenExpired(token));
  const isAdmin = Boolean(isAuthenticated && user?.role === 'admin');

  const value = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    loginAdmin,
    loginGoogle,
    logout,
    refreshSession: initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

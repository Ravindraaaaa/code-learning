export const parseJwtPayload = (token) => {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(payloadBase64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) {
    return true;
  }

  // Current time in seconds vs exp in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp <= currentTime;
};

export const clearStoredAuth = () => {
  try {
    localStorage.removeItem('codeforge_token');
    localStorage.removeItem('codeforge_user');
  } catch {
    // Graceful fallback if localStorage is restricted
  }
};

export const setStoredAuth = ({ user, token }) => {
  try {
    localStorage.setItem('codeforge_token', token);
    localStorage.setItem('codeforge_user', JSON.stringify(user));
  } catch {
    // Graceful fallback
  }
};

export const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('codeforge_token');
    const userJson = localStorage.getItem('codeforge_user');

    if (!token || !userJson) {
      return null;
    }

    // Validate token expiry & format
    if (isTokenExpired(token)) {
      clearStoredAuth();
      return null;
    }

    const user = JSON.parse(userJson);
    return { token, user };
  } catch {
    clearStoredAuth();
    return null;
  }
};

export const isAuthenticated = () => {
  const auth = getStoredAuth();
  return Boolean(auth && auth.token);
};

import React from 'react';
import { Login } from './Login.jsx';

/**
 * AdminLogin Component
 * Renders the unified login interface with the Administrator portal pre-selected.
 */
export const AdminLogin = () => {
  return <Login initialRole="admin" />;
};

export default AdminLogin;

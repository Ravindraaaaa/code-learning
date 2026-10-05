import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  LogOut,
  AlertTriangle,
  Home,
  Sliders,
} from 'lucide-react';
import { ROUTES } from '../routes/paths.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import { Card } from '../components/common/Card.jsx';
import { Alert } from '../components/common/Alert.jsx';
import { Badge } from '../components/common/Badge.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AdminLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isAdmin, loginAdmin, logout } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If redirected from a protected admin route, preserve destination
  const redirectPath = location.state?.from?.pathname || ROUTES.ADMIN;
  const wasRedirected = Boolean(location.state?.from);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Admin email address is required';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setFieldErrors({});

    try {
      const authResult = await loginAdmin({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Strict role verification: ensure role is admin
      if (!authResult.user || authResult.user.role !== 'admin') {
        throw new Error('Access denied. Administrator credentials required.');
      }

      // Route forward to requested admin path
      navigate(redirectPath, { replace: true });
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setFieldErrors(err.errors);
      }
      setGeneralError(err.message || 'Authentication failed. Please verify your admin credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setFormData({ email: '', password: '' });
  };

  // 1. AUTHENTICATED AS ADMIN VIEW
  if (isAuthenticated && isAdmin && user) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8 sm:p-10 space-y-6 shadow-surface-lg border-primary-500/20">
          <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mx-auto text-primary-500 shadow-glow-primary">
            <CheckCircle2 className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <Badge variant="primary">Admin Authenticated</Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Welcome, Administrator {user.name}
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              You are currently authenticated with administrative authority.
            </p>
          </div>

          {/* Admin Credentials & Session Pill */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-elevated/70 border border-slate-200 dark:border-border-subtle text-left text-xs font-mono space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Admin:</span>
              <span className="font-semibold text-slate-900 dark:text-content-primary">{user.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Email:</span>
              <span className="text-slate-800 dark:text-content-secondary">{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Role:</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 font-bold uppercase tracking-wider">
                {user.role}
              </span>
            </div>
            {token && (
              <div className="pt-2 border-t border-slate-200 dark:border-border-subtle space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 dark:text-content-muted flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Admin Token:</span>
                  </span>
                  <span className="text-emerald-500 font-bold">Active & Verified</span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-content-subtle truncate select-all bg-slate-100 dark:bg-surface/50 p-1.5 rounded border border-slate-200/50 dark:border-border-subtle/50">
                  {token}
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link to={ROUTES.ADMIN} className="w-full">
              <Button variant="primary" size="md" className="w-full gap-2 shadow-glow-primary">
                <Sliders className="w-4 h-4" />
                <span>Go to Admin Portal</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="md"
              onClick={handleLogout}
              className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border-rose-200 dark:border-rose-900/30"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // 2. AUTHENTICATED AS STUDENT VIEW (Prompt to switch or sign out)
  if (isAuthenticated && !isAdmin && user) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8 sm:p-10 space-y-6 shadow-surface-lg border-amber-500/20">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-surface-sm">
            <AlertTriangle className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <Badge variant="warning">Student Session Active</Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Signed in as Student
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              You are currently authenticated as <span className="font-semibold text-slate-800 dark:text-content-secondary">{user.email}</span> with role <span className="font-mono font-bold uppercase">{user.role}</span>.
            </p>
          </div>

          <Alert variant="info">
            To access the administrator console, please sign out of your student account and provide your administrator credentials.
          </Alert>

          <div className="pt-2 flex flex-col gap-2.5">
            <Button
              variant="primary"
              size="md"
              onClick={handleLogout}
              className="w-full gap-2 shadow-glow-primary"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out & Enter Admin Credentials</span>
            </Button>

            <Link to={ROUTES.DASHBOARD} className="w-full">
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <span>Continue to Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to={ROUTES.HOME} className="w-full">
              <Button variant="ghost" size="sm" className="w-full gap-1.5">
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // 3. ADMIN LOGIN FORM VIEW
  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <Card className="p-8 sm:p-10 shadow-surface-lg border-slate-200 dark:border-border-subtle space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 via-violet-600 to-indigo-700 flex items-center justify-center mx-auto shadow-surface-sm text-white mb-3">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <Badge variant="primary">Admin Console</Badge>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
            Admin Authentication
          </h1>

          <p className="text-xs text-slate-500 dark:text-content-muted">
            Sign in with elevated administrator credentials to manage platform infrastructure.
          </p>
        </div>

        {/* Redirect context alert */}
        {wasRedirected && (
          <Alert variant="warning" title="Privileged Access Required">
            Administrator credentials are required to access this protected route.
          </Alert>
        )}

        {/* Global Error Alert */}
        {generalError && (
          <Alert
            variant="error"
            title="Authentication Error"
            dismissible
            onDismiss={() => setGeneralError('')}
          >
            {generalError}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Address */}
          <Input
            id="admin-login-email"
            name="email"
            type="email"
            label="Administrator Email"
            placeholder="admin@codeforge.dev"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            disabled={isLoading}
            autoComplete="email"
            required
          />

          {/* Password with Visibility Toggle */}
          <div className="relative">
            <Input
              id="admin-login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter admin password"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
              disabled={isLoading}
              autoComplete="current-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-content-primary focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full mt-2 shadow-glow-primary gap-2"
          >
            <span>{isLoading ? 'Verifying Admin Authority...' : 'Sign In to Admin Portal'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 dark:border-border-subtle flex flex-col items-center gap-2 text-xs text-slate-500 dark:text-content-muted">
          <div>
            <span>Are you a student? </span>
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Sign In to Student Portal
            </Link>
          </div>
          <Link
            to={ROUTES.HOME}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-content-primary"
          >
            ← Return to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;

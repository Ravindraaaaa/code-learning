import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight, Terminal, ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react';
import { ROUTES } from '../routes/paths.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import { Card } from '../components/common/Card.jsx';
import { Alert } from '../components/common/Alert.jsx';
import { Badge } from '../components/common/Badge.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, login, logout } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If redirected from a protected route, show context
  const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD;
  const wasRedirected = Boolean(location.state?.from);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
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
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      // If user came from a protected route, route them forward
      if (wasRedirected) {
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setFieldErrors(err.errors);
      }
      setGeneralError(err.message || 'Login failed. Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setFormData({ email: '', password: '' });
  };

  // AUTHENTICATED RESULT VIEW (Student Logged In)
  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8 sm:p-10 space-y-6 shadow-surface-lg border-violet-500/20">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 shadow-glow-primary">
            <CheckCircle2 className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <Badge variant="success">Authenticated</Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Welcome back, {user.name}!
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              You are currently authenticated as a verified CodeForge student.
            </p>
          </div>

          {/* Authentication Token & User Details */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-elevated/70 border border-slate-200 dark:border-border-subtle text-left text-xs font-mono space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Student:</span>
              <span className="font-semibold text-slate-900 dark:text-content-primary">{user.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Email:</span>
              <span className="text-slate-800 dark:text-content-secondary">{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Role:</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-bold uppercase">
                {user.role}
              </span>
            </div>
            {token && (
              <div className="pt-2 border-t border-slate-200 dark:border-border-subtle space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 dark:text-content-muted flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>JWT Session:</span>
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
            <Link to={ROUTES.DASHBOARD} className="w-full">
              <Button variant="primary" size="md" className="w-full gap-2 shadow-glow-primary">
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Student Dashboard</span>
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

  // LOGIN FORM VIEW
  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <Card className="p-8 sm:p-10 shadow-surface-lg border-slate-200 dark:border-border-subtle space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center mx-auto shadow-surface-sm text-white mb-3">
            <Terminal className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <Badge variant="primary">Student Portal</Badge>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
            Sign In to CodeForge
          </h1>

          <p className="text-xs text-slate-500 dark:text-content-muted">
            Enter your credentials to continue your coding journey.
          </p>
        </div>

        {/* Protected route redirect notification */}
        {wasRedirected && (
          <Alert variant="warning" title="Authentication Required">
            You must be signed in as a student to access this protected page.
          </Alert>
        )}

        {/* Global Error Alert */}
        {generalError && (
          <Alert variant="error" title="Authentication Error" dismissible onDismiss={() => setGeneralError('')}>
            {generalError}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Address */}
          <Input
            id="login-email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="student@example.com"
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
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
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
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 dark:border-border-subtle text-center text-xs text-slate-500 dark:text-content-muted">
          <span>Don't have an account? </span>
          <Link
            to={ROUTES.REGISTER}
            className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
          >
            Register as Student
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;

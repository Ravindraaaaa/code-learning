import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Terminal,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Shield,
  User,
  Zap,
} from 'lucide-react';
import { ROUTES } from '../routes/paths.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import { Card } from '../components/common/Card.jsx';
import { Alert } from '../components/common/Alert.jsx';
import { Badge } from '../components/common/Badge.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = ({ initialRole = 'student' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, token, isAuthenticated, login, loginAdmin, logout } = useAuth();

  const roleParam = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState(
    roleParam === 'admin' ? 'admin' : initialRole
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If redirected from a protected route, determine destination
  const redirectPath =
    location.state?.from?.pathname ||
    (selectedRole === 'admin' ? ROUTES.ADMIN : ROUTES.DASHBOARD);
  const wasRedirected = Boolean(location.state?.from);

  useEffect(() => {
    if (roleParam === 'admin') {
      setSelectedRole('admin');
    }
  }, [roleParam]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = `${selectedRole === 'admin' ? 'Administrator' : 'Student'} email is required`;
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

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@codeforge.dev',
        password: 'Admin@123',
      });
      setSelectedRole('admin');
    } else {
      setFormData({
        email: 'student@codeforge.dev',
        password: 'Student@123',
      });
      setSelectedRole('student');
    }
    setFieldErrors({});
    setGeneralError('');
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
      if (selectedRole === 'admin') {
        await loginAdmin({
          email: formData.email.trim(),
          password: formData.password,
        });
        navigate(ROUTES.ADMIN, { replace: true });
      } else {
        await login({
          email: formData.email.trim(),
          password: formData.password,
        });
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setFieldErrors(err.errors);
      }
      setGeneralError(err.message || 'Login failed. Invalid credentials or insufficient permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setFormData({ email: '', password: '' });
  };

  // AUTHENTICATED RESULT VIEW (User Already Logged In)
  if (isAuthenticated && user) {
    const isAdminUser = user.role === 'admin';

    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className={`text-center p-8 sm:p-10 space-y-6 shadow-surface-lg ${isAdminUser ? 'border-amber-500/30' : 'border-violet-500/20'}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-surface-sm ${
            isAdminUser ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
          }`}>
            {isAdminUser ? <Shield className="w-8 h-8 stroke-[2]" /> : <CheckCircle2 className="w-8 h-8 stroke-[2]" />}
          </div>

          <div className="space-y-2">
            <Badge variant={isAdminUser ? 'warning' : 'success'}>
              {isAdminUser ? 'Administrator Session' : 'Student Session'}
            </Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Welcome back, {user.name}!
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              You are currently authenticated as a verified CodeForge <span className="font-semibold">{user.role}</span>.
            </p>
          </div>

          {/* Authentication Token & User Details */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-elevated/70 border border-slate-200 dark:border-border-subtle text-left text-xs font-mono space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Account:</span>
              <span className="font-semibold text-slate-900 dark:text-content-primary">{user.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Email:</span>
              <span className="text-slate-800 dark:text-content-secondary">{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-content-muted">Role:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                isAdminUser
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20'
              }`}>
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
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {isAdminUser ? (
              <>
                <Link to={ROUTES.ADMIN} className="w-full">
                  <Button variant="primary" size="md" className="w-full gap-2 shadow-glow-primary bg-amber-600 hover:bg-amber-500">
                    <Shield className="w-4 h-4" />
                    <span>Go to Admin Portal</span>
                  </Button>
                </Link>
                <Link to={ROUTES.DASHBOARD} className="w-full">
                  <Button variant="outline" size="md" className="w-full gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>View Student Dashboard</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={ROUTES.DASHBOARD} className="w-full">
                <Button variant="primary" size="md" className="w-full gap-2 shadow-glow-primary">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Student Dashboard</span>
                </Button>
              </Link>
            )}

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
  const isAdmin = selectedRole === 'admin';

  return (
    <div className="max-w-md mx-auto py-8 px-4 animate-fade-in">
      <Card className="p-8 sm:p-10 shadow-surface-lg border-slate-200 dark:border-border-subtle space-y-6">
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto shadow-surface-sm text-white mb-3 transition-colors ${
            isAdmin
              ? 'bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700'
              : 'bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500'
          }`}>
            {isAdmin ? <Shield className="w-6 h-6 stroke-[2.5]" /> : <Terminal className="w-6 h-6 stroke-[2.5]" />}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
            Sign In to CodeForge
          </h1>

          <p className="text-xs text-slate-500 dark:text-content-muted">
            {isAdmin
              ? 'Administrator portal credentials required.'
              : 'Enter your student credentials to continue your coding journey.'}
          </p>
        </div>

        {/* Unified Role Switcher Tab (Student vs Admin) */}
        <div className="flex p-1 bg-slate-100 dark:bg-surface-elevated rounded-xl border border-slate-200 dark:border-border-subtle">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('student');
              setGeneralError('');
              setFieldErrors({});
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              !isAdmin
                ? 'bg-white dark:bg-violet-600 text-slate-900 dark:text-white shadow-surface-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-content-muted dark:hover:text-content-primary'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('admin');
              setGeneralError('');
              setFieldErrors({});
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              isAdmin
                ? 'bg-white dark:bg-amber-600 text-slate-900 dark:text-white shadow-surface-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-content-muted dark:hover:text-content-primary'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="pt-1">
          {isAdmin ? (
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin')}
              className="w-full py-1.5 px-3 rounded-lg border border-dashed border-amber-300 dark:border-amber-700/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 text-xs font-mono flex items-center justify-center gap-2 hover:bg-amber-100/50 transition-colors"
              title="Click to automatically fill demo admin credentials"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Auto-Fill Demo Admin (admin@codeforge.dev)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => fillDemoCredentials('student')}
              className="w-full py-1.5 px-3 rounded-lg border border-dashed border-violet-300 dark:border-violet-700/50 bg-violet-50/50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300 text-xs font-mono flex items-center justify-center gap-2 hover:bg-violet-100/50 transition-colors"
              title="Click to automatically fill demo student credentials"
            >
              <Zap className="w-3.5 h-3.5 text-violet-500" />
              <span>Auto-Fill Demo Student (student@codeforge.dev)</span>
            </button>
          )}
        </div>

        {/* Protected route redirect notification */}
        {wasRedirected && (
          <Alert variant="warning" title="Authentication Required">
            You must be signed in as a {isAdmin ? 'system administrator' : 'student'} to access this protected area.
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
            label={isAdmin ? 'Administrator Email' : 'Email Address'}
            placeholder={isAdmin ? 'admin@codeforge.dev' : 'student@codeforge.dev'}
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
              placeholder={isAdmin ? 'Enter admin password' : 'Enter your password'}
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
            className={`w-full mt-2 shadow-glow-primary gap-2 ${isAdmin ? 'bg-amber-600 hover:bg-amber-500' : ''}`}
          >
            <span>
              {isLoading
                ? (isAdmin ? 'Verifying Admin Authority...' : 'Signing In...')
                : (isAdmin ? 'Sign In as Administrator' : 'Sign In as Student')}
            </span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 dark:border-border-subtle text-center text-xs text-slate-500 dark:text-content-muted space-y-2">
          {!isAdmin ? (
            <div>
              <span>Don't have an account? </span>
              <Link
                to={ROUTES.REGISTER}
                className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Register as Student
              </Link>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 font-mono">
              🛡️ Admin portal requires elevated credentials.
            </p>
          )}

          <div>
            <Link
              to={ROUTES.HOME}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-content-primary text-[11px]"
            >
              ← Return to Platform Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;

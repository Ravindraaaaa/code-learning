import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiAlertCircle,
  FiShield,
  FiLogOut,
  FiTerminal,
  FiLoader,
  FiInfo,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '../routes/paths.js';
import { useAuth } from '../context/AuthContext.jsx';
import { APP_CONFIG } from '../utils/constants.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = ({ initialRole = 'student' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, login, loginAdmin, logout, loginGoogle } = useAuth();

  const roleParam = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState(
    roleParam === 'admin' ? 'admin' : initialRole
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [oauthNotice, setOauthNotice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAdmin = selectedRole === 'admin';

  // Determine post-login destination
  const redirectPath =
    location.state?.from?.pathname ||
    (isAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD);
  const wasRedirected = Boolean(location.state?.from);

  useEffect(() => {
    if (roleParam === 'admin') {
      setSelectedRole('admin');
    } else if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [roleParam, initialRole]);

  // Real-time validation computation
  const isEmailEmpty = !formData.email.trim();
  const isEmailValidFormat = !isEmailEmpty && EMAIL_REGEX.test(formData.email.trim());
  const showEmailError = emailTouched && !isEmailEmpty && !isEmailValidFormat;
  const showEmailEmptyError = emailTouched && isEmailEmpty;
  const showEmailSuccess = emailTouched && isEmailValidFormat;

  const showPasswordEmptyError = passwordTouched && !formData.password;

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (!emailTouched) setEmailTouched(true);
    if (generalError) setGeneralError('');
    if (oauthNotice) setOauthNotice('');
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, password: val }));
    if (!passwordTouched) setPasswordTouched(true);
    if (generalError) setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setOauthNotice('');
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      return;
    }
    if (!formData.password) {
      return;
    }

    setIsLoading(true);

    try {
      if (isAdmin) {
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
      // Security rule: Never expose whether the email exists or password alone is wrong
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setGeneralError(
          'Unable to connect to CodeForge API. Please ensure the backend server is running on port 5000.'
        );
      } else if (err.status === 403) {
        setGeneralError(
          isAdmin
            ? 'Access denied. Administrator credentials required.'
            : 'Access denied. Student credentials required.'
        );
      } else {
        setGeneralError('Invalid email or password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoGoogleLogin = async () => {
    setIsLoading(true);
    setGeneralError('');
    try {
      await loginGoogle({
        email: 'google.student@codeforge.dev',
        name: 'Google Student Demo',
        googleId: 'demo_google_student_id',
      });
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setGeneralError(err.message || 'Google demo sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGeneralError('');
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      setOauthNotice(
        'Google OAuth Client ID is not configured in .env yet. You can sign in instantly using the Google Demo Account below, or provide VITE_GOOGLE_CLIENT_ID in your .env file.'
      );
      return;
    }

    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid profile email');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  };

  const handleLogout = () => {
    logout();
    setFormData({ email: '', password: '' });
    setEmailTouched(false);
    setPasswordTouched(false);
  };

  // =========================================================================
  // AUTHENTICATED RESULT VIEW (User Already Signed In)
  // =========================================================================
  if (isAuthenticated && user) {
    const isAdminUser = user.role === 'admin';

    return (
      <div className="w-full flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[420px] bg-white rounded-2xl border border-stone-200 p-7 sm:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] space-y-5 text-center">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${
              isAdminUser
                ? 'bg-amber-50 text-amber-600 border border-amber-200'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            }`}
          >
            {isAdminUser ? (
              <FiShield className="w-6 h-6" />
            ) : (
              <FiCheck className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <span
              className={`inline-block text-xs font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                isAdminUser
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isAdminUser ? 'Administrator Session' : 'Student Session'}
            </span>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-stone-500">
              Authenticated as <span className="font-medium text-stone-700">{user.email}</span>
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link to={isAdminUser ? ROUTES.ADMIN : ROUTES.DASHBOARD} className="w-full">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <span>Go to {isAdminUser ? 'Admin Portal' : 'Student Dashboard'}</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 text-sm font-medium transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN LOGIN VIEW (Warm Off-White Canvas with Clean White Login Card)
  // =========================================================================
  return (
    <div className="w-full flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] space-y-4 sm:space-y-4.5 transition-all">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 rounded-xl mb-1"
            aria-label="CodeForge Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <FiTerminal className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-stone-900">
                {APP_CONFIG.name}
              </span>
              <span className="text-xs font-mono font-medium text-violet-700 bg-violet-100/70 border border-violet-200/80 px-2 py-0.5 rounded-md">
                v{APP_CONFIG.version}
              </span>
            </div>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            {isAdmin ? 'Administrator Sign In' : 'Welcome back'}
          </h1>
          <p className="text-sm text-stone-500 leading-normal max-w-xs mx-auto">
            {isAdmin
              ? 'Enter administrative credentials to manage platform systems.'
              : 'Sign in to your student account to continue learning.'}
          </p>
        </div>

        {/* Redirect Notice if routed from protected guard */}
        {wasRedirected && (
          <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-center gap-2.5">
            <FiInfo className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Please sign in to access the requested page.</span>
          </div>
        )}

        {/* Generic Error Notice (never leaks account existence) */}
        {generalError && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in"
          >
            <FiAlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <span className="flex-1 leading-snug">{generalError}</span>
          </div>
        )}

        {/* OAuth Notice with Demo Login Option */}
        {oauthNotice && (
          <div className="p-3.5 rounded-xl bg-violet-50/90 border border-violet-200 text-violet-900 text-xs sm:text-sm space-y-2.5 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <FiInfo className="w-4 h-4 shrink-0 text-violet-600 mt-0.5" />
              <span className="flex-1 leading-snug">{oauthNotice}</span>
            </div>
            <button
              type="button"
              onClick={handleDemoGoogleLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs transition-colors shadow-sm"
            >
              <FcGoogle className="w-4 h-4" />
              <span>Sign in with Google Student Demo</span>
            </button>
          </div>
        )}

        {/* Quick Demo Fill Helper */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/90 text-xs text-stone-600 space-y-2">
          <div className="flex items-center justify-between text-stone-500 font-medium">
            <span>Quick Test Accounts:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('student');
                setFormData({ email: 'student@test.com', password: 'password123' });
                setEmailTouched(true);
                setPasswordTouched(true);
                setGeneralError('');
              }}
              className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-violet-300 hover:text-violet-700 text-stone-700 font-medium transition-colors shadow-2xs"
            >
              Student: <span className="font-mono text-stone-900">student@test.com</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setFormData({ email: 'admin@codeforge.dev', password: 'Admin@123' });
                setEmailTouched(true);
                setPasswordTouched(true);
                setGeneralError('');
              }}
              className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-violet-300 hover:text-violet-700 text-stone-700 font-medium transition-colors shadow-2xs"
            >
              Admin: <span className="font-mono text-stone-900">admin@codeforge.dev</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          {/* Email Field with Real-Time Validation Indicators */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-stone-800"
            >
              {isAdmin ? 'Administrator Email' : 'Email Address'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-stone-400">
                <FiMail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                onBlur={() => setEmailTouched(true)}
                disabled={isLoading}
                placeholder={isAdmin ? 'admin@codeforge.dev' : 'student@test.com'}
                autoComplete="email"
                required
                className={`w-full rounded-xl bg-white border text-sm pl-10 pr-10 py-2.5 text-stone-900 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 ${
                  showEmailError || showEmailEmptyError
                    ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
                    : showEmailSuccess
                    ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-600'
                    : 'border-stone-200 hover:border-stone-300 focus:ring-violet-500/20 focus:border-violet-600'
                }`}
              />
              {/* Right validation state icon */}
              <div className="absolute right-3.5 pointer-events-none">
                {showEmailSuccess && (
                  <FiCheck className="w-4 h-4 text-emerald-600" />
                )}
                {(showEmailError || showEmailEmptyError) && (
                  <FiAlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            </div>

            {/* Inline validation messages */}
            {showEmailEmptyError && (
              <p className="text-xs text-rose-600 font-medium">
                {isAdmin ? 'Administrator email is required.' : 'Student email is required.'}
              </p>
            )}
            {showEmailError && (
              <p className="text-xs text-rose-600 font-medium">
                Enter a valid email address.
              </p>
            )}
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-stone-800"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-stone-400">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handlePasswordChange}
                onBlur={() => setPasswordTouched(true)}
                disabled={isLoading}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className={`w-full rounded-xl bg-white border text-sm pl-10 pr-10 py-2.5 text-stone-900 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 ${
                  showPasswordEmptyError
                    ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
                    : 'border-stone-200 hover:border-stone-300 focus:ring-violet-500/20 focus:border-violet-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 text-stone-400 hover:text-stone-600 transition-colors p-1"
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>

            {showPasswordEmptyError && (
              <p className="text-xs text-rose-600 font-medium">
                Password is required.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isEmailEmpty || !formData.password}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-sm font-semibold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 pt-1"
          >
            {isLoading ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin text-white" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in</span>
                <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Google Sign-In (Student Portal only) */}
        {!isAdmin && (
          <div className="space-y-3 pt-0.5">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-stone-400 uppercase tracking-wider font-medium">
                or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-sm font-medium transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              aria-label="Continue with Google"
            >
              <FcGoogle className="w-4 h-4" />
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* Footer Navigation Links */}
        <div className="pt-2.5 border-t border-stone-100 text-center text-sm text-stone-600 space-y-2">
          {!isAdmin ? (
            <div>
              <span>Don&apos;t have an account? </span>
              <Link
                to={ROUTES.REGISTER}
                className="font-semibold text-stone-900 hover:text-violet-600 transition-colors"
              >
                Create student account
              </Link>
            </div>
          ) : (
            <div>
              <span>Student? </span>
              <Link
                to={ROUTES.LOGIN}
                className="font-semibold text-stone-900 hover:text-violet-600 transition-colors"
              >
                Return to student portal
              </Link>
            </div>
          )}

          {!isAdmin && (
            <div>
              <Link
                to={ROUTES.ADMIN_LOGIN}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                Administrator portal &rarr;
              </Link>
            </div>
          )}

          <div>
            <Link
              to={ROUTES.HOME}
              className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
            >
              &larr; Return to platform home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

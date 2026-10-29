import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiTerminal,
  FiAlertCircle,
  FiLoader,
  FiInfo,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { registerUser } from '../services/api.js';
import { ROUTES } from '../routes/paths.js';
import { APP_CONFIG } from '../utils/constants.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [generalError, setGeneralError] = useState('');
  const [oauthNotice, setOauthNotice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Real-time field validation states
  const isNameEmpty = !formData.name.trim();
  const isNameTooShort = !isNameEmpty && formData.name.trim().length < 2;
  const isNameValid = !isNameEmpty && formData.name.trim().length >= 2 && formData.name.trim().length <= 50;

  const isEmailEmpty = !formData.email.trim();
  const isEmailValidFormat = !isEmailEmpty && EMAIL_REGEX.test(formData.email.trim());
  const showEmailError = touched.email && !isEmailEmpty && !isEmailValidFormat;
  const showEmailEmptyError = touched.email && isEmailEmpty;
  const showEmailSuccess = touched.email && isEmailValidFormat;

  const isPasswordEmpty = !formData.password;
  const isPasswordTooShort = !isPasswordEmpty && formData.password.length < 8;
  const isPasswordValid = !isPasswordEmpty && formData.password.length >= 8;

  const isConfirmEmpty = !formData.confirmPassword;
  const isConfirmMatching = !isConfirmEmpty && formData.password === formData.confirmPassword && isPasswordValid;
  const showConfirmMismatch = touched.confirmPassword && !isConfirmEmpty && formData.password !== formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (generalError) setGeneralError('');
    if (oauthNotice) setOauthNotice('');
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setOauthNotice('');

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!isNameValid || !isEmailValidFormat || !isPasswordValid || formData.password !== formData.confirmPassword) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setRegisteredUser(response.data);
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setGeneralError(
          'Unable to connect to CodeForge API. Please ensure the backend server is running on port 5000.'
        );
      } else if (err.status === 409) {
        setGeneralError('An account with this email address already exists.');
      } else {
        setGeneralError(err.message || 'Registration failed. Please check your information.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setGeneralError('');
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      setOauthNotice(
        'Google Sign-Up is not configured. Please supply VITE_GOOGLE_CLIENT_ID in your environment to enable Google authentication.'
      );
      return;
    }

    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid profile email');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  };

  // =========================================================================
  // SUCCESS STATE VIEW
  // =========================================================================
  if (registeredUser) {
    return (
      <div className="w-full flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[420px] bg-white rounded-2xl border border-stone-200 p-7 sm:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] space-y-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
            <FiCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <span className="inline-block text-xs font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Account Created
            </span>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              Welcome to CodeForge!
            </h1>
            <p className="text-xs text-stone-500">
              Your student profile has been registered successfully.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Name:</span>
              <span className="font-semibold text-stone-900">{registeredUser.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Email:</span>
              <span className="font-medium text-stone-700 font-mono">{registeredUser.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Role:</span>
              <span className="text-[11px] font-mono uppercase px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-bold border border-violet-200">
                Student
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link to={ROUTES.LOGIN} className="w-full">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
              >
                <span>Proceed to Sign In</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to={ROUTES.HOME} className="w-full">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-sm font-medium transition-all"
              >
                Return to Platform Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN REGISTRATION VIEW (Warm Off-White Canvas with Clean White Card)
  // =========================================================================
  return (
    <div className="w-full flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] space-y-3.5 transition-all">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 rounded-xl mb-0.5"
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
            Create Student Account
          </h1>
          <p className="text-sm text-stone-500 leading-normal max-w-xs mx-auto">
            Start learning programming, practicing code, and tracking progress.
          </p>
        </div>

        {/* Error Alert */}
        {generalError && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in"
          >
            <FiAlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <span className="flex-1 leading-snug">{generalError}</span>
          </div>
        )}

        {/* OAuth Setup Notice */}
        {oauthNotice && (
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-xs sm:text-sm flex items-start gap-2.5">
            <FiInfo className="w-4 h-4 shrink-0 text-stone-500 mt-0.5" />
            <span className="flex-1 leading-snug">{oauthNotice}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          {/* Full Name */}
          <div className="space-y-1 text-left">
            <label
              htmlFor="register-name"
              className="block text-sm font-medium text-stone-800"
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-stone-400">
                <FiUser className="w-4 h-4" />
              </div>
              <input
                id="register-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                disabled={isLoading}
                placeholder="John Doe"
                autoComplete="name"
                required
                className={`w-full rounded-xl bg-white border text-sm pl-10 pr-10 py-2.5 text-stone-900 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 ${
                  touched.name && (isNameEmpty || isNameTooShort)
                    ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
                    : touched.name && isNameValid
                    ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-600'
                    : 'border-stone-200 hover:border-stone-300 focus:ring-violet-500/20 focus:border-violet-600'
                }`}
              />
              <div className="absolute right-3.5 pointer-events-none">
                {touched.name && isNameValid && (
                  <FiCheck className="w-4 h-4 text-emerald-600" />
                )}
                {touched.name && (isNameEmpty || isNameTooShort) && (
                  <FiAlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            </div>
            {touched.name && isNameEmpty && (
              <p className="text-xs text-rose-600 font-medium">Name is required.</p>
            )}
            {touched.name && isNameTooShort && (
              <p className="text-xs text-rose-600 font-medium">Name must be at least 2 characters.</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1 text-left">
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-stone-800"
            >
              Student Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-stone-400">
                <FiMail className="w-4 h-4" />
              </div>
              <input
                id="register-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                disabled={isLoading}
                placeholder="student@example.com"
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
              <div className="absolute right-3.5 pointer-events-none">
                {showEmailSuccess && (
                  <FiCheck className="w-4 h-4 text-emerald-600" />
                )}
                {(showEmailError || showEmailEmptyError) && (
                  <FiAlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            </div>
            {showEmailEmptyError && (
              <p className="text-xs text-rose-600 font-medium">Email address is required.</p>
            )}
            {showEmailError && (
              <p className="text-xs text-rose-600 font-medium">Enter a valid email address.</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1 text-left">
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-stone-800"
            >
              Password <span className="font-normal text-stone-500 text-xs">(min. 8 characters)</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-stone-400">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                disabled={isLoading}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                className={`w-full rounded-xl bg-white border text-sm pl-10 pr-10 py-2.5 text-stone-900 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 ${
                  touched.password && (isPasswordEmpty || isPasswordTooShort)
                    ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
                    : touched.password && isPasswordValid
                    ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-600'
                    : 'border-stone-200 hover:border-stone-300 focus:ring-violet-500/20 focus:border-violet-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 text-stone-400 hover:text-stone-700 focus:outline-none transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>
            {touched.password && isPasswordTooShort && (
              <p className="text-xs text-rose-600 font-medium">Password must be at least 8 characters long.</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1 text-left">
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-medium text-stone-800"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-stone-400">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                disabled={isLoading}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                className={`w-full rounded-xl bg-white border text-sm pl-10 pr-10 py-2.5 text-stone-900 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 ${
                  showConfirmMismatch
                    ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
                    : isConfirmMatching
                    ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-600'
                    : 'border-stone-200 hover:border-stone-300 focus:ring-violet-500/20 focus:border-violet-600'
                }`}
              />
              <div className="absolute right-3.5 pointer-events-none">
                {isConfirmMatching && (
                  <FiCheck className="w-4 h-4 text-emerald-600" />
                )}
                {showConfirmMismatch && (
                  <FiAlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            </div>
            {showConfirmMismatch && (
              <p className="text-xs text-rose-600 font-medium">Passwords do not match.</p>
            )}
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1.5 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/20"
          >
            {isLoading ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin shrink-0" />
                <span>Creating account&hellip;</span>
              </>
            ) : (
              <>
                <span>Create Student Account</span>
                <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Google Sign-Up */}
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
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-sm font-medium transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20"
            aria-label="Continue with Google"
          >
            <FcGoogle className="w-4 h-4" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="pt-2.5 border-t border-stone-100 text-center text-sm text-stone-600 space-y-2">
          <div>
            <span>Already have an account? </span>
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-stone-900 hover:text-violet-600 transition-colors"
            >
              Sign in
            </Link>
          </div>

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

export default Register;

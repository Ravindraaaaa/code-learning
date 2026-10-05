import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { registerUser } from '../services/api.js';
import { ROUTES } from '../routes/paths.js';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import { Card } from '../components/common/Card.jsx';
import { Alert } from '../components/common/Alert.jsx';
import { Badge } from '../components/common/Badge.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      errors.name = 'Name cannot exceed 50 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      const response = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setRegisteredUser(response.data);
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setFieldErrors(err.errors);
      }
      setGeneralError(err.message || 'Registration failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // SUCCESS STATE VIEW
  if (registeredUser) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8 sm:p-10 space-y-6 shadow-surface-lg border-violet-500/20">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 shadow-glow-primary">
            <CheckCircle2 className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <Badge variant="success">Account Created</Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Welcome to CodeForge!
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              Your student profile has been registered successfully.
            </p>
          </div>

          {/* User Registration Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-elevated/70 border border-slate-200 dark:border-border-subtle text-left text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-content-muted">Name:</span>
              <span className="font-semibold text-slate-900 dark:text-content-primary">{registeredUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-content-muted">Email:</span>
              <span className="text-slate-800 dark:text-content-secondary">{registeredUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-content-muted">Role:</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-bold uppercase">
                {registeredUser.role}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-border-subtle text-[11px] text-slate-400 dark:text-content-subtle">
              <span>Security:</span>
              <span className="text-emerald-500">passwordHash secured</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link to={ROUTES.LOGIN} className="w-full">
              <Button variant="primary" size="md" className="w-full gap-2">
                <span>Proceed to Login</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to={ROUTES.HOME} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Back to Platform Overview
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // REGISTRATION FORM VIEW
  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <Card className="p-8 sm:p-10 shadow-surface-lg border-slate-200 dark:border-border-subtle space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center mx-auto shadow-surface-sm text-white mb-3">
            <Terminal className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <Badge variant="primary">Student Registration</Badge>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
            Create CodeForge Account
          </h1>

          <p className="text-xs text-slate-500 dark:text-content-muted">
            Start practicing algorithmic challenges and mastering code.
          </p>
        </div>

        {/* Global Error Alert */}
        {generalError && (
          <Alert variant="error" title="Registration Failed" dismissible onDismiss={() => setGeneralError('')}>
            {generalError}
          </Alert>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <Input
            id="register-name"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            icon={UserIcon}
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
            disabled={isLoading}
            autoComplete="name"
            required
          />

          {/* Email Address */}
          <Input
            id="register-email"
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

          {/* Password */}
          <div className="relative">
            <Input
              id="register-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="At least 8 characters"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
              disabled={isLoading}
              autoComplete="new-password"
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

          {/* Confirm Password */}
          <Input
            id="register-confirm-password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="Re-enter your password"
            icon={Lock}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={fieldErrors.confirmPassword}
            disabled={isLoading}
            autoComplete="new-password"
            required
          />

          {/* Role Disclosure */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-elevated/40 border border-slate-200 dark:border-border-subtle flex items-center justify-between text-xs text-slate-500 dark:text-content-muted">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              <span>Assigned Role</span>
            </span>
            <span className="font-semibold text-slate-800 dark:text-content-primary font-mono">
              Student (Default)
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full mt-2 shadow-glow-primary"
          >
            {isLoading ? 'Creating Account...' : 'Register as Student'}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 dark:border-border-subtle text-center text-xs text-slate-500 dark:text-content-muted">
          <span>Already have an account? </span>
          <Link
            to={ROUTES.LOGIN}
            className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;

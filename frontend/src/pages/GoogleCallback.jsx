import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ROUTES } from '../routes/paths.js';
import { Alert } from '../components/common/Alert.jsx';
import { Button } from '../components/common/Button.jsx';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';

export const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginGoogle } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const token = searchParams.get('token') || searchParams.get('id_token');
        const errorParam = searchParams.get('error');

        if (errorParam) {
          throw new Error(`Google returned an error: ${errorParam}`);
        }

        // Also check hash for implicit grant
        const hashParams = new URLSearchParams(location.hash.replace(/^#/, ''));
        const hashToken = hashParams.get('id_token') || hashParams.get('access_token');

        const credential = token || hashToken || code;

        if (!credential) {
          throw new Error('No authentication credential received from Google.');
        }

        const redirectUri = `${window.location.origin}/auth/google/callback`;
        await loginGoogle({
          credential,
          code: code || undefined,
          token: token || hashToken || undefined,
          redirectUri,
        });

        if (isMounted) {
          navigate(ROUTES.DASHBOARD, { replace: true });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to authenticate with Google. Please try again.');
        }
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [location, loginGoogle, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface/90 p-8 shadow-surface-md text-center space-y-6">
        {error ? (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <FiAlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Google Sign-In Failed</h2>
            <Alert variant="error">{error}</Alert>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => navigate(ROUTES.LOGIN, { replace: true })}
            >
              Return to Sign In
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <FiLoader className="w-8 h-8 text-violet-400 animate-spin mx-auto" />
            <h2 className="text-lg font-bold text-white">Verifying Google Account...</h2>
            <p className="text-xs text-content-muted">
              Please wait while we complete your authentication with CodeForge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;

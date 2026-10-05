import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { ROUTES } from './paths.js';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { StatusIndicator } from '../components/common/StatusIndicator.jsx';

/**
 * ProtectedRoute Component
 * Restricts access exclusively to authenticated users with specified role(s).
 * Handles:
 * - Loading state during token validation on initial load / refresh
 * - Redirection to login for unauthenticated or expired token sessions
 * - Access denied view for unauthorized roles (non-student)
 */
export const ProtectedRoute = ({
  allowedRoles = ['student'],
  redirectTo = ROUTES.LOGIN,
  children,
}) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // 1. Loading state during session restoration / validation
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <StatusIndicator status="pending" size="lg" pulse label="Authenticating session..." />
        <p className="text-xs text-slate-500 dark:text-content-muted font-mono">
          Verifying security credentials & cryptographic token...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated or expired token -> Redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. Unauthorized user role -> Display access denied state
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8 sm:p-10 space-y-6 shadow-surface-lg border-rose-500/20">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-500 shadow-surface-sm">
            <ShieldAlert className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <Badge variant="error">Access Denied</Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Student Access Only
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              Your account has the role <span className="font-mono font-bold uppercase">{user.role}</span>. This section is strictly reserved for students.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={logout}
              className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20"
            >
              <span>Sign Out & Switch Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

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

  // 4. Authorized student -> Render protected content
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

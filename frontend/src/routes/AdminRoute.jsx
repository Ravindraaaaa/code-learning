import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Home, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { ROUTES } from './paths.js';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { StatusIndicator } from '../components/common/StatusIndicator.jsx';

/**
 * AdminRoute Component
 * Restricts access exclusively to authenticated users with 'admin' role.
 * Handles:
 * - Loading state during session restoration / token verification
 * - Redirection to /admin/login for unauthenticated or expired token sessions
 * - Access denied view for unauthorized roles (e.g. logged-in students)
 */
export const AdminRoute = ({
  redirectTo = ROUTES.ADMIN_LOGIN,
  children,
}) => {
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, isLoading, logout } = useAuth();

  // 1. Loading state during session restoration / validation
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <StatusIndicator status="pending" size="lg" pulse label="Authenticating administrator session..." />
        <p className="text-xs text-slate-500 dark:text-content-muted font-mono">
          Verifying administrative credentials & privileges...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated or expired token -> Redirect to admin login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. Authenticated user is NOT an admin (e.g. student role) -> Display access denied state
  if (!isAdmin || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8 sm:p-10 space-y-6 shadow-surface-lg border-amber-500/20">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-surface-sm">
            <ShieldAlert className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <Badge variant="warning">Restricted Access</Badge>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Administrator Access Required
            </h2>
            <p className="text-sm text-slate-600 dark:text-content-muted">
              You are currently logged in with role <span className="font-mono font-bold uppercase">{user.role}</span> ({user.email}). This section requires elevated administrator privileges.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link to={ROUTES.ADMIN_LOGIN} className="w-full">
              <Button variant="primary" size="md" className="w-full gap-2 shadow-glow-primary">
                <Lock className="w-4 h-4" />
                <span>Go to Admin Login</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="md"
              onClick={logout}
              className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border-rose-200 dark:border-rose-900/30"
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

  // 4. Authorized admin -> Render admin protected content
  return children ? children : <Outlet />;
};

export default AdminRoute;

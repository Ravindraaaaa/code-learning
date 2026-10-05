import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, LogOut, User as UserIcon } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants.js';
import { ROUTES } from '../../routes/paths.js';
import { useAuth } from '../../context/AuthContext.jsx';

export const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Foundation', path: ROUTES.HOME },
    { label: 'Dashboard', path: ROUTES.DASHBOARD },
    { label: 'Theme Preview', path: ROUTES.THEME_PREVIEW },
    { label: 'Admin', path: ROUTES.ADMIN },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-border-subtle bg-white/80 dark:bg-background/80 backdrop-blur-md transition-colors duration-fast">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500 flex items-center justify-center shadow-surface-sm">
            <Terminal className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-content-primary">
              {APP_CONFIG.name}
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono font-medium text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20">
              v{APP_CONFIG.version}
            </span>
          </div>
        </Link>

        {/* Navigation Routes */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-fast
                  ${
                    isActive
                      ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20'
                      : 'text-slate-600 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated'
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Route Links / Session Controls */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-surface-elevated border border-slate-200 dark:border-border-subtle text-xs">
                <UserIcon className="w-3.5 h-3.5 text-violet-500" />
                <span className="font-semibold text-slate-800 dark:text-content-primary">{user.name}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-violet-500/10 text-violet-600 dark:text-violet-400 font-mono font-bold uppercase">
                  {user.role}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 flex items-center gap-1 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-surface-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

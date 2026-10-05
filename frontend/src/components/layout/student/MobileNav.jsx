import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Terminal,
  X,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { STUDENT_NAV_GROUPS } from './studentNavConfig.js';
import { ROUTES } from '../../../routes/paths.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { APP_CONFIG } from '../../../utils/constants.js';

export const MobileNav = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true">
      {/* Backdrop Overlay with Blur */}
      <div
        className="fixed inset-0 bg-background-deep/80 backdrop-blur-sm transition-opacity duration-fast"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div
        className="relative w-full max-w-xs bg-white dark:bg-background border-r border-slate-200 dark:border-border-subtle shadow-surface-lg flex flex-col h-full z-10 animate-in slide-in-from-left duration-normal ease-smooth"
      >
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-border-subtle flex-shrink-0">
          <Link
            to={ROUTES.DASHBOARD}
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500 flex items-center justify-center shadow-surface-sm">
              <Terminal className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-content-primary">
                {APP_CONFIG.name}
              </span>
              <span className="block text-[10px] font-mono text-violet-600 dark:text-violet-400 uppercase font-semibold">
                Student Portal
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:text-content-subtle dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar">
          {STUDENT_NAV_GROUPS.map((group, groupIdx) => (
            <div key={group.group || groupIdx} className="space-y-1">
              <div className="px-3 pb-1 text-[11px] font-mono font-semibold tracking-wider text-slate-400 dark:text-content-subtle uppercase">
                {group.group}
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== ROUTES.DASHBOARD && location.pathname.startsWith(`${item.path}/`));

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium
                      transition-all duration-fast
                      ${
                        isActive
                          ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30 font-semibold shadow-surface-sm'
                          : 'text-slate-600 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated border border-transparent'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        w-4 h-4 flex-shrink-0
                        ${isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-content-muted'}
                      `}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Drawer Footer User Profile & Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-border-subtle bg-slate-50/70 dark:bg-surface/50 flex-shrink-0 space-y-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-surface-elevated border border-slate-200 dark:border-border-subtle shadow-surface-sm">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-surface-sm">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-content-primary truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-content-muted truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Link
                  to={ROUTES.HOME}
                  onClick={onClose}
                  className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary transition-colors"
                >
                  <span>Platform Home</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    logout();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold shadow-surface-sm"
            >
              Sign In to Portal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

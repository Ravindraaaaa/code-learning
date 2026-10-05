import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Terminal,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { STUDENT_NAV_GROUPS } from './studentNavConfig.js';
import { ROUTES } from '../../../routes/paths.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { APP_CONFIG } from '../../../utils/constants.js';

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

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
    <aside
      className={`
        hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0 z-30
        bg-white dark:bg-background border-r border-slate-200 dark:border-border-subtle
        transition-all duration-normal ease-smooth
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
      aria-label="Student Application Sidebar"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-border-subtle">
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-3 overflow-hidden group"
          title={`${APP_CONFIG.name} Student Workspace`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500 flex items-center justify-center flex-shrink-0 shadow-surface-sm group-hover:shadow-glow-primary transition-all duration-fast">
            <Terminal className="w-5 h-5 text-white stroke-[2.5]" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col transition-opacity duration-fast">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-content-primary truncate">
                {APP_CONFIG.name}
              </span>
              <span className="text-[10px] font-mono font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                Student Portal
              </span>
            </div>
          )}
        </Link>

        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-content-subtle dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {STUDENT_NAV_GROUPS.map((group, groupIdx) => (
          <div key={group.group || groupIdx} className="space-y-1">
            {/* Group Label (only in expanded mode) */}
            {!isCollapsed ? (
              <div className="px-3 pb-1.5 text-[11px] font-mono font-semibold tracking-wider text-slate-400 dark:text-content-subtle uppercase">
                {group.group}
              </div>
            ) : (
              <div className="my-2 border-t border-slate-200 dark:border-border-divider" />
            )}

            {/* Navigation Items */}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== ROUTES.DASHBOARD && location.pathname.startsWith(`${item.path}/`));

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  title={isCollapsed ? `${item.label} — ${item.description}` : item.description}
                  className={`
                    group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium
                    transition-all duration-fast outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                    ${
                      isActive
                        ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/25 font-semibold shadow-surface-sm'
                        : 'text-slate-600 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated border border-transparent'
                    }
                    ${isCollapsed ? 'justify-center px-0' : ''}
                  `}
                >
                  {/* Active accent pill on left border */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-violet-600 dark:bg-violet-400 shadow-glow-violet" />
                  )}

                  <Icon
                    className={`
                      w-4 h-4 flex-shrink-0 transition-transform duration-fast group-hover:scale-110
                      ${isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-content-muted group-hover:text-slate-900 dark:group-hover:text-content-primary'}
                    `}
                  />

                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Footer Profile & Actions */}
      <div className="p-3 border-t border-slate-200 dark:border-border-subtle bg-slate-50/70 dark:bg-surface/50">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-surface-elevated border border-slate-200 dark:border-border-subtle shadow-surface-sm">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-surface-sm">
                {getInitials(user?.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-content-primary truncate">
                  {user?.name || 'Student Account'}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-content-subtle truncate">
                    {user?.role || 'student'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <Link
                to={ROUTES.HOME}
                className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary transition-colors"
                title="Public Platform"
              >
                <span>Platform Home</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 transition-colors"
                title="Sign out of student account"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Link
              to={ROUTES.PROFILE}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-surface-sm hover:scale-105 transition-transform"
              title={user?.name ? `${user.name} (${user.email})` : 'Student Profile'}
            >
              {getInitials(user?.name)}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

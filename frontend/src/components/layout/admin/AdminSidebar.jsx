import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
  Sparkles,
  Terminal
} from 'lucide-react';
import { ADMIN_NAV_GROUPS } from './adminNavConfig.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Badge } from '../../common/Badge.jsx';

export const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Collapse state initialized from localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('codeforge_admin_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('codeforge_admin_sidebar_collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const isItemActive = (item) => {
    const current = location.pathname;
    if (item.path === '/admin/dashboard' && current === '/admin') return true;
    if (item.aliases && item.aliases.includes(current)) return true;
    return current === item.path || current.startsWith(`${item.path}/`);
  };

  return (
    <aside
      className={`hidden md:flex flex-col sticky top-0 h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-800 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-3 group overflow-hidden">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-violet-300 bg-clip-text text-transparent truncate">
                CodeForge
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-violet-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Admin Portal
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={toggleCollapse}
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700/60"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections Viewport */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 hover:scrollbar-thumb-slate-700">
        {ADMIN_NAV_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!isCollapsed ? (
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                {group.group}
              </h3>
            ) : (
              <div className="h-px bg-slate-800/60 my-2 mx-2" />
            )}

            {group.items.map((item) => {
              const active = isItemActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    active
                      ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-300 border border-violet-500/30 shadow-sm shadow-violet-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Left glowing active line indicator */}
                  {active && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-r-full shadow-glow-violet" />
                  )}

                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      active ? 'text-violet-400' : 'text-slate-400 group-hover:text-violet-300'
                    }`}
                  />

                  {!isCollapsed && (
                    <div className="flex items-center justify-between w-full min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 shrink-0">
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

      {/* Admin User Control Footer */}
      <div className="p-3 border-t border-slate-800 shrink-0 bg-slate-900/60">
        {!isCollapsed ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md shadow-violet-500/20">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] font-mono text-violet-400 font-medium">
                  {user?.role || 'admin'}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
};

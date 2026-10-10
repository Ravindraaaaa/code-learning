import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Shield, LogOut } from 'lucide-react';
import { ADMIN_NAV_GROUPS } from './adminNavConfig.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Badge } from '../../common/Badge.jsx';

export const AdminMobileNav = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Close drawer on location path changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isItemActive = (item) => {
    const current = location.pathname;
    if (item.path === '/admin/dashboard' && current === '/admin') return true;
    if (item.aliases && item.aliases.includes(current)) return true;
    return current === item.path || current.startsWith(`${item.path}/`);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer content panel */}
      <div className="relative w-4/5 max-w-xs bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-2xl z-10 animate-slide-in-left">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-100 text-sm">CodeForge</span>
              <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">Admin Portal</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 15 Admin Sections Scroll Viewport */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {ADMIN_NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                {group.group}
              </h3>

              {group.items.map((item) => {
                const active = isItemActive(item);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-violet-400' : 'text-slate-400'}`} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 shrink-0">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-200 truncate">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] font-mono text-violet-400">admin</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

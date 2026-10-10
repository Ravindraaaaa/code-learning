import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Shield,
  Search,
  LogOut,
  ChevronRight,
  Activity,
  Bot
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { StatusIndicator } from '../../common/StatusIndicator.jsx';
import { ALL_ADMIN_NAV_ITEMS } from './adminNavConfig.js';
import { Badge } from '../../common/Badge.jsx';

export const AdminTopbar = ({ onOpenMobileNav }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Determine current active section title and description
  const activeNavItem = ALL_ADMIN_NAV_ITEMS.find((item) => {
    const current = location.pathname;
    if (item.path === '/admin/dashboard' && current === '/admin') return true;
    if (item.aliases && item.aliases.includes(current)) return true;
    return current === item.path || current.startsWith(`${item.path}/`);
  });

  const sectionLabel = activeNavItem ? activeNavItem.label : 'Administrator Workspace';

  return (
    <header className="sticky top-0 z-20 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
      {/* Left: Mobile Drawer Trigger & Breadcrumb Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
          <span className="text-slate-400 hidden sm:inline-flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-violet-400" /> Admin
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
          <span className="text-slate-100 font-bold tracking-tight text-base sm:text-lg">
            {sectionLabel}
          </span>
          <Badge variant="violet" className="ml-2 text-[10px] hidden lg:inline-flex">
            15 Management Tools
          </Badge>
        </div>
      </div>

      {/* Right: Quick Search, Backend Status, & Admin Identity Pill */}
      <div className="flex items-center gap-3">
        {/* Command Search Bar Trigger */}
        <button
          onClick={() => alert('Command palette (⌘K) trigger. Search across students, topics, lessons, and tests.')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 rounded-xl text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-violet-400" />
          <span>Search Admin Console...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Live System Status Pill */}
        <div className="hidden lg:block">
          <StatusIndicator showDetails={false} />
        </div>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        {/* Admin Profile Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-800/80 border border-slate-700/60 rounded-xl">
            <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center text-white font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-xs font-bold text-slate-200 leading-tight truncate max-w-[120px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[9px] font-mono text-violet-400 leading-tight uppercase font-semibold">
                Super Admin
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

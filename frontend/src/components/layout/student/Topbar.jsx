import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Sparkles,
  Bell,
  LogOut,
  ChevronRight,
  User as UserIcon,
  Code2,
} from 'lucide-react';
import { ALL_STUDENT_NAV_ITEMS } from './studentNavConfig.js';
import { ROUTES } from '../../../routes/paths.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { StatusIndicator } from '../../common/StatusIndicator.jsx';
import { Badge } from '../../common/Badge.jsx';
import { LanguageSelectorModal } from '../../language/LanguageSelectorModal.jsx';
import { getStudentLanguage } from '../../../services/api.js';

export const Topbar = ({ onOpenMobileNav }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isLangModalOpen, setIsLangModalOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    const loadStudentLanguage = async () => {
      try {
        const res = await getStudentLanguage();
        if (isMounted && res && res.success && res.data?.language) {
          setSelectedLanguage(res.data.language);
        }
      } catch {
        // Silent catch for topbar
      }
    };

    if (user) {
      loadStudentLanguage();
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Determine current active section from location
  const currentItem =
    ALL_STUDENT_NAV_ITEMS.find((item) => item.path === location.pathname) ||
    ALL_STUDENT_NAV_ITEMS.find(
      (item) => item.path !== ROUTES.DASHBOARD && location.pathname.startsWith(item.path)
    );

  const pageTitle = currentItem ? currentItem.label : 'Student Workspace';

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
    <header className="sticky top-0 z-20 h-16 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-border-subtle bg-white/85 dark:bg-background/85 backdrop-blur-md transition-colors duration-fast">
      {/* Left: Mobile Menu Toggle + Breadcrumbs / Section Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-content-muted dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated transition-colors"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          <Link
            to={ROUTES.DASHBOARD}
            className="hidden sm:inline-block text-slate-500 dark:text-content-muted hover:text-slate-900 dark:hover:text-content-primary transition-colors"
          >
            Portal
          </Link>
          <ChevronRight className="hidden sm:inline-block w-3.5 h-3.5 text-slate-400 dark:text-content-subtle" />
          <span className="font-semibold text-slate-900 dark:text-content-primary truncate text-sm">
            {pageTitle}
          </span>
          {currentItem?.badge && (
            <Badge variant="primary" size="sm" className="hidden sm:inline-flex ml-1.5">
              {currentItem.badge}
            </Badge>
          )}
        </nav>
      </div>

      {/* Center: Search / Command Palette Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-content-subtle pointer-events-none" />
          <input
            type="text"
            readOnly
            placeholder="Search problems, topics, algorithms..."
            className="w-full pl-9 pr-14 py-1.5 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border-subtle text-xs text-slate-800 dark:text-content-primary placeholder-slate-400 dark:placeholder-content-subtle focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer"
            onClick={() => {}}
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-surface-elevated border border-slate-200 dark:border-border-subtle text-slate-400 dark:text-content-subtle shadow-surface-sm">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Status Indicator, Quick Actions, Student Profile */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Live System Status */}
        <div className="hidden xl:flex items-center">
          <StatusIndicator status="healthy" size="sm" pulse label="Connected" />
        </div>

        {/* Primary Language Selector Pill */}
        <button
          type="button"
          onClick={() => setIsLangModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-content-secondary hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated border border-slate-200 dark:border-border-subtle transition-all duration-fast"
          title="Select Primary Programming Language (C, C++, Java, Python, JavaScript)"
        >
          <Code2 className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-[11px] font-semibold">
            {selectedLanguage?.name || 'Select Lang'}
          </span>
          {selectedLanguage?.fileExtension && (
            <span className="text-[10px] font-mono text-content-muted hidden sm:inline">
              {selectedLanguage.fileExtension}
            </span>
          )}
        </button>

        {/* Quick Link: AI Assistant */}
        <Link
          to={ROUTES.AI_ASSISTANT}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-500/10 border border-violet-500/20 transition-all duration-fast"
          title="Open AI Code Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          <span className="hidden md:inline font-mono">AI Mentor</span>
        </Link>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-content-muted dark:hover:text-content-primary hover:bg-slate-100 dark:hover:bg-surface-elevated transition-colors"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-border-subtle" />

        {/* Student Profile Pill */}
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-surface-elevated border border-transparent hover:border-slate-200 dark:hover:border-border-subtle transition-all"
              title={`View ${user.name}'s Profile`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-surface-sm">
                {getInitials(user.name)}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 dark:text-content-primary leading-tight max-w-[120px] truncate">
                  {user.name}
                </span>
                <span className="text-[10px] font-mono text-violet-600 dark:text-violet-400 uppercase font-bold leading-tight">
                  {user.role}
                </span>
              </div>
            </Link>

            {/* Direct Logout Action */}
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:text-content-subtle dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white shadow-surface-sm transition-all"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        )}
      </div>

      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLanguageSlug={selectedLanguage?.slug}
        onLanguageSelected={(slug, lang) => {
          setSelectedLanguage(lang);
        }}
      />
    </header>
  );
};

export default Topbar;

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiTerminal,
  FiHome,
  FiBookOpen,
  FiCode,
  FiInfo,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiArrowRight,
  FiShield,
} from 'react-icons/fi';
import { APP_CONFIG } from '../../utils/constants.js';
import { ROUTES } from '../../routes/paths.js';
import { useAuth } from '../../context/AuthContext.jsx';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', sectionId: 'home', to: '/', hash: '#home', icon: FiHome },
    { label: 'Learn', sectionId: 'learn', to: '/#learn', hash: '#learn', icon: FiBookOpen },
    { label: 'Practice', sectionId: 'practice', to: '/#practice', hash: '#practice', icon: FiCode },
    { label: 'Debug Arena', sectionId: 'debug-arena', to: '/#debug-arena', hash: '#debug-arena', icon: FiTerminal },
    { label: 'About', sectionId: 'about', to: '/#about', hash: '#about', icon: FiInfo },
  ];

  // Helper to scroll smoothly to a given section on Home Page
  const scrollToSection = useCallback((sectionId, smooth = true) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      setActiveSection('home');
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      setActiveSection(sectionId);
    }
  }, []);

  // Handle navbar link click
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      // Already on home page: smooth scroll to section
      scrollToSection(link.sectionId, true);
      const newHash = link.sectionId === 'home' ? '' : `#${link.sectionId}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash || window.location.pathname);
      }
    } else {
      // On another route (e.g. /login or /register): navigate to / with hash
      navigate(link.to);
    }
  };

  // Scroll to section when URL hash changes, on direct URL access or page refresh
  useEffect(() => {
    if (location.pathname === '/') {
      const hash = location.hash.replace('#', '');
      if (hash) {
        const timer = setTimeout(() => {
          scrollToSection(hash, true);
        }, 80);
        return () => clearTimeout(timer);
      } else {
        if (window.scrollY < 120) {
          setActiveSection('home');
        }
      }
    } else {
      // When on a page other than Home, clear activeSection so Home is not shown as active
      setActiveSection('');
    }
  }, [location.pathname, location.hash, scrollToSection]);

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/') {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          scrollToSection(hash, true);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        }
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToSection]);

  // Scroll spy: observe scroll position on Home Page and update active section
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const sectionIds = ['home', 'learn', 'practice', 'debug-arena', 'about'];

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      const scrollThreshold = window.scrollY + 180;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollThreshold >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isLinkActive = (link) => {
    if (location.pathname === '/') {
      return activeSection === link.sectionId;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-[#faf8f5]/95 backdrop-blur-md transition-colors text-stone-800 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 rounded-xl"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              scrollToSection('home', true);
              window.history.pushState(null, '', '/');
            }
            setMobileMenuOpen(false);
          }}
          aria-label="CodeForge Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <FiTerminal className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-stone-900">
              {APP_CONFIG.name}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono font-medium text-violet-700 bg-violet-100/70 border border-violet-200/80 px-2 py-0.5 rounded-md">
              v{APP_CONFIG.version}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => handleNavClick(e, link)}
                className={`group relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 rounded-md ${
                  active
                    ? 'text-violet-700 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-violet-600 after:rounded-full'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-violet-600' : 'text-stone-400 group-hover:text-stone-600'
                  }`}
                />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5">
              <Link
                to={user.role === 'admin' ? ROUTES.ADMIN : ROUTES.DASHBOARD}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:border-violet-300 text-stone-800 text-sm font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
              >
                {user.role === 'admin' ? (
                  <FiShield className="w-4 h-4 text-amber-500" />
                ) : (
                  <FiUser className="w-4 h-4 text-violet-600" />
                )}
                <span>{user.name}</span>
                <span className="text-[11px] font-mono uppercase px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">
                  {user.role}
                </span>
              </Link>

              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30"
                title="Sign out"
                aria-label="Sign out"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={ROUTES.LOGIN}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                Sign In
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-sm active:scale-[0.99] flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/90 bg-[#faf8f5]/98 px-4 py-5 space-y-4 shadow-lg backdrop-blur-xl animate-fade-in text-stone-800">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-violet-100/70 text-violet-800 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-stone-400'}`} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={user.role === 'admin' ? ROUTES.ADMIN : ROUTES.DASHBOARD}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm shadow-sm"
                >
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200 font-semibold">
                    {user.role}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition-all"
                >
                  Create Student Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';
import { MobileNav } from './MobileNav.jsx';

/**
 * Student Application Layout
 * Dedicated shell for all 12 student learning, practice, and workspace areas.
 * Features:
 * - Desktop collapsible Sidebar with grouped navigation & active indicators
 * - Topbar with breadcrumb hierarchy, search trigger, and student profile pill
 * - Responsive mobile navigation drawer with backdrop blur
 * - Clean, scrollable main content area adhering to CodeForge theme tokens
 * - Strict adherence to "No fake statistics"
 */
export const StudentLayout = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('codeforge_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('codeforge_sidebar_collapsed', String(next));
      }
      return next;
    });
  };

  // Close mobile nav on resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-background text-slate-900 dark:text-content-primary selection:bg-violet-500 selection:text-white transition-colors duration-fast">
      {/* 1. Desktop Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* 2. Responsive Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* 3. Main Workspace Shell (Topbar + Content Area) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky Topbar */}
        <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />

        {/* Scrollable Main Content Area */}
        <main
          id="student-main-content"
          className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 focus:outline-none custom-scrollbar"
          tabIndex={-1}
        >
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;

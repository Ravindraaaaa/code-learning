import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { StudentLayout } from './student/StudentLayout.jsx';
import { ALL_STUDENT_NAV_ITEMS } from './student/studentNavConfig.js';

/**
 * Universal Layout Coordinator
 * Automatically delegates between the Public Platform shell and the dedicated
 * Student Application Layout based on active route hierarchy.
 */
export const Layout = ({ children }) => {
  const location = useLocation();

  // Inspect whether active path belongs to the 12 student application sections
  const isStudentRoute = ALL_STUDENT_NAV_ITEMS.some(
    (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
  );

  // If on any student application route, render the Student Application Layout
  if (isStudentRoute) {
    return <StudentLayout>{children}</StudentLayout>;
  }

  // Otherwise, render Public platform shell with sticky top navbar and footer
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background text-slate-900 dark:text-content-primary selection:bg-violet-500 selection:text-white transition-colors duration-fast">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

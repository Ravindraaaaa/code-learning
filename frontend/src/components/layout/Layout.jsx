import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { StudentLayout } from './student/StudentLayout.jsx';
import { AdminLayout } from './admin/AdminLayout.jsx';
import { ALL_STUDENT_NAV_ITEMS } from './student/studentNavConfig.js';
import { ALL_ADMIN_NAV_ITEMS } from './admin/adminNavConfig.js';

/**
 * Universal Layout Coordinator
 * Automatically delegates between Public Platform shell, Student Workspace,
 * and dedicated Admin Dashboard Workspace based on active route hierarchy.
 */
export const Layout = ({ children }) => {
  const location = useLocation();

  // Exclude public admin login page from admin layout
  const isAdminLogin = location.pathname === '/admin/login';

  // Inspect whether active path belongs to the 15 admin application sections or /admin root
  const isAdminRoute =
    !isAdminLogin &&
    (location.pathname === '/admin' ||
      location.pathname.startsWith('/admin/') ||
      ALL_ADMIN_NAV_ITEMS.some(
        (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
      ));

  // Inspect whether active path belongs to the 12 student application sections
  const isStudentRoute = ALL_STUDENT_NAV_ITEMS.some(
    (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
  );

  // Delegate to Admin Layout Workspace
  if (isAdminRoute) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // Delegate to Student Layout Workspace
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

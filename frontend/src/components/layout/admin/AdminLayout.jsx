import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar.jsx';
import { AdminTopbar } from './AdminTopbar.jsx';
import { AdminMobileNav } from './AdminMobileNav.jsx';

/**
 * Master Admin Application Workspace Layout
 * Coordinates the 15-section administrative sidebar, sticky topbar,
 * mobile drawer, and main content scroll viewport.
 */
export const AdminLayout = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleOpenMobileNav = () => setIsMobileNavOpen(true);
  const handleCloseMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className="min-h-screen flex bg-background text-content-primary selection:bg-violet-500 selection:text-white font-sans antialiased">
      {/* Sticky Desktop Admin Sidebar */}
      <AdminSidebar />

      {/* Off-canvas Mobile Admin Drawer */}
      <AdminMobileNav isOpen={isMobileNavOpen} onClose={handleCloseMobileNav} />

      {/* Main Administrative Workspace Shell */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Admin Top Header Bar */}
        <AdminTopbar onOpenMobileNav={handleOpenMobileNav} />

        {/* Scrollable Main Viewport Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import { APP_CONFIG } from '../../utils/constants.js';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-border-subtle bg-white dark:bg-background py-8 mt-auto transition-colors duration-fast">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-content-subtle">
        <p>
          &copy; {currentYear} {APP_CONFIG.name}. {APP_CONFIG.tagline}.
        </p>
        <p className="font-mono">
          React &bull; Tailwind CSS &bull; Node.js &bull; Express &bull; MongoDB
        </p>
      </div>
    </footer>
  );
};

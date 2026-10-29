import React from 'react';
import { Link } from 'react-router-dom';
import { FiTerminal } from 'react-icons/fi';
import { APP_CONFIG } from '../../utils/constants.js';
import { ROUTES } from '../../routes/paths.js';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface/40 text-slate-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 via-violet-600 to-secondary-500 flex items-center justify-center shadow-surface-sm">
                <FiTerminal className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {APP_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {APP_CONFIG.tagline}. A focused platform designed for mastering programming languages, algorithmic problem solving, and modern web engineering.
            </p>
          </div>

          {/* Curriculum Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Curriculum
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to={ROUTES.LEARN}
                  className="hover:text-white transition-colors"
                >
                  Learning Tracks & Languages
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PRACTICE}
                  className="hover:text-white transition-colors"
                >
                  Algorithmic Practice Arena
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.DEBUG_ARENA}
                  className="hover:text-white transition-colors"
                >
                  Debug Arena Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Administration */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to={ROUTES.LOGIN}
                  className="hover:text-white transition-colors"
                >
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.REGISTER}
                  className="hover:text-white transition-colors"
                >
                  Create Student Account
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.ADMIN_LOGIN}
                  className="hover:text-white transition-colors"
                >
                  Administrator Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {APP_CONFIG.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-slate-500">
            Node.js &bull; Express &bull; MongoDB &bull; React 18 &bull; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

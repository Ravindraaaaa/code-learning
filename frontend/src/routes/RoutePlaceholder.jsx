import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { ROUTES } from './paths.js';

export const RoutePlaceholder = ({
  title,
  path,
  type = 'Public',
  icon: Icon = Compass,
  description = 'Route structure registered successfully. Page UI and functional logic are scheduled for upcoming milestone implementation.',
}) => {
  const getBadgeVariant = () => {
    switch (type) {
      case 'Protected':
        return 'primary';
      case 'Admin':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4">
      <Card className="text-center p-8 sm:p-12 space-y-6 shadow-surface-lg border-slate-200 dark:border-border-subtle">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600/10 via-violet-600/10 to-secondary-600/10 border border-violet-500/25 flex items-center justify-center mx-auto shadow-surface-sm text-violet-600 dark:text-violet-400">
          <Icon className="w-8 h-8 stroke-[1.75]" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge variant={getBadgeVariant()}>{type} Workspace</Badge>
            <span className="text-xs font-mono text-slate-400 dark:text-content-muted">
              {path}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-content-primary">
            {title}
          </h1>

          <p className="text-sm text-slate-500 dark:text-content-muted max-w-md mx-auto">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-border-subtle flex flex-wrap items-center justify-center gap-3">
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>

          <Link to={ROUTES.PRACTICE}>
            <Button variant="primary" size="sm">
              Explore Practice
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RoutePlaceholder;

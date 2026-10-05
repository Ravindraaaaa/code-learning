import React from 'react';
import { Terminal, Plus } from 'lucide-react';
import { Button } from './Button.jsx';

export const EmptyState = ({
  icon: Icon = Terminal,
  title = 'No submissions found',
  description = 'You have not submitted any solutions yet. Run test cases or submit your code to track progress.',
  actionLabel = 'Submit Code',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`
        w-full p-8 sm:p-12 rounded-2xl border border-dashed border-slate-300 dark:border-border-subtle
        bg-slate-50/50 dark:bg-surface/40 flex flex-col items-center justify-center text-center
        transition-all duration-fast ${className}
      `}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600/10 to-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-4 shadow-surface-sm">
        <Icon className="w-7 h-7 text-violet-500 dark:text-violet-400 stroke-[1.75]" />
      </div>

      <h4 className="text-base font-semibold text-slate-900 dark:text-content-primary mb-1.5 tracking-tight">
        {title}
      </h4>

      <p className="text-xs text-slate-500 dark:text-content-muted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onAction && (
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            className="shadow-glow-violet"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>{actionLabel}</span>
          </Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

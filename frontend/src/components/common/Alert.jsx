import React, { useState } from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

const ALERT_CONFIGS = {
  info: {
    icon: Info,
    containerClass: 'bg-secondary-50 dark:bg-secondary-950/40 border-secondary-200 dark:border-secondary-500/30 text-secondary-900 dark:text-secondary-200',
    iconClass: 'text-secondary-600 dark:text-secondary-400',
  },
  violet: {
    icon: Info,
    containerClass: 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-500/30 text-violet-900 dark:text-violet-200',
    iconClass: 'text-violet-600 dark:text-violet-400',
  },
  success: {
    icon: CheckCircle2,
    containerClass: 'bg-emerald-50 dark:bg-success-bg border-emerald-200 dark:border-success-border text-emerald-900 dark:text-success-light',
    iconClass: 'text-emerald-600 dark:text-success',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'bg-amber-50 dark:bg-warning-bg border-amber-200 dark:border-warning-border text-amber-900 dark:text-warning-light',
    iconClass: 'text-amber-600 dark:text-warning',
  },
  error: {
    icon: AlertCircle,
    containerClass: 'bg-rose-50 dark:bg-error-bg border-rose-200 dark:border-error-border text-rose-900 dark:text-error-light',
    iconClass: 'text-rose-600 dark:text-error',
  },
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const config = ALERT_CONFIGS[variant] || ALERT_CONFIGS.info;
  const Icon = config.icon;

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 flex items-start gap-3 transition-all duration-fast ${config.containerClass} ${className}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconClass}`} />

      <div className="flex-1 text-sm">
        {title && <h5 className="font-semibold mb-0.5">{title}</h5>}
        <div className="text-xs opacity-90 leading-relaxed">{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

import React from 'react';

const VARIANTS = {
  default: 'bg-surface-elevated text-content-secondary border-border-subtle',
  primary: 'bg-primary-muted text-primary-light border-primary/30',
  secondary: 'bg-secondary-muted text-secondary-light border-secondary/30',
  success: 'bg-success-bg text-success-light border-success-border',
  warning: 'bg-warning-bg text-warning-light border-warning-border',
  error: 'bg-error-bg text-error-light border-error-border',
  danger: 'bg-error-bg text-error-light border-error-border',
  info: 'bg-info-bg text-info-light border-info-border',
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClass = VARIANTS[variant] || VARIANTS.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-medium border ${variantClass} ${className}`}
    >
      {children}
    </span>
  );
};

import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-500 hover:to-violet-500 text-white font-medium focus:ring-primary-400 shadow-surface-sm hover:shadow-glow-primary',
  secondary: 'bg-violet-600 hover:bg-violet-500 text-white font-medium focus:ring-violet-400 shadow-surface-sm hover:shadow-glow-violet',
  blue: 'bg-secondary-600 hover:bg-secondary-500 text-white font-medium focus:ring-secondary-400 shadow-surface-sm hover:shadow-glow-blue',
  outline: 'bg-transparent hover:bg-violet-500/10 text-content-primary border border-border dark:border-border-subtle hover:border-violet-500/40 focus:ring-violet-400',
  ghost: 'bg-transparent hover:bg-surface-elevated text-content-muted hover:text-content-primary focus:ring-primary',
  danger: 'bg-error hover:bg-error-dark text-white font-medium focus:ring-error shadow-surface-sm hover:shadow-glow-error',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-fast ease-standard focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-deep disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
};

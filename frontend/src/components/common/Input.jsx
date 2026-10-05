import React from 'react';

export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  trailing,
  className = '',
  disabled = false,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-slate-700 dark:text-content-secondary"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 pointer-events-none text-slate-400 dark:text-content-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`
            w-full rounded-lg bg-white dark:bg-surface/90 border text-sm transition-all duration-fast
            text-slate-900 dark:text-content-primary placeholder-slate-400 dark:placeholder-content-subtle
            focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-9' : 'pl-3.5'}
            ${trailing ? 'pr-12' : 'pr-3.5'}
            py-2
            ${
              error
                ? 'border-error focus:ring-error/40'
                : 'border-slate-300 dark:border-border-subtle focus:ring-violet-500/40 dark:focus:ring-violet-500/50 focus:border-violet-500'
            }
            ${className}
          `}
          {...props}
        />

        {trailing && (
          <div className="absolute right-3 flex items-center text-xs font-mono text-slate-400 dark:text-content-muted">
            {trailing}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-error font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-content-muted">{helperText}</p>
      ) : null}
    </div>
  );
};

export const Textarea = ({
  label,
  error,
  helperText,
  className = '',
  disabled = false,
  id,
  rows = 3,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-medium text-slate-700 dark:text-content-secondary"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`
          w-full rounded-lg bg-white dark:bg-surface/90 border text-sm transition-all duration-fast font-mono
          text-slate-900 dark:text-content-primary placeholder-slate-400 dark:placeholder-content-subtle
          focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed
          px-3.5 py-2.5 resize-y
          ${
            error
              ? 'border-error focus:ring-error/40'
              : 'border-slate-300 dark:border-border-subtle focus:ring-violet-500/40 dark:focus:ring-violet-500/50 focus:border-violet-500'
          }
          ${className}
        `}
        {...props}
      />

      {error ? (
        <p className="text-xs text-error font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-content-muted">{helperText}</p>
      ) : null}
    </div>
  );
};

export const Select = ({
  label,
  options = [],
  error,
  className = '',
  disabled = false,
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-medium text-slate-700 dark:text-content-secondary"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        disabled={disabled}
        className={`
          w-full rounded-lg bg-white dark:bg-surface/90 border text-sm transition-all duration-fast
          text-slate-900 dark:text-content-primary focus:outline-none focus:ring-2 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed px-3.5 py-2
          ${
            error
              ? 'border-error focus:ring-error/40'
              : 'border-slate-300 dark:border-border-subtle focus:ring-violet-500/40 dark:focus:ring-violet-500/50'
          }
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white dark:bg-surface text-slate-900 dark:text-content-primary"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

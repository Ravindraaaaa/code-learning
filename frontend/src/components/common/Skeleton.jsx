import React from 'react';

export const Skeleton = ({ className = '', rounded = 'rounded-md', ...props }) => {
  return (
    <div
      className={`bg-slate-200 dark:bg-surface-elevated animate-pulse ${rounded} ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-border-subtle bg-white dark:bg-surface/80 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
      <div className="pt-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-pill" />
          <Skeleton className="h-4 w-12 rounded-pill" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
};

export const SkeletonCodeBlock = () => {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-border-subtle bg-slate-900/90 space-y-2.5 font-mono">
      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
        <Skeleton className="h-3 w-28 ml-2 bg-slate-800" />
      </div>
      <Skeleton className="h-3 w-3/4 bg-slate-800" />
      <Skeleton className="h-3 w-1/2 bg-slate-800" />
      <Skeleton className="h-3 w-5/6 bg-slate-800" />
      <Skeleton className="h-3 w-2/3 bg-slate-800" />
    </div>
  );
};

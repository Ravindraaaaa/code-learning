import React from 'react';

export const StatusIndicator = ({ status = 'unknown', label }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
      case 'healthy':
        return 'bg-success';
      case 'connecting':
        return 'bg-warning';
      case 'disconnected':
      case 'error':
        return 'bg-error';
      default:
        return 'bg-content-disabled';
    }
  };

  const getStatusText = () => {
    if (label) return label;
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-surface border border-border-subtle text-xs font-mono text-content-secondary shadow-surface-sm">
      <span className={`w-2 h-2 rounded-pill ${getStatusColor()} animate-pulse`} />
      <span>{getStatusText()}</span>
    </div>
  );
};

import React from 'react';
import { RefreshCw, Server, Database, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { StatusIndicator } from '../components/common/StatusIndicator.jsx';
import { useHealthCheck } from '../hooks/useHealthCheck.js';
import { APP_CONFIG } from '../utils/constants.js';

export const HomePage = () => {
  const { data, loading, error, refetch } = useHealthCheck();

  const getDatabaseStatus = () => {
    if (!data?.database?.status) return 'unknown';
    return data.database.status;
  };

  return (
    <div className="space-y-8">
      {/* Platform Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-b from-surface to-background-deep p-8 sm:p-12 shadow-surface-md">
        <div className="relative z-10 max-w-3xl space-y-4">
          <Badge variant="success">Foundation & Design System Ready</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-content-primary">
            {APP_CONFIG.name}
          </h1>
          <p className="text-lg text-content-muted">
            {APP_CONFIG.tagline}. Built with an atomic design system and clean modular architecture.
          </p>
        </div>
      </section>

      {/* Real-time System Connectivity Status */}
      <section>
        <Card>
          <CardHeader
            title="System & API Status"
            subtitle="Real-time connectivity between Frontend and Backend API"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={loading}
                className="gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {/* Frontend Status */}
            <div className="p-4 rounded-lg bg-background-deep/60 border border-border-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-content-muted font-medium">Frontend Client</span>
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator status="connected" label="Operational" />
              </div>
              <p className="text-xs text-content-subtle font-mono">React 18 &bull; Vite &bull; Tailwind CSS</p>
            </div>

            {/* Backend API Status */}
            <div className="p-4 rounded-lg bg-background-deep/60 border border-border-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-content-muted font-medium">Backend Service</span>
                <Server className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator
                  status={error ? 'error' : data ? 'healthy' : 'connecting'}
                  label={error ? 'Offline' : data ? 'Connected' : 'Connecting...'}
                />
              </div>
              <p className="text-xs text-content-subtle font-mono">
                {data?.system?.nodeVersion ? `Node ${data.system.nodeVersion} &bull; Express` : 'Port 5000'}
              </p>
            </div>

            {/* Database Status */}
            <div className="p-4 rounded-lg bg-background-deep/60 border border-border-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-content-muted font-medium">MongoDB Database</span>
                <Database className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator
                  status={getDatabaseStatus()}
                  label={getDatabaseStatus()}
                />
              </div>
              <p className="text-xs text-content-subtle font-mono">Mongoose Driver</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-error-bg border border-error-border flex items-center gap-3 text-xs text-error-light">
              <AlertCircle className="w-4 h-4 shrink-0 text-error" />
              <span>{error}. Ensure the backend server is running on port 5000.</span>
            </div>
          )}

          {data && (
            <div className="mt-4 p-4 rounded-lg bg-background-deep/80 border border-border-subtle text-xs font-mono text-content-secondary">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <CheckCircle2 className="w-4 h-4" />
                <span>Backend Health Response OK</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-content-muted">
                <div>Uptime: <span className="text-content-primary">{data.uptimeSeconds}s</span></div>
                <div>Memory: <span className="text-content-primary">{data.system?.memoryUsedMB} MB</span></div>
                <div>DB State: <span className="text-content-primary">{data.database?.status}</span></div>
                <div>Timestamp: <span className="text-content-primary">{new Date(data.timestamp).toLocaleTimeString()}</span></div>
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* Modular Architecture Layout Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            title="Design System & UI Tokens"
            subtitle="Reusable atomic tokens defined in Tailwind CSS"
          />
          <ul className="space-y-2 text-sm text-content-secondary font-mono text-xs">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-primary" />
              <span>Primary (Emerald #10b981) & Secondary (Cyan #06b6d4)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-primary" />
              <span>Background (Deep #060911, Default #0b0f19)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-primary" />
              <span>Surfaces (Card #111827, Panel #1e293b, Elevated #1a2436)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-primary" />
              <span>Content Typography & Muted Text (#f8fafc, #94a3b8)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-primary" />
              <span>Status Colors (Success, Warning, Error, Info)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-primary" />
              <span>Radius (xs to pill), Shadows, Spacing, Transitions</span>
            </li>
          </ul>
        </Card>

        <Card>
          <CardHeader
            title="Backend Foundation"
            subtitle="Layered Express.js modular architecture"
          />
          <ul className="space-y-2 text-sm text-content-secondary font-mono text-xs">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-secondary" />
              <span>src/config (Environment validation, DB connection)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-secondary" />
              <span>src/controllers & src/services (Separated logic)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-secondary" />
              <span>src/routes (Modular endpoint routing)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-secondary" />
              <span>src/middleware (Centralized error & 404 handling)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-secondary" />
              <span>src/validators & src/utils (Logger, API response format)</span>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

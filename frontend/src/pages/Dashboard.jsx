import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  BookOpen,
  CheckSquare,
  Clock,
  Code2,
  Compass,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Zap,
  ChevronRight,
  Sparkles,
  Calendar,
  Layers,
  Terminal,
  Activity,
  Award,
  Lock,
  UserX,
  Database,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getStudentDashboard } from '../services/api.js';
import { Card, CardHeader } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Skeleton } from '../components/common/Skeleton.jsx';
import { LanguageSelectorModal } from '../components/language/LanguageSelectorModal.jsx';
import { TrackSelectorModal } from '../components/track/TrackSelectorModal.jsx';
import { ROUTES } from '../routes/paths.js';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [errorStatus, setErrorStatus] = useState(null);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const fetchDashboard = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);
    setSyncError(null);

    try {
      const response = await getStudentDashboard();
      if (response && response.success && response.data) {
        setDashboardData(response.data);
        if (isSilent) {
          setSyncSuccessMessage('Dashboard metrics synchronized');
          setTimeout(() => {
            setSyncSuccessMessage(null);
          }, 3500);
        }
      } else {
        throw new Error(response?.message || 'Failed to retrieve dashboard metrics');
      }
    } catch (err) {
      const status = err.status || (err.message?.includes('401') ? 401 : err.message?.includes('404') ? 404 : err.message?.includes('503') ? 503 : 500);
      const message = err.message || 'Could not connect to database service. Please retry.';
      if (isSilent) {
        setSyncError(message);
      } else {
        setError(message);
        setErrorStatus(status);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Loading skeleton matching enhanced 7-section responsive layout
  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8 animate-pulse max-w-7xl mx-auto pb-12">
        {/* Header Skeleton */}
        <div className="rounded-2xl border border-border-subtle bg-surface/60 p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 sm:h-8 w-48 sm:w-64 rounded-lg" />
                <Skeleton className="h-4 w-72 sm:w-96 rounded-md" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24 rounded-xl" />
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Top KPI Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl sm:col-span-2 lg:col-span-1" />
        </div>

        {/* Two-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-72 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-72 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Differentiated error states (401, 404, 503, 500)
  if (error && !dashboardData) {
    if (errorStatus === 401) {
      return (
        <div className="max-w-xl mx-auto my-12 px-4">
          <Card className="border-amber-500/30 bg-surface/90 p-6 sm:p-8 text-center space-y-5 rounded-2xl shadow-surface-lg backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto text-amber-400 border border-amber-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-content-primary tracking-tight">
                Authentication Required
              </h2>
              <p className="text-xs sm:text-sm text-content-muted leading-relaxed max-w-md mx-auto">
                Your session has expired or is invalid. Please sign in again to access your student dashboard.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  logout?.();
                  navigate(ROUTES.LOGIN);
                }}
                className="w-full sm:w-auto"
              >
                <span>Sign In Again</span>
              </Button>
              <Button variant="outline" onClick={() => navigate(ROUTES.HOME)} className="w-full sm:w-auto">
                <span>Platform Home</span>
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    if (errorStatus === 404 || error.toLowerCase().includes('account not found') || error.toLowerCase().includes('not found')) {
      return (
        <div className="max-w-xl mx-auto my-12 px-4">
          <Card className="border-border-subtle bg-surface/90 p-6 sm:p-8 text-center space-y-5 rounded-2xl shadow-surface-lg backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto text-violet-400 border border-violet-500/20">
              <UserX className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-content-primary tracking-tight">
                Student Account Not Found
              </h2>
              <p className="text-xs sm:text-sm text-content-muted leading-relaxed max-w-md mx-auto">
                We could not find an active student record associated with this session. Please log in with a registered account or create a new student account.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  logout?.();
                  navigate(ROUTES.LOGIN);
                }}
                className="w-full sm:w-auto"
              >
                <span>Sign In</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  logout?.();
                  navigate(ROUTES.REGISTER);
                }}
                className="w-full sm:w-auto"
              >
                <span>Create Student Account</span>
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    if (errorStatus === 503 || error.toLowerCase().includes('database') || error.toLowerCase().includes('unavailable')) {
      return (
        <div className="max-w-xl mx-auto my-12 px-4">
          <Card className="border-error-border/60 bg-surface/90 p-6 sm:p-8 text-center space-y-5 rounded-2xl shadow-surface-lg backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-error-bg/40 flex items-center justify-center mx-auto text-error-light border border-error-border">
              <Database className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-content-primary tracking-tight">
                Database Service Unavailable
              </h2>
              <p className="text-xs sm:text-sm text-content-muted leading-relaxed max-w-md mx-auto">
                Unable to establish a connection to the database. Please verify your connection or retry in a moment.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="primary" onClick={() => fetchDashboard()} className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>Retry Connection</span>
              </Button>
              <Button variant="outline" onClick={() => navigate(ROUTES.PRACTICE)} className="w-full sm:w-auto">
                <span>Go to Practice Arena</span>
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-xl mx-auto my-12 px-4">
        <Card className="border-error-border/60 bg-surface/90 p-6 sm:p-8 text-center space-y-5 rounded-2xl shadow-surface-lg backdrop-blur-md">
          <div className="w-14 h-14 rounded-2xl bg-error-bg/40 flex items-center justify-center mx-auto text-error-light border border-error-border">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-content-primary tracking-tight">
              Failed to Load Student Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-content-muted leading-relaxed max-w-md mx-auto">
              {error}
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="primary" onClick={() => fetchDashboard()} className="w-full sm:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Retry Connection</span>
            </Button>
            <Button variant="outline" onClick={() => navigate(ROUTES.PRACTICE)} className="w-full sm:w-auto">
              <span>Go to Practice Arena</span>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const {
    student,
    roadmap,
    learningProgress,
    streak,
    skills,
    testPerformance,
    recentActivity,
    recommendations,
  } = dashboardData || {};

  const studentName = student?.name || user?.name || 'Student';
  const studentEmail = student?.email || user?.email || '';
  const studentInitials = studentName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'ST';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          1. Header Welcome Banner
         ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-surface/95 via-surface/85 to-surface-elevated/75 p-5 sm:p-6 lg:p-7 shadow-surface-md backdrop-blur-md transition-all">
        {/* Subtle decorative purple glow background accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 -bottom-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            {/* Student Avatar Initials */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-violet-600 text-white font-bold text-lg sm:text-xl flex items-center justify-center shadow-glow-violet ring-2 ring-violet-500/20 shrink-0 select-none">
              {studentInitials}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-content-primary">
                  Welcome back, {studentName}
                </h1>
                <Badge variant="primary" className="text-[11px] uppercase font-mono tracking-wider font-semibold">
                  {student?.role || 'student'}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-muted">
                {studentEmail && (
                  <span className="font-mono text-content-secondary/80 hidden sm:inline">
                    {studentEmail}
                  </span>
                )}
                {studentEmail && <span className="hidden sm:inline text-border">•</span>}
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform Metrics
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0">
            {/* Action 1: AI Mentor Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(ROUTES.AI_ASSISTANT)}
              className="text-xs text-violet-300 hover:text-white bg-violet-500/10 hover:bg-violet-500/20 border-violet-500/30 hover:border-violet-500/60 rounded-xl py-2 px-3.5 shadow-surface-sm flex items-center gap-1.5 transition-all"
              title="Open CodeForge AI Mentor for coding assistance and concept explanations"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>AI Mentor</span>
            </Button>

            {/* Action 2: Sync Data Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchDashboard(true)}
              disabled={isRefreshing}
              className="text-xs text-content-secondary hover:text-content-primary bg-surface/60 hover:bg-surface-elevated/80 border-border-subtle rounded-xl py-2 px-3.5 shadow-surface-sm flex items-center gap-1.5 transition-all"
              aria-label="Synchronize dashboard metrics"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Data'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Sync Failure Error Notice (Never hides API errors) */}
      {syncError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start justify-between gap-3 animate-fade-in shadow-surface-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>Sync failed: {syncError}</span>
          </div>
          <button
            type="button"
            onClick={() => setSyncError(null)}
            className="text-xs text-rose-300 hover:text-white underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Sync Success Feedback Notice */}
      {syncSuccessMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in shadow-surface-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* =========================================================================
          2. Top Metric KPI Cards (Equal-Height, High-Readability 3-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Metric 1: Active Streak */}
        <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-border-subtle bg-surface/85 p-5 sm:p-6 shadow-surface-md backdrop-blur-sm transition-all duration-normal hover:border-violet-500/40 hover:shadow-surface-lg hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-xs">
                  <Flame className="w-5 h-5 text-amber-500 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                    Active Streak
                  </p>
                  <span className="text-[11px] text-content-muted">Consecutive days</span>
                </div>
              </div>
              <Badge
                variant={streak?.currentStreak > 0 ? 'warning' : 'default'}
                className="text-[11px] font-medium"
              >
                {streak?.currentStreak > 0 ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight font-mono">
                {streak?.currentStreak || 0}
              </span>
              <span className="text-sm font-medium text-content-muted">days</span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-border-subtle/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-content-muted">
              <span>Best Streak:</span>
              <span className="text-content-secondary font-mono font-semibold">
                {streak?.longestStreak || 0}d
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-content-muted">
              <span>Streak Freezes:</span>
              <span className="text-content-secondary font-mono font-semibold">
                {streak?.freezeDaysAvailable || 0} available
              </span>
            </div>
            {streak?.currentStreak === 0 && (
              <p className="text-[11px] text-amber-400/80 italic pt-0.5">
                Solve a problem or lesson today to initiate streak.
              </p>
            )}
          </div>
        </div>

        {/* Metric 2: Learning Progress */}
        <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-border-subtle bg-surface/85 p-5 sm:p-6 shadow-surface-md backdrop-blur-sm transition-all duration-normal hover:border-violet-500/40 hover:shadow-surface-lg hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shadow-xs">
                  <BookOpen className="w-5 h-5 text-violet-400 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                    Learning Progress
                  </p>
                  <span className="text-[11px] text-content-muted">Curriculum topics</span>
                </div>
              </div>
              <Badge variant="primary" className="text-[11px] font-medium font-mono">
                {learningProgress?.topicsCompleted || 0} / {learningProgress?.totalTopics || 0}
              </Badge>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight font-mono">
                {learningProgress?.percentage || 0}%
              </span>
              <span className="text-xs font-medium text-content-muted">completed</span>
            </div>

            <div className="mt-3">
              <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border-subtle/80">
                <div
                  className="bg-gradient-to-r from-primary to-violet-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(learningProgress?.percentage || 0, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-border-subtle/80 flex items-center justify-between text-xs text-content-muted">
            <span className="text-content-muted">Last Completed:</span>
            <span className="text-content-secondary font-medium truncate max-w-[150px] text-right" title={learningProgress?.lastCompletedTopic || 'None'}>
              {learningProgress?.lastCompletedTopic || 'None'}
            </span>
          </div>
        </div>

        {/* Metric 3: Test Performance */}
        <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-border-subtle bg-surface/85 p-5 sm:p-6 shadow-surface-md backdrop-blur-sm transition-all duration-normal hover:border-violet-500/40 hover:shadow-surface-lg hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-xs">
                  <CheckSquare className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                    Test Performance
                  </p>
                  <span className="text-[11px] text-content-muted">Timed assessments</span>
                </div>
              </div>
              <Badge
                variant={testPerformance?.testsTaken > 0 ? 'success' : 'default'}
                className="text-[11px] font-medium"
              >
                {testPerformance?.testsTaken > 0 ? 'Calibrated' : 'Unassessed'}
              </Badge>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight font-mono">
                {testPerformance?.testsTaken || 0}
              </span>
              <span className="text-sm font-medium text-content-muted">evaluations</span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-border-subtle/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-content-muted">
              <span>Average Benchmark:</span>
              <span className="text-content-secondary font-mono font-semibold">
                {testPerformance?.averageScore || 0}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-content-muted">
              <span>Highest Score:</span>
              <span className="text-content-secondary font-mono font-semibold">
                {testPerformance?.highestScore || 0}%
              </span>
            </div>
            {testPerformance?.testsTaken === 0 && (
              <p className="text-[11px] text-content-muted italic pt-0.5">
                No assessments on record yet. Complete a timed challenge.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. Main Dashboard Sections (Two Columns: 8 cols Left / 4 cols Right)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* =======================================================================
            Left Column (8 cols): Roadmap, Runtime, Skills, Assessment History
           ======================================================================= */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Section 1: Current Roadmap */}
          <Card className="rounded-2xl border-border-subtle bg-surface/85 p-5 sm:p-6 lg:p-7 shadow-surface-md">
            <CardHeader
              title="Current Roadmap"
              subtitle="Enrolled algorithmic track and structured curriculum trajectory"
              action={
                roadmap ? (
                  <div className="flex items-center gap-2">
                    {/* Action: Switch / Change Track */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsTrackModalOpen(true)}
                      className="text-xs text-content-muted hover:text-content-primary"
                    >
                      <span>Switch Track</span>
                    </Button>
                    {/* Action: Track View */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(ROUTES.LEARN)}
                      className="text-xs"
                    >
                      <span>Track View</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-violet-400" />
                    </Button>
                  </div>
                ) : (
                  /* Action: Choose Track (When not enrolled) */
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTrackModalOpen(true)}
                    className="text-xs text-violet-300 border-violet-500/30 hover:border-violet-500/60"
                  >
                    <Compass className="w-3.5 h-3.5 mr-1.5 text-violet-400" />
                    <span>Choose Track</span>
                  </Button>
                )
              }
            />

            {roadmap ? (
              <div className="space-y-4 pt-1">
                <div className="p-4 sm:p-5 rounded-xl border border-border-subtle bg-surface-elevated/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Compass className="w-4 h-4 text-violet-400" />
                      </div>
                      <h4 className="font-semibold text-base text-content-primary">
                        {roadmap.title}
                      </h4>
                      <Badge variant="primary" className="text-[10px] uppercase font-mono">
                        Enrolled
                      </Badge>
                    </div>
                    <p className="text-xs text-content-muted">
                      Active Stage:{' '}
                      <span className="text-content-secondary font-medium">
                        {roadmap.currentModule}
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right sm:border-l sm:border-border-subtle sm:pl-5 shrink-0">
                    <div className="text-xs text-content-muted">Modules Completed</div>
                    <div className="text-xl font-mono font-bold text-content-primary">
                      {roadmap.completedModules}{' '}
                      <span className="text-xs font-normal text-content-muted">
                        / {roadmap.totalModules}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-content-muted">
                    <span>Track Completion</span>
                    <span className="font-mono font-medium text-content-secondary">
                      {roadmap.totalModules > 0
                        ? Math.round((roadmap.completedModules / roadmap.totalModules) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-elevated rounded-full h-2.5 overflow-hidden border border-border-subtle">
                    <div
                      className="bg-gradient-to-r from-primary to-violet-500 h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          roadmap.totalModules > 0
                            ? Math.min(
                                Math.round((roadmap.completedModules / roadmap.totalModules) * 100),
                                100
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  {/* Action: Resume Learning */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(ROUTES.LEARN)}
                    className="w-full sm:w-auto"
                  >
                    <span>Resume {roadmap.currentModule}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>

                  {/* Action: Change Track */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTrackModalOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    <span>Change Track</span>
                  </Button>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Compass}
                title="No active roadmap enrolled"
                description="Enroll in a structured algorithmic curriculum to unlock step-by-step topic milestones, interactive tutorials, and code challenges."
                actionLabel="Browse Learning Tracks"
                onAction={() => setIsTrackModalOpen(true)}
              />
            )}
          </Card>

          {/* Section 2: Primary Programming Language */}
          <Card className="rounded-2xl border-border-subtle bg-surface/85 p-5 sm:p-6 lg:p-7 shadow-surface-md">
            <CardHeader
              title="Programming Environment"
              subtitle="Active language runtime for problem compilation, test cases, and execution"
              action={
                /* Action: Select / Switch Language */
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLangModalOpen(true)}
                  className="text-xs text-violet-300 border-violet-500/30 hover:border-violet-500/60"
                >
                  <Code2 className="w-3.5 h-3.5 mr-1.5 text-violet-400" />
                  <span>{student?.selectedLanguage ? 'Switch Language' : 'Select Language'}</span>
                </Button>
              }
            />

            {student?.selectedLanguage ? (
              <div className="p-4 sm:p-5 rounded-xl border border-border-subtle bg-surface-elevated/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-primary-500/10 border border-violet-500/30 flex items-center justify-center font-mono font-bold text-sm text-violet-300 shadow-inner shrink-0">
                    {student.selectedLanguage.toUpperCase()}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-base text-content-primary capitalize">
                        {student.selectedLanguage}
                      </h4>
                      <Badge variant="success" className="text-[10px]">
                        Active Primary
                      </Badge>
                    </div>
                    <p className="text-xs text-content-muted leading-relaxed">
                      Configured as your default execution environment for practice challenges and tests.
                    </p>
                  </div>
                </div>

                {/* Action: Change Runtime */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsLangModalOpen(true)}
                  className="self-start sm:self-center shrink-0 w-full sm:w-auto text-xs"
                >
                  <span>Change Runtime</span>
                </Button>
              </div>
            ) : (
              <EmptyState
                icon={Code2}
                title="No primary language selected"
                description="Select your preferred programming language from our supported runtimes: C, C++, Java, Python, or JavaScript."
                actionLabel="Choose Programming Language"
                onAction={() => setIsLangModalOpen(true)}
              />
            )}
          </Card>

          {/* Section 3: Skill Progress */}
          <Card className="rounded-2xl border-border-subtle bg-surface/85 p-5 sm:p-6 lg:p-7 shadow-surface-md">
            <CardHeader
              title="Skill Progress"
              subtitle="Calibrated competency levels across core computer science domains"
              action={
                skills && skills.length > 0 ? (
                  /* Action: Start Practice All */
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(ROUTES.PRACTICE)}
                    className="text-xs text-content-muted hover:text-content-primary"
                  >
                    <span>Practice All</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-violet-400" />
                  </Button>
                ) : null
              }
            />

            {skills && skills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name || index}
                    className="p-4 rounded-xl border border-border-subtle bg-surface-elevated/40 hover:border-violet-500/30 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <Code2 className="w-4 h-4 text-violet-400 shrink-0" />
                        <h4 className="font-semibold text-sm text-content-primary truncate">
                          {skill.name}
                        </h4>
                      </div>
                      <Badge variant="primary" className="text-[11px] shrink-0">
                        {skill.level}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-content-muted">
                        <span>Proficiency Score</span>
                        <span className="font-mono text-content-secondary font-medium">
                          {skill.score} / 100
                        </span>
                      </div>
                      <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden border border-border-subtle/80">
                        <div
                          className="bg-gradient-to-r from-primary to-violet-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(skill.score || 0, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs text-content-muted">
                      <span>
                        Solved: <strong className="text-content-secondary font-mono">{skill.problemsSolved}</strong>
                      </span>
                      {/* Action: Practice Individual Skill */}
                      <button
                        type="button"
                        onClick={() => navigate(ROUTES.PRACTICE)}
                        className="text-violet-400 hover:text-violet-300 font-medium transition-colors text-xs flex items-center gap-1"
                      >
                        <span>Practice</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Action: Start Practice Empty State */
              <EmptyState
                icon={Code2}
                title="Skills not yet assessed"
                description="Solve practice problems or complete assessments to record verified skill ratings across Data Structures, Algorithms, and System Design."
                actionLabel="Solve Practice Problems"
                onAction={() => navigate(ROUTES.PRACTICE)}
              />
            )}
          </Card>

          {/* Section 4: Assessment History */}
          <Card className="rounded-2xl border-border-subtle bg-surface/85 p-5 sm:p-6 lg:p-7 shadow-surface-md">
            <CardHeader
              title="Assessment History"
              subtitle="Timed evaluations, algorithmic benchmarks, and performance reports"
              action={
                testPerformance?.recentTests?.length > 0 ? (
                  /* Action: View All Tests */
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(ROUTES.TESTS)}
                    className="text-xs"
                  >
                    <span>View All Tests</span>
                  </Button>
                ) : null
              }
            />

            {testPerformance?.recentTests && testPerformance.recentTests.length > 0 ? (
              <div className="space-y-3 pt-1">
                {testPerformance.recentTests.map((test, idx) => (
                  <div
                    key={test.testId || idx}
                    className="p-3.5 sm:p-4 rounded-xl border border-border-subtle bg-surface-elevated/40 hover:border-violet-500/20 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                        <h4 className="font-semibold text-sm text-content-primary">
                          {test.title}
                        </h4>
                      </div>
                      <p className="text-xs text-content-muted flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-content-subtle" />
                        {test.date ? new Date(test.date).toLocaleDateString() : 'Recent'}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-mono font-bold text-content-primary">
                        {test.score} / {test.maxScore}
                      </div>
                      <div className="text-[11px] text-content-muted font-mono">
                        {test.maxScore > 0 ? Math.round((test.score / test.maxScore) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Action: Take Assessment Empty State */
              <EmptyState
                icon={CheckSquare}
                title="No tests completed"
                description="Take a timed assessment to measure your algorithmic problem solving speed, syntax accuracy, and edge-case handling."
                actionLabel="View Assessments"
                onAction={() => navigate(ROUTES.TESTS)}
              />
            )}
          </Card>
        </div>

        {/* =======================================================================
            Right Column (4 cols): AI Mentor, Recommendations & Recent Activity
           ======================================================================= */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-6">
          {/* Action 8: Dedicated AI Mentor Card */}
          <Card className="rounded-2xl border-border-subtle bg-gradient-to-br from-surface/90 via-surface/85 to-violet-950/20 p-5 sm:p-6 shadow-surface-md hover:border-violet-500/30 transition-all space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-content-primary">
                    AI Mentor
                  </h3>
                  <span className="text-[11px] text-content-muted">Interactive Code Guidance</span>
                </div>
              </div>
              <Badge variant="primary" className="text-[10px] font-mono">
                Online
              </Badge>
            </div>

            <p className="text-xs text-content-muted leading-relaxed">
              Need help debugging or understanding algorithmic concepts? Ask the AI Mentor for instant hints and code reviews.
            </p>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(ROUTES.AI_ASSISTANT)}
              className="w-full text-xs py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chat with AI Mentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Card>

          {/* Section 5: Recommendations */}
          <Card className="rounded-2xl border-border-subtle bg-surface/85 p-5 sm:p-6 shadow-surface-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-semibold text-content-primary tracking-tight">
                  Recommendations
                </h3>
              </div>
              <Badge variant="primary" className="text-[10px] font-mono">
                Context-Driven
              </Badge>
            </div>

            {recommendations && recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-xl border border-border-subtle bg-surface-elevated/40 hover:border-violet-500/30 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                        {rec.tag}
                      </span>
                      {rec.priority === 'high' && (
                        <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                          Priority
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-content-primary leading-snug">
                        {rec.title}
                      </h4>
                      <p className="text-[11px] text-content-muted mt-1 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>

                    <div className="pt-1">
                      {/* Action: Dynamic Recommendation Button (e.g. Start Practice, Take Assessment, Browse Tracks) */}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(rec.actionUrl)}
                        className="w-full text-xs py-1.5 rounded-lg"
                      >
                        <span>{rec.actionLabel}</span>
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-content-muted border border-border-subtle rounded-xl bg-surface-elevated/20 leading-relaxed">
                You are completely up to date with your curriculum.
              </div>
            )}
          </Card>

          {/* Section 6: Recent Activity */}
          <Card className="rounded-2xl border-border-subtle bg-surface/85 p-5 sm:p-6 shadow-surface-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-semibold text-content-primary tracking-tight">
                  Recent Activity
                </h3>
              </div>
            </div>

            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-2.5">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl border border-border-subtle bg-surface-elevated/40 hover:border-border-strong/60 transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-content-primary truncate">
                        {activity.title}
                      </span>
                      <span className="text-[10px] text-content-muted font-mono shrink-0">
                        {activity.timestamp
                          ? new Date(activity.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </span>
                    </div>
                    {activity.detail && (
                      <p className="text-xs text-content-muted truncate leading-relaxed">
                        {activity.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Clock}
                title="No recent activity"
                description="Problem submissions, topic completions, and test attempts will stream here as you practice."
                actionLabel="Start Practicing"
                onAction={() => navigate(ROUTES.PRACTICE)}
              />
            )}
          </Card>
        </div>
      </div>

      {/* Modals */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLanguageSlug={student?.selectedLanguage}
        onLanguageSelected={() => fetchDashboard(true)}
      />

      <TrackSelectorModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        currentTrackId={roadmap?.trackId}
        onTrackSelected={() => fetchDashboard(true)}
      />
    </div>
  );
};

export default Dashboard;

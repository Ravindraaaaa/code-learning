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
  Zap,
  Award,
  ChevronRight,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getStudentDashboard } from '../services/api.js';
import { Card, CardHeader } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Skeleton } from '../components/common/Skeleton.jsx';
import { LanguageSelectorModal } from '../components/language/LanguageSelectorModal.jsx';
import { ROUTES } from '../routes/paths.js';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const fetchDashboard = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);

    try {
      const response = await getStudentDashboard();
      if (response && response.success && response.data) {
        setDashboardData(response.data);
      } else {
        throw new Error(response.message || 'Failed to retrieve dashboard metrics');
      }
    } catch (err) {
      setError(err.message || 'Could not connect to database service. Please retry.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Loading skeleton matching 7 sections layout
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>

        {/* Top KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-36 rounded-xl" />
          <Skeleton className="h-36 rounded-xl" />
          <Skeleton className="h-36 rounded-xl" />
        </div>

        {/* Two-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <Skeleton className="h-96 rounded-xl" />
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (error && !dashboardData) {
    return (
      <div className="max-w-2xl mx-auto my-12">
        <Card className="border-error-border/60 bg-error-bg/10 p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-error-bg flex items-center justify-center mx-auto text-error-light border border-error-border">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-content-primary">Failed to Load Student Dashboard</h2>
          <p className="text-sm text-content-muted leading-relaxed">{error}</p>
          <div className="pt-2 flex justify-center gap-3">
            <Button variant="primary" onClick={() => fetchDashboard()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Connection
            </Button>
            <Button variant="outline" onClick={() => navigate(ROUTES.PRACTICE)}>
              Go to Practice Arena
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-content-primary">
              Welcome, {studentName}
            </h1>
            <Badge variant="primary" className="text-xs uppercase font-mono tracking-wider">
              {student?.role || 'student'}
            </Badge>
          </div>
          <p className="text-sm text-content-muted mt-1">
            Real-time algorithmic progress and authenticated platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDashboard(true)}
            disabled={isRefreshing}
            className="text-xs text-content-muted hover:text-content-primary"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Data'}</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Row: Streak, Learning Velocity, Test Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Streak */}
        <Card className="relative overflow-hidden border-border-subtle bg-surface/90 hover:border-violet-500/30 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Active Streak
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight font-mono">
                  {streak?.currentStreak || 0}
                </span>
                <span className="text-sm font-medium text-content-muted">days</span>
              </div>
            </div>
            <Badge
              variant={streak?.currentStreak > 0 ? 'success' : 'default'}
              className="text-xs"
            >
              {streak?.currentStreak > 0 ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-xs text-content-muted">
            <span>Best: <strong className="text-content-secondary font-mono">{streak?.longestStreak || 0}d</strong></span>
            <span>Freezes: <strong className="text-content-secondary font-mono">{streak?.freezeDaysAvailable || 0}</strong></span>
          </div>

          {streak?.currentStreak === 0 && (
            <p className="mt-2 text-[11px] text-content-muted italic">
              Solve a problem or complete a topic today to initiate your streak.
            </p>
          )}
        </Card>

        {/* Metric 2: Learning Progress Overview */}
        <Card className="relative overflow-hidden border-border-subtle bg-surface/90 hover:border-violet-500/30 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-primary" />
                Learning Progress
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight font-mono">
                  {learningProgress?.percentage || 0}%
                </span>
              </div>
            </div>
            <Badge variant="primary" className="text-xs">
              {learningProgress?.topicsCompleted || 0} / {learningProgress?.totalTopics || 0} Topics
            </Badge>
          </div>

          <div className="mt-4">
            <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border-subtle">
              <div
                className="bg-gradient-to-r from-primary to-violet-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(learningProgress?.percentage || 0, 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-content-muted">
            <span className="truncate">
              Last: <strong className="text-content-secondary">{learningProgress?.lastCompletedTopic || 'None'}</strong>
            </span>
          </div>
        </Card>

        {/* Metric 3: Test Performance Summary */}
        <Card className="relative overflow-hidden border-border-subtle bg-surface/90 hover:border-violet-500/30 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Test Performance
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight font-mono">
                  {testPerformance?.testsTaken || 0}
                </span>
                <span className="text-sm font-medium text-content-muted">assessments</span>
              </div>
            </div>
            <Badge
              variant={testPerformance?.testsTaken > 0 ? 'success' : 'default'}
              className="text-xs"
            >
              {testPerformance?.testsTaken > 0 ? 'Calibrated' : 'Unassessed'}
            </Badge>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-xs text-content-muted">
            <span>Avg: <strong className="text-content-secondary font-mono">{testPerformance?.averageScore || 0}%</strong></span>
            <span>Highest: <strong className="text-content-secondary font-mono">{testPerformance?.highestScore || 0}%</strong></span>
          </div>

          {testPerformance?.testsTaken === 0 && (
            <p className="mt-2 text-[11px] text-content-muted italic">
              No test attempts on record yet. Complete a timed benchmark.
            </p>
          )}
        </Card>
      </div>

      {/* 3. Main Dashboard Sections (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Current Roadmap, Skill Progress, Test Performance Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Current Roadmap */}
          <Card className="border-border-subtle bg-surface/80">
            <CardHeader
              title="Current Roadmap"
              subtitle="Enrolled algorithmic track and structured curriculum trajectory"
              action={
                roadmap ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(ROUTES.LEARN)}
                  >
                    <span>Track View</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                ) : null
              }
            />

            {roadmap ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl border border-border-subtle bg-surface-elevated/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-violet-400" />
                      <h4 className="font-semibold text-content-primary">{roadmap.title}</h4>
                      <Badge variant="primary">Enrolled</Badge>
                    </div>
                    <p className="text-xs text-content-muted">
                      Current: <span className="text-content-secondary font-medium">{roadmap.currentModule}</span>
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-border-subtle sm:pl-4">
                    <div className="text-xs text-content-muted">Modules Completed</div>
                    <div className="text-lg font-mono font-bold text-content-primary">
                      {roadmap.completedModules} / {roadmap.totalModules}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-content-muted mb-1.5">
                    <span>Track Completion</span>
                    <span className="font-mono">
                      {roadmap.totalModules > 0
                        ? Math.round((roadmap.completedModules / roadmap.totalModules) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-elevated rounded-full h-2.5 overflow-hidden border border-border-subtle">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all"
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

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(ROUTES.LEARN)}
                    className="w-full sm:w-auto"
                  >
                    <span>Resume {roadmap.currentModule}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Compass}
                title="No active roadmap enrolled"
                description="Enroll in a structured algorithmic curriculum to unlock step-by-step topic milestones, interactive tutorials, and code challenges."
                actionLabel="Browse Learning Tracks"
                onAction={() => navigate(ROUTES.LEARN)}
              />
            )}
          </Card>

          {/* Section: Primary Programming Language */}
          <Card className="border-border-subtle bg-surface/80">
            <CardHeader
              title="Programming Environment"
              subtitle="Active language runtime for problem compilation, test cases, and execution"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLangModalOpen(true)}
                >
                  <Code2 className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span>{student?.selectedLanguage ? 'Switch Language' : 'Select Language'}</span>
                </Button>
              }
            />

            {student?.selectedLanguage ? (
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-elevated/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center font-mono font-bold text-sm text-violet-400">
                    {student.selectedLanguage.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-content-primary capitalize">
                        {student.selectedLanguage}
                      </h4>
                      <Badge variant="success" className="text-[10px]">Active Primary</Badge>
                    </div>
                    <p className="text-xs text-content-muted mt-0.5">
                      Configured as your default execution environment for practice challenges and tests.
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsLangModalOpen(true)}
                  className="self-start sm:self-center"
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

          {/* Section 2: Skill Progress */}
          <Card className="border-border-subtle bg-surface/80">
            <CardHeader
              title="Skill Progress"
              subtitle="Calibrated competency levels across core computer science domains"
              action={
                skills && skills.length > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(ROUTES.PRACTICE)}
                  >
                    <span>Practice All</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : null
              }
            />

            {skills && skills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name || index}
                    className="p-4 rounded-xl border border-border-subtle bg-surface-elevated/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-violet-400" />
                        <h4 className="font-semibold text-sm text-content-primary">{skill.name}</h4>
                      </div>
                      <Badge variant="primary" className="text-[11px]">
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
                      <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden border border-border-subtle">
                        <div
                          className="bg-violet-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(skill.score || 0, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-content-muted">
                      <span>Problems Solved: <strong className="text-content-secondary font-mono">{skill.problemsSolved}</strong></span>
                      <button
                        onClick={() => navigate(ROUTES.PRACTICE)}
                        className="text-primary hover:text-primary-light transition-colors"
                      >
                        Practice &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Code2}
                title="Skills not yet assessed"
                description="Solve practice problems or complete assessments to record verified skill ratings across Data Structures, Algorithms, and System Design."
                actionLabel="Solve Practice Problems"
                onAction={() => navigate(ROUTES.PRACTICE)}
              />
            )}
          </Card>

          {/* Section 3: Test Performance */}
          <Card className="border-border-subtle bg-surface/80">
            <CardHeader
              title="Assessment History"
              subtitle="Timed evaluations, algorithmic benchmarks, and performance reports"
              action={
                testPerformance?.recentTests?.length > 0 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(ROUTES.TESTS)}
                  >
                    <span>View All Tests</span>
                  </Button>
                ) : null
              }
            />

            {testPerformance?.recentTests && testPerformance.recentTests.length > 0 ? (
              <div className="space-y-3 pt-2">
                {testPerformance.recentTests.map((test, idx) => (
                  <div
                    key={test.testId || idx}
                    className="p-3.5 rounded-xl border border-border-subtle bg-surface-elevated/40 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-semibold text-sm text-content-primary">{test.title}</h4>
                      </div>
                      <p className="text-xs text-content-muted flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {test.date ? new Date(test.date).toLocaleDateString() : 'Recent'}
                      </p>
                    </div>

                    <div className="text-right">
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

        {/* Right Column: Recommendations & Recent Activity */}
        <div className="lg:col-span-4 space-y-8">
          {/* Section 4: Recommendations */}
          <Card className="border-border-subtle bg-surface/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-semibold text-content-primary tracking-tight">
                  Recommendations
                </h3>
              </div>
              <Badge variant="primary" className="text-xs">Context-Driven</Badge>
            </div>

            {recommendations && recommendations.length > 0 ? (
              <div className="space-y-3.5">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-xl border border-border-subtle bg-surface-elevated/40 hover:border-violet-500/30 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                        {rec.tag}
                      </span>
                      {rec.priority === 'high' && (
                        <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                          Priority
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-content-primary">{rec.title}</h4>
                      <p className="text-[11px] text-content-muted mt-1 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>

                    <div className="pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(rec.actionUrl)}
                        className="w-full text-xs py-1.5"
                      >
                        <span>{rec.actionLabel}</span>
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-content-muted border border-border-subtle rounded-xl bg-surface-elevated/20">
                You are completely up to date with your curriculum.
              </div>
            )}
          </Card>

          {/* Section 5: Recent Activity */}
          <Card className="border-border-subtle bg-surface/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-content-primary tracking-tight">
                  Recent Activity
                </h3>
              </div>
            </div>

            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-border-subtle bg-surface-elevated/40 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-content-primary">
                        {activity.title}
                      </span>
                      <span className="text-[10px] text-content-muted">
                        {activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    {activity.detail && (
                      <p className="text-xs text-content-muted truncate">{activity.detail}</p>
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

      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLanguageSlug={student?.selectedLanguage}
        onLanguageSelected={() => fetchDashboard(true)}
      />
    </div>
  );
};

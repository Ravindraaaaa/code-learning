import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/paths.js';
import {
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertCircle,
  FileCode,
  Palette,
  Terminal,
  Layers,
  Server,
  Database,
  Check,
  ChevronRight,
  Shield,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getTracks, getStudentTrack, selectStudentTrack } from '../services/api.js';
import { Card, CardHeader } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { Skeleton } from '../components/common/Skeleton.jsx';
import { Alert } from '../components/common/Alert.jsx';

const MODULE_CONFIGS = {
  html: {
    icon: FileCode,
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    iconColor: 'text-orange-500',
    keySkills: ['Semantic HTML5', 'Form Validation & a11y', 'DOM Tree Architecture', 'Audio/Video Elements'],
  },
  css: {
    icon: Palette,
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    iconColor: 'text-blue-500',
    keySkills: ['Flexbox & Grid Layouts', 'Responsive Media Queries', 'Custom CSS Variables', 'Fluid Animations'],
  },
  javascript: {
    icon: Terminal,
    badgeColor: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    iconColor: 'text-amber-400',
    keySkills: ['ECMAScript ES6+', 'Closures & Scopes', 'Promises & Async/Await', 'Event Loop & Bubbling'],
  },
  react: {
    icon: Layers,
    badgeColor: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
    iconColor: 'text-cyan-400',
    keySkills: ['Component Architecture', 'Hooks (useState, useEffect)', 'Context API State', 'SPA Client Routing'],
  },
  nodejs: {
    icon: Server,
    badgeColor: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    iconColor: 'text-emerald-400',
    keySkills: ['Express.js REST APIs', 'Middleware Pipelines', 'JWT Authentication', 'Error Handling & Streams'],
  },
  mongodb: {
    icon: Database,
    badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    iconColor: 'text-green-500',
    keySkills: ['Document Modeling', 'Mongoose ODM Schemas', 'Indexing Strategies', 'Aggregation Pipelines'],
  },
};

export const Learn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [enrolledTrack, setEnrolledTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [tracksRes, studentTrackRes] = await Promise.all([
        getTracks(),
        getStudentTrack().catch(() => ({ success: false })),
      ]);

      if (tracksRes && tracksRes.success && Array.isArray(tracksRes.data)) {
        setTracks(tracksRes.data);
      } else {
        throw new Error('Failed to retrieve learning tracks');
      }

      if (studentTrackRes && studentTrackRes.success && studentTrackRes.data?.enrolled) {
        setEnrolledTrack(studentTrackRes.data);
      } else {
        setEnrolledTrack(null);
      }
    } catch (err) {
      setError(err.message || 'Could not load curriculum data. Please retry.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEnroll = async (trackSlug) => {
    setIsEnrolling(trackSlug);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await selectStudentTrack(trackSlug);
      if (response && response.success) {
        setSuccessMessage(`Successfully enrolled in ${response.data?.selectedTrack?.name || 'track'}!`);
        await loadData();
      } else {
        throw new Error(response.message || 'Failed to enroll in track');
      }
    } catch (err) {
      setError(err.message || 'Failed to select learning track');
    } finally {
      setIsEnrolling(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-pulse">
        <div className="space-y-3 pb-6 border-b border-border-subtle">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-44 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  const activeTrackSlug = enrolledTrack?.roadmap?.trackId;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-content-primary">
              Curriculum & Learning Tracks
            </h1>
            <Badge variant="primary" className="text-xs uppercase font-mono tracking-wider">
              Roadmaps
            </Badge>
          </div>
          <p className="text-sm text-content-muted mt-1">
            Structured computer science engineering trajectories designed for foundational mastery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="text-xs text-content-muted hover:text-content-primary"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            <span>Refresh Curriculum</span>
          </Button>
        </div>
      </div>

      {/* 2. Feedback Alerts */}
      {error && (
        <Alert variant="error" title="Curriculum Error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" title="Track Enrollment Confirmed" dismissible onDismiss={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {/* 3. Enrolled Active Roadmap Banner */}
      {enrolledTrack?.roadmap ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/70 via-surface-elevated to-slate-900 border border-violet-500/30 p-6 sm:p-8 shadow-surface-md">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="success" className="font-mono text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  CURRENT ACTIVE TRACK
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  {enrolledTrack.roadmap.title}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {enrolledTrack.roadmap.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Current Active Module: <strong className="text-white font-semibold">{enrolledTrack.roadmap.currentModule || 'HTML'}</strong>
              </p>

              {/* Progress Bar */}
              <div className="pt-2 max-w-md">
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Modules Completed</span>
                  <span>{enrolledTrack.roadmap.completedModules || 0} / {enrolledTrack.roadmap.totalModules || 6}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-primary to-violet-400 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        enrolledTrack.roadmap.totalModules > 0
                          ? Math.round(
                              (enrolledTrack.roadmap.completedModules / enrolledTrack.roadmap.totalModules) * 100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium">
                Active Trajectory
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-dashed border-border-subtle bg-surface-elevated/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-content-primary">No Active Track Enrolled</h3>
              <p className="text-xs text-content-muted">
                Select the Web Development Track below to initialize your sequential learning roadmap.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tracks List (Web Development Track Featured) */}
      <div className="space-y-6">
        {tracks.map((track) => {
          const isEnrolled = activeTrackSlug === track.slug;
          const isThisEnrolling = isEnrolling === track.slug;

          return (
            <div
              key={track.slug}
              className={`
                rounded-2xl border p-6 sm:p-8 space-y-6 transition-all duration-normal
                ${
                  isEnrolled
                    ? 'border-violet-500/60 bg-surface/90 shadow-glow-violet'
                    : 'border-border-subtle bg-surface/80 hover:border-violet-500/40'
                }
              `}
            >
              {/* Track Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      {track.category}
                    </span>
                    <span className="text-xs font-mono text-content-muted">
                      {track.level}
                    </span>
                    {isEnrolled && (
                      <Badge variant="success" className="text-xs">
                        Active Enrolled Track
                      </Badge>
                    )}
                  </div>

                  <h2 className="text-2xl font-extrabold text-content-primary tracking-tight">
                    {track.name} Track
                  </h2>

                  <p className="text-sm text-content-muted max-w-3xl leading-relaxed">
                    {track.description}
                  </p>

                  <div className="flex items-center gap-5 text-xs font-mono text-content-secondary pt-1">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-violet-400" />
                      {track.modules?.length || 6} Sequential Modules
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-400" />
                      ~{track.estimatedHours || 140} Learning Hours
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Button
                    variant={isEnrolled ? 'outline' : 'primary'}
                    size="md"
                    onClick={() => handleEnroll(track.slug)}
                    disabled={isThisEnrolling || isEnrolled}
                    className={`gap-2 ${isEnrolled ? 'border-violet-500/40 cursor-default' : ''}`}
                  >
                    {isThisEnrolling ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Enrolling...</span>
                      </>
                    ) : isEnrolled ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Enrolled in Track</span>
                      </>
                    ) : (
                      <>
                        <span>Enroll in Web Development</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Modules Pipeline (6 Core Technologies) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-content-muted flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span>Track Modules & Technologies ({track.modules?.length || 6})</span>
                  </h3>
                  <span className="text-xs font-mono text-content-muted">
                    Sequential Progression
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {track.modules?.map((mod) => {
                    const conf = MODULE_CONFIGS[mod.slug] || {
                      icon: Layers,
                      badgeColor: 'bg-surface-elevated text-content-secondary border-border-subtle',
                      iconColor: 'text-violet-400',
                      keySkills: [],
                    };
                    const Icon = conf.icon;
                    const isHtmlModule = mod.slug === 'html';
                    const isCssModule = mod.slug === 'css';
                    const isJsModule = mod.slug === 'javascript';
                    const isReactModule = mod.slug === 'react';
                    const isInteractiveModule = isHtmlModule || isCssModule;

                    return (
                      <div
                        key={mod.slug}
                        onClick={() => {
                          if (isHtmlModule) {
                            navigate(ROUTES.HTML_LESSON);
                          } else if (isCssModule) {
                            navigate(ROUTES.CSS_LESSON);
                          } else if (isJsModule) {
                            navigate(ROUTES.JAVASCRIPT_LESSON);
                          } else if (isReactModule) {
                            navigate(ROUTES.REACT_LESSON);
                          }
                        }}
                        className={`
                          p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group
                          ${
                            isHtmlModule
                              ? 'border-orange-500/40 bg-gradient-to-b from-surface-elevated/70 to-surface/90 hover:border-orange-500/80 hover:shadow-glow-orange cursor-pointer hover:-translate-y-0.5'
                              : isCssModule
                              ? 'border-blue-500/40 bg-gradient-to-b from-surface-elevated/70 to-surface/90 hover:border-blue-500/80 hover:shadow-glow-blue cursor-pointer hover:-translate-y-0.5'
                              : isJsModule
                              ? 'border-amber-500/40 bg-gradient-to-b from-surface-elevated/70 to-surface/90 hover:border-amber-500/80 cursor-pointer hover:-translate-y-0.5'
                              : isReactModule
                              ? 'border-cyan-500/40 bg-gradient-to-b from-surface-elevated/70 to-surface/90 hover:border-cyan-500/80 cursor-pointer hover:-translate-y-0.5'
                              : 'border-border-subtle bg-surface-elevated/40'
                          }
                        `}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${conf.badgeColor}`}
                              >
                                <Icon className={`w-5 h-5 ${conf.iconColor}`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-mono font-bold text-violet-400">
                                    MODULE {mod.order}
                                  </span>
                                  {isHtmlModule && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                      Active
                                    </span>
                                  )}
                                  {isCssModule && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                      Active
                                    </span>
                                  )}
                                  {isJsModule && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                      Active
                                    </span>
                                  )}
                                  {isReactModule && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-bold text-base text-content-primary">
                                  {mod.name}
                                </h4>
                              </div>
                            </div>

                            <span className="text-xs font-mono text-content-muted">
                              {mod.topicsCount} topics
                            </span>
                          </div>

                          <p className="text-xs text-content-muted leading-relaxed">
                            {mod.description}
                          </p>

                          {/* Key Skills */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-content-subtle font-semibold">
                              Key Concepts:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {conf.keySkills.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border-subtle text-content-secondary font-mono"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border-subtle/60 flex items-center justify-between text-xs font-mono">
                          {isHtmlModule ? (
                            <>
                              <span className="text-orange-400 font-semibold flex items-center gap-1">
                                <span>10 Core Topics</span>
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(ROUTES.HTML_LESSON);
                                }}
                                className="text-xs py-1.5 px-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xs"
                              >
                                <span>Open Lessons</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </>
                          ) : isCssModule ? (
                            <>
                              <span className="text-blue-400 font-semibold flex items-center gap-1">
                                <span>18 Core Topics</span>
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(ROUTES.CSS_LESSON);
                                }}
                                className="text-xs py-1.5 px-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xs"
                              >
                                <span>Open Lessons</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </>
                          ) : isJsModule ? (
                            <>
                              <span className="text-amber-400 font-semibold flex items-center gap-1">
                                <span>16 Core Topics</span>
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(ROUTES.JAVASCRIPT_LESSON);
                                }}
                                className="text-xs py-1.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-semibold shadow-xs"
                              >
                                <span>Open Lessons</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </>
                          ) : isReactModule ? (
                            <>
                              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                                <span>36 Core Topics + Capstone</span>
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(ROUTES.REACT_LESSON);
                                }}
                                className="text-xs py-1.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-semibold shadow-xs"
                              >
                                <span>Open Lessons</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <span className="text-content-muted">{mod.level}</span>
                              <span className="text-content-subtle font-mono">Upcoming in Track</span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Learn;

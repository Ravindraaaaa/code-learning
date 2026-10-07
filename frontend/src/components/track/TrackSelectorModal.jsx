import React, { useState, useEffect } from 'react';
import {
  Compass,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Layers,
  FileCode,
  Palette,
  Terminal,
  Server,
  Database,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Modal } from '../common/Modal.jsx';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';
import { Skeleton } from '../common/Skeleton.jsx';
import { getTracks, selectStudentTrack } from '../../services/api.js';

const MODULE_ICONS = {
  html: { icon: FileCode, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
  css: { icon: Palette, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
  javascript: { icon: Terminal, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  react: { icon: Layers, color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
  nodejs: { icon: Server, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  mongodb: { icon: Database, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' },
};

export const TrackSelectorModal = ({
  isOpen,
  onClose,
  currentTrackId,
  onTrackSelected,
}) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(null);
  const [error, setError] = useState(null);
  const [expandedTrack, setExpandedTrack] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchTracks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getTracks();
        if (response && response.success && Array.isArray(response.data)) {
          setTracks(response.data);
          if (response.data.length > 0) {
            setExpandedTrack(response.data[0].slug);
          }
        } else {
          throw new Error('Failed to load learning tracks');
        }
      } catch (err) {
        setError(err.message || 'Could not load tracks list. Please retry.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [isOpen]);

  const handleSelect = async (slug) => {
    setIsSelecting(slug);
    setError(null);
    try {
      const response = await selectStudentTrack(slug);
      if (response && response.success) {
        if (onTrackSelected) {
          onTrackSelected(slug, response.data);
        }
        onClose();
      } else {
        throw new Error(response.message || 'Failed to enroll in track');
      }
    } catch (err) {
      setError(err.message || 'Failed to update track enrollment');
    } finally {
      setIsSelecting(null);
    }
  };

  const toggleExpand = (slug) => {
    setExpandedTrack((prev) => (prev === slug ? null : slug));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Learning Tracks & Curriculum"
      description="Choose your primary learning track to establish a structured, module-by-module computer science curriculum."
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3.5 rounded-xl border border-error-border bg-error-bg text-error-light text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Unable to update track enrollment</p>
              <p className="mt-0.5 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        ) : (
          <div className="space-y-4">
            {tracks.map((track) => {
              const isEnrolled = currentTrackId === track.slug;
              const isThisSelecting = isSelecting === track.slug;
              const isExpanded = expandedTrack === track.slug;

              return (
                <div
                  key={track.slug}
                  className={`
                    p-5 rounded-2xl border transition-all duration-fast
                    ${
                      isEnrolled
                        ? 'border-violet-500/60 bg-violet-500/5 shadow-glow-violet'
                        : 'border-border-subtle bg-surface-elevated/40 hover:border-violet-500/30 hover:bg-surface-elevated/60'
                    }
                  `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-surface-sm">
                        <Compass className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-content-primary text-base">
                            {track.name}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-surface border border-border-subtle text-content-secondary">
                            {track.category}
                          </span>
                          {isEnrolled && (
                            <Badge variant="success" className="text-[10px] py-0 px-2">
                              Active Track
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-content-muted leading-relaxed max-w-xl">
                          {track.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-mono text-content-muted pt-1">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                            {track.modules?.length || 6} Modules
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                            ~{track.estimatedHours || 140} Hours
                          </span>
                          <span className="text-slate-400 dark:text-content-subtle">
                            {track.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 flex-shrink-0">
                      <Button
                        variant={isEnrolled ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleSelect(track.slug)}
                        disabled={isThisSelecting || isEnrolled}
                        className={isEnrolled ? 'cursor-default border-violet-500/40' : ''}
                      >
                        {isThisSelecting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            <span>Enrolling...</span>
                          </>
                        ) : isEnrolled ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                            <span>Enrolled</span>
                          </>
                        ) : (
                          <span>Enroll in Track</span>
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={() => toggleExpand(track.slug)}
                        className="text-xs text-content-muted hover:text-content-primary flex items-center gap-1 py-1 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Modules' : 'View 6 Modules'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Modules breakdown */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border-subtle/70 space-y-2.5">
                      <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-content-muted">
                        Track Curriculum (6 Core Modules)
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {track.modules?.map((mod) => {
                          const conf = MODULE_ICONS[mod.slug] || {
                            icon: Layers,
                            color: 'text-violet-400',
                            bg: 'bg-surface-elevated border-border-subtle',
                          };
                          const Icon = conf.icon;

                          return (
                            <div
                              key={mod.slug}
                              className="p-3 rounded-xl bg-surface-elevated/40 border border-border-subtle flex items-start gap-2.5 hover:border-violet-500/30 transition-all"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${conf.bg}`}
                              >
                                <Icon className={`w-4 h-4 ${conf.color}`} />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <h6 className="text-xs font-bold text-content-primary truncate">
                                    {mod.order}. {mod.name}
                                  </h6>
                                  <span className="text-[10px] font-mono text-content-muted">
                                    {mod.topicsCount} topics
                                  </span>
                                </div>
                                <p className="text-[11px] text-content-muted line-clamp-2 mt-0.5 leading-snug">
                                  {mod.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

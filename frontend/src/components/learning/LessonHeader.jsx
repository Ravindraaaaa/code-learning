import React from 'react';
import { ArrowLeft, Download, Printer, FileCode, Palette } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';

export const LessonHeader = ({
  moduleSlug,
  moduleTitle,
  trackName = 'Web Development Track',
  subtitle,
  progressPercent = 0,
  completedCount = 0,
  totalCount = 0,
  onNavigateBack,
  onDownloadPdf,
  onPrint,
}) => {
  const isHtml = moduleSlug === 'html';
  const Icon = isHtml ? FileCode : Palette;
  const accentBadge = isHtml
    ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
    : 'bg-blue-500/10 border-blue-500/20 text-blue-400';
  const iconColor = isHtml ? 'text-orange-500' : 'text-blue-500';
  const progressGradient = isHtml
    ? 'from-orange-500 to-amber-500'
    : 'from-blue-500 to-cyan-500';

  return (
    <div className="rounded-2xl border border-border-subtle bg-gradient-to-br from-surface/95 via-surface/85 to-surface-elevated/75 p-5 sm:p-6 shadow-surface-md backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateBack}
              className="text-xs text-content-muted hover:text-content-primary pl-0 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Curriculum Tracks</span>
            </Button>
            <span className="text-border-subtle">/</span>
            <Badge variant="primary" className="text-[11px] font-mono uppercase">
              {trackName}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${accentBadge}`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-content-primary tracking-tight">
                {moduleTitle}
              </h1>
              <p className="text-xs text-content-muted">
                {subtitle || `${totalCount} Comprehensive Topics • Structured Notes • Try It Yourself • Practice • Quizzes`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-border-subtle">
          <div className="space-y-1.5 min-w-[200px]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-content-muted">Module Mastery</span>
              <span className="text-content-primary font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border-subtle">
              <div
                className={`bg-gradient-to-r ${progressGradient} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-content-muted font-mono">
              {completedCount} of {totalCount} topics completed
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onDownloadPdf}
              className="text-xs flex items-center gap-1.5 border-violet-500/30 hover:border-violet-500/60 bg-violet-500/10 text-violet-300 hover:text-white"
              title="Download formatted multi-page PDF notes with code snippets and challenges"
            >
              <Download className="w-3.5 h-3.5 text-violet-400" />
              <span>Download Notes</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onPrint}
              className="text-xs hidden sm:flex items-center gap-1.5 text-content-secondary hover:text-content-primary"
              title="Print or Save as PDF using browser print layout"
            >
              <Printer className="w-3.5 h-3.5 text-content-muted" />
              <span>Print</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


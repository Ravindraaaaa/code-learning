import React from 'react';
import { Sparkles, Code2, Copy, Check, ShieldCheck, AlertCircle, Download } from 'lucide-react';
import { Card } from '../common/Card.jsx';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';

export const TopicNotesView = ({
  topic,
  totalTopicsCount,
  isCompleted,
  copiedCodeId,
  onCopyCode,
  onDownloadPdf,
  accentColor = 'orange',
}) => {
  if (!topic) return null;

  const topicBadgeColor =
    accentColor === 'blue'
      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      : 'bg-orange-500/10 text-orange-400 border-orange-500/20';

  return (
    <Card className="rounded-2xl border-border-subtle bg-surface/90 p-6 sm:p-8 shadow-surface-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-subtle">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${topicBadgeColor}`}>
              Topic {topic.order} of {totalTopicsCount}
            </span>
            <Badge variant="default" className="text-xs">
              {topic.difficulty}
            </Badge>
            {isCompleted ? (
              <Badge variant="success" className="text-xs flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Completed</span>
              </Badge>
            ) : (
              <Badge variant="warning" className="text-xs">
                In Progress
              </Badge>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight">
            {topic.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadPdf}
            className="text-xs text-violet-300 border-violet-500/30 hover:border-violet-500/60"
            title="Download readable PDF containing notes, syntax, and examples"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-violet-400" />
            <span>PDF Notes</span>
          </Button>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-xl bg-surface-elevated/40 border border-border-subtle text-xs sm:text-sm text-content-secondary leading-relaxed flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-content-primary block mb-0.5">Lesson Overview & Objectives:</strong>
          {topic.summary}
        </div>
      </div>

      {/* Structured Notes Sections */}
      {topic.notes && (
        <div className="space-y-6 pt-2">
          {/* 1. Core Concept */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <h3 className="text-base sm:text-lg font-bold text-content-primary">
                1. Core Concept
              </h3>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed pl-4 border-l-2 border-violet-500/30">
              {topic.notes.concept}
            </p>
          </div>

          {/* 2. Syntax Rules */}
          {topic.notes.syntax && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  <h3 className="text-base sm:text-lg font-bold text-content-primary">
                    2. Syntax Rules
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyCode(topic.notes.syntax, 'syntax')}
                  className="text-xs font-mono text-content-muted hover:text-content-primary flex items-center gap-1 transition-colors"
                >
                  {copiedCodeId === 'syntax' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-border-subtle/80 text-violet-300 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                <code>{topic.notes.syntax}</code>
              </pre>
            </div>
          )}

          {/* 3. Detailed Breakdown */}
          {topic.notes.explanation && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <h3 className="text-base sm:text-lg font-bold text-content-primary">
                  3. Detailed Breakdown
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated/30 border border-border-subtle space-y-2">
                {topic.notes.explanation.split('\n').map((line, lIdx) => (
                  <p key={lIdx} className="text-xs sm:text-sm text-content-muted leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 4. Complete Code Example */}
          {topic.notes.codeExample && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange-400" />
                  <h3 className="text-base sm:text-lg font-bold text-content-primary">
                    4. Complete Code Example
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyCode(topic.notes.codeExample, 'code-example')}
                  className="text-xs font-mono text-content-muted hover:text-content-primary flex items-center gap-1 transition-colors"
                >
                  {copiedCodeId === 'code-example' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-surface-elevated border border-border-subtle text-content-secondary font-mono text-xs overflow-x-auto leading-relaxed shadow-surface-sm">
                <code>{topic.notes.codeExample}</code>
              </pre>
            </div>
          )}

          {/* 5. Expected Output */}
          {topic.notes.expectedOutput && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-content-primary">
                  5. Expected Browser Output
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{topic.notes.expectedOutput}</span>
              </div>
            </div>
          )}

          {/* 6. Common Mistakes to Avoid */}
          {topic.notes.commonMistakes && topic.notes.commonMistakes.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <h3 className="text-base sm:text-lg font-bold text-content-primary">
                  6. Common Mistakes to Avoid
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {topic.notes.commonMistakes.map((item, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-xl bg-surface-elevated/40 border border-border-subtle space-y-1.5"
                  >
                    <div className="flex items-start gap-2 text-rose-300 font-semibold text-xs sm:text-sm">
                      <span className="text-rose-400 font-bold">Mistake:</span>
                      <span>{item.mistake}</span>
                    </div>
                    <div className="flex items-start gap-2 text-emerald-300 text-xs sm:text-sm">
                      <span className="text-emerald-400 font-bold">Correction:</span>
                      <span>{item.correction}</span>
                    </div>
                    <p className="text-xs text-content-muted leading-relaxed pl-4 border-l border-border-subtle pt-1">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};


import React, { useState, useEffect } from 'react';
import { Code2, HelpCircle, RefreshCw, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card.jsx';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';

export const PracticeChallengesView = ({
  practiceQuestions = [],
  isCurrentCompleted = false,
  isSubmitting = false,
  completionSuccess = false,
  onMarkCompleted,
  moduleSlug = 'html',
}) => {
  const [activeLevel, setActiveLevel] = useState('Easy');
  const [userCodes, setUserCodes] = useState({});
  const [validationResults, setValidationResults] = useState({});
  const [showSolutionMap, setShowSolutionMap] = useState({});

  useEffect(() => {
    setActiveLevel('Easy');
    const initialCodes = {};
    const initialVal = {};
    const initialSol = {};
    practiceQuestions.forEach((q) => {
      initialCodes[q.id] = q.starterCode || '';
      initialVal[q.id] = null;
      initialSol[q.id] = false;
    });
    setUserCodes(initialCodes);
    setValidationResults(initialVal);
    setShowSolutionMap(initialSol);
  }, [practiceQuestions]);

  if (!practiceQuestions || practiceQuestions.length === 0) return null;

  const currentQ =
    practiceQuestions.find((q) => q.level === activeLevel) || practiceQuestions[0];
  const currentCode =
    currentQ && userCodes[currentQ.id] !== undefined
      ? userCodes[currentQ.id]
      : currentQ?.starterCode || '';
  const currentValidation = currentQ ? validationResults[currentQ.id] : null;
  const currentShowSolution = currentQ ? !!showSolutionMap[currentQ.id] : false;

  const handleUpdateCode = (val) => {
    if (!currentQ) return;
    setUserCodes((prev) => ({ ...prev, [currentQ.id]: val }));
    if (validationResults[currentQ.id]) {
      setValidationResults((prev) => ({ ...prev, [currentQ.id]: null }));
    }
  };

  const handleReset = () => {
    if (!currentQ) return;
    handleUpdateCode(currentQ.starterCode || '');
  };

  const handleToggleSolution = () => {
    if (!currentQ) return;
    setShowSolutionMap((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleCheck = () => {
    if (!currentQ?.validate) return;
    const result = currentQ.validate(currentCode);
    setValidationResults((prev) => ({ ...prev, [currentQ.id]: result }));
    if (result.valid) {
      onMarkCompleted();
    }
  };

  const placeholderText =
    moduleSlug === 'css'
      ? '/* Write your CSS rules here */'
      : moduleSlug === 'javascript'
      ? '// Write your JavaScript solution here'
      : moduleSlug === 'react'
      ? '// Write your React component or hook here'
      : '<!-- Write your HTML solution here -->';

  return (
    <Card className="rounded-2xl border-border-subtle bg-surface/90 p-6 sm:p-8 shadow-surface-md space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold">
              Hands-on Practice
            </span>
            <h3 className="font-bold text-base sm:text-lg text-content-primary">
              Practice Challenges (3 Levels)
            </h3>
          </div>
        </div>

        {/* Difficulty Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-surface-elevated/70 p-1 rounded-xl border border-border-subtle">
          {practiceQuestions.map((q) => {
            const isSelected = q.level === activeLevel;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setActiveLevel(q.level)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-content-muted hover:text-content-primary'
                }`}
              >
                {q.level}
              </button>
            );
          })}
        </div>
      </div>

      {currentQ && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  currentQ.level === 'Easy'
                    ? 'default'
                    : currentQ.level === 'Medium'
                    ? 'primary'
                    : 'warning'
                }
                className="text-xs"
              >
                {currentQ.level}
              </Badge>
              <h4 className="font-bold text-base text-content-primary">
                {currentQ.title}
              </h4>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleSolution}
              className="text-xs text-content-muted hover:text-content-primary"
            >
              <HelpCircle className="w-3.5 h-3.5 mr-1" />
              <span>{currentShowSolution ? 'Hide Solution' : 'Show Solution'}</span>
            </Button>
          </div>

          {/* Challenge Prompt */}
          <div className="p-4 rounded-xl bg-surface-elevated/40 border border-border-subtle text-xs sm:text-sm text-content-secondary leading-relaxed space-y-2">
            <strong className="text-content-primary block">Instructions:</strong>
            <p>{currentQ.prompt}</p>

            {currentQ.requirements && (
              <div className="pt-2 border-t border-border-subtle/80 space-y-1">
                <span className="text-[11px] font-mono font-bold text-content-muted uppercase">
                  Requirements Checklist:
                </span>
                <ul className="space-y-1 pl-1">
                  {currentQ.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="text-xs text-content-muted flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Practice Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-content-muted">
              <span>Your Solution Code:</span>
              <button
                type="button"
                onClick={handleReset}
                className="hover:text-content-primary transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Starter</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={currentCode}
              onChange={(e) => handleUpdateCode(e.target.value)}
              placeholder={placeholderText}
              className="w-full rounded-xl bg-black/70 border border-border-subtle text-emerald-300 font-mono text-xs sm:text-sm p-4 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/60 leading-relaxed resize-y"
              spellCheck="false"
            />
          </div>

          {/* Validation Result Banner */}
          {currentValidation && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 transition-all ${
                currentValidation.valid
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {currentValidation.valid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Challenge Verified! All requirements satisfied.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Verification Incomplete: Please fix the following:</span>
                  </>
                )}
              </div>

              {!currentValidation.valid && (
                <ul className="list-disc list-inside space-y-1 text-xs text-rose-300 pl-2">
                  {currentValidation.errors.map((err, eIdx) => (
                    <li key={eIdx}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Solution Preview */}
          {currentShowSolution && (
            <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-violet-300 block">
                Verified Reference Solution:
              </span>
              <pre className="p-3 rounded-lg bg-black/60 border border-border-subtle text-violet-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{currentQ.solutionCode}</code>
              </pre>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              variant="primary"
              onClick={handleCheck}
              className="w-full sm:w-auto"
            >
              <Check className="w-4 h-4 mr-1.5" />
              <span>Check Solution</span>
            </Button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                variant={isCurrentCompleted ? 'outline' : 'secondary'}
                onClick={onMarkCompleted}
                disabled={isSubmitting}
                className={`w-full sm:w-auto ${
                  isCurrentCompleted ? 'border-emerald-500/40 text-emerald-300' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    <span>Recording...</span>
                  </>
                ) : isCurrentCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Topic Completed</span>
                  </>
                ) : (
                  <span>Mark Topic Completed</span>
                )}
              </Button>
            </div>
          </div>

          {completionSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Progress recorded! Topic completion saved to your student profile and dashboard metrics.
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};


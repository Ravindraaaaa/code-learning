import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card.jsx';
import { Button } from '../common/Button.jsx';

export const QuizCardView = ({ quizList = [] }) => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setAnswers({});
  }, [quizList]);

  if (!quizList || quizList.length === 0) return null;

  const answeredCount = Object.keys(answers).length;
  const correctCount = quizList.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (qId, optIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <Card className="rounded-2xl border-border-subtle bg-surface/90 p-6 sm:p-8 shadow-surface-md space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Knowledge Check
            </span>
            <h3 className="font-bold text-base sm:text-lg text-content-primary">
              Topic Quiz ({quizList.length} Questions)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-content-muted">
            Answered: {answeredCount} / {quizList.length}
          </span>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-content-muted hover:text-content-primary flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-6 pt-1">
        {quizList.map((q, qIdx) => {
          const selectedIdx = answers[q.id];
          const hasAnswered = selectedIdx !== undefined;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-xl bg-surface-elevated/40 border border-border-subtle space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 shrink-0">
                  Q{qIdx + 1}
                </span>
                <h4 className="font-semibold text-sm sm:text-base text-content-primary">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedIdx === optIdx;
                  const isCorrect = optIdx === q.correctIndex;

                  let optionClasses =
                    'border-border-subtle hover:bg-surface-elevated/80 text-content-secondary';

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionClasses =
                        'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionClasses =
                        'bg-rose-500/15 border-rose-500/50 text-rose-200 line-through';
                    } else {
                      optionClasses =
                        'opacity-50 border-border-subtle/50 text-content-subtle';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionClasses}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && (
                        <span className="shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isSelected ? (
                            <AlertCircle className="w-4 h-4 text-rose-400" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Feedback */}
              {hasAnswered && q.explanation && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed border ${
                    selectedIdx === q.correctIndex
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-surface-elevated border-border-subtle text-content-muted'
                  }`}
                >
                  <strong className="block mb-0.5 text-content-primary">
                    {selectedIdx === q.correctIndex ? 'Correct!' : 'Answer Explanation:'}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Score Summary Banner */}
      {answeredCount === quizList.length && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/15 to-orange-500/15 border border-violet-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-violet-300 font-bold block">
              Quiz Complete
            </span>
            <h4 className="font-bold text-base text-white">
              Score: {correctCount} of {quizList.length} Correct (
              {Math.round((correctCount / quizList.length) * 100)}%)
            </h4>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs text-violet-300 border-violet-500/40"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            <span>Retake Quiz</span>
          </Button>
        </div>
      )}
    </Card>
  );
};


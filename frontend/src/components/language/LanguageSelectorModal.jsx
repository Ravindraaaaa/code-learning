import React, { useState, useEffect } from 'react';
import {
  Code2,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Modal } from '../common/Modal.jsx';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';
import { Skeleton } from '../common/Skeleton.jsx';
import { getLanguages, selectStudentLanguage } from '../../services/api.js';

const LANGUAGE_BADGES = {
  c: { bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20', abbr: 'C' },
  cpp: { bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', abbr: 'C++' },
  java: { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', abbr: 'JAVA' },
  python: { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', abbr: 'PY' },
  javascript: { bg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', abbr: 'JS' },
};

export const LanguageSelectorModal = ({
  isOpen,
  onClose,
  currentLanguageSlug,
  onLanguageSelected,
}) => {
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(null);
  const [error, setError] = useState(null);
  const [expandedTemplate, setExpandedTemplate] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchLangs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getLanguages();
        if (response && response.success && Array.isArray(response.data)) {
          setLanguages(response.data);
        } else {
          throw new Error('Failed to load supported languages');
        }
      } catch (err) {
        setError(err.message || 'Could not load languages list. Please retry.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLangs();
  }, [isOpen]);

  const handleSelect = async (slug) => {
    setIsSelecting(slug);
    setError(null);
    try {
      const response = await selectStudentLanguage(slug);
      if (response && response.success) {
        if (onLanguageSelected) {
          onLanguageSelected(slug, response.data?.selectedLanguage);
        }
        onClose();
      } else {
        throw new Error(response.message || 'Failed to select language');
      }
    } catch (err) {
      setError(err.message || 'Failed to update preferred language');
    } finally {
      setIsSelecting(null);
    }
  };

  const toggleTemplate = (slug) => {
    setExpandedTemplate((prev) => (prev === slug ? null : slug));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Supported Programming Languages"
      description="Choose your primary language for algorithmic challenges, practice arena, and test evaluations."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3.5 rounded-xl border border-error-border bg-error-bg text-error-light text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Unable to update language preference</p>
              <p className="mt-0.5 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ) : (
          <div className="space-y-3">
            {languages.map((lang) => {
              const isSelected = currentLanguageSlug === lang.slug;
              const isThisSelecting = isSelecting === lang.slug;
              const badgeTheme = LANGUAGE_BADGES[lang.slug] || {
                bg: 'bg-surface-elevated text-content-secondary',
                abbr: lang.slug.toUpperCase(),
              };

              return (
                <div
                  key={lang.slug}
                  className={`
                    p-4 rounded-xl border transition-all duration-fast
                    ${
                      isSelected
                        ? 'border-violet-500/60 bg-violet-500/5 shadow-glow-violet'
                        : 'border-border-subtle bg-surface-elevated/40 hover:border-violet-500/30 hover:bg-surface-elevated/60'
                    }
                  `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${badgeTheme.bg}`}
                      >
                        {badgeTheme.abbr}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-content-primary text-sm">
                            {lang.name}
                          </h4>
                          <span className="text-[11px] font-mono text-content-muted">
                            {lang.version}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-content-muted">
                            {lang.fileExtension}
                          </span>
                          {isSelected && (
                            <Badge variant="success" className="text-[10px] py-0 px-2">
                              Active
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-content-muted leading-relaxed max-w-lg">
                          {lang.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center self-end flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleTemplate(lang.slug)}
                        className="p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface text-xs flex items-center gap-1 transition-colors"
                        title="Preview code template"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">
                          {expandedTemplate === lang.slug ? 'Hide Code' : 'Template'}
                        </span>
                        {expandedTemplate === lang.slug ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <Button
                        variant={isSelected ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleSelect(lang.slug)}
                        disabled={isThisSelecting || isSelected}
                        className={isSelected ? 'cursor-default border-violet-500/40' : ''}
                      >
                        {isThisSelecting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            <span>Selecting...</span>
                          </>
                        ) : isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <span>Select {lang.name}</span>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Code template accordion */}
                  {expandedTemplate === lang.slug && (
                    <div className="mt-3 pt-3 border-t border-border-subtle/60">
                      <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 border border-border-subtle overflow-x-auto">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-content-muted">
                          <span>Starter Template ({lang.name})</span>
                          <span>{lang.fileExtension}</span>
                        </div>
                        <pre className="text-[11px] leading-relaxed font-mono">
                          {lang.defaultTemplate || '// No starter code required'}
                        </pre>
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

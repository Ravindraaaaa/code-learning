import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Search,
  Terminal,
  Code2,
  Play,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Input, Textarea, Select } from '../components/common/Input.jsx';
import { Card, CardHeader } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Alert } from '../components/common/Alert.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { Skeleton, SkeletonCard, SkeletonCodeBlock } from '../components/common/Skeleton.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';

export const ThemePreviewPage = () => {
  // Theme state: dark-first by default
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleCopySample = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBtnLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner / Theme Controller */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-border-subtle bg-white dark:bg-surface/90 p-6 sm:p-10 shadow-surface-md">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-gradient-to-br from-primary-500/10 to-violet-500/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CodeForge Theme Preview</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-mono bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 border border-secondary-500/20">
                Blue &bull; Violet Accent
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-content-primary">
              Design System Showcase
            </h1>

            <p className="text-sm text-slate-600 dark:text-content-muted max-w-2xl">
              Professional, developer-focused UI foundation engineered with dark-first styling,
              blue & violet accents, and comprehensive tokenized states.
            </p>
          </div>

          {/* Theme Mode Toggle Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-border-subtle bg-slate-100 dark:bg-surface-elevated text-slate-800 dark:text-content-primary hover:border-violet-500 transition-all duration-fast shadow-surface-sm"
              aria-label="Toggle light and dark mode"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-violet-600" />
                  <span className="text-xs font-medium">Dark Mode</span>
                </>
              )}
            </button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsModalOpen(true)}
              className="gap-2"
            >
              <span>Preview Modal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 1. BUTTONS SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Terminal className="w-5 h-5 text-violet-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Buttons</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Variants &bull; Sizes &bull; States</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variants */}
          <Card className="space-y-4">
            <CardHeader
              title="Style Variants"
              subtitle="Gradient primary, solid violet, blue, outline, ghost, danger"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Gradient</Button>
              <Button variant="secondary">Violet Accent</Button>
              <Button variant="blue">Electric Blue</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Card>

          {/* Sizes & Interactive States */}
          <Card className="space-y-4">
            <CardHeader
              title="Sizes & Loading State"
              subtitle="sm, md, lg with icon integration and animated spinner"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button
                variant="secondary"
                size="md"
                isLoading={btnLoading}
                onClick={toggleBtnLoading}
              >
                {btnLoading ? 'Executing...' : 'Click to Load'}
              </Button>
              <Button variant="outline" size="md" disabled>Disabled</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 2. INPUTS & FORM CONTROLS SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Code2 className="w-5 h-5 text-secondary-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Inputs & Form Controls</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Interactive text, search, select, textarea</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <Input
              label="Standard Text Input"
              placeholder="e.g. solveTwoSum"
              helperText="Function identifier name in camelCase"
            />

            <Input
              label="Search Input with Shortcut"
              placeholder="Search problems, algorithms, tags..."
              icon={Search}
              trailing={<span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-surface-panel border border-slate-200 dark:border-border-subtle text-[10px]">⌘K</span>}
            />

            <Input
              label="Validation Error State"
              defaultValue="invalid variable name!"
              error="Identifiers cannot contain spaces or punctuation."
            />
          </Card>

          <Card className="space-y-4">
            <Select
              label="Target Programming Language"
              options={[
                { value: 'javascript', label: 'JavaScript (Node.js v24)' },
                { value: 'typescript', label: 'TypeScript (v5.3)' },
                { value: 'python', label: 'Python (v3.12)' },
                { value: 'cpp', label: 'C++ (GCC 13)' },
                { value: 'rust', label: 'Rust (v1.75)' },
              ]}
            />

            <Textarea
              label="Code Solution Editor Input"
              rows={3}
              defaultValue={`function solution(nums, target) {\n  const map = new Map();\n}`}
              helperText="Accepts monospaced syntax input"
            />
          </Card>
        </div>
      </section>

      {/* 3. CARDS SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Layers className="w-5 h-5 text-violet-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Cards & Surface Layouts</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Structured developer views</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Problem Preview Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-border-subtle bg-white dark:bg-surface hover:border-violet-500/50 transition-all duration-fast shadow-surface-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 dark:text-content-muted">#001</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Easy
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-content-primary">
                Two Sum Target
              </h4>
              <p className="text-xs text-slate-600 dark:text-content-muted line-clamp-2">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-surface-elevated text-slate-600 dark:text-content-secondary font-mono">
                  Array
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-surface-elevated text-slate-600 dark:text-content-secondary font-mono">
                  Hash Table
                </span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-border-subtle flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-content-muted">Acceptance 51.2%</span>
              <Button variant="primary" size="sm" className="gap-1.5">
                <span>Solve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Metric KPI Card 1 */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-border-subtle bg-white dark:bg-surface shadow-surface-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-content-muted">Execution Performance</span>
                <div className="p-2 rounded-xl bg-secondary-500/10 text-secondary-500">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-content-primary">
                  18 <span className="text-sm font-normal text-slate-500 dark:text-content-muted">ms</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  &uarr; Faster than 94.6% of submissions
                </p>
              </div>
              <div className="w-full bg-slate-100 dark:bg-surface-panel rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-secondary-500 to-violet-500 h-2 rounded-full w-[94%]" />
              </div>
            </div>
            <span className="text-xs text-slate-400 dark:text-content-subtle pt-4 font-mono">V8 Runtime sandbox</span>
          </div>

          {/* Metric KPI Card 2 */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-border-subtle bg-white dark:bg-surface shadow-surface-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-content-muted">Active Daily Streak</span>
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-content-primary">
                  14 <span className="text-sm font-normal text-slate-500 dark:text-content-muted">days</span>
                </div>
                <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-1">
                  Consistent problem solving habit
                </p>
              </div>
              <div className="grid grid-cols-7 gap-1 pt-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-sm bg-violet-500/80"
                    title={`Day ${i + 1} completed`}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-slate-400 dark:text-content-subtle pt-4 font-mono">Top 5% consistency</span>
          </div>
        </div>
      </section>

      {/* 4. BADGES SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Sparkles className="w-5 h-5 text-secondary-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Badges & Status Tags</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Difficulties &bull; Languages &bull; Themes</span>
        </div>

        <Card className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 dark:text-content-muted uppercase tracking-wider">
              Problem Difficulties
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Easy &bull; 100 XP</Badge>
              <Badge variant="warning">Medium &bull; 250 XP</Badge>
              <Badge variant="error">Hard &bull; 500 XP</Badge>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-border-subtle">
            <h4 className="text-xs font-semibold text-slate-400 dark:text-content-muted uppercase tracking-wider">
              Theme & Technology Accents
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Electric Indigo</Badge>
              <Badge variant="secondary">Cyan Tech</Badge>
              <Badge variant="default">Monochrome</Badge>
              <Badge variant="info">Diagnostic Info</Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. ALERTS SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Cpu className="w-5 h-5 text-violet-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Alerts & System Feedback</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Info &bull; Success &bull; Warning &bull; Error</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert variant="info" title="System Notice" dismissible>
            Docker isolation sandbox is active. Time limit per execution is capped at 2,000ms.
          </Alert>

          <Alert variant="violet" title="Theme Preview Activated" dismissible>
            Blue and Violet tokens are active across all primary and secondary actions.
          </Alert>

          <Alert variant="success" title="Test Suite Passed">
            All 28 hidden unit test cases evaluated successfully with zero runtime faults.
          </Alert>

          <Alert variant="error" title="Memory Limit Exceeded">
            Process consumed 268MB, exceeding maximum allocated threshold of 256MB.
          </Alert>
        </div>
      </section>

      {/* 6. LOADING STATES SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Clock className="w-5 h-5 text-secondary-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Loading States</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Skeleton cards &bull; Code shimmers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-content-muted">Problem Card Skeleton</h4>
            <SkeletonCard />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-content-muted">Terminal / Code Shimmer</h4>
            <SkeletonCodeBlock />
          </div>
        </div>
      </section>

      {/* 7. EMPTY STATE SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-border-subtle">
          <Terminal className="w-5 h-5 text-violet-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary">Empty State</h2>
          <span className="text-xs text-slate-400 dark:text-content-subtle font-mono">Zero data placeholder with clear call to action</span>
        </div>

        <EmptyState
          icon={Terminal}
          title="No Code Submissions Recorded"
          description="You haven't submitted any solutions for this practice set yet. Write code in the editor and click Run Solution to evaluate your algorithm."
          actionLabel="Run First Solution"
          onAction={() => alert('Empty state action triggered')}
          secondaryActionLabel="Browse Problem Sets"
          onSecondaryAction={() => alert('Secondary action triggered')}
        />
      </section>

      {/* 8. MODAL DIALOG PREVIEW */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Solution Submission"
        description="Verify your solution parameters before sending to the evaluation engine."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Solution queued for grading');
                setIsModalOpen(false);
              }}
            >
              Submit Solution
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-content-muted">
            Your solution will be executed in a dedicated, secure runner against 40 standard and corner test cases.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-surface-elevated/60 border border-slate-200 dark:border-border-subtle space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-content-muted">Language:</span>
              <span className="text-slate-900 dark:text-content-primary font-semibold">JavaScript (Node 24)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-content-muted">Time Limit:</span>
              <span className="text-slate-900 dark:text-content-primary">2,000 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-content-muted">Memory Cap:</span>
              <span className="text-slate-900 dark:text-content-primary">256 MB</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

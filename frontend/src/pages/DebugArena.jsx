import React, { useState, useEffect, useMemo } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  Bug as BugIcon,
  Play,
  Send,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Lightbulb,
  FileCode,
  CheckCircle,
  Terminal,
  Activity,
  Award,
  Sparkles,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const FONT_SIZES = [12, 13, 14, 16, 18];

const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
    case 'beginner':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'medium':
    case 'intermediate':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'hard':
    case 'advanced':
      return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default:
      return 'text-slate-400 bg-slate-800 border-slate-700';
  }
};

const getBugTypeColor = (bugType) => {
  switch (bugType?.toLowerCase()) {
    case 'syntax':
    case 'syntax bug':
      return 'text-orange-400 bg-orange-500/10 border-orange-500/25';
    case 'logical':
    case 'logical bug':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/25';
    case 'runtime':
    case 'runtime bug':
      return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
    default:
      return 'text-violet-400 bg-violet-500/10 border-violet-500/25';
  }
};

const getLanguageBadge = (language) => {
  switch (language?.toLowerCase()) {
    case 'javascript':
      return { name: 'JavaScript', tag: 'JS', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' };
    case 'cpp':
      return { name: 'C++', tag: 'C++', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' };
    case 'java':
      return { name: 'Java', tag: 'JAVA', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
    default:
      return { name: language, tag: language, color: 'text-slate-400 bg-slate-800 border-slate-700' };
  }
};

const DebugArena = () => {
  const { user } = useAuth();

  // Challenge List State
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Active Challenge Workspace State
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState('report'); // 'report' | 'testcases' | 'hints' | 'attempts'

  // Revealed Hints per challenge ID: { [challengeId]: number of revealed hints }
  const [revealedHints, setRevealedHints] = useState({});

  // Attempts History for Active Challenge
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);

  // Execution & Output State
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionError, setExecutionError] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [consoleTab, setConsoleTab] = useState('testResult'); // 'testResult' | 'terminal'

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [bugTypeFilter, setBugTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch all debug challenges
  const fetchChallenges = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.get('/debug-arena/challenges');
      const data = res.data?.data || [];
      setChallenges(data);
    } catch (err) {
      console.error('Failed to load challenges:', err);
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // Fetch student's genuine attempts for the active challenge
  const fetchAttempts = async (challengeId) => {
    if (!challengeId) return;
    setLoadingAttempts(true);
    try {
      const res = await api.get(`/debug-arena/challenges/${challengeId}/attempts`);
      setAttempts(res.data?.data || []);
    } catch (err) {
      // If unauthorized or error, empty attempts
      setAttempts([]);
    } finally {
      setLoadingAttempts(false);
    }
  };

  // Open Challenge in Workspace
  const handleSelectChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setCode(challenge.buggyCode || '');
    setExecutionOutput('');
    setExecutionError('');
    setTestResult(null);
    setActiveTab('report');
    setConsoleTab('testResult');
    fetchAttempts(challenge._id);
  };

  // Return to Challenge List Explorer
  const handleBackToList = () => {
    setActiveChallenge(null);
    setTestResult(null);
    setExecutionOutput('');
    setExecutionError('');
  };

  // Navigation: Next / Previous Challenge
  const currentIdx = useMemo(() => {
    if (!activeChallenge) return -1;
    return challenges.findIndex((c) => c._id === activeChallenge._id);
  }, [challenges, activeChallenge]);

  const handlePrevChallenge = () => {
    if (currentIdx > 0) {
      handleSelectChallenge(challenges[currentIdx - 1]);
    }
  };

  const handleNextChallenge = () => {
    if (currentIdx < challenges.length - 1) {
      handleSelectChallenge(challenges[currentIdx + 1]);
    }
  };

  // Copy Code to Clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Reset Code to Original Buggy Code
  const handleResetCode = () => {
    if (!activeChallenge || isRunning || isSubmitting) return;
    setCode(activeChallenge.buggyCode || '');
    setExecutionOutput('');
    setExecutionError('');
    setTestResult(null);
  };

  // Progressive Hint Reveal (Does not reveal full solution)
  const handleRevealNextHint = () => {
    if (!activeChallenge) return;
    const currentCount = revealedHints[activeChallenge._id] || 0;
    const totalHints = activeChallenge.hints?.length || 0;
    if (currentCount < totalHints) {
      setRevealedHints((prev) => ({
        ...prev,
        [activeChallenge._id]: currentCount + 1,
      }));
    }
  };

  // Run Code against Sample (Visible) Test Cases
  const handleRun = async () => {
    if (!activeChallenge || isRunning || isSubmitting) return;
    setIsRunning(true);
    setConsoleTab('testResult');
    setExecutionOutput('Compiling and testing against visible sample test cases in secure sandbox...\n');
    setExecutionError('');
    setTestResult(null);

    try {
      const sampleCases = (activeChallenge.testCases || []).filter((tc) => !tc.isHidden);
      const testCasesToRun = sampleCases.length > 0 ? sampleCases : (activeChallenge.testCases || []);

      const res = await api.post('/code/execute', {
        language: activeChallenge.language,
        code,
        testCases: testCasesToRun,
      });

      const execData = res.data?.data;
      if (!execData) {
        throw new Error('No execution result returned');
      }

      // Format as testResult structure for uniform rendering
      const totalCount = execData.totalTestCases || testCasesToRun.length;
      const passedCount = execData.passedTestCases || 0;
      const isPassed = execData.passed === true;

      setTestResult({
        status: isPassed ? 'Passed' : (execData.status === 'compile_error' ? 'Compile Error' : 'Failed'),
        score: totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0,
        executionTimeMs: execData.executionTimeMs || 0,
        feedback: isPassed
          ? `Sample test cases passed (${passedCount}/${totalCount}). Ready to Submit Fix!`
          : `Sample test cases finished with mismatches (${passedCount}/${totalCount} passed). Check breakdown below.`,
        testCaseResults: (execData.details || []).map((d, i) => ({
          testCaseId: `run-${i}`,
          name: `Sample Case #${i + 1}`,
          input: d.input || testCasesToRun[i]?.input || '',
          expectedOutput: d.expected || testCasesToRun[i]?.expectedOutput || '',
          actualOutput: d.actual || '',
          passed: d.passed === true,
          error: d.error || null,
        })),
        isRunTest: true,
      });

      setExecutionOutput(
        isPassed
          ? `Sample test run successful!\nAll ${totalCount} sample test cases matched expected output.`
          : `Sample run completed with errors or differences.\nPassed: ${passedCount}/${totalCount}`
      );
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Execution failed';
      setExecutionError(msg);
      setExecutionOutput(`Execution Error:\n${msg}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code Fix against All Test Cases (Full Evaluation)
  const handleSubmit = async () => {
    if (!activeChallenge || isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setConsoleTab('testResult');
    setExecutionOutput('Evaluating your patch against all test cases (sample & hidden)...\n');
    setExecutionError('');
    setTestResult(null);

    const hintsUsed = revealedHints[activeChallenge._id] || 0;

    try {
      const res = await api.post(`/debug-arena/challenges/${activeChallenge._id}/submit`, {
        submittedCode: code,
        hintsUsed,
      });

      const attemptResult = res.data?.data;
      setTestResult(attemptResult);

      if (attemptResult?.status === 'Passed') {
        setExecutionOutput(`BUG FIXED! All test cases passed.\nScore: ${attemptResult?.score || 100}% (${hintsUsed} hint${hintsUsed !== 1 ? 's' : ''} used).\nAttempt recorded successfully.`);
        // Mark as solved in local challenge list
        setChallenges((prev) =>
          prev.map((c) => (c._id === activeChallenge._id ? { ...c, isSolved: true } : c))
        );
        setActiveChallenge((prev) => (prev ? { ...prev, isSolved: true } : prev));
      } else {
        setExecutionOutput(
          `Evaluation finished: ${attemptResult?.status || 'Failed'}\nScore: ${attemptResult?.score || 0}%.\n${attemptResult?.feedback || ''}`
        );
      }

      // Refresh real attempt history
      fetchAttempts(activeChallenge._id);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Submission failed';
      setExecutionError(msg);
      setExecutionOutput(`Submission Error:\n${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics
  const totalSolved = useMemo(() => {
    return challenges.filter((c) => c.isSolved).length;
  }, [challenges]);

  // Filtered challenges for Explorer
  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = c.title?.toLowerCase().includes(q);
        const matchesDesc = c.description?.toLowerCase().includes(q);
        const matchesBug = c.bugType?.toLowerCase().includes(q);
        const matchesLang = c.language?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesBug && !matchesLang) {
          return false;
        }
      }

      // Language filter
      if (languageFilter !== 'All') {
        const langMap = { JavaScript: 'javascript', 'C++': 'cpp', Java: 'java' };
        if (c.language !== langMap[languageFilter] && c.language !== languageFilter.toLowerCase()) {
          return false;
        }
      }

      // Difficulty filter
      if (difficultyFilter !== 'All') {
        if (c.difficulty?.toLowerCase() !== difficultyFilter.toLowerCase()) {
          return false;
        }
      }

      // Bug Type filter
      if (bugTypeFilter !== 'All') {
        if (!c.bugType?.toLowerCase().includes(bugTypeFilter.toLowerCase())) {
          return false;
        }
      }

      // Solved Status filter
      if (statusFilter === 'Solved' && !c.isSolved) return false;
      if (statusFilter === 'Unsolved' && c.isSolved) return false;

      return true;
    });
  }, [challenges, searchQuery, languageFilter, difficultyFilter, bugTypeFilter, statusFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    languageFilter !== 'All' ||
    difficultyFilter !== 'All' ||
    bugTypeFilter !== 'All' ||
    statusFilter !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setLanguageFilter('All');
    setDifficultyFilter('All');
    setBugTypeFilter('All');
    setStatusFilter('All');
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <BugIcon className="w-10 h-10 text-violet-500 animate-pulse" />
        <p className="text-sm font-medium">Loading Debug Arena Challenges...</p>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: CHALLENGES EXPLORER (LIST VIEW)
  // =========================================================================
  if (!activeChallenge) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 shadow-inner">
                <BugIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                    Debug Arena
                  </h1>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                    Live Sandbox
                  </span>
                </div>
                <p className="text-slate-400 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                  Diagnose, isolate, and patch intentional algorithm bugs under rigorous test suites in C++, Java, and JavaScript.
                </p>
              </div>
            </div>

            {/* Solved Progress Metric */}
            <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700/60 p-4 rounded-xl shadow-lg backdrop-blur shrink-0">
              <div className="p-2.5 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Bugs Fixed</div>
                <div className="text-2xl font-black text-slate-100">
                  {totalSolved}{' '}
                  <span className="text-xs font-normal text-slate-500">/ {challenges.length}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Completion</div>
                <div className="text-sm font-bold text-emerald-400">
                  {challenges.length > 0 ? Math.round((totalSolved / challenges.length) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Easy: {challenges.filter((c) => c.difficulty === 'Easy').length} Challenges</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Medium: {challenges.filter((c) => c.difficulty === 'Medium').length} Challenges</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Hard: {challenges.filter((c) => c.difficulty === 'Hard').length} Challenges</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span>Languages: JS (5), C++ (5), Java (5)</span>
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
          <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search challenges by title, bug type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Language Filter */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="All">All Languages</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Bug Type Filter */}
              <select
                value={bugTypeFilter}
                onChange={(e) => setBugTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="All">All Bug Types</option>
                <option value="Logical">Logical</option>
                <option value="Syntax">Syntax</option>
                <option value="Runtime">Runtime</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Solved">Solved</option>
                <option value="Unsolved">Unsolved</option>
              </select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/15 border border-violet-500/30 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>
              Showing <strong className="text-slate-200">{filteredChallenges.length}</strong> of{' '}
              {challenges.length} challenges
            </span>
          </div>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <Card className="p-12 text-center text-slate-400 border-dashed border-slate-800">
            <BugIcon className="w-10 h-10 mx-auto mb-3 text-slate-600" />
            <h3 className="text-base font-semibold text-slate-300">No challenges found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No challenges match your search and filter criteria. Try adjusting your filters.
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="mt-4 text-xs font-medium"
              >
                Reset All Filters
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChallenges.map((challenge, idx) => {
              const langInfo = getLanguageBadge(challenge.language);
              return (
                <div
                  key={challenge._id}
                  onClick={() => handleSelectChallenge(challenge)}
                  className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-violet-500/50 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-violet-950/20 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Solved Accent Bar */}
                  {challenge.isSolved && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                  )}

                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-bold rounded border ${langInfo.color}`}
                        >
                          {langInfo.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${getBugTypeColor(
                            challenge.bugType
                          )}`}
                        >
                          {challenge.bugType}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${getDifficultyColor(
                            challenge.difficulty
                          )}`}
                        >
                          {challenge.difficulty}
                        </span>
                      </div>

                      {challenge.isSolved ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500 shrink-0">
                          #{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-violet-300 transition-colors line-clamp-1 mb-2">
                      {challenge.title}
                    </h3>

                    {/* Description preview */}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {challenge.description?.replace(/###[^\n]+/g, '').replace(/`/g, '')}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">
                      {challenge.testCases?.length || 0} Test Cases
                    </span>
                    <span className="font-semibold text-violet-400 group-hover:text-violet-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {challenge.isSolved ? 'Review & Debug' : 'Fix Bug'} →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE CHALLENGE WORKSPACE
  // =========================================================================
  const langInfo = getLanguageBadge(activeChallenge.language);
  const totalHints = activeChallenge.hints?.length || 0;
  const currentRevealedCount = revealedHints[activeChallenge._id] || 0;

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] bg-slate-950 text-slate-200 overflow-hidden">
      {/* Top Workspace Header Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors shrink-0"
            title="Back to Challenge Explorer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Challenges</span>
          </button>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Navigation Controls: Previous / Next */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrevChallenge}
              disabled={currentIdx <= 0}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-750 disabled:opacity-40 text-slate-300 disabled:pointer-events-none transition-colors"
              title="Previous Challenge"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-1">
              {currentIdx + 1}/{challenges.length}
            </span>
            <button
              onClick={handleNextChallenge}
              disabled={currentIdx >= challenges.length - 1}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-750 disabled:opacity-40 text-slate-300 disabled:pointer-events-none transition-colors"
              title="Next Challenge"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Title & Badges */}
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm font-bold text-slate-100 truncate">
              {activeChallenge.title}
            </h2>
            <span
              className={`hidden md:inline-block px-2 py-0.5 text-[10px] font-bold rounded border shrink-0 ${langInfo.color}`}
            >
              {langInfo.name}
            </span>
            <span
              className={`hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded border shrink-0 ${getDifficultyColor(
                activeChallenge.difficulty
              )}`}
            >
              {activeChallenge.difficulty}
            </span>
            <span
              className={`hidden lg:inline-block px-2 py-0.5 text-[10px] font-semibold rounded border shrink-0 ${getBugTypeColor(
                activeChallenge.bugType
              )}`}
            >
              {activeChallenge.bugType}
            </span>
            {activeChallenge.isSolved && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> Solved
              </span>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            isLoading={isRunning}
            className="text-xs font-mono px-3 py-1.5 border-slate-700 bg-slate-800/80 hover:bg-slate-750 text-slate-200"
          >
            <Play className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>Run Code</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            isLoading={isSubmitting}
            className="text-xs font-mono px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30 font-semibold"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>Submit Fix</span>
          </Button>
        </div>
      </header>

      {/* Main Split Layout: Left Problem Details, Right Code Editor & Output */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ================================================================= */}
        {/* LEFT PANEL: Bug Report, Test Cases, Progressive Hints, Attempts */}
        {/* ================================================================= */}
        <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/40 min-h-[350px] lg:min-h-0">
          {/* Panel Tabs */}
          <div className="flex items-center px-4 pt-2 border-b border-slate-800 bg-slate-900/60 gap-1 overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTab('report')}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'report'
                  ? 'border-violet-500 text-violet-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BugIcon className="w-3.5 h-3.5 text-red-400" />
              <span>Bug Report</span>
            </button>

            <button
              onClick={() => setActiveTab('testcases')}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'testcases'
                  ? 'border-violet-500 text-violet-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              <span>Test Cases ({activeChallenge.testCases?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'hints'
                  ? 'border-violet-500 text-violet-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Hints {totalHints > 0 && `(${currentRevealedCount}/${totalHints})`}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('attempts')}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'attempts'
                  ? 'border-violet-500 text-violet-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Attempts {attempts.length > 0 && `(${attempts.length})`}</span>
            </button>
          </div>

          {/* Panel Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* TAB 1: BUG REPORT */}
            {activeTab === 'report' && (
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-100">
                    {activeChallenge.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getDifficultyColor(
                        activeChallenge.difficulty
                      )}`}
                    >
                      {activeChallenge.difficulty}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getBugTypeColor(
                        activeChallenge.bugType
                      )}`}
                    >
                      {activeChallenge.bugType} Bug
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${langInfo.color}`}
                    >
                      {langInfo.name}
                    </span>
                  </div>
                </div>

                {/* Bug Description Body */}
                <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {activeChallenge.description}
                </div>

                {/* Callout Instructions */}
                <div className="bg-violet-950/20 border border-violet-800/40 rounded-xl p-3.5 text-xs text-violet-300 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-violet-200">How to solve:</strong> Inspect the buggy starter code on the right. Fix the syntax, boundary, or logical flaw and verify your solution by clicking <strong>Run Code</strong> or <strong>Submit Fix</strong>.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TEST CASES */}
            {activeTab === 'testcases' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400">
                  Below are sample test cases tested against your code fix. Hidden test cases are evaluated upon <strong>Submit Fix</strong>.
                </div>

                <div className="space-y-3">
                  {(activeChallenge.testCases || []).map((tc, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-semibold text-slate-300">
                          Test Case #{idx + 1}
                        </span>
                        {tc.isHidden ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            Hidden Case
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Sample Case
                          </span>
                        )}
                      </div>

                      {/* Input */}
                      <div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                          Input:
                        </div>
                        <pre className="p-2 bg-slate-950 border border-slate-800/80 rounded font-mono text-slate-300 overflow-x-auto">
                          {tc.input !== undefined && tc.input !== '' ? tc.input : '<empty input>'}
                        </pre>
                      </div>

                      {/* Expected Output */}
                      <div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                          Expected Output:
                        </div>
                        <pre className="p-2 bg-slate-950 border border-slate-800/80 rounded font-mono text-emerald-300 overflow-x-auto">
                          {tc.expectedOutput}
                        </pre>
                      </div>

                      {tc.explanation && (
                        <div className="text-[11px] text-slate-400 italic">
                          💡 {tc.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROGRESSIVE HINTS (DOES NOT REVEAL COMPLETE SOLUTION) */}
            {activeTab === 'hints' && (
              <div className="space-y-4">
                {/* Hints Usage & Penalty Banner */}
                <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3.5 text-xs text-amber-300 space-y-2">
                  <div className="flex items-center justify-between font-medium">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Progressive Hints System</span>
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono text-[11px]">
                      Used: {currentRevealedCount} / {totalHints} {currentRevealedCount > 0 ? `(-${currentRevealedCount * 5}% penalty)` : '(No penalty)'}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-200/80">
                    Hints are unlocked progressively one-by-one so you can think critically without spoiling the answer. Each revealed hint incurs a minor 5% score penalty upon submission.
                  </p>
                </div>

                {totalHints === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    No hints configured for this challenge. You got this!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeChallenge.hints.map((hint, idx) => {
                      const isRevealed = idx < currentRevealedCount;
                      const levelTitle = idx === 0
                        ? 'Hint 1: Bug Category Clue'
                        : idx === 1
                        ? 'Hint 2: Code Section / Flawed Logic'
                        : 'Hint 3: Conceptual Guidance';
                      const levelColor = idx === 0
                        ? 'text-sky-400 bg-sky-500/10 border-sky-500/20'
                        : idx === 1
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isRevealed
                              ? 'bg-slate-900 border-slate-750 text-slate-200 shadow-sm'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between font-medium text-xs mb-2">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${levelColor}`}>
                              {levelTitle}
                            </span>
                            {isRevealed ? (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Unlocked
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-600 font-mono">
                                Locked (-5% penalty to reveal)
                              </span>
                            )}
                          </div>

                          {isRevealed ? (
                            <p className="text-xs leading-relaxed text-slate-300 mt-2 font-sans bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                              {hint}
                            </p>
                          ) : (
                            <p className="text-xs italic text-slate-600 mt-1">
                              Locked hint. Click below to reveal this level of guidance.
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {currentRevealedCount < totalHints && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRevealNextHint}
                        className="w-full text-xs font-medium border-amber-500/30 text-amber-300 hover:bg-amber-500/10 py-2"
                      >
                        <Lightbulb className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                        Reveal {currentRevealedCount === 0 ? 'Hint #1 (Category Clue)' : currentRevealedCount === 1 ? 'Hint #2 (Code Section)' : 'Hint #3 (Conceptual Guidance)'}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: MY ATTEMPTS (AUTHENTIC STUDENT PROGRESS) */}
            {activeTab === 'attempts' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Student Attempts History</span>
                  <span className="font-mono text-slate-300">{attempts.length} attempts</span>
                </div>

                {loadingAttempts ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    Loading attempts...
                  </div>
                ) : attempts.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 rounded-xl border border-slate-800/80 p-6 text-slate-500 text-xs">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="font-medium text-slate-400">No attempts yet</p>
                    <p className="mt-1">
                      Click <strong>Submit Fix</strong> to evaluate your code and record your attempt.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {attempts.map((att, idx) => (
                      <div
                        key={att._id || idx}
                        className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                          att.status === 'Passed'
                            ? 'bg-emerald-950/20 border-emerald-500/30'
                            : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {att.status === 'Passed' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                            <span
                              className={`font-bold ${
                                att.status === 'Passed' ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {att.status}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                              Score: {att.score}%
                            </span>
                            {att.hintsUsed !== undefined && att.hintsUsed > 0 && (
                              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                {att.hintsUsed} hint{att.hintsUsed > 1 ? 's' : ''} (-{att.hintPenalty || att.hintsUsed * 5}%)
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {att.createdAt ? new Date(att.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>

                        {att.feedback && (
                          <div className="text-[11px] text-slate-300 line-clamp-2">
                            {att.feedback}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/60">
                          <span>Runtime: {att.executionTimeMs || 0}ms</span>
                          <span>Passed Cases: {att.testCaseResults?.filter((r) => r.passed).length || 0} / {att.testCaseResults?.length || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT PANEL: MONACO CODE EDITOR & OUTPUT DRAWER */}
        {/* ================================================================= */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-slate-950">
          {/* Editor Action Controls Bar */}
          <div className="h-10 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-slate-200 font-bold uppercase">{activeChallenge.language}</span>
              </span>

              {/* Font Size Selector */}
              <div className="relative ml-2">
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-mono rounded px-2 py-1 border border-slate-700 cursor-pointer focus:outline-none"
                  title="Editor Font Size"
                >
                  {FONT_SIZES.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}px
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Copy Code */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title={copied ? 'Copied!' : 'Copy Code'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Reset to Buggy Code */}
              <button
                onClick={handleResetCode}
                disabled={isRunning || isSubmitting}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-40"
                title="Reset to default buggy code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[220px] overflow-hidden">
            <Editor
              height="100%"
              language={
                activeChallenge.language === 'cpp'
                  ? 'cpp'
                  : activeChallenge.language === 'java'
                  ? 'java'
                  : 'javascript'
              }
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                padding: { top: 12, bottom: 12 },
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                cursorBlinking: 'smooth',
                smoothScrolling: true,
              }}
            />
          </div>

          {/* Bottom Execution & Test Results Drawer */}
          <div className="h-64 border-t border-slate-800 bg-slate-900 flex flex-col shrink-0 overflow-hidden">
            {/* Drawer Tab Header */}
            <div className="h-9 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setConsoleTab('testResult')}
                  className={`text-xs font-mono font-medium flex items-center gap-1.5 h-9 border-b-2 transition-colors ${
                    consoleTab === 'testResult'
                      ? 'border-violet-500 text-violet-300'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Test Results</span>
                </button>

                <button
                  onClick={() => setConsoleTab('terminal')}
                  className={`text-xs font-mono font-medium flex items-center gap-1.5 h-9 border-b-2 transition-colors ${
                    consoleTab === 'terminal'
                      ? 'border-violet-500 text-violet-300'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal Console</span>
                </button>
              </div>

              {testResult && (
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`font-bold ${
                      testResult.status === 'Passed' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {testResult.status}
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">{testResult.executionTimeMs || 0}ms</span>
                </div>
              )}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
              {/* TAB 1: TEST RESULTS BREAKDOWN */}
              {consoleTab === 'testResult' && (
                <div className="space-y-3">
                  {!testResult && !isRunning && !isSubmitting && (
                    <div className="text-center py-10 text-slate-500 italic">
                      Click <strong>Run Code</strong> to test sample cases, or <strong>Submit Fix</strong> to evaluate all test cases.
                    </div>
                  )}

                  {(isRunning || isSubmitting) && (
                    <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
                      <Clock className="w-4 h-4 animate-spin text-violet-400" />
                      <span>{isSubmitting ? 'Evaluating against all test cases...' : 'Executing in sandbox...'}</span>
                    </div>
                  )}

                  {testResult && (
                    <div className="space-y-3">
                      {/* Verdict Banner */}
                      <div
                        className={`p-3 rounded-lg border flex items-center justify-between ${
                          testResult.status === 'Passed'
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                            : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {testResult.status === 'Passed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-rose-400" />
                          )}
                          <div>
                            <div className="font-bold text-sm">
                              {testResult.status === 'Passed'
                                ? 'All Test Cases Passed!'
                                : `Execution Status: ${testResult.status}`}
                            </div>
                            <div className="text-[11px] opacity-80">{testResult.feedback}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-black font-mono">
                            {testResult.score !== undefined ? `${testResult.score}%` : ''}
                          </div>
                          <div className="text-[10px] opacity-75">{testResult.executionTimeMs || 0}ms</div>
                        </div>
                      </div>

                      {/* Test Case Breakdown Cards */}
                      <div className="space-y-2">
                        {(testResult.testCaseResults || []).map((tc, idx) => (
                          <div
                            key={tc.testCaseId || idx}
                            className={`p-2.5 rounded-lg border font-mono text-xs ${
                              tc.passed
                                ? 'bg-slate-950/80 border-slate-800/80'
                                : 'bg-rose-950/20 border-rose-900/40'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-bold flex items-center gap-1.5">
                                {tc.passed ? (
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                                )}
                                <span className={tc.passed ? 'text-slate-300' : 'text-rose-300'}>
                                  {tc.name || `Case #${idx + 1}`}
                                </span>
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  tc.passed
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-rose-500/10 text-rose-400'
                                }`}
                              >
                                {tc.passed ? 'Passed' : 'Failed'}
                              </span>
                            </div>

                            {/* Show details for failures or sample cases */}
                            {(!tc.passed || tc.input) && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[11px]">
                                {tc.input !== undefined && (
                                  <div>
                                    <span className="text-slate-500">Input:</span>
                                    <pre className="bg-slate-900 p-1.5 rounded text-slate-300 overflow-x-auto mt-0.5">
                                      {tc.input || '<empty>'}
                                    </pre>
                                  </div>
                                )}
                                {tc.expectedOutput !== undefined && (
                                  <div>
                                    <span className="text-slate-500">Expected:</span>
                                    <pre className="bg-slate-900 p-1.5 rounded text-emerald-400 overflow-x-auto mt-0.5">
                                      {tc.expectedOutput}
                                    </pre>
                                  </div>
                                )}
                                {tc.actualOutput !== undefined && !tc.passed && (
                                  <div className="sm:col-span-2">
                                    <span className="text-slate-500">Actual Output:</span>
                                    <pre className="bg-slate-900 p-1.5 rounded text-rose-400 overflow-x-auto mt-0.5">
                                      {tc.actualOutput || '<empty or error>'}
                                    </pre>
                                  </div>
                                )}
                                {tc.error && (
                                  <div className="sm:col-span-2 text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                                    <span className="font-bold">Error:</span> {tc.error}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TERMINAL CONSOLE */}
              {consoleTab === 'terminal' && (
                <div className="space-y-2">
                  {executionError && (
                    <div className="text-rose-400 bg-rose-950/30 p-2.5 rounded border border-rose-900/50 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <pre className="whitespace-pre-wrap font-mono">{executionError}</pre>
                    </div>
                  )}

                  {executionOutput && (
                    <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {executionOutput}
                    </pre>
                  )}

                  {!executionOutput && !executionError && (
                    <div className="text-slate-600 italic py-6 text-center">
                      Raw console stdout and stderr will appear here when you run or submit code.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugArena;

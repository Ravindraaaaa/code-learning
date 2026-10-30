import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Terminal,
  Code2,
  Maximize2,
  Minimize2,
  Shuffle,
  Check,
  BookOpen,
  Tag,
  CheckCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Type,
  Loader2,
  Lightbulb,
  GraduationCap,
  Eye,
  EyeOff,
  HelpCircle,
  FileText,
  Sparkles,
  History,
  Clock,
  ExternalLink,
  FileCode,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DSA_QUESTIONS, DSA_CATEGORIES } from '../data/dsaQuestionsData';

// ONLY Supported Languages in CodeForge Practice Arena: C++, Java, JavaScript
const SUPPORTED_LANGUAGES = [
  { id: 'cpp', name: 'C++', monacoLang: 'cpp', badge: 'C++17' },
  { id: 'java', name: 'Java', monacoLang: 'java', badge: 'Java 17' },
  { id: 'javascript', name: 'JavaScript', monacoLang: 'javascript', badge: 'Node.js 20' }
];

const FONT_SIZES = [12, 13, 14, 16, 18];

const Practice = () => {
  const { user } = useAuth();

  // Storage key for user solved problems
  const solvedStorageKey = useMemo(() => {
    const email = user?.email || 'guest';
    return `codeforge_solved_problems_${email.toLowerCase().trim()}`;
  }, [user]);

  // Storage key for user edited code cache
  const cacheStorageKey = useMemo(() => {
    const email = user?.email || 'guest';
    return `codeforge_practice_code_cache_${email.toLowerCase().trim()}`;
  }, [user]);

  // Solved problems set
  const [solvedProblemIds, setSolvedProblemIds] = useState(() => {
    try {
      const saved = localStorage.getItem(solvedStorageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Re-read storage if user changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(solvedStorageKey);
      if (saved) {
        setSolvedProblemIds(new Set(JSON.parse(saved)));
      }
    } catch {}
  }, [solvedStorageKey]);

  // Current problem selection
  const [currentProblem, setCurrentProblem] = useState(DSA_QUESTIONS[0]);

  // Selected language: C++, Java, or JavaScript strictly
  const [language, setLanguage] = useState('javascript');

  // Cache user code per problemId and language: { "1_javascript": code, ... }
  const [codeCache, setCodeCache] = useState(() => {
    try {
      const saved = localStorage.getItem(cacheStorageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active code in editor
  const [code, setCode] = useState('');

  // Editor Font Size Preference
  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('codeforge_editor_font_size');
      return saved ? parseInt(saved, 10) : 13;
    } catch {
      return 13;
    }
  });

  // UI States
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'testcases' | 'hints' | 'editorial' | 'submissions'
  const [revealedHints, setRevealedHints] = useState(new Set());
  const [consoleTab, setConsoleTab] = useState('testResult'); // 'testResult' | 'console'
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Submissions History & Results State
  const [submissions, setSubmissions] = useState([]);
  const [submissionStats, setSubmissionStats] = useState(null);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [submissionFilterQuestion, setSubmissionFilterQuestion] = useState('current'); // 'current' | 'all'
  const [submissionFilterLanguage, setSubmissionFilterLanguage] = useState('All');
  const [submissionFilterStatus, setSubmissionFilterStatus] = useState('All');
  const [selectedSubmissionDetail, setSelectedSubmissionDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [codeLoadedToast, setCodeLoadedToast] = useState(false);

  // Execution States
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionError, setExecutionError] = useState('');
  const [resultData, setResultData] = useState(null); // Result from Run or Submit
  const [resultType, setResultType] = useState(null); // 'run' | 'submit'

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All'); // 'All' | 'Easy' | 'Medium' | 'Hard'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Solved' | 'Unsolved'
  const [explorerPage, setExplorerPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // Reset page when filters change
  useEffect(() => {
    setExplorerPage(1);
  }, [searchQuery, difficultyFilter, categoryFilter, statusFilter]);

  const hasActiveFilters = searchQuery.trim() !== '' || difficultyFilter !== 'All' || categoryFilter !== 'All' || statusFilter !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setDifficultyFilter('All');
    setCategoryFilter('All');
    setStatusFilter('All');
    setExplorerPage(1);
  };

  // Update editor code when current problem or language changes
  useEffect(() => {
    const cacheKey = `${currentProblem.id}_${language}`;
    if (codeCache[cacheKey] !== undefined) {
      setCode(codeCache[cacheKey]);
    } else {
      const defaultStarter = currentProblem.starterCode[language] || '';
      setCode(defaultStarter);
    }
    setExecutionOutput('');
    setExecutionError('');
    setResultData(null);
    setResultType(null);
    setActiveCaseIdx(0);
    setRevealedHints(new Set());
  }, [currentProblem.id, language]);

  // Save code changes to in-memory cache and localStorage
  const handleEditorChange = (value) => {
    const val = value || '';
    setCode(val);
    const cacheKey = `${currentProblem.id}_${language}`;
    setCodeCache((prev) => {
      const updated = { ...prev, [cacheKey]: val };
      try {
        localStorage.setItem(cacheStorageKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Reset to default starter code for current problem and language
  const handleResetCode = () => {
    if (isRunning || isSubmitting) return;
    const defaultStarter = currentProblem.starterCode[language] || '';
    setCode(defaultStarter);
    const cacheKey = `${currentProblem.id}_${language}`;
    setCodeCache((prev) => {
      const updated = { ...prev };
      delete updated[cacheKey];
      try {
        localStorage.setItem(cacheStorageKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setExecutionOutput('');
    setExecutionError('');
    setResultData(null);
    setResultType(null);
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Handle font size adjustment
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    try {
      localStorage.setItem('codeforge_editor_font_size', String(size));
    } catch {}
  };

  // Select problem from list (preserves search, filters, and pagination)
  const handleSelectProblem = (problem) => {
    setCurrentProblem(problem);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsExplorerOpen(false);
    }
  };

  // Navigate to Next / Previous Problem
  const currentIndex = useMemo(() => {
    return DSA_QUESTIONS.findIndex((q) => q.id === currentProblem.id);
  }, [currentProblem.id]);

  const handlePrevProblem = () => {
    if (currentIndex > 0) {
      setCurrentProblem(DSA_QUESTIONS[currentIndex - 1]);
    }
  };

  const handleNextProblem = () => {
    if (currentIndex < DSA_QUESTIONS.length - 1) {
      setCurrentProblem(DSA_QUESTIONS[currentIndex + 1]);
    }
  };

  // Pick Random Problem
  const handleRandomProblem = () => {
    const randomIdx = Math.floor(Math.random() * DSA_QUESTIONS.length);
    setCurrentProblem(DSA_QUESTIONS[randomIdx]);
    setIsExplorerOpen(false);
  };

  // Execute Code (Run Code button: runs against visible sample test cases)
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setIsConsoleCollapsed(false);
    setExecutionOutput('Compiling and executing sample test cases in secure sandbox...\n');
    setExecutionError('');
    setResultData(null);
    setResultType('run');
    setConsoleTab('testResult');
    setActiveCaseIdx(0);

    try {
      // Filter visible sample test cases
      const sampleTestCases = (currentProblem.testCases || []).filter((tc) => !tc.isHidden);
      const testCasesToRun = sampleTestCases.length > 0 ? sampleTestCases : (currentProblem.testCases || []);

      const res = await api.post('/code/execute', {
        language,
        code,
        testCases: testCasesToRun
      });

      const data = res.data?.data;
      setResultData(data);

      if (data?.details && Array.isArray(data.details)) {
        const errorCase = data.details.find((d) => d.error);
        if (errorCase) {
          setExecutionError(errorCase.error);
        }
      }

      if (data?.error && !data?.details) {
        setExecutionError(data.error);
      }

      setExecutionOutput(
        data?.passed
          ? `Sample test cases evaluated successfully!\nStatus: Passed (${data.passedTestCases || data.details?.length}/${data.totalTestCases || data.details?.length})`
          : `Execution completed with failures or mismatched output.\nPassed: ${data?.passedTestCases || 0} of ${data?.totalTestCases || 0} sample cases.`
      );
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Execution failed';
      setExecutionError(msg);
      setExecutionOutput(`Execution Error:\n${msg}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code against All Test Cases (Submit button: sample + hidden test cases)
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setIsConsoleCollapsed(false);
    setExecutionError('');
    setResultData(null);
    setResultType('submit');
    setConsoleTab('testResult');
    setActiveCaseIdx(0);

    try {
      const res = await api.post('/code/submit', {
        language,
        code,
        questionId: currentProblem.id,
        questionNumber: currentProblem.number,
        questionTitle: currentProblem.title,
        testCases: currentProblem.testCases || []
      });

      const result = res.data?.data;
      setResultData(result);

      if (result?.details && Array.isArray(result.details)) {
        const errorCase = result.details.find((d) => d.error);
        if (errorCase) {
          setExecutionError(errorCase.error);
        }
      }

      if (result?.error && !result?.details) {
        setExecutionError(result.error);
      }

      // If all test cases passed, mark problem as solved!
      if (result?.passed) {
        setSolvedProblemIds((prev) => {
          const updated = new Set(prev);
          updated.add(currentProblem.id);
          try {
            localStorage.setItem(solvedStorageKey, JSON.stringify(Array.from(updated)));
          } catch {}
          return updated;
        });
        setExecutionOutput(`Accepted!\nAll ${result.totalTestCases} test cases passed with 100% score.\nGenuine submission recorded.`);
      } else {
        setExecutionOutput(`${result?.submissionStatus || 'Wrong Answer'}.\nPassed ${result?.passedTestCases || 0} of ${result?.totalTestCases || 0} test cases (${result?.score || 0}% score).\nGenuine submission recorded.`);
      }

      // Refresh real submission history and statistics
      fetchSubmissions();
      fetchStats();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Submission failed';
      setExecutionError(msg);
      setExecutionOutput(`Submission Error:\n${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch real submissions for authenticated student
  const fetchSubmissions = async () => {
    if (!user) return;
    setIsLoadingSubmissions(true);
    try {
      const params = {};
      if (submissionFilterQuestion === 'current') {
        params.questionId = currentProblem.id;
      }
      if (submissionFilterLanguage !== 'All') {
        params.language = submissionFilterLanguage;
      }
      if (submissionFilterStatus !== 'All') {
        params.status = submissionFilterStatus;
      }
      const res = await api.get('/code/submissions', { params });
      setSubmissions(res.data?.data?.submissions || []);
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  // Fetch real submission statistics from database records
  const fetchStats = async () => {
    if (!user) return;
    try {
      const res = await api.get('/code/submissions/stats');
      setSubmissionStats(res.data?.data || null);
    } catch {}
  };

  // Trigger submission fetch when submissions tab is active or filters change
  useEffect(() => {
    if (activeTab === 'submissions') {
      fetchSubmissions();
      fetchStats();
    }
  }, [activeTab, currentProblem.id, submissionFilterQuestion, submissionFilterLanguage, submissionFilterStatus, user]);

  // Initial stats fetch on mount
  useEffect(() => {
    fetchStats();
  }, [user]);

  // View full submission detail
  const handleViewSubmission = async (subId) => {
    setIsLoadingDetail(true);
    try {
      const res = await api.get(`/code/submissions/${subId}`);
      setSelectedSubmissionDetail(res.data?.data || null);
    } catch (err) {
      console.error('Failed to load submission details:', err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Load previous submission code into Monaco editor
  const handleLoadSubmissionCode = (submission) => {
    if (!submission?.code) return;
    if (submission.language && ['cpp', 'java', 'javascript'].includes(submission.language)) {
      setLanguage(submission.language);
    }
    setCode(submission.code);
    const cacheKey = `${submission.questionId}_${submission.language}`;
    setCodeCache((prev) => ({ ...prev, [cacheKey]: submission.code }));
    setSelectedSubmissionDetail(null);
    setCodeLoadedToast(true);
    setTimeout(() => setCodeLoadedToast(false), 3000);
  };

  const getSubmissionStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
      case 'Wrong Answer':
        return 'text-rose-400 bg-rose-500/15 border-rose-500/30';
      case 'Compilation Error':
        return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
      case 'Runtime Error':
        return 'text-rose-400 bg-rose-500/15 border-rose-500/30';
      case 'Time Limit Exceeded':
        return 'text-orange-400 bg-orange-500/15 border-orange-500/30';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  // Filtered Questions for Explorer List
  const filteredQuestions = useMemo(() => {
    return DSA_QUESTIONS.filter((item) => {
      // Search query (matches number, title, category, or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesNum = String(item.number).includes(query);
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesTag = item.topicTags.some((t) => t.toLowerCase().includes(query));
        if (!matchesNum && !matchesTitle && !matchesCat && !matchesTag) {
          return false;
        }
      }

      // Difficulty filter
      if (difficultyFilter !== 'All' && item.difficulty !== difficultyFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      // Solved filter
      if (statusFilter === 'Solved' && !solvedProblemIds.has(item.id)) {
        return false;
      }
      if (statusFilter === 'Unsolved' && solvedProblemIds.has(item.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, difficultyFilter, categoryFilter, statusFilter, solvedProblemIds]);

  // Total pages and Paginated Questions for Explorer
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE));
  const paginatedQuestions = useMemo(() => {
    const start = (explorerPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredQuestions, explorerPage, ITEMS_PER_PAGE]);

  // Solved Stats
  const solvedCount = solvedProblemIds.size;
  const totalCount = DSA_QUESTIONS.length;
  const solvedPercentage = Math.round((solvedCount / totalCount) * 100);

  // Difficulty badge styling helper
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-4.25rem)] bg-slate-950 text-slate-100 ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : ''}`}>
      {/* Top Navigation & Action Bar */}
      <header className="h-12 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 flex items-center justify-between shrink-0 select-none">
        {/* Left: Problem Explorer Toggle & Quick Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExplorerOpen(!isExplorerOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors shadow-sm"
          >
            <ListFilter className="w-4 h-4 text-violet-400" />
            <span className="hidden sm:inline">Problem List</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">
              {solvedCount}/{totalCount}
            </span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Quick Prev / Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevProblem}
              disabled={currentIndex <= 0}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Problem"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-semibold text-slate-200 px-1 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              #{currentProblem.number}. {currentProblem.title}
            </span>
            <button
              onClick={handleNextProblem}
              disabled={currentIndex >= DSA_QUESTIONS.length - 1}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Problem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRandomProblem}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors ml-1 hidden md:block"
            title="Pick Random Problem"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Language Selector, Editor Controls & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Language Selector: C++, Java, JavaScript ONLY */}
          <div className="relative">
            <select
              value={language}
              disabled={isRunning || isSubmitting}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-md border border-slate-700 pl-2.5 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer disabled:opacity-50"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} ({lang.badge})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Font Size Selector */}
          <div className="relative hidden sm:block">
            <select
              value={fontSize}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value, 10))}
              className="appearance-none bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono rounded-md border border-slate-700 pl-2 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
              title="Editor Font Size"
            >
              {FONT_SIZES.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}px
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Copy Code Button */}
          <button
            onClick={handleCopyCode}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-transparent hover:border-slate-700"
            title={copied ? 'Code Copied!' : 'Copy Code'}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Reset Code Button */}
          <button
            onClick={handleResetCode}
            disabled={isRunning || isSubmitting}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-transparent hover:border-slate-700 disabled:opacity-40"
            title="Reset code to default starter template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-transparent hover:border-slate-700 hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Run Code Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="h-8 px-3 text-xs font-mono bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            )}
            {isRunning ? 'Running...' : 'Run'}
          </Button>

          {/* Submit Code Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="h-8 px-3.5 text-xs font-mono bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 mr-1.5" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </header>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Slide-out Question Explorer Drawer */}
        {isExplorerOpen && (
          <div className="absolute inset-y-0 left-0 z-40 w-full sm:w-[480px] bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col animate-fade-in">
            {/* Explorer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  <span>DSA Problem Explorer</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Solved <strong className="text-emerald-400">{solvedCount}</strong> of {totalCount} problems ({solvedPercentage}%)
                </p>
              </div>
              <button
                onClick={() => setIsExplorerOpen(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="Close Explorer"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1 transition-all duration-300"
                style={{ width: `${solvedPercentage}%` }}
              />
            </div>

            {/* Search & Filters Toolbar */}
            <div className="p-3 border-b border-slate-800 space-y-2.5 bg-slate-900/50 shrink-0">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by question number, title, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Filter Pills & Selectors */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  {/* Category Dropdown */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-violet-500 cursor-pointer max-w-[200px] truncate"
                    title="Filter by DSA Category"
                  >
                    {DSA_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? 'All Categories (12)' : cat}
                      </option>
                    ))}
                  </select>

                  {/* Difficulty Pills */}
                  <div className="flex rounded border border-slate-800 bg-slate-950 p-0.5">
                    {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          difficultyFilter === diff
                            ? 'bg-violet-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>

                  {/* Status Toggle */}
                  <div className="flex rounded border border-slate-800 bg-slate-950 p-0.5">
                    {['All', 'Solved', 'Unsolved'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          statusFilter === st
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter info & Clear Filters Option */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span>
                    Found <strong className="text-slate-200">{filteredQuestions.length}</strong> matching questions
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors"
                      title="Reset all active search and filter criteria"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear All Filters</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
              {filteredQuestions.length === 0 ? (
                /* Clean Empty State */
                <div className="py-14 px-4 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">No matching questions found</h4>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      No problems match your search criteria with the selected filters.
                    </p>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Paginated Question Cards */
                paginatedQuestions.map((q) => {
                  const isCurrent = q.id === currentProblem.id;
                  const isSolved = solvedProblemIds.has(q.id);

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectProblem(q)}
                      className={`w-full text-left p-3 rounded-lg flex flex-col gap-1.5 transition-all duration-150 border ${
                        isCurrent
                          ? 'bg-violet-950/60 border-violet-600/90 text-violet-100 shadow-md ring-1 ring-violet-500/50'
                          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {/* Top Row: Solved indicator, Number, Title, Difficulty Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {isSolved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" title="Solved" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" title="Unsolved" />
                          )}
                          <span className="font-mono text-xs text-slate-400 shrink-0">#{q.number}</span>
                          <span className={`font-semibold text-xs truncate ${isCurrent ? 'text-violet-100' : 'text-slate-200'}`}>
                            {q.title}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${getDifficultyBadge(
                            q.difficulty
                          )}`}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      {/* Bottom Row: Category & Topic Tags */}
                      <div className="flex items-center gap-1.5 overflow-hidden pl-6">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/60 shrink-0">
                          {q.category}
                        </span>
                        {q.topicTags && q.topicTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80 truncate shrink-0"
                          >
                            #{tag}
                          </span>
                        ))}
                        {q.topicTags && q.topicTags.length > 3 && (
                          <span className="text-[10px] text-slate-500 shrink-0">
                            +{q.topicTags.length - 3}
                          </span>
                        )}
                        {isCurrent && (
                          <span className="ml-auto text-[10px] font-mono text-violet-400 font-semibold tracking-wider uppercase shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Pagination Controls */}
            {filteredQuestions.length > ITEMS_PER_PAGE && (
              <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400 shrink-0 select-none">
                <div className="text-[11px]">
                  Showing <strong className="text-slate-200">{(explorerPage - 1) * ITEMS_PER_PAGE + 1}</strong>-
                  <strong className="text-slate-200">
                    {Math.min(explorerPage * ITEMS_PER_PAGE, filteredQuestions.length)}
                  </strong> of <strong className="text-slate-200">{filteredQuestions.length}</strong>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setExplorerPage(1)}
                    disabled={explorerPage === 1}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-[11px] transition-colors border border-slate-700/50"
                    title="First Page"
                  >
                    «
                  </button>
                  <button
                    onClick={() => setExplorerPage((p) => Math.max(1, p - 1))}
                    disabled={explorerPage === 1}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-[11px] transition-colors border border-slate-700/50"
                    title="Previous Page"
                  >
                    ‹
                  </button>

                  <span className="px-2 py-1 text-[11px] font-mono text-slate-300">
                    {explorerPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setExplorerPage((p) => Math.min(totalPages, p + 1))}
                    disabled={explorerPage === totalPages}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-[11px] transition-colors border border-slate-700/50"
                    title="Next Page"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setExplorerPage(totalPages)}
                    disabled={explorerPage === totalPages}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-[11px] transition-colors border border-slate-700/50"
                    title="Last Page"
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Left Column: Problem Description, Testcases, Hints & Editorial */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-900/30 overflow-hidden min-h-[300px]">
          {/* Problem Tabs Header */}
          <div className="h-10 border-b border-slate-800 bg-slate-900/70 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none overflow-x-auto">
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-t text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'description'
                    ? 'border-violet-500 text-violet-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Description</span>
              </button>
              <button
                onClick={() => setActiveTab('testcases')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-t text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'testcases'
                    ? 'border-violet-500 text-violet-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Test Cases ({currentProblem.testCases.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('hints')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-t text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'hints'
                    ? 'border-violet-500 text-violet-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hints{currentProblem.hints?.length ? ` (${currentProblem.hints.length})` : ''}</span>
              </button>
              <button
                onClick={() => setActiveTab('editorial')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-t text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'editorial'
                    ? 'border-violet-500 text-violet-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Editorial</span>
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-t text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'submissions'
                    ? 'border-violet-500 text-violet-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Submissions{submissions.length > 0 && activeTab === 'submissions' ? ` (${submissions.length})` : ''}</span>
              </button>
            </div>

            {solvedProblemIds.has(currentProblem.id) && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 ml-2">
                <Check className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>

          {/* Left Panel Content Body (Scrollable independently) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {activeTab === 'description' && (
              <>
                {/* Title and Metadata */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-xl font-bold text-slate-100">
                      {currentProblem.number}. {currentProblem.title}
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getDifficultyBadge(
                        currentProblem.difficulty
                      )}`}
                    >
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
                      {currentProblem.category}
                    </span>
                    {currentProblem.topicTags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="text-sm leading-relaxed text-slate-300 space-y-3 whitespace-pre-line">
                  {currentProblem.problemStatement}
                </div>

                {/* Visual Diagram if available (Graphs, Trees, Linked Lists) */}
                {currentProblem.diagram && (
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Visual Structure Diagram</span>
                    </div>
                    <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                      {currentProblem.diagram}
                    </pre>
                  </div>
                )}

                {/* Examples */}
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Examples</div>
                  {currentProblem.examples.map((ex, idx) => (
                    <div key={idx} className="bg-slate-950/70 rounded-lg p-3.5 border border-slate-800/80 space-y-2 text-xs">
                      <div className="font-semibold text-slate-300">Example {idx + 1}:</div>
                      <div className="font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/60 space-y-1">
                        <div>
                          <span className="text-slate-500 select-none">Input: </span>
                          <span className="text-amber-300">{ex.input}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 select-none">Output: </span>
                          <span className="text-emerald-300">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-slate-400 pt-1 border-t border-slate-800/60 font-sans">
                            <span className="text-slate-500 font-semibold select-none">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Constraints</div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                    {currentProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Hints Accordion Section */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hints</span>
                    </span>
                    {currentProblem.hints && currentProblem.hints.length > 0 && (
                      <span className="text-[10px] text-slate-500 font-sans">Click to reveal step-by-step</span>
                    )}
                  </div>

                  {currentProblem.hints && currentProblem.hints.length > 0 ? (
                    <div className="space-y-2">
                      {currentProblem.hints.map((hint, idx) => {
                        const isRevealed = revealedHints.has(idx);
                        return (
                          <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/70 overflow-hidden text-xs">
                            <button
                              onClick={() => {
                                setRevealedHints((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(idx)) next.delete(idx);
                                  else next.add(idx);
                                  return next;
                                });
                              }}
                              className="w-full p-2.5 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors"
                            >
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <Lightbulb className={`w-3.5 h-3.5 ${isRevealed ? 'text-amber-400' : 'text-slate-500'}`} />
                                <span>Hint {idx + 1}</span>
                              </span>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                                <span>{isRevealed ? 'Hide Hint' : 'Click to Reveal'}</span>
                              </span>
                            </button>
                            {isRevealed && (
                              <div className="p-3 bg-slate-900/40 border-t border-slate-800/80 text-slate-300 text-xs leading-relaxed font-sans">
                                {hint}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60 text-xs text-slate-400 italic flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>No pre-authored hints for this problem. Break down the problem using the sample cases and constraints!</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Test Cases Tab */}
            {activeTab === 'testcases' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-200">
                    Built-in Verification Test Cases ({currentProblem.testCases.length})
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {(currentProblem.testCases.filter(t => !t.isHidden)).length} Sample / {(currentProblem.testCases.filter(t => t.isHidden)).length} Hidden
                  </span>
                </div>

                <div className="space-y-3">
                  {currentProblem.testCases.map((tc, idx) => (
                    <div key={tc.id || idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-[11px] font-sans">
                        <span className="text-slate-300 font-semibold">{tc.name || `Case ${idx + 1}`}</span>
                        {tc.isHidden ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-violet-500/15 text-violet-300 border border-violet-500/30">
                            Hidden Test Case
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Sample Test Case
                          </span>
                        )}
                      </div>

                      {tc.input && (
                        <div>
                          <span className="text-slate-500 select-none block text-[11px]">Input: </span>
                          <pre className="bg-slate-900/80 p-2 rounded border border-slate-800/80 text-amber-300 mt-0.5 overflow-x-auto">
                            {tc.input}
                          </pre>
                        </div>
                      )}

                      <div>
                        <span className="text-slate-500 select-none block text-[11px]">Expected Output: </span>
                        <pre className="bg-slate-900/80 p-2 rounded border border-slate-800/80 text-emerald-300 mt-0.5 overflow-x-auto">
                          {tc.expectedOutput}
                        </pre>
                      </div>

                      {tc.isHidden && (
                        <p className="text-[11px] text-slate-500 font-sans italic pt-1">
                          Evaluated during full submission to verify edge conditions and prevent hardcoding.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hints Tab */}
            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Gradual Hints</span>
                  </div>
                  {currentProblem.hints && currentProblem.hints.length > 0 && (
                    <span className="text-[11px] text-slate-400">
                      Revealed {revealedHints.size} of {currentProblem.hints.length}
                    </span>
                  )}
                </div>

                {currentProblem.hints && currentProblem.hints.length > 0 ? (
                  <div className="space-y-3">
                    {currentProblem.hints.map((hint, idx) => {
                      const isRevealed = revealedHints.has(idx);
                      return (
                        <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden text-xs">
                          <button
                            onClick={() => {
                              setRevealedHints((prev) => {
                                const next = new Set(prev);
                                if (next.has(idx)) next.delete(idx);
                                else next.add(idx);
                                return next;
                              });
                            }}
                            className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors"
                          >
                            <span className="font-semibold text-slate-200 flex items-center gap-2">
                              <Lightbulb className={`w-4 h-4 ${isRevealed ? 'text-amber-400' : 'text-slate-500'}`} />
                              <span>Hint {idx + 1}</span>
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1.5">
                              {isRevealed ? (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                                  <span className="text-amber-400">Hide Hint</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Click to Reveal</span>
                                </>
                              )}
                            </span>
                          </button>
                          {isRevealed && (
                            <div className="p-3.5 bg-slate-900/40 border-t border-slate-800 text-slate-300 leading-relaxed font-sans text-xs">
                              {hint}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-300 font-medium">No hints available for this problem yet</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Work through the examples, test cases, and constraints to deduce the optimal algorithm.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Editorial / Solution Tab */}
            {activeTab === 'editorial' && (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-violet-400" />
                  <span>Editorial & Solution Approach</span>
                </div>

                {currentProblem.editorial || currentProblem.solution ? (
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300 font-sans">
                    {currentProblem.editorial?.intuition && (
                      <div>
                        <h4 className="font-semibold text-slate-100 text-xs mb-1">Intuition</h4>
                        <p>{currentProblem.editorial.intuition}</p>
                      </div>
                    )}
                    {currentProblem.editorial?.approach && (
                      <div>
                        <h4 className="font-semibold text-slate-100 text-xs mb-1">Approach</h4>
                        <p>{currentProblem.editorial.approach}</p>
                      </div>
                    )}
                    {currentProblem.editorial?.complexity && (
                      <div className="pt-2 border-t border-slate-800/80 font-mono text-[11px] text-slate-400">
                        <span>Complexity: {currentProblem.editorial.complexity}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-2">
                    <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-300 font-medium">Official editorial is not yet published</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Formulate your algorithm, run your code against sample cases, and submit to check all test cases!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Submissions History & Real Results Tab */}
            {activeTab === 'submissions' && (
              <div className="space-y-4">
                {/* Real Database Statistics Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-center select-none shadow-sm">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Submissions</span>
                    <span className="text-base font-bold text-slate-100 font-mono">
                      {submissionStats?.totalSubmissions || 0}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Accepted</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      {submissionStats?.acceptedSubmissions || 0}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Accuracy</span>
                    <span className="text-base font-bold text-amber-400 font-mono">
                      {submissionStats?.acceptanceRate || 0}%
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Solved</span>
                    <span className="text-base font-bold text-violet-400 font-mono">
                      {submissionStats?.uniqueProblemsSolved || 0}
                    </span>
                  </div>
                </div>

                {/* Submissions Filter Toolbar */}
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2.5 text-xs">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    {/* Scope: Current Problem vs All */}
                    <div className="flex rounded border border-slate-800 bg-slate-900 p-0.5">
                      <button
                        onClick={() => setSubmissionFilterQuestion('current')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          submissionFilterQuestion === 'current'
                            ? 'bg-violet-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        This Problem (#{currentProblem.number})
                      </button>
                      <button
                        onClick={() => setSubmissionFilterQuestion('all')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          submissionFilterQuestion === 'all'
                            ? 'bg-violet-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        All Problems
                      </button>
                    </div>

                    <button
                      onClick={fetchSubmissions}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors ml-auto border border-slate-800"
                      title="Refresh Submissions"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isLoadingSubmissions ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Language Filter */}
                    <select
                      value={submissionFilterLanguage}
                      onChange={(e) => setSubmissionFilterLanguage(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-violet-500 cursor-pointer"
                    >
                      <option value="All">All Languages</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                      <option value="javascript">JavaScript</option>
                    </select>

                    {/* Status Filter */}
                    <select
                      value={submissionFilterStatus}
                      onChange={(e) => setSubmissionFilterStatus(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-violet-500 cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Wrong Answer">Wrong Answer</option>
                      <option value="Compilation Error">Compilation Error</option>
                      <option value="Runtime Error">Runtime Error</option>
                      <option value="Time Limit Exceeded">Time Limit Exceeded</option>
                    </select>
                  </div>
                </div>

                {/* Submissions List */}
                {isLoadingSubmissions ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
                    <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                    <span className="text-xs">Loading submission records...</span>
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="py-12 px-4 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-2">
                    <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-300 font-medium">No submission records found</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {submissionFilterQuestion === 'current'
                        ? 'You have not submitted a solution for this problem yet. Write code and click "Submit" to record a genuine attempt!'
                        : 'No submissions match your active filter criteria.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {submissions.map((sub) => (
                      <div
                        key={sub._id || sub.id}
                        className="p-3.5 bg-slate-950 border border-slate-800/90 rounded-lg flex flex-col gap-2 hover:border-slate-700 transition-all text-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getSubmissionStatusBadge(
                                sub.status
                              )}`}
                            >
                              {sub.status}
                            </span>
                            <span className="font-mono text-slate-400 uppercase text-[11px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                              {sub.language === 'cpp' ? 'C++' : sub.language === 'java' ? 'Java' : 'JavaScript'}
                            </span>
                          </div>

                          <span className="text-[11px] text-slate-500">
                            {new Date(sub.submittedAt || sub.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        {submissionFilterQuestion === 'all' && (
                          <div className="font-medium text-slate-300 truncate">
                            #{sub.questionNumber}. {sub.questionTitle}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-slate-400 text-[11px] font-mono">
                          <div className="flex items-center gap-3">
                            <span>Passed: {sub.passedTestCases}/{sub.totalTestCases} ({sub.score}%)</span>
                            {sub.runtimeMs != null && <span>Runtime: {sub.runtimeMs}ms</span>}
                          </div>

                          <button
                            onClick={() => handleViewSubmission(sub._id || sub.id)}
                            className="flex items-center gap-1 text-violet-400 hover:text-violet-300 font-sans font-medium transition-colors"
                          >
                            <span>View Details & Code</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submission Details Modal Drawer */}
          {selectedSubmissionDetail && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${getSubmissionStatusBadge(
                        selectedSubmissionDetail.status
                      )}`}
                    >
                      {selectedSubmissionDetail.status}
                    </span>
                    <h3 className="font-semibold text-slate-100 text-sm truncate">
                      #{selectedSubmissionDetail.questionNumber}. {selectedSubmissionDetail.questionTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedSubmissionDetail(null)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-sans">
                  {/* Summary row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex items-center gap-3 font-mono">
                      <span>
                        Language:{' '}
                        <strong className="text-violet-300 uppercase">
                          {selectedSubmissionDetail.language}
                        </strong>
                      </span>
                      <span>
                        Score:{' '}
                        <strong className="text-emerald-400">
                          {selectedSubmissionDetail.score}%
                        </strong>
                      </span>
                      <span>
                        Runtime:{' '}
                        <strong className="text-slate-200">
                          {selectedSubmissionDetail.runtimeMs}ms
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleLoadSubmissionCode(selectedSubmissionDetail)}
                        className="h-7 text-xs bg-violet-600 hover:bg-violet-500 font-sans"
                      >
                        Load Code into Editor
                      </Button>
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(selectedSubmissionDetail.code);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-300 border border-slate-700"
                        title="Copy Submitted Code"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submitted Code Block */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Submitted Code</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {selectedSubmissionDetail.language}
                      </span>
                    </div>
                    <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto max-h-56 leading-relaxed">
                      {selectedSubmissionDetail.code}
                    </pre>
                  </div>

                  {/* Compiler / Runtime Error Diagnostics if present */}
                  {selectedSubmissionDetail.error && (
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Diagnostics / Error Trace</span>
                      </div>
                      <pre className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto whitespace-pre-wrap">
                        {selectedSubmissionDetail.error}
                      </pre>
                    </div>
                  )}

                  {/* Test Cases Results */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Test Case Verification Results ({selectedSubmissionDetail.testCases?.length || 0})
                    </div>

                    <div className="space-y-2">
                      {(selectedSubmissionDetail.testCases || []).map((tc, idx) => (
                        <div
                          key={tc.id || idx}
                          className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5 font-mono text-xs"
                        >
                          <div className="flex items-center justify-between font-sans">
                            <span className="font-semibold text-slate-300">
                              {tc.name || `Case ${idx + 1}`}
                            </span>
                            <div className="flex items-center gap-2">
                              {tc.runtimeMs != null && (
                                <span className="text-[11px] text-slate-500">{tc.runtimeMs}ms</span>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  tc.passed
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {tc.passed ? 'Passed' : 'Failed'}
                              </span>
                            </div>
                          </div>

                          {tc.input && (
                            <div>
                              <span className="text-slate-500 select-none block text-[11px]">Input</span>
                              <pre className="bg-slate-900/60 p-1.5 rounded border border-slate-800/80 text-amber-300 mt-0.5">
                                {tc.input}
                              </pre>
                            </div>
                          )}

                          <div>
                            <span className="text-slate-500 select-none block text-[11px]">Actual Output</span>
                            <pre className={`bg-slate-900/60 p-1.5 rounded border border-slate-800/80 mt-0.5 ${
                              tc.passed ? 'text-slate-200' : 'text-rose-300'
                            }`}>
                              {tc.actual || '(empty)'}
                            </pre>
                          </div>

                          <div>
                            <span className="text-slate-500 select-none block text-[11px]">Expected Output</span>
                            <pre className="bg-slate-900/60 p-1.5 rounded border border-slate-800/80 text-emerald-300 mt-0.5">
                              {tc.expected}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Toast Notification when Code is Loaded into Editor */}
          {codeLoadedToast && (
            <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>Submission code loaded into Monaco editor!</span>
            </div>
          )}

          {/* Problem Panel Footer Navigation (Previous / Next Problem Stepper) */}
          <div className="h-11 px-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between shrink-0 text-xs select-none">
            <button
              onClick={handlePrevProblem}
              disabled={currentIndex <= 0}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-700/60"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="text-slate-400 font-mono text-[11px]">
              Question <strong className="text-slate-200">{currentIndex + 1}</strong> of {DSA_QUESTIONS.length}
            </span>
            <button
              onClick={handleNextProblem}
              disabled={currentIndex >= DSA_QUESTIONS.length - 1}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-700/60"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Console */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-950 overflow-hidden min-h-[400px]">
          {/* Monaco Editor Container */}
          <div className="flex-1 relative min-h-[220px]">
            <Editor
              height="100%"
              language={SUPPORTED_LANGUAGES.find((l) => l.id === language)?.monacoLang || 'javascript'}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
                tabSize: 4,
                lineNumbers: 'on',
                renderWhitespace: 'none',
                formatOnPaste: true
              }}
            />
          </div>

          {/* Bottom Execution & Terminal Drawer */}
          <div
            className={`border-t border-slate-800 bg-slate-900/95 flex flex-col shrink-0 transition-all duration-200 ${
              isConsoleCollapsed ? 'h-9' : 'h-64'
            }`}
          >
            {/* Console Tabs Header */}
            <div className="h-9 px-3 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setConsoleTab('testResult');
                    if (isConsoleCollapsed) setIsConsoleCollapsed(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
                    consoleTab === 'testResult'
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test Result</span>
                </button>
                <button
                  onClick={() => {
                    setConsoleTab('console');
                    if (isConsoleCollapsed) setIsConsoleCollapsed(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
                    consoleTab === 'console'
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Console Output</span>
                </button>
              </div>

              {/* Status Indicator & Collapse Toggle */}
              <div className="flex items-center gap-2.5">
                {resultData && !isRunning && !isSubmitting && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold font-mono ${
                        resultData.passed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {resultType === 'run'
                        ? resultData.passed
                          ? 'Sample Cases Passed'
                          : 'Sample Cases Failed'
                        : resultData.passed
                        ? 'Accepted'
                        : 'Wrong Answer'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      Score: {resultData.score}%
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title={isConsoleCollapsed ? 'Expand Console' : 'Collapse Console'}
                >
                  {isConsoleCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Console Body */}
            {!isConsoleCollapsed && (
              <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950">
                {/* Active Execution Loading Banner */}
                {(isRunning || isSubmitting) && (
                  <div className="mb-3 p-3 rounded-lg bg-violet-950/30 border border-violet-800/40 flex items-center gap-3 text-violet-200 animate-pulse">
                    <Loader2 className="w-4 h-4 text-violet-400 animate-spin shrink-0" />
                    <span>
                      {isRunning
                        ? 'Executing code against sample test cases in isolated sandbox...'
                        : 'Compiling and verifying against all test cases in secure sandbox...'}
                    </span>
                  </div>
                )}

                {consoleTab === 'testResult' ? (
                  /* Test Results View */
                  resultData ? (
                    <div className="space-y-3">
                      {/* Test cases pills */}
                      {resultData.details && Array.isArray(resultData.details) && (
                        <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
                          {resultData.details.map((tc, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveCaseIdx(idx)}
                              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                                activeCaseIdx === idx
                                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  tc.passed ? 'bg-emerald-400' : 'bg-rose-400'
                                }`}
                              />
                              <span>Case {idx + 1}</span>
                              {resultType === 'submit' && idx >= (currentProblem.testCases.filter(t => !t.isHidden).length) && (
                                <span className="text-[10px] text-slate-500 font-sans">(Hidden)</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Active Test Case Detail */}
                      {resultData.details && resultData.details[activeCaseIdx] && (
                        <div className="space-y-2.5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-200 flex items-center gap-2">
                              <span>Case {activeCaseIdx + 1}</span>
                              {resultData.details[activeCaseIdx].passed ? (
                                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  Passed
                                </span>
                              ) : (
                                <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                  Failed
                                </span>
                              )}
                            </span>
                            {resultData.details[activeCaseIdx].runtimeMs != null && (
                              <span className="text-[11px] text-slate-500">
                                Runtime: {resultData.details[activeCaseIdx].runtimeMs}ms
                              </span>
                            )}
                          </div>

                          {/* Error block if any */}
                          {resultData.details[activeCaseIdx].error && (
                            <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300">
                              <span className="text-rose-400 font-semibold block text-[11px] mb-1">Execution / Compiler Error</span>
                              <pre className="whitespace-pre-wrap font-mono text-[11px]">{resultData.details[activeCaseIdx].error}</pre>
                            </div>
                          )}

                          {resultData.details[activeCaseIdx].input && (
                            <div>
                              <span className="text-slate-500 select-none block text-[11px]">Input</span>
                              <pre className="bg-slate-950 p-2 rounded border border-slate-800/80 text-amber-300 mt-0.5 overflow-x-auto">
                                {resultData.details[activeCaseIdx].input}
                              </pre>
                            </div>
                          )}

                          <div>
                            <span className="text-slate-500 select-none block text-[11px]">Actual Output</span>
                            <pre className={`bg-slate-950 p-2 rounded border border-slate-800/80 mt-0.5 overflow-x-auto ${
                              resultData.details[activeCaseIdx].passed ? 'text-slate-200' : 'text-rose-300'
                            }`}>
                              {resultData.details[activeCaseIdx].actual || '(empty output)'}
                            </pre>
                          </div>

                          <div>
                            <span className="text-slate-500 select-none block text-[11px]">Expected Output</span>
                            <pre className="bg-slate-950 p-2 rounded border border-slate-800/80 text-emerald-300 mt-0.5 overflow-x-auto">
                              {resultData.details[activeCaseIdx].expected}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full min-h-[120px] flex flex-col items-center justify-center text-slate-500 italic text-center p-4">
                      <span>Click "Run" to test against sample test cases, or "Submit" to evaluate all cases.</span>
                    </div>
                  )
                ) : (
                  /* Raw Console Output View */
                  <div className="space-y-2">
                    {executionError && (
                      <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-300 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                        <pre className="whitespace-pre-wrap font-mono text-xs">{executionError}</pre>
                      </div>
                    )}

                    {executionOutput ? (
                      <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 font-mono p-2 bg-slate-900/40 rounded border border-slate-800/60">
                        {executionOutput}
                      </pre>
                    ) : (
                      !executionError && (
                        <div className="h-full min-h-[120px] flex items-center justify-center text-slate-500 italic text-center p-4">
                          Click "Run" or "Submit" to compile and execute your code. Terminal stdout and stderr will appear here.
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;

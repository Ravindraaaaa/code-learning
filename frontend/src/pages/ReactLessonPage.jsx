import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { REACT_TOPICS } from '../data/reactTopicsData.js';
import { downloadTopicPdf } from '../utils/pdfGenerator.js';
import { getStudentTopicProgress, completeStudentTopic } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ROUTES } from '../routes/paths.js';
import { LessonHeader } from '../components/learning/LessonHeader.jsx';
import { TopicDrawer } from '../components/learning/TopicDrawer.jsx';
import { TopicNotesView } from '../components/learning/TopicNotesView.jsx';
import { TryItSandbox } from '../components/learning/TryItSandbox.jsx';
import { PracticeChallengesView } from '../components/learning/PracticeChallengesView.jsx';
import { QuizCardView } from '../components/learning/QuizCardView.jsx';
import { VideoTutorialView } from '../components/learning/VideoTutorialView.jsx';
import { LessonFooterNav } from '../components/learning/LessonFooterNav.jsx';
import { Card } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { Layers, CheckCircle2, ListPlus, Trash2, Check, RefreshCw, Send, Terminal } from 'lucide-react';

/**
 * Interactive React Task Manager Demo Component (Featured in Topic 37)
 * Demonstrates state management, filtering, optimistic updates, and simulated REST API calls.
 */
function InteractiveTaskManagerDemo() {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Install Vite & initialize React 18 template', completed: true, priority: 'High' },
    { id: 't2', title: 'Build component tree with props & state', completed: true, priority: 'High' },
    { id: 't3', title: 'Integrate Express REST API with MongoDB', completed: false, priority: 'Medium' },
    { id: 't4', title: 'Deploy static distribution to Vercel/Netlify', completed: false, priority: 'Low' },
  ]);
  const [filter, setFilter] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [apiLogs, setApiLogs] = useState([
    { id: 1, method: 'GET', url: '/api/tasks', status: 200, time: 'Just now' },
  ]);

  const addApiLog = (method, url, status) => {
    setApiLogs((prev) => [
      { id: Date.now(), method, url, status, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ]);
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const task = {
      id: 't' + Date.now(),
      title: newTitle.trim(),
      completed: false,
      priority: newPriority,
    };
    setTasks((prev) => [task, ...prev]);
    setNewTitle('');
    addApiLog('POST', '/api/tasks', 201);
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    addApiLog('PATCH', `/api/tasks/${id}`, 200);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addApiLog('DELETE', `/api/tasks/${id}`, 200);
  };

  return (
    <Card className="rounded-2xl border-cyan-500/30 bg-surface/95 p-6 sm:p-8 shadow-surface-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Live Capstone Mini Project
              </span>
              <Badge variant="primary" className="text-[10px] bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                Interactive Full-Stack Demo
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-content-primary">
              React Task Manager Connected to REST Backend
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-content-muted">
          <span>{tasks.filter((t) => t.completed).length}/{tasks.length} Completed</span>
        </div>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new full-stack task..."
          className="flex-1 rounded-xl bg-surface-elevated/70 border border-border-subtle px-4 py-2.5 text-sm text-content-primary focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="rounded-xl bg-surface-elevated/70 border border-border-subtle px-3 py-2.5 text-xs text-content-secondary font-mono focus:outline-none"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <Button
          type="submit"
          variant="primary"
          className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs py-2.5 px-4 flex items-center justify-center gap-1.5"
        >
          <ListPlus className="w-4 h-4" />
          <span>Add Task</span>
        </Button>
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1 bg-surface-elevated/60 p-1 rounded-xl border border-border-subtle text-xs">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-content-muted hover:text-content-primary'
              }`}
            >
              {f} ({f === 'all' ? tasks.length : f === 'active' ? tasks.filter((t) => !t.completed).length : tasks.filter((t) => t.completed).length})
            </button>
          ))}
        </div>
      </div>

      {/* Task Items List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-xs text-content-muted font-mono border border-dashed border-border-subtle rounded-xl">
            No tasks found matching filter "{filter}".
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                t.completed
                  ? 'bg-surface-elevated/30 border-border-subtle/50 opacity-70'
                  : 'bg-surface-elevated/70 border-border-subtle hover:border-cyan-500/30'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggle(t.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    t.completed
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-border-subtle hover:border-cyan-400 bg-surface'
                  }`}
                >
                  {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-sm truncate ${
                    t.completed ? 'line-through text-content-muted' : 'text-content-primary font-medium'
                  }`}
                >
                  {t.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    t.priority === 'High'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                      : t.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : 'bg-slate-500/10 text-slate-300 border-slate-500/20'
                  }`}
                >
                  {t.priority}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="p-1 text-content-muted hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Backend API Console Logs */}
      <div className="p-4 rounded-xl bg-black/70 border border-border-subtle space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>Simulated Express/MongoDB REST Traffic:</span>
        </div>
        <div className="space-y-1 font-mono text-[11px]">
          {apiLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between text-content-secondary">
              <span className="flex items-center gap-2">
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  log.method === 'GET' ? 'bg-blue-500/20 text-blue-300' :
                  log.method === 'POST' ? 'bg-emerald-500/20 text-emerald-300' :
                  log.method === 'PATCH' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-rose-500/20 text-rose-300'
                }`}>
                  {log.method}
                </span>
                <span className="text-content-primary">{log.url}</span>
              </span>
              <span className="text-emerald-400 font-bold">{log.status} OK</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export const ReactLessonPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [completedTopicSlugs, setCompletedTopicSlugs] = useState([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionSuccess, setCompletionSuccess] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const activeTopic = REACT_TOPICS[activeTopicIndex] || REACT_TOPICS[0];

  // Load authenticated progress from backend
  const loadProgress = useCallback(async () => {
    setIsLoadingProgress(true);
    setActionError(null);
    try {
      const res = await getStudentTopicProgress();
      if (res && res.success && res.data) {
        setCompletedTopicSlugs(res.data.completedTopics || []);
      }
    } catch {
      setCompletedTopicSlugs([]);
    } finally {
      setIsLoadingProgress(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Handle URL topic parameter sync
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam) {
      const idx = REACT_TOPICS.findIndex((t) => t.slug === topicParam || t.id === topicParam);
      if (idx !== -1 && idx !== activeTopicIndex) {
        setActiveTopicIndex(idx);
      }
    }
  }, [searchParams]);

  const selectTopic = (idx) => {
    setActiveTopicIndex(idx);
    setSearchParams({ topic: REACT_TOPICS[idx].slug });
    setCompletionSuccess(false);
    setActionError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleMarkCompleted = async () => {
    if (!user) {
      setActionError('Sign in to record and save your topic progress.');
      setTimeout(() => setActionError(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setActionError(null);
    try {
      const res = await completeStudentTopic({
        topicSlug: activeTopic.slug,
        topicTitle: activeTopic.title,
        moduleSlug: 'react',
      });

      if (res && res.success) {
        if (!completedTopicSlugs.includes(activeTopic.slug)) {
          setCompletedTopicSlugs((prev) => [...prev, activeTopic.slug]);
        }
        setCompletionSuccess(true);
        setTimeout(() => setCompletionSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to record topic completion:', err);
      setActionError('Could not save progress. Please check your connection.');
      setTimeout(() => setActionError(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = () => {
    downloadTopicPdf(activeTopic, 'React.js Complete Curriculum');
  };

  const handlePrint = () => {
    window.print();
  };

  // Accurate topic count filtered to React module
  const completedCount = REACT_TOPICS.filter((t) => completedTopicSlugs.includes(t.slug)).length;
  const progressPercent = Math.round((completedCount / REACT_TOPICS.length) * 100);
  const isCurrentCompleted = completedTopicSlugs.includes(activeTopic.slug);

  const isCapstone = activeTopic.slug === 'capstone-task-manager';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header Navigation Bar */}
      <LessonHeader
        moduleSlug="react"
        moduleTitle="React.js Complete Curriculum"
        trackName="Web Development Track"
        subtitle="36 Core Topics + Capstone Mini Project • Structured Notes • Try It Yourself • Practice • Quizzes"
        progressPercent={progressPercent}
        completedCount={completedCount}
        totalCount={REACT_TOPICS.length}
        onNavigateBack={() => navigate(ROUTES.LEARN)}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
      />

      {/* Action Error Notification */}
      {actionError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm font-medium flex items-center justify-between">
          <span>{actionError}</span>
          <button onClick={() => setActionError(null)} className="text-xs underline hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Two-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Topics Checklist Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <TopicDrawer
            topics={REACT_TOPICS}
            activeTopicIndex={activeTopicIndex}
            completedTopicSlugs={completedTopicSlugs}
            onSelectTopic={selectTopic}
          />
        </div>

        {/* Right Column: Topic Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Capstone Live Interactive Demo if viewing Topic 37 */}
          {isCapstone && <InteractiveTaskManagerDemo />}

          {/* Section A: Structured Topic Notes */}
          <TopicNotesView
            topic={activeTopic}
            totalTopicsCount={REACT_TOPICS.length}
            isCompleted={isCurrentCompleted}
            copiedCodeId={copiedCodeId}
            onCopyCode={handleCopyCode}
            onDownloadPdf={handleDownloadPdf}
            accentColor="cyan"
          />

          {/* Section B: Try It Yourself Live Sandbox */}
          {activeTopic.tryItYourself && (
            <TryItSandbox
              tryItYourself={activeTopic.tryItYourself}
              moduleSlug="react"
            />
          )}

          {/* Section C: Practice Challenges (Easy, Medium, Challenge) */}
          {activeTopic.practiceQuestions && activeTopic.practiceQuestions.length > 0 && (
            <PracticeChallengesView
              practiceQuestions={activeTopic.practiceQuestions}
              isCurrentCompleted={isCurrentCompleted}
              isSubmitting={isSubmitting}
              completionSuccess={completionSuccess}
              onMarkCompleted={handleMarkCompleted}
              moduleSlug="react"
            />
          )}

          {/* Section D: Interactive Topic Quiz */}
          {activeTopic.quiz && activeTopic.quiz.length > 0 && (
            <QuizCardView quizList={activeTopic.quiz} />
          )}

          {/* Section E: Verified YouTube Video Tutorial */}
          {activeTopic.video && <VideoTutorialView video={activeTopic.video} />}

          {/* Bottom Footer Navigation */}
          <LessonFooterNav
            activeTopicIndex={activeTopicIndex}
            totalTopicsCount={REACT_TOPICS.length}
            onPreviousTopic={() => selectTopic(Math.max(0, activeTopicIndex - 1))}
            onNextTopic={() => selectTopic(activeTopicIndex + 1)}
            onCompleteModule={() => navigate(ROUTES.LEARN)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReactLessonPage;


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JAVASCRIPT_TOPICS } from '../data/javascriptTopicsData.js';
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

export const JavascriptLessonPage = () => {
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

  const activeTopic = JAVASCRIPT_TOPICS[activeTopicIndex] || JAVASCRIPT_TOPICS[0];

  // Load authentic progress from authenticated backend
  const loadProgress = useCallback(async () => {
    setIsLoadingProgress(true);
    setActionError(null);
    try {
      const res = await getStudentTopicProgress();
      if (res && res.success && res.data) {
        setCompletedTopicSlugs(res.data.completedTopics || []);
      }
    } catch {
      // Non-blocking fallback if guest or offline
      setCompletedTopicSlugs([]);
    } finally {
      setIsLoadingProgress(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Sync with URL topic parameter
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam) {
      const idx = JAVASCRIPT_TOPICS.findIndex(
        (t) => t.slug === topicParam || t.id === topicParam
      );
      if (idx !== -1 && idx !== activeTopicIndex) {
        setActiveTopicIndex(idx);
      }
    }
  }, [searchParams]);

  const selectTopic = (idx) => {
    setActiveTopicIndex(idx);
    setSearchParams({ topic: JAVASCRIPT_TOPICS[idx].slug });
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
        moduleSlug: 'javascript',
      });

      if (res && res.success) {
        if (!completedTopicSlugs.includes(activeTopic.slug)) {
          setCompletedTopicSlugs((prev) => [...prev, activeTopic.slug]);
        }
        setCompletionSuccess(true);
        setTimeout(() => setCompletionSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to record JavaScript topic completion:', err);
      setActionError('Could not save progress. Please check your connection.');
      setTimeout(() => setActionError(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = () => {
    downloadTopicPdf(activeTopic, 'JavaScript Core & Modern ES6+');
  };

  const handlePrint = () => {
    window.print();
  };

  // Accurate topic count filtered strictly to JavaScript module
  const completedCount = JAVASCRIPT_TOPICS.filter((t) =>
    completedTopicSlugs.includes(t.slug)
  ).length;
  const progressPercent = Math.round((completedCount / JAVASCRIPT_TOPICS.length) * 100);
  const isCurrentCompleted = completedTopicSlugs.includes(activeTopic.slug);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header Navigation Bar */}
      <LessonHeader
        moduleSlug="javascript"
        moduleTitle="JavaScript Core & Modern ES6+ Engine"
        trackName="Web Development Track"
        subtitle="16 Comprehensive Topics • Structured Notes • Real Execution • Practice Challenges • Quizzes"
        progressPercent={progressPercent}
        completedCount={completedCount}
        totalCount={JAVASCRIPT_TOPICS.length}
        onNavigateBack={() => navigate(ROUTES.LEARN)}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
      />

      {/* Action Error Notification */}
      {actionError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center justify-between gap-3 animate-fade-in">
          <span>{actionError}</span>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="text-xs font-semibold text-rose-400 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Two-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Topics Checklist Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <TopicDrawer
            topics={JAVASCRIPT_TOPICS}
            activeTopicIndex={activeTopicIndex}
            completedTopicSlugs={completedTopicSlugs}
            onSelectTopic={selectTopic}
          />
        </div>

        {/* Right Column: Topic Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Section A: Structured Topic Notes */}
          <TopicNotesView
            topic={activeTopic}
            totalTopicsCount={JAVASCRIPT_TOPICS.length}
            isCompleted={isCurrentCompleted}
            copiedCodeId={copiedCodeId}
            onCopyCode={handleCopyCode}
            onDownloadPdf={handleDownloadPdf}
            accentColor="amber"
          />

          {/* Section B: Try It Yourself Live Sandbox (Real Execution) */}
          {activeTopic.tryItYourself && (
            <TryItSandbox
              tryItYourself={activeTopic.tryItYourself}
              moduleSlug="javascript"
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
              moduleSlug="javascript"
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
            totalTopicsCount={JAVASCRIPT_TOPICS.length}
            onPreviousTopic={() => selectTopic(Math.max(0, activeTopicIndex - 1))}
            onNextTopic={() => selectTopic(activeTopicIndex + 1)}
            onCompleteModule={() => navigate(ROUTES.LEARN)}
          />
        </div>
      </div>
    </div>
  );
};

export default JavascriptLessonPage;


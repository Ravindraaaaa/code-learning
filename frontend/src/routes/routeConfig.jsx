import React from 'react';
import {
  LayoutDashboard,
  Users,
  Code2,
  GitBranch,
  Layers,
  FileCode,
  HelpCircle,
  Bug,
  CheckSquare,
  Trophy,
  FolderKanban,
  Receipt,
  CreditCard,
  BarChart3,
  Settings,
  BookOpen,
  Medal,
  TrendingUp,
  Bot,
  User,
  Activity
} from 'lucide-react';
import { ROUTES } from './paths.js';
import { RoutePlaceholder } from './RoutePlaceholder.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { ThemePreviewPage } from '../pages/ThemePreviewPage.jsx';
import { Register } from '../pages/Register.jsx';
import { Login } from '../pages/Login.jsx';
import { AdminLogin } from '../pages/AdminLogin.jsx';
import { GoogleCallback } from '../pages/GoogleCallback.jsx';
import { Dashboard } from '../pages/Dashboard.jsx';
import { Learn } from '../pages/Learn.jsx';
import Practice from '../pages/Practice.jsx';
import DebugArena from '../pages/DebugArena.jsx';
import Tests from '../pages/Tests.jsx';
import Competitions from '../pages/Competitions.jsx';
import Leaderboard from '../pages/Leaderboard.jsx';
import Progress from '../pages/Progress.jsx';
import SkillHeatmap from '../pages/SkillHeatmap.jsx';
import AiAssistant from '../pages/AiAssistant.jsx';
import Batches from '../pages/Batches.jsx';
import { AdminDashboard } from '../pages/AdminDashboard.jsx';

/**
 * Reusable Declarative Route Configuration
 * Defines paths, access types, icons, and route elements for Public, Student, and 15 Admin Workspace sections.
 * Adheres strictly to "No fake statistics".
 */
export const routeConfig = [
  // Public Routes
  {
    path: ROUTES.HOME,
    title: 'Platform Foundation',
    type: 'Public',
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    title: 'User Login',
    type: 'Public',
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    title: 'Student Registration',
    type: 'Public',
    element: <Register />,
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    title: 'Admin Authentication',
    type: 'Public',
    element: <AdminLogin />,
  },
  {
    path: ROUTES.GOOGLE_CALLBACK,
    title: 'Google Authentication',
    type: 'Public',
    element: <GoogleCallback />,
  },
  {
    path: ROUTES.THEME_PREVIEW,
    title: 'Theme Preview',
    type: 'Public',
    element: <ThemePreviewPage />,
  },

  // Student Application Protected Routes (12 Navigation Sections)
  {
    path: ROUTES.DASHBOARD,
    title: 'Student Dashboard',
    type: 'Protected',
    element: <Dashboard />,
  },
  {
    path: ROUTES.LEARN,
    title: 'Learn',
    type: 'Protected',
    element: <Learn />,
  },
  {
    path: ROUTES.PRACTICE,
    title: 'Practice',
    type: 'Protected',
    element: <Practice />,
  },
  {
    path: ROUTES.DEBUG_ARENA,
    title: 'Debug Arena',
    type: 'Protected',
    element: <DebugArena />,
  },
  {
    path: ROUTES.TESTS,
    title: 'Tests',
    type: 'Protected',
    element: <Tests />,
  },
  {
    path: ROUTES.COMPETITIONS,
    title: 'Competitions',
    type: 'Protected',
    element: <Competitions />,
  },
  {
    path: ROUTES.LEADERBOARD,
    title: 'Leaderboard',
    type: 'Protected',
    element: <Leaderboard />,
  },
  {
    path: ROUTES.PROGRESS,
    title: 'Progress',
    type: 'Protected',
    element: <Progress />,
  },
  {
    path: ROUTES.SKILL_HEATMAP,
    title: 'Skill Heatmap',
    type: 'Protected',
    element: <SkillHeatmap />,
  },
  {
    path: ROUTES.AI_ASSISTANT,
    title: 'AI Assistant',
    type: 'Protected',
    element: <AiAssistant />,
  },
  {
    path: ROUTES.BATCHES,
    title: 'Batches',
    type: 'Protected',
    element: <Batches />,
  },
  {
    path: ROUTES.PROFILE,
    title: 'Profile',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Student Profile"
        path={ROUTES.PROFILE}
        type="Protected"
        icon={User}
        description="Personal student identity, credentials, linked code repositories, and account information."
      />
    ),
  },
  {
    path: ROUTES.SETTINGS,
    title: 'Settings',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Settings"
        path={ROUTES.SETTINGS}
        type="Protected"
        icon={Settings}
        description="IDE keybindings, theme preferences, editor configurations, and notification controls."
      />
    ),
  },

  // Admin Application Workspace Protected Routes (All 15 Sidebar Sections)
  {
    path: ROUTES.ADMIN,
    title: 'Admin Dashboard',
    type: 'Admin',
    element: <AdminDashboard />,
  },
  {
    path: ROUTES.ADMIN_DASHBOARD,
    title: 'Admin Dashboard Overview',
    type: 'Admin',
    element: <AdminDashboard />,
  },
  {
    path: ROUTES.ADMIN_STUDENTS,
    title: 'Student Account Management',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Students Management"
        path={ROUTES.ADMIN_STUDENTS}
        type="Admin"
        icon={Users}
        description="View registered student accounts, manage roles, monitor activity, and inspect progress records."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_LANGUAGES,
    title: 'Language Runtime Management',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Languages Management"
        path={ROUTES.ADMIN_LANGUAGES}
        type="Admin"
        icon={Code2}
        description="Configure supported runtime programming languages (C, C++, Java, Python, JavaScript) and Piston execution parameters."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_TRACKS,
    title: 'Learning Track Management',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Tracks Management"
        path={ROUTES.ADMIN_TRACKS}
        type="Admin"
        icon={GitBranch}
        description="Manage canonical learning tracks (e.g., Web Development Track) and module ordering."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_TOPICS,
    title: 'Curriculum Topic Management',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Topics Management"
        path={ROUTES.ADMIN_TOPICS}
        type="Admin"
        icon={Layers}
        description="Create, update, and organize curriculum topic hierarchies and difficulty tiers."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_LESSONS,
    title: 'Lesson Content Management',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Lessons Management"
        path={ROUTES.ADMIN_LESSONS}
        type="Admin"
        icon={FileCode}
        description="Create and publish interactive lessons, code examples, markdown guides, and completion criteria."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_QUESTIONS,
    title: 'Assessment Question Bank',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Questions Management"
        path={ROUTES.ADMIN_QUESTIONS}
        type="Admin"
        icon={HelpCircle}
        description="Manage diagnostic assessment questions, multiple-choice options, and hidden test cases."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_DEBUG_ARENA,
    title: 'Debug Challenge Creator',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Debug Arena Management"
        path={ROUTES.ADMIN_DEBUG_ARENA}
        type="Admin"
        icon={Bug}
        description="Inject bugs (syntax, logical, runtime) into code bases and configure test verification suites."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_TESTS,
    title: 'Weekly Test Scheduler',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Tests Management"
        path={ROUTES.ADMIN_TESTS}
        type="Admin"
        icon={CheckSquare}
        description="Schedule timed weekly assessment tests, set question point values, and configure auto-grading."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_COMPETITIONS,
    title: 'Contest & Arena Creator',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Competitions Management"
        path={ROUTES.ADMIN_COMPETITIONS}
        type="Admin"
        icon={Trophy}
        description="Create live coding contests, set start/end windows, add problem sets, and inspect submissions."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_BATCHES,
    title: 'Batch Price & Cohort Management',
    type: 'Admin',
    element: <Batches />,
  },
  {
    path: ROUTES.ADMIN_PURCHASES,
    title: 'Purchase Receipts & Enrollments',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Purchases Management"
        path={ROUTES.ADMIN_PURCHASES}
        type="Admin"
        icon={Receipt}
        description="Inspect immutable purchase receipts, student cohort enrollments, and frozen paid amounts."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_PAYMENTS,
    title: 'Payment Gateway Verification Audit',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Payments Verification Logs"
        path={ROUTES.ADMIN_PAYMENTS}
        type="Admin"
        icon={CreditCard}
        description="Audit server-side gateway HMAC signature verifications, order IDs, and transaction statuses."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_REPORTS,
    title: 'Platform Analytics & Reports',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Reports & Analytics"
        path={ROUTES.ADMIN_REPORTS}
        type="Admin"
        icon={BarChart3}
        description="Generate platform performance reports, student retention metrics, and submission statistics."
      />
    ),
  },
  {
    path: ROUTES.ADMIN_SETTINGS,
    title: 'System Security & Admin Settings',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Admin Settings"
        path={ROUTES.ADMIN_SETTINGS}
        type="Admin"
        icon={Settings}
        description="Configure API keys, gateway secrets, execution timeouts, rate limits, and system flags."
      />
    ),
  },
];

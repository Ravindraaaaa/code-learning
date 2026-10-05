import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Bug,
  CheckSquare,
  Trophy,
  Medal,
  TrendingUp,
  Bot,
  Users,
  User,
  Settings,
  Shield,
} from 'lucide-react';
import { ROUTES } from './paths.js';
import { RoutePlaceholder } from './RoutePlaceholder.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { ThemePreviewPage } from '../pages/ThemePreviewPage.jsx';
import { Register } from '../pages/Register.jsx';
import { Login } from '../pages/Login.jsx';
import { AdminLogin } from '../pages/AdminLogin.jsx';
import { Dashboard } from '../pages/Dashboard.jsx';

/**
 * Reusable Declarative Route Configuration
 * Defines paths, access types, icons, and route elements.
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
    element: (
      <RoutePlaceholder
        title="Learn Curriculum"
        path={ROUTES.LEARN}
        type="Protected"
        icon={BookOpen}
        description="Structured computer science curricula, data structures, algorithms, and interactive tutorials."
      />
    ),
  },
  {
    path: ROUTES.PRACTICE,
    title: 'Practice',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Practice Arena"
        path={ROUTES.PRACTICE}
        type="Protected"
        icon={Code2}
        description="Curated problem sets across Arrays, Trees, Dynamic Programming, Graphs, and System Design."
      />
    ),
  },
  {
    path: ROUTES.DEBUG_ARENA,
    title: 'Debug Arena',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Debug Arena"
        path={ROUTES.DEBUG_ARENA}
        type="Protected"
        icon={Bug}
        description="Diagnose, analyze, and patch intentional algorithm bugs under rigorous test suites."
      />
    ),
  },
  {
    path: ROUTES.TESTS,
    title: 'Tests',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Assessments & Tests"
        path={ROUTES.TESTS}
        type="Protected"
        icon={CheckSquare}
        description="Timed skill evaluations, algorithm benchmarks, and mock interview assessments."
      />
    ),
  },
  {
    path: ROUTES.COMPETITIONS,
    title: 'Competitions',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Competitions & Contests"
        path={ROUTES.COMPETITIONS}
        type="Protected"
        icon={Trophy}
        description="Live coding contests, weekly algorithmic sprints, and campus hackathons."
      />
    ),
  },
  {
    path: ROUTES.LEADERBOARD,
    title: 'Leaderboard',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Leaderboard"
        path={ROUTES.LEADERBOARD}
        type="Protected"
        icon={Medal}
        description="Verified cohort and global peer rankings based on authentic problem submissions."
      />
    ),
  },
  {
    path: ROUTES.PROGRESS,
    title: 'Progress',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Student Progress"
        path={ROUTES.PROGRESS}
        type="Protected"
        icon={TrendingUp}
        description="Personal learning velocity, topic mastery, and syllabus milestone completion."
      />
    ),
  },
  {
    path: ROUTES.AI_ASSISTANT,
    title: 'AI Assistant',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="AI Assistant"
        path={ROUTES.AI_ASSISTANT}
        type="Protected"
        icon={Bot}
        description="Intelligent code mentor providing conceptual guidance, edge-case analysis, and hints."
      />
    ),
  },
  {
    path: ROUTES.BATCHES,
    title: 'Batches',
    type: 'Protected',
    element: (
      <RoutePlaceholder
        title="Batches & Cohorts"
        path={ROUTES.BATCHES}
        type="Protected"
        icon={Users}
        description="Classroom cohorts, peer study groups, and instructor-guided learning batches."
      />
    ),
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

  // Admin Route
  {
    path: ROUTES.ADMIN,
    title: 'Admin Portal',
    type: 'Admin',
    element: (
      <RoutePlaceholder
        title="Admin Portal"
        path={ROUTES.ADMIN}
        type="Admin"
        icon={Shield}
        description="Restricted platform management console. Administrative privileges required."
      />
    ),
  },
];

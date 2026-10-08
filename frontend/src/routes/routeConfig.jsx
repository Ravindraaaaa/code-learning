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

  // Admin Route
  {
    path: ROUTES.ADMIN,
    title: 'Admin Portal',
    type: 'Admin',
    element: <AdminDashboard />,
  },
];

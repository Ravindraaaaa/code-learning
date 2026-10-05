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
} from 'lucide-react';
import { ROUTES } from '../../../routes/paths.js';

/**
 * Student Application Navigation Configuration
 * Contains all 12 core student navigation routes organized into logical groups.
 */
export const STUDENT_NAV_GROUPS = [
  {
    group: 'Core',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
        description: 'Student overview and quick access',
      },
      {
        id: 'learn',
        label: 'Learn',
        path: ROUTES.LEARN,
        icon: BookOpen,
        description: 'Curriculum, concept tutorials & learning tracks',
      },
      {
        id: 'practice',
        label: 'Practice',
        path: ROUTES.PRACTICE,
        icon: Code2,
        description: 'Algorithmic problems and coding challenges',
      },
      {
        id: 'debug-arena',
        label: 'Debug Arena',
        path: ROUTES.DEBUG_ARENA,
        icon: Bug,
        badge: 'Interactive',
        description: 'Interactive bug diagnosis and patch verification',
      },
    ],
  },
  {
    group: 'Assessment & Competitions',
    items: [
      {
        id: 'tests',
        label: 'Tests',
        path: ROUTES.TESTS,
        icon: CheckSquare,
        description: 'Timed skill evaluations and mock coding tests',
      },
      {
        id: 'competitions',
        label: 'Competitions',
        path: ROUTES.COMPETITIONS,
        icon: Trophy,
        badge: 'Contests',
        description: 'Live coding contests and hackathons',
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        path: ROUTES.LEADERBOARD,
        icon: Medal,
        description: 'Global and cohort peer rankings',
      },
    ],
  },
  {
    group: 'Growth & Intelligence',
    items: [
      {
        id: 'progress',
        label: 'Progress',
        path: ROUTES.PROGRESS,
        icon: TrendingUp,
        description: 'Curriculum completion status and skill mastery',
      },
      {
        id: 'ai-assistant',
        label: 'AI Assistant',
        path: ROUTES.AI_ASSISTANT,
        icon: Bot,
        badge: 'AI',
        description: 'Intelligent code mentor, explainers and hints',
      },
      {
        id: 'batches',
        label: 'Batches',
        path: ROUTES.BATCHES,
        icon: Users,
        description: 'Assigned study cohorts and classroom batches',
      },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        id: 'profile',
        label: 'Profile',
        path: ROUTES.PROFILE,
        icon: User,
        description: 'Student profile, credentials and handles',
      },
      {
        id: 'settings',
        label: 'Settings',
        path: ROUTES.SETTINGS,
        icon: Settings,
        description: 'Editor preferences, notifications and security',
      },
    ],
  },
];

/**
 * Flat list of all 12 navigation items for lookup
 */
export const ALL_STUDENT_NAV_ITEMS = STUDENT_NAV_GROUPS.flatMap((group) => group.items);

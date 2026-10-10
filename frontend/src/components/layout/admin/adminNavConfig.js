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
} from 'lucide-react';
import { ROUTES } from '../../../routes/paths.js';

/**
 * Admin Application Workspace Navigation Configuration
 * Contains all 15 core administrative sidebar sections organized into logical groups.
 */
export const ADMIN_NAV_GROUPS = [
  {
    group: 'Overview & Operations',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: ROUTES.ADMIN_DASHBOARD || '/admin/dashboard',
        aliases: ['/admin'],
        icon: LayoutDashboard,
        description: 'System health, real database metrics, and administrator command center',
      },
      {
        id: 'students',
        label: 'Students',
        path: ROUTES.ADMIN_STUDENTS || '/admin/students',
        icon: Users,
        description: 'Student account management, roles, and progress tracking',
      },
    ],
  },
  {
    group: 'Curriculum & Content',
    items: [
      {
        id: 'languages',
        label: 'Languages',
        path: ROUTES.ADMIN_LANGUAGES || '/admin/languages',
        icon: Code2,
        description: 'Supported runtime programming languages (C, C++, Java, Python, JS)',
      },
      {
        id: 'tracks',
        label: 'Tracks',
        path: ROUTES.ADMIN_TRACKS || '/admin/tracks',
        icon: GitBranch,
        description: 'Canonical learning tracks and structured module pathways',
      },
      {
        id: 'topics',
        label: 'Topics',
        path: ROUTES.ADMIN_TOPICS || '/admin/topics',
        icon: Layers,
        description: 'Curriculum topic hierarchies and difficulty categorizations',
      },
      {
        id: 'lessons',
        label: 'Lessons',
        path: ROUTES.ADMIN_LESSONS || '/admin/lessons',
        icon: FileCode,
        description: 'Lesson content, code snippets, markdown guides, and completion criteria',
      },
    ],
  },
  {
    group: 'Assessment & Arenas',
    items: [
      {
        id: 'questions',
        label: 'Questions',
        path: ROUTES.ADMIN_QUESTIONS || '/admin/questions',
        icon: HelpCircle,
        description: 'Knowledge assessment questions and hidden test case management',
      },
      {
        id: 'debug-arena',
        label: 'Debug Arena',
        path: ROUTES.ADMIN_DEBUG_ARENA || '/admin/debug-arena',
        icon: Bug,
        badge: 'Arena',
        description: 'Faulty code challenge creation, bug injection, and patch verification',
      },
      {
        id: 'tests',
        label: 'Tests',
        path: ROUTES.ADMIN_TESTS || '/admin/tests',
        icon: CheckSquare,
        description: 'Timed weekly assessment test scheduling and scoring rubrics',
      },
      {
        id: 'competitions',
        label: 'Competitions',
        path: ROUTES.ADMIN_COMPETITIONS || '/admin/competitions',
        icon: Trophy,
        badge: 'Live',
        description: 'Live contest management, problem sets, and leaderboard controls',
      },
    ],
  },
  {
    group: 'Financials & Monetization',
    items: [
      {
        id: 'batches',
        label: 'Batches',
        path: ROUTES.ADMIN_BATCHES || '/admin/batches',
        icon: FolderKanban,
        description: 'Cohort batch creation, feature lists, and price management (e.g. ₹49)',
      },
      {
        id: 'purchases',
        label: 'Purchases',
        path: ROUTES.ADMIN_PURCHASES || '/admin/purchases',
        icon: Receipt,
        description: 'Immutable purchase receipts, order records, and student enrollments',
      },
      {
        id: 'payments',
        label: 'Payments',
        path: ROUTES.ADMIN_PAYMENTS || '/admin/payments',
        icon: CreditCard,
        description: 'Server-side payment verification logs, HMAC audit, and gateway transactions',
      },
    ],
  },
  {
    group: 'System & Analytics',
    items: [
      {
        id: 'reports',
        label: 'Reports',
        path: ROUTES.ADMIN_REPORTS || '/admin/reports',
        icon: BarChart3,
        description: 'Platform velocity reports, student completion curves, and analytics',
      },
      {
        id: 'settings',
        label: 'Settings',
        path: ROUTES.ADMIN_SETTINGS || '/admin/settings',
        icon: Settings,
        description: 'Platform security configuration, API keys, rate limits, and system flags',
      },
    ],
  },
];

/**
 * Flat list of all 15 admin navigation items for lookup
 */
export const ALL_ADMIN_NAV_ITEMS = ADMIN_NAV_GROUPS.flatMap((group) => group.items);

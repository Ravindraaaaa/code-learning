/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Blue/Indigo Scale
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          DEFAULT: '#4f46e5',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          hover: '#4338ca',
          active: '#3730a3',
          muted: '#6366f126',
        },

        // Violet / Purple Accent Scale
        violet: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          DEFAULT: '#8b5cf6',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
          hover: '#7c3aed',
          muted: '#8b5cf626',
        },

        // Secondary / Electric Blue
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          DEFAULT: '#2563eb',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          hover: '#1d4ed8',
          active: '#1e40af',
          muted: '#3b82f626',
        },

        // Background Hierarchy (Dark & Light support)
        background: {
          deep: '#060911',
          DEFAULT: '#0b0f19',
          elevated: '#0f172a',
          subtle: '#141d2f',
          light: '#f8fafc',
          'light-surface': '#ffffff',
        },

        // Surface Tokens (Cards, Panels, Modals, Overlays)
        surface: {
          DEFAULT: '#111827',
          card: '#111827',
          panel: '#1e293b',
          elevated: '#1a2436',
          hover: '#1f2b42',
          active: '#253450',
          border: '#1e293b',
          light: '#ffffff',
          'light-muted': '#f1f5f9',
        },

        // Text & Content Tokens
        content: {
          primary: '#f8fafc',
          DEFAULT: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
          subtle: '#64748b',
          disabled: '#475569',
          inverse: '#0b0f19',
          'light-primary': '#0f172a',
          'light-secondary': '#334155',
          'light-muted': '#64748b',
        },

        // Border Tokens
        border: {
          subtle: '#1e293b',
          DEFAULT: '#334155',
          strong: '#475569',
          focus: '#6366f1',
          divider: '#1f293d',
          'light-subtle': '#e2e8f0',
          'light-default': '#cbd5e1',
        },

        // Status Colors
        success: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#059669',
          bg: '#064e3b33',
          border: '#10b9814d',
        },
        warning: {
          light: '#fbbf24',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          bg: '#78350f33',
          border: '#f59e0b4d',
        },
        error: {
          light: '#fb7185',
          DEFAULT: '#f43f5e',
          dark: '#e11d48',
          bg: '#88133733',
          border: '#f43f5e4d',
        },
        info: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
          bg: '#1e3a8a33',
          border: '#3b82f64d',
        },
      },

      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '104': '26rem',
        '120': '30rem',
      },

      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'pill': '9999px',
      },

      boxShadow: {
        'surface-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'surface-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
        'surface-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
        'glow-primary': '0 0 25px -4px rgba(99, 102, 241, 0.4)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.4)',
        'glow-blue': '0 0 25px -4px rgba(59, 130, 246, 0.4)',
        'glow-error': '0 0 20px -4px rgba(244, 63, 94, 0.35)',
      },

      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },

      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

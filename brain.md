# CodeForge – Permanent Project Memory (`brain.md`)

---

## 1. Project Overview
- **Project Name**: CodeForge
- **Current Phase**: Web Development Track Implementation Complete (MongoDB `Track` model created for canonical learning tracks; Web Development Track with 6 modules: HTML, CSS, JavaScript, React, Node.js, MongoDB; Backend API endpoints `GET /api/v1/tracks`, `GET /api/v1/tracks/:slug`, `GET /api/v1/student/track`, and `POST /api/v1/student/track`; Student View & Select capabilities implemented via dedicated `Learn.jsx` curriculum page, `TrackSelectorModal.jsx`, and Dashboard Roadmap card; in-memory fallback store and standalone seeder `seedTracks.js`; 68 backend tests in 12 suites passing 100%).

---

## 2. Technology Stack

### Frontend
- **Framework**: React.js (v18.3.1)
- **Routing**: React Router DOM (v7.1.5)
- **Language**: JavaScript (ES Modules)
- **Styling & Design System**: Tailwind CSS (v3.4.17) with PostCSS (v8.4.49) & Autoprefixer (v10.4.20)
- **Bundler & Dev Server**: Vite (v6.0.7)
- **Icons**: Lucide React (v1.16.0)
- **Typography**: Inter (UI font) & JetBrains Mono (Code/monospaced font) via Google Fonts

### Backend
- **Runtime**: Node.js (v24.15.0 compatibility)
- **Framework**: Express.js (v4.21.2)
- **Database Driver / ODM**: Mongoose (v8.9.5) for MongoDB
- **Password Hashing**: bcryptjs (v3.0.3)
- **Authentication & Tokens**: jsonwebtoken (v9.0.2)
- **Security & Utilities**:
  - `helmet` (v8.0.0) — HTTP response header hardening
  - `cors` (v2.8.5) — Cross-Origin Resource Sharing control
  - `morgan` (v1.10.0) — HTTP request logging
  - `dotenv` (v16.4.7) — Environment variable management
- **Development Tooling**: Nodemon (v3.1.9)

---

## 3. Folder Structure

```
mini project/
├── .env.example                          # Root master environment variable blueprint
├── .gitignore                            # Unified gitignore (node_modules, .env, build outputs)
├── brain.md                              # Permanent project memory and architectural source of truth
├── README.md                             # Developer onboarding, architecture, and setup instructions
│
├── frontend/                             # Independent React client workspace
│   ├── index.html                        # Application entry HTML with dark class & fonts
│   ├── package.json                      # Frontend dependencies and run scripts
│   ├── postcss.config.js                 # PostCSS configuration for Tailwind CSS
│   ├── tailwind.config.js                # Design system tokens (blue/violet accent, dark mode, surfaces)
│   ├── vite.config.js                    # Vite server and build configurations
│   ├── .env                              # Local frontend environment variables (git-ignored)
│   ├── .env.example                      # Template for frontend environment configuration
│   ├── public/
│   │   └── favicon.svg                   # Platform SVG favicon
│   └── src/
│       ├── components/
│       │   ├── common/                   # Atomic, reusable UI primitives
│       │   │   ├── Alert.jsx             # System feedback alerts (info, violet, success, warning, error)
│       │   │   ├── Badge.jsx             # Contextual status badges (difficulty, language, themes)
│       │   │   ├── Button.jsx            # Multi-variant button primitive (gradient primary, violet, blue, outline, danger)
│       │   │   ├── Card.jsx              # Surface cards with dark glassmorphism & light mode support
│       │   │   ├── EmptyState.jsx        # Developer-centric empty state placeholder with CTA actions
│       │   │   ├── Input.jsx             # Form inputs (text, search with shortcut, select, textarea)
│       │   │   ├── Modal.jsx             # Accessible modal dialog with backdrop blur & escape handling
│       │   │   ├── Skeleton.jsx          # Loading skeleton primitives (cards, code blocks, text)
│       │   │   └── StatusIndicator.jsx   # Live status pill with animated pulse dot
│       │   ├── language/                 # Programming language components
│       │   │   └── LanguageSelectorModal.jsx # Interactive modal for viewing and selecting runtime languages
│       │   ├── track/                    # Learning track components
│       │   │   └── TrackSelectorModal.jsx    # Interactive modal for viewing and selecting learning tracks
│       │   └── layout/                   # Structural layout components
│       │       ├── Footer.jsx            # Clean minimal site footer for public pages
│       │       ├── Layout.jsx            # Dynamic shell coordinator delegating public vs student layouts
│       │       ├── Navbar.jsx            # Sticky navigation bar for public website routes
│       │       ├── index.js              # Barrel export for layout components
│       │       └── student/              # Dedicated Student Application workspace layout
│       │           ├── Sidebar.jsx       # Desktop collapsible sidebar with 12 grouped nav links
│       │           ├── Topbar.jsx        # Sticky top bar with breadcrumbs, language switcher pill, command trigger & user pill
│       │           ├── MobileNav.jsx     # Responsive slide-over drawer navigation with backdrop blur
│       │           ├── StudentLayout.jsx # Master student layout wrapper managing collapse & drawer state
│       │           ├── studentNavConfig.js # Central registry for 12 student navigation sections
│       │           └── index.js          # Barrel export for student layout module
│       ├── context/                      # React Context providers
│       │   └── AuthContext.jsx           # Global authentication state, login, logout, refresh, and role handling
│       ├── hooks/
│       │   └── useHealthCheck.js         # Custom hook for polling & refreshing API status
│       ├── pages/
│       │   ├── AdminLogin.jsx            # Administrator login page (role === 'admin' verification, error handling)
│       │   ├── Dashboard.jsx             # Real database-driven Student Dashboard UI (with Programming Environment section)
│       │   ├── HomePage.jsx              # Foundation dashboard with live infrastructure inspector
│       │   ├── Learn.jsx                 # Comprehensive Curriculum & Learning Tracks page (Web Development Track featured)
│       │   ├── Login.jsx                 # Student login page (integrated with useAuth, validation, loading, error)
│       │   ├── Register.jsx              # Student registration page (form validation, loading, error, success views)
│       │   └── ThemePreviewPage.jsx      # Comprehensive CodeForge Design System & Theme Showcase
│       ├── routes/                       # Declarative, modular routing architecture
│       │   ├── AdminRoute.jsx            # Role-based route guard for administrative access (verifies role === 'admin')
│       │   ├── AppRoutes.jsx             # Master React Router Routes component with 404 fallback
│       │   ├── paths.js                  # Central constant definitions for all route URLs (public, admin, 12 student)
│       │   ├── ProtectedRoute.jsx        # Hardened route guard enforcing authentication & student role
│       │   ├── routeConfig.jsx           # Declarative array mapping paths, titles, types, icons, and elements
│       │   ├── RoutePlaceholder.jsx      # Clean placeholder view for unbuilt pages (zero fake content)
│       │   └── index.js                  # Barrel export for routing module
│       ├── services/
│       │   └── api.js                    # Modular HTTP client with auth, dashboard, language, and track endpoints
│       ├── styles/
│       │   └── index.css                 # CSS variables, Tailwind directives, dark scrollbars, shimmer animations
│       ├── utils/
│       │   └── constants.js              # Application metadata and API endpoints
│       ├── App.jsx                       # Top-level view rendering BrowserRouter and AppRoutes in Layout
│       └── main.jsx                      # React 18 DOM mount point
│
└── backend/                              # Independent Express.js REST API workspace
    ├── package.json                      # Backend dependencies and scripts (start, dev, seed:languages, seed:tracks, seed:users)
    ├── .env                              # Local backend environment variables (git-ignored)
    ├── .env.example                      # Template for backend environment configuration
    └── src/
        ├── config/
        │   ├── db.js                     # Mongoose connection manager with error handling
        │   ├── devFallbackStore.js       # In-memory data store fallback for offline MongoDB resilience
        │   └── env.js                    # Environment variable loader and fallback defaults
        ├── controllers/
        │   ├── authController.js         # Request handlers for student & admin registration/login
        │   ├── dashboardController.js    # Request handler for student dashboard metrics
        │   ├── healthController.js       # Request orchestrator for health endpoints
        │   ├── languageController.js     # Request handlers for viewing and selecting programming languages
        │   └── trackController.js        # Request handlers for viewing and selecting learning tracks
        ├── middleware/
        │   ├── adminMiddleware.js        # Admin authorization middleware enforcing req.user.role === 'admin'
        │   ├── authMiddleware.js         # requireAuth, requireRole, requireAdmin token guards
        │   ├── errorHandler.js           # Centralized exception handler with masked prod stacks
        │   └── notFound.js               # 404 handler for unmatched routes
        ├── models/
        │   ├── Language.js               # Mongoose schema for Language (C, C++, Java, Python, JavaScript metadata)
        │   ├── Track.js                  # Mongoose schema for Track (Web Development, modules, order, topics)
        │   ├── User.js                   # Mongoose schema for User with roadmap, selectedLanguage, and progress fields
        │   └── index.js                  # Central Mongoose model registry exporting User, Language, and Track
        ├── routes/
        │   ├── authRoutes.js             # Route declarations for /register, /login, /admin/login, /me, /admin/verify
        │   ├── healthRoutes.js           # Route declaration for /api/v1/health
        │   ├── languageRoutes.js         # Route declarations for /api/v1/languages
        │   ├── trackRoutes.js            # Route declarations for /api/v1/tracks
        │   ├── studentRoutes.js          # Route declaration for /api/v1/student/dashboard, /language, and /track
        │   └── index.js                  # API router root mounting /health, /auth, /languages, /tracks, and /student
        ├── scripts/
        │   ├── seedLanguages.js          # Standalone CLI seeder for official programming languages
        │   ├── seedTracks.js             # Standalone CLI seeder for official learning tracks
        │   └── seedUsers.js              # Standalone CLI seeder for default demo accounts
        ├── services/
        │   ├── authService.js            # Business logic for hashing password, loginStudent, loginAdmin, getMe
        │   ├── dashboardService.js       # Business logic querying real student dashboard metrics and recommendations
        │   ├── healthService.js          # Business logic inspecting process memory & DB state
        │   ├── languageService.js        # Canonical languages (C, C++, Java, Python, JS), retrieval, and student selection
        │   └── trackService.js           # Canonical tracks (Web Development: HTML, CSS, JS, React, Node, MongoDB) & enrollment
        ├── utils/
        │   ├── apiResponse.js            # Unified JSON response helpers (sendSuccess, sendError)
        │   └── logger.js                 # ISO-timestamped console logging utility
        ├── validators/
        │   ├── authValidators.js         # Dedicated registration input validator
        │   └── validateRequest.js        # Reusable body and query validation middleware
        ├── app.js                        # Express middleware chain & route registration
        └── server.js                     # HTTP server startup and graceful shutdown lifecycle
```

---

## 4. Architecture Decisions
1. **Clean Separation of Concerns**:
   - `frontend/` and `backend/` remain completely decoupled with isolated dependency sets.
2. **Layered Backend Architecture**:
   - Strictly enforces unidirectional flow: `Route -> Middleware / Validator -> Controller -> Service -> Model`.
3. **Student Registration Flow**:
   - `Register Form (Client)`: Captures `name`, `email`, `password`, `confirmPassword`. Validates inputs on client.
   - `POST /api/v1/auth/register`: Intercepted by `validateBody(validateRegisterInput)`.
   - `Auth Service`:
     - Checks email uniqueness (`User.findOne({ email: normalizedEmail })`). Throws 409 conflict if exists.
     - Hashes password using `bcryptjs` with salt work factor of 10.
     - Creates new user with default `role: 'student'`.
     - Returns serialized user document stripping `passwordHash`.
   - `Response`: Standard 201 JSON envelope (`sendSuccess(res, 201, 'Student account registered successfully', data)`).
4. **Student Login Flow**:
   - `Login Form (Client)`: Captures `email` and `password`. Validates required inputs and email format on client.
   - `POST /api/v1/auth/login`: Intercepted by `validateBody(validateLoginInput)`.
   - `Auth Service (loginStudent)`:
     - Normalizes email and queries user including `passwordHash`. Throws 401 if user does not exist.
     - Role Check: Verifies `user.role === 'student'`. Non-students are blocked with 403 Forbidden.
     - Password Verification: Compares supplied password against `passwordHash` using `bcrypt.compare()`. Throws 401 on mismatch.
     - JWT Generation: Calls `signToken({ id: user._id, email: user.email, role: user.role })` using `JWT_SECRET` and configured expiry.
     - Serialization: Calls `user.toJSON()` to strip `passwordHash`.
     - Returns `{ user, token }`.
   - `Response`: Standard 200 JSON envelope (`sendSuccess(res, 200, 'Student login successful', { user, token })`).
   - `Client Persistence`: Token and user details stored in `localStorage` (`codeforge_token`, `codeforge_user`). Authenticated confirmation state rendered with option to logout. Dashboard remains unbuilt as per specification.
5. **Protected Routing & Centralized Authentication Architecture**:
   - `AuthContext & AuthProvider`: Root React context wrapping application inside `<BrowserRouter>`. Maintains `{ user, token, isAuthenticated, isLoading }`. Provides `login`, `logout`, and `refreshSession`.
   - `Session Initialization & Refresh`: On initial load or refresh, inspects `localStorage`. Decodes JWT expiry (`exp`); if expired, automatically wipes stored credentials. Concurrently queries `GET /api/v1/auth/me` to ensure token was not revoked.
   - `Cross-Tab Synchronization`: Listens for `window.storage` events (`codeforge_token`, `codeforge_user`) so logging out in one tab synchronizes across all open tabs.
   - `ProtectedRoute Guard`: Intercepts protected paths (`/dashboard`). If loading, renders a themed CodeForge session validator. If unauthenticated or token expired, redirects to `/login` preserving `location.state.from`. If authenticated user has an unauthorized role (non-student), displays a styled Access Denied card.
6. **Data Isolation & Credential Security**:
   - Plaintext passwords are never stored anywhere.
   - The Mongoose `toJSON()` method strips `passwordHash` automatically on document serialization.
   - Default role is strictly enforced as `'student'`.
7. **Admin Authentication & Dual-Portal Segregation Flow**:
   - `Admin Login Form (Client)`: Captures `email` and `password`. Validates required inputs and RFC email format on client.
   - `POST /api/v1/auth/admin/login`: Intercepted by `validateBody(validateLoginInput)`.
   - `Auth Service (loginAdmin)`:
     - Normalizes email and queries user document including `passwordHash`. Throws 401 if user does not exist.
     - Role Check: Strictly enforces `user.role === 'admin'`. Non-admins (such as students attempting admin login) are blocked with 403 Forbidden (`'Access denied. This login portal is reserved for administrators.'`).
     - Password Verification: Compares supplied password against `passwordHash` using `bcrypt.compare()`. Throws 401 on mismatch.
     - JWT Generation: Calls `signToken({ id: user._id, email: user.email, role: user.role })` using `JWT_SECRET`.
     - Returns `{ user: user.toJSON(), token }`.
   - `Admin Authorization Middleware (requireAdmin)`: Verifies `req.user && req.user.role === 'admin'`. Responds with 401 if unauthenticated or 403 if non-admin.
   - `Admin Protected Route (AdminRoute.jsx)`: Intercepts administrative routes (`/admin`). Unauthenticated visitors are redirected to `/admin/login` preserving `location.state.from`. Authenticated students are presented with a styled "Administrator Access Required" card explaining role mismatch with options to sign out or switch accounts. Authorized admins are granted access to the route.
   - `Zero Fake Operational Data Principle`: No fake/mock admin users created in database or persistent stores. Dashboard content strictly deferred (RoutePlaceholder remains unbuilt without dummy metrics or fake controls).
8. **Student Application Workspace Layout Architecture**:
   - `Dedicated Shell (StudentLayout.jsx)`: Decouples authenticated student work environments from public landing/marketing pages. Provides a responsive, IDE-like interface tailored for focused algorithmic practice.
   - `Sidebar Component`: Sticky desktop sidebar containing all 12 platform modules divided into 4 intuitive categories (Core, Assessment & Competitions, Growth & Intelligence, Account). Supports one-click collapse/expand with smooth width transitions and state persistence in `localStorage` (`codeforge_sidebar_collapsed`). Features active route indicator bars, violet glows, and account control footer.
   - `Topbar Component`: Sticky navigation header with responsive hamburger trigger, breadcrumb navigation reflecting active section, search bar with shortcut trigger (`⌘K`), live backend connection pill (`StatusIndicator`), quick AI Assistant launcher, and student identity badge with direct sign-out action.
   - `Mobile Navigation (MobileNav.jsx)`: Off-canvas slide-out drawer on viewports `< 768px` featuring background backdrop blur (`bg-background-deep/80 backdrop-blur-sm`), keyboard escape dismiss, and touch-optimized navigation links.
   - `Main Content Area`: Independent scroll viewport (`overflow-y-auto`) housing page elements with max-width containment and custom dark scrollbars.
   - `Layout Delegation (Layout.jsx)`: Inspects active routes against student paths; routes in the 12 student sections automatically receive `StudentLayout`, while public pages maintain the marketing navbar and footer.
   - `Strict Zero Fake Statistics Constraint`: All student layouts display authentic data (logged-in user name, email, role, live backend connection state) and genuine placeholders with zero mock graphs, zero fake completion scores, and zero dummy rankings.



---

## 5. UI/Theme Decisions & Design System Tokens

### Visual Identity
- **Developer-Focused & Premium**: Tailored for algorithmic programming with high contrast, monospaced typography, and clean surface hierarchies.
- **Dark-First**: Default dark palette (`#0b0f19` canvas, `#111827` surface cards) with full toggleable light mode (`#f8fafc` canvas, `#ffffff` surface cards).
- **Blue & Violet Accent Palette**:
  - **Primary**: Electric Indigo/Blue (`#4f46e5`, `#6366f1`, `#818cf8`)
  - **Violet Accent**: Vibrant Violet/Purple (`#8b5cf6`, `#a855f7`, `#7c3aed`)
  - **Secondary**: Tech Electric Blue (`#2563eb`, `#3b82f6`, `#60a5fa`)
  - **Ambient Glows**: `glow-primary`, `glow-violet`, `glow-blue`
- **Typography**: `Inter` for interfaces, `JetBrains Mono` for code blocks, inputs, and system stats.

### Register & Login UI Elements
- Centered modern cards with blue/violet brand badge.
- Inputs with leading icons (`UserIcon`, `Mail`, `Lock`), password show/hide toggle, and real-time field error indicators.
- Role disclosure indicators ("Student Registration" / "Student Portal").
- Dedicated Success views presenting user details, role badge, and link to login / sign out actions.
- Protected route redirect alert ("You must be signed in as a student to access this protected page").
- Dynamic Navbar reflecting student profile pill, role indicator, and sign-out controls.

---

## 6. Completed Features
- [x] **Full-Stack Workspace Scaffolding**: Independent root, backend, and frontend environments.
- [x] **Backend Infrastructure**:
  - Express.js application configuration with Helmet, CORS, Morgan, and JSON parsing.
  - Centralized environment configuration via [`env.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/config/env.js).
  - MongoDB connection manager via Mongoose with graceful disconnect hooks in [`db.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/config/db.js).
  - Standardized JSON API responses via [`apiResponse.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/utils/apiResponse.js).
  - Structured logging utility via [`logger.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/utils/logger.js).
  - Centralized error handling ([`errorHandler.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/errorHandler.js)) and 404 handler ([`notFound.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/notFound.js)).
  - System and database health diagnostic service ([`healthService.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/services/healthService.js)) and controller ([`healthController.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/controllers/healthController.js)).
  - Reusable request validation middleware ([`validateRequest.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/validators/validateRequest.js)).
- [x] **MongoDB User Model**:
  - Defined in [`backend/src/models/User.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/models/User.js).
  - Unique, trimmed, lowercase email with regex validation.
  - Trimmed name with minimum/maximum character bounds.
  - Secure `passwordHash` field (plain text passwords never stored).
  - Strict role enum: `student` (default) and `admin`.
  - Automatic `createdAt` and `updatedAt` timestamps.
  - Overridden `toJSON()` helper stripping `passwordHash` from JSON output.
  - Exported through [`backend/src/models/index.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/models/index.js).
- [x] **Student Registration Backend API**:
  - Added `bcryptjs` dependency for password hashing.
  - Input validator [`authValidators.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/validators/authValidators.js).
  - Business logic service [`authService.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/services/authService.js).
  - HTTP controller [`authController.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/controllers/authController.js).
  - Route [`authRoutes.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/routes/authRoutes.js) mounted at `/api/v1/auth/register`.
- [x] **Student Registration Frontend UI**:
  - Created [`Register.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/pages/Register.jsx) with client validation, loading state, error alert, and success state.
  - Connected API call in [`api.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/services/api.js) via `registerUser()`.
  - Configured route `/register` in [`routeConfig.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/routeConfig.jsx).
- [x] **Student Login Backend API & Middleware**:
  - Installed `jsonwebtoken` dependency.
  - Created JWT signing and verification utility [`jwt.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/utils/jwt.js).
  - Input validator `validateLoginInput` in [`authValidators.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/validators/authValidators.js).
  - Business logic service `loginStudent` in [`authService.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/services/authService.js) verifying credentials, role, and signing JWT.
  - HTTP controller `login` in [`authController.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/controllers/authController.js).
  - Route `POST /api/v1/auth/login` and `GET /api/v1/auth/me` mounted in [`authRoutes.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/routes/authRoutes.js).
  - Created [`authMiddleware.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/authMiddleware.js) with `requireAuth` and `requireRole`.
- [x] **Protected Routing & Centralized Authentication Context**:
  - Created [`AuthContext.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/context/AuthContext.jsx) with global session management (`user`, `token`, `isAuthenticated`, `isLoading`, `login`, `logout`, `refreshSession`).
  - Implemented cross-tab synchronization and proactive JWT expiration purge.
  - Created hardened [`ProtectedRoute.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/ProtectedRoute.jsx) with loading screens, unauthenticated redirect with return path, and unauthorized role guards.
  - Integrated `useAuth` into [`Login.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/pages/Login.jsx), [`Navbar.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/Navbar.jsx), and wrapped [`App.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/App.jsx).
- [x] **Frontend Infrastructure & Theme System**:
  - Vite + React 18 configuration with fast HMR.
  - Tailwind CSS configured with Blue and Violet accents, dark-first default, and full light mode toggle.
  - Complete atomic UI library (`Button`, `Input`, `Card`, `Badge`, `Alert`, `Modal`, `Skeleton`, `EmptyState`, `StatusIndicator`).
  - Dedicated Theme Showcase page: [`ThemePreviewPage.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/pages/ThemePreviewPage.jsx).
- [x] **Frontend Routing Structure**:
  - Installed `react-router-dom` (v7).
  - Central route paths in [`paths.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/paths.js) (`/`, `/login`, `/register`, `/admin/login`, `/dashboard`, `/admin`, `/theme-preview`).
  - Declarative route configuration in [`routeConfig.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/routeConfig.jsx).
  - Route guards: [`ProtectedRoute.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/ProtectedRoute.jsx) and [`AdminRoute.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/AdminRoute.jsx).
  - Honest route placeholder for unbuilt pages: [`RoutePlaceholder.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/RoutePlaceholder.jsx).
- [x] **Admin Authentication Backend API & Middleware**:
  - `loginAdmin` business logic in [`authService.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/services/authService.js) verifying credentials, role === 'admin', and signing JWT.
  - HTTP controller `adminLogin` in [`authController.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/controllers/authController.js).
  - Routes `POST /api/v1/auth/admin/login` and `GET /api/v1/auth/admin/verify` mounted in [`authRoutes.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/routes/authRoutes.js).
  - Dedicated admin authorization middleware [`adminMiddleware.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/adminMiddleware.js) and exported via [`authMiddleware.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/authMiddleware.js).
- [x] **Admin Authentication Frontend UI & Route Protection**:
  - Created [`AdminLogin.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/pages/AdminLogin.jsx) with client validation, role === 'admin' verification, error alerts, authenticated admin badge view, and student session switcher.
  - Added `loginAdmin` and `verifyAdminAccess` in [`api.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/services/api.js).
  - Extended [`AuthContext.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/context/AuthContext.jsx) with `loginAdmin` and `isAdmin` state.
  - Hardened [`AdminRoute.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/AdminRoute.jsx) enforcing admin authentication, redirecting unauthenticated visitors to `/admin/login`, and presenting Access Denied for student roles.
  - Mounted `AdminLogin` at `/admin/login` in [`routeConfig.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/routeConfig.jsx).
- [x] **Comprehensive Student vs Admin Automated Test Suite (45 automated tests)**:
  - Added Suite 8 covering admin authentication, role mismatch blocking, authorization middleware, and route guard isolation. 100% pass rate.
- [x] **Student Application Layout & 12-Section Navigation Architecture**:
  - Created [`StudentLayout.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/StudentLayout.jsx) master workspace shell managing desktop collapse state and mobile drawer visibility.
  - Created [`Sidebar.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/Sidebar.jsx) with 12 grouped student modules, active route indicators, glowing violet accents, and collapsible rail mode.
  - Created [`Topbar.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/Topbar.jsx) with breadcrumbs, mobile drawer trigger, command search trigger (`⌘K`), live backend connection pill, and student profile pill with quick sign-out.
  - Created [`MobileNav.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/MobileNav.jsx) off-canvas slide-out drawer with backdrop blur, smooth slide-in animation, and Escape key dismissal.
  - Defined [`studentNavConfig.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/studentNavConfig.js) central registry organizing all 12 sections into 4 logical groups (Core, Assessment & Competitions, Growth & Intelligence, Account).
  - Extended [`paths.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/paths.js) and [`routeConfig.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/routeConfig.jsx) registering all 12 student routes under `ProtectedRoute`.
  - Updated [`Layout.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/Layout.jsx) to dynamically delegate between the public marketing shell and the student application workspace.
  - Enhanced [`RoutePlaceholder.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/RoutePlaceholder.jsx) with route-specific icons and honest developer descriptions, strictly adhering to "No fake statistics".

---

## 7. Files Changed / Created

### Root
- [`.gitignore`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/.gitignore): Excludes node_modules, build outputs, and environment files.
- [`.env.example`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/.env.example): Blueprint of environment variables across services (including `JWT_SECRET`, `JWT_EXPIRES_IN`).
- [`README.md`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/README.md): Full documentation, setup instructions, and architecture guide.
- [`brain.md`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/brain.md): Permanent memory file and state tracker.

### Backend (`backend/`)
- [`backend/src/middleware/adminMiddleware.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/adminMiddleware.js): Created dedicated admin authorization middleware enforcing `req.user.role === 'admin'`.
- [`backend/src/middleware/authMiddleware.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/authMiddleware.js): Added `requireAdmin` export alongside `requireAuth` and `requireRole`.
- [`backend/src/services/authService.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/services/authService.js): Added `loginAdmin` service with strict `role === 'admin'` check and updated profile lookup for all users (`getUserProfile`).
- [`backend/src/controllers/authController.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/controllers/authController.js): Added `adminLogin` controller handler.
- [`backend/src/routes/authRoutes.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/routes/authRoutes.js): Added `POST /admin/login` and `GET /admin/verify` routes.
- [`backend/tests/auth.test.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/tests/auth.test.js): Extended with Suite 8 containing 11 tests verifying student vs admin access, role rejections, and authorization middleware (45 tests total).

### Frontend (`frontend/`)
- [`frontend/src/components/layout/student/StudentLayout.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/StudentLayout.jsx): Created master student workspace shell managing collapse and mobile drawer state.
- [`frontend/src/components/layout/student/Sidebar.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/Sidebar.jsx): Created collapsible desktop sidebar with 12 grouped nav links and user footer.
- [`frontend/src/components/layout/student/Topbar.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/Topbar.jsx): Created sticky top navigation bar with breadcrumbs, command trigger, live health pill, and profile controls.
- [`frontend/src/components/layout/student/MobileNav.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/MobileNav.jsx): Created responsive mobile slide-out drawer with backdrop blur.
- [`frontend/src/components/layout/student/studentNavConfig.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/studentNavConfig.js): Created central registry mapping all 12 student navigation sections into 4 logical groups.
- [`frontend/src/components/layout/student/index.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/student/index.js): Barrel export for student layout module.
- [`frontend/src/components/layout/Layout.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/Layout.jsx): Updated layout coordinator to delegate student routes to `StudentLayout`.
- [`frontend/src/components/layout/index.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/components/layout/index.js): Created layout barrel export.
- [`frontend/src/routes/paths.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/paths.js): Added route constants for all 12 student application navigation sections.
- [`frontend/src/routes/routeConfig.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/routeConfig.jsx): Registered all 12 student routes under `ProtectedRoute`.
- [`frontend/src/routes/RoutePlaceholder.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/RoutePlaceholder.jsx): Enhanced with icon and description props; strictly zero fake statistics.
- [`frontend/src/pages/AdminLogin.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/pages/AdminLogin.jsx): Dedicated admin login portal with role validation, alerts, and student switcher.
- [`frontend/src/routes/AdminRoute.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/AdminRoute.jsx): Hardened admin route guard enforcing `isAuthenticated` and `user.role === 'admin'`.
- [`frontend/src/context/AuthContext.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/context/AuthContext.jsx): Added `loginAdmin` action and `isAdmin` computed state to global context.
- [`frontend/src/services/api.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/services/api.js): Added `loginAdmin` (`POST /auth/admin/login`) and `verifyAdminAccess` (`GET /auth/admin/verify`).

---

## 8. Database Decisions

1. **Engine**: MongoDB with Mongoose ODM.
2. **User Model Schema (`User.js`)**:
   - `name`: String, required, trim, minlength: 2, maxlength: 50.
   - `email`: String, required, unique, trim, lowercase, regex validated (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), indexed.
   - `passwordHash`: String, required, minlength: 20 (plaintext passwords never stored).
   - `role`: String, enum: `['student', 'admin']`, default: `'student'`, indexed.
   - `roadmap`: Object ({ enrolled: Boolean, title: String, trackId: String, currentModule: String, completedModules: Number, totalModules: Number }). Defaults to null / not enrolled.
   - `learningProgress`: Object ({ topicsCompleted: Number, totalTopics: Number, percentage: Number, lastCompletedTopic: String }). Defaults to 0s and null.
   - `streak`: Object ({ currentStreak: Number, longestStreak: Number, lastActiveDate: Date, freezeDaysAvailable: Number }). Defaults to 0s and null.
   - `skills`: Array of subdocuments ({ name: String, level: String, score: Number, problemsSolved: Number }). Defaults to empty array `[]`.
   - `testPerformance`: Object ({ testsTaken: Number, averageScore: Number, highestScore: Number, lastTestDate: Date, recentTests: Array }). Defaults to 0s and empty array.
   - `recentActivity`: Array of subdocuments ({ activityType: String, title: String, detail: String, timestamp: Date }). Defaults to empty array `[]`.
   - `selectedLanguage`: String, default: null, trim, lowercase. Stores the student's chosen primary programming language slug (e.g. 'c', 'cpp', 'java', 'python', 'javascript').
   - `timestamps`: Enabled (`createdAt`, `updatedAt` managed automatically by Mongoose).
   - `toJSON()` override: Strips `passwordHash` from document serialization to prevent accidental leakage in API responses.
3. **Language Model Schema (`Language.js`)**:
   - `name`: String, required, unique, trim (e.g. 'C', 'C++', 'Java', 'Python', 'JavaScript').
   - `slug`: String, required, unique, lowercase, trim, indexed (e.g. 'c', 'cpp', 'java', 'python', 'javascript').
   - `version`: String, required, trim (e.g. 'GCC 13.2', 'G++ 13.2 / C++20', 'OpenJDK 21 LTS', 'Python 3.12', 'Node.js 20 LTS').
   - `fileExtension`: String, required, trim (e.g. '.c', '.cpp', '.java', '.py', '.js').
   - `monacoMode`: String, required, trim (e.g. 'c', 'cpp', 'java', 'python', 'javascript').
   - `defaultTemplate`: String (starter code template for code editor).
   - `description`: String, trim (capabilities and use-case explanation).
   - `isActive`: Boolean, default: true, indexed.
   - `displayOrder`: Number, default: 0.
   - `timestamps`: Enabled (`createdAt`, `updatedAt`).
4. **Track Model Schema (`Track.js`)**:
   - `name`: String, required, unique, trim (e.g. 'Web Development').
   - `slug`: String, required, unique, lowercase, trim, indexed (e.g. 'web-development').
   - `description`: String, required, trim.
   - `category`: String, default: 'Full-Stack Development'.
   - `modules`: Array of Subdocuments ({ name: String, slug: String, order: Number, description: String, level: String, topicsCount: Number, estimatedHours: Number }).
   - Canonical modules strictly contain: **HTML, CSS, JavaScript, React, Node.js, MongoDB**.
   - `totalModules`: Number, managed via pre-save hook (`modules.length`).
   - `level`: String, default: 'Beginner to Advanced'.
   - `estimatedHours`: Number, default: 140.
   - `isActive`: Boolean, default: true, indexed.
   - `displayOrder`: Number, default: 1.
   - `timestamps`: Enabled (`createdAt`, `updatedAt`).
5. **Connection Handling & Resilience**:
   - `isDBConnected()` checks `mongoose.connection.readyState === 1 || fallbackActive`.
   - `serverSelectionTimeoutMS: 5000` prevents indefinite connection stalls.
   - In-memory data store fallback in `devFallbackStore.js` ensures `User`, `Language`, and `Track` methods function with zero downtime when MongoDB service is offline.
   - If database is disconnected, endpoints safely throw HTTP 503 instead of hanging for 10-30 seconds.

---

## 9. API Decisions
1. **URL Structure**:
   - Base root: `/`
   - API versioning prefix: `/api/v1`
   - Health diagnostics: `GET /api/v1/health`
   - Authentication:
     - `POST /api/v1/auth/register`: Student registration endpoint
     - `POST /api/v1/auth/login`: Student login endpoint (enforces `role === 'student'`)
     - `POST /api/v1/auth/admin/login`: Administrator login endpoint (enforces `role === 'admin'`)
     - `GET /api/v1/auth/me`: Authenticated profile endpoint (supports all roles via Bearer token)
     - `GET /api/v1/auth/admin/verify`: Administrator authorization verification endpoint (`requireAuth` + `requireAdmin`)
   - Programming Languages:
     - `GET /api/v1/languages`: Retrieve all active platform languages (C, C++, Java, Python, JavaScript) with versions and templates.
     - `GET /api/v1/languages/:slug`: Retrieve specific language details by slug.
     - `GET /api/v1/student/language`: Retrieve authenticated student's selected primary language (`requireAuth`).
     - `POST /api/v1/student/language` (or `PUT`): Update student's selected primary language (`requireAuth`).
   - Learning Tracks (Web Development: HTML, CSS, JavaScript, React, Node.js, MongoDB):
     - `GET /api/v1/tracks`: Retrieve all active learning tracks with full module breakdown.
     - `GET /api/v1/tracks/:slug`: Retrieve specific track details by slug (e.g. `web-development`).
     - `GET /api/v1/student/track`: Retrieve authenticated student's enrolled track & roadmap (`requireAuth`).
     - `POST /api/v1/student/track` (or `PUT`): Enroll or switch student learning track (`requireAuth`).
   - Student Dashboard & Learning:
     - `GET /api/v1/student/dashboard`: Authenticated student dashboard metrics endpoint (`requireAuth`). Returns 7 database-driven sections: roadmap, learningProgress, streak, skills, testPerformance, recentActivity, recommendations. Zero fake statistics.
     - `GET /api/v1/dashboard`: Alias mount for `/student/dashboard`.
2. **Response Structure**: Enforced `{ success, message, data/errors }`.
3. **Error Handling Protocol**: `notFoundHandler` (404), `authMiddleware` (401/403), `adminMiddleware` (401/403), `errorHandler` (500/503).

---

## 10. Security Decisions
1. **Password Protection**:
   - Passwords hashed using `bcryptjs` with 10 salt rounds before persisting to MongoDB.
   - Password verification performed via `bcrypt.compare()` in constant-time hash comparison.
   - `passwordHash` is never returned in any response.
2. **JWT Authentication & Middleware**:
   - Signed using standard HMAC SHA-256 algorithm with secret loaded strictly from environment (`JWT_SECRET`).
   - Configurable token expiration (default: `7d`).
   - Token payload carries safe user identification: `{ id, email, role }`.
   - `requireAuth` validates Bearer tokens on protected backend routes. Distinguishes between expired tokens (returns 401 with renewal prompt) and malformed/tampered tokens.
3. **Admin Authorization & Dual-Portal Segregation**:
   - `requireAdmin` middleware enforces elevated administrative privileges (`req.user && req.user.role === 'admin'`). Unauthenticated requests are rejected with 401; non-admin users (e.g. students) are rejected with 403 Forbidden.
   - Dual-gate portal segregation:
     - Students attempting to log in at `/api/v1/auth/admin/login` or `AdminLogin.jsx` are strictly rejected with 403.
     - Admins attempting to log in at `/api/v1/auth/login` or `Login.jsx` are rejected with 403.
   - Zero fake admin users: No dummy/mock admin credentials created or seeded in production code paths.
4. **Frontend Route Protection**:
   - `frontend/src/utils/auth.js` automatically decodes token expiration.
   - Expired or malformed tokens in `localStorage` are automatically purged upon page refresh.
   - `ProtectedRoute.jsx` intercepts unauthenticated or non-student visits to student sections.
   - `AdminRoute.jsx` intercepts unauthenticated visits (redirecting to `/admin/login`) and non-admin visits (rendering styled Access Denied state).
5. **Input Validation**:
   - Full validation executed before database operations (`validateRegisterInput`, `validateLoginInput`).
6. **HTTP Security Headers**: `helmet()` middleware.
7. **CORS Restrictions**: Origin locked to `CLIENT_URL`.
8. **Secret Isolation**: All credentials and signing keys loaded from `.env` files via `config/env.js`.

---

## 11. Student Authentication Complete Test & Bug Verification Report

### A. Bugs Found
1. **MongoDB Disconnection Request Hang (Backend)**:
   - *Bug*: When MongoDB was disconnected, Mongoose buffered database queries (`findOne`, `create`) for 10-30 seconds before timing out with an unhandled `MongooseError`. The frontend request spun indefinitely until connection timeout.
2. **Bypassed Protected Route Security (Frontend)**:
   - *Bug*: `ProtectedRoute.jsx` contained `if (isAuthenticated === false && typeof isAuthenticated === 'boolean' && false)`, which never triggered. Any unauthenticated visitor could directly access protected routes (`/dashboard`).
3. **Unvalidated Stale/Expired Token Persistence (Frontend)**:
   - *Bug*: `Login.jsx` read raw token from `localStorage` without validating JWT expiration. An expired token survived page refreshes and showed an active verified status instead of clearing and requesting re-authentication.
4. **Missing Backend Auth Middleware & Profile Verification (Backend)**:
   - *Bug*: The backend lacked `requireAuth` middleware to inspect incoming `Authorization: Bearer <token>` headers, distinguish between expired vs invalid tokens, and protect internal API resources.

### B. Fixes Implemented
1. **Database Disconnection Guard**:
   - Added `isDBConnected()` in [`db.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/config/db.js).
   - In [`authService.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/services/authService.js), verified connection status upfront; if disconnected, immediately return HTTP 503 ("Database service is currently unavailable") without buffering delays.
   - Added `serverSelectionTimeoutMS: 5000` to Mongoose options.
2. **Hardened ProtectedRoute**:
   - Updated [`ProtectedRoute.jsx`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/routes/ProtectedRoute.jsx) to call `isAuthenticated()` from the centralized auth helper. Automatically redirects unauthenticated or expired visitors to `/login`.
3. **Centralized Frontend Auth Utility**:
   - Created [`frontend/src/utils/auth.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/utils/auth.js) with `parseJwtPayload()`, `isTokenExpired()`, `getStoredAuth()`, `setStoredAuth()`, and `clearStoredAuth()`.
   - On page refresh or auth check, expired tokens are cleanly scrubbed from storage and rejected.
4. **Backend Token Authentication Middleware & Endpoint**:
   - Created [`backend/src/middleware/authMiddleware.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/middleware/authMiddleware.js) with `requireAuth` (handling missing, expired, and invalid tokens) and `requireRole`.
   - Added `GET /api/v1/auth/me` to [`authRoutes.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/routes/authRoutes.js) and [`authController.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/src/controllers/authController.js).
   - Injected Bearer token into HTTP client requests in [`api.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/frontend/src/services/api.js).

### C. Comprehensive Automated Tests Executed
Created automated test suite in [`backend/tests/auth.test.js`](file:///c:/Users/ASUS/OneDrive/Desktop/mini%20project/backend/tests/auth.test.js) (34 tests across 8 suites, 100% pass rate):
- **MongoDB Connection Tests**:
  - `isDBConnected` accurately reports connection status.
  - `registerStudent` immediately throws 503 on disconnected database.
  - `loginStudent` immediately throws 503 on disconnected database.
  - Live HTTP health endpoint returns `{ database: { status: 'disconnected' } }`.
- **Missing Fields Validation Tests**:
  - Empty body `{}` rejected with 400.
  - Whitespace-only name rejected with 400.
  - Missing email rejected with 400.
  - Missing password rejected with 400.
  - Login missing fields rejected with 400.
- **Invalid Email Validation Tests**:
  - Rejects `notanemail`, `user@`, `@domain.com`, `user@domain`, `user name@domain.com`, `user@.com`.
  - Accepts RFC-compliant emails (`student.algo@university.edu`).
- **Password Constraint Tests**:
  - Rejects password < 8 characters with 400.
  - Accepts password >= 8 characters.
- **Registration Flow Tests**:
  - Bcrypt salting and hashing verified (`$2...`).
  - Plaintext password never stored.
  - `passwordHash` deleted from serialized response.
  - Role defaults strictly to `'student'`.
- **Duplicate Email Tests**:
  - Re-registering with same email (case-insensitive) throws 409 Conflict.
- **Wrong Password & Non-Existent User Tests**:
  - Non-existent email rejected with 401 Unauthorized.
  - Wrong password rejected with 401 Unauthorized (`bcrypt.compare` failure).
- **Correct Login Tests**:
  - Returns safe student object and signed JWT token.
  - JWT verified to contain `{ id, email, role: 'student' }`.
- **Role Enforcement Tests**:
  - Non-student role (e.g., admin attempting student login) rejected with 403 Forbidden.
- **Invalid Token Tests**:
  - Missing Authorization header rejected with 401.
  - Non-Bearer header rejected with 401.
  - Tampered/malformed token rejected with 401 ("Invalid authentication token").
- **Expired Token Tests**:
  - Expired token rejected with 401 ("Token has expired. Please log in again.").
- **Page Refresh & Storage Tests**:
  - Page refresh with active token restores session.
  - Page refresh with expired token purges storage and returns null.
  - Page refresh with corrupted JSON purges storage.
- **Logout Tests**:
  - `clearStoredAuth()` purges token and user data from storage; user transitions to unauthenticated.
- **Protected Route Tests**:
  - Unauthenticated / expired user is redirected to `/login`.
  - Authenticated user successfully gains access.
- **Admin Authentication & Student vs Admin Access Enforcement Tests (Suite 8)**:
  - `loginAdmin` successfully authenticates valid admin credentials and returns unexposed password hash and valid JWT with `role: 'admin'`.
  - `loginAdmin` rejects student credentials with 403 Forbidden ("Access denied. This login portal is reserved for administrators.").
  - `loginStudent` rejects admin credentials with 403 Forbidden ("Access denied. This login portal is reserved for students.").
  - `loginAdmin` rejects wrong password with 401 Unauthorized.
  - `loginAdmin` rejects non-existent email with 401 Unauthorized.
  - `loginAdmin` throws 503 when database is disconnected.
  - `requireAdmin` rejects unauthenticated requests missing `req.user` with 401 Unauthorized.
  - `requireAdmin` rejects authenticated students with 403 Forbidden ("Requires admin privileges").
  - `requireAdmin` allows authenticated admins and proceeds to `next()`.
  - `requireRole` enforces reciprocal privilege isolation between student and admin accounts.
  - Client-side route guards strictly enforce mutual access control (`AdminRoute` blocks students, `ProtectedRoute` blocks admins).

---

## 12. Current Progress
- **Project Foundation**: 100% Complete.
- **Backend Modular Architecture**: 100% Complete and verified.
- **User Mongoose Model**: 100% Complete and verified.
- **Student Registration (Backend API + Frontend UI)**: 100% Complete and verified.
- **Student Login (Backend API + Frontend UI)**: 100% Complete and verified.
- **Admin Authentication (Backend API + Frontend UI)**: 100% Complete and verified.
- **Admin Authorization Middleware (`requireAdmin`)**: 100% Complete and verified.
- **Admin Protected Routing (`AdminRoute.jsx`)**: 100% Complete and verified.
- **Student Application Layout (Sidebar, Topbar, Content Area, MobileNav)**: 100% Complete and verified.
- **12 Student Navigation Sections Registry**: 100% Complete and verified (Dashboard, Learn, Practice, Debug Arena, Tests, Competitions, Leaderboard, Progress, AI Assistant, Batches, Profile, Settings).
- **Student Dashboard (Backend API + Frontend UI)**: 100% Complete and verified:
  - Backend: `GET /api/v1/student/dashboard` protected by `requireAuth` returning 7 real database-driven sections (Current Roadmap, Learning Progress, Recent Activity, Skill Progress, Test Performance, Streak, Recommendations).
  - Frontend: `Dashboard.jsx` built with real database metrics, real 0 values, and explicit `EmptyState` cards when no data exists (zero fake statistics).
- **Programming Languages System (C, C++, Java, Python, JavaScript)**: 100% Complete and verified:
  - MongoDB `Language` Model with schema validation, indexes, compiler versions, file extensions, and starter templates.
  - Backend endpoints: `GET /api/v1/languages`, `GET /api/v1/languages/:slug`, `GET /api/v1/student/language`, and `POST /api/v1/student/language`.
  - Idempotent canonical language seeder and `ensureDefaultLanguages()` utility (no fake student data).
  - Frontend: `LanguageSelectorModal.jsx` for browsing supported languages and selecting preferred runtime; Topbar runtime switcher pill; Dashboard Programming Environment card.
- **Web Development Track System (HTML, CSS, JavaScript, React, Node.js, MongoDB)**: 100% Complete and verified:
  - MongoDB `Track` model with schema validation, order, module arrays, topics count, and pre-save hooks.
  - Backend endpoints: `GET /api/v1/tracks`, `GET /api/v1/tracks/:slug`, `GET /api/v1/student/track`, and `POST /api/v1/student/track`.
  - Canonical `DEFAULT_TRACKS` in `trackService.js` and standalone CLI seeder `seedTracks.js` (`npm run seed:tracks`).
  - In-memory data store fallback support for tracks when MongoDB is offline.
  - Frontend: Dedicated curriculum page `Learn.jsx` at `/learn` featuring Web Development track and 6 modules breakdown with key concepts; `TrackSelectorModal.jsx` for quick track exploration & selection; Dashboard Roadmap card integration with track switching and live module progress.
- **Comprehensive Authentication, Dashboard, Language & Track Test Suite (68 automated tests, 12 suites)**: 100% Complete and verified (100% pass rate).
- **CodeForge Theme & Design System**: 100% Complete and verified.
- **Global AuthContext & Protected Routing**: 100% Complete and verified.
- **Admin Dashboard & Language CRUD**: 0% (Strictly deferred; admin CRUD will be added later; zero fake statistics or mock dashboards).

---

## 13. Pending Tasks

### Phase 1: Authentication, Layout, Dashboard, Languages & Learning Tracks (Complete)
- [x] Design User Mongoose schema (name, email, passwordHash, role: student/admin, timestamps).
- [x] Implement password hashing using bcrypt.
- [x] Implement endpoint: `POST /api/v1/auth/register`.
- [x] Build Frontend Auth UI: Registration page (`/register`) using design system tokens.
- [x] Create JWT generation and verification utility (`jwt.js`).
- [x] Implement endpoint: `POST /api/v1/auth/login` (student login).
- [x] Build Frontend Auth UI: Login page (`/login`) using design system tokens.
- [x] Create authentication middleware (`requireAuth`, `requireRole`).
- [x] Implement endpoint: `GET /api/v1/auth/me`.
- [x] Create comprehensive authentication test suite and fix bugs.
- [x] Create centralized AuthContext & session state management.
- [x] Build hardened ProtectedRoute guarding student-only pages.
- [x] Implement endpoint: `POST /api/v1/auth/admin/login` (Admin login).
- [x] Build Frontend Admin Auth UI:
  - Admin login page (`/admin/login`).
  - Admin protected routes and admin session verification.
- [x] Create Student Application Workspace Layout:
  - Collapsible desktop Sidebar with 12 navigation sections.
  - Sticky Topbar with breadcrumbs, command bar trigger, status pill, and user profile pill.
  - Responsive mobile drawer navigation (`MobileNav.jsx`) with backdrop blur.
  - Scrollable main content area with max-width containment.
  - Registered all 12 student routes under ProtectedRoute.
- [x] Build Student Dashboard UI & API:
  - Backend endpoint `GET /api/v1/student/dashboard` with database disconnection protection.
  - Real database-driven sections: Current roadmap, Learning progress, Recent activity, Skill progress, Test performance, Streak, Recommendations.
  - Honest 0s and tailored empty states with action CTAs.
  - Zero fake statistics or synthetic charts.
- [x] Implement Programming Languages (C, C++, Java, Python, JavaScript):
  - Design MongoDB Language model (name, slug, version, fileExtension, monacoMode, defaultTemplate, description, isActive, displayOrder).
  - Add `selectedLanguage` to User schema.
  - Implement language endpoints: `GET /api/v1/languages`, `GET /api/v1/languages/:slug`, `GET /api/v1/student/language`, `POST /api/v1/student/language`.
  - Student language view & select UI with `LanguageSelectorModal`, Topbar runtime pill, and Dashboard Programming Environment card.
  - No fake student data seeded.
- [x] Database Fallback & Admin System:
  - Fixed database connection errors (503 Service Unavailable) caused by missing local MongoDB service by implementing `devFallbackStore.js` with automatic in-memory persistence when MongoDB is unreachable.
  - Seeded default demo accounts: Student (`student@codeforge.dev` / `Student@123`) and Admin (`admin@codeforge.dev` / `Admin@123`).
  - Implemented standalone `seedUsers.js` script (`npm run seed:users`) for populating MongoDB when running with real database instance.
  - Created `/api/v1/admin/overview` backend route returning authentic platform metrics and enrolled student directory.
  - Unified Login system in `Login.jsx` with tabs for Student Portal and Admin Portal, quick one-click demo credentials filling, and role-appropriate redirection.
  - Built dedicated `AdminDashboard.jsx` at `/admin` featuring student directory table, language catalog matrix, and system diagnostics.
  - Integrated Admin Portal quick shortcuts into `Topbar.jsx` and `Sidebar.jsx` when authenticated user holds `admin` role.
- [x] Implement Web Development Track:
  - MongoDB `Track` model (name, slug, description, category, modules array, totalModules, level, estimatedHours, isActive, displayOrder).
  - Canonical Web Development Track with exactly 6 modules: HTML, CSS, JavaScript, React, Node.js, MongoDB.
  - Endpoints: `GET /api/v1/tracks`, `GET /api/v1/tracks/:slug`, `GET /api/v1/student/track`, `POST /api/v1/student/track`.
  - Student View & Select capabilities: Dedicated `Learn.jsx` at `/learn` with 6-module roadmap and syllabus concepts; `TrackSelectorModal.jsx` for modal selection; Dashboard Roadmap integration.
  - Comprehensive Suite 11 automated tests (68 tests total across 12 suites, 100% passing).




### Phase 2: Problem Catalog & Management
- [ ] Design Problem schema (title, slug, difficulty, description, constraints, sample test cases, hidden test cases).
- [ ] Implement Problem CRUD endpoints for administrators.
- [ ] Implement public problem listing and filtering API (by difficulty, tags).
- [ ] Build Frontend Problem Catalog view and Problem Detail view using design system tokens.

### Phase 3: Code Editor & Execution Sandbox
- [ ] Integrate web code editor component (e.g. Monaco Editor).
- [ ] Build backend execution worker / sandbox service with resource constraints (time and memory limits).
- [ ] Support initial target languages (e.g. JavaScript, Python).
- [ ] Run code against sample test cases and return execution verdicts.

### Phase 4: Submissions & Progress Tracking
- [ ] Design Submission schema (user, problem, code, language, status: Accepted/WA/TLE/Error, runtime, memory).
- [ ] Implement submission endpoint and asynchronous test-runner evaluation.
- [ ] Display submission history and verdict badges on frontend.

---

## 14. Important Rules
1. **Mandatory Memory Reading**: Before every future task, read `brain.md` to maintain contextual continuity and adhere to decisions already taken.
2. **Mandatory Memory Updating**: After every completed task, update `brain.md` with what was actually built, modified, or decided.
3. **Honest Progress Tracking**: Never mark unfinished work as completed.
4. **Zero Fake Operational Data**: Never inject mock databases, fake users, mock payment flows, or dummy problem sets into production code paths.
5. **Architectural Preservation**: Do not change existing architecture unnecessarily. Follow established patterns (modular layers, separation of frontend and backend).
6. **Code Style Conventions**:
   - Clean, readable code with single responsibility per module.
   - Meaningful, self-documenting names.
   - Exactly one blank line between functions.
   - Reusable functions and components.
   - Proper indentation and formatting throughout.

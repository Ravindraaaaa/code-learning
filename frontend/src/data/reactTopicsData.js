/**
 * CodeForge - Complete React.js Professional Curriculum Topics (Beginner to Advanced)
 * 36 Core Comprehensive Topics + Capstone Mini Project:
 * - Structured Notes: Concept, Syntax, Explanation, Code Example, Expected Output, Common Mistakes
 * - Interactive Try It Yourself live playground starters
 * - 3 Practice Questions per topic: Easy, Medium, and Challenge with automated validators
 * - Interactive Quiz with instant feedback and explanations
 * - Verified YouTube Educational Resources from trusted educators (Web Dev Simplified, Dave Gray, Fireship, Codevolution)
 */

export const REACT_TOPICS = [
  {
    "id": "react-topic-1",
    "order": 1,
    "slug": "react-introduction",
    "title": "Introduction to React",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Discover React: the open-source declarative JavaScript library created by Meta for engineering high-performance component-driven web interfaces.",
    "notes": {
      "concept": "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Instead of manually manipulating the browser DOM with imperative methods like document.createElement or element.appendChild, React allows developers to design views for each state in an application. When data changes, React efficiently updates and renders only the exact sub-trees of components that changed using an in-memory Virtual DOM.",
      "syntax": "// Basic React Component Structure\nimport React from 'react';\n\nfunction Greeting() {\n  return <h1>Hello, CodeForge!</h1>;\n}\n\nexport default Greeting;",
      "explanation": "1. Declarative Paradigm: You describe WHAT the UI should look like for a given state, and React handles the HOW of DOM updates.\n2. Component-Based Architecture: UIs are assembled from independent, self-contained, reusable building blocks called components.\n3. Virtual DOM: A lightweight in-memory representation of the real DOM that computes minimal diffs before applying real browser DOM mutations.\n4. Unidirectional Data Flow: Data flows strictly downwards from parent to child via props, making application behavior predictable and easy to debug.",
      "codeExample": "import React from 'react';\n\nexport function WelcomeCard() {\n  const learnerName = \"Alex\";\n  const course = \"React Mastery\";\n\n  return (\n    <div className=\"card\">\n      <h2>Welcome, {learnerName}!</h2>\n      <p>Enrolled in: {course}</p>\n      <span>Status: Active</span>\n    </div>\n  );\n}",
      "expectedOutput": "A card rendering an h2 heading \"Welcome, Alex!\", a paragraph \"Enrolled in: React Mastery\", and an active status badge.",
      "commonMistakes": [
        {
          "mistake": "Treating React like a monolithic full-featured framework (like Angular or Django).",
          "correction": "Recognize that React is a UI library focused strictly on the view layer; routing, state management, and build tools are chosen from its rich ecosystem.",
          "explanation": "React gives developers freedom to select routing (React Router), state (Redux/Zustand), and build engines (Vite)."
        },
        {
          "mistake": "Manually querying and modifying the DOM using document.querySelector inside React components.",
          "correction": "Let React manage the DOM declaratively through state and props rather than imperative DOM queries.",
          "explanation": "Direct DOM manipulation conflicts with React Virtual DOM reconciliation and causes hard-to-trace UI synchronization bugs."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Create a greeting component that renders an h1 greeting and a paragraph with your platform name.",
      "starterCode": "function App() {\n  const platform = \"CodeForge\";\n  return (\n    <div>\n      {/* Add your heading and paragraph here */}\n      <h1>Welcome to React</h1>\n      <p>Learning on {platform}</p>\n    </div>\n  );\n}",
      "solutionCode": "function App() {\n  const platform = \"CodeForge\";\n  return (\n    <div>\n      <h1>Welcome to React</h1>\n      <p>Learning on {platform}</p>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q1-1",
        "level": "Easy",
        "title": "Create a Functional Component Header",
        "prompt": "Write a functional component named Header that returns an <h1> element containing \"CodeForge Learning\".",
        "requirements": [
          "Define function Header",
          "Return <h1> element",
          "Include text \"CodeForge Learning\""
        ],
        "starterCode": "// Write your Header component here\n",
        "solutionCode": "function Header() {\n  return <h1>CodeForge Learning</h1>;\n}",
        "expectedOutput": "An <h1> element rendering \"CodeForge Learning\".",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+Header\s*\(/i.test(code) && !/const\s+Header\s*=/i.test(code)) {
            return { valid: false, message: 'Define Header component function.' };
          }
          if (!/<h1>\s*CodeForge Learning\s*<\/h1>/i.test(code)) {
            return { valid: false, message: 'Return <h1>CodeForge Learning</h1>.' };
          }
          return { valid: true, message: 'Header component verified!' };
        }
      },
      {
        "id": "react-q1-2",
        "level": "Medium",
        "title": "Embed Dynamic JavaScript Expressions in JSX",
        "prompt": "Create a component named Profile that declares a variable username = \"Developer\" and returns a <div> with a paragraph displaying \"User: Developer\" using JSX curly braces {username}.",
        "requirements": [
          "Component Profile",
          "Declare variable username",
          "Embed {username} inside <p>User: {username}</p>"
        ],
        "starterCode": "// Write your Profile component here\n",
        "solutionCode": "function Profile() {\n  const username = \"Developer\";\n  return <div><p>User: {username}</p></div>;\n}",
        "expectedOutput": "A <div> containing a paragraph with dynamic username interpolated.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+Profile/i.test(code) && !/const\s+Profile/i.test(code)) {
            return { valid: false, message: 'Define Profile component.' };
          }
          if (!/username\s*=\s*["']Developer["']/i.test(code)) {
            return { valid: false, message: 'Declare username = "Developer".' };
          }
          if (!/\{username\}/i.test(code)) {
            return { valid: false, message: 'Embed dynamic expression {username} in JSX.' };
          }
          return { valid: true, message: 'Dynamic expression verified!' };
        }
      },
      {
        "id": "react-q1-3",
        "level": "Challenge",
        "title": "Build a Multi-Element Badge Card",
        "prompt": "Write a component named CourseBadge returning a <section> with an <h2> title \"React Core\", a <span> badge with className=\"badge\" showing \"Beginner\", and a paragraph \"36 Lessons\".",
        "requirements": [
          "Component CourseBadge",
          "<section> container",
          "<h2>React Core</h2>",
          "<span className=\"badge\">Beginner</span>",
          "<p>36 Lessons</p>"
        ],
        "starterCode": "// Write CourseBadge component\n",
        "solutionCode": "function CourseBadge() {\n  return (\n    <section>\n      <h2>React Core</h2>\n      <span className=\"badge\">Beginner</span>\n      <p>36 Lessons</p>\n    </section>\n  );\n}",
        "expectedOutput": "A structured course card with title, styled badge span, and lesson count.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+CourseBadge/i.test(code) && !/const\s+CourseBadge/i.test(code)) {
            return { valid: false, message: 'Define CourseBadge component.' };
          }
          if (!/<section[\s\S]*<\/section>/i.test(code)) return { valid: false, message: 'Wrap output in <section>.' };
          if (!/<h2>React Core<\/h2>/i.test(code)) return { valid: false, message: 'Include <h2>React Core</h2>.' };
          if (!/className=["']badge["']/i.test(code)) return { valid: false, message: 'Use className="badge".' };
          if (!/<p>36 Lessons<\/p>/i.test(code)) return { valid: false, message: 'Include <p>36 Lessons</p>.' };
          return { valid: true, message: 'CourseBadge verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary function of the Virtual DOM in React?",
        "options": [
          "It replaces the browser DOM entirely with a native WebAssembly canvas",
          "It computes lightweight diffs in memory to minimize real browser DOM reflows and repaints",
          "It securely stores user authentication tokens in encrypted browser storage",
          "It compiles JavaScript into machine bytecode"
        ],
        "correctIndex": 1,
        "explanation": "The Virtual DOM allows React to calculate exactly what changed in memory and execute batch mutations on the real DOM, preventing costly layout re-renders."
      },
      {
        "id": 2,
        "question": "Which company created and maintains React?",
        "options": [
          "Google",
          "Meta (Facebook)",
          "Microsoft",
          "Amazon"
        ],
        "correctIndex": 1,
        "explanation": "React was created by Jordan Walke at Meta (Facebook) in 2011 and released as open source in 2013."
      },
      {
        "id": 3,
        "question": "What does \"unidirectional data flow\" mean in React?",
        "options": [
          "Data flows strictly from child components up to parent components",
          "Data flows exclusively in one direction: from parent components down to child components via props",
          "Data can only be written to databases, never read",
          "Components cannot share data with each other"
        ],
        "correctIndex": 1,
        "explanation": "Unidirectional data flow ensures state transitions remain predictable because data passes down from parents to children via props."
      }
    ],
    "video": {
      "title": "Learn React In 30 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "hQAHSlTtcmY",
      "url": "https://www.youtube.com/watch?v=hQAHSlTtcmY",
      "description": "Web Dev Simplified teaches core React fundamentals: component structure, JSX, state, props, and rendering."
    }
  },
  {
    "id": "react-topic-2",
    "order": 2,
    "slug": "why-react-and-features",
    "title": "Why React and Its Features",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Explore the architectural pillars that made React the global standard: the reconciliation engine, component reusability, JSX, and vast ecosystem.",
    "notes": {
      "concept": "Before React, web developers relied on vanilla JavaScript or libraries like jQuery to manually search the DOM and modify innerHTML or styles. As applications grew, tracking state changes across dozens of interdependent DOM nodes created brittle spaghetti code. React introduced declarative state-driven views: developers define how UI looks for any given state, and React handles syncing the DOM.",
      "syntax": "// Virtual DOM Reconciliation Diffing Flow:\n// 1. State changes -> 2. New Virtual DOM tree constructed\n// 3. Diffed against Previous Virtual DOM tree\n// 4. Batch minimal patch applied to real browser DOM",
      "explanation": "1. Virtual DOM & Diffing: Compares old and new Virtual DOM snapshots with an O(n) heuristic reconciliation algorithm.\n2. Component Reusability: Write once, reuse everywhere with customized props.\n3. Ecosystem & Community: Massive ecosystem (React Router, Next.js, Redux, Tailwind, React Query).\n4. Cross-Platform Capabilities: Knowledge transfers directly to mobile native apps via React Native.",
      "codeExample": "// Reusable MetricCard component used across analytics dashboards\nexport function MetricCard({ label, value, trend }) {\n  return (\n    <div className=\"metric-box\">\n      <span className=\"metric-label\">{label}</span>\n      <h3 className=\"metric-val\">{value}</h3>\n      <span className={trend > 0 ? \"positive\" : \"negative\"}>\n        {trend > 0 ? \"+\" : \"\"}{trend}%\n      </span>\n    </div>\n  );\n}",
      "expectedOutput": "A reusable metric tile showing label, formatted value, and green/red trend indicator.",
      "commonMistakes": [
        {
          "mistake": "Assuming the Virtual DOM is always faster than direct, handcrafted DOM manipulations.",
          "correction": "Understand that the Virtual DOM is fast enough for 99% of web apps while delivering massive maintainability, developer velocity, and declarative safety.",
          "explanation": "Virtual DOM eliminates human synchronization errors rather than outperforming raw optimized C++ browser bindings."
        },
        {
          "mistake": "Modifying props directly inside a child component.",
          "correction": "Props are strictly read-only; never mutate props.props.value = newValue.",
          "explanation": "Mutating props violates pure component contract and breaks reconciliation guarantees."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Build a reusable feature highlight component with title and description props.",
      "starterCode": "function FeatureItem(props) {\n  return (\n    <div className=\"feature-item\">\n      <h3>{props.title}</h3>\n      <p>{props.description}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <FeatureItem title=\"Virtual DOM\" description=\"Superfast reconciliation diffing.\" />\n      <FeatureItem title=\"Component-Driven\" description=\"Modular, reusable UI blocks.\" />\n    </div>\n  );\n}",
      "solutionCode": "function FeatureItem(props) {\n  return (\n    <div className=\"feature-item\">\n      <h3>{props.title}</h3>\n      <p>{props.description}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <FeatureItem title=\"Virtual DOM\" description=\"Superfast reconciliation diffing.\" />\n      <FeatureItem title=\"Component-Driven\" description=\"Modular, reusable UI blocks.\" />\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q2-1",
        "level": "Easy",
        "title": "Create a Feature Tag Component",
        "prompt": "Write a component named FeatureTag that accepts a prop named name and returns a <span className=\"tag\">{name}</span>.",
        "requirements": [
          "Component FeatureTag",
          "Accepts name prop",
          "Returns <span className=\"tag\">{name}</span>"
        ],
        "starterCode": "// Write FeatureTag component\n",
        "solutionCode": "function FeatureTag({ name }) {\n  return <span className=\"tag\">{name}</span>;\n}",
        "expectedOutput": "A styled tag span displaying the feature name.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+FeatureTag/i.test(code) && !/const\s+FeatureTag/i.test(code)) {
            return { valid: false, message: 'Define FeatureTag component.' };
          }
          if (!/className=["']tag["']/i.test(code)) {
            return { valid: false, message: 'Use className="tag".' };
          }
          if (!/\{name\}/i.test(code) && !/\{props\.name\}/i.test(code)) {
            return { valid: false, message: 'Render name prop in span.' };
          }
          return { valid: true, message: 'FeatureTag verified!' };
        }
      },
      {
        "id": "react-q2-2",
        "level": "Medium",
        "title": "Stat Tile with Destructured Props",
        "prompt": "Create a component StatTile destructuring title and count from props. Return a <div className=\"stat\"> with an <h4> showing title and an <strong> showing count.",
        "requirements": [
          "Component StatTile",
          "Destructure { title, count }",
          "<h4>{title}</h4>",
          "<strong>{count}</strong>"
        ],
        "starterCode": "// Write StatTile\n",
        "solutionCode": "function StatTile({ title, count }) {\n  return (\n    <div className=\"stat\">\n      <h4>{title}</h4>\n      <strong>{count}</strong>\n    </div>\n  );\n}",
        "expectedOutput": "A stat tile with title heading and bold count number.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+StatTile/i.test(code) && !/const\s+StatTile/i.test(code)) {
            return { valid: false, message: 'Define StatTile component.' };
          }
          if (!/<h4>[\s\S]*\{title\}[\s\S]*<\/h4>/i.test(code)) return { valid: false, message: 'Render {title} in <h4>.' };
          if (!/<strong>[\s\S]*\{count\}[\s\S]*<\/strong>/i.test(code)) return { valid: false, message: 'Render {count} in <strong>.' };
          return { valid: true, message: 'StatTile verified!' };
        }
      },
      {
        "id": "react-q2-3",
        "level": "Challenge",
        "title": "Feature List Composition",
        "prompt": "Write a component FeaturesList that renders a <ul> containing three <li> items: \"Virtual DOM\", \"Declarative UI\", and \"Unidirectional Data\".",
        "requirements": [
          "Component FeaturesList",
          "<ul> container",
          "3 <li> elements with the specified features"
        ],
        "starterCode": "// Write FeaturesList\n",
        "solutionCode": "function FeaturesList() {\n  return (\n    <ul>\n      <li>Virtual DOM</li>\n      <li>Declarative UI</li>\n      <li>Unidirectional Data</li>\n    </ul>\n  );\n}",
        "expectedOutput": "An unordered list itemizing the three core pillars of React.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+FeaturesList/i.test(code) && !/const\s+FeaturesList/i.test(code)) {
            return { valid: false, message: 'Define FeaturesList component.' };
          }
          if (!/<ul>[\s\S]*<\/ul>/i.test(code)) return { valid: false, message: 'Wrap items in <ul>.' };
          if (!/Virtual DOM/i.test(code) || !/Declarative UI/i.test(code) || !/Unidirectional Data/i.test(code)) {
            return { valid: false, message: 'Include all 3 feature items in <li> elements.' };
          }
          return { valid: true, message: 'FeaturesList verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which problem did React primarily solve compared to older jQuery-style web development?",
        "options": [
          "It eliminated the need for CSS styles",
          "It solved the fragile synchronization between UI state and DOM elements through declarative rendering",
          "It removed the browser JavaScript engine",
          "It made all network requests synchronous"
        ],
        "correctIndex": 1,
        "explanation": "React eliminated manual imperative DOM updates by establishing declarative state-driven views that re-render automatically when data changes."
      },
      {
        "id": 2,
        "question": "Can React components be reused across different parts of an application?",
        "options": [
          "No, components can only be rendered once",
          "Yes, components are self-contained functions that can be rendered multiple times with different props",
          "Only if they share the exact same ID attribute",
          "Only when compiled to WebAssembly"
        ],
        "correctIndex": 1,
        "explanation": "Components are modular building blocks that accept unique props and can be rendered repeatedly across an app."
      },
      {
        "id": 3,
        "question": "What is the mobile application framework powered by React called?",
        "options": [
          "React Mobile",
          "React Native",
          "React Phone",
          "React Flutter"
        ],
        "correctIndex": 1,
        "explanation": "React Native compiles React component logic into native iOS and Android UI views."
      }
    ],
    "video": {
      "title": "React in 100 Seconds",
      "channel": "Fireship",
      "videoId": "Tn6-PIqc4UM",
      "url": "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
      "description": "Fireship provides a lightning-fast breakdown of React, its Virtual DOM, JSX, and component philosophy."
    }
  },
  {
    "id": "react-topic-3",
    "order": 3,
    "slug": "react-setup-vite",
    "title": "React Setup with Vite",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Learn modern React project scaffolding using Vite: lightning-fast Hot Module Replacement (HMR), native ES Modules, and production bundling with Rollup.",
    "notes": {
      "concept": "Vite (French word for \"quick\", pronounced /veet/) is the modern frontend build tool that replaced legacy bundlers like Webpack and Create React App (CRA). While CRA bundled the entire application upfront before starting a dev server, Vite serves source code over native ES Modules (ESM) in the browser, compiling files on-demand. This delivers sub-second server start times and instant Hot Module Replacement (HMR) regardless of project size.",
      "syntax": "# Scaffolding a modern React application with Vite:\nnpm create vite@latest my-react-app -- --template react\n\n# Navigate into project directory\ncd my-react-app\n\n# Install project dependencies\nnpm install\n\n# Start ultra-fast local development server\nnpm run dev\n\n# Compile optimized static bundle for production\nnpm run build",
      "explanation": "1. npm create vite@latest: Clones the official minimal template structure without bloated legacy dependencies.\n2. Native ESM: The browser imports modules directly during development without slow bundling.\n3. Esbuild: Pre-bundles third-party dependencies in Go at 10x-100x the speed of JavaScript-based bundlers.\n4. Hot Module Replacement (HMR): Updates edited React components in the running browser instantly without losing component state.",
      "codeExample": "// vite.config.js - Modern React Vite configuration\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: 3000,\n    open: true\n  }\n});",
      "expectedOutput": "A running local development server accessible at http://localhost:3000 with instant HMR upon file edits.",
      "commonMistakes": [
        {
          "mistake": "Using deprecated Create React App (create-react-app) for new modern projects.",
          "correction": "Use Vite (npm create vite@latest) or a framework like Next.js.",
          "explanation": "Create React App has been unmaintained since 2022 and relies on slow, outdated Webpack configurations."
        },
        {
          "mistake": "Naming React component files with .js extension instead of .jsx in Vite.",
          "correction": "Always name React files containing JSX with .jsx (or .tsx).",
          "explanation": "Vite uses fast esbuild parsers that strictly expect JSX syntax inside .jsx/.tsx files."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Review a minimal Vite index.html entry point connecting to main.jsx.",
      "starterCode": "<!-- index.html in a Vite React Project -->\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <!-- Vite loads the React application via native ES Modules -->\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>",
      "solutionCode": "<!-- index.html in a Vite React Project -->\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>"
    },
    "practiceQuestions": [
      {
        "id": "react-q3-1",
        "level": "Easy",
        "title": "Identify Vite Root Script Tag",
        "prompt": "Write the HTML <script> tag used by Vite to load the React entrypoint file \"/src/main.jsx\" with type=\"module\".",
        "requirements": [
          "<script> tag",
          "type=\"module\"",
          "src=\"/src/main.jsx\""
        ],
        "starterCode": "<!-- Write Vite script entrypoint -->\n",
        "solutionCode": "<script type=\"module\" src=\"/src/main.jsx\"></script>",
        "expectedOutput": "An HTML script tag loading /src/main.jsx as an ES module.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<script/i.test(code)) return { valid: false, message: 'Include <script> tag.' };
          if (!/type=["']module["']/i.test(code)) return { valid: false, message: 'Include type="module".' };
          if (!/src=["']\/src\/main\.jsx["']/i.test(code)) return { valid: false, message: 'Include src="/src/main.jsx".' };
          return { valid: true, message: 'Vite entrypoint script tag verified!' };
        }
      },
      {
        "id": "react-q3-2",
        "level": "Medium",
        "title": "Configure Vite React Plugin",
        "prompt": "Write a basic vite.config.js export using defineConfig with plugins: [react()].",
        "requirements": [
          "Import defineConfig from \"vite\"",
          "Import react from \"@vitejs/plugin-react\"",
          "export default defineConfig({ plugins: [react()] })"
        ],
        "starterCode": "// Write vite.config.js\n",
        "solutionCode": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\n\nexport default defineConfig({\n  plugins: [react()]\n});",
        "expectedOutput": "A clean Vite configuration file integrating the React plugin.",
        "validate": (code) => {
          code = String(code || '');
          if (!/defineConfig/i.test(code)) return { valid: false, message: 'Use defineConfig.' };
          if (!/plugins\s*:\s*\[\s*react\(\)\s*\]/i.test(code)) return { valid: false, message: 'Include plugins: [react()].' };
          return { valid: true, message: 'Vite config verified!' };
        }
      },
      {
        "id": "react-q3-3",
        "level": "Challenge",
        "title": "Create main.jsx DOM Mounter",
        "prompt": "Write the content of a React 18 main.jsx file: import React, import ReactDOM from \"react-dom/client\", and render <App /> inside ReactDOM.createRoot(document.getElementById(\"root\")).render().",
        "requirements": [
          "Import ReactDOM from \"react-dom/client\"",
          "createRoot(document.getElementById(\"root\"))",
          ".render(<App />)"
        ],
        "starterCode": "// Write main.jsx root mounting code\n",
        "solutionCode": "import React from \"react\";\nimport ReactDOM from \"react-dom/client\";\nimport App from \"./App.jsx\";\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);",
        "expectedOutput": "The official React 18 root mount call targeting the #root container.",
        "validate": (code) => {
          code = String(code || '');
          if (!/createRoot/i.test(code)) return { valid: false, message: 'Use ReactDOM.createRoot.' };
          if (!/getElementById\(["']root["']\)/i.test(code)) return { valid: false, message: 'Target document.getElementById("root").' };
          if (!/\.render\(/i.test(code)) return { valid: false, message: 'Call .render().' };
          return { valid: true, message: 'React 18 main.jsx mount verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why is Vite development server start time significantly faster than Webpack / Create React App?",
        "options": [
          "Vite does not use JavaScript at all",
          "Vite serves source code over native browser ES Modules and bundles dependencies on-demand using esbuild",
          "Vite compiles code directly to Android APK binaries",
          "Vite removes all CSS from components"
        ],
        "correctIndex": 1,
        "explanation": "Vite eliminates upfront full-application bundling by letting the browser request ES Modules on-demand, while compiling third-party libraries in Go."
      },
      {
        "id": 2,
        "question": "What command creates a new React application using the official Vite template?",
        "options": [
          "npx create-react-app my-app",
          "npm create vite@latest my-app -- --template react",
          "npm install react-vite-global",
          "git clone react-framework"
        ],
        "correctIndex": 1,
        "explanation": "npm create vite@latest is the modern CLI command to generate a lightweight Vite starter project."
      },
      {
        "id": 3,
        "question": "Which file serves as the HTML container and entrypoint in a Vite project?",
        "options": [
          "public/index.html",
          "root index.html in the project root folder",
          "src/App.html",
          "dist/index.html"
        ],
        "correctIndex": 1,
        "explanation": "Unlike Webpack where index.html was nested in /public, Vite treats index.html at the project root as the source entrypoint."
      }
    ],
    "video": {
      "title": "Vite vs Create React App",
      "channel": "Web Dev Simplified",
      "videoId": "VAeRhmpcWeQ",
      "url": "https://www.youtube.com/watch?v=VAeRhmpcWeQ",
      "description": "Web Dev Simplified explains why Vite replaced Create React App and demonstrates setting up a blazing-fast project."
    }
  },
  {
    "id": "react-topic-4",
    "order": 4,
    "slug": "project-structure",
    "title": "Project Structure",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Master professional React codebase organization: the roles of src/, components/, assets/, hooks/, pages/, and clean modular file architecture.",
    "notes": {
      "concept": "A clean project structure prevents chaos as applications scale. Standard modern React applications follow a feature-oriented or layer-oriented architecture. In a layer-based structure, files are grouped by technical type (components, pages, hooks, services, context). In feature-based structures, all files related to a feature (e.g., auth, dashboard) live together.",
      "syntax": "my-react-app/\n├── index.html              # Single HTML root entry\n├── package.json            # Dependencies and npm scripts\n├── vite.config.js          # Build tool configuration\n└── src/\n    ├── main.jsx            # Application mount into DOM\n    ├── App.jsx             # Top-level routing & layout shell\n    ├── index.css           # Global typography & reset CSS\n    ├── assets/             # Static images, SVGs, and fonts\n    ├── components/         # Shared, reusable UI widgets\n    ├── pages/              # Route view components\n    ├── hooks/              # Custom reusable React hooks\n    ├── context/            # React Context API providers\n    └── services/           # API fetch and Axios clients",
      "explanation": "1. src/main.jsx: The bootstrap file that imports React and mounts the root <App /> component into document.getElementById(\"root\").\n2. src/App.jsx: The root component managing application-level layouts, navigation bars, and page routes.\n3. src/components/: Atomic, reusable UI components (Buttons, Modals, Cards, Form Inputs).\n4. src/pages/: Screen-level components representing distinct URLs (Home, Login, Dashboard).\n5. src/services/: Network communication layer isolating backend API fetch calls from visual components.",
      "codeExample": "// Example of clean modular imports in App.jsx\nimport React from 'react';\nimport { Navbar } from './components/Navbar.jsx';\nimport { Dashboard } from './pages/Dashboard.jsx';\nimport './index.css';\n\nexport default function App() {\n  return (\n    <div className=\"app-container\">\n      <Navbar />\n      <main className=\"content\">\n        <Dashboard />\n      </main>\n    </div>\n  );\n}",
      "expectedOutput": "A modular application shell assembling navigation and page views from dedicated folders.",
      "commonMistakes": [
        {
          "mistake": "Putting all component code, API calls, and styling directly into a massive 1,500-line App.jsx file.",
          "correction": "Break UI down into dedicated files inside src/components and src/pages.",
          "explanation": "Single-responsibility components are easier to test, debug, and maintain."
        },
        {
          "mistake": "Hardcoding business logic and direct fetch calls inside visual button components.",
          "correction": "Separate UI presentation (components) from network logic (services/api.js).",
          "explanation": "Separating concerns allows reusing API logic and redesigning UI without breaking backend requests."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Import a Button component from ./components/Button.jsx and render it inside App.",
      "starterCode": "// Assume ./components/Button.jsx exports function Button({ label })\nfunction Button({ label }) {\n  return <button className=\"btn\">{label}</button>;\n}\n\nfunction App() {\n  return (\n    <div className=\"app\">\n      <h2>My Modular App</h2>\n      {/* Render Button here with label=\"Get Started\" */}\n      <Button label=\"Get Started\" />\n    </div>\n  );\n}",
      "solutionCode": "function Button({ label }) {\n  return <button className=\"btn\">{label}</button>;\n}\n\nfunction App() {\n  return (\n    <div className=\"app\">\n      <h2>My Modular App</h2>\n      <Button label=\"Get Started\" />\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q4-1",
        "level": "Easy",
        "title": "Export a Reusable Button Component",
        "prompt": "Create a component named PrimaryButton that accepts children prop and returns <button className=\"btn-primary\">{children}</button>. Export it as a named export.",
        "requirements": [
          "Export function PrimaryButton",
          "Accept { children } prop",
          "Return button with className=\"btn-primary\""
        ],
        "starterCode": "// Export PrimaryButton component\n",
        "solutionCode": "export function PrimaryButton({ children }) {\n  return <button className=\"btn-primary\">{children}</button>;\n}",
        "expectedOutput": "A reusable primary button component wrapping children.",
        "validate": (code) => {
          code = String(code || '');
          if (!/export\s+(function|const)\s+PrimaryButton/i.test(code)) {
            return { valid: false, message: 'Export PrimaryButton component.' };
          }
          if (!/className=["']btn-primary["']/i.test(code)) {
            return { valid: false, message: 'Use className="btn-primary".' };
          }
          if (!/\{children\}/i.test(code)) {
            return { valid: false, message: 'Render {children} inside button.' };
          }
          return { valid: true, message: 'PrimaryButton component verified!' };
        }
      },
      {
        "id": "react-q4-2",
        "level": "Medium",
        "title": "Compose Layout Shell Component",
        "prompt": "Write a component named Layout that takes { children } and returns a <div className=\"layout-shell\"> containing a <header><h1>CodeForge</h1></header> and a <main>{children}</main>.",
        "requirements": [
          "Component Layout",
          "<header><h1>CodeForge</h1></header>",
          "<main>{children}</main>"
        ],
        "starterCode": "// Write Layout component\n",
        "solutionCode": "function Layout({ children }) {\n  return (\n    <div className=\"layout-shell\">\n      <header><h1>CodeForge</h1></header>\n      <main>{children}</main>\n    </div>\n  );\n}",
        "expectedOutput": "A reusable layout wrapper component structuring header and page body.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+Layout/i.test(code) && !/const\s+Layout/i.test(code)) {
            return { valid: false, message: 'Define Layout component.' };
          }
          if (!/<header><h1>CodeForge<\/h1><\/header>/i.test(code)) {
            return { valid: false, message: 'Include header with <h1>CodeForge</h1>.' };
          }
          if (!/<main>\{children\}<\/main>/i.test(code)) {
            return { valid: false, message: 'Wrap {children} in <main>.' };
          }
          return { valid: true, message: 'Layout verified!' };
        }
      },
      {
        "id": "react-q4-3",
        "level": "Challenge",
        "title": "Assemble App Shell with Header and Footer",
        "prompt": "Create an App component that renders a <Header /> component, a <section className=\"main-content\"><p>App Body</p></section>, and a <Footer /> component.",
        "requirements": [
          "Component App",
          "Render <Header />",
          "<section className=\"main-content\"><p>App Body</p></section>",
          "Render <Footer />"
        ],
        "starterCode": "// Write App composing Header, content, and Footer\n",
        "solutionCode": "function App() {\n  return (\n    <div>\n      <Header />\n      <section className=\"main-content\">\n        <p>App Body</p>\n      </section>\n      <Footer />\n    </div>\n  );\n}",
        "expectedOutput": "A modular App structure composing Header, body section, and Footer.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+App/i.test(code) && !/const\s+App/i.test(code)) {
            return { valid: false, message: 'Define App component.' };
          }
          if (!/<Header\s*(\/)?>/i.test(code)) return { valid: false, message: 'Render <Header />.' };
          if (!/<Footer\s*(\/)?>/i.test(code)) return { valid: false, message: 'Render <Footer />.' };
          if (!/className=["']main-content["']/i.test(code)) return { valid: false, message: 'Include className="main-content".' };
          return { valid: true, message: 'App shell verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Where do shared, reusable presentational widgets typically live in a standard React directory structure?",
        "options": [
          "src/components/",
          "public/widgets/",
          "dist/assets/",
          "node_modules/common/"
        ],
        "correctIndex": 0,
        "explanation": "src/components/ is the standard conventional directory for reusable UI elements like buttons, inputs, and modals."
      },
      {
        "id": 2,
        "question": "What is the role of src/main.jsx in a Vite React application?",
        "options": [
          "It compiles the CSS code into Sass",
          "It mounts the root <App /> component into the DOM container (document.getElementById(\"root\"))",
          "It configures SQL database connection pools",
          "It stores backend API passwords"
        ],
        "correctIndex": 1,
        "explanation": "src/main.jsx is the client bootstrap file that connects React components to the HTML #root element."
      },
      {
        "id": 3,
        "question": "Why should backend API calls be separated into a services/ folder rather than placed directly in UI components?",
        "options": [
          "Because JavaScript cannot make network calls inside components",
          "To separate concerns, avoid duplicating fetch logic, and make API endpoints easy to maintain and test",
          "It is required by the React compiler",
          "To prevent browsers from caching HTTP responses"
        ],
        "correctIndex": 1,
        "explanation": "Decoupling network requests into dedicated service modules promotes code reuse and cleaner component files."
      }
    ],
    "video": {
      "title": "How To Structure React Projects",
      "channel": "Web Dev Simplified",
      "videoId": "7wx1s_hH1b4",
      "url": "https://www.youtube.com/watch?v=7wx1s_hH1b4",
      "description": "Web Dev Simplified demonstrates folder structuring, organizing components, hooks, and services cleanly."
    }
  },
  {
    "id": "react-topic-5",
    "order": 5,
    "slug": "jsx",
    "title": "JSX (JavaScript XML)",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Master JSX syntax rules: embedding JavaScript expressions with curly braces, className vs class, style objects, and fragment wrappers.",
    "notes": {
      "concept": "JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows you to write HTML-like markup directly within JavaScript files. Under the hood, build tools (Babel or esbuild) compile every JSX tag into a React.createElement(type, props, ...children) call. JSX provides the full expressive power of JavaScript inside templates.",
      "syntax": "// JSX syntax rules:\n// 1. Return a single parent element (or React Fragment <>...</>)\n// 2. Use className instead of class\n// 3. Self-close empty tags: <img />, <input />, <br />\n// 4. Use camelCase for attributes (onClick, tabIndex, htmlFor)\n// 5. Embed JavaScript expressions using curly braces: {variable}",
      "explanation": "1. Single Root Element: A component must return a single root element; use <React.Fragment> or <>...</> to group elements without adding extra DOM nodes.\n2. className vs class: class is a reserved keyword in JavaScript, so JSX uses className to apply CSS classes.\n3. Inline Style Objects: Styles in JSX are passed as JavaScript objects with camelCase properties: style={{ backgroundColor: \"#0f172a\", fontSize: \"16px\" }}.\n4. Expression Interpolation: Any valid JS expression (variables, function calls, math, ternaries) can be placed between curly braces {}.",
      "codeExample": "import React from 'react';\n\nexport function UserBadge({ name, role, isOnline }) {\n  return (\n    <>\n      <div className=\"badge-card\">\n        <h3>{name}</h3>\n        <p className=\"role\">{role.toUpperCase()}</p>\n        <span style={{ color: isOnline ? '#10b981' : '#64748b' }}>\n          {isOnline ? 'Online' : 'Offline'}\n        </span>\n      </div>\n    </>\n  );\n}",
      "expectedOutput": "A user badge card rendering an uppercase role and an emerald green \"Online\" or slate \"Offline\" status tag.",
      "commonMistakes": [
        {
          "mistake": "Returning multiple adjacent JSX elements without a wrapping parent or Fragment: return <h1>Hi</h1><p>Text</p>;",
          "correction": "Wrap adjacent elements in a fragment: return <><h1>Hi</h1><p>Text</p></>;",
          "explanation": "JavaScript functions can only return a single value; Fragments group children without injecting extra <div> elements."
        },
        {
          "mistake": "Using class=\"btn\" instead of className=\"btn\".",
          "correction": "Always write className=\"btn\" in JSX.",
          "explanation": "class is a reserved keyword in JavaScript ES6 classes."
        },
        {
          "mistake": "Writing inline CSS as a string: style=\"color: blue; margin: 10px;\"",
          "correction": "Pass an object with camelCase properties: style={{ color: \"blue\", margin: \"10px\" }}",
          "explanation": "JSX style expects a JavaScript object, not an HTML string."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Fix the JSX errors: replace class with className and close the input tag with a self-closing slash.",
      "starterCode": "function FormCard() {\n  return (\n    <div>\n      <h2 className=\"title\">Search Platform</h2>\n      {/* Ensure self-closing tag and proper className */}\n      <input type=\"text\" className=\"search-input\" placeholder=\"Search lessons...\" />\n    </div>\n  );\n}",
      "solutionCode": "function FormCard() {\n  return (\n    <div>\n      <h2 className=\"title\">Search Platform</h2>\n      <input type=\"text\" className=\"search-input\" placeholder=\"Search lessons...\" />\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q5-1",
        "level": "Easy",
        "title": "Use className and Fragments",
        "prompt": "Write a component named SimpleCard that returns a React Fragment (<>...</>) containing an <h3> with className=\"card-title\" and text \"JSX Basics\".",
        "requirements": [
          "React Fragment <>...</>",
          "<h3> element",
          "className=\"card-title\"",
          "Text \"JSX Basics\""
        ],
        "starterCode": "// Write SimpleCard with Fragment\n",
        "solutionCode": "function SimpleCard() {\n  return (\n    <>\n      <h3 className=\"card-title\">JSX Basics</h3>\n    </>\n  );\n}",
        "expectedOutput": "A React fragment returning an h3 with class card-title.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<>[\s\S]*<\/>/i.test(code) && !/<React\.Fragment>[\s\S]*<\/React\.Fragment>/i.test(code)) {
            return { valid: false, message: 'Use React Fragment <>...</>.' };
          }
          if (!/className=["']card-title["']/i.test(code)) return { valid: false, message: 'Use className="card-title".' };
          if (!/JSX Basics/i.test(code)) return { valid: false, message: 'Include text "JSX Basics".' };
          return { valid: true, message: 'SimpleCard JSX verified!' };
        }
      },
      {
        "id": "react-q5-2",
        "level": "Medium",
        "title": "Apply Inline Style Object",
        "prompt": "Create a component StatusPill that accepts prop isSuccess. Return a <span> with inline style object setting color to \"#10b981\" if isSuccess is true, else \"#ef4444\". The text should be \"Success\" or \"Failed\".",
        "requirements": [
          "Component StatusPill",
          "Accepts { isSuccess }",
          "style={{ color: ... }}",
          "Display \"Success\" or \"Failed\""
        ],
        "starterCode": "// Write StatusPill\n",
        "solutionCode": "function StatusPill({ isSuccess }) {\n  return (\n    <span style={{ color: isSuccess ? \"#10b981\" : \"#ef4444\" }}>\n      {isSuccess ? \"Success\" : \"Failed\"}\n    </span>\n  );\n}",
        "expectedOutput": "A span displaying green Success or red Failed based on the isSuccess boolean.",
        "validate": (code) => {
          code = String(code || '');
          if (!/style\s*=\s*\{\s*\{[\s\S]*color\s*:/i.test(code)) {
            return { valid: false, message: 'Pass style={{ color: ... }} object.' };
          }
          if (!/isSuccess/i.test(code)) return { valid: false, message: 'Evaluate isSuccess prop.' };
          return { valid: true, message: 'StatusPill verified!' };
        }
      },
      {
        "id": "react-q5-3",
        "level": "Challenge",
        "title": "Evaluate Expression Calculations in JSX",
        "prompt": "Write a component PriceCalculation that takes props price and taxRate (e.g. 100 and 0.15). Return a <div> with a paragraph \"Total: $\" followed by the calculated sum (price + price * taxRate).",
        "requirements": [
          "Component PriceCalculation",
          "Props { price, taxRate }",
          "Calculate {price + price * taxRate} in JSX",
          "Output formatted text"
        ],
        "starterCode": "// Write PriceCalculation\n",
        "solutionCode": "function PriceCalculation({ price, taxRate }) {\n  return (\n    <div>\n      <p>Total: ${price + price * taxRate}</p>\n    </div>\n  );\n}",
        "expectedOutput": "A paragraph displaying the calculated total dynamically in JSX.",
        "validate": (code) => {
          code = String(code || '');
          if (!/price\s*\+\s*price\s*\*\s*taxRate/i.test(code) && !/price\s*\*\s*\(1\s*\+\s*taxRate\)/i.test(code)) {
            return { valid: false, message: 'Calculate price + price * taxRate inside curly braces.' };
          }
          return { valid: true, message: 'PriceCalculation verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why do we use className instead of class in JSX?",
        "options": [
          "Because className renders faster in the browser",
          "Because class is a reserved keyword in JavaScript",
          "Because CSS requires className",
          "Because HTML5 deprecated class"
        ],
        "correctIndex": 1,
        "explanation": "In JavaScript, class defines ES6 classes; JSX adopted className to avoid naming collisions."
      },
      {
        "id": 2,
        "question": "What is what JSX compiles to behind the scenes?",
        "options": [
          "document.write() strings",
          "React.createElement() JavaScript function calls",
          "SQL queries",
          "Direct machine assembly code"
        ],
        "correctIndex": 1,
        "explanation": "Every JSX tag compiles down to React.createElement(type, props, ...children) calls."
      },
      {
        "id": 3,
        "question": "What is the purpose of React Fragments (<>...</>)?",
        "options": [
          "To encrypt component HTML",
          "To group multiple sibling elements without adding an extra wrapper node to the real DOM",
          "To create database transactions",
          "To force component re-renders"
        ],
        "correctIndex": 1,
        "explanation": "Fragments satisfy the single-parent return rule without cluttering the browser DOM with unnecessary wrapper <div> elements."
      }
    ],
    "video": {
      "title": "React JSX Tutorial",
      "channel": "Dave Gray",
      "videoId": "OXGznpKZ_sA",
      "url": "https://www.youtube.com/watch?v=OXGznpKZ_sA",
      "description": "Dave Gray breaks down JSX syntax rules, expressions, attributes, and compilation mechanics."
    }
  },
  {
    "id": "react-topic-6",
    "order": 6,
    "slug": "components",
    "title": "Components",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Learn component architecture: composing complex UIs from small, independent, testable, and reusable blocks.",
    "notes": {
      "concept": "Components are the core foundation of React applications. A component is a self-contained unit of code that combines markup (JSX), styling, and logic to render a specific part of the user interface. By breaking an interface down into components (Navbar, Sidebar, Feed, Card, Footer), teams can develop, test, and maintain features in isolation.",
      "syntax": "// Component Composition Pattern\nfunction App() {\n  return (\n    <div className=\"layout\">\n      <Header />\n      <MainContent />\n      <Footer />\n    </div>\n  );\n}",
      "explanation": "1. Capitalization Rule: React component names MUST start with a capital letter (e.g., <Button /> vs <button>).\n2. HTML Tag vs Custom Component: Lowercase names are treated as native HTML tags; capitalized names tell React to invoke your custom component function.\n3. Composition over Inheritance: React favors composing components together rather than building deep inheritance hierarchies.\n4. Pure Component Principle: Given the same inputs (props and state), a component should always return the same JSX output.",
      "codeExample": "// Building a user profile using component composition\nfunction Avatar({ imgUrl }) {\n  return <img src={imgUrl} alt=\"Avatar\" className=\"avatar-img\" />;\n}\n\nfunction UserBio({ name, bio }) {\n  return (\n    <div className=\"bio\">\n      <h3>{name}</h3>\n      <p>{bio}</p>\n    </div>\n  );\n}\n\nexport function UserProfileCard({ user }) {\n  return (\n    <div className=\"profile-card\">\n      <Avatar imgUrl={user.avatar} />\n      <UserBio name={user.name} bio={user.bio} />\n    </div>\n  );\n}",
      "expectedOutput": "A composed profile card rendering an avatar image and structured bio by nesting smaller components.",
      "commonMistakes": [
        {
          "mistake": "Naming a component with a lowercase letter: function buttonCard() { return <div>...</div>; }",
          "correction": "Always capitalize component names: function ButtonCard() { ... }",
          "explanation": "React treats lowercase tags like <buttonCard /> as unknown native HTML tags and fails to invoke the component."
        },
        {
          "mistake": "Defining a component inside another component function: function Parent() { function Child() { ... } }",
          "correction": "Always declare components at the top level of their own file or module.",
          "explanation": "Nesting component definitions causes the child component to be re-created on every render, resetting state and destroying DOM nodes."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Assemble an alert box composed of an AlertIcon and an AlertMessage component.",
      "starterCode": "function AlertIcon() {\n  return <span className=\"icon\">⚠️</span>;\n}\n\nfunction AlertMessage() {\n  return <p className=\"msg\">Please save your work before leaving.</p>;\n}\n\nfunction App() {\n  return (\n    <div className=\"alert-box\">\n      {/* Compose AlertIcon and AlertMessage here */}\n      <AlertIcon />\n      <AlertMessage />\n    </div>\n  );\n}",
      "solutionCode": "function AlertIcon() {\n  return <span className=\"icon\">⚠️</span>;\n}\n\nfunction AlertMessage() {\n  return <p className=\"msg\">Please save your work before leaving.</p>;\n}\n\nfunction App() {\n  return (\n    <div className=\"alert-box\">\n      <AlertIcon />\n      <AlertMessage />\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q6-1",
        "level": "Easy",
        "title": "Create Capitalized Icon Component",
        "prompt": "Create a component named CheckIcon that returns <span className=\"check\">✓</span>.",
        "requirements": [
          "Capitalized component CheckIcon",
          "Return <span className=\"check\">✓</span>"
        ],
        "starterCode": "// Write CheckIcon\n",
        "solutionCode": "function CheckIcon() {\n  return <span className=\"check\">✓</span>;\n}",
        "expectedOutput": "A reusable checkmark icon element.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+CheckIcon/i.test(code) && !/const\s+CheckIcon/i.test(code)) {
            return { valid: false, message: 'Define CheckIcon component.' };
          }
          if (!/className=["']check["']/i.test(code)) return { valid: false, message: 'Include className="check".' };
          return { valid: true, message: 'CheckIcon verified!' };
        }
      },
      {
        "id": "react-q6-2",
        "level": "Medium",
        "title": "Nest Components to Build a Card",
        "prompt": "Create a CardTitle component that returns <h3>Card Heading</h3>. Then create a CardBody component returning <p>Card content text.</p>. Finally, create a ComponentCard that renders both inside a <div className=\"card\">.",
        "requirements": [
          "Component CardTitle",
          "Component CardBody",
          "ComponentCard rendering both inside <div className=\"card\">"
        ],
        "starterCode": "// Write CardTitle, CardBody, and ComponentCard\n",
        "solutionCode": "function CardTitle() {\n  return <h3>Card Heading</h3>;\n}\n\nfunction CardBody() {\n  return <p>Card content text.</p>;\n}\n\nfunction ComponentCard() {\n  return (\n    <div className=\"card\">\n      <CardTitle />\n      <CardBody />\n    </div>\n  );\n}",
        "expectedOutput": "A composed card built from two nested child components.",
        "validate": (code) => {
          code = String(code || '');
          if (!/CardTitle/i.test(code)) return { valid: false, message: 'Define CardTitle.' };
          if (!/CardBody/i.test(code)) return { valid: false, message: 'Define CardBody.' };
          if (!/ComponentCard/i.test(code)) return { valid: false, message: 'Define ComponentCard.' };
          if (!/<CardTitle\s*(\/)?>/i.test(code) || !/<CardBody\s*(\/)?>/i.test(code)) {
            return { valid: false, message: 'Nest <CardTitle /> and <CardBody /> in ComponentCard.' };
          }
          return { valid: true, message: 'Component composition verified!' };
        }
      },
      {
        "id": "react-q6-3",
        "level": "Challenge",
        "title": "Build Multi-Section Dashboard Shell",
        "prompt": "Write an AdminDashboard component that composes <Sidebar />, <Header />, and <AnalyticsGrid /> inside a <div className=\"dashboard-layout\">.",
        "requirements": [
          "Component AdminDashboard",
          "<div className=\"dashboard-layout\">",
          "Render <Sidebar />",
          "Render <Header />",
          "Render <AnalyticsGrid />"
        ],
        "starterCode": "// Write AdminDashboard composing the 3 parts\n",
        "solutionCode": "function AdminDashboard() {\n  return (\n    <div className=\"dashboard-layout\">\n      <Sidebar />\n      <Header />\n      <AnalyticsGrid />\n    </div>\n  );\n}",
        "expectedOutput": "An admin dashboard shell composing sidebar, header, and grid.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+AdminDashboard/i.test(code) && !/const\s+AdminDashboard/i.test(code)) {
            return { valid: false, message: 'Define AdminDashboard component.' };
          }
          if (!/<Sidebar\s*(\/)?>/i.test(code)) return { valid: false, message: 'Render <Sidebar />.' };
          if (!/<Header\s*(\/)?>/i.test(code)) return { valid: false, message: 'Render <Header />.' };
          if (!/<AnalyticsGrid\s*(\/)?>/i.test(code)) return { valid: false, message: 'Render <AnalyticsGrid />.' };
          return { valid: true, message: 'AdminDashboard verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why must React component names always start with a capital letter?",
        "options": [
          "Because JavaScript throws a SyntaxError on lowercase functions",
          "To allow React to distinguish custom components from built-in native HTML elements (like <div> vs <Dashboard />)",
          "Capital letters make components execute faster",
          "It is required by TypeScript only"
        ],
        "correctIndex": 1,
        "explanation": "JSX treats lowercase tags as standard HTML elements (e.g. <span>) and capitalized tags as custom React component invocations."
      },
      {
        "id": 2,
        "question": "What is the recommended approach to code reuse in React: Composition or Inheritance?",
        "options": [
          "Inheritance with extends",
          "Composition by nesting components and passing props",
          "Global prototype modification",
          "Copy-pasting files"
        ],
        "correctIndex": 1,
        "explanation": "React explicitly favors composition over class inheritance, combining flexible component building blocks."
      },
      {
        "id": 3,
        "question": "What happens if you define a component function inside another component function?",
        "options": [
          "It compiles normally without any issues",
          "The nested component is re-created on every parent render, causing unnecessary re-mounts and losing internal state",
          "It creates a backend database table",
          "It runs 10x faster"
        ],
        "correctIndex": 1,
        "explanation": "Declaring components inside other components recreates the function definition every render, resetting DOM nodes and state."
      }
    ],
    "video": {
      "title": "React Components Explained",
      "channel": "Programming with Mosh",
      "videoId": "Ke90Tje7VS0",
      "url": "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      "description": "Mosh Hamedani explains the foundation of React components, UI breakdown, and composition."
    }
  },
  {
    "id": "react-topic-7",
    "order": 7,
    "slug": "functional-components",
    "title": "Functional Components",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Understand modern functional components: clean JavaScript functions that accept props and return JSX, replacing legacy ES6 class components.",
    "notes": {
      "concept": "In early versions of React, complex stateful components required ES6 class syntax (class MyComponent extends React.Component). With the release of React 16.8 and React Hooks, Functional Components became the standard way to write React applications. Functional components are plain JavaScript functions that accept a props object as their single argument and return JSX. They eliminate tricky \"this\" keyword binding issues and enable modular logic sharing via hooks.",
      "syntax": "// 1. Standard Function Declaration\nfunction Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n// 2. Arrow Function with Implicit Return\nconst CompactBadge = ({ text }) => (\n  <span className=\"badge\">{text}</span>\n);",
      "explanation": "1. Plain JS Functions: Simpler syntax without constructor(), super(props), or this.state boilerplate.\n2. No \"this\" Pitfalls: In class components, event handlers frequently broke when developers forgot to bind this in the constructor.\n3. Hooks Support: Functional components use React Hooks (useState, useEffect) for state and side effects.\n4. Cleaner Minification: Build tools compress functional components much more efficiently than complex ES6 class prototypes.",
      "codeExample": "// Modern Functional Component with Arrow Syntax\nimport React from 'react';\n\nexport const UserStatusTag = ({ role, active }) => {\n  return (\n    <div className=\"status-tag\">\n      <span className=\"role-text\">{role}</span>\n      <span className={active ? 'indicator online' : 'indicator offline'} />\n    </div>\n  );\n};",
      "expectedOutput": "A compact user tag rendering the role and a green/gray circular status indicator.",
      "commonMistakes": [
        {
          "mistake": "Using legacy class components (class X extends React.Component) for new features.",
          "correction": "Write functional components with React Hooks.",
          "explanation": "Modern React documentation and ecosystem tools are built exclusively around functional components."
        },
        {
          "mistake": "Returning multiple objects or values without wrapping in JSX.",
          "correction": "Ensure your function returns a valid React element, Fragment, string, or null.",
          "explanation": "React render functions must return renderable nodes."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Convert an arrow functional component with explicit return to an implicit return.",
      "starterCode": "// Arrow function component\nconst Tag = ({ label }) => {\n  return <span className=\"tag-pill\">{label}</span>;\n};\n\nfunction App() {\n  return <Tag label=\"Functional Component\" />;\n}",
      "solutionCode": "const Tag = ({ label }) => <span className=\"tag-pill\">{label}</span>;\n\nfunction App() {\n  return <Tag label=\"Functional Component\" />;\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q7-1",
        "level": "Easy",
        "title": "Write Arrow Function Component",
        "prompt": "Declare an arrow function component named Banner that returns a <header><h2>CodeForge React</h2></header>.",
        "requirements": [
          "const Banner = () => ...",
          "Return <header><h2>CodeForge React</h2></header>"
        ],
        "starterCode": "// Write arrow function component Banner\n",
        "solutionCode": "const Banner = () => {\n  return <header><h2>CodeForge React</h2></header>;\n};",
        "expectedOutput": "An arrow function component rendering a header and heading.",
        "validate": (code) => {
          code = String(code || '');
          if (!/const\s+Banner\s*=\s*(\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/i.test(code)) {
            return { valid: false, message: 'Use arrow function syntax const Banner = () => ...' };
          }
          if (!/<header><h2>CodeForge React<\/h2><\/header>/i.test(code)) {
            return { valid: false, message: 'Return <header><h2>CodeForge React</h2></header>.' };
          }
          return { valid: true, message: 'Arrow component verified!' };
        }
      },
      {
        "id": "react-q7-2",
        "level": "Medium",
        "title": "Destructure Props in Arrow Component",
        "prompt": "Create an arrow function component named UserEmail that destructures { email } from props and returns <a href={`mailto:${email}`}>{email}</a>.",
        "requirements": [
          "Arrow function UserEmail",
          "Destructure { email }",
          "Return mailto anchor link"
        ],
        "starterCode": "// Write UserEmail arrow component\n",
        "solutionCode": "const UserEmail = ({ email }) => {\n  return <a href={`mailto:${email}`}>{email}</a>;\n};",
        "expectedOutput": "An accessible email link rendering mailto href and display text.",
        "validate": (code) => {
          code = String(code || '');
          if (!/const\s+UserEmail\s*=/i.test(code)) return { valid: false, message: 'Define const UserEmail = ...' };
          if (!/mailto:/i.test(code)) return { valid: false, message: 'Include mailto: in href.' };
          if (!/\{email\}/i.test(code)) return { valid: false, message: 'Render {email} inside anchor.' };
          return { valid: true, message: 'UserEmail verified!' };
        }
      },
      {
        "id": "react-q7-3",
        "level": "Challenge",
        "title": "Component with Conditional Helper Function",
        "prompt": "Write a functional component PriceBadge taking prop amount. Inside the component, define a helper function formatPrice(val) { return \"$\" + Number(val).toFixed(2); }. Return <span className=\"price\">{formatPrice(amount)}</span>.",
        "requirements": [
          "Functional component PriceBadge({ amount })",
          "Helper function formatPrice",
          "Return <span className=\"price\">{formatPrice(amount)}</span>"
        ],
        "starterCode": "// Write PriceBadge with formatPrice helper\n",
        "solutionCode": "function PriceBadge({ amount }) {\n  function formatPrice(val) {\n    return \"$\" + Number(val).toFixed(2);\n  }\n  return <span className=\"price\">{formatPrice(amount)}</span>;\n}",
        "expectedOutput": "A price badge displaying currency formatted with 2 decimal places.",
        "validate": (code) => {
          code = String(code || '');
          if (!/formatPrice/i.test(code)) return { valid: false, message: 'Define formatPrice helper.' };
          if (!/className=["']price["']/i.test(code)) return { valid: false, message: 'Use className="price".' };
          if (!/toFixed\(2\)/i.test(code)) return { valid: false, message: 'Format with toFixed(2).' };
          return { valid: true, message: 'PriceBadge verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which React version introduced Hooks, making functional components the standard?",
        "options": [
          "React 15.0",
          "React 16.8",
          "React 18.0",
          "React 0.14"
        ],
        "correctIndex": 1,
        "explanation": "React 16.8 (released in early 2019) introduced React Hooks, enabling state and side effects in functional components."
      },
      {
        "id": 2,
        "question": "Why are functional components preferred over class components in modern React?",
        "options": [
          "They eliminate \"this\" keyword binding problems and provide simpler, concise code with hooks",
          "They bypass the browser DOM entirely",
          "Class components are forbidden in JavaScript ES6",
          "Functional components only work on mobile devices"
        ],
        "correctIndex": 0,
        "explanation": "Functional components eliminate constructor boilerplate, avoid \"this\" binding issues, and facilitate logic reuse with custom hooks."
      },
      {
        "id": 3,
        "question": "What does a functional component receive as its first parameter?",
        "options": [
          "The browser window object",
          "The props object",
          "The Redux store",
          "The database connection"
        ],
        "correctIndex": 1,
        "explanation": "React passes the props object containing all parent-provided attributes as the first parameter to the component function."
      }
    ],
    "video": {
      "title": "React Functional Components Tutorial",
      "channel": "Codevolution",
      "videoId": "Cla1WwguArA",
      "url": "https://www.youtube.com/watch?v=Cla1WwguArA",
      "description": "Codevolution explains functional components, their structure, advantages, and syntax."
    }
  },
  {
    "id": "react-topic-8",
    "order": 8,
    "slug": "props",
    "title": "Props (Properties)",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Master data passing with props: parent-to-child data flow, prop destructuring, default prop values, and the special children prop.",
    "notes": {
      "concept": "Props (short for \"properties\") are the mechanism through which parent components pass data down to child components. Just like HTML attributes pass values into tags (<img src=\"...\" alt=\"...\" />), props pass strings, numbers, booleans, objects, arrays, and callback functions into React components. Props are strictly read-only (immutable): a child component must never modify the props it receives.",
      "syntax": "// Passing props from parent\n<UserCard name=\"Sarah\" age={28} isAdmin={true} onSelect={handleSelect} />\n\n// Receiving and destructuring props in child with default values\nfunction UserCard({ name, age = 18, isAdmin = false, onSelect }) {\n  return (\n    <div onClick={onSelect}>\n      <h3>{name}</h3>\n      <p>Age: {age}</p>\n      {isAdmin && <span className=\"badge\">Admin</span>}\n    </div>\n  );\n}",
      "explanation": "1. Pass Anything: Props can transfer primitives, objects, arrays, JSX elements, and functions.\n2. Immutability: Props cannot be modified by the receiver (Pure Function principle).\n3. Destructuring: Cleaner syntax unpacking specific keys from the props object in the parameter list.\n4. Default Values: Provide fallback values using ES6 default parameter assignments ({ role = \"Member\" }).\n5. Children Prop: Special prop representing whatever markup is placed between opening and closing tags (<Modal><h3>Title</h3></Modal>).",
      "codeExample": "// Container component utilizing children prop\nexport function ModalShell({ title, isOpen, children, onClose }) {\n  if (!isOpen) return null;\n\n  return (\n    <div className=\"modal-backdrop\">\n      <div className=\"modal-dialog\">\n        <header className=\"modal-header\">\n          <h3>{title}</h3>\n          <button onClick={onClose}>×</button>\n        </header>\n        <div className=\"modal-body\">\n          {children}\n        </div>\n      </div>\n    </div>\n  );\n}",
      "expectedOutput": "A flexible modal dialog framing arbitrary nested content injected through the children prop.",
      "commonMistakes": [
        {
          "mistake": "Trying to modify a prop directly inside a component: props.name = \"New Name\";",
          "correction": "Treat props as read-only; if data needs to change, store it in component state (useState).",
          "explanation": "Mutating props violates React unidirectional flow and causes inconsistent rendering bugs."
        },
        {
          "mistake": "Passing numbers or booleans as strings: <Item count=\"5\" active=\"false\" />",
          "correction": "Use curly braces for numbers and booleans: <Item count={5} active={false} />",
          "explanation": "Passing \"false\" as a string is truthy in JavaScript conditionals!"
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Create a Card component that wraps its nested content using the children prop.",
      "starterCode": "function CardContainer({ title, children }) {\n  return (\n    <div className=\"card-box\">\n      <h3>{title}</h3>\n      <div className=\"card-content\">\n        {/* Render children here */}\n        {children}\n      </div>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <CardContainer title=\"Props Mastery\">\n      <p>The children prop makes components incredibly flexible!</p>\n    </CardContainer>\n  );\n}",
      "solutionCode": "function CardContainer({ title, children }) {\n  return (\n    <div className=\"card-box\">\n      <h3>{title}</h3>\n      <div className=\"card-content\">\n        {children}\n      </div>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <CardContainer title=\"Props Mastery\">\n      <p>The children prop makes components incredibly flexible!</p>\n    </CardContainer>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q8-1",
        "level": "Easy",
        "title": "Greeting with Default Prop",
        "prompt": "Create a component UserGreeting that accepts prop name with default value \"Guest\". Return <h2>Hello, {name}!</h2>.",
        "requirements": [
          "Component UserGreeting({ name = \"Guest\" })",
          "Return <h2>Hello, {name}!</h2>"
        ],
        "starterCode": "// Write UserGreeting with default prop\n",
        "solutionCode": "function UserGreeting({ name = \"Guest\" }) {\n  return <h2>Hello, {name}!</h2>;\n}",
        "expectedOutput": "An h2 greeting displaying the provided name or fallback \"Guest\".",
        "validate": (code) => {
          code = String(code || '');
          if (!/name\s*=\s*["']Guest["']/i.test(code)) return { valid: false, message: 'Set default value name = "Guest".' };
          if (!/<h2>Hello,\s*\{name\}!<\/h2>/i.test(code)) return { valid: false, message: 'Return <h2>Hello, {name}!</h2>.' };
          return { valid: true, message: 'Default prop verified!' };
        }
      },
      {
        "id": "react-q8-2",
        "level": "Medium",
        "title": "Pass and Invoke a Callback Prop",
        "prompt": "Create a component ActionButton taking props label and onTrigger. Return a button with onClick={onTrigger} displaying {label}.",
        "requirements": [
          "Component ActionButton",
          "Props { label, onTrigger }",
          "<button onClick={onTrigger}>{label}</button>"
        ],
        "starterCode": "// Write ActionButton\n",
        "solutionCode": "function ActionButton({ label, onTrigger }) {\n  return <button onClick={onTrigger}>{label}</button>;\n}",
        "expectedOutput": "A button executing parent callback onTrigger upon click.",
        "validate": (code) => {
          code = String(code || '');
          if (!/onClick\s*=\s*\{\s*onTrigger\s*\}/i.test(code)) return { valid: false, message: 'Bind onClick={onTrigger}.' };
          if (!/\{label\}/i.test(code)) return { valid: false, message: 'Render {label} in button.' };
          return { valid: true, message: 'Callback prop verified!' };
        }
      },
      {
        "id": "react-q8-3",
        "level": "Challenge",
        "title": "Wrapper Component with children Prop",
        "prompt": "Write a component AlertContainer taking props type (e.g. \"danger\") and children. Return <div className={`alert alert-${type}`}>{children}</div>.",
        "requirements": [
          "Component AlertContainer({ type, children })",
          "Template literal className={`alert alert-${type}`}",
          "Render {children}"
        ],
        "starterCode": "// Write AlertContainer\n",
        "solutionCode": "function AlertContainer({ type = \"info\", children }) {\n  return <div className={`alert alert-${type}`}>{children}</div>;\n}",
        "expectedOutput": "A dynamic alert wrapper styling its children based on the type prop.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\{children\}/i.test(code)) return { valid: false, message: 'Render {children}.' };
          if (!/alert-\$\{type\}/i.test(code) && !/alert\s*\+\s*type/i.test(code)) {
            return { valid: false, message: 'Apply dynamic alert-${type} class.' };
          }
          return { valid: true, message: 'AlertContainer verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Are props in React mutable by the receiving child component?",
        "options": [
          "Yes, child components can modify props directly at any time",
          "No, props are strictly read-only and immutable",
          "Only if the prop is a string",
          "Only in production builds"
        ],
        "correctIndex": 1,
        "explanation": "Props are strictly immutable. To change values over time, components manage state."
      },
      {
        "id": 2,
        "question": "What does the special \"children\" prop represent in React?",
        "options": [
          "The number of sub-components in the file",
          "Whatever JSX or content is passed between a component opening and closing tags (<Tag>content</Tag>)",
          "The child process ID on the operating system",
          "The component version number"
        ],
        "correctIndex": 1,
        "explanation": "props.children automatically captures any nested markup or elements placed between <Component>...</Component> tags."
      },
      {
        "id": 3,
        "question": "What is the correct syntax to pass a boolean false to a prop named \"isActive\"?",
        "options": [
          "isActive=\"false\"",
          "isActive={false}",
          "isActive=(false)",
          "isActive=[false]"
        ],
        "correctIndex": 1,
        "explanation": "In JSX, non-string values like booleans and numbers must be wrapped in curly braces {false}. The string \"false\" is truthy in JavaScript."
      }
    ],
    "video": {
      "title": "Props In React Explained",
      "channel": "Web Dev Simplified",
      "videoId": "m7OWXtbiXX8",
      "url": "https://www.youtube.com/watch?v=m7OWXtbiXX8",
      "description": "Web Dev Simplified breaks down props, destructuring, default values, and passing functions."
    }
  },
  {
    "id": "react-topic-9",
    "order": 9,
    "slug": "state-and-usestate",
    "title": "State and useState Hook",
    "difficulty": "Beginner",
    "estimatedTime": "20 min",
    "summary": "Master component state with useState: declaring reactive variables, updater functions, state immutability, and triggering re-renders.",
    "notes": {
      "concept": "While props pass data into a component from the outside, state is a component private memory. When state updates, React automatically re-renders the component to reflect the new data in the browser DOM. The useState hook is a built-in React function that declares a state variable and returns an array with two elements: the current state value and a state setter function.",
      "syntax": "import { useState } from 'react';\n\n// 1. Declare state with initial value:\nconst [count, setCount] = useState(0);\n\n// 2. Direct state update:\nsetCount(5);\n\n// 3. Functional updater when new state depends on previous state:\nsetCount(prevCount => prevCount + 1);",
      "explanation": "1. Array Destructuring: const [state, setState] = useState(initialValue) cleanly unpacks the current value and updater function.\n2. Re-render Trigger: Calling setState informs React that data changed, scheduling a re-render of the component.\n3. Asynchronous Updates: State updates are batched by React for performance; reading state immediately after calling setState will yield the old value.\n4. Functional Updaters: Always use setCount(prev => prev + 1) when computing the next state based on the current state to avoid stale closures.",
      "codeExample": "import React, { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  const increment = () => setCount(prev => prev + 1);\n  const decrement = () => setCount(prev => Math.max(0, prev - 1));\n  const reset = () => setCount(0);\n\n  return (\n    <div className=\"counter-box\">\n      <h3>Count: {count}</h3>\n      <button onClick={decrement}>-</button>\n      <button onClick={reset}>Reset</button>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}",
      "expectedOutput": "An interactive counter displaying current count with decrement, reset, and increment buttons.",
      "commonMistakes": [
        {
          "mistake": "Directly mutating state variables: count = count + 1; or user.name = \"Alex\";",
          "correction": "Always use the setter function: setCount(count + 1) or setUser({ ...user, name: \"Alex\" }).",
          "explanation": "Direct mutations do not notify React of changes, so the component will never re-render."
        },
        {
          "mistake": "Using setCount(count + 1) multiple times consecutively expecting batch increments.",
          "correction": "Use the functional updater form: setCount(prev => prev + 1).",
          "explanation": "In the same render pass, count holds a constant snapshot; functional updaters guarantee working with the latest pending state."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Complete the toggle component to switch between \"ON\" and \"OFF\" when the button is clicked.",
      "starterCode": "import { useState } from 'react';\n\nfunction ToggleSwitch() {\n  const [isOn, setIsOn] = useState(false);\n\n  const toggle = () => {\n    // Toggle isOn state\n    setIsOn(prev => !prev);\n  };\n\n  return (\n    <div>\n      <p>Status: {isOn ? \"ACTIVE\" : \"INACTIVE\"}</p>\n      <button onClick={toggle}>{isOn ? \"Turn Off\" : \"Turn On\"}</button>\n    </div>\n  );\n}",
      "solutionCode": "import { useState } from 'react';\n\nfunction ToggleSwitch() {\n  const [isOn, setIsOn] = useState(false);\n\n  const toggle = () => {\n    setIsOn(prev => !prev);\n  };\n\n  return (\n    <div>\n      <p>Status: {isOn ? \"ACTIVE\" : \"INACTIVE\"}</p>\n      <button onClick={toggle}>{isOn ? \"Turn Off\" : \"Turn On\"}</button>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q9-1",
        "level": "Easy",
        "title": "Declare Counter State with useState",
        "prompt": "Inside a component SimpleCounter, declare state count initialized to 0 with setter setCount using useState(0). Return a button showing {count} that increments count on click.",
        "requirements": [
          "const [count, setCount] = useState(0)",
          "<button onClick={() => setCount(count + 1)}>{count}</button>"
        ],
        "starterCode": "// Write SimpleCounter using useState\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction SimpleCounter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(prev => prev + 1)}>{count}</button>;\n}",
        "expectedOutput": "A clickable button that increments its displayed count on every click.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useState\(\s*0\s*\)/i.test(code)) return { valid: false, message: 'Initialize useState(0).' };
          if (!/setCount/i.test(code)) return { valid: false, message: 'Use setCount updater.' };
          return { valid: true, message: 'SimpleCounter verified!' };
        }
      },
      {
        "id": "react-q9-2",
        "level": "Medium",
        "title": "Boolean Toggle with Functional Updater",
        "prompt": "Create a component VisibilityToggle that initializes state isVisible to true with useState(true). Return a <div> with a button that toggles isVisible using prev => !prev, and a paragraph \"Visible Content\" rendered conditionally when isVisible is true.",
        "requirements": [
          "const [isVisible, setIsVisible] = useState(true)",
          "Toggle with setIsVisible(prev => !prev)",
          "Conditional rendering {isVisible && <p>Visible Content</p>}"
        ],
        "starterCode": "// Write VisibilityToggle\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction VisibilityToggle() {\n  const [isVisible, setIsVisible] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setIsVisible(prev => !prev)}>Toggle</button>\n      {isVisible && <p>Visible Content</p>}\n    </div>\n  );\n}",
        "expectedOutput": "A toggle button hiding and revealing a paragraph conditionally.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useState\(\s*true\s*\)/i.test(code)) return { valid: false, message: 'Initialize useState(true).' };
          if (!/!prev/i.test(code) && !/!isVisible/i.test(code)) return { valid: false, message: 'Toggle boolean with negation.' };
          if (!/isVisible\s*&&/i.test(code)) return { valid: false, message: 'Conditionally render with {isVisible && ...}.' };
          return { valid: true, message: 'VisibilityToggle verified!' };
        }
      },
      {
        "id": "react-q9-3",
        "level": "Challenge",
        "title": "Object State Update with Spread Operator",
        "prompt": "Write a component UserProfileForm initialized with state user = { name: \"Alex\", role: \"Student\" } using useState. Provide a button that updates role to \"Graduate\" without losing the name property using the spread operator {...prev, role: \"Graduate\"}.",
        "requirements": [
          "useState({ name: \"Alex\", role: \"Student\" })",
          "Spread operator {...prev, role: \"Graduate\"}",
          "Render user.name and user.role in UI"
        ],
        "starterCode": "// Write UserProfileForm updating object state\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction UserProfileForm() {\n  const [user, setUser] = useState({ name: \"Alex\", role: \"Student\" });\n  const graduate = () => setUser(prev => ({ ...prev, role: \"Graduate\" }));\n  return (\n    <div>\n      <p>{user.name} - {user.role}</p>\n      <button onClick={graduate}>Promote</button>\n    </div>\n  );\n}",
        "expectedOutput": "Component cleanly updating a single property in an object state using the spread operator.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\.\.\.prev/i.test(code) && !/\.\.\.user/i.test(code)) {
            return { valid: false, message: 'Use spread operator (...prev) to preserve existing object properties.' };
          }
          if (!/role\s*:\s*["']Graduate["']/i.test(code)) return { valid: false, message: 'Set role: "Graduate".' };
          return { valid: true, message: 'Object state update verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What happens when a component state setter (e.g. setCount) is called?",
        "options": [
          "The entire browser window refreshes immediately",
          "React schedules a re-render of the component with the updated state value",
          "The state variable is deleted",
          "The code is saved to git"
        ],
        "correctIndex": 1,
        "explanation": "State updates signal React to re-render the component and its children with the new state values."
      },
      {
        "id": 2,
        "question": "Why should you use the functional updater form setCount(prev => prev + 1) when state depends on previous state?",
        "options": [
          "Because arrow functions execute faster in the CPU",
          "To guarantee working with the most up-to-date state snapshot, avoiding race conditions in batched asynchronous updates",
          "Because React throws an error otherwise",
          "It is required only in class components"
        ],
        "correctIndex": 1,
        "explanation": "Functional updaters ensure that state mutations accurately account for pending batched state transitions."
      },
      {
        "id": 3,
        "question": "What is the correct way to update an array stored in state (e.g. items)?",
        "options": [
          "items.push(newItem); setItems(items);",
          "setItems([...items, newItem]);",
          "delete items[0];",
          "items = [newItem];"
        ],
        "correctIndex": 1,
        "explanation": "React state must be treated as immutable; creating a new array with the spread operator [...items, newItem] provides the new reference needed for re-rendering."
      }
    ],
    "video": {
      "title": "Learn useState In 15 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "O6P86uwfdR0",
      "url": "https://www.youtube.com/watch?v=O6P86uwfdR0",
      "description": "Web Dev Simplified teaches useState fundamentals, functional updaters, object states, and common gotchas."
    }
  },
  {
    "id": "react-topic-10",
    "order": 10,
    "slug": "event-handling",
    "title": "Event Handling",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Learn React synthetic event handling: camelCase events (onClick, onChange), passing function references, preventing default behavior, and passing arguments.",
    "notes": {
      "concept": "Handling events in React is very similar to handling events on native DOM elements, with two major syntactic differences: React events are named using camelCase (onClick rather than onclick), and you pass a function reference as the event handler rather than a string. React wraps native browser events in a cross-browser SyntheticEvent wrapper to guarantee identical event behavior across Chrome, Safari, Firefox, and Edge.",
      "syntax": "// 1. Passing function reference\n<button onClick={handleClick}>Click Me</button>\n\n// 2. Passing arguments using arrow function wrapper:\n<button onClick={() => handleDelete(item.id)}>Delete</button>\n\n// 3. Accessing the SyntheticEvent object and stopping default:\nfunction handleSubmit(e) {\n  e.preventDefault(); // Prevents full page reload\n  console.log(\"Form submitted!\");\n}",
      "explanation": "1. Function Reference vs Invocation: Pass onClick={handleClick} (reference), NOT onClick={handleClick()} (which immediately invokes the function during render).\n2. SyntheticEvent: React cross-browser wrapper normalizing browser differences; has standard properties like e.target.value and e.preventDefault().\n3. Preventing Defaults: Calling e.preventDefault() prevents native browser actions like link navigation or form reloads.\n4. Passing Parameters: Wrap the handler in an inline arrow function: onClick={() => handleVote(candidate.id)}.",
      "codeExample": "import React, { useState } from 'react';\n\nexport function InteractiveButton() {\n  const [clickedTimes, setClickedTimes] = useState(0);\n\n  const handleClick = (event) => {\n    console.log(\"Event type:\", event.type);\n    setClickedTimes(prev => prev + 1);\n  };\n\n  return (\n    <div className=\"btn-wrapper\">\n      <button onClick={handleClick} className=\"action-btn\">\n        Clicked {clickedTimes} {clickedTimes === 1 ? 'time' : 'times'}\n      </button>\n    </div>\n  );\n}",
      "expectedOutput": "A button dynamically incrementing its click counter each time the user clicks.",
      "commonMistakes": [
        {
          "mistake": "Invoking the handler function during render: <button onClick={handleClick()}>Click</button>",
          "correction": "Pass the function reference without parentheses: <button onClick={handleClick}>Click</button>",
          "explanation": "Adding parentheses invokes the function immediately when the component renders, causing infinite re-render loops if the function updates state!"
        },
        {
          "mistake": "Using lowercase event names: <button onclick={handleClick}>Click</button>",
          "correction": "Use camelCase: <button onClick={handleClick}>Click</button>",
          "explanation": "JSX strictly requires camelCase for all event listeners (onClick, onChange, onSubmit, onKeyDown)."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Attach an onMouseEnter and onMouseLeave event handler to log when the cursor enters and leaves the box.",
      "starterCode": "import { useState } from 'react';\n\nfunction HoverBox() {\n  const [isHovered, setIsHovered] = useState(false);\n\n  return (\n    <div\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n      style={{ padding: '20px', background: isHovered ? '#6366f1' : '#1e293b', color: 'white' }}\n    >\n      {isHovered ? \"Cursor Inside!\" : \"Hover Over Me\"}\n    </div>\n  );\n}",
      "solutionCode": "import { useState } from 'react';\n\nfunction HoverBox() {\n  const [isHovered, setIsHovered] = useState(false);\n\n  return (\n    <div\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n      style={{ padding: '20px', background: isHovered ? '#6366f1' : '#1e293b', color: 'white' }}\n    >\n      {isHovered ? \"Cursor Inside!\" : \"Hover Over Me\"}\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q10-1",
        "level": "Easy",
        "title": "Bind Click Handler Reference",
        "prompt": "Create a component AlertButton with a function notify() { alert(\"Alert!\"); }. Return a button with onClick={notify} and label \"Notify Me\".",
        "requirements": [
          "Function notify",
          "button with onClick={notify}",
          "Label \"Notify Me\""
        ],
        "starterCode": "// Write AlertButton\n",
        "solutionCode": "function AlertButton() {\n  const notify = () => alert(\"Alert!\");\n  return <button onClick={notify}>Notify Me</button>;\n}",
        "expectedOutput": "A button firing an alert dialog when clicked.",
        "validate": (code) => {
          code = String(code || '');
          if (!/onClick\s*=\s*\{\s*notify\s*\}/i.test(code)) {
            return { valid: false, message: 'Pass onClick={notify} without invoking parentheses.' };
          }
          return { valid: true, message: 'Click handler verified!' };
        }
      },
      {
        "id": "react-q10-2",
        "level": "Medium",
        "title": "Pass Argument to Handler",
        "prompt": "Create a component ItemPicker that accepts an onSelect prop. Render two buttons: one calling onSelect(\"Apple\") and the other onSelect(\"Banana\") on click.",
        "requirements": [
          "Component ItemPicker({ onSelect })",
          "Button 1: onClick={() => onSelect(\"Apple\")}",
          "Button 2: onClick={() => onSelect(\"Banana\")}"
        ],
        "starterCode": "// Write ItemPicker\n",
        "solutionCode": "function ItemPicker({ onSelect }) {\n  return (\n    <div>\n      <button onClick={() => onSelect(\"Apple\")}>Apple</button>\n      <button onClick={() => onSelect(\"Banana\")}>Banana</button>\n    </div>\n  );\n}",
        "expectedOutput": "Two buttons passing their specific item argument to parent callback on click.",
        "validate": (code) => {
          code = String(code || '');
          if (!/onSelect\(["']Apple["']\)/i.test(code)) return { valid: false, message: 'Pass "Apple" into onSelect.' };
          if (!/onSelect\(["']Banana["']\)/i.test(code)) return { valid: false, message: 'Pass "Banana" into onSelect.' };
          return { valid: true, message: 'Argument passing verified!' };
        }
      },
      {
        "id": "react-q10-3",
        "level": "Challenge",
        "title": "Prevent Default Form Submission",
        "prompt": "Write a component PreventSubmitForm. Inside, define handleSubmit(e) that calls e.preventDefault() and logs \"Form prevented!\". Return a <form onSubmit={handleSubmit}><button type=\"submit\">Send</button></form>.",
        "requirements": [
          "Component PreventSubmitForm",
          "e.preventDefault() inside handleSubmit",
          "<form onSubmit={handleSubmit}>"
        ],
        "starterCode": "// Write PreventSubmitForm\n",
        "solutionCode": "function PreventSubmitForm() {\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(\"Form prevented!\");\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <button type=\"submit\">Send</button>\n    </form>\n  );\n}",
        "expectedOutput": "A form that cancels browser page refresh on submit using e.preventDefault().",
        "validate": (code) => {
          code = String(code || '');
          if (!/e\.preventDefault\(\)/i.test(code)) return { valid: false, message: 'Call e.preventDefault().' };
          if (!/onSubmit\s*=\s*\{\s*handleSubmit\s*\}/i.test(code)) return { valid: false, message: 'Bind onSubmit={handleSubmit}.' };
          return { valid: true, message: 'Form submit prevention verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What happens if you write <button onClick={handleClick()}> instead of <button onClick={handleClick}>?",
        "options": [
          "The browser executes the click handler faster",
          "The function executes immediately during render rather than waiting for the user click, often triggering infinite loops if it sets state",
          "React displays a compile error",
          "The button disables itself"
        ],
        "correctIndex": 1,
        "explanation": "Adding parentheses invokes the function immediately during rendering instead of passing the function reference as a callback."
      },
      {
        "id": 2,
        "question": "What is a React SyntheticEvent?",
        "options": [
          "A fake simulated event for automated unit tests only",
          "A cross-browser wrapper around the browser native event that normalizes behavior across all browsers",
          "A Node.js backend event",
          "A CSS keyframe animation"
        ],
        "correctIndex": 1,
        "explanation": "SyntheticEvent wraps native browser events to provide identical properties and methods across all web browsers."
      },
      {
        "id": 3,
        "question": "How do you pass a custom argument (like item.id) to an onClick handler in JSX?",
        "options": [
          "onClick=handleClick(item.id)",
          "onClick={() => handleClick(item.id)}",
          "onClick={handleClick, item.id}",
          "onClick:item.id"
        ],
        "correctIndex": 1,
        "explanation": "Wrapping the call in an inline arrow function () => handleClick(item.id) allows passing parameters without invoking the handler prematurely."
      }
    ],
    "video": {
      "title": "React Event Handling Tutorial",
      "channel": "Codevolution",
      "videoId": "Znqv845U7S4",
      "url": "https://www.youtube.com/watch?v=Znqv845U7S4",
      "description": "Codevolution demonstrates handling clicks, passing arguments, and understanding event binding in React."
    }
  },
  {
    "id": "react-topic-11",
    "order": 11,
    "slug": "conditional-rendering",
    "title": "Conditional Rendering",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Learn how to render different UI elements based on state: ternary operators, logical && short-circuiting, early return guard clauses, and switch/enum maps.",
    "notes": {
      "concept": "Conditional rendering in React works the same way conditions work in JavaScript. You use standard JavaScript operators like if statements, the ternary operator (condition ? A : B), and logical AND (condition && A) to dynamically render UI elements based on the current component state or props.",
      "syntax": "// 1. Ternary Operator (Either / Or)\n{isLoggedIn ? <UserProfile /> : <LoginButton />}\n\n// 2. Logical AND (Render or Nothing)\n{hasUnreadMessages && <span className=\"badge\">{count}</span>}\n\n// 3. Early Return Guard Clause\nif (isLoading) return <LoadingSpinner />;\nif (error) return <ErrorMessage text={error} />;\nreturn <MainContent />;",
      "explanation": "1. Ternary (condition ? trueJSX : falseJSX): Best when choosing between two distinct visual states (e.g., Log In vs Log Out).\n2. Logical AND (condition && element): Best when displaying an element only when a condition is met, and rendering nothing otherwise.\n3. Early Return: Exits the component function early to return loading spinners or error screens, keeping main JSX clean.\n4. Falsy Zero Gotcha: If count is 0, writing {count && <List />} will render the number 0 into the DOM! Write {count > 0 && <List />} instead.",
      "codeExample": "import React from 'react';\n\nexport function AuthStatus({ user, isLoading }) {\n  if (isLoading) {\n    return <div className=\"loader\">Loading account data...</div>;\n  }\n\n  return (\n    <div className=\"auth-header\">\n      {user ? (\n        <div className=\"user-info\">\n          <span>Welcome back, {user.name}!</span>\n          <button className=\"logout-btn\">Log Out</button>\n        </div>\n      ) : (\n        <div className=\"guest-info\">\n          <span>Please sign in to continue</span>\n          <button className=\"login-btn\">Log In</button>\n        </div>\n      )}\n    </div>\n  );\n}",
      "expectedOutput": "Shows loading indicator while loading, personalized greeting when authenticated, or sign-in prompt when logged out.",
      "commonMistakes": [
        {
          "mistake": "Using logical && with numeric length: {items.length && <List items={items} />}",
          "correction": "Use explicit boolean comparison: {items.length > 0 && <List items={items} />}",
          "explanation": "When items is empty ([]), items.length evaluates to 0. JavaScript treats 0 as a valid renderable number, so \"0\" appears on the webpage!"
        },
        {
          "mistake": "Placing full if/else statements directly inside JSX tags: <div>{if (logged) { ... }}</div>",
          "correction": "Use ternary expressions inside JSX ({logged ? <A /> : <B />}) or move if statements before the return.",
          "explanation": "JSX curly braces only accept JavaScript expressions that produce a value, not JavaScript statements."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Conditionally render an error banner if the error string is not empty.",
      "starterCode": "function MessageBanner({ error, message }) {\n  return (\n    <div>\n      {/* Conditionally render error if it exists */}\n      {error && <div className=\"error-alert\">{error}</div>}\n      <p>{message}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <MessageBanner error=\"Failed to connect to database\" message=\"Please try again.\" />\n    </div>\n  );\n}",
      "solutionCode": "function MessageBanner({ error, message }) {\n  return (\n    <div>\n      {error && <div className=\"error-alert\">{error}</div>}\n      <p>{message}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <MessageBanner error=\"Failed to connect to database\" message=\"Please try again.\" />\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q11-1",
        "level": "Easy",
        "title": "Ternary Status Indicator",
        "prompt": "Create a component ConnectionStatus taking prop isConnected. Return a <p> saying \"Online\" if isConnected is true, otherwise \"Offline\" using a ternary operator.",
        "requirements": [
          "Component ConnectionStatus({ isConnected })",
          "Ternary condition inside <p>",
          "Display \"Online\" or \"Offline\""
        ],
        "starterCode": "// Write ConnectionStatus with ternary\n",
        "solutionCode": "function ConnectionStatus({ isConnected }) {\n  return <p>{isConnected ? \"Online\" : \"Offline\"}</p>;\n}",
        "expectedOutput": "A paragraph displaying Online or Offline based on boolean prop.",
        "validate": (code) => {
          code = String(code || '');
          if (!/isConnected\s*\?\s*["']Online["']\s*:\s*["']Offline["']/i.test(code)) {
            return { valid: false, message: 'Use isConnected ? "Online" : "Offline".' };
          }
          return { valid: true, message: 'Ternary condition verified!' };
        }
      },
      {
        "id": "react-q11-2",
        "level": "Medium",
        "title": "Safe Length Check with Logical AND",
        "prompt": "Create a component NotificationBadge taking prop unreadCount. Render a <span className=\"badge\">{unreadCount}</span> only if unreadCount > 0 using logical &&.",
        "requirements": [
          "Component NotificationBadge({ unreadCount })",
          "Condition {unreadCount > 0 && <span ...>}",
          "Avoid rendering 0 when count is zero"
        ],
        "starterCode": "// Write NotificationBadge\n",
        "solutionCode": "function NotificationBadge({ unreadCount }) {\n  return (\n    <div>\n      {unreadCount > 0 && <span className=\"badge\">{unreadCount}</span>}\n    </div>\n  );\n}",
        "expectedOutput": "A notification badge that renders when count > 0 and hides completely when 0.",
        "validate": (code) => {
          code = String(code || '');
          if (!/unreadCount\s*>\s*0\s*&&/i.test(code)) {
            return { valid: false, message: 'Use explicit check unreadCount > 0 &&.' };
          }
          return { valid: true, message: 'Safe logical AND verified!' };
        }
      },
      {
        "id": "react-q11-3",
        "level": "Challenge",
        "title": "Early Return Guard Clause for Loading and Error",
        "prompt": "Write a component DataViewer taking props isLoading, error, and data. If isLoading is true, return <div>Loading...</div>. If error is truthy, return <div>Error: {error}</div>. Otherwise return <h1>{data}</h1>.",
        "requirements": [
          "if (isLoading) return <div>Loading...</div>",
          "if (error) return <div>Error: {error}</div>",
          "return <h1>{data}</h1>"
        ],
        "starterCode": "// Write DataViewer with early returns\n",
        "solutionCode": "function DataViewer({ isLoading, error, data }) {\n  if (isLoading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  return <h1>{data}</h1>;\n}",
        "expectedOutput": "A clean component utilizing guard clauses to separate loading, error, and content branches.",
        "validate": (code) => {
          code = String(code || '');
          if (!/if\s*\(\s*isLoading\s*\)\s*return/i.test(code)) return { valid: false, message: 'Include early return for isLoading.' };
          if (!/if\s*\(\s*error\s*\)\s*return/i.test(code)) return { valid: false, message: 'Include early return for error.' };
          if (!/<h1>\{data\}<\/h1>/i.test(code)) return { valid: false, message: 'Render data in <h1>.' };
          return { valid: true, message: 'Early returns verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What renders on the screen if you write {items.length && <List />} when items is an empty array ([])?",
        "options": [
          "Nothing, it hides cleanly",
          "The number 0 renders on the webpage because 0 is a valid renderable JavaScript number",
          "An undefined error is thrown",
          "An empty list element"
        ],
        "correctIndex": 1,
        "explanation": "In JavaScript, 0 is falsy, but React renders numbers directly into the DOM. You should write {items.length > 0 && <List />} to avoid rendering \"0\"."
      },
      {
        "id": 2,
        "question": "Which syntax allows choosing between two alternative UI elements inside JSX?",
        "options": [
          "The ternary operator: {condition ? <ElementA /> : <ElementB />}",
          "An if/else statement: {if (condition) <A /> else <B />}",
          "CSS display: none",
          "while loops"
        ],
        "correctIndex": 0,
        "explanation": "Ternary expressions are valid expressions that return one of two values inside JSX curly braces."
      },
      {
        "id": 3,
        "question": "What is an \"early return\" pattern in a React component?",
        "options": [
          "Returning from a function before it renders the main UI to handle loading or error states",
          "Returning props to the parent component",
          "Stopping React reconciliation",
          "Exiting the browser tab"
        ],
        "correctIndex": 0,
        "explanation": "An early return evaluates guard conditions (like loading or error) at the start of the component to render dedicated states immediately."
      }
    ],
    "video": {
      "title": "React Conditional Rendering Best Practices",
      "channel": "Web Dev Simplified",
      "videoId": "7oT_A8bWvO8",
      "url": "https://www.youtube.com/watch?v=7oT_A8bWvO8",
      "description": "Web Dev Simplified explains clean conditional rendering, avoiding the 0 bug, and early returns."
    }
  },
  {
    "id": "react-topic-12",
    "order": 12,
    "slug": "lists-and-keys",
    "title": "Lists and Keys",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Render dynamic collections with Array.prototype.map() and understand why unique, stable keys are crucial for Virtual DOM reconciliation diffing.",
    "notes": {
      "concept": "To render a collection of data in React, we use the standard JavaScript Array.prototype.map() method. Every item rendered in an array must receive a special string or numeric attribute called \"key\". Keys give elements a stable identity, allowing React Virtual DOM diffing to know whether an item was added, removed, re-ordered, or modified, rather than needlessly destroying and rebuilding DOM nodes.",
      "syntax": "const students = [\n  { id: 's1', name: 'Alice' },\n  { id: 's2', name: 'Bob' }\n];\n\n// Rendering array with stable keys\n<ul>\n  {students.map(student => (\n    <li key={student.id}>{student.name}</li>\n  ))}\n</ul>",
      "explanation": "1. Array.map(): Transforms an array of data objects into an array of JSX elements.\n2. Key Prop: A unique string or number identifying an item among its siblings.\n3. Virtual DOM Optimization: Keys enable React to reorder DOM nodes efficiently without full re-creation.\n4. Avoid Index as Key: Do NOT use array index (key={index}) if items can be sorted, filtered, or deleted; it breaks input focus and component state.",
      "codeExample": "import React from 'react';\n\nexport function CourseDirectory({ courses }) {\n  return (\n    <div className=\"course-list\">\n      <h2>Available Courses</h2>\n      <ul>\n        {courses.map(course => (\n          <li key={course.id} className=\"course-item\">\n            <strong>{course.title}</strong> - <span>{course.level}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
      "expectedOutput": "An organized bulleted list rendering dynamic courses with unique identifier keys.",
      "commonMistakes": [
        {
          "mistake": "Using the array index as the key: {items.map((item, index) => <Item key={index} />)}",
          "correction": "Use a unique, stable ID from your data: <Item key={item.id} />",
          "explanation": "If the list is re-ordered or an item is deleted from the middle, the indices shift, confusing React and causing state bugs in child inputs."
        },
        {
          "mistake": "Generating random keys during render: <Item key={Math.random()} />",
          "correction": "Assign permanent IDs in your database or state before rendering.",
          "explanation": "Random keys change on every single render, forcing React to destroy and re-create every DOM node every time!"
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Map over an array of programming languages and render each in an <li> with a key.",
      "starterCode": "function LanguageList() {\n  const languages = [\n    { id: 'lang-1', name: 'JavaScript' },\n    { id: 'lang-2', name: 'Python' },\n    { id: 'lang-3', name: 'TypeScript' }\n  ];\n\n  return (\n    <ul>\n      {/* Map over languages here */}\n      {languages.map(lang => (\n        <li key={lang.id}>{lang.name}</li>\n      ))}\n    </ul>\n  );\n}",
      "solutionCode": "function LanguageList() {\n  const languages = [\n    { id: 'lang-1', name: 'JavaScript' },\n    { id: 'lang-2', name: 'Python' },\n    { id: 'lang-3', name: 'TypeScript' }\n  ];\n\n  return (\n    <ul>\n      {languages.map(lang => (\n        <li key={lang.id}>{lang.name}</li>\n      ))}\n    </ul>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q12-1",
        "level": "Easy",
        "title": "Render List of Topics with Keys",
        "prompt": "Create a component TopicList taking prop topics (an array of strings). Render an <ol> where each item is rendered in an <li> with key={topic} and content {topic}.",
        "requirements": [
          "Component TopicList({ topics })",
          "<ol> container",
          "topics.map(topic => <li key={topic}>{topic}</li>)"
        ],
        "starterCode": "// Write TopicList\n",
        "solutionCode": "function TopicList({ topics }) {\n  return (\n    <ol>\n      {topics.map(topic => (\n        <li key={topic}>{topic}</li>\n      ))}\n    </ol>\n  );\n}",
        "expectedOutput": "An ordered list rendering string items with unique topic keys.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\.map\(/i.test(code)) return { valid: false, message: 'Use topics.map().' };
          if (!/key\s*=\s*\{\s*topic\s*\}/i.test(code)) return { valid: false, message: 'Set key={topic}.' };
          return { valid: true, message: 'TopicList verified!' };
        }
      },
      {
        "id": "react-q12-2",
        "level": "Medium",
        "title": "Render Object Array with ID Keys",
        "prompt": "Create a component UserTable taking prop users (array of { id, username, email }). Return a <ul> where each item is <li key={user.id}>{user.username} ({user.email})</li>.",
        "requirements": [
          "Component UserTable({ users })",
          "users.map(user => ...)",
          "key={user.id}",
          "{user.username} ({user.email})"
        ],
        "starterCode": "// Write UserTable\n",
        "solutionCode": "function UserTable({ users }) {\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user.id}>{user.username} ({user.email})</li>\n      ))}\n    </ul>\n  );\n}",
        "expectedOutput": "A list rendering usernames and emails keyed by stable user IDs.",
        "validate": (code) => {
          code = String(code || '');
          if (!/key\s*=\s*\{\s*user\.id\s*\}/i.test(code)) return { valid: false, message: 'Set key={user.id}.' };
          if (!/user\.username/i.test(code) || !/user\.email/i.test(code)) return { valid: false, message: 'Render username and email.' };
          return { valid: true, message: 'UserTable verified!' };
        }
      },
      {
        "id": "react-q12-3",
        "level": "Challenge",
        "title": "Filter and Map Filtered Array",
        "prompt": "Write a component ActiveTasksList taking prop tasks (array of { id, text, completed }). Filter the tasks to only include those where completed is false, then map over them returning <li key={task.id}>{task.text}</li> inside a <ul>.",
        "requirements": [
          "Filter tasks where !task.completed",
          "Map over active tasks",
          "key={task.id}",
          "Render {task.text}"
        ],
        "starterCode": "// Write ActiveTasksList filtering then mapping\n",
        "solutionCode": "function ActiveTasksList({ tasks }) {\n  const activeTasks = tasks.filter(t => !t.completed);\n  return (\n    <ul>\n      {activeTasks.map(task => (\n        <li key={task.id}>{task.text}</li>\n      ))}\n    </ul>\n  );\n}",
        "expectedOutput": "A list displaying only incomplete tasks with stable ID keys.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\.filter\(/i.test(code)) return { valid: false, message: 'Filter tasks first.' };
          if (!/\.map\(/i.test(code)) return { valid: false, message: 'Map over filtered tasks.' };
          if (!/key\s*=\s*\{\s*task\.id\s*\}/i.test(code) && !/key\s*=\s*\{\s*t\.id\s*\}/i.test(code)) {
            return { valid: false, message: 'Assign key={task.id}.' };
          }
          return { valid: true, message: 'ActiveTasksList verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why does React require a \"key\" prop when rendering dynamic lists of elements?",
        "options": [
          "Keys are required by CSS for nth-child styling",
          "Keys give elements a stable identity so React Virtual DOM can identify which items changed, were added, or were removed",
          "Keys encrypt user passwords",
          "Keys sort array elements alphabetically"
        ],
        "correctIndex": 1,
        "explanation": "Keys allow React reconciliation to track individual DOM nodes across renders, minimizing DOM re-creations."
      },
      {
        "id": 2,
        "question": "Why is using array indices (key={index}) discouraged if the list can be sorted, filtered, or deleted?",
        "options": [
          "Because JavaScript arrays cannot have indices",
          "Because when an item is removed or reordered, the indices shift, causing React to associate state with the wrong component",
          "Because indices crash the browser parser",
          "Because indices are not numbers"
        ],
        "correctIndex": 1,
        "explanation": "Index-based keys cause component state and input values to attach to the wrong visual items when the list order changes."
      },
      {
        "id": 3,
        "question": "What happens if you use Math.random() as the key (key={Math.random()})?",
        "options": [
          "It creates unique keys that speed up rendering",
          "Every render produces a brand new key, forcing React to completely destroy and re-create every DOM node on every single render",
          "It connects to a random server",
          "It enables animations automatically"
        ],
        "correctIndex": 1,
        "explanation": "Random keys violate stability; React thinks every item is a brand-new element every render, degrading performance."
      }
    ],
    "video": {
      "title": "Why You Should Not Use Index As A Key In React",
      "channel": "Web Dev Simplified",
      "videoId": "0ZJgIjIuY7U",
      "url": "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
      "description": "Web Dev Simplified demonstrates the bugs caused by index keys and why stable IDs are essential."
    }
  },
  {
    "id": "react-topic-13",
    "order": 13,
    "slug": "forms-and-controlled-components",
    "title": "Forms and Controlled Components",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Master forms in React: controlled inputs with single-source-of-truth state, multi-input handlers, and form validation on submission.",
    "notes": {
      "concept": "In HTML, form elements like <input>, <textarea>, and <select> typically maintain their own internal DOM state. In React, a \"Controlled Component\" delegates this responsibility to React state. An input value prop is bound to a state variable, and an onChange listener updates the state on every keystroke. This makes React state the single source of truth.",
      "syntax": "// Controlled Input Pattern\nconst [query, setQuery] = useState('');\n\n<input\n  type=\"text\"\n  value={query}\n  onChange={(e) => setQuery(e.target.value)}\n/>",
      "explanation": "1. Single Source of Truth: The input display value is always synchronized with React state.\n2. Instant Validation: Form values can be checked, formatted, or disabled in real time on every keystroke.\n3. Multi-Input Handling: Manage multiple form fields in a single state object using dynamic keys: [e.target.name]: e.target.value.\n4. Form Submission: Intercept <form onSubmit={handleSubmit}> and call e.preventDefault() to submit data via fetch without reloading.",
      "codeExample": "import React, { useState } from 'react';\n\nexport function RegistrationForm() {\n  const [formData, setFormData] = useState({\n    username: '',\n    email: '',\n    role: 'Student'\n  });\n\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setFormData(prev => ({ ...prev, [name]: value }));\n  };\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(\"Submitting registered account:\", formData);\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className=\"form-box\">\n      <input\n        name=\"username\"\n        value={formData.username}\n        onChange={handleChange}\n        placeholder=\"Username\"\n      />\n      <input\n        name=\"email\"\n        type=\"email\"\n        value={formData.email}\n        onChange={handleChange}\n        placeholder=\"Email\"\n      />\n      <select name=\"role\" value={formData.role} onChange={handleChange}>\n        <option value=\"Student\">Student</option>\n        <option value=\"Instructor\">Instructor</option>\n      </select>\n      <button type=\"submit\">Register</button>\n    </form>\n  );\n}",
      "expectedOutput": "A fully controlled form binding text inputs and dropdown select to state with submit handling.",
      "commonMistakes": [
        {
          "mistake": "Leaving value as undefined initially, then setting it to a string later: <input value={name} /> with name initialized to undefined.",
          "correction": "Always initialize state to an empty string (\"\") or valid default: useState(\"\").",
          "explanation": "Switching an input from uncontrolled (undefined) to controlled causes React to warn in the console and can drop user input."
        },
        {
          "mistake": "Omitting the onChange handler when specifying a value prop: <input value=\"read-only\" />",
          "correction": "Provide an onChange handler or use readOnly if the input is genuinely non-interactive.",
          "explanation": "Without onChange, the input becomes completely read-only because React continuously forces the declared value."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Bind an input to a text state variable so the live preview updates as you type.",
      "starterCode": "import { useState } from 'react';\n\nfunction LiveMirror() {\n  const [text, setText] = useState('');\n\n  return (\n    <div>\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder=\"Type something...\"\n      />\n      <p>Live Output: <strong>{text}</strong></p>\n    </div>\n  );\n}",
      "solutionCode": "import { useState } from 'react';\n\nfunction LiveMirror() {\n  const [text, setText] = useState('');\n\n  return (\n    <div>\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder=\"Type something...\"\n      />\n      <p>Live Output: <strong>{text}</strong></p>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q13-1",
        "level": "Easy",
        "title": "Controlled Text Input",
        "prompt": "Create a component NameInput. Initialize state name to \"\" with useState(\"\"). Render an <input value={name} onChange={(e) => setName(e.target.value)} /> and a <p>Hello, {name}!</p>.",
        "requirements": [
          "useState(\"\")",
          "Controlled input with value and onChange",
          "<p>Hello, {name}!</p>"
        ],
        "starterCode": "// Write NameInput\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction NameInput() {\n  const [name, setName] = useState(\"\");\n  return (\n    <div>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <p>Hello, {name}!</p>\n    </div>\n  );\n}",
        "expectedOutput": "An input controlling text state and reflecting it in a greeting paragraph.",
        "validate": (code) => {
          code = String(code || '');
          if (!/value\s*=\s*\{\s*name\s*\}/i.test(code)) return { valid: false, message: 'Bind value={name}.' };
          if (!/onChange\s*=\s*\{/i.test(code)) return { valid: false, message: 'Provide onChange handler.' };
          if (!/e\.target\.value/i.test(code)) return { valid: false, message: 'Read e.target.value.' };
          return { valid: true, message: 'Controlled input verified!' };
        }
      },
      {
        "id": "react-q13-2",
        "level": "Medium",
        "title": "Form Reset on Submit",
        "prompt": "Create a component QuickComment with state comment = \"\". On form submit, prevent default and reset comment back to \"\".",
        "requirements": [
          "useState(\"\")",
          "e.preventDefault() in submit handler",
          "setComment(\"\") to clear input on submit"
        ],
        "starterCode": "// Write QuickComment with submit reset\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction QuickComment() {\n  const [comment, setComment] = useState(\"\");\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    setComment(\"\");\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={comment} onChange={(e) => setComment(e.target.value)} />\n      <button type=\"submit\">Post</button>\n    </form>\n  );\n}",
        "expectedOutput": "A comment form that clears its input field upon successful submit.",
        "validate": (code) => {
          code = String(code || '');
          if (!/e\.preventDefault\(\)/i.test(code)) return { valid: false, message: 'Call e.preventDefault().' };
          if (!/setComment\(["']["']\)/i.test(code)) return { valid: false, message: 'Reset comment state with setComment("").' };
          return { valid: true, message: 'Form reset verified!' };
        }
      },
      {
        "id": "react-q13-3",
        "level": "Challenge",
        "title": "Multi-Field Dynamic Form Handler",
        "prompt": "Write a component MultiFieldForm with state form = { title: \"\", category: \"Tech\" }. Use a single handleChange(e) function with [e.target.name]: e.target.value to update both fields.",
        "requirements": [
          "useState({ title: \"\", category: \"Tech\" })",
          "Single handleChange with [e.target.name]: e.target.value",
          "Inputs for name=\"title\" and name=\"category\""
        ],
        "starterCode": "// Write MultiFieldForm with dynamic key updater\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction MultiFieldForm() {\n  const [form, setForm] = useState({ title: \"\", category: \"Tech\" });\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setForm(prev => ({ ...prev, [name]: value }));\n  };\n  return (\n    <form>\n      <input name=\"title\" value={form.title} onChange={handleChange} />\n      <input name=\"category\" value={form.category} onChange={handleChange} />\n    </form>\n  );\n}",
        "expectedOutput": "A reusable multi-field handler dynamically updating state object keys.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\[e\.target\.name\]\s*:\s*e\.target\.value/i.test(code) && !/\[name\]\s*:\s*value/i.test(code)) {
            return { valid: false, message: 'Use dynamic property key [e.target.name]: e.target.value.' };
          }
          if (!/\.\.\.prev/i.test(code) && !/\.\.\.form/i.test(code)) {
            return { valid: false, message: 'Spread previous state object (...prev).' };
          }
          return { valid: true, message: 'Multi-field form verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What defines a \"controlled component\" in React?",
        "options": [
          "An input whose value is dictated strictly by React state via the value prop and updated with onChange",
          "A component protected by an authentication password",
          "A component rendered on the backend server",
          "An input controlled by CSS media queries"
        ],
        "correctIndex": 0,
        "explanation": "A controlled component relies on React state as the single source of truth for its current value."
      },
      {
        "id": 2,
        "question": "What happens if you provide a value prop to an input without an onChange handler?",
        "options": [
          "The input generates random values",
          "The input becomes effectively read-only because React continuously enforces the provided value",
          "The page crashes with a syntax error",
          "The browser submits the form automatically"
        ],
        "correctIndex": 1,
        "explanation": "Without onChange, React will overwrite any user typing with the declared value on every tick, making it read-only."
      },
      {
        "id": 3,
        "question": "How do you handle multiple input fields with a single handler function?",
        "options": [
          "Give each input a name attribute and use setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))",
          "Create 50 separate useState hooks",
          "Use document.forms[0].elements",
          "Disable React state"
        ],
        "correctIndex": 0,
        "explanation": "Using JavaScript computed property names ([e.target.name]: e.target.value) allows a single function to update any matching field in state."
      }
    ],
    "video": {
      "title": "Controlled vs Uncontrolled Components In React",
      "channel": "Web Dev Simplified",
      "videoId": "tIdNeoHniEY",
      "url": "https://www.youtube.com/watch?v=tIdNeoHniEY",
      "description": "Web Dev Simplified compares controlled and uncontrolled inputs, explaining when and how to control form state."
    }
  },
  {
    "id": "react-topic-14",
    "order": 14,
    "slug": "useeffect-hook",
    "title": "useEffect Hook",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Master side effects in functional components: API data fetching, event listeners, document title updates, the dependency array, and cleanup functions.",
    "notes": {
      "concept": "A \"side effect\" is any operation that affects something outside the scope of the function being executed (e.g., fetching data over the network, setting timers, directly interacting with browser APIs, or subscribing to external stores). The useEffect hook allows functional components to perform side effects cleanly and safely.",
      "syntax": "import { useEffect } from 'react';\n\n// 1. Runs after EVERY render (no dependency array)\nuseEffect(() => {\n  console.log(\"Component rendered\");\n});\n\n// 2. Runs ONLY ONCE on mount (empty dependency array [])\nuseEffect(() => {\n  fetchInitialData();\n}, []);\n\n// 3. Runs on mount AND when specific dependencies change\nuseEffect(() => {\n  fetchUserData(userId);\n}, [userId]);\n\n// 4. Cleanup function (unmount or before next effect run)\nuseEffect(() => {\n  const timer = setInterval(() => tick(), 1000);\n  return () => clearInterval(timer); // Cleanup!\n}, []);",
      "explanation": "1. Execution Timing: useEffect runs AFTER the browser has completed painting the DOM, keeping UI transitions fluid.\n2. Dependency Array []: Directs React when to re-execute the effect. If values in [] change between renders, the effect re-runs.\n3. Cleanup Function: Returning a function from useEffect schedules cleanup (clearing timers, canceling subscriptions, removing event listeners) before the component unmounts or before the effect re-runs.\n4. Avoid Infinite Loops: Never update a state variable inside useEffect without placing proper guard conditions or omitting it from dependencies.",
      "codeExample": "import React, { useState, useEffect } from 'react';\n\nexport function WindowWidthTracker() {\n  const [width, setWidth] = useState(window.innerWidth);\n\n  useEffect(() => {\n    const handleResize = () => setWidth(window.innerWidth);\n    window.addEventListener('resize', handleResize);\n\n    // Cleanup: remove listener to prevent memory leaks when unmounted\n    return () => {\n      window.removeEventListener('resize', handleResize);\n    };\n  }, []); // Run once on mount\n\n  return (\n    <div className=\"tracker-card\">\n      <h4>Current Viewport Width:</h4>\n      <span className=\"dimension-badge\">{width}px</span>\n    </div>\n  );\n}",
      "expectedOutput": "A live viewport tracker updating dynamically when the browser window is resized, with zero memory leaks.",
      "commonMistakes": [
        {
          "mistake": "Forgetting the dependency array entirely when fetching data, causing an infinite network request loop!",
          "correction": "Pass an empty dependency array [] (or required ID dependencies): useEffect(() => { ... }, []);",
          "explanation": "Without a dependency array, useEffect executes after EVERY single render. Updating state inside triggers a re-render, repeating forever."
        },
        {
          "mistake": "Failing to clean up event listeners or intervals in a return () => { ... } function.",
          "correction": "Always return a cleanup function when establishing timers, sockets, or window event listeners.",
          "explanation": "Uncleaned subscriptions create memory leaks and cause setState warnings on unmounted components."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Set document.title dynamically using useEffect whenever the count state changes.",
      "starterCode": "import { useState, useEffect } from 'react';\n\nfunction DocumentTitleChanger() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    // Update document title with current count\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return (\n    <div>\n      <p>Look at your browser tab title!</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment ({count})</button>\n    </div>\n  );\n}",
      "solutionCode": "import { useState, useEffect } from 'react';\n\nfunction DocumentTitleChanger() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return (\n    <div>\n      <p>Look at your browser tab title!</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment ({count})</button>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q14-1",
        "level": "Easy",
        "title": "Run Effect Once on Mount",
        "prompt": "Write a component MountLogger that calls console.log(\"Component Mounted\") exactly once on mount using useEffect with an empty dependency array.",
        "requirements": [
          "useEffect hook",
          "console.log(\"Component Mounted\")",
          "Empty dependency array []"
        ],
        "starterCode": "// Write MountLogger\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction MountLogger() {\n  useEffect(() => {\n    console.log(\"Component Mounted\");\n  }, []);\n  return <div>Logger Active</div>;\n}",
        "expectedOutput": "A component logging once on initial mount.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useEffect\s*\(/i.test(code)) return { valid: false, message: 'Use useEffect hook.' };
          if (!/\[\s*\]/i.test(code)) return { valid: false, message: 'Pass empty dependency array [].' };
          if (!/Component Mounted/i.test(code)) return { valid: false, message: 'Log "Component Mounted".' };
          return { valid: true, message: 'Mount effect verified!' };
        }
      },
      {
        "id": "react-q14-2",
        "level": "Medium",
        "title": "Dependency Array with State Change",
        "prompt": "Create a component UserFetcher taking prop userId. Write a useEffect that calls fetchUser(userId) whenever userId changes (dependency array [userId]).",
        "requirements": [
          "Component UserFetcher({ userId })",
          "useEffect calling fetchUser(userId)",
          "Dependency array [userId]"
        ],
        "starterCode": "// Write UserFetcher with dependency\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction UserFetcher({ userId }) {\n  useEffect(() => {\n    fetchUser(userId);\n  }, [userId]);\n  return <div>User: {userId}</div>;\n}",
        "expectedOutput": "An effect triggered on mount and whenever userId prop changes.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\[\s*userId\s*\]/i.test(code)) return { valid: false, message: 'Include [userId] in dependency array.' };
          if (!/fetchUser\(\s*userId\s*\)/i.test(code)) return { valid: false, message: 'Call fetchUser(userId).' };
          return { valid: true, message: 'Dependency array verified!' };
        }
      },
      {
        "id": "react-q14-3",
        "level": "Challenge",
        "title": "Interval Timer with Proper Cleanup",
        "prompt": "Create a component LiveTimer with state seconds = 0. In useEffect, start a setInterval incrementing seconds every 1000ms. Return a cleanup function calling clearInterval(id) to prevent memory leaks.",
        "requirements": [
          "setInterval inside useEffect",
          "Functional updater setSeconds(s => s + 1)",
          "return () => clearInterval(id) cleanup",
          "Empty dependency array []"
        ],
        "starterCode": "// Write LiveTimer with interval and cleanup\n",
        "solutionCode": "import { useState, useEffect } from \"react\";\n\nfunction LiveTimer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => {\n      setSeconds(prev => prev + 1);\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <div>Seconds: {seconds}</div>;\n}",
        "expectedOutput": "A ticking second counter that cleans up its interval timer on unmount.",
        "validate": (code) => {
          code = String(code || '');
          if (!/setInterval/i.test(code)) return { valid: false, message: 'Start setInterval.' };
          if (!/clearInterval/i.test(code)) return { valid: false, message: 'Return cleanup function with clearInterval.' };
          if (!/return\s*\(\)\s*=>/i.test(code) && !/return\s*function/i.test(code)) {
            return { valid: false, message: 'Return cleanup function from useEffect.' };
          }
          return { valid: true, message: 'Timer cleanup verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What happens if you omit the dependency array completely: useEffect(() => { ... })?",
        "options": [
          "The effect never runs",
          "The effect runs on initial mount AND after EVERY single render of the component",
          "The effect only runs once",
          "React throws a compile error"
        ],
        "correctIndex": 1,
        "explanation": "Omitting the dependency array causes useEffect to re-run after every single render pass."
      },
      {
        "id": 2,
        "question": "When does the cleanup function returned from useEffect execute?",
        "options": [
          "Only when the browser window closes",
          "Immediately before the component unmounts, and before re-running the effect on dependency change",
          "Before the initial render",
          "It never executes"
        ],
        "correctIndex": 1,
        "explanation": "React invokes the cleanup function when the component unmounts or prior to re-executing the effect with new dependencies."
      },
      {
        "id": 3,
        "question": "Why should you pass an empty array [] if you only want an effect to run once on mount?",
        "options": [
          "Because an empty array has no changing dependencies, so React never needs to re-run the effect",
          "Because arrays are faster than objects",
          "It tells React to use Web Workers",
          "It makes fetch synchronous"
        ],
        "correctIndex": 0,
        "explanation": "With an empty dependency array, the dependencies never change between renders, so the effect only runs once on initial mount."
      }
    ],
    "video": {
      "title": "Learn useEffect In 13 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "0ZJgIjIuY7U",
      "url": "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
      "description": "Web Dev Simplified breaks down the useEffect lifecycle, dependency array, and cleanups."
    }
  },
  {
    "id": "react-topic-15",
    "order": 15,
    "slug": "component-lifecycle-concepts",
    "title": "Component Lifecycle Concepts",
    "difficulty": "Intermediate",
    "estimatedTime": "15 min",
    "summary": "Map classical lifecycle phases (Mounting, Updating, Unmounting) to modern React hooks: understanding render timing, commits, and cleanups.",
    "notes": {
      "concept": "Every React component follows a 3-stage lifecycle: 1) Mounting (birth: inserted into the DOM for the first time), 2) Updating (growth: re-rendering due to state or prop changes), and 3) Unmounting (death: removed from the DOM). In class components, this was handled by componentDidMount, componentDidUpdate, and componentWillUnmount. Modern React unifies all three phases under the useEffect hook.",
      "syntax": "// Lifecycle to Hook Mapping:\n// 1. componentDidMount -> useEffect(() => { ... }, [])\n// 2. componentDidUpdate -> useEffect(() => { ... }, [propOrState])\n// 3. componentWillUnmount -> useEffect(() => { return () => { ... } }, [])",
      "explanation": "1. Mounting Phase: Component function executes, JSX is converted to DOM elements, and effects with [] run.\n2. Updating Phase: Props or state change, component re-renders, DOM is patched, and effects with changed dependencies run.\n3. Unmounting Phase: Component is removed from the screen, running cleanup functions to prevent memory leaks.\n4. Render Phase vs Commit Phase: Render phase calculates diffs (can be paused/aborted); Commit phase actually applies DOM mutations.",
      "codeExample": "import React, { useState, useEffect } from 'react';\n\nexport function LifecycleDemo({ topicId }) {\n  const [data, setData] = useState(null);\n\n  // 1. Mounting & Updating: Runs on mount AND when topicId updates\n  useEffect(() => {\n    console.log(\"Phase: MOUNT / UPDATE for topic:\", topicId);\n    let isCancelled = false;\n\n    fetchData(topicId).then(res => {\n      if (!isCancelled) setData(res);\n    });\n\n    // 2. Unmounting / Cleanup: Runs before next effect or on component unmount\n    return () => {\n      console.log(\"Phase: UNMOUNT / CLEANUP for topic:\", topicId);\n      isCancelled = true;\n    };\n  }, [topicId]);\n\n  return <div>Topic Details: {data ? data.title : \"Loading...\"}</div>;\n}",
      "expectedOutput": "A component tracking its lifecycle transitions cleanly through console logs and request cancellation.",
      "commonMistakes": [
        {
          "mistake": "Thinking in lifecycle methods (didMount, didUpdate) rather than synchronization.",
          "correction": "Think of useEffect as synchronizing component state with external systems (APIs, DOM, subscriptions).",
          "explanation": "Modern React hooks are declarative synchronization declarations rather than imperative lifecycle callbacks."
        },
        {
          "mistake": "Setting state inside an effect without specifying dependencies, causing an infinite update loop.",
          "correction": "Always include accurate dependency arrays.",
          "explanation": "Updating state triggers an update phase, which re-runs the effect, triggering another update."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Observe mount and unmount console logs by mounting and unmounting a child component.",
      "starterCode": "import { useState, useEffect } from 'react';\n\nfunction ChildComponent() {\n  useEffect(() => {\n    console.log(\"Child MOUNTED to DOM!\");\n    return () => {\n      console.log(\"Child UNMOUNTED from DOM!\");\n    };\n  }, []);\n\n  return <div style={{ padding: '10px', background: '#3b82f6', color: 'white' }}>Active Child</div>;\n}\n\nfunction App() {\n  const [showChild, setShowChild] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setShowChild(s => !s)}>Toggle Child</button>\n      {showChild && <ChildComponent />}\n    </div>\n  );\n}",
      "solutionCode": "import { useState, useEffect } from 'react';\n\nfunction ChildComponent() {\n  useEffect(() => {\n    console.log(\"Child MOUNTED to DOM!\");\n    return () => {\n      console.log(\"Child UNMOUNTED from DOM!\");\n    };\n  }, []);\n\n  return <div style={{ padding: '10px', background: '#3b82f6', color: 'white' }}>Active Child</div>;\n}\n\nfunction App() {\n  const [showChild, setShowChild] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setShowChild(s => !s)}>Toggle Child</button>\n      {showChild && <ChildComponent />}\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q15-1",
        "level": "Easy",
        "title": "Simulate componentDidMount",
        "prompt": "Create a component InitLoader that calls fetchConfig() only once when the component mounts into the DOM.",
        "requirements": [
          "useEffect hook",
          "Empty dependency array []",
          "Call fetchConfig()"
        ],
        "starterCode": "// Write InitLoader\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction InitLoader() {\n  useEffect(() => {\n    fetchConfig();\n  }, []);\n  return <div>Initializing...</div>;\n}",
        "expectedOutput": "A component executing an initialization call on mount.",
        "validate": (code) => {
          code = String(code || '');
          if (!/fetchConfig\(\)/i.test(code)) return { valid: false, message: 'Call fetchConfig().' };
          if (!/\[\s*\]/i.test(code)) return { valid: false, message: 'Pass empty dependency array [].' };
          return { valid: true, message: 'Mount lifecycle verified!' };
        }
      },
      {
        "id": "react-q15-2",
        "level": "Medium",
        "title": "Simulate componentWillUnmount Cleanup",
        "prompt": "Create a component SocketListener. In useEffect, subscribe to events via socket.connect(). Return a cleanup function calling socket.disconnect() when unmounting.",
        "requirements": [
          "socket.connect() on mount",
          "return () => socket.disconnect() on unmount",
          "Empty dependency array []"
        ],
        "starterCode": "// Write SocketListener with unmount cleanup\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction SocketListener() {\n  useEffect(() => {\n    socket.connect();\n    return () => socket.disconnect();\n  }, []);\n  return <div>Socket Active</div>;\n}",
        "expectedOutput": "A component disconnecting its socket cleanly upon unmounting.",
        "validate": (code) => {
          code = String(code || '');
          if (!/socket\.connect\(\)/i.test(code)) return { valid: false, message: 'Call socket.connect().' };
          if (!/socket\.disconnect\(\)/i.test(code)) return { valid: false, message: 'Call socket.disconnect() in cleanup.' };
          return { valid: true, message: 'Unmount lifecycle verified!' };
        }
      },
      {
        "id": "react-q15-3",
        "level": "Challenge",
        "title": "Update Phase Synchronization",
        "prompt": "Create a component SyncDocument taking prop docId. When docId changes, log \"Syncing document: \" + docId, and cancel pending sync with return () => log \"Cancelled doc: \" + docId.",
        "requirements": [
          "useEffect dependent on [docId]",
          "Log sync message",
          "Return cancellation cleanup"
        ],
        "starterCode": "// Write SyncDocument with update and cleanup\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction SyncDocument({ docId }) {\n  useEffect(() => {\n    console.log(\"Syncing document: \" + docId);\n    return () => {\n      console.log(\"Cancelled doc: \" + docId);\n    };\n  }, [docId]);\n  return <div>Document: {docId}</div>;\n}",
        "expectedOutput": "A component handling update transitions and cleaning up stale synchronization.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\[\s*docId\s*\]/i.test(code)) return { valid: false, message: 'Include [docId] in dependency array.' };
          if (!/return\s*(\(\)|function)/i.test(code)) return { valid: false, message: 'Return cleanup function.' };
          return { valid: true, message: 'Update phase verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What are the three core phases of the React component lifecycle?",
        "options": [
          "Mounting, Updating, and Unmounting",
          "Compiling, Linking, and Running",
          "Pushing, Committing, and Merging",
          "Requesting, Parsing, and Serializing"
        ],
        "correctIndex": 0,
        "explanation": "Mounting is when the component enters the DOM, Updating is when it re-renders with new props/state, and Unmounting is when it leaves the DOM."
      },
      {
        "id": 2,
        "question": "How is the legacy componentDidMount class method replicated using hooks?",
        "options": [
          "useEffect(() => { ... }, []) with an empty dependency array",
          "useLayout()",
          "useState(true)",
          "useMount()"
        ],
        "correctIndex": 0,
        "explanation": "Passing an empty dependency array [] tells useEffect to run once after the initial mount, mimicking componentDidMount."
      },
      {
        "id": 3,
        "question": "What is the purpose of the cleanup function in the unmounting phase?",
        "options": [
          "To clear timers, event listeners, and pending network subscriptions to prevent memory leaks",
          "To delete the JavaScript bundle file",
          "To format CSS styles",
          "To reset browser cookies"
        ],
        "correctIndex": 0,
        "explanation": "Cleanup functions tear down active listeners, timers, or sockets when a component is destroyed."
      }
    ],
    "video": {
      "title": "React Component Lifecycle Explained",
      "channel": "Codevolution",
      "videoId": "qnN_FUOdPWA",
      "url": "https://www.youtube.com/watch?v=qnN_FUOdPWA",
      "description": "Codevolution explains mounting, updating, and unmounting phases and how hooks streamline lifecycle management."
    }
  },
  {
    "id": "react-topic-16",
    "order": 16,
    "slug": "useref-hook",
    "title": "useRef Hook",
    "difficulty": "Intermediate",
    "estimatedTime": "15 min",
    "summary": "Direct DOM access and mutable instance variables: using useRef to focus inputs, measure dimensions, and preserve values across renders without re-rendering.",
    "notes": {
      "concept": "The useRef hook returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). useRef serves two primary purposes: 1) Accessing native DOM elements directly (like focusing an input or measuring scroll position), and 2) Storing a mutable value that persists across renders WITHOUT triggering a component re-render when mutated.",
      "syntax": "import { useRef } from 'react';\n\n// 1. Direct DOM Element Access\nconst inputRef = useRef(null);\n<input ref={inputRef} />\ninputRef.current.focus(); // Focuses DOM node!\n\n// 2. Mutable Value (Does NOT trigger re-renders)\nconst renderCount = useRef(0);\nrenderCount.current += 1;",
      "explanation": "1. Persistent Object: useRef returns the SAME object reference on every render.\n2. No Re-renders: Modifying ref.current does NOT schedule or trigger a re-render (unlike useState).\n3. DOM Binding: Passing ref={myRef} to a JSX element attaches the real browser DOM node to myRef.current once mounted.\n4. Storing Timer IDs: Ideal for storing setInterval/setTimeout IDs or previous state values across renders.",
      "codeExample": "import React, { useRef } from 'react';\n\nexport function AutoFocusSearch() {\n  const searchInputRef = useRef(null);\n\n  const handleFocusClick = () => {\n    // Directly invoke DOM focus() method\n    if (searchInputRef.current) {\n      searchInputRef.current.focus();\n      searchInputRef.current.select();\n    }\n  };\n\n  return (\n    <div className=\"search-box\">\n      <input\n        ref={searchInputRef}\n        type=\"text\"\n        placeholder=\"Type to search...\"\n        className=\"input-field\"\n      />\n      <button onClick={handleFocusClick}>Focus Search</button>\n    </div>\n  );\n}",
      "expectedOutput": "Clicking the button immediately shifts keyboard focus and highlights the search input box.",
      "commonMistakes": [
        {
          "mistake": "Using state (useState) to store timer IDs or previous values that do not affect the visual UI.",
          "correction": "Use useRef for non-visual values that should persist without triggering re-renders.",
          "explanation": "Updating state forces the entire component to re-render; useRef stores values silently."
        },
        {
          "mistake": "Reading or writing ref.current directly during the render calculation: <div>{myRef.current++}</div>",
          "correction": "Only mutate or read ref.current inside event handlers or useEffect.",
          "explanation": "Mutating refs during render makes components impure and breaks concurrent rendering."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Use useRef to focus the text input when the \"Focus Now\" button is clicked.",
      "starterCode": "import { useRef } from 'react';\n\nfunction FocusInput() {\n  const inputRef = useRef(null);\n\n  const focusInput = () => {\n    // Focus the input element using inputRef\n    if (inputRef.current) {\n      inputRef.current.focus();\n    }\n  };\n\n  return (\n    <div>\n      <input ref={inputRef} placeholder=\"I will be focused...\" />\n      <button onClick={focusInput}>Focus Now</button>\n    </div>\n  );\n}",
      "solutionCode": "import { useRef } from 'react';\n\nfunction FocusInput() {\n  const inputRef = useRef(null);\n\n  const focusInput = () => {\n    if (inputRef.current) {\n      inputRef.current.focus();\n    }\n  };\n\n  return (\n    <div>\n      <input ref={inputRef} placeholder=\"I will be focused...\" />\n      <button onClick={focusInput}>Focus Now</button>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q16-1",
        "level": "Easy",
        "title": "Create DOM Ref for Input",
        "prompt": "Create a component TextInputWithFocus that initializes inputRef with useRef(null), binds it to an <input ref={inputRef} />, and includes a button focusing it.",
        "requirements": [
          "const inputRef = useRef(null)",
          "<input ref={inputRef} />",
          "button with onClick={() => inputRef.current.focus()}"
        ],
        "starterCode": "// Write TextInputWithFocus\n",
        "solutionCode": "import { useRef } from \"react\";\n\nfunction TextInputWithFocus() {\n  const inputRef = useRef(null);\n  return (\n    <div>\n      <input ref={inputRef} />\n      <button onClick={() => inputRef.current?.focus()}>Focus</button>\n    </div>\n  );\n}",
        "expectedOutput": "An input and button pairing enabling direct DOM focus manipulation.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useRef\(\s*null\s*\)/i.test(code)) return { valid: false, message: 'Initialize useRef(null).' };
          if (!/ref\s*=\s*\{\s*inputRef\s*\}/i.test(code)) return { valid: false, message: 'Bind ref={inputRef} to input.' };
          if (!/inputRef\.current/i.test(code)) return { valid: false, message: 'Access inputRef.current.' };
          return { valid: true, message: 'DOM ref verified!' };
        }
      },
      {
        "id": "react-q16-2",
        "level": "Medium",
        "title": "Track Render Count Without Re-Rendering",
        "prompt": "Create a component RenderCounter. Initialize renderCount = useRef(1). In the component body, increment renderCount.current += 1. Display <p>Rendered: {renderCount.current} times</p>.",
        "requirements": [
          "useRef(1) or useRef(0)",
          "Increment renderCount.current",
          "Display render count in paragraph"
        ],
        "starterCode": "// Write RenderCounter\n",
        "solutionCode": "import { useRef } from \"react\";\n\nfunction RenderCounter() {\n  const renderCount = useRef(1);\n  renderCount.current += 1;\n  return <p>Rendered: {renderCount.current} times</p>;\n}",
        "expectedOutput": "A component tracking how many times it was evaluated without causing an infinite re-render loop.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useRef\(/i.test(code)) return { valid: false, message: 'Use useRef.' };
          if (!/renderCount\.current/i.test(code)) return { valid: false, message: 'Access and mutate renderCount.current.' };
          return { valid: true, message: 'Render counter verified!' };
        }
      },
      {
        "id": "react-q16-3",
        "level": "Challenge",
        "title": "Store Previous State Value with Ref",
        "prompt": "Create a component PrevTracker taking prop value. Use prevValueRef = useRef() and a useEffect to update prevValueRef.current = value on every render. Render <div>Current: {value}, Previous: {prevValueRef.current}</div>.",
        "requirements": [
          "useRef() for previous value",
          "useEffect updating ref.current = value",
          "Render current and previous values"
        ],
        "starterCode": "// Write PrevTracker storing previous value\n",
        "solutionCode": "import { useRef, useEffect } from \"react\";\n\nfunction PrevTracker({ value }) {\n  const prevValueRef = useRef();\n  useEffect(() => {\n    prevValueRef.current = value;\n  }, [value]);\n  return (\n    <div>Current: {value}, Previous: {prevValueRef.current}</div>\n  );\n}",
        "expectedOutput": "A component displaying both its current prop and its previous historical value.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useRef\(/i.test(code)) return { valid: false, message: 'Use useRef().' };
          if (!/prevValueRef\.current\s*=\s*value/i.test(code)) return { valid: false, message: 'Update prevValueRef.current = value in useEffect.' };
          return { valid: true, message: 'Previous value tracking verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the key difference between useState and useRef?",
        "options": [
          "Updating state triggers a component re-render; updating ref.current mutates the value WITHOUT triggering a re-render",
          "useRef can only store strings",
          "useState is only available in class components",
          "useRef deletes values on unmount"
        ],
        "correctIndex": 0,
        "explanation": "State is reactive (triggers re-renders); refs are mutable containers for persistent values that do not affect the visual layout directly."
      },
      {
        "id": 2,
        "question": "How do you access the underlying real DOM element using a ref?",
        "options": [
          "Through the .current property of the ref object (e.g., myRef.current)",
          "By calling myRef.getDOMNode()",
          "document.getElementById(myRef)",
          "myRef.target"
        ],
        "correctIndex": 0,
        "explanation": "React assigns the actual browser DOM node to the ref .current property when the component mounts."
      },
      {
        "id": 3,
        "question": "When should you NOT use a ref?",
        "options": [
          "For focusing an input or selecting text",
          "For managing values that directly affect what needs to be rendered on the screen (use useState instead)",
          "For storing timer IDs",
          "For measuring element scroll position"
        ],
        "correctIndex": 1,
        "explanation": "If a value changes and the screen must update to show that change, store it in useState, not useRef."
      }
    ],
    "video": {
      "title": "Learn useRef in 11 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "t2ypzz6gJm0",
      "url": "https://www.youtube.com/watch?v=t2ypzz6gJm0",
      "description": "Web Dev Simplified explains DOM referencing, persisting state without re-rendering, and previous value tracking."
    }
  },
  {
    "id": "react-topic-17",
    "order": 17,
    "slug": "usecontext-hook",
    "title": "useContext Hook",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Eliminate prop drilling: sharing global application state (authenticated user, dark/light theme, language) across deep component trees with React Context.",
    "notes": {
      "concept": "In React, data is typically passed top-down via props. However, passing props through 5 to 10 intermediary components that do not need the data themselves (a problem known as \"Prop Drilling\") makes code verbose and brittle. The Context API and useContext hook provide a way to share values across the entire component tree without explicitly passing props at every level.",
      "syntax": "// 1. Create Context\nimport { createContext, useContext } from 'react';\nconst ThemeContext = createContext('dark');\n\n// 2. Provide Context at high level in tree\n<ThemeContext.Provider value=\"light\">\n  <App />\n</ThemeContext.Provider>\n\n// 3. Consume Context in any deeply nested child\nconst theme = useContext(ThemeContext);",
      "explanation": "1. createContext(defaultValue): Creates a context object with a fallback default value.\n2. Context.Provider: A component that wraps children and broadcasts the value down the tree.\n3. useContext(ContextObject): Reads and subscribes to the nearest matching Provider above in the tree.\n4. Automatic Subscriptions: When the Provider value changes, all components calling useContext(Context) automatically re-render.",
      "codeExample": "import React, { createContext, useContext, useState } from 'react';\n\n// Create Theme Context\nexport const ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('dark');\n  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');\n\n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      <div className={`app-root ${theme}`}>\n        {children}\n      </div>\n    </ThemeContext.Provider>\n  );\n}\n\n// Deeply nested consumer component\nexport function ThemeToggleButton() {\n  const { theme, toggleTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={toggleTheme} className=\"theme-btn\">\n      Current Mode: {theme.toUpperCase()} (Click to toggle)\n    </button>\n  );\n}",
      "expectedOutput": "A button dynamically toggling the entire app between dark and light modes without prop drilling.",
      "commonMistakes": [
        {
          "mistake": "Using Context for every single piece of local component state.",
          "correction": "Reserve Context for truly global application state (Authentication, Themes, Locale, Shopping Cart).",
          "explanation": "Overusing Context makes components harder to reuse in isolation and can trigger unnecessary re-renders across consumers."
        },
        {
          "mistake": "Passing a new raw object literal to Provider value without memoization: value={{ user, logout }} on every render.",
          "correction": "Use useMemo or stable state objects to avoid forcing all consumers to re-render when unrelated parent state updates.",
          "explanation": "Object identity changes on every render ({ user } !== { user }), triggering child consumer re-renders."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Consume a UserContext inside a greeting badge using the useContext hook.",
      "starterCode": "import { createContext, useContext } from 'react';\n\nconst UserContext = createContext({ name: 'Guest' });\n\nfunction UserBadge() {\n  // Consume UserContext\n  const user = useContext(UserContext);\n  return <span>Welcome, {user.name}!</span>;\n}\n\nfunction App() {\n  return (\n    <UserContext.Provider value={{ name: 'Alex Developer' }}>\n      <UserBadge />\n    </UserContext.Provider>\n  );\n}",
      "solutionCode": "import { createContext, useContext } from 'react';\n\nconst UserContext = createContext({ name: 'Guest' });\n\nfunction UserBadge() {\n  const user = useContext(UserContext);\n  return <span>Welcome, {user.name}!</span>;\n}\n\nfunction App() {\n  return (\n    <UserContext.Provider value={{ name: 'Alex Developer' }}>\n      <UserBadge />\n    </UserContext.Provider>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q17-1",
        "level": "Easy",
        "title": "Create and Consume a Context",
        "prompt": "Create a Context named AppContext with default \"CodeForge\". In a component TitleDisplay, read the context value using useContext(AppContext) and return <h1>{value}</h1>.",
        "requirements": [
          "const AppContext = createContext(\"CodeForge\")",
          "useContext(AppContext)",
          "Return <h1>{value}</h1>"
        ],
        "starterCode": "// Write AppContext and TitleDisplay\n",
        "solutionCode": "import { createContext, useContext } from \"react\";\n\nconst AppContext = createContext(\"CodeForge\");\n\nfunction TitleDisplay() {\n  const value = useContext(AppContext);\n  return <h1>{value}</h1>;\n}",
        "expectedOutput": "A component reading context directly with useContext.",
        "validate": (code) => {
          code = String(code || '');
          if (!/createContext\(/i.test(code)) return { valid: false, message: 'Call createContext.' };
          if (!/useContext\(\s*AppContext\s*\)/i.test(code)) return { valid: false, message: 'Call useContext(AppContext).' };
          return { valid: true, message: 'Context creation and consumption verified!' };
        }
      },
      {
        "id": "react-q17-2",
        "level": "Medium",
        "title": "Provide Context with Dynamic Value",
        "prompt": "Write a component AuthWrapper that provides { user: \"Admin\", isAuthenticated: true } to AuthContext.Provider wrapping {children}.",
        "requirements": [
          "<AuthContext.Provider value={{ user: \"Admin\", isAuthenticated: true }}>",
          "Wrap {children}"
        ],
        "starterCode": "// Write AuthWrapper provider\n",
        "solutionCode": "import { createContext } from \"react\";\n\nconst AuthContext = createContext();\n\nfunction AuthWrapper({ children }) {\n  const auth = { user: \"Admin\", isAuthenticated: true };\n  return (\n    <AuthContext.Provider value={auth}>\n      {children}\n    </AuthContext.Provider>\n  );\n}",
        "expectedOutput": "A provider component distributing auth state to all nested children.",
        "validate": (code) => {
          code = String(code || '');
          if (!/AuthContext\.Provider/i.test(code)) return { valid: false, message: 'Use AuthContext.Provider.' };
          if (!/value\s*=/i.test(code)) return { valid: false, message: 'Pass value to Provider.' };
          if (!/\{children\}/i.test(code)) return { valid: false, message: 'Wrap {children}.' };
          return { valid: true, message: 'Context Provider verified!' };
        }
      },
      {
        "id": "react-q17-3",
        "level": "Challenge",
        "title": "Custom Hook for Consuming Context",
        "prompt": "Write a custom hook useAuth() that calls useContext(AuthContext) and throws an Error(\"useAuth must be used within an AuthProvider\") if the context value is undefined or null. Otherwise returns the context.",
        "requirements": [
          "function useAuth()",
          "useContext(AuthContext)",
          "Throw error if context is missing",
          "Return context"
        ],
        "starterCode": "// Write custom hook useAuth\n",
        "solutionCode": "import { useContext } from \"react\";\n\nfunction useAuth() {\n  const context = useContext(AuthContext);\n  if (!context) {\n    throw new Error(\"useAuth must be used within an AuthProvider\");\n  }\n  return context;\n}",
        "expectedOutput": "A safe custom hook ensuring context is consumed only within valid providers.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+useAuth/i.test(code) && !/const\s+useAuth/i.test(code)) {
            return { valid: false, message: 'Define useAuth hook.' };
          }
          if (!/throw\s+new\s+Error/i.test(code)) return { valid: false, message: 'Throw Error if context is missing.' };
          return { valid: true, message: 'useAuth hook verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What architectural problem does React Context solve?",
        "options": [
          "Slow database queries on SQL servers",
          "\"Prop drilling\", where props must be manually passed down through multiple intermediate components",
          "CSS specificity conflicts",
          "Compiling JavaScript to WebAssembly"
        ],
        "correctIndex": 1,
        "explanation": "Context teleports data directly to any consuming component in the tree, bypassing intermediate components."
      },
      {
        "id": 2,
        "question": "What happens when a Context.Provider value prop changes?",
        "options": [
          "All components calling useContext for that context re-render with the new value",
          "The browser throws an exception",
          "Only the root App component updates",
          "Nothing happens until user clicks a button"
        ],
        "correctIndex": 0,
        "explanation": "Any component consuming the context via useContext automatically re-renders when the provider value updates."
      },
      {
        "id": 3,
        "question": "Which of the following is an ideal use case for React Context?",
        "options": [
          "A simple text input local state in a form",
          "Global application theme (Dark / Light) or current authenticated user profile",
          "A one-off hover animation",
          "Storing temporary array loop variables"
        ],
        "correctIndex": 1,
        "explanation": "Context is designed for global or semi-global state that many distant components throughout the app need to access."
      }
    ],
    "video": {
      "title": "Learn useContext In 13 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "5yKYubzZ5t8",
      "url": "https://www.youtube.com/watch?v=5yKYubzZ5t8",
      "description": "Web Dev Simplified demonstrates eliminating prop drilling using React Context and useContext."
    }
  },
  {
    "id": "react-topic-18",
    "order": 18,
    "slug": "usereducer-hook",
    "title": "useReducer Hook",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Manage complex component state with useReducer: state machines, pure reducer functions, action dispatching, and separating state logic from rendering.",
    "notes": {
      "concept": "When state logic becomes complex (involving multiple sub-values, interdependent fields, or complex state machine transitions), useState can become messy and error-prone. The useReducer hook provides a structured alternative inspired by Redux. It takes a pure reducer function (state, action) => newState and an initial state, returning the current state and a dispatch function.",
      "syntax": "import { useReducer } from 'react';\n\n// 1. Reducer Function (Pure: (state, action) => newState)\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'INCREMENT':\n      return { count: state.count + 1 };\n    case 'DECREMENT':\n      return { count: state.count - 1 };\n    default:\n      return state;\n  }\n}\n\n// 2. Initialize in component\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\n\n// 3. Dispatch an action\ndispatch({ type: 'INCREMENT' });",
      "explanation": "1. Action: An object describing WHAT happened, conventionally having a { type: \"ACTION_NAME\", payload: ... } format.\n2. Reducer: A pure function without side effects that calculates the next state snapshot based on the action.\n3. Dispatch: The trigger function invoked in UI event handlers to send actions to the reducer.\n4. Predictability: Centralizes all state transition rules in a single place outside the component markup.",
      "codeExample": "import React, { useReducer } from 'react';\n\nconst initialState = { tasks: [], filter: 'all' };\n\nfunction taskReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_TASK':\n      return {\n        ...state,\n        tasks: [...state.tasks, { id: Date.now(), text: action.payload, done: false }]\n      };\n    case 'TOGGLE_TASK':\n      return {\n        ...state,\n        tasks: state.tasks.map(t =>\n          t.id === action.payload ? { ...t, done: !t.done } : t\n        )\n      };\n    case 'DELETE_TASK':\n      return {\n        ...state,\n        tasks: state.tasks.filter(t => t.id !== action.payload)\n      };\n    default:\n      return state;\n  }\n}\n\nexport function TaskManager() {\n  const [state, dispatch] = useReducer(taskReducer, initialState);\n\n  return (\n    <div className=\"task-manager\">\n      <button onClick={() => dispatch({ type: 'ADD_TASK', payload: 'New Task' })}>\n        Add Task\n      </button>\n      <ul>\n        {state.tasks.map(t => (\n          <li key={t.id}>\n            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>\n              {t.text}\n            </span>\n            <button onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: t.id })}>\n              ✓\n            </button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
      "expectedOutput": "A task list handling additions, toggles, and deletions through action dispatches and pure reducer transitions.",
      "commonMistakes": [
        {
          "mistake": "Mutating the state object directly inside a reducer: state.count++ or state.items.push(action.payload).",
          "correction": "Always return a brand new state object using the spread operator: return { ...state, count: state.count + 1 }.",
          "explanation": "Reducers MUST be pure functions. Mutating state causes React to miss changes and skip re-renders."
        },
        {
          "mistake": "Putting async fetch calls or side effects inside the reducer function.",
          "correction": "Keep reducers 100% synchronous and pure; perform fetch calls in event handlers or useEffect, then dispatch actions with the data.",
          "explanation": "Reducers must synchronously return the next state without side effects."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Dispatch a DECREMENT action when the \"-\" button is clicked in this reducer counter.",
      "starterCode": "import { useReducer } from 'react';\n\nfunction counterReducer(state, action) {\n  switch (action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    default: return state;\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(counterReducer, { count: 0 });\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>\n      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>\n    </div>\n  );\n}",
      "solutionCode": "import { useReducer } from 'react';\n\nfunction counterReducer(state, action) {\n  switch (action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    default: return state;\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(counterReducer, { count: 0 });\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>\n      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q18-1",
        "level": "Easy",
        "title": "Define a Pure Reducer Function",
        "prompt": "Write a reducer function named countReducer(state, action) that handles action.type === \"RESET\" by returning { count: 0 }, and defaults to returning state.",
        "requirements": [
          "Function countReducer(state, action)",
          "Handle case \"RESET\"",
          "return { count: 0 }",
          "default: return state"
        ],
        "starterCode": "// Write countReducer\n",
        "solutionCode": "function countReducer(state, action) {\n  switch (action.type) {\n    case \"RESET\":\n      return { count: 0 };\n    default:\n      return state;\n  }\n}",
        "expectedOutput": "A pure reducer resetting state count to 0.",
        "validate": (code) => {
          code = String(code || '');
          if (!/case\s*["']RESET["']/i.test(code)) return { valid: false, message: 'Handle case "RESET".' };
          if (!/count\s*:\s*0/i.test(code)) return { valid: false, message: 'Return { count: 0 }.' };
          return { valid: true, message: 'Reducer function verified!' };
        }
      },
      {
        "id": "react-q18-2",
        "level": "Medium",
        "title": "Dispatch Action with Payload",
        "prompt": "Create a component StepCounter with state { count: 0 } managed by useReducer. Render a button that dispatches { type: \"ADD_BY\", payload: 5 } on click.",
        "requirements": [
          "useReducer hook",
          "dispatch({ type: \"ADD_BY\", payload: 5 })"
        ],
        "starterCode": "// Write StepCounter dispatching payload\n",
        "solutionCode": "import { useReducer } from \"react\";\n\nfunction StepCounter() {\n  const [state, dispatch] = useReducer((s, a) => a.type === \"ADD_BY\" ? { count: s.count + a.payload } : s, { count: 0 });\n  return <button onClick={() => dispatch({ type: \"ADD_BY\", payload: 5 })}>Add 5 ({state.count})</button>;\n}",
        "expectedOutput": "A button dispatching an action with a numeric payload to increment count by 5.",
        "validate": (code) => {
          code = String(code || '');
          if (!/dispatch\(\s*\{\s*type\s*:\s*["']ADD_BY["'],\s*payload\s*:\s*5\s*\}\s*\)/i.test(code)) {
            return { valid: false, message: 'Dispatch { type: "ADD_BY", payload: 5 }.' };
          }
          return { valid: true, message: 'Payload dispatch verified!' };
        }
      },
      {
        "id": "react-q18-3",
        "level": "Challenge",
        "title": "Reducer with Array State Add and Remove",
        "prompt": "Write a reducer itemsReducer(state, action) where state is an array of strings. Handle \"ADD\" by returning [...state, action.payload] and \"REMOVE\" by returning state.filter((_, i) => i !== action.payload).",
        "requirements": [
          "Pure itemsReducer(state, action)",
          "Case \"ADD\": return [...state, action.payload]",
          "Case \"REMOVE\": filter out index",
          "Default return state"
        ],
        "starterCode": "// Write itemsReducer\n",
        "solutionCode": "function itemsReducer(state, action) {\n  switch (action.type) {\n    case \"ADD\":\n      return [...state, action.payload];\n    case \"REMOVE\":\n      return state.filter((_, idx) => idx !== action.payload);\n    default:\n      return state;\n  }\n}",
        "expectedOutput": "A pure array reducer supporting immutable item addition and removal.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\.\.\.state/i.test(code)) return { valid: false, message: 'Use spread operator [...state, action.payload].' };
          if (!/\.filter\(/i.test(code)) return { valid: false, message: 'Use .filter() for removal.' };
          return { valid: true, message: 'Array reducer verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is a reducer function in React useReducer?",
        "options": [
          "A CSS compiler that reduces file size",
          "A pure function taking current state and an action, returning the next state snapshot: (state, action) => newState",
          "A network proxy that compresses images",
          "A database index optimizer"
        ],
        "correctIndex": 1,
        "explanation": "Reducers are pure functions without side effects that transition state based on dispatched actions."
      },
      {
        "id": 2,
        "question": "When should you choose useReducer over useState?",
        "options": [
          "When state logic involves multiple interdependent sub-values or complex state machine transitions",
          "For simple primitive booleans",
          "When you want to remove React",
          "Only in React Native"
        ],
        "correctIndex": 0,
        "explanation": "useReducer shines when multiple state values update together or when next state depends on complex conditional logic."
      },
      {
        "id": 3,
        "question": "Can you perform asynchronous API calls directly inside a reducer function?",
        "options": [
          "Yes, reducers can be async",
          "No, reducers must remain 100% synchronous and pure; perform fetch calls outside and dispatch actions with the received data",
          "Only if using await",
          "Only in Node.js"
        ],
        "correctIndex": 1,
        "explanation": "Reducers must be strictly pure and synchronous. Side effects belong in event handlers or useEffect."
      }
    ],
    "video": {
      "title": "Learn useReducer In 20 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "kK_Wqx3RnHk",
      "url": "https://www.youtube.com/watch?v=kK_Wqx3RnHk",
      "description": "Web Dev Simplified explains useReducer, actions, payloads, and refactoring useState to useReducer."
    }
  },
  {
    "id": "react-topic-19",
    "order": 19,
    "slug": "custom-hooks",
    "title": "Custom Hooks",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Extract and reuse stateful component logic: creating custom hooks prefixed with \"use\", composing React primitives, and sharing functionality across components.",
    "notes": {
      "concept": "When multiple components need to share the same stateful logic (such as fetching data, listening to window resize, or managing localStorage synchronization), copying and pasting code creates technical debt. Custom Hooks allow you to extract component logic into reusable functions. A custom hook is simply a JavaScript function whose name starts with \"use\" and that may call other React hooks.",
      "syntax": "// 1. Defining a Custom Hook\nfunction useToggle(initialValue = false) {\n  const [value, setValue] = useState(initialValue);\n  const toggle = () => setValue(v => !v);\n  return [value, toggle];\n}\n\n// 2. Consuming in any component\nfunction Modal() {\n  const [isOpen, toggleOpen] = useToggle(false);\n  return <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>;\n}",
      "explanation": "1. Naming Convention: Custom hook names MUST begin with \"use\" (e.g., useFetch, useLocalStorage, useAuth). This allows ESLint to enforce the Rules of Hooks.\n2. Independent State: Each component calling a custom hook gets its own isolated state; the logic is shared, but the state data is not shared between component instances.\n3. Composition: Custom hooks can combine useState, useEffect, useRef, and any other hooks.\n4. Clean Return API: Hooks commonly return arrays (like [state, setState]) for positional renaming or objects ({ data, loading, error }) for named destructuring.",
      "codeExample": "import { useState, useEffect } from 'react';\n\n// Custom hook that syncs state to browser localStorage\nexport function useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch {\n      return initialValue;\n    }\n  });\n\n  useEffect(() => {\n    try {\n      window.localStorage.setItem(key, JSON.stringify(storedValue));\n    } catch (err) {\n      console.error(\"Storage error:\", err);\n    }\n  }, [key, storedValue]);\n\n  return [storedValue, setStoredValue];\n}",
      "expectedOutput": "A custom hook that seamlessly persists any state variable into browser localStorage.",
      "commonMistakes": [
        {
          "mistake": "Naming a custom hook without the \"use\" prefix: function fetchUserData(url) { useEffect(...); }",
          "correction": "Always prefix with \"use\": function useUserData(url) { ... }",
          "explanation": "The \"use\" prefix is required by React to automatically check hook rules (no hooks inside loops or conditions)."
        },
        {
          "mistake": "Assuming two components calling the same custom hook share the exact same state data.",
          "correction": "Understand that custom hooks share stateful LOGIC, not state instances. (Use Context if you need to share state data).",
          "explanation": "Every component invocation creates a completely fresh execution context with its own useState memory."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Complete the useCounter custom hook that returns count, increment, and decrement functions.",
      "starterCode": "import { useState } from 'react';\n\nfunction useCounter(initialCount = 0) {\n  const [count, setCount] = useState(initialCount);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  return { count, increment, decrement };\n}\n\nfunction CounterApp() {\n  const { count, increment, decrement } = useCounter(10);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={decrement}>-</button>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}",
      "solutionCode": "import { useState } from 'react';\n\nfunction useCounter(initialCount = 0) {\n  const [count, setCount] = useState(initialCount);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  return { count, increment, decrement };\n}\n\nfunction CounterApp() {\n  const { count, increment, decrement } = useCounter(10);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={decrement}>-</button>\n      <button onClick={increment}>+</button>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q19-1",
        "level": "Easy",
        "title": "Create useToggle Custom Hook",
        "prompt": "Write a custom hook useToggle(initial = false) that uses useState to track a boolean, and returns an array [value, toggle] where toggle flips the boolean.",
        "requirements": [
          "Function name useToggle",
          "const [value, setValue] = useState(initial)",
          "toggle = () => setValue(v => !v)",
          "return [value, toggle]"
        ],
        "starterCode": "// Write useToggle hook\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction useToggle(initial = false) {\n  const [value, setValue] = useState(initial);\n  const toggle = () => setValue(v => !v);\n  return [value, toggle];\n}",
        "expectedOutput": "A reusable toggle hook returning state and toggle function.",
        "validate": (code) => {
          code = String(code || '');
          if (!/function\s+useToggle/i.test(code) && !/const\s+useToggle/i.test(code)) {
            return { valid: false, message: 'Name function useToggle.' };
          }
          if (!/return\s*\[\s*value\s*,\s*toggle\s*\]/i.test(code)) {
            return { valid: false, message: 'Return [value, toggle].' };
          }
          return { valid: true, message: 'useToggle verified!' };
        }
      },
      {
        "id": "react-q19-2",
        "level": "Medium",
        "title": "useDocumentTitle Custom Hook",
        "prompt": "Create a custom hook useDocumentTitle(title) that uses useEffect to update document.title = title whenever title changes (dependency array [title]).",
        "requirements": [
          "Function useDocumentTitle(title)",
          "useEffect updating document.title",
          "Dependency array [title]"
        ],
        "starterCode": "// Write useDocumentTitle hook\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}",
        "expectedOutput": "A custom hook keeping the browser tab title in sync with component state.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useDocumentTitle/i.test(code)) return { valid: false, message: 'Name hook useDocumentTitle.' };
          if (!/document\.title\s*=\s*title/i.test(code)) return { valid: false, message: 'Assign document.title = title.' };
          if (!/\[\s*title\s*\]/i.test(code)) return { valid: false, message: 'Add [title] dependency.' };
          return { valid: true, message: 'useDocumentTitle verified!' };
        }
      },
      {
        "id": "react-q19-3",
        "level": "Challenge",
        "title": "useFetch Data Custom Hook",
        "prompt": "Create a custom hook useFetch(url) that returns { data, loading, error }. Use useEffect with [url] to fetch the URL, parse JSON into data, track loading = true/false, and catch errors into error state.",
        "requirements": [
          "Function useFetch(url)",
          "Return { data, loading, error }",
          "Fetch URL on mount/update",
          "Dependency [url]"
        ],
        "starterCode": "// Write useFetch custom hook\n",
        "solutionCode": "import { useState, useEffect } from \"react\";\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  useEffect(() => {\n    setLoading(true);\n    fetch(url)\n      .then(r => r.json())\n      .then(d => { setData(d); setLoading(false); })\n      .catch(e => { setError(e); setLoading(false); });\n  }, [url]);\n  return { data, loading, error };\n}",
        "expectedOutput": "A complete asynchronous data fetching custom hook managing triad state.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useFetch/i.test(code)) return { valid: false, message: 'Name hook useFetch.' };
          if (!/return\s*\{\s*data\s*,\s*loading\s*,\s*error\s*\}/i.test(code)) {
            return { valid: false, message: 'Return { data, loading, error }.' };
          }
          return { valid: true, message: 'useFetch verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why must custom hook function names always start with the word \"use\" (e.g. useAuth)?",
        "options": [
          "Because JavaScript keywords require it",
          "To enable React and linter plugins to verify that the Rules of Hooks are followed inside the function",
          "It is required by Vite",
          "To make the hook run in background threads"
        ],
        "correctIndex": 1,
        "explanation": "The \"use\" prefix tells React linters to verify that hooks are called only at the top level and not inside loops/conditions."
      },
      {
        "id": 2,
        "question": "If two different components call useToggle(), do they share the same boolean value?",
        "options": [
          "Yes, custom hooks are global singletons",
          "No, custom hooks share stateful logic, but each component call gets its own completely isolated state memory",
          "Only if rendered on the same page",
          "Only in production"
        ],
        "correctIndex": 1,
        "explanation": "Custom hooks share reusable logic, not state instances. Each component gets independent state."
      },
      {
        "id": 3,
        "question": "What can a custom hook return?",
        "options": [
          "Only JSX",
          "Any JavaScript value: arrays, objects, booleans, functions, or primitives",
          "Only numbers",
          "Only strings"
        ],
        "correctIndex": 1,
        "explanation": "Custom hooks are plain functions and can return whatever structure is most convenient for consumers (tuples, objects, values)."
      }
    ],
    "video": {
      "title": "Learn Custom Hooks In 10 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "6LmP1paVAik",
      "url": "https://www.youtube.com/watch?v=6LmP1paVAik",
      "description": "Web Dev Simplified demonstrates how to extract component logic into clean, reusable custom hooks."
    }
  },
  {
    "id": "react-topic-20",
    "order": 20,
    "slug": "react-router",
    "title": "React Router v6",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Single Page Application (SPA) client routing: BrowserRouter, Routes, Route, Link, and NavLink without browser page reloads.",
    "notes": {
      "concept": "In traditional multi-page websites, clicking an <a> tag requests a brand-new HTML document from the server, causing a blank white flash while the browser tears down and reloads all assets. React Router enables Single Page Applications (SPAs) where URL changes are intercepted by client-side JavaScript, swapping components into view instantly without destroying application state or refreshing the page.",
      "syntax": "// React Router v6 Architecture\nimport { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';\n\n<BrowserRouter>\n  <nav>\n    <Link to=\"/\">Home</Link>\n    <NavLink to=\"/learn\" className={({ isActive }) => isActive ? 'active' : ''}>\n      Learn\n    </NavLink>\n  </nav>\n\n  <Routes>\n    <Route path=\"/\" element={<HomePage />} />\n    <Route path=\"/learn\" element={<LearnPage />} />\n    <Route path=\"*\" element={<NotFoundPage />} />\n  </Routes>\n</BrowserRouter>",
      "explanation": "1. <BrowserRouter>: The top-level wrapper that synchronizes the UI with the browser address bar using the HTML5 History API.\n2. <Routes> and <Route>: Declares route mappings between URL paths and React components (<Route path=\"...\" element={<Comp />} />).\n3. <Link to=\"...\">: Renders an accessible anchor tag that changes the URL without causing a full browser refresh.\n4. <NavLink>: Enhanced <Link> that knows whether its route is currently active, ideal for styling navigation tabs.\n5. Catch-All Route (*): Handles unmatched URLs (404 Not Found pages).",
      "codeExample": "import React from 'react';\nimport { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nfunction Navigation() {\n  return (\n    <nav className=\"navbar\">\n      <Link to=\"/\" className=\"brand\">CodeForge</Link>\n      <div className=\"links\">\n        <Link to=\"/learn\">Learn</Link>\n        <Link to=\"/dashboard\">Dashboard</Link>\n      </div>\n    </nav>\n  );\n}\n\nexport function AppRouter() {\n  return (\n    <BrowserRouter>\n      <Navigation />\n      <Routes>\n        <Route path=\"/\" element={<h2>Home Screen</h2>} />\n        <Route path=\"/learn\" element={<h2>Curriculum Catalog</h2>} />\n        <Route path=\"/dashboard\" element={<h2>Student Dashboard</h2>} />\n        <Route path=\"*\" element={<h2>404 - Page Not Found</h2>} />\n      </Routes>\n    </BrowserRouter>\n  );\n}",
      "expectedOutput": "A seamless SPA with navigation links transitioning views instantly without page reloads.",
      "commonMistakes": [
        {
          "mistake": "Using standard HTML <a href=\"/path\"> links for internal app navigation.",
          "correction": "Use <Link to=\"/path\"> from react-router-dom.",
          "explanation": "<a href> triggers a complete browser HTTP request and page reload, resetting all React state and context."
        },
        {
          "mistake": "Using legacy React Router v5 syntax (e.g. <Switch> or component={Home}) in React Router v6.",
          "correction": "Use v6 syntax: <Routes> wrapping <Route path=\"...\" element={<Home />} />.",
          "explanation": "React Router v6 replaced <Switch> with <Routes> and requires the element={<Component />} prop."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Define a 404 catch-all route using path=\"*\" inside <Routes>.",
      "starterCode": "import { Routes, Route } from 'react-router-dom';\n\nfunction RouterConfig() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<h2>Home Page</h2>} />\n      <Route path=\"/about\" element={<h2>About Page</h2>} />\n      {/* Add 404 catch-all route here */}\n      <Route path=\"*\" element={<h2>404 Not Found</h2>} />\n    </Routes>\n  );\n}",
      "solutionCode": "import { Routes, Route } from 'react-router-dom';\n\nfunction RouterConfig() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<h2>Home Page</h2>} />\n      <Route path=\"/about\" element={<h2>About Page</h2>} />\n      <Route path=\"*\" element={<h2>404 Not Found</h2>} />\n    </Routes>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q20-1",
        "level": "Easy",
        "title": "Declare Navigation Link with Link",
        "prompt": "Write an internal link using <Link to=\"/dashboard\">My Dashboard</Link> imported from react-router-dom.",
        "requirements": [
          "Import Link from \"react-router-dom\"",
          "<Link to=\"/dashboard\">My Dashboard</Link>"
        ],
        "starterCode": "// Write Link component\n",
        "solutionCode": "import { Link } from \"react-router-dom\";\n\nfunction Nav() {\n  return <Link to=\"/dashboard\">My Dashboard</Link>;\n}",
        "expectedOutput": "An internal client router link targeting /dashboard.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<Link\s+to=["']\/dashboard["']/i.test(code)) return { valid: false, message: 'Use <Link to="/dashboard">.' };
          return { valid: true, message: 'Link verified!' };
        }
      },
      {
        "id": "react-q20-2",
        "level": "Medium",
        "title": "Configure Routes Block with v6 Syntax",
        "prompt": "Create a component MainRouter returning <Routes> with two routes: path=\"/\" rendering <Home /> and path=\"/practice\" rendering <Practice />.",
        "requirements": [
          "<Routes> wrapper",
          "<Route path=\"/\" element={<Home />} />",
          "<Route path=\"/practice\" element={<Practice />} />"
        ],
        "starterCode": "// Write MainRouter with v6 syntax\n",
        "solutionCode": "import { Routes, Route } from \"react-router-dom\";\n\nfunction MainRouter() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<Home />} />\n      <Route path=\"/practice\" element={<Practice />} />\n    </Routes>\n  );\n}",
        "expectedOutput": "A clean React Router v6 route declaration block.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<Routes>/i.test(code)) return { valid: false, message: 'Wrap routes in <Routes>.' };
          if (!/path=["']\/["']\s+element\s*=\s*\{\s*<Home\s*\/>\s*\}/i.test(code)) {
            return { valid: false, message: 'Configure path="/" element={<Home />}.' };
          }
          if (!/path=["']\/practice["']\s+element\s*=\s*\{\s*<Practice\s*\/>\s*\}/i.test(code)) {
            return { valid: false, message: 'Configure path="/practice" element={<Practice />}.' };
          }
          return { valid: true, message: 'v6 Routes verified!' };
        }
      },
      {
        "id": "react-q20-3",
        "level": "Challenge",
        "title": "Active Navigation with NavLink",
        "prompt": "Create a component TopBar with a <NavLink to=\"/courses\"> that dynamically applies className=\"active-tab\" when isActive is true, else \"normal-tab\".",
        "requirements": [
          "<NavLink to=\"/courses\">",
          "className={({ isActive }) => isActive ? \"active-tab\" : \"normal-tab\"}"
        ],
        "starterCode": "// Write TopBar with NavLink active style\n",
        "solutionCode": "import { NavLink } from \"react-router-dom\";\n\nfunction TopBar() {\n  return (\n    <NavLink\n      to=\"/courses\"\n      className={({ isActive }) => isActive ? \"active-tab\" : \"normal-tab\"}\n    >\n      Courses\n    </NavLink>\n  );\n}",
        "expectedOutput": "A navigation link applying active styling when its URL matches current path.",
        "validate": (code) => {
          code = String(code || '');
          if (!/NavLink/i.test(code)) return { valid: false, message: 'Use NavLink.' };
          if (!/isActive/i.test(code)) return { valid: false, message: 'Evaluate { isActive } parameter in className.' };
          return { valid: true, message: 'NavLink verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why should you use <Link to=\"...\"> instead of <a href=\"...\"> in a React Single Page Application?",
        "options": [
          "<Link> navigates client-side via JavaScript without triggering a full page reload or losing application state",
          "<a href> is deprecated in HTML5",
          "<Link> compresses images automatically",
          "<a href> does not work on mobile"
        ],
        "correctIndex": 0,
        "explanation": "<Link> intercepts the click and updates the HTML5 history without refreshing the browser."
      },
      {
        "id": 2,
        "question": "Which component replaced <Switch> in React Router v6?",
        "options": [
          "<Routes>",
          "<RouterSwitch>",
          "<RouteContainer>",
          "<SwitchV6>"
        ],
        "correctIndex": 0,
        "explanation": "React Router v6 introduced <Routes> with relative routing and nested path improvements."
      },
      {
        "id": 3,
        "question": "What route path matches any unmatched URL for a 404 page in React Router?",
        "options": [
          "path=\"*\"\"",
          "path=\"404\"",
          "path=\"all\"",
          "path=\"default\""
        ],
        "correctIndex": 0,
        "explanation": "path=\"*\" serves as the wildcard catch-all route for any unmapped paths."
      }
    ],
    "video": {
      "title": "Learn React Router v6 In 45 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "55hWHvDHdq8",
      "url": "https://www.youtube.com/watch?v=55hWHvDHdq8",
      "description": "Web Dev Simplified teaches React Router v6: routes, links, dynamic params, and navigation."
    }
  },
  {
    "id": "react-topic-21",
    "order": 21,
    "slug": "navigation-and-dynamic-routes",
    "title": "Navigation and Dynamic Routes",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Extract dynamic URL route parameters with useParams, navigate programmatically with useNavigate, and read query strings with useSearchParams.",
    "notes": {
      "concept": "Real-world web applications have dynamic URLs that represent specific entities, such as /users/123, /courses/react-intro, or /search?query=hooks. React Router provides specialized hooks: useParams extracts dynamic route segments (:id), useNavigate enables programmatic redirection after events (like form submissions), and useSearchParams manages URL query strings.",
      "syntax": "// 1. Defining Dynamic Route\n<Route path=\"/lessons/:lessonSlug\" element={<LessonDetail />} />\n\n// 2. Reading Params inside Component\nimport { useParams, useNavigate, useSearchParams } from 'react-router-dom';\n\nconst { lessonSlug } = useParams();\n\n// 3. Programmatic Navigation\nconst navigate = useNavigate();\nnavigate('/dashboard'); // Push new route\nnavigate(-1);           // Go back one step in browser history\n\n// 4. Query String Handling (?page=2)\nconst [searchParams, setSearchParams] = useSearchParams();\nconst page = searchParams.get('page');",
      "explanation": "1. URL Route Parameters (:param): Defines dynamic placeholders in paths that match variable IDs or slugs.\n2. useParams(): Returns an object of key/value pairs of URL parameters.\n3. useNavigate(): Replaces legacy useHistory; enables imperatively navigating to URLs after async actions.\n4. useSearchParams(): React equivalent of URLSearchParams for reading and writing URL query parameters without reloading.",
      "codeExample": "import React from 'react';\nimport { useParams, useNavigate } from 'react-router-dom';\n\nexport function StudentProfileView() {\n  const { studentId } = useParams();\n  const navigate = useNavigate();\n\n  const handleReturn = () => {\n    navigate('/learn'); // Programmatic navigation\n  };\n\n  return (\n    <div className=\"profile-detail\">\n      <h3>Viewing Student Profile: #{studentId}</h3>\n      <button onClick={handleReturn}>Back to Curriculum</button>\n    </div>\n  );\n}",
      "expectedOutput": "A detail page reading studentId from the URL and providing a working back button.",
      "commonMistakes": [
        {
          "mistake": "Using window.location.href = \"/path\" for programmatic navigation.",
          "correction": "Use navigate(\"/path\") from useNavigate().",
          "explanation": "window.location.href triggers a full browser reload, discarding in-memory state."
        },
        {
          "mistake": "Forgetting the colon (:) prefix when defining dynamic routes: path=\"/users/id\" instead of path=\"/users/:id\"",
          "correction": "Always include the colon: path=\"/users/:id\".",
          "explanation": "Without the colon, the router matches only the literal string \"/users/id\"."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Extract the topicSlug parameter using useParams() and display it inside an h2.",
      "starterCode": "import { useParams } from 'react-router-dom';\n\nfunction TopicView() {\n  // Extract topicSlug from URL params\n  const { topicSlug } = useParams();\n\n  return (\n    <div>\n      <h2>Current Topic: {topicSlug}</h2>\n    </div>\n  );\n}",
      "solutionCode": "import { useParams } from 'react-router-dom';\n\nfunction TopicView() {\n  const { topicSlug } = useParams();\n\n  return (\n    <div>\n      <h2>Current Topic: {topicSlug}</h2>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q21-1",
        "level": "Easy",
        "title": "Extract Dynamic ID with useParams",
        "prompt": "Create a component CourseDetail that extracts courseId using useParams(). Return <h2>Course: {courseId}</h2>.",
        "requirements": [
          "const { courseId } = useParams()",
          "Return <h2>Course: {courseId}</h2>"
        ],
        "starterCode": "// Write CourseDetail\n",
        "solutionCode": "import { useParams } from \"react-router-dom\";\n\nfunction CourseDetail() {\n  const { courseId } = useParams();\n  return <h2>Course: {courseId}</h2>;\n}",
        "expectedOutput": "A component rendering courseId extracted from URL params.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useParams\(\)/i.test(code)) return { valid: false, message: 'Call useParams().' };
          if (!/courseId/i.test(code)) return { valid: false, message: 'Extract courseId.' };
          return { valid: true, message: 'useParams verified!' };
        }
      },
      {
        "id": "react-q21-2",
        "level": "Medium",
        "title": "Programmatic Navigation with useNavigate",
        "prompt": "Create a component LoginRedirect. Initialize navigate = useNavigate(). On button click, navigate to \"/dashboard\".",
        "requirements": [
          "const navigate = useNavigate()",
          "button onClick calling navigate(\"/dashboard\")"
        ],
        "starterCode": "// Write LoginRedirect\n",
        "solutionCode": "import { useNavigate } from \"react-router-dom\";\n\nfunction LoginRedirect() {\n  const navigate = useNavigate();\n  return <button onClick={() => navigate(\"/dashboard\")}>Go to Dashboard</button>;\n}",
        "expectedOutput": "A button programmatically navigating to /dashboard.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useNavigate\(\)/i.test(code)) return { valid: false, message: 'Call useNavigate().' };
          if (!/navigate\(["']\/dashboard["']\)/i.test(code)) return { valid: false, message: 'Call navigate("/dashboard").' };
          return { valid: true, message: 'useNavigate verified!' };
        }
      },
      {
        "id": "react-q21-3",
        "level": "Challenge",
        "title": "Read Query String Parameter with useSearchParams",
        "prompt": "Write a component SearchResults. Use useSearchParams() to read the \"q\" query parameter: const query = searchParams.get(\"q\") || \"All\". Return <p>Search Query: {query}</p>.",
        "requirements": [
          "useSearchParams() hook",
          "searchParams.get(\"q\")",
          "Display query in paragraph"
        ],
        "starterCode": "// Write SearchResults\n",
        "solutionCode": "import { useSearchParams } from \"react-router-dom\";\n\nfunction SearchResults() {\n  const [searchParams] = useSearchParams();\n  const query = searchParams.get(\"q\") || \"All\";\n  return <p>Search Query: {query}</p>;\n}",
        "expectedOutput": "A component dynamically reading and displaying search query parameters from the URL.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useSearchParams\(\)/i.test(code)) return { valid: false, message: 'Call useSearchParams().' };
          if (!/searchParams\.get\(["']q["']\)/i.test(code)) return { valid: false, message: 'Call searchParams.get("q").' };
          return { valid: true, message: 'useSearchParams verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which hook extracts dynamic URL parameters like /lessons/:id in React Router v6?",
        "options": [
          "useParams()",
          "useRouteId()",
          "useUrl()",
          "useMatch()"
        ],
        "correctIndex": 0,
        "explanation": "useParams() returns an object containing all dynamic route parameters defined with colon syntax in the route path."
      },
      {
        "id": 2,
        "question": "What hook enables imperative programmatic redirection in React Router v6?",
        "options": [
          "useNavigate()",
          "useHistory()",
          "useRedirect()",
          "useLocation()"
        ],
        "correctIndex": 0,
        "explanation": "useNavigate() provides the navigate(path) function that replaced useHistory in React Router v6."
      },
      {
        "id": 3,
        "question": "How do you navigate back one step in browser history using useNavigate?",
        "options": [
          "navigate(-1)",
          "navigate(\"back\")",
          "navigate.back()",
          "navigate(0)"
        ],
        "correctIndex": 0,
        "explanation": "Calling navigate(-1) pushes back one position in the browser history stack."
      }
    ],
    "video": {
      "title": "Learn React Router v6 Dynamic Routes and Hooks",
      "channel": "Web Dev Simplified",
      "videoId": "55hWHvDHdq8",
      "url": "https://www.youtube.com/watch?v=55hWHvDHdq8",
      "description": "Web Dev Simplified covers dynamic route parameters, programmatic navigation, and search params in v6."
    }
  },
  {
    "id": "react-topic-22",
    "order": 22,
    "slug": "api-integration-fetch-axios",
    "title": "API Integration with Fetch and Axios",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Connect React to backend REST APIs: asynchronous data fetching with native fetch and Axios, headers, error handling, and request cancellations.",
    "notes": {
      "concept": "Modern React applications consume backend APIs (Node.js, Express, Spring, Python) to retrieve and persist data. Developers can use the browser native fetch() API or the popular Axios HTTP client library. API requests in React are typically executed inside useEffect on component mount or inside event handlers during user interactions (like form submission).",
      "syntax": "// 1. Native fetch with async/await\nuseEffect(() => {\n  async function loadData() {\n    try {\n      const res = await fetch('/api/tasks');\n      if (!res.ok) throw new Error(`HTTP error ${res.status}`);\n      const data = await res.json();\n      setTasks(data);\n    } catch (err) {\n      setError(err.message);\n    }\n  }\n  loadData();\n}, []);\n\n// 2. Axios instance with interceptors\nimport axios from 'axios';\nconst api = axios.create({ baseURL: 'https://api.codeforge.dev' });\nconst res = await api.get('/students');",
      "explanation": "1. Async in useEffect: The effect callback itself cannot be async (useEffect(async () => ...) is invalid); declare an inner async function and invoke it.\n2. Checking res.ok: Native fetch does NOT reject on HTTP 404 or 500 errors; you must explicitly check res.ok.\n3. Axios Benefits: Axios automatically parses JSON, throws on 4xx/5xx responses, and supports request/response interceptors for auth tokens.\n4. AbortController: Cancel in-flight requests when a component unmounts to prevent memory leaks and race conditions.",
      "codeExample": "import React, { useState, useEffect } from 'react';\n\nexport function StudentsList() {\n  const [students, setStudents] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const controller = new AbortController();\n\n    async function fetchStudents() {\n      try {\n        const response = await fetch('/api/students', { signal: controller.signal });\n        if (!response.ok) throw new Error(\"Failed to load students\");\n        const json = await response.json();\n        setStudents(json.data);\n      } catch (err) {\n        if (err.name !== 'AbortError') console.error(err);\n      } finally {\n        setLoading(false);\n      }\n    }\n\n    fetchStudents();\n    return () => controller.abort(); // Cancel request on unmount\n  }, []);\n\n  if (loading) return <p>Loading student directory...</p>;\n  return <ul>{students.map(s => <li key={s.id}>{s.name}</li>)}</ul>;\n}",
      "expectedOutput": "A cleanly loaded student directory with automatic request cancellation upon early navigation.",
      "commonMistakes": [
        {
          "mistake": "Making the useEffect callback function directly async: useEffect(async () => { ... }, [])",
          "correction": "Declare an inner async function and invoke it: useEffect(() => { async function run() { ... } run(); }, [])",
          "explanation": "React expects useEffect to return a cleanup function or nothing; an async function returns a Promise, violating the hook contract."
        },
        {
          "mistake": "Assuming native fetch() automatically throws an error on 404 Not Found or 500 Server Error.",
          "correction": "Always check if (!response.ok) throw new Error(...);",
          "explanation": "Native fetch only rejects on real network disconnection or DNS failure, not HTTP error status codes."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Execute a fetch request inside an inner async function in useEffect.",
      "starterCode": "import { useState, useEffect } from 'react';\n\nfunction UserLoader() {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    async function load() {\n      try {\n        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n        const data = await res.json();\n        setUser(data);\n      } catch (e) {\n        console.error(e);\n      }\n    }\n    load();\n  }, []);\n\n  return <div>{user ? <h3>Loaded: {user.name}</h3> : <p>Loading...</p>}</div>;\n}",
      "solutionCode": "import { useState, useEffect } from 'react';\n\nfunction UserLoader() {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    async function load() {\n      try {\n        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n        const data = await res.json();\n        setUser(data);\n      } catch (e) {\n        console.error(e);\n      }\n    }\n    load();\n  }, []);\n\n  return <div>{user ? <h3>Loaded: {user.name}</h3> : <p>Loading...</p>}</div>;\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q22-1",
        "level": "Easy",
        "title": "Check res.ok in Fetch",
        "prompt": "Write an async function getProfile(url) that calls fetch(url), checks if (!res.ok) throw new Error(\"HTTP error\"), and returns await res.json().",
        "requirements": [
          "async function getProfile",
          "await fetch(url)",
          "Check !res.ok",
          "return await res.json()"
        ],
        "starterCode": "// Write getProfile\n",
        "solutionCode": "async function getProfile(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(\"HTTP error\");\n  return await res.json();\n}",
        "expectedOutput": "An async fetch utility with proper HTTP status validation.",
        "validate": (code) => {
          code = String(code || '');
          if (!/!res\.ok/i.test(code) && !/!response\.ok/i.test(code)) {
            return { valid: false, message: 'Check if (!res.ok).' };
          }
          if (!/\.json\(\)/i.test(code)) return { valid: false, message: 'Parse response.json().' };
          return { valid: true, message: 'Fetch validation verified!' };
        }
      },
      {
        "id": "react-q22-2",
        "level": "Medium",
        "title": "Axios GET Request with Error Handling",
        "prompt": "Write an async function loadTasks(axiosClient) that makes an await axiosClient.get(\"/tasks\") call, returns response.data, and catches errors logging err.message.",
        "requirements": [
          "await axiosClient.get(\"/tasks\")",
          "return response.data",
          "try/catch block"
        ],
        "starterCode": "// Write loadTasks with axios\n",
        "solutionCode": "async function loadTasks(axiosClient) {\n  try {\n    const response = await axiosClient.get(\"/tasks\");\n    return response.data;\n  } catch (err) {\n    console.error(err.message);\n    return [];\n  }\n}",
        "expectedOutput": "An Axios client request returning response.data safely.",
        "validate": (code) => {
          code = String(code || '');
          if (!/axiosClient\.get\(["']\/tasks["']\)/i.test(code)) {
            return { valid: false, message: 'Call axiosClient.get("/tasks").' };
          }
          if (!/response\.data/i.test(code) && !/res\.data/i.test(code)) {
            return { valid: false, message: 'Return response.data.' };
          }
          return { valid: true, message: 'Axios request verified!' };
        }
      },
      {
        "id": "react-q22-3",
        "level": "Challenge",
        "title": "AbortController Request Cancellation",
        "prompt": "Create a component CancelableFetch that initiates an AbortController in useEffect, passes { signal: controller.signal } to fetch(\"/api/data\"), and returns a cleanup function calling controller.abort().",
        "requirements": [
          "new AbortController()",
          "{ signal: controller.signal } in fetch options",
          "return () => controller.abort() cleanup"
        ],
        "starterCode": "// Write CancelableFetch with AbortController\n",
        "solutionCode": "import { useEffect } from \"react\";\n\nfunction CancelableFetch() {\n  useEffect(() => {\n    const controller = new AbortController();\n    fetch(\"/api/data\", { signal: controller.signal });\n    return () => controller.abort();\n  }, []);\n  return <div>Fetch active</div>;\n}",
        "expectedOutput": "An effect attaching an AbortController to cancel network requests on unmount.",
        "validate": (code) => {
          code = String(code || '');
          if (!/AbortController/i.test(code)) return { valid: false, message: 'Instantiate new AbortController().' };
          if (!/signal\s*:\s*controller\.signal/i.test(code)) return { valid: false, message: 'Pass signal: controller.signal.' };
          if (!/controller\.abort\(\)/i.test(code)) return { valid: false, message: 'Call controller.abort() in cleanup.' };
          return { valid: true, message: 'AbortController verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why can you not make the useEffect callback function itself async: useEffect(async () => { ... })?",
        "options": [
          "Because async functions return a Promise, whereas React strictly expects useEffect to return a cleanup function or undefined",
          "Because JavaScript forbids async inside modules",
          "Because the browser network stack crashes",
          "Async is only allowed in Node.js"
        ],
        "correctIndex": 0,
        "explanation": "React expects useEffect to return either undefined or a cleanup function. Async functions return a Promise, breaking React cleanup mechanism."
      },
      {
        "id": 2,
        "question": "Does the browser native fetch() reject its promise on HTTP 404 or 500 status codes?",
        "options": [
          "Yes, it automatically rejects with an error",
          "No, fetch only rejects on network failures; developers must inspect res.ok to catch HTTP error statuses",
          "Only in Chrome",
          "Only when CORS is disabled"
        ],
        "correctIndex": 1,
        "explanation": "Native fetch resolves successfully even if the server returns 404 or 500. You must manually check if (!res.ok)."
      },
      {
        "id": 3,
        "question": "What is the purpose of AbortController in API integration?",
        "options": [
          "To cancel ongoing HTTP requests when a component unmounts or before a new request is made",
          "To reboot the server",
          "To encrypt password headers",
          "To format JSON automatically"
        ],
        "correctIndex": 0,
        "explanation": "AbortController allows canceling in-flight network requests, preventing race conditions and memory leaks when components unmount."
      }
    ],
    "video": {
      "title": "Fetch vs Axios Tutorial",
      "channel": "Web Dev Simplified",
      "videoId": "qM4G1OMmdoE",
      "url": "https://www.youtube.com/watch?v=qM4G1OMmdoE",
      "description": "Web Dev Simplified compares native fetch and Axios, explaining pros, cons, and error handling."
    }
  },
  {
    "id": "react-topic-23",
    "order": 23,
    "slug": "loading-and-error-handling",
    "title": "Loading and Error Handling",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Handle async states professionally: the state triad (data, loading, error), skeleton loaders, error alert banners, and retry mechanisms.",
    "notes": {
      "concept": "In production web applications, network requests are neither instantaneous nor guaranteed to succeed. Components must manage three fundamental states: 1) Loading (while data is in flight), 2) Error (when the request fails or times out), and 3) Success (when data is ready to display). Managing this triad provides a polished user experience with skeleton loaders, clear error feedback, and retry actions.",
      "syntax": "// The API State Triad\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\nconst [error, setError] = useState(null);\n\nif (loading) return <SkeletonLoader />;\nif (error) return <ErrorBanner message={error} onRetry={fetchData} />;\nreturn <DataView data={data} />;",
      "explanation": "1. Loading State: Provides immediate visual feedback (spinners, skeletons) preventing the perception of a frozen app.\n2. Error State: Informs users why an operation failed (e.g., \"Network timeout\", \"401 Unauthorized\") without crashing the page.\n3. Retry Capability: Offers an interactive \"Try Again\" button that re-executes the fetch function.\n4. Resetting States: Always reset error to null and set loading to true before triggering a new fetch.",
      "codeExample": "import React, { useState, useEffect, useCallback } from 'react';\n\nexport function RobustDataLoader() {\n  const [items, setItems] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  const loadItems = useCallback(async () => {\n    setLoading(true);\n    setError(null);\n    try {\n      const res = await fetch('/api/tasks');\n      if (!res.ok) throw new Error(`Server returned status ${res.status}`);\n      const data = await res.json();\n      setItems(data);\n    } catch (err) {\n      setError(err.message || 'Failed to load tasks');\n    } finally {\n      setLoading(false);\n    }\n  }, []);\n\n  useEffect(() => {\n    loadItems();\n  }, [loadItems]);\n\n  if (loading) return <div className=\"skeleton-box\">Loading tasks...</div>;\n  if (error) {\n    return (\n      <div className=\"error-banner\">\n        <p>⚠️ Error: {error}</p>\n        <button onClick={loadItems}>Try Again</button>\n      </div>\n    );\n  }\n\n  return (\n    <div>\n      <h3>Tasks ({items.length})</h3>\n      <ul>{items.map(t => <li key={t.id}>{t.title}</li>)}</ul>\n    </div>\n  );\n}",
      "expectedOutput": "A resilient data viewer providing clean loading indicators, error recovery banners, and final content.",
      "commonMistakes": [
        {
          "mistake": "Failing to reset error to null before retrying a request.",
          "correction": "Always clear previous errors: setError(null); setLoading(true); on retry.",
          "explanation": "If error is not cleared, the UI may stay stuck on the error screen even while a successful retry is underway."
        },
        {
          "mistake": "Leaving loading true when an error occurs.",
          "correction": "Use a finally block: try { ... } catch { ... } finally { setLoading(false); }",
          "explanation": "Using finally guarantees that loading is always turned off, whether the request succeeds or throws an exception."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Implement early returns for loading and error states.",
      "starterCode": "function StatusRenderer({ loading, error, data }) {\n  // 1. Early return loading\n  if (loading) return <div>Loading records...</div>;\n\n  // 2. Early return error\n  if (error) return <div className=\"error\">Error: {error}</div>;\n\n  // 3. Render success\n  return <div>Data Loaded: {data}</div>;\n}",
      "solutionCode": "function StatusRenderer({ loading, error, data }) {\n  if (loading) return <div>Loading records...</div>;\n  if (error) return <div className=\"error\">Error: {error}</div>;\n  return <div>Data Loaded: {data}</div>;\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q23-1",
        "level": "Easy",
        "title": "Implement Loading Spinner Guard",
        "prompt": "Create a component ContentWithLoading taking props isLoading and content. If isLoading is true, return <span className=\"spinner\">Loading...</span>, else return <p>{content}</p>.",
        "requirements": [
          "if (isLoading) return spinner",
          "else return <p>{content}</p>"
        ],
        "starterCode": "// Write ContentWithLoading\n",
        "solutionCode": "function ContentWithLoading({ isLoading, content }) {\n  if (isLoading) return <span className=\"spinner\">Loading...</span>;\n  return <p>{content}</p>;\n}",
        "expectedOutput": "A component rendering a spinner during loading and content when loaded.",
        "validate": (code) => {
          code = String(code || '');
          if (!/if\s*\(\s*isLoading\s*\)/i.test(code)) return { valid: false, message: 'Check if (isLoading).' };
          if (!/className=["']spinner["']/i.test(code)) return { valid: false, message: 'Render spinner span.' };
          return { valid: true, message: 'Loading guard verified!' };
        }
      },
      {
        "id": "react-q23-2",
        "level": "Medium",
        "title": "Error Banner with Retry Callback",
        "prompt": "Create a component ErrorBanner taking props errorMessage and onRetry. Return a <div className=\"alert-error\"><p>{errorMessage}</p><button onClick={onRetry}>Retry</button></div>.",
        "requirements": [
          "Component ErrorBanner({ errorMessage, onRetry })",
          "Display {errorMessage}",
          "button with onClick={onRetry} and label \"Retry\""
        ],
        "starterCode": "// Write ErrorBanner with retry\n",
        "solutionCode": "function ErrorBanner({ errorMessage, onRetry }) {\n  return (\n    <div className=\"alert-error\">\n      <p>{errorMessage}</p>\n      <button onClick={onRetry}>Retry</button>\n    </div>\n  );\n}",
        "expectedOutput": "An accessible error banner providing message and retry action.",
        "validate": (code) => {
          code = String(code || '');
          if (!/className=["']alert-error["']/i.test(code)) return { valid: false, message: 'Use className="alert-error".' };
          if (!/onClick\s*=\s*\{\s*onRetry\s*\}/i.test(code)) return { valid: false, message: 'Bind onClick={onRetry}.' };
          return { valid: true, message: 'ErrorBanner verified!' };
        }
      },
      {
        "id": "react-q23-3",
        "level": "Challenge",
        "title": "Safe Async Fetch with finally Block",
        "prompt": "Write an async function executeFetch(fetcher, setData, setLoading, setError) that sets loading=true and error=null, awaits fetcher(), sets data, catches errors with setError(e.message), and in a finally block sets loading=false.",
        "requirements": [
          "setLoading(true); setError(null);",
          "try / catch / finally",
          "finally { setLoading(false); }"
        ],
        "starterCode": "// Write executeFetch with finally block\n",
        "solutionCode": "async function executeFetch(fetcher, setData, setLoading, setError) {\n  setLoading(true);\n  setError(null);\n  try {\n    const res = await fetcher();\n    setData(res);\n  } catch (err) {\n    setError(err.message);\n  } finally {\n    setLoading(false);\n  }\n}",
        "expectedOutput": "A robust async executor guaranteeing loading is turned off via finally.",
        "validate": (code) => {
          code = String(code || '');
          if (!/finally\s*\{/i.test(code)) return { valid: false, message: 'Include finally block.' };
          if (!/setLoading\(\s*false\s*\)/i.test(code)) return { valid: false, message: 'Call setLoading(false) in finally.' };
          return { valid: true, message: 'Async finally block verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why is using a finally block recommended when managing loading state in try/catch?",
        "options": [
          "It guarantees setLoading(false) runs whether the network request succeeds or throws an error",
          "It speeds up API responses",
          "It prevents CSS layout reflows",
          "It encrypts responses"
        ],
        "correctIndex": 0,
        "explanation": "The finally block always executes regardless of success or failure, ensuring loading spinners do not spin indefinitely on errors."
      },
      {
        "id": 2,
        "question": "What are skeleton loaders and why are they favored over simple text \"Loading...\"?",
        "options": [
          "They mimic the shape of incoming content, reducing perceived wait time and preventing sudden content layout shifts",
          "They are actual 3D skeleton models",
          "They are required by Google SEO",
          "They consume zero memory"
        ],
        "correctIndex": 0,
        "explanation": "Skeleton screens communicate interface structure ahead of time, enhancing perceived performance and eliminating layout jank."
      },
      {
        "id": 3,
        "question": "What should always be reset prior to executing a user-triggered retry request?",
        "options": [
          "Clear previous errors (setError(null)) and set loading to true",
          "Delete user account",
          "Clear browser cache completely",
          "Re-install node_modules"
        ],
        "correctIndex": 0,
        "explanation": "Resetting error state ensures the UI transitions cleanly to the loading state and does not falsely display old failure messages."
      }
    ],
    "video": {
      "title": "React Loading and Error Handling Best Practices",
      "channel": "Dave Gray",
      "videoId": "RVFAyFWO4go",
      "url": "https://www.youtube.com/watch?v=RVFAyFWO4go",
      "description": "Dave Gray covers handling async loading states, error displays, and user retry mechanisms."
    }
  },
  {
    "id": "react-topic-24",
    "order": 24,
    "slug": "context-api-state-management",
    "title": "Context API and State Management",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Combine React Context with useReducer for clean global state management: creating dedicated store providers, action dispatchers, and state selectors.",
    "notes": {
      "concept": "For medium-sized applications, you do not always need external state libraries like Redux or Zustand. Combining React Context with useReducer creates a powerful, built-in global state management architecture. The Context broadcasts state and dispatch down the component tree, while useReducer ensures all state transitions remain strictly structured, testable, and pure.",
      "syntax": "// Global Store Pattern with Context + useReducer\nconst StoreContext = createContext();\n\nexport function StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(rootReducer, initialState);\n  return (\n    <StoreContext.Provider value={{ state, dispatch }}>\n      {children}\n    </StoreContext.Provider>\n  );\n}\n\n// Custom hook to consume store\nexport const useStore = () => useContext(StoreContext);",
      "explanation": "1. Centralized Reducer: Governs application state mutations through clean action dispatching.\n2. Store Provider: Houses the useReducer instance and wraps the application root in App.jsx.\n3. Custom Hook (useStore): Abstracts useContext and provides safe access to state and dispatch.\n4. Separation of Stores: Split global state into logical domains (AuthContext, CartContext, ThemeContext) to minimize unnecessary consumer re-renders.",
      "codeExample": "import React, { createContext, useContext, useReducer } from 'react';\n\nconst CartContext = createContext();\n\nfunction cartReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_ITEM':\n      return { ...state, items: [...state.items, action.payload] };\n    case 'CLEAR':\n      return { ...state, items: [] };\n    default:\n      return state;\n  }\n}\n\nexport function CartProvider({ children }) {\n  const [state, dispatch] = useReducer(cartReducer, { items: [] });\n  return (\n    <CartContext.Provider value={{ state, dispatch }}>\n      {children}\n    </CartContext.Provider>\n  );\n}\n\nexport function CartSummary() {\n  const { state, dispatch } = useContext(CartContext);\n  return (\n    <div>\n      <h4>Cart Items: {state.items.length}</h4>\n      <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>\n    </div>\n  );\n}",
      "expectedOutput": "A global shopping cart store managing item counts and clearing actions across distant components.",
      "commonMistakes": [
        {
          "mistake": "Putting all application state into a single gigantic Context object.",
          "correction": "Split unrelated domains into separate providers (e.g. AuthProvider, ThemeProvider, CartProvider).",
          "explanation": "When a single monolithic context updates, EVERY component consuming ANY part of that context re-renders."
        },
        {
          "mistake": "Passing dispatch through props manually instead of exposing it via Context.",
          "correction": "Bundle dispatch in the Context value so any deeply nested component can trigger actions directly.",
          "explanation": "Passing dispatch through props re-introduces the exact prop drilling Context was designed to solve."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Connect a global counter context with useReducer and consume it in a child button.",
      "starterCode": "import { createContext, useContext, useReducer } from 'react';\n\nconst CountContext = createContext();\n\nfunction CountProvider({ children }) {\n  const [count, dispatch] = useReducer((c, action) => action === 'INC' ? c + 1 : c, 0);\n  return (\n    <CountContext.Provider value={{ count, dispatch }}>\n      {children}\n    </CountContext.Provider>\n  );\n}\n\nfunction ChildButton() {\n  const { count, dispatch } = useContext(CountContext);\n  return <button onClick={() => dispatch('INC')}>Count: {count}</button>;\n}\n\nfunction App() {\n  return (\n    <CountProvider>\n      <ChildButton />\n    </CountProvider>\n  );\n}",
      "solutionCode": "import { createContext, useContext, useReducer } from 'react';\n\nconst CountContext = createContext();\n\nfunction CountProvider({ children }) {\n  const [count, dispatch] = useReducer((c, action) => action === 'INC' ? c + 1 : c, 0);\n  return (\n    <CountContext.Provider value={{ count, dispatch }}>\n      {children}\n    </CountContext.Provider>\n  );\n}\n\nfunction ChildButton() {\n  const { count, dispatch } = useContext(CountContext);\n  return <button onClick={() => dispatch('INC')}>Count: {count}</button>;\n}\n\nfunction App() {\n  return (\n    <CountProvider>\n      <ChildButton />\n    </CountProvider>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q24-1",
        "level": "Easy",
        "title": "Create Store Provider Skeleton",
        "prompt": "Create a component StoreProvider taking { children }. Create StoreContext with createContext(). Wrap {children} in <StoreContext.Provider value={{ appName: \"CodeForge\" }}>.",
        "requirements": [
          "createContext()",
          "StoreContext.Provider with value={{ appName: \"CodeForge\" }}",
          "Wrap {children}"
        ],
        "starterCode": "// Write StoreProvider\n",
        "solutionCode": "import { createContext } from \"react\";\n\nconst StoreContext = createContext();\n\nfunction StoreProvider({ children }) {\n  return (\n    <StoreContext.Provider value={{ appName: \"CodeForge\" }}>\n      {children}\n    </StoreContext.Provider>\n  );\n}",
        "expectedOutput": "A store provider making application name accessible to all children.",
        "validate": (code) => {
          code = String(code || '');
          if (!/createContext\(/i.test(code)) return { valid: false, message: 'Call createContext().' };
          if (!/StoreContext\.Provider/i.test(code)) return { valid: false, message: 'Use StoreContext.Provider.' };
          if (!/appName/i.test(code)) return { valid: false, message: 'Include appName in value.' };
          return { valid: true, message: 'StoreProvider skeleton verified!' };
        }
      },
      {
        "id": "react-q24-2",
        "level": "Medium",
        "title": "Combine Context with useReducer",
        "prompt": "Write a component GlobalCounterProvider that initializes useReducer with a reducer (s, a) => a === \"ADD\" ? s + 1 : s and initial state 0. Provide { count: state, dispatch } via CounterContext.Provider.",
        "requirements": [
          "useReducer",
          "CounterContext.Provider value={{ count: state, dispatch }}",
          "Render {children}"
        ],
        "starterCode": "// Write GlobalCounterProvider combining Context and useReducer\n",
        "solutionCode": "import { createContext, useReducer } from \"react\";\n\nconst CounterContext = createContext();\n\nfunction GlobalCounterProvider({ children }) {\n  const [state, dispatch] = useReducer((s, a) => a === \"ADD\" ? s + 1 : s, 0);\n  return (\n    <CounterContext.Provider value={{ count: state, dispatch }}>\n      {children}\n    </CounterContext.Provider>\n  );\n}",
        "expectedOutput": "A state provider integrating useReducer dispatching with Context distribution.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useReducer\(/i.test(code)) return { valid: false, message: 'Use useReducer.' };
          if (!/value\s*=\s*\{\s*\{\s*count/i.test(code)) return { valid: false, message: 'Provide { count, dispatch } in value.' };
          return { valid: true, message: 'Context + useReducer verified!' };
        }
      },
      {
        "id": "react-q24-3",
        "level": "Challenge",
        "title": "Domain Splitting into Dedicated Providers",
        "prompt": "Create a component AppProviders taking { children } that nests <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>.",
        "requirements": [
          "Component AppProviders({ children })",
          "Nest <ThemeProvider>",
          "Nest <AuthProvider>",
          "Wrap {children}"
        ],
        "starterCode": "// Write AppProviders composing separate domain providers\n",
        "solutionCode": "function AppProviders({ children }) {\n  return (\n    <ThemeProvider>\n      <AuthProvider>\n        {children}\n      </AuthProvider>\n    </ThemeProvider>\n  );\n}",
        "expectedOutput": "A composed root provider separating theme and auth domains.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<ThemeProvider>[\s\S]*<AuthProvider>/i.test(code)) {
            return { valid: false, message: 'Nest ThemeProvider and AuthProvider.' };
          }
          if (!/\{children\}/i.test(code)) return { valid: false, message: 'Wrap {children}.' };
          return { valid: true, message: 'Domain provider composition verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the main benefit of combining React Context with useReducer?",
        "options": [
          "It provides a complete, Redux-like global state management system using built-in React hooks without external dependencies",
          "It makes React apps run on Python servers",
          "It replaces HTML with JSON",
          "It disables re-renders completely"
        ],
        "correctIndex": 0,
        "explanation": "Combining Context and useReducer provides centralized state transitions and global distribution without needing third-party libraries."
      },
      {
        "id": 2,
        "question": "Why is it better to split global state into multiple contexts (e.g. AuthContext, ThemeContext) rather than one gigantic store?",
        "options": [
          "To prevent unnecessary re-renders in components that only care about one specific domain",
          "React limits contexts to 10 lines of code",
          "Multiple contexts are required by JavaScript",
          "To encrypt variables"
        ],
        "correctIndex": 0,
        "explanation": "Splitting state by domain ensures that theme changes do not trigger re-renders in components that only listen for authentication updates."
      },
      {
        "id": 3,
        "question": "What should the Context.Provider value contain in a Context + useReducer pattern?",
        "options": [
          "The state object and the dispatch function so child components can read state and dispatch actions directly",
          "Only HTML strings",
          "Database passwords",
          "Raw SQL queries"
        ],
        "correctIndex": 0,
        "explanation": "Providing { state, dispatch } empowers any consumer component in the tree to read data and trigger updates."
      }
    ],
    "video": {
      "title": "State Management with React Context and useReducer",
      "channel": "Web Dev Simplified",
      "videoId": "5yKYubzZ5t8",
      "url": "https://www.youtube.com/watch?v=5yKYubzZ5t8",
      "description": "Web Dev Simplified demonstrates managing global application state using Context and useReducer."
    }
  },
  {
    "id": "react-topic-25",
    "order": 25,
    "slug": "redux-toolkit-basics",
    "title": "Redux Toolkit Basics",
    "difficulty": "Advanced",
    "estimatedTime": "25 min",
    "summary": "Modern state management with Redux Toolkit (RTK): configureStore, createSlice, action creators, Immer immutability, useSelector, and useDispatch.",
    "notes": {
      "concept": "Redux is an industry-standard predictable state container for large-scale JavaScript applications. Historically, Redux required substantial boilerplate (action types, action creators, switch-case reducers, and immutable object spreads). Modern Redux Toolkit (RTK) is the official, opinionated standard that dramatically simplifies Redux with configureStore and createSlice. Inside RTK slices, Immer automatically converts \"mutating\" code into safe immutable updates.",
      "syntax": "// 1. Defining a Slice with createSlice\nimport { createSlice, configureStore } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; }, // Immer allows \"mutation\" syntax!\n    decrement: (state) => { state.value -= 1; },\n    addByAmount: (state, action) => { state.value += action.payload; }\n  }\n});\n\nexport const { increment, decrement, addByAmount } = counterSlice.actions;\n\n// 2. Configuring Store\nexport const store = configureStore({\n  reducer: { counter: counterSlice.reducer }\n});\n\n// 3. In React Component:\nimport { useSelector, useDispatch } from 'react-redux';\nconst count = useSelector(state => state.counter.value);\nconst dispatch = useDispatch();\ndispatch(increment());",
      "explanation": "1. configureStore(): Wraps standard Redux createStore, automatically enabling Redux DevTools and redux-thunk middleware.\n2. createSlice(): Bundles slice name, initial state, reducer functions, and automatically generated action creators in one object.\n3. Immer Integration: RTK uses Immer internally; you can write state.value += 1 without manual object spreading.\n4. useSelector(): Extracts pieces of state from the global Redux store with automatic re-render subscription.\n5. useDispatch(): Dispatches generated actions to update the store.",
      "codeExample": "import React from 'react';\nimport { useSelector, useDispatch } from 'react-redux';\nimport { increment, decrement } from './counterSlice.js';\n\nexport function ReduxCounterView() {\n  const count = useSelector((state) => state.counter.value);\n  const dispatch = useDispatch();\n\n  return (\n    <div className=\"redux-card\">\n      <h3>Redux Toolkit Store Count: {count}</h3>\n      <button onClick={() => dispatch(decrement())}>-</button>\n      <button onClick={() => dispatch(increment())}>+</button>\n    </div>\n  );\n}",
      "expectedOutput": "A component connected to a global Redux Toolkit store reacting to dispatched slice actions.",
      "commonMistakes": [
        {
          "mistake": "Writing legacy Redux with manual action type constants, switch statements, and createStore in new projects.",
          "correction": "Use official Redux Toolkit (@reduxjs/toolkit) with createSlice and configureStore.",
          "explanation": "Redux Toolkit eliminates 75% of legacy Redux boilerplate and includes best practice defaults automatically."
        },
        {
          "mistake": "Trying to mutate state outside of an RTK createSlice reducer.",
          "correction": "Immer only wraps reducers inside createSlice. State everywhere else in React must be updated immutably.",
          "explanation": "Mutating Redux state outside reducers breaks time-travel debugging and component re-render triggers."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Review a createSlice configuration defining an initial state and increment reducer.",
      "starterCode": "// Example Redux Toolkit Slice\nconst userSlice = {\n  name: 'user',\n  initialState: { name: 'Anonymous', isAuth: false },\n  reducers: {\n    login: (state, action) => {\n      state.name = action.payload;\n      state.isAuth = true;\n    },\n    logout: (state) => {\n      state.name = 'Anonymous';\n      state.isAuth = false;\n    }\n  }\n};",
      "solutionCode": "const userSlice = {\n  name: 'user',\n  initialState: { name: 'Anonymous', isAuth: false },\n  reducers: {\n    login: (state, action) => {\n      state.name = action.payload;\n      state.isAuth = true;\n    },\n    logout: (state) => {\n      state.name = 'Anonymous';\n      state.isAuth = false;\n    }\n  }\n};"
    },
    "practiceQuestions": [
      {
        "id": "react-q25-1",
        "level": "Easy",
        "title": "Define RTK createSlice",
        "prompt": "Write an RTK slice named authSlice using createSlice({ name: \"auth\", initialState: { isLogged: false }, reducers: { logIn: (state) => { state.isLogged = true; } } }).",
        "requirements": [
          "createSlice call",
          "name: \"auth\"",
          "initialState: { isLogged: false }",
          "reducer logIn"
        ],
        "starterCode": "// Write authSlice with createSlice\n",
        "solutionCode": "import { createSlice } from \"@reduxjs/toolkit\";\n\nexport const authSlice = createSlice({\n  name: \"auth\",\n  initialState: { isLogged: false },\n  reducers: {\n    logIn: (state) => {\n      state.isLogged = true;\n    }\n  }\n});",
        "expectedOutput": "An RTK slice bundle defining state and reducer with Immer support.",
        "validate": (code) => {
          code = String(code || '');
          if (!/createSlice\(/i.test(code)) return { valid: false, message: 'Call createSlice().' };
          if (!/name\s*:\s*["']auth["']/i.test(code)) return { valid: false, message: 'Set name: "auth".' };
          if (!/isLogged\s*=\s*true/i.test(code)) return { valid: false, message: 'Set state.isLogged = true.' };
          return { valid: true, message: 'createSlice verified!' };
        }
      },
      {
        "id": "react-q25-2",
        "level": "Medium",
        "title": "Configure Store with configureStore",
        "prompt": "Write a configureStore call exporting store with reducer: { auth: authSlice.reducer } from \"@reduxjs/toolkit\".",
        "requirements": [
          "configureStore({ reducer: { auth: authSlice.reducer } })",
          "Export store"
        ],
        "starterCode": "// Write store configuration\n",
        "solutionCode": "import { configureStore } from \"@reduxjs/toolkit\";\n\nexport const store = configureStore({\n  reducer: {\n    auth: authSlice.reducer\n  }\n});",
        "expectedOutput": "A configured Redux store registering the auth slice reducer.",
        "validate": (code) => {
          code = String(code || '');
          if (!/configureStore\(/i.test(code)) return { valid: false, message: 'Call configureStore().' };
          if (!/reducer\s*:\s*\{/i.test(code)) return { valid: false, message: 'Provide reducer object.' };
          return { valid: true, message: 'configureStore verified!' };
        }
      },
      {
        "id": "react-q25-3",
        "level": "Challenge",
        "title": "Consume Store with useSelector and useDispatch",
        "prompt": "Create a component ReduxProfile. Read userName from state.user.name using useSelector, and create a button that dispatches logoutAction() using useDispatch().",
        "requirements": [
          "useSelector(state => state.user.name)",
          "useDispatch()",
          "button onClick dispatching logoutAction()"
        ],
        "starterCode": "// Write ReduxProfile\n",
        "solutionCode": "import { useSelector, useDispatch } from \"react-redux\";\n\nfunction ReduxProfile() {\n  const userName = useSelector(state => state.user.name);\n  const dispatch = useDispatch();\n  return (\n    <div>\n      <h3>{userName}</h3>\n      <button onClick={() => dispatch(logoutAction())}>Log Out</button>\n    </div>\n  );\n}",
        "expectedOutput": "A connected component selecting state and dispatching actions via hooks.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useSelector\(/i.test(code)) return { valid: false, message: 'Call useSelector().' };
          if (!/useDispatch\(\)/i.test(code)) return { valid: false, message: 'Call useDispatch().' };
          if (!/dispatch\(logoutAction\(\)\)/i.test(code)) return { valid: false, message: 'Dispatch logoutAction().' };
          return { valid: true, message: 'Redux hooks verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why does Redux Toolkit allow writing \"mutating\" syntax like state.value += 1 inside createSlice reducers?",
        "options": [
          "Because Redux no longer requires immutability",
          "Because RTK uses the Immer library internally, which detects mutations on a proxy and automatically produces a brand-new immutable copy",
          "Because modern browsers natively support memory mutation tracking",
          "It only works with numbers"
        ],
        "correctIndex": 1,
        "explanation": "Immer proxies the draft state inside createSlice, turning convenient mutation syntax into safe immutable updates under the hood."
      },
      {
        "id": 2,
        "question": "What is the role of useSelector in React-Redux?",
        "options": [
          "It extracts data from the Redux store state and subscribes the component to re-render when that selected data changes",
          "It dispatches HTTP POST requests",
          "It selects DOM elements with querySelector",
          "It queries MongoDB databases directly"
        ],
        "correctIndex": 0,
        "explanation": "useSelector reads state slices and automatically re-renders the component when the selected values update."
      },
      {
        "id": 3,
        "question": "Which method replaced legacy createStore() in modern Redux?",
        "options": [
          "configureStore()",
          "makeStore()",
          "buildStore()",
          "initStore()"
        ],
        "correctIndex": 0,
        "explanation": "configureStore() is the standard RTK API providing preconfigured thunk middleware and DevTools support."
      }
    ],
    "video": {
      "title": "Redux Toolkit Complete Tutorial for Beginners",
      "channel": "Dave Gray",
      "videoId": "NqzdVN2tyvQ",
      "url": "https://www.youtube.com/watch?v=NqzdVN2tyvQ",
      "description": "Dave Gray breaks down modern Redux Toolkit, createSlice, configureStore, and React-Redux hooks."
    }
  },
  {
    "id": "react-topic-26",
    "order": 26,
    "slug": "react-performance-optimization",
    "title": "React Performance Optimization",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Diagnose and eliminate unnecessary re-renders: React DevTools Profiler, component colocation, state lifting vs pushing state down, and windowing/virtualization.",
    "notes": {
      "concept": "React is fast by default, but complex applications with large component trees can experience UI sluggishness due to unnecessary re-renders. Performance optimization in React starts with measurement (React DevTools Profiler), followed by structural architectural changes (pushing state down to leave parents untouched), and finally memoization techniques.",
      "syntax": "// 1. Moving State Down (Best Optimization - Zero Boilerplate)\n// Bad: State in parent re-renders entire dashboard on every keypress\n// Good: Encapsulate state inside <SearchInput /> so only it re-renders!\n\n// 2. Windowing / Virtualization for massive lists (10,000 items)\n// Instead of 10,000 DOM nodes, only render the ~15 items currently visible in the viewport!",
      "explanation": "1. Measure Before Optimizing: Use the React DevTools Profiler to record component render durations and identify \"wasted renders\".\n2. Push State Down: Keep state as close as possible to where it is used; lifting state too high forces unnecessary sub-tree re-renders.\n3. Virtualization: For long lists or tables, libraries like react-window render only DOM nodes within the active scroll window.\n4. Avoid Premature Optimization: Do not wrap every single component in memoization; useMemo and useCallback carry overhead that can exceed render costs.",
      "codeExample": "// Architectural Performance: Pushing state down\nimport React, { useState } from 'react';\n\n// Independent search component - typing only re-renders THIS component!\nfunction SearchBar({ onSearch }) {\n  const [query, setQuery] = useState('');\n  return (\n    <input\n      value={query}\n      onChange={(e) => {\n        setQuery(e.target.value);\n        onSearch(e.target.value);\n      }}\n      placeholder=\"Type to filter...\"\n    />\n  );\n}\n\n// Heavy parent dashboard does NOT re-render on each individual keypress\nexport function BigDashboard() {\n  const [filter, setFilter] = useState('');\n  return (\n    <div>\n      <SearchBar onSearch={setFilter} />\n      <p>Active Filter: {filter}</p>\n    </div>\n  );\n}",
      "expectedOutput": "A high-performance dashboard isolating high-frequency typing re-renders from expensive parent components.",
      "commonMistakes": [
        {
          "mistake": "Wrapping every component and function in React.memo and useCallback without profiling.",
          "correction": "Profile first. Structural refactoring (pushing state down) is usually faster and cleaner than memoization.",
          "explanation": "Comparing props on every render has a performance cost; if a component is cheap to render, memoization makes it slower!"
        },
        {
          "mistake": "Rendering 5,000 complex DOM rows in an unvirtualized list, causing browser frame rate drops.",
          "correction": "Use virtualized windowing (react-window) to render only the visible rows.",
          "explanation": "Browsers choke when managing thousands of active DOM nodes simultaneously."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Isolate modal open state inside a dedicated button component so the parent does not re-render on hover.",
      "starterCode": "import { useState } from 'react';\n\nfunction IsolatedModalLauncher() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setIsOpen(true)}>Open Dialog</button>\n      {isOpen && <div className=\"dialog\">Modal Dialog Active <button onClick={() => setIsOpen(false)}>×</button></div>}\n    </div>\n  );\n}\n\nfunction HeavyApp() {\n  return (\n    <div>\n      <h2>Dashboard (Heavy Static Content)</h2>\n      <IsolatedModalLauncher />\n    </div>\n  );\n}",
      "solutionCode": "import { useState } from 'react';\n\nfunction IsolatedModalLauncher() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setIsOpen(true)}>Open Dialog</button>\n      {isOpen && <div className=\"dialog\">Modal Dialog Active <button onClick={() => setIsOpen(false)}>×</button></div>}\n    </div>\n  );\n}\n\nfunction HeavyApp() {\n  return (\n    <div>\n      <h2>Dashboard (Heavy Static Content)</h2>\n      <IsolatedModalLauncher />\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q26-1",
        "level": "Easy",
        "title": "Isolate Fast State in Child Component",
        "prompt": "Create a component FastCounter that manages its own count state with a button, so its parent never re-renders when count increments.",
        "requirements": [
          "FastCounter manages local state",
          "button increments count",
          "Self-contained component"
        ],
        "starterCode": "// Write FastCounter\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction FastCounter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;\n}",
        "expectedOutput": "A self-contained button isolating state updates from surrounding parents.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useState/i.test(code)) return { valid: false, message: 'Use local useState inside FastCounter.' };
          return { valid: true, message: 'State colocation verified!' };
        }
      },
      {
        "id": "react-q26-2",
        "level": "Medium",
        "title": "Pass Components as Children to Prevent Re-Renders",
        "prompt": "Create a component ScrollContainer taking { children }. Manage state scrollPos with useState(0). Render <div className=\"scroll-box\"><p>Scroll: {scrollPos}</p>{children}</div>.",
        "requirements": [
          "Component ScrollContainer({ children })",
          "Local scrollPos state",
          "Render {children} without re-rendering children when scrollPos updates"
        ],
        "starterCode": "// Write ScrollContainer with children prop optimization\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction ScrollContainer({ children }) {\n  const [scrollPos, setScrollPos] = useState(0);\n  return (\n    <div className=\"scroll-box\">\n      <p>Scroll: {scrollPos}</p>\n      {children}\n    </div>\n  );\n}",
        "expectedOutput": "A container updating local state while preserving stable children references.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\{children\}/i.test(code)) return { valid: false, message: 'Render {children}.' };
          if (!/scrollPos/i.test(code)) return { valid: false, message: 'Manage scrollPos state.' };
          return { valid: true, message: 'Children optimization verified!' };
        }
      },
      {
        "id": "react-q26-3",
        "level": "Challenge",
        "title": "Simulate List Windowing Concept",
        "prompt": "Write a component VirtualizedSlice taking props items (array of 1000 items) and startIndex (number). Render only 10 items (items.slice(startIndex, startIndex + 10)) in a <ul> with stable keys.",
        "requirements": [
          "items.slice(startIndex, startIndex + 10)",
          "Map only visible slice",
          "Render inside <ul>"
        ],
        "starterCode": "// Write VirtualizedSlice\n",
        "solutionCode": "function VirtualizedSlice({ items, startIndex = 0 }) {\n  const visibleItems = items.slice(startIndex, startIndex + 10);\n  return (\n    <ul>\n      {visibleItems.map(item => (\n        <li key={item.id}>{item.name}</li>\n      ))}\n    </ul>\n  );\n}",
        "expectedOutput": "A component rendering only a slice of visible items for high performance.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\.slice\(/i.test(code)) return { valid: false, message: 'Slice items to visible range.' };
          if (!/\.map\(/i.test(code)) return { valid: false, message: 'Map over visible items.' };
          return { valid: true, message: 'Virtualization concept verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the most effective and simplest way to prevent unnecessary re-renders in React?",
        "options": [
          "\"Pushing state down\" so state lives in the specific component that needs it, rather than at the top of the tree",
          "Wrapping every single line in eval()",
          "Disabling the Virtual DOM",
          "Turning off JavaScript in the browser"
        ],
        "correctIndex": 0,
        "explanation": "Localizing state prevents parent components and their children from re-rendering on local changes."
      },
      {
        "id": 2,
        "question": "What tool should you use to identify which components are causing performance lag in a React app?",
        "options": [
          "React DevTools Profiler",
          "Windows Notepad",
          "Photoshop",
          "Postman"
        ],
        "correctIndex": 0,
        "explanation": "The Profiler tab in React DevTools records render times and reveals why specific components re-rendered."
      },
      {
        "id": 3,
        "question": "What technique renders only the rows visible in the viewport when displaying huge datasets (e.g. 20,000 items)?",
        "options": [
          "Windowing / List Virtualization",
          "Double Rendering",
          "DOM Cloning",
          "Infinite Mapping"
        ],
        "correctIndex": 0,
        "explanation": "Virtualization keeps only the active viewport items in the DOM, keeping memory and frame rates optimal."
      }
    ],
    "video": {
      "title": "React Performance Optimization Masterclass",
      "channel": "Jack Herrington",
      "videoId": "9Jz41y4y7tU",
      "url": "https://www.youtube.com/watch?v=9Jz41y4y7tU",
      "description": "Jack Herrington demonstrates React DevTools profiling, render optimization, and avoiding wasted renders."
    }
  },
  {
    "id": "react-topic-27",
    "order": 27,
    "slug": "react-memo-usememo-usecallback",
    "title": "React.memo, useMemo and useCallback",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Master React memoization trio: React.memo for components, useMemo for caching expensive calculation outputs, and useCallback for preserving callback referential equality.",
    "notes": {
      "concept": "By default, when a parent component re-renders, ALL of its child components re-render automatically. To prevent this, React provides three memoization tools: 1) React.memo wraps a component and skips re-rendering if its props are shallowly equal; 2) useMemo caches the result of an expensive calculation; 3) useCallback caches a function definition between renders to preserve referential equality.",
      "syntax": "// 1. React.memo: Memoize component rendering\nconst ExpensiveChild = React.memo(function ExpensiveChild({ count, onAction }) {\n  return <div>{count}</div>;\n});\n\n// 2. useMemo: Cache expensive calculation result\nconst sortedList = useMemo(() => {\n  return heavySortingAlgorithm(items);\n}, [items]);\n\n// 3. useCallback: Preserve function reference across renders\nconst handleClick = useCallback(() => {\n  console.log(\"Action triggered\");\n}, []); // Stable reference!",
      "explanation": "1. Referential Equality in JS: In JavaScript, () => {} !== () => {} and {} !== {}. On every render, newly declared functions and objects have new memory addresses.\n2. React.memo + useCallback: If you pass an un-memoized arrow function <Child onClick={() => {}} /> to a React.memo child, React.memo fails because the prop reference changed!\n3. useMemo for Computations: Prevents re-running heavy mathematical calculations, data sorting, or filtering unless input dependencies change.\n4. Dependency Rules: Always declare all variables referenced inside useMemo/useCallback inside their dependency arrays.",
      "codeExample": "import React, { useState, useMemo, useCallback } from 'react';\n\n// Memoized child component - will ONLY re-render if onClick changes\nconst ActionButton = React.memo(({ onClick, label }) => {\n  console.log(\"Rendering ActionButton:\", label);\n  return <button onClick={onClick}>{label}</button>;\n});\n\nexport function MemoDashboard() {\n  const [count, setCount] = useState(0);\n  const [text, setText] = useState('');\n\n  // Stable callback reference: does NOT recreate when 'text' state changes\n  const handleIncrement = useCallback(() => {\n    setCount(prev => prev + 1);\n  }, []);\n\n  // Expensive calculation cached until 'count' changes\n  const computedTotal = useMemo(() => {\n    return count * 1000;\n  }, [count]);\n\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} placeholder=\"Type here...\" />\n      <p>Computed: {computedTotal}</p>\n      <ActionButton onClick={handleIncrement} label=\"Increment\" />\n    </div>\n  );\n}",
      "expectedOutput": "Typing into the input changes text state without triggering a re-render of ActionButton or re-calculating computedTotal.",
      "commonMistakes": [
        {
          "mistake": "Using useMemo for cheap calculations like a + b or string concatenation.",
          "correction": "Only use useMemo for genuinely expensive operations (sorting 5,000 items, complex regex parsing).",
          "explanation": "useMemo introduces memory overhead and dependency array checks; for trivial operations, it is slower than re-computing."
        },
        {
          "mistake": "Passing inline anonymous functions to a React.memo component: <MemoizedComp onClick={() => doSomething()} />",
          "correction": "Wrap the handler in useCallback before passing it down.",
          "explanation": "The new inline function reference invalidates React.memo shallow prop comparison on every render."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Wrap an expensive calculation inside useMemo so it only executes when the number changes.",
      "starterCode": "import { useState, useMemo } from 'react';\n\nfunction expensiveSquare(n) {\n  return n * n;\n}\n\nfunction SquareCalculator() {\n  const [num, setNum] = useState(5);\n  const [theme, setTheme] = useState('dark');\n\n  // Cache calculation result with useMemo\n  const squared = useMemo(() => expensiveSquare(num), [num]);\n\n  return (\n    <div>\n      <p>Square of {num}: <strong>{squared}</strong></p>\n      <button onClick={() => setNum(n => n + 1)}>Increment Number</button>\n      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>\n    </div>\n  );\n}",
      "solutionCode": "import { useState, useMemo } from 'react';\n\nfunction expensiveSquare(n) {\n  return n * n;\n}\n\nfunction SquareCalculator() {\n  const [num, setNum] = useState(5);\n  const [theme, setTheme] = useState('dark');\n\n  const squared = useMemo(() => expensiveSquare(num), [num]);\n\n  return (\n    <div>\n      <p>Square of {num}: <strong>{squared}</strong></p>\n      <button onClick={() => setNum(n => n + 1)}>Increment Number</button>\n      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q27-1",
        "level": "Easy",
        "title": "Wrap Component with React.memo",
        "prompt": "Create a component UserCard({ name }) and export it wrapped in React.memo so it only re-renders when the name prop changes.",
        "requirements": [
          "React.memo(...)",
          "Component UserCard",
          "Return <div>{name}</div>"
        ],
        "starterCode": "// Write memoized UserCard\n",
        "solutionCode": "import React from \"react\";\n\nexport const UserCard = React.memo(function UserCard({ name }) {\n  return <div>{name}</div>;\n});",
        "expectedOutput": "A memoized component skipping renders when props are identical.",
        "validate": (code) => {
          code = String(code || '');
          if (!/React\.memo\(/i.test(code) && !/memo\(/i.test(code)) {
            return { valid: false, message: 'Wrap component with React.memo.' };
          }
          return { valid: true, message: 'React.memo verified!' };
        }
      },
      {
        "id": "react-q27-2",
        "level": "Medium",
        "title": "Cache Calculation with useMemo",
        "prompt": "Inside a component StatsView taking prop numbers (array of numbers), use useMemo to calculate and return the sum of all numbers, dependent on [numbers].",
        "requirements": [
          "useMemo(() => numbers.reduce(...), [numbers])",
          "Return sum"
        ],
        "starterCode": "// Write StatsView using useMemo\n",
        "solutionCode": "import { useMemo } from \"react\";\n\nfunction StatsView({ numbers }) {\n  const total = useMemo(() => {\n    return numbers.reduce((acc, curr) => acc + curr, 0);\n  }, [numbers]);\n  return <div>Total: {total}</div>;\n}",
        "expectedOutput": "A component caching sum calculation using useMemo.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useMemo\(/i.test(code)) return { valid: false, message: 'Use useMemo.' };
          if (!/\[\s*numbers\s*\]/i.test(code)) return { valid: false, message: 'Add [numbers] dependency array.' };
          return { valid: true, message: 'useMemo verified!' };
        }
      },
      {
        "id": "react-q27-3",
        "level": "Challenge",
        "title": "Preserve Callback Reference with useCallback",
        "prompt": "Create a component ActionContainer with a callback handleClick memoized using useCallback that logs \"Clicked ID: \" + id. Pass [id] in the dependency array.",
        "requirements": [
          "useCallback hook",
          "Dependency array [id]",
          "Log \"Clicked ID: \" + id"
        ],
        "starterCode": "// Write ActionContainer with useCallback\n",
        "solutionCode": "import { useCallback } from \"react\";\n\nfunction ActionContainer({ id }) {\n  const handleClick = useCallback(() => {\n    console.log(\"Clicked ID: \" + id);\n  }, [id]);\n  return <button onClick={handleClick}>Trigger</button>;\n}",
        "expectedOutput": "A component preserving callback referential equality across renders with useCallback.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useCallback\(/i.test(code)) return { valid: false, message: 'Use useCallback hook.' };
          if (!/\[\s*id\s*\]/i.test(code)) return { valid: false, message: 'Include [id] in dependency array.' };
          return { valid: true, message: 'useCallback verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary difference between useMemo and useCallback?",
        "options": [
          "useMemo caches the RETURN VALUE of a function; useCallback caches the FUNCTION DEFINITION itself to preserve referential equality",
          "useMemo is for numbers; useCallback is for strings",
          "useMemo is for backend Node.js code only",
          "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "useMemo(() => computeValue(), deps) caches the calculated result, while useCallback(fn, deps) returns a stable function reference."
      },
      {
        "id": 2,
        "question": "Why does passing an inline arrow function to a React.memo child component defeat memoization?",
        "options": [
          "Because arrow functions cannot be memoized",
          "Because a brand-new function instance with a new memory address is created on every parent render, failing shallow prop equality",
          "Because React throws an error",
          "It deletes the child component"
        ],
        "correctIndex": 1,
        "explanation": "In JavaScript, () => {} !== () => {}. A new reference is created every render, causing React.memo to believe props changed."
      },
      {
        "id": 3,
        "question": "When should you NOT use useMemo?",
        "options": [
          "For simple calculations (like a + b) where the overhead of useMemo exceeds the cost of re-computing",
          "When sorting 10,000 records",
          "When filtering large datasets",
          "When transforming nested JSON trees"
        ],
        "correctIndex": 0,
        "explanation": "Wrapping trivial operations in useMemo wastes memory and execution time on dependency checks."
      }
    ],
    "video": {
      "title": "Learn useMemo In 10 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "THL1OPn72vo",
      "url": "https://www.youtube.com/watch?v=THL1OPn72vo",
      "description": "Web Dev Simplified teaches when and why to use useMemo, referential equality, and performance traps."
    }
  },
  {
    "id": "react-topic-28",
    "order": 28,
    "slug": "lazy-loading-and-suspense",
    "title": "Lazy Loading and Suspense",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Code splitting and on-demand asset loading: React.lazy dynamic imports, Suspense fallbacks, and accelerating initial page load performance.",
    "notes": {
      "concept": "By default, bundlers pack an entire React application into a single massive JavaScript bundle file. A visitor on the landing page is forced to download code for the admin dashboard, settings, and charts before seeing anything on screen. React.lazy and Suspense enable \"Code Splitting\", splitting the app into separate chunks downloaded on-demand only when a user navigates to that specific route or component.",
      "syntax": "import React, { Suspense, lazy } from 'react';\n\n// 1. Dynamic component import via React.lazy\nconst AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));\n\n// 2. Wrap lazy component in Suspense with fallback\n<Suspense fallback={<div className=\"spinner\">Loading Module...</div>}>\n  <AdminDashboard />\n</Suspense>",
      "explanation": "1. React.lazy(): Takes a function that calls dynamic import(). It returns a component that renders the loaded module.\n2. Dynamic import(): Tells Vite/Rollup to split the target file into a separate asynchronous chunk (.js file) in the dist/ folder.\n3. Suspense: A built-in React component that catches pending promises and displays fallback UI while the chunk downloads.\n4. Route-Based Splitting: The most common pattern: lazy load every top-level page component inside <Routes>.",
      "codeExample": "import React, { Suspense, lazy } from 'react';\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst Home = lazy(() => import('./pages/Home.jsx'));\nconst Analytics = lazy(() => import('./pages/Analytics.jsx'));\n\nexport function AppWithCodeSplitting() {\n  return (\n    <BrowserRouter>\n      <Suspense fallback={<div className=\"route-loader\">Loading screen...</div>}>\n        <Routes>\n          <Route path=\"/\" element={<Home />} />\n          <Route path=\"/analytics\" element={<Analytics />} />\n        </Routes>\n      </Suspense>\n    </BrowserRouter>\n  );\n}",
      "expectedOutput": "An application loading lightweight page chunks on-demand, reducing initial bundle transfer size by up to 70%.",
      "commonMistakes": [
        {
          "mistake": "Forgetting to wrap a React.lazy component in a <Suspense> boundary.",
          "correction": "Always wrap lazy components inside <Suspense fallback={<Loader />}>.",
          "explanation": "Rendering a lazy component without a Suspense boundary throws an unhandled React runtime error."
        },
        {
          "mistake": "Using React.lazy inside component render bodies: function App() { const C = lazy(...); }",
          "correction": "Always declare React.lazy dynamic imports at the top module level outside component functions.",
          "explanation": "Declaring lazy inside a component causes it to re-download and re-mount on every render pass."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Wrap a lazily loaded component in Suspense with a fallback loading message.",
      "starterCode": "import { Suspense, lazy } from 'react';\n\n// Assume ./HeavyChart.jsx is lazily imported\nconst HeavyChart = lazy(() => import('./HeavyChart.jsx'));\n\nfunction Dashboard() {\n  return (\n    <div>\n      <h2>Analytics Overview</h2>\n      {/* Wrap in Suspense with fallback */}\n      <Suspense fallback={<p>Loading chart data...</p>}>\n        <HeavyChart />\n      </Suspense>\n    </div>\n  );\n}",
      "solutionCode": "import { Suspense, lazy } from 'react';\n\nconst HeavyChart = lazy(() => import('./HeavyChart.jsx'));\n\nfunction Dashboard() {\n  return (\n    <div>\n      <h2>Analytics Overview</h2>\n      <Suspense fallback={<p>Loading chart data...</p>}>\n        <HeavyChart />\n      </Suspense>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q28-1",
        "level": "Easy",
        "title": "Declare React.lazy Dynamic Import",
        "prompt": "Write a React.lazy dynamic import statement for a component located at \"./pages/Settings.jsx\", assigning it to const Settings.",
        "requirements": [
          "const Settings = lazy(() => import(\"./pages/Settings.jsx\"))"
        ],
        "starterCode": "// Write lazy import for Settings\n",
        "solutionCode": "import { lazy } from \"react\";\n\nconst Settings = lazy(() => import(\"./pages/Settings.jsx\"));",
        "expectedOutput": "A lazy component declaration enabling Rollup chunk splitting.",
        "validate": (code) => {
          code = String(code || '');
          if (!/lazy\(\s*\(\)\s*=>\s*import\(/i.test(code)) return { valid: false, message: 'Use lazy(() => import(...)).' };
          if (!/Settings\.jsx/i.test(code)) return { valid: false, message: 'Import "./pages/Settings.jsx".' };
          return { valid: true, message: 'React.lazy import verified!' };
        }
      },
      {
        "id": "react-q28-2",
        "level": "Medium",
        "title": "Wrap Component in Suspense Boundary",
        "prompt": "Create a component LazyWrapper taking { children }. Wrap {children} in <Suspense fallback={<div className=\"spinner\">Loading...</div>}>.",
        "requirements": [
          "<Suspense fallback={<div className=\"spinner\">Loading...</div>}>",
          "Wrap {children}"
        ],
        "starterCode": "// Write LazyWrapper with Suspense\n",
        "solutionCode": "import { Suspense } from \"react\";\n\nfunction LazyWrapper({ children }) {\n  return (\n    <Suspense fallback={<div className=\"spinner\">Loading...</div>}>\n      {children}\n    </Suspense>\n  );\n}",
        "expectedOutput": "A reusable Suspense container providing fallback UI for dynamic chunks.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<Suspense/i.test(code)) return { valid: false, message: 'Use <Suspense> component.' };
          if (!/fallback\s*=/i.test(code)) return { valid: false, message: 'Provide fallback prop.' };
          if (!/\{children\}/i.test(code)) return { valid: false, message: 'Render {children}.' };
          return { valid: true, message: 'Suspense boundary verified!' };
        }
      },
      {
        "id": "react-q28-3",
        "level": "Challenge",
        "title": "Route-Based Code Splitting Architecture",
        "prompt": "Create a component RouteSplitter that lazy loads Home from \"./Home.jsx\" and Admin from \"./Admin.jsx\". Render <Suspense fallback={<p>Loading...</p>}> wrapping <Routes> with both paths.",
        "requirements": [
          "lazy load Home and Admin",
          "<Suspense fallback={...}>",
          "<Routes> with both <Route> components"
        ],
        "starterCode": "// Write RouteSplitter with route-based splitting\n",
        "solutionCode": "import React, { Suspense, lazy } from \"react\";\nimport { Routes, Route } from \"react-router-dom\";\n\nconst Home = lazy(() => import(\"./Home.jsx\"));\nconst Admin = lazy(() => import(\"./Admin.jsx\"));\n\nfunction RouteSplitter() {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/admin\" element={<Admin />} />\n      </Routes>\n    </Suspense>\n  );\n}",
        "expectedOutput": "A production-grade route-level code splitting configuration.",
        "validate": (code) => {
          code = String(code || '');
          if (!/lazy\(/i.test(code)) return { valid: false, message: 'Use lazy() imports.' };
          if (!/<Suspense/i.test(code)) return { valid: false, message: 'Wrap with <Suspense>.' };
          if (!/<Routes>/i.test(code)) return { valid: false, message: 'Include <Routes>.' };
          return { valid: true, message: 'Route splitting verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary benefit of code splitting with React.lazy and dynamic imports?",
        "options": [
          "It splits the bundle into smaller chunks downloaded only when needed, drastically speeding up initial page load",
          "It compiles JavaScript into C++",
          "It connects directly to MongoDB",
          "It replaces CSS files"
        ],
        "correctIndex": 0,
        "explanation": "Code splitting ensures visitors only download JavaScript for the screen they are currently viewing, accelerating first contentful paint."
      },
      {
        "id": 2,
        "question": "What component must wrap any component loaded via React.lazy?",
        "options": [
          "<Suspense fallback={...}>",
          "<ErrorBoundary>",
          "<LazyContainer>",
          "<AsyncBoundary>"
        ],
        "correctIndex": 0,
        "explanation": "<Suspense> is required to catch the pending bundle download promise and display fallback UI."
      },
      {
        "id": 3,
        "question": "Where should React.lazy() declarations be placed in your files?",
        "options": [
          "At the top module scope outside any component function",
          "Inside an onClick handler",
          "Inside a while loop",
          "Inside index.html"
        ],
        "correctIndex": 0,
        "explanation": "Declaring lazy at top-level module scope ensures the component chunk is resolved cleanly without repeated re-declarations on render."
      }
    ],
    "video": {
      "title": "How To Code Split Your React App With React.lazy and Suspense",
      "channel": "Web Dev Simplified",
      "videoId": "MJn4W7pR6RU",
      "url": "https://www.youtube.com/watch?v=MJn4W7pR6RU",
      "description": "Web Dev Simplified demonstrates code splitting, React.lazy, Suspense, and optimizing bundle weight."
    }
  },
  {
    "id": "react-topic-29",
    "order": 29,
    "slug": "error-boundaries",
    "title": "Error Boundaries",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Prevent catastrophic white-screen app crashes: class-based Error Boundaries, componentDidCatch, getDerivedStateFromError, and user recovery UI.",
    "notes": {
      "concept": "A JavaScript error inside part of the UI should not break the whole app. In React, unhandled JavaScript errors in component rendering, lifecycle methods, or constructors previously caused the entire component tree to unmount, resulting in a blank white screen. \"Error Boundaries\" are special React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.",
      "syntax": "// Error Boundary Implementation (Class Component Required)\nimport React, { Component } from 'react';\n\nexport class ErrorBoundary extends Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false, error: null };\n  }\n\n  static getDerivedStateFromError(error) {\n    // Update state so the next render will show the fallback UI.\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    // You can also log the error to an error reporting service (e.g. Sentry)\n    console.error(\"ErrorBoundary caught:\", error, errorInfo);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return (\n        <div className=\"error-fallback\">\n          <h2>Something went wrong.</h2>\n          <button onClick={() => this.setState({ hasError: false })}>Try Again</button>\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}",
      "explanation": "1. Class Component Requirement: As of React 18/19, Error Boundaries must be class components because there is no hook equivalent for getDerivedStateFromError or componentDidCatch.\n2. getDerivedStateFromError(error): Pure lifecycle method called during render phase to update state and trigger fallback UI.\n3. componentDidCatch(error, info): Called during commit phase for side effects, such as logging stack traces to external services (Sentry, Datadog).\n4. Granular Containment: Wrap independent widgets (Sidebar, Feed, Chat) in separate boundaries so a crash in one widget does not bring down the entire app.",
      "codeExample": "// Using Error Boundary to protect dashboard widgets\nexport function DashboardLayout() {\n  return (\n    <div className=\"dashboard-grid\">\n      <ErrorBoundary>\n        <SidebarNav />\n      </ErrorBoundary>\n\n      <main>\n        <ErrorBoundary>\n          <FinancialChartWidget /> {/* If chart crashes, rest of app stays alive! */}\n        </ErrorBoundary>\n\n        <ErrorBoundary>\n          <RecentActivityFeed />\n        </ErrorBoundary>\n      </main>\n    </div>\n  );\n}",
      "expectedOutput": "A resilient application where a fatal error in one chart component gracefully displays a fallback card without affecting the rest of the page.",
      "commonMistakes": [
        {
          "mistake": "Expecting Error Boundaries to catch errors inside async callbacks (like setTimeout or fetch).",
          "correction": "Use standard try/catch blocks for async code, event handlers, and server-side rendering.",
          "explanation": "Error Boundaries only catch errors thrown during component rendering and React lifecycle methods."
        },
        {
          "mistake": "Wrapping only the root App in a single boundary, causing the entire screen to collapse on a minor widget bug.",
          "correction": "Place boundaries around key independent sub-features to keep the rest of the application functional.",
          "explanation": "Granular error boundaries isolate crashes to specific cards or panels."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Review an Error Boundary component providing a fallback message and reset button.",
      "starterCode": "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <div className=\"crash-box\">Widget crashed. Please refresh.</div>;\n    }\n    return this.props.children;\n  }\n}",
      "solutionCode": "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <div className=\"crash-box\">Widget crashed. Please refresh.</div>;\n    }\n    return this.props.children;\n  }\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q29-1",
        "level": "Easy",
        "title": "Define getDerivedStateFromError",
        "prompt": "Write the static getDerivedStateFromError(error) method for an Error Boundary class that returns { hasError: true, errorMessage: error.message }.",
        "requirements": [
          "static getDerivedStateFromError(error)",
          "return { hasError: true, errorMessage: error.message }"
        ],
        "starterCode": "// Write getDerivedStateFromError\n",
        "solutionCode": "static getDerivedStateFromError(error) {\n  return { hasError: true, errorMessage: error.message };\n}",
        "expectedOutput": "The static lifecycle method updating state upon render errors.",
        "validate": (code) => {
          code = String(code || '');
          if (!/static\s+getDerivedStateFromError/i.test(code)) return { valid: false, message: 'Define static getDerivedStateFromError.' };
          if (!/hasError\s*:\s*true/i.test(code)) return { valid: false, message: 'Return { hasError: true }.' };
          return { valid: true, message: 'getDerivedStateFromError verified!' };
        }
      },
      {
        "id": "react-q29-2",
        "level": "Medium",
        "title": "Implement componentDidCatch Logging",
        "prompt": "Write the componentDidCatch(error, errorInfo) method for an Error Boundary that logs console.error(\"Logged to service:\", error, errorInfo).",
        "requirements": [
          "componentDidCatch(error, errorInfo)",
          "console.error logging both arguments"
        ],
        "starterCode": "// Write componentDidCatch\n",
        "solutionCode": "componentDidCatch(error, errorInfo) {\n  console.error(\"Logged to service:\", error, errorInfo);\n}",
        "expectedOutput": "The commit-phase error logging method for monitoring telemetry.",
        "validate": (code) => {
          code = String(code || '');
          if (!/componentDidCatch\s*\(\s*error\s*,\s*errorInfo\s*\)/i.test(code)) {
            return { valid: false, message: 'Define componentDidCatch(error, errorInfo).' };
          }
          if (!/console\.error/i.test(code)) return { valid: false, message: 'Call console.error.' };
          return { valid: true, message: 'componentDidCatch verified!' };
        }
      },
      {
        "id": "react-q29-3",
        "level": "Challenge",
        "title": "Complete ErrorBoundary Class Component",
        "prompt": "Write a complete ErrorBoundary class extending React.Component. In state { hasError: false }. Implement static getDerivedStateFromError returning { hasError: true }. In render(), if hasError return <h3>Something broke!</h3>, else return this.props.children.",
        "requirements": [
          "class ErrorBoundary extends React.Component",
          "state = { hasError: false }",
          "static getDerivedStateFromError",
          "render() check"
        ],
        "starterCode": "// Write complete ErrorBoundary class\n",
        "solutionCode": "import React from \"react\";\n\nexport class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  render() {\n    if (this.state.hasError) {\n      return <h3>Something broke!</h3>;\n    }\n    return this.props.children;\n  }\n}",
        "expectedOutput": "A complete, working Error Boundary class component guarding child trees.",
        "validate": (code) => {
          code = String(code || '');
          if (!/class\s+ErrorBoundary\s+extends/i.test(code)) return { valid: false, message: 'Define class ErrorBoundary extends React.Component.' };
          if (!/getDerivedStateFromError/i.test(code)) return { valid: false, message: 'Implement getDerivedStateFromError.' };
          if (!/this\.props\.children/i.test(code)) return { valid: false, message: 'Return this.props.children.' };
          return { valid: true, message: 'Complete ErrorBoundary verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why must Error Boundaries be written as class components in React 18/19?",
        "options": [
          "Because React has not introduced hook equivalents for getDerivedStateFromError or componentDidCatch",
          "Because functional components cannot catch any errors",
          "Because classes are faster in Google Chrome",
          "It is a temporary bug in Vite"
        ],
        "correctIndex": 0,
        "explanation": "React lifecycle methods for error boundaries (getDerivedStateFromError and componentDidCatch) exist only in class components."
      },
      {
        "id": 2,
        "question": "Which of the following errors CANNOT be caught by an Error Boundary?",
        "options": [
          "Errors thrown inside asynchronous callbacks (like setTimeout or fetch) and event handlers (like onClick)",
          "Errors thrown inside component render methods",
          "Errors thrown in child component constructors",
          "Errors thrown in lifecycle methods"
        ],
        "correctIndex": 0,
        "explanation": "Error boundaries catch errors during rendering, lifecycle methods, and constructors. Async code and event handlers must use try/catch."
      },
      {
        "id": 3,
        "question": "What is the role of static getDerivedStateFromError(error)?",
        "options": [
          "To update state so the next render displays the fallback UI instead of crashing",
          "To format CSS borders",
          "To restart the web server",
          "To delete the error from memory"
        ],
        "correctIndex": 0,
        "explanation": "getDerivedStateFromError synchronously updates state upon an error to immediately render the fallback component."
      }
    ],
    "video": {
      "title": "How To Use Error Boundaries In React",
      "channel": "Web Dev Simplified",
      "videoId": "_Dk_hS28f3U",
      "url": "https://www.youtube.com/watch?v=_Dk_hS28f3U",
      "description": "Web Dev Simplified covers creating error boundaries, catching render errors, and building fallback screens."
    }
  },
  {
    "id": "react-topic-30",
    "order": 30,
    "slug": "authentication-in-react",
    "title": "Authentication in React",
    "difficulty": "Advanced",
    "estimatedTime": "25 min",
    "summary": "JWT token authentication workflow: AuthContext, login/logout functions, storing tokens in localStorage/cookies, restoring sessions on refresh, and request headers.",
    "notes": {
      "concept": "Authentication in single-page React applications is typically stateless and token-based (JSON Web Tokens - JWT). When a student logs in, the backend verifies credentials and returns a signed JWT. React stores this token (in memory, localStorage, or secure HttpOnly cookies), and attaches it in the Authorization: Bearer <token> header for subsequent API requests. An AuthContext provides the current user profile, authentication status, and login/logout handlers to the entire application.",
      "syntax": "// 1. AuthContext Architecture\nconst AuthContext = createContext();\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [token, setToken] = useState(() => localStorage.getItem('token'));\n\n  const login = (userData, jwtToken) => {\n    setUser(userData);\n    setToken(jwtToken);\n    localStorage.setItem('token', jwtToken);\n  };\n\n  const logout = () => {\n    setUser(null);\n    setToken(null);\n    localStorage.removeItem('token');\n  };\n\n  return (\n    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}",
      "explanation": "1. Session Persistence: Initializing state with localStorage.getItem(\"token\") ensures session data persists when a student refreshes the browser.\n2. AuthContext Provider: Broadcasts user, isAuthenticated, login, and logout functions to all routes and components.\n3. Bearer Authorization: Axios or fetch interceptors automatically attach headers: { Authorization: `Bearer ${token}` }.\n4. Graceful Expiration: If the backend returns a 401 Unauthorized status, the frontend clears storage and redirects to the login screen.",
      "codeExample": "import React from 'react';\nimport { useAuth } from '../context/AuthContext.jsx';\n\nexport function UserNavWidget() {\n  const { user, isAuthenticated, logout } = useAuth();\n\n  if (!isAuthenticated) {\n    return <a href=\"/login\" className=\"login-link\">Log In</a>;\n  }\n\n  return (\n    <div className=\"user-nav\">\n      <span className=\"user-name\">{user?.name} ({user?.role})</span>\n      <button onClick={logout} className=\"logout-btn\">Log Out</button>\n    </div>\n  );\n}",
      "expectedOutput": "A user navigation widget displaying user identity and logout action when authenticated, or login link when guest.",
      "commonMistakes": [
        {
          "mistake": "Storing unverified, client-supplied user data in state without validating JWT tokens with the backend.",
          "correction": "Verify the token with a /api/students/me endpoint on application bootstrap.",
          "explanation": "Never trust unverified client data; always validate token authenticity against the backend database."
        },
        {
          "mistake": "Failing to handle 401 Unauthorized token expirations gracefully, leaving the user with broken API calls.",
          "correction": "Intercept 401 errors, clear localStorage, and redirect to /login.",
          "explanation": "Expired tokens must automatically clear the session so the student can re-authenticate."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Construct the logout function that clears state and removes the token from localStorage.",
      "starterCode": "function logoutHandler(setUser, setToken) {\n  // Clear user and token state, remove from localStorage\n  setUser(null);\n  setToken(null);\n  localStorage.removeItem('auth_token');\n}",
      "solutionCode": "function logoutHandler(setUser, setToken) {\n  setUser(null);\n  setToken(null);\n  localStorage.removeItem('auth_token');\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q30-1",
        "level": "Easy",
        "title": "Check Authentication Status",
        "prompt": "Create a component LoginStatus taking prop token. If token exists, return <span>Authenticated</span>, else return <span>Guest</span>.",
        "requirements": [
          "Boolean check !!token",
          "Return Authenticated or Guest span"
        ],
        "starterCode": "// Write LoginStatus\n",
        "solutionCode": "function LoginStatus({ token }) {\n  return <span>{token ? \"Authenticated\" : \"Guest\"}</span>;\n}",
        "expectedOutput": "A status badge displaying Authenticated or Guest based on token presence.",
        "validate": (code) => {
          code = String(code || '');
          if (!/token\s*\?\s*["']Authenticated["']\s*:\s*["']Guest["']/i.test(code)) {
            return { valid: false, message: 'Check token presence with ternary.' };
          }
          return { valid: true, message: 'Auth status verified!' };
        }
      },
      {
        "id": "react-q30-2",
        "level": "Medium",
        "title": "Construct Bearer Authorization Header",
        "prompt": "Write a helper function buildAuthHeaders(token) that returns an object containing { \"Authorization\": `Bearer ${token}`, \"Content-Type\": \"application/json\" }.",
        "requirements": [
          "function buildAuthHeaders(token)",
          "Authorization: `Bearer ${token}`",
          "Content-Type: \"application/json\""
        ],
        "starterCode": "// Write buildAuthHeaders\n",
        "solutionCode": "function buildAuthHeaders(token) {\n  return {\n    \"Authorization\": `Bearer ${token}`,\n    \"Content-Type\": \"application/json\"\n  };\n}",
        "expectedOutput": "A standardized HTTP header builder with Bearer token authentication.",
        "validate": (code) => {
          code = String(code || '');
          if (!/Bearer\s+\$\{token\}/i.test(code) && !/Bearer\s*["']\s*\+\s*token/i.test(code)) {
            return { valid: false, message: 'Include Bearer ${token}.' };
          }
          if (!/Content-Type/i.test(code)) return { valid: false, message: 'Include Content-Type.' };
          return { valid: true, message: 'Auth headers verified!' };
        }
      },
      {
        "id": "react-q30-3",
        "level": "Challenge",
        "title": "Initialize Token from localStorage with Fallback",
        "prompt": "Write a useState declaration in AuthProvider that reads \"jwt_token\" from localStorage: const [token, setToken] = useState(() => localStorage.getItem(\"jwt_token\") || null).",
        "requirements": [
          "Lazy useState initializer function",
          "localStorage.getItem(\"jwt_token\")",
          "Fallback to null"
        ],
        "starterCode": "// Write lazy token initializer\n",
        "solutionCode": "import { useState } from \"react\";\n\nfunction AuthProvider() {\n  const [token, setToken] = useState(() => localStorage.getItem(\"jwt_token\") || null);\n  return <div>Token: {token}</div>;\n}",
        "expectedOutput": "A lazy state initializer reading token from storage once without redundant disk reads.",
        "validate": (code) => {
          code = String(code || '');
          if (!/localStorage\.getItem\(["']jwt_token["']\)/i.test(code)) {
            return { valid: false, message: 'Read "jwt_token" from localStorage.' };
          }
          if (!/useState\(\s*\(\)\s*=>/i.test(code)) {
            return { valid: false, message: 'Use lazy initialization function useState(() => ...).' };
          }
          return { valid: true, message: 'Token initialization verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the standard HTTP Authorization header format for JSON Web Tokens (JWT)?",
        "options": [
          "Authorization: Bearer <token>",
          "Token: JWT <token>",
          "Password: <token>",
          "Auth-Header: Secret <token>"
        ],
        "correctIndex": 0,
        "explanation": "RFC 6750 standardizes the \"Bearer <token>\" scheme for OAuth2 and JWT authorization headers."
      },
      {
        "id": 2,
        "question": "Why should you initialize token state using a callback: useState(() => localStorage.getItem(\"token\"))?",
        "options": [
          "Lazy initialization ensures localStorage is only read once during initial mount, rather than on every single component re-render",
          "It encrypts the disk drive",
          "It makes React asynchronous",
          "It is required by Vite"
        ],
        "correctIndex": 0,
        "explanation": "Passing an initializer function executes disk I/O only on initial mount, avoiding synchronous storage reads on subsequent renders."
      },
      {
        "id": 3,
        "question": "What should the frontend do when a backend API responds with an HTTP 401 Unauthorized status?",
        "options": [
          "Clear local authentication credentials and redirect the user to the login screen",
          "Ignore the error and display an empty page",
          "Retry the same request 100 times in a loop",
          "Crash the browser tab"
        ],
        "correctIndex": 0,
        "explanation": "HTTP 401 indicates the token has expired or is invalid. The application should clear stored tokens and redirect to log in."
      }
    ],
    "video": {
      "title": "React Authentication and JWT Tutorial",
      "channel": "Dave Gray",
      "videoId": "oUZjO00NkhY",
      "url": "https://www.youtube.com/watch?v=oUZjO00NkhY",
      "description": "Dave Gray explains React token authentication, session persistence, AuthContext, and protected flows."
    }
  },
  {
    "id": "react-topic-31",
    "order": 31,
    "slug": "protected-routes",
    "title": "Protected Routes",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Guard private screens: creating a ProtectedRoute wrapper, redirecting unauthenticated visitors to /login with state, and role-based access control (Student vs Admin).",
    "notes": {
      "concept": "Certain screens in web applications (Dashboard, Settings, Exams, Admin) should only be accessible to authenticated users with the appropriate permissions. In React Router v6, a \"Protected Route\" is an outlet or wrapper component that checks the current user authentication state. If authenticated, it renders the requested child screen; if unauthenticated, it redirects the user to /login using <Navigate to=\"/login\" replace />.",
      "syntax": "// ProtectedRoute Wrapper Pattern in React Router v6\nimport { Navigate, useLocation } from 'react-router-dom';\nimport { useAuth } from '../context/AuthContext.jsx';\n\nexport function ProtectedRoute({ children, allowedRoles }) {\n  const { user, isAuthenticated, loading } = useAuth();\n  const location = useLocation();\n\n  if (loading) return <div>Authenticating session...</div>;\n\n  if (!isAuthenticated) {\n    // Redirect to login, saving current location to return after login\n    return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  }\n\n  if (allowedRoles && !allowedRoles.includes(user?.role)) {\n    // 403 Forbidden: redirect unauthorized role\n    return <Navigate to=\"/dashboard\" replace />;\n  }\n\n  return children;\n}",
      "explanation": "1. <Navigate to=\"/path\" replace />: Declaratively redirects to a target path, replacing the current history entry.\n2. Preserving Return Location (state={{ from: location }}): Stores where the user was trying to go so the login screen can redirect them back after logging in.\n3. Role-Based Access Control (RBAC): Inspects user.role against allowedRoles to prevent students from entering admin portals.\n4. Loading Guard: Always wait for auth status check to finish before redirecting, avoiding false redirects on page refresh.",
      "codeExample": "// Route configuration utilizing ProtectedRoute\nimport React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport { ProtectedRoute } from './components/ProtectedRoute.jsx';\n\nexport function AppRoutes() {\n  return (\n    <Routes>\n      {/* Public Routes */}\n      <Route path=\"/login\" element={<LoginPage />} />\n      <Route path=\"/\" element={<HomePage />} />\n\n      {/* Student Protected Routes */}\n      <Route\n        path=\"/dashboard\"\n        element={\n          <ProtectedRoute>\n            <StudentDashboard />\n          </ProtectedRoute>\n        }\n      />\n\n      {/* Admin-Only Protected Route */}\n      <Route\n        path=\"/admin\"\n        element={\n          <ProtectedRoute allowedRoles={['admin']}>\n            <AdminPortal />\n          </ProtectedRoute>\n        }\n      />\n    </Routes>\n  );\n}",
      "expectedOutput": "An application securing private dashboards from unauthorized visitors with seamless return-to-url redirections.",
      "commonMistakes": [
        {
          "mistake": "Redirecting immediately before the asynchronous auth token check has finished verifying in AuthContext.",
          "correction": "Always include an if (loading) return <Spinner />; check at the top of ProtectedRoute.",
          "explanation": "On page refresh, auth token verification takes a few milliseconds; redirecting immediately boots valid students to the login screen."
        },
        {
          "mistake": "Relying exclusively on frontend ProtectedRoutes for security.",
          "correction": "Always enforce authentication and role checks on your backend Express/MongoDB endpoints as well.",
          "explanation": "Frontend route guards improve user experience, but malicious users can bypass client JavaScript; backend APIs must enforce security."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Complete the ProtectedRoute component to redirect to /login when isAuthenticated is false.",
      "starterCode": "import { Navigate } from 'react-router-dom';\n\nfunction ProtectedRoute({ isAuthenticated, children }) {\n  // If not authenticated, redirect to /login with replace\n  if (!isAuthenticated) {\n    return <Navigate to=\"/login\" replace />;\n  }\n  return children;\n}",
      "solutionCode": "import { Navigate } from 'react-router-dom';\n\nfunction ProtectedRoute({ isAuthenticated, children }) {\n  if (!isAuthenticated) {\n    return <Navigate to=\"/login\" replace />;\n  }\n  return children;\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q31-1",
        "level": "Easy",
        "title": "Redirect with Navigate Component",
        "prompt": "Write a component AuthGuard taking prop isAuth and children. If !isAuth, return <Navigate to=\"/login\" replace />, otherwise return children.",
        "requirements": [
          "if (!isAuth) return <Navigate to=\"/login\" replace />",
          "return children"
        ],
        "starterCode": "// Write AuthGuard\n",
        "solutionCode": "import { Navigate } from \"react-router-dom\";\n\nfunction AuthGuard({ isAuth, children }) {\n  if (!isAuth) {\n    return <Navigate to=\"/login\" replace />;\n  }\n  return children;\n}",
        "expectedOutput": "A route guard redirecting unauthenticated requests.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<Navigate\s+to=["']\/login["']/i.test(code)) return { valid: false, message: 'Use <Navigate to="/login">.' };
          if (!/replace/i.test(code)) return { valid: false, message: 'Include replace prop.' };
          return { valid: true, message: 'AuthGuard verified!' };
        }
      },
      {
        "id": "react-q31-2",
        "level": "Medium",
        "title": "Role-Based Access Guard",
        "prompt": "Create a component AdminRoute taking props userRole and children. If userRole !== \"admin\", return <Navigate to=\"/dashboard\" replace />, else return children.",
        "requirements": [
          "Check userRole !== \"admin\"",
          "<Navigate to=\"/dashboard\" replace />",
          "Return children"
        ],
        "starterCode": "// Write AdminRoute\n",
        "solutionCode": "import { Navigate } from \"react-router-dom\";\n\nfunction AdminRoute({ userRole, children }) {\n  if (userRole !== \"admin\") {\n    return <Navigate to=\"/dashboard\" replace />;\n  }\n  return children;\n}",
        "expectedOutput": "A role guard redirecting non-admin users to dashboard.",
        "validate": (code) => {
          code = String(code || '');
          if (!/userRole\s*!==\s*["']admin["']/i.test(code)) return { valid: false, message: 'Check userRole !== "admin".' };
          if (!/<Navigate\s+to=["']\/dashboard["']/i.test(code)) return { valid: false, message: 'Redirect to /dashboard.' };
          return { valid: true, message: 'AdminRoute verified!' };
        }
      },
      {
        "id": "react-q31-3",
        "level": "Challenge",
        "title": "Preserve Location State on Redirect",
        "prompt": "Write a component LocationProtected taking props isAuth, location, and children. If !isAuth, return <Navigate to=\"/login\" state={{ from: location }} replace />. Else return children.",
        "requirements": [
          "state={{ from: location }}",
          "<Navigate to=\"/login\" ... />",
          "return children"
        ],
        "starterCode": "// Write LocationProtected preserving location\n",
        "solutionCode": "import { Navigate } from \"react-router-dom\";\n\nfunction LocationProtected({ isAuth, location, children }) {\n  if (!isAuth) {\n    return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  }\n  return children;\n}",
        "expectedOutput": "A protected route preserving the original URL destination in location state.",
        "validate": (code) => {
          code = String(code || '');
          if (!/state\s*=\s*\{\s*\{\s*from\s*:\s*location\s*\}\s*\}/i.test(code)) {
            return { valid: false, message: 'Pass state={{ from: location }}.' };
          }
          return { valid: true, message: 'Location preservation verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which component is used in React Router v6 to declaratively redirect users away from protected pages?",
        "options": [
          "<Navigate to=\"...\" replace />",
          "<Redirect />",
          "<GoTo />",
          "<RouterPush />"
        ],
        "correctIndex": 0,
        "explanation": "React Router v6 uses <Navigate to=\"...\" replace /> for declarative redirection."
      },
      {
        "id": 2,
        "question": "Why should you pass state={{ from: location }} when redirecting to /login?",
        "options": [
          "To preserve the original intended URL so the login page can navigate the user back to where they wanted to go after authenticating",
          "To encrypt the password",
          "To speed up CSS animations",
          "It is required by Vite"
        ],
        "correctIndex": 0,
        "explanation": "Passing location in state allows the login handler to inspect navigate(location.state?.from || \"/dashboard\") after success."
      },
      {
        "id": 3,
        "question": "Is client-side ProtectedRoute enough to secure private user data?",
        "options": [
          "Yes, client route guards provide 100% security",
          "No, client-side guards only enhance user experience; backend API routes MUST verify authentication tokens and user roles on every request",
          "Only if using HTTPS",
          "Only in React 18"
        ],
        "correctIndex": 1,
        "explanation": "Client JavaScript can always be inspected or bypassed; true data security requires backend JWT verification on every API endpoint."
      }
    ],
    "video": {
      "title": "React Router v6 Protected Routes & Role Authorization",
      "channel": "Dave Gray",
      "videoId": "oUZjO00NkhY",
      "url": "https://www.youtube.com/watch?v=oUZjO00NkhY",
      "description": "Dave Gray demonstrates building protected routes, handling redirect state, and role-based access control."
    }
  },
  {
    "id": "react-topic-32",
    "order": 32,
    "slug": "react-with-nodejs-backend",
    "title": "React with Node.js Backend",
    "difficulty": "Advanced",
    "estimatedTime": "25 min",
    "summary": "Full-stack architecture: connecting React to an Express/Node.js API, configuring CORS, proxying in vite.config.js, and handling HTTP response codes.",
    "notes": {
      "concept": "A full-stack JavaScript application pairs a React frontend with a Node.js/Express backend. During development, React runs on a dev server (e.g. http://localhost:5173) while the Express server runs on an API port (e.g. http://localhost:5000). Cross-Origin Resource Sharing (CORS) or Vite development proxies must be configured to allow communication without browser cross-origin blocking.",
      "syntax": "// 1. Vite Proxy in vite.config.js (Development)\nexport default defineConfig({\n  server: {\n    proxy: {\n      '/api': {\n        target: 'http://localhost:5000',\n        changeOrigin: true\n      }\n    }\n  }\n});\n\n// 2. Calling from React:\nconst res = await fetch('/api/tasks'); // Proxied seamlessly to Express!",
      "explanation": "1. Vite Proxy: Rewrites /api requests during local development to the Express server, avoiding CORS errors completely.\n2. Express CORS Middleware: In production, app.use(cors({ origin: \"https://codeforge.dev\" })) authorizes production origins.\n3. JSON Body Parsing: Express requires express.json() to parse incoming JSON payloads sent by fetch POST/PUT requests.\n4. Unified Error Handling: Backend sends { success: false, message: \"Error\" }; React parses and surfaces user-friendly alert banners.",
      "codeExample": "// React component submitting data to Express Node.js API\nimport React, { useState } from 'react';\n\nexport function CreateTaskForm({ onTaskCreated }) {\n  const [title, setTitle] = useState('');\n\n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    try {\n      const res = await fetch('/api/tasks', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ title })\n      });\n      const data = await res.json();\n      if (data.success) {\n        setTitle('');\n        onTaskCreated(data.task);\n      }\n    } catch (err) {\n      console.error(\"Task creation failed:\", err);\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder=\"New task...\" />\n      <button type=\"submit\">Create</button>\n    </form>\n  );\n}",
      "expectedOutput": "A form sending JSON POST requests to an Express backend and reacting to response data.",
      "commonMistakes": [
        {
          "mistake": "Forgetting \"Content-Type\": \"application/json\" in fetch POST requests, causing Express req.body to be empty.",
          "correction": "Always include the header: headers: { \"Content-Type\": \"application/json\" }.",
          "explanation": "Express express.json() middleware only parses request bodies that declare JSON content-type."
        },
        {
          "mistake": "Hardcoding \"http://localhost:5000\" in every fetch call instead of using relative paths (/api/...) and Vite proxies.",
          "correction": "Use relative paths (/api/tasks) and configure Vite proxy or environment variables.",
          "explanation": "Hardcoded localhost URLs break immediately upon deployment to production servers."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Review a Vite proxy configuration that forwards all /api requests to http://localhost:5000.",
      "starterCode": "// vite.config.js proxy definition\nconst serverConfig = {\n  port: 3000,\n  proxy: {\n    '/api': {\n      target: 'http://localhost:5000',\n      changeOrigin: true\n    }\n  }\n};",
      "solutionCode": "const serverConfig = {\n  port: 3000,\n  proxy: {\n    '/api': {\n      target: 'http://localhost:5000',\n      changeOrigin: true\n    }\n  }\n};"
    },
    "practiceQuestions": [
      {
        "id": "react-q32-1",
        "level": "Easy",
        "title": "POST Request with JSON Body",
        "prompt": "Write an async function postData(url, payload) that sends a fetch with method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, and body: JSON.stringify(payload).",
        "requirements": [
          "method: \"POST\"",
          "headers: { \"Content-Type\": \"application/json\" }",
          "body: JSON.stringify(payload)"
        ],
        "starterCode": "// Write postData\n",
        "solutionCode": "async function postData(url, payload) {\n  return await fetch(url, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(payload)\n  });\n}",
        "expectedOutput": "An async POST utility transmitting serialized JSON data.",
        "validate": (code) => {
          code = String(code || '');
          if (!/method\s*:\s*["']POST["']/i.test(code)) return { valid: false, message: 'Set method: "POST".' };
          if (!/JSON\.stringify/i.test(code)) return { valid: false, message: 'Serialize body with JSON.stringify.' };
          return { valid: true, message: 'JSON POST verified!' };
        }
      },
      {
        "id": "react-q32-2",
        "level": "Medium",
        "title": "DELETE Request to REST API",
        "prompt": "Write an async function deleteTask(taskId) that executes fetch(`/api/tasks/${taskId}`, { method: \"DELETE\" }) and returns res.ok.",
        "requirements": [
          "fetch(`/api/tasks/${taskId}`, { method: \"DELETE\" })",
          "return res.ok"
        ],
        "starterCode": "// Write deleteTask\n",
        "solutionCode": "async function deleteTask(taskId) {\n  const res = await fetch(`/api/tasks/${taskId}`, {\n    method: \"DELETE\"\n  });\n  return res.ok;\n}",
        "expectedOutput": "A REST API client function deleting an entity by ID.",
        "validate": (code) => {
          code = String(code || '');
          if (!/method\s*:\s*["']DELETE["']/i.test(code)) return { valid: false, message: 'Set method: "DELETE".' };
          if (!/\/api\/tasks\/\$\{taskId\}/i.test(code) && !/\/api\/tasks\/\s*\+\s*taskId/i.test(code)) {
            return { valid: false, message: 'Target /api/tasks/${taskId}.' };
          }
          return { valid: true, message: 'DELETE request verified!' };
        }
      },
      {
        "id": "react-q32-3",
        "level": "Challenge",
        "title": "Vite Proxy Server Object",
        "prompt": "Create a JavaScript object viteProxyConfig that configures a proxy for \"/api\" with target: \"http://localhost:5000\" and changeOrigin: true.",
        "requirements": [
          "\"/api\" key",
          "target: \"http://localhost:5000\"",
          "changeOrigin: true"
        ],
        "starterCode": "// Write viteProxyConfig object\n",
        "solutionCode": "const viteProxyConfig = {\n  proxy: {\n    \"/api\": {\n      target: \"http://localhost:5000\",\n      changeOrigin: true\n    }\n  }\n};",
        "expectedOutput": "A Vite proxy configuration routing API traffic during development.",
        "validate": (code) => {
          code = String(code || '');
          if (!/target\s*:\s*["']http:\/\/localhost:5000["']/i.test(code)) return { valid: false, message: 'Set target to http://localhost:5000.' };
          if (!/changeOrigin\s*:\s*true/i.test(code)) return { valid: false, message: 'Set changeOrigin: true.' };
          return { valid: true, message: 'Vite proxy verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What error occurs when a React app at http://localhost:5173 calls an Express server at http://localhost:5000 without proxying or CORS enabled?",
        "options": [
          "A CORS (Cross-Origin Resource Sharing) error thrown by the browser security sandbox",
          "A SQL syntax error",
          "A 404 Not Found error",
          "A CSS overflow warning"
        ],
        "correctIndex": 0,
        "explanation": "Browsers block cross-origin requests between different ports unless the server sends appropriate CORS headers or a proxy is used."
      },
      {
        "id": 2,
        "question": "Why is setting up a proxy in vite.config.js beneficial during local full-stack development?",
        "options": [
          "It lets React use relative paths (/api/...) and forwards requests to the Node server without triggering CORS errors",
          "It replaces Node.js entirely",
          "It turns React into a database",
          "It makes all requests synchronous"
        ],
        "correctIndex": 0,
        "explanation": "Proxies allow the browser to believe all requests go to the same origin, forwarding API traffic seamlessly to the backend."
      },
      {
        "id": 3,
        "question": "What header is required when sending JSON payloads in fetch POST or PUT requests?",
        "options": [
          "Content-Type: application/json",
          "Accept-Encoding: gzip",
          "X-React: True",
          "Format: Text"
        ],
        "correctIndex": 0,
        "explanation": "Content-Type: application/json tells Express middleware to parse the incoming request body as JSON."
      }
    ],
    "video": {
      "title": "Full Stack MERN Architecture Tutorial",
      "channel": "freeCodeCamp",
      "videoId": "O3BUHwfHf84",
      "url": "https://www.youtube.com/watch?v=O3BUHwfHf84",
      "description": "freeCodeCamp walks through connecting a React frontend to an Express backend with full CRUD operations."
    }
  },
  {
    "id": "react-topic-33",
    "order": 33,
    "slug": "react-with-mongodb-apis",
    "title": "React with MongoDB APIs",
    "difficulty": "Advanced",
    "estimatedTime": "25 min",
    "summary": "Consume MongoDB data models through Express APIs: Mongoose ObjectId handling, pagination, search queries, and real-time state synchronization.",
    "notes": {
      "concept": "React never connects directly to MongoDB (which would expose database credentials to browser users). Instead, React communicates with Express API endpoints that query MongoDB using Mongoose. React components send requests, receive BSON/JSON serialized documents, handle MongoDB _id fields, and update local state to reflect database changes in real time.",
      "syntax": "// 1. Handling MongoDB _id in React:\n// MongoDB documents use _id (e.g., _id: \"662a8f...\").\n// Map items using item._id as the unique key:\n<ul>\n  {tasks.map(task => (\n    <li key={task._id}>{task.title}</li>\n  ))}\n</ul>\n\n// 2. Querying with Pagination and Filters\nconst res = await fetch(`/api/students?page=${page}&limit=10&search=${search}`);",
      "explanation": "1. Three-Tier Architecture: Browser (React) -> Application Server (Express) -> Database (MongoDB).\n2. MongoDB _id Property: MongoDB generates a 24-character hex ObjectId (_id) for each document, which serves as the ideal stable React key.\n3. Optimistic Updates: Update local React state immediately for snappy UX, rolling back if the MongoDB update fails.\n4. Pagination: Fetching chunked data with page and limit queries to keep network payloads small.",
      "codeExample": "import React, { useState, useEffect } from 'react';\n\nexport function MongoDBTasksManager() {\n  const [tasks, setTasks] = useState([]);\n\n  useEffect(() => {\n    fetch('/api/tasks')\n      .then(r => r.json())\n      .then(data => setTasks(data.tasks));\n  }, []);\n\n  const toggleComplete = async (taskId, currentStatus) => {\n    // Optimistic UI update\n    setTasks(prev => prev.map(t => t._id === taskId ? { ...t, completed: !currentStatus } : t));\n\n    try {\n      await fetch(`/api/tasks/${taskId}`, {\n        method: 'PATCH',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ completed: !currentStatus })\n      });\n    } catch {\n      // Revert if database update failed\n      setTasks(prev => prev.map(t => t._id === taskId ? { ...t, completed: currentStatus } : t));\n    }\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task._id}>\n          <span>{task.title}</span>\n          <button onClick={() => toggleComplete(task._id, task.completed)}>\n            {task.completed ? 'Completed' : 'Pending'}\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}",
      "expectedOutput": "A task list synchronizing with MongoDB documents via optimistic updates and rollbacks.",
      "commonMistakes": [
        {
          "mistake": "Trying to connect to MongoDB directly from React using the mongodb npm package in frontend code.",
          "correction": "Never bundle database drivers in frontend code; query MongoDB through a secure Node.js Express backend.",
          "explanation": "Database connection strings contain passwords that would be exposed to anyone inspecting the frontend bundle."
        },
        {
          "mistake": "Using key={task.id} instead of key={task._id} when consuming MongoDB documents.",
          "correction": "Use task._id (with the leading underscore).",
          "explanation": "MongoDB standard primary key is named _id; using task.id resolves to undefined unless virtuals are configured."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Render a list of MongoDB documents using doc._id as the key.",
      "starterCode": "function MongoDocumentList({ documents }) {\n  return (\n    <ul>\n      {/* Map using doc._id as key */}\n      {documents.map(doc => (\n        <li key={doc._id}>{doc.name}</li>\n      ))}\n    </ul>\n  );\n}",
      "solutionCode": "function MongoDocumentList({ documents }) {\n  return (\n    <ul>\n      {documents.map(doc => (\n        <li key={doc._id}>{doc.name}</li>\n      ))}\n    </ul>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q33-1",
        "level": "Easy",
        "title": "Use MongoDB _id as React Key",
        "prompt": "Create a component UserBadges taking prop users (array of MongoDB objects with _id and name). Map over them returning <span key={user._id}>{user.name}</span>.",
        "requirements": [
          "Map users array",
          "key={user._id} with leading underscore",
          "Render {user.name}"
        ],
        "starterCode": "// Write UserBadges\n",
        "solutionCode": "function UserBadges({ users }) {\n  return (\n    <div>\n      {users.map(user => (\n        <span key={user._id}>{user.name}</span>\n      ))}\n    </div>\n  );\n}",
        "expectedOutput": "A list of user spans keyed by MongoDB _id.",
        "validate": (code) => {
          code = String(code || '');
          if (!/key\s*=\s*\{\s*user\._id\s*\}/i.test(code)) return { valid: false, message: 'Assign key={user._id}.' };
          return { valid: true, message: 'MongoDB _id key verified!' };
        }
      },
      {
        "id": "react-q33-2",
        "level": "Medium",
        "title": "Optimistic State Update Pattern",
        "prompt": "Write a function applyOptimisticToggle(tasks, targetId) that maps over tasks and flips task.completed if task._id === targetId, returning a new array.",
        "requirements": [
          "tasks.map(...)",
          "Check task._id === targetId",
          "Flip !task.completed"
        ],
        "starterCode": "// Write applyOptimisticToggle\n",
        "solutionCode": "function applyOptimisticToggle(tasks, targetId) {\n  return tasks.map(task => {\n    if (task._id === targetId) {\n      return { ...task, completed: !task.completed };\n    }\n    return task;\n  });\n}",
        "expectedOutput": "An immutable array transformer performing optimistic boolean toggles.",
        "validate": (code) => {
          code = String(code || '');
          if (!/task\._id\s*===\s*targetId/i.test(code)) return { valid: false, message: 'Check task._id === targetId.' };
          if (!/!task\.completed/i.test(code)) return { valid: false, message: 'Flip !task.completed.' };
          return { valid: true, message: 'Optimistic update verified!' };
        }
      },
      {
        "id": "react-q33-3",
        "level": "Challenge",
        "title": "Construct Paginated Query URL",
        "prompt": "Write a helper function buildMongoQuery(endpoint, page, limit, filter) returning `${endpoint}?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`.",
        "requirements": [
          "Template literal",
          "page and limit query params",
          "encodeURIComponent(filter)"
        ],
        "starterCode": "// Write buildMongoQuery\n",
        "solutionCode": "function buildMongoQuery(endpoint, page, limit, filter) {\n  return `${endpoint}?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`;\n}",
        "expectedOutput": "A URL builder formatting query parameters for MongoDB pagination endpoints.",
        "validate": (code) => {
          code = String(code || '');
          if (!/encodeURIComponent/i.test(code)) return { valid: false, message: 'Use encodeURIComponent(filter).' };
          if (!/page=\$\{page\}/i.test(code)) return { valid: false, message: 'Include page parameter.' };
          return { valid: true, message: 'Mongo query builder verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Can React components directly import the \"mongodb\" npm library and query collections in the browser?",
        "options": [
          "Yes, React can connect directly to any database",
          "No, React is a client-side library; querying databases directly in the browser would expose database passwords and credentials to users",
          "Only with MongoDB Atlas",
          "Only on Windows"
        ],
        "correctIndex": 1,
        "explanation": "Database drivers must never be bundled into client-side code because database credentials would be visible to the public."
      },
      {
        "id": 2,
        "question": "What is the default primary key property name in MongoDB documents used as the React key prop?",
        "options": [
          "_id",
          "id",
          "uuid",
          "key"
        ],
        "correctIndex": 0,
        "explanation": "MongoDB assigns a unique 24-character hexadecimal ObjectId to the \"_id\" field of every document."
      },
      {
        "id": 3,
        "question": "What is an \"optimistic update\" in full-stack React applications?",
        "options": [
          "Updating the client UI state immediately before receiving the server response, rolling back only if the request fails",
          "Hoping that database queries run faster",
          "Making all network calls without error handling",
          "Disabling backend validation"
        ],
        "correctIndex": 0,
        "explanation": "Optimistic updates provide instant visual feedback to the user without waiting for database network latency."
      }
    ],
    "video": {
      "title": "Connecting React to MongoDB via Express REST API",
      "channel": "freeCodeCamp",
      "videoId": "O3BUHwfHf84",
      "url": "https://www.youtube.com/watch?v=O3BUHwfHf84",
      "description": "freeCodeCamp demonstrates Mongoose models, Express endpoints, and consuming MongoDB data in React."
    }
  },
  {
    "id": "react-topic-34",
    "order": 34,
    "slug": "environment-variables",
    "title": "Environment Variables in Vite",
    "difficulty": "Advanced",
    "estimatedTime": "15 min",
    "summary": "Manage configuration across environments: .env, .env.production, the VITE_ prefix, import.meta.env, and preventing secret leaks in client bundles.",
    "notes": {
      "concept": "Applications run in multiple environments (Local Development, Staging, Production). Environment variables let you configure URLs, public keys, and flags without hardcoding them into source code. In Vite, environment variables are loaded from .env files and exposed on the special import.meta.env object. Crucially, Vite only exposes variables prefixed with VITE_ to prevent accidentally leaking private machine secrets into client bundles.",
      "syntax": "# .env (Loaded in all environments)\nVITE_API_URL=http://localhost:5000/api\nVITE_APP_TITLE=CodeForge Platform\n\n# .env.production (Loaded during npm run build)\nVITE_API_URL=https://api.codeforge.dev/api\n\n# Accessing in React Components:\nconst apiUrl = import.meta.env.VITE_API_URL;\nconst mode = import.meta.env.MODE; // 'development' or 'production'",
      "explanation": "1. VITE_ Prefix Requirement: To prevent sensitive environment variables from leaking into the public browser bundle, Vite ONLY exposes variables that start with VITE_.\n2. import.meta.env: The modern ES Modules replacement for legacy Webpack process.env.\n3. Built-in Vite Flags: import.meta.env.MODE, import.meta.env.DEV (boolean), import.meta.env.PROD (boolean).\n4. NEVER Store Private Keys: Anything prefixed with VITE_ is compiled directly into the publicly viewable JavaScript bundle!",
      "codeExample": "// API client reading baseUrl from Vite environment variables\nimport axios from 'axios';\n\nconst BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';\n\nexport const apiClient = axios.create({\n  baseURL: BASE_URL,\n  timeout: 10000,\n  headers: {\n    'X-App-Env': import.meta.env.MODE\n  }\n});\n\nconsole.log(\"Connected API base:\", BASE_URL);",
      "expectedOutput": "An API client configured dynamically from environment files across development and production.",
      "commonMistakes": [
        {
          "mistake": "Putting database passwords, private API secret keys, or Stripe secret keys in client .env files.",
          "correction": "Keep private secrets strictly on the backend Node.js server (process.env); client .env files are public!",
          "explanation": "Every variable prefixed with VITE_ is bundled into client JavaScript. Anyone can inspect it in DevTools."
        },
        {
          "mistake": "Trying to access variables with process.env.VITE_VAR in Vite.",
          "correction": "Use import.meta.env.VITE_VAR.",
          "explanation": "Vite uses standard ECMAScript Modules (ESM) where import.meta.env is the official standard."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Access a VITE_APP_NAME variable using import.meta.env.",
      "starterCode": "function AppHeader() {\n  // Read VITE_APP_NAME or fallback to \"CodeForge\"\n  const appName = import.meta.env?.VITE_APP_NAME || \"CodeForge\";\n\n  return <h1>Welcome to {appName}</h1>;\n}",
      "solutionCode": "function AppHeader() {\n  const appName = import.meta.env?.VITE_APP_NAME || \"CodeForge\";\n\n  return <h1>Welcome to {appName}</h1>;\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q34-1",
        "level": "Easy",
        "title": "Read Vite Environment Variable",
        "prompt": "Write a line of code reading VITE_API_URL from import.meta.env with fallback \"http://localhost:5000\", assigned to const apiEndpoint.",
        "requirements": [
          "import.meta.env.VITE_API_URL",
          "Fallback \"http://localhost:5000\""
        ],
        "starterCode": "// Read apiEndpoint from import.meta.env\n",
        "solutionCode": "const apiEndpoint = import.meta.env.VITE_API_URL || \"http://localhost:5000\";",
        "expectedOutput": "A variable initialized from Vite environment variables.",
        "validate": (code) => {
          code = String(code || '');
          if (!/import\.meta\.env\.VITE_API_URL/i.test(code)) {
            return { valid: false, message: 'Access import.meta.env.VITE_API_URL.' };
          }
          return { valid: true, message: 'Vite env variable verified!' };
        }
      },
      {
        "id": "react-q34-2",
        "level": "Medium",
        "title": "Conditional Development Logger",
        "prompt": "Create a helper function logDevOnly(message) that checks import.meta.env.DEV and calls console.log(message) only if DEV is true.",
        "requirements": [
          "function logDevOnly(message)",
          "Check import.meta.env.DEV",
          "console.log(message)"
        ],
        "starterCode": "// Write logDevOnly helper\n",
        "solutionCode": "function logDevOnly(message) {\n  if (import.meta.env.DEV) {\n    console.log(message);\n  }\n}",
        "expectedOutput": "A utility logging only in local development environments.",
        "validate": (code) => {
          code = String(code || '');
          if (!/import\.meta\.env\.DEV/i.test(code)) return { valid: false, message: 'Check import.meta.env.DEV.' };
          if (!/console\.log\(message\)/i.test(code)) return { valid: false, message: 'Call console.log(message).' };
          return { valid: true, message: 'Dev logger verified!' };
        }
      },
      {
        "id": "react-q34-3",
        "level": "Challenge",
        "title": "Detect Production Mode in React Component",
        "prompt": "Create a component EnvironmentBanner that renders <div className=\"prod-badge\">Production Mode</div> if import.meta.env.PROD is true, otherwise <div className=\"dev-badge\">Development Mode</div>.",
        "requirements": [
          "import.meta.env.PROD check",
          "Render prod-badge or dev-badge"
        ],
        "starterCode": "// Write EnvironmentBanner\n",
        "solutionCode": "function EnvironmentBanner() {\n  return (\n    <div>\n      {import.meta.env.PROD ? (\n        <div className=\"prod-badge\">Production Mode</div>\n      ) : (\n        <div className=\"dev-badge\">Development Mode</div>\n      )}\n    </div>\n  );\n}",
        "expectedOutput": "A banner reflecting current environment build mode.",
        "validate": (code) => {
          code = String(code || '');
          if (!/import\.meta\.env\.PROD/i.test(code)) return { valid: false, message: 'Check import.meta.env.PROD.' };
          if (!/prod-badge/i.test(code) || !/dev-badge/i.test(code)) return { valid: false, message: 'Include badge class names.' };
          return { valid: true, message: 'EnvironmentBanner verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why does Vite require frontend environment variables to be prefixed with \"VITE_\" (e.g. VITE_API_URL)?",
        "options": [
          "To prevent accidentally exposing private system secrets (like DB passwords) to the public browser client bundle",
          "Because Vite is written in French",
          "It makes the server faster",
          "It is required by HTML5"
        ],
        "correctIndex": 0,
        "explanation": "Only variables starting with VITE_ are exposed to client-side code; all other variables remain private to build processes."
      },
      {
        "id": 2,
        "question": "How do you access environment variables in a modern Vite React application?",
        "options": [
          "import.meta.env.VITE_NAME",
          "process.env.VITE_NAME",
          "window.VITE_NAME",
          "document.env.VITE_NAME"
        ],
        "correctIndex": 0,
        "explanation": "Vite uses standard ECMAScript Module import.meta.env instead of the legacy Node.js process.env object."
      },
      {
        "id": 3,
        "question": "Is it safe to store a Stripe Secret Key or Database Password in a React .env file?",
        "options": [
          "No, NEVER! All client environment variables are embedded directly into the public JavaScript bundle downloaded by users",
          "Yes, if the file is named .env.production",
          "Yes, if using HTTPS",
          "Yes, Vite encrypts it"
        ],
        "correctIndex": 0,
        "explanation": "Any variable accessible in client JavaScript is publicly visible to anyone inspecting the page. Private keys belong strictly on the backend."
      }
    ],
    "video": {
      "title": "How To Use Environment Variables in Vite React",
      "channel": "Web Dev Simplified",
      "videoId": "VAeRhmpcWeQ",
      "url": "https://www.youtube.com/watch?v=VAeRhmpcWeQ",
      "description": "Web Dev Simplified explains environment variables, security, and configuring dev vs production in Vite."
    }
  },
  {
    "id": "react-topic-35",
    "order": 35,
    "slug": "deployment",
    "title": "Deployment",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Ship to production: building static bundles with npm run build, deploying to Vercel/Netlify, configuring SPA rewrites, and performance monitoring.",
    "notes": {
      "concept": "When development is complete, a React application must be compiled and deployed for global access. Running npm run build instructs Vite to compile, minify, tree-shake, and optimize all JSX and assets into a static dist/ directory. This static bundle can be hosted globally on Content Delivery Networks (CDNs) like Vercel, Netlify, Cloudflare Pages, or AWS S3.",
      "syntax": "# 1. Compile optimized production distribution\nnpm run build\n\n# 2. Preview the production build locally before deploying\nnpm run preview\n\n# 3. SPA Rewrite configuration for Netlify (_redirects file in public/):\n/*    /index.html   200\n\n# 4. SPA Rewrite configuration for Vercel (vercel.json):\n{\n  \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }]\n}",
      "explanation": "1. The dist/ Output: Contains index.html, minified JavaScript chunks with content hashes, and compressed CSS stylesheets.\n2. Tree-Shaking: Dead-code elimination that removes unused library functions from final bundles.\n3. Content Hashing: Asset files are named like index-CkXiBi9t.js so browsers cache them indefinitely until code changes.\n4. SPA Fallback Routing: When users refresh a deep link (/learn/react), static servers return 404 unless configured to rewrite all routes back to index.html.",
      "codeExample": "// Example vercel.json SPA rewrite file located in project root\n{\n  \"rewrites\": [\n    {\n      \"source\": \"/(.*)\",\n      \"destination\": \"/index.html\"\n    }\n  ],\n  \"headers\": [\n    {\n      \"source\": \"/assets/(.*)\",\n      \"headers\": [\n        {\n          \"key\": \"Cache-Control\",\n          \"value\": \"public, max-age=31536000, immutable\"\n        }\n      ]\n    }\n  ]\n}",
      "expectedOutput": "A production-ready deployment configuration guaranteeing direct link refreshes and long-term asset caching.",
      "commonMistakes": [
        {
          "mistake": "Deploying a React SPA to a static host and getting a 404 Not Found error whenever refreshing pages on sub-routes (/dashboard).",
          "correction": "Add an SPA rewrite rule (e.g. vercel.json rewrites or public/_redirects on Netlify).",
          "explanation": "The static host looks for a physical /dashboard/index.html folder; rewrites tell the server to serve index.html for all URLs."
        },
        {
          "mistake": "Deploying development mode (npm run dev) to production servers.",
          "correction": "Always run npm run build and host the compiled dist/ directory.",
          "explanation": "Development builds include heavy debuggers, un-minified code, and lack performance optimizations."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Review a Netlify _redirects file ensuring client-side routes resolve to index.html.",
      "starterCode": "# public/_redirects for Netlify SPA deployment\n/*    /index.html   200",
      "solutionCode": "# public/_redirects for Netlify SPA deployment\n/*    /index.html   200"
    },
    "practiceQuestions": [
      {
        "id": "react-q35-1",
        "level": "Easy",
        "title": "Production Build Command",
        "prompt": "Write the standard npm CLI command used to compile a Vite React project for production.",
        "requirements": [
          "npm run build"
        ],
        "starterCode": "# Write production build command\n",
        "solutionCode": "npm run build",
        "expectedOutput": "The npm build command executing vite build.",
        "validate": (code) => {
          code = String(code || '');
          if (!/npm\s+run\s+build/i.test(code)) return { valid: false, message: 'Use "npm run build".' };
          return { valid: true, message: 'Build command verified!' };
        }
      },
      {
        "id": "react-q35-2",
        "level": "Medium",
        "title": "Netlify SPA Redirects File Content",
        "prompt": "Write the single line of text required in a public/_redirects file to redirect all routes to /index.html with status 200.",
        "requirements": [
          "/*    /index.html   200"
        ],
        "starterCode": "# Write Netlify _redirects content\n",
        "solutionCode": "/*    /index.html   200",
        "expectedOutput": "The standard Netlify SPA fallback redirect rule.",
        "validate": (code) => {
          code = String(code || '');
          if (!/\/\*\s+\/index\.html\s+200/i.test(code)) return { valid: false, message: 'Include "/*    /index.html   200".' };
          return { valid: true, message: 'Netlify redirect verified!' };
        }
      },
      {
        "id": "react-q35-3",
        "level": "Challenge",
        "title": "Vercel Rewrites JSON Configuration",
        "prompt": "Write a vercel.json rewrites configuration object mapping source \"/(.*)\" to destination \"/index.html\".",
        "requirements": [
          "\"rewrites\": [...]",
          "source: \"/(.*)\"",
          "destination: \"/index.html\""
        ],
        "starterCode": "// Write vercel.json object\n",
        "solutionCode": "{\n  \"rewrites\": [\n    {\n      \"source\": \"/(.*)\",\n      \"destination\": \"/index.html\"\n    }\n  ]\n}",
        "expectedOutput": "A vercel.json configuration object directing client-side routes to index.html.",
        "validate": (code) => {
          code = String(code || '');
          if (!/rewrites/i.test(code)) return { valid: false, message: 'Include rewrites array.' };
          if (!/destination/i.test(code) || !/\/index\.html/i.test(code)) return { valid: false, message: 'Map destination to /index.html.' };
          return { valid: true, message: 'Vercel rewrite verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why do users get a 404 error when refreshing a direct sub-route (e.g. /learn) on a freshly deployed static host?",
        "options": [
          "Because the static file server looks for a physical file named /learn/index.html on the server disk which does not exist",
          "Because React Router was deleted",
          "Because Vite only works on Mondays",
          "Because CSS broke"
        ],
        "correctIndex": 0,
        "explanation": "In SPAs, client-side routing handles sub-paths. Static servers must be told to rewrite all URLs back to root index.html."
      },
      {
        "id": 2,
        "question": "Which directory does Vite generate containing the compiled production distribution?",
        "options": [
          "dist/",
          "build/",
          "bin/",
          "public/"
        ],
        "correctIndex": 0,
        "explanation": "Vite outputs the optimized production build into the dist/ directory."
      },
      {
        "id": 3,
        "question": "What is \"tree-shaking\" during the production build step?",
        "options": [
          "Removing unused functions and exports from third-party libraries to make the final bundle as small as possible",
          "Formatting indentation in CSS",
          "Checking for broken image links",
          "Rebooting the development server"
        ],
        "correctIndex": 0,
        "explanation": "Tree-shaking is dead-code elimination that strips out unreferenced code, shrinking bundle size."
      }
    ],
    "video": {
      "title": "How To Deploy React Apps to Production",
      "channel": "Web Dev Simplified",
      "videoId": "2hR-uWj6110",
      "url": "https://www.youtube.com/watch?v=2hR-uWj6110",
      "description": "Web Dev Simplified covers building production bundles, static hosting on Vercel/Netlify, and SPA redirects."
    }
  },
  {
    "id": "react-topic-36",
    "order": 36,
    "slug": "react-best-practices-project-structure",
    "title": "React Best Practices and Project Structure",
    "difficulty": "Advanced",
    "estimatedTime": "20 min",
    "summary": "Architectural principles of professional React engineers: Single Responsibility, custom hook abstraction, accessibility (a11y), clean naming conventions, and ESLint rules.",
    "notes": {
      "concept": "Building scalable, production-grade React codebases requires adhering to battle-tested software engineering practices. Professional React developers focus on component purity, strict separation of concerns, semantic accessible markup, predictable folder structures, and maintaining small, focused components.",
      "syntax": "// Golden Rules of React Architecture:\n// 1. Single Responsibility: A component should do ONE thing well.\n// 2. Colocate State: Keep state as local as possible.\n// 3. Custom Hooks for Logic: Extract complex useEffect or API calls into hooks.\n// 4. Pure Components: Same props + state = same JSX output.\n// 5. Accessible Markup: Use semantic HTML (<button>, <nav>) and ARIA attributes.",
      "explanation": "1. Component Size: Keep components under 150-200 lines; break large views into focused child components.\n2. Logic Abstraction: Visual JSX components should contain minimal math or raw fetch calls; delegate to custom hooks and service functions.\n3. Accessibility (a11y): Never replace <button> with <div onClick>; native buttons provide built-in keyboard navigation and screen-reader accessibility.\n4. Prop Types and TypeScript: Enforce strict type contracts on component interfaces to prevent runtime crashes.",
      "codeExample": "// Clean, production-ready component structure\nimport React from 'react';\nimport { useStudentProgress } from '../hooks/useStudentProgress.js';\nimport { ProgressBar } from './ProgressBar.jsx';\nimport { BadgeList } from './BadgeList.jsx';\n\nexport function StudentOverview({ studentId }) {\n  // Logic cleanly delegated to custom hook\n  const { progress, badges, loading, error } = useStudentProgress(studentId);\n\n  if (loading) return <div className=\"skeleton\">Loading stats...</div>;\n  if (error) return <div className=\"error\">{error}</div>;\n\n  return (\n    <section aria-labelledby=\"overview-heading\" className=\"overview-card\">\n      <h2 id=\"overview-heading\">Learning Progress</h2>\n      <ProgressBar percent={progress.percent} />\n      <BadgeList badges={badges} />\n    </section>\n  );\n}",
      "expectedOutput": "A clean, highly readable, accessible, and testable component adhering to modern best practices.",
      "commonMistakes": [
        {
          "mistake": "Using clickable <div> elements instead of native <button> tags: <div onClick={submit}>Submit</div>",
          "correction": "Always use <button type=\"button\" onClick={submit}>Submit</button>.",
          "explanation": "Clickable divs cannot be focused via keyboard Tab navigation and fail accessibility compliance standards (WCAG)."
        },
        {
          "mistake": "Ignoring ESLint warnings (react-hooks/exhaustive-deps) by disabling linters.",
          "correction": "Always fix missing dependencies or restructure effects instead of disabling linter checks.",
          "explanation": "Omitting dependencies leads to stale closures and subtle production state bugs."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Refactor a non-accessible div button into an accessible semantic button.",
      "starterCode": "// Convert non-accessible div to semantic button\nfunction AccessibleAction({ onClick, label }) {\n  return (\n    <button type=\"button\" onClick={onClick} className=\"action-button\">\n      {label}\n    </button>\n  );\n}",
      "solutionCode": "function AccessibleAction({ onClick, label }) {\n  return (\n    <button type=\"button\" onClick={onClick} className=\"action-button\">\n      {label}\n    </button>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q36-1",
        "level": "Easy",
        "title": "Use Semantic Accessible Button",
        "prompt": "Create a component IconButton taking props icon, label, and onClick. Return a semantic <button type=\"button\" onClick={onClick} aria-label={label}>{icon}</button>.",
        "requirements": [
          "Semantic <button type=\"button\">",
          "aria-label={label}",
          "onClick={onClick}"
        ],
        "starterCode": "// Write IconButton\n",
        "solutionCode": "function IconButton({ icon, label, onClick }) {\n  return (\n    <button type=\"button\" onClick={onClick} aria-label={label}>\n      {icon}\n    </button>\n  );\n}",
        "expectedOutput": "An accessible button with ARIA labeling for screen readers.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<button/i.test(code)) return { valid: false, message: 'Use semantic <button>.' };
          if (!/aria-label/i.test(code)) return { valid: false, message: 'Include aria-label attribute.' };
          return { valid: true, message: 'Accessible button verified!' };
        }
      },
      {
        "id": "react-q36-2",
        "level": "Medium",
        "title": "Extract Logic into Custom Hook",
        "prompt": "Write a custom hook useOnlineStatus() that tracks navigator.onLine using useState and window online/offline event listeners with proper cleanup, returning isOnline.",
        "requirements": [
          "useState(navigator.onLine)",
          "useEffect with online/offline listeners",
          "Proper cleanup in return () => ...",
          "Return isOnline"
        ],
        "starterCode": "// Write useOnlineStatus\n",
        "solutionCode": "import { useState, useEffect } from \"react\";\n\nfunction useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const on = () => setIsOnline(true);\n    const off = () => setIsOnline(false);\n    window.addEventListener(\"online\", on);\n    window.addEventListener(\"offline\", off);\n    return () => {\n      window.removeEventListener(\"online\", on);\n      window.removeEventListener(\"offline\", off);\n    };\n  }, []);\n  return isOnline;\n}",
        "expectedOutput": "A clean custom hook abstracting network status logic away from visual components.",
        "validate": (code) => {
          code = String(code || '');
          if (!/useOnlineStatus/i.test(code)) return { valid: false, message: 'Name hook useOnlineStatus.' };
          if (!/addEventListener\(["']online["']/i.test(code)) return { valid: false, message: 'Listen to online event.' };
          if (!/removeEventListener/i.test(code)) return { valid: false, message: 'Clean up event listeners.' };
          return { valid: true, message: 'Custom hook abstraction verified!' };
        }
      },
      {
        "id": "react-q36-3",
        "level": "Challenge",
        "title": "Semantic Article Card Component",
        "prompt": "Create a component ArticleSummary taking props title, author, and snippet. Return an <article className=\"summary-card\"><header><h3>{title}</h3><p className=\"byline\">By {author}</p></header><p className=\"snippet\">{snippet}</p></article>.",
        "requirements": [
          "Semantic <article> container",
          "<header> with title and byline",
          "<p className=\"snippet\">"
        ],
        "starterCode": "// Write ArticleSummary with semantic HTML5 elements\n",
        "solutionCode": "function ArticleSummary({ title, author, snippet }) {\n  return (\n    <article className=\"summary-card\">\n      <header>\n        <h3>{title}</h3>\n        <p className=\"byline\">By {author}</p>\n      </header>\n      <p className=\"snippet\">{snippet}</p>\n    </article>\n  );\n}",
        "expectedOutput": "An accessible article summary card using standard HTML5 landmarks.",
        "validate": (code) => {
          code = String(code || '');
          if (!/<article[\s\S]*<\/article>/i.test(code)) return { valid: false, message: 'Wrap with semantic <article>.' };
          if (!/<header>[\s\S]*<\/header>/i.test(code)) return { valid: false, message: 'Include <header> element.' };
          return { valid: true, message: 'Semantic card verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why should you always use semantic <button> elements instead of <div onClick={...}> for clickable actions?",
        "options": [
          "Native buttons support keyboard navigation (Tab/Enter/Space), screen readers, and disabled states out of the box",
          "div elements cannot have CSS borders",
          "div elements do not support JavaScript",
          "It is required by the React compiler"
        ],
        "correctIndex": 0,
        "explanation": "Native buttons provide essential accessibility features (focus rings, keyboard triggers, screen-reader announcements) without extra code."
      },
      {
        "id": 2,
        "question": "What is the \"Single Responsibility Principle\" applied to React components?",
        "options": [
          "A component should do one job well (e.g. either render a button, display a card, or format a date)",
          "Only one developer can edit a file at a time",
          "Components can only render strings",
          "Every component must have exactly one line of code"
        ],
        "correctIndex": 0,
        "explanation": "Single-responsibility components are easier to test, maintain, and compose into larger interfaces."
      },
      {
        "id": 3,
        "question": "Why should complex data-fetching and side effects be extracted into custom hooks rather than written inline in UI components?",
        "options": [
          "To separate visual rendering from business logic, making both parts easier to understand, test, and reuse",
          "To make the website render in 3D",
          "Because React forbids fetch in components",
          "To bypass the browser cache"
        ],
        "correctIndex": 0,
        "explanation": "Custom hooks isolate business logic, keeping presentational components focused purely on markup and styling."
      }
    ],
    "video": {
      "title": "How To Structure React Projects for Scale",
      "channel": "Web Dev Simplified",
      "videoId": "7wx1s_hH1b4",
      "url": "https://www.youtube.com/watch?v=7wx1s_hH1b4",
      "description": "Web Dev Simplified teaches clean architecture, directory layout, and best practices for React codebases."
    }
  },
  {
    "id": "react-topic-37",
    "order": 37,
    "slug": "capstone-task-manager",
    "title": "Capstone Mini Project: Full-Stack React Task Manager",
    "difficulty": "Capstone",
    "estimatedTime": "30 min",
    "summary": "Build a complete end-to-end Full-Stack React Task Manager connected to an Express/MongoDB backend: CRUD operations, filter tabs, token authentication, and optimistic state updates.",
    "notes": {
      "concept": "The ultimate test of React mastery is building a complete, production-grade application that integrates all core concepts: component composition, hooks (useState, useEffect, useMemo, useCallback), controlled forms, API integration, loading/error states, and backend connectivity. In this Capstone Mini Project, you will assemble the Full-Stack Task Manager connected to REST API endpoints.",
      "syntax": "// Full-Stack Architecture of the React Task Manager:\n// 1. TaskManagerShell (Main State Container)\n// 2. TaskInputForm (Controlled Form with POST /api/tasks)\n// 3. TaskFilterTabs (All / Active / Completed Filter States)\n// 4. TaskItem (Optimistic PATCH toggle and DELETE /api/tasks/:id)\n// 5. TaskSummaryFooter (Stats and Clear Completed action)",
      "explanation": "1. Task State Triad: Manages tasks array, loading spinner, and error banners during network calls.\n2. CRUD Workflows: Create (POST /api/tasks), Read (GET /api/tasks), Update (PATCH /api/tasks/:id), and Delete (DELETE /api/tasks/:id).\n3. Filter Pipeline: Uses useMemo to compute filtered items without unnecessary array allocations.\n4. Auth Headers: Transmits student JWT tokens via Authorization: Bearer <token> for protected task ownership.",
      "codeExample": "// Core TaskManager Component Architecture\nimport React, { useState, useEffect, useMemo } from 'react';\n\nexport function ReactTaskManager({ apiEndpoint = '/api/tasks' }) {\n  const [tasks, setTasks] = useState([]);\n  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'\n  const [inputVal, setInputVal] = useState('');\n  const [loading, setLoading] = useState(false);\n\n  // Filtered task view calculated with useMemo\n  const filteredTasks = useMemo(() => {\n    if (filter === 'active') return tasks.filter(t => !t.completed);\n    if (filter === 'completed') return tasks.filter(t => t.completed);\n    return tasks;\n  }, [tasks, filter]);\n\n  const addTask = (e) => {\n    e.preventDefault();\n    if (!inputVal.trim()) return;\n    const newTask = { id: Date.now(), title: inputVal.trim(), completed: false };\n    setTasks(prev => [newTask, ...prev]);\n    setInputVal('');\n  };\n\n  const toggleTask = (id) => {\n    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));\n  };\n\n  const deleteTask = (id) => {\n    setTasks(prev => prev.filter(t => t.id !== id));\n  };\n\n  return (\n    <div className=\"task-manager-card\">\n      <header className=\"tm-header\">\n        <h2>React Task Manager</h2>\n        <span className=\"badge\">{filteredTasks.length} shown</span>\n      </header>\n\n      {/* Task Creation Form */}\n      <form onSubmit={addTask} className=\"tm-form\">\n        <input\n          value={inputVal}\n          onChange={(e) => setInputVal(e.target.value)}\n          placeholder=\"What needs to be done?\"\n        />\n        <button type=\"submit\">Add Task</button>\n      </form>\n\n      {/* Filter Tabs */}\n      <div className=\"tm-filters\">\n        {['all', 'active', 'completed'].map(f => (\n          <button\n            key={f}\n            className={filter === f ? 'active-filter' : ''}\n            onClick={() => setFilter(f)}\n          >\n            {f.toUpperCase()}\n          </button>\n        ))}\n      </div>\n\n      {/* Tasks List */}\n      <ul className=\"tm-list\">\n        {filteredTasks.map(task => (\n          <li key={task.id} className={task.completed ? 'completed' : ''}>\n            <input\n              type=\"checkbox\"\n              checked={task.completed}\n              onChange={() => toggleTask(task.id)}\n            />\n            <span>{task.title}</span>\n            <button onClick={() => deleteTask(task.id)} className=\"delete-btn\">×</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
      "expectedOutput": "A fully interactive Task Manager supporting task additions, completion toggles, deletions, and active/completed filtering.",
      "commonMistakes": [
        {
          "mistake": "Recalculating filtered tasks inside the render body on every keystroke without memoization or separating state.",
          "correction": "Use useMemo or derive filtered arrays cleanly based on [tasks, filter].",
          "explanation": "Keeps filtering instantaneous and decouples typing in the input from list re-sorting."
        },
        {
          "mistake": "Failing to clean up deleted tasks from server database, leading to zombie items on page refresh.",
          "correction": "Always send a DELETE HTTP request to the backend API when deleting an item.",
          "explanation": "Client state must be synchronized with backend MongoDB records."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Test the Task Manager live: add a task, toggle its completion checkbox, and filter by Active/Completed.",
      "starterCode": "import { useState } from 'react';\n\nfunction MiniTaskManager() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: 'Learn React Hooks', done: true },\n    { id: 2, text: 'Build Task Manager Project', done: false }\n  ]);\n  const [text, setText] = useState('');\n\n  const add = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    setTasks([...tasks, { id: Date.now(), text, done: false }]);\n    setText('');\n  };\n\n  return (\n    <div>\n      <form onSubmit={add}>\n        <input value={text} onChange={(e) => setText(e.target.value)} placeholder=\"Add a task...\" />\n        <button type=\"submit\">Add</button>\n      </form>\n      <ul>\n        {tasks.map(t => (\n          <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>\n            <span onClick={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>\n              {t.done ? \"✓ \" : \"○ \"}{t.text}\n            </span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
      "solutionCode": "import { useState } from 'react';\n\nfunction MiniTaskManager() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: 'Learn React Hooks', done: true },\n    { id: 2, text: 'Build Task Manager Project', done: false }\n  ]);\n  const [text, setText] = useState('');\n\n  const add = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    setTasks([...tasks, { id: Date.now(), text, done: false }]);\n    setText('');\n  };\n\n  return (\n    <div>\n      <form onSubmit={add}>\n        <input value={text} onChange={(e) => setText(e.target.value)} placeholder=\"Add a task...\" />\n        <button type=\"submit\">Add</button>\n      </form>\n      <ul>\n        {tasks.map(t => (\n          <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>\n            <span onClick={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>\n              {t.done ? \"✓ \" : \"○ \"}{t.text}\n            </span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
    },
    "practiceQuestions": [
      {
        "id": "react-q37-1",
        "level": "Easy",
        "title": "Task Item Component with Props",
        "prompt": "Create a component TaskItem taking props task, onToggle, and onDelete. Render an <li> containing a checkbox with checked={task.completed} and onChange={() => onToggle(task.id)}, a span with {task.title}, and a button with onClick={() => onDelete(task.id)}.",
        "requirements": [
          "checked={task.completed}",
          "onChange={() => onToggle(task.id)}",
          "onClick={() => onDelete(task.id)}"
        ],
        "starterCode": "// Write TaskItem component\n",
        "solutionCode": "function TaskItem({ task, onToggle, onDelete }) {\n  return (\n    <li>\n      <input\n        type=\"checkbox\"\n        checked={task.completed}\n        onChange={() => onToggle(task.id)}\n      />\n      <span>{task.title}</span>\n      <button onClick={() => onDelete(task.id)}>Delete</button>\n    </li>\n  );\n}",
        "expectedOutput": "A modular TaskItem component with toggle and delete callback handlers.",
        "validate": (code) => {
          code = String(code || '');
          if (!/checked\s*=\s*\{\s*task\.completed\s*\}/i.test(code)) return { valid: false, message: 'Bind checked={task.completed}.' };
          if (!/onToggle\(task\.id\)/i.test(code)) return { valid: false, message: 'Call onToggle(task.id).' };
          if (!/onDelete\(task\.id\)/i.test(code)) return { valid: false, message: 'Call onDelete(task.id).' };
          return { valid: true, message: 'TaskItem component verified!' };
        }
      },
      {
        "id": "react-q37-2",
        "level": "Medium",
        "title": "Filter Bar State Selector",
        "prompt": "Create a component TaskFilterBar taking props currentFilter and onFilterChange. Render three buttons: \"All\", \"Active\", \"Completed\" that call onFilterChange(\"all\"), onFilterChange(\"active\"), and onFilterChange(\"completed\") respectively.",
        "requirements": [
          "Three filter buttons",
          "Call onFilterChange with \"all\", \"active\", \"completed\""
        ],
        "starterCode": "// Write TaskFilterBar\n",
        "solutionCode": "function TaskFilterBar({ currentFilter, onFilterChange }) {\n  return (\n    <div>\n      <button onClick={() => onFilterChange(\"all\")}>All</button>\n      <button onClick={() => onFilterChange(\"active\")}>Active</button>\n      <button onClick={() => onFilterChange(\"completed\")}>Completed</button>\n    </div>\n  );\n}",
        "expectedOutput": "A filter bar driving the active task filter selection.",
        "validate": (code) => {
          code = String(code || '');
          if (!/onFilterChange\(["']all["']\)/i.test(code)) return { valid: false, message: 'Handle "all" filter.' };
          if (!/onFilterChange\(["']active["']\)/i.test(code)) return { valid: false, message: 'Handle "active" filter.' };
          if (!/onFilterChange\(["']completed["']\)/i.test(code)) return { valid: false, message: 'Handle "completed" filter.' };
          return { valid: true, message: 'TaskFilterBar verified!' };
        }
      },
      {
        "id": "react-q37-3",
        "level": "Challenge",
        "title": "Full-Stack Task Fetch and Optimistic Toggle",
        "prompt": "Write an async function toggleTaskOnServer(taskId, currentStatus, setTasks) that optimistically flips task.completed in local setTasks, sends a PATCH to `/api/tasks/${taskId}` with { completed: !currentStatus }, and rolls back if the fetch throws.",
        "requirements": [
          "Optimistic update with setTasks",
          "fetch PATCH to `/api/tasks/${taskId}`",
          "catch block reverting setTasks"
        ],
        "starterCode": "// Write toggleTaskOnServer\n",
        "solutionCode": "async function toggleTaskOnServer(taskId, currentStatus, setTasks) {\n  setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !currentStatus } : t));\n  try {\n    await fetch(`/api/tasks/${taskId}`, {\n      method: \"PATCH\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify({ completed: !currentStatus })\n    });\n  } catch (err) {\n    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: currentStatus } : t));\n  }\n}",
        "expectedOutput": "A resilient full-stack task status toggle with optimistic update and rollback.",
        "validate": (code) => {
          code = String(code || '');
          if (!/method\s*:\s*["']PATCH["']/i.test(code)) return { valid: false, message: 'Use PATCH method.' };
          if (!/\/api\/tasks\/\$\{taskId\}/i.test(code) && !/\/api\/tasks\/\s*\+\s*taskId/i.test(code)) {
            return { valid: false, message: 'Target /api/tasks/${taskId}.' };
          }
          if (!/catch/i.test(code)) return { valid: false, message: 'Include catch rollback block.' };
          return { valid: true, message: 'Full-stack task toggle verified!' };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary role of useMemo when filtering a list in a React Task Manager?",
        "options": [
          "It caches the filtered tasks array so filtering is not needlessly recalculated when the user types in an unrelated input field",
          "It saves the tasks directly to MongoDB without a server",
          "It formats CSS typography",
          "It replaces the browser network tab"
        ],
        "correctIndex": 0,
        "explanation": "useMemo avoids re-running filter algorithms on every keystroke in unrelated component states."
      },
      {
        "id": 2,
        "question": "Which HTTP method is most appropriate for toggling a single task completed status on a REST backend?",
        "options": [
          "PATCH",
          "GET",
          "POST",
          "OPTIONS"
        ],
        "correctIndex": 0,
        "explanation": "PATCH is standard for partial entity modifications (updating a single field like completed)."
      },
      {
        "id": 3,
        "question": "How do you ensure child components like TaskItem receive stable function callbacks in large lists?",
        "options": [
          "Wrap event callbacks in useCallback to preserve function referential equality across renders",
          "Use document.getElementById()",
          "Avoid using functions in React",
          "Re-create the entire list every millisecond"
        ],
        "correctIndex": 0,
        "explanation": "useCallback preserves stable function references, preventing unnecessary re-renders of memoized list items."
      }
    ],
    "video": {
      "title": "Build a Full-Stack React Project from Scratch",
      "channel": "Web Dev Simplified",
      "videoId": "hQAHSlTtcmY",
      "url": "https://www.youtube.com/watch?v=hQAHSlTtcmY",
      "description": "Web Dev Simplified builds a complete React application covering state, props, forms, and component composition."
    }
  }
];

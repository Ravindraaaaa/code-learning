/**
 * CodeForge - Complete CSS Professional Curriculum Topics
 * 18 Comprehensive, Beginner-to-Advanced Topics with:
 * - Structured Notes: Concept, Syntax, Explanation, Code Example, Expected Output, Common Mistakes
 * - Interactive Try It Yourself live playground starters
 * - 3 Practice Questions per topic: Easy, Medium, and Challenge with automated validators
 * - Interactive Quiz with instant feedback and explanations
 * - Verified YouTube Educational Resources from trusted educators (Kevin Powell, Web Dev Simplified, Dave Gray)
 */

export const CSS_TOPICS = [
  {
    "id": "css-topic-1",
    "order": 1,
    "slug": "css-introduction",
    "title": "Introduction to CSS",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Discover Cascading Style Sheets (CSS): the visual styling language of the web. Learn how CSS transforms raw HTML documents into responsive, visually compelling interfaces through rulesets, the cascade, and inheritance.",
    "notes": {
      "concept": "Cascading Style Sheets (CSS) is a stylesheet language used to describe the visual presentation and layout of a document written in HTML. While HTML defines the structural semantics of a webpage (paragraphs, headings, buttons), CSS governs colors, typography, spacing, positioning, and responsive adaptations across devices. The \"cascade\" refers to the algorithm browsers use to resolve conflicting styles based on importance, specificity, and source order.",
      "syntax": "/* General CSS Ruleset Anatomy */\nselector {\n  property: value; /* Declaration */\n}\n\n/* Example: Styling paragraphs */\np {\n  color: #334155;\n  font-size: 16px;\n  line-height: 1.6;\n}",
      "explanation": "1. Ruleset: A block consisting of a selector and a declaration block enclosed in curly braces {}.\n2. Selector: Points to the HTML element(s) you wish to style (e.g., h1, p, .button).\n3. Property: The specific visual style attribute being modified (e.g., color, font-size, background).\n4. Value: The setting applied to the property (e.g., #2563eb, 18px).\n5. Semicolon: Every declaration must terminate with a semicolon to separate declarations cleanly.",
      "codeExample": "/* Styling a landing hero section */\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  background-color: #0f172a;\n  color: #f8fafc;\n  margin: 0;\n}\n\nh1 {\n  color: #38bdf8;\n  font-size: 32px;\n  text-align: center;\n}",
      "expectedOutput": "A dark slate webpage with zero outer margins, crisp sans-serif typography, and a prominent sky-blue centered heading.",
      "commonMistakes": [
        {
          "mistake": "Omitting the semicolon at the end of a property declaration.",
          "correction": "Always terminate each declaration with a semicolon: color: blue; font-size: 14px;",
          "explanation": "Missing a semicolon causes the browser parser to merge adjacent declarations, invalidating both."
        },
        {
          "mistake": "Confusing CSS properties with HTML attributes (e.g. textcolor instead of color).",
          "correction": "Use standard CSS properties like color, background-color, and font-size.",
          "explanation": "HTML attributes like bgcolor are obsolete; modern browsers require standard CSS property names."
        },
        {
          "mistake": "Forgetting that CSS is case-insensitive for properties, but class selectors are case-sensitive in some XML modes.",
          "correction": "Always write CSS properties, values, and selectors in lowercase for consistency.",
          "explanation": "Consistency in naming prevents specificity mismatches and maintains clean codebases."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Modify the background color and heading color in this live CSS stylesheet to see the cascade take effect immediately.",
      "starterCode": "<style>\n  body {\n    background-color: #0f172a;\n    color: #e2e8f0;\n    font-family: sans-serif;\n    padding: 24px;\n  }\n  h1 {\n    color: #38bdf8;\n  }\n  p {\n    color: #94a3b8;\n    line-height: 1.5;\n  }\n</style>\n<h1>Welcome to CSS</h1>\n<p>Cascading Style Sheets bring life, color, and responsiveness to HTML structure.</p>",
      "solutionCode": "<style>\n  body {\n    background-color: #0f172a;\n    color: #e2e8f0;\n    font-family: sans-serif;\n    padding: 24px;\n  }\n  h1 {\n    color: #38bdf8;\n  }\n  p {\n    color: #94a3b8;\n    line-height: 1.5;\n  }\n</style>\n<h1>Welcome to CSS</h1>\n<p>Cascading Style Sheets bring life, color, and responsiveness to HTML structure.</p>"
    },
    "practiceQuestions": [
      {
        "id": "css-q1-1",
        "level": "Easy",
        "title": "Style Headings with Color and Font Size",
        "prompt": "Write a CSS ruleset targeting all h1 elements that sets color to #38bdf8 and font-size to 28px.",
        "requirements": [
          "Use h1 selector",
          "Set color: #38bdf8",
          "Set font-size: 28px"
        ],
        "starterCode": "/* Write h1 ruleset here */\n",
        "solutionCode": "h1 {\n  color: #38bdf8;\n  font-size: 28px;\n}",
        "expectedOutput": "All <h1> headings render in sky blue at 28px.",
        "validate": (code) => {
        code = String(code || '');
        if (!/h1\s*\{/i.test(code)) return { valid: false, message: 'Missing h1 selector.' };
        if (!/color\s*:\s*#38bdf8/i.test(code)) return { valid: false, message: 'Missing color: #38bdf8.' };
        if (!/font-size\s*:\s*28px/i.test(code)) return { valid: false, message: 'Missing font-size: 28px.' };
        return { valid: true, message: 'Great job! Headings styled correctly.' };
      }
      },
      {
        "id": "css-q1-2",
        "level": "Medium",
        "title": "Body Typography and Background Styling",
        "prompt": "Write a ruleset for body that sets background-color to #1e293b, color to #f8fafc, and line-height to 1.6.",
        "requirements": [
          "Target body selector",
          "Set background-color: #1e293b",
          "Set color: #f8fafc",
          "Set line-height: 1.6"
        ],
        "starterCode": "/* Write body ruleset here */\n",
        "solutionCode": "body {\n  background-color: #1e293b;\n  color: #f8fafc;\n  line-height: 1.6;\n}",
        "expectedOutput": "Document body displays a dark slate background, crisp light text, and comfortable reading line height.",
        "validate": (code) => {
        code = String(code || '');
        if (!/body\s*\{/i.test(code)) return { valid: false, message: 'Missing body selector.' };
        if (!/background-color\s*:\s*#1e293b/i.test(code)) return { valid: false, message: 'Missing background-color: #1e293b.' };
        if (!/color\s*:\s*#f8fafc/i.test(code)) return { valid: false, message: 'Missing color: #f8fafc.' };
        if (!/line-height\s*:\s*1\.6/i.test(code)) return { valid: false, message: 'Missing line-height: 1.6.' };
        return { valid: true, message: 'Well done! Body foundation configured.' };
      }
      },
      {
        "id": "css-q1-3",
        "level": "Challenge",
        "title": "Multi-Declaration Banner Ruleset",
        "prompt": "Write a ruleset targeting class .hero-banner that sets background-color: #0f172a, color: white, text-align: center, and font-family: sans-serif.",
        "requirements": [
          "Target .hero-banner",
          "Set background-color: #0f172a",
          "Set color: white",
          "Set text-align: center",
          "Set font-family: sans-serif"
        ],
        "starterCode": "/* Write .hero-banner ruleset */\n",
        "solutionCode": ".hero-banner {\n  background-color: #0f172a;\n  color: white;\n  text-align: center;\n  font-family: sans-serif;\n}",
        "expectedOutput": "Hero banner card is styled with dark background, centered text, and clean modern font.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.hero-banner\s*\{/i.test(code)) return { valid: false, message: 'Missing .hero-banner class selector.' };
        if (!/background-color\s*:\s*#0f172a/i.test(code)) return { valid: false, message: 'Missing background-color: #0f172a.' };
        if (!/color\s*:\s*white/i.test(code)) return { valid: false, message: 'Missing color: white.' };
        if (!/text-align\s*:\s*center/i.test(code)) return { valid: false, message: 'Missing text-align: center.' };
        if (!/font-family\s*:\s*sans-serif/i.test(code)) return { valid: false, message: 'Missing font-family: sans-serif.' };
        return { valid: true, message: 'Outstanding! Hero banner styling validated.' };
      }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What does CSS stand for in web engineering?",
        "options": [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Styling Syntax",
          "Colorful Sheet System"
        ],
        "correctIndex": 1,
        "explanation": "CSS stands for Cascading Style Sheets, highlighting how styles cascade from parent to child elements."
      },
      {
        "id": 2,
        "question": "What is the role of a CSS selector?",
        "options": [
          "To define what HTML elements should be targeted and receive visual declarations",
          "To link a domain to a web server",
          "To compile JavaScript bytecode",
          "To encrypt website cookies"
        ],
        "correctIndex": 0,
        "explanation": "A selector identifies the HTML elements in the DOM tree that should receive the specified styling declarations."
      },
      {
        "id": 3,
        "question": "Which character terminates every CSS property-value declaration?",
        "options": [
          "Colon (:)",
          "Period (.)",
          "Semicolon (;)",
          "Comma (,)"
        ],
        "correctIndex": 2,
        "explanation": "Every CSS declaration must end with a semicolon (;) to separate it from the next declaration."
      }
    ],
    "video": {
      "title": "Learn CSS in 20 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "1PnVor36_40",
      "url": "https://www.youtube.com/watch?v=1PnVor36_40",
      "description": "Kyle introduces CSS fundamentals, selectors, properties, values, and how CSS controls webpage presentation."
    }
  },
  {
    "id": "css-topic-2",
    "order": 2,
    "slug": "css-syntax-and-types",
    "title": "CSS Syntax and Types",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Learn the three primary methods for adding CSS to HTML: Inline styles (style attribute), Internal stylesheets (<style> tags in <head>), and External stylesheets (<link rel=\"stylesheet\">). Master best practices for scalability.",
    "notes": {
      "concept": "CSS can be attached to HTML documents in three ways: Inline, Internal, and External. While Inline CSS styles individual elements directly, External CSS separates content from presentation by placing all rules in dedicated .css files linked via the <link> tag. External stylesheets are the industry standard because they allow one file to style an entire website and can be cached by browsers for lightning-fast performance.",
      "syntax": "<!-- 1. Inline CSS (Directly on HTML elements) -->\n<h1 style=\"color: #2563eb; font-size: 24px;\">Inline Title</h1>\n\n<!-- 2. Internal CSS (Inside <style> tag within <head>) -->\n<head>\n  <style>\n    p { color: #475569; }\n  </style>\n</head>\n\n<!-- 3. External CSS (Recommended: Separate .css file) -->\n<head>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>",
      "explanation": "1. Inline CSS: Applied directly via the style attribute. Highest specificity (1,0,0,0), but impossible to reuse and pollutes HTML markup.\n2. Internal CSS: Embedded inside <head> within <style> tags. Useful for single-page standalone documents or email templates.\n3. External CSS: Placed in a separate .css file and imported via <link rel=\"stylesheet\" href=\"...\"> in the <head>. Allows global reusability, modular architecture, and HTTP caching.",
      "codeExample": "/* styles.css (External Stylesheet) */\n.btn-primary {\n  background-color: #2563eb;\n  color: #ffffff;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.btn-primary:hover {\n  background-color: #1d4ed8;\n}",
      "expectedOutput": "A reusable primary button component with smooth cursor pointer and hover color shift that can be used on any page across a website.",
      "commonMistakes": [
        {
          "mistake": "Overusing inline styles: <p style=\"color: red;\">text</p>",
          "correction": "Use external CSS classes instead of inline style attributes.",
          "explanation": "Inline styles defeat the purpose of CSS separation of concerns, cannot be cached, and require high specificity to override."
        },
        {
          "mistake": "Placing <link rel=\"stylesheet\"> inside <body> instead of <head>.",
          "correction": "Always place stylesheet <link> tags inside the HTML <head> section.",
          "explanation": "Placing stylesheets in the body causes Flash of Unstyled Content (FOUC), where elements render unstyled before snapping into place."
        },
        {
          "mistake": "Writing HTML tags (like <style>) inside an external .css file.",
          "correction": "In a .css file, write pure CSS declarations only without <style> tags.",
          "explanation": "<style> is an HTML tag; including it in a .css file triggers syntax errors in the CSS parser."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Compare internal style tags with inline styles in the live preview editor below.",
      "starterCode": "<style>\n  .box {\n    background: #1e293b;\n    color: white;\n    padding: 16px;\n    border-radius: 8px;\n    margin-bottom: 12px;\n  }\n</style>\n<div class=\"box\">Styled using Internal CSS in &lt;style&gt;</div>\n<div class=\"box\" style=\"background: #2563eb; font-weight: bold;\">\n  Inline CSS overrides the background to blue!\n</div>",
      "solutionCode": "<style>\n  .box {\n    background: #1e293b;\n    color: white;\n    padding: 16px;\n    border-radius: 8px;\n    margin-bottom: 12px;\n  }\n</style>\n<div class=\"box\">Styled using Internal CSS in &lt;style&gt;</div>\n<div class=\"box\" style=\"background: #2563eb; font-weight: bold;\">\n  Inline CSS overrides the background to blue!\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q2-1",
        "level": "Easy",
        "title": "Apply an External Link Tag",
        "prompt": "Write the HTML <link> tag that attaches an external stylesheet named \"main.css\" with rel=\"stylesheet\".",
        "requirements": [
          "Use <link> element",
          "Include rel=\"stylesheet\"",
          "Include href=\"main.css\""
        ],
        "starterCode": "<!-- Write external stylesheet link -->\n",
        "solutionCode": "<link rel=\"stylesheet\" href=\"main.css\">",
        "expectedOutput": "HTML link element connecting main.css stylesheet.",
        "validate": (code) => {
        code = String(code || '');
        if (!/<link/i.test(code)) return { valid: false, message: 'Use the <link> tag.' };
        if (!/rel\s*=\s*["\']stylesheet["\']/i.test(code)) return { valid: false, message: 'Include rel="stylesheet".' };
        if (!/href\s*=\s*["\']main\.css["\']/i.test(code)) return { valid: false, message: 'Include href="main.css".' };
        return { valid: true, message: 'Great! External link tag structured properly.' };
      }
      },
      {
        "id": "css-q2-2",
        "level": "Medium",
        "title": "Construct an Internal Style Block",
        "prompt": "Create an internal style block using <style> tags that sets color: #0284c7 on all h2 elements.",
        "requirements": [
          "Wrap rules in <style> and </style>",
          "Target h2 selector",
          "Set color: #0284c7"
        ],
        "starterCode": "<!-- Write internal style block -->\n",
        "solutionCode": "<style>\n  h2 {\n    color: #0284c7;\n  }\n</style>",
        "expectedOutput": "Internal style block applying ocean blue color to h2 elements.",
        "validate": (code) => {
        code = String(code || '');
        if (!code.includes('<style>') || !code.includes('</style>')) {
          return { valid: false, message: 'Wrap code in <style> and </style> tags.' };
        }
        if (!/h2\s*\{[^}]*color\s*:\s*#0284c7/i.test(code)) {
          return { valid: false, message: 'Target h2 with color: #0284c7.' };
        }
        return { valid: true, message: 'Well done! Internal style block constructed.' };
      }
      },
      {
        "id": "css-q2-3",
        "level": "Challenge",
        "title": "Compare Inline Specificity Override",
        "prompt": "Write an internal style for .alert setting background: #fee2e2 and color: #b91c1c. Then write a <div> element with class=\"alert\" that uses an inline style to override color to #15803d.",
        "requirements": [
          "<style> with .alert setting background: #fee2e2 and color: #b91c1c",
          "<div> with class=\"alert\" and style=\"color: #15803d;\""
        ],
        "starterCode": "<!-- Write internal and inline override -->\n",
        "solutionCode": "<style>\n  .alert {\n    background: #fee2e2;\n    color: #b91c1c;\n  }\n</style>\n<div class=\"alert\" style=\"color: #15803d;\">Overridden Alert</div>",
        "expectedOutput": "Alert box with soft red background whose text color is overridden by green inline style.",
        "validate": (code) => {
        code = String(code || '');
        if (!code.includes('<style>') || !code.includes('.alert') || !code.includes('</style>')) {
          return { valid: false, message: 'Define .alert inside <style> tags.' };
        }
        if (!/<div[^>]*class=["']alert["'][^>]*style=["'][^"']*color:\s*#15803d/i.test(code)) {
          return { valid: false, message: 'Create div with class="alert" and inline style="color: #15803d;".' };
        }
        return { valid: true, message: 'Outstanding! Specificity hierarchy demonstrated.' };
      }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which method of adding CSS is recommended for production multi-page websites?",
        "options": [
          "Inline styles on every HTML tag",
          "External stylesheets linked via <link rel=\"stylesheet\"> in <head>",
          "Internal <style> tags on every page",
          "JavaScript DOM injection exclusively"
        ],
        "correctIndex": 1,
        "explanation": "External stylesheets enable separation of concerns, global reusability, and browser caching across multiple pages."
      },
      {
        "id": 2,
        "question": "What is a major downside of using inline CSS (style=\"...\")?",
        "options": [
          "It cannot be cached and has extremely high specificity that is difficult to override",
          "It is unsupported on mobile browsers",
          "It only supports black and white colors",
          "It slows down DNS lookup times"
        ],
        "correctIndex": 0,
        "explanation": "Inline styles pollute HTML, cannot be cached across requests, and carry high specificity that breaks modular CSS architecture."
      },
      {
        "id": 3,
        "question": "Where should the <link rel=\"stylesheet\"> tag be placed in an HTML document?",
        "options": [
          "At the very bottom of the <body>",
          "Inside the <head> container",
          "Directly inside the <footer>",
          "Outside the <html> tag"
        ],
        "correctIndex": 1,
        "explanation": "Placing stylesheets in <head> ensures styles are loaded before rendering begins, preventing Flash of Unstyled Content (FOUC)."
      }
    ],
    "video": {
      "title": "CSS Full Course: Chapter on Adding CSS to HTML",
      "channel": "Dave Gray",
      "videoId": "OXGznpKZ_sA",
      "url": "https://www.youtube.com/watch?v=OXGznpKZ_sA",
      "description": "Dave Gray explains the differences between inline, internal, and external CSS, ruleset syntax, and best practices."
    }
  },
  {
    "id": "css-topic-3",
    "order": 3,
    "slug": "css-selectors",
    "title": "CSS Selectors",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Master the fundamental patterns used to target and style HTML elements: type/element selectors, class selectors (.class), ID selectors (#id), combinators, and pseudo-classes (:hover, :focus).",
    "notes": {
      "concept": "CSS (Cascading Style Sheets) relies on selectors to target specific elements in the DOM tree and apply visual declarations. Selectors range from broad element selectors that style every tag of a type, to specific classes for reusable components, unique IDs for distinct sections, and combinators that target elements based on parent-child relationships.",
      "syntax": "/* Element / Type Selector */\np {\n  color: #334155;\n}\n\n/* Class Selector (Reusable) */\n.highlight {\n  background-color: #fef08a;\n}\n\n/* ID Selector (Unique) */\n#hero-banner {\n  padding: 40px;\n}\n\n/* Pseudo-class Selector */\nbutton:hover {\n  background-color: #4338ca;\n}",
      "explanation": "1. Element Selector (e.g. h1, p, a): Matches all elements with that tag name across the page.\n2. Class Selector (e.g. .btn, .card): Matches elements with that class attribute. Classes can be reused on any number of elements.\n3. ID Selector (e.g. #header): Matches a single element with that specific id attribute. IDs have higher specificity.\n4. Descendant Combinator (space): Targets nested elements inside an ancestor (e.g. .nav a targets all <a> inside .nav).\n5. Child Combinator (>): Targets immediate direct children only (e.g. ul > li).\n6. Pseudo-classes (:hover, :focus, :active): Target elements in specific dynamic states.",
      "codeExample": "/* Target navigation links and hover state */\n.nav-menu {\n  list-style: none;\n  display: flex;\n  gap: 16px;\n}\n\n.nav-menu a {\n  text-decoration: none;\n  color: #475569;\n  font-weight: 500;\n}\n\n.nav-menu a:hover {\n  color: #6366f1;\n  text-decoration: underline;\n}\n\n#cta-button {\n  background-color: #6366f1;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 6px;\n}",
      "expectedOutput": "A horizontal navigation list of clean grey hyperlinks that shift to vibrant indigo with an underline when hovered, alongside an indigo CTA button with rounded corners.",
      "commonMistakes": [
        {
          "mistake": "Forgetting the dot prefix for class selectors (e.g. button-primary instead of .button-primary).",
          "correction": "Always prefix class names with a period: .button-primary.",
          "explanation": "Without the dot, CSS treats the name as an HTML element tag, so the styles never apply to elements with class=\"button-primary\"."
        },
        {
          "mistake": "Overusing high-specificity ID selectors (#nav) instead of reusable classes (.nav).",
          "correction": "Use classes for general styling and component design; reserve IDs for JavaScript anchors.",
          "explanation": "IDs have very high specificity, making them extremely difficult to override or reuse elsewhere in your stylesheets."
        },
        {
          "mistake": "Confusing descendant combinator (space) with multi-class selectors (.btn .active vs .btn.active).",
          "correction": "Use no space (.btn.active) to target an element having both classes simultaneously.",
          "explanation": ".btn .active looks for an element with class \"active\" inside a parent with class \"btn\", rather than the same element."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Experiment with element, class, and pseudo-class selectors. Try hovering over the button or changing the .card styling.",
      "starterCode": "<style>\n  .card {\n    background-color: #f8fafc;\n    border: 2px solid #e2e8f0;\n    border-radius: 10px;\n    padding: 20px;\n    font-family: sans-serif;\n    max-width: 350px;\n  }\n  .card h3 {\n    color: #1e293b;\n    margin-top: 0;\n  }\n  .btn {\n    background-color: #6366f1;\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: background-color 0.2s;\n  }\n  .btn:hover {\n    background-color: #4f46e5;\n  }\n</style>\n<div class=\"card\">\n  <h3>Interactive Card</h3>\n  <p>Hover over the button below to see the :hover pseudo-class in action.</p>\n  <button class=\"btn\">Click Me</button>\n</div>",
      "solutionCode": "<style>\n  .card {\n    background-color: #f8fafc;\n    border: 2px solid #e2e8f0;\n    border-radius: 10px;\n    padding: 20px;\n    font-family: sans-serif;\n    max-width: 350px;\n  }\n  .card h3 {\n    color: #1e293b;\n    margin-top: 0;\n  }\n  .btn {\n    background-color: #6366f1;\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: background-color 0.2s;\n  }\n  .btn:hover {\n    background-color: #4f46e5;\n  }\n</style>\n<div class=\"card\">\n  <h3>Interactive Card</h3>\n  <p>Hover over the button below to see the :hover pseudo-class in action.</p>\n  <button class=\"btn\">Click Me</button>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q1-1",
        "level": "Easy",
        "title": "Target Paragraphs with a Class Selector",
        "prompt": "Write a CSS rule targeting the class .intro-text that sets color to #2563eb and font-size to 18px.",
        "requirements": [
          "Use .intro-text class selector",
          "Set color: #2563eb",
          "Set font-size: 18px"
        ],
        "starterCode": "/* Write your CSS rule here */\n",
        "solutionCode": ".intro-text {\n  color: #2563eb;\n  font-size: 18px;\n}",
        "expectedOutput": "All elements with class=\"intro-text\" render with royal blue text at 18px font size.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.intro-text\s*\{/i.test(code)) errors.push('Missing .intro-text class selector.');
          if (!/color\s*:\s*#2563eb/i.test(code)) errors.push('Missing color: #2563eb.');
          if (!/font-size\s*:\s*18px/i.test(code)) errors.push('Missing font-size: 18px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q1-2",
        "level": "Medium",
        "title": "Descendant Combinator & Hover State",
        "prompt": "Write CSS that styles links inside a .nav-bar container: set color to #475569 with text-decoration: none, and on :hover set color to #0284c7 with text-decoration: underline.",
        "requirements": [
          "Target .nav-bar a with color: #475569 and text-decoration: none",
          "Target .nav-bar a:hover with color: #0284c7 and text-decoration: underline"
        ],
        "starterCode": "/* Write descendant and hover selectors here */\n",
        "solutionCode": ".nav-bar a {\n  color: #475569;\n  text-decoration: none;\n}\n\n.nav-bar a:hover {\n  color: #0284c7;\n  text-decoration: underline;\n}",
        "expectedOutput": "Navigation links styled cleanly without underlines that turn ocean blue and underlined on cursor hover.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.nav-bar\s+a\s*\{[\s\S]*?color\s*:\s*#475569/i.test(code)) {
            errors.push('Missing .nav-bar a with color: #475569.');
          }
          if (!/\.nav-bar\s+a\s*\{[\s\S]*?text-decoration\s*:\s*none/i.test(code)) {
            errors.push('Missing .nav-bar a with text-decoration: none.');
          }
          if (!/\.nav-bar\s+a:hover\s*\{[\s\S]*?color\s*:\s*#0284c7/i.test(code)) {
            errors.push('Missing .nav-bar a:hover with color: #0284c7.');
          }
          if (!/\.nav-bar\s+a:hover\s*\{[\s\S]*?text-decoration\s*:\s*underline/i.test(code)) {
            errors.push('Missing .nav-bar a:hover with text-decoration: underline.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q1-3",
        "level": "Challenge",
        "title": "Multi-Class and Direct Child Combinator",
        "prompt": "Write CSS with two rules: 1) Target direct <li> children of .menu-list (.menu-list > li) and set padding: 12px; 2) Target button elements having both .btn and .btn-primary (.btn.btn-primary) setting background-color: #10b981 and color: white.",
        "requirements": [
          "Direct child selector: .menu-list > li with padding: 12px",
          "Compound selector: .btn.btn-primary with background-color: #10b981 and color: white"
        ],
        "starterCode": "/* Write direct child and compound selectors */\n",
        "solutionCode": ".menu-list > li {\n  padding: 12px;\n}\n\n.btn.btn-primary {\n  background-color: #10b981;\n  color: white;\n}",
        "expectedOutput": "Direct list items receive uniform padding and compound button elements receive emerald primary styling.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.menu-list\s*>\s*li\s*\{[\s\S]*?padding\s*:\s*12px/i.test(code)) {
            errors.push('Missing direct child rule .menu-list > li with padding: 12px.');
          }
          if (!/\.btn\.btn-primary\s*\{[\s\S]*?background-color\s*:\s*#10b981/i.test(code)) {
            errors.push('Missing compound rule .btn.btn-primary with background-color: #10b981.');
          }
          if (!/\.btn\.btn-primary\s*\{[\s\S]*?color\s*:\s*white/i.test(code)) {
            errors.push('Missing color: white inside .btn.btn-primary.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which CSS selector has the highest specificity?",
        "options": [
          "Element selector (div)",
          "Class selector (.container)",
          "ID selector (#main-content)",
          "Universal selector (*)"
        ],
        "correctIndex": 2,
        "explanation": "ID selectors (#id) carry a higher specificity weight (0,1,0,0) than class selectors (0,0,1,0) and element selectors (0,0,0,1)."
      },
      {
        "id": 2,
        "question": "What is the difference between \".nav .link\" and \".nav > .link\"?",
        "options": [
          ".nav > .link targets any nested descendant, while .nav .link targets only direct children",
          ".nav > .link targets only direct immediate children, while .nav .link targets all descendants regardless of depth",
          "There is no difference; they are aliases",
          ".nav > .link is invalid CSS syntax"
        ],
        "correctIndex": 1,
        "explanation": "The child combinator (>) targets only immediate children, whereas the space combinator targets all descendants at any nesting depth."
      },
      {
        "id": 3,
        "question": "How do you target an element only when the user is hovering over it with their mouse pointer?",
        "options": [
          ":active",
          ":focus",
          ":hover",
          ":visited"
        ],
        "correctIndex": 2,
        "explanation": "The :hover pseudo-class activates whenever the user moves their pointing device over an element without necessarily clicking it."
      }
    ],
    "video": {
      "title": "Step up your CSS game using these selectors and combinators",
      "channel": "Kevin Powell",
      "videoId": "Bcr70LIJcOk",
      "url": "https://www.youtube.com/watch?v=Bcr70LIJcOk",
      "description": "Kevin Powell breaks down CSS selectors, combinators, and pseudo-classes with visual real-world examples."
    }
  },
  {
    "id": "css-topic-4",
    "order": 4,
    "slug": "colors-and-backgrounds",
    "title": "Colors and Backgrounds",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Learn how to color text and surfaces using named colors, Hex codes (#ffffff), rgb()/rgba(), hsl(), linear/radial gradients, and background images.",
    "notes": {
      "concept": "Color gives personality, contrast, and visual hierarchy to web designs. In CSS, color formats include standard Hex codes (#rrggbb), RGB/RGBA for red-green-blue channels with opacity, and modern HSL (Hue, Saturation, Lightness). The background property allows developers to apply solid colors, smooth linear gradients, or responsive repeating background images.",
      "syntax": "/* Hexadecimal with alpha channel */\ncolor: #1e293b;\nbackground-color: #f8fafc;\n\n/* RGBA with 50% transparency */\nbackground-color: rgba(99, 102, 241, 0.5);\n\n/* Linear Gradient Background */\nbackground: linear-gradient(135deg, #6366f1, #a855f7);\n\n/* Background Image with sizing */\nbackground-image: url('hero.jpg');\nbackground-size: cover;\nbackground-position: center;",
      "explanation": "1. color: Controls foreground text color and icon fills.\n2. background-color: Sets the solid backing tint of an element.\n3. Hex Codes (#): 6 hexadecimal characters representing Red, Green, and Blue levels from 00 to FF.\n4. rgba(r, g, b, a): Allows exact alpha channel opacity from 0.0 (transparent) to 1.0 (opaque).\n5. linear-gradient(direction, color1, color2): Generates a continuous transition between two or more colors without loading image files.\n6. background-size: cover ensures an image covers the entire element without distortion.",
      "codeExample": "/* Vibrant Hero Banner with Gradient Overlay */\n.hero-banner {\n  color: #ffffff;\n  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);\n  padding: 48px;\n  border-radius: 12px;\n}\n\n.hero-subtitle {\n  color: rgba(255, 255, 255, 0.85);\n  font-size: 16px;\n}",
      "expectedOutput": "A bold, modern card featuring crisp white text over a diagonal royal purple-to-violet gradient background with a semi-transparent subtitle.",
      "commonMistakes": [
        {
          "mistake": "Using opacity on an element when only the background needs transparency.",
          "correction": "Use background-color: rgba(...) instead of opacity: 0.5.",
          "explanation": "Setting opacity: 0.5 on a container fades all child text and buttons too; rgba only affects the background surface."
        },
        {
          "mistake": "Creating low-contrast color combinations that fail WCAG readability standards.",
          "correction": "Ensure at least a 4.5:1 contrast ratio between text color and background color.",
          "explanation": "Low contrast makes text illegible for users with visual impairments or on screens under direct sunlight."
        },
        {
          "mistake": "Forgetting background-size: cover when using full-bleed background images.",
          "correction": "Pair background-image with background-size: cover and background-position: center.",
          "explanation": "By default, images repeat across the background at their native pixel resolution, creating jarring seams."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Modify the gradient angle or colors below. Try switching from linear-gradient to a solid hex or rgba color.",
      "starterCode": "<style>\n  .gradient-box {\n    background: linear-gradient(135deg, #06b6d4, #3b82f6);\n    color: white;\n    padding: 30px;\n    border-radius: 12px;\n    font-family: sans-serif;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n  }\n  .gradient-box h2 {\n    margin-top: 0;\n  }\n</style>\n<div class=\"gradient-box\">\n  <h2>Vibrant CSS Gradient</h2>\n  <p>Linear gradients are lightweight, scalable vector graphics generated purely by the browser engine.</p>\n</div>",
      "solutionCode": "<style>\n  .gradient-box {\n    background: linear-gradient(135deg, #06b6d4, #3b82f6);\n    color: white;\n    padding: 30px;\n    border-radius: 12px;\n    font-family: sans-serif;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n  }\n  .gradient-box h2 {\n    margin-top: 0;\n  }\n</style>\n<div class=\"gradient-box\">\n  <h2>Vibrant CSS Gradient</h2>\n  <p>Linear gradients are lightweight, scalable vector graphics generated purely by the browser engine.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q2-1",
        "level": "Easy",
        "title": "Apply Hex Colors to Text and Background",
        "prompt": "Create a rule for .badge that sets background-color to #dbeafe and text color to #1e40af.",
        "requirements": [
          "Selector .badge",
          "background-color: #dbeafe",
          "color: #1e40af"
        ],
        "starterCode": "/* Write .badge color styling */\n",
        "solutionCode": ".badge {\n  background-color: #dbeafe;\n  color: #1e40af;\n}",
        "expectedOutput": "A light blue badge pill with dark blue accessible text.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.badge\s*\{/i.test(code)) errors.push('Missing .badge selector.');
          if (!/background-color\s*:\s*#dbeafe/i.test(code)) errors.push('Missing background-color: #dbeafe.');
          if (!/color\s*:\s*#1e40af/i.test(code)) errors.push('Missing color: #1e40af.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q2-2",
        "level": "Medium",
        "title": "Semi-Transparent Overlay with RGBA",
        "prompt": "Create a rule for .modal-backdrop setting background-color to rgba(0, 0, 0, 0.6) and a rule for .modal-card setting background-color to #ffffff with color: #0f172a.",
        "requirements": [
          ".modal-backdrop with background-color: rgba(0, 0, 0, 0.6)",
          ".modal-card with background-color: #ffffff and color: #0f172a"
        ],
        "starterCode": "/* Write backdrop and card styling */\n",
        "solutionCode": ".modal-backdrop {\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-card {\n  background-color: #ffffff;\n  color: #0f172a;\n}",
        "expectedOutput": "A 60% darkened background overlay paired with an opaque white dialog card.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.modal-backdrop\s*\{[\s\S]*?background-color\s*:\s*rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.6\s*\)/i.test(code)) {
            errors.push('Missing .modal-backdrop with background-color: rgba(0, 0, 0, 0.6).');
          }
          if (!/\.modal-card\s*\{[\s\S]*?background-color\s*:\s*#ffffff/i.test(code)) {
            errors.push('Missing .modal-card with background-color: #ffffff.');
          }
          if (!/\.modal-card\s*\{[\s\S]*?color\s*:\s*#0f172a/i.test(code)) {
            errors.push('Missing .modal-card with color: #0f172a.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q2-3",
        "level": "Challenge",
        "title": "Create a Diagonal Linear Gradient Card",
        "prompt": "Style .gradient-hero with a linear gradient at 135deg transitioning from #8b5cf6 to #ec4899, set color to #ffffff, and set padding: 32px.",
        "requirements": [
          "Selector .gradient-hero",
          "background or background-image using linear-gradient(135deg, #8b5cf6, #ec4899)",
          "color: #ffffff",
          "padding: 32px"
        ],
        "starterCode": "/* Write gradient hero styling */\n",
        "solutionCode": ".gradient-hero {\n  background: linear-gradient(135deg, #8b5cf6, #ec4899);\n  color: #ffffff;\n  padding: 32px;\n}",
        "expectedOutput": "A stylish 135-degree violet-to-pink gradient banner with white text and 32px inner padding.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.gradient-hero\s*\{/i.test(code)) errors.push('Missing .gradient-hero selector.');
          if (!/linear-gradient\(\s*135deg\s*,\s*#8b5cf6\s*,\s*#ec4899\s*\)/i.test(code)) {
            errors.push('Missing linear-gradient(135deg, #8b5cf6, #ec4899).');
          }
          if (!/color\s*:\s*#ffffff/i.test(code)) errors.push('Missing color: #ffffff.');
          if (!/padding\s*:\s*32px/i.test(code)) errors.push('Missing padding: 32px.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the key advantage of using background-color: rgba(...) over opacity: 0.5?",
        "options": [
          "rgba runs faster on the GPU",
          "rgba allows transparency on the background surface only without making child text transparent",
          "rgba works in HTML4",
          "opacity cannot be used with colors"
        ],
        "correctIndex": 1,
        "explanation": "Setting opacity on an element affects the entire element including all child text and icons, whereas rgba only modifies the specific color property."
      },
      {
        "id": 2,
        "question": "Which CSS declaration ensures a background image scales proportionally to cover its entire container without stretching or repeating?",
        "options": [
          "background-repeat: repeat",
          "background-size: cover",
          "background-attachment: fixed",
          "background-position: left"
        ],
        "correctIndex": 1,
        "explanation": "background-size: cover scales the image proportionally so that both width and height completely cover the container."
      },
      {
        "id": 3,
        "question": "What does the \"A\" in RGBA stand for?",
        "options": [
          "Ascent",
          "Angle",
          "Alpha (transparency level)",
          "Automatic"
        ],
        "correctIndex": 2,
        "explanation": "Alpha specifies the opacity channel, where 1 is 100% opaque and 0 is completely transparent."
      }
    ],
    "video": {
      "title": "How To Handle CSS Colors Like A Senior Dev",
      "channel": "Web Dev Simplified",
      "videoId": "Acs-tJV4iAo",
      "url": "https://www.youtube.com/watch?v=Acs-tJV4iAo",
      "description": "Kyle explains hex codes, RGB, RGBA, HSL, modern color formats, and best practices for web color systems."
    }
  },
  {
    "id": "css-topic-5",
    "order": 5,
    "slug": "text-and-typography",
    "title": "Text and Typography",
    "difficulty": "Intermediate",
    "estimatedTime": "15 min",
    "summary": "Control text presentation with font-family stacks, font-size, font-weight, line-height, letter-spacing, text-transform, and importing web fonts via @import and Google Fonts.",
    "notes": {
      "concept": "Typography establishes readability, brand tone, and cognitive hierarchy. CSS controls font families with fallback font stacks (e.g., Inter, -apple-system, sans-serif), sizing units (px, rem, em), font weights from 100 to 900, line-height for vertical pacing, and letter-spacing for refined headings.",
      "syntax": "/* Font Stack with Fallbacks */\nbody {\n  font-family: 'Inter', system-ui, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  color: #1e293b;\n}\n\n/* Heading Typography */\nh1 {\n  font-size: 2.25rem;\n  font-weight: 700;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}",
      "explanation": "1. font-family: Specifies prioritized font choices; if the first font is unavailable on the user device, the browser moves to the next fallback.\n2. font-size: Sets glyph size. Using rem (root em) ensures fonts scale when users adjust browser accessibility settings.\n3. line-height: Vertical distance between lines of text. Values like 1.5 or 1.6 ensure comfortable paragraph reading.\n4. font-weight: Specifies thickness: 400 (normal), 600 (semi-bold), 700 (bold).\n5. letter-spacing: Adjusts horizontal tracking between characters.\n6. text-transform: Modifies capitalization (uppercase, lowercase, capitalize).",
      "codeExample": "/* Professional Typography Hierarchy */\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  line-height: 1.6;\n  color: #334155;\n}\n\nh1 {\n  font-size: 2rem;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  color: #0f172a;\n}\n\n.caption {\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #64748b;\n}",
      "expectedOutput": "A beautifully balanced text layout with a crisp high-contrast title, comfortable line-height for prose, and an all-caps small caption with generous letter tracking.",
      "commonMistakes": [
        {
          "mistake": "Omitting generic font family fallbacks (e.g. font-family: \"Poppins\" without sans-serif).",
          "correction": "Always end your font stack with a generic family like sans-serif, serif, or monospace.",
          "explanation": "If the custom web font fails to download, the browser will fall back to Times New Roman unless told otherwise."
        },
        {
          "mistake": "Using unitless line-height incorrectly or setting line-height in rigid pixels that clip larger text.",
          "correction": "Use unitless line-height (e.g. line-height: 1.5) so it scales proportionally with font-size.",
          "explanation": "Unitless line-height inherits as a multiplier (1.5 * font-size), avoiding line clipping when heading sizes change."
        },
        {
          "mistake": "Using font-weight: 800 when the loaded font file only includes weights 400 and 700.",
          "correction": "Only declare font-weight values that your imported font files actually support.",
          "explanation": "The browser will synthesize a fake \"faux bold\" that looks distorted and blurry on high-DPI screens."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Experiment with font-weight, line-height, and letter-spacing to see how they dramatically change text readability.",
      "starterCode": "<style>\n  .typography-card {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n    max-width: 380px;\n    padding: 24px;\n    background: white;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n  }\n  .tag {\n    font-size: 11px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #6366f1;\n  }\n  .title {\n    font-size: 22px;\n    font-weight: 800;\n    line-height: 1.25;\n    letter-spacing: -0.02em;\n    color: #0f172a;\n    margin: 6px 0 12px;\n  }\n  .prose {\n    font-size: 14px;\n    line-height: 1.6;\n    color: #475569;\n  }\n</style>\n<div class=\"typography-card\">\n  <span class=\"tag\">Tutorial</span>\n  <h2 class=\"title\">Modern Web Typography</h2>\n  <p class=\"prose\">High-quality typography uses appropriate line-height and letter-spacing to enhance legibility and visual flow.</p>\n</div>",
      "solutionCode": "<style>\n  .typography-card {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n    max-width: 380px;\n    padding: 24px;\n    background: white;\n    border: 1px solid #e2e8f0;\n    border-radius: 8px;\n  }\n  .tag {\n    font-size: 11px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #6366f1;\n  }\n  .title {\n    font-size: 22px;\n    font-weight: 800;\n    line-height: 1.25;\n    letter-spacing: -0.02em;\n    color: #0f172a;\n    margin: 6px 0 12px;\n  }\n  .prose {\n    font-size: 14px;\n    line-height: 1.6;\n    color: #475569;\n  }\n</style>\n<div class=\"typography-card\">\n  <span class=\"tag\">Tutorial</span>\n  <h2 class=\"title\">Modern Web Typography</h2>\n  <p class=\"prose\">High-quality typography uses appropriate line-height and letter-spacing to enhance legibility and visual flow.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q5-1",
        "level": "Easy",
        "title": "Set Font Stack and Line Height",
        "prompt": "Create a rule for body that sets font-family to \"Inter\", sans-serif and line-height to 1.6.",
        "requirements": [
          "Selector body",
          "font-family: \"Inter\", sans-serif (or single quotes)",
          "line-height: 1.6"
        ],
        "starterCode": "/* Write body typography rule */\n",
        "solutionCode": "body {\n  font-family: \"Inter\", sans-serif;\n  line-height: 1.6;\n}",
        "expectedOutput": "Clean body prose formatted with the Inter font stack and proportional line spacing.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/body\s*\{/i.test(code)) errors.push('Missing body selector.');
          if (!/font-family\s*:\s*["']Inter["']\s*,\s*sans-serif/i.test(code)) {
            errors.push('Missing font-family: "Inter", sans-serif.');
          }
          if (!/line-height\s*:\s*1\.6/i.test(code)) errors.push('Missing line-height: 1.6.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q5-2",
        "level": "Medium",
        "title": "Style an Uppercase Section Tag",
        "prompt": "Create a rule for .section-label setting font-size to 12px, font-weight to 700, text-transform to uppercase, and letter-spacing to 0.05em.",
        "requirements": [
          "Selector .section-label",
          "font-size: 12px",
          "font-weight: 700",
          "text-transform: uppercase",
          "letter-spacing: 0.05em"
        ],
        "starterCode": "/* Write .section-label rule */\n",
        "solutionCode": ".section-label {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}",
        "expectedOutput": "A compact, tracked-out uppercase label suitable for card headers and category badges.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.section-label\s*\{/i.test(code)) errors.push('Missing .section-label selector.');
          if (!/font-size\s*:\s*12px/i.test(code)) errors.push('Missing font-size: 12px.');
          if (!/font-weight\s*:\s*700/i.test(code)) errors.push('Missing font-weight: 700.');
          if (!/text-transform\s*:\s*uppercase/i.test(code)) errors.push('Missing text-transform: uppercase.');
          if (!/letter-spacing\s*:\s*0?\.05em/i.test(code)) errors.push('Missing letter-spacing: 0.05em.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q5-3",
        "level": "Challenge",
        "title": "Hero Title with Tight Letter-Spacing and REM Units",
        "prompt": "Style .hero-title with font-size: 2.5rem, font-weight: 800, line-height: 1.2, letter-spacing: -0.03em, and color: #0f172a.",
        "requirements": [
          "Selector .hero-title",
          "font-size: 2.5rem",
          "font-weight: 800",
          "line-height: 1.2",
          "letter-spacing: -0.03em",
          "color: #0f172a"
        ],
        "starterCode": "/* Write .hero-title rule */\n",
        "solutionCode": ".hero-title {\n  font-size: 2.5rem;\n  font-weight: 800;\n  line-height: 1.2;\n  letter-spacing: -0.03em;\n  color: #0f172a;\n}",
        "expectedOutput": "A punchy, modern headline with tight negative letter spacing and optical leading.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.hero-title\s*\{/i.test(code)) errors.push('Missing .hero-title selector.');
          if (!/font-size\s*:\s*2\.5rem/i.test(code)) errors.push('Missing font-size: 2.5rem.');
          if (!/font-weight\s*:\s*800/i.test(code)) errors.push('Missing font-weight: 800.');
          if (!/line-height\s*:\s*1\.2/i.test(code)) errors.push('Missing line-height: 1.2.');
          if (!/letter-spacing\s*:\s*-0?\.03em/i.test(code)) errors.push('Missing letter-spacing: -0.03em.');
          if (!/color\s*:\s*#0f172a/i.test(code)) errors.push('Missing color: #0f172a.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why should font stacks end with a generic family like sans-serif or serif?",
        "options": [
          "It is required by the JavaScript engine",
          "It tells the browser what default category of font to substitute if previous custom fonts fail to load",
          "It changes the text color to black",
          "It enables browser caching"
        ],
        "correctIndex": 1,
        "explanation": "Generic font families guarantee that if custom or system fonts cannot be found, the browser picks an appropriate fallback font category."
      },
      {
        "id": 2,
        "question": "What is the recommended approach for line-height on readable paragraph text?",
        "options": [
          "Exact pixels like line-height: 14px",
          "Unitless values like line-height: 1.5 or 1.6 that scale with font size",
          "line-height: 0",
          "line-height: 100%"
        ],
        "correctIndex": 1,
        "explanation": "Unitless line-height acts as a multiplier of the current font-size, automatically adapting when nested font sizes change."
      },
      {
        "id": 3,
        "question": "Which property and value transforms lowercase text into all capital letters?",
        "options": [
          "font-style: uppercase",
          "text-decoration: uppercase",
          "text-transform: uppercase",
          "font-variant: caps"
        ],
        "correctIndex": 2,
        "explanation": "text-transform: uppercase converts text to all uppercase characters without changing the underlying HTML source code."
      }
    ],
    "video": {
      "title": "Beginner's guide to styling text with CSS",
      "channel": "Kevin Powell",
      "videoId": "t2J0i4Nn62w",
      "url": "https://www.youtube.com/watch?v=t2J0i4Nn62w",
      "description": "Kevin Powell covers font-family, font-size, inheritance, line-height, and typography best practices."
    }
  },
  {
    "id": "css-topic-6",
    "order": 6,
    "slug": "box-model",
    "title": "CSS Box Model",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Master the core architecture of CSS layout: Content, Padding, Border, Margin, and why box-sizing: border-box is an industry standard.",
    "notes": {
      "concept": "Every element on a web page is treated by the browser as a rectangular box. The CSS Box Model defines the concentric layers of this box: the inner Content area (text, images), surrounded by Padding (clear space inside the border), enclosed by a Border, and separated from neighbors by Margin (clear space outside the border). Understanding box-sizing: border-box prevents unexpected element overflow.",
      "syntax": "/* Modern Universal Box Sizing Reset */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Explicit Box Model Declarations */\n.box {\n  width: 300px;        /* Content width */\n  padding: 20px;       /* Inner clearance */\n  border: 2px solid;   /* Boundary line */\n  margin: 16px;        /* Outer clearance */\n}",
      "explanation": "1. Content Area: The innermost rectangle where text, images, and child elements render.\n2. Padding: Transparent space between the content and the border. Background colors extend under padding.\n3. Border: The line wrapping around the padding and content.\n4. Margin: Clear space separating this element from adjacent elements in the layout.\n5. content-box (default): width only sets content; padding and border add extra width to the element!\n6. border-box (standard): width sets the total rendered width including padding and border.",
      "codeExample": "/* Two boxes demonstrating border-box predictability */\n* {\n  box-sizing: border-box;\n}\n\n.feature-box {\n  width: 320px;\n  padding: 24px;\n  border: 2px solid #cbd5e1;\n  margin-bottom: 20px;\n  background-color: #ffffff;\n}\n\n/* The box remains exactly 320px wide despite 24px padding and 2px border! */",
      "expectedOutput": "A clean 320px wide card that maintains its exact geometric width on screen, preventing horizontal scrollbars or broken grid columns.",
      "commonMistakes": [
        {
          "mistake": "Leaving box-sizing set to legacy content-box, causing elements to unexpectedly exceed width: 100%.",
          "correction": "Apply *, *::before, *::after { box-sizing: border-box; } at the top of your global stylesheet.",
          "explanation": "Under content-box, adding 20px padding to a 100% wide element results in 100% + 40px, causing horizontal page scrolling."
        },
        {
          "mistake": "Confusing padding with margin.",
          "correction": "Use padding for inner spacing inside the border; use margin for space pushing other elements away.",
          "explanation": "Padding clicks and reveals background colors; margins are transparent spacing outside the element boundary."
        },
        {
          "mistake": "Expecting vertical margins to apply on inline elements (like <span>).",
          "correction": "Set display: inline-block or display: block on the element first.",
          "explanation": "Vertical margins (margin-top, margin-bottom) have no effect on non-replaced inline elements."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Inspect how padding pushes content inward from the border while margin pushes the whole box away. Try toggling box-sizing.",
      "starterCode": "<style>\n  .box-model-demo {\n    box-sizing: border-box;\n    width: 280px;\n    padding: 24px;\n    border: 4px dashed #6366f1;\n    margin: 20px auto;\n    background-color: #eef2ff;\n    font-family: sans-serif;\n    text-align: center;\n  }\n</style>\n<div class=\"box-model-demo\">\n  <strong>Content Area</strong>\n  <p style=\"margin: 8px 0 0; font-size: 13px;\">Padding sits between this text and the dashed border.</p>\n</div>",
      "solutionCode": "<style>\n  .box-model-demo {\n    box-sizing: border-box;\n    width: 280px;\n    padding: 24px;\n    border: 4px dashed #6366f1;\n    margin: 20px auto;\n    background-color: #eef2ff;\n    font-family: sans-serif;\n    text-align: center;\n  }\n</style>\n<div class=\"box-model-demo\">\n  <strong>Content Area</strong>\n  <p style=\"margin: 8px 0 0; font-size: 13px;\">Padding sits between this text and the dashed border.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q3-1",
        "level": "Easy",
        "title": "Apply Universal Border-Box Reset",
        "prompt": "Write the universal CSS reset rule targeting *, *::before, *::after that sets box-sizing to border-box.",
        "requirements": [
          "Selector: *, *::before, *::after",
          "box-sizing: border-box"
        ],
        "starterCode": "/* Write universal box-sizing reset */\n",
        "solutionCode": "*, *::before, *::after {\n  box-sizing: border-box;\n}",
        "expectedOutput": "Universal box-sizing configuration ensuring predictable sizing calculations across the entire DOM tree.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\*,\s*\*::before,\s*\*::after/i.test(code)) {
            errors.push('Missing selector *, *::before, *::after.');
          }
          if (!/box-sizing\s*:\s*border-box/i.test(code)) {
            errors.push('Missing box-sizing: border-box.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q3-2",
        "level": "Medium",
        "title": "Configure Box Model Dimensions",
        "prompt": "Create a rule for .profile-card: set width: 300px, padding: 20px, border: 1px solid #e2e8f0, and margin: 16px.",
        "requirements": [
          "Selector: .profile-card",
          "width: 300px",
          "padding: 20px",
          "border: 1px solid #e2e8f0",
          "margin: 16px"
        ],
        "starterCode": "/* Write .profile-card box model properties */\n",
        "solutionCode": ".profile-card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #e2e8f0;\n  margin: 16px;\n}",
        "expectedOutput": "A structured profile card with distinct content, padding, border, and outer margin layers.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.profile-card\s*\{/i.test(code)) errors.push('Missing .profile-card selector.');
          if (!/width\s*:\s*300px/i.test(code)) errors.push('Missing width: 300px.');
          if (!/padding\s*:\s*20px/i.test(code)) errors.push('Missing padding: 20px.');
          if (!/border\s*:\s*1px\s+solid\s+#e2e8f0/i.test(code)) errors.push('Missing border: 1px solid #e2e8f0.');
          if (!/margin\s*:\s*16px/i.test(code)) errors.push('Missing margin: 16px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q3-3",
        "level": "Challenge",
        "title": "Horizontal Centering with Box Model",
        "prompt": "Create a rule for .container-center: set max-width: 800px, box-sizing: border-box, padding: 0 24px, and center it horizontally using margin: 0 auto.",
        "requirements": [
          "Selector .container-center",
          "max-width: 800px",
          "box-sizing: border-box",
          "padding: 0 24px",
          "margin: 0 auto"
        ],
        "starterCode": "/* Write centered container rule */\n",
        "solutionCode": ".container-center {\n  max-width: 800px;\n  box-sizing: border-box;\n  padding: 0 24px;\n  margin: 0 auto;\n}",
        "expectedOutput": "A responsive container capped at 800px wide, centered in the viewport with 24px inner gutters.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.container-center\s*\{/i.test(code)) errors.push('Missing .container-center selector.');
          if (!/max-width\s*:\s*800px/i.test(code)) errors.push('Missing max-width: 800px.');
          if (!/box-sizing\s*:\s*border-box/i.test(code)) errors.push('Missing box-sizing: border-box.');
          if (!/padding\s*:\s*0\s+24px/i.test(code)) errors.push('Missing padding: 0 24px.');
          if (!/margin\s*:\s*0\s+auto/i.test(code)) errors.push('Missing margin: 0 auto.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the order of the CSS Box Model from innermost layer to outermost layer?",
        "options": [
          "Margin -> Border -> Padding -> Content",
          "Content -> Padding -> Border -> Margin",
          "Padding -> Content -> Margin -> Border",
          "Content -> Margin -> Padding -> Border"
        ],
        "correctIndex": 1,
        "explanation": "From the inside out: Content holds the data, Padding cushions the content, Border frames the padding, and Margin separates the box from neighbors."
      },
      {
        "id": 2,
        "question": "Under default box-sizing: content-box, what is the total rendered width of an element with width: 200px, padding: 20px, and border: 2px solid black?",
        "options": [
          "200px",
          "222px",
          "244px",
          "220px"
        ],
        "correctIndex": 2,
        "explanation": "Under content-box: Total Width = 200 (content) + 20*2 (padding left & right) + 2*2 (border left & right) = 244px."
      },
      {
        "id": 3,
        "question": "Why do professional web developers recommend box-sizing: border-box?",
        "options": [
          "It makes fonts render in bold",
          "It includes padding and border within the declared width, preventing layout breakage and unexpected overflow",
          "It disables all CSS margins",
          "It allows CSS animations to run at 120 FPS"
        ],
        "correctIndex": 1,
        "explanation": "With border-box, declaring width: 200px guarantees the element will measure exactly 200px wide, regardless of how much padding or border you add."
      }
    ],
    "video": {
      "title": "Learn CSS Box Model In 8 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "rIO5326FgPE",
      "url": "https://www.youtube.com/watch?v=rIO5326FgPE",
      "description": "Kyle visualizes the four box model layers and clearly demonstrates why border-box is essential."
    }
  },
  {
    "id": "css-topic-7",
    "order": 7,
    "slug": "margin-and-padding",
    "title": "Margin and Padding",
    "difficulty": "Beginner",
    "estimatedTime": "12 min",
    "summary": "Understand spacing in depth: 1, 2, 3, and 4-value shorthand syntax, margin collapsing between block elements, negative margins, and auto-margins for horizontal centering.",
    "notes": {
      "concept": "Spacing is fundamental to visual design. Padding creates breathing room inside an element, between its content and its border. Margin creates breathing room outside an element, separating it from adjacent siblings. CSS provides directional shorthands (top, right, bottom, left) that follow a clockwise pattern.",
      "syntax": "/* Shorthand clockwise: TOP, RIGHT, BOTTOM, LEFT */\npadding: 10px 20px 15px 5px;\n\n/* 2-value shorthand: [TOP & BOTTOM] [LEFT & RIGHT] */\npadding: 16px 24px;\n\n/* Horizontal Centering with Auto Margins */\nmargin: 0 auto;\n\n/* Individual side declarations */\nmargin-top: 24px;\npadding-left: 12px;",
      "explanation": "1. 1-value syntax (padding: 16px): Applies 16px to all 4 sides.\n2. 2-value syntax (padding: 12px 24px): 12px Top & Bottom, 24px Left & Right.\n3. 4-value syntax (padding: 10px 20px 30px 40px): Clockwise rule: Top (10), Right (20), Bottom (30), Left (40).\n4. margin: 0 auto: Automatically divides available horizontal space equally, centering block elements with a declared width.\n5. Margin Collapse: When two vertical block margins touch, they combine into the larger single margin rather than adding together.",
      "codeExample": "/* Centered article card with balanced rhythm */\n.article-card {\n  width: 90%;\n  max-width: 600px;\n  margin: 40px auto;     /* 40px vertical, centered horizontally */\n  padding: 32px 24px;    /* 32px vertical, 24px horizontal gutters */\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n}\n\n.article-title {\n  margin-top: 0;\n  margin-bottom: 12px;\n}",
      "expectedOutput": "A perfectly centered article container with 40px clearance above and below, 24px side gutters, and clean 12px paragraph spacing.",
      "commonMistakes": [
        {
          "mistake": "Forgetting the clockwise direction order of the 4-value shorthand (TRouBLe: Top, Right, Bottom, Left).",
          "correction": "Remember the mnemonic \"TRBL\" (Trouble): Top, Right, Bottom, Left.",
          "explanation": "Accidentally swapping values results in horizontal padding being applied vertically instead."
        },
        {
          "mistake": "Trying to use margin: auto to center an element that has no declared width or max-width.",
          "correction": "Always specify a width or max-width (e.g. max-width: 600px) when using margin: 0 auto.",
          "explanation": "Block elements naturally take 100% width by default, leaving zero leftover margin space for auto to divide."
        },
        {
          "mistake": "Being caught off-guard by margin collapse between adjacent paragraphs.",
          "correction": "Remember that an element with margin-bottom: 20px above one with margin-top: 15px results in 20px total space, not 35px.",
          "explanation": "Vertical margins collapse into the single largest value according to CSS layout rules."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Notice how changing padding alters the internal breathing room, while margin: 0 auto keeps the box centered in the preview pane.",
      "starterCode": "<style>\n  .spacing-demo {\n    max-width: 320px;\n    margin: 20px auto;\n    padding: 24px 16px;\n    background: #f1f5f9;\n    border: 2px solid #94a3b8;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n</style>\n<div class=\"spacing-demo\">\n  <h4 style=\"margin: 0 0 8px;\">Margin vs Padding</h4>\n  <p style=\"margin: 0; font-size: 13px;\">Padding creates space inside this grey box. Margin centers it horizontally.</p>\n</div>",
      "solutionCode": "<style>\n  .spacing-demo {\n    max-width: 320px;\n    margin: 20px auto;\n    padding: 24px 16px;\n    background: #f1f5f9;\n    border: 2px solid #94a3b8;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n</style>\n<div class=\"spacing-demo\">\n  <h4 style=\"margin: 0 0 8px;\">Margin vs Padding</h4>\n  <p style=\"margin: 0; font-size: 13px;\">Padding creates space inside this grey box. Margin centers it horizontally.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q4-1",
        "level": "Easy",
        "title": "Apply 2-Value Padding Shorthand",
        "prompt": "Create a rule for .button-pill that sets padding with 10px vertical and 20px horizontal using 2-value shorthand.",
        "requirements": [
          "Selector .button-pill",
          "padding: 10px 20px"
        ],
        "starterCode": "/* Write 2-value padding shorthand */\n",
        "solutionCode": ".button-pill {\n  padding: 10px 20px;\n}",
        "expectedOutput": "A button pill with 10px top/bottom padding and 20px left/right padding.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.button-pill\s*\{/i.test(code)) errors.push('Missing .button-pill selector.');
          if (!/padding\s*:\s*10px\s+20px/i.test(code)) errors.push('Missing padding: 10px 20px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q4-2",
        "level": "Medium",
        "title": "Clockwise 4-Value Margin Shorthand",
        "prompt": "Write a rule for .banner with margin using 4-value shorthand: 20px top, 15px right, 30px bottom, and 10px left.",
        "requirements": [
          "Selector .banner",
          "margin: 20px 15px 30px 10px"
        ],
        "starterCode": "/* Write 4-value margin shorthand */\n",
        "solutionCode": ".banner {\n  margin: 20px 15px 30px 10px;\n}",
        "expectedOutput": "An element with clockwise directional margins applied independently to all 4 edges.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.banner\s*\{/i.test(code)) errors.push('Missing .banner selector.');
          if (!/margin\s*:\s*20px\s+15px\s+30px\s+10px/i.test(code)) {
            errors.push('Missing margin: 20px 15px 30px 10px.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q4-3",
        "level": "Challenge",
        "title": "Centered Card with Asymmetric Inner Padding",
        "prompt": "Style .featured-panel: set max-width: 500px, center it horizontally with margin: 0 auto, set padding-top: 32px, padding-bottom: 24px, and horizontal padding using padding-left: 20px, padding-right: 20px (or shorthand).",
        "requirements": [
          "Selector .featured-panel",
          "max-width: 500px",
          "margin: 0 auto",
          "padding with 32px top, 20px right, 24px bottom, 20px left"
        ],
        "starterCode": "/* Write featured panel styling */\n",
        "solutionCode": ".featured-panel {\n  max-width: 500px;\n  margin: 0 auto;\n  padding: 32px 20px 24px 20px;\n}",
        "expectedOutput": "A centered panel with 500px max width and customized top/bottom/side padding.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.featured-panel\s*\{/i.test(code)) errors.push('Missing .featured-panel selector.');
          if (!/max-width\s*:\s*500px/i.test(code)) errors.push('Missing max-width: 500px.');
          if (!/margin\s*:\s*0\s+auto/i.test(code)) errors.push('Missing margin: 0 auto.');
          const hasShorthand = /padding\s*:\s*32px\s+20px\s+24px(\s+20px)?/i.test(code);
          const hasLonghand =
            /padding-top\s*:\s*32px/i.test(code) &&
            /padding-bottom\s*:\s*24px/i.test(code) &&
            /padding-left\s*:\s*20px/i.test(code) &&
            /padding-right\s*:\s*20px/i.test(code);
          if (!hasShorthand && !hasLonghand) {
            errors.push('Missing required padding (32px top, 20px horizontal, 24px bottom).');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "In the shorthand padding: 10px 20px 30px 40px;, which value represents the left padding?",
        "options": [
          "10px",
          "20px",
          "30px",
          "40px"
        ],
        "correctIndex": 3,
        "explanation": "The 4-value shorthand follows clockwise order: Top (10px), Right (20px), Bottom (30px), Left (40px)."
      },
      {
        "id": 2,
        "question": "What is \"margin collapsing\" in CSS?",
        "options": [
          "When negative margins make text invisible",
          "When adjacent vertical margins between block elements combine into the single largest value rather than adding together",
          "When margins disappear on mobile screens",
          "When padding overrides margins"
        ],
        "correctIndex": 1,
        "explanation": "In block layouts, adjoining vertical margins collapse into a single margin whose size is the maximum of the adjacent margins."
      },
      {
        "id": 3,
        "question": "Why is a declared width or max-width necessary for margin: 0 auto to center an element?",
        "options": [
          "Because without a width constraint, block elements naturally take 100% width, leaving zero space to distribute",
          "Because auto margins only work on flexbox items",
          "Because the browser crashes otherwise",
          "It is not necessary"
        ],
        "correctIndex": 0,
        "explanation": "Block elements expand to 100% width by default. Giving them a smaller width allows the browser to distribute leftover space equally on left and right."
      }
    ],
    "video": {
      "title": "Margin and Padding Deep Dive: The basics",
      "channel": "Kevin Powell",
      "videoId": "EhbZGV2dqZ4",
      "url": "https://www.youtube.com/watch?v=EhbZGV2dqZ4",
      "description": "Kevin Powell breaks down margin collapse, padding mechanics, and common layout misunderstandings."
    }
  },
  {
    "id": "css-topic-8",
    "order": 8,
    "slug": "borders-and-border-radius",
    "title": "Borders and Border Radius",
    "difficulty": "Beginner",
    "estimatedTime": "12 min",
    "summary": "Frame elements using border width, style, color shorthand, border-radius for rounded corners and circles, box-shadow for depth, and accessible focus outlines.",
    "notes": {
      "concept": "Borders define element perimeters and delineate user interface regions. The border property combines width, style (solid, dashed, dotted), and color. With border-radius, hard corners can be rounded or turned into complete circles (50%). Outlines sit outside the border without shifting layout, making outline essential for accessible keyboard focus rings.",
      "syntax": "/* Border Shorthand: [width] [style] [color] */\nborder: 1px solid #cbd5e1;\n\n/* Specific side border */\nborder-bottom: 2px solid #6366f1;\n\n/* Rounded Corners & Circular Avatars */\nborder-radius: 8px;\nborder-radius: 50%; /* Perfect circle if width equals height */\n\n/* Drop Shadow for Elevation */\nbox-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n\n/* Accessible Focus Outline */\nbutton:focus-visible {\n  outline: 2px solid #6366f1;\n  outline-offset: 2px;\n}",
      "explanation": "1. border: Combines border-width, border-style, and border-color into a single declaration.\n2. border-radius: Rounds the outer corners of an element. Using 50% on a square element creates a circle.\n3. box-shadow: Creates elevation: [offset-x] [offset-y] [blur-radius] [spread-radius] [color].\n4. outline: Differs from border because it does NOT take up space in the box model or shift adjacent content.\n5. outline-offset: Creates a clean gap between the element edge and the focus outline.",
      "codeExample": "/* Modern Elevated Card with Rounded Borders */\n.product-card {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background-color: #ffffff;\n  padding: 24px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\n}\n\n.avatar-circle {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  border: 2px solid #6366f1;\n}",
      "expectedOutput": "A card with rounded corners, subtle border, and soft drop shadow, paired with a 64px circular avatar framed in indigo.",
      "commonMistakes": [
        {
          "mistake": "Removing focus outlines entirely with outline: none without providing an accessible alternative.",
          "correction": "Always provide a clear focus indicator, e.g. using :focus-visible { outline: 2px solid #6366f1; }.",
          "explanation": "Keyboard users navigate with Tab; removing outlines makes it impossible to see which button or input is active."
        },
        {
          "mistake": "Setting border-radius: 50% on a non-square element (width != height), creating an ellipse.",
          "correction": "Ensure width and height are equal before setting border-radius: 50% for a circle.",
          "explanation": "50% calculates based on element width and height; unequal dimensions produce an egg-shaped oval."
        },
        {
          "mistake": "Using heavy, dark box-shadows (e.g. rgba(0,0,0,0.8)) that look harsh and dated.",
          "correction": "Use soft shadows with subtle opacity: 0 4px 6px -1px rgba(0, 0, 0, 0.08).",
          "explanation": "Real-world light produces diffused, subtle shadows rather than dark black rings."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Experiment with border-radius and box-shadow. Try changing border-radius to 50% or tweaking the shadow blur radius.",
      "starterCode": "<style>\n  .card-box {\n    width: 260px;\n    padding: 20px;\n    background: white;\n    border: 2px solid #e2e8f0;\n    border-radius: 12px;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n    font-family: sans-serif;\n  }\n  .circle-badge {\n    width: 48px;\n    height: 48px;\n    background: #6366f1;\n    color: white;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: bold;\n    margin-bottom: 12px;\n  }\n</style>\n<div class=\"card-box\">\n  <div class=\"circle-badge\">CF</div>\n  <h4 style=\"margin: 0 0 6px;\">Rounded & Shadowed</h4>\n  <p style=\"margin: 0; font-size: 13px; color: #64748b;\">border-radius curves the corners, while box-shadow simulates elevation.</p>\n</div>",
      "solutionCode": "<style>\n  .card-box {\n    width: 260px;\n    padding: 20px;\n    background: white;\n    border: 2px solid #e2e8f0;\n    border-radius: 12px;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n    font-family: sans-serif;\n  }\n  .circle-badge {\n    width: 48px;\n    height: 48px;\n    background: #6366f1;\n    color: white;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: bold;\n    margin-bottom: 12px;\n  }\n</style>\n<div class=\"card-box\">\n  <div class=\"circle-badge\">CF</div>\n  <h4 style=\"margin: 0 0 6px;\">Rounded & Shadowed</h4>\n  <p style=\"margin: 0; font-size: 13px; color: #64748b;\">border-radius curves the corners, while box-shadow simulates elevation.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q6-1",
        "level": "Easy",
        "title": "Apply Border and Border-Radius",
        "prompt": "Create a rule for .badge-box that sets border to 2px solid #3b82f6 and border-radius to 8px.",
        "requirements": [
          "Selector .badge-box",
          "border: 2px solid #3b82f6",
          "border-radius: 8px"
        ],
        "starterCode": "/* Write .badge-box border styling */\n",
        "solutionCode": ".badge-box {\n  border: 2px solid #3b82f6;\n  border-radius: 8px;\n}",
        "expectedOutput": "A box framed by a 2px blue border with smooth 8px rounded corners.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.badge-box\s*\{/i.test(code)) errors.push('Missing .badge-box selector.');
          if (!/border\s*:\s*2px\s+solid\s+#3b82f6/i.test(code)) errors.push('Missing border: 2px solid #3b82f6.');
          if (!/border-radius\s*:\s*8px/i.test(code)) errors.push('Missing border-radius: 8px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q6-2",
        "level": "Medium",
        "title": "Circular Avatar with Accent Border",
        "prompt": "Style .avatar-img: set width: 80px, height: 80px, border-radius: 50%, and border: 3px solid #10b981.",
        "requirements": [
          "Selector .avatar-img",
          "width: 80px",
          "height: 80px",
          "border-radius: 50%",
          "border: 3px solid #10b981"
        ],
        "starterCode": "/* Write circular avatar rule */\n",
        "solutionCode": ".avatar-img {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  border: 3px solid #10b981;\n}",
        "expectedOutput": "A perfect 80x80 circular avatar framed by an emerald border.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.avatar-img\s*\{/i.test(code)) errors.push('Missing .avatar-img selector.');
          if (!/width\s*:\s*80px/i.test(code)) errors.push('Missing width: 80px.');
          if (!/height\s*:\s*80px/i.test(code)) errors.push('Missing height: 80px.');
          if (!/border-radius\s*:\s*50%/i.test(code)) errors.push('Missing border-radius: 50%.');
          if (!/border\s*:\s*3px\s+solid\s+#10b981/i.test(code)) errors.push('Missing border: 3px solid #10b981.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q6-3",
        "level": "Challenge",
        "title": "Card with Box-Shadow and Focus Outline",
        "prompt": "Create two rules: 1) .interactive-card with border: 1px solid #e2e8f0, border-radius: 12px, and box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 2) .interactive-card:focus-visible with outline: 2px solid #6366f1 and outline-offset: 2px.",
        "requirements": [
          ".interactive-card with border: 1px solid #e2e8f0, border-radius: 12px, and box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          ".interactive-card:focus-visible with outline: 2px solid #6366f1 and outline-offset: 2px"
        ],
        "starterCode": "/* Write interactive card and focus rules */\n",
        "solutionCode": ".interactive-card {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n}\n\n.interactive-card:focus-visible {\n  outline: 2px solid #6366f1;\n  outline-offset: 2px;\n}",
        "expectedOutput": "An accessible, elevated card component with rounded corners, subtle drop shadow, and high-contrast keyboard focus ring.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.interactive-card\s*\{[\s\S]*?border\s*:\s*1px\s+solid\s+#e2e8f0/i.test(code)) {
            errors.push('Missing .interactive-card border.');
          }
          if (!/\.interactive-card\s*\{[\s\S]*?border-radius\s*:\s*12px/i.test(code)) {
            errors.push('Missing .interactive-card border-radius: 12px.');
          }
          if (!/\.interactive-card\s*\{[\s\S]*?box-shadow\s*:\s*0\s+4px\s+6px\s+-1px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.1\s*\)/i.test(code)) {
            errors.push('Missing .interactive-card box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1).');
          }
          if (!/\.interactive-card:focus-visible\s*\{[\s\S]*?outline\s*:\s*2px\s+solid\s+#6366f1/i.test(code)) {
            errors.push('Missing .interactive-card:focus-visible outline: 2px solid #6366f1.');
          }
          if (!/\.interactive-card:focus-visible\s*\{[\s\S]*?outline-offset\s*:\s*2px/i.test(code)) {
            errors.push('Missing outline-offset: 2px.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the main difference between border and outline?",
        "options": [
          "outline cannot have color",
          "outline does not take up space in the box model and does not cause adjacent elements to shift",
          "border is only for buttons",
          "outline cannot be styled"
        ],
        "correctIndex": 1,
        "explanation": "Outlines are rendered outside the element boundary without altering document geometry or causing layout recalculations."
      },
      {
        "id": 2,
        "question": "What requirement must be met for border-radius: 50% to render an exact circle?",
        "options": [
          "The element must have equal width and height",
          "The element must have position: absolute",
          "The element must be a <div>",
          "The background must be transparent"
        ],
        "correctIndex": 0,
        "explanation": "border-radius calculates radii based on the element dimensions. An exact circle requires equal width and height."
      },
      {
        "id": 3,
        "question": "Why should outline: none never be used without an alternative focus style?",
        "options": [
          "It breaks touch scrolling on phones",
          "It destroys keyboard accessibility, leaving keyboard users unable to see where focus is located",
          "It disables link clicks",
          "It is rejected by modern browsers"
        ],
        "correctIndex": 1,
        "explanation": "Removing focus rings without a visible replacement renders the site inaccessible to keyboard-only and screen reader navigation."
      }
    ],
    "video": {
      "title": "CSS Full Course for Beginners - Borders, Outlines & Shadows",
      "channel": "Dave Gray on freeCodeCamp",
      "videoId": "OXGznpKZ_sA",
      "url": "https://www.youtube.com/watch?v=OXGznpKZ_sA",
      "description": "Dave Gray walks through border shorthand, border-radius, box-shadows, and accessible outline styling."
    }
  },
  {
    "id": "css-topic-9",
    "order": 9,
    "slug": "display-and-visibility",
    "title": "Display and Visibility",
    "difficulty": "Beginner",
    "estimatedTime": "15 min",
    "summary": "Master the fundamental CSS display modes: block, inline, and inline-block. Understand the critical distinction between display: none (completely removed from layout flow) versus visibility: hidden (invisible but preserves occupied physical space).",
    "notes": {
      "concept": "The display property defines how an element generates visual boxes in the page formatting context. Block elements stack vertically and stretch to fill parent width. Inline elements sit alongside text, respecting only horizontal margins and padding. Inline-block bridges the gap by sitting inline while respecting full width, height, and vertical spacing.",
      "syntax": "/* Block: Full width, stacks vertically */\n.block-element {\n  display: block;\n}\n\n/* Inline: Sits in text flow, ignores width/height */\n.inline-element {\n  display: inline;\n}\n\n/* Inline-block: Sits in line, respects width/height/padding */\n.btn {\n  display: inline-block;\n  width: 120px;\n}\n\n/* Hidden (Removed from DOM layout flow) */\n.hidden-removed {\n  display: none;\n}\n\n/* Invisible (Occupies physical space) */\n.invisible-space {\n  visibility: hidden;\n}",
      "explanation": "1. display: block: Starts on a new line and expands to fill the full container width (e.g. <div>, <p>, <h1>).\\n2. display: inline: Does not start on a new line; width and height declarations are completely ignored (e.g. <span>, <a>).\\n3. display: inline-block: Renders inline with neighboring elements, but allows setting custom width, height, margin, and padding (essential for buttons).\\n4. display: none vs visibility: hidden: display: none completely collapses the element from layout calculation; visibility: hidden makes it visually transparent while retaining its exact width, height, and surrounding flow.",
      "codeExample": "/* Navigation items using inline-block */\n.nav-item {\n  display: inline-block;\n  padding: 8px 16px;\n  margin-right: 8px;\n  background-color: #334155;\n  color: #f8fafc;\n  border-radius: 4px;\n  text-decoration: none;\n}",
      "expectedOutput": "A horizontal row of button-like navigation links that flow naturally alongside each other with consistent internal padding.",
      "commonMistakes": [
        {
          "mistake": "Trying to apply width, height, or top/bottom margin to a display: inline element: span { width: 200px; }",
          "correction": "Change the display mode to inline-block or block: span { display: inline-block; width: 200px; }",
          "explanation": "Inline elements format according to font glyphs; the browser engine ignores custom width, height, and vertical margins on pure inline boxes."
        },
        {
          "mistake": "Using visibility: hidden expecting the page content below to shift up and close the empty space.",
          "correction": "Use display: none if you want surrounding elements to collapse into the space.",
          "explanation": "visibility: hidden hides pixels visually like an invisible ghost, but still occupies its full allocated box dimensions."
        },
        {
          "mistake": "Forgetting that inline-block elements preserve whitespace in HTML source code.",
          "correction": "Remove space between inline-block tags, or use Flexbox (display: flex) instead.",
          "explanation": "Newlines and tabs between inline-block elements render as 4px typographical spaces in the browser."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Toggle between display: none and visibility: hidden on the middle card to observe the difference in surrounding layout spacing.",
      "starterCode": "<style>\n  .box { padding: 12px; background: #2563eb; color: white; margin-bottom: 8px; border-radius: 6px; }\n  .middle { display: none; /* Try visibility: hidden; instead! */ }\n</style>\n<div class=\"box\">Box 1 (Top)</div>\n<div class=\"box middle\">Box 2 (Middle - Hidden)</div>\n<div class=\"box\">Box 3 (Bottom - Notice where I am positioned)</div>",
      "solutionCode": "<style>\n  .box { padding: 12px; background: #2563eb; color: white; margin-bottom: 8px; border-radius: 6px; }\n  .middle { display: none; }\n</style>\n<div class=\"box\">Box 1 (Top)</div>\n<div class=\"box middle\">Box 2 (Middle - Hidden)</div>\n<div class=\"box\">Box 3 (Bottom - Notice where I am positioned)</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q9-1",
        "level": "Easy",
        "title": "Make a Span Inline-Block",
        "prompt": "Write a ruleset for class .badge setting display: inline-block, padding: 4px 8px, and border-radius: 9999px.",
        "requirements": [
          "Target .badge selector",
          "Set display: inline-block",
          "Set padding: 4px 8px",
          "Set border-radius: 9999px"
        ],
        "starterCode": "/* Write .badge ruleset */\n",
        "solutionCode": ".badge {\n  display: inline-block;\n  padding: 4px 8px;\n  border-radius: 9999px;\n}",
        "expectedOutput": "Inline pill badge with custom horizontal padding and rounded ends.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.badge\s*\{/i.test(code)) return { valid: false, message: 'Missing .badge class selector.' };
        if (!/display\s*:\s*inline-block/i.test(code)) return { valid: false, message: 'Missing display: inline-block.' };
        if (!/padding\s*:\s*4px\s+8px/i.test(code)) return { valid: false, message: 'Missing padding: 4px 8px.' };
        return { valid: true, message: 'Great job! Inline-block badge styled properly.' };
      }
      },
      {
        "id": "css-q9-2",
        "level": "Medium",
        "title": "Collapse Element with display: none",
        "prompt": "Write a ruleset for class .modal-backdrop that hides the element completely from layout using display: none.",
        "requirements": [
          "Target .modal-backdrop",
          "Set display: none"
        ],
        "starterCode": "/* Write .modal-backdrop ruleset */\n",
        "solutionCode": ".modal-backdrop {\n  display: none;\n}",
        "expectedOutput": "Element collapsed and completely removed from the document layout flow.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.modal-backdrop\s*\{/i.test(code)) return { valid: false, message: 'Missing .modal-backdrop selector.' };
        if (!/display\s*:\s*none/i.test(code)) return { valid: false, message: 'Missing display: none.' };
        return { valid: true, message: 'Well done! display: none collapses the element.' };
      }
      },
      {
        "id": "css-q9-3",
        "level": "Challenge",
        "title": "Horizontal Navigation Display Flow",
        "prompt": "Write CSS for .nav-menu li setting display: inline-block, margin-right: 16px. Also write .nav-menu li a setting display: block, text-decoration: none, and color: #2563eb.",
        "requirements": [
          ".nav-menu li with display: inline-block and margin-right: 16px",
          ".nav-menu li a with display: block, text-decoration: none, and color: #2563eb"
        ],
        "starterCode": "/* Write navigation display rules */\n",
        "solutionCode": ".nav-menu li {\n  display: inline-block;\n  margin-right: 16px;\n}\n\n.nav-menu li a {\n  display: block;\n  text-decoration: none;\n  color: #2563eb;\n}",
        "expectedOutput": "List items line up horizontally, with links forming clickable block hit targets.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.nav-menu\s+li\s*\{[^}]*display\s*:\s*inline-block/i.test(code)) {
          return { valid: false, message: 'Set .nav-menu li to display: inline-block.' };
        }
        if (!/\.nav-menu\s+li\s+a\s*\{[^}]*display\s*:\s*block/i.test(code)) {
          return { valid: false, message: 'Set .nav-menu li a to display: block.' };
        }
        return { valid: true, message: 'Outstanding! Horizontal navigation flow verified.' };
      }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the key difference between display: none and visibility: hidden?",
        "options": [
          "display: none removes the element entirely from the layout flow; visibility: hidden makes it invisible while preserving its physical occupied space",
          "visibility: hidden is only for images",
          "display: none is temporary, visibility: hidden is permanent",
          "There is no visual or layout difference"
        ],
        "correctIndex": 0,
        "explanation": "display: none causes the browser to ignore the box entirely during layout calculation. visibility: hidden paints it transparently while keeping its exact footprint."
      },
      {
        "id": 2,
        "question": "Why do width and height properties fail to take effect on standard <span> tags by default?",
        "options": [
          "span tags require an ID attribute to accept dimensions",
          "span tags have display: inline by default, which ignores custom width and height declarations",
          "Browsers do not support styling text spans",
          "width requires the !important flag on spans"
        ],
        "correctIndex": 1,
        "explanation": "Inline elements wrap text flow and cannot accept explicit width or height unless changed to inline-block or block."
      },
      {
        "id": 3,
        "question": "Which display mode allows an element to sit on the same line as neighboring elements while respecting custom width, height, and vertical padding?",
        "options": [
          "display: block",
          "display: inline",
          "display: inline-block",
          "display: table"
        ],
        "correctIndex": 2,
        "explanation": "inline-block combines inline horizontal text flow with full block box-model sizing."
      }
    ],
    "video": {
      "title": "Block, Inline, and Inline-Block explained | CSS Tutorial",
      "channel": "Kevin Powell",
      "videoId": "x_i2gga-sYg",
      "url": "https://www.youtube.com/watch?v=x_i2gga-sYg",
      "description": "Kevin Powell breaks down block, inline, and inline-block element behaviors, explaining when and why to switch display properties."
    }
  },
  {
    "id": "css-topic-10",
    "order": 10,
    "slug": "positioning",
    "title": "Positioning",
    "difficulty": "Intermediate",
    "estimatedTime": "15 min",
    "summary": "Take control of element flow with position: static, relative, absolute, fixed, sticky, offset coordinates (top, right, bottom, left), and z-index stacking order.",
    "notes": {
      "concept": "By default, elements follow normal document flow (position: static). The position property allows elements to break free from standard flow: relative shifts an element relative to itself, absolute positions an element relative to its nearest positioned ancestor, fixed pins an element to the viewport, and sticky toggles between relative and fixed based on scroll position.",
      "syntax": "/* Standard Positions */\nposition: relative; /* Anchor for absolute children */\nposition: absolute; /* Placed relative to positioned ancestor */\nposition: fixed;    /* Pinned to browser viewport */\nposition: sticky;   /* Relative until scroll threshold reached */\n\n/* Coordinates */\ntop: 20px;\nright: 16px;\n\n/* Stacking Layer */\nz-index: 10;",
      "explanation": "1. static (default): Follows normal page flow; top/left/right/bottom and z-index have no effect.\n2. relative: Shifted from its normal position, leaving its original space intact in document flow. Serves as reference container for absolute children!\n3. absolute: Removed completely from document flow; positioned relative to the closest ancestor having position other than static.\n4. fixed: Removed from flow; stays anchored to the browser viewport even during scrolling.\n5. sticky: Scrolls normally until reaching its offset threshold (e.g. top: 0), then sticks in place.\n6. z-index: Controls layering along the Z-axis (higher numbers render on top).",
      "codeExample": "/* Sticky Navigation Bar */\n.sticky-nav {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  background-color: #ffffff;\n  border-bottom: 1px solid #e2e8f0;\n}\n\n/* Badge pinned to top-right corner of card */\n.card-wrapper {\n  position: relative;\n  padding: 24px;\n}\n\n.notification-badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background-color: #ef4444;\n  color: white;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n}",
      "expectedOutput": "A navigation header that sticks to the top of the screen as you scroll, and a card with a red notification dot overlapping its top-right corner.",
      "commonMistakes": [
        {
          "mistake": "Using position: absolute without adding position: relative to the intended parent container.",
          "correction": "Always set position: relative on the container you want the absolute child to be positioned inside.",
          "explanation": "Without a positioned parent, the absolute element climbs up the DOM tree until it positions against the <body>."
        },
        {
          "mistake": "Using position: sticky without specifying an offset like top: 0.",
          "correction": "Always pair position: sticky with top, bottom, left, or right.",
          "explanation": "A sticky element requires a threshold coordinate to know when it should stick."
        },
        {
          "mistake": "Trying to use z-index on a position: static element.",
          "correction": "Set position: relative (or absolute/fixed) before applying z-index.",
          "explanation": "z-index only takes effect on positioned elements (elements whose position is not static) or flex/grid items."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Observe how the badge is pinned to the corner using position: absolute inside a position: relative parent.",
      "starterCode": "<style>\n  .card-container {\n    position: relative;\n    width: 220px;\n    padding: 20px;\n    background: #f8fafc;\n    border: 2px solid #cbd5e1;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .badge-dot {\n    position: absolute;\n    top: -10px;\n    right: -10px;\n    background: #ef4444;\n    color: white;\n    font-size: 11px;\n    font-weight: bold;\n    padding: 4px 8px;\n    border-radius: 12px;\n  }\n</style>\n<div class=\"card-container\">\n  <span class=\"badge-dot\">NEW</span>\n  <h4 style=\"margin: 0 0 6px;\">Absolute In Relative</h4>\n  <p style=\"margin: 0; font-size: 13px; color: #64748b;\">The badge is positioned relative to the card container.</p>\n</div>",
      "solutionCode": "<style>\n  .card-container {\n    position: relative;\n    width: 220px;\n    padding: 20px;\n    background: #f8fafc;\n    border: 2px solid #cbd5e1;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .badge-dot {\n    position: absolute;\n    top: -10px;\n    right: -10px;\n    background: #ef4444;\n    color: white;\n    font-size: 11px;\n    font-weight: bold;\n    padding: 4px 8px;\n    border-radius: 12px;\n  }\n</style>\n<div class=\"card-container\">\n  <span class=\"badge-dot\">NEW</span>\n  <h4 style=\"margin: 0 0 6px;\">Absolute In Relative</h4>\n  <p style=\"margin: 0; font-size: 13px; color: #64748b;\">The badge is positioned relative to the card container.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q9-1",
        "level": "Easy",
        "title": "Sticky Header Bar",
        "prompt": "Create a rule for .sticky-header setting position: sticky, top: 0, and z-index: 10.",
        "requirements": [
          "Selector .sticky-header",
          "position: sticky",
          "top: 0",
          "z-index: 10"
        ],
        "starterCode": "/* Write sticky header rule */\n",
        "solutionCode": ".sticky-header {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}",
        "expectedOutput": "A header bar that sticks at the top edge of the viewport during page scrolling.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.sticky-header\s*\{/i.test(code)) errors.push('Missing .sticky-header selector.');
          if (!/position\s*:\s*sticky/i.test(code)) errors.push('Missing position: sticky.');
          if (!/top\s*:\s*0/i.test(code)) errors.push('Missing top: 0.');
          if (!/z-index\s*:\s*10/i.test(code)) errors.push('Missing z-index: 10.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q9-2",
        "level": "Medium",
        "title": "Absolute Positioning in Relative Parent",
        "prompt": "Create two rules: 1) .card-wrapper with position: relative; 2) .close-icon with position: absolute, top: 12px, right: 12px, and cursor: pointer.",
        "requirements": [
          ".card-wrapper with position: relative",
          ".close-icon with position: absolute, top: 12px, right: 12px, cursor: pointer"
        ],
        "starterCode": "/* Write relative wrapper and absolute icon rules */\n",
        "solutionCode": ".card-wrapper {\n  position: relative;\n}\n\n.close-icon {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  cursor: pointer;\n}",
        "expectedOutput": "A close icon pinned 12px from the top-right corner of its relative parent container.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.card-wrapper\s*\{[\s\S]*?position\s*:\s*relative/i.test(code)) {
            errors.push('Missing .card-wrapper position: relative.');
          }
          if (!/\.close-icon\s*\{[\s\S]*?position\s*:\s*absolute/i.test(code)) {
            errors.push('Missing .close-icon position: absolute.');
          }
          if (!/\.close-icon\s*\{[\s\S]*?top\s*:\s*12px/i.test(code)) {
            errors.push('Missing .close-icon top: 12px.');
          }
          if (!/\.close-icon\s*\{[\s\S]*?right\s*:\s*12px/i.test(code)) {
            errors.push('Missing .close-icon right: 12px.');
          }
          if (!/\.close-icon\s*\{[\s\S]*?cursor\s*:\s*pointer/i.test(code)) {
            errors.push('Missing .close-icon cursor: pointer.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q9-3",
        "level": "Challenge",
        "title": "Fixed Floating Action Button",
        "prompt": "Style .fab-button: set position: fixed, bottom: 24px, right: 24px, z-index: 100, width: 56px, height: 56px, and border-radius: 50%.",
        "requirements": [
          "Selector .fab-button",
          "position: fixed",
          "bottom: 24px",
          "right: 24px",
          "z-index: 100",
          "width: 56px and height: 56px",
          "border-radius: 50%"
        ],
        "starterCode": "/* Write floating action button rule */\n",
        "solutionCode": ".fab-button {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  z-index: 100;\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n}",
        "expectedOutput": "A circular floating action button pinned to the bottom-right corner of the browser viewport regardless of scroll position.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.fab-button\s*\{/i.test(code)) errors.push('Missing .fab-button selector.');
          if (!/position\s*:\s*fixed/i.test(code)) errors.push('Missing position: fixed.');
          if (!/bottom\s*:\s*24px/i.test(code)) errors.push('Missing bottom: 24px.');
          if (!/right\s*:\s*24px/i.test(code)) errors.push('Missing right: 24px.');
          if (!/z-index\s*:\s*100/i.test(code)) errors.push('Missing z-index: 100.');
          if (!/width\s*:\s*56px/i.test(code) || !/height\s*:\s*56px/i.test(code)) {
            errors.push('Missing width: 56px and height: 56px.');
          }
          if (!/border-radius\s*:\s*50%/i.test(code)) errors.push('Missing border-radius: 50%.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What element does an element with position: absolute calculate its coordinates against?",
        "options": [
          "Always the <body> element",
          "Its closest ancestor that has a position value other than static",
          "Its previous sibling element",
          "The screen hardware"
        ],
        "correctIndex": 1,
        "explanation": "An absolute element looks upward through its ancestors for the nearest element with position: relative, absolute, fixed, or sticky."
      },
      {
        "id": 2,
        "question": "What makes position: fixed different from position: absolute?",
        "options": [
          "Fixed elements cannot have a background color",
          "Fixed elements are positioned relative to the browser viewport and remain stationary during scroll, while absolute elements scroll with their container",
          "Fixed elements only work on mobile",
          "There is no difference"
        ],
        "correctIndex": 1,
        "explanation": "position: fixed anchors to the viewport coordinate system, staying fixed on screen as the user scrolls."
      },
      {
        "id": 3,
        "question": "Why does z-index fail to work on an element with position: static?",
        "options": [
          "z-index is deprecated in modern CSS",
          "z-index requires an element to be positioned (relative, absolute, fixed, sticky) or a flex/grid child to create or participate in stacking contexts",
          "Static elements are invisible",
          "z-index only accepts negative numbers"
        ],
        "correctIndex": 1,
        "explanation": "In the CSS specification, z-index does not apply to non-positioned elements in normal document flow."
      }
    ],
    "video": {
      "title": "Learn CSS Position In 9 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "jx5jmI0UlXU",
      "url": "https://www.youtube.com/watch?v=jx5jmI0UlXU",
      "description": "Kyle explains static, relative, absolute, fixed, and sticky positioning with visual diagrams."
    }
  },
  {
    "id": "css-topic-11",
    "order": 11,
    "slug": "flexbox",
    "title": "Flexbox",
    "difficulty": "Intermediate",
    "estimatedTime": "18 min",
    "summary": "Master one-dimensional layouts with Flexbox: display: flex, flex-direction, justify-content, align-items, flex-wrap, gap, and child properties (flex-grow, flex-shrink).",
    "notes": {
      "concept": "Flexbox (Flexible Box Layout) is designed for 1-dimensional arrangements—either along a horizontal row or a vertical column. Turning a container into display: flex unlocks intuitive alignment, automatic spacing with gap, vertical centering, and responsive wrapping without complex float or clear calculations.",
      "syntax": "/* Flex Container */\n.container {\n  display: flex;\n  flex-direction: row;       /* row (default) or column */\n  justify-content: center;   /* Main-axis alignment */\n  align-items: center;       /* Cross-axis alignment */\n  gap: 16px;                 /* Spacing between items */\n  flex-wrap: wrap;           /* Wrap items to next line */\n}\n\n/* Flex Item */\n.item {\n  flex-grow: 1;              /* Fill available space */\n  flex-shrink: 0;            /* Prevent shrinking */\n}",
      "explanation": "1. display: flex: Activates flex context on direct child items.\n2. Main Axis vs Cross Axis: If flex-direction is row (default), main axis is horizontal. If column, main axis is vertical.\n3. justify-content: Controls distribution along the main axis (flex-start, center, flex-end, space-between, space-around).\n4. align-items: Controls alignment along the cross axis (stretch, center, flex-start, flex-end).\n5. gap: Sets uniform space between items without needing margin hacks on children.\n6. flex-wrap: wrap allows items to overflow onto multiple rows on small screens.",
      "codeExample": "/* Perfectly Centered Navigation Bar */\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background-color: #1e293b;\n  color: white;\n}\n\n.nav-links {\n  display: flex;\n  gap: 20px;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/* Perfect Vertical & Horizontal Center Hero */\n.hero-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}",
      "expectedOutput": "A navigation bar with brand on the far left and links on the far right, vertically centered with clean 20px item spacing.",
      "commonMistakes": [
        {
          "mistake": "Confusing justify-content with align-items when flex-direction: column is active.",
          "correction": "Remember that justify-content always aligns the main axis (which becomes vertical in column mode).",
          "explanation": "In flex-direction: column, justify-content controls vertical alignment and align-items controls horizontal alignment."
        },
        {
          "mistake": "Using margin-right hacks on flex items instead of the modern gap property.",
          "correction": "Apply gap: 16px directly to the flex container.",
          "explanation": "gap automatically applies spacing between items only, without adding unwanted margin to the last child."
        },
        {
          "mistake": "Forgetting flex-wrap: wrap on multi-item rows, causing elements to squeeze and overflow on mobile.",
          "correction": "Add flex-wrap: wrap to flex containers holding cards or tags.",
          "explanation": "Without wrap, flex items shrink and overflow the container rather than wrapping onto new lines."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Experiment with justify-content (space-between, center, flex-end) and align-items in the preview pane below.",
      "starterCode": "<style>\n  .flex-demo {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 12px;\n    background: #f8fafc;\n    border: 2px solid #e2e8f0;\n    border-radius: 8px;\n    padding: 16px;\n    font-family: sans-serif;\n  }\n  .box {\n    background: #6366f1;\n    color: white;\n    padding: 12px 18px;\n    border-radius: 6px;\n    font-weight: bold;\n    text-align: center;\n  }\n</style>\n<div class=\"flex-demo\">\n  <div class=\"box\">Item 1</div>\n  <div class=\"box\">Item 2</div>\n  <div class=\"box\">Item 3</div>\n</div>",
      "solutionCode": "<style>\n  .flex-demo {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 12px;\n    background: #f8fafc;\n    border: 2px solid #e2e8f0;\n    border-radius: 8px;\n    padding: 16px;\n    font-family: sans-serif;\n  }\n  .box {\n    background: #6366f1;\n    color: white;\n    padding: 12px 18px;\n    border-radius: 6px;\n    font-weight: bold;\n    text-align: center;\n  }\n</style>\n<div class=\"flex-demo\">\n  <div class=\"box\">Item 1</div>\n  <div class=\"box\">Item 2</div>\n  <div class=\"box\">Item 3</div>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q7-1",
        "level": "Easy",
        "title": "Center Content with Flexbox",
        "prompt": "Create a rule for .center-box that turns it into a flex container and centers its contents along both axes with display: flex, justify-content: center, and align-items: center.",
        "requirements": [
          "Selector .center-box",
          "display: flex",
          "justify-content: center",
          "align-items: center"
        ],
        "starterCode": "/* Write centered flex rule */\n",
        "solutionCode": ".center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
        "expectedOutput": "Child elements are centered both horizontally and vertically inside the container.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.center-box\s*\{/i.test(code)) errors.push('Missing .center-box selector.');
          if (!/display\s*:\s*flex/i.test(code)) errors.push('Missing display: flex.');
          if (!/justify-content\s*:\s*center/i.test(code)) errors.push('Missing justify-content: center.');
          if (!/align-items\s*:\s*center/i.test(code)) errors.push('Missing align-items: center.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q7-2",
        "level": "Medium",
        "title": "Space-Between Navigation Header",
        "prompt": "Style .nav-header: display: flex, justify-content: space-between, align-items: center, gap: 16px, and padding: 12px 24px.",
        "requirements": [
          "Selector .nav-header",
          "display: flex",
          "justify-content: space-between",
          "align-items: center",
          "gap: 16px",
          "padding: 12px 24px"
        ],
        "starterCode": "/* Write nav-header flex layout */\n",
        "solutionCode": ".nav-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 24px;\n}",
        "expectedOutput": "A responsive header with items spaced to opposite ends, vertically aligned with consistent padding.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.nav-header\s*\{/i.test(code)) errors.push('Missing .nav-header selector.');
          if (!/display\s*:\s*flex/i.test(code)) errors.push('Missing display: flex.');
          if (!/justify-content\s*:\s*space-between/i.test(code)) errors.push('Missing justify-content: space-between.');
          if (!/align-items\s*:\s*center/i.test(code)) errors.push('Missing align-items: center.');
          if (!/gap\s*:\s*16px/i.test(code)) errors.push('Missing gap: 16px.');
          if (!/padding\s*:\s*12px\s+24px/i.test(code)) errors.push('Missing padding: 12px 24px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q7-3",
        "level": "Challenge",
        "title": "Wrapping Tag Grid with Flex Grow",
        "prompt": "Create two rules: 1) .tag-container with display: flex, flex-wrap: wrap, gap: 10px; 2) .tag-item with flex-grow: 1, padding: 8px 16px, and text-align: center.",
        "requirements": [
          ".tag-container with display: flex, flex-wrap: wrap, gap: 10px",
          ".tag-item with flex-grow: 1, padding: 8px 16px, text-align: center"
        ],
        "starterCode": "/* Write wrapping tag flex layout */\n",
        "solutionCode": ".tag-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.tag-item {\n  flex-grow: 1;\n  padding: 8px 16px;\n  text-align: center;\n}",
        "expectedOutput": "A fluid row of tag items that wrap onto multiple lines on small viewports and expand equally to fill available space.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.tag-container\s*\{[\s\S]*?display\s*:\s*flex/i.test(code)) {
            errors.push('Missing .tag-container display: flex.');
          }
          if (!/\.tag-container\s*\{[\s\S]*?flex-wrap\s*:\s*wrap/i.test(code)) {
            errors.push('Missing .tag-container flex-wrap: wrap.');
          }
          if (!/\.tag-container\s*\{[\s\S]*?gap\s*:\s*10px/i.test(code)) {
            errors.push('Missing .tag-container gap: 10px.');
          }
          if (!/\.tag-item\s*\{[\s\S]*?flex-grow\s*:\s*1/i.test(code)) {
            errors.push('Missing .tag-item flex-grow: 1.');
          }
          if (!/\.tag-item\s*\{[\s\S]*?padding\s*:\s*8px\s+16px/i.test(code)) {
            errors.push('Missing .tag-item padding: 8px 16px.');
          }
          if (!/\.tag-item\s*\{[\s\S]*?text-align\s*:\s*center/i.test(code)) {
            errors.push('Missing .tag-item text-align: center.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which property aligns flex items along the main axis?",
        "options": [
          "align-items",
          "justify-content",
          "align-content",
          "flex-basis"
        ],
        "correctIndex": 1,
        "explanation": "justify-content aligns items along the main axis, while align-items aligns items along the cross axis."
      },
      {
        "id": 2,
        "question": "What is the default value of flex-direction on a flex container?",
        "options": [
          "column",
          "row",
          "row-reverse",
          "wrap"
        ],
        "correctIndex": 1,
        "explanation": "The default flex-direction is row, meaning items are arranged in a horizontal row from left to right."
      },
      {
        "id": 3,
        "question": "What does the CSS gap property do inside a flex container?",
        "options": [
          "It adds an outer margin around the entire container",
          "It creates uniform spacing between flex items only, without adding extra space on outside edges",
          "It hides empty flex items",
          "It sets the font size of items"
        ],
        "correctIndex": 1,
        "explanation": "The gap property creates gutting spacing between neighboring items only, eliminating the need for margin hacks."
      }
    ],
    "video": {
      "title": "Learn Flexbox in 15 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "fYq5PXgSsbE",
      "url": "https://www.youtube.com/watch?v=fYq5PXgSsbE",
      "description": "Kyle explains flex-direction, justify-content, align-items, flex-grow, and common flex patterns."
    }
  },
  {
    "id": "css-topic-12",
    "order": 12,
    "slug": "css-grid",
    "title": "CSS Grid",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Build powerful two-dimensional layouts with CSS Grid: display: grid, grid-template-columns, grid-template-rows, the fr (fraction) unit, repeat(), auto-fit, and grid-column span.",
    "notes": {
      "concept": "While Flexbox handles 1-dimensional layouts (a single row OR column), CSS Grid is built for 2-dimensional layouts (rows AND columns simultaneously). Grid allows developers to divide a parent into explicit rows and tracks, place child elements anywhere on the grid, and create auto-responsive card layouts without media queries using repeat(auto-fit, minmax(...)).",
      "syntax": "/* 3-Column Grid Container */\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n/* Auto-Responsive Grid without Media Queries */\n.responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 24px;\n}\n\n/* Item spanning across multiple columns */\n.featured-item {\n  grid-column: span 2;\n}",
      "explanation": "1. display: grid: Turns an element into a grid formatting container.\n2. 1fr (Fractional Unit): Represents a fraction of the leftover available space in the grid container.\n3. repeat(3, 1fr): Equivalent to writing 1fr 1fr 1fr; creates 3 equal-width columns.\n4. repeat(auto-fit, minmax(250px, 1fr)): Automatically creates as many 250px+ columns as will fit, wrapping smoothly on mobile.\n5. gap: Specifies row and column gutter spacing.\n6. grid-column: span 2: Makes an item stretch across two adjacent columns.",
      "codeExample": "/* Responsive Dashboard Metric Cards Grid */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n  padding: 20px;\n}\n\n.metric-card {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.span-full {\n  grid-column: 1 / -1; /* Stretch across entire grid */\n}",
      "expectedOutput": "A fluid dashboard layout where cards automatically snap into 1, 2, 3, or 4 columns based on screen width, with zero media queries needed.",
      "commonMistakes": [
        {
          "mistake": "Using Flexbox with complex percentage widths when CSS Grid is better suited for 2D grids.",
          "correction": "Use CSS Grid whenever you need elements aligned across both horizontal rows and vertical columns.",
          "explanation": "Flexbox wraps rows independently, so cards in row 2 won't align with cards in row 1 if widths vary."
        },
        {
          "mistake": "Confusing auto-fill with auto-fit in minmax grids.",
          "correction": "Use auto-fit when you want remaining items to stretch and fill the empty row space.",
          "explanation": "auto-fill creates empty ghost tracks if there are fewer items than screen space, whereas auto-fit stretches existing items."
        },
        {
          "mistake": "Using fixed pixel widths (grid-template-columns: 300px 300px 300px) that cause overflow on smaller screens.",
          "correction": "Use flexible fr units: repeat(3, 1fr) or minmax(250px, 1fr).",
          "explanation": "Fixed pixel columns do not resize when the browser window shrinks, causing horizontal scrollbars."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Notice how the grid below organizes items into columns. Try changing repeat(2, 1fr) to repeat(3, 1fr) or tweaking the gap.",
      "starterCode": "<style>\n  .grid-demo {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n    background: #f1f5f9;\n    padding: 16px;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .card {\n    background: white;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    padding: 16px;\n    text-align: center;\n    font-weight: bold;\n    color: #4338ca;\n  }\n</style>\n<div class=\"grid-demo\">\n  <div class=\"card\">Card A</div>\n  <div class=\"card\">Card B</div>\n  <div class=\"card\">Card C</div>\n  <div class=\"card\">Card D</div>\n</div>",
      "solutionCode": "<style>\n  .grid-demo {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n    background: #f1f5f9;\n    padding: 16px;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .card {\n    background: white;\n    border: 1px solid #cbd5e1;\n    border-radius: 6px;\n    padding: 16px;\n    text-align: center;\n    font-weight: bold;\n    color: #4338ca;\n  }\n</style>\n<div class=\"grid-demo\">\n  <div class=\"card\">Card A</div>\n  <div class=\"card\">Card B</div>\n  <div class=\"card\">Card C</div>\n  <div class=\"card\">Card D</div>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q8-1",
        "level": "Easy",
        "title": "Create a 3-Column Equal Grid",
        "prompt": "Create a rule for .grid-3col with display: grid, grid-template-columns: repeat(3, 1fr), and gap: 16px.",
        "requirements": [
          "Selector .grid-3col",
          "display: grid",
          "grid-template-columns: repeat(3, 1fr)",
          "gap: 16px"
        ],
        "starterCode": "/* Write 3-column grid rule */\n",
        "solutionCode": ".grid-3col {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
        "expectedOutput": "A 3-column equal grid layout with 16px gutters between all tracks.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.grid-3col\s*\{/i.test(code)) errors.push('Missing .grid-3col selector.');
          if (!/display\s*:\s*grid/i.test(code)) errors.push('Missing display: grid.');
          if (!/grid-template-columns\s*:\s*(repeat\(\s*3\s*,\s*1fr\s*\)|1fr\s+1fr\s+1fr)/i.test(code)) {
            errors.push('Missing grid-template-columns: repeat(3, 1fr).');
          }
          if (!/gap\s*:\s*16px/i.test(code)) errors.push('Missing gap: 16px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q8-2",
        "level": "Medium",
        "title": "Auto-Responsive Grid with minmax",
        "prompt": "Create a rule for .cards-grid that automatically fits columns with display: grid, grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)), and gap: 20px.",
        "requirements": [
          "Selector .cards-grid",
          "display: grid",
          "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))",
          "gap: 20px"
        ],
        "starterCode": "/* Write auto-responsive grid rule */\n",
        "solutionCode": ".cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 20px;\n}",
        "expectedOutput": "A self-responsive card grid that automatically wraps without requiring media queries.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.cards-grid\s*\{/i.test(code)) errors.push('Missing .cards-grid selector.');
          if (!/display\s*:\s*grid/i.test(code)) errors.push('Missing display: grid.');
          if (!/grid-template-columns\s*:\s*repeat\(\s*auto-fit\s*,\s*minmax\(\s*240px\s*,\s*1fr\s*\)\s*\)/i.test(code)) {
            errors.push('Missing grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)).');
          }
          if (!/gap\s*:\s*20px/i.test(code)) errors.push('Missing gap: 20px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q8-3",
        "level": "Challenge",
        "title": "Grid Item Column Spanning",
        "prompt": "Create two rules: 1) .layout-grid with display: grid, grid-template-columns: repeat(4, 1fr), and gap: 16px; 2) .featured-post with grid-column: span 2 to span two columns.",
        "requirements": [
          ".layout-grid with display: grid, grid-template-columns: repeat(4, 1fr), gap: 16px",
          ".featured-post with grid-column: span 2"
        ],
        "starterCode": "/* Write grid and column span rules */\n",
        "solutionCode": ".layout-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n\n.featured-post {\n  grid-column: span 2;\n}",
        "expectedOutput": "A 4-column layout where the featured item spans across two columns while standard items take one.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.layout-grid\s*\{[\s\S]*?display\s*:\s*grid/i.test(code)) {
            errors.push('Missing .layout-grid display: grid.');
          }
          if (!/\.layout-grid\s*\{[\s\S]*?grid-template-columns\s*:\s*(repeat\(\s*4\s*,\s*1fr\s*\)|1fr\s+1fr\s+1fr\s+1fr)/i.test(code)) {
            errors.push('Missing grid-template-columns: repeat(4, 1fr).');
          }
          if (!/\.layout-grid\s*\{[\s\S]*?gap\s*:\s*16px/i.test(code)) {
            errors.push('Missing .layout-grid gap: 16px.');
          }
          if (!/\.featured-post\s*\{[\s\S]*?grid-column\s*:\s*span\s+2/i.test(code)) {
            errors.push('Missing .featured-post grid-column: span 2.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What does the unit \"1fr\" represent in CSS Grid?",
        "options": [
          "One frame per second",
          "One fraction of the leftover available space in the grid container",
          "One front-facing pixel",
          "One fixed rem"
        ],
        "correctIndex": 1,
        "explanation": "The fr unit distributes free space in the grid container proportionally among tracks."
      },
      {
        "id": 2,
        "question": "What is the main conceptual difference between Flexbox and CSS Grid?",
        "options": [
          "Flexbox is 1-dimensional (row OR column), while CSS Grid is 2-dimensional (rows AND columns simultaneously)",
          "CSS Grid is only for text",
          "Flexbox is deprecated in CSS3",
          "Grid cannot use the gap property"
        ],
        "correctIndex": 0,
        "explanation": "Flexbox manages content in a single linear direction, while Grid coordinates layouts across both rows and columns."
      },
      {
        "id": 3,
        "question": "How do you make a single grid item span across 3 columns?",
        "options": [
          "column-span: 3",
          "grid-column: span 3",
          "flex-grow: 3",
          "width: 3col"
        ],
        "correctIndex": 1,
        "explanation": "grid-column: span 3 instructs the grid item to occupy three consecutive column tracks."
      }
    ],
    "video": {
      "title": "Learn CSS Grid in 20 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "9zBsdzdE4sM",
      "url": "https://www.youtube.com/watch?v=9zBsdzdE4sM",
      "description": "Kyle teaches CSS Grid from scratch: grid-template-columns, fr units, minmax, and responsive grid layouts."
    }
  },
  {
    "id": "css-topic-13",
    "order": 13,
    "slug": "pseudo-classes-and-elements",
    "title": "Pseudo-classes and Pseudo-elements",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Target elements based on user interaction states (:hover, :focus, :active), DOM structural position (:first-child, :last-child, :nth-child), and inject decorative cosmetic markup using pseudo-elements (::before, ::after with content: \"\").",
    "notes": {
      "concept": "A pseudo-class (prefixed with a single colon :) selects elements based on dynamic interaction states or document hierarchy without requiring extra HTML classes. A pseudo-element (prefixed with a double colon ::) creates cosmetic virtual DOM elements or targets specific parts of an element (like ::before, ::after, ::placeholder, ::selection).",
      "syntax": "/* Pseudo-classes (Interaction & Hierarchy) */\nbutton:hover { background-color: #2563eb; }\ninput:focus { outline: 2px solid #38bdf8; }\nli:nth-child(even) { background-color: #f1f5f9; }\n\n/* Pseudo-elements (Virtual decorative elements) */\n.quote::before {\n  content: \"“\";\n  font-size: 32px;\n  color: #64748b;\n}\n\n.card::after {\n  content: \"\";\n  display: block;\n  height: 4px;\n  background: linear-gradient(to right, #6366f1, #a855f7);\n}",
      "explanation": "1. :hover, :focus, :active: Handle cursor hover, keyboard/input focus, and active mouse clicks.\n2. :nth-child(formula): Formulaic selector: :nth-child(odd), :nth-child(even), :nth-child(3n+1) for zebra-striping grids or lists.\n3. ::before and ::after: Inserts cosmetic content before or after an element content. MUST include content property to render!\n4. Double colon vs single colon: CSS3 introduced :: for pseudo-elements to distinguish them from pseudo-classes (:), though single-colon syntax remains supported for backwards compatibility.",
      "codeExample": "/* Modern pill button with glowing underline pseudo-element */\n.custom-btn {\n  position: relative;\n  background: #0f172a;\n  color: white;\n  padding: 10px 24px;\n  border-radius: 6px;\n  border: none;\n}\n\n.custom-btn::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: #38bdf8;\n  border-radius: 0 0 6px 6px;\n}",
      "expectedOutput": "A dark button featuring an integrated sky-blue decorative bottom accent bar created purely with CSS without extra HTML markup.",
      "commonMistakes": [
        {
          "mistake": "Forgetting the content: \"\" property on ::before or ::after.",
          "correction": "Always define content: \"\" (even if empty) on pseudo-elements.",
          "explanation": "Without the content property, the browser will not generate the pseudo-element box in the DOM tree at all."
        },
        {
          "mistake": "Using :nth-child when expecting :nth-of-type across mixed sibling tags.",
          "correction": "Use :nth-of-type if there are mixed tags (like <h1> and <p>) in the same parent container.",
          "explanation": ":nth-child counts all sibling elements regardless of tag name; :nth-of-type counts only elements matching the specific selector tag."
        },
        {
          "mistake": "Forgetting accessible :focus styles when adding custom :hover states.",
          "correction": "Always pair hover states with focus states: a:hover, a:focus { ... }",
          "explanation": "Keyboard-only navigators and screen-reader users rely on :focus rings to perceive which interactive control is active."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Experiment with :hover, :focus, and ::before pseudo-elements in the live sandbox.",
      "starterCode": "<style>\n  .btn {\n    background: #4f46e5;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: background 0.2s;\n  }\n  .btn:hover { background: #4338ca; }\n  .btn:focus { outline: 3px solid #a5b4fc; }\n  .tag::before { content: \"★ \"; color: #f59e0b; }\n</style>\n<button class=\"btn\">Hover or Focus Me</button>\n<p class=\"tag\">Featured Engineering Topic</p>",
      "solutionCode": "<style>\n  .btn {\n    background: #4f46e5;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: background 0.2s;\n  }\n  .btn:hover { background: #4338ca; }\n  .btn:focus { outline: 3px solid #a5b4fc; }\n  .tag::before { content: \"★ \"; color: #f59e0b; }\n</style>\n<button class=\"btn\">Hover or Focus Me</button>\n<p class=\"tag\">Featured Engineering Topic</p>"
    },
    "practiceQuestions": [
      {
        "id": "css-q13-1",
        "level": "Easy",
        "title": "Hover State Background Shift",
        "prompt": "Write a ruleset for .btn:hover that changes background-color to #1e40af and color to #ffffff.",
        "requirements": [
          "Target .btn:hover",
          "Set background-color: #1e40af",
          "Set color: #ffffff"
        ],
        "starterCode": "/* Write .btn:hover ruleset */\n",
        "solutionCode": ".btn:hover {\n  background-color: #1e40af;\n  color: #ffffff;\n}",
        "expectedOutput": "Button background shifts to deep blue on mouse hover.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.btn:hover\s*\{/i.test(code)) return { valid: false, message: 'Missing .btn:hover selector.' };
        if (!/background-color\s*:\s*#1e40af/i.test(code)) return { valid: false, message: 'Missing background-color: #1e40af.' };
        return { valid: true, message: 'Great job! Hover pseudo-class styled properly.' };
      }
      },
      {
        "id": "css-q13-2",
        "level": "Medium",
        "title": "Zebra Striping with :nth-child(even)",
        "prompt": "Write a ruleset targeting even table rows (.table-row:nth-child(even)) that sets background-color: #f8fafc.",
        "requirements": [
          "Target .table-row:nth-child(even)",
          "Set background-color: #f8fafc"
        ],
        "starterCode": "/* Zebra striping ruleset */\n",
        "solutionCode": ".table-row:nth-child(even) {\n  background-color: #f8fafc;\n}",
        "expectedOutput": "Even rows display alternating light grey background for improved tabular legibility.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.table-row:nth-child\(even\)\s*\{/i.test(code)) return { valid: false, message: 'Use .table-row:nth-child(even).' };
        if (!/background-color\s*:\s*#f8fafc/i.test(code)) return { valid: false, message: 'Missing background-color: #f8fafc.' };
        return { valid: true, message: 'Well done! Zebra striping formula validated.' };
      }
      },
      {
        "id": "css-q13-3",
        "level": "Challenge",
        "title": "Decorative Accent with ::before",
        "prompt": "Write a ruleset for .card::before that defines content: \"\", display: block, height: 4px, and background: #6366f1.",
        "requirements": [
          "Target .card::before or .card:before",
          "Set content: \"\"",
          "Set display: block",
          "Set height: 4px",
          "Set background: #6366f1"
        ],
        "starterCode": "/* Write .card::before ruleset */\n",
        "solutionCode": ".card::before {\n  content: \"\";\n  display: block;\n  height: 4px;\n  background: #6366f1;\n}",
        "expectedOutput": "A virtual 4px indigo accent bar generated above the card content without extra HTML tags.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.card::?before\s*\{/i.test(code)) return { valid: false, message: 'Target .card::before.' };
        if (!/content\s*:\s*["']["']/i.test(code)) return { valid: false, message: 'Missing content: "".' };
        if (!/height\s*:\s*4px/i.test(code)) return { valid: false, message: 'Missing height: 4px.' };
        return { valid: true, message: 'Outstanding! Pseudo-element decorative accent validated.' };
      }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which property is strictly required for ::before or ::after pseudo-elements to render in the browser?",
        "options": [
          "display",
          "content",
          "position",
          "z-index"
        ],
        "correctIndex": 1,
        "explanation": "Without the content property (e.g. content: \"\"), the pseudo-element box is never instantiated in the DOM tree."
      },
      {
        "id": 2,
        "question": "What is the standard notation difference between a pseudo-class and a pseudo-element in modern CSS3?",
        "options": [
          "Pseudo-classes use a single colon (e.g. :hover); pseudo-elements use a double colon (e.g. ::after)",
          "Pseudo-classes only apply to tables",
          "Pseudo-elements cannot accept color",
          "There is no distinction"
        ],
        "correctIndex": 0,
        "explanation": "CSS3 established single colon (:) for pseudo-classes (element states) and double colon (::) for pseudo-elements (virtual generated elements)."
      },
      {
        "id": 3,
        "question": "Which pseudo-class targets every 3rd list item starting from the first item?",
        "options": [
          "li:nth-child(3n)",
          "li:nth-child(3n+1)",
          "li:nth-of-type(3)",
          "li:every(3)"
        ],
        "correctIndex": 1,
        "explanation": "The formula an+b computes indices: for n=0 -> 1, n=1 -> 4, n=2 -> 7, selecting items 1, 4, 7, etc."
      }
    ],
    "video": {
      "title": "Learn CSS Pseudo Elements In 8 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "OtBpgtqrjyo",
      "url": "https://www.youtube.com/watch?v=OtBpgtqrjyo",
      "description": "Kyle explains ::before and ::after pseudo-elements, the content property, and practical layout examples."
    }
  },
  {
    "id": "css-topic-14",
    "order": 14,
    "slug": "transitions-and-animations",
    "title": "Transitions and Animations",
    "difficulty": "Intermediate",
    "estimatedTime": "18 min",
    "summary": "Bring interfaces to life with CSS transitions (property duration timing-function delay), transform functions (translate, scale, rotate), and keyframe animations (@keyframes).",
    "notes": {
      "concept": "Smooth animations elevate user experience by communicating state changes. CSS Transitions smoothly interpolate property changes between two states (like hover or focus). For multi-step or continuous loops, CSS Keyframe Animations (@keyframes) define key visual milestones along a timeline with full control over iteration count, delay, and easing curves.",
      "syntax": "/* Transition Shorthand: [property] [duration] [timing-function] [delay] */\nbutton {\n  background-color: #6366f1;\n  transition: background-color 0.2s ease, transform 0.2s ease;\n}\n\nbutton:hover {\n  background-color: #4f46e5;\n  transform: translateY(-2px);\n}\n\n/* Keyframe Animation Definition */\n@keyframes pulseGlow {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.05);\n  }\n}\n\n/* Applying Animation */\n.animated-badge {\n  animation: pulseGlow 2s infinite ease-in-out;\n}",
      "explanation": "1. transition-property: The CSS property to animate (e.g. background-color, transform, opacity). Always avoid transition: all for performance!\n2. transition-duration: How long the animation takes (e.g. 0.3s or 300ms).\n3. transform: GPU-accelerated operations: translateY(), scale(), rotate(). They do not trigger expensive browser reflows!\n4. @keyframes: Defines intermediate steps (0% to 100% or from / to) of an animation sequence.\n5. animation-iteration-count: infinite makes the animation loop endlessly.\n6. prefers-reduced-motion: Accessibility query used to turn off animations for users prone to motion sickness.",
      "codeExample": "/* High-Performance Card Hover Lift Effect */\n.interactive-card {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 24px;\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n\n.interactive-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);\n}\n\n/* Accessible Reduced Motion Query */\n@media (prefers-reduced-motion: reduce) {\n  .interactive-card {\n    transition: none;\n  }\n}",
      "expectedOutput": "When hovered, the card smoothly lifts 4px upward and casts a deeper shadow over 0.25 seconds with 60 FPS hardware acceleration.",
      "commonMistakes": [
        {
          "mistake": "Using transition: all on elements with many properties.",
          "correction": "Explicitly specify only the animated properties: transition: transform 0.2s, opacity 0.2s.",
          "explanation": "transition: all forces the browser to evaluate every single property on change, degrading frame rates."
        },
        {
          "mistake": "Animating expensive layout properties like width, height, or top/left.",
          "correction": "Use transform (translate, scale) and opacity instead.",
          "explanation": "transform and opacity are handled directly by the GPU compositor, avoiding CPU layout reflows and jank."
        },
        {
          "mistake": "Ignoring users who have enabled \"Reduce Motion\" in their system settings.",
          "correction": "Wrap decorative animations in @media (prefers-reduced-motion: no-preference).",
          "explanation": "Unchecked motion causes dizziness, nausea, and disorientation for users with vestibular balance disorders."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Hover over the button below to see the smooth transition and transform in action. Try changing translateY or duration.",
      "starterCode": "<style>\n  .btn-animated {\n    background-color: #6366f1;\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    border-radius: 8px;\n    font-family: sans-serif;\n    font-size: 15px;\n    font-weight: bold;\n    cursor: pointer;\n    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);\n    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;\n  }\n  .btn-animated:hover {\n    background-color: #4f46e5;\n    transform: translateY(-3px);\n    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.5);\n  }\n</style>\n<div style=\"padding: 24px; text-align: center;\">\n  <button class=\"btn-animated\">Hover Over Me!</button>\n</div>",
      "solutionCode": "<style>\n  .btn-animated {\n    background-color: #6366f1;\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    border-radius: 8px;\n    font-family: sans-serif;\n    font-size: 15px;\n    font-weight: bold;\n    cursor: pointer;\n    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);\n    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;\n  }\n  .btn-animated:hover {\n    background-color: #4f46e5;\n    transform: translateY(-3px);\n    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.5);\n  }\n</style>\n<div style=\"padding: 24px; text-align: center;\">\n  <button class=\"btn-animated\">Hover Over Me!</button>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q12-1",
        "level": "Easy",
        "title": "Smooth Background Color Transition",
        "prompt": "Create two rules: 1) .btn-transition with background-color: #2563eb and transition: background-color 0.3s ease; 2) .btn-transition:hover with background-color: #1d4ed8.",
        "requirements": [
          ".btn-transition with background-color: #2563eb and transition: background-color 0.3s ease",
          ".btn-transition:hover with background-color: #1d4ed8"
        ],
        "starterCode": "/* Write button transition rules */\n",
        "solutionCode": ".btn-transition {\n  background-color: #2563eb;\n  transition: background-color 0.3s ease;\n}\n\n.btn-transition:hover {\n  background-color: #1d4ed8;\n}",
        "expectedOutput": "A button that smoothly transitions its background color over 300 milliseconds on hover.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.btn-transition\s*\{[\s\S]*?background-color\s*:\s*#2563eb/i.test(code)) {
            errors.push('Missing .btn-transition background-color: #2563eb.');
          }
          if (!/\.btn-transition\s*\{[\s\S]*?transition\s*:\s*background-color\s+0?\.3s\s+ease/i.test(code)) {
            errors.push('Missing transition: background-color 0.3s ease.');
          }
          if (!/\.btn-transition:hover\s*\{[\s\S]*?background-color\s*:\s*#1d4ed8/i.test(code)) {
            errors.push('Missing .btn-transition:hover background-color: #1d4ed8.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q12-2",
        "level": "Medium",
        "title": "GPU-Accelerated Card Hover Lift",
        "prompt": "Style .lift-card: set transition: transform 0.2s ease, and on .lift-card:hover set transform: translateY(-4px).",
        "requirements": [
          ".lift-card with transition: transform 0.2s ease",
          ".lift-card:hover with transform: translateY(-4px)"
        ],
        "starterCode": "/* Write lift-card transform rules */\n",
        "solutionCode": ".lift-card {\n  transition: transform 0.2s ease;\n}\n\n.lift-card:hover {\n  transform: translateY(-4px);\n}",
        "expectedOutput": "A card that glides 4 pixels upward when hovered using smooth GPU hardware acceleration.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.lift-card\s*\{[\s\S]*?transition\s*:\s*transform\s+0?\.2s\s+ease/i.test(code)) {
            errors.push('Missing .lift-card transition: transform 0.2s ease.');
          }
          if (!/\.lift-card:hover\s*\{[\s\S]*?transform\s*:\s*translateY\(\s*-4px\s*\)/i.test(code)) {
            errors.push('Missing .lift-card:hover transform: translateY(-4px).');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q12-3",
        "level": "Challenge",
        "title": "Infinite Keyframe Spin Animation",
        "prompt": "Create a keyframe animation called spinLoader that rotates from transform: rotate(0deg) at 0% to transform: rotate(360deg) at 100%. Apply it to .spinner with animation: spinLoader 1s linear infinite.",
        "requirements": [
          "@keyframes spinLoader with 0% rotate(0deg) and 100% rotate(360deg)",
          ".spinner with animation: spinLoader 1s linear infinite"
        ],
        "starterCode": "/* Write keyframe animation and spinner rule */\n",
        "solutionCode": "@keyframes spinLoader {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.spinner {\n  animation: spinLoader 1s linear infinite;\n}",
        "expectedOutput": "An infinitely rotating loading indicator rotating 360 degrees every second with linear timing.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/@keyframes\s+spinLoader\s*\{[\s\S]*?rotate\(\s*0deg\s*\)[\s\S]*?rotate\(\s*360deg\s*\)/i.test(code)) {
            errors.push('Missing @keyframes spinLoader rotating from 0deg to 360deg.');
          }
          if (!/\.spinner\s*\{[\s\S]*?animation\s*:\s*spinLoader\s+1s\s+linear\s+infinite/i.test(code)) {
            errors.push('Missing .spinner animation: spinLoader 1s linear infinite.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which CSS properties are best to animate for smooth 60 FPS hardware-accelerated performance?",
        "options": [
          "width and height",
          "top and left",
          "transform and opacity",
          "margin and padding"
        ],
        "correctIndex": 2,
        "explanation": "transform and opacity are executed on the GPU compositor thread, avoiding CPU layout recalculation (reflow) and repaint."
      },
      {
        "id": 2,
        "question": "Why should transition: all generally be avoided in production code?",
        "options": [
          "It is unsupported in Chrome",
          "It forces the browser to check and interpolate every style property on change, wasting CPU/GPU resources and causing visual stutter",
          "It disables JavaScript event listeners",
          "It breaks CSS grid"
        ],
        "correctIndex": 1,
        "explanation": "Specifying exact properties (e.g. transition: opacity 0.2s) ensures only intended properties are animated efficiently."
      },
      {
        "id": 3,
        "question": "How do you make a CSS @keyframes animation repeat continuously without stopping?",
        "options": [
          "animation-repeat: always",
          "animation-iteration-count: infinite",
          "loop: true",
          "keyframes: loop"
        ],
        "correctIndex": 1,
        "explanation": "animation-iteration-count: infinite keeps the keyframe animation running indefinitely."
      }
    ],
    "video": {
      "title": "Learn CSS Animation In 15 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "A57YD-qjq9A",
      "url": "https://www.youtube.com/watch?v=A57YD-qjq9A",
      "description": "Kyle breaks down transitions, keyframes, animation timing functions, and practical web UI motion."
    }
  },
  {
    "id": "css-topic-15",
    "order": 15,
    "slug": "responsive-web-design",
    "title": "Responsive Web Design",
    "difficulty": "Intermediate",
    "estimatedTime": "16 min",
    "summary": "Build websites that seamlessly adapt across smartphones, tablets, and desktop displays using fluid widths, max-width: 100%, responsive units (rem, em, vw, vh), and clamp().",
    "notes": {
      "concept": "Responsive Web Design (RWD) ensures websites look and function beautifully across devices of any screen size. Rather than designing fixed-pixel pages for a single monitor, responsive design uses fluid percentages, modern relative units (rem for accessible typography, vw/vh for screen proportions), max-width constraints, and fluid clamp() scaling.",
      "syntax": "/* Fluid Responsive Image */\nimg {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n\n/* Fluid Container Capped at Max Width */\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin-inline: auto;\n  padding-inline: 16px;\n}\n\n/* Fluid Typography with clamp(min, preferred, max) */\nh1 {\n  font-size: clamp(1.75rem, 4vw, 3rem);\n}",
      "explanation": "1. max-width: 100%: Ensures images and containers scale down on narrow screens without bursting past viewport boundaries.\n2. rem (root em): Relative to the root <html> font size (default 16px). 1rem = 16px, 1.5rem = 24px. Honors accessibility zoom settings.\n3. Viewport Units (vw, vh): 1vw is 1% of the viewport width; 100vh is the full viewport height.\n4. clamp(MIN, VAL, MAX): Sets a fluid value that grows with the screen but stays clamped between a minimum and maximum bound.\n5. Mobile-First Philosophy: Designing the clean single-column mobile view first, then enhancing layout for wider viewports.",
      "codeExample": "/* Modern Responsive Card Layout */\n.responsive-card {\n  width: 100%;\n  max-width: 450px;\n  padding: clamp(16px, 3vw, 32px);\n  margin: 0 auto;\n  border-radius: 12px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n}\n\n.responsive-card img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}",
      "expectedOutput": "A card that spans full-width on smartphones with 16px padding, and gently expands to a capped 450px on desktop with 32px padding.",
      "commonMistakes": [
        {
          "mistake": "Using fixed pixel widths (width: 800px) on containers.",
          "correction": "Use max-width: 800px and width: 100% instead.",
          "explanation": "On a 375px mobile screen, width: 800px forces the browser to create horizontal scrollbars and zooms out the page."
        },
        {
          "mistake": "Forgetting height: auto when setting max-width: 100% on images.",
          "correction": "Always pair max-width: 100% with height: auto.",
          "explanation": "Without height: auto, images with inline height attributes distort their aspect ratio when scaled down."
        },
        {
          "mistake": "Using px for all font sizes instead of rem.",
          "correction": "Use rem for font sizes and spacing.",
          "explanation": "Fixed pixel font sizes ignore user browser accessibility settings (e.g. users who set default font size to 24px)."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Resize the browser or observe the responsive image and card below. Notice how max-width: 100% prevents overflow.",
      "starterCode": "<style>\n  .fluid-container {\n    width: 100%;\n    max-width: 360px;\n    margin: 0 auto;\n    padding: 16px;\n    background: #f8fafc;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .fluid-img {\n    max-width: 100%;\n    height: auto;\n    border-radius: 6px;\n    display: block;\n  }\n</style>\n<div class=\"fluid-container\">\n  <img class=\"fluid-img\" src=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500\" alt=\"Laptop\">\n  <h4 style=\"margin: 12px 0 6px;\">Fluid Responsive Media</h4>\n  <p style=\"margin: 0; font-size: 13px; color: #64748b;\">This image scales smoothly to fit its container without overflowing.</p>\n</div>",
      "solutionCode": "<style>\n  .fluid-container {\n    width: 100%;\n    max-width: 360px;\n    margin: 0 auto;\n    padding: 16px;\n    background: #f8fafc;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .fluid-img {\n    max-width: 100%;\n    height: auto;\n    border-radius: 6px;\n    display: block;\n  }\n</style>\n<div class=\"fluid-container\">\n  <img class=\"fluid-img\" src=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500\" alt=\"Laptop\">\n  <h4 style=\"margin: 12px 0 6px;\">Fluid Responsive Media</h4>\n  <p style=\"margin: 0; font-size: 13px; color: #64748b;\">This image scales smoothly to fit its container without overflowing.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q10-1",
        "level": "Easy",
        "title": "Responsive Fluid Image Rule",
        "prompt": "Write the standard responsive image rule for img setting max-width: 100%, height: auto, and display: block.",
        "requirements": [
          "Selector img",
          "max-width: 100%",
          "height: auto",
          "display: block"
        ],
        "starterCode": "/* Write responsive image rule */\n",
        "solutionCode": "img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}",
        "expectedOutput": "All images adapt to container widths without overflowing or distorting their aspect ratio.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/img\s*\{/i.test(code)) errors.push('Missing img selector.');
          if (!/max-width\s*:\s*100%/i.test(code)) errors.push('Missing max-width: 100%.');
          if (!/height\s*:\s*auto/i.test(code)) errors.push('Missing height: auto.');
          if (!/display\s*:\s*block/i.test(code)) errors.push('Missing display: block.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q10-2",
        "level": "Medium",
        "title": "Centered Capped Fluid Container",
        "prompt": "Create a rule for .site-wrapper setting width: 100%, max-width: 1140px, margin: 0 auto, and padding: 0 16px.",
        "requirements": [
          "Selector .site-wrapper",
          "width: 100%",
          "max-width: 1140px",
          "margin: 0 auto",
          "padding: 0 16px"
        ],
        "starterCode": "/* Write fluid wrapper rule */\n",
        "solutionCode": ".site-wrapper {\n  width: 100%;\n  max-width: 1140px;\n  margin: 0 auto;\n  padding: 0 16px;\n}",
        "expectedOutput": "A responsive layout container that stretches full-width on mobile with 16px padding and caps at 1140px centered on desktop.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.site-wrapper\s*\{/i.test(code)) errors.push('Missing .site-wrapper selector.');
          if (!/width\s*:\s*100%/i.test(code)) errors.push('Missing width: 100%.');
          if (!/max-width\s*:\s*1140px/i.test(code)) errors.push('Missing max-width: 1140px.');
          if (!/margin\s*:\s*0\s+auto/i.test(code)) errors.push('Missing margin: 0 auto.');
          if (!/padding\s*:\s*0\s+16px/i.test(code)) errors.push('Missing padding: 0 16px.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q10-3",
        "level": "Challenge",
        "title": "Fluid Typography with CSS clamp()",
        "prompt": "Style .fluid-headline setting font-size using clamp(1.5rem, 5vw, 3rem), font-weight: 700, and line-height: 1.2.",
        "requirements": [
          "Selector .fluid-headline",
          "font-size: clamp(1.5rem, 5vw, 3rem)",
          "font-weight: 700",
          "line-height: 1.2"
        ],
        "starterCode": "/* Write fluid headline rule */\n",
        "solutionCode": ".fluid-headline {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n  font-weight: 700;\n  line-height: 1.2;\n}",
        "expectedOutput": "A headline font that scales dynamically with viewport width, never shrinking below 1.5rem or growing beyond 3rem.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/\.fluid-headline\s*\{/i.test(code)) errors.push('Missing .fluid-headline selector.');
          if (!/font-size\s*:\s*clamp\(\s*1\.5rem\s*,\s*5vw\s*,\s*3rem\s*\)/i.test(code)) {
            errors.push('Missing font-size: clamp(1.5rem, 5vw, 3rem).');
          }
          if (!/font-weight\s*:\s*700/i.test(code)) errors.push('Missing font-weight: 700.');
          if (!/line-height\s*:\s*1\.2/i.test(code)) errors.push('Missing line-height: 1.2.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Why is max-width: 100% preferred over width: 100% for responsive images?",
        "options": [
          "max-width allows images to shrink if their container is small, but prevents them from stretching larger than their natural pixel resolution",
          "width: 100% is invalid CSS for images",
          "max-width disables image caching",
          "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "max-width: 100% prevents low-resolution images from blurring by stretching past their natural size when placed in large containers."
      },
      {
        "id": 2,
        "question": "What does 1rem equal in a browser with default user preferences?",
        "options": [
          "10px",
          "12px",
          "16px",
          "20px"
        ],
        "correctIndex": 2,
        "explanation": "In all standard browsers, the root element font size defaults to 16px, so 1rem = 16px."
      },
      {
        "id": 3,
        "question": "How does CSS clamp(1rem, 2.5vw, 2rem) behave?",
        "options": [
          "It picks a random number between 1rem and 2rem",
          "It scales smoothly at 2.5% of the viewport width, but never drops below 1rem or exceeds 2rem",
          "It clamps the element width to 2rem",
          "It hides the text on mobile"
        ],
        "correctIndex": 1,
        "explanation": "clamp(min, preferred, max) restricts a value between defined lower and upper bounds."
      }
    ],
    "video": {
      "title": "Introduction To Responsive Web Design - HTML & CSS Tutorial",
      "channel": "Kevin Powell on freeCodeCamp",
      "videoId": "VQETvlzwh4M",
      "url": "https://www.youtube.com/watch?v=VQETvlzwh4M",
      "description": "Kevin Powell explains the core principles of responsive design, relative units, fluid layouts, and mobile-first thinking."
    }
  },
  {
    "id": "css-topic-16",
    "order": 16,
    "slug": "media-queries",
    "title": "Media Queries",
    "difficulty": "Intermediate",
    "estimatedTime": "15 min",
    "summary": "Adapt CSS rules conditionally using @media queries: min-width breakpoints, mobile-first design, orientation, and detecting user preferences with prefers-color-scheme.",
    "notes": {
      "concept": "Media queries allow developers to apply CSS rules selectively depending on device characteristics such as viewport width, orientation, screen resolution, or user color scheme preferences. Following the mobile-first paradigm, developers write baseline styles for mobile screens first, then use @media (min-width: 768px) and @media (min-width: 1024px) to progressively enhance layouts for tablets and desktops.",
      "syntax": "/* Mobile-first base styles (under 768px) */\n.content-grid {\n  display: block;\n}\n\n/* Tablet Breakpoint (768px and up) */\n@media (min-width: 768px) {\n  .content-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Desktop Breakpoint (1024px and up) */\n@media (min-width: 1024px) {\n  .content-grid {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n\n/* User Dark Mode Preference */\n@media (prefers-color-scheme: dark) {\n  body {\n    background-color: #0f172a;\n    color: #f8fafc;\n  }\n}",
      "explanation": "1. @media (min-width: 768px): Rules inside this block execute only when the browser window is 768 pixels or wider.\n2. Mobile-First: Using min-width queries means mobile styles are the default, and larger screens inherit and override styles.\n3. Common Breakpoints: 640px (large phones), 768px (tablets), 1024px (laptops), 1280px (desktops).\n4. prefers-color-scheme: dark: Detects if the user has enabled OS-level dark mode, enabling automatic theme switching.\n5. Combining conditions: @media (min-width: 768px) and (orientation: landscape).",
      "codeExample": "/* Responsive Navigation Header */\n.nav-menu {\n  display: none; /* Hidden on mobile */\n}\n\n.hamburger-btn {\n  display: block; /* Visible on mobile */\n}\n\n/* On Desktop screens */\n@media (min-width: 768px) {\n  .nav-menu {\n    display: flex;\n    gap: 20px;\n  }\n  .hamburger-btn {\n    display: none; /* Hide hamburger on desktop */\n  }\n}",
      "expectedOutput": "On a mobile screen, a compact hamburger icon is displayed. When resized past 768px, the hamburger vanishes and full horizontal navigation links appear.",
      "commonMistakes": [
        {
          "mistake": "Using max-width queries everywhere (desktop-first), resulting in bloated override code.",
          "correction": "Adopt mobile-first min-width queries; base styles are simpler and overrides add features as screens grow.",
          "explanation": "Desktop-first requires constantly resetting desktop grid and flex styles back to block on smaller screens."
        },
        {
          "mistake": "Inventing dozens of hyperspecific breakpoints for every individual phone model.",
          "correction": "Use 3 to 4 standardized breakpoints based on your content layout needs (e.g. 640px, 768px, 1024px).",
          "explanation": "Targeting specific device resolutions is impossible due to hundreds of phone models; breakpoints should adapt where layout breaks."
        },
        {
          "mistake": "Forgetting the viewport meta tag in HTML (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">).",
          "correction": "Always include the responsive viewport meta tag in the document <head>.",
          "explanation": "Without this meta tag, mobile browsers simulate a 980px desktop window and ignore your media queries."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Notice how the container shifts from single-column to 2-column layout when viewport width reaches 400px in the sandbox.",
      "starterCode": "<style>\n  .mq-card {\n    background: #f1f5f9;\n    padding: 16px;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .mq-layout {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .mq-box {\n    background: #6366f1;\n    color: white;\n    padding: 16px;\n    border-radius: 6px;\n    text-align: center;\n    font-weight: bold;\n  }\n  /* When container or screen is at least 350px */\n  @media (min-width: 350px) {\n    .mq-layout {\n      flex-direction: row;\n    }\n    .mq-box {\n      flex: 1;\n    }\n  }\n</style>\n<div class=\"mq-card\">\n  <div class=\"mq-layout\">\n    <div class=\"mq-box\">Col 1</div>\n    <div class=\"mq-box\">Col 2</div>\n  </div>\n</div>",
      "solutionCode": "<style>\n  .mq-card {\n    background: #f1f5f9;\n    padding: 16px;\n    border-radius: 8px;\n    font-family: sans-serif;\n  }\n  .mq-layout {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .mq-box {\n    background: #6366f1;\n    color: white;\n    padding: 16px;\n    border-radius: 6px;\n    text-align: center;\n    font-weight: bold;\n  }\n  /* When container or screen is at least 350px */\n  @media (min-width: 350px) {\n    .mq-layout {\n      flex-direction: row;\n    }\n    .mq-box {\n      flex: 1;\n    }\n  }\n</style>\n<div class=\"mq-card\">\n  <div class=\"mq-layout\">\n    <div class=\"mq-box\">Col 1</div>\n    <div class=\"mq-box\">Col 2</div>\n  </div>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q11-1",
        "level": "Easy",
        "title": "Tablet Media Query Breakpoint",
        "prompt": "Write a media query for min-width: 768px that sets .sidebar to display: block.",
        "requirements": [
          "@media (min-width: 768px)",
          ".sidebar with display: block"
        ],
        "starterCode": "/* Write tablet media query here */\n",
        "solutionCode": "@media (min-width: 768px) {\n  .sidebar {\n    display: block;\n  }\n}",
        "expectedOutput": "The sidebar becomes visible when the browser window is 768px or wider.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/@media\s*\(\s*min-width\s*:\s*768px\s*\)/i.test(code)) {
            errors.push('Missing @media (min-width: 768px).');
          }
          if (!/\.sidebar\s*\{[\s\S]*?display\s*:\s*block/i.test(code)) {
            errors.push('Missing .sidebar with display: block inside media query.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q11-2",
        "level": "Medium",
        "title": "Desktop Multi-Column Grid at 1024px",
        "prompt": "Write a media query for min-width: 1024px that sets .gallery to display: grid and grid-template-columns: repeat(4, 1fr).",
        "requirements": [
          "@media (min-width: 1024px)",
          ".gallery with display: grid and grid-template-columns: repeat(4, 1fr)"
        ],
        "starterCode": "/* Write desktop media query */\n",
        "solutionCode": "@media (min-width: 1024px) {\n  .gallery {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n  }\n}",
        "expectedOutput": "On desktop screens 1024px+, the gallery transforms into a 4-column grid.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/@media\s*\(\s*min-width\s*:\s*1024px\s*\)/i.test(code)) {
            errors.push('Missing @media (min-width: 1024px).');
          }
          if (!/\.gallery\s*\{[\s\S]*?display\s*:\s*grid/i.test(code)) {
            errors.push('Missing .gallery display: grid.');
          }
          if (!/\.gallery\s*\{[\s\S]*?grid-template-columns\s*:\s*(repeat\(\s*4\s*,\s*1fr\s*\)|1fr\s+1fr\s+1fr\s+1fr)/i.test(code)) {
            errors.push('Missing grid-template-columns: repeat(4, 1fr).');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        "id": "css-q11-3",
        "level": "Challenge",
        "title": "System Dark Mode Media Query",
        "prompt": "Write a media query detecting user dark mode preference using @media (prefers-color-scheme: dark). Inside, set body to background-color: #0f172a and color: #f8fafc, and set .card to background-color: #1e293b and border-color: #334155.",
        "requirements": [
          "@media (prefers-color-scheme: dark)",
          "body with background-color: #0f172a and color: #f8fafc",
          ".card with background-color: #1e293b and border-color: #334155"
        ],
        "starterCode": "/* Write dark mode media query */\n",
        "solutionCode": "@media (prefers-color-scheme: dark) {\n  body {\n    background-color: #0f172a;\n    color: #f8fafc;\n  }\n  .card {\n    background-color: #1e293b;\n    border-color: #334155;\n  }\n}",
        "expectedOutput": "Automatic dark mode styles applied seamlessly when the user operating system preference is dark.",
        "validate": (code) => {
          code = String(code || '');
          const errors = [];
          if (!/@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)/i.test(code)) {
            errors.push('Missing @media (prefers-color-scheme: dark).');
          }
          if (!/body\s*\{[\s\S]*?background-color\s*:\s*#0f172a/i.test(code)) {
            errors.push('Missing body background-color: #0f172a.');
          }
          if (!/body\s*\{[\s\S]*?color\s*:\s*#f8fafc/i.test(code)) {
            errors.push('Missing body color: #f8fafc.');
          }
          if (!/\.card\s*\{[\s\S]*?background-color\s*:\s*#1e293b/i.test(code)) {
            errors.push('Missing .card background-color: #1e293b.');
          }
          if (!/\.card\s*\{[\s\S]*?border-color\s*:\s*#334155/i.test(code)) {
            errors.push('Missing .card border-color: #334155.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What does @media (min-width: 768px) indicate?",
        "options": [
          "Styles inside apply only on screens narrower than 768px",
          "Styles inside apply when the viewport is 768px or wider",
          "The screen will zoom by 768%",
          "Styles apply exclusively to Apple iPads"
        ],
        "correctIndex": 1,
        "explanation": "min-width queries establish a minimum screen width threshold; styles activate once the window reaches or exceeds that dimension."
      },
      {
        "id": 2,
        "question": "What is the \"Mobile-First\" development strategy?",
        "options": [
          "Writing CSS for mobile devices first without media queries, then using min-width queries to add layout complexity for larger screens",
          "Developing phone apps in Swift before making a website",
          "Blocking desktop computers from loading the site",
          "Using max-width queries exclusively"
        ],
        "correctIndex": 0,
        "explanation": "Mobile-first keeps baseline CSS lean and performant for mobile devices, progressively enhancing with min-width media queries for larger displays."
      },
      {
        "id": 3,
        "question": "Which media feature detects whether the user device has dark mode enabled?",
        "options": [
          "dark-mode: true",
          "prefers-color-scheme: dark",
          "color-mode: dark",
          "system-theme: night"
        ],
        "correctIndex": 1,
        "explanation": "@media (prefers-color-scheme: dark) queries the operating system preference to apply dark theme styles automatically."
      }
    ],
    "video": {
      "title": "Learn CSS Media Query In 7 Minutes",
      "channel": "Web Dev Simplified",
      "videoId": "yU7jJ3NbPdA",
      "url": "https://www.youtube.com/watch?v=yU7jJ3NbPdA",
      "description": "Kyle teaches how media queries work, breakpoints, min-width vs max-width, and mobile-first principles."
    }
  },
  {
    "id": "css-topic-17",
    "order": 17,
    "slug": "css-variables",
    "title": "CSS Variables (Custom Properties)",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Leverage native CSS custom properties (--variable-name) and the var() function to centralize design tokens, eliminate hardcoded values, enable runtime dynamic updates, and build dark mode theme switchers.",
    "notes": {
      "concept": "CSS Custom Properties (commonly called CSS Variables) allow developers to store reusable values directly in stylesheets. Declared with a double hyphen prefix (e.g., --primary-color: #6366f1;) on the :root pseudo-class, custom properties cascade through the DOM hierarchy, respect inheritance, and can be dynamically read and updated at runtime using JavaScript.",
      "syntax": "/* 1. Global Declaration on Root */\n:root {\n  --brand-primary: #6366f1;\n  --surface-bg: #0f172a;\n  --text-main: #f8fafc;\n  --radius-md: 8px;\n}\n\n/* 2. Consuming with var() and Fallback */\n.card {\n  background-color: var(--surface-bg);\n  color: var(--text-main);\n  border-radius: var(--radius-md, 4px);\n}\n\n/* 3. Dark Theme Class Override */\n.dark-theme {\n  --surface-bg: #020617;\n  --text-main: #ffffff;\n}",
      "explanation": "1. :root Scope: Declaring variables on :root makes them globally accessible to every element in the HTML document.\\n2. var(--name, fallback): Retrieves the value of the custom property. The optional second parameter provides a fallback if the variable is undeclared.\\n3. Runtime Cascading: Changing a custom property inside a specific class (like .dark-mode or .compact) instantly re-evaluates all children without rewriting declarations.",
      "codeExample": "/* Reusable button system powered by CSS variables */\n:root {\n  --btn-bg: #2563eb;\n  --btn-color: #ffffff;\n}\n\n.btn {\n  background-color: var(--btn-bg);\n  color: var(--btn-color);\n  padding: 10px 20px;\n  border-radius: 6px;\n  border: none;\n}\n\n.btn-secondary {\n  --btn-bg: #475569;\n}\n\n.btn-danger {\n  --btn-bg: #dc2626;\n}",
      "expectedOutput": "A component design system where modifying one variable (--btn-bg) automatically styles secondary and danger button variations cleanly.",
      "commonMistakes": [
        {
          "mistake": "Forgetting the double-dash prefix: root { primary-color: #2563eb; }",
          "correction": "Always prefix custom property names with two dashes: --primary-color: #2563eb;",
          "explanation": "The CSS parser requires the -- prefix to distinguish custom properties from native CSS properties."
        },
        {
          "mistake": "Using CSS variables as property names: var(--my-prop): 20px;",
          "correction": "Variables can only store values, not property names or selectors.",
          "explanation": "Custom properties store values (colors, dimensions, strings) that are substituted into property declarations."
        },
        {
          "mistake": "Overlooking case sensitivity: --accentColor vs --accentcolor.",
          "correction": "CSS custom properties are strictly case-sensitive; pick a consistent convention like kebab-case (--accent-color).",
          "explanation": "--primary-color and --Primary-Color are treated by the engine as two completely different variables."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Change the value of --theme-accent in the :root block to #ec4899 or #10b981 and observe all matching buttons update in real time.",
      "starterCode": "<style>\n  :root {\n    --theme-accent: #6366f1;\n    --theme-surface: #1e293b;\n  }\n  .card {\n    background: var(--theme-surface);\n    color: white;\n    padding: 20px;\n    border-radius: 8px;\n    border-top: 4px solid var(--theme-accent);\n  }\n  .accent-btn {\n    background: var(--theme-accent);\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n  }\n</style>\n<div class=\"card\">\n  <h3>Themed Card Component</h3>\n  <p>All colors are dynamically inherited from CSS Custom Properties.</p>\n  <button class=\"accent-btn\">Action Button</button>\n</div>",
      "solutionCode": "<style>\n  :root {\n    --theme-accent: #6366f1;\n    --theme-surface: #1e293b;\n  }\n  .card {\n    background: var(--theme-surface);\n    color: white;\n    padding: 20px;\n    border-radius: 8px;\n    border-top: 4px solid var(--theme-accent);\n  }\n  .accent-btn {\n    background: var(--theme-accent);\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n  }\n</style>\n<div class=\"card\">\n  <h3>Themed Card Component</h3>\n  <p>All colors are dynamically inherited from CSS Custom Properties.</p>\n  <button class=\"accent-btn\">Action Button</button>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q17-1",
        "level": "Easy",
        "title": "Declare Global CSS Variable on Root",
        "prompt": "In a :root block, declare a custom property --primary-color with value #38bdf8.",
        "requirements": [
          "Target :root selector",
          "Declare --primary-color: #38bdf8"
        ],
        "starterCode": "/* Declare custom property on root */\n",
        "solutionCode": ":root {\n  --primary-color: #38bdf8;\n}",
        "expectedOutput": "Custom property --primary-color globally defined on :root.",
        "validate": (code) => {
        code = String(code || '');
        if (!/:root\s*\{/i.test(code)) return { valid: false, message: 'Missing :root selector.' };
        if (!/--primary-color\s*:\s*#38bdf8/i.test(code)) return { valid: false, message: 'Missing --primary-color: #38bdf8.' };
        return { valid: true, message: 'Great! CSS variable declared on :root.' };
      }
      },
      {
        "id": "css-q17-2",
        "level": "Medium",
        "title": "Consume Variable with Fallback",
        "prompt": "Write a ruleset for .title that sets color using var(--brand-blue, #2563eb).",
        "requirements": [
          "Target .title selector",
          "Set color: var(--brand-blue, #2563eb)"
        ],
        "starterCode": "/* Consume variable with fallback */\n",
        "solutionCode": ".title {\n  color: var(--brand-blue, #2563eb);\n}",
        "expectedOutput": ".title applies var(--brand-blue) with fallback color #2563eb.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.title\s*\{/i.test(code)) return { valid: false, message: 'Missing .title selector.' };
        if (!/color\s*:\s*var\(\s*--brand-blue\s*,\s*#2563eb\s*\)/i.test(code)) {
          return { valid: false, message: 'Use color: var(--brand-blue, #2563eb).' };
        }
        return { valid: true, message: 'Well done! var() fallback syntax verified.' };
      }
      },
      {
        "id": "css-q17-3",
        "level": "Challenge",
        "title": "Dark Theme Theme-Switcher Tokens",
        "prompt": "Write two rulesets: 1) :root declaring --card-bg: #ffffff and --card-text: #0f172a; 2) .dark declaring --card-bg: #1e293b and --card-text: #f8fafc.",
        "requirements": [
          ":root with --card-bg: #ffffff and --card-text: #0f172a",
          ".dark with --card-bg: #1e293b and --card-text: #f8fafc"
        ],
        "starterCode": "/* Theme tokens */\n",
        "solutionCode": ":root {\n  --card-bg: #ffffff;\n  --card-text: #0f172a;\n}\n\n.dark {\n  --card-bg: #1e293b;\n  --card-text: #f8fafc;\n}",
        "expectedOutput": "Clean design system tokens enabling seamless light/dark theme switching.",
        "validate": (code) => {
        code = String(code || '');
        if (!/:root\s*\{[^}]*--card-bg/i.test(code)) return { valid: false, message: 'Define --card-bg in :root.' };
        if (!/\.dark\s*\{[^}]*--card-bg\s*:\s*#1e293b/i.test(code)) return { valid: false, message: 'Override --card-bg in .dark.' };
        return { valid: true, message: 'Outstanding! Theming variables verified.' };
      }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "Which prefix is required when creating a CSS Custom Property?",
        "options": [
          "$",
          "@",
          "-- (two hyphens)",
          "&"
        ],
        "correctIndex": 2,
        "explanation": "CSS Custom Properties must begin with two hyphens (e.g. --brand-color)."
      },
      {
        "id": 2,
        "question": "What is the purpose of the second argument in var(--color, #000)?",
        "options": [
          "It sets the opacity of the color",
          "It acts as a fallback value if the custom property is undefined or invalid",
          "It converts the color to hex",
          "It specifies the media query"
        ],
        "correctIndex": 1,
        "explanation": "The second parameter is an optional fallback value that is applied if the variable is not defined."
      },
      {
        "id": 3,
        "question": "Why are native CSS variables superior to Sass/SCSS preprocessor variables for theming?",
        "options": [
          "CSS variables exist in the live browser DOM, respect the cascade, and can be modified dynamically at runtime with JavaScript",
          "Sass variables do not support colors",
          "CSS variables compile into C++",
          "CSS variables are only available in Firefox"
        ],
        "correctIndex": 0,
        "explanation": "Sass variables compile away at build time into static values, whereas native CSS variables remain live in the DOM and can be altered dynamically in the browser."
      }
    ],
    "video": {
      "title": "CSS Variables Tutorial (Custom Properties)",
      "channel": "Web Dev Simplified",
      "videoId": "PHxyvXEmuQA",
      "url": "https://www.youtube.com/watch?v=PHxyvXEmuQA",
      "description": "Kyle teaches the syntax of native CSS variables, how to use them with fallbacks, and how to build a dynamic dark mode theme switcher."
    }
  },
  {
    "id": "css-topic-18",
    "order": 18,
    "slug": "advanced-css-best-practices",
    "title": "Advanced CSS and Best Practices",
    "difficulty": "Intermediate",
    "estimatedTime": "20 min",
    "summary": "Write professional, scalable, maintainable CSS architectures: modern box-sizing resets, BEM (Block-Element-Modifier) naming conventions, eliminating specificity wars and !important abuse, and ensuring WCAG AA color accessibility.",
    "notes": {
      "concept": "Writing scalable CSS requires architectural discipline. As applications grow to thousands of components, unmanaged global stylesheets suffer from specificity wars, unintended side effects, and dead code. Industry best practices employ modern CSS resets, modular methodologies like BEM (Block-Element-Modifier), and accessibility standards (WCAG AA contrast ratios).",
      "syntax": "/* 1. Modern Box-Sizing Reset */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* 2. BEM Naming Methodology */\n/* Block (Independent standalone component) */\n.card {}\n\n/* Element (Part of the block with no standalone meaning) */\n.card__header {}\n.card__title {}\n\n/* Modifier (Variant modifying appearance or behavior) */\n.card--highlighted {}\n.card__title--large {}",
      "explanation": "1. Universal Box-Sizing Reset: Setting box-sizing: border-box on all elements and pseudo-elements ensures padding and border widths do not unintentionally expand element dimensions.\\n2. BEM Architecture: Block__Element--Modifier prevents naming collisions and keeps specificity flat (0,0,1,0), allowing any component to be reused anywhere safely.\\n3. Avoid !important: Using !important breaks the natural cascade and creates an escalating specificity war. Solve styling conflicts by refactoring selector specificity instead.\\n4. Accessible Contrast: Ensure text meets WCAG AA standards (minimum 4.5:1 contrast ratio against the background) so content is legible for all users.",
      "codeExample": "/* Modern BEM component with accessible focus styling */\n.nav-card {\n  background-color: #1e293b;\n  border-radius: 8px;\n  padding: 20px;\n}\n\n.nav-card__heading {\n  font-size: 20px;\n  color: #f8fafc;\n  margin-top: 0;\n}\n\n.nav-card__cta {\n  background-color: #2563eb;\n  color: white;\n  padding: 8px 16px;\n  border-radius: 4px;\n  text-decoration: none;\n  display: inline-block;\n}\n\n.nav-card__cta:focus-visible {\n  outline: 3px solid #38bdf8;\n  outline-offset: 2px;\n}",
      "expectedOutput": "A robust, modular BEM card component with accessible focus-visible indicators that never conflicts with other styles on the page.",
      "commonMistakes": [
        {
          "mistake": "Using !important to solve specificity conflicts: color: red !important;",
          "correction": "Refactor selectors to have equal or appropriate specificity without !important.",
          "explanation": "!important bypasses the cascade, making future overrides almost impossible without chaining more !important declarations."
        },
        {
          "mistake": "Writing overly deep descendant selectors: body div.main section#hero .content p span a",
          "correction": "Keep selectors flat and shallow using BEM classes: .hero__link",
          "explanation": "Deeply nested selectors increase specificity, hurt browser rendering performance, and tightly couple CSS to HTML DOM structure."
        },
        {
          "mistake": "Removing focus rings with outline: none without providing a custom visible focus replacement.",
          "correction": "Use :focus-visible with a prominent outline and outline-offset.",
          "explanation": "Removing focus outlines traps keyboard-only and screen-reader users who cannot see which element currently has focus."
        }
      ]
    },
    "tryItYourself": {
      "prompt": "Examine a BEM component structure in the sandbox below. Inspect how the modifier class changes the visual card state.",
      "starterCode": "<style>\n  .card {\n    background: #1e293b;\n    color: white;\n    padding: 20px;\n    border-radius: 8px;\n    border: 2px solid transparent;\n  }\n  .card__title { color: #38bdf8; margin-top: 0; }\n  .card--featured {\n    border-color: #f59e0b;\n    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);\n  }\n</style>\n<div class=\"card card--featured\">\n  <h3 class=\"card__title\">Featured Component</h3>\n  <p>Styled with clean, conflict-free BEM architecture.</p>\n</div>",
      "solutionCode": "<style>\n  .card {\n    background: #1e293b;\n    color: white;\n    padding: 20px;\n    border-radius: 8px;\n    border: 2px solid transparent;\n  }\n  .card__title { color: #38bdf8; margin-top: 0; }\n  .card--featured {\n    border-color: #f59e0b;\n    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);\n  }\n</style>\n<div class=\"card card--featured\">\n  <h3 class=\"card__title\">Featured Component</h3>\n  <p>Styled with clean, conflict-free BEM architecture.</p>\n</div>"
    },
    "practiceQuestions": [
      {
        "id": "css-q18-1",
        "level": "Easy",
        "title": "Modern Universal Box-Sizing Reset",
        "prompt": "Write the universal box-sizing reset targeting *, *::before, *::after setting box-sizing: border-box.",
        "requirements": [
          "Target *, *::before, *::after",
          "Set box-sizing: border-box"
        ],
        "starterCode": "/* Write universal box-sizing reset */\n",
        "solutionCode": "*, *::before, *::after {\n  box-sizing: border-box;\n}",
        "expectedOutput": "Universal box-sizing reset applied across all document elements and pseudo-elements.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\*\s*,\s*\*::?before\s*,\s*\*::?after/i.test(code)) return { valid: false, message: 'Target *, *::before, *::after.' };
        if (!/box-sizing\s*:\s*border-box/i.test(code)) return { valid: false, message: 'Set box-sizing: border-box.' };
        return { valid: true, message: 'Great! The universal box-sizing reset is the foundation of modern web layouts.' };
      }
      },
      {
        "id": "css-q18-2",
        "level": "Medium",
        "title": "BEM Element and Modifier Rules",
        "prompt": "Write two BEM rulesets: 1) .media-card__image setting width: 100% and border-radius: 6px; 2) .media-card--horizontal setting display: flex.",
        "requirements": [
          ".media-card__image with width: 100% and border-radius: 6px",
          ".media-card--horizontal with display: flex"
        ],
        "starterCode": "/* Write BEM rulesets */\n",
        "solutionCode": ".media-card__image {\n  width: 100%;\n  border-radius: 6px;\n}\n\n.media-card--horizontal {\n  display: flex;\n}",
        "expectedOutput": "BEM element and modifier rules maintain flat specificity and modular isolation.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.media-card__image\s*\{[^}]*width\s*:\s*100%/i.test(code)) return { valid: false, message: 'Define .media-card__image.' };
        if (!/\.media-card--horizontal\s*\{[^}]*display\s*:\s*flex/i.test(code)) return { valid: false, message: 'Define .media-card--horizontal.' };
        return { valid: true, message: 'Well done! BEM naming convention verified.' };
      }
      },
      {
        "id": "css-q18-3",
        "level": "Challenge",
        "title": "Accessible Focus Ring with focus-visible",
        "prompt": "Write a ruleset for .interactive-element:focus-visible setting outline: 3px solid #0284c7 and outline-offset: 2px.",
        "requirements": [
          "Target .interactive-element:focus-visible",
          "Set outline: 3px solid #0284c7",
          "Set outline-offset: 2px"
        ],
        "starterCode": "/* Write accessible focus ring */\n",
        "solutionCode": ".interactive-element:focus-visible {\n  outline: 3px solid #0284c7;\n  outline-offset: 2px;\n}",
        "expectedOutput": "Prominent, accessible focus ring that appears only when users navigate with a keyboard.",
        "validate": (code) => {
        code = String(code || '');
        if (!/\.interactive-element:focus-visible\s*\{/i.test(code)) return { valid: false, message: 'Target .interactive-element:focus-visible.' };
        if (!/outline\s*:\s*3px\s+solid\s+#0284c7/i.test(code)) return { valid: false, message: 'Set outline: 3px solid #0284c7.' };
        if (!/outline-offset\s*:\s*2px/i.test(code)) return { valid: false, message: 'Set outline-offset: 2px.' };
        return { valid: true, message: 'Outstanding! Accessible :focus-visible ring verified.' };
      }
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "What is the purpose of the BEM (Block Element Modifier) CSS methodology?",
        "options": [
          "To create unique, non-colliding class names that keep specificity flat and components modular",
          "To compress images automatically",
          "To replace CSS with JavaScript",
          "To speed up SQL queries"
        ],
        "correctIndex": 0,
        "explanation": "BEM eliminates naming collisions and prevents specificity wars by giving every component an unambiguous name."
      },
      {
        "id": 2,
        "question": "Why is using !important considered an anti-pattern in professional CSS?",
        "options": [
          "It disables CSS animations completely",
          "It overrides the natural cascade, making future maintenance and overrides extremely difficult",
          "It is unsupported on Safari",
          "It creates JavaScript memory leaks"
        ],
        "correctIndex": 1,
        "explanation": "!important bypasses normal specificity rules and leads to specificity escalation wars that make stylesheets fragile."
      },
      {
        "id": 3,
        "question": "Why should developers use :focus-visible instead of removing focus outlines with outline: none?",
        "options": [
          "Removing outlines makes websites inaccessible to keyboard-only and screen-reader users; :focus-visible provides clear focus rings during keyboard navigation without showing on mouse clicks",
          ":focus-visible makes elements load faster",
          "outline: none is forbidden in HTML5",
          ":focus-visible enables dark mode"
        ],
        "correctIndex": 0,
        "explanation": ":focus-visible provides a clean, modern experience that highlights elements during keyboard navigation while remaining subtle during mouse clicks."
      }
    ],
    "video": {
      "title": "CSS Best Practices, Modern Reset & Architecture",
      "channel": "Dave Gray",
      "videoId": "OXGznpKZ_sA",
      "url": "https://www.youtube.com/watch?v=OXGznpKZ_sA",
      "description": "Dave Gray explains modern CSS resets, BEM naming conventions, specificity management, and architecture patterns."
    }
  }
];

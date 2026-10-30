/**
 * CodeForge - HTML Foundational Curriculum Topics
 * 10 Comprehensive, Beginner-Friendly Topics with:
 * - Structured Notes: Concept, Syntax, Explanation, Code Example, Expected Output, Common Mistakes
 * - Interactive Try It Yourself live playground starters
 * - 3 Practice Questions per topic: Easy, Medium, and Challenge with automated validators
 * - Interactive Quiz with instant feedback and explanations
 * - Verified YouTube Educational Resources from trusted educators
 */

export const HTML_TOPICS = [
  // =========================================================================
  // TOPIC 1: HTML Document Structure
  // =========================================================================
  {
    id: 'topic-1',
    order: 1,
    slug: 'html-document-structure',
    title: 'HTML Document Structure',
    difficulty: 'Beginner',
    estimatedTime: '12 min',
    summary:
      'Learn how the browser interprets a web document, the role of the Document Type Declaration (DOCTYPE), and the essential anatomy of an HTML5 boilerplate.',
    notes: {
      concept:
        'HTML (HyperText Markup Language) is the foundational language of the web. Every webpage begins with a standardized skeleton that informs the browser how to render text, process characters, and scale across screens. The HTML5 document structure defines the hierarchy between machine metadata (<head>) and user-facing content (<body>).',
      syntax:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
  </head>
  <body>
    <!-- Visible content goes here -->
  </body>
</html>`,
      explanation:
        '1. <!DOCTYPE html>: Informs the browser to render the page in standards-compliant mode rather than legacy quirks mode.\n2. <html lang="en">: Root element wrapping all document content; lang defines the natural language for accessibility and search engines.\n3. <head>: Contains non-visible document metadata, encoding declarations, stylesheets, and browser tab titles.\n4. <meta charset="UTF-8">: Defines character encoding to support all international characters and symbols.\n5. <meta name="viewport">: Configures responsive scaling for mobile devices.\n6. <body>: Houses all visual elements (headings, paragraphs, images, buttons) rendered on the page.',
      codeExample:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeForge - Hello World</title>
  </head>
  <body>
    <h1>Welcome to Web Development</h1>
    <p>This is my first structured HTML5 webpage running in the browser.</p>
  </body>
</html>`,
      expectedOutput:
        'A web browser tab titled "CodeForge - Hello World" displaying a large prominent bold heading "Welcome to Web Development" followed by a standard paragraph of descriptive text below it.',
      commonMistakes: [
        {
          mistake: 'Omitting <!DOCTYPE html> at the very first line.',
          correction: 'Always make <!DOCTYPE html> line 1 of every HTML document.',
          explanation: 'Without it, older browsers switch to "quirks mode", causing CSS bugs and inconsistent layout rendering.'
        },
        {
          mistake: 'Placing visible UI elements (like <h1>, <p>, or <img>) inside the <head> container.',
          correction: 'Keep <head> exclusively for metadata and scripts; place all visual elements inside <body>.',
          explanation: 'Elements inside <head> are not intended for display and lead to invalid DOM trees and accessibility failures.'
        },
        {
          mistake: 'Forgetting the lang attribute on <html> (e.g. <html> instead of <html lang="en">).',
          correction: 'Always include lang="en" (or your target locale) on the root <html> tag.',
          explanation: 'Screen readers rely on lang to pronounce words accurately, and translation engines use it to detect page language.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Experiment with the HTML boilerplate below. Try changing the title and adding your own heading and paragraphs to see live updates in the preview.',
      starterCode:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Sandbox Page</title>
  </head>
  <body style="font-family: sans-serif; padding: 20px; color: #1e293b;">
    <h1 style="color: #6366f1;">Hello from CodeForge!</h1>
    <p>Edit this HTML code and observe the live browser rendering immediately.</p>
    <p>Try adding an <h2> tag with your name!</p>
  </body>
</html>`
    },
    practiceQuestions: [
      {
        id: 'q1-1',
        level: 'Easy',
        title: 'Add Missing Root Declaration & Language',
        prompt: 'Fix the starter code by adding the HTML5 doctype declaration at the top and declaring lang="en" on the html tag.',
        requirements: [
          'Must start with <!DOCTYPE html>',
          'The <html> tag must specify lang="en"',
          'Keep the existing body content intact'
        ],
        starterCode:
`<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Learning HTML</h1>
  </body>
</html>`,
        solutionCode:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Learning HTML</h1>
  </body>
</html>`,
        expectedOutput: 'Valid HTML5 document with standards doctype and English language code.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<!DOCTYPE\s+html>/i.test(code)) errors.push('Missing <!DOCTYPE html> at the beginning.');
          if (!/<html[^>]*lang=["']en["'][^>]*>/i.test(code)) errors.push('Missing lang="en" attribute on the <html> tag.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q1-2',
        level: 'Medium',
        title: 'Construct Boilerplate with Page Title and Paragraphs',
        prompt: 'Write an HTML boilerplate with a <title> containing "Student Portfolio", an <h1> with "John Doe", and two separate <p> tags introducing yourself.',
        requirements: [
          'Include <!DOCTYPE html> and <html lang="en">',
          '<head> must contain <title>Student Portfolio</title>',
          '<body> must contain an <h1> with "John Doe"',
          '<body> must contain at least 2 separate <p> paragraphs'
        ],
        starterCode: '<!-- Write your HTML document here -->\n',
        solutionCode:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Student Portfolio</title>
  </head>
  <body>
    <h1>John Doe</h1>
    <p>I am an aspiring web developer learning HTML.</p>
    <p>My goal is to build accessible and modern web applications.</p>
  </body>
</html>`,
        expectedOutput: 'A browser page with title "Student Portfolio", a main heading "John Doe", and two descriptive paragraphs.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<!DOCTYPE\s+html>/i.test(code)) errors.push('Missing <!DOCTYPE html>.');
          if (!/<html[^>]*lang=["']en["'][^>]*>/i.test(code)) errors.push('Missing <html lang="en">.');
          if (!/<title>[\s\S]*Student\s+Portfolio[\s\S]*<\/title>/i.test(code)) errors.push('Missing <title>Student Portfolio</title>.');
          if (!/<h1[^>]*>[\s\S]*John\s+Doe[\s\S]*<\/h1>/i.test(code)) errors.push('Missing <h1> containing "John Doe".');
          const pMatches = code.match(/<p[\s>][\s\S]*?<\/p>/gi);
          if (!pMatches || pMatches.length < 2) errors.push('Must contain at least two separate <p> elements inside body.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q1-3',
        level: 'Challenge',
        title: 'Production-Ready Boilerplate with Meta Tags',
        prompt: 'Create a complete production-grade boilerplate. Must include charset UTF-8, responsive viewport meta, a title, an <h1> heading, and a <main> container wrapping at least one paragraph.',
        requirements: [
          'Include <!DOCTYPE html> and <html lang="en">',
          'Include <meta charset="UTF-8"> inside <head>',
          'Include <meta name="viewport" content="width=device-width, initial-scale=1.0"> inside <head>',
          '<head> must have a non-empty <title>',
          '<body> must contain an <h1> and a <main> element wrapping a <p>'
        ],
        starterCode: '<!-- Construct production boilerplate -->\n',
        solutionCode:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Production Webpage</title>
  </head>
  <body>
    <h1>Welcome to Production</h1>
    <main>
      <p>This layout follows professional responsive metadata conventions.</p>
    </main>
  </body>
</html>`,
        expectedOutput: 'Production-ready responsive document structure with metadata and semantic main container.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<!DOCTYPE\s+html>/i.test(code)) errors.push('Missing <!DOCTYPE html>.');
          if (!/<meta[^>]*charset=["']UTF-8["']/i.test(code)) errors.push('Missing <meta charset="UTF-8">.');
          if (!/<meta[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["']/i.test(code)) {
            errors.push('Missing responsive <meta name="viewport" content="width=device-width, initial-scale=1.0">.');
          }
          if (!/<title>[^<]+<\/title>/i.test(code)) errors.push('Missing non-empty <title> tag.');
          if (!/<h1[^>]*>[\s\S]*?<\/h1>/i.test(code)) errors.push('Missing <h1> heading.');
          if (!/<main[\s>][\s\S]*?<p[\s>][\s\S]*?<\/p>[\s\S]*?<\/main>/i.test(code)) {
            errors.push('Missing <main> element wrapping at least one <p> tag.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary function of <!DOCTYPE html> in an HTML document?',
        options: [
          'It instructs the browser to parse CSS animations',
          'It tells the browser to render the page in standard HTML5 mode rather than quirks mode',
          'It connects the document to an external database',
          'It specifies the natural language used for translations'
        ],
        correctIndex: 1,
        explanation: '<!DOCTYPE html> is not an HTML tag, but a browser directive that forces the layout engine into standards-compliant mode, preventing quirks mode.'
      },
      {
        id: 2,
        question: 'Which HTML section contains non-visible metadata like charset and tab title?',
        options: ['<body>', '<main>', '<head>', '<section>'],
        correctIndex: 2,
        explanation: 'The <head> element contains non-rendered metadata, scripts, stylesheets, and document titles. The <body> element holds visible content.'
      },
      {
        id: 3,
        question: 'Why should the lang attribute be declared on the root <html> tag?',
        options: [
          'It sets the font family for all paragraphs',
          'It enables browser caching for faster loading',
          'It assists screen readers with proper pronunciation and helps search engines index locale',
          'It is required by the JavaScript compiler'
        ],
        correctIndex: 2,
        explanation: 'The lang attribute (e.g., lang="en") is crucial for web accessibility, allowing assistive technologies to use appropriate voice synthesis dialects.'
      }
    ],
    video: {
      title: 'HTML Crash Course For Absolute Beginners (Document Structure & Boilerplate)',
      channel: 'Traversy Media',
      videoId: 'UB1O30fR-EE',
      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
      description: 'Brad Traversy walks through the foundational anatomy of an HTML document, showing live browser rendering and tags.'
    }
  },

  // =========================================================================
  // TOPIC 2: Elements and Attributes
  // =========================================================================
  {
    id: 'topic-2',
    order: 2,
    slug: 'elements-and-attributes',
    title: 'Elements and Attributes',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Understand how HTML elements are constructed with opening tags, content, closing tags, and attributes that modify element behavior and presentation.',
    notes: {
      concept:
        'An HTML element is the fundamental building block of a web page. Most elements consist of an opening tag (<p>), content, and a closing tag (</p>). Attributes are key-value pairs written inside the opening tag (e.g., id="intro" or class="btn") that provide extra information or configure element behavior. Certain elements, known as void (self-closing) elements, contain no content and have no closing tag (such as <img>, <input>, and <hr>).',
      syntax:
`<!-- Standard element with attributes -->
<tagname attribute="value" booleanAttribute>Content</tagname>

<!-- Void element (cannot have closing tag or inner content) -->
<voidtag attribute="value">`,
      explanation:
        '1. Tag Name: Identifies the element type (e.g. h1, p, a, button).\n2. Attribute Name: The property being set (e.g. id, class, src, href, title).\n3. Attribute Value: Quoted string defining the property setting.\n4. Boolean Attributes: Attributes that exist as flags (e.g. disabled, required, checked). Their presence alone indicates true.\n5. Void Elements: Tags like <img>, <br>, <hr>, <input>, <meta>, <link> that do not require and must never have a closing tag.',
      codeExample:
`<!-- Container with unique id and reusable styling classes -->
<div id="user-card" class="card featured-card">
  <h2 class="card-title" title="Student Profile">Jane Developer</h2>
  <p class="card-bio">Full-stack student at CodeForge.</p>
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="Portrait of Jane Developer" width="120">
  <button type="button" class="btn primary-btn" disabled>Profile Verified</button>
</div>`,
      expectedOutput:
        'A card container displaying the heading "Jane Developer" with a hover tooltip "Student Profile", a bio paragraph, a 120px wide profile picture, and a disabled button labeled "Profile Verified".',
      commonMistakes: [
        {
          mistake: 'Adding closing tags to void elements (e.g. <img></img> or <br></br>).',
          correction: 'Write void elements as standalone tags: <img src="..." alt="..."> or <br>.',
          explanation: 'HTML5 void elements cannot have children or closing tags; adding closing tags causes DOM parsing errors.'
        },
        {
          mistake: 'Using duplicate id attribute values across multiple elements on the same page.',
          correction: 'Keep every id completely unique per page; use class for recurring styles or groups.',
          explanation: 'An id must be unique. Duplicate IDs break CSS selectors, JavaScript getElementById, and accessibility focus management.'
        },
        {
          mistake: 'Omitting quotes around attribute values with spaces (e.g. class=btn primary).',
          correction: 'Always wrap attribute values in double quotes: class="btn primary".',
          explanation: 'Without quotes, the browser treats "primary" as a separate invalid boolean attribute.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Inspect and edit the attributes below. Change the title, id, and class attributes, or try toggling the disabled boolean attribute on the button.',
      starterCode:
`<div id="interactive-box" class="box" style="padding: 16px; border: 2px solid #6366f1; border-radius: 8px;">
  <h3 title="Hover your mouse here to see the title attribute!">Hover Over Me!</h3>
  <p>The title attribute creates a browser tooltip on hover.</p>
  <button disabled style="padding: 8px 16px; opacity: 0.6; cursor: not-allowed;">
    Disabled Button (Boolean Attribute)
  </button>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q2-1',
        level: 'Easy',
        title: 'Add Unique ID and Title Tooltip',
        prompt: 'Add an id attribute with value "hero-heading" to the <h1>, and add a title attribute with value "Platform Welcome" to the <p> element.',
        requirements: [
          '<h1> must have id="hero-heading"',
          '<p> must have title="Platform Welcome"'
        ],
        starterCode:
`<h1>Welcome to CodeForge</h1>
<p>Start learning HTML today.</p>`,
        solutionCode:
`<h1 id="hero-heading">Welcome to CodeForge</h1>
<p title="Platform Welcome">Start learning HTML today.</p>`,
        expectedOutput: 'An <h1> with an id attribute and a paragraph with an interactive browser tooltip.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<h1[^>]*id=["']hero-heading["'][^>]*>/i.test(code)) errors.push('<h1> must have id="hero-heading".');
          if (!/<p[^>]*title=["']Platform\s+Welcome["'][^>]*>/i.test(code)) errors.push('<p> must have title="Platform Welcome".');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q2-2',
        level: 'Medium',
        title: 'Fix Void Elements & Multi-Class Attributes',
        prompt: 'Fix the broken starter code: remove the invalid closing tag from <hr>, fix the unquoted class with spaces on the button, and add a disabled boolean attribute to the input.',
        requirements: [
          '<hr> must be a void element (no </hr>)',
          'button must have class="btn btn-primary" properly quoted',
          '<input> must have the disabled attribute'
        ],
        starterCode:
`<div>
  <p>Break below</p>
  <hr></hr>
  <input type="text" value="Read Only">
  <button class=btn btn-primary>Submit</button>
</div>`,
        solutionCode:
`<div>
  <p>Break below</p>
  <hr>
  <input type="text" value="Read Only" disabled>
  <button class="btn btn-primary">Submit</button>
</div>`,
        expectedOutput: 'Corrected valid HTML without void closing tags, quoted multi-classes, and a disabled input.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (/<\/hr>/i.test(code)) errors.push('<hr> is a void element and must not have a closing </hr> tag.');
          if (!/<button[^>]*class=["']btn\s+btn-primary["'][^>]*>/i.test(code)) errors.push('The button must have quoted class="btn btn-primary".');
          if (!/<input[^>]*disabled[^>]*>/i.test(code)) errors.push('The <input> must have the disabled boolean attribute.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q2-3',
        level: 'Challenge',
        title: 'Build a Complete Component with Global Attributes',
        prompt: 'Create a container <div> with id="student-badge" and class="badge verified". Inside, include an <img> with src="avatar.png", alt="User Avatar", and width="80", an <h3> with title="Full Name", and a <button> with boolean attribute disabled.',
        requirements: [
          '<div> with id="student-badge" and class="badge verified"',
          '<img> with src="avatar.png", alt="User Avatar", and width="80"',
          '<h3> with title="Full Name"',
          '<button> with disabled attribute'
        ],
        starterCode: '<!-- Build component with attributes here -->\n',
        solutionCode:
`<div id="student-badge" class="badge verified">
  <img src="avatar.png" alt="User Avatar" width="80">
  <h3 title="Full Name">Alex Rivers</h3>
  <button disabled>Verified</button>
</div>`,
        expectedOutput: 'A complete card structure demonstrating IDs, multiple classes, image attributes, title tooltips, and boolean attributes.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<div[^>]*id=["']student-badge["'][^>]*class=["']badge\s+verified["'][^>]*>/i.test(code) &&
              !/<div[^>]*class=["']badge\s+verified["'][^>]*id=["']student-badge["'][^>]*>/i.test(code)) {
            errors.push('<div> must have id="student-badge" and class="badge verified".');
          }
          if (!/<img[^>]*src=["']avatar\.png["'][^>]*alt=["']User\s+Avatar["'][^>]*width=["']80["'][^>]*>/i.test(code) &&
              !/<img[^>]*alt=["']User\s+Avatar["'][^>]*src=["']avatar\.png["'][^>]*width=["']80["'][^>]*>/i.test(code)) {
            errors.push('<img> must have src="avatar.png", alt="User Avatar", and width="80".');
          }
          if (!/<h3[^>]*title=["']Full\s+Name["'][^>]*>/i.test(code)) errors.push('<h3> must have title="Full Name".');
          if (!/<button[^>]*disabled[^>]*>/i.test(code)) errors.push('<button> must have the disabled attribute.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which of the following is a void (self-closing) element in HTML?',
        options: ['<p>', '<input>', '<h1>', '<span>'],
        correctIndex: 1,
        explanation: '<input> is a void element that cannot contain text content or closing tags. Other void elements include <img>, <br>, and <hr>.'
      },
      {
        id: 2,
        question: 'What is true regarding the id attribute on an HTML page?',
        options: [
          'Multiple elements can share the same id if they have the same tag name',
          'Every id must be completely unique within the entire HTML document',
          'An id can only be applied to heading elements',
          'The id attribute is deprecated in HTML5'
        ],
        correctIndex: 1,
        explanation: 'The id attribute must be completely unique per document. Reusing IDs breaks CSS targeting, JavaScript lookups, and accessibility.'
      },
      {
        id: 3,
        question: 'How are boolean attributes like disabled, required, or checked represented?',
        options: [
          'By setting them to disabled="true" or disabled="false"',
          'Their mere presence on the tag implies true, while omitting them implies false',
          'They can only be set via external JavaScript',
          'They must be written inside a <script> block'
        ],
        correctIndex: 1,
        explanation: 'In HTML, the presence of a boolean attribute (e.g. <input disabled>) represents true. To set it to false, simply omit the attribute entirely.'
      }
    ],
    video: {
      title: 'HTML Elements and Attributes Explained',
      channel: 'Programming with Mosh',
      videoId: 'qz0aGYrrlhU',
      url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
      description: 'Mosh Hamedani explains the differences between tags, elements, void tags, and attributes with practical examples.'
    }
  },

  // =========================================================================
  // TOPIC 3: Headings and Paragraphs
  // =========================================================================
  {
    id: 'topic-3',
    order: 3,
    slug: 'headings-and-paragraphs',
    title: 'Headings and Paragraphs',
    difficulty: 'Beginner',
    estimatedTime: '10 min',
    summary:
      'Master the structural hierarchy of headings (<h1> to <h6>), paragraph prose (<p>), and inline text emphasis tags (<strong>, <em>, <mark>, <small>).',
    notes: {
      concept:
        'Headings and paragraphs form the backbone of written web content. HTML provides six levels of headings: <h1> (most important) down to <h6> (least important). Headings construct a table of contents for screen readers and search engines, while <p> separates blocks of readable text. Inline formatting tags like <strong> and <em> convey semantic importance and spoken stress, not merely visual decoration.',
      syntax:
`<h1>Main Topic (Only one h1 per page)</h1>
<h2>Major Section</h2>
<h3>Sub-section</h3>
<p>Prose with <strong>important</strong> and <em>emphasized</em> text.</p>`,
      explanation:
        '1. <h1> to <h6>: Establish content hierarchy. <h1> represents the primary topic of the document. Each subsequent level (<h2>, <h3>) nests under the previous.\n2. <p>: Defines a paragraph of text, automatically applying default vertical margins.\n3. <strong>: Indicates strong importance, seriousness, or urgency (traditionally bolded).\n4. <em>: Indicates stress emphasis that alters sentence meaning (traditionally italicized).\n5. <mark>: Highlights relevant text (yellow highlight).\n6. <small>: Represents side-comments, disclaimers, or copyright text.',
      codeExample:
`<article>
  <h1>Mastering Modern CSS Grid</h1>
  <p>Published on CodeForge by <strong>Sarah Connor</strong>.</p>
  
  <h2>1. Introduction to Two-Dimensional Layouts</h2>
  <p>CSS Grid allows developers to manage both columns and rows simultaneously. It is <em>fundamentally different</em> from Flexbox, which is primarily one-dimensional.</p>
  
  <h3>Key Characteristics</h3>
  <p>Always inspect the grid with browser DevTools to visualize <mark>grid tracks and lines</mark>.</p>
  
  <p><small>&copy; 2026 CodeForge Learning. All rights reserved.</small></p>
</article>`,
      expectedOutput:
        'A clearly formatted article with an <h1> title, an <h2> section heading, an <h3> subsection, bold author name, italicized emphasis, yellow highlighted technical terms, and small copyright footer text.',
      commonMistakes: [
        {
          mistake: 'Selecting heading levels (like <h3> or <h4>) solely because you want smaller text.',
          correction: 'Always choose heading levels based on document outline; adjust font size using CSS font-size.',
          explanation: 'Headings create an accessible navigation tree. Skipping levels (e.g. <h1> directly to <h4>) confuses screen reader users.'
        },
        {
          mistake: 'Using multiple <h1> headings on a single web page.',
          correction: 'Use exactly one <h1> representing the main page title, followed by <h2> and <h3> for sub-topics.',
          explanation: 'A single <h1> establishes the clear primary focus of the page for SEO algorithms and assistive technologies.'
        },
        {
          mistake: 'Using <b> and <i> purely for visual styling instead of semantic <strong> and <em>.',
          correction: 'Use <strong> when text carries importance; use <em> for vocal emphasis. Use CSS for purely cosmetic styling.',
          explanation: 'Screen readers can audibly inflect tone for <em> and announce <strong>, while <b> and <i> carry no semantic weight.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Test heading hierarchy and inline text formatting. Experiment with <h1> through <h6>, <strong>, <em>, and <mark> to see how the browser formats them.',
      starterCode:
`<div style="font-family: sans-serif; line-height: 1.6;">
  <h1>Primary Headline (h1)</h1>
  <p>This is standard paragraph text containing <strong>strong text</strong> and <em>italicized emphasis</em>.</p>
  <h2>Section Heading (h2)</h2>
  <p>Notice how headings automatically scale down. You can also use <mark>highlighted mark</mark> text.</p>
  <h3>Subsection (h3)</h3>
  <p><small>Small fine-print or legal disclaimer text.</small></p>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q3-1',
        level: 'Easy',
        title: 'Create Heading and Paragraph with Strong Text',
        prompt: 'Create an <h1> with text "Frontend Fundamentals" and a <p> containing "HTML is the <strong>skeleton</strong> of the web."',
        requirements: [
          '<h1> containing "Frontend Fundamentals"',
          '<p> containing "HTML is the "',
          '<strong> wrapping "skeleton"',
          'Remaining text " of the web."'
        ],
        starterCode: '<!-- Write heading and paragraph here -->\n',
        solutionCode:
`<h1>Frontend Fundamentals</h1>
<p>HTML is the <strong>skeleton</strong> of the web.</p>`,
        expectedOutput: 'A prominent heading followed by a paragraph with bolded semantic emphasis on "skeleton".',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<h1[^>]*>[\s\S]*Frontend\s+Fundamentals[\s\S]*<\/h1>/i.test(code)) errors.push('Missing <h1> with "Frontend Fundamentals".');
          if (!/<p[^>]*>[\s\S]*HTML\s+is\s+the\s+<strong>skeleton<\/strong>\s+of\s+the\s+web\.?[\s\S]*<\/p>/i.test(code)) {
            errors.push('Missing <p> with "HTML is the <strong>skeleton</strong> of the web."');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q3-2',
        level: 'Medium',
        title: 'Structured Article Outline with Subheadings',
        prompt: 'Build a document section with one <h1> ("Web Standards"), followed by two <h2> sections ("W3C Guidelines" and "Browser Engines"). Under each <h2>, include a <p> with at least one <em> tag.',
        requirements: [
          'Exactly one <h1> containing "Web Standards"',
          'Two <h2> headings: "W3C Guidelines" and "Browser Engines"',
          'A <p> under each <h2> containing an <em> tag'
        ],
        starterCode: '<!-- Build structured article outline here -->\n',
        solutionCode:
`<h1>Web Standards</h1>
<h2>W3C Guidelines</h2>
<p>The W3C publishes <em>open specifications</em> for the global web.</p>
<h2>Browser Engines</h2>
<p>Modern engines like Chromium and Gecko <em>parse HTML</em> into DOM trees.</p>`,
        expectedOutput: 'A hierarchically sound article outline with two distinct sub-sections and italicized emphasis.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          const h1s = code.match(/<h1[\s>][\s\S]*?<\/h1>/gi);
          if (!h1s || h1s.length !== 1 || !/Web\s+Standards/i.test(h1s[0])) errors.push('Must contain exactly one <h1> with "Web Standards".');
          if (!/<h2[^>]*>[\s\S]*W3C\s+Guidelines[\s\S]*<\/h2>/i.test(code)) errors.push('Missing <h2> with "W3C Guidelines".');
          if (!/<h2[^>]*>[\s\S]*Browser\s+Engines[\s\S]*<\/h2>/i.test(code)) errors.push('Missing <h2> with "Browser Engines".');
          const ems = code.match(/<em[\s>][\s\S]*?<\/em>/gi);
          if (!ems || ems.length < 2) errors.push('Must include at least two <em> elements, one under each section.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q3-3',
        level: 'Challenge',
        title: 'Multi-Level Hierarchy with Mark and Small',
        prompt: 'Build a 3-level hierarchically complete documentation page: an <h1> ("JavaScript Runtime"), an <h2> ("Call Stack"), an <h3> ("Execution Context") with a paragraph containing <mark>highlighted</mark> text, and a closing <p> with <small> text.',
        requirements: [
          '<h1> with "JavaScript Runtime"',
          '<h2> with "Call Stack"',
          '<h3> with "Execution Context"',
          '<p> containing a <mark> tag',
          '<p> containing a <small> tag'
        ],
        starterCode: '<!-- Build 3-level document hierarchy -->\n',
        solutionCode:
`<h1>JavaScript Runtime</h1>
<h2>Call Stack</h2>
<h3>Execution Context</h3>
<p>The stack stores frames for functions during <mark>synchronous execution</mark>.</p>
<p><small>Reference: ECMA-262 Specification 2026 Edition.</small></p>`,
        expectedOutput: 'A clean 3-level technical document outline with semantic mark and small tags.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<h1[^>]*>[\s\S]*JavaScript\s+Runtime[\s\S]*<\/h1>/i.test(code)) errors.push('Missing <h1> with "JavaScript Runtime".');
          if (!/<h2[^>]*>[\s\S]*Call\s+Stack[\s\S]*<\/h2>/i.test(code)) errors.push('Missing <h2> with "Call Stack".');
          if (!/<h3[^>]*>[\s\S]*Execution\s+Context[\s\S]*<\/h3>/i.test(code)) errors.push('Missing <h3> with "Execution Context".');
          if (!/<mark[\s>][\s\S]*?<\/mark>/i.test(code)) errors.push('Missing <mark> tag.');
          if (!/<small[\s>][\s\S]*?<\/small>/i.test(code)) errors.push('Missing <small> tag.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'How many <h1> tags should be used on a standard webpage?',
        options: [
          'As many as you want for every bold heading',
          'Exactly one, representing the main topic or title of the page',
          'At least five to improve search rankings',
          'Zero, because <h1> is deprecated in favor of <header>'
        ],
        correctIndex: 1,
        explanation: 'Best practice in accessibility and modern SEO dictates a single <h1> per page representing the document title.'
      },
      {
        id: 2,
        question: 'What is the semantic difference between <strong> and <b>?',
        options: [
          'There is no difference; both are identical',
          '<b> is semantic while <strong> is only for styling',
          '<strong> conveys strong importance/urgency to screen readers, whereas <b> is purely typographic bolding',
          '<strong> works only inside paragraphs'
        ],
        correctIndex: 2,
        explanation: '<strong> informs assistive tech that the enclosed text has high importance or urgency, whereas <b> is purely visual without semantic weight.'
      },
      {
        id: 3,
        question: 'Why is skipping heading levels (e.g. jumping from <h1> directly to <h4>) discouraged?',
        options: [
          'It crashes the browser rendering engine',
          'It causes CSS flexbox layouts to break',
          'It breaks the navigable outline generated by screen readers for visually impaired users',
          'It is disallowed by HTML5 syntax validators'
        ],
        correctIndex: 2,
        explanation: 'Screen readers allow users to navigate web pages by jumping between headings. Skipping levels causes confusion and disorients users.'
      }
    ],
    video: {
      title: 'HTML Headings, Paragraphs and Formatting',
      channel: 'freeCodeCamp.org',
      videoId: 'pQN-pnXPaVg',
      url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
      description: 'freeCodeCamp instructors break down heading hierarchy, accessibility best practices, and text formatting tags.'
    }
  },

  // =========================================================================
  // TOPIC 4: Links and Images
  // =========================================================================
  {
    id: 'topic-4',
    order: 4,
    slug: 'links-and-images',
    title: 'Links and Images',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Learn how to connect pages using anchor hyperlinks (<a>) and embed visual assets using the image tag (<img>), along with essential security and accessibility attributes.',
    notes: {
      concept:
        'The web is built on hyperlinks. The anchor tag (<a>) allows users to navigate to external websites, jump to internal sections of the same page (#id), or trigger email/phone actions. The image tag (<img>) embeds external graphical media into the DOM. Because images are void elements, they require meaningful alt text for screen readers and search engines.',
      syntax:
`<!-- External link opening in new tab securely -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Website</a>

<!-- Internal jump link -->
<a href="#section-contact">Jump to Contact</a>

<!-- Accessible image with dimensions -->
<img src="path/to/image.jpg" alt="Descriptive explanation of the visual" width="600" height="400">`,
      explanation:
        '1. href (Hypertext REFerence): The destination URL or bookmark anchor.\n2. target="_blank": Opens the destination page in a brand new browser tab.\n3. rel="noopener noreferrer": Essential security attribute when using target="_blank" to prevent tabnabbing security attacks and window.opener tampering.\n4. src (Source): Path or URL pointing to the image file (JPG, PNG, SVG, WebP).\n5. alt (Alternative Text): Required text description read aloud by screen readers and displayed if the image fails to load.',
      codeExample:
`<!-- Navigation card with accessible image and secure link -->
<div class="course-card">
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
    alt="MacBook laptop with code editor on screen" 
    width="480" 
    height="270"
  >
  <h2>Web Development Track</h2>
  <p>Learn frontend and backend engineering from scratch.</p>
  <a 
    href="https://developer.mozilla.org" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="doc-link"
  >
    Read Official MDN Documentation &rarr;
  </a>
</div>`,
      expectedOutput:
        'A card containing a 480x270 laptop photograph, an <h2> heading, a descriptive paragraph, and a blue hyperlink with an arrow that securely opens MDN in a new tab.',
      commonMistakes: [
        {
          mistake: 'Using target="_blank" without rel="noopener noreferrer".',
          correction: 'Always pair target="_blank" with rel="noopener noreferrer".',
          explanation: 'Without this attribute, the opened page gains access to the originating window object through window.opener, enabling phishing redirects (reverse tabnabbing).'
        },
        {
          mistake: 'Leaving the alt attribute off <img> or writing generic text like alt="image".',
          correction: 'Always provide a meaningful, concise description of what the image shows, or alt="" if purely decorative.',
          explanation: 'Screen readers read the raw file name (e.g. "IMG_8492.JPG") if alt is missing, degrading the accessibility experience.'
        },
        {
          mistake: 'Using broken relative file paths (e.g. confusing /image.png with ./images/image.png).',
          correction: 'Verify whether paths are root-relative (/) or relative to current folder (./).',
          explanation: 'A leading slash looks at the web server root, which frequently causes 404 image errors on nested routes.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Test modifying link destinations and image sources. Change the href URL, alter the alt description, or try an internal jump link.',
      starterCode:
`<div style="font-family: sans-serif; max-width: 400px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px;">
  <img 
    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
    alt="Code editor on a desk with coffee" 
    style="width: 100%; border-radius: 6px;"
  >
  <h3>Developer Workspace</h3>
  <p>Check out official web development docs.</p>
  <a 
    href="https://developer.mozilla.org/en-US/" 
    target="_blank" 
    rel="noopener noreferrer" 
    style="color: #6366f1; font-weight: bold; text-decoration: none;"
  >
    Visit MDN Web Docs &rarr;
  </a>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q4-1',
        level: 'Easy',
        title: 'Create a Secure External Link',
        prompt: 'Create an anchor tag pointing to "https://codeforge.dev", with text "Visit CodeForge", opening in a new tab with target="_blank" and rel="noopener noreferrer".',
        requirements: [
          'href="https://codeforge.dev"',
          'target="_blank"',
          'rel="noopener noreferrer"',
          'Link text must be "Visit CodeForge"'
        ],
        starterCode: '<!-- Write your secure anchor tag here -->\n',
        solutionCode: '<a href="https://codeforge.dev" target="_blank" rel="noopener noreferrer">Visit CodeForge</a>',
        expectedOutput: 'A secure hyperlink opening CodeForge in a new tab with protection against reverse tabnabbing.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<a[^>]*href=["']https:\/\/codeforge\.dev["'][^>]*>/i.test(code)) errors.push('Missing href="https://codeforge.dev".');
          if (!/<a[^>]*target=["']_blank["'][^>]*>/i.test(code)) errors.push('Missing target="_blank".');
          if (!/<a[^>]*rel=["']noopener\s+noreferrer["'][^>]*>/i.test(code)) errors.push('Missing rel="noopener noreferrer".');
          if (!/<a[^>]*>[\s\S]*Visit\s+CodeForge[\s\S]*<\/a>/i.test(code)) errors.push('Link text must be "Visit CodeForge".');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q4-2',
        level: 'Medium',
        title: 'Add an Accessible Image with Dimensions',
        prompt: 'Create an accessible <img> tag with src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97", alt="Laptop with programming code on screen", and width="400".',
        requirements: [
          '<img> tag with src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"',
          'Descriptive alt="Laptop with programming code on screen"',
          'width="400"',
          'Must be a void tag (no closing </img> tag)'
        ],
        starterCode: '<!-- Write your accessible image tag here -->\n',
        solutionCode: '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" alt="Laptop with programming code on screen" width="400">',
        expectedOutput: 'An accessible void image element with dimensions and informative screen reader description.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (/<\/img>/i.test(code)) errors.push('<img> is a void element and must not have a closing </img> tag.');
          if (!/<img[^>]*src=["']https:\/\/images\.unsplash\.com\/photo-1517694712202-14dd9538aa97["'][^>]*>/i.test(code)) {
            errors.push('Missing required image src URL.');
          }
          if (!/<img[^>]*alt=["']Laptop\s+with\s+programming\s+code\s+on\s+screen["'][^>]*>/i.test(code)) {
            errors.push('Missing exact alt="Laptop with programming code on screen".');
          }
          if (!/<img[^>]*width=["']400["'][^>]*>/i.test(code)) {
            errors.push('Missing width="400".');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q4-3',
        level: 'Challenge',
        title: 'Build Section with In-Page Jump Link and Gallery Item',
        prompt: 'Build a page fragment with an in-page anchor link jumping to href="#contact-section" with text "Go to Contact", and a destination <section id="contact-section"> containing an <h2> and an accessible image with alt="Contact support desk".',
        requirements: [
          'Anchor tag with href="#contact-section" and text "Go to Contact"',
          '<section id="contact-section"> containing an <h2>',
          'An <img> inside the section with alt="Contact support desk"'
        ],
        starterCode: '<!-- Build anchor jump link and destination section -->\n',
        solutionCode:
`<a href="#contact-section">Go to Contact</a>

<section id="contact-section">
  <h2>Contact Support</h2>
  <img src="support.jpg" alt="Contact support desk" width="300">
</section>`,
        expectedOutput: 'An in-page navigation link that scrolls to the target section when clicked, with accessible image.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<a[^>]*href=["']#contact-section["'][^>]*>[\s\S]*Go\s+to\s+Contact[\s\S]*<\/a>/i.test(code)) {
            errors.push('Missing anchor with href="#contact-section" and text "Go to Contact".');
          }
          if (!/<section[^>]*id=["']contact-section["'][^>]*>/i.test(code)) {
            errors.push('Missing <section id="contact-section">.');
          }
          if (!/<section[^>]*id=["']contact-section["'][^>]*>[\s\S]*<h2[\s>]/i.test(code)) {
            errors.push('Section must contain an <h2> heading.');
          }
          if (!/<img[^>]*alt=["']Contact\s+support\s+desk["'][^>]*>/i.test(code)) {
            errors.push('Section must contain an <img> with alt="Contact support desk".');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why should rel="noopener noreferrer" always be added to links with target="_blank"?',
        options: [
          'To make the link open twice as fast',
          'To prevent the new window from accessing window.opener and performing reverse tabnabbing phishing',
          'To download the target page into browser storage',
          'It is required by CSS grid styling'
        ],
        correctIndex: 1,
        explanation: 'Without rel="noopener noreferrer", the target webpage has access to window.opener, allowing it to redirect the user original tab to a malicious site.'
      },
      {
        id: 2,
        question: 'What is the primary role of the alt attribute on an <img> tag?',
        options: [
          'It sets the caption font size below the picture',
          'It provides a text alternative for visually impaired screen reader users and displays if the file fails to load',
          'It determines whether the image is saved in PNG or JPEG format',
          'It tells the browser to rotate the image 90 degrees'
        ],
        correctIndex: 1,
        explanation: 'The alt attribute is an essential accessibility requirement, communicating visual content to screen readers and rendering fallback text on network failures.'
      },
      {
        id: 3,
        question: 'How do you create an internal hyperlink that jumps to an element with id="pricing" on the same page?',
        options: [
          '<a href="jump:pricing">Pricing</a>',
          '<a href="?pricing">Pricing</a>',
          '<a href="#pricing">Pricing</a>',
          '<a href="//pricing">Pricing</a>'
        ],
        correctIndex: 2,
        explanation: 'The hash symbol (#) in the href attribute denotes a fragment identifier linking directly to the element with that matching id attribute.'
      }
    ],
    video: {
      title: 'HTML Links and Images Masterclass',
      channel: 'freeCodeCamp.org',
      videoId: 'kUMe1FH4CHE',
      url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
      description: 'Learn absolute vs relative links, anchor navigation, and image optimization techniques.'
    }
  },

  // =========================================================================
  // TOPIC 5: Lists and Tables
  // =========================================================================
  {
    id: 'topic-5',
    order: 5,
    slug: 'lists-and-tables',
    title: 'Lists and Tables',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    summary:
      'Structure collections with unordered (<ul>) and ordered (<ol>) lists, and present structured data using semantic accessible tables (<table>, <thead>, <tbody>, <th> with scope).',
    notes: {
      concept:
        'HTML provides specialized containers for grouped content. Unordered lists (<ul>) display bulleted items where order does not matter, while ordered lists (<ol>) display numbered sequences. For multidimensional structured data, HTML tables (<table>) organize information into rows and columns using semantic headers (<th>) and cells (<td>). Tables should be used strictly for tabular data, never for page layouts.',
      syntax:
`<!-- Unordered List -->
<ul>
  <li>Item A</li>
  <li>Item B</li>
</ul>

<!-- Ordered List -->
<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>

<!-- Accessible Semantic Table -->
<table>
  <thead>
    <tr>
      <th scope="col">Header 1</th>
      <th scope="col">Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>`,
      explanation:
        '1. <ul> & <ol>: The only valid direct child element of a <ul> or <ol> is <li>.\n2. <li> (List Item): Contains the text or nested sub-lists for each entry.\n3. <table>: Root wrapper for tabular data.\n4. <thead>: Groups header content (column titles).\n5. <tbody>: Groups data rows representing the primary table body.\n6. <tr> (Table Row): Represents a single horizontal row.\n7. <th> (Table Header): Header cell; must use scope="col" or scope="row" so screen readers can announce which header applies to which data cell.',
      codeExample:
`<!-- Student course syllabus and score breakdown table -->
<section>
  <h2>Web Development Track Syllabus</h2>
  <ol>
    <li>HTML5 Foundations</li>
    <li>CSS Responsive Layouts</li>
    <li>JavaScript Essentials</li>
  </ol>

  <h3>Assessment Results</h3>
  <table border="1" style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th scope="col" style="padding: 8px;">Module</th>
        <th scope="col" style="padding: 8px;">Topics Count</th>
        <th scope="col" style="padding: 8px;">Pass Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 8px;">HTML Foundations</td>
        <td style="padding: 8px;">10 Topics</td>
        <td style="padding: 8px;">94%</td>
      </tr>
      <tr>
        <td style="padding: 8px;">CSS Flexbox & Grid</td>
        <td style="padding: 8px;">8 Topics</td>
        <td style="padding: 8px;">88%</td>
      </tr>
    </tbody>
  </table>
</section>`,
      expectedOutput:
        'A numbered 1-2-3 ordered syllabus list followed by a clean bordered table with 3 column headers ("Module", "Topics Count", "Pass Rate") and two rows of student statistics.',
      commonMistakes: [
        {
          mistake: 'Placing tags other than <li> directly inside <ul> or <ol> (e.g. <ul><p>Item</p></ul>).',
          correction: 'Only <li> elements are allowed as direct children of <ul> and <ol>. Put paragraphs or tags inside the <li>.',
          explanation: 'HTML specifications forbid non-li children in list containers; doing so breaks the accessibility list semantics.'
        },
        {
          mistake: 'Using HTML tables to design visual multi-column web page layouts.',
          correction: 'Use CSS Flexbox or CSS Grid for page layouts; reserve <table> strictly for tabular data.',
          explanation: 'Layout tables confuse screen readers into reading data cell-by-cell rather than reading content as natural sentences.'
        },
        {
          mistake: 'Omitting scope="col" or scope="row" on <th> elements.',
          correction: 'Always specify scope="col" on column headers and scope="row" on row headers.',
          explanation: 'Without scope, assistive tech cannot correlate table cells with their corresponding headers when navigating large tables.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Experiment with list nesting and table rows. Add a new row to the table or nest an unordered list inside the second list item.',
      starterCode:
`<div style="font-family: sans-serif; padding: 16px;">
  <h3>Shopping Checklist</h3>
  <ul>
    <li>Produce
      <ul>
        <li>Honeycrisp Apples</li>
        <li>Fresh Spinach</li>
      </ul>
    </li>
    <li>Pantry Staples</li>
  </ul>
  
  <h3>Price Comparison</h3>
  <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 10px;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th scope="col" style="padding: 6px;">Item</th>
        <th scope="col" style="padding: 6px;">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 6px;">Apples</td>
        <td style="padding: 6px;">$2.99</td>
      </tr>
    </tbody>
  </table>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q5-1',
        level: 'Easy',
        title: 'Create an Ordered Steps List',
        prompt: 'Create an ordered list (<ol>) with three items (<li>): "Clone Repository", "Install Dependencies", and "Start Dev Server".',
        requirements: [
          'Must use <ol> root tag',
          'Must have exactly 3 <li> child elements',
          'Item 1: "Clone Repository"',
          'Item 2: "Install Dependencies"',
          'Item 3: "Start Dev Server"'
        ],
        starterCode: '<!-- Write your ordered list here -->\n',
        solutionCode:
`<ol>
  <li>Clone Repository</li>
  <li>Install Dependencies</li>
  <li>Start Dev Server</li>
</ol>`,
        expectedOutput: 'A numbered list sequentially showing the 3 developer setup commands.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<ol[\s>][\s\S]*?<\/ol>/i.test(code)) errors.push('Must be wrapped inside an <ol> container.');
          const lis = code.match(/<li[\s>][\s\S]*?<\/li>/gi);
          if (!lis || lis.length !== 3) errors.push('Must contain exactly 3 <li> items.');
          if (!/Clone\s+Repository/i.test(code)) errors.push('Missing "Clone Repository" item.');
          if (!/Install\s+Dependencies/i.test(code)) errors.push('Missing "Install Dependencies" item.');
          if (!/Start\s+Dev\s+Server/i.test(code)) errors.push('Missing "Start Dev Server" item.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q5-2',
        level: 'Medium',
        title: 'Construct an Accessible Data Table',
        prompt: 'Construct a table with a <thead> containing a <tr> with two <th scope="col"> headers ("Language" and "Paradigm"), and a <tbody> containing at least two <tr> data rows with <td> cells.',
        requirements: [
          '<table> container with <thead> and <tbody>',
          '<thead> must have a <tr> with two <th scope="col"> elements',
          '<tbody> must have at least two <tr> rows',
          'Each body row must contain two <td> cells'
        ],
        starterCode: '<!-- Build table here -->\n',
        solutionCode:
`<table>
  <thead>
    <tr>
      <th scope="col">Language</th>
      <th scope="col">Paradigm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>JavaScript</td>
      <td>Multi-paradigm</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>Object-Oriented</td>
    </tr>
  </tbody>
</table>`,
        expectedOutput: 'An accessible data table with column headers and two rows of language data.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<table[\s>][\s\S]*?<\/table>/i.test(code)) errors.push('Missing <table> wrapper.');
          if (!/<thead[\s>][\s\S]*?<\/thead>/i.test(code)) errors.push('Missing <thead> section.');
          if (!/<tbody[\s>][\s\S]*?<\/tbody>/i.test(code)) errors.push('Missing <tbody> section.');
          const thCols = code.match(/<th[^>]*scope=["']col["'][^>]*>/gi);
          if (!thCols || thCols.length < 2) errors.push('Must have at least two <th scope="col"> headers.');
          const bodyRows = code.match(/<tbody[\s>][\s\S]*?<\/tbody>/i)?.[0]?.match(/<tr[\s>]/gi);
          if (!bodyRows || bodyRows.length < 2) errors.push('<tbody> must contain at least two <tr> rows.');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q5-3',
        level: 'Challenge',
        title: 'Nested List Hierarchy and Multi-Row Table',
        prompt: 'Build an unordered list (<ul>) with two top-level items: "Frontend" (containing a nested <ol> with "HTML" and "CSS") and "Backend" (containing a nested <ol> with "Node.js" and "PostgreSQL").',
        requirements: [
          'Top-level <ul> with 2 <li> items',
          'Item 1 contains "Frontend" and an <ol> with "HTML" and "CSS"',
          'Item 2 contains "Backend" and an <ol> with "Node.js" and "PostgreSQL"',
          'Strict compliance: no non-li elements directly inside ul or ol'
        ],
        starterCode: '<!-- Build nested list hierarchy -->\n',
        solutionCode:
`<ul>
  <li>
    Frontend
    <ol>
      <li>HTML</li>
      <li>CSS</li>
    </ol>
  </li>
  <li>
    Backend
    <ol>
      <li>Node.js</li>
      <li>PostgreSQL</li>
    </ol>
  </li>
</ul>`,
        expectedOutput: 'A clean nested list outline where each category has an ordered sub-list nested inside its <li>.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<ul[\s>][\s\S]*?<\/ul>/i.test(code)) errors.push('Missing top-level <ul>.');
          const ols = code.match(/<ol[\s>][\s\S]*?<\/ol>/gi);
          if (!ols || ols.length < 2) errors.push('Must contain two nested <ol> lists inside the <li> items.');
          if (!/Frontend/i.test(code) || !/Backend/i.test(code)) errors.push('Must include "Frontend" and "Backend" items.');
          if (!/HTML/i.test(code) || !/CSS/i.test(code)) errors.push('Frontend list must include HTML and CSS.');
          if (!/Node\.js/i.test(code) || !/PostgreSQL/i.test(code)) errors.push('Backend list must include Node.js and PostgreSQL.');
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the only valid direct child element of a <ul> or <ol> container in HTML?',
        options: ['<p>', '<div>', '<li>', '<span>'],
        correctIndex: 2,
        explanation: 'According to the HTML standard, only <li> (List Item) elements are permitted as direct children of <ul> and <ol>.'
      },
      {
        id: 2,
        question: 'What is the accessibility purpose of setting scope="col" on a <th> element?',
        options: [
          'It changes the text color to purple in Chrome',
          'It explicitly associates the header cell with all data cells in that vertical column for screen readers',
          'It turns the table into a responsive CSS grid',
          'It is used by SQL database queries to export CSV files'
        ],
        correctIndex: 1,
        explanation: 'scope="col" informs assistive technologies that this header applies to all subsequent cells in that specific vertical column.'
      },
      {
        id: 3,
        question: 'When should HTML <table> elements be used on modern websites?',
        options: [
          'To lay out entire page navigation bars and footers',
          'Only when displaying tabular, row-and-column data like schedules or statistics',
          'To replace CSS flexbox',
          'Tables are completely banned in modern HTML5'
        ],
        correctIndex: 1,
        explanation: 'Tables must be reserved strictly for tabular datasets. Using tables for visual page layouts degrades responsiveness and ruins accessibility.'
      }
    ],
    video: {
      title: 'HTML Lists and Tables Complete Guide',
      channel: 'Dave Gray',
      videoId: '059y35Z9p9o',
      url: 'https://www.youtube.com/watch?v=059y35Z9p9o',
      description: 'Dave Gray explains unordered lists, ordered lists, table structure, <thead>, <tbody>, and accessibility headers.'
    }
  },

  // =========================================================================
  // TOPIC 6: Forms and Validation
  // =========================================================================
  {
    id: 'topic-6',
    order: 6,
    slug: 'forms-and-validation',
    title: 'Forms and Validation',
    difficulty: 'Intermediate',
    estimatedTime: '18 min',
    summary:
      'Build interactive user input forms using <form>, <input>, <label>, <textarea>, and native HTML5 constraint validation attributes (required, type, minlength, pattern).',
    notes: {
      concept:
        'Forms (<form>) are the primary mechanism for collecting user input on the web. They contain various input controls such as text boxes, email fields, passwords, checkboxes, radio buttons, and submit buttons. HTML5 provides built-in client-side validation using attributes like required, minlength, and pattern, allowing browsers to prevent submission and display user-friendly error messages before sending data to a server.',
      syntax:
`<form action="/api/submit" method="POST">
  <label for="user-email">Email Address:</label>
  <input type="email" id="user-email" name="email" required placeholder="you@domain.com">

  <label for="user-pwd">Password:</label>
  <input type="password" id="user-pwd" name="password" minlength="8" required>

  <button type="submit">Log In</button>
</form>`,
      explanation:
        '1. <form>: Defines the form boundary. action specifies where data is sent; method specifies the HTTP verb (GET or POST).\n2. <label for="id">: Pairs an accessible text description to a specific input via matching id. Clicking the label focuses the input!\n3. <input type="...">: Renders controls depending on type: text, email, password, number, checkbox, radio.\n4. name: The key identifier sent in the form submission payload. An input without a name attribute is NOT submitted!\n5. required: Boolean constraint ensuring the field cannot be submitted blank.\n6. minlength / maxlength: Enforces character bounds directly in the browser.',
      codeExample:
`<!-- Student Contact Form with HTML5 Validation Constraints -->
<form action="/api/contact" method="POST" class="contact-form">
  <div>
    <label for="full-name">Full Name (Required):</label>
    <input type="text" id="full-name" name="fullName" required minlength="3" placeholder="Jane Doe">
  </div>

  <div style="margin-top: 10px;">
    <label for="contact-email">Email Address:</label>
    <input type="email" id="contact-email" name="email" required placeholder="jane@example.com">
  </div>

  <div style="margin-top: 10px;">
    <label for="student-track">Target Track:</label>
    <select id="student-track" name="track">
      <option value="web">Web Development</option>
      <option value="data">Data Science</option>
    </select>
  </div>

  <div style="margin-top: 10px;">
    <label for="comments">Message:</label>
    <textarea id="comments" name="message" rows="4" required></textarea>
  </div>

  <button type="submit" style="margin-top: 12px;">Submit Application</button>
</form>`,
      expectedOutput:
        'A fully interactive form with labeled inputs for name, email, track dropdown, message textarea, and a submit button. Attempting to click submit while fields are empty triggers native browser constraint validation popups.',
      commonMistakes: [
        {
          mistake: 'Failing to pair <label for="..."> with the input id attribute.',
          correction: 'Always ensure label for matches the exact id of the corresponding input control.',
          explanation: 'Without this pairing, screen readers cannot announce field names when focused, and clicking the label text will not focus the input.'
        },
        {
          mistake: 'Omitting the name attribute on form inputs.',
          correction: 'Every input whose value should be submitted must have a distinct name="fieldName" attribute.',
          explanation: 'The browser ignores inputs lacking a name attribute when assembling the FormData payload for submission.'
        },
        {
          mistake: 'Using <button> inside a <form> without type="button" when not intended for submission.',
          correction: 'Explicitly write type="button" on non-submitting buttons, or type="submit" on submission buttons.',
          explanation: 'The default behavior of any button inside a form is type="submit", which unexpectedly triggers page refreshes when clicked.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Try submitting this form empty to trigger the native browser validation messages! Then fill in a valid email and notice how validation passes.',
      starterCode:
`<form onsubmit="event.preventDefault(); alert('Form submitted successfully!');" style="font-family: sans-serif; max-width: 320px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="margin-bottom: 12px;">
    <label for="demo-email" style="display: block; font-weight: bold; margin-bottom: 4px;">Email (Required):</label>
    <input type="email" id="demo-email" name="email" required placeholder="alex@codeforge.dev" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px;">
  </div>
  
  <div style="margin-bottom: 12px;">
    <label for="demo-pwd" style="display: block; font-weight: bold; margin-bottom: 4px;">Password (Min 8 chars):</label>
    <input type="password" id="demo-pwd" name="password" minlength="8" required style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px;">
  </div>

  <button type="submit" style="background: #6366f1; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; width: 100%;">
    Test Validation Submit
  </button>
</form>`
    },
    practiceQuestions: [
      {
        id: 'q6-1',
        level: 'Easy',
        title: 'Create an Accessible Text Field with Label',
        prompt: 'Create a text input with id="username", name="username", and required, correctly paired with a <label for="username">Username</label>.',
        requirements: [
          '<label for="username"> with text "Username"',
          '<input type="text" id="username" name="username" required>'
        ],
        starterCode: '<!-- Write label and text input here -->\n',
        solutionCode:
`<label for="username">Username</label>
<input type="text" id="username" name="username" required>`,
        expectedOutput: 'An accessible username field where clicking the label focuses the input.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<label[^>]*for=["']username["'][^>]*>[\s\S]*Username[\s\S]*<\/label>/i.test(code)) {
            errors.push('Missing <label for="username">Username</label>.');
          }
          if (!/<input[^>]*id=["']username["'][^>]*>/i.test(code) || !/<input[^>]*name=["']username["'][^>]*>/i.test(code)) {
            errors.push('The <input> must have both id="username" and name="username".');
          }
          if (!/<input[^>]*required[^>]*>/i.test(code)) {
            errors.push('The <input> must have the required attribute.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q6-2',
        level: 'Medium',
        title: 'Build Login Form with Validation Constraints',
        prompt: 'Build a login form (<form>) with action="/login" and method="POST". Inside, include an email field (required, name="email"), a password field (required, minlength="8", name="password"), and a <button type="submit">Log In</button>. Ensure both inputs have labels.',
        requirements: [
          '<form action="/login" method="POST">',
          'Email input with type="email", name="email", required, and paired label',
          'Password input with type="password", name="password", minlength="8", required, and paired label',
          '<button type="submit"> with text "Log In"'
        ],
        starterCode: '<!-- Build login form here -->\n',
        solutionCode:
`<form action="/login" method="POST">
  <label for="email-field">Email:</label>
  <input type="email" id="email-field" name="email" required>

  <label for="pwd-field">Password:</label>
  <input type="password" id="pwd-field" name="password" minlength="8" required>

  <button type="submit">Log In</button>
</form>`,
        expectedOutput: 'A validated login form with email checking, password length constraints, and explicit submit trigger.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<form[^>]*action=["']\/login["'][^>]*method=["']POST["'][^>]*>/i.test(code) &&
              !/<form[^>]*method=["']POST["'][^>]*action=["']\/login["'][^>]*>/i.test(code)) {
            errors.push('Form must specify action="/login" and method="POST".');
          }
          if (!/<input[^>]*type=["']email["'][^>]*name=["']email["'][^>]*required[^>]*>/i.test(code) &&
              !/<input[^>]*name=["']email["'][^>]*type=["']email["'][^>]*required[^>]*>/i.test(code)) {
            errors.push('Must include required email input with name="email".');
          }
          if (!/<input[^>]*type=["']password["'][^>]*minlength=["']8["'][^>]*required[^>]*>/i.test(code) &&
              !/<input[^>]*minlength=["']8["'][^>]*type=["']password["'][^>]*required[^>]*>/i.test(code)) {
            errors.push('Must include required password input with minlength="8".');
          }
          if (!/<button[^>]*type=["']submit["'][^>]*>[\s\S]*Log\s+In[\s\S]*<\/button>/i.test(code)) {
            errors.push('Missing <button type="submit">Log In</button>.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q6-3',
        level: 'Challenge',
        title: 'Complete Registration Form with Checkbox Terms',
        prompt: 'Build a registration form containing a text input for fullName, an email input, an age input with type="number" min="18" max="99", a checkbox input with id="terms" required, and matching labels for all four controls.',
        requirements: [
          'Inputs for fullName (text), email (email), age (number min="18" max="99")',
          'Checkbox input with id="terms" and required attribute',
          'Every single input must have a corresponding <label for="...">',
          'Include a submit button'
        ],
        starterCode: '<!-- Build complete registration form -->\n',
        solutionCode:
`<form action="/register" method="POST">
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="fullName" required>

  <label for="email">Email Address:</label>
  <input type="email" id="email" name="email" required>

  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="18" max="99" required>

  <input type="checkbox" id="terms" name="terms" required>
  <label for="terms">I agree to terms</label>

  <button type="submit">Register</button>
</form>`,
        expectedOutput: 'A multi-input registration form enforcing numerical boundaries and mandatory terms checkbox acceptance.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<input[^>]*type=["']number["'][^>]*min=["']18["'][^>]*max=["']99["'][^>]*>/i.test(code) &&
              !/<input[^>]*min=["']18["'][^>]*max=["']99["'][^>]*type=["']number["'][^>]*>/i.test(code)) {
            errors.push('Missing number input with min="18" and max="99".');
          }
          if (!/<input[^>]*type=["']checkbox["'][^>]*id=["']terms["'][^>]*required[^>]*>/i.test(code) &&
              !/<input[^>]*id=["']terms["'][^>]*type=["']checkbox["'][^>]*required[^>]*>/i.test(code)) {
            errors.push('Missing required checkbox with id="terms".');
          }
          if (!/<label[^>]*for=["']terms["'][^>]*>/i.test(code)) {
            errors.push('Missing <label for="terms">.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What happens if an <input> element inside a form does not have a name attribute when submitted?',
        options: [
          'The browser crashes with a JavaScript error',
          'The input value is completely omitted from the submitted HTTP request data',
          'The input is automatically named "unnamed_field"',
          'The browser turns the input into a password field'
        ],
        correctIndex: 1,
        explanation: 'The name attribute acts as the key for submitted form data. Without a name, the browser completely ignores the input during submission.'
      },
      {
        id: 2,
        question: 'Why is it critical to associate <label for="foo"> with an input having id="foo"?',
        options: [
          'It changes the color of the label text',
          'It allows screen readers to announce the label when the input is focused, and lets users click the label to focus the input',
          'It is necessary for CSS styling only',
          'It creates an automatic database foreign key'
        ],
        correctIndex: 1,
        explanation: 'Pairing label for with input id provides essential accessibility metadata and expands the interactive clickable area for touch and mouse users.'
      },
      {
        id: 3,
        question: 'What is the default type of a <button> element placed inside a <form> if no type is specified?',
        options: ['type="button"', 'type="reset"', 'type="submit"', 'type="menu"'],
        correctIndex: 2,
        explanation: 'In HTML standards, buttons inside forms default to type="submit". If a button is meant for custom client scripts, you must set type="button".'
      }
    ],
    video: {
      title: 'HTML Forms and Input Validation Crash Course',
      channel: 'Web Dev Simplified',
      videoId: 'fNcJuPIZ2WE',
      url: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
      description: 'Kyle from Web Dev Simplified demonstrates modern HTML form validation, input types, and best practices.'
    }
  },

  // =========================================================================
  // TOPIC 7: Semantic HTML
  // =========================================================================
  {
    id: 'topic-7',
    order: 7,
    slug: 'semantic-html',
    title: 'Semantic HTML',
    difficulty: 'Intermediate',
    estimatedTime: '14 min',
    summary:
      'Structure web pages using meaningful semantic landmark elements (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) instead of unsemantic div soup.',
    notes: {
      concept:
        'Semantic HTML means using HTML elements according to their intended meaning rather than purely for styling. Elements like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> convey distinct roles to web browsers, search engine web crawlers, and assistive technologies. By utilizing semantic landmarks, screen readers can jump directly to key regions (like skipping navigation directly to <main>).',
      syntax:
`<header>
  <nav aria-label="Main Navigation"> ... </nav>
</header>

<main>
  <article>
    <h2>Article Title</h2>
    <p>Content...</p>
  </article>
  
  <aside>
    <h3>Related Resources</h3>
  </aside>
</main>

<footer>
  <p>&copy; 2026 CodeForge</p>
</footer>`,
      explanation:
        '1. <header>: Introductory content or navigational aids for a page or section.\n2. <nav>: Dedicated container for primary navigation links.\n3. <main>: Represents the dominant central content of the document. There must be only one visible <main> per page!\n4. <article>: Self-contained, independently distributable composition (blog post, news story, comment).\n5. <section>: Thematic grouping of content, typically with its own heading.\n6. <aside>: Content tangentially related to the content around it (sidebars, callouts).\n7. <footer>: Concluding section containing author info, copyright, or footer links.',
      codeExample:
`<!-- Professional Semantic Page Skeleton -->
<header>
  <div class="logo">CodeForge Platform</div>
  <nav aria-label="Main Navigation">
    <a href="/home">Home</a>
    <a href="/tracks">Tracks</a>
    <a href="/profile">Profile</a>
  </nav>
</header>

<main>
  <article>
    <h1>Introduction to Semantic Markup</h1>
    <p>Semantic tags improve accessibility, SEO, and maintainability.</p>
    
    <section>
      <h2>Why Semantics Matter</h2>
      <p>Assistive technologies announce landmarks so users can navigate rapidly.</p>
    </section>
  </article>

  <aside>
    <h3>Recommended Reading</h3>
    <ul>
      <li><a href="/a11y">Web Accessibility Principles</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2026 CodeForge Learning. All rights reserved.</p>
</footer>`,
      expectedOutput:
        'A fully structured modern document with a top header containing navigation links, a central main area displaying an article with subheadings and an aside sidebar, and a copyright footer at the bottom.',
      commonMistakes: [
        {
          mistake: '"Div soup" – wrapping every element inside generic <div> tags with custom classes.',
          correction: 'Replace structural <div> tags with <header>, <nav>, <main>, <article>, <section>, and <footer>.',
          explanation: '<div> carries zero semantic meaning. Assistive technologies cannot determine landmark roles from unsemantic divs.'
        },
        {
          mistake: 'Having multiple <main> elements on a single page.',
          correction: 'Use exactly one <main> element per document representing the central topic.',
          explanation: 'HTML specifications require that only one <main> element without the hidden attribute exist per document.'
        },
        {
          mistake: 'Using <section> as a generic wrapper simply for CSS styling.',
          correction: 'Use <div> for purely visual styling wrappers; use <section> only for thematic content with a heading.',
          explanation: 'A <section> is defined as a thematic group of content, which should almost always start with a heading (<h2>–<h6>).'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Notice how using semantic tags makes the code instantly self-documenting and readable. Try changing the article title and adding a new section inside.',
      starterCode:
`<div style="font-family: sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
  <header style="background: #4f46e5; color: white; padding: 12px 16px;">
    <strong>CodeForge Community</strong>
  </header>
  
  <main style="padding: 16px;">
    <article>
      <h2 style="color: #1e293b; margin-top: 0;">Why Developers Love Semantic HTML</h2>
      <p style="color: #64748b; font-size: 14px;">Semantic elements make HTML clean, searchable, and universally accessible.</p>
    </article>
  </main>
  
  <footer style="background: #f8fafc; padding: 10px 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
    &copy; 2026 CodeForge Inc.
  </footer>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q7-1',
        level: 'Easy',
        title: 'Wrap Links in a Semantic Navigation Container',
        prompt: 'Wrap the three provided links inside a semantic <nav> element with an aria-label="Site Navigation".',
        requirements: [
          '<nav> element with aria-label="Site Navigation"',
          'Contains all three links intact'
        ],
        starterCode:
`<a href="/home">Home</a>
<a href="/learn">Learn</a>
<a href="/practice">Practice</a>`,
        solutionCode:
`<nav aria-label="Site Navigation">
  <a href="/home">Home</a>
  <a href="/learn">Learn</a>
  <a href="/practice">Practice</a>
</nav>`,
        expectedOutput: 'A semantic navigation landmark that screen readers can instantly locate and identify.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<nav[^>]*aria-label=["']Site\s+Navigation["'][^>]*>/i.test(code)) {
            errors.push('Must use <nav aria-label="Site Navigation">.');
          }
          if (!/href=["']\/home["']/i.test(code) || !/href=["']\/learn["']/i.test(code) || !/href=["']\/practice["']/i.test(code)) {
            errors.push('Must preserve the 3 navigation links.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q7-2',
        level: 'Medium',
        title: 'Construct Primary Landmark Layout',
        prompt: 'Build a standard 3-part semantic layout: a <header> with an <h1> ("Dev Blog"), a <main> container wrapping a <p>, and a <footer> containing a <small> with copyright text.',
        requirements: [
          '<header> containing <h1>Dev Blog</h1>',
          '<main> containing at least one <p>',
          '<footer> containing a <small> tag',
          'Only one <main> element'
        ],
        starterCode: '<!-- Build 3-part landmark layout here -->\n',
        solutionCode:
`<header>
  <h1>Dev Blog</h1>
</header>
<main>
  <p>Welcome to articles on modern web engineering standards.</p>
</main>
<footer>
  <small>&copy; 2026 Dev Blog</small>
</footer>`,
        expectedOutput: 'A clean 3-landmark layout separating header, main body, and footer.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<header[\s>][\s\S]*?<h1[^>]*>[\s\S]*Dev\s+Blog[\s\S]*?<\/h1>[\s\S]*?<\/header>/i.test(code)) {
            errors.push('Missing <header> with <h1>Dev Blog</h1>.');
          }
          const mains = code.match(/<main[\s>][\s\S]*?<\/main>/gi);
          if (!mains || mains.length !== 1 || !/<p[\s>]/i.test(mains[0])) {
            errors.push('Must have exactly one <main> containing a <p>.');
          }
          if (!/<footer[\s>][\s\S]*?<small[\s>][\s\S]*?<\/small>[\s\S]*?<\/footer>/i.test(code)) {
            errors.push('Missing <footer> containing a <small> tag.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q7-3',
        level: 'Challenge',
        title: 'Complete Article and Aside Semantic Architecture',
        prompt: 'Inside a <main> container, construct an <article> (with its own <h2> heading and a <p>) and an <aside> (with an <h3> "Related Links" and a <ul> with two <li> items).',
        requirements: [
          '<main> container',
          '<article> inside main with an <h2> and <p>',
          '<aside> inside main with an <h3> ("Related Links") and a <ul> with two <li> items'
        ],
        starterCode: '<!-- Build article and aside architecture -->\n',
        solutionCode:
`<main>
  <article>
    <h2>Understanding Semantic Architecture</h2>
    <p>Semantic tags improve accessibility and content discovery.</p>
  </article>
  <aside>
    <h3>Related Links</h3>
    <ul>
      <li><a href="#link1">Accessibility Best Practices</a></li>
      <li><a href="#link2">SEO Optimization</a></li>
    </ul>
  </aside>
</main>`,
        expectedOutput: 'An accessible publication layout pairing an article with a contextual aside sidebar.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<main[\s>][\s\S]*?<\/main>/i.test(code)) errors.push('Must be wrapped inside a <main> element.');
          if (!/<article[\s>][\s\S]*?<h2[\s>][\s\S]*?<p[\s>][\s\S]*?<\/article>/i.test(code)) {
            errors.push('<article> must contain an <h2> heading and a <p> paragraph.');
          }
          if (!/<aside[\s>][\s\S]*?<h3[^>]*>[\s\S]*Related\s+Links[\s\S]*?<\/h3>[\s\S]*?<ul[\s>][\s\S]*?<\/aside>/i.test(code)) {
            errors.push('<aside> must contain an <h3> with "Related Links" and a <ul>.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why is Semantic HTML preferred over using <div> tags for all layout structures?',
        options: [
          'It allows CSS styles to load without needing class names',
          'It provides native accessibility landmarks for screen readers, improves SEO, and makes code self-describing',
          'It is required by JavaScript engines to run loops',
          'It prevents websites from being copied by competitors'
        ],
        correctIndex: 1,
        explanation: 'Semantic elements give meaning to page structure, allowing screen reader users to jump directly between landmarks while boosting SEO ranking.'
      },
      {
        id: 2,
        question: 'How many visible <main> landmark elements are permitted per HTML document?',
        options: ['Zero', 'Exactly one', 'Up to three', 'As many as there are articles'],
        correctIndex: 1,
        explanation: 'The <main> element represents the central dominant content of the document. Only one visible <main> is permitted per page.'
      },
      {
        id: 3,
        question: 'What is the correct semantic purpose of the <aside> element?',
        options: [
          'To hide elements completely from mobile devices',
          'To enclose content tangentially related to the surrounding content (e.g., sidebars, callouts, related links)',
          'To style text with a dark background',
          'To load external JavaScript plugins'
        ],
        correctIndex: 1,
        explanation: '<aside> marks content that is indirectly or tangentially related to the main content, such as related articles, glossaries, or sidebars.'
      }
    ],
    video: {
      title: 'HTML Semantic Elements In 15 Minutes',
      channel: 'Traversy Media',
      videoId: 'UB1O30fR-EE',
      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
      description: 'Brad Traversy explains why semantic HTML matters, demonstrating landmark tags in live website builds.'
    }
  },

  // =========================================================================
  // TOPIC 8: Accessibility (a11y)
  // =========================================================================
  {
    id: 'topic-8',
    order: 8,
    slug: 'accessibility-a11y',
    title: 'Accessibility (a11y)',
    difficulty: 'Intermediate',
    estimatedTime: '16 min',
    summary:
      'Build inclusive web experiences compliant with WCAG guidelines: ARIA labels, decorative elements with aria-hidden, focus outlines, and screen reader announcements.',
    notes: {
      concept:
        'Web Accessibility (commonly abbreviated as a11y, where "11" represents the 11 letters between "a" and "y") ensures that websites are usable by everyone, including people with visual, auditory, motor, or cognitive impairments. Following the Web Content Accessibility Guidelines (WCAG) involves writing proper semantic HTML, providing descriptive text alternatives, maintaining keyboard navigability, and applying ARIA attributes where native HTML elements cannot convey sufficient context.',
      syntax:
`<!-- Accessible icon-only button -->
<button type="button" aria-label="Close dialog">
  <span aria-hidden="true">&times;</span>
</button>

<!-- Purely decorative image hidden from screen readers -->
<img src="divider.png" alt="" aria-hidden="true">`,
      explanation:
        '1. The First Rule of ARIA: If a native HTML element (like <button> or <nav>) exists, use it instead of recreating it with an unsemantic tag (<div onclick="...") and ARIA.\n2. aria-label: Provides an invisible string accessible name for assistive technology when visible text is absent (e.g. icon-only buttons).\n3. aria-hidden="true": Hides non-essential or decorative elements (like SVG icons or divider lines) from screen readers so they are not read aloud.\n4. alt="": Setting an empty alt attribute marks an image as purely decorative without reading the raw image filename.\n5. Keyboard Accessibility: Every interactive element must be reachable and operable using the Tab and Enter/Space keys.',
      codeExample:
`<!-- Accessible Dialog Box Component with ARIA Attributes -->
<div role="dialog" aria-labelledby="dialog-heading" aria-modal="true" class="modal-card">
  <div class="modal-header">
    <h2 id="dialog-heading">Confirm Account Deletion</h2>
    <!-- Icon-only close button with accessible screen reader label -->
    <button type="button" aria-label="Close modal window" class="btn-close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  
  <p>Are you sure you want to permanently delete your student account?</p>
  
  <div class="modal-actions">
    <button type="button" class="btn btn-secondary">Cancel</button>
    <button type="button" class="btn btn-danger">Confirm Delete</button>
  </div>
</div>`,
      expectedOutput:
        'A fully accessible modal card. Visually impaired users using screen readers hear "Confirm Account Deletion, Dialog", while the close button is announced as "Close modal window, button" rather than the raw multiplication sign "&times;".',
      commonMistakes: [
        {
          mistake: 'Reinventing native interactive elements with divs (e.g. <div onclick="submit()">Submit</div>).',
          correction: 'Always use native interactive elements like <button type="button"> or <a>.',
          explanation: 'Native buttons provide keyboard Tab focus, Space/Enter triggering, and screen reader role announcements out of the box.'
        },
        {
          mistake: 'Removing CSS focus outlines without providing a custom visual focus indicator (e.g. outline: none).',
          correction: 'Always provide a clear, high-contrast :focus or :focus-visible outline for keyboard users.',
          explanation: 'Keyboard users rely on the visual focus ring to know which element currently has focus as they press Tab.'
        },
        {
          mistake: 'Using aria-label that directly contradicts or redundantly duplicates the visible text.',
          correction: 'Ensure aria-label matches or enhances the visible label without creating confusing conflicts.',
          explanation: 'Discrepancies between visible text and voice control commands confuse speech-to-text navigation users.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Notice how the icon button below has aria-label="Close notification" and the icon has aria-hidden="true". Try changing the aria-label text.',
      starterCode:
`<div style="font-family: sans-serif; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; max-width: 400px;">
  <div>
    <strong>Update Available</strong>
    <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">CodeForge v1.2 has been released.</p>
  </div>
  
  <!-- Icon-only button with accessible name -->
  <button 
    type="button" 
    aria-label="Dismiss update notification" 
    style="background: transparent; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; cursor: pointer;"
  >
    <span aria-hidden="true">&times;</span>
  </button>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q8-1',
        level: 'Easy',
        title: 'Add Accessible Name to an Icon Button',
        prompt: 'Add an aria-label with value "Search curriculum catalog" to the provided icon button.',
        requirements: [
          '<button> must have aria-label="Search curriculum catalog"',
          'Keep the inner span intact'
        ],
        starterCode:
`<button type="button">
  <span aria-hidden="true">&#128269;</span>
</button>`,
        solutionCode:
`<button type="button" aria-label="Search curriculum catalog">
  <span aria-hidden="true">&#128269;</span>
</button>`,
        expectedOutput: 'An accessible search button that announces its exact purpose to screen readers.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<button[^>]*aria-label=["']Search\s+curriculum\s+catalog["'][^>]*>/i.test(code)) {
            errors.push('Missing aria-label="Search curriculum catalog" on the <button>.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q8-2',
        level: 'Medium',
        title: 'Accessible Decorative vs Informative Images',
        prompt: 'Create two image tags: one informative image with src="chart.png" and alt="Monthly revenue growth bar chart", and one purely decorative background pattern with src="pattern.svg", alt="", and aria-hidden="true".',
        requirements: [
          'Informative <img> with src="chart.png" and alt="Monthly revenue growth bar chart"',
          'Decorative <img> with src="pattern.svg", alt="", and aria-hidden="true"',
          'Both must be void elements without closing tags'
        ],
        starterCode: '<!-- Write informative and decorative images here -->\n',
        solutionCode:
`<img src="chart.png" alt="Monthly revenue growth bar chart">
<img src="pattern.svg" alt="" aria-hidden="true">`,
        expectedOutput: 'An informative image that screen readers announce, paired with a decorative image safely silenced.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (/<\/img>/i.test(code)) errors.push('<img> tags must not have closing tags.');
          if (!/<img[^>]*src=["']chart\.png["'][^>]*alt=["']Monthly\s+revenue\s+growth\s+bar\s+chart["'][^>]*>/i.test(code) &&
              !/<img[^>]*alt=["']Monthly\s+revenue\s+growth\s+bar\s+chart["'][^>]*src=["']chart\.png["'][^>]*>/i.test(code)) {
            errors.push('Missing informative image with alt="Monthly revenue growth bar chart".');
          }
          if (!/<img[^>]*src=["']pattern\.svg["'][^>]*alt=["']["'][^>]*aria-hidden=["']true["'][^>]*>/i.test(code) &&
              !/<img[^>]*aria-hidden=["']true["'][^>]*alt=["']["'][^>]*src=["']pattern\.svg["'][^>]*>/i.test(code)) {
            errors.push('Missing decorative image with alt="" and aria-hidden="true".');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q8-3',
        level: 'Challenge',
        title: 'Accessible Dialog Modal Structure',
        prompt: 'Build an accessible modal container with role="dialog", aria-labelledby="modal-title", containing an <h2> with id="modal-title" and text "Notice", a <p>, and an icon button with aria-label="Close dialog".',
        requirements: [
          'Container with role="dialog" and aria-labelledby="modal-title"',
          '<h2> with id="modal-title" containing "Notice"',
          '<p> message description',
          '<button> with aria-label="Close dialog"'
        ],
        starterCode: '<!-- Build accessible modal structure here -->\n',
        solutionCode:
`<div role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Notice</h2>
  <p>Your session will expire in 5 minutes.</p>
  <button type="button" aria-label="Close dialog">&times;</button>
</div>`,
        expectedOutput: 'A fully accessible dialog component conforming to W3C WAI-ARIA standards.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<div[^>]*role=["']dialog["'][^>]*aria-labelledby=["']modal-title["'][^>]*>/i.test(code) &&
              !/<div[^>]*aria-labelledby=["']modal-title["'][^>]*role=["']dialog["'][^>]*>/i.test(code)) {
            errors.push('Container must specify role="dialog" and aria-labelledby="modal-title".');
          }
          if (!/<h2[^>]*id=["']modal-title["'][^>]*>[\s\S]*Notice[\s\S]*<\/h2>/i.test(code)) {
            errors.push('Must contain <h2 id="modal-title">Notice</h2>.');
          }
          if (!/<button[^>]*aria-label=["']Close\s+dialog["'][^>]*>/i.test(code)) {
            errors.push('Must contain a <button> with aria-label="Close dialog".');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the First Rule of ARIA according to the W3C Web Accessibility Initiative?',
        options: [
          'Always use ARIA attributes on every HTML tag',
          'If you can use a native HTML element or attribute with the semantics and behavior already built in, do so instead of using ARIA',
          'Never use HTML buttons',
          'Always set aria-hidden="true" on all paragraphs'
        ],
        correctIndex: 1,
        explanation: 'The first rule of ARIA states: do not use ARIA if a native HTML element already fulfills the desired semantic role and behavior.'
      },
      {
        id: 2,
        question: 'How should a purely decorative image (like a divider wave or gradient) be marked in HTML?',
        options: [
          'Omit the alt attribute entirely',
          'Use alt="image decoration"',
          'Use an empty alt attribute (alt="") and optionally aria-hidden="true"',
          'Use alt="none"'
        ],
        correctIndex: 2,
        explanation: 'alt="" informs screen readers that the image is purely decorative and should be skipped silently without reading filename noise.'
      },
      {
        id: 3,
        question: 'Why is removing CSS focus indicators (outline: none) without a replacement harmful to users?',
        options: [
          'It causes text to blur in Firefox',
          'It completely blinds keyboard-only users, preventing them from knowing which interactive control is currently active',
          'It reduces browser download speeds',
          'It turns buttons invisible'
        ],
        correctIndex: 1,
        explanation: 'Keyboard users navigate by pressing Tab. Removing focus outlines without a replacement makes it impossible to know where the cursor is.'
      }
    ],
    video: {
      title: 'Web Accessibility (a11y) Full Tutorial For Beginners',
      channel: 'Web Dev Simplified',
      videoId: '8VLUQuxhVDg',
      url: 'https://www.youtube.com/watch?v=8VLUQuxhVDg',
      description: 'Kyle teaches web accessibility fundamentals, WCAG standards, ARIA roles, and keyboard navigation best practices.'
    }
  },

  // =========================================================================
  // TOPIC 9: Audio and Video
  // =========================================================================
  {
    id: 'topic-9',
    order: 9,
    slug: 'audio-and-video',
    title: 'Audio and Video',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    summary:
      'Embed native multimedia with <video> and <audio>, configure controls, poster images, multiple codec sources, and closed caption tracks (<track>).',
    notes: {
      concept:
        'HTML5 introduced native multimedia elements (<video> and <audio>) that allow browsers to stream media directly without proprietary plugins like Flash. Using the <source> element, developers can supply multiple video formats (MP4, WebM) so browsers automatically select the best codec they support. The <track> element embeds synchronized text tracks such as subtitles and closed captions.',
      syntax:
`<video controls width="640" poster="poster.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <track src="subs_en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support the video tag.
</video>

<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  Your browser does not support the audio tag.
</audio>`,
      explanation:
        '1. controls: Displays native browser player interface (play/pause, volume slider, timeline scrubber, fullscreen button).\n2. poster: URL of an image shown while video is downloading or until the user hits play.\n3. <source src="..." type="...">: Specifies alternate media files; browsers evaluate top-to-bottom and play the first compatible format.\n4. <track>: Synchronizes WebVTT (.vtt) text for captions, subtitles, or audio descriptions.\n5. Autoplay Policies: Modern browsers block video autoplay with audio. If autoplay is required, muted must also be declared!',
      codeExample:
`<!-- Accessible HTML5 Video Player with Multiple Codecs and Subtitles -->
<figure class="media-container">
  <video 
    controls 
    width="560" 
    poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
    preload="metadata"
  >
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
    <track 
      src="captions_en.vtt" 
      kind="captions" 
      srclang="en" 
      label="English Captions" 
      default
    >
    <p>Your browser does not support HTML5 video. <a href="video.mp4">Download the video directly</a>.</p>
  </video>
  <figcaption>Figure 1: Introduction to Web Development Video Lecture</figcaption>
</figure>`,
      expectedOutput:
        'A native media player with custom poster image, player controls (play/pause, timeline, volume, fullscreen), English subtitles track, and fallback download link.',
      commonMistakes: [
        {
          mistake: 'Specifying only one video source format (e.g. only WebM or only MOV).',
          correction: 'Provide MP4 (H.264) and WebM formats using multiple <source> tags.',
          explanation: 'Not all browsers and mobile devices support every video codec. Providing MP4 ensures universal playback.'
        },
        {
          mistake: 'Trying to autoplay video with audio enabled (e.g. <video autoplay controls>).',
          correction: 'Add the muted boolean attribute: <video autoplay muted playsinline>.',
          explanation: 'Modern browsers strictly prevent audible autoplaying videos to protect user experience.'
        },
        {
          mistake: 'Forgetting accessible captions (<track>) for auditory content.',
          correction: 'Always include a WebVTT <track kind="captions"> for video with speech.',
          explanation: 'Deaf and hard-of-hearing users rely on captions to consume multimedia content.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Notice the native browser video controls below. Try adding or removing the controls attribute or changing the poster image.',
      starterCode:
`<div style="font-family: sans-serif; max-width: 480px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px;">
  <h4 style="margin: 0 0 8px;">HTML5 Native Video Player</h4>
  <video 
    controls 
    poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
    style="width: 100%; border-radius: 6px;"
  >
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
    <p>Your browser does not support HTML5 video.</p>
  </video>
</div>`
    },
    practiceQuestions: [
      {
        id: 'q9-1',
        level: 'Easy',
        title: 'Create an Audio Player with Controls',
        prompt: 'Create an <audio> player with the controls attribute, containing a <source src="podcast.mp3" type="audio/mpeg"> and fallback text "Audio not supported".',
        requirements: [
          '<audio controls>',
          '<source src="podcast.mp3" type="audio/mpeg"> inside <audio>',
          'Fallback text "Audio not supported"'
        ],
        starterCode: '<!-- Write audio player here -->\n',
        solutionCode:
`<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  Audio not supported
</audio>`,
        expectedOutput: 'A native audio scrubber bar with play button, volume control, and fallback text.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<audio[^>]*controls[^>]*>/i.test(code)) errors.push('Missing <audio controls>.');
          if (!/<source[^>]*src=["']podcast\.mp3["'][^>]*type=["']audio\/mpeg["'][^>]*>/i.test(code)) {
            errors.push('Missing <source src="podcast.mp3" type="audio/mpeg">.');
          }
          if (!/Audio\s+not\s+supported/i.test(code)) errors.push('Missing fallback text "Audio not supported".');
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q9-2',
        level: 'Medium',
        title: 'Multi-Source Video Player with Poster',
        prompt: 'Create a <video> element with controls, width="600", and poster="poster.jpg". Inside, provide an MP4 source ("lecture.mp4", type="video/mp4") and a WebM source ("lecture.webm", type="video/webm").',
        requirements: [
          '<video controls width="600" poster="poster.jpg">',
          '<source src="lecture.mp4" type="video/mp4">',
          '<source src="lecture.webm" type="video/webm">'
        ],
        starterCode: '<!-- Write video player here -->\n',
        solutionCode:
`<video controls width="600" poster="poster.jpg">
  <source src="lecture.mp4" type="video/mp4">
  <source src="lecture.webm" type="video/webm">
  Your browser does not support HTML5 video.
</video>`,
        expectedOutput: 'A dual-format video player that automatically picks the supported codec in any browser.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<video[^>]*controls[^>]*poster=["']poster\.jpg["'][^>]*width=["']600["'][^>]*>/i.test(code) &&
              !/<video[^>]*controls[^>]*width=["']600["'][^>]*poster=["']poster\.jpg["'][^>]*>/i.test(code)) {
            errors.push('Missing <video controls width="600" poster="poster.jpg">.');
          }
          if (!/<source[^>]*src=["']lecture\.mp4["'][^>]*type=["']video\/mp4["'][^>]*>/i.test(code)) {
            errors.push('Missing MP4 source.');
          }
          if (!/<source[^>]*src=["']lecture\.webm["'][^>]*type=["']video\/webm["'][^>]*>/i.test(code)) {
            errors.push('Missing WebM source.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q9-3',
        level: 'Challenge',
        title: 'Accessible Video with Captions Track',
        prompt: 'Build an accessible <video controls poster="thumb.png"> with an MP4 source and a <track> element with kind="captions", src="captions_en.vtt", srclang="en", label="English", and the default attribute.',
        requirements: [
          '<video controls poster="thumb.png">',
          '<source src="video.mp4" type="video/mp4">',
          '<track kind="captions" src="captions_en.vtt" srclang="en" label="English" default>'
        ],
        starterCode: '<!-- Build video with caption track here -->\n',
        solutionCode:
`<video controls poster="thumb.png">
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions_en.vtt" srclang="en" label="English" default>
  Browser does not support video.
</video>`,
        expectedOutput: 'An accessible video player featuring automated English captions and subtitles track.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<video[^>]*controls[^>]*poster=["']thumb\.png["'][^>]*>/i.test(code)) {
            errors.push('Missing <video controls poster="thumb.png">.');
          }
          if (!/<track[^>]*kind=["']captions["'][^>]*src=["']captions_en\.vtt["'][^>]*srclang=["']en["'][^>]*label=["']English["'][^>]*default[^>]*>/i.test(code) &&
              !/<track[^>]*src=["']captions_en\.vtt["'][^>]*kind=["']captions["'][^>]*srclang=["']en["'][^>]*default[^>]*>/i.test(code)) {
            errors.push('Missing accessible <track kind="captions" src="captions_en.vtt" srclang="en" label="English" default>.');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why do modern web browsers block videos configured with autoplay from playing sound automatically?',
        options: [
          'Because audio takes too much server CPU to decode',
          'To prevent intrusive and jarring user experiences, requiring videos to have the muted attribute to autoplay',
          'Because HTML5 removed sound support from video tags',
          'To prevent copyrighted music from streaming'
        ],
        correctIndex: 1,
        explanation: 'Browser autoplay policies forbid unexpected loud audio. If autoplay is desired, the video must include the muted attribute.'
      },
      {
        id: 2,
        question: 'What is the purpose of placing multiple <source> tags inside a single <video> element?',
        options: [
          'To play multiple videos simultaneously on top of each other',
          'To provide alternate video codecs (e.g. MP4 and WebM) so any browser can select its supported format',
          'To speed up download speeds through parallel connections',
          'To create video chapters'
        ],
        correctIndex: 1,
        explanation: 'Different browsers and operating systems support different codecs. Offering MP4 and WebM guarantees cross-platform compatibility.'
      },
      {
        id: 3,
        question: 'Which HTML element is used to add subtitles or closed captions to an HTML5 <video>?',
        options: ['<subtitle>', '<caption>', '<track>', '<vtt>'],
        correctIndex: 2,
        explanation: 'The <track> element specifies timed text tracks (such as subtitles, captions, or chapter titles) using the WebVTT format.'
      }
    ],
    video: {
      title: 'HTML Video and Audio Elements Tutorial',
      channel: 'Dave Gray',
      videoId: 'OM0goBLkkQ8',
      url: 'https://www.youtube.com/watch?v=OM0goBLkkQ8',
      description: 'Dave Gray covers HTML5 native media, audio and video tags, attributes, and subtitles with VTT files.'
    }
  },

  // =========================================================================
  // TOPIC 10: HTML5 Metadata
  // =========================================================================
  {
    id: 'topic-10',
    order: 10,
    slug: 'html5-metadata',
    title: 'HTML5 Metadata',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    summary:
      'Configure essential document metadata in the <head>: character encoding, mobile viewport, SEO descriptions, Open Graph social share cards, and favicons.',
    notes: {
      concept:
        'Metadata is data about data. In HTML, metadata resides strictly inside the <head> container. While invisible on the rendered page, metadata communicates critical instructions to browser rendering engines, search engine indexers, and social media platforms. Essential metadata includes the character encoding (UTF-8), the responsive viewport declaration for smartphones, SEO page descriptions, Open Graph preview tags, and browser favicons.',
      syntax:
`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Concise 155-character summary of page content for search engines.">
  <meta property="og:title" content="CodeForge Learning">
  <meta property="og:image" content="https://example.com/preview.png">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <title>Accurate Document Title</title>
</head>`,
      explanation:
        '1. <meta charset="UTF-8">: Declares Unicode character encoding; must appear within the first 1024 bytes of the document.\n2. <meta name="viewport" content="width=device-width, initial-scale=1.0">: Tells mobile devices to match screen width and disable desktop zoom simulation.\n3. <meta name="description">: The snippet displayed under your link in Google search results.\n4. Open Graph (<meta property="og:...">): Protocol created by Facebook, used by Twitter/X, Discord, Slack, and LinkedIn to generate rich link preview cards.\n5. <link rel="icon">: Links the miniature icon displayed in browser tabs.',
      codeExample:
`<!-- Production-Grade HTML5 <head> Metadata Configuration -->
<head>
  <!-- Character Encoding (Must be first) -->
  <meta charset="UTF-8">
  
  <!-- Responsive Mobile Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Document Title & Search Engine Optimization -->
  <title>HTML5 Foundational Curriculum | CodeForge</title>
  <meta name="description" content="Master HTML document structure, semantics, accessibility, and modern web development standards with hands-on practice.">
  
  <!-- Open Graph Social Share Preview Cards -->
  <meta property="og:title" content="CodeForge HTML Curriculum">
  <meta property="og:description" content="Interactive learning platform for modern developers.">
  <meta property="og:image" content="https://codeforge.dev/images/og-preview.png">
  <meta property="og:type" content="website">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>`,
      expectedOutput:
        'When shared on Discord, Slack, or LinkedIn, the webpage automatically generates a rich card showing the title "CodeForge HTML Curriculum", the description, and the preview thumbnail image.',
      commonMistakes: [
        {
          mistake: 'Placing <meta charset="UTF-8"> deep inside <head> after numerous scripts or styles.',
          correction: 'Always place <meta charset="UTF-8"> as the very first element inside <head>.',
          explanation: 'Browsers require character encoding to appear within the first 1024 bytes of the file to prevent character decoding glitches.'
        },
        {
          mistake: 'Omitting the responsive viewport meta tag on modern web applications.',
          correction: 'Always include <meta name="viewport" content="width=device-width, initial-scale=1.0">.',
          explanation: 'Without this tag, mobile browsers render pages at a fixed 980px desktop width and scale it down tiny, ruining mobile UX.'
        },
        {
          mistake: 'Keyword stuffing inside <meta name="description"> instead of a natural readable summary.',
          correction: 'Write a compelling 140–160 character sentence that entices human searchers to click your link.',
          explanation: 'Search engines detect keyword stuffing and will ignore your meta description or lower your ranking.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Notice how metadata sets up document title, viewport, and descriptions. Try editing the title and description content.',
      starterCode:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metadata Sandbox</title>
    <meta name="description" content="Testing HTML5 metadata configurations in CodeForge.">
  </head>
  <body style="font-family: sans-serif; padding: 20px;">
    <h3>Inspect Document Metadata</h3>
    <p>Document metadata resides in the &lt;head&gt; tag and controls browser tab titles, SEO, and social previews.</p>
  </body>
</html>`
    },
    practiceQuestions: [
      {
        id: 'q10-1',
        level: 'Easy',
        title: 'Add SEO Meta Description',
        prompt: 'Add an SEO meta description tag with content="Master HTML5 and modern web standards with CodeForge." inside the <head>.',
        requirements: [
          '<meta name="description" content="Master HTML5 and modern web standards with CodeForge.">'
        ],
        starterCode:
`<head>
  <meta charset="UTF-8">
  <title>CodeForge Learn</title>
</head>`,
        solutionCode:
`<head>
  <meta charset="UTF-8">
  <meta name="description" content="Master HTML5 and modern web standards with CodeForge.">
  <title>CodeForge Learn</title>
</head>`,
        expectedOutput: 'An SEO-configured head element with concise search snippet description.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<meta[^>]*name=["']description["'][^>]*content=["']Master\s+HTML5\s+and\s+modern\s+web\s+standards\s+with\s+CodeForge\.?["'][^>]*>/i.test(code) &&
              !/<meta[^>]*content=["']Master\s+HTML5\s+and\s+modern\s+web\s+standards\s+with\s+CodeForge\.?["'][^>]*name=["']description["'][^>]*>/i.test(code)) {
            errors.push('Missing <meta name="description" content="Master HTML5 and modern web standards with CodeForge.">.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q10-2',
        level: 'Medium',
        title: 'Add Responsive Viewport and Charset',
        prompt: 'Configure the essential first two tags inside <head>: character encoding UTF-8, and the responsive mobile viewport tag.',
        requirements: [
          '<meta charset="UTF-8">',
          '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        ],
        starterCode:
`<head>
  <!-- Add charset and viewport tags here -->
  <title>Mobile Ready Page</title>
</head>`,
        solutionCode:
`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile Ready Page</title>
</head>`,
        expectedOutput: 'A head block prepared for international character rendering and 1:1 mobile screen responsiveness.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<meta[^>]*charset=["']UTF-8["']/i.test(code)) errors.push('Missing <meta charset="UTF-8">.');
          if (!/<meta[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["']/i.test(code)) {
            errors.push('Missing <meta name="viewport" content="width=device-width, initial-scale=1.0">.');
          }
          return { valid: errors.length === 0, errors };
        }
      },
      {
        id: 'q10-3',
        level: 'Challenge',
        title: 'Open Graph Social Sharing Meta Block',
        prompt: 'Build a social-sharing meta configuration containing Open Graph tags: og:title ("CodeForge Platform"), og:description ("Interactive developer learning"), and og:type ("website").',
        requirements: [
          '<meta property="og:title" content="CodeForge Platform">',
          '<meta property="og:description" content="Interactive developer learning">',
          '<meta property="og:type" content="website">'
        ],
        starterCode: '<!-- Add Open Graph meta tags here -->\n',
        solutionCode:
`<meta property="og:title" content="CodeForge Platform">
<meta property="og:description" content="Interactive developer learning">
<meta property="og:type" content="website">`,
        expectedOutput: 'Valid Open Graph meta tags enabling social networks to generate rich link cards.',
        validate: (code) => {
        code = String(code || '');
          const errors = [];
          if (!/<meta[^>]*property=["']og:title["'][^>]*content=["']CodeForge\s+Platform["'][^>]*>/i.test(code) &&
              !/<meta[^>]*content=["']CodeForge\s+Platform["'][^>]*property=["']og:title["'][^>]*>/i.test(code)) {
            errors.push('Missing Open Graph og:title with "CodeForge Platform".');
          }
          if (!/<meta[^>]*property=["']og:description["'][^>]*content=["']Interactive\s+developer\s+learning["'][^>]*>/i.test(code) &&
              !/<meta[^>]*content=["']Interactive\s+developer\s+learning["'][^>]*property=["']og:description["'][^>]*>/i.test(code)) {
            errors.push('Missing Open Graph og:description.');
          }
          if (!/<meta[^>]*property=["']og:type["'][^>]*content=["']website["'][^>]*>/i.test(code) &&
              !/<meta[^>]*content=["']website["'][^>]*property=["']og:type["'][^>]*>/i.test(code)) {
            errors.push('Missing Open Graph og:type with "website".');
          }
          return { valid: errors.length === 0, errors };
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the purpose of <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
        options: [
          'It connects the webpage to a 3D virtual reality viewport',
          'It instructs mobile browsers to render the page at the device screen width, enabling responsive CSS media queries',
          'It sets the maximum download bandwidth for video streams',
          'It takes a screenshot of the user screen'
        ],
        correctIndex: 1,
        explanation: 'Without the viewport meta tag, mobile browsers assume a desktop width (typically 980px) and scale the page down, breaking mobile responsive layouts.'
      },
      {
        id: 2,
        question: 'Why should <meta charset="UTF-8"> be placed as the first child of <head>?',
        options: [
          'To ensure character encoding is resolved within the first 1024 bytes before the browser parses any text content',
          'Because HTML5 validators crash if it is anywhere else',
          'To load dark mode stylesheets automatically',
          'It is required by Google search bots'
        ],
        correctIndex: 0,
        explanation: 'The HTML5 specification recommends declaring the character encoding within the first 1024 bytes of the document so all following characters are parsed correctly.'
      },
      {
        id: 3,
        question: 'What do Open Graph (<meta property="og:...">) tags accomplish?',
        options: [
          'They allow browsers to render 3D WebGL graphics',
          'They control the preview title, description, and thumbnail image displayed when links are shared on social platforms like Discord and LinkedIn',
          'They automatically translate the page into multiple languages',
          'They compress HTML files for faster delivery'
        ],
        correctIndex: 1,
        explanation: 'Open Graph meta tags define structured metadata that platforms like Slack, Discord, Twitter/X, and LinkedIn read to generate rich interactive cards.'
      }
    ],
    video: {
      title: 'HTML Head Tag and Meta Tags Explained',
      channel: 'Web Dev Simplified',
      videoId: 'd_xV4gWv8c0',
      url: 'https://www.youtube.com/watch?v=d_xV4gWv8c0',
      description: 'Kyle explains everything that belongs inside the <head> tag: charset, viewport, SEO, social tags, and favicons.'
    }
  }
];

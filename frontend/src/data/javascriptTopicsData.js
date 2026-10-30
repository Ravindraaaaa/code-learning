/**
 * CodeForge - JavaScript Core & Modern ES6+ Curriculum Topics
 * 16 Comprehensive, Beginner-Friendly Topics with:
 * - Structured Notes: Concept, Syntax, Explanation, Code Example, Expected Output, Common Mistakes
 * - Interactive Try It Yourself live playground starters with real-time execution & console logger
 * - 3 Practice Questions per topic: Easy, Medium, and Challenge with automated validators
 * - Interactive Quiz with instant feedback and explanations
 * - Verified YouTube Educational Resources from trusted educators (Web Dev Simplified, Programming with Mosh, Dave Gray)
 */

export const JAVASCRIPT_TOPICS = [
  // =========================================================================
  // TOPIC 1: JavaScript Introduction
  // =========================================================================
  {
    id: 'js-topic-1',
    order: 1,
    slug: 'javascript-introduction',
    title: 'JavaScript Introduction',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Learn the foundations of JavaScript: the universal programming language of the web. Understand how JavaScript executes in browsers, the role of modern engines like V8, the call stack, and writing your first scripts.',
    notes: {
      concept:
        'JavaScript is a high-level, single-threaded, garbage-collected, dynamic scripting language. Originally created to make web pages interactive, it now powers modern client-side single page applications (SPAs), web servers (Node.js), and mobile applications. In web browsers, JavaScript interacts with HTML and CSS through the Document Object Model (DOM) and Browser Object Model (BOM).',
      syntax:
`// 1. In HTML documents:
<script src="main.js" defer></script>

// 2. Logging messages to the developer console:
console.log("Hello, World!");
console.warn("Deprecation warning");
console.error("Critical failure");`,
      explanation:
        '1. Single-Threaded: Executes one instruction at a time on the main execution thread.\n2. Just-In-Time (JIT) Compilation: Modern JavaScript engines (like Google Chrome\'s V8 and Firefox\'s SpiderMonkey) compile JavaScript bytecode into optimized machine code on the fly.\n3. Non-Blocking I/O: Heavy operations like timers, network requests, and user events are delegated to browser Web APIs and queued through the Event Loop.\n4. Scripts with "defer": Guarantees the HTML parser finishes constructing the DOM before the script executes, preventing blank screen rendering freezes.',
      codeExample:
`// A standard entry point script
const platformName = "CodeForge";
const activeStudents = 1250;

console.log("Platform initialized: " + platformName);
console.log("Current active engineers: " + activeStudents);`,
      expectedOutput:
        'Browser console logs two consecutive lines:\n"Platform initialized: CodeForge"\n"Current active engineers: 1250"',
      commonMistakes: [
        {
          mistake: 'Placing <script> tags in <head> without "defer" or "async".',
          correction: 'Always use <script src="..." defer></script> when placing scripts in the document head.',
          explanation: 'Without defer, the browser halts HTML parsing while downloading and executing the script, resulting in page load stalls and missing DOM elements.'
        },
        {
          mistake: 'Confusing JavaScript with Java.',
          correction: 'Treat JavaScript as an independent ECMAScript standard language completely unrelated to Java.',
          explanation: 'JavaScript was named "JavaScript" purely as a 1995 marketing move; its object prototype model and syntax are fundamentally different from Java.'
        },
        {
          mistake: 'Relying on synchronous alert() calls for debugging.',
          correction: 'Use console.log() or browser breakpoints instead of alert().',
          explanation: 'alert() blocks the browser UI execution thread completely, stopping event listeners, CSS animations, and network requests.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Write a JavaScript greeting script that defines a learner variable and logs a personalized welcome message to the console.',
      starterCode:
`// Welcome to CodeForge JavaScript Playground!
const learner = "Developer";
const track = "Web Engineering";

console.log("Welcome to " + track + ", " + learner + "!");
console.log("Ready to build scalable web applications.");`,
      solutionCode:
`const learner = "Developer";
const track = "Web Engineering";

console.log("Welcome to " + track + ", " + learner + "!");
console.log("Ready to build scalable web applications.");`
    },
    practiceQuestions: [
      {
        id: 'js-q1-1',
        level: 'Easy',
        title: 'Log a Welcome Message',
        prompt: 'Write a single console.log statement that outputs the exact string "Welcome to CodeForge".',
        requirements: [
          'Use console.log()',
          'Output the exact string "Welcome to CodeForge"'
        ],
        starterCode: '// Log your welcome message below\n',
        solutionCode: 'console.log("Welcome to CodeForge");',
        expectedOutput: '"Welcome to CodeForge"',
        validate: (code) => {
          code = String(code || '');
          if (!code.includes('console.log')) {
            return { valid: false, message: 'You must use console.log() to print the message.' };
          }
          if (!/Welcome to CodeForge/.test(code)) {
            return { valid: false, message: 'Your console.log must contain the exact string "Welcome to CodeForge".' };
          }
          return { valid: true, message: 'Awesome! Welcome message logged correctly.' };
        }
      },
      {
        id: 'js-q1-2',
        level: 'Medium',
        title: 'Declare Variables and Output Greeting',
        prompt: 'Declare a variable user with value "Alex" and variable role with value "Engineer". Log "Alex is a Engineer" using string concatenation or template literals.',
        requirements: [
          'Declare user = "Alex"',
          'Declare role = "Engineer"',
          'Log "Alex is a Engineer"'
        ],
        starterCode: '// Declare variables and output greeting\n',
        solutionCode: 'const user = "Alex";\nconst role = "Engineer";\nconsole.log(user + " is a " + role);',
        expectedOutput: '"Alex is a Engineer"',
        validate: (code) => {
          code = String(code || '');
          if (!/user\s*=\s*["']Alex["']/.test(code)) {
            return { valid: false, message: 'Declare variable user assigned to "Alex".' };
          }
          if (!/role\s*=\s*["']Engineer["']/.test(code)) {
            return { valid: false, message: 'Declare variable role assigned to "Engineer".' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Call console.log to output the combined string.' };
          }
          return { valid: true, message: 'Great job! Variables declared and concatenated properly.' };
        }
      },
      {
        id: 'js-q1-3',
        level: 'Challenge',
        title: 'Arithmetic Output in Log',
        prompt: 'Declare two numeric constants a = 15 and b = 25. Calculate their sum into a constant total and log "Total: 40".',
        requirements: [
          'Declare constant a with 15',
          'Declare constant b with 25',
          'Compute total = a + b',
          'Log "Total: 40"'
        ],
        starterCode: '// Compute sum and log total\n',
        solutionCode: 'const a = 15;\nconst b = 25;\nconst total = a + b;\nconsole.log("Total: " + total);',
        expectedOutput: '"Total: 40"',
        validate: (code) => {
          code = String(code || '');
          if (!/a\s*=\s*15/.test(code) || !/b\s*=\s*25/.test(code)) {
            return { valid: false, message: 'Declare constants a = 15 and b = 25.' };
          }
          if (!/total\s*=\s*a\s*\+\s*b/.test(code) && !/total\s*=\s*40/.test(code)) {
            return { valid: false, message: 'Assign total to the sum of a + b.' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log the final total.' };
          }
          return { valid: true, message: 'Outstanding! Arithmetic and output calculation verified.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Which HTML attribute ensures an external JavaScript file executes only after the entire DOM is parsed?',
        options: ['defer', 'async', 'rel="preload"', 'type="module" only'],
        correctIndex: 0,
        explanation: 'The defer attribute tells the browser to download the script in parallel and execute it strictly in document order after the DOM parsing is complete.'
      },
      {
        question: 'What kind of programming language is JavaScript in modern web execution?',
        options: [
          'Purely interpreted with zero compilation',
          'High-level, single-threaded, JIT-compiled with an event loop',
          'Statically-typed multi-threaded compiled language',
          'Assembly runtime dialect'
        ],
        correctIndex: 1,
        explanation: 'JavaScript is single-threaded and executes through an Event Loop using Just-In-Time (JIT) compilation in modern engines like V8.'
      },
      {
        question: 'Where can JavaScript code run today?',
        options: [
          'Only inside Google Chrome and Mozilla Firefox',
          'Only on backend servers with C++ bindings',
          'Both in modern web browsers and server-side runtimes like Node.js / Deno / Bun',
          'Only inside HTML <head> tags'
        ],
        correctIndex: 2,
        explanation: 'JavaScript runs in all web browsers as well as server-side runtimes like Node.js, Deno, and Bun.'
      }
    ],
    video: {
      title: 'JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour',
      channel: 'Programming with Mosh',
      videoId: 'W6NZfCO5SIk',
      url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      description: 'Mosh covers fundamental JavaScript syntax, data types, runtime execution, and writing your first scripts.'
    }
  },

  // =========================================================================
  // TOPIC 2: Variables (var, let, const)
  // =========================================================================
  {
    id: 'js-topic-2',
    order: 2,
    slug: 'variables',
    title: 'Variables (var, let, const)',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Master the three variable declaration keywords in JavaScript: var, let, and const. Learn block scoping, the Temporal Dead Zone (TDZ), re-assignment rules, and best practices for modern clean code.',
    notes: {
      concept:
        'Variables are named memory containers that store values. Modern JavaScript (ES6+) introduced "let" and "const" to replace the legacy "var" keyword. Using "const" guarantees a variable cannot be reassigned to a new primitive value, while "let" allows reassignment within its block scope. Neither let nor const can be hoisted for early access, preventing silent undefined bugs.',
      syntax:
`// 1. Const: Block-scoped, cannot be reassigned
const apiKey = "xyz-9874-live";

// 2. Let: Block-scoped, can be reassigned
let counter = 0;
counter = counter + 1;

// 3. Var: Legacy, function-scoped (AVOID in modern code)
var legacyScore = 100;`,
      explanation:
        '1. const: Default choice for all variables. Protects against accidental reassignment. Note: Object and Array contents can still be mutated.\n2. let: Use when a variable\'s value legitimately changes over time (e.g. loop counters, accumulation totals).\n3. Block Scope: Variables declared with let and const exist only inside the nearest curly braces {}.\n4. Temporal Dead Zone (TDZ): Accessing a let/const variable before its declaration line throws a ReferenceError instead of silently returning undefined.',
      codeExample:
`// Modern variable declarations
const maxRetries = 3;
let currentAttempt = 0;

function attemptConnection() {
  if (currentAttempt < maxRetries) {
    let attemptMsg = "Attempt #" + (currentAttempt + 1);
    console.log(attemptMsg);
    currentAttempt++;
  }
}

attemptConnection();`,
      expectedOutput:
        'Browser console logs:\n"Attempt #1"',
      commonMistakes: [
        {
          mistake: 'Using var in modern applications.',
          correction: 'Default to const, and use let only when reassignment is required.',
          explanation: 'var is function-scoped rather than block-scoped and hoists silently as undefined, causing treacherous bugs in loops and if blocks.'
        },
        {
          mistake: 'Attempting to reassign a const variable: const x = 10; x = 20;',
          correction: 'Use let if the identifier must point to a new value later: let x = 10; x = 20;',
          explanation: 'Reassigning a const identifier throws a fatal TypeError: Assignment to constant variable.'
        },
        {
          mistake: 'Assuming const makes arrays or objects immutable.',
          correction: 'Use Object.freeze() if you need deep immutability on an object.',
          explanation: 'const only freezes the reference binding, not the internal properties. const list = []; list.push("item"); is completely valid.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Experiment with block scoping: declare a const outside an if block, modify a let inside, and verify what values are logged.',
      starterCode:
`const appTitle = "CodeForge";
let loginAttempts = 0;

if (true) {
  const sessionToken = "token_abc123";
  loginAttempts++;
  console.log(appTitle + " session: " + sessionToken);
}

console.log("Total login attempts: " + loginAttempts);`,
      solutionCode:
`const appTitle = "CodeForge";
let loginAttempts = 0;

if (true) {
  const sessionToken = "token_abc123";
  loginAttempts++;
  console.log(appTitle + " session: " + sessionToken);
}

console.log("Total login attempts: " + loginAttempts);`
    },
    practiceQuestions: [
      {
        id: 'js-q2-1',
        level: 'Easy',
        title: 'Declare a Constant and Let Variable',
        prompt: 'Declare a constant PI with the value 3.14159 and a let variable radius with the value 5.',
        requirements: [
          'Use const to declare PI = 3.14159',
          'Use let to declare radius = 5'
        ],
        starterCode: '// Declare PI and radius below\n',
        solutionCode: 'const PI = 3.14159;\nlet radius = 5;',
        expectedOutput: 'PI and radius declared with proper scopes.',
        validate: (code) => {
          code = String(code || '');
          if (!/const\s+PI\s*=\s*3.14159/.test(code)) {
            return { valid: false, message: 'Declare const PI = 3.14159;' };
          }
          if (!/let\s+radius\s*=\s*5/.test(code)) {
            return { valid: false, message: 'Declare let radius = 5;' };
          }
          return { valid: true, message: 'Well done! const and let declared properly.' };
        }
      },
      {
        id: 'js-q2-2',
        level: 'Medium',
        title: 'Reassign a Let Variable',
        prompt: 'Declare a let variable score with 100. Then reassign score to 150 on the next line. Finally log score.',
        requirements: [
          'Declare let score = 100',
          'Reassign score = 150 (without re-declaring let)',
          'Log score'
        ],
        starterCode: '// Declare, reassign, and log\n',
        solutionCode: 'let score = 100;\nscore = 150;\nconsole.log(score);',
        expectedOutput: '150',
        validate: (code) => {
          code = String(code || '');
          if (!/let\s+score\s*=\s*100/.test(code)) {
            return { valid: false, message: 'Declare let score = 100;' };
          }
          if (!/score\s*=\s*150/.test(code)) {
            return { valid: false, message: 'Reassign score = 150;' };
          }
          if (/let\s+score\s*=\s*150/.test(code)) {
            return { valid: false, message: 'Do not re-declare score with let when reassigning.' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log score to the console.' };
          }
          return { valid: true, message: 'Great! Reassignment handled cleanly.' };
        }
      },
      {
        id: 'js-q2-3',
        level: 'Challenge',
        title: 'Block Scope Demonstration',
        prompt: 'Write an if (true) block. Inside it, declare a const secret = "top-secret". Then log secret inside the block.',
        requirements: [
          'Create an if (true) block',
          'Declare const secret = "top-secret" inside { }',
          'Call console.log(secret) inside the block'
        ],
        starterCode: '// Write block scope test\n',
        solutionCode: 'if (true) {\n  const secret = "top-secret";\n  console.log(secret);\n}',
        expectedOutput: '"top-secret"',
        validate: (code) => {
          code = String(code || '');
          if (!/if\s*\(\s*true\s*\)/.test(code)) {
            return { valid: false, message: 'Create an if (true) conditional block.' };
          }
          if (!/const\s+secret\s*=\s*["']top-secret["']/.test(code)) {
            return { valid: false, message: 'Declare const secret = "top-secret" inside the block.' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log secret inside the block.' };
          }
          return { valid: true, message: 'Awesome! Block scoping demonstrated correctly.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What happens if you try to reassign a variable declared with const?',
        options: [
          'JavaScript throws a TypeError: Assignment to constant variable',
          'It automatically converts the variable to let',
          'It reassigns the value silently with a warning',
          'It creates a new global variable with the same name'
        ],
        correctIndex: 0,
        explanation: 'A const binding is immutable; attempting to reassign it throws a runtime TypeError.'
      },
      {
        question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
        options: [
          'A memory leak that occurs when DOM nodes are not detached',
          'The zone between the start of a block and a let/const declaration where accessing the variable throws a ReferenceError',
          'The delay between setTimeout and execution',
          'The time when garbage collection pauses execution'
        ],
        correctIndex: 1,
        explanation: 'The TDZ is the period between entering scope and the actual let/const declaration. Accessing the variable in this zone throws a ReferenceError.'
      },
      {
        question: 'Why should modern developers avoid using var?',
        options: [
          'var was deprecated in ES6 and removed from all browsers',
          'var has function scope, ignores block boundaries { }, and hoists undefined, leading to subtle bugs',
          'var is significantly slower than let',
          'var cannot store strings or numbers'
        ],
        correctIndex: 1,
        explanation: 'var is function-scoped rather than block-scoped and hoists silently as undefined, causing scope leaks outside loops and conditionals.'
      }
    ],
    video: {
      title: 'Differences Between Var, Let, and Const',
      channel: 'Web Dev Simplified',
      videoId: 'gQqjd1fijw8',
      url: 'https://www.youtube.com/watch?v=gQqjd1fijw8',
      description: 'Kyle breaks down scoping, hoisting, reassignment, and why let and const are the standard.'
    }
  },

  // =========================================================================
  // TOPIC 3: Data Types (Primitives vs Objects)
  // =========================================================================
  {
    id: 'js-topic-3',
    order: 3,
    slug: 'data-types',
    title: 'Data Types (Primitives vs Objects)',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Understand the 7 primitive data types (string, number, boolean, null, undefined, symbol, bigint) versus reference types (Objects, Arrays, Functions). Learn typeof mechanics and reference-by-value vs reference-by-pointer.',
    notes: {
      concept:
        'JavaScript values belong to one of two categories: Primitives or Objects. Primitives are immutable and stored directly by value in the execution stack. Objects (including Arrays and Functions) are reference types stored in memory heap, where variables hold memory pointers rather than the values themselves.',
      syntax:
`// 7 Primitives:
const name = "Alice";          // string
const age = 28;                 // number (floats & integers)
const isEnrolled = true;        // boolean
const emptyState = null;        // null (intentional absence)
let unassigned;                 // undefined (declared without value)
const id = Symbol("userId");    // symbol (unique token)
const bigNum = 9007199254740991n;// bigint

// Reference Types:
const user = { name: "Alice" }; // Object
const tags = ["js", "web"];     // Array
const run = () => {};           // Function`,
      explanation:
        '1. typeof operator: Returns a string indicating the type: typeof "hello" === "string", typeof 42 === "number".\n2. typeof null quirk: Returns "object" due to an original 1995 JavaScript implementation bug preserved for backwards compatibility.\n3. Pass by Value vs Reference: Primitives are copied by value (modifying a copy leaves the original unchanged). Objects are copied by reference (modifying via one variable alters the same underlying heap object).',
      codeExample:
`// Primitive (Copy by value)
let scoreA = 100;
let scoreB = scoreA;
scoreB = 200;
console.log(scoreA); // 100 (Unchanged)

// Reference Type (Copy by reference pointer)
const itemA = { title: "Laptop" };
const itemB = itemA;
itemB.title = "Desktop";
console.log(itemA.title); // "Desktop" (Mutated!)`,
      expectedOutput:
        'Console logs:\n100\n"Desktop"',
      commonMistakes: [
        {
          mistake: 'Confusing null with undefined.',
          correction: 'Use undefined for uninitialized variables and null for intentional empty values.',
          explanation: 'undefined means a variable has been declared but not yet assigned; null represents an intentional, explicit assignment of "no value".'
        },
        {
          mistake: 'Expecting typeof null to equal "null".',
          correction: 'Check for null using value === null directly.',
          explanation: 'typeof null returns "object" because of a legacy 31-year-old C-level type tag bug.'
        },
        {
          mistake: 'Assuming two identical objects are equal: {} === {}.',
          correction: 'Compare object properties or serialize to JSON for deep value equality.',
          explanation: '{} === {} evaluates to false because JavaScript compares reference memory addresses, not property contents.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Check the types of various variables using typeof and inspect the output in the live console.',
      starterCode:
`console.log(typeof "CodeForge"); // string
console.log(typeof 42);          // number
console.log(typeof true);        // boolean
console.log(typeof undefined);   // undefined
console.log(typeof null);        // object (historical quirk!)
console.log(typeof [1, 2, 3]);   // object`,
      solutionCode:
`console.log(typeof "CodeForge");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof [1, 2, 3]);`
    },
    practiceQuestions: [
      {
        id: 'js-q3-1',
        level: 'Easy',
        title: 'Check Types with typeof',
        prompt: 'Declare a string variable greeting = "Hello" and log typeof greeting.',
        requirements: [
          'Declare greeting = "Hello"',
          'Log typeof greeting'
        ],
        starterCode: '// Check greeting type\n',
        solutionCode: 'const greeting = "Hello";\nconsole.log(typeof greeting);',
        expectedOutput: '"string"',
        validate: (code) => {
          code = String(code || '');
          if (!/greeting\s*=\s*["']Hello["']/.test(code)) {
            return { valid: false, message: 'Declare greeting = "Hello".' };
          }
          if (!/typeof\s+greeting/.test(code)) {
            return { valid: false, message: 'Use typeof greeting inside console.log.' };
          }
          return { valid: true, message: 'Correct! typeof evaluates primitive types cleanly.' };
        }
      },
      {
        id: 'js-q3-2',
        level: 'Medium',
        title: 'Inspect Array and Object Types',
        prompt: 'Declare an array numbers = [1, 2, 3] and an object person = { name: "Sam" }. Log Array.isArray(numbers) to verify array status.',
        requirements: [
          'Declare numbers = [1, 2, 3]',
          'Declare person = { name: "Sam" }',
          'Log Array.isArray(numbers)'
        ],
        starterCode: '// Inspect types\n',
        solutionCode: 'const numbers = [1, 2, 3];\nconst person = { name: "Sam" };\nconsole.log(Array.isArray(numbers));',
        expectedOutput: 'true',
        validate: (code) => {
          code = String(code || '');
          if (!/numbers\s*=\s*\[1,\s*2,\s*3\]/.test(code)) {
            return { valid: false, message: 'Declare numbers = [1, 2, 3];' };
          }
          if (!/Array\.isArray\(\s*numbers\s*\)/.test(code)) {
            return { valid: false, message: 'Call Array.isArray(numbers) to accurately test for arrays.' };
          }
          return { valid: true, message: 'Excellent! Array.isArray is the official way to check arrays.' };
        }
      },
      {
        id: 'js-q3-3',
        level: 'Challenge',
        title: 'Reference Pointer Mutation',
        prompt: 'Declare an object original = { count: 1 }. Assign reference copy = original. Update copy.count = 5. Log original.count to prove reference sharing.',
        requirements: [
          'Declare const original = { count: 1 }',
          'Assign const copy = original',
          'Mutate copy.count = 5',
          'Log original.count'
        ],
        starterCode: '// Demonstrate reference mutation\n',
        solutionCode: 'const original = { count: 1 };\nconst copy = original;\ncopy.count = 5;\nconsole.log(original.count);',
        expectedOutput: '5',
        validate: (code) => {
          code = String(code || '');
          if (!/original\s*=\s*\{\s*count:\s*1\s*\}/.test(code)) {
            return { valid: false, message: 'Declare original = { count: 1 };' };
          }
          if (!/copy\s*=\s*original/.test(code)) {
            return { valid: false, message: 'Assign copy = original;' };
          }
          if (!/copy\.count\s*=\s*5/.test(code)) {
            return { valid: false, message: 'Mutate copy.count = 5;' };
          }
          if (!code.includes('console.log(original.count)')) {
            return { valid: false, message: 'Log original.count.' };
          }
          return { valid: true, message: 'Brilliant! You demonstrated reference mutability in JavaScript objects.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What does typeof null evaluate to in JavaScript?',
        options: ['"null"', '"object"', '"undefined"', '"primitive"'],
        correctIndex: 1,
        explanation: 'Due to a historical bug in the first JS engine, typeof null returns "object", which is preserved for web backward compatibility.'
      },
      {
        question: 'Which of the following is NOT a JavaScript primitive data type?',
        options: ['boolean', 'symbol', 'Array', 'bigint'],
        correctIndex: 2,
        explanation: 'Array is a specialized Object reference type, not a primitive.'
      },
      {
        question: 'How should you accurately check if a variable list is an Array?',
        options: [
          'typeof list === "array"',
          'Array.isArray(list)',
          'list.type === "Array"',
          'list instanceof String'
        ],
        correctIndex: 1,
        explanation: 'Array.isArray(list) accurately detects arrays across window/iframe boundaries.'
      }
    ],
    video: {
      title: 'JavaScript Reference vs Value (Primitives vs Objects)',
      channel: 'Web Dev Simplified',
      videoId: '93v_MKxBRu0',
      url: 'https://www.youtube.com/watch?v=93v_MKxBRu0',
      description: 'Understand how primitives copy by value while objects and arrays copy by reference memory address.'
    }
  },

  // =========================================================================
  // TOPIC 4: Operators
  // =========================================================================
  {
    id: 'js-topic-4',
    order: 4,
    slug: 'operators',
    title: 'Operators & Expressions',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Master JavaScript operators: Arithmetic (+, -, *, /, %, **), Strict Equality (=== vs ==), Logical (&&, ||, !), Ternary (? :), Nullish Coalescing (??), and Optional Chaining (?. ).',
    notes: {
      concept:
        'Operators perform operations on operands to produce values. JavaScript distinguishes between strict equality (===) which checks both value and type without coercion, and loose equality (==) which performs type coercion. Modern ECMAScript also includes the Nullish Coalescing operator (??) and Optional Chaining (?.) for safe property access.',
      syntax:
`// 1. Strict Equality (Always prefer === over ==)
5 === "5"; // false (different types)
5 == "5";  // true (type coercion)

// 2. Ternary Operator (condition ? truthy : falsy)
const role = isAdmin ? "Administrator" : "Student";

// 3. Nullish Coalescing (fallback for null/undefined ONLY)
const timeout = config.timeout ?? 5000;

// 4. Optional Chaining (safe navigation)
const street = user?.address?.street;`,
      explanation:
        '1. Strict Equality (===): Never converts types implicitly. Always use === and !==.\n2. Logical Operators: && returns the first falsy operand or the last truthy operand; || returns the first truthy operand or the last falsy operand.\n3. Nullish Coalescing (??): Unlike ||, ?? treats 0, false, and "" as valid values, only falling back if the left operand is strictly null or undefined.\n4. Optional Chaining (?.): Short-circuits and returns undefined if the object before ?. is nullish, preventing "Cannot read properties of undefined" exceptions.',
      codeExample:
`// Modern operators in real application logic
const userSettings = {
  theme: "dark",
  volume: 0 // 0 is a valid volume setting!
};

// With || (BUG: 0 is falsy, defaults to 50!)
const volumeBug = userSettings.volume || 50;

// With ?? (CORRECT: 0 is preserved!)
const volumeCorrect = userSettings.volume ?? 50;

console.log("Bug volume: " + volumeBug);         // 50
console.log("Correct volume: " + volumeCorrect); // 0`,
      expectedOutput:
        'Console logs:\n"Bug volume: 50"\n"Correct volume: 0"',
      commonMistakes: [
        {
          mistake: 'Using loose equality == instead of strict equality ===.',
          correction: 'Always use === and !==.',
          explanation: 'Loose equality performs unpredictable type coercion (e.g., "" == 0 is true, false == "0" is true).'
        },
        {
          mistake: 'Using || for default values when 0 or empty string are valid.',
          correction: 'Use the nullish coalescing operator ?? instead of ||.',
          explanation: 'Logical OR treats 0, "", and false as falsy and triggers the fallback. ?? only falls back on null and undefined.'
        },
        {
          mistake: 'Writing deeply nested ternary operators.',
          correction: 'Limit ternary operators to single binary choices; use if/else or switch for multiple branches.',
          explanation: 'Nested ternaries (a ? b : c ? d : e) create severe readability issues.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Compare loose equality vs strict equality and test the nullish coalescing operator in the interactive sandbox.',
      starterCode:
`console.log(5 === "5"); // false
console.log(5 == "5");  // true (coercion)

const userAge = 0;
console.log(userAge || 18); // 18 (bug!)
console.log(userAge ?? 18); // 0 (correct!)`,
      solutionCode:
`console.log(5 === "5");
console.log(5 == "5");

const userAge = 0;
console.log(userAge || 18);
console.log(userAge ?? 18);`
    },
    practiceQuestions: [
      {
        id: 'js-q4-1',
        level: 'Easy',
        title: 'Use Strict Equality',
        prompt: 'Declare const a = 10 and const b = "10". Log whether a === b is true or false.',
        requirements: [
          'Declare const a = 10',
          'Declare const b = "10"',
          'Log a === b'
        ],
        starterCode: '// Check strict equality\n',
        solutionCode: 'const a = 10;\nconst b = "10";\nconsole.log(a === b);',
        expectedOutput: 'false',
        validate: (code) => {
          code = String(code || '');
          if (!/a\s*=\s*10/.test(code) || !/b\s*=\s*["']10["']/.test(code)) {
            return { valid: false, message: 'Declare a = 10 and b = "10".' };
          }
          if (!/a\s*===\s*b/.test(code)) {
            return { valid: false, message: 'Use the strict equality operator ===.' };
          }
          return { valid: true, message: 'Correct! Strict equality evaluates both type and value.' };
        }
      },
      {
        id: 'js-q4-2',
        level: 'Medium',
        title: 'Ternary Operator Assignment',
        prompt: 'Declare const score = 85. Use a ternary operator to assign const result = score >= 50 ? "Pass" : "Fail". Log result.',
        requirements: [
          'Declare const score = 85',
          'Use ternary operator to assign result',
          'Log result'
        ],
        starterCode: '// Write ternary assignment\n',
        solutionCode: 'const score = 85;\nconst result = score >= 50 ? "Pass" : "Fail";\nconsole.log(result);',
        expectedOutput: '"Pass"',
        validate: (code) => {
          code = String(code || '');
          if (!/score\s*=\s*85/.test(code)) {
            return { valid: false, message: 'Declare score = 85;' };
          }
          if (!code.includes('?') || !/Pass/.test(code) || !/Fail/.test(code)) {
            return { valid: false, message: 'Use the ternary operator condition ? "Pass" : "Fail".' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log result.' };
          }
          return { valid: true, message: 'Great job! Ternary operator correctly configured.' };
        }
      },
      {
        id: 'js-q4-3',
        level: 'Challenge',
        title: 'Nullish Coalescing Fallback',
        prompt: 'Declare let port = null. Assign const activePort = port ?? 3000. Then log activePort.',
        requirements: [
          'Declare let port = null',
          'Assign const activePort = port ?? 3000',
          'Log activePort'
        ],
        starterCode: '// Set up nullish coalescing\n',
        solutionCode: 'let port = null;\nconst activePort = port ?? 3000;\nconsole.log(activePort);',
        expectedOutput: '3000',
        validate: (code) => {
          code = String(code || '');
          if (!/port\s*=\s*null/.test(code)) {
            return { valid: false, message: 'Declare let port = null;' };
          }
          if (!/port\s*\?\?\s*3000/.test(code)) {
            return { valid: false, message: 'Use the ?? operator with fallback 3000.' };
          }
          return { valid: true, message: 'Outstanding! Nullish coalescing provides robust default fallbacks.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What is the key difference between || and ?? in JavaScript?',
        options: [
          '|| checks only booleans, ?? checks strings',
          '|| triggers fallback on any falsy value (0, "", false, null, undefined); ?? triggers only on null or undefined',
          '?? is slower and deprecated in ES2022',
          '|| cannot be used with variables'
        ],
        correctIndex: 1,
        explanation: 'Nullish coalescing (??) only falls back when the left operand is strictly null or undefined, preserving valid falsy values like 0 or empty strings.'
      },
      {
        question: 'What does optional chaining user?.profile?.avatar do if user.profile is null?',
        options: [
          'Throws a fatal TypeError: Cannot read properties of null',
          'Short-circuits immediately and evaluates to undefined without throwing an error',
          'Creates an empty profile object automatically',
          'Returns false'
        ],
        correctIndex: 1,
        explanation: 'Optional chaining (?.) safely returns undefined as soon as any node in the chain is nullish.'
      },
      {
        question: 'Why is 0 == false true, but 0 === false false?',
        options: [
          '== performs type coercion converting false to number 0; === checks both value and type without coercion',
          '=== is only for strings',
          '0 is not a valid number in JavaScript',
          '== is faster than ==='
        ],
        correctIndex: 0,
        explanation: 'Loose equality converts types before comparing, whereas strict equality checks both type and value.'
      }
    ],
    video: {
      title: 'Learn Ternary Operators In 9 Minutes & Logical Short-Circuiting',
      channel: 'Web Dev Simplified',
      videoId: 'n6VOjtwnk0o',
      url: 'https://www.youtube.com/watch?v=n6VOjtwnk0o',
      description: 'Kyle explains the ternary operator, short-circuit evaluation, and avoiding messy condition nesting.'
    }
  },

  // =========================================================================
  // TOPIC 5: Conditions (if, else if, switch)
  // =========================================================================
  {
    id: 'js-topic-5',
    order: 5,
    slug: 'conditions',
    title: 'Conditions (if, else if, switch)',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Control program flow using if, else if, else, switch-case, and guard clauses. Understand truthy/falsy evaluation and clean code architecture without "pyramid of doom" nesting.',
    notes: {
      concept:
        'Conditional statements execute different blocks of code based on boolean expressions. In JavaScript, values are automatically coerced to booleans in conditions. Six values are falsy: false, 0, -0, "", null, undefined, and NaN. All other values (including empty arrays [] and empty objects {}) are truthy.',
      syntax:
`// 1. If / Else If / Else
if (score >= 90) {
  grade = "A";
} else if (score >= 75) {
  grade = "B";
} else {
  grade = "C";
}

// 2. Switch Statement (matches strict equality ===)
switch (action) {
  case "START":
    run();
    break;
  case "STOP":
    halt();
    break;
  default:
    idle();
}`,
      explanation:
        '1. Truthy/Falsy: Be aware that [] and {} are truthy. if ([]) executes the block!\n2. Switch Case: Always include break statements unless you intentionally want "fall-through" behavior.\n3. Guard Clauses: Return early from functions to eliminate deep else nesting: if (!user) return; doAction();',
      codeExample:
`// Clean early return guard clauses vs nested else
function getAccessStatus(role) {
  if (!role) return "No role specified";
  if (role === "admin") return "Full Access Granted";
  if (role === "editor") return "Edit Access Granted";
  return "Read Only Access";
}

console.log(getAccessStatus("admin"));
console.log(getAccessStatus("guest"));`,
      expectedOutput:
        'Console logs:\n"Full Access Granted"\n"Read Only Access"',
      commonMistakes: [
        {
          mistake: 'Forgetting the break statement in a switch case.',
          correction: 'Always terminate each case with break unless intentionally falling through.',
          explanation: 'Without break, execution continues into all subsequent cases regardless of whether their condition matches.'
        },
        {
          mistake: 'Checking if an array is empty with if (myArray): if ([]) { ... }',
          correction: 'Check array length: if (myArray.length === 0) { ... }',
          explanation: 'All objects and arrays in JavaScript are truthy, even empty ones like [].'
        },
        {
          mistake: 'Nesting 5+ levels of if/else statements (Pyramid of Doom).',
          correction: 'Invert conditions and return early using guard clauses.',
          explanation: 'Deep nesting increases mental overhead and makes testing and debugging error-prone.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Test truthy and falsy values and observe how switch statements execute in real time.',
      starterCode:
`const status = "active";

switch (status) {
  case "active":
    console.log("Account is in good standing.");
    break;
  case "suspended":
    console.log("Account suspended.");
    break;
  default:
    console.log("Unknown status.");
}`,
      solutionCode:
`const status = "active";

switch (status) {
  case "active":
    console.log("Account is in good standing.");
    break;
  case "suspended":
    console.log("Account suspended.");
    break;
  default:
    console.log("Unknown status.");
}`
    },
    practiceQuestions: [
      {
        id: 'js-q5-1',
        level: 'Easy',
        title: 'Basic If-Else Statement',
        prompt: 'Declare const age = 20. If age is 18 or greater, log "Eligible", otherwise log "Not Eligible".',
        requirements: [
          'Declare const age = 20',
          'Use if (age >= 18) to log "Eligible"',
          'Use else to log "Not Eligible"'
        ],
        starterCode: '// Check eligibility\n',
        solutionCode: 'const age = 20;\nif (age >= 18) {\n  console.log("Eligible");\n} else {\n  console.log("Not Eligible");\n}',
        expectedOutput: '"Eligible"',
        validate: (code) => {
          code = String(code || '');
          if (!/age\s*=\s*20/.test(code)) {
            return { valid: false, message: 'Declare age = 20;' };
          }
          if (!/if\s*\(\s*age\s*>=\s*18\s*\)/.test(code)) {
            return { valid: false, message: 'Use if (age >= 18).' };
          }
          return { valid: true, message: 'Correct! Basic condition evaluated properly.' };
        }
      },
      {
        id: 'js-q5-2',
        level: 'Medium',
        title: 'Switch Statement Day Matcher',
        prompt: 'Declare const day = "Fri". Use a switch statement to log "Weekend Soon" for "Fri", and "Weekday" for default.',
        requirements: [
          'Declare const day = "Fri"',
          'Use switch (day) with case "Fri": log "Weekend Soon"; break;',
          'Use default: log "Weekday";'
        ],
        starterCode: '// Write switch statement\n',
        solutionCode: 'const day = "Fri";\nswitch (day) {\n  case "Fri":\n    console.log("Weekend Soon");\n    break;\n  default:\n    console.log("Weekday");\n}',
        expectedOutput: '"Weekend Soon"',
        validate: (code) => {
          code = String(code || '');
          if (!/switch\s*\(\s*day\s*\)/.test(code)) {
            return { valid: false, message: 'Implement switch (day).' };
          }
          if (!/case\s*["']Fri["']\s*:/.test(code)) {
            return { valid: false, message: 'Include case "Fri":' };
          }
          if (!code.includes('break')) {
            return { valid: false, message: 'Remember the break statement.' };
          }
          return { valid: true, message: 'Great job! Switch statement executed with proper breaks.' };
        }
      },
      {
        id: 'js-q5-3',
        level: 'Challenge',
        title: 'Guard Clause Early Return Function',
        prompt: 'Create a function validateUser(user) that returns "Invalid" if !user, returns "Admin" if user.role === "admin", and returns "Member" otherwise.',
        requirements: [
          'Define function validateUser(user)',
          'Use if (!user) return "Invalid";',
          'Use if (user.role === "admin") return "Admin";',
          'Return "Member" at the end'
        ],
        starterCode: '// Write guard clause function\n',
        solutionCode: 'function validateUser(user) {\n  if (!user) return "Invalid";\n  if (user.role === "admin") return "Admin";\n  return "Member";\n}',
        expectedOutput: 'Clean function without else statements.',
        validate: (code) => {
          code = String(code || '');
          if (!/function\s+validateUser/.test(code)) {
            return { valid: false, message: 'Define function validateUser(user).' };
          }
          if (!/if\s*\(!user\)\s*return\s*["']Invalid["']/.test(code)) {
            return { valid: false, message: 'Use guard clause: if (!user) return "Invalid";' };
          }
          return { valid: true, message: 'Outstanding! Guard clauses keep your control flow flat and readable.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Which of the following values is TRUTHY in JavaScript?',
        options: ['"" (empty string)', '0', '[] (empty array)', 'null'],
        correctIndex: 2,
        explanation: 'All objects and arrays (including empty ones like [] and {}) are truthy in JavaScript.'
      },
      {
        question: 'What is a "guard clause" in programming?',
        options: [
          'A firewall security header',
          'An early return statement checking for invalid conditions upfront to prevent nested else blocks',
          'A CSS media query protecting screen widths',
          'A loop counter limiter'
        ],
        correctIndex: 1,
        explanation: 'Guard clauses handle invalid or edge cases immediately at the top of a function, keeping the primary logic unindented.'
      },
      {
        question: 'What happens in a switch statement if you omit the break keyword?',
        options: [
          'The code throws a SyntaxError',
          'Execution falls through to the next case automatically, regardless of condition match',
          'The browser pauses execution',
          'It re-evaluates the condition'
        ],
        correctIndex: 1,
        explanation: 'Omitting break causes "fall-through", executing subsequent case statements unconditionally until a break or the end of the switch is reached.'
      }
    ],
    video: {
      title: 'Why I Don\'t Use Else When Programming & Clean Conditionals',
      channel: 'Web Dev Simplified',
      videoId: 'EumXak7TyQ0',
      url: 'https://www.youtube.com/watch?v=EumXak7TyQ0',
      description: 'Kyle explains why guard clauses and early returns produce flatter, cleaner, and more maintainable code.'
    }
  },

  // =========================================================================
  // TOPIC 6: Loops (for, while, for...of, for...in)
  // =========================================================================
  {
    id: 'js-topic-6',
    order: 6,
    slug: 'loops',
    title: 'Loops & Iteration',
    difficulty: 'Beginner',
    estimatedTime: '20 min',
    summary:
      'Iterate over sequences and collections using for, while, do...while, for...of, and for...in. Understand iteration efficiency, break/continue statements, and avoiding infinite loops.',
    notes: {
      concept:
        'Loops repeat a block of code as long as a specified condition evaluates to true. Modern JavaScript offers traditional counting loops (for, while) alongside modern iterable loops (for...of for arrays/iterables, and for...in for object property keys).',
      syntax:
`// 1. Traditional counting for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// 2. while loop
let count = 0;
while (count < 3) {
  count++;
}

// 3. for...of (Best for Arrays and Iterables)
for (const item of ["HTML", "CSS", "JS"]) {
  console.log(item);
}

// 4. for...in (Iterates over Object Keys)
for (const key in { a: 1, b: 2 }) {
  console.log(key);
}`,
      explanation:
        '1. for (init; condition; increment): Best when the number of iterations is known in advance.\n2. while (condition): Best when looping until an external condition changes.\n3. for...of: Modern ES6 syntax for iterating directly over values of arrays, strings, sets, and maps.\n4. break & continue: break exits the loop immediately; continue skips to the next iteration.',
      codeExample:
`// Filtering and summing with a loop
const numbers = [10, 25, 30, 45, 50];
let totalOver20 = 0;

for (const num of numbers) {
  if (num <= 20) continue; // Skip numbers 20 or below
  totalOver20 += num;
}

console.log("Total over 20: " + totalOver20);`,
      expectedOutput:
        'Console logs:\n"Total over 20: 150"',
      commonMistakes: [
        {
          mistake: 'Using for...in to iterate over array items.',
          correction: 'Use for...of for arrays, and reserve for...in strictly for object keys.',
          explanation: 'for...in iterates over index property keys as strings and may enumerate prototype properties in arbitrary order.'
        },
        {
          mistake: 'Creating infinite loops by forgetting the increment step in a while loop: while (i < 5) { ... }',
          correction: 'Always ensure the loop variable is incremented towards the termination condition: i++;',
          explanation: 'An infinite loop blocks the browser event loop completely, causing the tab or browser to freeze.'
        },
        {
          mistake: 'Using "const i = 0" in a traditional counting for loop: for (const i = 0; i < 5; i++)',
          correction: 'Use let: for (let i = 0; i < 5; i++)',
          explanation: 'The loop counter i is reassigned on every iteration via i++, which throws a TypeError if declared with const.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Use a for...of loop to iterate through a list of technologies and print each one to the live console.',
      starterCode:
`const techStack = ["React", "TypeScript", "Node.js", "MongoDB"];

for (const tech of techStack) {
  console.log("Technology: " + tech);
}`,
      solutionCode:
`const techStack = ["React", "TypeScript", "Node.js", "MongoDB"];

for (const tech of techStack) {
  console.log("Technology: " + tech);
}`
    },
    practiceQuestions: [
      {
        id: 'js-q6-1',
        level: 'Easy',
        title: 'Count from 1 to 5',
        prompt: 'Write a for loop using let i = 1 that logs each number from 1 to 5 inclusive.',
        requirements: [
          'Use for (let i = 1; i <= 5; i++)',
          'Call console.log(i) inside the loop'
        ],
        starterCode: '// Write counting loop\n',
        solutionCode: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
        expectedOutput: '1, 2, 3, 4, 5 logged to console.',
        validate: (code) => {
          code = String(code || '');
          if (!/for\s*\(\s*let\s+i\s*=\s*1;\s*i\s*<=\s*5;\s*i\+\+\s*\)/.test(code)) {
            return { valid: false, message: 'Use for (let i = 1; i <= 5; i++).' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log i inside the loop.' };
          }
          return { valid: true, message: 'Great! Counting loop executed accurately.' };
        }
      },
      {
        id: 'js-q6-2',
        level: 'Medium',
        title: 'Iterate Array with for...of',
        prompt: 'Declare const fruits = ["Apple", "Banana", "Cherry"]. Use a for...of loop to log each fruit name.',
        requirements: [
          'Declare const fruits = ["Apple", "Banana", "Cherry"]',
          'Use for (const fruit of fruits)',
          'Log fruit'
        ],
        starterCode: '// Iterate fruits array\n',
        solutionCode: 'const fruits = ["Apple", "Banana", "Cherry"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}',
        expectedOutput: '"Apple", "Banana", "Cherry"',
        validate: (code) => {
          code = String(code || '');
          if (!/fruits\s*=\s*\[/.test(code)) {
            return { valid: false, message: 'Declare fruits array.' };
          }
          if (!/for\s*\(\s*(const|let)\s+\w+\s+of\s+fruits\s*\)/.test(code)) {
            return { valid: false, message: 'Use a for...of loop over fruits.' };
          }
          return { valid: true, message: 'Well done! for...of is the cleanest way to iterate array values.' };
        }
      },
      {
        id: 'js-q6-3',
        level: 'Challenge',
        title: 'While Loop Accumulator',
        prompt: 'Use a while loop to compute the sum of numbers from 1 to 10 into a let variable total. Log total (which equals 55).',
        requirements: [
          'Declare let total = 0 and let n = 1',
          'Use while (n <= 10) to add n to total and increment n',
          'Log total after the loop'
        ],
        starterCode: '// Compute sum 1..10 with while loop\n',
        solutionCode: 'let total = 0;\nlet n = 1;\nwhile (n <= 10) {\n  total += n;\n  n++;\n}\nconsole.log(total);',
        expectedOutput: '55',
        validate: (code) => {
          code = String(code || '');
          if (!/while\s*\(\s*n\s*<=\s*10\s*\)/.test(code)) {
            return { valid: false, message: 'Use while (n <= 10).' };
          }
          if (!/total\s*\+=\s*n/.test(code) && !/total\s*=\s*total\s*\+\s*n/.test(code)) {
            return { valid: false, message: 'Add n to total inside the loop.' };
          }
          if (!/n\+\+/.test(code) && !/n\s*\+=\s*1/.test(code)) {
            return { valid: false, message: 'Increment n inside the loop to avoid infinite execution.' };
          }
          return { valid: true, message: 'Outstanding! While loop accumulator calculated 55.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Which loop syntax should you use to iterate directly over the values of an Array in modern JavaScript?',
        options: ['for...in', 'for...of', 'loop(array)', 'repeat...until'],
        correctIndex: 1,
        explanation: 'for...of iterates directly over values of iterables (Arrays, Strings, Maps, Sets).'
      },
      {
        question: 'What is the purpose of the continue statement inside a loop?',
        options: [
          'Exits the loop entirely',
          'Skips the rest of the current iteration and jumps to the next one',
          'Restarts the loop from index 0',
          'Pauses execution for 1000ms'
        ],
        correctIndex: 1,
        explanation: 'continue skips any remaining code in the current iteration and immediately begins the next iteration.'
      },
      {
        question: 'Why does for (const i = 0; i < 3; i++) throw a TypeError?',
        options: [
          'const cannot be used inside functions',
          'The loop increment i++ attempts to reassign the constant variable i on subsequent iterations',
          'JavaScript requires var in all loop headers',
          'i is a reserved keyword'
        ],
        correctIndex: 1,
        explanation: 'The loop counter must be updated via i++, which is a reassignment operation prohibited on const variables.'
      }
    ],
    video: {
      title: 'JavaScript Full Course: Chapter on Loops, For, While & Iteration',
      channel: 'Dave Gray',
      videoId: '1CmQiNiLSj8',
      url: 'https://www.youtube.com/watch?v=1CmQiNiLSj8',
      description: 'Dave Gray breaks down while, do-while, for loops, break/continue statements, and iteration patterns.'
    }
  },

  // =========================================================================
  // TOPIC 7: Functions (Declarations, Arrow Functions, Defaults)
  // =========================================================================
  {
    id: 'js-topic-7',
    order: 7,
    slug: 'functions',
    title: 'Functions & Arrow Functions',
    difficulty: 'Beginner',
    estimatedTime: '20 min',
    summary:
      'Master function declarations, function expressions, ES6 arrow functions, default parameters, rest parameters (...args), return values, and lexical this binding.',
    notes: {
      concept:
        'Functions are reusable blocks of code that accept inputs (parameters), perform computations, and return outputs. In JavaScript, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments to other functions, and returned from functions.',
      syntax:
`// 1. Function Declaration (Hoisted)
function add(a, b) {
  return a + b;
}

// 2. Function Expression (Not hoisted)
const multiply = function(a, b) {
  return a * b;
};

// 3. Arrow Function (Concise, lexical 'this')
const divide = (a, b) => a / b;

// 4. Default Parameters
const greet = (name = "Engineer") => "Hello, " + name;`,
      explanation:
        '1. Declarations vs Arrow Functions: Function declarations are hoisted to the top of their scope. Arrow functions are expressions and are not hoisted.\n2. Implicit Return: Arrow functions with a single expression automatically return that expression\'s value without needing the return keyword or curly braces: (x) => x * 2.\n3. Lexical "this": Arrow functions do not bind their own "this"; they inherit "this" from the enclosing execution context, making them ideal for callbacks and event handlers.',
      codeExample:
`// Practical Arrow functions and default parameters
const calculateTax = (amount, rate = 0.08) => {
  return Number((amount * rate).toFixed(2));
};

console.log("Tax on $100: $" + calculateTax(100));
console.log("Tax on $100 with 15% rate: $" + calculateTax(100, 0.15));`,
      expectedOutput:
        'Console logs:\n"Tax on $100: $8"\n"Tax on $100 with 15% rate: $15"',
      commonMistakes: [
        {
          mistake: 'Using curly braces in an arrow function without the return keyword: const fn = () => { "hello" };',
          correction: 'Either omit curly braces: () => "hello", or include explicit return: () => { return "hello"; }',
          explanation: 'When curly braces {} are used, JavaScript treats them as a function block body, returning undefined unless return is explicitly called.'
        },
        {
          mistake: 'Returning an object literal from an arrow function without parentheses: () => { name: "Alex" }',
          correction: 'Wrap the object in parentheses: () => ({ name: "Alex" })',
          explanation: 'Without parentheses, the engine interprets the curly braces as a block body rather than an object literal.'
        },
        {
          mistake: 'Using arrow functions as object methods when relying on this.',
          correction: 'Use standard function shorthand for object methods: { getName() { return this.name; } }',
          explanation: 'Arrow functions inherit this lexically, so this.name inside an arrow function method refers to the global window/undefined.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Write an arrow function formatPrice that takes an amount and currency (defaulting to "$") and returns the formatted string.',
      starterCode:
`const formatPrice = (amount, currency = "$") => {
  return currency + amount.toFixed(2);
};

console.log(formatPrice(19.99));
console.log(formatPrice(50, "€"));`,
      solutionCode:
`const formatPrice = (amount, currency = "$") => {
  return currency + amount.toFixed(2);
};

console.log(formatPrice(19.99));
console.log(formatPrice(50, "€"));`
    },
    practiceQuestions: [
      {
        id: 'js-q7-1',
        level: 'Easy',
        title: 'Define an Add Function',
        prompt: 'Create a function add(a, b) that returns the sum of a and b. Log add(7, 3).',
        requirements: [
          'Define function add(a, b) or const add = (a, b) => a + b',
          'Return a + b',
          'Log add(7, 3)'
        ],
        starterCode: '// Define add function\n',
        solutionCode: 'const add = (a, b) => a + b;\nconsole.log(add(7, 3));',
        expectedOutput: '10',
        validate: (code) => {
          code = String(code || '');
          if (!/add.*[ab]/.test(code)) {
            return { valid: false, message: 'Define function add with parameters a and b.' };
          }
          if (!code.includes('add(7, 3)')) {
            return { valid: false, message: 'Call add(7, 3) inside console.log.' };
          }
          return { valid: true, message: 'Great! Addition function defined and tested.' };
        }
      },
      {
        id: 'js-q7-2',
        level: 'Medium',
        title: 'Arrow Function with Default Parameter',
        prompt: 'Create an arrow function greet(name = "Guest") that returns "Hello, " + name. Log greet() with no arguments.',
        requirements: [
          'Create const greet = (name = "Guest") => ...',
          'Log greet()'
        ],
        starterCode: '// Define greet arrow function\n',
        solutionCode: 'const greet = (name = "Guest") => "Hello, " + name;\nconsole.log(greet());',
        expectedOutput: '"Hello, Guest"',
        validate: (code) => {
          code = String(code || '');
          if (!/name\s*=\s*["']Guest["']/.test(code)) {
            return { valid: false, message: 'Set default parameter name = "Guest".' };
          }
          if (!code.includes('greet()')) {
            return { valid: false, message: 'Call greet() without arguments.' };
          }
          return { valid: true, message: 'Well done! Default parameters eliminate undefined arguments.' };
        }
      },
      {
        id: 'js-q7-3',
        level: 'Challenge',
        title: 'Object Return with Parentheses',
        prompt: 'Write an arrow function createUser(name, id) that directly returns an object { name, id } using implicit return wrapped in parentheses: () => ({ ... }). Log createUser("Dev", 101).',
        requirements: [
          'Use implicit return syntax: (name, id) => ({ name, id })',
          'Log createUser("Dev", 101)'
        ],
        starterCode: '// Arrow function returning object\n',
        solutionCode: 'const createUser = (name, id) => ({ name, id });\nconsole.log(createUser("Dev", 101));',
        expectedOutput: '{ name: "Dev", id: 101 }',
        validate: (code) => {
          code = String(code || '');
          if (!/=>\s*\(\s*\{/.test(code)) {
            return { valid: false, message: 'Wrap the returned object in parentheses: () => ({ ... }).' };
          }
          if (!code.includes('createUser("Dev", 101)')) {
            return { valid: false, message: 'Log createUser("Dev", 101).' };
          }
          return { valid: true, message: 'Outstanding! Returning objects with parentheses is a core ES6 pattern.' };
        }
      }
    ],
    quiz: [
      {
        question: 'How do arrow functions handle the this keyword compared to standard functions?',
        options: [
          'Arrow functions bind this to the global object exclusively',
          'Arrow functions do not have their own this; they inherit this lexically from the enclosing scope',
          'Arrow functions rebind this to the function itself',
          'Arrow functions throw an error whenever this is referenced'
        ],
        correctIndex: 1,
        explanation: 'Arrow functions do not bind their own this; they capture the this value of the enclosing execution context.'
      },
      {
        question: 'What is required when implicitly returning an object literal from a single-line arrow function?',
        options: [
          'Wrap the object in parentheses: () => ({ id: 1 })',
          'Use the return keyword with brackets',
          'Use JSON.stringify()',
          'Objects cannot be returned from arrow functions'
        ],
        correctIndex: 0,
        explanation: 'Parentheses () => ({ id: 1 }) are required so JavaScript parses the curly braces as an object literal rather than a function block body.'
      },
      {
        question: 'What is the value of a function parameter if no argument is passed and no default value is defined?',
        options: ['null', 'undefined', '0', 'NaN'],
        correctIndex: 1,
        explanation: 'In JavaScript, omitted arguments default to undefined.'
      }
    ],
    video: {
      title: 'JavaScript ES6 Arrow Functions Tutorial',
      channel: 'Web Dev Simplified',
      videoId: 'h33Srr5J9nY',
      url: 'https://www.youtube.com/watch?v=h33Srr5J9nY',
      description: 'Kyle explains arrow function syntax, implicit returns, and how they handle the scope of the this keyword.'
    }
  },

  // =========================================================================
  // TOPIC 8: Arrays & Array Methods
  // =========================================================================
  {
    id: 'js-topic-8',
    order: 8,
    slug: 'arrays',
    title: 'Arrays & Functional Methods',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    summary:
      'Master modern array manipulation in JavaScript. Contrast mutating methods (push, pop, splice) with non-mutating functional methods: map, filter, reduce, find, includes, and slice.',
    notes: {
      concept:
        'Arrays are zero-indexed, ordered lists of values. In modern functional JavaScript (and frameworks like React), developers favor immutable array methods that return new transformed arrays without mutating original data.',
      syntax:
`// 1. Array Creation
const items = ["Laptop", "Monitor", "Keyboard"];

// 2. map: Transforms each element into a new array
const upper = items.map(item => item.toUpperCase());

// 3. filter: Returns elements that pass test condition
const longNames = items.filter(item => item.length > 6);

// 4. reduce: Accumulates elements into a single value
const totalLength = items.reduce((sum, item) => sum + item.length, 0);

// 5. find & includes: Search methods
const hasMonitor = items.includes("Monitor"); // true
const found = items.find(item => item.startsWith("Key")); // "Keyboard"`,
      explanation:
        '1. map(fn): Takes an array of N items and returns a new array of N transformed items.\n2. filter(fn): Takes an array of N items and returns a new array containing only items where fn returns true.\n3. reduce(fn, initialValue): Powerful aggregator. Runs a reducer callback over all elements to produce a single number, string, or object.\n4. Immutability: map, filter, slice, and concat return brand-new arrays and leave the original array untouched.',
      codeExample:
`// E-commerce cart calculation with filter, map, and reduce
const cart = [
  { item: "Mechanical Keyboard", price: 120, inStock: true },
  { item: "USB-C Cable", price: 15, inStock: true },
  { item: "Wireless Mouse", price: 60, inStock: false }
];

// Calculate total of available in-stock items
const inStockTotal = cart
  .filter(p => p.inStock)
  .reduce((acc, p) => acc + p.price, 0);

console.log("In-stock total: $" + inStockTotal); // $135`,
      expectedOutput:
        'Console logs:\n"In-stock total: $135"',
      commonMistakes: [
        {
          mistake: 'Using map() like a forEach loop without returning a value.',
          correction: 'Use forEach if you want side effects; use map only when creating a new array from returned values.',
          explanation: 'A map() callback that does not return a value fills the new array with undefined.'
        },
        {
          mistake: 'Mutating arrays directly in state-driven apps: cart.push(newItem);',
          correction: 'Use the spread operator to create a new array: const updatedCart = [...cart, newItem];',
          explanation: 'Direct mutations bypass React/Vue change-detection algorithms and introduce state corruption.'
        },
        {
          mistake: 'Forgetting the initial value in reduce: array.reduce((acc, val) => ...)',
          correction: 'Always provide an explicit initial value: array.reduce((acc, val) => ..., 0);',
          explanation: 'Omitting the initial value on an empty array throws a fatal TypeError: Reduce of empty array with no initial value.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Transform a list of numbers: double each number using map, filter out numbers below 50, and inspect the final array.',
      starterCode:
`const rawScores = [15, 25, 40, 50, 10];

const processed = rawScores
  .map(score => score * 2)
  .filter(score => score >= 50);

console.log("Processed scores:", processed);`,
      solutionCode:
`const rawScores = [15, 25, 40, 50, 10];

const processed = rawScores
  .map(score => score * 2)
  .filter(score => score >= 50);

console.log("Processed scores:", processed);`
    },
    practiceQuestions: [
      {
        id: 'js-q8-1',
        level: 'Easy',
        title: 'Double Array Values with map',
        prompt: 'Declare const nums = [1, 2, 3, 4]. Use .map() to produce const doubled = [2, 4, 6, 8]. Log doubled.',
        requirements: [
          'Declare const nums = [1, 2, 3, 4]',
          'Use nums.map(n => n * 2)',
          'Log doubled'
        ],
        starterCode: '// Double numbers with map\n',
        solutionCode: 'const nums = [1, 2, 3, 4];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);',
        expectedOutput: '[2, 4, 6, 8]',
        validate: (code) => {
          code = String(code || '');
          if (!/nums\.map\(/.test(code)) {
            return { valid: false, message: 'Use .map() on nums.' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log doubled array.' };
          }
          return { valid: true, message: 'Great! .map() is the core functional transformation method.' };
        }
      },
      {
        id: 'js-q8-2',
        level: 'Medium',
        title: 'Filter Even Numbers',
        prompt: 'Declare const values = [12, 17, 24, 33, 40]. Use .filter() to produce const evens containing only numbers divisible by 2 (val % 2 === 0). Log evens.',
        requirements: [
          'Declare const values = [12, 17, 24, 33, 40]',
          'Use values.filter(val => val % 2 === 0)',
          'Log evens'
        ],
        starterCode: '// Filter even numbers\n',
        solutionCode: 'const values = [12, 17, 24, 33, 40];\nconst evens = values.filter(val => val % 2 === 0);\nconsole.log(evens);',
        expectedOutput: '[12, 24, 40]',
        validate: (code) => {
          code = String(code || '');
          if (!/values\.filter\(/.test(code)) {
            return { valid: false, message: 'Use .filter() on values.' };
          }
          if (!/%\s*2\s*===\s*0/.test(code)) {
            return { valid: false, message: 'Check divisibility with val % 2 === 0.' };
          }
          return { valid: true, message: 'Well done! .filter() accurately isolates matching elements.' };
        }
      },
      {
        id: 'js-q8-3',
        level: 'Challenge',
        title: 'Reduce to Sum Total',
        prompt: 'Declare const prices = [29.99, 9.99, 4.99]. Use .reduce() with initial value 0 to compute const sum. Round to two decimals and log sum.',
        requirements: [
          'Declare const prices = [29.99, 9.99, 4.99]',
          'Use prices.reduce((acc, p) => acc + p, 0)',
          'Log sum'
        ],
        starterCode: '// Sum array with reduce\n',
        solutionCode: 'const prices = [29.99, 9.99, 4.99];\nconst sum = prices.reduce((acc, p) => acc + p, 0);\nconsole.log(sum);',
        expectedOutput: '44.97',
        validate: (code) => {
          code = String(code || '');
          if (!/prices\.reduce\(/.test(code)) {
            return { valid: false, message: 'Use .reduce() on prices.' };
          }
          if (!/,\s*0\s*\)/.test(code)) {
            return { valid: false, message: 'Pass 0 as the initial value to .reduce().' };
          }
          return { valid: true, message: 'Brilliant! reduce is the Swiss army knife of functional data pipelines.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Which method returns a new array with elements transformed by a callback without mutating the original array?',
        options: ['map()', 'push()', 'sort()', 'splice()'],
        correctIndex: 0,
        explanation: 'map() returns a brand-new transformed array and does not modify the source array.'
      },
      {
        question: 'What happens if you run [].reduce((acc, val) => acc + val) without providing an initial value?',
        options: [
          'It returns 0',
          'It returns undefined',
          'It throws a TypeError: Reduce of empty array with no initial value',
          'It returns an empty array'
        ],
        correctIndex: 2,
        explanation: 'Calling reduce on an empty array without an initial value throws a fatal TypeError.'
      },
      {
        question: 'What does the includes() array method return?',
        options: [
          'The index of the element',
          'A boolean (true if found, false otherwise)',
          'The element itself',
          'A new array containing the match'
        ],
        correctIndex: 1,
        explanation: 'Array.prototype.includes() returns true if the element exists in the array, false otherwise.'
      }
    ],
    video: {
      title: '8 Must Know JavaScript Array Methods',
      channel: 'Web Dev Simplified',
      videoId: 'R8rmfD9Y5-c',
      url: 'https://www.youtube.com/watch?v=R8rmfD9Y5-c',
      description: 'Kyle covers 8 essential array methods: filter, map, find, forEach, some, every, reduce, and includes.'
    }
  },

  // =========================================================================
  // TOPIC 9: Objects & Object Methods
  // =========================================================================
  {
    id: 'js-topic-9',
    order: 9,
    slug: 'objects',
    title: 'Objects & Object Methods',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    summary:
      'Master JavaScript objects: object literal shorthand, dot vs bracket notation, methods, Object.keys(), Object.values(), Object.entries(), and Object.assign() for immutability.',
    notes: {
      concept:
        'Objects are collections of key-value pairs (properties and methods). Keys are strings or symbols, and values can be any type. Objects represent real-world entities and state structures in web applications.',
      syntax:
`// 1. Object Literal with property shorthand
const name = "Alex";
const user = {
  name, // same as name: name
  role: "Engineer",
  greet() {
    return "Hi, I am " + this.name;
  }
};

// 2. Accessing Properties
console.log(user.role);       // Dot notation
console.log(user["role"]);    // Bracket notation (supports dynamic keys)

// 3. Object static utility methods
const keys = Object.keys(user);       // ["name", "role", "greet"]
const values = Object.values(user);   // ["Alex", "Engineer", fn]
const entries = Object.entries(user); // [["name", "Alex"], ...]`,
      explanation:
        '1. Dot vs Bracket: Dot notation (user.name) is standard; bracket notation (user[variable]) is required when property names are stored in variables or contain spaces/dashes.\n2. Object.entries(): Returns an array of [key, value] pairs, making objects iterable with for...of loops.\n3. Object.freeze(): Prevents new properties from being added or existing properties from being altered or deleted.',
      codeExample:
`// Iterating over object entries with destructuring
const studentGrades = { math: 92, physics: 88, cs: 98 };

for (const [subject, score] of Object.entries(studentGrades)) {
  console.log(subject.toUpperCase() + ": " + score + "%");
}`,
      expectedOutput:
        'Console logs:\n"MATH: 92%"\n"PHYSICS: 88%"\n"CS: 98%"',
      commonMistakes: [
        {
          mistake: 'Using dot notation with a variable: obj.myVariable instead of obj[myVariable].',
          correction: 'Use bracket notation when the key is stored in a variable: obj[myVariable].',
          explanation: 'obj.myVariable literally looks for a property named "myVariable" on the object, not the value stored in the variable.'
        },
        {
          mistake: 'Assuming Object.assign() creates a deep copy.',
          correction: 'Use structuredClone(obj) for deep copying nested objects.',
          explanation: 'Object.assign and the spread operator only create a shallow copy; nested objects still share reference pointers.'
        },
        {
          mistake: 'Attempting to check object length with obj.length.',
          correction: 'Use Object.keys(obj).length to count object properties.',
          explanation: 'Standard objects do not have a length property; Object.keys() returns an array of keys whose length can be measured.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Inspect an object using Object.keys() and Object.entries() in the interactive live sandbox.',
      starterCode:
`const course = {
  title: "Modern JavaScript",
  lessons: 16,
  isCertified: true
};

console.log("Keys:", Object.keys(course));
console.log("Values:", Object.values(course));
console.log("Total properties:", Object.keys(course).length);`,
      solutionCode:
`const course = {
  title: "Modern JavaScript",
  lessons: 16,
  isCertified: true
};

console.log("Keys:", Object.keys(course));
console.log("Values:", Object.values(course));
console.log("Total properties:", Object.keys(course).length);`
    },
    practiceQuestions: [
      {
        id: 'js-q9-1',
        level: 'Easy',
        title: 'Create and Access an Object',
        prompt: 'Create an object book with properties title: "Eloquent JavaScript" and pages: 472. Log book.title.',
        requirements: [
          'Create const book with title and pages',
          'Log book.title'
        ],
        starterCode: '// Create book object\n',
        solutionCode: 'const book = { title: "Eloquent JavaScript", pages: 472 };\nconsole.log(book.title);',
        expectedOutput: '"Eloquent JavaScript"',
        validate: (code) => {
          code = String(code || '');
          if (!/title:\s*["']Eloquent JavaScript["']/.test(code)) {
            return { valid: false, message: 'Set title: "Eloquent JavaScript".' };
          }
          if (!code.includes('book.title')) {
            return { valid: false, message: 'Log book.title.' };
          }
          return { valid: true, message: 'Great! Object created and property accessed.' };
        }
      },
      {
        id: 'js-q9-2',
        level: 'Medium',
        title: 'Dynamic Bracket Property Access',
        prompt: 'Declare const config = { theme: "dark", language: "en" } and const key = "theme". Use bracket notation config[key] to log the theme value.',
        requirements: [
          'Declare const config = { theme: "dark", language: "en" }',
          'Declare const key = "theme"',
          'Log config[key]'
        ],
        starterCode: '// Dynamic property access\n',
        solutionCode: 'const config = { theme: "dark", language: "en" };\nconst key = "theme";\nconsole.log(config[key]);',
        expectedOutput: '"dark"',
        validate: (code) => {
          code = String(code || '');
          if (!/config\[key\]/.test(code)) {
            return { valid: false, message: 'Use bracket notation config[key] with the variable key.' };
          }
          return { valid: true, message: 'Well done! Bracket notation enables dynamic property queries.' };
        }
      },
      {
        id: 'js-q9-3',
        level: 'Challenge',
        title: 'Count Object Keys',
        prompt: 'Declare an object payload = { id: 1, user: "Sam", role: "Dev", active: true }. Use Object.keys(payload).length to log the number of keys (4).',
        requirements: [
          'Declare payload with 4 properties',
          'Call Object.keys(payload).length',
          'Log the count'
        ],
        starterCode: '// Count keys\n',
        solutionCode: 'const payload = { id: 1, user: "Sam", role: "Dev", active: true };\nconsole.log(Object.keys(payload).length);',
        expectedOutput: '4',
        validate: (code) => {
          code = String(code || '');
          if (!/Object\.keys\(\s*payload\s*\)\.length/.test(code)) {
            return { valid: false, message: 'Use Object.keys(payload).length.' };
          }
          return { valid: true, message: 'Outstanding! Object.keys() is the standard way to count object properties.' };
        }
      }
    ],
    quiz: [
      {
        question: 'When is bracket notation obj[key] strictly required instead of dot notation obj.key?',
        options: [
          'When accessing primitive numbers',
          'When the property name is stored in a variable or contains hyphens/spaces',
          'When calling methods',
          'Only in asynchronous code'
        ],
        correctIndex: 1,
        explanation: 'Bracket notation evaluates expressions, allowing dynamic property access via variables or keys containing special characters.'
      },
      {
        question: 'How do you accurately measure the number of properties inside an object obj?',
        options: [
          'obj.length',
          'Object.count(obj)',
          'Object.keys(obj).length',
          'obj.size()'
        ],
        correctIndex: 2,
        explanation: 'Object.keys(obj) returns an array of property strings, whose .length reflects the property count.'
      },
      {
        question: 'Which method creates a deep copy of an object including nested objects in modern JavaScript?',
        options: [
          'Object.assign({}, obj)',
          'structuredClone(obj)',
          '{ ...obj }',
          'obj.clone()'
        ],
        correctIndex: 1,
        explanation: 'structuredClone() is the modern web API for true deep-cloning of objects and arrays.'
      }
    ],
    video: {
      title: 'JavaScript Objects Explained: Object Literals, Methods & Classes',
      channel: 'Dave Gray',
      videoId: 'L7l8kdE40sM',
      url: 'https://www.youtube.com/watch?v=L7l8kdE40sM',
      description: 'Dave Gray breaks down object literals, dot vs bracket access, methods, iteration, and classes.'
    }
  },

  // =========================================================================
  // TOPIC 10: Strings & String Methods
  // =========================================================================
  {
    id: 'js-topic-10',
    order: 10,
    slug: 'strings',
    title: 'Strings & String Methods',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    summary:
      'Master string manipulation in JavaScript: immutability, template literals (`${}`), length, slice, split, trim, replace, replaceAll, includes, and startsWith.',
    notes: {
      concept:
        'Strings are immutable sequences of UTF-16 code units. Because strings are immutable, every string method returns a new string rather than modifying the original in place. Modern ES6 template literals (`...`) allow multi-line strings and expression interpolation.',
      syntax:
`// 1. Template Literals (Interpolation)
const name = "Alice";
const msg = \`Welcome, \${name}! Total items: \${5 * 2}\`;

// 2. Substrings and Extraction
const path = "images/hero.png";
const ext = path.slice(-3); // "png"

// 3. Search and Validation
path.includes("hero");     // true
path.startsWith("images"); // true

// 4. Cleaning and Splitting
"  codeforge  ".trim();    // "codeforge"
"react,vue,angular".split(",");// ["react", "vue", "angular"]`,
      explanation:
        '1. Immutability: let s = "hello"; s.toUpperCase(); leaves s as "hello". You must reassign: s = s.toUpperCase();\n2. slice(start, end): Extracts a section of a string. Supports negative indices counting backward from the end.\n3. replaceAll(target, replacement): Replaces all occurrences across the entire string without requiring a global regex /g.',
      codeExample:
`// Sanitizing and parsing user input
const rawInput = "  engineering-lead@codeforge.dev  ";
const cleanEmail = rawInput.trim().toLowerCase();
const username = cleanEmail.split("@")[0];

console.log("Email: " + cleanEmail);
console.log("Username: " + username);`,
      expectedOutput:
        'Console logs:\n"Email: engineering-lead@codeforge.dev"\n"Username: engineering-lead"',
      commonMistakes: [
        {
          mistake: 'Expecting string methods to mutate the string in place: str.trim();',
          correction: 'Assign the returned new string: str = str.trim();',
          explanation: 'Strings are immutable primitives; methods always return a new string value.'
        },
        {
          mistake: 'Using regular quotes instead of backticks for interpolation: "Hello ${name}"',
          correction: 'Always wrap template literals in backticks: `Hello ${name}`',
          explanation: 'Single and double quotes do not evaluate ${} expressions; they treat them as literal characters.'
        },
        {
          mistake: 'Using replace() expecting it to replace all matches.',
          correction: 'Use replaceAll() or a global regex /pattern/g.',
          explanation: 'str.replace("a", "b") only replaces the very first occurrence of "a".'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Use template literals and string methods to parse and format an engineer profile tag.',
      starterCode:
`const role = "senior software engineer";
const formatted = role.toUpperCase();
const keywords = role.split(" ");

console.log(\`Role: \${formatted}\`);
console.log("Keywords count:", keywords.length);`,
      solutionCode:
`const role = "senior software engineer";
const formatted = role.toUpperCase();
const keywords = role.split(" ");

console.log(\`Role: \${formatted}\`);
console.log("Keywords count:", keywords.length);`
    },
    practiceQuestions: [
      {
        id: 'js-q10-1',
        level: 'Easy',
        title: 'Template Literal Greeting',
        prompt: 'Declare const framework = "React". Use a template literal with backticks to log "Building with React".',
        requirements: [
          'Declare const framework = "React"',
          'Use `Building with ${framework}`',
          'Log output'
        ],
        starterCode: '// Write template literal\n',
        solutionCode: 'const framework = "React";\nconsole.log(`Building with ${framework}`);',
        expectedOutput: '"Building with React"',
        validate: (code) => {
          code = String(code || '');
          if (!code.includes('Building with') || !code.includes('framework')) {
            return { valid: false, message: 'Use template literal `Building with ${framework}`.' };
          }
          return { valid: true, message: 'Great! Template literals are cleaner than + concatenation.' };
        }
      },
      {
        id: 'js-q10-2',
        level: 'Medium',
        title: 'Clean and Trim String',
        prompt: 'Declare const messy = "  codeforge  ". Assign const clean = messy.trim().toUpperCase(). Log clean.',
        requirements: [
          'Declare const messy = "  codeforge  "',
          'Chain .trim().toUpperCase()',
          'Log clean'
        ],
        starterCode: '// Clean messy string\n',
        solutionCode: 'const messy = "  codeforge  ";\nconst clean = messy.trim().toUpperCase();\nconsole.log(clean);',
        expectedOutput: '"CODEFORGE"',
        validate: (code) => {
          code = String(code || '');
          if (!/messy\.trim\(\)\.toUpperCase\(\)/.test(code)) {
            return { valid: false, message: 'Chain messy.trim().toUpperCase().' };
          }
          return { valid: true, message: 'Well done! Method chaining produces concise transformations.' };
        }
      },
      {
        id: 'js-q10-3',
        level: 'Challenge',
        title: 'Split CSV String to Array',
        prompt: 'Declare const csv = "html,css,javascript,react". Use .split(",") to produce an array tags. Log tags[2] ("javascript").',
        requirements: [
          'Declare const csv = "html,css,javascript,react"',
          'Call csv.split(",")',
          'Log tags[2]'
        ],
        starterCode: '// Split CSV\n',
        solutionCode: 'const csv = "html,css,javascript,react";\nconst tags = csv.split(",");\nconsole.log(tags[2]);',
        expectedOutput: '"javascript"',
        validate: (code) => {
          code = String(code || '');
          if (!/csv\.split\(\s*["'],["']\s*\)/.test(code)) {
            return { valid: false, message: 'Use csv.split(",").' };
          }
          if (!code.includes('tags[2]')) {
            return { valid: false, message: 'Log tags[2].' };
          }
          return { valid: true, message: 'Outstanding! .split() seamlessly converts strings to arrays.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Why does let s = "hello"; s.toUpperCase(); console.log(s); print "hello" instead of "HELLO"?',
        options: [
          'toUpperCase() only works in browser environments',
          'Strings are immutable; toUpperCase() returns a new string and does not modify the original',
          's must be declared with var',
          'The method requires a boolean parameter'
        ],
        correctIndex: 1,
        explanation: 'Strings in JavaScript are immutable; string methods return new strings without changing the original.'
      },
      {
        question: 'Which method should you use to replace all occurrences of a word in a string without writing a regular expression?',
        options: ['replace()', 'replaceAll()', 'replaceEvery()', 'swapAll()'],
        correctIndex: 1,
        explanation: 'String.prototype.replaceAll() replaces all occurrences of a substring.'
      },
      {
        question: 'What is the benefit of template literals (`${x}`) over string concatenation (" " + x)?',
        options: [
          'Template literals support multi-line text, expression embedding, and avoid quote escaping bugs',
          'Template literals compile to C++ memory',
          'Template literals prevent all runtime errors',
          'Template literals do not consume heap memory'
        ],
        correctIndex: 0,
        explanation: 'Template literals allow clean multi-line formatting and embedded ${} expressions without messy quote concatenation.'
      }
    ],
    video: {
      title: 'JavaScript String Methods and Properties | Beginner Tutorial',
      channel: 'Dave Gray',
      videoId: 'OM0goBLkkQ8',
      url: 'https://www.youtube.com/watch?v=OM0goBLkkQ8',
      description: 'Dave Gray explains string length, charAt, indexOf, slice, toUpperCase, split, and includes.'
    }
  },

  // =========================================================================
  // TOPIC 11: DOM Manipulation
  // =========================================================================
  {
    id: 'js-topic-11',
    order: 11,
    slug: 'dom-manipulation',
    title: 'DOM Manipulation',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    summary:
      'Interact with the Document Object Model: selecting elements (getElementById, querySelector, querySelectorAll), creating elements, modifying text/HTML (textContent vs innerHTML), and toggling CSS classes.',
    notes: {
      concept:
        'The Document Object Model (DOM) is an object-oriented tree representation of the HTML document. JavaScript interacts with this tree via the global "document" object to dynamically create, inspect, update, and remove elements in response to user actions.',
      syntax:
`// 1. Selecting Elements
const title = document.getElementById("header-title");
const btn = document.querySelector(".action-btn");
const cards = document.querySelectorAll(".card"); // NodeList

// 2. Modifying Content
title.textContent = "New Heading"; // Safe, avoids XSS!
title.classList.add("highlight");
title.classList.toggle("active");

// 3. Creating & Appending Elements
const newCard = document.createElement("div");
newCard.className = "card-item";
newCard.textContent = "Engineered with JavaScript";
document.body.appendChild(newCard);`,
      explanation:
        '1. querySelector vs getElementById: querySelector accepts any CSS selector (.class, #id, div > p). getElementById looks strictly for IDs.\n2. textContent vs innerHTML: textContent inserts plain text safely; innerHTML parses HTML markup. NEVER assign unsanitized user inputs to innerHTML to prevent Cross-Site Scripting (XSS) attacks.\n3. classList: Use classList.add(), remove(), toggle(), and contains() rather than directly overwriting className.',
      codeExample:
`// Safely dynamically generating a task item
function addTask(taskText) {
  const list = document.getElementById("task-list");
  if (!list) return;

  const li = document.createElement("li");
  li.textContent = taskText; // Safe from XSS
  li.classList.add("task-item", "animate-fade-in");

  list.appendChild(li);
}

addTask("Complete DOM Lesson");`,
      expectedOutput:
        'A new <li> element with class="task-item animate-fade-in" is appended into #task-list.',
      commonMistakes: [
        {
          mistake: 'Using innerHTML with untrusted user input: div.innerHTML = userInput;',
          correction: 'Use textContent, or sanitize with DOMPurify.',
          explanation: 'Assigning raw user input to innerHTML allows attackers to inject malicious <script> or <img onerror> XSS vectors.'
        },
        {
          mistake: 'Calling document.querySelector() before the DOM finishes loading.',
          correction: 'Use the defer attribute on your script tag or listen to DOMContentLoaded.',
          explanation: 'Running DOM queries before elements exist in the DOM tree returns null.'
        },
        {
          mistake: 'Directly overriding className: el.className = "active";',
          correction: 'Use el.classList.add("active");',
          explanation: 'Overwriting className strips all pre-existing classes applied by Tailwind or component stylesheets.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Inspect DOM manipulation: create a heading and append it to the document body in the live browser preview.',
      starterCode:
`const domTarget = document.getElementById("dom-output");

const card = document.createElement("div");
card.style.background = "#1e293b";
card.style.padding = "12px";
card.style.borderRadius = "8px";
card.style.color = "#38bdf8";
card.textContent = "DOM Element dynamically created and attached!";

domTarget.appendChild(card);
console.log("DOM element successfully attached to page.");`,
      solutionCode:
`const domTarget = document.getElementById("dom-output");

const card = document.createElement("div");
card.style.background = "#1e293b";
card.style.padding = "12px";
card.style.borderRadius = "8px";
card.style.color = "#38bdf8";
card.textContent = "DOM Element dynamically created and attached!";

domTarget.appendChild(card);
console.log("DOM element successfully attached to page.");`
    },
    practiceQuestions: [
      {
        id: 'js-q11-1',
        level: 'Easy',
        title: 'Select Element and Update textContent',
        prompt: 'Select element with ID "title" using document.getElementById("title") and update its textContent to "CodeForge Platform".',
        requirements: [
          'Use document.getElementById("title")',
          'Set .textContent = "CodeForge Platform"'
        ],
        starterCode: '// Update element textContent\n',
        solutionCode: 'const el = document.getElementById("title");\nel.textContent = "CodeForge Platform";',
        expectedOutput: 'Element #title text updated.',
        validate: (code) => {
          code = String(code || '');
          if (!/document\.getElementById\(\s*["']title["']\s*\)/.test(code)) {
            return { valid: false, message: 'Use document.getElementById("title").' };
          }
          if (!/\.textContent\s*=\s*["']CodeForge Platform["']/.test(code)) {
            return { valid: false, message: 'Set .textContent = "CodeForge Platform".' };
          }
          return { valid: true, message: 'Great job! textContent updated safely.' };
        }
      },
      {
        id: 'js-q11-2',
        level: 'Medium',
        title: 'Create and Append Element',
        prompt: 'Create a new paragraph element const p = document.createElement("p"). Set p.textContent = "Hello World" and append it to document.body.',
        requirements: [
          'Call document.createElement("p")',
          'Set p.textContent = "Hello World"',
          'Call document.body.appendChild(p)'
        ],
        starterCode: '// Create and append paragraph\n',
        solutionCode: 'const p = document.createElement("p");\np.textContent = "Hello World";\ndocument.body.appendChild(p);',
        expectedOutput: 'New paragraph appended to document.body.',
        validate: (code) => {
          code = String(code || '');
          if (!/document\.createElement\(\s*["']p["']\s*\)/.test(code)) {
            return { valid: false, message: 'Use document.createElement("p").' };
          }
          if (!/document\.body\.appendChild/.test(code)) {
            return { valid: false, message: 'Call document.body.appendChild(p).' };
          }
          return { valid: true, message: 'Well done! Element created and appended to DOM tree.' };
        }
      },
      {
        id: 'js-q11-3',
        level: 'Challenge',
        title: 'Toggle Class with classList',
        prompt: 'Select element const card = document.querySelector(".card"). Add class "active" and remove class "hidden" using classList.',
        requirements: [
          'Use document.querySelector(".card")',
          'Call card.classList.add("active")',
          'Call card.classList.remove("hidden")'
        ],
        starterCode: '// Manipulate classList\n',
        solutionCode: 'const card = document.querySelector(".card");\ncard.classList.add("active");\ncard.classList.remove("hidden");',
        expectedOutput: 'Classes updated on .card element.',
        validate: (code) => {
          code = String(code || '');
          if (!/card\.classList\.add\(\s*["']active["']\s*\)/.test(code)) {
            return { valid: false, message: 'Use card.classList.add("active").' };
          }
          if (!/card\.classList\.remove\(\s*["']hidden["']\s*\)/.test(code)) {
            return { valid: false, message: 'Use card.classList.remove("hidden").' };
          }
          return { valid: true, message: 'Outstanding! classList keeps styling changes modular and clean.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Why is textContent preferred over innerHTML for displaying user-submitted messages?',
        options: [
          'textContent is 100 times slower',
          'innerHTML can execute injected <script> or event tags, opening Cross-Site Scripting (XSS) vulnerabilities',
          'textContent converts all text to uppercase',
          'innerHTML is unsupported on mobile browsers'
        ],
        correctIndex: 1,
        explanation: 'innerHTML parses HTML markup, which exposes applications to dangerous XSS script injections if supplied with untrusted input.'
      },
      {
        question: 'What does document.querySelectorAll() return?',
        options: [
          'A JavaScript Array with map and filter',
          'A static NodeList of matching DOM elements',
          'A single HTMLElement',
          'A JSON string of elements'
        ],
        correctIndex: 1,
        explanation: 'querySelectorAll returns a static NodeList containing all matching elements in document order.'
      },
      {
        question: 'Which method should you use to add a CSS class without wiping out existing classes?',
        options: [
          'element.className = "new-class"',
          'element.classList.add("new-class")',
          'element.style.class = "new-class"',
          'element.addClass("new-class")'
        ],
        correctIndex: 1,
        explanation: 'element.classList.add() safely appends a class to the element\'s token list.'
      }
    ],
    video: {
      title: 'Learn DOM Manipulation In 18 Minutes',
      channel: 'Web Dev Simplified',
      videoId: 'y17RuWkWdn8',
      url: 'https://www.youtube.com/watch?v=y17RuWkWdn8',
      description: 'Kyle breaks down selecting elements, creating elements, modifying text/styles, and event listeners.'
    }
  },

  // =========================================================================
  // TOPIC 12: Events & Event Listeners
  // =========================================================================
  {
    id: 'js-topic-12',
    order: 12,
    slug: 'events',
    title: 'Events & Event Listeners',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    summary:
      'Handle user interactions: addEventListener, click/submit/input events, the Event object (e.target, e.preventDefault, e.stopPropagation), and event bubbling vs event delegation.',
    notes: {
      concept:
        'Events are signals fired by the browser when user actions occur (clicking a button, typing in an input, submitting a form) or system milestones happen (DOM loaded, window resized). JavaScript listens to these signals using addEventListener().',
      syntax:
`// 1. Attaching a click listener
const btn = document.querySelector("#submit-btn");
btn.addEventListener("click", (event) => {
  console.log("Clicked:", event.target);
});

// 2. Form submission with preventDefault()
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page reload!
  console.log("Form submitted via AJAX");
});

// 3. Event Delegation on Parent
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("button.delete")) {
    e.target.closest("li").remove();
  }
});`,
      explanation:
        '1. addEventListener(type, handler): Allows multiple independent listeners to attach to the same event on an element.\n2. e.preventDefault(): Cancels the default browser action (e.g. stops form submissions from refreshing the page or <a> links from navigating).\n3. Event Bubbling: Events start at the target element and bubble upwards through ancestors to the document root.\n4. Event Delegation: Attaching a single listener to a common parent element to handle events on dynamic child items, drastically saving memory.',
      codeExample:
`// Event delegation pattern
const container = document.getElementById("buttons-wrap");

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const action = e.target.dataset.action;
    console.log("Action triggered: " + action);
  }
});`,
      expectedOutput:
        'Clicking any button inside #buttons-wrap logs its data-action attribute value.',
      commonMistakes: [
        {
          mistake: 'Invoking the handler function when adding the listener: btn.addEventListener("click", handleClick());',
          correction: 'Pass the function reference without parentheses: btn.addEventListener("click", handleClick);',
          explanation: 'Adding parentheses invokes the function immediately on script execution rather than waiting for the user click.'
        },
        {
          mistake: 'Forgetting e.preventDefault() on form submit events.',
          correction: 'Call e.preventDefault() as the first line of your submit handler.',
          explanation: 'Without preventDefault(), the browser performs a traditional synchronous HTTP POST, causing an instant page reload that clears state.'
        },
        {
          mistake: 'Attaching individual click listeners to hundreds of dynamically rendered list items.',
          correction: 'Use event delegation: attach one listener to the parent <ul> container.',
          explanation: 'Adding hundreds of listeners consumes unnecessary memory heap and fails on elements created in the future.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Simulate an event listener with preventDefault and target inspection in the sandbox.',
      starterCode:
`const fakeEvent = {
  type: "submit",
  target: { id: "login-form", name: "auth" },
  defaultPrevented: false,
  preventDefault() {
    this.defaultPrevented = true;
    console.log("Default browser page refresh prevented!");
  }
};

fakeEvent.preventDefault();
console.log("Event handled for target:", fakeEvent.target.id);`,
      solutionCode:
`const fakeEvent = {
  type: "submit",
  target: { id: "login-form", name: "auth" },
  defaultPrevented: false,
  preventDefault() {
    this.defaultPrevented = true;
    console.log("Default browser page refresh prevented!");
  }
};

fakeEvent.preventDefault();
console.log("Event handled for target:", fakeEvent.target.id);`
    },
    practiceQuestions: [
      {
        id: 'js-q12-1',
        level: 'Easy',
        title: 'Add Click Event Listener',
        prompt: 'Select const btn = document.querySelector("#btn"). Add a "click" event listener that logs "Button clicked!".',
        requirements: [
          'Use btn.addEventListener("click", ...)',
          'Log "Button clicked!"'
        ],
        starterCode: '// Add click listener\n',
        solutionCode: 'const btn = document.querySelector("#btn");\nbtn.addEventListener("click", () => {\n  console.log("Button clicked!");\n});',
        expectedOutput: 'Click listener attached to #btn.',
        validate: (code) => {
          code = String(code || '');
          if (!/btn\.addEventListener\(\s*["']click["']/.test(code)) {
            return { valid: false, message: 'Use btn.addEventListener("click", ...).' };
          }
          if (!/Button clicked!/.test(code)) {
            return { valid: false, message: 'Log "Button clicked!" inside the callback.' };
          }
          return { valid: true, message: 'Great! Click event listener attached properly.' };
        }
      },
      {
        id: 'js-q12-2',
        level: 'Medium',
        title: 'Prevent Form Submit Reload',
        prompt: 'Attach a "submit" listener to form that calls e.preventDefault() and logs "Form intercepted".',
        requirements: [
          'form.addEventListener("submit", (e) => ...)',
          'Call e.preventDefault()',
          'Log "Form intercepted"'
        ],
        starterCode: '// Intercept form submit\n',
        solutionCode: 'form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  console.log("Form intercepted");\n});',
        expectedOutput: 'Form submission intercepted without reload.',
        validate: (code) => {
          code = String(code || '');
          if (!/addEventListener\(\s*["']submit["']/.test(code)) {
            return { valid: false, message: 'Listen for the "submit" event.' };
          }
          if (!/e\.preventDefault\(\)/.test(code)) {
            return { valid: false, message: 'Call e.preventDefault().' };
          }
          return { valid: true, message: 'Well done! e.preventDefault() is critical for modern SPAs.' };
        }
      },
      {
        id: 'js-q12-3',
        level: 'Challenge',
        title: 'Event Delegation on Container',
        prompt: 'Attach a click listener to container. Check if (e.target.classList.contains("btn-delete")). If true, log "Delete item".',
        requirements: [
          'container.addEventListener("click", (e) => ...)',
          'Use if (e.target.classList.contains("btn-delete"))',
          'Log "Delete item"'
        ],
        starterCode: '// Event delegation pattern\n',
        solutionCode: 'container.addEventListener("click", (e) => {\n  if (e.target.classList.contains("btn-delete")) {\n    console.log("Delete item");\n  }\n});',
        expectedOutput: 'Event delegation configured on container.',
        validate: (code) => {
          code = String(code || '');
          if (!/e\.target\.classList\.contains\(\s*["']btn-delete["']\s*\)/.test(code)) {
            return { valid: false, message: 'Check e.target.classList.contains("btn-delete").' };
          }
          return { valid: true, message: 'Outstanding! Event delegation provides massive performance advantages.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What does event.preventDefault() do when called inside a form submit handler?',
        options: [
          'Closes the browser tab',
          'Prevents the browser from reloading the page and submitting synchronously',
          'Deletes all form input values',
          'Stops the click event from bubbling'
        ],
        correctIndex: 1,
        explanation: 'preventDefault() halts default browser behaviors such as form submission page reloads or hyperlink navigations.'
      },
      {
        question: 'What is "Event Delegation" in JavaScript?',
        options: [
          'Delegating server requests to a background thread',
          'Attaching a single event listener to a parent element to handle events for all existing and future children via bubbling',
          'Assigning events to CSS stylesheets',
          'Canceling an event listener'
        ],
        correctIndex: 1,
        explanation: 'Event delegation leverages event bubbling by listening on a parent container, inspecting e.target to handle actions efficiently.'
      },
      {
        question: 'Why should you pass handleClick instead of handleClick() into addEventListener("click", ...)?',
        options: [
          'handleClick() executes immediately when the line runs; handleClick passes the function reference to be called later upon click',
          'handleClick() throws a syntax error in all browsers',
          'Parentheses are only allowed in CSS',
          'Functions cannot be passed into event listeners'
        ],
        correctIndex: 0,
        explanation: 'Parentheses invoke the function right away during registration instead of delegating execution to the click trigger.'
      }
    ],
    video: {
      title: 'Learn JavaScript Event Listeners In 18 Minutes',
      channel: 'Web Dev Simplified',
      videoId: 'UzynxRh6fx4',
      url: 'https://www.youtube.com/watch?v=UzynxRh6fx4',
      description: 'Kyle covers addEventListener, event bubbling, event capturing, removeEventListener, and event delegation.'
    }
  },

  // =========================================================================
  // TOPIC 13: ES6+ Modern Features
  // =========================================================================
  {
    id: 'js-topic-13',
    order: 13,
    slug: 'es6',
    title: 'Modern ES6+ Features',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    summary:
      'Master modern ECMAScript features: Object and Array destructuring, the Spread and Rest operators (...), enhanced object literals, modules (import/export), and default values.',
    notes: {
      concept:
        'ECMAScript 2015 (ES6) was the most significant update in JavaScript\'s history, modernizing the language into a clean, expressive tool. Key features include destructuring to unpack properties and elements directly into distinct variables, and the versatile "..." operator used for spreading items or collecting rest parameters.',
      syntax:
`// 1. Object Destructuring with Renaming & Defaults
const { name: userName, role = "Student" } = user;

// 2. Array Destructuring & Rest parameter
const [first, second, ...remaining] = [1, 2, 3, 4, 5];

// 3. Spread Operator: Immutable Cloning & Merging
const baseConfig = { env: "prod", port: 8080 };
const liveConfig = { ...baseConfig, debug: false };

// 4. Spread with Arrays
const combined = [...listA, ...listB];`,
      explanation:
        '1. Destructuring: Unpacks properties from objects or elements from arrays into distinct variables cleanly.\n2. Spread Operator (...): Expands an iterable (like an array or object) into individual elements or properties.\n3. Rest Parameter (...): Gathers any number of remaining arguments into a true JavaScript array inside function parameters: function logAll(tag, ...items) { ... }',
      codeExample:
`// Practical destructuring and spread in modern API handling
function processOrder({ orderId, items = [], discount = 0 }) {
  const finalPrice = items.reduce((sum, item) => sum + item.price, 0) - discount;
  return {
    orderId,
    total: finalPrice,
    itemCount: items.length
  };
}

const summary = processOrder({
  orderId: "ORD-9021",
  items: [{ price: 40 }, { price: 60 }],
  discount: 10
});

console.log("Order Total: $" + summary.total); // $90`,
      expectedOutput:
        'Console logs:\n"Order Total: $90"',
      commonMistakes: [
        {
          mistake: 'Confusing the Rest operator with the Spread operator.',
          correction: 'Spread expands elements outward (...array); Rest condenses elements inward into an array parameter (...args).',
          explanation: 'They share the same ... syntax, but Spread is used on values to unpack them, while Rest is used in parameters/destructuring to collect remaining items.'
        },
        {
          mistake: 'Destructuring a property from null or undefined: const { name } = null;',
          correction: 'Provide an empty object fallback: const { name } = user || {};',
          explanation: 'Attempting to destructure null or undefined throws a fatal TypeError: Cannot destructure property of null.'
        },
        {
          mistake: 'Assuming {...obj} copies nested objects.',
          correction: 'Use structuredClone() if deep cloning is required.',
          explanation: 'The spread operator only creates a shallow clone; nested object references remain shared.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Test object destructuring and array spread in the live sandbox.',
      starterCode:
`const engineer = {
  name: "Taylor",
  role: "Full Stack Engineer",
  skills: ["React", "Node", "MongoDB"]
};

const { name, skills } = engineer;
const allSkills = [...skills, "Docker", "AWS"];

console.log(\`Engineer: \${name}\`);
console.log("Expanded skills:", allSkills);`,
      solutionCode:
`const engineer = {
  name: "Taylor",
  role: "Full Stack Engineer",
  skills: ["React", "Node", "MongoDB"]
};

const { name, skills } = engineer;
const allSkills = [...skills, "Docker", "AWS"];

console.log(\`Engineer: \${name}\`);
console.log("Expanded skills:", allSkills);`
    },
    practiceQuestions: [
      {
        id: 'js-q13-1',
        level: 'Easy',
        title: 'Object Destructuring',
        prompt: 'Declare const user = { id: 101, username: "dev_alex" }. Destructure id and username, and log username.',
        requirements: [
          'const { id, username } = user',
          'Log username'
        ],
        starterCode: '// Destructure user\n',
        solutionCode: 'const user = { id: 101, username: "dev_alex" };\nconst { id, username } = user;\nconsole.log(username);',
        expectedOutput: '"dev_alex"',
        validate: (code) => {
          code = String(code || '');
          if (!/const\s*\{\s*(id,\s*username|username,\s*id)\s*\}\s*=\s*user/.test(code)) {
            return { valid: false, message: 'Destructure const { id, username } = user.' };
          }
          return { valid: true, message: 'Great! Destructuring unpacks properties cleanly.' };
        }
      },
      {
        id: 'js-q13-2',
        level: 'Medium',
        title: 'Array Spread Merging',
        prompt: 'Declare const front = ["HTML", "CSS"] and const back = ["Node", "SQL"]. Merge them into const fullstack using the spread operator [...front, ...back]. Log fullstack.',
        requirements: [
          'Declare front and back arrays',
          'const fullstack = [...front, ...back]',
          'Log fullstack'
        ],
        starterCode: '// Merge arrays with spread\n',
        solutionCode: 'const front = ["HTML", "CSS"];\nconst back = ["Node", "SQL"];\nconst fullstack = [...front, ...back];\nconsole.log(fullstack);',
        expectedOutput: '["HTML", "CSS", "Node", "SQL"]',
        validate: (code) => {
          code = String(code || '');
          if (!/\[\s*\.\.\.front\s*,\s*\.\.\.back\s*\]/.test(code)) {
            return { valid: false, message: 'Use [...front, ...back] to merge the arrays.' };
          }
          return { valid: true, message: 'Well done! Spread merging is standard practice in modern state management.' };
        }
      },
      {
        id: 'js-q13-3',
        level: 'Challenge',
        title: 'Rest Parameters in Function',
        prompt: 'Create a function sumAll(...numbers) that uses numbers.reduce((acc, n) => acc + n, 0) to sum all passed arguments. Log sumAll(1, 2, 3, 4, 5) (15).',
        requirements: [
          'Define function sumAll(...numbers)',
          'Use .reduce() on numbers',
          'Log sumAll(1, 2, 3, 4, 5)'
        ],
        starterCode: '// Function with rest parameters\n',
        solutionCode: 'const sumAll = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(sumAll(1, 2, 3, 4, 5));',
        expectedOutput: '15',
        validate: (code) => {
          code = String(code || '');
          if (!/\.\.\.numbers/.test(code)) {
            return { valid: false, message: 'Use rest parameter ...numbers in function definition.' };
          }
          if (!code.includes('sumAll(1, 2, 3, 4, 5)')) {
            return { valid: false, message: 'Call sumAll(1, 2, 3, 4, 5).' };
          }
          return { valid: true, message: 'Outstanding! Rest parameters turn arguments into true arrays.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What is the purpose of the Spread operator (...) when copying an object: const copy = { ...orig }?',
        options: [
          'It creates an immutable deep copy of all nested levels',
          'It creates a shallow copy by copying all enumerable own properties into a new object',
          'It links the two objects so changing one updates both',
          'It deletes the original object'
        ],
        correctIndex: 1,
        explanation: 'The spread operator creates a shallow copy, copying top-level properties into a new object.'
      },
      {
        question: 'How do you assign a default value when destructuring an object property?',
        options: [
          'const { role || "guest" } = user;',
          'const { role = "guest" } = user;',
          'const { role: default("guest") } = user;',
          'const { role ?? "guest" } = user;'
        ],
        correctIndex: 1,
        explanation: 'In destructuring syntax, default values are assigned with the = operator: const { role = "guest" } = user;'
      },
      {
        question: 'What is the key difference between the Rest parameter and the legacy arguments object?',
        options: [
          'Rest parameters produce a true JavaScript Array with all array methods; arguments is an array-like object with no map/filter',
          'arguments is faster than Rest',
          'Rest parameters only work in Node.js',
          'arguments works in arrow functions'
        ],
        correctIndex: 0,
        explanation: 'Rest parameters are real Array instances with full array method support (map, filter, reduce), whereas arguments is an array-like object.'
      }
    ],
    video: {
      title: 'Why Is Array/Object Destructuring So Useful And How To Use It',
      channel: 'Web Dev Simplified',
      videoId: 'NIq3qLaHCIs',
      url: 'https://www.youtube.com/watch?v=NIq3qLaHCIs',
      description: 'Kyle explains array and object destructuring, renaming properties, default values, and real-world use cases.'
    }
  },

  // =========================================================================
  // TOPIC 14: Promises & Asynchronous JavaScript
  // =========================================================================
  {
    id: 'js-topic-14',
    order: 14,
    slug: 'promises',
    title: 'Promises & Async JavaScript',
    difficulty: 'Intermediate',
    estimatedTime: '25 min',
    summary:
      'Manage asynchronous operations cleanly: Promise lifecycle (pending, fulfilled, rejected), constructing promises with new Promise(), chaining with .then(), .catch(), .finally(), and executing concurrent tasks with Promise.all().',
    notes: {
      concept:
        'A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises solve the historical "Callback Hell" (Pyramid of Doom) pattern by providing a standardized, chainable interface.',
      syntax:
`// 1. Creating a Promise
const wait = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms < 0) reject(new Error("Time cannot be negative"));
    setTimeout(() => resolve("Finished waiting " + ms + "ms"), ms);
  });
};

// 2. Consuming with .then() and .catch()
wait(1000)
  .then((result) => {
    console.log(result);
    return "Next step";
  })
  .then((step) => console.log(step))
  .catch((err) => console.error("Error:", err.message))
  .finally(() => console.log("Cleanup complete"));`,
      explanation:
        '1. Three States: A promise starts as "pending", and transitions irreversibly to either "fulfilled" (resolved with a value) or "rejected" (rejected with an error).\n2. Chaining: Returning a value from a .then() handler automatically resolves the next promise in the chain with that value.\n3. Promise.all([p1, p2]): Runs multiple promises concurrently in parallel. Resolves when all promises resolve, or rejects immediately if any single promise rejects.',
      codeExample:
`// Running concurrent asynchronous tasks
const fetchUser = new Promise(res => setTimeout(() => res({ id: 1, name: "Alex" }), 100));
const fetchPosts = new Promise(res => setTimeout(() => res(["Post 1", "Post 2"]), 150));

Promise.all([fetchUser, fetchPosts])
  .then(([user, posts]) => {
    console.log("User:", user.name);
    console.log("Posts count:", posts.length);
  })
  .catch(err => console.error("Failed:", err));`,
      expectedOutput:
        'Console logs:\n"User: Alex"\n"Posts count: 2"',
      commonMistakes: [
        {
          mistake: 'Nesting .then() callbacks inside each other (Callback Hell with Promises).',
          correction: 'Return promises and chain .then() at the root level.',
          explanation: 'Nesting defeats the primary readability advantage of promises.'
        },
        {
          mistake: 'Forgetting to attach a .catch() handler.',
          correction: 'Always terminate promise chains with .catch() or use try/catch with async/await.',
          explanation: 'Unhandled promise rejections cause uncaught exception warnings and can crash Node.js processes.'
        },
        {
          mistake: 'Calling resolve() or reject() multiple times.',
          correction: 'Remember that a Promise can settle only once.',
          explanation: 'Once a promise resolves or rejects, its state is frozen; subsequent calls are silently ignored.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Construct a simple resolving Promise and consume it using .then() in the interactive sandbox.',
      starterCode:
`const checkServer = new Promise((resolve, reject) => {
  const isOnline = true;
  if (isOnline) {
    resolve("Server status: Healthy (200 OK)");
  } else {
    reject("Server offline (503)");
  }
});

checkServer
  .then(res => console.log(res))
  .catch(err => console.error(err));`,
      solutionCode:
`const checkServer = new Promise((resolve, reject) => {
  const isOnline = true;
  if (isOnline) {
    resolve("Server status: Healthy (200 OK)");
  } else {
    reject("Server offline (503)");
  }
});

checkServer
  .then(res => console.log(res))
  .catch(err => console.error(err));`
    },
    practiceQuestions: [
      {
        id: 'js-q14-1',
        level: 'Easy',
        title: 'Create an Instantly Resolving Promise',
        prompt: 'Use Promise.resolve("Data loaded") to create a promise and log the resolved message inside .then().',
        requirements: [
          'Call Promise.resolve("Data loaded")',
          'Use .then(data => console.log(data))'
        ],
        starterCode: '// Consume resolved promise\n',
        solutionCode: 'Promise.resolve("Data loaded").then(data => console.log(data));',
        expectedOutput: '"Data loaded"',
        validate: (code) => {
          code = String(code || '');
          if (!/Promise\.resolve\(\s*["']Data loaded["']\s*\)/.test(code)) {
            return { valid: false, message: 'Use Promise.resolve("Data loaded").' };
          }
          if (!/\.then\(/.test(code)) {
            return { valid: false, message: 'Attach a .then() handler.' };
          }
          return { valid: true, message: 'Great! Promise.resolve creates an already-fulfilled promise.' };
        }
      },
      {
        id: 'js-q14-2',
        level: 'Medium',
        title: 'Promise with Rejection Catch',
        prompt: 'Create a promise const task = new Promise((resolve, reject) => reject(new Error("Task Failed"))). Attach .catch(err => console.log(err.message)).',
        requirements: [
          'Create new Promise with reject(new Error("Task Failed"))',
          'Attach .catch(err => console.log(err.message))'
        ],
        starterCode: '// Promise error handling\n',
        solutionCode: 'const task = new Promise((resolve, reject) => reject(new Error("Task Failed")));\ntask.catch(err => console.log(err.message));',
        expectedOutput: '"Task Failed"',
        validate: (code) => {
          code = String(code || '');
          if (!/reject\(new Error\(\s*["']Task Failed["']\s*\)\)/.test(code)) {
            return { valid: false, message: 'Reject with new Error("Task Failed").' };
          }
          if (!/\.catch\(/.test(code)) {
            return { valid: false, message: 'Attach a .catch() handler.' };
          }
          return { valid: true, message: 'Well done! Rejection handlers prevent uncaught runtime errors.' };
        }
      },
      {
        id: 'js-q14-3',
        level: 'Challenge',
        title: 'Concurrent Execution with Promise.all',
        prompt: 'Use Promise.all([Promise.resolve(10), Promise.resolve(20)]). In .then(([a, b]), log a + b (30).',
        requirements: [
          'Call Promise.all([Promise.resolve(10), Promise.resolve(20)])',
          'In .then(([a, b]), log a + b'
        ],
        starterCode: '// Run with Promise.all\n',
        solutionCode: 'Promise.all([Promise.resolve(10), Promise.resolve(20)]).then(([a, b]) => console.log(a + b));',
        expectedOutput: '30',
        validate: (code) => {
          code = String(code || '');
          if (!/Promise\.all\(/.test(code)) {
            return { valid: false, message: 'Use Promise.all() to run promises concurrently.' };
          }
          if (!code.includes('console.log')) {
            return { valid: false, message: 'Log the sum inside .then().' };
          }
          return { valid: true, message: 'Outstanding! Promise.all executes independent tasks concurrently.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What are the three possible states of a JavaScript Promise?',
        options: [
          'start, middle, end',
          'pending, fulfilled, rejected',
          'active, inactive, closed',
          'sync, async, finished'
        ],
        correctIndex: 1,
        explanation: 'A Promise is initially pending, and settles into either fulfilled or rejected.'
      },
      {
        question: 'What happens in Promise.all([p1, p2, p3]) if p2 rejects with an error?',
        options: [
          'It waits for p1 and p3, then ignores p2',
          'The entire Promise.all immediately rejects with p2\'s error (fail-fast behavior)',
          'It retries p2 automatically 3 times',
          'It returns null for p2 and resolves the rest'
        ],
        correctIndex: 1,
        explanation: 'Promise.all has fail-fast behavior: if any promise rejects, the entire collective promise rejects immediately.'
      },
      {
        question: 'What does the .finally() handler do on a Promise?',
        options: [
          'Executes only if the promise rejects',
          'Executes always, regardless of whether the promise was fulfilled or rejected (ideal for cleanup)',
          'Cancels the promise',
          'Converts the promise to synchronous code'
        ],
        correctIndex: 1,
        explanation: '.finally() executes unconditionally after settlement, making it the perfect place to reset loading spinners or release resources.'
      }
    ],
    video: {
      title: 'JavaScript Promises In 10 Minutes',
      channel: 'Web Dev Simplified',
      videoId: 'DHvZLI7Db8E',
      url: 'https://www.youtube.com/watch?v=DHvZLI7Db8E',
      description: 'Kyle teaches how Promises work, how to create them, and how to chain .then(), .catch(), and Promise.all.'
    }
  },

  // =========================================================================
  // TOPIC 15: Async / Await
  // =========================================================================
  {
    id: 'js-topic-15',
    order: 15,
    slug: 'async-await',
    title: 'Async / Await Syntax',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    summary:
      'Write synchronous-looking asynchronous code: the async keyword, the await operator, comprehensive error handling using try / catch / finally blocks, and avoiding sequential await bottlenecks.',
    notes: {
      concept:
        'Async/Await (introduced in ES2017) is syntactic sugar built on top of native JavaScript Promises. Declaring a function as "async" guarantees it always returns a Promise. Inside an async function, the "await" keyword pauses function execution until the awaited Promise settles, unpacking its resolved value cleanly without callback chains.',
      syntax:
`// 1. Async Function Declaration
async function loadUserData(userId) {
  try {
    const response = await fetchUser(userId);
    console.log("User loaded:", response.name);
    return response;
  } catch (error) {
    console.error("Failed to load user:", error.message);
  } finally {
    console.log("Request completed");
  }
}

// 2. Async Arrow Function
const getStatus = async () => await checkHealth();`,
      explanation:
        '1. Linear Flow: Eliminates nested .then() handlers; asynchronous code reads top-to-bottom like synchronous code.\n2. Standard try/catch: Errors in awaited promises throw exceptions that are caught naturally by standard JavaScript try/catch blocks.\n3. Parallel vs Sequential: Awaiting promises sequentially (await p1; await p2;) runs them in series. If they are independent, trigger them in parallel with await Promise.all([p1, p2]).',
      codeExample:
`// Real-world async/await data fetching simulation
async function fetchUserProfile(id) {
  const mockApi = (userId) => new Promise(res => {
    setTimeout(() => res({ id: userId, username: "dev_" + userId }), 80);
  });

  try {
    console.log("Initiating profile load...");
    const profile = await mockApi(id);
    console.log("Profile resolved:", profile.username);
    return profile;
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

fetchUserProfile(42);`,
      expectedOutput:
        'Console logs:\n"Initiating profile load..."\n"Profile resolved: dev_42"',
      commonMistakes: [
        {
          mistake: 'Using the await keyword outside of an async function.',
          correction: 'Wrap the code in an async function (or use top-level await in ES modules).',
          explanation: 'Using await inside a standard non-async function throws a SyntaxError: await is only valid in async functions.'
        },
        {
          mistake: 'Awaiting independent promises sequentially when they could run in parallel: const a = await getA(); const b = await getB();',
          correction: 'Use Promise.all: const [a, b] = await Promise.all([getA(), getB()]);',
          explanation: 'Sequential awaits double network response time by waiting for the first request to complete before initiating the second.'
        },
        {
          mistake: 'Using await inside a forEach loop: items.forEach(async item => await save(item));',
          correction: 'Use a traditional for...of loop or await Promise.all(items.map(...)).',
          explanation: 'forEach does not wait for async callbacks to finish; execution proceeds immediately, causing unhandled race conditions.'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Write an async function that awaits a simulated API promise and handles errors using try/catch.',
      starterCode:
`const simulateApi = () => Promise.resolve({ status: "success", version: "v2.4" });

async function checkApp() {
  try {
    console.log("Checking API...");
    const data = await simulateApi();
    console.log("API Version:", data.version);
  } catch (err) {
    console.error("Error connecting to API");
  }
}

checkApp();`,
      solutionCode:
`const simulateApi = () => Promise.resolve({ status: "success", version: "v2.4" });

async function checkApp() {
  try {
    console.log("Checking API...");
    const data = await simulateApi();
    console.log("API Version:", data.version);
  } catch (err) {
    console.error("Error connecting to API");
  }
}

checkApp();`
    },
    practiceQuestions: [
      {
        id: 'js-q15-1',
        level: 'Easy',
        title: 'Basic Async Function',
        prompt: 'Create an async function loadMessage() that awaits Promise.resolve("Hello Async") and logs the result. Call loadMessage().',
        requirements: [
          'Declare async function loadMessage()',
          'const msg = await Promise.resolve("Hello Async")',
          'Log msg and call loadMessage()'
        ],
        starterCode: '// Async function\n',
        solutionCode: 'async function loadMessage() {\n  const msg = await Promise.resolve("Hello Async");\n  console.log(msg);\n}\nloadMessage();',
        expectedOutput: '"Hello Async"',
        validate: (code) => {
          code = String(code || '');
          if (!/async\s+function\s+loadMessage/.test(code) && !/const\s+loadMessage\s*=\s*async/.test(code)) {
            return { valid: false, message: 'Declare async function loadMessage().' };
          }
          if (!/await\s+Promise\.resolve/.test(code)) {
            return { valid: false, message: 'Use await with Promise.resolve.' };
          }
          return { valid: true, message: 'Great! async/await produces clean linear syntax.' };
        }
      },
      {
        id: 'js-q15-2',
        level: 'Medium',
        title: 'Async Try / Catch Error Handling',
        prompt: 'Write an async function executeTask() with a try/catch block. In try, await Promise.reject(new Error("Database offline")). In catch, log err.message.',
        requirements: [
          'async function executeTask()',
          'try { await Promise.reject(new Error("Database offline")); }',
          'catch (err) { console.log(err.message); }'
        ],
        starterCode: '// Try catch async\n',
        solutionCode: 'async function executeTask() {\n  try {\n    await Promise.reject(new Error("Database offline"));\n  } catch (err) {\n    console.log(err.message);\n  }\n}\nexecuteTask();',
        expectedOutput: '"Database offline"',
        validate: (code) => {
          code = String(code || '');
          if (!/try\s*\{[\s\S]*await[\s\S]*\}\s*catch/.test(code)) {
            return { valid: false, message: 'Wrap the await call inside a try...catch block.' };
          }
          return { valid: true, message: 'Well done! Standard try/catch cleanly catches rejected promises.' };
        }
      },
      {
        id: 'js-q15-3',
        level: 'Challenge',
        title: 'Concurrent Await with Promise.all',
        prompt: 'Inside an async function loadAll(), use const [user, config] = await Promise.all([Promise.resolve("Alex"), Promise.resolve("Dark")]) and log user + " " + config.',
        requirements: [
          'async function loadAll()',
          'await Promise.all([Promise.resolve("Alex"), Promise.resolve("Dark")])',
          'Log user and config'
        ],
        starterCode: '// Parallel await\n',
        solutionCode: 'async function loadAll() {\n  const [user, config] = await Promise.all([Promise.resolve("Alex"), Promise.resolve("Dark")]);\n  console.log(user + " " + config);\n}\nloadAll();',
        expectedOutput: '"Alex Dark"',
        validate: (code) => {
          code = String(code || '');
          if (!/await\s+Promise\.all/.test(code)) {
            return { valid: false, message: 'Use await Promise.all(...) to run the tasks concurrently.' };
          }
          return { valid: true, message: 'Outstanding! Concurrently awaiting promises eliminates network waterfalls.' };
        }
      }
    ],
    quiz: [
      {
        question: 'What does a function declared with the async keyword ALWAYS return?',
        options: [
          'A Promise (even if you return a primitive value)',
          'undefined',
          'A boolean indicating success',
          'A generator function'
        ],
        correctIndex: 0,
        explanation: 'Any function declared with async automatically wraps its return value in a resolved Promise.'
      },
      {
        question: 'Why should you avoid using await inside an array.forEach() callback?',
        options: [
          'forEach will crash the browser',
          'forEach is not async-aware and will not wait for the promises to settle before continuing execution',
          'forEach only works on strings',
          'JavaScript prohibits functions inside forEach'
        ],
        correctIndex: 1,
        explanation: 'forEach ignores promises returned by its callback, firing all iterations synchronously without waiting for them to finish.'
      },
      {
        question: 'How do you handle errors when using async/await?',
        options: [
          'Using the standard try...catch block around the await expression',
          'By attaching .catch() to every variable',
          'Errors cannot occur with async/await',
          'By using if (error)'
        ],
        correctIndex: 0,
        explanation: 'try...catch wraps awaited promises and intercepts any rejections as standard JavaScript catch exceptions.'
      }
    ],
    video: {
      title: 'JavaScript Async Await Tutorial',
      channel: 'Web Dev Simplified',
      videoId: 'V_Kr9OSfDeU',
      url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
      description: 'Kyle teaches how async and await simplify promise consumption and eliminate callback nesting.'
    }
  },

  // =========================================================================
  // TOPIC 16: Fetch API & HTTP Requests
  // =========================================================================
  {
    id: 'js-topic-16',
    order: 16,
    slug: 'fetch-api',
    title: 'Fetch API & HTTP Requests',
    difficulty: 'Intermediate',
    estimatedTime: '25 min',
    summary:
      'Communicate with RESTful backends: fetch(url, options), parsing responses with res.json(), checking res.ok status (200-299), handling network vs HTTP errors, and making POST requests with JSON payloads.',
    notes: {
      concept:
        'The Fetch API provides a modern, Promise-based interface for making HTTP requests (GET, POST, PUT, DELETE) from the browser. It replaces the legacy XMLHttpRequest API. A fetch() request resolves to a Response object, from which data can be extracted as JSON, text, or binary blob.',
      syntax:
`// 1. Basic GET Request
async function getProfile() {
  const res = await fetch("https://api.codeforge.dev/v1/profile");
  if (!res.ok) throw new Error("HTTP error " + res.status);
  const data = await res.json();
  return data;
}

// 2. POST Request with JSON Body
async function createPost(payload) {
  const res = await fetch("https://api.codeforge.dev/v1/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer token_xyz"
    },
    body: JSON.stringify(payload)
  });
  return await res.json();
}`,
      explanation:
        '1. Two-Step Resolution: fetch() first resolves headers (Response object). You must then call res.json() or res.text() to read and parse the response body stream.\n2. HTTP Status Check (res.ok): Crucial detail! fetch() does NOT reject on HTTP error codes like 404 Not Found or 500 Internal Server Error. It only rejects on real network failures (DNS lookup failure, offline, CORS block). Always check if (!res.ok) throw new Error(...).\n3. Headers: Required for JSON POST requests; Content-Type: application/json tells the server to parse the body as JSON.',
      codeExample:
`// Production-quality API fetch wrapper
async function fetchStudent(id) {
  try {
    const res = await fetch("https://api.example.com/students/" + id);

    // Verify HTTP 200-299 status code
    if (!res.ok) {
      throw new Error("Server responded with status: " + res.status);
    }

    const student = await res.json();
    console.log("Loaded student:", student.name);
    return student;
  } catch (error) {
    console.error("Network or API failure:", error.message);
  }
}`,
      expectedOutput:
        'Logs student details if status is 200-299; logs error message if server returns 404/500 or network fails.',
      commonMistakes: [
        {
          mistake: 'Assuming fetch() rejects automatically on HTTP 404 or 500 status codes.',
          correction: 'Always check if (!res.ok) throw new Error(res.statusText);',
          explanation: 'fetch only rejects on actual network connection failures, not on HTTP status codes returned by the server.'
        },
        {
          mistake: 'Forgetting to await res.json(): const data = res.json();',
          correction: 'Always await the stream reading: const data = await res.json();',
          explanation: 'res.json() returns a Promise that resolves when the entire incoming response body has been downloaded and parsed.'
        },
        {
          mistake: 'Passing a raw JavaScript object to body without JSON.stringify(): body: { name: "Alex" }',
          correction: 'Serialize the object: body: JSON.stringify({ name: "Alex" })',
          explanation: 'HTTP bodies must be strings, FormData, or ArrayBuffers; passing a raw object converts it to the useless string "[object Object]".'
        }
      ]
    },
    tryItYourself: {
      prompt: 'Simulate a fetch call with res.ok verification and JSON stream parsing in the live sandbox.',
      starterCode:
`// Mock Fetch Response simulation
const mockFetch = async (url) => ({
  ok: true,
  status: 200,
  json: async () => ({ id: 42, title: "CodeForge Architecture", author: "Staff" })
});

async function loadCourse() {
  console.log("Fetching API endpoint...");
  const res = await mockFetch("/api/course");
  if (!res.ok) throw new Error("HTTP error " + res.status);
  const course = await res.json();
  console.log("Course loaded:", course.title);
}

loadCourse();`,
      solutionCode:
`const mockFetch = async (url) => ({
  ok: true,
  status: 200,
  json: async () => ({ id: 42, title: "CodeForge Architecture", author: "Staff" })
});

async function loadCourse() {
  console.log("Fetching API endpoint...");
  const res = await mockFetch("/api/course");
  if (!res.ok) throw new Error("HTTP error " + res.status);
  const course = await res.json();
  console.log("Course loaded:", course.title);
}

loadCourse();`
    },
    practiceQuestions: [
      {
        id: 'js-q16-1',
        level: 'Easy',
        title: 'Check res.ok Status',
        prompt: 'Write an if statement: if (!res.ok) throw new Error("Failed"); otherwise log "Success".',
        requirements: [
          'if (!res.ok) throw new Error("Failed");',
          'console.log("Success");'
        ],
        starterCode: '// Check res.ok\n',
        solutionCode: 'if (!res.ok) {\n  throw new Error("Failed");\n} else {\n  console.log("Success");\n}',
        expectedOutput: '"Success"',
        validate: (code) => {
          code = String(code || '');
          if (!/!res\.ok/.test(code)) {
            return { valid: false, message: 'Check if (!res.ok).' };
          }
          if (!/throw\s+new\s+Error/.test(code)) {
            return { valid: false, message: 'Throw a new Error if !res.ok.' };
          }
          return { valid: true, message: 'Great! Checking res.ok is crucial for reliable HTTP handling.' };
        }
      },
      {
        id: 'js-q16-2',
        level: 'Medium',
        title: 'Parse JSON Body',
        prompt: 'In an async function parseData(res), await const data = await res.json(); and return data.',
        requirements: [
          'async function parseData(res)',
          'const data = await res.json()',
          'return data'
        ],
        starterCode: '// Parse response JSON\n',
        solutionCode: 'async function parseData(res) {\n  const data = await res.json();\n  return data;\n}',
        expectedOutput: 'Function returns parsed JSON data.',
        validate: (code) => {
          code = String(code || '');
          if (!/await\s+res\.json\(\)/.test(code)) {
            return { valid: false, message: 'Use await res.json().' };
          }
          return { valid: true, message: 'Well done! res.json() parses the response body stream into a JavaScript object.' };
        }
      },
      {
        id: 'js-q16-3',
        level: 'Challenge',
        title: 'POST Request Configuration Object',
        prompt: 'Declare const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: "dev" }) }. Log options.method.',
        requirements: [
          'Set method: "POST"',
          'Set headers: { "Content-Type": "application/json" }',
          'Set body: JSON.stringify({ role: "dev" })',
          'Log options.method'
        ],
        starterCode: '// Build POST options\n',
        solutionCode: 'const options = {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ role: "dev" })\n};\nconsole.log(options.method);',
        expectedOutput: '"POST"',
        validate: (code) => {
          code = String(code || '');
          if (!/method:\s*["']POST["']/.test(code)) {
            return { valid: false, message: 'Set method: "POST".' };
          }
          if (!/headers:[\s\S]*Content-Type/.test(code)) {
            return { valid: false, message: 'Set Content-Type: application/json header.' };
          }
          if (!/body:\s*JSON\.stringify/.test(code)) {
            return { valid: false, message: 'Serialize body with JSON.stringify().' };
          }
          return { valid: true, message: 'Outstanding! POST configuration configured according to standard REST specifications.' };
        }
      }
    ],
    quiz: [
      {
        question: 'Does fetch() reject its returned Promise when the server responds with a 404 or 500 error?',
        options: [
          'Yes, fetch() rejects on any status code above 399',
          'No! fetch() only rejects on network failures (like loss of internet or CORS violations); it resolves on 404/500 with res.ok set to false',
          'Only in Chrome, not in Safari',
          'It re-executes the request automatically'
        ],
        correctIndex: 1,
        explanation: 'fetch() only rejects when the network request itself fails. Server error codes (404, 500) resolve normally with response.ok === false.'
      },
      {
        question: 'Why is JSON.stringify(payload) required when sending a POST request body?',
        options: [
          'HTTP request bodies must be serialized into a text stream, not raw in-memory JavaScript objects',
          'It encrypts the payload with TLS',
          'JSON.stringify converts objects to HTML',
          'It is only needed in Internet Explorer'
        ],
        correctIndex: 0,
        explanation: 'Network transmission requires serialized text; passing a raw JavaScript object causes it to stringify as "[object Object]".'
      },
      {
        question: 'Which header must you specify to tell an API server that your request body contains JSON data?',
        options: [
          '"Accept": "text/html"',
          '"Content-Type": "application/json"',
          '"Encoding": "utf-8"',
          '"Data-Format": "json"'
        ],
        correctIndex: 1,
        explanation: '"Content-Type": "application/json" is the standard MIME header informing the backend server to parse the body as JSON.'
      }
    ],
    video: {
      title: 'Learn Fetch API In 6 Minutes',
      channel: 'Web Dev Simplified',
      videoId: 'cuEtnrL9-H0',
      url: 'https://www.youtube.com/watch?v=cuEtnrL9-H0',
      description: 'Kyle teaches how to make GET and POST requests using the browser Fetch API, handle responses, and check res.ok.'
    }
  }
];

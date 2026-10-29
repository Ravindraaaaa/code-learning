import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiTerminal,
  FiArrowRight,
  FiCode,
  FiLayers,
  FiPlay,
  FiCheck,
} from 'react-icons/fi';
import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiMongodb,
} from 'react-icons/si';
import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaBug,
} from 'react-icons/fa6';
import { ROUTES } from '../routes/paths.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const programmingLanguages = [
    {
      name: 'Python',
      icon: SiPython,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      level: 'Beginner Friendly',
      desc: 'Clean syntax for fundamentals, data structures, and automation.',
    },
    {
      name: 'JavaScript',
      icon: SiJavascript,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
      level: 'Core Web',
      desc: 'The lingua franca of browsers and asynchronous backend programming.',
    },
    {
      name: 'C++',
      icon: SiCplusplus,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      level: 'Systems & DSA',
      desc: 'High-performance standard for competitive programming and STL.',
    },
    {
      name: 'Java',
      icon: FaJava,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
      level: 'Object-Oriented',
      desc: 'Enterprise-grade architecture and robust object-oriented patterns.',
    },
    {
      name: 'C',
      icon: SiC,
      color: 'text-slate-300',
      bg: 'bg-slate-500/10 border-slate-500/20',
      level: 'Low-Level Foundation',
      desc: 'Direct memory management, pointers, and foundational computer science.',
    },
  ];

  const webTechStack = [
    { name: 'HTML5', icon: FaHtml5, color: 'text-orange-400', role: 'Semantic Structure' },
    { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-400', role: 'Responsive Styling' },
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400', role: 'Client Logic' },
    { name: 'React', icon: FaReact, color: 'text-cyan-400', role: 'Component Architecture' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-emerald-400', role: 'Server Runtime' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500', role: 'Document Database' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose your learning path',
      desc: 'Start with foundational languages like Python or C++, or embark on the full-stack Web Development journey.',
    },
    {
      number: '02',
      title: 'Learn concepts and practice coding',
      desc: 'Understand programming fundamentals step by step, write code in the integrated editor, and test your solutions.',
    },
    {
      number: '03',
      title: 'Review your progress and improve',
      desc: 'Isolate syntax and logical bugs in the Debug Arena, verify test cases, and build verifiable engineering competence.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section id="home" className="relative pt-10 sm:pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span>YOUR CODING JOURNEY STARTS HERE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Learn to Code.{' '}
              <span className="text-violet-400 block sm:inline">Build Your Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Learn programming step by step, practice real coding problems, debug your mistakes, and track your progress &mdash; all in one place.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to={isAuthenticated ? ROUTES.LEARN : ROUTES.REGISTER}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 shadow-glow-primary">
                  <span>Start Learning</span>
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link to={ROUTES.PRACTICE}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                  <FiCode className="w-4 h-4 text-violet-400" />
                  <span>Explore Practice</span>
                </Button>
              </Link>
            </div>

            {/* Quick feature checklist */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Ads or Distractions</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>5 Core Languages</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full-Stack Web Track</span>
              </span>
            </div>
          </div>

          {/* Right Column: Polished Coding Workspace Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1322] shadow-surface-lg overflow-hidden transition-all duration-300 hover:border-violet-500/30">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#090e18] border-b border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-slate-400 text-[11px]">binarySearch.js</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Node.js v24</span>
                </div>
              </div>

              {/* Code Preview Area */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-200">
                <div className="text-slate-500 select-none pb-1">
                  // CodeForge Interactive Workspace
                </div>
                <div className="space-y-0.5">
                  <div>
                    <span className="text-violet-400">function</span>{' '}
                    <span className="text-blue-300">binarySearch</span>(arr, target) &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-violet-400">let</span> left ={' '}
                    <span className="text-amber-300">0</span>, right = arr.length -{' '}
                    <span className="text-amber-300">1</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-violet-400">while</span> (left &lt;= right) &#123;
                  </div>
                  <div className="pl-8">
                    <span className="text-violet-400">const</span> mid = Math.
                    <span className="text-blue-300">floor</span>((left + right) /{' '}
                    <span className="text-amber-300">2</span>);
                  </div>
                  <div className="pl-8">
                    <span className="text-violet-400">if</span> (arr[mid] === target){' '}
                    <span className="text-violet-400">return</span> mid;
                  </div>
                  <div className="pl-8">
                    <span className="text-violet-400">if</span> (arr[mid] &lt; target) left = mid +{' '}
                    <span className="text-amber-300">1</span>;
                  </div>
                  <div className="pl-8">
                    <span className="text-violet-400">else</span> right = mid -{' '}
                    <span className="text-amber-300">1</span>;
                  </div>
                  <div className="pl-4">&#125;</div>
                  <div className="pl-4">
                    <span className="text-violet-400">return</span> -
                    <span className="text-amber-300">1</span>;
                  </div>
                  <div>&#125;</div>
                </div>
              </div>

              {/* Integrated Terminal Panel */}
              <div className="p-3.5 bg-[#070b13] border-t border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center justify-between text-slate-500 pb-1">
                  <span className="flex items-center gap-1.5">
                    <FiTerminal className="w-3.5 h-3.5 text-violet-400" />
                    <span>OUTPUT TERMINAL</span>
                  </span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
                <div className="text-slate-300">
                  &gt; node binarySearch.js --test
                </div>
                <div className="text-emerald-400">
                  &#10003; Test case 1: binarySearch([2, 5, 8, 12, 16], 12) =&gt; index 3
                </div>
                <div className="text-slate-400">
                  Execution time: 14ms &bull; Memory: 18.2 MB
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. LEARNING PATHS SECTION
          ===================================================================== */}
      <section id="learn" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="primary">STRUCTURED CURRICULUM</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Choose Your Learning Path
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Build a strong foundation and progress at your own pace through structured tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Path 1: Core Programming Languages */}
          <div className="rounded-2xl border border-border-subtle bg-surface/80 p-6 sm:p-8 space-y-6 shadow-surface-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                  Track 01
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Programming Languages</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Master fundamentals, memory models, object-oriented principles, and algorithm execution.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                <FiCode className="w-5 h-5" />
              </div>
            </div>

            {/* Language Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {programmingLanguages.map((lang) => {
                const IconComponent = lang.icon;
                return (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-xl border border-slate-800/80 bg-background-deep/70 hover:border-violet-500/30 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${lang.color}`} />
                        <span className="text-sm font-semibold text-white">{lang.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {lang.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">{lang.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link to={ROUTES.LEARN} className="w-full">
                <Button variant="outline" size="md" className="w-full gap-2">
                  <span>Explore Programming Languages</span>
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Path 2: Web Development */}
          <div className="rounded-2xl border border-border-subtle bg-surface/80 p-6 sm:p-8 space-y-6 shadow-surface-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  Track 02
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Full-Stack Web Development</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Learn to design, build, and deploy modern applications from front to back.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <FiLayers className="w-5 h-5" />
              </div>
            </div>

            {/* Web Tech Tiles Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {webTechStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="p-4 rounded-xl border border-slate-800/80 bg-background-deep/70 hover:border-blue-500/30 transition-colors flex flex-col items-center text-center space-y-2"
                  >
                    <IconComponent className={`w-7 h-7 ${tech.color}`} />
                    <span className="text-xs font-semibold text-white">{tech.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{tech.role}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link to={ROUTES.LEARN} className="w-full">
                <Button variant="outline" size="md" className="w-full gap-2">
                  <span>Explore Web Development Track</span>
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PRACTICE SECTION
          ===================================================================== */}
      <section id="practice" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="rounded-2xl border border-border-subtle bg-surface/70 p-8 sm:p-12 shadow-surface-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Practice Info */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <Badge variant="primary">PROBLEM SOLVING</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Practice. Improve. Repeat.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Reading tutorials is only the first step. True understanding comes from solving real coding problems, handling edge cases, and verifying solutions against comprehensive test suites.
              </p>

              <div className="space-y-2.5 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-[10px]">
                    &#10003;
                  </div>
                  <span>Algorithmic questions across Arrays, Strings, Trees, and DP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-[10px]">
                    &#10003;
                  </div>
                  <span>Real-time compiler feedback with sandbox security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-[10px]">
                    &#10003;
                  </div>
                  <span>Difficulty tiers tailored for steady progression</span>
                </div>
              </div>

              <div className="pt-2">
                <Link to={ROUTES.PRACTICE}>
                  <Button variant="primary" size="md" className="gap-2 shadow-glow-primary">
                    <span>Enter Practice Arena</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Algorithmic Question Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-slate-800 bg-[#0a0f1b] p-5 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-white">Problem: Two Sum</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                    Easy
                  </span>
                </div>

                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Given an array of integers <code className="text-amber-300">nums</code> and an integer <code className="text-amber-300">target</code>, return indices of the two numbers such that they add up to target.
                </p>

                <div className="p-3 rounded-lg bg-[#060911] border border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="text-slate-500">// Example 1:</div>
                  <div className="text-slate-300"><span className="text-violet-400">Input:</span> nums = [2, 7, 11, 15], target = 9</div>
                  <div className="text-emerald-400"><span className="text-violet-400">Output:</span> [0, 1]</div>
                  <div className="text-slate-500">// Explanation: nums[0] + nums[1] == 9, we return [0, 1].</div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FiPlay className="w-3 h-3 text-emerald-400" />
                    <span>Run test cases against standard library</span>
                  </span>
                  <span className="text-violet-400 font-semibold">Ready to Solve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. DEBUG ARENA SECTION
          ===================================================================== */}
      <section id="debug-arena" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="warning">PRACTICAL ENGINEERING SKILL</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Find the Bug. Understand the Logic.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Develop your debugging skills by identifying mistakes, understanding errors, and improving your problem-solving approach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Code Inspection Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1322] shadow-surface-md overflow-hidden">
              <div className="px-4 py-3 bg-[#080d16] border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FaBug className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-white text-[11px]">Challenge: Loop Boundary Error</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Syntax &amp; Runtime Bug
                </span>
              </div>

              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed space-y-1 text-slate-300">
                <div className="text-slate-500">// Faulty implementation:</div>
                <div><span className="text-violet-400">function</span> <span className="text-blue-300">printElements</span>(arr) &#123;</div>
                <div className="pl-4 bg-rose-500/10 border-l-2 border-rose-500 px-2 py-0.5 my-1 text-rose-300">
                  <span className="text-violet-400">for</span> (<span className="text-violet-400">let</span> i = 0; i &lt;= arr.length; i++) &#123; <span className="text-rose-400 font-bold">// &larr; BUG: Out of bounds</span>
                </div>
                <div className="pl-8">console.<span className="text-blue-300">log</span>(arr[i]);</div>
                <div className="pl-4">&#125;</div>
                <div>&#125;</div>

                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <div className="text-rose-400 font-semibold flex items-center gap-1.5">
                    <span>&#10007; Runtime Warning:</span>
                    <span>arr[arr.length] evaluates to undefined</span>
                  </div>
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>&#10003; The Fix:</span>
                    <span>Adjust condition from &apos;&lt;=&apos; to &apos;&lt;&apos; to avoid accessing beyond array bounds.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation & Action */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Why Debugging Matters
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real software development is 80% reading and troubleshooting code. The CodeForge Debug Arena challenges you to examine broken snippets, diagnose stack traces, and submit clean fixes.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Off-by-one errors &amp; pointer null checks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Scope conflicts &amp; type mismatches</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Hidden test case verification</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link to={ROUTES.DEBUG_ARENA}>
                <Button variant="secondary" size="md" className="gap-2 shadow-glow-violet">
                  <span>Launch Debug Arena</span>
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. HOW CODEFORGE WORKS
          ===================================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="primary">SIMPLE THREE-STEP METHOD</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How CodeForge Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A structured progression model designed to guide beginners into confident developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-800/80 bg-surface/60 p-6 sm:p-8 space-y-4 hover:border-violet-500/30 transition-colors"
            >
              <div className="text-3xl font-extrabold font-mono text-violet-400">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. ABOUT SECTION ANCHOR
          ===================================================================== */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 scroll-mt-24">
        <div className="rounded-2xl border border-slate-800 bg-[#0c1220] p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-violet-400 font-semibold tracking-wider uppercase">
              ABOUT THE PLATFORM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Built for Focused, Ad-Free Computer Science Learning
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              CodeForge is an online programming learning and practice platform built specifically for college students and developers seeking clear, distraction-free technical growth. We emphasize hands-on coding, verified knowledge assessments, and practical debugging over passive video watching.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-[#070b13] border border-slate-800 space-y-1">
                <span className="font-semibold text-white">Deterministic Evaluation</span>
                <p className="text-slate-400">Code executes in secure sandboxes with automated test suites.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#070b13] border border-slate-800 space-y-1">
                <span className="font-semibold text-white">Curated Curriculum</span>
                <p className="text-slate-400">From core C memory models to modern React and MongoDB architectures.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#070b13] border border-slate-800 space-y-1">
                <span className="font-semibold text-white">Authentic Progress</span>
                <p className="text-slate-400">Zero fake metrics. Every completed challenge reflects genuine effort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. FINAL CALL TO ACTION
          ===================================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-b from-[#131b2e] to-[#0a0f1d] p-8 sm:p-14 text-center space-y-6 shadow-surface-lg">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Your Next Line of Code Starts Here.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Join CodeForge today and take your programming skills to the next level with hands-on practice, lessons, and challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to={isAuthenticated ? ROUTES.LEARN : ROUTES.REGISTER}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 shadow-glow-primary">
                <span>{isAuthenticated ? 'Continue Learning' : 'Start Learning Free'}</span>
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to={ROUTES.LEARN}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse All Tracks
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

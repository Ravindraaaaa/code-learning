import React, { useState, useEffect } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import { Card } from '../common/Card.jsx';
import { Button } from '../common/Button.jsx';

export const TryItSandbox = ({
  tryItYourself,
  moduleSlug = 'html',
}) => {
  const [code, setCode] = useState('');
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    if (tryItYourself?.starterCode) {
      setCode(tryItYourself.starterCode);
      setPreviewKey((k) => k + 1);
    }
  }, [tryItYourself]);

  if (!tryItYourself) return null;

  const handleReset = () => {
    setCode(tryItYourself.starterCode || '');
    setPreviewKey((k) => k + 1);
  };

  const isCss = moduleSlug === 'css';
  const isJs = moduleSlug === 'javascript';
  const isReact = moduleSlug === 'react';
  const labelText = isCss
    ? 'HTML & CSS SOURCE'
    : isJs
    ? 'JAVASCRIPT SOURCE CODE'
    : isReact
    ? 'REACT (JSX) COMPONENT SOURCE'
    : 'HTML SOURCE CODE';

  const getPreviewDoc = () => {
    if (isReact) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 14px;
      background: #0b0f19;
      color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
    }
    #root {
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px dashed rgba(255,255,255,0.15);
      min-height: 30px;
    }
    #console-header {
      font-size: 10px;
      font-weight: bold;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }
    #console-output {
      font-family: ui-monospace, monospace;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .log-line { padding: 2px 0; color: #facc15; }
    .log-error { color: #f87171; background: rgba(239,68,68,0.12); padding: 4px; border-radius: 4px; }
    button {
      background: #06b6d4;
      color: #0b0f19;
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin: 4px;
    }
    button:hover { background: #22d3ee; }
    input {
      background: #1e293b;
      border: 1px solid #334155;
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      margin: 4px;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="console-header">React Component Console:</div>
  <div id="console-output"></div>

  <script>
    (function() {
      const con = document.getElementById('console-output');
      function print(cls, args) {
        const d = document.createElement('div');
        d.className = 'log-line ' + cls;
        d.textContent = args.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' ');
        con.appendChild(d);
      }
      console.log = function(...args) { print('log-line', args); };
      console.error = function(...args) { print('log-error', args); };
    })();
  </script>

  <script type="text/babel">
    try {
      const { useState, useEffect, useRef, useMemo, useCallback, useReducer, createContext, useContext } = React;
      ${code}

      const rootElement = document.getElementById('root');
      if (typeof App !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<App />);
      } else if (typeof Counter !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<Counter />);
      } else if (typeof FocusInput !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<FocusInput />);
      } else if (typeof SquareCalculator !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<SquareCalculator />);
      } else if (typeof LiveMirror !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<LiveMirror />);
      } else if (typeof HoverBox !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<HoverBox />);
      } else if (typeof DocumentTitleChanger !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<DocumentTitleChanger />);
      } else if (typeof MiniTaskManager !== 'undefined') {
        ReactDOM.createRoot(rootElement).render(<MiniTaskManager />);
      } else {
        rootElement.innerHTML = '<div style="color:#38bdf8;">✓ React component compiled successfully.</div>';
      }
    } catch (err) {
      document.getElementById('console-output').innerHTML = '<div class="log-error">' + err.message + '</div>';
    }
  </script>
</body>
</html>`;
    }

    if (!isJs) return code;
    if (code.includes('<html') || code.includes('<!DOCTYPE') || code.includes('<script')) {
      return code;
    }
    // Safely embed JS into live browser DOM sandbox with console logger
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 14px;
      background: #0b0f19;
      color: #f1f5f9;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      line-height: 1.5;
    }
    #dom-output {
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px dashed rgba(255,255,255,0.15);
      min-height: 20px;
    }
    #console-header {
      font-size: 10px;
      font-weight: bold;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }
    #console-output {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .log-line {
      padding: 3px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .log-info { color: #facc15; }
    .log-error { color: #f87171; background: rgba(239,68,68,0.12); padding: 4px 6px; border-radius: 4px; }
    .log-warn { color: #fb923c; }
  </style>
</head>
<body>
  <div id="dom-output"></div>
  <div id="console-header">Console Output (Live Execution):</div>
  <div id="console-output"></div>
  <script>
    (function() {
      const con = document.getElementById('console-output');
      const dom = document.getElementById('dom-output');
      function format(v) {
        if (v === null) return 'null';
        if (v === undefined) return 'undefined';
        if (typeof v === 'object') {
          try { return JSON.stringify(v, null, 2); } catch(e) { return String(v); }
        }
        return String(v);
      }
      function print(cls, args) {
        const d = document.createElement('div');
        d.className = 'log-line ' + cls;
        d.textContent = Array.from(args).map(format).join(' ');
        con.appendChild(d);
      }
      console.log = function(...args) { print('log-info', args); };
      console.error = function(...args) { print('log-error', args); };
      console.warn = function(...args) { print('log-warn', args); };
      console.info = function(...args) { print('log-info', args); };
      try {
        ${code}
      } catch (err) {
        console.error(err.name + ': ' + err.message);
      }
    })();
  </script>
</body>
</html>`;
  };

  return (
    <Card className="rounded-2xl border-border-subtle bg-surface/90 p-6 sm:p-8 shadow-surface-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
            <Play className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
              Interactive Sandbox
            </span>
            <h3 className="font-bold text-base sm:text-lg text-content-primary">
              Try It Yourself
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-content-muted hover:text-content-primary"
            title="Reset code to original starter snippet"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Reset Code</span>
          </Button>
        </div>
      </div>

      <p className="text-xs text-content-muted leading-relaxed">
        {tryItYourself.prompt}
      </p>

      {/* Split Editor and Real Browser Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        {/* Left: Code Editor */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-content-subtle">
            <span>{labelText}</span>
            <span>Live Rendering</span>
          </div>
          <textarea
            rows={12}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setPreviewKey((k) => k + 1);
            }}
            placeholder="<!-- Write code here and watch live preview -->"
            className="w-full rounded-xl bg-black/70 border border-border-subtle text-violet-200 font-mono text-xs p-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/60 leading-relaxed resize-y h-64 sm:h-72"
            spellCheck="false"
          />
        </div>

        {/* Right: Live Browser Rendered Sandbox iframe */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-content-subtle">
            <span>BROWSER PREVIEW (LIVE DOM)</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
          <div className="w-full rounded-xl bg-white border border-border-subtle overflow-hidden h-64 sm:h-72 shadow-surface-sm">
            <iframe
              key={previewKey}
              srcDoc={getPreviewDoc()}
              title="Try It Yourself Preview"
              sandbox="allow-scripts"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};


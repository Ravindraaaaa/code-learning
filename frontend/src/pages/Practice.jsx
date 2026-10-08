import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import api from '../services/api';

const LANGUAGE_VERSIONS = {
  javascript: '18.15.0',
  python: '3.10.0',
  java: '15.0.2',
  cpp: '10.2.0',
  c: '10.2.0'
};

const DEFAULT_CODE = {
  javascript: 'console.log("Hello, CodeForge!");\n',
  python: 'print("Hello, CodeForge!")\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeForge!");\n    }\n}\n',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, CodeForge!" << std::endl;\n    return 0;\n}\n',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, CodeForge!\\n");\n    return 0;\n}\n'
};

const Practice = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(DEFAULT_CODE['javascript']);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    setCode(DEFAULT_CODE[language]);
    setOutput('');
    setError('');
    setTestResult(null);
  }, [language]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Executing code in secure sandbox...\n');
    setError('');
    setTestResult(null);
    try {
      const res = await api.post('/code/execute', { language, code, input: '' });
      if (res.data?.data?.status === 'error') {
        setError(res.data.data.error || 'Execution Error');
        setOutput(res.data.data.output || '');
      } else {
        setOutput(res.data?.data?.output || 'Execution finished successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to execute code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTestResult(null);
    try {
      const res = await api.post('/code/submit', { language, code, questionId: 'dummy-question-123' });
      setTestResult(res.data?.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] gap-4 p-4 animate-fade-in">
      {/* Left Panel: Problem Statement */}
      <Card className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">1. Two Sum</h2>
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Easy</span>
            <span className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded border border-slate-700">Arrays</span>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
            <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
            <p>You can return the answer in any order.</p>
            <br />
            <strong>Example 1:</strong>
            <pre className="bg-slate-900 p-3 rounded-md border border-slate-800 text-sm mt-2 text-slate-300">
              <code>Input: nums = [2,7,11,15], target = 9{'\n'}Output: [0,1]{'\n'}Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code>
            </pre>
          </div>
        </div>
      </Card>

      {/* Right Panel: Editor and Terminal */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Editor Settings Bar */}
        <Card className="p-3 flex items-center justify-between">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-violet-500 focus:border-violet-500 block p-2 outline-none"
          >
            {Object.keys(LANGUAGE_VERSIONS).map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)} ({LANGUAGE_VERSIONS[lang]})
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRun} disabled={isRunning || isSubmitting} className="font-mono">
              <Play className="w-4 h-4 mr-2 text-emerald-400" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isRunning || isSubmitting} className="font-mono bg-violet-600 hover:bg-violet-700 text-white">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </Card>

        {/* Monaco Editor */}
        <Card className="flex-1 min-h-[400px] overflow-hidden rounded-md border border-slate-800">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 }
            }}
          />
        </Card>

        {/* Console / Terminal */}
        <Card className="h-64 flex flex-col overflow-hidden bg-slate-950 border border-slate-800 rounded-md">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-sm font-mono text-slate-400">Console</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {error && (
              <div className="text-red-400 mb-2 flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                <pre className="whitespace-pre-wrap font-sans">{error}</pre>
              </div>
            )}
            
            {testResult && (
              <div className={`mb-4 p-3 rounded-md border ${testResult.passed ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400' : 'bg-red-950/30 border-red-900/50 text-red-400'}`}>
                <div className="flex items-center mb-1 font-bold">
                  {testResult.passed ? <CheckCircle2 className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                  {testResult.passed ? 'Accepted' : 'Wrong Answer'}
                </div>
                <p>{testResult.details}</p>
                <p className="mt-1 opacity-75">Score: {testResult.score}/100</p>
              </div>
            )}

            {!error && output && (
              <div className="text-slate-300">
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            )}
            
            {!output && !error && !testResult && (
              <span className="text-slate-600 italic">Run your code to see output here...</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Practice;

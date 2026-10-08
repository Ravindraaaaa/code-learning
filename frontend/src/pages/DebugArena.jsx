import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Send, AlertCircle, CheckCircle2, Bug as BugIcon, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import api from '../services/api';

const DebugArena = () => {
  const [challenges, setChallenges] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await api.get('/debug-arena/challenges');
      setChallenges(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setCode(challenge.buggyCode);
    setOutput('');
    setError('');
    setTestResult(null);
  };

  const handleBackToList = () => {
    setActiveChallenge(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running your code in the sandbox...\n');
    setError('');
    setTestResult(null);
    try {
      const res = await api.post('/code/execute', { 
        language: activeChallenge.language, 
        code, 
        input: '' 
      });
      if (res.data?.data?.status === 'error' || res.data?.data?.status === 'compile_error' || res.data?.data?.status === 'runtime_error') {
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
      const res = await api.post(`/debug-arena/challenges/${activeChallenge._id}/submit`, { 
        submittedCode: code 
      });
      setTestResult(res.data?.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading Debug Arena...</div>;
  }

  if (!activeChallenge) {
    return (
      <div className="max-w-7xl mx-auto p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <BugIcon className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Debug Arena</h1>
            <p className="text-slate-400 mt-1">Diagnose and patch intentional algorithm bugs under rigorous test suites.</p>
          </div>
        </div>

        {challenges.length === 0 ? (
          <Card className="p-12 text-center text-slate-400 border-dashed border-slate-700">
            No debug challenges available right now. Check back later!
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <Card 
                key={challenge._id} 
                className="p-6 cursor-pointer hover:border-violet-500/50 transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] group flex flex-col"
                onClick={() => handleSelectChallenge(challenge)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-violet-400 transition-colors">
                    {challenge.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                    challenge.bugType === 'Syntax' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    challenge.bugType === 'Logical' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {challenge.bugType}
                  </span>
                </div>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                  <span className="text-xs font-mono text-slate-500 uppercase">{challenge.language}</span>
                  <span className={`text-xs font-bold ${
                    challenge.difficulty === 'Beginner' ? 'text-emerald-400' :
                    challenge.difficulty === 'Intermediate' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] gap-4 p-4 animate-fade-in">
      {/* Left Panel: Problem Statement */}
      <Card className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto relative">
        <button 
          onClick={handleBackToList}
          className="absolute top-6 right-6 p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="Back to Challenges"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2 pr-12">{activeChallenge.title}</h2>
          <div className="flex gap-2 mb-4">
            <span className={`px-2 py-1 text-xs font-bold rounded border ${
              activeChallenge.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              activeChallenge.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
              'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {activeChallenge.difficulty}
            </span>
            <span className={`px-2 py-1 text-xs font-bold rounded border ${
              activeChallenge.bugType === 'Syntax' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
              activeChallenge.bugType === 'Logical' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
              'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {activeChallenge.bugType} Bug
            </span>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="whitespace-pre-wrap font-sans">{activeChallenge.description}</p>
          </div>
        </div>
        
        {testResult && (
          <div className="mt-auto border-t border-slate-800 pt-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Execution Summary</h3>
            <div className={`p-4 rounded-md border ${
              testResult.status === 'Passed' ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-red-950/30 border-red-900/50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center font-bold">
                  {testResult.status === 'Passed' ? (
                    <><CheckCircle2 className="w-6 h-6 mr-2 text-emerald-400" /><span className="text-emerald-400 text-xl">All Tests Passed!</span></>
                  ) : (
                    <><AlertCircle className="w-6 h-6 mr-2 text-red-400" /><span className="text-red-400 text-xl">{testResult.status}</span></>
                  )}
                </div>
                <div className="flex items-center text-slate-400 font-mono text-sm bg-slate-900 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 mr-2 text-violet-400" />
                  {testResult.executionTimeMs}ms
                </div>
              </div>
              
              <p className="text-slate-300 mb-4 bg-slate-900/50 p-3 rounded">{testResult.feedback}</p>
              
              <div className="space-y-2">
                {testResult.testCaseResults.map((tc, idx) => (
                  <div key={tc.testCaseId} className={`flex items-start justify-between p-2 rounded ${tc.passed ? 'bg-emerald-900/20' : 'bg-red-900/20 border border-red-900/30'}`}>
                    <div className="flex items-center">
                      {tc.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> : <AlertCircle className="w-4 h-4 text-red-500 mr-2" />}
                      <span className="text-sm font-mono text-slate-300">Test Case #{idx + 1}</span>
                    </div>
                    {!tc.passed && tc.error && (
                      <span className="text-xs text-red-400 font-mono max-w-[200px] truncate">{tc.error}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Right Panel: Editor and Terminal */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Editor Settings Bar */}
        <Card className="p-3 flex items-center justify-between">
          <div className="flex items-center bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
            <span className="text-slate-400 text-sm font-mono mr-2">Language:</span>
            <span className="text-violet-400 font-bold font-mono text-sm uppercase">{activeChallenge.language}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRun} disabled={isRunning || isSubmitting} className="font-mono">
              <Play className="w-4 h-4 mr-2 text-emerald-400" />
              {isRunning ? 'Running...' : 'Run'}
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isRunning || isSubmitting} className="font-mono bg-violet-600 hover:bg-violet-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Testing...' : 'Submit Fix'}
            </Button>
          </div>
        </Card>

        {/* Monaco Editor */}
        <Card className="flex-1 min-h-[300px] overflow-hidden rounded-md border border-slate-800">
          <Editor
            height="100%"
            language={activeChallenge.language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
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
            <span className="text-sm font-mono text-slate-400 flex items-center"><Play className="w-3 h-3 mr-2" /> Console Output</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {error && (
              <div className="text-red-400 mb-2 flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                <pre className="whitespace-pre-wrap font-sans">{error}</pre>
              </div>
            )}
            
            {!error && output && (
              <div className="text-slate-300">
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            )}
            
            {!output && !error && (
              <span className="text-slate-600 italic">Console output will appear here when you hit Run...</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DebugArena;

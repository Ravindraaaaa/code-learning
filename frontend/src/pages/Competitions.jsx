import React, { useState, useEffect } from 'react';
import { Trophy, Users, Clock, PlayCircle, Send, Code2, ArrowLeft } from 'lucide-react';
import { Editor } from '@monaco-editor/react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import api from '../services/api';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [activeComp, setActiveComp] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const res = await api.get('/competitions');
      setCompetitions(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (comp) => {
    try {
      // Try to join, ignore 400 if already joined
      try {
        await api.post(`/competitions/${comp._id}/join`);
      } catch (err) {
        if (err.response?.status !== 400) throw err;
      }
      
      const compRes = await api.get(`/competitions/${comp._id}`);
      setActiveComp(compRes.data.data);
      
      const qRes = await api.get(`/competitions/${comp._id}/questions`);
      setQuestions(qRes.data.data);
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
    setCode('// Write your code here\n');
    setSubmitResult(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.post(`/competitions/${activeComp._id}/questions/${activeQuestion._id}/submit`, {
        language,
        code
      });
      setSubmitResult(res.data.data);
      
      // Refresh score
      const compRes = await api.get(`/competitions/${activeComp._id}`);
      setActiveComp(compRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Competitions...</div>;

  // View 3: Coding a question
  if (activeQuestion) {
    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] gap-4 p-4 animate-fade-in">
        <Card className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto relative">
          <button onClick={() => setActiveQuestion(null)} className="absolute top-6 right-6 p-2 rounded hover:bg-slate-800 text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold text-slate-100 mb-2 pr-8">{activeQuestion.title}</h2>
          <div className="text-sm text-violet-400 font-bold mb-4">{activeQuestion.points} Points</div>
          
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="whitespace-pre-wrap font-sans">{activeQuestion.description}</p>
          </div>
          
          {submitResult && (
            <div className={`mt-8 p-4 rounded-md border ${submitResult.passed ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-red-950/30 border-red-900/50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${submitResult.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                {submitResult.passed ? 'All Hidden Tests Passed!' : 'Tests Failed'}
              </h3>
              {submitResult.passed && (
                <p className="text-emerald-200">You earned {submitResult.scoreAwarded} points!</p>
              )}
            </div>
          )}
        </Card>

        <div className="flex-1 flex flex-col gap-4">
          <Card className="p-3 flex items-center justify-between">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded p-2">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isSubmitting} className="bg-violet-600 hover:bg-violet-700">
              <Send className="w-4 h-4 mr-2" /> {isSubmitting ? 'Evaluating...' : 'Submit Code'}
            </Button>
          </Card>
          <Card className="flex-1 min-h-[400px] overflow-hidden rounded-md border border-slate-800">
            <Editor height="100%" language={language} theme="vs-dark" value={code} onChange={setCode} options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'JetBrains Mono' }} />
          </Card>
        </div>
      </div>
    );
  }

  // View 2: Inside a competition (Problem List)
  if (activeComp) {
    return (
      <div className="max-w-5xl mx-auto p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">{activeComp.title}</h1>
            <p className="text-slate-400 mt-1">Your Total Score: <span className="text-violet-400 font-bold text-lg">{activeComp.totalScore || 0}</span></p>
          </div>
          <Button variant="outline" onClick={() => setActiveComp(null)}>Leave Arena</Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {questions.map(q => (
            <Card key={q._id} className="p-6 flex items-center justify-between hover:border-violet-500/30">
              <div>
                <h3 className="text-xl font-bold text-slate-200">{q.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{q.points} Points available</p>
              </div>
              <Button variant="primary" onClick={() => handleSelectQuestion(q)}>
                <Code2 className="w-4 h-4 mr-2" /> Solve
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // View 1: List Competitions
  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-500/20 rounded-lg">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Competitions</h1>
          <p className="text-slate-400 mt-1">Live coding contests and algorithmic sprints.</p>
        </div>
      </div>

      {competitions.length === 0 ? (
        <Card className="p-12 text-center text-slate-400 border-dashed border-slate-700">
          No competitions running right now. Check back later!
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map(comp => (
            <Card key={comp._id} className="p-6 flex flex-col hover:border-amber-500/30">
              <h3 className="text-xl font-bold text-slate-200 mb-2">{comp.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">{comp.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Ends {new Date(comp.endTime).toLocaleDateString()}</span>
              </div>
              <Button variant="primary" className="w-full justify-center bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold" onClick={() => handleJoin(comp)}>
                Enter Arena
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Competitions;

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, FileText, AlertCircle, PlayCircle, Award } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import api from '../services/api';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Test execution state
  const [answers, setAnswers] = useState({});
  const [startedAt, setStartedAt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await api.get('/tests');
      setTests(res.data.data);
    } catch (err) {
      console.error('Failed to fetch tests', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = (test) => {
    setActiveTest(test);
    setStartedAt(new Date().toISOString());
    setAnswers({});
    setTestResult(null);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({
        questionId,
        selectedOptionIndex
      }));

      const res = await api.post(`/tests/${activeTest._id}/submit`, {
        answers: formattedAnswers,
        startedAt
      });
      setTestResult(res.data.data);
    } catch (err) {
      console.error('Failed to submit test', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTests = () => {
    setActiveTest(null);
    setTestResult(null);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading Tests...</div>;
  }

  // State 3: Show Test Results
  if (testResult) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-fade-in">
        <Card className="p-8 text-center border-t-4 border-t-emerald-500">
          <Award className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-100 mb-2">Test Submitted!</h2>
          <p className="text-slate-400 mb-8">You have successfully completed {activeTest?.title}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-slate-900 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Score</p>
              <p className="text-2xl font-bold text-slate-200">{testResult.score}</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Max Points</p>
              <p className="text-2xl font-bold text-slate-200">{testResult.totalPoints}</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Percentage</p>
              <p className={`text-2xl font-bold ${testResult.percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {testResult.percentage.toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Questions Answered</p>
              <p className="text-2xl font-bold text-slate-200">{testResult.answers.length}</p>
            </div>
          </div>

          <Button variant="primary" onClick={handleBackToTests}>Back to Tests</Button>
        </Card>
      </div>
    );
  }

  // State 2: Taking the Test
  if (activeTest) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8 bg-slate-900 p-4 rounded-lg border border-slate-800 sticky top-4 z-10 shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-100">{activeTest.title}</h2>
            <div className="flex items-center text-sm text-slate-400 mt-1">
              <Clock className="w-4 h-4 mr-1" /> {activeTest.durationMinutes} Minutes Allotted
            </div>
          </div>
          <Button variant="primary" onClick={handleSubmitTest} disabled={isSubmitting} className="bg-violet-600 hover:bg-violet-700 text-white">
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </Button>
        </div>

        <div className="space-y-6">
          {activeTest.questions.map((question, qIdx) => (
            <Card key={question._id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-slate-200">
                  <span className="text-violet-400 font-bold mr-2">Q{qIdx + 1}.</span> 
                  {question.questionText}
                </h3>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">{question.points} Points</span>
              </div>
              
              <div className="space-y-3">
                {question.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(question._id, optIdx)}
                    className={`w-full text-left p-4 rounded-md border transition-all ${
                      answers[question._id] === optIdx 
                        ? 'bg-violet-600/20 border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.2)] text-violet-200' 
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        answers[question._id] === optIdx ? 'border-violet-400 bg-violet-600/30' : 'border-slate-600'
                      }`}>
                        {answers[question._id] === optIdx && <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />}
                      </div>
                      {opt}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // State 1: List Tests
  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-violet-500/20 rounded-lg">
          <FileText className="w-8 h-8 text-violet-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Assessments & Tests</h1>
          <p className="text-slate-400 mt-1">Timed skill evaluations and algorithmic benchmarks.</p>
        </div>
      </div>

      {tests.length === 0 ? (
        <Card className="p-12 text-center text-slate-400 border-dashed border-slate-700">
          No weekly tests available right now. Check back later!
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map(test => (
            <Card key={test._id} className="p-6 flex flex-col hover:border-violet-500/30 transition-colors">
              <h3 className="text-xl font-bold text-slate-200 mb-2">{test.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">{test.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {test.durationMinutes}m</span>
                <span className="flex items-center"><FileText className="w-4 h-4 mr-1" /> {test.questions.length} Questions</span>
              </div>

              <Button 
                variant="primary" 
                className="w-full justify-center"
                onClick={() => handleStartTest(test)}
              >
                <PlayCircle className="w-4 h-4 mr-2" /> Start Test
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tests;

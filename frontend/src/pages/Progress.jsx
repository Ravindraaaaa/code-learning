import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Bug, Award, Trophy, Map, Flame, Target } from 'lucide-react';
import { Card } from '../components/common/Card.jsx';
import api from '../services/api.js';

const Progress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await api.get('/student/progress');
      setProgress(res.data.data);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading your progress...</div>;
  }

  if (!progress) {
    return <div className="p-8 text-center text-slate-400">Unable to load progress data.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-violet-500/20 rounded-lg">
          <TrendingUp className="w-8 h-8 text-violet-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">My Progress</h1>
          <p className="text-slate-400 mt-1">Real-time statistics based on your authentic activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <Card className="p-6 border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/20 rounded-md">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
              Best: {progress.longestStreak} Days
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-100 mb-1">{progress.streak}</h3>
            <p className="text-slate-400 text-sm font-medium">Day Streak</p>
          </div>
        </Card>

        {/* Questions Solved */}
        <Card className="p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-md">
              <Target className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-100 mb-1">{progress.questionsSolved}</h3>
            <p className="text-slate-400 text-sm font-medium">Total Questions Solved</p>
          </div>
        </Card>

        {/* Debug Challenges */}
        <Card className="p-6 border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/20 rounded-md">
              <Bug className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-100 mb-1">{progress.debugChallengesPassed}</h3>
            <p className="text-slate-400 text-sm font-medium">Bugs Squashed</p>
          </div>
        </Card>

        {/* Lessons Completed */}
        <Card className="p-6 border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-500/20 rounded-md">
              <BookOpen className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-100 mb-1">{progress.lessonsCompleted}</h3>
            <p className="text-slate-400 text-sm font-medium">Lessons Completed</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Roadmap Progress */}
        <Card className="p-6 flex flex-col md:col-span-1 border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <Map className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-200">Roadmap Progress</h3>
          </div>
          
          {progress.roadmap.hasRoadmap ? (
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Topics Mastered</span>
                <span className="font-mono text-indigo-400 font-bold">{progress.roadmap.topicsCompleted} / {progress.roadmap.totalTopics}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 mb-4 border border-slate-700 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-4 rounded-full transition-all duration-1000 relative overflow-hidden shadow-glow-blue" 
                  style={{ width: `${progress.roadmap.progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-full animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'}}></div>
                </div>
              </div>
              <div className="text-center text-4xl font-black text-slate-100 mt-2">{progress.roadmap.progressPercentage}%</div>
            </div>
          ) : (
             <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic border border-dashed border-slate-700 rounded-lg bg-slate-800/30 p-4 text-center">
               No active roadmap selected. Start a roadmap to track topics!
             </div>
          )}
        </Card>

        {/* Test Performance */}
        <Card className="p-6 flex flex-col md:col-span-1 border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-200">Test Performance</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-black text-amber-400 mb-1 drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">{progress.averageTestScore}%</p>
              <p className="text-slate-400 text-sm">Average Score</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-4 mt-2">
               <div className="text-center">
                 <p className="text-xl font-bold text-slate-200">{progress.testsTaken}</p>
                 <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Tests Taken</p>
               </div>
               <div className="text-center border-l border-slate-700/50">
                 <p className="text-xl font-bold text-slate-200">{progress.testsTaken > 0 ? 'Active' : 'None'}</p>
                 <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Status</p>
               </div>
            </div>
          </div>
        </Card>

        {/* Competitions */}
        <Card className="p-6 flex flex-col md:col-span-1 border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-bold text-slate-200">Competitions</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-black text-yellow-500 mb-1 drop-shadow-[0_0_15px_rgba(234,179,8,0.2)]">{progress.totalCompetitionScore}</p>
              <p className="text-slate-400 text-sm">Total Points Earned</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-4 mt-2">
               <div className="text-center">
                 <p className="text-xl font-bold text-slate-200">{progress.competitionsJoined}</p>
                 <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Joined</p>
               </div>
               <div className="text-center border-l border-slate-700/50">
                 <p className="text-xl font-bold text-slate-200">{progress.totalCompetitionScore > 0 ? 'Ranked' : 'Unranked'}</p>
                 <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Standing</p>
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Progress;

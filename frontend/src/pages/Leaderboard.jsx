import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Code, Award } from 'lucide-react';
import { Card } from '../components/common/Card';
import api from '../services/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/leaderboard');
      setLeaderboard(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Medal className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />;
      case 2: return <Medal className="w-7 h-7 text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.5)]" />;
      case 3: return <Medal className="w-6 h-6 text-amber-700 drop-shadow-[0_0_10px_rgba(180,83,9,0.5)]" />;
      default: return <span className="text-xl font-bold text-slate-500 w-8 text-center">{rank}</span>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading Rankings...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-yellow-500/20 rounded-lg">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Global Leaderboard</h1>
          <p className="text-slate-400 mt-1">Real-time rankings based on competition performance and solved challenges.</p>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <Card className="p-12 text-center text-slate-400 border-dashed border-slate-700 flex flex-col items-center">
          <Award className="w-16 h-16 mb-4 text-slate-600" />
          <h3 className="text-xl font-bold text-slate-300 mb-2">No participants yet.</h3>
          <p>Join a competition and submit code to be the first on the board!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-bold text-slate-400 border-b border-slate-800">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-6 md:col-span-5">Hacker</div>
            <div className="hidden md:flex col-span-3 justify-center">Primary Stack</div>
            <div className="hidden md:flex col-span-2 justify-end">Solved</div>
            <div className="col-span-4 md:col-span-1 text-right">Score</div>
          </div>

          {/* Leaderboard Entries */}
          {leaderboard.map((entry) => (
            <Card key={entry.student.id} className={`p-4 flex items-center grid grid-cols-12 gap-4 hover:bg-slate-800/50 transition-colors ${entry.rank === 1 ? 'border-yellow-500/30 bg-yellow-900/10' : ''}`}>
              <div className="col-span-2 md:col-span-1 flex justify-center items-center">
                {getRankIcon(entry.rank)}
              </div>
              <div className="col-span-6 md:col-span-5 flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-3 font-bold text-slate-300 border border-slate-700">
                  {entry.student.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className={`font-bold truncate max-w-[120px] md:max-w-[200px] ${entry.rank <= 3 ? 'text-slate-100' : 'text-slate-300'}`}>{entry.student.name}</h3>
                </div>
              </div>
              <div className="hidden md:flex col-span-3 justify-center items-center">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 capitalize flex items-center">
                  <Code className="w-3 h-3 mr-1" />
                  {entry.student.language || 'Multiple'}
                </span>
              </div>
              <div className="hidden md:flex col-span-2 justify-end items-center text-slate-300 font-mono">
                {entry.solvedProblems}
              </div>
              <div className="col-span-4 md:col-span-1 flex justify-end items-center">
                <span className="font-bold text-lg md:text-xl text-violet-400 font-mono flex items-center">
                  {entry.score}
                  {entry.rank === 1 && <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" />}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

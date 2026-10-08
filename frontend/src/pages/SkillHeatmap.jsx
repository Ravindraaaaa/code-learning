import React, { useState, useEffect } from 'react';
import { Activity, Code, Target, Zap } from 'lucide-react';
import { Card } from '../components/common/Card.jsx';
import api from '../services/api.js';

const SkillHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeatmap();
  }, []);

  const fetchHeatmap = async () => {
    try {
      const res = await api.get('/student/heatmap');
      setHeatmapData(res.data.data);
    } catch (err) {
      console.error('Failed to fetch heatmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-slate-800 border-slate-700/50';
    if (count === 1) return 'bg-emerald-900 border-emerald-800';
    if (count <= 3) return 'bg-emerald-700 border-emerald-600';
    if (count <= 6) return 'bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
    return 'bg-emerald-400 border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]';
  };

  const renderGrid = () => {
    const days = [];
    const today = new Date();
    today.setHours(0,0,0,0);

    const activityMap = {};
    if (heatmapData?.dailyActivity) {
      heatmapData.dailyActivity.forEach(a => {
        activityMap[a.date] = a.count;
      });
    }

    for (let i = 89; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = activityMap[dateStr] || 0;
      days.push({ date: dateStr, count });
    }

    return (
      <div className="flex flex-wrap gap-1.5 p-4 bg-slate-900/50 rounded-xl border border-slate-800 justify-start sm:justify-center lg:justify-start">
        {days.map((day, idx) => (
          <div
            key={idx}
            title={`${day.count} activities on ${day.date}`}
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border ${getIntensityClass(day.count)} transition-all duration-300 hover:scale-125 cursor-help relative`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400 animate-pulse">Loading heatmap...</div>;
  }

  if (!heatmapData) {
    return (
      <div className="p-8 text-center text-slate-400 border border-dashed border-slate-700 rounded-xl m-6">
        Unable to load heatmap data.
      </div>
    );
  }

  const hasActivity = heatmapData.dailyActivity.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/20 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Activity className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Skill Heatmap</h1>
          <p className="text-slate-400 mt-1">Visualize your daily coding momentum and topic strengths.</p>
        </div>
      </div>

      <Card className="p-6 border-slate-700/50 bg-slate-900/40 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Daily Activity <span className="text-xs text-slate-500 font-normal ml-2">(Last 90 Days)</span>
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
             <span>Less</span>
             <div className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700/50"></div>
             <div className="w-3 h-3 rounded-sm bg-emerald-900 border border-emerald-800"></div>
             <div className="w-3 h-3 rounded-sm bg-emerald-700 border border-emerald-600"></div>
             <div className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
             <div className="w-3 h-3 rounded-sm bg-emerald-400 border border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.5)]"></div>
             <span>More</span>
          </div>
        </div>
        
        {hasActivity ? renderGrid() : (
          <div className="p-10 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
            No activity logged yet. Your heatmap is a blank canvas waiting for your code!
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 border-slate-700/50 bg-slate-900/40 backdrop-blur-sm">
           <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-200">Coding Breakdown</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 transition-colors hover:bg-slate-800/80">
              <span className="text-slate-300 font-medium">Lessons</span>
              <span className="text-indigo-400 font-bold text-xl">{heatmapData.codingActivity.lessons}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 transition-colors hover:bg-slate-800/80">
              <span className="text-slate-300 font-medium">Debug Challenges</span>
              <span className="text-blue-400 font-bold text-xl">{heatmapData.codingActivity.debugChallenges}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 transition-colors hover:bg-slate-800/80">
              <span className="text-slate-300 font-medium">Tests</span>
              <span className="text-amber-400 font-bold text-xl">{heatmapData.codingActivity.tests}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 transition-colors hover:bg-slate-800/80">
              <span className="text-slate-300 font-medium">Competitions</span>
              <span className="text-yellow-500 font-bold text-xl">{heatmapData.codingActivity.competitions}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-700/50 bg-slate-900/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold text-slate-200">Topic Strength</h3>
          </div>
          {heatmapData.topicStrength && heatmapData.topicStrength.length > 0 ? (
            <div className="space-y-3">
              {heatmapData.topicStrength.map((skill, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
                  <span className="text-slate-300 font-medium">{skill.name}</span>
                  <div className="flex items-center gap-3">
                     <span className="text-xs px-2 py-1 bg-slate-700 rounded-md text-slate-300 uppercase tracking-wider">{skill.level}</span>
                     <span className="text-rose-400 font-bold drop-shadow-[0_0_5px_rgba(251,113,133,0.3)]">{skill.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl bg-slate-900/30 flex flex-col items-center justify-center h-full">
              <Code className="w-8 h-8 text-slate-600 mb-3 opacity-50" />
              <p className="font-medium text-slate-400">No topic strengths identified.</p>
              <p className="text-xs mt-2 text-slate-500">Complete lessons or tests to level up skills!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SkillHeatmap;

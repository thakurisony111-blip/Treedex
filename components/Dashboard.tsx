
import React from 'react';
import { CollectionEntry, MoodLog } from '../types';

interface DashboardProps {
  collection: CollectionEntry[];
  moods: MoodLog[];
}

const Dashboard: React.FC<DashboardProps> = ({ collection, moods }) => {
  const averageMood = moods.length > 0 
    ? moods.reduce((acc, curr) => {
        if (curr.mood === 'Good') return acc + 100;
        if (curr.mood === 'Okay') return acc + 50;
        return acc + 0;
      }, 0) / moods.length
    : 0;

  return (
    <div className="w-full bg-slate-900/50 border border-[#6BFF9E]/30 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-col items-center sm:items-start">
        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Unique Encounters</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#6BFF9E] font-mono">{collection.length}</span>
          <span className="text-xs text-slate-500 font-mono">SPECIES</span>
        </div>
      </div>

      <div className="hidden sm:block h-10 w-px bg-slate-800"></div>

      <div className="flex flex-col items-center sm:items-start flex-1 px-4">
        <div className="flex justify-between w-full mb-1">
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Botanical Resilience (Mood)</span>
          <span className="text-[10px] font-mono text-[#00FFFF]">{Math.round(averageMood)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-[#6BFF9E] to-[#00FFFF] transition-all duration-1000" 
            style={{ width: `${averageMood}%` }}
          ></div>
        </div>
      </div>

      <div className="hidden sm:block h-10 w-px bg-slate-800"></div>

      <div className="flex flex-col items-center sm:items-start">
        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Total Scans</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-[#FF00FF] font-mono">{collection.reduce((a, b) => a + b.scanCount, 0)}</span>
          <span className="text-[10px] text-slate-500 font-mono">RECORDS</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

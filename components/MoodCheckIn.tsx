
import React from 'react';
import { Mood } from '../types';

interface MoodCheckInProps {
  onSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onSelect, selectedMood }) => {
  return (
    <div className="w-full text-center space-y-4 p-4 border border-[#6BFF9E]/20 bg-[#6BFF9E]/5 rounded-lg mb-6">
      <h3 className="text-[10px] font-mono text-[#6BFF9E] uppercase tracking-widest">Biometric Connection: How do you feel?</h3>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => onSelect('Low')}
          className={`px-4 py-2 rounded-full border transition-all text-xs font-mono uppercase tracking-widest ${selectedMood === 'Low' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
        >
          Low
        </button>
        <button 
          onClick={() => onSelect('Okay')}
          className={`px-4 py-2 rounded-full border transition-all text-xs font-mono uppercase tracking-widest ${selectedMood === 'Okay' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
        >
          Okay
        </button>
        <button 
          onClick={() => onSelect('Good')}
          className={`px-4 py-2 rounded-full border transition-all text-xs font-mono uppercase tracking-widest ${selectedMood === 'Good' ? 'bg-[#6BFF9E]/20 border-[#6BFF9E] text-[#6BFF9E] shadow-[0_0_10px_rgba(107,255,158,0.5)]' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
        >
          Good
        </button>
      </div>
    </div>
  );
};

export default MoodCheckIn;

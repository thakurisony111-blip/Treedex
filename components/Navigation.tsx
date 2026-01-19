
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050607]/90 backdrop-blur-md border-t border-[#6BFF9E]/30 h-20 flex items-center justify-around px-6 z-50">
      <button 
        onClick={() => onViewChange(View.Scan)}
        className={`flex flex-col items-center gap-1 transition-all ${activeView === View.Scan ? 'text-[#6BFF9E]' : 'text-slate-500'}`}
      >
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg border ${activeView === View.Scan ? 'border-[#6BFF9E] bg-[#6BFF9E]/10' : 'border-slate-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Scan</span>
      </button>

      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6BFF9E] text-black shadow-[0_0_15px_#6BFF9E] -mt-6 border-4 border-[#050607]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>

      <button 
        onClick={() => onViewChange(View.TreeDex)}
        className={`flex flex-col items-center gap-1 transition-all ${activeView === View.TreeDex ? 'text-[#6BFF9E]' : 'text-slate-500'}`}
      >
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg border ${activeView === View.TreeDex ? 'border-[#6BFF9E] bg-[#6BFF9E]/10' : 'border-slate-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 17h6"/><path d="M4 11a8 8 0 0 1 16 0c0 4.4-3.6 8-8 8s-8-3.6-8-8z"/><path d="M12 2v2"/><path d="m18 11.5 1 1"/><path d="m5 12.5 1-1"/></svg>
        </div>
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Dex</span>
      </button>
    </nav>
  );
};

export default Navigation;

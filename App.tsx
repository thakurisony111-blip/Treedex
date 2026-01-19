
import React, { useState, useEffect } from 'react';
import { View, CollectionEntry, MoodLog } from './types';
import Navigation from './components/Navigation';
import ScanView from './components/ScanView';
import TreeDexView from './components/TreeDexView';
import { getCollection, getMoodLogs } from './services/treeService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Scan);
  const [collection, setCollection] = useState<CollectionEntry[]>([]);
  const [moods, setMoods] = useState<MoodLog[]>([]);

  // Initialize data from local storage
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setCollection(getCollection());
    setMoods(getMoodLogs());
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6BFF9E]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#00FFFF]/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 py-6 sm:py-10">
        {activeView === View.Scan ? (
          <ScanView onSpeciesDiscovered={refreshData} />
        ) : (
          <TreeDexView collection={collection} moods={moods} />
        )}
      </main>

      {/* Persistent Navigation */}
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      {/* HUD Accents */}
      <div className="fixed top-4 left-4 pointer-events-none select-none z-50">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#6BFF9E] font-bold tracking-tighter">TREEDEX v1.0.4</span>
            <div className="h-[2px] w-8 bg-[#6BFF9E]/30"></div>
          </div>
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Satellite Link: Online</div>
        </div>
      </div>

      <div className="fixed bottom-24 right-4 pointer-events-none select-none z-50 hidden md:block">
         <div className="border-r-2 border-b-2 border-[#6BFF9E]/20 w-12 h-12 flex items-end justify-end p-1">
            <span className="text-[8px] font-mono text-slate-700 uppercase">SYS_ACTIVE</span>
         </div>
      </div>
    </div>
  );
};

export default App;

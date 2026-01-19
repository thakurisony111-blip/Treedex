
import React, { useState } from 'react';
import { CollectionEntry, MoodLog, Species } from '../types';
import Dashboard from './Dashboard';
import BotanicalCard from './BotanicalCard';

interface TreeDexViewProps {
  collection: CollectionEntry[];
  moods: MoodLog[];
}

const TreeDexView: React.FC<TreeDexViewProps> = ({ collection, moods }) => {
  const [selectedEntry, setSelectedEntry] = useState<CollectionEntry | null>(null);

  if (collection.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 pt-10 text-center">
        <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center mx-auto mb-6 bg-slate-900/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M12 2v2"/><path d="m18 11.5 1 1"/><path d="m5 12.5 1-1"/><path d="M4 11a8 8 0 0 1 16 0c0 4.4-3.6 8-8 8s-8-3.6-8-8z"/><path d="M12 22v-5"/><path d="M9 17h6"/></svg>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-tighter text-white mb-2">No data recorded</h2>
        <p className="text-slate-500 font-mono text-xs mb-8">Scan your first specimen to begin your botanical collection.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-4 pb-24">
      <Dashboard collection={collection} moods={moods} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {collection.map(entry => (
          <div 
            key={entry.id}
            onClick={() => setSelectedEntry(entry)}
            className="group relative panel-bg border border-slate-800 rounded-lg overflow-hidden cursor-pointer hover:border-[#6BFF9E]/50 transition-all hover:shadow-[0_0_15px_rgba(107,255,158,0.1)]"
          >
            <div className="aspect-[4/5] bg-slate-900 relative overflow-hidden">
               <img 
                src={entry.imageUrl || `https://picsum.photos/seed/${entry.scientificName}/300/400`} 
                alt={entry.commonName} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-transparent opacity-80"></div>
               <div className="absolute top-2 right-2 flex flex-col items-end">
                  <span className="text-[10px] font-mono text-[#6BFF9E] bg-black/50 px-1.5 py-0.5 rounded border border-[#6BFF9E]/20">x{entry.scanCount}</span>
               </div>
               {/* Grid overlay lines on hover */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity bg-[linear-gradient(to_right,#6BFF9E_1px,transparent_1px),linear-gradient(to_bottom,#6BFF9E_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
            <div className="p-3">
              <h3 className="text-xs font-bold text-white uppercase truncate">{entry.commonName}</h3>
              <p className="text-[8px] font-mono text-[#00FFFF] italic truncate">{entry.scientificName}</p>
              <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center">
                 <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">Seen: {new Date(entry.lastSeenDate).toLocaleDateString()}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#6BFF9E] group-hover:animate-ping"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 z-[100] bg-[#050607]/95 flex items-start justify-center overflow-y-auto p-4 md:p-10 backdrop-blur-sm">
          <div className="w-full max-w-3xl mt-10">
            <BotanicalCard 
              species={selectedEntry} 
              userImage={selectedEntry.imageUrl}
              onClose={() => setSelectedEntry(null)} 
              actionButton={
                <div className="flex flex-col items-center gap-2">
                   <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Historical Encounter Metrics</p>
                   <div className="flex gap-4">
                      <div className="bg-slate-900 border border-slate-800 rounded p-2 text-center min-w-[80px]">
                        <p className="text-[8px] text-slate-500 uppercase">First Seen</p>
                        <p className="text-[10px] font-mono text-[#00FFFF]">{new Date(selectedEntry.firstSeenDate).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded p-2 text-center min-w-[80px]">
                        <p className="text-[8px] text-slate-500 uppercase">Scan Count</p>
                        <p className="text-[10px] font-mono text-[#6BFF9E]">{selectedEntry.scanCount}</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setSelectedEntry(null)}
                    className="mt-6 px-8 py-2 border border-[#6BFF9E]/30 text-[#6BFF9E] text-xs font-mono uppercase rounded-full hover:bg-[#6BFF9E]/10"
                   >
                     Return to Dex
                   </button>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeDexView;

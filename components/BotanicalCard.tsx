
import React from 'react';
import { Species } from '../types';

interface BotanicalCardProps {
  species: Species;
  userImage?: string | null;
  onClose?: () => void;
  actionButton?: React.ReactNode;
  onReset?: () => void;
}

/**
 * Normalizes lifespan years to a realistic botanical range.
 */
function normalizeLifespanYears(raw: number | undefined | null): string {
  if (raw === undefined || raw === null || !Number.isFinite(raw) || raw <= 0) return "Unknown";
  // Clamp between 5 and 2000 years for realistic tree ages
  const clamped = Math.min(Math.max(raw, 5), 2000);
  return `${Math.round(clamped)}y`;
}

const BotanicalCard: React.FC<BotanicalCardProps> = ({ species, userImage, onClose, actionButton, onReset }) => {
  const lifespanDisplay = normalizeLifespanYears(species.lifespanYears);
  
  const getPersonalityText = (s: Species) => {
    return `I am ${s.commonName}. People have long valued me for ${s.uses.slice(0, 2).join(' and ')}. I provide sanctuary for ${s.wildlife.slice(0, 2).join(' and ')}, and in many cultures, I stand as a symbol of ${s.symbolism.toLowerCase()}. ${s.funFact}`;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto panel-bg border border-[#6BFF9E]/40 rounded-xl overflow-hidden p-0 mb-20 animate-in fade-in zoom-in duration-500 shadow-[0_0_30px_rgba(107,255,158,0.1)]">
      {/* Accent border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6BFF9E] to-transparent animate-pulse"></div>
      
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-[#6BFF9E]/50 hover:text-[#6BFF9E] bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Left: Visual Evidence (60%) */}
        <div className="relative lg:w-3/5 aspect-square lg:aspect-auto min-h-[400px] border-r border-[#6BFF9E]/20 bg-slate-900">
          <img 
            src={userImage || `https://picsum.photos/seed/${species.scientificName}/800/1000`} 
            alt={species.commonName} 
            className="w-full h-full object-cover opacity-90 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>
          
          {/* Overlay Graphics */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6BFF9E] animate-ping"></div>
                  <span className="text-[10px] font-mono text-[#6BFF9E] tracking-widest uppercase">Identity Confirmed</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tighter leading-none">{species.commonName}</h2>
                <p className="text-[#00FFFF] font-mono italic text-sm">{species.scientificName}</p>
                {/* Confidence chip for mobile */}
                <div className="sm:hidden mt-2">
                  <span className="px-2 py-0.5 text-[9px] font-mono bg-[#6BFF9E]/10 text-[#6BFF9E] border border-[#6BFF9E]/30 rounded backdrop-blur-sm whitespace-nowrap">CONFIDENCE: {Math.round(species.confidence * 100)}%</span>
                </div>
              </div>
              {/* Confidence chip for desktop */}
              <div className="hidden sm:block">
                <span className="px-3 py-1 text-[10px] font-mono bg-[#6BFF9E]/10 text-[#6BFF9E] border border-[#6BFF9E]/30 rounded backdrop-blur-sm whitespace-nowrap">CONFIDENCE: {Math.round(species.confidence * 100)}%</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase block">Family</span>
                    <span className="text-xs font-mono text-white truncate max-w-[100px] block">{species.family}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase block">Native Status</span>
                    <span className={`text-xs font-mono ${species.isNative ? 'text-green-400' : 'text-orange-400'}`}>{species.isNative ? 'Verified' : 'Exotic'}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <div className="w-24 h-px bg-[#6BFF9E]/40"></div>
                 <span className="text-[8px] font-mono text-[#6BFF9E]">BOTANICAL_ID: {btoa(species.scientificName).slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Data (40%) */}
        <div className="lg:w-2/5 p-6 lg:p-8 bg-black/40 flex flex-col gap-6 overflow-y-auto max-h-[1000px]">
          {/* Tree Details Section */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-mono text-[#6BFF9E] uppercase tracking-[0.2em] border-b border-[#6BFF9E]/20 pb-1">Tree Details</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                 <p className="text-[8px] text-slate-500 uppercase font-mono">Genus</p>
                 <p className="text-sm text-white font-medium truncate">{species.genus || species.scientificName.split(' ')[0]}</p>
               </div>
               <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                 <p className="text-[8px] text-slate-500 uppercase font-mono">Environment</p>
                 <p className="text-sm text-white font-medium truncate">{species.origin}</p>
               </div>
            </div>
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-500 uppercase">Maximum Height</span>
                  <span className="text-[#6BFF9E]">{species.heightMeters}m</span>
                </div>
                <div className="h-1 bg-slate-800 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-[#6BFF9E]" style={{ width: `${Math.min(100, (species.heightMeters / 120) * 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-500 uppercase">Expected Lifespan</span>
                  <span className="text-[#00FFFF]">{lifespanDisplay}</span>
                </div>
                <div className="h-1 bg-slate-800 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FFFF]" style={{ width: `${lifespanDisplay === 'Unknown' ? 0 : Math.min(100, (species.lifespanYears / 2000) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Discovery Note Panel */}
          <section className="space-y-4 bg-[#6BFF9E]/5 p-4 rounded-lg border border-[#6BFF9E]/10">
            <h3 className="text-[10px] font-mono text-[#FF00FF] uppercase tracking-[0.2em] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Intelligence & Utility
            </h3>
            <div className="space-y-4">
              <div>
                 <p className="text-[8px] text-slate-500 uppercase font-mono mb-1">Primary Uses</p>
                 <div className="flex flex-wrap gap-2">
                    {species.uses.map(u => <span key={u} className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-slate-700 text-slate-300">{u}</span>)}
                 </div>
              </div>
              <div>
                 <p className="text-[8px] text-slate-500 uppercase font-mono mb-1">Associated Wildlife</p>
                 <div className="flex flex-wrap gap-2">
                    {species.wildlife.map(w => <span key={w} className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-slate-700 text-slate-300">{w}</span>)}
                 </div>
              </div>
              <div className="bg-white/5 p-3 rounded border-l-2 border-[#FF00FF]">
                 <p className="text-[8px] text-[#FF00FF] uppercase font-mono mb-1 flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                   Discovery Note
                 </p>
                 <p className="text-xs text-slate-200 leading-relaxed font-mono">{species.funFact}</p>
              </div>
            </div>
          </section>

          {/* Nature's Reflection */}
          <section className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
             <h3 className="text-[8px] font-mono text-slate-500 uppercase mb-2">Nature's Reflection</h3>
             <p className="text-xs text-[#6BFF9E]/80 leading-relaxed italic font-mono">
               &quot;{getPersonalityText(species)}&quot;
             </p>
          </section>

          {actionButton && (
            <div className="mt-auto space-y-4 pt-4">
              {actionButton}
              {onReset && (
                <button 
                  onClick={onReset}
                  className="w-full py-3 border border-slate-800 text-slate-500 hover:text-[#6BFF9E] hover:border-[#6BFF9E]/50 rounded-lg font-mono text-xs uppercase tracking-widest transition-all"
                >
                  Scan another tree
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotanicalCard;

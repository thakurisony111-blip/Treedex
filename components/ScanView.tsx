
import React, { useState, useRef } from 'react';
import { Species, Mood } from '../types';
import { identifyTree, saveToCollection, logMood } from '../services/treeService';
import BotanicalCard from './BotanicalCard';
import MoodCheckIn from './MoodCheckIn';
import ScanningOverlay from './ScanningOverlay';

type ScanStatus = 'idle' | 'scanning' | 'result';

interface ScanViewProps {
  onSpeciesDiscovered: () => void;
}

const ScanView: React.FC<ScanViewProps> = ({ onSpeciesDiscovered }) => {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Species | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>();
  const [isSaved, setIsSaved] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setIsSaved(false);
    setSelectedMood(undefined);
    setStatus('idle');
    // Slightly delay focus to ensure render
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreview(url);
      setResult(null);
      setError(null);
      setIsSaved(false);
      setSelectedMood(undefined);
      setStatus('idle');
    }
  };

  const handleScan = async () => {
    if (!file) {
      setError("Please select or capture a photo first.");
      return;
    }

    setStatus('scanning');
    setError(null);
    try {
      const identified = await identifyTree(file);
      setResult(identified);
      setStatus('result');
    } catch (err) {
      setError("Identification failed. Please try again.");
      setStatus('idle');
    }
  };

  const handleSave = () => {
    if (result) {
      saveToCollection(result, preview);
      if (selectedMood) {
        logMood(btoa(result.scientificName), selectedMood);
      }
      setIsSaved(true);
      onSpeciesDiscovered();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-4 min-h-screen flex flex-col items-center pointer-events-auto">
      {status !== 'result' ? (
        <div className="w-full max-w-2xl text-center flex flex-col items-center animate-in fade-in duration-500">
          <div className="mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 neon-text">Botanical Interface</h1>
            <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">System Status: {status === 'idle' ? 'Awaiting Input' : 'Scanning Sample'}</p>
          </div>
          
          <div 
            onClick={() => status === 'idle' && fileInputRef.current?.click()}
            className={`w-full aspect-[4/3] sm:aspect-video border-2 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden relative group
              ${preview ? 'border-[#6BFF9E]/50' : 'border-slate-800 bg-slate-900/20 hover:border-[#6BFF9E]/30 hover:bg-[#6BFF9E]/5'}
              ${status === 'scanning' ? 'cursor-wait shadow-[0_0_40px_rgba(107,255,158,0.2)]' : 'cursor-pointer'}`}
          >
            {preview ? (
              <div className="w-full h-full relative">
                <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                {status === 'scanning' && <ScanningOverlay />}
                {status === 'idle' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-mono uppercase bg-black px-4 py-2 rounded border border-[#6BFF9E] text-[#6BFF9E] tracking-widest">Recalibrate Target (Change Image)</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 p-8 relative">
                <div className="w-32 h-32 mx-auto mb-4 relative opacity-40">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#6BFF9E] animate-pulse-slow">
                    <path d="M12 22V17M12 17L15 14M12 17L9 14M12 12V6M12 6L16 4M12 6L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="11" r="5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
                  </svg>
                  <div className="absolute inset-0 bg-[#6BFF9E]/20 blur-3xl rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-mono text-[#6BFF9E] uppercase tracking-[0.3em]">Initialize Scanning Sequence</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase">Optical input required for species validation</p>
                </div>
              </div>
            )}
            
            {/* HUD corners */}
            <div className="absolute top-4 left-4 border-l border-t border-[#6BFF9E]/30 w-8 h-8 pointer-events-none"></div>
            <div className="absolute top-4 right-4 border-r border-t border-[#6BFF9E]/30 w-8 h-8 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 border-l border-b border-[#6BFF9E]/30 w-8 h-8 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 border-r border-b border-[#6BFF9E]/30 w-8 h-8 pointer-events-none"></div>

            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              ref={fileInputRef} 
              className="hidden" 
              disabled={status !== 'idle'}
            />
          </div>

          {error && <p className="mt-4 text-red-500 font-mono text-[10px] uppercase tracking-widest">{error}</p>}

          <div className="w-full mt-10">
            {status === 'idle' && (
               <button 
                onClick={preview ? handleScan : () => fileInputRef.current?.click()}
                className={`w-full py-5 rounded-lg font-mono font-bold uppercase tracking-[0.2em] transition-all text-sm
                  ${!preview 
                    ? 'border border-[#6BFF9E]/50 text-[#6BFF9E] hover:bg-[#6BFF9E]/10' 
                    : 'bg-[#6BFF9E] text-black hover:brightness-110 shadow-[0_0_30px_#6BFF9E]'}`}
              >
                {preview ? "Start Biometric Scan" : "Upload tree photo to scan"}
              </button>
            )}

            {status === 'scanning' && (
              <div className="w-full space-y-4">
                <div className="w-full h-px bg-slate-800 relative overflow-hidden">
                  <div className="absolute h-full bg-[#6BFF9E] animate-loading-bar"></div>
                </div>
                <p className="text-[10px] font-mono text-[#6BFF9E] animate-pulse uppercase tracking-[0.4em]">Decoding Phytogenetic Data...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full animate-in slide-in-from-bottom-10 fade-in duration-700 pointer-events-auto">
          {result && (
            <BotanicalCard 
              species={result} 
              userImage={preview}
              onReset={resetState}
              actionButton={
                <div className="w-full flex flex-col gap-6">
                  <MoodCheckIn onSelect={setSelectedMood} selectedMood={selectedMood} />
                  <div className="flex gap-4">
                    <button 
                      onClick={handleSave}
                      disabled={isSaved}
                      className={`flex-1 py-4 rounded-lg font-mono font-bold uppercase tracking-widest transition-all text-xs
                        ${isSaved 
                          ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default' 
                          : 'bg-[#6BFF9E] text-black hover:brightness-110 shadow-[0_0_20px_#6BFF9E]'}`}
                    >
                      {isSaved ? "Saved to Archive" : "Commit to TreeDex"}
                    </button>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-6 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 rounded-lg transition-all"
                      title="Back to Image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="m3 12 6-6"/><path d="m3 12 6 6"/></svg>
                    </button>
                  </div>
                </div>
              }
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes loading-bar {
          0% { left: -40%; width: 40%; }
          50% { width: 60%; }
          100% { left: 100%; width: 40%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ScanView;

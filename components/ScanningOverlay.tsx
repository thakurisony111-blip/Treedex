
import React from 'react';

const ScanningOverlay: React.FC = () => {
  // Generate random positions for glowing dots
  const dots = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${1 + Math.random() * 2}s`,
  }));

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {/* Moving scanner bar */}
      <div className="absolute w-full h-[2px] bg-white shadow-[0_0_15px_#fff,0_0_5px_#6BFF9E] z-30 animate-scan"></div>
      
      {/* Glowing particles */}
      {dots.map(dot => (
        <div 
          key={dot.id}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]"
          style={{
            top: dot.top,
            left: dot.left,
            animation: `sparkle ${dot.duration} infinite ease-in-out`,
            animationDelay: dot.delay
          }}
        />
      )}

      {/* Analysis UI elements */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 px-4 py-1 rounded-full border border-[#6BFF9E]/50 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-[#6BFF9E] animate-pulse"></div>
        <span className="text-[10px] font-mono text-[#6BFF9E] uppercase tracking-widest">Analyzing Tree Structure...</span>
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0.2; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0.2; }
        }
        .animate-scan {
          animation: scan 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ScanningOverlay;

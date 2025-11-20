import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="w-full mb-6 relative px-1">
      {/* Braun Logo */}
      <div className="absolute top-[-32px] left-1 text-neutral-300 text-sm font-bold tracking-wide uppercase select-none">
        Braun
      </div>

      {/* Recessed Container */}
      <div className="bg-[#222] p-[2px] rounded pb-1 border-b border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
        {/* LCD Screen */}
        <div className="bg-[#6a7068] h-16 sm:h-20 rounded-sm flex items-center justify-end px-3 overflow-hidden shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] relative">
            {/* Slight gradient for LCD glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
            
            <span className="font-mono text-4xl sm:text-5xl text-[#1a1c1a] tracking-widest truncate z-10 opacity-90 font-medium" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              {value}
            </span>
        </div>
      </div>
    </div>
  );
};

export default Display;
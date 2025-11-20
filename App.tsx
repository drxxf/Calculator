import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#e5e5e5] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Simple clean desk background */}
      <div className="absolute inset-0 bg-neutral-200"></div>

      <main className="relative z-10 flex flex-col items-center gap-12">
        <div className="transform transition-all duration-700 hover:scale-[1.02] shadow-2xl rounded-[1.5rem]">
            <Calculator />
        </div>
        
        <div className="text-neutral-400 text-xs font-medium tracking-widest uppercase opacity-60">
          Tribute to Dieter Rams
        </div>
      </main>
    </div>
  );
};

export default App;
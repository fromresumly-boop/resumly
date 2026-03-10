import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center animate-fade-up">
        <div className="size-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-6 scale-animation">
          <span className="material-symbols-outlined text-4xl">description</span>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-primary animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-400 text-sm font-medium tracking-wide">Loading Resumly...</p>
      </div>
    </div>
  );
};

export default Spinner;

import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const ResumeShowcase = () => {
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-20 relative bg-white overflow-hidden">
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="h-[500px] flex items-center justify-center relative">
          {/* Fanned Cards */}
          <div className="relative w-full max-w-4xl flex justify-center items-center h-full">
            
            {/* Left Card */}
            <div className="absolute -translate-x-32 -rotate-12 w-64 h-80 bg-slate-100 rounded-xl shadow-xl border border-slate-200 flex flex-col p-4 opacity-40">
              <div className="w-12 h-12 rounded-full bg-slate-300 mb-4"></div>
              <div className="h-4 w-3/4 bg-slate-300 rounded mb-2"></div>
              <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
              <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
              <div className="h-2 w-5/6 bg-slate-200 rounded mb-1"></div>
            </div>

            {/* Right Card */}
            <div className="absolute translate-x-32 rotate-12 w-64 h-80 bg-slate-100 rounded-xl shadow-xl border border-slate-200 flex flex-col p-4 opacity-40">
              <div className="w-12 h-12 rounded-full bg-slate-300 mb-4"></div>
              <div className="h-4 w-3/4 bg-slate-300 rounded mb-2"></div>
              <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
              <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
              <div className="h-2 w-5/6 bg-slate-200 rounded mb-1"></div>
            </div>

            {/* Center Card (Glass style) */}
            <div className="relative z-10 w-80 h-[450px] glass-card rounded-2xl shadow-2xl p-8 transform transition-transform hover:scale-105 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full bg-primary/10 overflow-hidden ring-4 ring-primary/5">
                  <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                  </div>
                </div>
                <div>
                   <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
                   <div className="h-3 w-20 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="h-4 w-1/2 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                </div>
              </div>

              {/* Floatings */}
              <div className="absolute -top-6 -right-12 glass-card rounded-2xl p-4 shadow-xl flex items-center gap-3">
                 <div className="relative size-12 flex items-center justify-center font-bold text-primary">
                    <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
                       <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="3"></circle>
                       <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray="96, 100" strokeLinecap="round"></circle>
                    </svg>
                    <span className="text-[10px]">96%</span>
                 </div>
                 <span className="text-sm font-bold text-slate-700">Excellent Score</span>
              </div>

              <div className="absolute -bottom-4 -left-12 flex flex-col gap-2">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span> Smart Optimization
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">task_alt</span> ATS Friendly
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeShowcase;

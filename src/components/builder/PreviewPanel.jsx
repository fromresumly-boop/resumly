import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import Template1 from '../../templates/Template1';
import Template2 from '../../templates/Template2';

const TEMPLATES = {
  1: Template1,
  2: Template2
};

const PreviewPanel = () => {
  const { resumeData, selectedTemplate } = useResume();
  const [scale, setScale] = useState(1);
  const [flash, setFlash] = useState(false);
  const containerRef = useRef(null);
  
  const ActiveTemplate = TEMPLATES[selectedTemplate] || Template1;

  // Handle scaling to fit A4 (794px width) into the panel
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 80; // Padding
        const targetWidth = 794;
        setScale(Math.min(containerWidth / targetWidth, 1));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Flash effect on data change
  useEffect(() => {
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(timer);
  }, [resumeData]);

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-slate-200/50 relative overflow-hidden">
      
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-10 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
           <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Preview</span>
        </div>
        <Link to="/select-template" className="text-xs font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">
           Change Template
        </Link>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-24 pb-20 flex justify-center perspective-[1000px]">
        
        <div 
          className={`transition-all duration-300 transform-gpu shadow-2xl relative
            ${flash ? 'bg-blue-50/50 scale-[1.01]' : 'bg-white scale-100'}
          `}
          style={{ 
            width: '794px', 
            height: '1123px', // A4 height at 96dpi
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <ActiveTemplate data={resumeData} />

          {/* Dynamic Flash Overlay */}
          <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-400 pointer-events-none ${flash ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

      </div>

      {/* Floating Zoom Indicator */}
      <div className="absolute bottom-6 right-8 bg-white/80 backdrop-blur shadow-lg px-4 py-2 rounded-full border border-slate-100 flex items-center gap-3 animate-fade-up">
         <span className="material-symbols-outlined text-slate-400 text-sm">zoom_in</span>
         <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Zoom: {Math.round(scale * 100)}%</span>
      </div>

    </div>
  );
};

export default PreviewPanel;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const StickyBar = ({ isVisible, selectedTemplateName }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-slate-100 py-5 px-8 flex items-center justify-between z-50 transition-all duration-300
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          <div className="size-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">check_circle</span>
          </div>
          <div className="size-8 rounded-full border-2 border-white bg-slate-100 text-slate-400 flex items-center justify-center translate-y-1">
             <span className="material-symbols-outlined text-xs">edit_note</span>
          </div>
        </div>
        <div>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Step 1 Completed</p>
           <h6 className="text-lg font-black text-slate-800 leading-none">Selected: <span className="text-primary">{selectedTemplateName}</span></h6>
        </div>
      </div>

      <div className="flex items-center gap-4">
         <Button 
            variant="primary" 
            size="lg" 
            className="flex items-center gap-2 group px-12"
            onClick={() => navigate('/build')}
         >
            Continue to Fill Details
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
         </Button>
      </div>
    </div>
  );
};

export default StickyBar;

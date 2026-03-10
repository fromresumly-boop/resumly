import React from 'react';

const AccordionSection = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className={`bg-white border-b border-slate-100 transition-all duration-300 ${isOpen ? 'border-l-4 border-primary' : 'border-l-4 border-transparent'}`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 px-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="material-symbols-outlined text-slate-400">{icon}</span>}
          <span className={`font-bold text-slate-700 ${isOpen ? 'text-primary' : ''}`}>{title}</span>
        </div>
        <span className={`material-symbols-outlined transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 pb-8 px-6' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionSection;

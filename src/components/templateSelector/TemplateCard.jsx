import React from 'react';
import Badge from '../ui/Badge';

const TemplateCard = ({ id, name, description, isSelected, onSelect, children }) => {
  const containerRef = React.useRef(null);
  const [scale, setScale] = React.useState(0.4);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // The original resume template is 794px wide (A4 at 96dpi)
        // We scale it so it fills the container's width perfectly
        setScale(containerWidth / 794);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div 
      onClick={() => onSelect(id)}
      className={`group relative p-4 rounded-3xl bg-white transition-all cursor-pointer border-2 hover:-translate-y-2 flex flex-col h-full
        ${isSelected 
          ? 'border-primary shadow-[0_0_0_4px_rgba(59,123,248,0.2)] animate-pulse-scale' 
          : 'border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20'
        }
      `}
    >
      {/* Template Preview Wrapper */}
      <div 
        ref={containerRef}
        className="aspect-[1/1.41] bg-slate-50 rounded-2xl overflow-hidden mb-6 relative border border-slate-100 shadow-inner group-hover:shadow-md transition-shadow"
      >
        
        {/* The Actual Template Component (Scaled to fit perfectly) */}
        <div 
          className="absolute top-0 left-0 pointer-events-none transition-opacity"
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
            width: '794px',
            height: '1123px'
          }}
        >
           {children}
        </div>

        {/* Selected Overlay */}
        {isSelected && (
           <div className="absolute top-4 right-4 z-10 size-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg animate-pop-in">
              <span className="material-symbols-outlined text-lg font-black">check</span>
           </div>
        )}

      </div>

      <div className="px-1 group-hover:px-2 transition-all flex-1">
        <h4 className={`text-lg font-bold mb-1 transition-colors ${isSelected ? 'text-primary' : 'text-slate-800'}`}>
          {name}
        </h4>
        <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button 
           className={`w-full py-3 rounded-2xl font-bold text-sm transition-all
             ${isSelected 
               ? 'bg-primary text-white shadow-xl shadow-primary/20' 
               : 'bg-white border-2 border-primary text-primary hover:bg-primary/5'
             }
           `}
        >
          {isSelected ? 'Selected' : 'Select Template'}
        </button>
      </div>

    </div>
  );
};

export default TemplateCard;

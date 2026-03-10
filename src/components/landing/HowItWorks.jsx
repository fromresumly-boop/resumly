import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const HowItWorks = () => {
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);
  const steps = [
    {
      icon: "dashboard_customize",
      title: "Pick Your Template",
      desc: "Select from our library of professionally designed templates."
    },
    {
      icon: "edit_note",
      title: "Fill In Your Details",
      desc: "Our AI guides you through writing the perfect bullet points."
    },
    {
       icon: "download_done",
       title: "Download & Apply",
       desc: "Export in high-quality PDF and start sending applications."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-4xl font-extrabold text-center mb-24 text-slate-900 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>Your Path to a New Career</h2>
        <div className="relative">
          {/* Dotted Line (Desktop Only) */}
          <div className={`hidden md:block absolute top-[48px] left-0 w-full h-[2px] border-t-2 border-dashed border-primary/20 z-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="size-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/30 transform group-hover:scale-110 transition-transform duration-500 relative bg-[linear-gradient(135deg,#3B7BF8,#1E40AF)]">
                  <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed max-w-[280px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

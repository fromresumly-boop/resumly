import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const SloganStatsStrip = () => {
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  const stats = [
    { value: "50,000+", label: "RESUMES CREATED" },
    { value: "96%", label: "AVG ATS SCORE" },
    { value: "3x", label: "MORE CALLBACKS" }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 transition-all duration-700">
        <h2 className="text-3xl md:text-4xl font-light italic text-slate-300 mb-20 leading-relaxed">
          "Your resume is your first impression. <span className="text-white font-medium not-italic">Make it unforgettable.</span>"
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <p className="text-5xl font-black text-primary mb-3">{stat.value}</p>
              <p className="text-slate-400 font-bold text-xs tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
    </section>
  );
};

export default SloganStatsStrip;

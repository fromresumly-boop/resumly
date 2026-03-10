import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const TopFormatsSection = () => {
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  const formats = [
    {
      id: "01",
      title: "Chronological",
      desc: "Best for highlighting a steady career progression in a specific industry.",
    },
    {
      id: "02",
      title: "Functional",
      desc: "Focus on skills and expertise rather than timeline. Ideal for career changers.",
    },
    {
      id: "03",
      title: "Combination",
      desc: "The best of both worlds. Showcase skills while maintaining a timeline.",
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-extrabold text-background-dark mb-4">Choose Your Strategy</h2>
          <p className="text-slate-600">Pick from proven layouts designed to get you hired.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formats.map((format, index) => (
            <div 
              key={index}
              className={`group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-700 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <span className="text-6xl font-black text-primary/10 mb-4 block group-hover:text-primary/20 transition-colors">
                {format.id}
              </span>
              <h3 className="text-2xl font-bold mb-3 text-slate-800">{format.title}</h3>
              <p className="text-slate-600 mb-8 line-clamp-2">{format.desc}</p>
              
              <div className="aspect-[3/4] rounded-2xl bg-slate-50 overflow-hidden relative border border-slate-100 p-4">
                <div className="absolute inset-x-4 top-4 bottom-0 bg-white shadow-sm rounded-t-lg border border-slate-100 flex flex-col p-3 gap-2">
                  <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                  <div className="h-1 w-full bg-slate-100 rounded"></div>
                  <div className="h-1 w-full bg-slate-100 rounded"></div>
                  <div className="h-1 w-3/4 bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFormatsSection;

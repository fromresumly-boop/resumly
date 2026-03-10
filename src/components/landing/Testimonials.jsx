import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Testimonials = () => {
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  const reviews = [
    {
      stars: 5,
      quote: "The professional layouts were spot on. I got 3 interviews within a week of using Resumly!",
      name: "Sarah Johnson",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      stars: 5,
      quote: "Finally, a resume builder that actually looks professional and is easy to use.",
      name: "Mark Thompson",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      stars: 5,
       quote: "The ATS scoring feature gave me the confidence I needed to apply for mid-level roles.",
       name: "Emily Davis",
       role: "Product Manager",
       image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-slate-900 leading-tight">Loved by Thousands</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <div 
              key={index}
              className={`p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-700 overflow-hidden relative group cursor-default ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-amber-400 text-xl leading-none">star</span>
                ))}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed h-[80px] overflow-y-auto no-scrollbar">"{item.quote}"</p>
              
              <div className="flex items-center gap-4 border-t border-slate-200 pt-8 opacity-90">
                <div className="size-12 rounded-full overflow-hidden bg-slate-200 ring-2 ring-primary/5 group-hover:ring-primary transition-all duration-500">
                  <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                </div>
                <div>
                   <h6 className="font-bold text-slate-900 leading-none mb-1.5">{item.name}</h6>
                   <p className="text-sm font-medium text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FeaturesSection = () => {
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  const features = [
    {
      icon: "center_focus_strong",
      title: "ATS Optimized",
      desc: "Designed specifically to pass through Applicant Tracking Systems."
    },
    {
      icon: "visibility",
      title: "Live Preview",
      desc: "See your changes in real-time as you type and edit."
    },
    {
      icon: "star",
      title: "2 Pro Templates",
      desc: "Premium layouts designed by hiring experts for maximum impact."
    },
    {
      icon: "picture_as_pdf",
      title: "PDF Export",
      desc: "Instant download in standard PDF format ready for any application."
    },
    {
       icon: "dashboard",
       title: "Dashboard Support",
       desc: "Manage and access all your created resumes in one central place."
    },
    {
       icon: "mail",
       title: "Email Delivery",
       desc: "Send your finished resume directly to your email or a recruiter."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-light" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
           <h2 className="text-4xl font-extrabold text-background-dark mb-4">Powerful Features</h2>
           <p className="text-slate-600">Everything you need to create a winning resume.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-10 bg-white rounded-3xl border border-slate-100 group hover:shadow-xl transition-all duration-700 overflow-hidden relative cursor-default ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-primary transition-colors">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed max-w-xs">{feature.desc}</p>
              
              <div className="absolute -right-4 -bottom-4 size-32 bg-primary/5 rounded-full blur-2xl group-hover:size-48 transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

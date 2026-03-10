import React from 'react';

const Template3 = ({ data }) => {
  const { name, title, email, phone, location, linkedin, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-slate-900 font-sans w-full h-full flex overflow-hidden shadow-sm" style={{ aspectRatio: '1/1.41' }}>
      
      {/* Sidebar */}
      <aside className="w-[35%] bg-primary text-white p-12 flex flex-col gap-10 h-full">
        
        {/* Avatar Placeholder */}
        <div className="size-40 rounded-full bg-white/10 ring-8 ring-white/5 flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
           <span className="material-symbols-outlined text-6xl opacity-40">person</span>
        </div>

        <header className="text-center flex flex-col gap-2">
            <h1 className="text-3xl font-black uppercase tracking-tight leading-none">{name || "Your Name"}</h1>
            <h2 className="text-sm font-bold text-white/70 uppercase tracking-[0.3em]">{title || "Job Title"}</h2>
        </header>

        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Contact */}
        <div className="flex flex-col gap-5 text-xs font-medium">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">mail</span>
              <span>{email || "email@example.com"}</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">phone_iphone</span>
              <span>{phone || "123-456-7890"}</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span>{location || "City, State"}</span>
           </div>
           <div className="flex items-center gap-3 underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white">
              <span className="material-symbols-outlined text-base">link</span>
              <span>{linkedin || "linkedin.com/in/username"}</span>
           </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="flex flex-col gap-5">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] pb-3 border-b border-white/10">Core Skills</h3>
             <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/10 text-[10px] font-bold rounded-lg border border-white/10">
                     {skill}
                  </span>
                ))}
             </div>
          </section>
        )}

         {/* Education */}
        <section className="flex flex-col gap-5 mt-auto">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] pb-3 border-b border-white/10">Education</h3>
           <div className="flex flex-col gap-6">
              {education.map((edu, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                   <h4 className="text-xs font-black">{edu.degree || "Degree Name"}</h4>
                   <p className="text-[10px] font-bold text-white/60">{edu.school || "University Name"}{edu.location ? `, ${edu.location}` : ""}</p>
                   <p className="text-[10px] font-black text-white/40">{edu.year || "Year"}</p>
                   {edu.gpa && (
                     <div className="flex items-center gap-2 mt-1 px-1">
                       <span className="text-[10px] text-white/40">•</span>
                       <span className="text-[10px] font-bold text-white/60">GPA: {edu.gpa}</span>
                     </div>
                   )}
                   {edu.bullets?.filter(Boolean).map((bullet, bi) => (
                     <div key={bi} className="flex items-center gap-2 px-1">
                       <span className="text-[10px] text-white/40">•</span>
                       <span className="text-[10px] text-white/60">{bullet}</span>
                     </div>
                   ))}
                </div>
              ))}
           </div>
        </section>

      </aside>

      {/* Main Content */}
      <main className="w-[65%] p-16 flex flex-col gap-12 overflow-y-auto no-scrollbar">
         
         {/* Summary */}
         {summary && (
           <section className="flex flex-col gap-5">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">About Me</h3>
              <p className="text-sm leading-relaxed text-slate-600 font-medium italic">"{summary}"</p>
           </section>
         )}

         <div className="h-[1px] w-full bg-slate-100"></div>

         {/* Experience */}
         <section className="flex flex-col gap-10">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Experience</h3>
            <div className="flex flex-col gap-12">
               {experience.map((exp, idx) => (
                 <div key={idx} className="flex flex-col gap-4 group">
                    <div className="flex flex-col gap-1 relative pl-6 border-l-2 border-slate-100 group-hover:border-primary transition-all">
                       <div className="absolute top-0 -left-[5px] size-2 bg-slate-200 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                       <h4 className="text-lg font-black text-slate-800 leading-tight">{exp.role || "Job Role"}</h4>
                       <div className="flex items-center gap-3">
                          <h5 className="text-sm font-bold text-primary italic uppercase tracking-wider">{exp.company || "Company Name"}{exp.location ? `, ${exp.location}` : ""}</h5>
                          <span className="size-1 bg-slate-200 rounded-full"></span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exp.duration || "Duration"}</span>
                       </div>
                    </div>
                    <ul className="flex flex-col gap-3 pl-6">
                       {exp.bullets.filter(Boolean).map((bullet, bi) => (
                         <li key={bi} className="text-sm text-slate-600 leading-relaxed font-normal">{bullet || "Key achievement or responsibility"}</li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
         </section>

      </main>

    </div>
  );
};

export default Template3;

import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';
import Input from '../../ui/Input';

const Projects = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();

  const handleAdd = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: Date.now(), name: "", date: "", bullets: [""] }
      ]
    });
  };

  const handleRemove = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
  };

  const handleChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const handleBulletChange = (projId, bulletIdx, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj => 
        proj.id === projId ? { 
          ...proj, 
          bullets: proj.bullets.map((b, i) => i === bulletIdx ? value : b) 
        } : proj
      )
    });
  };

  const handleAddBullet = (projId) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj => 
        proj.id === projId ? { ...proj, bullets: [...proj.bullets, ""] } : proj
      )
    });
  };

  const handleRemoveBullet = (projId, bulletIdx) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj => 
        proj.id === projId ? { 
          ...proj, 
          bullets: proj.bullets.filter((_, i) => i !== bulletIdx) 
        } : proj
      )
    });
  };

  return (
    <AccordionSection title="Projects" icon="rocket_launch" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-col gap-8 pt-4">
        
        {resumeData.projects.length === 0 && (
          <p className="text-slate-400 text-sm italic py-4 text-center">No projects yet. Click + Add to get started.</p>
        )}

        {resumeData.projects.map((proj, idx) => (
          <div key={proj.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-6 relative animate-fade-up">
            
            <div className="flex justify-between items-center px-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Project #{idx+1}</span>
               <button 
                 onClick={() => handleRemove(proj.id)}
                 className="size-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
               >
                 <span className="material-symbols-outlined text-lg">delete</span>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input label="Project Name" value={proj.name} onChange={(e) => handleChange(proj.id, 'name', e.target.value)} />
               <Input label="Date" value={proj.date} onChange={(e) => handleChange(proj.id, 'date', e.target.value)} />
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 px-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Accomplishments</span>
                  <div className="h-px flex-1 bg-slate-100"></div>
               </div>
               <div className="flex flex-col gap-3">
                 {proj.bullets.map((bullet, bi) => (
                   <div key={bi} className="flex gap-2">
                      <div className="flex-1 relative">
                        <textarea
                          value={bullet}
                          onChange={(e) => handleBulletChange(proj.id, bi, e.target.value)}
                          rows={1}
                          className="w-full pt-4 pb-1 px-4 border-b border-slate-200 bg-transparent text-sm text-slate-700 font-medium outline-none focus:border-primary transition-all resize-none"
                          placeholder={`Bullet point ${bi+1}`}
                        ></textarea>
                      </div>
                      <button 
                        onClick={() => handleRemoveBullet(proj.id, bi)}
                        className="size-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all mt-4"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                   </div>
                 ))}
                 <button 
                   onClick={() => handleAddBullet(proj.id)}
                   className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-primary/40 hover:text-primary transition-all mt-2"
                 >
                   <span className="material-symbols-outlined text-sm">add_circle</span>
                   Add Bullet Point
                 </button>
               </div>
            </div>

          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-4 rounded-3xl border-2 border-dashed border-primary/20 text-primary text-sm font-black uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Project
        </button>

      </div>
    </AccordionSection>
  );
};

export default Projects;

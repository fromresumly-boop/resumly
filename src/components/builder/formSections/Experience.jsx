import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const Experience = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();

  const handleAdd = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: Date.now(), company: "", role: "", duration: "", location: "", bullets: [""] }
      ]
    });
  };

  const handleRemove = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const handleChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const handleBulletChange = (expId, bulletIdx, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === expId ? { 
          ...exp, 
          bullets: exp.bullets.map((b, i) => i === bulletIdx ? value : b) 
        } : exp
      )
    });
  };

  const handleBulletBlur = (expId, bulletIdx, value) => {
    const trimmedValue = value.trim();
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === expId ? { 
          ...exp, 
          bullets: exp.bullets.map((b, i) => i === bulletIdx ? trimmedValue : b) 
        } : exp
      )
    });
  };

  const handleAddBullet = (expId) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ""] } : exp
      )
    });
  };

  const handleRemoveBullet = (expId, bulletIdx) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === expId ? { 
          ...exp, 
          bullets: exp.bullets.filter((_, i) => i !== bulletIdx) 
        } : exp
      )
    });
  };

  return (
    <AccordionSection title="Experience" icon="work" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-col gap-8 pt-4">
        
        {resumeData.experience.length === 0 && (
          <p className="text-slate-400 text-sm italic py-4 text-center">No entries yet. Click + Add to get started.</p>
        )}

        {resumeData.experience.map((exp, idx) => (
          <div key={exp.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-6 relative animate-fade-up">
            
            <div className="flex justify-between items-center px-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Position #{idx+1}</span>
               <button 
                 onClick={() => handleRemove(exp.id)}
                 className="size-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
               >
                 <span className="material-symbols-outlined text-lg">delete</span>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input label="Company Name" value={exp.company} onChange={(e) => handleChange(exp.id, 'company', e.target.value)} />
               <Input label="Job Role" value={exp.role} onChange={(e) => handleChange(exp.id, 'role', e.target.value)} />
               <Input label="Duration" value={exp.duration} onChange={(e) => handleChange(exp.id, 'duration', e.target.value)} />
               <Input label="Location (e.g. New York, NY)" value={exp.location} onChange={(e) => handleChange(exp.id, 'location', e.target.value)} />
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 px-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Achievements</span>
                  <div className="h-px flex-1 bg-slate-100"></div>
               </div>
               <div className="flex flex-col gap-3">
                 {exp.bullets.map((bullet, bi) => (
                   <div key={bi} className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold text-base select-none min-w-[16px] text-center">
                        •
                      </span>
                      <div className="flex-1 relative">
                        <textarea
                          value={bullet}
                          onChange={(e) => handleBulletChange(exp.id, bi, e.target.value)}
                          onBlur={(e) => handleBulletBlur(exp.id, bi, e.target.value)}
                          rows={1}
                          className="w-full pt-4 pb-1 px-4 border-b border-slate-200 bg-transparent text-sm text-slate-700 font-medium outline-none focus:border-primary transition-all resize-none"
                          placeholder={`Bullet point ${bi+1}`}
                        ></textarea>
                      </div>
                      <button 
                        onClick={() => handleRemoveBullet(exp.id, bi)}
                        className="size-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                   </div>
                 ))}
                 <button 
                   onClick={() => handleAddBullet(exp.id)}
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
          Add Experience
        </button>

      </div>
    </AccordionSection>
  );
};

export default Experience;

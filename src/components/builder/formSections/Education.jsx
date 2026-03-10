import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const Education = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();

  const handleAdd = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { id: Date.now(), school: "", degree: "", year: "", location: "", gpa: "", bullets: [""] }
      ]
    });
  };

  const handleRemove = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const handleChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const handleBulletChange = (eduId, bulletIdx, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === eduId ? { 
          ...edu, 
          bullets: edu.bullets.map((b, i) => i === bulletIdx ? value : b) 
        } : edu
      )
    });
  };

  const handleBulletBlur = (eduId, bulletIdx, value) => {
    const trimmedValue = value.trim();
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === eduId ? { 
          ...edu, 
          bullets: edu.bullets.map((b, i) => i === bulletIdx ? trimmedValue : b) 
        } : edu
      )
    });
  };

  const handleAddBullet = (eduId) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === eduId ? { ...edu, bullets: [...edu.bullets, ""] } : edu
      )
    });
  };

  const handleRemoveBullet = (eduId, bulletIdx) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === eduId ? { 
          ...edu, 
          bullets: edu.bullets.filter((_, i) => i !== bulletIdx) 
        } : edu
      )
    });
  };

  return (
    <AccordionSection title="Education" icon="school" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-col gap-8 pt-4">
        
        {resumeData.education.length === 0 && (
          <p className="text-slate-400 text-sm italic py-4 text-center">No entries yet. Click + Add to get started.</p>
        )}

        {resumeData.education.map((edu, idx) => (
          <div key={edu.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-6 relative animate-fade-up">
            
            <div className="flex justify-between items-center px-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Degree #{idx+1}</span>
               <button 
                 onClick={() => handleRemove(edu.id)}
                 className="size-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
               >
                 <span className="material-symbols-outlined text-lg">delete</span>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input label="School / University" value={edu.school} onChange={(e) => handleChange(edu.id, 'school', e.target.value)} />
               <Input label="Degree / Field of Study" value={edu.degree} onChange={(e) => handleChange(edu.id, 'degree', e.target.value)} />
               <Input label="Graduation Year" value={edu.year} onChange={(e) => handleChange(edu.id, 'year', e.target.value)} />
               <Input label="Location (e.g. Boston, MA)" value={edu.location} onChange={(e) => handleChange(edu.id, 'location', e.target.value)} />
               <div>
                 <Input label="GPA (optional, e.g. 3.8/4.0)" value={edu.gpa} onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)} />
                 <p className="text-xs text-slate-400 mt-1">Leave blank if you prefer not to show GPA</p>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 px-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Achievements & Details</span>
                  <div className="h-px flex-1 bg-slate-100"></div>
               </div>
               <div className="flex flex-col gap-3">
                 {edu.bullets && edu.bullets.map((bullet, bi) => (
                   <div key={bi} className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold text-base select-none min-w-[16px] text-center">
                        •
                      </span>
                      <div className="flex-1 relative">
                        <textarea
                          value={bullet}
                          onChange={(e) => handleBulletChange(edu.id, bi, e.target.value)}
                          onBlur={(e) => handleBulletBlur(edu.id, bi, e.target.value)}
                          rows={1}
                          className="w-full pt-4 pb-1 px-4 border-b border-slate-200 bg-transparent text-sm text-slate-700 font-medium outline-none focus:border-primary transition-all resize-none"
                          placeholder={`Bullet point ${bi+1}`}
                        ></textarea>
                      </div>
                      <button 
                        onClick={() => handleRemoveBullet(edu.id, bi)}
                        className="size-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                   </div>
                 ))}
                 <button 
                   onClick={() => handleAddBullet(edu.id)}
                   className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-primary/40 hover:text-primary transition-all mt-2"
                 >
                   <span className="material-symbols-outlined text-sm">add_circle</span>
                   Add Item
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
          Add Education
        </button>

      </div>
    </AccordionSection>
  );
};

export default Education;

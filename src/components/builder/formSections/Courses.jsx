import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';
import Input from '../../ui/Input';

const Courses = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();

  const handleAdd = () => {
    setResumeData({
      ...resumeData,
      courses: [
        ...resumeData.courses,
        { id: Date.now(), name: "", provider: "", date: "" }
      ]
    });
  };

  const handleRemove = (id) => {
    setResumeData({
      ...resumeData,
      courses: resumeData.courses.filter(course => course.id !== id)
    });
  };

  const handleChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      courses: resumeData.courses.map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    });
  };

  return (
    <AccordionSection title="Courses" icon="history_edu" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-col gap-8 pt-4">
        
        {resumeData.courses.length === 0 && (
          <p className="text-slate-400 text-sm italic py-4 text-center">No courses yet. Click + Add to get started.</p>
        )}

        {resumeData.courses.map((course, idx) => (
          <div key={course.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-6 relative animate-fade-up">
            
            <div className="flex justify-between items-center px-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Course #{idx+1}</span>
               <button 
                 onClick={() => handleRemove(course.id)}
                 className="size-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
               >
                 <span className="material-symbols-outlined text-lg">delete</span>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <Input label="Course Name" value={course.name} onChange={(e) => handleChange(course.id, 'name', e.target.value)} />
               <Input label="Provider" value={course.provider} onChange={(e) => handleChange(course.id, 'provider', e.target.value)} />
               <Input label="Date" value={course.date} onChange={(e) => handleChange(course.id, 'date', e.target.value)} />
            </div>

          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-4 rounded-3xl border-2 border-dashed border-primary/20 text-primary text-sm font-black uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Course
        </button>

      </div>
    </AccordionSection>
  );
};

export default Courses;

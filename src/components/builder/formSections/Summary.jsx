import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';

const Summary = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.value });
  };

  return (
    <AccordionSection title="Professional Summary" icon="article" isOpen={isOpen} onToggle={onToggle}>
      <div className="pt-4 animate-fade-up">
        <div className="relative">
          <textarea
            value={resumeData.summary}
            onChange={handleChange}
            onBlur={(e) => {
              const trimmed = e.target.value
                .replace(/\s+$/gm, '')      // remove trailing spaces per line
                .replace(/\n{3,}/g, '\n\n') // collapse 3+ blank lines into max 2
                .trim()
              setResumeData(prev => ({ ...prev, summary: trimmed }))
            }}
            rows={6}
            className="w-full pt-8 pb-4 px-5 rounded-2xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-slate-700 leading-relaxed font-medium"
            placeholder="Write a brief overview of your professional background and key strengths..."
          ></textarea>
          <label className="absolute left-5 top-3 text-[10px] font-black uppercase tracking-widest text-primary">
            Summary
          </label>
        </div>
      </div>
    </AccordionSection>
  );
};

export default Summary;

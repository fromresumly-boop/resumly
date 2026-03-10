import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';

const Skills = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();
  const [inputValue, setInputValue] = useState("");
  const [removingSkills, setRemovingSkills] = useState([]);

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (resumeData.skills.includes(trimmed)) {
      setInputValue("");
      return;
    }
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, trimmed]
    }));
    setInputValue("");
  };

  const removeSkill = (skill) => {
    if (removingSkills.includes(skill)) return;
    setRemovingSkills(prev => [...prev, skill]);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }));
      setRemovingSkills(prev => prev.filter(s => s !== skill));
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    } else if (e.key === "Backspace" && inputValue === "" && resumeData.skills.length > 0) {
      removeSkill(resumeData.skills[resumeData.skills.length - 1]);
    }
  };

  return (
    <AccordionSection title="Skills" icon="military_tech" isOpen={isOpen} onToggle={onToggle}>
      <div className="pt-4 flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
          Skills
        </label>
        
        <div 
          className="flex flex-wrap gap-2 p-3 rounded-xl border border-slate-200 bg-white min-h-[48px] cursor-text focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200"
          onClick={() => document.getElementById('skill-input')?.focus()}
        >
          {resumeData.skills.map((skill) => (
            <div 
              key={skill}
              className={`bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 ${
                removingSkills.includes(skill) ? 'animate-shrink-out' : 'animate-pop-in'
              }`}
            >
              <span>{skill}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeSkill(skill);
                }}
                className="text-primary/60 hover:text-primary font-bold cursor-pointer transition-colors"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </div>
          ))}
          <input
            id="skill-input"
            type="text"
            className="border-none outline-none bg-transparent text-sm flex-1 min-w-[120px] py-1"
            placeholder="Type a skill and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <p className="text-xs text-slate-400 mt-1 pl-1">
          Press Enter to add · Backspace to remove last
        </p>
      </div>
    </AccordionSection>
  );
};

export default Skills;

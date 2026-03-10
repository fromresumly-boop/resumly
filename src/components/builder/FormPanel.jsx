import React, { useState } from 'react';
import PersonalInfo from './formSections/PersonalInfo';
import Summary from './formSections/Summary';
import Experience from './formSections/Experience';
import Projects from './formSections/Projects';
import Education from './formSections/Education';
import Skills from './formSections/Skills';
import Courses from './formSections/Courses';
import DownloadBar from './DownloadBar';

const FormPanel = () => {
  const [openSection, setOpenSection] = useState('personal');

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        
        {/* Header Section */}
        <div className="p-8 md:p-12 pb-6 animate-fade-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
              <span className="material-symbols-outlined text-xs">filter_2</span>
              Step 2 of 2
           </div>
           <h1 className="text-3xl font-black text-slate-800 tracking-tight">Fill In Your Details</h1>
           <p className="text-slate-500 text-sm mt-2 font-medium">Add your professional information and watch it update live.</p>
        </div>

        {/* Accordion Sections */}
        <div className="flex flex-col gap-px animate-fade-up delay-100">
          <PersonalInfo 
            isOpen={openSection === 'personal'} 
            onToggle={() => handleToggle('personal')} 
          />
          <Summary 
            isOpen={openSection === 'summary'} 
            onToggle={() => handleToggle('summary')} 
          />
          <Experience 
            isOpen={openSection === 'experience'} 
            onToggle={() => handleToggle('experience')} 
          />
          <Projects 
            isOpen={openSection === 'projects'} 
            onToggle={() => handleToggle('projects')} 
          />
          <Education 
            isOpen={openSection === 'education'} 
            onToggle={() => handleToggle('education')} 
          />
          <Skills 
            isOpen={openSection === 'skills'} 
            onToggle={() => handleToggle('skills')} 
          />
          <Courses 
            isOpen={openSection === 'courses'} 
            onToggle={() => handleToggle('courses')} 
          />
        </div>

      </div>

      {/* Fixed Bottom Download Bar */}
      <DownloadBar />

    </div>
  );
};

export default FormPanel;

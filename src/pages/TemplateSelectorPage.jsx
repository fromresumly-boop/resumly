import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/layout/Navbar';
import TemplateCard from '../components/templateSelector/TemplateCard';
import StickyBar from '../components/templateSelector/StickyBar';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';

const DUMMY_DATA = {
  name: "Alexander Pierce",
  title: "Senior Product Designer",
  email: "alex.pierce@example.com",
  phone: "+1 (555) 000-1234",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexpierce",
  summary: "Results-driven designer with over 8 years of experience in building user-centric digital products. Expert in visual communication and design systems.",
  experience: [
    {
      id: 1,
      company: "TechFlow Inc.",
      role: "Lead UI/UX Designer",
      duration: "2020 - Present",
      bullets: ["Led a team of 5 designers", "Increased conversion by 40%"]
    }
  ],
  education: [
    {
      id: 1,
      school: "Design Institute",
      degree: "BFA in Interaction Design",
      year: "2016"
    }
  ],
  skills: ["Product Strategy", "Figma", "React", "Mobile Design"]
};

const TEMPLATES = [
  {
    id: 1,
    name: "Classic",
    description: "Time-tested, professional layout ideal for traditional industries.",
    component: Template1
  },
  {
    id: 2,
    name: "Modern",
    description: "Clean, minimalist design that focuses on clarity and white space.",
    component: Template2
  }
];

import InactivityWarning from '../components/dashboard/InactivityWarning';
import { useInactivityLogout } from '../hooks/useInactivityLogout';

const TemplateSelectorPage = () => {
  const { user, selectedTemplate, setSelectedTemplate } = useResume();
  const [selectedId, setSelectedId] = useState(selectedTemplate);
  const { showWarning, resetTimer } = useInactivityLogout();

  // Protected Route
  if (!user) return <Navigate to="/auth" replace />;

  const handleSelect = (id) => {
    setSelectedId(id);
    setSelectedTemplate(id);
  };

  const selectedTemplateData = TEMPLATES.find(t => t.id === selectedId);

  return (
    <>
      <InactivityWarning show={showWarning} onStayLoggedIn={resetTimer} />
      <div className="min-h-screen bg-background-light pt-32 pb-40">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-up">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                <span className="material-symbols-outlined text-sm">filter_1</span>
                Step 1 of 2
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Choose Your Resume Template</h1>
             <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">Pick a design that represents you best. You can change this later.</p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            {TEMPLATES.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                id={tpl.id}
                name={tpl.name}
                description={tpl.description}
                isSelected={selectedId === tpl.id}
                onSelect={handleSelect}
              >
                <tpl.component data={DUMMY_DATA} />
              </TemplateCard>
            ))}
          </div>

        </div>

        {/* Sticky Bottom Bar */}
        <StickyBar 
          isVisible={!!selectedId} 
          selectedTemplateName={selectedTemplateData?.name} 
        />

      </div>
    </>
  );
};

export default TemplateSelectorPage;

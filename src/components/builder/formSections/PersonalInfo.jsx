import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import AccordionSection from '../../ui/AccordionSection';
import Input from '../../ui/Input';

const PersonalInfo = ({ isOpen, onToggle }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  return (
    <AccordionSection title="Personal Info" icon="person" isOpen={isOpen} onToggle={onToggle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 animate-fade-up">
        <Input label="Full Name" name="name" value={resumeData.name} onChange={handleChange} />
        <Input label="Job Title" name="title" value={resumeData.title} onChange={handleChange} />
        <Input label="Email Address" type="email" name="email" value={resumeData.email} onChange={handleChange} />
        <Input label="Phone Number" name="phone" value={resumeData.phone} onChange={handleChange} />
        <Input label="Location" name="location" value={resumeData.location} onChange={handleChange} />
        <Input label="LinkedIn URL" name="linkedin" value={resumeData.linkedin} onChange={handleChange} />
      </div>
    </AccordionSection>
  );
};

export default PersonalInfo;

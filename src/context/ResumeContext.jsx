import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ResumeContext = createContext();

const defaultResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  experience: [
    { id: 1, company: "", role: "", duration: "", location: "", bullets: [""] }
  ],
  education: [
    { id: 1, school: "", degree: "", year: "", location: "", gpa: "", bullets: [""] }
  ],
  skills: [],
  projects: [],
  courses: []
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      selectedTemplate,
      setSelectedTemplate,
      user,
      setUser,
      loading
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};


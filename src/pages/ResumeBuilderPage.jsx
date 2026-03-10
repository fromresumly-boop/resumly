import React from 'react';
import { Navigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/layout/Navbar';
import FormPanel from '../components/builder/FormPanel';
import PreviewPanel from '../components/builder/PreviewPanel';

import InactivityWarning from '../components/dashboard/InactivityWarning';
import { useInactivityLogout } from '../hooks/useInactivityLogout';

const ResumeBuilderPage = () => {
  const { user } = useResume();
  const { showWarning, resetTimer } = useInactivityLogout();

  // Protected Route
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <>
      <InactivityWarning show={showWarning} onStayLoggedIn={resetTimer} />
      <div className="h-screen bg-white font-inter flex flex-col overflow-hidden">
        
        {/* Navbar with Scrolled style always on builder */}
        <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 z-50 bg-white">
          <Navbar />
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Left Side: Form Panel (Resizable/Scrollable) */}
          <div className="w-5/12 h-full border-r border-slate-100 relative bg-[#F8FAFC]">
            <FormPanel />
          </div>

          {/* Right Side: Preview Panel (Sticky/Fixed scale) */}
          <div className="w-7/12 h-full bg-slate-50 relative">
            <PreviewPanel />
          </div>

        </div>

      </div>
    </>
  );
};

export default ResumeBuilderPage;

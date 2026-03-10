import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import Button from '../ui/Button';

import { generateAndDownloadPDF } from '../../utils/pdfExport';
import { sendResumeEmail } from '../../utils/emailSend';

import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const DownloadBar = () => {
  const { resumeData, selectedTemplate, user } = useResume();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleDownload = async () => {
    if (!resumeData.name || !resumeData.email) {
       showToast('Please fill in Name and Email at minimum!', 'error');
       return;
    }
    setLoading(true);
    
    try {
      // 1. Generate + Download + Upload to Storage
      const result = await generateAndDownloadPDF(resumeData, selectedTemplate, user?.id);
      
      if (!result || (user && !result.filePath)) {
        throw new Error('PDF generation or upload failed');
      }

      const { filePath, resumeId, blob } = result;

      if (user) {
        // 2. Save resume record to Supabase
        const { error: dbError } = await supabase.from('resumes').insert({
          id: resumeId,
          user_id: user.id,
          template_id: selectedTemplate,
          resume_name: resumeData.name ? `${resumeData.name}'s Resume` : 'My Resume',
          pdf_path: filePath,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });

        if (dbError) throw dbError;
      }

      // 3. Email
      try {
        await sendResumeEmail(user?.email || resumeData.email, blob);
      } catch (err) {
        console.error('Email error:', err);
      }

      // 4. Toast
      showToast('Resume saved and downloaded successfully!', 'success');

      // 5. Navigate to dashboard after 1.5 seconds if logged in
      if (user) {
        setTimeout(() => navigate('/dashboard'), 1500);
      }
      
    } catch (err) {
      console.error("PDF Export error:", err);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 p-8 pt-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
      
      {/* Toast Notification */}
      {toast.show && (
        <div 
          className={`fixed top-12 right-12 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[9999] animate-pop-in
            ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}
          `}
        >
          <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-background-dark/20 backdrop-blur-sm z-[9998] flex items-center justify-center animate-fade-up">
           <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center gap-6 animate-pulse-scale">
              <div className="size-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
              <div className="text-center">
                 <h3 className="text-xl font-black text-slate-800">Generating your PDF...</h3>
                 <p className="text-sm text-slate-400 font-medium">Please wait while we prepare your resume</p>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Button 
          variant="primary" 
          size="lg" 
          disabled={loading}
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-3 text-lg font-black group transition-all"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">picture_as_pdf</span>
          Download PDF
        </Button>
      </div>

    </div>
  );
};

export default DownloadBar;

import React from 'react'
import { supabase } from '../../lib/supabaseClient'

const ResumeCard = ({ resume, onDelete }) => {
  const daysRemaining = Math.ceil((new Date(resume.expires_at) - new Date()) / 86400000)
  const isExpiringSoon = daysRemaining <= 2

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .createSignedUrl(resume.pdf_path, 60)
      
      if (error) throw error
      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank')
      }
    } catch (err) {
      console.error('Error downloading resume:', err)
      alert('Failed to download resume.')
    }
  }

  const handleDelete = () => {
    if (confirm("Delete this resume? This cannot be undone.")) {
      onDelete(resume.id, resume.pdf_path)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-primary/10 text-primary rounded-xl p-3 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl">description</span>
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A] line-clamp-1">{resume.resume_name}</h3>
          <p className="text-sm text-slate-400">Template {resume.template_id}</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center">
           <span className="text-xs text-slate-400">Created:</span>
           <span className="text-xs font-semibold text-slate-600">
             {new Date(resume.created_at).toLocaleDateString('en-US', {
               month: 'short',
               day: '2-digit',
               year: 'numeric'
             })}
           </span>
        </div>
        <div className="flex justify-between items-center">
           <span className="text-xs text-slate-400">Expires:</span>
           <span className={`text-xs font-semibold ${isExpiringSoon ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
             Expires in {daysRemaining} days {isExpiringSoon && '⚠'}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button
          onClick={handleDownload}
          className="flex-1 bg-primary text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Download
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 text-red-500 border border-red-200 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ResumeCard

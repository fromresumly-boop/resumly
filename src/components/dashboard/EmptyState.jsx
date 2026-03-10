import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyState = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-20 flex flex-col items-center justify-center text-center">
      <span className="material-symbols-outlined text-slate-300 text-7xl mb-4">description</span>
      <h2 className="text-xl font-bold text-slate-400">No resumes yet</h2>
      <p className="text-slate-400 text-sm mt-2 max-w-sm">
        Create your first resume and it will appear here.
      </p>
      <button
        onClick={() => navigate('/select-template')}
        className="bg-primary text-white rounded-xl px-6 py-3 mt-6 font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
      >
        Build My Resume
      </button>
    </div>
  )
}

export default EmptyState

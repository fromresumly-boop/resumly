import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useResume } from '../context/ResumeContext'
import Navbar from '../components/layout/Navbar'
import ResumeCard from '../components/dashboard/ResumeCard'
import EmptyState from '../components/dashboard/EmptyState'
import InactivityWarning from '../components/dashboard/InactivityWarning'
import { useInactivityLogout } from '../hooks/useInactivityLogout'

const DashboardPage = () => {
  const { user } = useResume()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const { showWarning, resetTimer } = useInactivityLogout()

  useEffect(() => {
    if (!user) return
    fetchResumes()
  }, [user])

  const fetchResumes = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setResumes(data || [])
    } catch (err) {
      console.error('Error fetching resumes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (resumeId, pdfPath) => {
    try {
      // 1. Delete from storage
      await supabase.storage.from('resumes').remove([pdfPath])
      // 2. Delete from database
      await supabase.from('resumes').delete().eq('id', resumeId)
      // 3. Update local state
      setResumes(prev => prev.filter(r => r.id !== resumeId))
      // Success toast would go here
    } catch (err) {
      console.error('Error deleting resume:', err)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const getStats = () => {
    if (resumes.length === 0) return { total: 0, mostUsed: 'N/A', nextExpiry: 'N/A' }
    
    // Total count
    const total = resumes.length
    
    // Most used template
    const templateCounts = resumes.reduce((acc, curr) => {
      acc[curr.template_id] = (acc[curr.template_id] || 0) + 1
      return acc
    }, {})
    const mostUsed = Object.keys(templateCounts).sort((a,b) => templateCounts[b] - templateCounts[a])[0] || '1'
    
    // Days until oldest resume (first one to expire)
    const sortedByExpiry = [...resumes].sort((a,b) => new Date(a.expires_at) - new Date(b.expires_at))
    const nextExpiry = Math.ceil((new Date(sortedByExpiry[0].expires_at) - new Date()) / 86400000)

    return { total, mostUsed, nextExpiry }
  }

  const stats = getStats()

  return (
    <>
      <InactivityWarning show={showWarning} onStayLoggedIn={resetTimer} />
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-6 py-32">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                My Resumes
              </h1>
              <p className="text-slate-500 mt-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Your resumes are stored for 7 days after creation.
              </p>
            </div>
            <button
               onClick={() => navigate('/select-template')}
               className="bg-primary text-white rounded-2xl px-8 py-4 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25 flex items-center gap-3"
            >
              <span className="material-symbols-outlined font-bold">add_circle</span>
              New Resume
            </button>
          </div>

          {/* User Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] ring-1 ring-slate-100 flex flex-col md:flex-row items-center gap-6">
            <div className="size-20 bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-0">
               {(user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#0F172A]">
                {user?.user_metadata?.full_name || 'Resume Creator'}
              </h2>
              <p className="text-slate-400 font-medium mb-1">{user?.email}</p>
              <div className="flex items-center gap-2 justify-center md:justify-start text-xs text-slate-400 font-semibold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">verified</span>
                Verified Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'March 2026'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-8 py-3.5 text-red-500 border-2 border-red-50 hover:bg-red-50 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined font-bold">logout</span>
              Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Resumes Created', value: stats.total, color: 'text-primary' },
              { label: 'Most Used Template', value: `Template ${stats.mostUsed}`, color: 'text-blue-500' },
              { label: 'Days Until Expiry', value: `${stats.nextExpiry} Days`, color: 'text-amber-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group">
                <div className={`text-3xl font-black ${stat.color} mb-1 group-hover:scale-110 transition-transform origin-left`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse ring-1 ring-slate-200" />
              ))}
            </div>
          ) : resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumes.map(resume => (
                <ResumeCard 
                   key={resume.id} 
                   resume={resume} 
                   onDelete={handleDelete} 
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </>
  )
}

export default DashboardPage

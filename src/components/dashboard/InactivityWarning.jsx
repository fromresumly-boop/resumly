import React, { useState, useEffect } from 'react'

const InactivityWarning = ({ show, onStayLoggedIn }) => {
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    let interval = null
    if (show) {
      setTimeLeft(120)
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    } else {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [show])

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  if (!show) return null

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[60] transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-80">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-amber-500 text-3xl">timer</span>
          <div>
            <h3 className="font-bold text-[#0F172A]">Still there?</h3>
            <p className="text-slate-500 text-sm">You'll be logged out in 2 minutes due to inactivity.</p>
          </div>
        </div>
        
        <button
          onClick={onStayLoggedIn}
          className="w-full bg-primary text-white rounded-xl py-2.5 font-semibold hover:opacity-90 transition-all mb-2"
        >
          Stay Logged In
        </button>
        
        <p className="text-xs text-slate-400 text-center">
          Logging out in {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  )
}

export default InactivityWarning

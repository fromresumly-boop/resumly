import { useEffect, useRef, useCallback, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

const TIMEOUT_MS = 10 * 60 * 1000    // 10 minutes → auto logout
const WARNING_MS = 8 * 60 * 1000     // 8 minutes → show warning

export const useInactivityLogout = () => {
  const [showWarning, setShowWarning] = useState(false)
  const timerRef = useRef(null)
  const warningRef = useRef(null)
  const navigate = useNavigate()

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (warningRef.current) clearTimeout(warningRef.current)
    
    setShowWarning(false)

    warningRef.current = setTimeout(() => {
      setShowWarning(true)
    }, WARNING_MS)

    timerRef.current = setTimeout(async () => {
      await supabase.auth.signOut()
      navigate('/')
    }, TIMEOUT_MS)
  }, [navigate])

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    })

    resetTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (warningRef.current) clearTimeout(warningRef.current)
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [resetTimer])

  return { showWarning, resetTimer }
}

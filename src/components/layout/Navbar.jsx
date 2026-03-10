import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { supabase } from '../../lib/supabaseClient';
import Button from '../ui/Button';

const Navbar = ({ navItems = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = React.useRef(null);

  const isLandingPage = location.pathname === '/';
  const shouldShowScrolled = isScrolled || !isLandingPage;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLandingPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleNavClick = (e, item) => {
    if (item.type === 'scroll') {
      e.preventDefault();
      const targetId = item.href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (location.pathname !== '/') {
        navigate(`/${item.href}`);
      } else if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.href);
    }
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    ...navItems,
    ...(user ? [{ label: 'Dashboard', href: '/dashboard' }] : [])
  ];

  return (
    <nav 
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 ${
        shouldShowScrolled 
          ? 'top-4 max-w-6xl mx-auto' 
          : 'top-0 w-full'
      }`}
    >
      <div 
        className={`transition-all duration-500 ease-in-out flex items-center justify-between mx-auto outline-none ${
          shouldShowScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-full py-2 px-8' 
            : 'bg-transparent py-6 px-0'
        }`}
      >
        {/* Left: Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 group"
        >
          <div className={`bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-all duration-300 ${
            shouldShowScrolled ? 'w-8 h-8' : 'w-10 h-10'
          }`}>
            <span className={`material-symbols-outlined ${shouldShowScrolled ? 'text-lg' : 'text-xl'}`}>description</span>
          </div>
          <span className={`font-bold tracking-tight text-slate-900 transition-all duration-300 ${
            shouldShowScrolled ? 'text-lg' : 'text-xl'
          }`}>Resumly</span>
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={(e) => handleNavClick(e, item)}
              className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/5 rounded-full ${
                location.pathname === item.href ? 'text-primary' : 'text-slate-600 hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="size-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-2 w-48 z-[60] animate-pop-in">
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight mb-0.5">Signed in as</p>
                    <p className="text-xs font-semibold text-slate-600 truncate">{user.email}</p>
                  </div>
                  
                  <div className="h-px bg-slate-50 my-1"></div>
                  
                  <button
                    onClick={() => { navigate('/dashboard'); setShowDropdown(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg opacity-60">dashboard</span>
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => { navigate('/select-template'); setShowDropdown(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg opacity-60">edit_note</span>
                    Build Resume
                  </button>
                  
                  <div className="h-px bg-slate-50 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 text-sm font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={() => navigate('/auth?mode=signin')}
                className="hidden sm:block px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
              >
                Sign In
              </button>
              <Button 
                variant="primary" 
                size={shouldShowScrolled ? "sm" : "md"}
                onClick={() => navigate('/auth?mode=signup')}
                className="rounded-full shadow-lg shadow-primary/25 px-5 py-2"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



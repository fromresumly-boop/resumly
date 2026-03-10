import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import Badge from '../components/ui/Badge';

const AuthPage = () => {
  const { user, loading } = useResume();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';
  const [isAnimating, setIsAnimating] = useState(false);

  if (!loading && user) return <Navigate to="/select-template" replace />;

  const handleTabChange = (newMode) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSearchParams({ mode: newMode });
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white flex font-inter">
      
      {/* LEFT PANEL: Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 hero-gradient flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3B7BF8 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 text-center max-w-lg mb-20 animate-fade-up">
          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">Build Your Perfect Resume in Minutes</h1>
          <p className="text-slate-600 text-lg font-medium">Join 50,000+ professionals who trust Resumly</p>
        </div>

        {/* Fanned Cards (Same as Landing but smaller) */}
        <div className="relative h-80 w-full flex justify-center items-center scale-90">
             <div className="absolute w-52 h-72 bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col p-4 opacity-40 -translate-x-20 -rotate-12">
               <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
               <div className="h-2 w-full bg-slate-50 rounded mb-1"></div>
               <div className="h-2 w-full bg-slate-50 rounded mb-1"></div>
             </div>
             <div className="absolute w-52 h-72 bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col p-4 opacity-40 translate-x-20 rotate-12">
               <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
               <div className="h-2 w-full bg-slate-50 rounded mb-1"></div>
               <div className="h-2 w-full bg-slate-50 rounded mb-1"></div>
             </div>
             <div className="relative z-10 w-60 h-[340px] bg-white rounded-xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 transform transition-transform hover:scale-105 duration-500">
                <div className="size-12 rounded-full bg-primary/5"></div>
                <div className="space-y-2">
                   <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                   <div className="h-2 w-full bg-slate-50 rounded"></div>
                   <div className="h-2 w-full bg-slate-50 rounded"></div>
                </div>
                <div className="mt-auto flex justify-center">
                   <Badge variant="primary" className="text-[10px]">Verified Layout</Badge>
                </div>
             </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-1/4 -left-4 animate-bounce duration-[3000ms] delay-500">
           <Badge variant="success" className="shadow-lg py-2">ATS Optimized</Badge>
        </div>
        <div className="absolute bottom-1/4 -right-4 animate-bounce duration-[4000ms]">
           <Badge variant="blue" className="shadow-lg py-2">PDF Export</Badge>
        </div>

      </div>

      {/* RIGHT PANEL: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-20 relative bg-white">
        
        {/* Logo at Top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-20 lg:translate-x-0">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
               <span className="material-symbols-outlined text-xl">description</span>
             </div>
             <span className="text-xl font-bold tracking-tight text-slate-900">Resumly</span>
          </Link>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-10 mt-32 lg:mt-0">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button 
               onClick={() => handleTabChange('signin')}
               className={`flex-1 pb-4 text-sm font-bold transition-all duration-200 border-b-2 ${mode === 'signin' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button 
               onClick={() => handleTabChange('signup')}
               className={`flex-1 pb-4 text-sm font-bold transition-all duration-200 border-b-2 ${mode === 'signup' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Sign Up
            </button>
          </div>

          <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
            {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
          </div>

          <p className="text-center text-xs text-slate-400 leading-relaxed max-w-[280px] mx-auto">
            By continuing, you agree to Resumly's <a href="#" className="font-bold text-slate-500 hover:underline">Terms of Service</a> & <a href="#" className="font-bold text-slate-500 hover:underline">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
  );
};

export default AuthPage;

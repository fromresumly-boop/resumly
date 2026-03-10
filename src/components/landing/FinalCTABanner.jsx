import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import Button from '../ui/Button';

const FinalCTABanner = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white">
      <div className={`max-w-6xl mx-auto blue-gradient rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        
        {/* Content */}
        <div className={`relative z-10 max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">One Resume.<br />Endless Opportunities.</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-12 font-medium">
            Join 100,000+ professionals who trust Resumly to power their career growth and land their dream job today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
               variant="outline" 
               size="lg" 
               className="w-full sm:w-auto bg-white text-primary border-white hover:bg-slate-50 transition-colors text-lg font-black py-5 shadow-2xl px-12"
               onClick={() => navigate('/auth?mode=signup')}
            >
               Build My Resume Now
            </Button>
            <Button 
               variant="outline" 
               size="lg" 
               className="w-full sm:w-auto bg-transparent text-blue border-2 border-white/40 hover:bg-white/10 hover:border-white hover:text-white transition-all text-lg font-bold py-5 px-10"
               onClick={() => navigate('/select-template')}
            >
               See Templates
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-white/10 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Floating Badges (Desktop) */}
        <div className="hidden lg:block absolute top-20 left-20 animate-bounce duration-[3000ms]">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-primary bg-white rounded-full p-1 text-sm">verified</span>
            <span className="text-xs font-bold">100% Secure</span>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-20 animate-bounce duration-[2500ms]">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">task_alt</span>
            <span className="text-xs font-bold">Try for Free</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTABanner;

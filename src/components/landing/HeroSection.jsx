import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import Button from '../ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const isVisible = useScrollAnimation(ref);

  return (
    <section ref={ref} className="pt-40 pb-20 hero-gradient min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className={`max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-background-dark leading-[1.1] tracking-tight mb-8">
          Land More Offers With <span className="text-primary">Professional Resume Builder</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Instantly refine your resume and stand out for any role with our advanced resume editor. Your dream job is one click away.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/auth?mode=signup')}
            className="w-full sm:w-auto"
          >
            Start for Now!
          </Button>
          
        </div>
        
        <p className="text-sm font-medium text-slate-500 flex items-center justify-center gap-1.5">
          <span className="text-primary font-bold">✦</span> No monthly subscription required
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

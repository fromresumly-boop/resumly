import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import ResumeShowcase from '../components/landing/ResumeShowcase';
import SloganStatsStrip from '../components/landing/SloganStatsStrip';
import TopFormatsSection from '../components/landing/TopFormatsSection';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturesSection from '../components/landing/FeaturesSection';
import Testimonials from '../components/landing/Testimonials';
import FinalCTABanner from '../components/landing/FinalCTABanner';

const LandingPage = () => {
  const navItems = [
    { label: 'Features', href: '#features', type: 'scroll' },
    { label: 'Templates', href: '#strategy', type: 'scroll' },
    { label: 'Build Resume', href: '/auth?mode=signup', type: 'route' },
  ];

  return (
    <div className="bg-background-light text-slate-900 font-inter no-scrollbar transition-all duration-300">
      <Navbar navItems={navItems} />
      <main>
        <HeroSection />
        <ResumeShowcase />
        <SloganStatsStrip />
        <div id="strategy">
          <TopFormatsSection />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <Testimonials />
        <FinalCTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

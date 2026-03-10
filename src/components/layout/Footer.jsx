import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background-dark text-slate-400 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">description</span>
              </div>
              <span className="text-lg font-bold">Resumly</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering job seekers with professional resume optimization and premium designs.
            </p>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Product</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/select-template" className="hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="/build" className="hover:text-primary transition-colors">Resume Builder</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Legal</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Resumly. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="mt-16 bg-card-dark/50 border-t border-white/5 pt-12 pb-12">
      <div className="px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">
            {lang === 'sv' ? 'Låt oss bygga' : "Let's build"} <br/><span className="text-primary">{lang === 'sv' ? 'tillsammans.' : 'together.'}</span>
          </h2>
          <p className="text-slate-400 text-sm">
            {lang === 'sv' ? 'Baserad i Skärholmen, Stockholm. Tillgänglig för globala samarbeten.' : 'Based in Stockholm. Available for worldwide collaborations.'}
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-48 rounded-xl overflow-hidden relative mb-10 glow-border">
          <img 
            className="w-full h-full object-cover opacity-30 grayscale contrast-150" 
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000&auto=format&fit=crop" 
            alt="Map of Stockholm" 
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="material-icons-outlined text-primary text-4xl">location_on</span>
              <div className="absolute inset-0 bg-primary blur-lg opacity-40 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">Github</a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">Instagram</a>
          </div>
          
          <div className="text-[10px] text-slate-500 uppercase tracking-widest">
            © 2024 DIGITALA VERKLIGHETER AB. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Capability, Language } from '../types';

interface CapabilitiesProps {
  capabilities: Capability[];
  lang: Language;
}

const Capabilities: React.FC<CapabilitiesProps> = ({ capabilities, lang }) => {
  return (
    <section className="mt-20 px-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-8 flex items-center">
        {lang === 'sv' ? 'Expertis' : 'Capabilities'} <span className="ml-4 flex-grow h-[1px] bg-white/10"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap) => (
          <div 
            key={cap.id} 
            className="group relative bg-card-dark/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/30 mask-linear-gradient"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20">
                <span className="material-icons-outlined text-3xl text-slate-300 group-hover:text-white transition-colors">{cap.icon || 'star'}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-white">{cap.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300">
                {cap.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;


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
      <div className="space-y-4">
        {capabilities.map((cap) => (
          <div 
            key={cap.id} 
            className="bg-card-dark p-6 rounded-xl border border-white/5 relative group overflow-hidden hover:border-primary/30 transition-all cursor-default"
          >
            <div className="absolute -right-4 -top-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-icons-outlined">{cap.icon || 'star'}</span>
            </div>
            <div className="text-primary mb-4">
              <span className="material-icons-outlined text-3xl">{cap.icon || 'star'}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cap.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {cap.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;


import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="px-6 py-24 text-center space-y-8 relative z-10">
      <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-2 rounded-full animate-[float_4s_ease-in-out_infinite]">
        <span className="text-[12px] font-medium tracking-widest text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Portfolio v2.0
        </span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] break-words max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400 drop-shadow-2xl">
        {title}
      </h1>
      <p className="max-w-xl mx-auto text-lg text-slate-400 font-light leading-relaxed">
        {subtitle}
      </p>
    </section>
  );
};

export default Hero;


import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="px-6 py-20 text-center space-y-8">
      <div className="inline-block bg-primary/5 border border-primary/20 px-4 py-1 rounded-full">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Portfolio v2.0</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] break-words">
        {title.split(' ').map((word, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 !== 0 ? 'text-primary' : ''}>{word}</span>
            <br />
          </React.Fragment>
        ))}
      </h1>
      <p className="max-w-xl mx-auto text-lg text-slate-400 font-light leading-relaxed">
        {subtitle}
      </p>
    </section>
  );
};

export default Hero;

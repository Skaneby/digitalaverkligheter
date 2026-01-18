import React from 'react';
import { Language } from '../types';

interface ProfileProps {
  lang: Language;
  content?: string;
}

const Profile: React.FC<ProfileProps> = ({ lang, content }) => {
  return (
    <section className="py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      
      {/* About Me Section */}
      <div className="bg-card-dark/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar / Image placeholder */}
          <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border-2 border-primary/30 flex items-center justify-center">
             <span className="material-symbols-outlined text-6xl text-primary/50">person</span>
          </div>

          <div className="space-y-4 flex-1">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {lang === 'sv' ? 'Om mig' : 'About Me'}
            </h2>
            
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <>
                  <p>
                    {lang === 'sv' 
                      ? "Jag började arbeta med analog filmproduktion i början av 90-talet. Sedan dess har jag följt mediaformatet in i den digitala världen, både som fotograf, redigerare, arbetsflödes- och videokomprimeringsspecialist och teknisk skribent."
                      : "I started working with analog film production in the early 90s. Since then, I have followed the media format into the digital world, working as a photographer, editor, workflow and video compression specialist, and technical writer."}
                  </p>
                  <p>
                    {lang === 'sv'
                      ? "Mina arbetsgivare genom åren har främst varit Telestream INC, Macoteket AB, Eyevinn Technology, Vidispine AB, Junefirst AB (tidigare June/First Light) och nu senast franska ATEME."
                      : "My employers over the years have primarily been Telestream INC, Macoteket AB, Eyevinn Technology, Vidispine AB, Junefirst AB (formerly June/First Light), and most recently, French ATEME."}
                  </p>
                  <p>
                    {lang === 'sv'
                      ? "Som konsult och tekniskt säljstöd har jag i dessa företag arbetat med ett stort antal kunder runt om i världen genom åren. UR, NRK, Hasselblad, RTVE, ComHem, Teracom, LO, Aftonbladet, SVD, ABC, US NAVY, RedBee, Ericsson, SF Studios, RED BULL TV, RUV, NOS - listan är lång."
                      : "As a consultant and technical sales support, I have worked with a large number of clients around the world over the years. UR, NRK, Hasselblad, RTVE, ComHem, Teracom, LO, Aftonbladet, SVD, ABC, US NAVY, RedBee, Ericsson, SF Studios, RED BULL TV, RUV, NOS - the list is long."}
                  </p>
                  <p className="italic text-primary/80">
                    {lang === 'sv'
                      ? "Jag är även en passionerad musiker. Sök på Honeycave och Cod lovers på närmaste musikplattform."
                      : "I am also a passionate musician. Search for Honeycave and Cod lovers on your nearest music platform."}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact / Search Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card-dark/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary group-hover:animate-bounce">contact_mail</span>
            {lang === 'sv' ? 'Kontakt' : 'Contact'}
          </h3>
          <ul className="space-y-3">
             <li>
                <a href="mailto:johan.skaneby@digitalaverkligheter.se" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">email</span>
                  johan.skaneby@digitalaverkligheter.se
                </a>
             </li>
             <li>
                <a href="https://www.linkedin.com/in/johanskaneby/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                   <span className="material-symbols-outlined text-sm">work</span>
                   LinkedIn
                </a>
             </li>
             <li>
                <a href="https://www.facebook.com/skaneby.se" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                   <span className="material-symbols-outlined text-sm">public</span>
                   Facebook
                </a>
             </li>
             <li>
                <a href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                   <span className="material-symbols-outlined text-sm">chat</span>
                   Messenger
                </a>
             </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-indigo-500/10 backdrop-blur-md p-6 rounded-2xl border border-primary/20 flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-3">lightbulb</span>
            <p className="text-slate-200 font-light">
               {lang === 'sv' 
                 ? "Hör av dig om du har problem i din digitala vardag. Kanske vet jag eller någon annan hur man löser det?"
                 : "Get in touch if you have problems in your digital daily life. Maybe I or someone else knows how to solve it?"}
            </p>
        </div>
      </div>

    </section>
  );
};

export default Profile;

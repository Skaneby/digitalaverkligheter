
import React from 'react';
import { BlogPost, Language } from '../types';

interface InsightsProps {
  posts: BlogPost[];
  lang: Language;
  onPostClick: (post: BlogPost) => void;
}

const Insights: React.FC<InsightsProps> = ({ posts, lang, onPostClick }) => {
  return (
    <section className="mt-24 pl-6">
      <div className="flex justify-between items-end pr-6 mb-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
            {lang === 'sv' ? 'Insikter' : 'Insights'}
          </h2>
          <h3 className="text-2xl font-bold">{lang === 'sv' ? 'Senaste tankar' : 'Latest Thinking'}</h3>
        </div>
        <button className="text-primary text-xs font-bold uppercase border-b border-primary/30 pb-1">
          {lang === 'sv' ? 'Se alla' : 'View All'}
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-8 pr-6">
        {posts.map((post) => (
          <div 
            key={post.id} 
            onClick={() => onPostClick(post)}
            className="min-w-[280px] md:min-w-[340px] bg-card-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
          >
            <div className="h-40 md:h-48 relative">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={post.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'} 
                alt={post.title} 
              />
              <div className="absolute top-3 left-3 bg-primary text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                {post.tag}
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-slate-400 text-xs line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insights;

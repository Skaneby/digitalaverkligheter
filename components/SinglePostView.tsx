import React, { useEffect } from 'react';
import { BlogPost } from '../types';

interface SinglePostViewProps {
  post: BlogPost;
  onClose: () => void;
}

const SinglePostView: React.FC<SinglePostViewProps> = ({ post, onClose }) => {
  // Scroll to top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Navigation / Back Button */}
      <button 
        onClick={onClose}
        className="mb-6 flex items-center space-x-2 text-primary hover:text-white transition-colors group"
      >
        <span className="material-icons-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span className="text-xs font-bold uppercase tracking-widest">Tillbaka</span>
      </button>

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
           <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest text-black bg-primary rounded-full">
            {post.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg max-w-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center text-sm text-slate-300">
            <span className="material-icons-outlined text-base mr-2">calendar_today</span>
            {post.date}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl">
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl">
           {/* Render HTML content safely */}
           {post.content ? (
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
           ) : (
             <p className="italic text-slate-500">Ingen text tillgänglig för denna post.</p>
           )}
        </article>
      </div>
    </div>
  );
};

export default SinglePostView;

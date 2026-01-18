
import migratedData from '../src/data/migrated_content.json';
import { BlogPost, PageContent } from '../types';

// Helper to clean WP content
export const cleanWPContent = (html: string): string => {
  if (!html) return '';
  // Remove WP comments like <!-- wp:paragraph -->
  let cleaned = html.replace(/<!--.*?-->/gs, '');
  // Replace newlines that might be literal 'n' if that issue persists, 
  // but assuming JSON is correct now (utf8).
  // If we see literal `\n` characters in the string, we might want to respect them or convert to <br>.
  // But usually raw HTML is fine.
  
  return cleaned;
};

export const getBlogPosts = (): BlogPost[] => {
  return migratedData
    .filter((bst: any) => bst.type === 'post' && bst.status === 'publish')
    .map((post: any) => {
      // Extract first image
      const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
      const firstImg = imgMatch ? imgMatch[1] : null;
      
      // Cleanup content for excerpt
      const cleanContent = cleanWPContent(post.content);
      const textOnly = cleanContent.replace(/<[^>]+>/g, '').substring(0, 150) + '...';

      return {
        id: post.id,
        title: post.title,
        excerpt: textOnly,
        tag: 'Artikel', // We'd need category mapping for this
        imageUrl: firstImg || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        date: post.date,
        content: cleanContent
      };
    })
    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
};

export const getPage = (slug: string): PageContent | null => {
  const page = migratedData.find((p: any) => (p.type === 'page' && p.slug === slug) || (p.title.toLowerCase() === slug.toLowerCase().replace('-', ' ')));
  if (!page) return null;
  
  return {
    id: page.id,
    title: page.title,
    content: cleanWPContent(page.content),
    slug: page.slug
  };
};


export type Language = 'sv' | 'en';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  imageUrl: string;
  date?: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AdminSettings {
  facebookPageId: string;
  facebookAccessToken: string;
  scrapeUrl: string;
  defaultLanguage: Language;
}

export enum NavigationTab {
  HOME = 'HOME',
  WORK = 'WORK',
  LAB = 'LAB',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN'
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  capabilities: Capability[];
  blogPosts: BlogPost[];
}

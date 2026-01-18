import React, { useState, useEffect } from 'react';
import { NavigationTab, Capability, BlogPost, AdminSettings, Language } from './types';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Insights from './components/Insights';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';
import SinglePostView from './components/SinglePostView';
import { getBlogPosts, getPage } from './services/contentService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.HOME);
  const [lang, setLang] = useState<Language>('sv');
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [settings, setSettings] = useState<AdminSettings>({
    facebookPageId: 'digitalaverkligheter.se',
    facebookAccessToken: '',
    scrapeUrl: 'https://digitalaverkligheter.se',
    defaultLanguage: 'sv'
  });

  const [heroContent, setHeroContent] = useState({
    title: 'Digitala Verkligheter',
    subtitle: 'Finns tekniken för vår skull? Eller finns vi för teknikens skull? Utforska framtidens digitala lösningar med människan i centrum.'
  });

  const [capabilities, setCapabilities] = useState<Capability[]>([
    { id: '1', title: 'Digital Strategi', description: 'Vi hjälper företag att navigera i det digitala landskapet.', icon: 'explore' },
    { id: '2', title: 'Produktion', description: 'Visuellt berättande genom video och digital design.', icon: 'video_library' },
    { id: '3', title: 'Teknikutveckling', description: 'Moderna lösningar baserade på Next.js och AI.', icon: 'code' }
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [aboutMeContent, setAboutMeContent] = useState<string>('');

  useEffect(() => {
    // Load migrated data
    const posts = getBlogPosts();
    setBlogPosts(posts);

    const aboutPage = getPage('om-mig') || getPage('about-me');
    if (aboutPage) {
        setAboutMeContent(aboutPage.content);
    }
  }, []);

  const handleScrapedData = (data: any) => {
    setIsSyncing(true);
    if (data.heroTitle) setHeroContent({ title: data.heroTitle, subtitle: data.heroSubtitle });
    if (data.capabilities) setCapabilities(data.capabilities);
    if (data.blogPosts) setBlogPosts(data.blogPosts);
    
    setTimeout(() => {
      setIsSyncing(false);
      setActiveTab(NavigationTab.HOME);
    }, 1500);
  };

  const renderContent = () => {
    if (selectedPost) {
      return <SinglePostView post={selectedPost} onClose={() => setSelectedPost(null)} />;
    }

    switch (activeTab) {
      case NavigationTab.ADMIN:
        return <AdminPanel settings={settings} onSave={setSettings} onDataLoaded={handleScrapedData} />;
      case NavigationTab.PROFILE:
        return <Profile lang={lang} content={aboutMeContent} />;
      case NavigationTab.HOME:
      default:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Hero title={heroContent.title} subtitle={heroContent.subtitle} />
            <Capabilities capabilities={capabilities} lang={lang} />
            <Insights posts={blogPosts} lang={lang} onPostClick={setSelectedPost} />
            <Footer lang={lang} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 pb-24">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] glass-header px-6 h-14 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setActiveTab(NavigationTab.HOME); setSelectedPost(null); }}>
          <span className="material-symbols-outlined text-primary text-xl">blur_on</span>
          <span className="font-bold text-xs uppercase tracking-widest">Digitala Verkligheter</span>
          {isSyncing && (
            <div className="flex items-center ml-4 space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Live Sync</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')}
            className="text-[10px] font-bold opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest"
          >
            {lang === 'sv' ? 'EN' : 'SV'}
          </button>
          <button 
            onClick={() => setActiveTab(NavigationTab.ADMIN)}
            className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors ${activeTab === NavigationTab.ADMIN ? 'text-primary ring-1 ring-primary/20' : ''}`}
          >
            <span className="material-icons-outlined text-xl">admin_panel_settings</span>
          </button>
        </div>
      </header>
      
      <main className="pt-20 max-w-4xl mx-auto px-6">
        {renderContent()}
      </main>

      {/* Kompakt bottenmeny (Pill) */}
      {!selectedPost && activeTab !== NavigationTab.ADMIN && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <nav className="flex items-center bg-card-dark/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl">
            {[
              { id: NavigationTab.HOME, icon: 'home', label: 'Hem' },
              { id: NavigationTab.WORK, icon: 'grid_view', label: 'Case' },
              { id: NavigationTab.LAB, icon: 'science', label: 'Lab' },
              { id: NavigationTab.PROFILE, icon: 'person', label: 'Om oss' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as NavigationTab)}
                className={`flex items-center space-x-2 px-5 py-2 rounded-full transition-all ${
                  activeTab === tab.id ? 'bg-primary text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="material-icons-outlined text-sm">{tab.icon}</span>
                <span className="text-[10px] uppercase tracking-widest hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;


import React, { useState, useEffect, useRef } from 'react';
import { AdminSettings } from '../types';
import { analyzeSiteContent, fetchFacebookContent } from '../services/geminiService';

interface AdminPanelProps {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
  onDataLoaded: (data: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ settings, onSave, onDataLoaded }) => {
  const [localSettings, setLocalSettings] = useState<AdminSettings>(settings);
  const [loading, setLoading] = useState<'scrape' | 'fb' | null>(null);
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'success' | 'error' | 'step'}[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'info' | 'success' | 'error' | 'step' = 'info') => {
    setLogs(prev => [...prev, { msg, type }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runScrape = async () => {
    setLoading('scrape');
    setLogs([]);
    addLog("🚀 Startar intelligent migrering...", "info");
    addLog("🔍 Ansluter till Gemini 3 Pro Engine...", "step");
    
    // Simulerade statussteg för att ge feedback medan sökverktyget jobbar
    const steps = [
      "📡 Söker efter digitalaverkligheter.se via Google Search...",
      "📄 Analyserar HTML-struktur och metadata...",
      "🧠 Extraherar kärntjänster och vision...",
      "🔗 Kontrollerar portfölj och pågående projekt...",
      "⚙️ Formaterar data till JSON-schema..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        addLog(steps[i], "step");
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2500);

    try {
      const res = await analyzeSiteContent(localSettings.scrapeUrl);
      clearInterval(interval);
      if (res) {
        addLog("✅ Migrering slutförd! Data har laddats in.", "success");
        onDataLoaded(res);
      } else {
        addLog("❌ Migreringen misslyckades. Kontrollera URL:en.", "error");
      }
    } catch (e) {
      clearInterval(interval);
      addLog("❌ Ett tekniskt fel uppstod vid kontakt med AI-motorn.", "error");
    } finally {
      setLoading(null);
    }
  };

  const runFB = async () => {
    setLoading('fb');
    addLog(`📱 Ansluter till Facebook Page: ${localSettings.facebookPageId}`, "info");
    addLog("🔑 Verifierar access token...", "step");
    
    try {
      const res = await fetchFacebookContent(localSettings.facebookPageId);
      if (res && res.length > 0) {
        addLog(`✅ Hittade ${res.length} inlägg. Uppdaterar blogg-vyn...`, "success");
        onDataLoaded({ blogPosts: res });
      } else {
        addLog("⚠️ Inga inlägg hittades. Kontrollera Page ID och behörigheter.", "error");
      }
    } catch (e) {
      addLog("❌ Fel vid hämtning från Facebook API.", "error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-8 space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">System <span className="text-primary">Admin</span></h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Migrering & API-integrationer</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Scraper Card */}
        <div className="bg-card-dark p-6 rounded-2xl border border-white/5 space-y-4 flex flex-col hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-primary">
              <span className="material-icons-outlined text-lg">auto_fix_high</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Web Scraper</span>
            </div>
          </div>
          <input 
            className="w-full bg-background-dark border border-white/10 rounded-lg p-3 text-xs focus:border-primary transition-all outline-none"
            value={localSettings.scrapeUrl}
            onChange={e => setLocalSettings({...localSettings, scrapeUrl: e.target.value})}
            placeholder="URL (WordPress)"
          />
          <button 
            disabled={!!loading}
            onClick={runScrape}
            className={`w-full py-3 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
              loading === 'scrape' ? 'bg-primary/20 text-primary animate-pulse' : 'bg-white text-black hover:bg-primary'
            }`}
          >
            {loading === 'scrape' ? 'Kör analys...' : 'Synka från Webben'}
          </button>
        </div>

        {/* Facebook Card */}
        <div className="bg-card-dark p-6 rounded-2xl border border-white/5 space-y-4 flex flex-col hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-400">
              <span className="material-icons-outlined text-lg">facebook</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Facebook Feed</span>
            </div>
          </div>
          <div className="space-y-2">
            <input 
              className="w-full bg-background-dark border border-white/10 rounded-lg p-3 text-xs focus:border-primary transition-all outline-none"
              placeholder="Page ID (t.ex. digitalaverkligheter.se)"
              value={localSettings.facebookPageId}
              onChange={e => setLocalSettings({...localSettings, facebookPageId: e.target.value})}
            />
            <input 
              type="password"
              className="w-full bg-background-dark border border-white/10 rounded-lg p-3 text-xs focus:border-primary transition-all outline-none"
              placeholder="Access Token (Klistra in här)"
              value={localSettings.facebookAccessToken}
              onChange={e => setLocalSettings({...localSettings, facebookAccessToken: e.target.value})}
            />
          </div>
          <button 
            disabled={!!loading}
            onClick={runFB}
            className={`w-full py-3 rounded-lg font-black text-[10px] uppercase tracking-widest border border-blue-400/30 text-blue-400 hover:bg-blue-400/10 transition-all ${
              loading === 'fb' ? 'animate-pulse opacity-50' : ''
            }`}
          >
            {loading === 'fb' ? 'Hämtar...' : 'Hämta Blogginlägg'}
          </button>
        </div>
      </div>

      {/* Terminal Log */}
      <div className="bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">System Log</span>
        </div>
        <div className="p-4 h-48 overflow-y-auto font-mono text-[11px] space-y-1.5 hide-scrollbar">
          {logs.length === 0 ? (
            <div className="text-slate-700 italic">Väntar på kommando...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className={`flex space-x-2 ${
                log.type === 'success' ? 'text-primary' : 
                log.type === 'error' ? 'text-red-400' : 
                log.type === 'step' ? 'text-slate-400' : 'text-slate-100'
              }`}>
                <span className="opacity-30">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                <span>{log.msg}</span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button 
          onClick={() => onSave(localSettings)} 
          className="px-12 py-4 bg-primary text-black rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          Spara inställningar
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

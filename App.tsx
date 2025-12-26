
import React, { useState, useEffect, useMemo } from 'react';
import { 
  AppState, 
  Article, 
  SAADomain, 
  Theme 
} from './types';
import { 
  AWS_SERVICES, 
  RSS_SOURCES 
} from './constants';
import { fetchMockArticles } from './services/rssService';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import { 
  Search, 
  Menu, 
  X, 
  Settings, 
  Bell, 
  RefreshCw, 
  Moon, 
  Sun, 
  Bookmark, 
  Filter,
  BrainCircuit,
  LayoutDashboard,
  Shield,
  Zap,
  CircleDollarSign,
  Layers,
  Wrench,
  BookOpen,
  BarChart3
} from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    articles: [],
    selectedDomains: [],
    selectedServices: [],
    selectedSources: [],
    searchQuery: '',
    showBookmarksOnly: false,
    isLoading: true,
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        const data = await fetchMockArticles();
        setState(prev => ({ ...prev, articles: data, isLoading: false }));
      } catch (error) {
        console.error("Failed to load articles", error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return state.articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        article.services.some(s => s.toLowerCase().includes(state.searchQuery.toLowerCase()));
      
      const matchesDomains = state.selectedDomains.length === 0 || 
        article.domains.some(d => state.selectedDomains.includes(d));

      const matchesServices = state.selectedServices.length === 0 || 
        article.services.some(s => state.selectedServices.includes(s));

      const matchesSources = state.selectedSources.length === 0 || 
        state.selectedSources.includes(article.source);

      const matchesBookmarks = !state.showBookmarksOnly || article.isBookmarked;

      return matchesSearch && matchesDomains && matchesServices && matchesSources && matchesBookmarks;
    });
  }, [state]);

  const toggleBookmark = (id: string) => {
    setState(prev => ({
      ...prev,
      articles: prev.articles.map(a => a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a)
    }));
  };

  const toggleDomain = (domain: SAADomain) => {
    setState(prev => ({
      ...prev,
      selectedDomains: prev.selectedDomains.includes(domain) 
        ? prev.selectedDomains.filter(d => d !== domain)
        : [...prev.selectedDomains, domain]
    }));
  };

  const toggleService = (service: string) => {
    setState(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const toggleSource = (sourceName: string) => {
    setState(prev => ({
      ...prev,
      selectedSources: prev.selectedSources.includes(sourceName)
        ? prev.selectedSources.filter(s => s !== sourceName)
        : [...prev.selectedSources, sourceName]
    }));
  };

  return (
    <div className={`min-h-screen ${state.isDarkMode ? 'dark' : ''}`}>
      <div className="flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
        
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-0 overflow-hidden'} transition-all duration-300 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 z-40`}>
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Layers className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">SAA Hub</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exam RSS Engine</p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            {/* Quick Links */}
            <div className="mb-8">
              <h3 className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Navigation</h3>
              <nav className="space-y-1">
                <button 
                  onClick={() => setState(prev => ({ ...prev, showBookmarksOnly: false, selectedDomains: [], selectedServices: [] }))}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${!state.showBookmarksOnly && state.selectedDomains.length === 0 ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Main Dashboard
                </button>
                <button 
                  onClick={() => setState(prev => ({ ...prev, showBookmarksOnly: true }))}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${state.showBookmarksOnly ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <Bookmark className="w-5 h-5" />
                  Bookmarked
                </button>
              </nav>
            </div>

            {/* Exam Domains */}
            <div className="mb-8">
              <h3 className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Exam Domains</h3>
              <nav className="space-y-1">
                {[
                  { domain: SAADomain.SECURE, icon: Shield },
                  { domain: SAADomain.RESILIENT, icon: Zap },
                  { domain: SAADomain.HIGH_PERFORMING, icon: BarChart3 },
                  { domain: SAADomain.COST_OPTIMIZED, icon: CircleDollarSign },
                  { domain: SAADomain.OPERATIONS, icon: Wrench },
                ].map(({ domain, icon: Icon }) => (
                  <button 
                    key={domain}
                    onClick={() => toggleDomain(domain)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${state.selectedDomains.includes(domain) ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    <Icon className={`w-4 h-4 ${state.selectedDomains.includes(domain) ? 'text-orange-500' : ''}`} />
                    <span className="truncate text-left">{domain}</span>
                  </button>
                ))}
              </nav>
            </div>

             {/* Feed Sources */}
             <div className="mb-8">
              <h3 className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Feed Sources</h3>
              <nav className="space-y-1">
                {RSS_SOURCES.map(source => (
                  <button 
                    key={source.id}
                    onClick={() => toggleSource(source.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all ${state.selectedSources.includes(source.name) ? 'text-orange-500 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${state.selectedSources.includes(source.name) ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                    {source.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Top Services */}
            <div>
              <h3 className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Hot Services</h3>
              <div className="flex flex-wrap gap-2 px-4">
                {AWS_SERVICES.slice(0, 10).map(service => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${state.selectedServices.includes(service) ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400'}`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-slate-100 dark:border-slate-800">
             <button 
                onClick={() => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
                className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                <div className="flex items-center gap-3">
                  {state.isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="text-sm font-medium">{state.isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
                <div className={`w-8 h-4 rounded-full p-1 transition-colors ${state.isDarkMode ? 'bg-orange-500' : 'bg-slate-300'}`}>
                  <div className={`w-2 h-2 rounded-full bg-white transition-transform ${state.isDarkMode ? 'translate-x-4' : ''}`} />
                </div>
              </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-6 flex-grow max-w-2xl">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search exam topics, services, or blog posts..."
                  className="w-full h-11 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 transition-all placeholder-slate-400"
                  value={state.searchQuery}
                  onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  JD
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">John Doe</p>
                  <p className="text-[10px] text-orange-500 font-bold">PRO LEARNER</p>
                </div>
              </div>
            </div>
          </header>

          {/* Feed Container */}
          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-6 h-6 text-orange-500" />
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                      {state.showBookmarksOnly ? 'Your Learning List' : 'Architectural Feed'}
                    </h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    {state.showBookmarksOnly 
                      ? `Reviewing your ${filteredArticles.length} curated exam preparation resources.` 
                      : `Scanning official AWS channels for SAA-C03 relevance. ${filteredArticles.length} updates found.`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 flex shadow-sm">
                    <button 
                      onClick={() => setState(prev => ({ ...prev, showBookmarksOnly: false }))}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!state.showBookmarksOnly ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'text-slate-500'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setState(prev => ({ ...prev, showBookmarksOnly: true }))}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${state.showBookmarksOnly ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'text-slate-500'}`}
                    >
                      Bookmarks
                    </button>
                  </div>
                </div>
              </div>

              {state.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl h-64 border border-slate-200 dark:border-slate-800 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map(article => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      onToggleBookmark={toggleBookmark}
                      onShowDetail={(a) => setSelectedArticle(a)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-6">
                    <Filter className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matches found</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                    Adjust your filters or search keywords to find relevant SAA-C03 preparation material.
                  </p>
                  <button 
                    onClick={() => setState(prev => ({ ...prev, searchQuery: '', selectedDomains: [], selectedServices: [], selectedSources: [], showBookmarksOnly: false }))}
                    className="mt-6 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.4);
        }
      `}</style>
    </div>
  );
};

export default App;


import React from 'react';
import { Article } from '../types';
import { DOMAIN_COLORS } from '../constants';
import { X, ExternalLink, BrainCircuit, Shield, Zap, CircleDollarSign, Cloud, BarChart3, Bookmark, BookmarkCheck } from 'lucide-react';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onToggleBookmark }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
          <div className="flex-grow pr-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{article.source}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{new Date(article.pubDate).toLocaleDateString()}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => onToggleBookmark(article.id)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {article.isBookmarked ? <BookmarkCheck className="w-6 h-6 text-orange-500" /> : <Bookmark className="w-6 h-6 text-slate-400" />}
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Summary */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Announcement Summary</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {article.summary}
            </p>
          </section>

          {/* Exam Insights */}
          <section className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">SAA-C03 Tutor Insights</h3>
            </div>
            <div className="text-orange-800 dark:text-orange-200/80 mb-6 text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {article.examNote}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-orange-200 dark:border-orange-800/50">
              <div>
                <h4 className="text-xs font-bold text-orange-900/50 dark:text-orange-200/40 uppercase mb-2">Affected Domains</h4>
                <div className="flex flex-wrap gap-2">
                  {article.domains.map(d => (
                    <span key={d} className={`text-[10px] px-2.5 py-1 rounded-lg border shadow-sm ${DOMAIN_COLORS[d as keyof typeof DOMAIN_COLORS] || 'bg-slate-100'}`}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-orange-900/50 dark:text-orange-200/40 uppercase mb-2">Key Exam Services</h4>
                <div className="flex flex-wrap gap-2">
                  {article.services.map(s => (
                    <span key={s} className="text-[10px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between py-4 mt-4">
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-bold">SECURITY</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-bold">PERFORMANCE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CircleDollarSign className="w-4 h-4" />
                <span className="text-[10px] font-bold">COST</span>
              </div>
            </div>
            <a 
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Read Full Article
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;

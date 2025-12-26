
import React from 'react';
import { Article, RelevanceLevel } from '../types';
import { DOMAIN_COLORS } from '../constants';
import { Bookmark, BookmarkCheck, ExternalLink, Info, BrainCircuit } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onToggleBookmark: (id: string) => void;
  onShowDetail: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onToggleBookmark, onShowDetail }) => {
  const getRelevanceColor = (level: RelevanceLevel) => {
    switch (level) {
      case RelevanceLevel.HIGH: return 'bg-red-500 text-white';
      case RelevanceLevel.MEDIUM: return 'bg-orange-400 text-white';
      case RelevanceLevel.LOW: return 'bg-slate-400 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden group">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {article.source} • {new Date(article.pubDate).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${getRelevanceColor(article.relevance)}`}>
              {article.relevance} Relevance
            </span>
            <button 
              onClick={() => onToggleBookmark(article.id)}
              className="text-slate-400 hover:text-orange-500 transition-colors"
            >
              {article.isBookmarked ? <BookmarkCheck className="w-5 h-5 text-orange-500" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors cursor-pointer" onClick={() => onShowDetail(article)}>
          {article.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {article.domains.slice(0, 2).map((domain) => (
            <span key={domain} className={`text-[10px] px-2 py-0.5 rounded-full border ${DOMAIN_COLORS[domain]}`}>
              {domain.split(' ')[0]}
            </span>
          ))}
          {article.services.slice(0, 3).map((service) => (
            <span key={service} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <button 
          onClick={() => onShowDetail(article)}
          className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          Learning Insights
        </button>
        <a 
          href={article.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;

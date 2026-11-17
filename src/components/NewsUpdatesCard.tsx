import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { NewsArticle } from '../data/worldCupData';

interface NewsUpdatesCardProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onViewAllNews: () => void;
}

export const NewsUpdatesCard: React.FC<NewsUpdatesCardProps> = ({
  articles,
  onSelectArticle,
  onViewAllNews,
}) => {
  const previewArticles = articles.slice(0, 2);

  return (
    <section className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14.5px] font-bold text-slate-900 dark:text-white tracking-tight">
          News & Updates
        </h2>
        <button
          type="button"
          onClick={onViewAllNews}
          className="inline-flex items-center gap-0.5 text-[11.5px] font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
        >
          <span>View All News</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {previewArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectArticle(article);
            }}
            className="group flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06] hover:border-[#3B82F6]/40 transition-colors cursor-pointer"
          >
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-[82px] h-[50px] rounded-lg object-cover shrink-0 ring-1 ring-white/10 group-hover:brightness-110 transition-all"
            />
            <div className="min-w-0 flex-1">
              <div
                className={`text-[9.5px] font-bold tracking-wider uppercase leading-none mb-1 ${
                  article.category === 'OFFICIAL'
                    ? 'text-[#22C55E]'
                    : article.category === 'INTERVIEW'
                      ? 'text-[#60A5FA]'
                      : 'text-amber-400'
                }`}
              >
                {article.category}
              </div>
              <h3 className="text-[12.5px] font-semibold text-slate-900 dark:text-white leading-snug truncate group-hover:text-[#60A5FA] transition-colors">
                {article.title}
              </h3>
              <div className="text-[10.5px] text-slate-400 dark:text-[#64748B] mt-0.5">
                {article.timeAgo}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

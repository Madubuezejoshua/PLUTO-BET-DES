import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import type { MatchItem, TopScorer } from '../data/worldCupData';
import { FlagIcon } from './FlagIcon';

interface RightRailProps {
  match: MatchItem;
  clockDisplay: string;
  scorers: TopScorer[];
  onViewAllLive: () => void;
  onOpenMatchCenter: (match: MatchItem) => void;
  onViewFullStats: (match: MatchItem) => void;
  onViewAllScorers: () => void;
}

const SoccerBallIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" className="w-3 h-3 shrink-0 text-slate-300" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" fill="#0F172A" />
    <polygon points="8,4.6 10.6,6.5 9.6,9.6 6.4,9.6 5.4,6.5" fill="currentColor" />
  </svg>
);

export const RightRail: React.FC<RightRailProps> = ({
  match,
  clockDisplay,
  scorers,
  onViewAllLive,
  onOpenMatchCenter,
  onViewFullStats,
  onViewAllScorers,
}) => {
  const homeGoals = match.events.filter((e) => e.team === 'home' && e.type === 'goal');
  const awayGoals = match.events.filter((e) => e.team === 'away' && e.type === 'goal');

  const statRows: { label: string; homeVal: number; awayVal: number; suffix?: string }[] = [
    {
      label: 'Possession',
      homeVal: match.stats.possession[0],
      awayVal: match.stats.possession[1],
      suffix: '%',
    },
    {
      label: 'Shots on Target',
      homeVal: match.stats.shotsOnTarget[0],
      awayVal: match.stats.shotsOnTarget[1],
    },
    {
      label: 'Total Shots',
      homeVal: match.stats.totalShots[0],
      awayVal: match.stats.totalShots[1],
    },
    {
      label: 'Corners',
      homeVal: match.stats.corners[0],
      awayVal: match.stats.corners[1],
    },
    {
      label: 'Fouls',
      homeVal: match.stats.fouls[0],
      awayVal: match.stats.fouls[1],
    },
  ];

  const topThreeScorers = scorers.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Live Match Card */}
      <section className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight">
            Live Match
          </h2>
          <button
            type="button"
            onClick={onViewAllLive}
            className="text-[11.5px] font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="text-center text-[11px] text-slate-400 dark:text-[#7A87A3] mb-3">
          {match.group} <span className="mx-1">•</span> {match.matchday}
        </div>

        {/* Scoreboard Row */}
        <div className="flex items-center justify-between gap-2 mb-3.5 px-1">
          <div className="flex flex-col items-center gap-1.5 w-[76px]">
            <FlagIcon code={match.home.code} size="lg" />
            <span className="text-[12px] font-medium text-slate-800 dark:text-slate-100 truncate max-w-full">
              {match.home.name}
            </span>
          </div>

          <div className="flex flex-col items-center">
            {match.status === 'LIVE' ? (
              <span className="px-2 py-0.5 rounded-md bg-[#E11D48] text-white text-[9.5px] font-bold tracking-wider uppercase mb-1">
                LIVE
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[9.5px] font-bold tracking-wider uppercase mb-1">
                {match.status}
              </span>
            )}
            <div className="font-display text-[24px] font-extrabold text-slate-900 dark:text-white tabular-nums leading-none">
              {match.home.score !== null ? `${match.home.score} - ${match.away.score}` : 'VS'}
            </div>
            <div className="font-mono-num text-[11px] text-slate-400 dark:text-[#8E9BB5] mt-1">
              {match.status === 'LIVE' && match.id === 'arg-bra'
                ? clockDisplay
                : match.clock || match.kickoff || 'FT'}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 w-[76px]">
            <FlagIcon code={match.away.code} size="lg" />
            <span className="text-[12px] font-medium text-slate-800 dark:text-slate-100 truncate max-w-full">
              {match.away.name}
            </span>
          </div>
        </div>

        {/* Goal Scorers Timeline */}
        {(homeGoals.length > 0 || awayGoals.length > 0) && (
          <div className="pt-2.5 pb-3 border-t border-slate-100 dark:border-white/[0.06] grid grid-cols-2 gap-2 text-[11px]">
            <div className="space-y-1.5">
              {homeGoals.map((g, i) => (
                <div key={i} className="flex items-center justify-between gap-1.5 text-slate-700 dark:text-slate-200">
                  <span className="truncate">
                    <span className="text-slate-400 dark:text-[#64748B] font-mono-num mr-1.5">
                      {g.minute}
                    </span>
                    {g.player}
                  </span>
                  <SoccerBallIcon />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              {awayGoals.map((g, i) => (
                <div key={i} className="flex items-center justify-end gap-1.5 text-slate-700 dark:text-slate-200">
                  <span className="truncate text-right">{g.player}</span>
                  <span className="text-slate-400 dark:text-[#64748B] font-mono-num shrink-0">
                    {g.minute}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenMatchCenter(match)}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#172554] to-[#282369] hover:from-[#1E3270] hover:to-[#352F8A] border border-[#4F6EF7]/30 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span>Match Center</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Match Stats Card */}
      <section className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4 shadow-sm">
        <h2 className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight mb-2.5">
          Match Stats
        </h2>

        {/* Team Code Row */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">
          <span>{match.home.code}</span>
          <span className="text-[10.5px] font-medium text-slate-400 dark:text-[#7A87A3]">
            Possession
          </span>
          <span>{match.away.code}</span>
        </div>

        {/* Stat Bars */}
        <div className="space-y-2.5">
          {statRows.map((row, idx) => {
            const total = row.homeVal + row.awayVal || 1;
            const homePct = Math.round((row.homeVal / total) * 100);
            const awayPct = 100 - homePct;

            return (
              <div key={row.label}>
                {idx > 0 && (
                  <div className="text-center text-[10.5px] font-medium text-slate-400 dark:text-[#7A87A3] mb-0.5">
                    {row.label}
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <span className="w-8 text-left text-[11.5px] font-semibold text-slate-800 dark:text-slate-100 font-mono-num shrink-0">
                    {row.homeVal}
                    {row.suffix || ''}
                  </span>

                  <div className="flex-1 h-[5px] rounded-full bg-slate-200 dark:bg-[#19223C] overflow-hidden flex gap-[2px]">
                    <div
                      className="h-full rounded-l-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] transition-all duration-300"
                      style={{ width: `${homePct}%` }}
                    />
                    <div
                      className="h-full rounded-r-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] transition-all duration-300"
                      style={{ width: `${awayPct}%` }}
                    />
                  </div>

                  <span className="w-8 text-right text-[11.5px] font-semibold text-slate-800 dark:text-slate-100 font-mono-num shrink-0">
                    {row.awayVal}
                    {row.suffix || ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onViewFullStats(match)}
          className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-white/[0.06] w-full flex items-center justify-center gap-2 text-[11.5px] font-semibold text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
        >
          <span>View Full Stats</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Top Scorers Card */}
      <section className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight">
            Top Scorers
          </h2>
          <button
            type="button"
            onClick={onViewAllScorers}
            className="text-[11.5px] font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-2">
          {topThreeScorers.map((scorer) => (
            <div
              key={scorer.rank}
              onClick={onViewAllScorers}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onViewAllScorers();
              }}
              className="flex items-center justify-between gap-2 py-1 px-1.5 -mx-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-3 text-[11px] font-semibold text-slate-400 dark:text-[#64748B] font-mono-num shrink-0">
                  {scorer.rank}
                </span>
                {scorer.avatar ? (
                  <img
                    src={scorer.avatar}
                    alt={scorer.name}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-white/15"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-[9px] font-bold text-white flex items-center justify-center shrink-0">
                    {scorer.name.slice(0, 1)}
                  </div>
                )}
                <span className="text-[12px] font-medium text-slate-800 dark:text-slate-100 truncate">
                  {scorer.name}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#8E9BB5] w-[74px]">
                  <FlagIcon code={scorer.code} size="xs" />
                  <span className="truncate">{scorer.country}</span>
                </span>
                <span className="w-4 text-right text-[12.5px] font-bold text-slate-900 dark:text-white font-mono-num">
                  {scorer.goals}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

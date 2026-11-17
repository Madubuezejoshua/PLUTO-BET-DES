import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Star, Bell } from 'lucide-react';
import type { MatchItem } from '../data/worldCupData';
import { MATCH_DATES } from '../data/worldCupData';
import { FlagIcon } from './FlagIcon';

export type MatchFilterTab = 'all' | 'live' | 'upcoming' | 'finished';

interface MatchesListCardProps {
  matches: MatchItem[];
  selectedMatchId: string;
  onSelectMatch: (matchId: string) => void;
  onOpenMatchCenter: (match: MatchItem) => void;
  favorites: Set<string>;
  onToggleFavorite: (matchId: string) => void;
  reminders: Set<string>;
  onToggleReminder: (matchId: string) => void;
  activeFilter: MatchFilterTab;
  onFilterChange: (filter: MatchFilterTab) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onViewFullSchedule: () => void;
  liveBadgeCount: number;
}

export const MatchesListCard: React.FC<MatchesListCardProps> = ({
  matches,
  selectedMatchId,
  onSelectMatch,
  onOpenMatchCenter,
  favorites,
  onToggleFavorite,
  reminders,
  onToggleReminder,
  activeFilter,
  onFilterChange,
  selectedDate,
  onDateChange,
  onViewFullSchedule,
  liveBadgeCount,
}) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setDateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredMatches = matches.filter((m) => {
    if (selectedDate !== 'All Dates' && m.date !== selectedDate) return false;
    if (activeFilter === 'live') return m.status === 'LIVE' || m.status === 'HT';
    if (activeFilter === 'upcoming') return m.status === 'UPCOMING';
    if (activeFilter === 'finished') return m.status === 'FT';
    return true;
  });

  const displayMatches =
    activeFilter === 'all' && selectedDate === 'June 12, 2026'
      ? filteredMatches.slice(0, 5)
      : filteredMatches;

  return (
    <section className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4 shadow-sm">
      {/* Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#5658F5] text-white shadow-[0_2px_10px_rgba(86,88,245,0.4)]'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
            }`}
          >
            All Matches
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('live')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
              activeFilter === 'live'
                ? 'bg-[#5658F5] text-white shadow-[0_2px_10px_rgba(86,88,245,0.4)]'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
            }`}
          >
            Live ({liveBadgeCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('upcoming')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'upcoming'
                ? 'bg-[#5658F5] text-white shadow-[0_2px_10px_rgba(86,88,245,0.4)]'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('finished')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'finished'
                ? 'bg-[#5658F5] text-white shadow-[0_2px_10px_rgba(86,88,245,0.4)]'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
            }`}
          >
            Finished
          </button>
        </div>

        {/* Date Selector */}
        <div ref={dateRef} className="relative">
          <button
            type="button"
            onClick={() => setDateDropdownOpen((o) => !o)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#141B31] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedDate}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dateDropdownOpen && (
            <div className="absolute right-0 top-10 w-44 rounded-xl bg-white dark:bg-[#131A30] border border-slate-200 dark:border-[#243052] shadow-xl p-1 z-30">
              {MATCH_DATES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    onDateChange(d);
                    setDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDate === d
                      ? 'bg-[#5658F5]/20 text-[#60A5FA]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Matches Rows */}
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
        {displayMatches.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
            No matches scheduled for this filter and date.
          </div>
        ) : (
          displayMatches.map((match) => {
            const isSelected = match.id === selectedMatchId;
            const isFav = favorites.has(match.id);
            const hasReminder = reminders.has(match.id);
            const isLive = match.status === 'LIVE';
            const isHT = match.status === 'HT';
            const isUpcoming = match.status === 'UPCOMING';

            return (
              <div
                key={match.id}
                onClick={() => onSelectMatch(match.id)}
                onDoubleClick={() => onOpenMatchCenter(match)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectMatch(match.id);
                  }
                }}
                className={`group flex items-center justify-between gap-3 px-2.5 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-white/[0.04]'
                    : 'hover:bg-slate-50 dark:hover:bg-white/[0.025]'
                }`}
              >
                {/* Left Status + Group */}
                <div className="w-[82px] sm:w-[96px] shrink-0">
                  <div className="flex items-center gap-2 text-[11.5px] font-semibold leading-tight">
                    {isLive && (
                      <>
                        <span className="text-[#EF4444] tracking-wide">LIVE</span>
                        <span className="text-[#22C55E] font-mono-num">{match.minute}</span>
                      </>
                    )}
                    {isHT && <span className="text-[#F87171]">HT</span>}
                    {isUpcoming && (
                      <span className="text-slate-700 dark:text-slate-300 font-mono-num">
                        {match.kickoff}
                      </span>
                    )}
                    {match.status === 'FT' && (
                      <span className="text-slate-500 dark:text-slate-400">FT</span>
                    )}
                  </div>
                  <div className="text-[10.5px] text-slate-400 dark:text-[#64748B] mt-0.5">
                    {match.group}
                  </div>
                </div>

                {/* Center Teams & Score */}
                <div className="flex-1 flex items-center justify-center gap-2.5 sm:gap-3.5 min-w-0">
                  {/* Home */}
                  <div className="flex-1 flex items-center justify-end gap-2.5 min-w-0">
                    <span className="text-[13px] font-medium text-slate-800 dark:text-slate-100 truncate">
                      {match.home.name}
                    </span>
                    <FlagIcon code={match.home.code} size="md" />
                  </div>

                  {/* Center Score / VS */}
                  <div className="w-[74px] text-center shrink-0">
                    {match.home.score !== null && match.away.score !== null ? (
                      <div className="font-display text-[17px] font-bold tabular-nums leading-tight">
                        <span
                          className={
                            isHT
                              ? 'text-slate-400 dark:text-slate-400'
                              : 'text-[#60A5FA]'
                          }
                        >
                          {match.home.score}
                        </span>
                        <span className="mx-1.5 text-slate-400 dark:text-slate-500">-</span>
                        <span
                          className={
                            isHT
                              ? 'text-slate-400 dark:text-slate-400'
                              : 'text-[#F5B731]'
                          }
                        >
                          {match.away.score}
                        </span>
                      </div>
                    ) : (
                      <div className="text-[12px] font-semibold text-slate-400 dark:text-slate-400 leading-tight">
                        VS
                      </div>
                    )}
                    <div className="text-[9.5px] text-slate-400 dark:text-[#64748B] mt-0.5">
                      {match.stage}
                    </div>
                  </div>

                  {/* Away */}
                  <div className="flex-1 flex items-center justify-start gap-2.5 min-w-0">
                    <FlagIcon code={match.away.code} size="md" />
                    <span className="text-[13px] font-medium text-slate-800 dark:text-slate-100 truncate">
                      {match.away.name}
                    </span>
                  </div>
                </div>

                {/* Right Action (Star or Bell) */}
                <div className="w-8 flex items-center justify-end shrink-0">
                  {isUpcoming ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleReminder(match.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        hasReminder
                          ? 'text-[#60A5FA] bg-[#3B82F6]/15'
                          : 'text-slate-400 dark:text-[#64748B] hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                      aria-label={hasReminder ? 'Remove match reminder' : 'Set match reminder'}
                      title={hasReminder ? 'Reminder active' : 'Remind me'}
                    >
                      <Bell className={`w-4 h-4 ${hasReminder ? 'fill-current' : ''}`} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(match.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isFav
                          ? 'text-[#F5B731] bg-amber-500/15'
                          : 'text-slate-400 dark:text-[#64748B] hover:text-amber-400'
                      }`}
                      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      title={isFav ? 'Favorited' : 'Favorite match'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer CTA */}
      <button
        type="button"
        onClick={onViewFullSchedule}
        className="mt-3 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#141B31] hover:bg-slate-200 dark:hover:bg-[#1B2440] border border-slate-200 dark:border-white/10 text-[12px] font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
        <span>View Full Schedule</span>
      </button>
    </section>
  );
};

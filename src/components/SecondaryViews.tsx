import React from 'react';
import {
  ArrowLeft,
  Star,
  Bell,
  Trophy,
  Award,
  Check,
  Shield,
  BarChart3,
} from 'lucide-react';
import type {
  MatchItem,
  GroupStanding,
  TopScorer,
  NewsArticle,
  TeamInfo,
} from '../data/worldCupData';
import type { NavSection } from './Sidebar';
import { FlagIcon } from './FlagIcon';

interface SecondaryViewsProps {
  section: Exclude<NavSection, 'home'>;
  matches: MatchItem[];
  groups: GroupStanding[];
  scorers: TopScorer[];
  articles: NewsArticle[];
  teams: TeamInfo[];
  favorites: Set<string>;
  reminders: Set<string>;
  focusedGroupId: string | null;
  isDark: boolean;
  liveSimulation: boolean;
  onToggleLiveSimulation: () => void;
  onToggleTheme: () => void;
  onBackHome: () => void;
  onSelectMatch: (matchId: string) => void;
  onOpenMatchCenter: (match: MatchItem) => void;
  onToggleFavorite: (matchId: string) => void;
  onToggleReminder: (matchId: string) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const SecondaryViews: React.FC<SecondaryViewsProps> = ({
  section,
  matches,
  groups,
  scorers,
  articles,
  teams,
  favorites,
  reminders,
  focusedGroupId,
  isDark,
  liveSimulation,
  onToggleLiveSimulation,
  onToggleTheme,
  onBackHome,
  onOpenMatchCenter,
  onToggleFavorite,
  onToggleReminder,
  onSelectArticle,
}) => {
  const sectionTitles: Record<Exclude<NavSection, 'home'>, string> = {
    live: 'Live Matches',
    upcoming: 'Upcoming Fixtures',
    worldcup: 'World Cup 2026 Hub',
    groups: 'Group Standings',
    teams: 'Qualified Nations',
    players: 'Featured Players',
    scorers: 'Golden Boot Race',
    news: 'Tournament News & Updates',
    stats: 'Tournament Analytics',
    favorites: 'Your Saved Favorites',
    settings: 'Dashboard Settings',
  };

  const renderHeader = () => (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#141B31] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1B2440] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>
        <h1 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {sectionTitles[section]}
        </h1>
      </div>
    </div>
  );

  if (section === 'live' || section === 'upcoming' || section === 'favorites') {
    const list =
      section === 'live'
        ? matches.filter((m) => m.status === 'LIVE' || m.status === 'HT')
        : section === 'upcoming'
          ? matches.filter((m) => m.status === 'UPCOMING')
          : matches.filter((m) => favorites.has(m.id));

    return (
      <div>
        {renderHeader()}
        {list.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-10 text-center">
            <Star className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              No matches in this view yet
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Star any fixture from the match feed to track it here.
            </p>
            <button
              type="button"
              onClick={onBackHome}
              className="px-4 py-2 rounded-xl bg-[#5658F5] text-white text-xs font-semibold cursor-pointer"
            >
              Browse All Matches
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {list.map((m) => {
              const isFav = favorites.has(m.id);
              const isRem = reminders.has(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => onOpenMatchCenter(m)}
                  className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] hover:border-[#3B82F6]/50 p-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {m.group} · {m.venue}
                    </span>
                    <span
                      className={`font-bold font-mono-num ${
                        m.status === 'LIVE'
                          ? 'text-[#EF4444]'
                          : m.status === 'HT'
                            ? 'text-amber-400'
                            : 'text-[#60A5FA]'
                      }`}
                    >
                      {m.status === 'LIVE' ? `LIVE ${m.minute}` : m.kickoff || m.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-1">
                      <FlagIcon code={m.home.code} size="md" />
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">
                        {m.home.name}
                      </span>
                    </div>
                    <div className="font-display text-xl font-extrabold tabular-nums px-3">
                      {m.home.score !== null ? `${m.home.score} - ${m.away.score}` : 'VS'}
                    </div>
                    <div className="flex items-center justify-end gap-2.5 flex-1">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">
                        {m.away.name}
                      </span>
                      <FlagIcon code={m.away.code} size="md" />
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{m.date}</span>
                    <div className="flex items-center gap-2">
                      {m.status === 'UPCOMING' ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleReminder(m.id);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-pointer ${
                            isRem
                              ? 'bg-blue-500/15 text-[#60A5FA]'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300'
                          }`}
                        >
                          <Bell className="w-3 h-3" />
                          <span>{isRem ? 'Alert Set' : 'Remind Me'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(m.id);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-pointer ${
                            isFav
                              ? 'bg-amber-500/15 text-[#F5B731]'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300'
                          }`}
                        >
                          <Star className={`w-3 h-3 ${isFav ? 'fill-current' : ''}`} />
                          <span>{isFav ? 'Saved' : 'Save'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (section === 'groups' || section === 'worldcup') {
    return (
      <div>
        {renderHeader()}
        {section === 'worldcup' && (
          <div className="mb-5 rounded-2xl p-5 bg-gradient-to-r from-[#2A091B] via-[#1C0F36] to-[#0E1842] border border-white/10 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#F0B429]" />
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider uppercase text-[#F0B429]">
                  Tournament Center · June 11 – July 19, 2026
                </div>
                <div className="font-display text-lg font-bold">
                  FIFA World Cup 2026 — Group Stage Standings
                </div>
              </div>
            </div>
            <span className="text-xs font-mono-num text-slate-300">
              Matchday 2 Active · North America
            </span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groups.map((g) => (
            <div
              key={g.id}
              className={`rounded-2xl bg-white dark:bg-[#0F1426] border p-4 ${
                focusedGroupId === g.id
                  ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/30'
                  : 'border-slate-200 dark:border-[#1D253E]'
              }`}
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{g.name}</h3>
                <div className="grid grid-cols-5 gap-3 text-[10px] font-semibold text-slate-400 text-right">
                  <span>P</span>
                  <span>W</span>
                  <span>D</span>
                  <span>GD</span>
                  <span>PTS</span>
                </div>
              </div>
              <div className="space-y-2">
                {g.rows.map((r) => (
                  <div
                    key={r.code}
                    className="flex items-center justify-between text-xs py-1"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-4 font-mono-num text-slate-400">{r.pos}</span>
                      <FlagIcon code={r.code} size="xs" />
                      <span className="font-medium text-slate-800 dark:text-slate-100 truncate">
                        {r.team}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-3 text-right font-mono-num">
                      <span className="text-slate-500 dark:text-slate-400">{r.played}</span>
                      <span className="text-slate-500 dark:text-slate-400">{r.won}</span>
                      <span className="text-slate-500 dark:text-slate-400">{r.drawn}</span>
                      <span className="text-slate-500 dark:text-slate-400">{r.gd}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{r.pts}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'teams') {
    return (
      <div>
        {renderHeader()}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {teams.map((t) => (
            <div
              key={t.code}
              className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FlagIcon code={t.code} size="lg" />
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {t.group} · FIFA Rank #{t.fifaRank}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-num text-xs font-bold text-[#60A5FA]">
                    {t.squadValue}
                  </div>
                  <div className="text-[10px] text-slate-400">{t.titles} Titles</div>
                </div>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 border-t border-slate-100 dark:border-white/[0.06] pt-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Head Coach</span>
                  <span className="font-medium">{t.coach}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Captain</span>
                  <span className="font-medium">{t.captain}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400">Recent Form</span>
                  <div className="flex items-center gap-1">
                    {t.form.map((f, idx) => (
                      <span
                        key={idx}
                        className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${
                          f === 'W'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : f === 'D'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'scorers' || section === 'players') {
    return (
      <div>
        {renderHeader()}
        <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Award className="w-4 h-4 text-[#F5B731]" />
              <span>Golden Boot Leaderboard</span>
            </div>
            <span className="text-xs text-slate-400">World Cup 2026</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
            {scorers.map((s) => (
              <div
                key={s.rank}
                className="px-5 py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-5 font-mono-num font-bold text-slate-400">{s.rank}</span>
                  {s.avatar ? (
                    <img
                      src={s.avatar}
                      alt={s.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-white/15"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center">
                      {s.name[0]}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {s.name}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <FlagIcon code={s.code} size="xs" />
                      <span>{s.country}</span>
                      <span>·</span>
                      <span>{s.club}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono-num shrink-0">
                  <div className="text-center">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {s.goals}
                    </div>
                    <div className="text-[10px] text-slate-400">Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-700 dark:text-slate-200">
                      {s.assists}
                    </div>
                    <div className="text-[10px] text-slate-400">Assists</div>
                  </div>
                  <div className="text-center hidden sm:block">
                    <div className="font-semibold text-slate-700 dark:text-slate-200">
                      {s.minutes}'
                    </div>
                    <div className="text-[10px] text-slate-400">Mins</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section === 'news') {
    return (
      <div>
        {renderHeader()}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((a) => (
            <div
              key={a.id}
              onClick={() => onSelectArticle(a)}
              className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] hover:border-[#3B82F6]/50 overflow-hidden cursor-pointer transition-colors flex flex-col"
            >
              <img
                src={a.image}
                alt={a.title}
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-[#60A5FA] mb-1">
                    {a.category} · {a.timeAgo}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {a.summary}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-[11px] font-semibold text-[#60A5FA]">
                  Read Full Story →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'stats') {
    return (
      <div>
        {renderHeader()}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <BarChart3 className="w-4 h-4 text-[#60A5FA]" />
              <span>Goals Per Match</span>
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white font-mono-num">
              2.84
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">+0.21 vs 2022 average</div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Shield className="w-4 h-4 text-[#F5B731]" />
              <span>Top Possession Avg</span>
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white font-mono-num">
              Spain · 64%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">89% pass completion</div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>Highest xG Match</span>
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white font-mono-num">
              4.02 xG
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Argentina 2 - 2 Brazil</div>
          </div>
        </div>
        <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-5">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
            Live Match Analytics Comparison
          </h3>
          <div className="space-y-3">
            {matches
              .filter((m) => m.status !== 'UPCOMING')
              .slice(0, 5)
              .map((m) => (
                <div
                  key={m.id}
                  onClick={() => onOpenMatchCenter(m)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06] cursor-pointer hover:border-[#3B82F6]/40 text-xs"
                >
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <FlagIcon code={m.home.code} size="xs" />
                    <span>{m.home.name}</span>
                    <span className="font-mono-num text-[#60A5FA]">
                      {m.home.score} - {m.away.score}
                    </span>
                    <FlagIcon code={m.away.code} size="xs" />
                    <span>{m.away.name}</span>
                  </div>
                  <div className="font-mono-num text-slate-500 dark:text-slate-300">
                    xG {m.stats.xG[0].toFixed(2)} – {m.stats.xG[1].toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderHeader()}
      <div className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-5 space-y-4 max-w-xl">
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white">
              Appearance Theme
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Switch between Score90X Midnight Dark and Daylight Light themes
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-3.5 py-1.5 rounded-xl bg-[#5658F5] text-white text-xs font-semibold cursor-pointer"
          >
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white">
              Live Match Clock Ticker
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Real-time second counter on active World Cup fixtures
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleLiveSimulation}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
              liveSimulation
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
            }`}
          >
            {liveSimulation && <Check className="w-3.5 h-3.5" />}
            <span>{liveSimulation ? 'Enabled' : 'Paused'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

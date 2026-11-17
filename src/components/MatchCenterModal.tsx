import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Radio, Shield, Users, Trophy } from 'lucide-react';
import type { MatchItem, NewsArticle } from '../data/worldCupData';
import { FlagIcon } from './FlagIcon';

interface MatchCenterModalProps {
  match: MatchItem | null;
  clockDisplay: string;
  initialMode: 'live' | 'stats' | 'center';
  onClose: () => void;
}

export const MatchCenterModal: React.FC<MatchCenterModalProps> = ({
  match,
  clockDisplay,
  initialMode,
  onClose,
}) => {
  const [tab, setTab] = React.useState<'center' | 'stats' | 'lineups'>(
    initialMode === 'stats' ? 'stats' : 'center'
  );

  useEffect(() => {
    setTab(initialMode === 'stats' ? 'stats' : 'center');
  }, [initialMode, match?.id]);

  useEffect(() => {
    if (!match) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [match, onClose]);

  if (!match) return null;

  const isFeaturedLive = match.id === 'arg-bra' && match.status === 'LIVE';
  const statPairs: { label: string; home: number; away: number; suffix?: string }[] = [
    { label: 'Possession', home: match.stats.possession[0], away: match.stats.possession[1], suffix: '%' },
    { label: 'Expected Goals (xG)', home: match.stats.xG[0], away: match.stats.xG[1] },
    { label: 'Shots on Target', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1] },
    { label: 'Total Shots', home: match.stats.totalShots[0], away: match.stats.totalShots[1] },
    { label: 'Total Passes', home: match.stats.passes[0], away: match.stats.passes[1] },
    { label: 'Pass Accuracy', home: match.stats.passAccuracy[0], away: match.stats.passAccuracy[1], suffix: '%' },
    { label: 'Corners', home: match.stats.corners[0], away: match.stats.corners[1] },
    { label: 'Fouls', home: match.stats.fouls[0], away: match.stats.fouls[1] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#243052] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#13192D]">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">{match.stage}</span>
            <span>·</span>
            <span>{match.group}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#60A5FA]" />
              {match.venue}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Match Center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scoreboard Banner */}
        <div
          className="px-6 py-5 text-white relative overflow-hidden"
          style={{
            background:
              'linear-gradient(105deg, #071A5A 0%, #141B52 50%, #37115B 100%)',
          }}
        >
          {initialMode === 'live' && (
            <div className="mb-3 flex items-center justify-between rounded-xl bg-black/35 border border-white/10 px-3.5 py-2 text-xs">
              <span className="flex items-center gap-2 font-semibold text-white">
                <Radio className="w-3.5 h-3.5 text-[#EF4444]" />
                <span>Live Broadcast Stream · Multi-Angle 4K Feed Active</span>
              </span>
              <span className="font-mono-num text-[11px] text-emerald-400 font-semibold">
                60 FPS · HD
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex flex-col items-center text-center gap-2">
              <FlagIcon code={match.home.code} size="lg" />
              <div className="font-display text-lg font-bold">{match.home.name}</div>
            </div>

            <div className="flex flex-col items-center">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-2 ${
                  match.status === 'LIVE'
                    ? 'bg-[#E11D48] text-white'
                    : 'bg-white/15 text-slate-200'
                }`}
              >
                {match.status}
              </span>
              <div className="font-display text-4xl font-extrabold tabular-nums">
                {match.home.score !== null ? (
                  <>
                    <span className="text-[#60A5FA]">{match.home.score}</span>
                    <span className="mx-2 text-slate-400">-</span>
                    <span className="text-[#F5B731]">{match.away.score}</span>
                  </>
                ) : (
                  <span className="text-2xl text-slate-200">VS</span>
                )}
              </div>
              <div className="font-mono-num text-xs text-slate-300 mt-1">
                {isFeaturedLive ? clockDisplay : match.clock || match.kickoff || 'FT'}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center text-center gap-2">
              <FlagIcon code={match.away.code} size="lg" />
              <div className="font-display text-lg font-bold">{match.away.name}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200 dark:border-white/10">
          {(['center', 'stats', 'lineups'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors capitalize cursor-pointer ${
                tab === t
                  ? 'border-[#3B82F6] text-[#3B82F6] dark:text-[#60A5FA]'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {t === 'center' ? 'Key Events' : t === 'stats' ? 'Full Statistics' : 'Formations'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 max-h-[340px] overflow-y-auto">
          {tab === 'center' && (
            <div className="space-y-2.5">
              {match.events.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  Match has not kicked off yet. Scheduled for {match.date} at {match.kickoff}.
                </div>
              ) : (
                match.events.map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono-num font-bold text-[#60A5FA] w-8">
                        {ev.minute}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {ev.player}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        ev.type === 'goal' ? 'text-emerald-500' : 'text-amber-400'
                      }`}
                    >
                      {ev.type === 'goal' ? 'Goal' : 'Yellow Card'} ·{' '}
                      {ev.team === 'home' ? match.home.code : match.away.code}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === 'stats' && (
            <div className="space-y-3">
              {statPairs.map((s) => {
                const total = s.home + s.away || 1;
                const hPct = Math.round((s.home / total) * 100);
                const aPct = 100 - hPct;
                return (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono-num font-bold text-slate-900 dark:text-white">
                        {s.home}
                        {s.suffix || ''}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {s.label}
                      </span>
                      <span className="font-mono-num font-bold text-slate-900 dark:text-white">
                        {s.away}
                        {s.suffix || ''}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-[#19223C] overflow-hidden flex gap-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1]"
                        style={{ width: `${hPct}%` }}
                      />
                      <div
                        className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
                        style={{ width: `${aPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'lineups' && (
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06]">
                <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center justify-between">
                  <span>{match.home.name}</span>
                  <span className="font-mono-num text-[#60A5FA]">4-3-3</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Tactical setup focused on high-line pressing and central overloads through the half-spaces.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06]">
                <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center justify-between">
                  <span>{match.away.name}</span>
                  <span className="font-mono-num text-[#F5B731]">4-2-3-1</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Double pivot anchoring counter-transitions with wide inverted wingers attacking space.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#243052] shadow-2xl overflow-hidden">
        <div className="relative h-48 w-full">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <div className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 mb-1">
              {article.category} · {article.timeAgo}
            </div>
            <h3 className="font-display text-lg font-bold text-white leading-snug">
              {article.title}
            </h3>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            By {article.author}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {article.body}
          </p>
        </div>
      </div>
    </div>
  );
};

interface TournamentModalProps {
  open: boolean;
  onClose: () => void;
  onGoToGroups: () => void;
}

export const TournamentModal: React.FC<TournamentModalProps> = ({
  open,
  onClose,
  onGoToGroups,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#243052] shadow-2xl overflow-hidden">
        <div className="relative p-6 bg-gradient-to-r from-[#2A091B] via-[#1C0F36] to-[#0E1842] text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-[#F0B429]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#F0B429]">
              FIFA World Cup 2026
            </span>
          </div>
          <h3 className="font-display text-2xl font-extrabold">
            USA · Canada · Mexico
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            June 11 – July 19, 2026 · 48 National Teams · 16 Host Cities
          </p>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06]">
              <Calendar className="w-4 h-4 text-[#60A5FA] mx-auto mb-1" />
              <div className="font-display text-lg font-bold text-slate-900 dark:text-white font-mono-num">
                104
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Matches</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06]">
              <Users className="w-4 h-4 text-[#F5B731] mx-auto mb-1" />
              <div className="font-display text-lg font-bold text-slate-900 dark:text-white font-mono-num">
                48
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Nations</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06]">
              <Shield className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="font-display text-lg font-bold text-slate-900 dark:text-white font-mono-num">
                12
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Groups</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The 23rd FIFA World Cup brings the expanded 48-team format across North America, introducing a 32-team knockout bracket leading to the Championship Final at MetLife Stadium.
          </p>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToGroups();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3178F6] to-[#5649F5] text-white text-xs font-semibold hover:brightness-110 transition-all cursor-pointer"
          >
            Explore Group Standings
          </button>
        </div>
      </div>
    </div>
  );
};

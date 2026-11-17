import React from 'react';
import { Play, ChevronRight } from 'lucide-react';
import type { MatchItem } from '../data/worldCupData';

interface HeroMatchBannerProps {
  match: MatchItem;
  clockDisplay: string;
  onWatchLive: (match: MatchItem) => void;
}

export const HeroMatchBanner: React.FC<HeroMatchBannerProps> = ({
  match,
  clockDisplay,
  onWatchLive,
}) => {
  const homeGoals = match.events.filter((e) => e.team === 'home' && e.type === 'goal');
  const awayGoals = match.events.filter((e) => e.team === 'away' && e.type === 'goal');

  return (
    <section
      className="relative rounded-2xl overflow-hidden border border-slate-200/20 dark:border-white/10 shadow-[0_12px_32px_rgba(4,9,26,0.45)] min-h-[246px] flex items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 22% 55%, rgba(20, 74, 195, 0.72) 0%, rgba(12, 23, 74, 0.92) 45%, rgba(7, 13, 38, 1) 100%), linear-gradient(105deg, #061A5C 0%, #101A58 48%, #34115C 100%)',
      }}
    >
      {/* Ambient right purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 82% 45%, rgba(139, 44, 198, 0.42) 0%, rgba(56, 18, 102, 0.12) 48%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Left Player: Messi */}
      <div className="hidden sm:block absolute left-0 bottom-0 top-0 w-[235px] md:w-[258px] pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/crops/messi_hero.png"
          alt="Lionel Messi"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-10"
          style={{
            background: 'linear-gradient(to top, rgba(7, 14, 42, 0.85), transparent)',
          }}
        />
      </div>

      {/* Right Player: Neymar */}
      <div className="hidden sm:block absolute right-0 bottom-0 top-0 w-[215px] md:w-[238px] pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/crops/neymar_hero.png"
          alt="Neymar Jr."
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-10"
          style={{
            background: 'linear-gradient(to top, rgba(14, 11, 41, 0.85), transparent)',
          }}
        />
      </div>

      {/* LIVE NOW Badge */}
      <div className="absolute top-3.5 left-4 z-20">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E11D48] text-white text-[10.5px] font-bold tracking-wider uppercase shadow-[0_2px_10px_rgba(225,29,72,0.5)]">
          LIVE NOW
        </span>
      </div>

      {/* Center Match Scoreboard Stack */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-4 w-full max-w-[420px]">
        <div className="text-[11.5px] font-medium text-slate-300/90 tracking-wide mb-1">
          {match.stage} <span className="mx-1.5 text-slate-400">•</span> {match.group}
        </div>

        <h1 className="font-display text-[28px] sm:text-[31px] font-bold text-white leading-[1.08] tracking-tight">
          {match.home.name}
        </h1>

        <div className="my-1.5 inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/25 bg-[#0C1538]/70 text-[10px] font-bold text-slate-200 tracking-wider">
          VS
        </div>

        <div className="font-display text-[28px] sm:text-[31px] font-bold text-white leading-[1.08] tracking-tight mb-3">
          {match.away.name}
        </div>

        {/* Score + Clock Box */}
        <div className="flex items-center justify-center gap-4 mb-2.5">
          <span className="font-display text-[32px] font-extrabold text-[#60A5FA] tabular-nums leading-none drop-shadow">
            {match.home.score}
          </span>

          <div className="px-4 py-1.5 rounded-xl bg-[#090F26]/90 border border-white/15 shadow-inner min-w-[84px]">
            <div className="font-mono-num text-[14px] font-bold text-white leading-tight">
              {clockDisplay}
            </div>
            <div className="text-[9.5px] font-medium text-slate-400 leading-tight mt-0.5">
              {match.halfLabel || '2nd Half'}
            </div>
          </div>

          <span className="font-display text-[32px] font-extrabold text-[#F5B731] tabular-nums leading-none drop-shadow">
            {match.away.score}
          </span>
        </div>

        {/* Scorers + Watch Live CTA */}
        <div className="w-full flex items-end justify-between gap-2 mt-0.5">
          <div className="text-left text-[10.5px] leading-snug text-slate-300/95 min-w-[92px]">
            {homeGoals.map((g, idx) => (
              <div key={idx} className="truncate tabular-nums">
                <span className="text-slate-400 mr-1.5">{g.minute}</span>
                <span className="font-medium text-slate-100">
                  {g.player.replace('L. ', '').replace('J. ', '')}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onWatchLive(match)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B5CF6] to-[#3B82F6] hover:brightness-110 active:scale-[0.98] text-white text-[12px] font-semibold shadow-[0_4px_18px_rgba(79,92,246,0.5)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white/25" />
            <span>Watch Live</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="text-right text-[10.5px] leading-snug text-slate-300/95 min-w-[92px]">
            {awayGoals.map((g, idx) => (
              <div key={idx} className="truncate tabular-nums">
                <span className="text-slate-400 mr-1.5">{g.minute}</span>
                <span className="font-medium text-slate-100">{g.player}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

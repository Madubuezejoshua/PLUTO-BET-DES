import React from 'react';
import {
  Home,
  Radio,
  Calendar,
  Trophy,
  LayoutGrid,
  Shield,
  Users,
  Award,
  Newspaper,
  BarChart3,
  Star,
  Settings,
  ArrowRight,
  X,
} from 'lucide-react';

export type NavSection =
  | 'home'
  | 'live'
  | 'upcoming'
  | 'worldcup'
  | 'groups'
  | 'teams'
  | 'players'
  | 'scorers'
  | 'news'
  | 'stats'
  | 'favorites'
  | 'settings';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  liveCount: number;
  favoritesCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenTournamentDetails: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  liveCount,
  favoritesCount,
  mobileOpen,
  onCloseMobile,
  onOpenTournamentDetails,
}) => {
  const navItems: {
    id: NavSection;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string | number;
    badgeType?: 'red' | 'purple' | 'muted';
    iconColor?: string;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'live', label: 'Live Matches', icon: Radio, badge: liveCount, badgeType: 'red' },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    {
      id: 'worldcup',
      label: 'World Cup 2026',
      icon: Trophy,
      badge: 'HOT',
      badgeType: 'purple',
      iconColor: 'text-amber-400',
    },
    { id: 'groups', label: 'Groups', icon: LayoutGrid },
    { id: 'teams', label: 'Teams', icon: Shield },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'scorers', label: 'Top Scorers', icon: Award },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: Star,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
      badgeType: 'muted',
    },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const content = (
    <aside className="flex flex-col justify-between h-full w-[216px] bg-white dark:bg-[#0B0F1E] border-r border-slate-200 dark:border-[#1A2138] select-none shrink-0">
      <div className="px-3.5 pt-4 pb-2 flex-1 overflow-y-auto">
        {/* Brand Logo */}
        <div className="flex items-center justify-between px-2 mb-5">
          <button
            type="button"
            onClick={() => onSelectSection('home')}
            className="text-left group focus:outline-none"
          >
            <div className="font-display text-[22px] font-extrabold leading-none tracking-tight flex items-center">
              <span className="text-slate-900 dark:text-white">Score</span>
              <span className="bg-gradient-to-r from-[#5EA2FF] via-[#7B7BFF] to-[#9B6CFF] bg-clip-text text-transparent">
                90X
              </span>
            </div>
            <div className="mt-1 text-[9.5px] font-semibold tracking-[0.22em] text-slate-400 dark:text-slate-400 uppercase">
              WORLD CUP 2026
            </div>
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-0.5" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectSection(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3178F6] to-[#5649F5] text-white shadow-[0_4px_16px_rgba(62,102,245,0.35)]'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-white'
                        : item.iconColor
                          ? item.iconColor
                          : 'text-slate-400 dark:text-[#7A87A3]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </span>

                {item.badge !== undefined && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold leading-none tabular-nums shrink-0 ${
                      item.badgeType === 'red'
                        ? 'bg-[#EF4444] text-white'
                        : item.badgeType === 'purple'
                          ? 'bg-[#6D28D9] text-[#E9D5FF]'
                          : isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card */}
      <div className="p-3.5 pt-2 shrink-0">
        <div
          onClick={onOpenTournamentDetails}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onOpenTournamentDetails();
          }}
          className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-[#1B0714] cursor-pointer group shadow-lg"
        >
          <div className="relative h-[160px] w-full overflow-hidden">
            <img
              src="/assets/crops/trophy_bg.png"
              alt="FIFA World Cup 2026 Trophy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-right transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(22,6,18,0.96) 0%, rgba(22,6,18,0.82) 52%, rgba(22,6,18,0.12) 100%)',
              }}
            />
            <div className="absolute inset-0 p-3 flex flex-col justify-center">
              <span className="text-[9.5px] font-bold tracking-wider text-slate-200 uppercase leading-tight">
                FIFA WORLD CUP
              </span>
              <span className="font-display text-[32px] font-extrabold text-[#F0B429] leading-none tracking-tight my-0.5">
                2026
              </span>
              <span className="text-[9.5px] font-semibold text-white/90 tracking-wide mt-1">
                11 JUNE - 19 JULY
              </span>
              <span className="text-[7.5px] font-medium text-slate-300/80 tracking-wider mt-0.5">
                USA • CANADA • MEXICO
              </span>
            </div>
          </div>

          <div className="p-2.5 bg-[#0D1224]/95 border-t border-white/10">
            <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#141C33] group-hover:bg-[#1C2747] border border-white/10 text-[11.5px] font-semibold text-white transition-colors">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">{content}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">{content}</div>
        </div>
      )}
    </>
  );
};

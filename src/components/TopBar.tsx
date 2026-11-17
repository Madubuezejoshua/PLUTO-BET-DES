import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  Radio,
  User,
  Settings,
  Star,
} from 'lucide-react';
import type { NavSection } from './Sidebar';
import type { MatchItem, TeamInfo, TopScorer } from '../data/worldCupData';
import { FlagIcon } from './FlagIcon';

export type TopTab = 'overview' | 'matches' | 'teams' | 'groups' | 'stats' | 'news';

interface TopBarProps {
  activeTab: TopTab;
  onSelectTab: (tab: TopTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  matches: MatchItem[];
  teams: TeamInfo[];
  scorers: TopScorer[];
  onSelectMatch: (matchId: string) => void;
  onNavigateSection: (section: NavSection) => void;
}

const TABS: { id: TopTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'matches', label: 'Matches' },
  { id: 'teams', label: 'Teams' },
  { id: 'groups', label: 'Groups' },
  { id: 'stats', label: 'Stats' },
  { id: 'news', label: 'News' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  onOpenMobileMenu,
  matches,
  teams,
  scorers,
  onSelectMatch,
  onNavigateSection,
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const matchedMatches = q
    ? matches
        .filter(
          (m) =>
            m.home.name.toLowerCase().includes(q) ||
            m.away.name.toLowerCase().includes(q) ||
            m.group.toLowerCase().includes(q)
        )
        .slice(0, 4)
    : [];
  const matchedTeams = q
    ? teams.filter((t) => t.name.toLowerCase().includes(q) || t.group.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const matchedPlayers = q
    ? scorers
        .filter((s) => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q))
        .slice(0, 3)
    : [];

  const hasResults = matchedMatches.length > 0 || matchedTeams.length > 0 || matchedPlayers.length > 0;

  return (
    <header className="h-[64px] px-4 lg:px-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1A2138] bg-white/95 dark:bg-[#090D1A]/95 backdrop-blur-md sticky top-0 z-30">
      {/* Left: Mobile Menu + Search Input */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-[#1E2742] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div ref={searchRef} className="relative w-[200px] sm:w-[270px] xl:w-[295px]">
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setSearchFocused(true);
            }}
            placeholder="Search teams, players, matches..."
            className="w-full h-9 pl-3.5 pr-9 rounded-xl text-[12.5px] bg-slate-100 dark:bg-[#11172B] border border-slate-200 dark:border-[#1E2742] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#7A87A3] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}

          {/* Live Search Popover */}
          {searchFocused && q.length > 0 && (
            <div className="absolute left-0 right-0 top-11 rounded-xl bg-white dark:bg-[#11172B] border border-slate-200 dark:border-[#243052] shadow-2xl p-2 z-50 max-h-[360px] overflow-y-auto">
              {!hasResults ? (
                <div className="px-3 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  No matches, teams, or players found for "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-2">
                  {matchedMatches.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Matches
                      </div>
                      {matchedMatches.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            onSelectMatch(m.id);
                            setSearchFocused(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-white/5 text-left"
                        >
                          <span className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-100">
                            <FlagIcon code={m.home.code} size="xs" />
                            <span>{m.home.name}</span>
                            <span className="text-slate-400">vs</span>
                            <FlagIcon code={m.away.code} size="xs" />
                            <span>{m.away.name}</span>
                          </span>
                          <span className="font-mono-num text-[11px] font-semibold text-[#60A5FA]">
                            {m.home.score !== null ? `${m.home.score}-${m.away.score}` : m.kickoff}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedTeams.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Teams
                      </div>
                      {matchedTeams.map((t) => (
                        <button
                          key={t.code}
                          type="button"
                          onClick={() => {
                            onSelectTab('teams');
                            setSearchFocused(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-white/5"
                        >
                          <span className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-100">
                            <FlagIcon code={t.code} size="xs" />
                            <span>{t.name}</span>
                          </span>
                          <span className="text-[11px] text-slate-400">{t.group}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedPlayers.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Players
                      </div>
                      {matchedPlayers.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => {
                            onNavigateSection('scorers');
                            setSearchFocused(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-white/5"
                        >
                          <span className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-100">
                            <FlagIcon code={p.code} size="xs" />
                            <span>{p.name}</span>
                          </span>
                          <span className="font-mono-num text-[11px] font-semibold text-amber-400">
                            {p.goals} goals
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Center: Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full" aria-label="Primary Tabs">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative h-full flex items-center text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                active
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-500 dark:text-[#8E9BB5] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.65)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Utility Controls + Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setUnreadCount(0);
            }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-[290px] rounded-xl bg-white dark:bg-[#11172B] border border-slate-200 dark:border-[#243052] shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100 dark:border-white/10">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Match Alerts</span>
                <span className="text-[11px] text-[#3B82F6] font-medium">Live Feed</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03]">
                  <Radio className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      GOAL! Vinicius Jr. (77')
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Argentina 2 - 2 Brazil · Group C
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      France 1 - 0 Germany (65')
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      K. Mbappé 38' · Group D
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>

        {/* User Profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors whitespace-nowrap shrink-0"
          >
            <img
              src="/assets/crops/avatar_john.png"
              alt="John Doe"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
            />
            <span className="hidden sm:inline text-[12.5px] font-medium text-slate-800 dark:text-slate-100">
              John Doe
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-11 w-48 rounded-xl bg-white dark:bg-[#11172B] border border-slate-200 dark:border-[#243052] shadow-2xl p-1.5 z-50 text-xs">
              <div className="px-2.5 py-2 border-b border-slate-100 dark:border-white/10 mb-1">
                <div className="font-semibold text-slate-900 dark:text-white">John Doe</div>
                <div className="text-[11px] text-slate-400">World Cup Pass · Pro</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onNavigateSection('favorites');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Saved Favorites</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigateSection('settings');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Preferences</span>
              </button>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

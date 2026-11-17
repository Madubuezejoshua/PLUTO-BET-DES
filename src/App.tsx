import { useState, useEffect, useMemo } from 'react';
import { Sidebar, type NavSection } from './components/Sidebar';
import { TopBar, type TopTab } from './components/TopBar';
import { HeroMatchBanner } from './components/HeroMatchBanner';
import { MatchesListCard, type MatchFilterTab } from './components/MatchesListCard';
import { GroupsOverviewCard } from './components/GroupsOverviewCard';
import { NewsUpdatesCard } from './components/NewsUpdatesCard';
import { RightRail } from './components/RightRail';
import {
  MatchCenterModal,
  ArticleModal,
  TournamentModal,
} from './components/MatchCenterModal';
import { SecondaryViews } from './components/SecondaryViews';
import {
  INITIAL_MATCHES,
  GROUP_STANDINGS,
  TOP_SCORERS,
  NEWS_ARTICLES,
  TEAMS_CATALOG,
  type MatchItem,
  type NewsArticle,
} from './data/worldCupData';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [activeTopTab, setActiveTopTab] = useState<TopTab>('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [matchFilter, setMatchFilter] = useState<MatchFilterTab>('all');
  const [selectedDate, setSelectedDate] = useState('June 12, 2026');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('arg-bra');

  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [reminders, setReminders] = useState<Set<string>>(() => new Set());

  const [liveSeconds, setLiveSeconds] = useState(78 * 60 + 45);
  const [liveSimulation, setLiveSimulation] = useState(true);

  const [modalMatch, setModalMatch] = useState<MatchItem | null>(null);
  const [modalMode, setModalMode] = useState<'live' | 'stats' | 'center'>('center');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [tournamentModalOpen, setTournamentModalOpen] = useState(false);
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (!liveSimulation) return;
    const timer = window.setInterval(() => {
      setLiveSeconds((prev) => (prev < 90 * 60 ? prev + 1 : 78 * 60 + 45));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [liveSimulation]);

  useEffect(() => {
    if (!toastMessage) return;
    const t = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(t);
  }, [toastMessage]);

  const clockDisplay = useMemo(() => {
    const mins = Math.floor(liveSeconds / 60);
    const secs = liveSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [liveSeconds]);

  const featuredMatch = INITIAL_MATCHES[0];
  const selectedMatch =
    INITIAL_MATCHES.find((m) => m.id === selectedMatchId) || featuredMatch;

  const handleToggleFavorite = (matchId: string) => {
    const match = INITIAL_MATCHES.find((m) => m.id === matchId);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
        if (match) setToastMessage(`Removed ${match.home.name} vs ${match.away.name} from favorites`);
      } else {
        next.add(matchId);
        if (match) setToastMessage(`Saved ${match.home.name} vs ${match.away.name} to favorites`);
      }
      return next;
    });
  };

  const handleToggleReminder = (matchId: string) => {
    const match = INITIAL_MATCHES.find((m) => m.id === matchId);
    setReminders((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
        if (match) setToastMessage(`Kickoff alert cancelled for ${match.home.name} vs ${match.away.name}`);
      } else {
        next.add(matchId);
        if (match) setToastMessage(`Kickoff alert set for ${match.home.name} vs ${match.away.name} (${match.kickoff})`);
      }
      return next;
    });
  };

  const handleSidebarSelect = (section: NavSection) => {
    setActiveSection(section);
    setFocusedGroupId(null);
    if (section === 'home') setActiveTopTab('overview');
    else if (section === 'live' || section === 'upcoming') setActiveTopTab('matches');
    else if (section === 'teams') setActiveTopTab('teams');
    else if (section === 'groups') setActiveTopTab('groups');
    else if (section === 'stats') setActiveTopTab('stats');
    else if (section === 'news') setActiveTopTab('news');
  };

  const handleTopTabSelect = (tab: TopTab) => {
    setActiveTopTab(tab);
    setFocusedGroupId(null);
    if (tab === 'overview') setActiveSection('home');
    else if (tab === 'matches') setActiveSection('live');
    else if (tab === 'teams') setActiveSection('teams');
    else if (tab === 'groups') setActiveSection('groups');
    else if (tab === 'stats') setActiveSection('stats');
    else if (tab === 'news') setActiveSection('news');
  };

  const openMatchModal = (match: MatchItem, mode: 'live' | 'stats' | 'center') => {
    setModalMatch(match);
    setModalMode(mode);
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-[#090D1A] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={handleSidebarSelect}
        liveCount={12}
        favoritesCount={favorites.size}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenTournamentDetails={() => setTournamentModalOpen(true)}
      />

      {/* Main Content Shell */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          activeTab={activeTopTab}
          onSelectTab={handleTopTabSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          matches={INITIAL_MATCHES}
          teams={TEAMS_CATALOG}
          scorers={TOP_SCORERS}
          onSelectMatch={(id) => {
            setSelectedMatchId(id);
            const found = INITIAL_MATCHES.find((m) => m.id === id);
            if (found) openMatchModal(found, 'center');
          }}
          onNavigateSection={handleSidebarSelect}
        />

        <main className="flex-1 p-4 lg:p-5 max-w-[1440px] w-full mx-auto">
          {activeSection === 'home' ? (
            <div className="space-y-4">
              {/* Top & Middle Viewport: Center Column + Right Rail */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                <div className="xl:col-span-8 2xl:col-span-9 space-y-4">
                  <HeroMatchBanner
                    match={featuredMatch}
                    clockDisplay={clockDisplay}
                    onWatchLive={(m) => openMatchModal(m, 'live')}
                  />

                  <MatchesListCard
                    matches={INITIAL_MATCHES}
                    selectedMatchId={selectedMatchId}
                    onSelectMatch={(id) => setSelectedMatchId(id)}
                    onOpenMatchCenter={(m) => openMatchModal(m, 'center')}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    reminders={reminders}
                    onToggleReminder={handleToggleReminder}
                    activeFilter={matchFilter}
                    onFilterChange={setMatchFilter}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onViewFullSchedule={() => {
                      setSelectedDate('All Dates');
                      setMatchFilter('all');
                      handleSidebarSelect('upcoming');
                    }}
                    liveBadgeCount={12}
                  />
                </div>

                <div className="xl:col-span-4 2xl:col-span-3">
                  <RightRail
                    match={selectedMatch}
                    clockDisplay={clockDisplay}
                    scorers={TOP_SCORERS}
                    onViewAllLive={() => handleSidebarSelect('live')}
                    onOpenMatchCenter={(m) => openMatchModal(m, 'center')}
                    onViewFullStats={(m) => openMatchModal(m, 'stats')}
                    onViewAllScorers={() => handleSidebarSelect('scorers')}
                  />
                </div>
              </div>

              {/* Bottom Row: Groups Overview + News & Updates */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                <div className="xl:col-span-7">
                  <GroupsOverviewCard
                    groups={GROUP_STANDINGS}
                    onViewAllGroups={(groupId) => {
                      setFocusedGroupId(groupId || null);
                      handleSidebarSelect('groups');
                    }}
                  />
                </div>
                <div className="xl:col-span-5">
                  <NewsUpdatesCard
                    articles={NEWS_ARTICLES}
                    onSelectArticle={(article) => setActiveArticle(article)}
                    onViewAllNews={() => handleSidebarSelect('news')}
                  />
                </div>
              </div>
            </div>
          ) : (
            <SecondaryViews
              section={activeSection}
              matches={INITIAL_MATCHES}
              groups={GROUP_STANDINGS}
              scorers={TOP_SCORERS}
              articles={NEWS_ARTICLES}
              teams={TEAMS_CATALOG}
              favorites={favorites}
              reminders={reminders}
              focusedGroupId={focusedGroupId}
              isDark={isDark}
              liveSimulation={liveSimulation}
              onToggleLiveSimulation={() => setLiveSimulation((s) => !s)}
              onToggleTheme={() => setIsDark((d) => !d)}
              onBackHome={() => handleSidebarSelect('home')}
              onSelectMatch={(id) => setSelectedMatchId(id)}
              onOpenMatchCenter={(m) => openMatchModal(m, 'center')}
              onToggleFavorite={handleToggleFavorite}
              onToggleReminder={handleToggleReminder}
              onSelectArticle={(article) => setActiveArticle(article)}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <MatchCenterModal
        match={modalMatch}
        clockDisplay={clockDisplay}
        initialMode={modalMode}
        onClose={() => setModalMatch(null)}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      <TournamentModal
        open={tournamentModalOpen}
        onClose={() => setTournamentModalOpen(false)}
        onGoToGroups={() => handleSidebarSelect('groups')}
      />

      {/* Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-[#161F3B] text-white text-xs font-medium border border-white/15 shadow-2xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

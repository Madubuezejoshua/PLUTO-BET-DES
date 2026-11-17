export type CountryCode =
  | 'ARG'
  | 'BRA'
  | 'FRA'
  | 'GER'
  | 'USA'
  | 'MEX'
  | 'ESP'
  | 'ITA'
  | 'JPN'
  | 'CRO'
  | 'RSA'
  | 'KOR'
  | 'CAN'
  | 'MAR'
  | 'SCO'
  | 'AUS'
  | 'TUN'
  | 'POL'
  | 'ENG'
  | 'POR'
  | 'NED'
  | 'BEL';

export interface MatchEvent {
  minute: string;
  player: string;
  team: 'home' | 'away';
  type: 'goal' | 'yellow' | 'sub';
}

export interface MatchStats {
  possession: [number, number];
  shotsOnTarget: [number, number];
  totalShots: [number, number];
  corners: [number, number];
  fouls: [number, number];
  xG: [number, number];
  passes: [number, number];
  passAccuracy: [number, number];
}

export interface MatchItem {
  id: string;
  status: 'LIVE' | 'HT' | 'UPCOMING' | 'FT';
  minute?: string;
  clock?: string;
  halfLabel?: string;
  kickoff?: string;
  date: string;
  group: string;
  stage: string;
  matchday: string;
  venue: string;
  home: {
    name: string;
    code: CountryCode;
    score: number | null;
  };
  away: {
    name: string;
    code: CountryCode;
    score: number | null;
  };
  events: MatchEvent[];
  stats: MatchStats;
  isFeatured?: boolean;
  defaultFavorite?: boolean;
}

export interface GroupTeamRow {
  pos: number;
  team: string;
  code: CountryCode;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: string;
  pts: number;
}

export interface GroupStanding {
  id: string;
  name: string;
  rows: GroupTeamRow[];
}

export interface TopScorer {
  rank: number;
  name: string;
  country: string;
  code: CountryCode;
  club: string;
  goals: number;
  assists: number;
  minutes: number;
  avatar?: string;
}

export interface NewsArticle {
  id: string;
  category: 'OFFICIAL' | 'INTERVIEW' | 'ANALYSIS' | 'TACTICS';
  title: string;
  summary: string;
  body: string;
  timeAgo: string;
  image: string;
  author: string;
}

export interface TeamInfo {
  code: CountryCode;
  name: string;
  group: string;
  fifaRank: number;
  coach: string;
  captain: string;
  titles: number;
  squadValue: string;
  form: ('W' | 'D' | 'L')[];
}

export const MATCH_DATES = [
  'June 12, 2026',
  'June 13, 2026',
  'June 14, 2026',
  'All Dates',
];

export const INITIAL_MATCHES: MatchItem[] = [
  {
    id: 'arg-bra',
    status: 'LIVE',
    minute: "78'",
    clock: '78:45',
    halfLabel: '2nd Half',
    date: 'June 12, 2026',
    group: 'Group C',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'MetLife Stadium, New York / New Jersey',
    home: { name: 'Argentina', code: 'ARG', score: 2 },
    away: { name: 'Brazil', code: 'BRA', score: 2 },
    events: [
      { minute: "23'", player: 'L. Messi', team: 'home', type: 'goal' },
      { minute: "64'", player: 'J. Alvarez', team: 'home', type: 'goal' },
      { minute: "15'", player: 'Neymar Jr.', team: 'away', type: 'goal' },
      { minute: "77'", player: 'Vinicius Jr.', team: 'away', type: 'goal' },
    ],
    stats: {
      possession: [52, 48],
      shotsOnTarget: [6, 5],
      totalShots: [14, 11],
      corners: [4, 3],
      fouls: [8, 9],
      xG: [2.14, 1.88],
      passes: [468, 431],
      passAccuracy: [89, 86],
    },
    isFeatured: true,
    defaultFavorite: false,
  },
  {
    id: 'fra-ger',
    status: 'LIVE',
    minute: "65'",
    clock: '65:12',
    halfLabel: '2nd Half',
    date: 'June 12, 2026',
    group: 'Group D',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'AT&T Stadium, Dallas',
    home: { name: 'France', code: 'FRA', score: 1 },
    away: { name: 'Germany', code: 'GER', score: 0 },
    events: [
      { minute: "38'", player: 'K. Mbappé', team: 'home', type: 'goal' },
      { minute: "52'", player: 'J. Kimmich', team: 'away', type: 'yellow' },
    ],
    stats: {
      possession: [47, 53],
      shotsOnTarget: [5, 3],
      totalShots: [12, 10],
      corners: [5, 6],
      fouls: [7, 11],
      xG: [1.62, 0.94],
      passes: [392, 448],
      passAccuracy: [87, 90],
    },
    defaultFavorite: false,
  },
  {
    id: 'usa-mex',
    status: 'HT',
    minute: 'HT',
    clock: '45:00',
    halfLabel: 'Half Time',
    date: 'June 12, 2026',
    group: 'Group A',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'Estadio Azteca, Mexico City',
    home: { name: 'USA', code: 'USA', score: 0 },
    away: { name: 'Mexico', code: 'MEX', score: 0 },
    events: [
      { minute: "29'", player: 'W. McKennie', team: 'home', type: 'yellow' },
      { minute: "41'", player: 'E. Álvarez', team: 'away', type: 'yellow' },
    ],
    stats: {
      possession: [50, 50],
      shotsOnTarget: [2, 2],
      totalShots: [6, 7],
      corners: [3, 2],
      fouls: [6, 8],
      xG: [0.58, 0.64],
      passes: [241, 238],
      passAccuracy: [84, 83],
    },
    defaultFavorite: false,
  },
  {
    id: 'esp-ita',
    status: 'UPCOMING',
    kickoff: '20:00',
    date: 'June 12, 2026',
    group: 'Group B',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'SoFi Stadium, Los Angeles',
    home: { name: 'Spain', code: 'ESP', score: null },
    away: { name: 'Italy', code: 'ITA', score: null },
    events: [],
    stats: {
      possession: [50, 50],
      shotsOnTarget: [0, 0],
      totalShots: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      xG: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0],
    },
  },
  {
    id: 'jpn-cro',
    status: 'UPCOMING',
    kickoff: '23:00',
    date: 'June 12, 2026',
    group: 'Group F',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'BC Place, Vancouver',
    home: { name: 'Japan', code: 'JPN', score: null },
    away: { name: 'Croatia', code: 'CRO', score: null },
    events: [],
    stats: {
      possession: [50, 50],
      shotsOnTarget: [0, 0],
      totalShots: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      xG: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0],
    },
  },
  {
    id: 'eng-ned',
    status: 'LIVE',
    minute: "54'",
    clock: '54:20',
    halfLabel: '2nd Half',
    date: 'June 12, 2026',
    group: 'Group E',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'Mercedes-Benz Stadium, Atlanta',
    home: { name: 'England', code: 'ENG', score: 2 },
    away: { name: 'Netherlands', code: 'NED', score: 1 },
    events: [
      { minute: "18'", player: 'J. Bellingham', team: 'home', type: 'goal' },
      { minute: "33'", player: 'C. Gakpo', team: 'away', type: 'goal' },
      { minute: "49'", player: 'H. Kane', team: 'home', type: 'goal' },
    ],
    stats: {
      possession: [54, 46],
      shotsOnTarget: [5, 3],
      totalShots: [11, 8],
      corners: [4, 3],
      fouls: [5, 7],
      xG: [1.75, 1.05],
      passes: [340, 295],
      passAccuracy: [88, 85],
    },
  },
  {
    id: 'por-bel',
    status: 'LIVE',
    minute: "82'",
    clock: '82:10',
    halfLabel: '2nd Half',
    date: 'June 12, 2026',
    group: 'Group G',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'Hard Rock Stadium, Miami',
    home: { name: 'Portugal', code: 'POR', score: 3 },
    away: { name: 'Belgium', code: 'BEL', score: 1 },
    events: [
      { minute: "11'", player: 'B. Fernandes', team: 'home', type: 'goal' },
      { minute: "44'", player: 'R. Lukaku', team: 'away', type: 'goal' },
      { minute: "61'", player: 'R. Leão', team: 'home', type: 'goal' },
      { minute: "79'", player: 'C. Ronaldo', team: 'home', type: 'goal' },
    ],
    stats: {
      possession: [56, 44],
      shotsOnTarget: [7, 4],
      totalShots: [16, 9],
      corners: [6, 2],
      fouls: [9, 10],
      xG: [2.45, 1.12],
      passes: [512, 398],
      passAccuracy: [90, 84],
    },
  },
  {
    id: 'mar-sco',
    status: 'FT',
    minute: 'FT',
    clock: '90:00',
    halfLabel: 'Full Time',
    date: 'June 12, 2026',
    group: 'Group C',
    stage: 'Group Stage',
    matchday: 'Matchday 1 of 3',
    venue: 'Gillette Stadium, Boston',
    home: { name: 'Morocco', code: 'MAR', score: 1 },
    away: { name: 'Scotland', code: 'SCO', score: 1 },
    events: [
      { minute: "27'", player: 'A. Hakimi', team: 'home', type: 'goal' },
      { minute: "71'", player: 'S. McTominay', team: 'away', type: 'goal' },
    ],
    stats: {
      possession: [58, 42],
      shotsOnTarget: [4, 3],
      totalShots: [13, 7],
      corners: [7, 3],
      fouls: [10, 12],
      xG: [1.41, 0.89],
      passes: [524, 376],
      passAccuracy: [86, 79],
    },
  },
  {
    id: 'kor-rsa',
    status: 'FT',
    minute: 'FT',
    clock: '90:00',
    halfLabel: 'Full Time',
    date: 'June 12, 2026',
    group: 'Group A',
    stage: 'Group Stage',
    matchday: 'Matchday 1 of 3',
    venue: 'BMO Field, Toronto',
    home: { name: 'Korea Republic', code: 'KOR', score: 1 },
    away: { name: 'South Africa', code: 'RSA', score: 2 },
    events: [
      { minute: "19'", player: 'Son Heung-min', team: 'home', type: 'goal' },
      { minute: "55'", player: 'P. Tau', team: 'away', type: 'goal' },
      { minute: "84'", player: 'T. Zwane', team: 'away', type: 'goal' },
    ],
    stats: {
      possession: [61, 39],
      shotsOnTarget: [5, 4],
      totalShots: [15, 8],
      corners: [8, 2],
      fouls: [9, 13],
      xG: [1.68, 1.32],
      passes: [540, 345],
      passAccuracy: [88, 78],
    },
  },
  {
    id: 'can-cro',
    status: 'UPCOMING',
    kickoff: '18:00',
    date: 'June 13, 2026',
    group: 'Group B',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'BMO Field, Toronto',
    home: { name: 'Canada', code: 'CAN', score: null },
    away: { name: 'Croatia', code: 'CRO', score: null },
    events: [],
    stats: {
      possession: [50, 50],
      shotsOnTarget: [0, 0],
      totalShots: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      xG: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0],
    },
  },
  {
    id: 'aus-tun',
    status: 'UPCOMING',
    kickoff: '21:00',
    date: 'June 14, 2026',
    group: 'Group D',
    stage: 'Group Stage',
    matchday: 'Matchday 2 of 3',
    venue: 'Lumen Field, Seattle',
    home: { name: 'Australia', code: 'AUS', score: null },
    away: { name: 'Tunisia', code: 'TUN', score: null },
    events: [],
    stats: {
      possession: [50, 50],
      shotsOnTarget: [0, 0],
      totalShots: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      xG: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0],
    },
  },
];

export const GROUP_STANDINGS: GroupStanding[] = [
  {
    id: 'A',
    name: 'Group A',
    rows: [
      { pos: 1, team: 'USA', code: 'USA', played: 2, won: 2, drawn: 0, lost: 0, gd: '+3', pts: 6 },
      { pos: 2, team: 'Mexico', code: 'MEX', played: 2, won: 1, drawn: 1, lost: 0, gd: '+2', pts: 4 },
      { pos: 3, team: 'South Africa', code: 'RSA', played: 2, won: 1, drawn: 0, lost: 1, gd: '0', pts: 3 },
      { pos: 4, team: 'Korea Republic', code: 'KOR', played: 2, won: 0, drawn: 1, lost: 1, gd: '-5', pts: 1 },
    ],
  },
  {
    id: 'B',
    name: 'Group B',
    rows: [
      { pos: 1, team: 'Spain', code: 'ESP', played: 2, won: 2, drawn: 0, lost: 0, gd: '+4', pts: 6 },
      { pos: 2, team: 'Italy', code: 'ITA', played: 2, won: 1, drawn: 0, lost: 1, gd: '+1', pts: 3 },
      { pos: 3, team: 'Croatia', code: 'CRO', played: 2, won: 1, drawn: 0, lost: 1, gd: '0', pts: 3 },
      { pos: 4, team: 'Canada', code: 'CAN', played: 2, won: 0, drawn: 0, lost: 2, gd: '-5', pts: 0 },
    ],
  },
  {
    id: 'C',
    name: 'Group C',
    rows: [
      { pos: 1, team: 'Brazil', code: 'BRA', played: 2, won: 1, drawn: 1, lost: 0, gd: '+3', pts: 4 },
      { pos: 2, team: 'Argentina', code: 'ARG', played: 2, won: 1, drawn: 1, lost: 0, gd: '+2', pts: 4 },
      { pos: 3, team: 'Morocco', code: 'MAR', played: 2, won: 0, drawn: 1, lost: 1, gd: '-1', pts: 1 },
      { pos: 4, team: 'Scotland', code: 'SCO', played: 2, won: 0, drawn: 1, lost: 1, gd: '-4', pts: 0 },
    ],
  },
  {
    id: 'D',
    name: 'Group D',
    rows: [
      { pos: 1, team: 'France', code: 'FRA', played: 2, won: 2, drawn: 0, lost: 0, gd: '+4', pts: 6 },
      { pos: 2, team: 'Germany', code: 'GER', played: 2, won: 1, drawn: 0, lost: 1, gd: '+1', pts: 3 },
      { pos: 3, team: 'Australia', code: 'AUS', played: 2, won: 0, drawn: 1, lost: 1, gd: '-2', pts: 1 },
      { pos: 4, team: 'Tunisia', code: 'TUN', played: 2, won: 0, drawn: 1, lost: 1, gd: '-3', pts: 1 },
    ],
  },
  {
    id: 'E',
    name: 'Group E',
    rows: [
      { pos: 1, team: 'England', code: 'ENG', played: 2, won: 2, drawn: 0, lost: 0, gd: '+4', pts: 6 },
      { pos: 2, team: 'Netherlands', code: 'NED', played: 2, won: 1, drawn: 0, lost: 1, gd: '+1', pts: 3 },
      { pos: 3, team: 'Poland', code: 'POL', played: 2, won: 0, drawn: 1, lost: 1, gd: '-2', pts: 1 },
      { pos: 4, team: 'Japan', code: 'JPN', played: 2, won: 0, drawn: 1, lost: 1, gd: '-3', pts: 1 },
    ],
  },
  {
    id: 'F',
    name: 'Group F',
    rows: [
      { pos: 1, team: 'Portugal', code: 'POR', played: 2, won: 2, drawn: 0, lost: 0, gd: '+5', pts: 6 },
      { pos: 2, team: 'Belgium', code: 'BEL', played: 2, won: 1, drawn: 0, lost: 1, gd: '0', pts: 3 },
      { pos: 3, team: 'Japan', code: 'JPN', played: 2, won: 0, drawn: 1, lost: 1, gd: '-2', pts: 1 },
      { pos: 4, team: 'Croatia', code: 'CRO', played: 2, won: 0, drawn: 1, lost: 1, gd: '-3', pts: 1 },
    ],
  },
];

export const TOP_SCORERS: TopScorer[] = [
  {
    rank: 1,
    name: 'K. Mbappé',
    country: 'France',
    code: 'FRA',
    club: 'Real Madrid',
    goals: 5,
    assists: 2,
    minutes: 245,
    avatar: '/assets/crops/scorer_mbappe.png',
  },
  {
    rank: 2,
    name: 'L. Messi',
    country: 'Argentina',
    code: 'ARG',
    club: 'Inter Miami',
    goals: 4,
    assists: 3,
    minutes: 258,
    avatar: '/assets/crops/scorer_messi.png',
  },
  {
    rank: 3,
    name: 'R. Lewandowski',
    country: 'Poland',
    code: 'POL',
    club: 'FC Barcelona',
    goals: 4,
    assists: 1,
    minutes: 270,
    avatar: '/assets/crops/scorer_lewa.png',
  },
  {
    rank: 4,
    name: 'Vinicius Jr.',
    country: 'Brazil',
    code: 'BRA',
    club: 'Real Madrid',
    goals: 3,
    assists: 2,
    minutes: 252,
  },
  {
    rank: 5,
    name: 'J. Bellingham',
    country: 'England',
    code: 'ENG',
    club: 'Real Madrid',
    goals: 3,
    assists: 1,
    minutes: 234,
  },
  {
    rank: 6,
    name: 'J. Alvarez',
    country: 'Argentina',
    code: 'ARG',
    club: 'Atlético Madrid',
    goals: 2,
    assists: 2,
    minutes: 220,
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'schedule-released',
    category: 'OFFICIAL',
    title: 'FIFA World Cup 2026 Match Schedule Released',
    summary:
      'Complete kickoff times, host city allocations across the USA, Canada, and Mexico, and knockout bracket dates confirmed.',
    body: 'FIFA has officially unveiled the full 104-match tournament schedule for the 2026 World Cup across 16 host cities in North America. The opening fixture kicks off on June 11 at Estadio Azteca in Mexico City, culminating in the July 19 Final at MetLife Stadium in New York / New Jersey. Expanded 48-team format introduces a thrilling Round of 32 knockout stage.',
    timeAgo: '2 hours ago',
    image: '/assets/crops/news_1.png',
    author: 'Score90X Editorial Desk',
  },
  {
    id: 'messi-interview',
    category: 'INTERVIEW',
    title: 'Messi: "We are ready to defend our title"',
    summary:
      'Argentina captain speaks ahead of the Group C clash with Brazil on chemistry, legacy, and the electric North American atmosphere.',
    body: 'Speaking from New Jersey ahead of Argentina’s heavyweight Group C showdown against Brazil, Lionel Messi emphasized squad unity and hunger: "Every World Cup writes a fresh chapter. This group knows how to suffer together and play with joy. Wearing this shirt in front of packed stadiums across North America gives us extra energy to defend what we earned."',
    timeAgo: '5 hours ago',
    image: '/assets/crops/news_2.png',
    author: 'Mateo González',
  },
  {
    id: 'tactical-france',
    category: 'TACTICS',
    title: 'How France’s High Press Overwhelmed Germany in Dallas',
    summary:
      'Breaking down Deschamps’ midfield diamond and Mbappé’s diagonal runs behind the German back line.',
    body: 'By shifting into a compact 4-3-1-2 out of possession, France cut off Germany’s central progression lanes and triggered rapid transitions through Kylian Mbappé and Ousmane Dembélé, generating 1.62 expected goals within the opening 65 minutes.',
    timeAgo: '8 hours ago',
    image: '/assets/crops/news_1.png',
    author: 'Claire Laurent',
  },
];

export const TEAMS_CATALOG: TeamInfo[] = [
  { code: 'ARG', name: 'Argentina', group: 'Group C', fifaRank: 1, coach: 'Lionel Scaloni', captain: 'Lionel Messi', titles: 3, squadValue: '€845M', form: ['W', 'W', 'D', 'W', 'D'] },
  { code: 'FRA', name: 'France', group: 'Group D', fifaRank: 2, coach: 'Didier Deschamps', captain: 'Kylian Mbappé', titles: 2, squadValue: '€1.18B', form: ['W', 'D', 'W', 'W', 'W'] },
  { code: 'ESP', name: 'Spain', group: 'Group B', fifaRank: 3, coach: 'Luis de la Fuente', captain: 'Rodri', titles: 1, squadValue: '€965M', form: ['W', 'W', 'W', 'D', 'W'] },
  { code: 'ENG', name: 'England', group: 'Group E', fifaRank: 4, coach: 'Thomas Tuchel', captain: 'Harry Kane', titles: 1, squadValue: '€1.24B', form: ['W', 'W', 'L', 'W', 'W'] },
  { code: 'BRA', name: 'Brazil', group: 'Group C', fifaRank: 5, coach: 'Dorival Júnior', captain: 'Neymar Jr.', titles: 5, squadValue: '€1.09B', form: ['D', 'W', 'W', 'L', 'D'] },
  { code: 'POR', name: 'Portugal', group: 'Group F', fifaRank: 6, coach: 'Roberto Martínez', captain: 'Cristiano Ronaldo', titles: 0, squadValue: '€980M', form: ['W', 'W', 'D', 'W', 'W'] },
  { code: 'NED', name: 'Netherlands', group: 'Group E', fifaRank: 7, coach: 'Ronald Koeman', captain: 'Virgil van Dijk', titles: 0, squadValue: '€790M', form: ['W', 'D', 'W', 'W', 'L'] },
  { code: 'GER', name: 'Germany', group: 'Group D', fifaRank: 9, coach: 'Julian Nagelsmann', captain: 'Joshua Kimmich', titles: 4, squadValue: '€860M', form: ['W', 'W', 'D', 'W', 'L'] },
  { code: 'ITA', name: 'Italy', group: 'Group B', fifaRank: 10, coach: 'Luciano Spalletti', captain: 'Gianluigi Donnarumma', titles: 4, squadValue: '€745M', form: ['W', 'L', 'W', 'D', 'W'] },
  { code: 'USA', name: 'USA', group: 'Group A', fifaRank: 14, coach: 'Mauricio Pochettino', captain: 'Christian Pulisic', titles: 0, squadValue: '€390M', form: ['W', 'W', 'D', 'W', 'D'] },
  { code: 'MEX', name: 'Mexico', group: 'Group A', fifaRank: 16, coach: 'Javier Aguirre', captain: 'Edson Álvarez', titles: 0, squadValue: '€235M', form: ['D', 'W', 'L', 'W', 'D'] },
  { code: 'JPN', name: 'Japan', group: 'Group F', fifaRank: 15, coach: 'Hajime Moriyasu', captain: 'Wataru Endo', titles: 0, squadValue: '€310M', form: ['W', 'W', 'W', 'D', 'L'] },
];

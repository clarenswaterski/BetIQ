// ─── SPORTS ───────────────────────────────────────────────────────────────────
export const SPORTS = [
  { id: "all",        label: "Tous",        icon: "⚡" },
  { id: "football",   label: "Football",    icon: "⚽" },
  { id: "basketball", label: "Basketball",  icon: "🏀" },
  { id: "tennis",     label: "Tennis",      icon: "🎾" },
  { id: "rugby",      label: "Rugby",       icon: "🏉" },
  { id: "hockey",     label: "Hockey",      icon: "🏒" },
];

export const COMPETITIONS = [
  "Toutes", "Ligue 1", "Premier League",
  "Champions League", "NBA", "Roland Garros", "Top 14",
];

// ─── MATCHES ──────────────────────────────────────────────────────────────────
export const MATCHES = [
  {
    id: 1, sport: "football", competition: "Champions League", live: true,
    time: "67'", homeTeam: "Real Madrid", awayTeam: "Bayern Munich",
    score: "2-1", homeOdd: 1.42, drawOdd: 4.20, awayOdd: 6.50,
    aiScore: 87, featured: true, trend: "↑",
    homeFlag: "🇪🇸", awayFlag: "🇩🇪",
  },
  {
    id: 2, sport: "football", competition: "Premier League", live: false,
    time: "20:45", homeTeam: "Arsenal", awayTeam: "Man City",
    score: null, homeOdd: 2.85, drawOdd: 3.40, awayOdd: 2.30,
    aiScore: 82, featured: true, trend: "→",
    homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  {
    id: 3, sport: "football", competition: "Ligue 1", live: false,
    time: "21:00", homeTeam: "PSG", awayTeam: "Marseille",
    score: null, homeOdd: 1.75, drawOdd: 3.80, awayOdd: 4.50,
    aiScore: 79, featured: true, trend: "↓",
    homeFlag: "🇫🇷", awayFlag: "🇫🇷",
  },
  {
    id: 4, sport: "basketball", competition: "NBA", live: true,
    time: "Q3 8:42", homeTeam: "Lakers", awayTeam: "Warriors",
    score: "78-82", homeOdd: 2.10, drawOdd: null, awayOdd: 1.72,
    aiScore: 91, featured: false, trend: "↑",
    homeFlag: "🇺🇸", awayFlag: "🇺🇸",
  },
  {
    id: 5, sport: "tennis", competition: "Roland Garros", live: false,
    time: "14:00", homeTeam: "Sinner", awayTeam: "Alcaraz",
    score: null, homeOdd: 2.05, drawOdd: null, awayOdd: 1.80,
    aiScore: 74, featured: false, trend: "→",
    homeFlag: "🇮🇹", awayFlag: "🇪🇸",
  },
  {
    id: 6, sport: "rugby", competition: "Top 14", live: false,
    time: "17:30", homeTeam: "Toulouse", awayTeam: "Bordeaux",
    score: null, homeOdd: 1.55, drawOdd: 14.0, awayOdd: 2.70,
    aiScore: 68, featured: false, trend: "↑",
    homeFlag: "🇫🇷", awayFlag: "🇫🇷",
  },
  {
    id: 7, sport: "football", competition: "Champions League", live: true,
    time: "43'", homeTeam: "Inter Milan", awayTeam: "Atlético Madrid",
    score: "1-1", homeOdd: 2.20, drawOdd: 3.10, awayOdd: 3.40,
    aiScore: 76, featured: false, trend: "→",
    homeFlag: "🇮🇹", awayFlag: "🇪🇸",
  },
  {
    id: 8, sport: "hockey", competition: "NHL", live: false,
    time: "19:00", homeTeam: "Rangers", awayTeam: "Bruins",
    score: null, homeOdd: 1.90, drawOdd: null, awayOdd: 2.00,
    aiScore: 63, featured: false, trend: "↓",
    homeFlag: "🇺🇸", awayFlag: "🇺🇸",
  },
];

// ─── TOP BETS ─────────────────────────────────────────────────────────────────
export const TOP_BETS = [
  { id: 1, match: "Real Madrid vs Bayern",  category: "value",   market: "1X2 — Real Madrid",      odd: 1.42, risk: "low",    probability: 74, aiScore: 94, bookmaker: "Betclic" },
  { id: 2, match: "Lakers vs Warriors",     category: "live",    market: "Handicap Lakers -4.5",    odd: 1.95, risk: "medium", probability: 61, aiScore: 88, bookmaker: "Winamax" },
  { id: 3, match: "Arsenal vs Man City",    category: "popular", market: "BTTS — Oui",              odd: 1.72, risk: "low",    probability: 67, aiScore: 85, bookmaker: "Unibet"  },
  { id: 4, match: "Sinner vs Alcaraz",      category: "value",   market: "Alcaraz gagne set 1",     odd: 2.40, risk: "medium", probability: 58, aiScore: 81, bookmaker: "Betclic" },
  { id: 5, match: "PSG vs Marseille",       category: "popular", market: "PSG +1.5 buts",           odd: 1.35, risk: "low",    probability: 81, aiScore: 77, bookmaker: "Winamax" },
  { id: 6, match: "Toulouse vs Bordeaux",   category: "value",   market: "Toulouse -6.5 pts",       odd: 3.10, risk: "high",   probability: 42, aiScore: 73, bookmaker: "Bwin"    },
];

// ─── BET HISTORY ──────────────────────────────────────────────────────────────
export const BET_HISTORY = [
  { id: 1, date: "02/06", match: "Man City vs Arsenal",    market: "Man City",    stake: 50, odd: 1.85, result: "won",  gain:  42.5 },
  { id: 2, date: "01/06", match: "Djokovic vs Nadal",      market: "Djokovic S1", stake: 30, odd: 1.65, result: "lost", gain: -30   },
  { id: 3, date: "01/06", match: "PSG vs Lyon",            market: "BTTS",        stake: 20, odd: 1.80, result: "won",  gain:  16   },
  { id: 4, date: "31/05", match: "Lakers vs Celtics",      market: "Celtics -3.5",stake: 40, odd: 2.10, result: "lost", gain: -40   },
  { id: 5, date: "30/05", match: "Real Madrid vs Barça",   market: "Real Madrid", stake: 60, odd: 2.20, result: "won",  gain:  72   },
  { id: 6, date: "29/05", match: "Wimbledon Finals",       market: "Alcaraz",     stake: 35, odd: 1.95, result: "won",  gain:  33.25},
];

// ─── ONBOARDING QUESTIONS ─────────────────────────────────────────────────────
export const QUESTIONS = [
  {
    id: "goal", step: 2, total: 8,
    title: "Quel est votre objectif principal ?",
    sub: "Choisissez ce qui correspond le mieux à votre démarche.",
    multi: false, layout: "grid-2",
    options: [
      { id: "profitable", icon: "📈", label: "Être rentable",          sub: "Long terme"     },
      { id: "bestbets",   icon: "🎯", label: "Meilleurs paris",        sub: "Sélection"      },
      { id: "bankroll",   icon: "💰", label: "Gérer ma bankroll",      sub: "Discipline"     },
      { id: "errors",     icon: "🔍", label: "Comprendre mes erreurs", sub: "Analyse"        },
      { id: "live",       icon: "📡", label: "Paris live",             sub: "En direct"      },
      { id: "value",      icon: "💎", label: "Value bets",             sub: "Opportunités"   },
    ],
  },
  {
    id: "level", step: 3, total: 8,
    title: "Quel est votre niveau ?",
    sub: "Nous adaptons votre expérience en fonction de votre expertise.",
    multi: false, layout: "grid-1",
    options: [
      { id: "beginner",     icon: "🌱", label: "Débutant",      sub: "< 1 an de paris"  },
      { id: "intermediate", icon: "⚡", label: "Intermédiaire", sub: "1 à 3 ans"        },
      { id: "expert",       icon: "🏆", label: "Expert",        sub: "3+ ans de Paris"  },
    ],
  },
  {
    id: "sport", step: 4, total: 8,
    title: "Votre sport principal ?",
    sub: "Plusieurs choix possibles.",
    multi: true, layout: "pills",
    options: [
      { id: "football",   icon: "⚽", label: "Football"   },
      { id: "basketball", icon: "🏀", label: "Basketball" },
      { id: "tennis",     icon: "🎾", label: "Tennis"     },
      { id: "mma",        icon: "🥊", label: "MMA"        },
      { id: "rugby",      icon: "🏉", label: "Rugby"      },
      { id: "hockey",     icon: "🏒", label: "Hockey"     },
      { id: "other",      icon: "🎮", label: "Autre"      },
    ],
  },
  {
    id: "risk", step: 5, total: 8,
    title: "Votre profil de risque ?",
    sub: "Cela détermine nos recommandations de mise.",
    multi: false, layout: "grid-1",
    options: [
      { id: "conservative", icon: "🛡️", label: "Conservateur", sub: "Cotes < 2.0 · Faible risque"         },
      { id: "moderate",     icon: "⚖️", label: "Modéré",       sub: "Équilibre rendement / risque"         },
      { id: "aggressive",   icon: "🔥", label: "Agressif",     sub: "Cotes élevées · Fort rendement"       },
    ],
  },
  {
    id: "bankroll", step: 6, total: 8,
    title: "Votre bankroll actuelle ?",
    sub: "Estimez le budget que vous consacrez aux paris.",
    multi: false, layout: "pills",
    options: [
      { id: "u100",    icon: "💶", label: "< 100 €"          },
      { id: "100_500", icon: "💴", label: "100 € à 500 €"    },
      { id: "500_1k",  icon: "💵", label: "500 € à 1 000 €"  },
      { id: "1k_5k",   icon: "💰", label: "1 000 € à 5 000 €"},
      { id: "o5k",     icon: "🏦", label: "+ 5 000 €"        },
    ],
  },
  {
    id: "frequency", step: 7, total: 8,
    title: "Paris par semaine ?",
    sub: "Votre fréquence nous aide à calibrer les alertes.",
    multi: false, layout: "grid-2",
    options: [
      { id: "1_5",  icon: "🌿", label: "1 à 5 paris",   sub: "Casual"          },
      { id: "5_15", icon: "📅", label: "5 à 15 paris",  sub: "Régulier"        },
      { id: "15_30",icon: "🔄", label: "15 à 30 paris", sub: "Intensif"        },
      { id: "30+",  icon: "⚡", label: "+ 30 paris",    sub: "Pro / quotidien" },
    ],
  },
  {
    id: "type", step: 8, total: 8,
    title: "Type de paris préféré ?",
    sub: "Plusieurs choix possibles.",
    multi: true, layout: "pills",
    options: [
      { id: "single", icon: "🎯", label: "Paris simples" },
      { id: "combi",  icon: "🔗", label: "Combinés"      },
      { id: "live",   icon: "📡", label: "Live"          },
      { id: "value",  icon: "💎", label: "Value bets"    },
      { id: "any",    icon: "🎲", label: "Peu importe"   },
    ],
  },
];

// ─── PRICING PLANS ────────────────────────────────────────────────────────────
export const PLANS = [
  {
    id: "free",
    name: "BetIQ Free",
    price: "0",
    period: "Pour toujours",
    color: "var(--text-3)",
    features: [
      { text: "Simulations",              ok: true  },
      { text: "Analyse basique",          ok: true  },
      { text: "Comparaison de cotes",     ok: true  },
      { text: "Dashboard standard",       ok: true  },
      { text: "Historique limité (30 j)", ok: true  },
      { text: "IA avancée",               ok: false },
      { text: "Value bets",               ok: false },
      { text: "Alertes personnalisées",   ok: false },
    ],
    badge: null, btnLabel: "Continuer en Free", btnClass: "btn-ghost",
  },
  {
    id: "pro",
    name: "BetIQ Pro",
    price: "9.99",
    period: "par mois",
    color: "var(--electric-2)",
    features: [
      { text: "Tout le plan Free",           ok: true },
      { text: "IA avancée",                  ok: true },
      { text: "Détection value bets",        ok: true },
      { text: "Alertes personnalisées",      ok: true },
      { text: "Analyse détaillée",           ok: true },
      { text: "Historique illimité",         ok: true },
      { text: "Statistiques avancées",       ok: true },
      { text: "Programmes personnalisés",    ok: true },
    ],
    badge: "POPULAIRE", btnLabel: "Choisir Pro", btnClass: "btn-primary", popular: true,
  },
  {
    id: "elite",
    name: "BetIQ Elite",
    price: "19.99",
    period: "par mois",
    color: "var(--gold)",
    features: [
      { text: "Tout BetIQ Pro",                      ok: true },
      { text: "Analyse prédictive premium",          ok: true },
      { text: "Score de confiance avancé",           ok: true },
      { text: "Alertes temps réel",                  ok: true },
      { text: "Dashboard professionnel",             ok: true },
      { text: "Rapports hebdomadaires",              ok: true },
      { text: "Classements exclusifs",               ok: true },
      { text: "Fonctionnalités en avant-première",   ok: true },
    ],
    badge: "ELITE", btnLabel: "Choisir Elite", btnClass: "btn-gold", elite: true,
  },
];

// ─── PROGRAM MAP ──────────────────────────────────────────────────────────────
export const PROGRAMS = {
  profitable: "Value Hunter Pro",
  bestbets:   "Smart Picker",
  bankroll:   "Bankroll Master",
  errors:     "Analytics Expert",
  live:       "Live Specialist",
  value:      "Value Hunter Pro",
};

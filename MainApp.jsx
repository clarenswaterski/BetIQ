'use client';

import { useState, useRef } from 'react';
import BetIQLogo from '@/components/shared/BetIQLogo';
import { SPORTS, COMPETITIONS, MATCHES, TOP_BETS, BET_HISTORY, PROGRAMS } from '@/lib/data';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0F172A;
    --navy-1: #111827;
    --navy-2: #1E293B;
    --navy-3: #243047;
    --navy-4: #334155;
    --electric: #2563EB;
    --electric-2: #3B82F6;
    --electric-3: #60A5FA;
    --green: #22C55E;
    --green-2: #16A34A;
    --green-dim: rgba(34,197,94,0.12);
    --orange: #F59E0B;
    --orange-dim: rgba(245,158,11,0.12);
    --red: #EF4444;
    --red-dim: rgba(239,68,68,0.12);
    --blue-dim: rgba(37,99,235,0.12);
    --blue-border: rgba(37,99,235,0.25);
    --border: rgba(255,255,255,0.06);
    --border-2: rgba(255,255,255,0.1);
    --text: #F1F5F9;
    --text-2: #CBD5E1;
    --text-3: #94A3B8;
    --text-4: #64748B;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
    --radius: 12px;
    --radius-sm: 8px;
    --radius-xs: 5px;
    --shadow: 0 4px 24px rgba(0,0,0,0.3);
    --shadow-lg: 0 8px 48px rgba(0,0,0,0.4);
  }

  body { font-family: var(--font); background: var(--navy); color: var(--text); min-height: 100vh; }

  /* Layout */
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* Top bar */
  .topbar {
    position: sticky; top: 0; z-index: 200;
    background: rgba(15,23,42,0.92); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0 20px;
    display: flex; align-items: center; justify-content: space-between;
    height: 60px;
  }
  .topbar-logo { display: flex; align-items: center; gap: 10px; }
  .logo-mark {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    filter: drop-shadow(0 0 10px rgba(37,99,235,0.5));
    flex-shrink: 0;
  }
  .logo-name { font-size: 18px; font-weight: 800; letter-spacing: -0.5px; }
  .logo-name .bet { color: #ffffff; }
  .logo-name .iq { color: #3B82F6; }
  .topbar-right { display: flex; align-items: center; gap: 10px; }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, var(--electric), var(--green));
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; cursor: pointer;
  }
  .notif-btn {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--navy-2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; cursor: pointer; position: relative;
  }
  .notif-dot {
    position: absolute; top: 6px; right: 6px;
    width: 7px; height: 7px; background: var(--red); border-radius: 50%;
    border: 1.5px solid var(--navy);
  }

  /* Bottom nav */
  .bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
    background: rgba(17,24,39,0.97); backdrop-filter: blur(20px);
    border-top: 1px solid var(--border);
    display: flex; padding: 8px 8px 12px;
    gap: 4px;
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    gap: 3px; padding: 6px 4px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all 0.2s; border: none; background: transparent;
    color: var(--text-4); font-family: var(--font);
  }
  .nav-item.active { color: var(--electric-2); background: var(--blue-dim); }
  .nav-item:hover:not(.active) { color: var(--text-3); background: rgba(255,255,255,0.04); }
  .nav-icon { font-size: 19px; line-height: 1; }
  .nav-label { font-size: 10px; font-weight: 500; letter-spacing: 0.2px; white-space: nowrap; }

  /* Scrollable content */
  .content {
    flex: 1; overflow-y: auto; padding-bottom: 90px;
    scrollbar-width: thin; scrollbar-color: var(--navy-4) transparent;
  }

  /* ── HOME PAGE ── */
  .home-hero {
    padding: 20px 20px 0;
    background: linear-gradient(180deg, rgba(37,99,235,0.07) 0%, transparent 100%);
  }
  .hero-greeting { font-size: 13px; color: var(--text-3); font-weight: 400; margin-bottom: 4px; }
  .hero-title { font-size: 24px; font-weight: 700; letter-spacing: -0.6px; margin-bottom: 16px; }
  .hero-title span { color: var(--electric-2); }

  .stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 20px; }
  .stat-card {
    background: var(--navy-2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 14px;
  }
  .stat-num { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
  .stat-lbl { font-size: 11px; color: var(--text-3); margin-top: 2px; font-weight: 400; }

  /* Sport filters */
  .section-pad { padding: 16px 20px 0; }
  .section-title {
    font-size: 13px; font-weight: 600; color: var(--text-3);
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
  }
  .chips-scroll { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .chips-scroll::-webkit-scrollbar { display: none; }
  .chip {
    display: flex; align-items: center; gap: 5px; padding: 7px 14px;
    border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;
    white-space: nowrap; border: 1px solid var(--border); background: var(--navy-2);
    color: var(--text-3); transition: all 0.15s; font-family: var(--font);
  }
  .chip.active {
    background: var(--blue-dim); border-color: var(--blue-border); color: var(--electric-2);
  }
  .chip:hover:not(.active) { border-color: var(--border-2); color: var(--text-2); }

  /* Match card */
  .match-list { display: flex; flex-direction: column; gap: 10px; padding: 14px 20px 0; }
  .match-card {
    background: var(--navy-2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px; cursor: pointer;
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .match-card.featured { border-color: rgba(37,99,235,0.2); }
  .match-card:hover { border-color: var(--blue-border); background: var(--navy-3); transform: translateY(-1px); }
  .match-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .match-card:hover::before { opacity: 1; }

  .match-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .match-meta { display: flex; align-items: center; gap: 8px; }
  .competition-tag {
    font-size: 10px; font-weight: 600; color: var(--text-4);
    font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.5px;
  }
  .live-badge {
    display: flex; align-items: center; gap: 4px;
    background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
    color: #FC8181; border-radius: 4px; padding: 2px 7px;
    font-size: 10px; font-weight: 700; font-family: var(--mono);
  }
  .live-dot { width: 5px; height: 5px; background: var(--red); border-radius: 50%; animation: blink 1.2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .ai-score-badge {
    display: flex; align-items: center; gap: 4px;
    background: var(--blue-dim); border: 1px solid var(--blue-border);
    color: var(--electric-3); border-radius: 4px; padding: 2px 7px;
    font-size: 10px; font-weight: 700; font-family: var(--mono);
  }

  .match-teams { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .team { text-align: center; flex: 1; }
  .team-name { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }
  .team-flag { font-size: 18px; margin-bottom: 2px; }
  .match-vs {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 0 12px;
  }
  .match-score { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: var(--electric-2); }
  .match-time { font-size: 11px; color: var(--text-3); font-family: var(--mono); }

  .odds-row { display: flex; gap: 6px; margin-bottom: 12px; }
  .odd-btn {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 8px 4px; border-radius: var(--radius-sm);
    background: var(--navy-3); border: 1px solid var(--border);
    cursor: pointer; transition: all 0.15s; font-family: var(--font);
  }
  .odd-btn:hover { background: var(--blue-dim); border-color: var(--blue-border); }
  .odd-btn.selected { background: var(--electric); border-color: var(--electric); }
  .odd-label { font-size: 10px; color: var(--text-4); font-weight: 500; }
  .odd-value { font-size: 15px; font-weight: 700; color: var(--text); }
  .odd-btn.selected .odd-label, .odd-btn.selected .odd-value { color: white; }
  .odd-trend { font-size: 9px; font-family: var(--mono); }
  .trend-up { color: var(--green); }
  .trend-down { color: var(--red); }
  .trend-flat { color: var(--text-4); }

  .match-actions { display: flex; gap: 8px; }
  .btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: var(--font); white-space: nowrap; }
  .btn-ghost { background: var(--navy-3); border: 1px solid var(--border); color: var(--text-2); }
  .btn-ghost:hover { border-color: var(--blue-border); color: var(--electric-2); }
  .btn-primary { background: var(--electric); color: white; }
  .btn-primary:hover { background: var(--electric-2); transform: translateY(-1px); }
  .btn-green { background: var(--green-dim); border: 1px solid rgba(34,197,94,0.25); color: var(--green); }
  .btn-green:hover { background: rgba(34,197,94,0.2); }
  .btn-sm { padding: 6px 12px; font-size: 11px; }
  .btn-full { width: 100%; }
  .btn-outline { background: transparent; border: 1px solid var(--blue-border); color: var(--electric-2); }
  .btn-outline:hover { background: var(--blue-dim); }

  /* ── SIMULATION ── */
  .sim-container { padding: 20px; }
  .sim-title { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
  .sim-sub { font-size: 13px; color: var(--text-3); margin-bottom: 20px; }
  .form-card { background: var(--navy-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; margin-bottom: 12px; }
  .form-label { font-size: 11px; color: var(--text-3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; display: block; font-family: var(--mono); }
  .form-select {
    width: 100%; padding: 10px 14px; border-radius: var(--radius-sm);
    background: var(--navy-3); border: 1px solid var(--border);
    color: var(--text); font-size: 14px; font-family: var(--font);
    appearance: none; cursor: pointer; outline: none;
  }
  .form-select:focus { border-color: var(--blue-border); }
  .form-input {
    width: 100%; padding: 10px 14px; border-radius: var(--radius-sm);
    background: var(--navy-3); border: 1px solid var(--border);
    color: var(--text); font-size: 16px; font-family: var(--mono); font-weight: 600;
    outline: none;
  }
  .form-input:focus { border-color: var(--blue-border); }
  .form-input::placeholder { color: var(--text-4); }

  .market-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
  .market-btn {
    padding: 10px 8px; border-radius: var(--radius-sm); text-align: center;
    background: var(--navy-3); border: 1px solid var(--border);
    cursor: pointer; transition: all 0.15s; font-family: var(--font);
  }
  .market-btn.active { background: var(--blue-dim); border-color: var(--blue-border); }
  .market-label { font-size: 10px; color: var(--text-3); }
  .market-odd { font-size: 16px; font-weight: 700; color: var(--text); }
  .market-btn.active .market-odd { color: var(--electric-2); }

  .result-card {
    background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(34,197,94,0.06));
    border: 1px solid var(--blue-border); border-radius: var(--radius); padding: 20px; margin-top: 16px;
  }
  .result-title { font-size: 12px; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 16px; font-family: var(--mono); }
  .result-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .result-key { font-size: 13px; color: var(--text-3); }
  .result-val { font-size: 15px; font-weight: 700; }
  .result-gain { font-size: 26px; font-weight: 800; color: var(--green); letter-spacing: -0.8px; }

  .confidence-bar { height: 6px; background: var(--navy-4); border-radius: 3px; overflow: hidden; margin-top: 4px; }
  .confidence-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--electric), var(--green)); }

  /* ── ANALYSIS ── */
  .analysis-container { padding: 20px; }
  .kpi-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 20px; }
  .kpi-card { background: var(--navy-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
  .kpi-icon { font-size: 22px; margin-bottom: 8px; }
  .kpi-value { font-size: 24px; font-weight: 800; letter-spacing: -0.8px; }
  .kpi-label { font-size: 11px; color: var(--text-3); margin-top: 2px; }

  .chart-card { background: var(--navy-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 12px; }
  .mini-bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 60px; margin-top: 12px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .bar-fill { width: 100%; border-radius: 3px 3px 0 0; transition: height 0.5s ease; }
  .bar-lbl { font-size: 9px; color: var(--text-4); font-family: var(--mono); }

  .bet-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid var(--border);
  }
  .bet-row:last-child { border-bottom: none; }
  .bet-match { font-size: 13px; font-weight: 600; }
  .bet-market { font-size: 11px; color: var(--text-3); margin-top: 1px; }
  .bet-result { font-size: 14px; font-weight: 700; }
  .won { color: var(--green); }
  .lost { color: var(--red); }

  .ai-insight {
    background: linear-gradient(135deg, rgba(37,99,235,0.08), transparent);
    border: 1px solid var(--blue-border); border-radius: var(--radius); padding: 16px;
  }
  .ai-insight-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; margin-bottom: 8px; }
  .ai-insight p { font-size: 13px; color: var(--text-2); line-height: 1.65; }

  /* ── TOP BETS ── */
  .top-container { padding: 20px; }
  .cat-filters { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; margin-bottom: 16px; }
  .top-card {
    background: var(--navy-2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px; margin-bottom: 10px;
    transition: all 0.2s; cursor: default;
  }
  .top-card:hover { border-color: var(--blue-border); }
  .top-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .rank-num { font-family: var(--mono); font-size: 11px; color: var(--text-4); }
  .cat-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.5px; }
  .cat-value { background: rgba(245,158,11,0.12); color: var(--orange); border: 1px solid rgba(245,158,11,0.25); }
  .cat-live { background: var(--red-dim); color: #FC8181; border: 1px solid rgba(239,68,68,0.25); }
  .cat-popular { background: var(--blue-dim); color: var(--electric-2); border: 1px solid var(--blue-border); }
  .cat-low { background: var(--green-dim); color: var(--green); border: 1px solid rgba(34,197,94,0.25); }

  .top-match { font-size: 15px; font-weight: 700; margin-bottom: 2px; letter-spacing: -0.3px; }
  .top-market { font-size: 12px; color: var(--text-3); margin-bottom: 12px; }
  .top-metrics { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 12px; }
  .metric { text-align: center; }
  .metric-val { font-size: 16px; font-weight: 700; }
  .metric-lbl { font-size: 10px; color: var(--text-4); margin-top: 1px; font-family: var(--mono); }
  .risk-low { color: var(--green); }
  .risk-med { color: var(--orange); }
  .risk-high { color: var(--red); }

  .prob-bar { height: 4px; background: var(--navy-4); border-radius: 2px; overflow: hidden; margin-bottom: 12px; }
  .prob-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--electric), var(--electric-3)); }

  /* ── SETTINGS ── */
  .settings-container { padding: 20px; }
  .settings-profile {
    background: linear-gradient(135deg, var(--navy-2), var(--navy-3));
    border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; margin-bottom: 20px;
    display: flex; align-items: center; gap: 16px;
  }
  .profile-avatar {
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, var(--electric), var(--green));
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; font-weight: 700; flex-shrink: 0;
  }
  .profile-name { font-size: 18px; font-weight: 700; letter-spacing: -0.4px; }
  .profile-tag { font-size: 12px; color: var(--text-3); margin-top: 2px; }
  .profile-score { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
  .discipline-score {
    font-size: 13px; font-weight: 700; color: var(--green);
    background: var(--green-dim); border: 1px solid rgba(34,197,94,0.25);
    border-radius: 4px; padding: 2px 8px; font-family: var(--mono);
  }

  .settings-group { margin-bottom: 20px; }
  .settings-group-title { font-size: 11px; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px; font-family: var(--mono); padding: 0 4px; }
  .settings-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; background: var(--navy-2); border: 1px solid var(--border);
    margin-bottom: 2px; cursor: pointer; transition: background 0.15s;
  }
  .settings-row:first-of-type { border-radius: var(--radius) var(--radius) 0 0; }
  .settings-row:last-of-type { border-radius: 0 0 var(--radius) var(--radius); }
  .settings-row:only-of-type { border-radius: var(--radius); }
  .settings-row:hover { background: var(--navy-3); }
  .settings-row-left { display: flex; align-items: center; gap: 12px; }
  .settings-icon { font-size: 18px; width: 24px; text-align: center; }
  .settings-label { font-size: 14px; font-weight: 500; }
  .settings-value { font-size: 12px; color: var(--text-3); }

  .toggle {
    width: 40px; height: 22px; border-radius: 11px; cursor: pointer;
    transition: background 0.2s; position: relative; border: none; flex-shrink: 0;
  }
  .toggle.on { background: var(--electric); }
  .toggle.off { background: var(--navy-4); }
  .toggle-thumb {
    position: absolute; top: 3px; width: 16px; height: 16px;
    background: white; border-radius: 50%; transition: left 0.2s;
  }
  .toggle.on .toggle-thumb { left: 21px; }
  .toggle.off .toggle-thumb { left: 3px; }

  .bankroll-input-group { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .bankroll-input-group input {
    flex: 1; padding: 8px 12px; background: var(--navy-3);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    color: var(--text); font-size: 15px; font-family: var(--mono); font-weight: 700; outline: none;
  }

  /* Utility */
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .gap-8 { gap: 8px; }
  .mt-4 { margin-top: 4px; }
  .mt-8 { margin-top: 8px; }
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
  .text-green { color: var(--green); }
  .text-red { color: var(--red); }
  .text-electric { color: var(--electric-2); }
  .text-orange { color: var(--orange); }
  .text-muted { color: var(--text-3); }
  .text-sm { font-size: 12px; }
  .text-xs { font-size: 11px; font-family: var(--mono); }
  .font-mono { font-family: var(--mono); }
  .fw-700 { font-weight: 700; }

  .empty-state { text-align: center; padding: 40px 20px; color: var(--text-3); font-size: 14px; }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }

  /* Animations */
  @keyframes slideUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
  .animate-in { animation: slideUp 0.3s ease forwards; }

  /* scrollbar */
  .content::-webkit-scrollbar { width: 4px; }
  .content::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb { background: var(--navy-4); border-radius: 2px; }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Toggle({ value, onChange }) {
  return (
    <button className={`toggle ${value ? "on" : "off"}`} onClick={() => onChange(!value)}>
      <div className="toggle-thumb" />
    </button>
  );
}

function LiveBadge({ time }) {
  return (
    <span className="live-badge">
      <span className="live-dot" />
      LIVE {time}
    </span>
  );
}

function AiScoreBadge({ score }) {
  return <span className="ai-score-badge">🤖 {score}</span>;
}

function MatchCard({ match, onAnalyze, onSimulate }) {
  const [selectedOdd, setSelectedOdd] = useState(null);

  const trendClass = match.trend === "↑" ? "trend-up" : match.trend === "↓" ? "trend-down" : "trend-flat";

  return (
    <div className={`match-card animate-in ${match.featured ? "featured" : ""}`}>
      <div className="match-header">
        <div className="match-meta">
          <span className="competition-tag">{match.competition}</span>
          {match.live && <LiveBadge time={match.time} />}
        </div>
        <AiScoreBadge score={match.aiScore} />
      </div>

      <div className="match-teams">
        <div className="team">
          <div className="team-flag">{match.homeFlag}</div>
          <div className="team-name">{match.homeTeam}</div>
        </div>
        <div className="match-vs">
          {match.live
            ? <div className="match-score">{match.score}</div>
            : <div style={{ fontSize: 11, color: "var(--text-4)", fontFamily: "var(--mono)" }}>VS</div>
          }
          <div className="match-time">
            {match.live ? "" : match.time}
          </div>
        </div>
        <div className="team">
          <div className="team-flag">{match.awayFlag}</div>
          <div className="team-name">{match.awayTeam}</div>
        </div>
      </div>

      <div className="odds-row">
        <button className={`odd-btn ${selectedOdd === "home" ? "selected" : ""}`} onClick={() => setSelectedOdd(selectedOdd === "home" ? null : "home")}>
          <span className="odd-label">1</span>
          <span className="odd-value">{match.homeOdd}</span>
          <span className={`odd-trend ${trendClass}`}>{match.trend}</span>
        </button>
        {match.drawOdd && (
          <button className={`odd-btn ${selectedOdd === "draw" ? "selected" : ""}`} onClick={() => setSelectedOdd(selectedOdd === "draw" ? null : "draw")}>
            <span className="odd-label">N</span>
            <span className="odd-value">{match.drawOdd}</span>
            <span className="odd-trend trend-flat">→</span>
          </button>
        )}
        <button className={`odd-btn ${selectedOdd === "away" ? "selected" : ""}`} onClick={() => setSelectedOdd(selectedOdd === "away" ? null : "away")}>
          <span className="odd-label">2</span>
          <span className="odd-value">{match.awayOdd}</span>
          <span className="odd-trend trend-flat">→</span>
        </button>
      </div>

      <div className="match-actions">
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => onAnalyze(match)}>
          🔍 Analyser
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onSimulate(match)}>
          🎯 Simuler
        </button>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ onAnalyze, onSimulate }) {
  const [activeSport, setActiveSport] = useState("all");
  const [activeComp, setActiveComp] = useState("Toutes");
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const filtered = MATCHES.filter(m => {
    if (activeSport !== "all" && m.sport !== activeSport) return false;
    if (activeComp !== "Toutes" && m.competition !== activeComp) return false;
    if (showLiveOnly && !m.live) return false;
    return true;
  });

  const liveCount = MATCHES.filter(m => m.live).length;

  return (
    <div>
      <div className="home-hero">
        <p className="hero-greeting">Bonjour, Alex 👋</p>
        <h1 className="hero-title">Prêt à <span>analyser</span> ?</h1>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num text-electric">48</div>
            <div className="stat-lbl">Matchs aujourd'hui</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: "var(--red)" }}>{liveCount} <span style={{ fontSize: 12 }}>LIVE</span></div>
            <div className="stat-lbl">En ce moment</div>
          </div>
          <div className="stat-card">
            <div className="stat-num text-green">12</div>
            <div className="stat-lbl">Value bets</div>
          </div>
        </div>
      </div>

      {/* Sport filters */}
      <div className="section-pad">
        <div className="chips-scroll">
          {SPORTS.map(s => (
            <button key={s.id} className={`chip ${activeSport === s.id ? "active" : ""}`} onClick={() => setActiveSport(s.id)}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Competition + Live filters */}
      <div className="section-pad" style={{ paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, overflowX: "auto" }}>
            <div className="chips-scroll">
              {COMPETITIONS.map(c => (
                <button key={c} className={`chip ${activeComp === c ? "active" : ""}`} onClick={() => setActiveComp(c)} style={{ fontSize: 11 }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`chip ${showLiveOnly ? "active" : ""}`}
            onClick={() => setShowLiveOnly(!showLiveOnly)}
            style={{ flexShrink: 0, borderColor: showLiveOnly ? "rgba(239,68,68,0.4)" : undefined, color: showLiveOnly ? "var(--red)" : undefined, background: showLiveOnly ? "rgba(239,68,68,0.1)" : undefined }}
          >
            🔴 Live
          </button>
        </div>
      </div>

      {/* Featured label */}
      <div className="section-pad" style={{ paddingTop: 16 }}>
        <div className="section-title">⚡ Meilleurs matchs du jour</div>
      </div>

      <div className="match-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Aucun match pour cette sélection</p>
          </div>
        ) : (
          filtered.map(m => (
            <MatchCard key={m.id} match={m} onAnalyze={onAnalyze} onSimulate={onSimulate} />
          ))
        )}
      </div>
    </div>
  );
}

// ─── SIMULATION ───────────────────────────────────────────────────────────────
function SimulationPage({ preselectedMatch }) {
  const [matchId, setMatchId] = useState(preselectedMatch?.id || MATCHES[0].id);
  const [market, setMarket] = useState("home");
  const [stake, setStake] = useState("50");
  const [mode, setMode] = useState("single");

  const match = MATCHES.find(m => m.id === parseInt(matchId)) || MATCHES[0];

  const markets = [
    { key: "home", label: `1 — ${match.homeTeam}`, odd: match.homeOdd },
    match.drawOdd ? { key: "draw", label: "N — Nul", odd: match.drawOdd } : null,
    { key: "away", label: `2 — ${match.awayTeam}`, odd: match.awayOdd },
  ].filter(Boolean);

  const selectedOdd = markets.find(m => m.key === market)?.odd || 1;
  const stakeNum = parseFloat(stake) || 0;
  const gain = ((selectedOdd - 1) * stakeNum).toFixed(2);
  const totalReturn = (selectedOdd * stakeNum).toFixed(2);
  const impliedProb = ((1 / selectedOdd) * 100).toFixed(1);
  const confidence = Math.max(20, Math.min(95, match.aiScore - (selectedOdd > 3 ? 20 : 0)));

  const riskLevel = selectedOdd < 1.8 ? "Faible" : selectedOdd < 2.5 ? "Moyen" : "Élevé";
  const riskColor = selectedOdd < 1.8 ? "var(--green)" : selectedOdd < 2.5 ? "var(--orange)" : "var(--red)";

  return (
    <div className="sim-container animate-in">
      <h2 className="sim-title">Simuler un pari</h2>
      <p className="sim-sub">Sans miser d'argent réel — analyse et pratique</p>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["single", "combi"].map(m => (
          <button key={m} className={`btn ${mode === m ? "btn-primary" : "btn-ghost"}`} style={{ flex: 1 }}
            onClick={() => setMode(m)}>
            {m === "single" ? "🎯 Simple" : "🔗 Combiné"}
          </button>
        ))}
      </div>

      {/* Match selector */}
      <div className="form-card">
        <label className="form-label">Match</label>
        <select className="form-select" value={matchId} onChange={e => { setMatchId(e.target.value); setMarket("home"); }}>
          {MATCHES.map(m => (
            <option key={m.id} value={m.id}>
              {m.live ? "🔴 " : ""}{m.homeTeam} vs {m.awayTeam} ({m.competition})
            </option>
          ))}
        </select>
      </div>

      {/* Market selector */}
      <div className="form-card">
        <label className="form-label">Type de pari</label>
        <div className="market-grid">
          {markets.map(mk => (
            <button key={mk.key} className={`market-btn ${market === mk.key ? "active" : ""}`} onClick={() => setMarket(mk.key)}>
              <div className="market-label">{mk.label}</div>
              <div className="market-odd">{mk.odd}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stake */}
      <div className="form-card">
        <label className="form-label">Mise fictive (€)</label>
        <input
          className="form-input"
          type="number"
          value={stake}
          onChange={e => setStake(e.target.value)}
          placeholder="50"
          min="1"
        />
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {[10, 25, 50, 100].map(v => (
            <button key={v} className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setStake(String(v))}>
              {v}€
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {stakeNum > 0 && (
        <div className="result-card animate-in">
          <div className="result-title">📊 Résumé du ticket simulé</div>

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 4 }}>Gain potentiel net</div>
            <div className="result-gain">+{gain} €</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Retour total : {totalReturn} €</div>
          </div>

          <div className="divider" />

          <div className="result-row">
            <span className="result-key">Mise</span>
            <span className="result-val">{stakeNum} €</span>
          </div>
          <div className="result-row">
            <span className="result-key">Cote</span>
            <span className="result-val text-electric">{selectedOdd}</span>
          </div>
          <div className="result-row">
            <span className="result-key">Probabilité implicite</span>
            <span className="result-val">{impliedProb}%</span>
          </div>
          <div className="result-row">
            <span className="result-key">Niveau de risque</span>
            <span className="result-val" style={{ color: riskColor }}>{riskLevel}</span>
          </div>

          <div style={{ marginTop: 12 }}>
            <div className="flex-between" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>Score de confiance IA</span>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--mono)", color: "var(--electric-2)" }}>{confidence}/100</span>
            </div>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{ width: `${confidence}%` }} />
            </div>
          </div>

          <div className="divider" />

          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 12, fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>
            🤖 <strong>Analyse IA :</strong> {match.homeTeam} présente une {selectedOdd < 2 ? "bonne" : "risquée"} valeur sur ce marché. La cote {selectedOdd < 1.8 ? "reflète bien la probabilité" : "suggère une surprise possible"}. Forme récente favorable.
          </div>

          <button className="btn btn-primary btn-full mt-12">
            Sauvegarder dans l'historique
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ANALYSIS ─────────────────────────────────────────────────────────────────
function AnalysisPage() {
  const totalStake = BET_HISTORY.reduce((a, b) => a + b.stake, 0);
  const totalGain = BET_HISTORY.reduce((a, b) => a + (b.result === "won" ? b.gain : b.gain), 0);
  const wins = BET_HISTORY.filter(b => b.result === "won").length;
  const roi = ((totalGain / totalStake) * 100).toFixed(1);
  const winRate = ((wins / BET_HISTORY.length) * 100).toFixed(0);

  const barData = [
    { lbl: "Lun", won: 40, lost: 0 },
    { lbl: "Mar", won: 0, lost: 30 },
    { lbl: "Mer", won: 16, lost: 0 },
    { lbl: "Jeu", won: 0, lost: 40 },
    { lbl: "Ven", won: 72, lost: 0 },
    { lbl: "Sam", won: 33, lost: 0 },
    { lbl: "Auj", won: 0, lost: 0 },
  ];
  const maxBar = 80;

  return (
    <div className="analysis-container animate-in">
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>Mes Performances</h2>
      <p className="text-muted text-sm" style={{ marginBottom: 20 }}>7 derniers jours · 6 paris</p>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">📈</div>
          <div className="kpi-value" style={{ color: totalGain >= 0 ? "var(--green)" : "var(--red)" }}>
            {totalGain >= 0 ? "+" : ""}{totalGain.toFixed(0)}€
          </div>
          <div className="kpi-label">P&L net</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon">🎯</div>
          <div className="kpi-value text-electric">{winRate}%</div>
          <div className="kpi-label">Taux réussite</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon">💰</div>
          <div className="kpi-value" style={{ color: parseFloat(roi) >= 0 ? "var(--green)" : "var(--red)" }}>
            {roi}%
          </div>
          <div className="kpi-label">ROI</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon">🏅</div>
          <div className="kpi-value text-orange">74</div>
          <div className="kpi-label">Score discipline</div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-card">
        <div className="flex-between">
          <span style={{ fontSize: 13, fontWeight: 600 }}>P&L par jour</span>
          <span className="text-xs text-muted">7 jours</span>
        </div>
        <div className="mini-bar-chart">
          {barData.map((d, i) => (
            <div key={i} className="bar-col">
              <div
                className="bar-fill"
                style={{
                  height: `${Math.max(2, ((d.won || d.lost) / maxBar) * 50)}px`,
                  background: d.won > 0 ? "var(--green)" : d.lost > 0 ? "var(--red)" : "var(--navy-4)"
                }}
              />
              <span className="bar-lbl">{d.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sports performance */}
      <div className="chart-card">
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Sports les plus rentables</div>
        {[
          { sport: "⚽ Football", roi: "+22.4%", bets: 3 },
          { sport: "🎾 Tennis", roi: "+18.1%", bets: 2 },
          { sport: "🏀 Basketball", roi: "-12.5%", bets: 1 },
        ].map((s, i) => (
          <div key={i} className="flex-between" style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontSize: 13 }}>{s.sport}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="text-xs text-muted">{s.bets} paris</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.roi.startsWith("+") ? "var(--green)" : "var(--red)", fontFamily: "var(--mono)" }}>{s.roi}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="ai-insight" style={{ marginBottom: 16 }}>
        <div className="ai-insight-title">
          <span>🤖</span>
          <span>Analyse IA — Pourquoi tu gagnes ?</span>
        </div>
        <p>Tu es plus performant sur les matchs de football en tant que favori (cote {'<'} 2.0). Ton ROI sur ce segment est de +31%. En revanche, tu tends à surestimer les équipes NBA en déplacement — 0/3 sur ce segment.</p>
      </div>

      {/* History */}
      <div className="chart-card">
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Historique des paris</div>
        {BET_HISTORY.map(b => (
          <div key={b.id} className="bet-row">
            <div>
              <div className="bet-match">{b.match}</div>
              <div className="bet-market">{b.market} · @{b.odd} · {b.stake}€</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className={`bet-result ${b.result}`}>
                {b.result === "won" ? "+" : ""}{b.gain}€
              </div>
              <div className="text-xs text-muted">{b.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Error detection */}
      <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--radius)", padding: 16 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, fontSize: 13, fontWeight: 700, color: "var(--orange)" }}>
          ⚠️ Erreurs récurrentes détectées
        </div>
        <ul style={{ paddingLeft: 16, color: "var(--text-2)", fontSize: 13, lineHeight: 1.8 }}>
          <li>Tendance à parier après une perte (loss chasing × 2)</li>
          <li>Mises trop élevées sur cotes {'>'} 2.5</li>
          <li>Sous-performance sur les paris NBA</li>
        </ul>
      </div>
    </div>
  );
}

// ─── TOP BETS ─────────────────────────────────────────────────────────────────
function TopBetsPage({ onSimulate }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [
    { id: "all", label: "Tous", icon: "🔥" },
    { id: "value", label: "Value", icon: "💎" },
    { id: "live", label: "Live", icon: "🔴" },
    { id: "popular", label: "Populaires", icon: "⭐" },
    { id: "low", label: "Faible risque", icon: "🛡️" },
  ];

  const filtered = TOP_BETS.filter(b => activeCategory === "all" || b.category === activeCategory);

  const riskColor = r => r === "low" ? "risk-low" : r === "medium" ? "risk-med" : "risk-high";
  const riskLabel = r => r === "low" ? "Faible" : r === "medium" ? "Moyen" : "Élevé";
  const catClass = c => `cat-${c === "low" ? "low" : c}`;

  return (
    <div className="top-container animate-in">
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>Top Paris</h2>
      <p className="text-muted text-sm" style={{ marginBottom: 16 }}>Sélectionnés par l'IA · mis à jour toutes les 5 min</p>

      <div className="cat-filters">
        {categories.map(c => (
          <button key={c.id} className={`chip ${activeCategory === c.id ? "active" : ""}`} onClick={() => setActiveCategory(c.id)}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {filtered.map((bet, i) => (
        <div key={bet.id} className="top-card animate-in" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="top-card-header">
            <span className="rank-num">#{i + 1}</span>
            <span className={`cat-badge ${catClass(bet.category)}`}>
              {bet.category === "value" ? "💎 VALUE" : bet.category === "live" ? "🔴 LIVE" : bet.category === "popular" ? "⭐ TOP" : "🛡️ SAFE"}
            </span>
          </div>

          <div className="top-match">{bet.match}</div>
          <div className="top-market">{bet.market} · via {bet.bookmaker}</div>

          <div className="top-metrics">
            <div className="metric">
              <div className="metric-val text-electric">{bet.odd}</div>
              <div className="metric-lbl">Cote</div>
            </div>
            <div className="metric">
              <div className={`metric-val ${riskColor(bet.risk)}`}>{riskLabel(bet.risk)}</div>
              <div className="metric-lbl">Risque</div>
            </div>
            <div className="metric">
              <div className="metric-val">{bet.probability}%</div>
              <div className="metric-lbl">Prob. estimée</div>
            </div>
            <div className="metric">
              <div className="metric-val text-orange">{bet.aiScore}</div>
              <div className="metric-lbl">Score IA</div>
            </div>
          </div>

          <div style={{ marginBottom: 4 }}>
            <div className="flex-between" style={{ marginBottom: 4 }}>
              <span className="text-xs text-muted">Probabilité IA</span>
              <span className="text-xs" style={{ color: "var(--electric-2)", fontFamily: "var(--mono)" }}>{bet.probability}%</span>
            </div>
            <div className="prob-bar">
              <div className="prob-fill" style={{ width: `${bet.probability}%` }} />
            </div>
          </div>

          <div className="match-actions">
            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>🔍 Analyser</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => onSimulate(MATCHES.find(m => m.homeTeam === bet.match.split(" vs ")[0]) || MATCHES[0])}>
              🎯 Simuler
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [valueBetAlerts, setValueBetAlerts] = useState(true);
  const [liveAlerts, setLiveAlerts] = useState(false);
  const [bankroll, setBankroll] = useState("500");
  const [riskLevel, setRiskLevel] = useState("medium");

  return (
    <div className="settings-container animate-in">
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, marginBottom: 16 }}>Réglages</h2>

      {/* Profile */}
      <div className="settings-profile">
        <div className="profile-avatar">A</div>
        <div style={{ flex: 1 }}>
          <div className="profile-name">Alex Martin</div>
          <div className="profile-tag">alex@betcopilot.app · Pro</div>
          <div className="profile-score">
            <span className="discipline-score">🏅 74 / 100</span>
            <span style={{ fontSize: 11, color: "var(--text-3)" }}>Score discipline</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm">Éditer</button>
      </div>

      {/* Bankroll */}
      <div className="settings-group">
        <div className="settings-group-title">Bankroll</div>
        <div className="form-card" style={{ borderRadius: "var(--radius)", background: "var(--navy-2)", border: "1px solid var(--border)", padding: 16, marginBottom: 2 }}>
          <label className="form-label">Bankroll totale (€)</label>
          <div className="bankroll-input-group">
            <input value={bankroll} onChange={e => setBankroll(e.target.value)} type="number" />
            <button className="btn btn-primary btn-sm">Mettre à jour</button>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            {["flat", "kelly", "fractional"].map(s => (
              <button key={s} className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 10 }}>
                {s === "flat" ? "Flat" : s === "kelly" ? "Kelly" : "Fraction."}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Risk level */}
      <div className="settings-group">
        <div className="settings-group-title">Niveau de risque préféré</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["low", "medium", "high"].map(r => (
            <button key={r} className={`btn ${riskLevel === r ? "btn-primary" : "btn-ghost"}`} style={{ flex: 1 }}
              onClick={() => setRiskLevel(r)}>
              {r === "low" ? "🛡️ Faible" : r === "medium" ? "⚖️ Moyen" : "🔥 Élevé"}
            </button>
          ))}
        </div>
      </div>

      {/* Sports favoris */}
      <div className="settings-group">
        <div className="settings-group-title">Sports favoris</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SPORTS.filter(s => s.id !== "all").map(s => (
            <button key={s.id} className="chip active" style={{ fontSize: 12 }}>{s.icon} {s.label}</button>
          ))}
        </div>
      </div>

      {/* Bookmakers */}
      <div className="settings-group">
        <div className="settings-group-title">Bookmakers préférés</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Betclic", "Winamax", "Unibet", "Bwin"].map(b => (
            <button key={b} className="chip active" style={{ fontSize: 12 }}>🏷️ {b}</button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-group">
        <div className="settings-group-title">Notifications</div>
        <div className="settings-row" onClick={() => setNotifs(!notifs)}>
          <div className="settings-row-left">
            <span className="settings-icon">🔔</span>
            <span className="settings-label">Notifications push</span>
          </div>
          <Toggle value={notifs} onChange={setNotifs} />
        </div>
        <div className="settings-row" onClick={() => setValueBetAlerts(!valueBetAlerts)}>
          <div className="settings-row-left">
            <span className="settings-icon">💎</span>
            <span className="settings-label">Alertes value bets</span>
          </div>
          <Toggle value={valueBetAlerts} onChange={setValueBetAlerts} />
        </div>
        <div className="settings-row" onClick={() => setLiveAlerts(!liveAlerts)}>
          <div className="settings-row-left">
            <span className="settings-icon">🔴</span>
            <span className="settings-label">Alertes paris live</span>
          </div>
          <Toggle value={liveAlerts} onChange={setLiveAlerts} />
        </div>
      </div>

      {/* Apparence */}
      <div className="settings-group">
        <div className="settings-group-title">Apparence</div>
        <div className="settings-row" onClick={() => setDarkMode(!darkMode)}>
          <div className="settings-row-left">
            <span className="settings-icon">🌙</span>
            <span className="settings-label">Mode sombre</span>
          </div>
          <Toggle value={darkMode} onChange={setDarkMode} />
        </div>
        <div className="settings-row">
          <div className="settings-row-left">
            <span className="settings-icon">🌐</span>
            <span className="settings-label">Langue</span>
          </div>
          <span className="settings-value">Français ›</span>
        </div>
      </div>

      {/* Compte */}
      <div className="settings-group">
        <div className="settings-group-title">Compte & Sécurité</div>
        <div className="settings-row">
          <div className="settings-row-left">
            <span className="settings-icon">🔐</span>
            <span className="settings-label">Authentification 2FA</span>
          </div>
          <span className="settings-value text-green">Activé ›</span>
        </div>
        <div className="settings-row">
          <div className="settings-row-left">
            <span className="settings-icon">📋</span>
            <span className="settings-label">Exporter mes données</span>
          </div>
          <span className="settings-value">›</span>
        </div>
        <div className="settings-row">
          <div className="settings-row-left">
            <span className="settings-icon">💳</span>
            <span className="settings-label">Abonnement Pro</span>
          </div>
          <span className="settings-value text-electric">Actif ›</span>
        </div>
      </div>

      {/* Legal */}
      <div style={{ textAlign: "center", padding: "16px 0 8px", fontSize: 11, color: "var(--text-4)", lineHeight: 1.8, fontFamily: "var(--mono)" }}>
        BetIQ v1.0.0 · Outil d'analyse uniquement<br />
        <span style={{ color: "var(--orange)" }}>⚠️ Jouer comporte des risques. Jouez responsable.</span><br />
        Joueurs Info Service : 09 74 75 13 13 · +18
      </div>
    </div>
  );
}


const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Accueil" },
  { id: "simulation", icon: "🎯", label: "Simuler" },
  { id: "analysis", icon: "📊", label: "Analyse" },
  { id: "top", icon: "🔥", label: "Top Paris" },
  { id: "settings", icon: "⚙️", label: "Réglages" },
];

export default function MainApp({ userProfile }) {
  const [page, setPage] = useState("home");
  const [simulationMatch, setSimulationMatch] = useState(null);
  const contentRef = useRef(null);

  const navigate = (newPage) => {
    setPage(newPage);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const handleAnalyze = (match) => {
    alert(`🔍 Analyse IA pour : ${match.homeTeam} vs ${match.awayTeam}\n\n📊 Score IA : ${match.aiScore}/100\n⚽ Compétition : ${match.competition}\n💡 Ce match présente une valeur ${match.aiScore > 80 ? "élevée" : "modérée"} selon notre modèle.`);
  };

  const handleSimulate = (match) => {
    setSimulationMatch(match);
    navigate("simulation");
  };

  const userName = userProfile?.name || 'Alex';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div className="topbar-logo">
            <div className="logo-mark">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 0 10px rgba(37,99,235,0.5))' }}>
                <path d="M5 3h16c4 0 6.5 1.8 7.5 4.5.8 2.2.4 4.5-1.2 6.2 2.2 1.4 3.3 3.6 2.8 6.3-.8 3.6-4 5.5-8.5 5.5H5V3z" fill="url(#lg1)"/>
                <path d="M9.5 8.5h9.5c1.5 0 2.5.9 2.5 2.2s-1 2.2-2.5 2.2H9.5V8.5z" fill="#0C1829"/>
                <path d="M9.5 17.5h10c2 0 3.2 1.1 3.2 2.8s-1.2 2.7-3.2 2.7H9.5v-5.5z" fill="#0C1829"/>
                <rect x="11" y="18.5" width="2.2" height="3.5" rx="0.5" fill="url(#tl1)"/>
                <rect x="14.2" y="16.8" width="2.2" height="5.2" rx="0.5" fill="url(#tl1)"/>
                <rect x="17.4" y="15" width="2.2" height="7" rx="0.5" fill="url(#tl1)"/>
                <path d="M13 13 L28 5.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M23.5 4 L29 5.5 L27.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <defs>
                  <linearGradient id="lg1" x1="5" y1="3" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2563EB"/><stop offset="60%" stopColor="#1D4ED8"/><stop offset="100%" stopColor="#06B6D4"/>
                  </linearGradient>
                  <linearGradient id="tl1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#22D3EE"/><stop offset="100%" stopColor="#0891B2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-name"><span className="bet">Bet</span><span className="iq">IQ</span></div>
          </div>
          <div className="topbar-right">
            <div className="notif-btn">🔔<div className="notif-dot" /></div>
            <div className="avatar">{userInitial}</div>
          </div>
        </div>

        <div className="content" ref={contentRef}>
          {page === "home"       && <HomePage onAnalyze={handleAnalyze} onSimulate={handleSimulate} userName={userName} />}
          {page === "simulation" && <SimulationPage preselectedMatch={simulationMatch} />}
          {page === "analysis"   && <AnalysisPage />}
          {page === "top"        && <TopBetsPage onSimulate={handleSimulate} />}
          {page === "settings"   && <SettingsPage userProfile={userProfile} />}
        </div>

        <div className="bottom-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

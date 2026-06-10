'use client';

import { useState, useEffect, useRef } from 'react';
import BetIQLogo from '@/components/shared/BetIQLogo';
import { QUESTIONS, PLANS, PROGRAMS } from '@/lib/data';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:       #080E1C;
    --navy-1:     #0D1526;
    --navy-2:     #111E35;
    --navy-3:     #182540;
    --navy-4:     #1E2D4A;
    --navy-5:     #2A3D5E;
    --electric:   #2563EB;
    --electric-2: #3B82F6;
    --electric-3: #60A5FA;
    --cyan:       #06B6D4;
    --cyan-2:     #22D3EE;
    --green:      #22C55E;
    --green-dim:  rgba(34,197,94,0.12);
    --orange:     #F59E0B;
    --red:        #EF4444;
    --gold:       #F59E0B;
    --purple:     #818CF8;
    --border:     rgba(255,255,255,0.07);
    --border-2:   rgba(255,255,255,0.13);
    --text:       #F0F6FF;
    --text-2:     #C8D8F0;
    --text-3:     #8AA0C0;
    --text-4:     #506080;
    --font:       'Outfit', sans-serif;
    --mono:       'DM Mono', monospace;
    --r:          16px;
    --r-sm:       10px;
    --r-xs:       6px;
  }

  html, body { height: 100%; }
  body {
    font-family: var(--font); background: var(--navy);
    color: var(--text); min-height: 100vh; overflow: hidden;
  }

  /* ── ROOT CONTAINER ── */
  .root {
    width: 100%; max-width: 430px; margin: 0 auto;
    height: 100vh; display: flex; flex-direction: column;
    position: relative; overflow: hidden;
    background: var(--navy-1);
  }

  /* Ambient glow backgrounds */
  .glow-top {
    position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
    width: 340px; height: 340px; border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .glow-bottom {
    position: absolute; bottom: -80px; right: -60px;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .glow-mid {
    position: absolute; top: 40%; left: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  /* Grid texture */
  .grid-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  /* ── SCREEN WRAPPER ── */
  .screen {
    position: absolute; inset: 0; z-index: 1;
    display: flex; flex-direction: column;
    padding: 0; overflow-y: auto; overflow-x: hidden;
    scrollbar-width: none;
  }
  .screen::-webkit-scrollbar { display: none; }

  /* ── PROGRESS BAR ── */
  .progress-bar {
    position: absolute; top: 0; left: 0; right: 0; z-index: 50;
    height: 3px; background: var(--navy-3);
  }
  .progress-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, var(--electric), var(--cyan));
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── BACK BUTTON ── */
  .back-btn {
    position: absolute; top: 18px; left: 20px; z-index: 50;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--navy-3); border: 1px solid var(--border-2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.15s;
    font-family: var(--font); color: var(--text-3);
  }
  .back-btn:hover { background: var(--navy-4); color: var(--text); }

  /* ── STEP COUNTER ── */
  .step-counter {
    position: absolute; top: 22px; right: 20px; z-index: 50;
    font-size: 11px; font-weight: 600; color: var(--text-4);
    font-family: var(--mono); letter-spacing: 0.5px;
  }

  /* ── TRANSITIONS ── */
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes barGrow {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0.3; }
  }

  .anim-slide  { animation: slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both; }
  .anim-up     { animation: slideInUp 0.4s cubic-bezier(0.4,0,0.2,1) both; }
  .anim-fade   { animation: fadeIn 0.4s ease both; }
  .anim-scale  { animation: scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
  .anim-float  { animation: float 3s ease-in-out infinite; }

  .delay-1 { animation-delay: 0.05s; }
  .delay-2 { animation-delay: 0.1s; }
  .delay-3 { animation-delay: 0.15s; }
  .delay-4 { animation-delay: 0.2s; }
  .delay-5 { animation-delay: 0.25s; }
  .delay-6 { animation-delay: 0.3s; }
  .delay-7 { animation-delay: 0.35s; }
  .delay-8 { animation-delay: 0.4s; }

  /* ── TYPOGRAPHY ── */
  .title-xl  { font-size: 32px; font-weight: 800; letter-spacing: -1px; line-height: 1.1; }
  .title-lg  { font-size: 26px; font-weight: 800; letter-spacing: -0.7px; line-height: 1.15; }
  .title-md  { font-size: 20px; font-weight: 700; letter-spacing: -0.4px; }
  .title-sm  { font-size: 16px; font-weight: 700; }
  .body      { font-size: 15px; font-weight: 400; line-height: 1.6; color: var(--text-2); }
  .body-sm   { font-size: 13px; font-weight: 400; line-height: 1.6; color: var(--text-3); }
  .label     { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--text-4); font-family: var(--mono); }

  .text-blue  { color: var(--electric-2); }
  .text-cyan  { color: var(--cyan-2); }
  .text-green { color: var(--green); }
  .text-gold  { color: var(--gold); }
  .text-muted { color: var(--text-3); }
  .grad-text {
    background: linear-gradient(135deg, var(--electric-2), var(--cyan-2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── BUTTONS ── */
  .btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 20px; border-radius: var(--r-sm); font-size: 15px; font-weight: 700;
    cursor: pointer; border: none; transition: all 0.18s; font-family: var(--font);
    letter-spacing: -0.2px; white-space: nowrap;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--electric), #1D4ED8);
    color: white; box-shadow: 0 4px 24px rgba(37,99,235,0.35);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 30px rgba(37,99,235,0.5); }
  .btn-primary:active { transform: translateY(0); }
  .btn-outline {
    background: transparent; color: var(--text);
    border: 1.5px solid var(--border-2);
  }
  .btn-outline:hover { border-color: var(--electric-2); color: var(--electric-2); background: rgba(37,99,235,0.05); }
  .btn-ghost {
    background: var(--navy-3); border: 1px solid var(--border); color: var(--text-2);
  }
  .btn-ghost:hover { background: var(--navy-4); border-color: var(--border-2); }
  .btn-social {
    background: var(--navy-3); border: 1.5px solid var(--border-2); color: var(--text);
  }
  .btn-social:hover { background: var(--navy-4); border-color: var(--border-2); }
  .btn-full { width: 100%; }
  .btn-lg { padding: 16px 24px; font-size: 16px; border-radius: 12px; }
  .btn-sm { padding: 9px 16px; font-size: 13px; border-radius: 8px; }

  .btn-gold {
    background: linear-gradient(135deg, #D97706, #F59E0B, #FCD34D);
    color: #1a0a00; box-shadow: 0 4px 24px rgba(245,158,11,0.3);
  }
  .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 30px rgba(245,158,11,0.45); }

  /* ── INPUT ── */
  .input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .input-label { font-size: 12px; font-weight: 600; color: var(--text-3); letter-spacing: 0.3px; }
  .input {
    padding: 13px 16px; border-radius: var(--r-sm);
    background: var(--navy-3); border: 1.5px solid var(--border);
    color: var(--text); font-size: 15px; font-family: var(--font); outline: none;
    transition: all 0.15s;
  }
  .input:focus { border-color: var(--electric-2); background: var(--navy-4); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
  .input::placeholder { color: var(--text-4); }
  .input-icon { position: relative; }
  .input-icon input { padding-left: 42px; }
  .input-icon .icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; }

  /* ── CHECKBOX ── */
  .checkbox-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; cursor: pointer; }
  .checkbox-box {
    width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0; margin-top: 1px;
    border: 1.5px solid var(--border-2); background: var(--navy-3);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; cursor: pointer;
  }
  .checkbox-box.checked { background: var(--electric); border-color: var(--electric); }
  .checkbox-text { font-size: 13px; color: var(--text-2); line-height: 1.5; }
  .checkbox-text a { color: var(--electric-2); text-decoration: none; }

  /* ── CHOICE CARDS ── */
  .choice-grid { display: grid; gap: 10px; }
  .choice-grid-2 { grid-template-columns: 1fr 1fr; }
  .choice-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .choice-grid-1 { grid-template-columns: 1fr; }

  .choice-card {
    padding: 14px 16px; border-radius: var(--r-sm);
    background: var(--navy-3); border: 1.5px solid var(--border);
    cursor: pointer; transition: all 0.18s; text-align: left;
    font-family: var(--font); position: relative; overflow: hidden;
  }
  .choice-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(37,99,235,0.06), transparent);
    opacity: 0; transition: opacity 0.18s;
  }
  .choice-card:hover { border-color: var(--border-2); background: var(--navy-4); }
  .choice-card.selected {
    background: rgba(37,99,235,0.12); border-color: var(--electric-2);
  }
  .choice-card.selected::after { opacity: 1; }
  .choice-icon { font-size: 22px; margin-bottom: 6px; display: block; }
  .choice-label { font-size: 14px; font-weight: 600; color: var(--text); }
  .choice-sub { font-size: 11px; color: var(--text-3); margin-top: 2px; }
  .choice-check {
    position: absolute; top: 10px; right: 10px;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--electric); display: flex; align-items: center; justify-content: center;
    font-size: 10px; opacity: 0; transform: scale(0); transition: all 0.2s;
  }
  .choice-card.selected .choice-check { opacity: 1; transform: scale(1); }

  /* Pill choices */
  .pill-grid { display: flex; flex-wrap: wrap; gap: 9px; }
  .pill {
    padding: 9px 16px; border-radius: 24px;
    background: var(--navy-3); border: 1.5px solid var(--border);
    font-size: 13px; font-weight: 600; color: var(--text-2); cursor: pointer;
    transition: all 0.15s; font-family: var(--font); display: flex; align-items: center; gap: 6px;
  }
  .pill:hover { border-color: var(--border-2); color: var(--text); }
  .pill.selected { background: rgba(37,99,235,0.14); border-color: var(--electric-2); color: var(--electric-2); }

  /* ── DIVIDER ── */
  .divider-text {
    display: flex; align-items: center; gap: 12px; margin: 16px 0;
    font-size: 12px; color: var(--text-4); font-weight: 500;
  }
  .divider-text::before, .divider-text::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  /* ── PLAN CARDS ── */
  .plan-card {
    background: var(--navy-2); border: 1.5px solid var(--border);
    border-radius: var(--r); padding: 22px; position: relative; overflow: hidden;
    cursor: pointer; transition: all 0.2s;
  }
  .plan-card:hover { border-color: var(--border-2); }
  .plan-card.selected-plan { border-color: var(--electric-2); background: rgba(37,99,235,0.07); }
  .plan-card.popular { border-color: var(--electric); }
  .plan-popular-badge {
    position: absolute; top: 14px; right: 14px;
    background: linear-gradient(135deg, var(--electric), var(--cyan));
    color: white; font-size: 10px; font-weight: 800; padding: 3px 10px;
    border-radius: 20px; letter-spacing: 0.5px; font-family: var(--mono);
    text-transform: uppercase;
  }
  .plan-elite-badge {
    position: absolute; top: 14px; right: 14px;
    background: linear-gradient(135deg, #D97706, #F59E0B);
    color: white; font-size: 10px; font-weight: 800; padding: 3px 10px;
    border-radius: 20px; letter-spacing: 0.5px; font-family: var(--mono);
  }
  .plan-name { font-size: 18px; font-weight: 800; margin-bottom: 4px; letter-spacing: -0.4px; }
  .plan-price { font-size: 30px; font-weight: 900; letter-spacing: -1px; margin-bottom: 2px; }
  .plan-price span { font-size: 14px; font-weight: 500; color: var(--text-3); letter-spacing: 0; }
  .plan-period { font-size: 12px; color: var(--text-3); margin-bottom: 16px; }
  .plan-features { display: flex; flex-direction: column; gap: 8px; }
  .plan-feature { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 500; }
  .plan-feature .check { font-size: 12px; }
  .plan-select-indicator {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--electric), var(--cyan));
    opacity: 0; transition: opacity 0.2s;
  }
  .plan-card.selected-plan .plan-select-indicator { opacity: 1; }

  /* ── LOADING SCREEN ── */
  .loading-ring {
    width: 80px; height: 80px; border-radius: 50%; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .loading-ring::before {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--electric-2);
    border-right-color: var(--cyan-2);
    animation: spin 0.9s linear infinite;
  }
  .loading-step {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid var(--border);
  }
  .loading-step:last-child { border-bottom: none; }
  .loading-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    background: var(--navy-5);
  }
  .loading-dot.done { background: var(--green); box-shadow: 0 0 8px rgba(34,197,94,0.5); }
  .loading-dot.active { background: var(--electric-2); animation: blink 0.8s infinite; }
  .loading-step-text { font-size: 14px; font-weight: 500; transition: color 0.3s; }

  /* ── FEATURE CARDS ── */
  .feature-slide {
    text-align: center; padding: 0 8px;
  }
  .feature-icon-wrap {
    width: 80px; height: 80px; border-radius: 24px; margin: 0 auto 20px;
    display: flex; align-items: center; justify-content: center; font-size: 36px;
    position: relative;
  }
  .feature-icon-wrap::before {
    content: ''; position: absolute; inset: 0; border-radius: 24px; opacity: 0.15;
  }

  /* ── PROFILE RESULT ── */
  .profile-badge {
    background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.1));
    border: 1px solid rgba(37,99,235,0.3); border-radius: var(--r);
    padding: 20px; margin-bottom: 16px;
  }
  .profile-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, var(--electric), var(--cyan));
    color: white; font-size: 13px; font-weight: 800; padding: 5px 14px;
    border-radius: 20px; margin-bottom: 12px; letter-spacing: -0.2px;
  }
  .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .profile-item {
    background: var(--navy-3); border: 1px solid var(--border);
    border-radius: var(--r-sm); padding: 12px;
  }
  .profile-item-label { font-size: 10px; color: var(--text-4); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; }
  .profile-item-value { font-size: 14px; font-weight: 700; color: var(--text); }

  /* ── COMPLETION ── */
  .completion-circle {
    width: 120px; height: 120px; border-radius: 50%;
    background: linear-gradient(135deg, var(--electric), var(--cyan));
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px; font-size: 50px;
    box-shadow: 0 0 60px rgba(37,99,235,0.4), 0 0 120px rgba(37,99,235,0.2);
    position: relative;
  }
  .completion-circle::before {
    content: ''; position: absolute; inset: -8px; border-radius: 50%;
    border: 2px solid rgba(37,99,235,0.3);
    animation: pulseRing 2s ease-out infinite;
  }
  .completion-circle::after {
    content: ''; position: absolute; inset: -20px; border-radius: 50%;
    border: 1px solid rgba(37,99,235,0.15);
    animation: pulseRing 2s ease-out infinite 0.5s;
  }

  /* ── STATS ROW ── */
  .stats-row { display: flex; gap: 1px; overflow: hidden; border-radius: var(--r-sm); margin: 16px 0; }
  .stat-item {
    flex: 1; background: var(--navy-3); padding: 14px 10px; text-align: center;
  }
  .stat-num { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
  .stat-lbl { font-size: 10px; color: var(--text-4); margin-top: 2px; font-family: var(--mono); }

  /* ── SCROLL DOTS ── */
  .scroll-dots { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
  .scroll-dot {
    width: 6px; height: 6px; border-radius: 3px; background: var(--navy-5);
    transition: all 0.3s;
  }
  .scroll-dot.active { width: 20px; background: var(--electric-2); }

  /* ── SCREENS ── */
  .screen-inner { padding: 0 24px 40px; display: flex; flex-direction: column; min-height: 100%; }
  .screen-top { padding-top: 70px; }
  .screen-center { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100%; text-align: center; padding: 80px 24px 40px; }

  /* ── MISC ── */
  .gap-4  { gap: 4px; }
  .gap-8  { gap: 8px; }
  .gap-12 { gap: 12px; }
  .gap-16 { gap: 16px; }
  .mt-4  { margin-top: 4px; }
  .mt-8  { margin-top: 8px; }
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
  .mt-20 { margin-top: 20px; }
  .mt-24 { margin-top: 24px; }
  .mt-32 { margin-top: 32px; }
  .mb-4  { margin-bottom: 4px; }
  .mb-8  { margin-bottom: 8px; }
  .mb-12 { margin-bottom: 12px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .text-center { text-align: center; }
  .w-full { width: 100%; }
  .flex-1 { flex: 1; }
  .relative { position: relative; }
  .overflow-hidden { overflow: hidden; }
`;

// ─── SCREEN COMPONENTS ────────────────────────────────────────────────────────

// Shared floating background
function Bg() {
  return (
    <>
      <div className="grid-bg" />
      <div className="glow-top" />
      <div className="glow-bottom" />
      <div className="glow-mid" />
    </>
  );
}

// ── SCREEN 1: WELCOME ─────────────────────────────────────────────────────────
function WelcomeScreen({ onLogin, onRegister }) {
  return (
    <div className="screen">
      <Bg />
      <div className="screen-center">
        <div className="anim-scale" style={{ marginBottom: 24 }}>
          <BetIQLogo size={80} />
        </div>

        <div className="anim-up delay-1" style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span className="title-xl" style={{ color: "#fff" }}>Bet</span>
            <span className="title-xl grad-text">IQ</span>
          </div>
        </div>

        <p className="body anim-up delay-2" style={{ maxWidth: 300, textAlign: "center", marginBottom: 40 }}>
          L'assistant intelligent qui vous aide à analyser, simuler et améliorer vos paris sportifs.
        </p>

        {/* Mini stats */}
        <div className="anim-up delay-3" style={{ display: "flex", gap: 20, marginBottom: 48, justifyContent: "center" }}>
          {[["48k+", "Parieurs"], ["94%", "Satisfaction"], ["2.4M", "Paris analysés"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: "var(--electric-2)" }}>{n}</div>
              <div style={{ fontSize: 10, color: "var(--text-4)", fontFamily: "var(--mono)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="anim-up delay-4 w-full" style={{ maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={onRegister}>
            Créer un compte
          </button>
          <button className="btn btn-outline btn-full" onClick={onLogin}>
            Se connecter
          </button>
        </div>

        <p className="body-sm anim-fade delay-5" style={{ marginTop: 24, maxWidth: 280, textAlign: "center", fontSize: 11, color: "var(--text-4)" }}>
          En continuant, vous acceptez nos CGU. BetIQ n'est pas un bookmaker et ne prend aucun pari.
        </p>
      </div>
    </div>
  );
}

// ── SCREEN 2: REGISTER ────────────────────────────────────────────────────────
function RegisterScreen({ onBack, onNext }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [checks, setChecks] = useState({ terms: false, disclaimer: false });
  const [showPass, setShowPass] = useState(false);

  const valid = form.name && form.email && form.password.length >= 6 && checks.terms && checks.disclaimer;

  return (
    <div className="screen">
      <Bg />
      <button className="back-btn" onClick={onBack}>←</button>
      <div className="progress-bar"><div className="progress-fill" style={{ width: "12%" }} /></div>

      <div className="screen-inner screen-top">
        <div className="anim-up" style={{ marginBottom: 28, marginTop: 16 }}>
          <div className="label mb-8">Étape 1 sur 8</div>
          <h2 className="title-lg mb-8">Créer votre compte</h2>
          <p className="body-sm">Rejoignez 48 000 parieurs qui utilisent BetIQ.</p>
        </div>

        {/* Social */}
        <div className="anim-up delay-1" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <button className="btn btn-social btn-full">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.86-1.6 2.43v2h2.6c1.52-1.4 2.4-3.46 2.4-5.9 0-.57-.05-1.12-.17-1.64z" fill="#4285F4"/><path d="M8.98 17c2.16 0 3.97-.71 5.3-1.94l-2.6-2c-.72.48-1.63.77-2.7.77-2.08 0-3.84-1.4-4.47-3.28H1.83v2.07C3.15 15.28 5.9 17 8.98 17z" fill="#34A853"/><path d="M4.51 10.55A5.04 5.04 0 0 1 4.26 9c0-.54.09-1.07.25-1.55V5.38H1.83A8 8 0 0 0 1 9c0 1.29.31 2.51.83 3.62l2.68-2.07z" fill="#FBBC05"/><path d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.3-2.3C12.94 1.19 11.13.4 8.98.4 5.9.4 3.15 2.12 1.83 4.63l2.68 2.07c.63-1.88 2.39-3.12 4.47-3.12z" fill="#EA4335"/></svg>
            Continuer avec Google
          </button>
          <button className="btn btn-social btn-full" style={{ background: "var(--navy-4)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><path d="M14.05 9.27c-.02-2.07 1.69-3.08 1.77-3.13-1.67-2.25-2.93-2.27-3.37-2.29-1.43-.15-2.8.87-3.53.87-.73 0-1.85-.85-3.05-.83C4.02 3.91 2.31 4.96 1.37 6.6c-1.9 3.31-.49 8.2 1.36 10.88.91 1.31 1.98 2.77 3.39 2.72 1.37-.06 1.88-.88 3.53-.88 1.64 0 2.11.88 3.54.85 1.46-.02 2.39-1.32 3.28-2.64a11.1 11.1 0 0 0 1.49-3.05c-.03-.01-2.88-1.1-2.91-4.21zm-2.72-7.74c.76-.91 1.27-2.17 1.13-3.43-1.09.04-2.4.73-3.18 1.63-.7.81-1.31 2.09-1.15 3.32 1.21.09 2.44-.62 3.2-1.52z"/></svg>
            Continuer avec Apple
          </button>
        </div>

        <div className="divider-text anim-up delay-2">ou avec votre email</div>

        <div className="anim-up delay-3">
          {[
            { key: "name", label: "Prénom", icon: "👤", placeholder: "Alex", type: "text" },
            { key: "email", label: "Adresse email", icon: "✉️", placeholder: "alex@email.com", type: "email" },
            { key: "password", label: "Mot de passe", icon: "🔒", placeholder: "Minimum 6 caractères", type: showPass ? "text" : "password" },
          ].map(f => (
            <div key={f.key} className="input-group">
              <label className="input-label">{f.label}</label>
              <div className="input-icon relative">
                <span className="icon">{f.icon}</span>
                <input
                  className="input w-full"
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ paddingLeft: 42 }}
                />
                {f.key === "password" && (
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--text-4)" }}>
                    {showPass ? "🙈" : "👁️"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="anim-up delay-4">
          {[
            { key: "terms", text: <>J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a>.</> },
            { key: "disclaimer", text: "Je comprends que BetIQ n'est pas un bookmaker et ne prend aucun pari directement." },
          ].map(c => (
            <div key={c.key} className="checkbox-row" onClick={() => setChecks({ ...checks, [c.key]: !checks[c.key] })}>
              <div className={`checkbox-box ${checks[c.key] ? "checked" : ""}`}>
                {checks[c.key] && <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>✓</span>}
              </div>
              <p className="checkbox-text">{c.text}</p>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <button
          className={`btn btn-full btn-lg anim-up delay-5 ${valid ? "btn-primary" : "btn-ghost"}`}
          style={{ marginTop: 16 }}
          onClick={() => valid && onNext()}
          disabled={!valid}
        >
          Créer mon compte →
        </button>
      </div>
    </div>
  );
}

// ── SCREENS 3–9: QUESTIONNAIRE ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "goal", step: 2, total: 8,
    title: "Quel est votre objectif principal ?",
    sub: "Choisissez ce qui correspond le mieux à votre démarche.",
    multi: false,
    options: [
      { id: "profitable", icon: "📈", label: "Être rentable", sub: "Long terme" },
      { id: "bestbets", icon: "🎯", label: "Meilleurs paris", sub: "Sélection" },
      { id: "bankroll", icon: "💰", label: "Gérer ma bankroll", sub: "Discipline" },
      { id: "errors", icon: "🔍", label: "Comprendre mes erreurs", sub: "Analyse" },
      { id: "live", icon: "📡", label: "Paris live", sub: "En direct" },
      { id: "value", icon: "💎", label: "Value bets", sub: "Opportunités" },
    ],
    layout: "grid-2",
  },
  {
    id: "level", step: 3, total: 8,
    title: "Quel est votre niveau ?",
    sub: "Nous adaptons votre expérience en fonction de votre expertise.",
    multi: false,
    options: [
      { id: "beginner", icon: "🌱", label: "Débutant", sub: "< 1 an de paris" },
      { id: "intermediate", icon: "⚡", label: "Intermédiaire", sub: "1 à 3 ans" },
      { id: "expert", icon: "🏆", label: "Expert", sub: "3+ ans de Paris" },
    ],
    layout: "grid-1",
  },
  {
    id: "sport", step: 4, total: 8,
    title: "Votre sport principal ?",
    sub: "Plusieurs choix possibles.",
    multi: true,
    options: [
      { id: "football", icon: "⚽", label: "Football" },
      { id: "basketball", icon: "🏀", label: "Basketball" },
      { id: "tennis", icon: "🎾", label: "Tennis" },
      { id: "mma", icon: "🥊", label: "MMA" },
      { id: "rugby", icon: "🏉", label: "Rugby" },
      { id: "hockey", icon: "🏒", label: "Hockey" },
      { id: "other", icon: "🎮", label: "Autre" },
    ],
    layout: "pills",
  },
  {
    id: "risk", step: 5, total: 8,
    title: "Votre profil de risque ?",
    sub: "Cela détermine nos recommandations de mise.",
    multi: false,
    options: [
      { id: "conservative", icon: "🛡️", label: "Conservateur", sub: "Cotes < 2.0 · Faible risque" },
      { id: "moderate", icon: "⚖️", label: "Modéré", sub: "Équilibre rendement / risque" },
      { id: "aggressive", icon: "🔥", label: "Agressif", sub: "Cotes élevées · Fort rendement" },
    ],
    layout: "grid-1",
  },
  {
    id: "bankroll", step: 6, total: 8,
    title: "Votre bankroll actuelle ?",
    sub: "Estimez le budget que vous consacrez aux paris.",
    multi: false,
    options: [
      { id: "u100", icon: "💶", label: "< 100 €" },
      { id: "100_500", icon: "💴", label: "100 € à 500 €" },
      { id: "500_1k", icon: "💵", label: "500 € à 1 000 €" },
      { id: "1k_5k", icon: "💰", label: "1 000 € à 5 000 €" },
      { id: "o5k", icon: "🏦", label: "+ 5 000 €" },
    ],
    layout: "pills",
  },
  {
    id: "frequency", step: 7, total: 8,
    title: "Paris par semaine ?",
    sub: "Votre fréquence nous aide à calibrer les alertes.",
    multi: false,
    options: [
      { id: "1_5", icon: "🌿", label: "1 à 5 paris", sub: "Casual" },
      { id: "5_15", icon: "📅", label: "5 à 15 paris", sub: "Régulier" },
      { id: "15_30", icon: "🔄", label: "15 à 30 paris", sub: "Intensif" },
      { id: "30+", icon: "⚡", label: "+ 30 paris", sub: "Pro / quotidien" },
    ],
    layout: "grid-2",
  },
  {
    id: "type", step: 8, total: 8,
    title: "Type de paris préféré ?",
    sub: "Plusieurs choix possibles.",
    multi: true,
    options: [
      { id: "single", icon: "🎯", label: "Paris simples" },
      { id: "combi", icon: "🔗", label: "Combinés" },
      { id: "live", icon: "📡", label: "Live" },
      { id: "value", icon: "💎", label: "Value bets" },
      { id: "any", icon: "🎲", label: "Peu importe" },
    ],
    layout: "pills",
  },
];

function QuestionScreen({ question, answers, onAnswer, onBack, onNext }) {
  const progress = (question.step / question.total) * 100;
  const answer = answers[question.id];
  const isMulti = question.multi;

  const isSelected = (id) => {
    if (isMulti) return Array.isArray(answer) && answer.includes(id);
    return answer === id;
  };

  const handleSelect = (id) => {
    if (isMulti) {
      const current = Array.isArray(answer) ? answer : [];
      const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
      onAnswer(question.id, next);
    } else {
      onAnswer(question.id, id);
    }
  };

  const hasAnswer = isMulti ? (Array.isArray(answer) && answer.length > 0) : !!answer;

  if (question.layout === "pills") {
    return (
      <div className="screen">
        <Bg />
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="step-counter">{question.step}/{question.total}</div>

        <div className="screen-inner screen-top">
          <div className="anim-up mb-24">
            <div className="label mb-8">Question {question.step - 1} sur {question.total - 1}</div>
            <h2 className="title-md mb-8">{question.title}</h2>
            <p className="body-sm">{question.sub}</p>
          </div>

          <div className="pill-grid anim-up delay-1">
            {question.options.map(opt => (
              <button key={opt.id} className={`pill ${isSelected(opt.id) ? "selected" : ""}`} onClick={() => handleSelect(opt.id)}>
                <span>{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <button
            className={`btn btn-full btn-lg mt-24 ${hasAnswer ? "btn-primary" : "btn-ghost"}`}
            onClick={() => hasAnswer && onNext()}
          >
            Continuer →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <Bg />
      <button className="back-btn" onClick={onBack}>←</button>
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      <div className="step-counter">{question.step}/{question.total}</div>

      <div className="screen-inner screen-top">
        <div className="anim-up mb-24">
          <div className="label mb-8">Question {question.step - 1} sur {question.total - 1}</div>
          <h2 className="title-md mb-8">{question.title}</h2>
          <p className="body-sm">{question.sub}</p>
        </div>

        <div className={`choice-grid ${question.layout === "grid-2" ? "choice-grid-2" : "choice-grid-1"} anim-up delay-1`}>
          {question.options.map((opt, i) => (
            <div
              key={opt.id}
              className={`choice-card ${isSelected(opt.id) ? "selected" : ""}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => handleSelect(opt.id)}
            >
              <div className="choice-check">✓</div>
              <span className="choice-icon">{opt.icon}</span>
              <div className="choice-label">{opt.label}</div>
              {opt.sub && <div className="choice-sub">{opt.sub}</div>}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {(question.layout === "grid-1" || hasAnswer) && (
          <button
            className={`btn btn-full btn-lg mt-24 ${hasAnswer ? "btn-primary" : "btn-ghost"}`}
            onClick={() => hasAnswer && onNext()}
          >
            Continuer →
          </button>
        )}
      </div>
    </div>
  );
}

// ── LOADING ANALYSIS ──────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const steps = [
    "Analyse de votre profil…",
    "Création de votre programme…",
    "Optimisation du tableau de bord…",
    "Calibrage des alertes IA…",
    "Configuration des value bets…",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setCurrentStep(i + 1), (i + 1) * 800)
    );
    const done = setTimeout(onDone, steps.length * 800 + 600);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  return (
    <div className="screen">
      <Bg />
      <div className="screen-center">
        <div className="loading-ring anim-scale" style={{ marginBottom: 32 }}>
          <BetIQLogo size={44} />
        </div>

        <h2 className="title-md anim-up mb-8" style={{ textAlign: "center" }}>Analyse en cours…</h2>
        <p className="body-sm anim-up delay-1 mb-32" style={{ textAlign: "center", maxWidth: 280 }}>
          Nous construisons votre programme personnalisé
        </p>

        <div style={{ width: "100%", maxWidth: 320 }}>
          {steps.map((step, i) => (
            <div key={i} className="loading-step" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`loading-dot ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`} />
              <span className="loading-step-text" style={{ color: i < currentStep ? "var(--green)" : i === currentStep ? "var(--text)" : "var(--text-4)" }}>
                {step}
              </span>
              {i < currentStep && <span style={{ marginLeft: "auto", fontSize: 14 }}>✓</span>}
            </div>
          ))}
        </div>

        <div style={{ width: "100%", maxWidth: 320, marginTop: 24 }}>
          <div style={{ height: 4, background: "var(--navy-4)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg, var(--electric), var(--cyan))",
              width: `${(currentStep / steps.length) * 100}%`,
              transition: "width 0.6s ease"
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE RESULT ────────────────────────────────────────────────────────────
function ProfileResultScreen({ answers, onNext }) {
  const programs = {
    profitable: "Value Hunter Pro",
    bestbets: "Smart Picker",
    bankroll: "Bankroll Master",
    errors: "Analytics Expert",
    live: "Live Specialist",
    value: "Value Hunter Pro",
  };

  const levels = { beginner: "Débutant", intermediate: "Intermédiaire", expert: "Expert" };
  const risks = { conservative: "Conservateur 🛡️", moderate: "Modéré ⚖️", aggressive: "Agressif 🔥" };
  const sports = answers.sport ? (Array.isArray(answers.sport) ? answers.sport.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(", ") : answers.sport) : "Football";

  const program = programs[answers.goal] || "Smart Analyst";
  const level = levels[answers.level] || "Intermédiaire";
  const risk = risks[answers.risk] || "Modéré";

  const objectives = [
    { icon: "💎", text: "Détection des value bets" },
    { icon: "📊", text: "Comparaison de cotes" },
    { icon: "💰", text: "Gestion de bankroll" },
    { icon: "🤖", text: "Analyse IA avancée" },
  ];

  return (
    <div className="screen">
      <Bg />
      <div className="screen-inner" style={{ paddingTop: 60 }}>
        <div className="text-center mb-24 anim-up">
          <div className="label mb-8">Votre programme est prêt</div>
          <h2 className="title-lg mb-4">
            Votre programme<br />
            <span className="grad-text">BetIQ est prêt</span>
          </h2>
        </div>

        {/* Program card */}
        <div className="profile-badge anim-up delay-1">
          <div className="profile-tag">
            🎯 {program}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 16 }}>
            Programme configuré selon votre profil de parieur
          </div>
          <div className="profile-grid">
            <div className="profile-item">
              <div className="profile-item-label">Niveau</div>
              <div className="profile-item-value">{level}</div>
            </div>
            <div className="profile-item">
              <div className="profile-item-label">Risque</div>
              <div className="profile-item-value">{risk}</div>
            </div>
            <div className="profile-item" style={{ gridColumn: "span 2" }}>
              <div className="profile-item-label">Sport principal</div>
              <div className="profile-item-value">{sports}</div>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="anim-up delay-2" style={{ background: "var(--navy-2)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 16, marginBottom: 16 }}>
          <div className="label mb-12">Vos objectifs configurés</div>
          {objectives.map((obj, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < objectives.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 18 }}>{obj.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{obj.text}</span>
              <span style={{ marginLeft: "auto", color: "var(--green)", fontSize: 14 }}>✓</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <button className="btn btn-primary btn-full btn-lg anim-up delay-3" onClick={onNext}>
          Découvrir BetIQ →
        </button>
      </div>
    </div>
  );
}

// ── FEATURES CAROUSEL ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "📊",
    color: "#2563EB",
    title: "Analyser les matchs",
    bullets: ["Statistiques avancées", "Blessures & indisponibilités", "Forme récente des équipes", "Analyse IA détaillée"],
  },
  {
    icon: "💰",
    color: "#22C55E",
    title: "Optimiser vos mises",
    bullets: ["Gestion de bankroll", "Recommandation de mise", "Kelly Criterion", "Contrôle du risque"],
  },
  {
    icon: "📈",
    color: "#06B6D4",
    title: "Suivre vos performances",
    bullets: ["ROI en temps réel", "Taux de réussite", "Historique complet", "Rapports détaillés"],
  },
  {
    icon: "🎯",
    color: "#F59E0B",
    title: "Trouver les opportunités",
    bullets: ["Détection value bets", "Comparaison des cotes", "Alertes intelligentes", "Tendances du marché"],
  },
];

function FeaturesScreen({ onNext }) {
  const [slide, setSlide] = useState(0);
  const ref = useRef(null);
  let startX = useRef(0);

  const next = () => setSlide(s => (s + 1) % FEATURES.length);
  const prev = () => setSlide(s => (s - 1 + FEATURES.length) % FEATURES.length);

  const f = FEATURES[slide];

  return (
    <div className="screen">
      <Bg />
      <div className="progress-bar"><div className="progress-fill" style={{ width: "85%" }} /></div>

      <div className="screen-inner" style={{ paddingTop: 70, paddingBottom: 40 }}>
        <div className="anim-up mb-24 text-center">
          <div className="label mb-8">Ce que BetIQ vous permet</div>
          <h2 className="title-md">Toutes les fonctionnalités<br /><span className="grad-text">en un seul endroit</span></h2>
        </div>

        {/* Feature card */}
        <div
          ref={ref}
          onTouchStart={e => { startX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - startX.current;
            if (dx < -50) next();
            if (dx > 50) prev();
          }}
          key={slide}
          className="anim-scale"
          style={{
            background: `linear-gradient(135deg, ${f.color}18, ${f.color}08)`,
            border: `1.5px solid ${f.color}30`,
            borderRadius: "var(--r)", padding: 28, marginBottom: 20,
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: 20, marginBottom: 20,
            background: `${f.color}20`, border: `1px solid ${f.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34,
          }}>
            {f.icon}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, letterSpacing: -0.4, color: "var(--text)" }}>
            {f.title}
          </h3>
          {f.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-2)" }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="scroll-dots">
          {FEATURES.map((_, i) => (
            <div key={i} className={`scroll-dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} style={{ cursor: "pointer" }} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {slide < FEATURES.length - 1 ? (
            <>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onNext}>Passer</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={next}>Suivant →</button>
            </>
          ) : (
            <button className="btn btn-primary btn-full btn-lg" onClick={onNext}>Choisir mon plan →</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "free",
    name: "BetIQ Free",
    price: "0",
    period: "Pour toujours",
    color: "var(--text-3)",
    features: [
      { text: "Simulations", ok: true },
      { text: "Analyse basique", ok: true },
      { text: "Comparaison de cotes", ok: true },
      { text: "Dashboard standard", ok: true },
      { text: "Historique limité (30 j)", ok: true },
      { text: "IA avancée", ok: false },
      { text: "Value bets", ok: false },
      { text: "Alertes personnalisées", ok: false },
    ],
    badge: null,
    btnLabel: "Continuer en Free",
    btnClass: "btn-ghost",
  },
  {
    id: "pro",
    name: "BetIQ Pro",
    price: "9,99",
    period: "par mois",
    color: "var(--electric-2)",
    features: [
      { text: "Tout le plan Free", ok: true },
      { text: "IA avancée", ok: true },
      { text: "Détection value bets", ok: true },
      { text: "Alertes personnalisées", ok: true },
      { text: "Analyse détaillée", ok: true },
      { text: "Historique illimité", ok: true },
      { text: "Statistiques avancées", ok: true },
      { text: "Programmes personnalisés", ok: true },
    ],
    badge: "POPULAIRE",
    btnLabel: "Choisir Pro",
    btnClass: "btn-primary",
    popular: true,
  },
  {
    id: "elite",
    name: "BetIQ Elite",
    price: "19,99",
    period: "par mois",
    color: "var(--gold)",
    features: [
      { text: "Tout BetIQ Pro", ok: true },
      { text: "Analyse prédictive premium", ok: true },
      { text: "Score de confiance avancé", ok: true },
      { text: "Alertes temps réel", ok: true },
      { text: "Dashboard professionnel", ok: true },
      { text: "Rapports hebdomadaires", ok: true },
      { text: "Classements exclusifs", ok: true },
      { text: "Fonctionnalités en avant-première", ok: true },
    ],
    badge: "ELITE",
    btnLabel: "Choisir Elite",
    btnClass: "btn-gold",
    elite: true,
  },
];

function PricingScreen({ onNext }) {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [billingMonthly, setBillingMonthly] = useState(true);

  const plan = PLANS.find(p => p.id === selectedPlan);

  return (
    <div className="screen">
      <Bg />
      <div className="progress-bar"><div className="progress-fill" style={{ width: "95%" }} /></div>

      <div className="screen-inner" style={{ paddingTop: 60 }}>
        <div className="anim-up mb-20 text-center">
          <div className="label mb-8">Dernière étape</div>
          <h2 className="title-lg mb-4">Choisissez votre<br /><span className="grad-text">plan BetIQ</span></h2>
          <p className="body-sm">Sans engagement. Résiliable à tout moment.</p>
        </div>

        {/* Billing toggle */}
        <div className="anim-up delay-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: billingMonthly ? "var(--text)" : "var(--text-4)" }}>Mensuel</span>
          <div
            style={{
              width: 48, height: 26, borderRadius: 13, cursor: "pointer",
              background: billingMonthly ? "var(--navy-4)" : "var(--electric)",
              position: "relative", transition: "background 0.2s",
            }}
            onClick={() => setBillingMonthly(!billingMonthly)}
          >
            <div style={{
              position: "absolute", top: 3, width: 20, height: 20, borderRadius: "50%",
              background: "white", transition: "left 0.2s",
              left: billingMonthly ? 3 : 25,
            }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: !billingMonthly ? "var(--text)" : "var(--text-4)" }}>
            Annuel
            <span style={{ marginLeft: 6, fontSize: 10, background: "var(--green-dim)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 4, padding: "2px 6px", fontFamily: "var(--mono)", fontWeight: 700 }}>
              -20%
            </span>
          </span>
        </div>

        {/* Plan cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PLANS.map((p, i) => (
            <div
              key={p.id}
              className={`plan-card anim-up ${selectedPlan === p.id ? "selected-plan" : ""} ${p.popular ? "popular" : ""}`}
              style={{ animationDelay: `${(i + 2) * 0.08}s` }}
              onClick={() => setSelectedPlan(p.id)}
            >
              <div className="plan-select-indicator" />
              {p.badge && (
                <div className={p.elite ? "plan-elite-badge" : "plan-popular-badge"}>
                  {p.elite ? "👑 " : "⭐ "}{p.badge}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div className="plan-name" style={{ color: p.color }}>{p.name}</div>
                  <div className="plan-price">
                    {p.id === "free" ? "Gratuit" : (
                      <>
                        {billingMonthly ? p.price : (parseFloat(p.price) * 0.8).toFixed(2)}€<span>/mois</span>
                      </>
                    )}
                  </div>
                  <div className="plan-period">{p.period}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 4,
                  border: `2px solid ${selectedPlan === p.id ? p.color : "var(--border-2)"}`,
                  background: selectedPlan === p.id ? p.color : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}>
                  {selectedPlan === p.id && <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>✓</span>}
                </div>
              </div>

              <div className="plan-features">
                {p.features.slice(0, selectedPlan === p.id ? undefined : 4).map((f, j) => (
                  <div key={j} className="plan-feature" style={{ color: f.ok ? "var(--text-2)" : "var(--text-4)" }}>
                    <span className="check" style={{ color: f.ok ? "var(--green)" : "var(--text-4)" }}>
                      {f.ok ? "✓" : "×"}
                    </span>
                    {f.text}
                  </div>
                ))}
                {selectedPlan !== p.id && p.features.length > 4 && (
                  <div style={{ fontSize: 11, color: "var(--text-4)", paddingLeft: 21, fontFamily: "var(--mono)" }}>
                    +{p.features.length - 4} fonctionnalités…
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, minHeight: 16 }} />

        <button
          className={`btn btn-full btn-lg mt-16 ${plan?.btnClass || "btn-primary"}`}
          onClick={onNext}
        >
          {plan?.btnLabel || "Continuer"} →
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-4)", marginTop: 12 }}>
          Sans CB requise pour le plan Free · Résiliable à tout moment
        </p>
      </div>
    </div>
  );
}

// ── COMPLETION ────────────────────────────────────────────────────────────────
function CompletionScreen({ answers, onDone }) {
  const names = { profitable: "Value Hunter Pro", bestbets: "Smart Picker", bankroll: "Bankroll Master", errors: "Analytics Expert", value: "Value Hunter Pro" };
  const program = names[answers.goal] || "Smart Analyst";

  return (
    <div className="screen">
      <Bg />
      <div className="screen-center">
        <div className="completion-circle anim-scale">🎉</div>

        <h2 className="title-xl anim-up delay-1 text-center mb-12">
          Votre espace<br /><span className="grad-text">BetIQ est prêt</span>
        </h2>

        <p className="body anim-up delay-2 text-center mb-32" style={{ maxWidth: 300 }}>
          Votre programme <strong style={{ color: "var(--electric-2)" }}>{program}</strong> a été configuré selon votre profil.
        </p>

        <div className="anim-up delay-3 w-full" style={{ maxWidth: 340 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1, borderRadius: "var(--r-sm)", overflow: "hidden", marginBottom: 28,
          }}>
            {[
              { icon: "📊", label: "Analyses" },
              { icon: "💎", label: "Value bets" },
              { icon: "📈", label: "ROI tracker" },
            ].map((s, i) => (
              <div key={i} style={{ background: "var(--navy-3)", padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 10, color: "var(--text-4)", fontFamily: "var(--mono)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="anim-up delay-4 w-full" style={{ maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={onDone}>
            Accéder à mon tableau de bord →
          </button>
        </div>

        <p className="anim-fade delay-5" style={{ marginTop: 20, fontSize: 11, color: "var(--text-4)", textAlign: "center", maxWidth: 260 }}>
          ⚠️ Jouer comporte des risques. Jouez responsable.<br />
          <strong>09 74 75 13 13</strong> · +18 uniquement
        </p>
      </div>
    </div>
  );
}


// ─── FLOW DEFINITION ──────────────────────────────────────────────────────────
const FLOW = [
  "welcome",
  "register",
  ...QUESTIONS.map(q => `q_${q.id}`),
  "loading",
  "profile_result",
  "features",
  "pricing",
  "completion",
];

// ─── ONBOARDING FLOW ──────────────────────────────────────────────────────────
export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ name: 'Alex', email: '', plan: 'pro' });

  const current = FLOW[step];
  const goNext = () => setStep(s => Math.min(s + 1, FLOW.length - 1));
  const goBack = () => setStep(s => Math.max(s - 1, 0));
  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));

  const qId = current?.startsWith("q_") ? current.replace("q_", "") : null;
  const question = qId ? QUESTIONS.find(q => q.id === qId) : null;

  const handleComplete = () => {
    onComplete({
      name: formData.name || 'Alex',
      email: formData.email,
      plan: formData.plan,
      answers,
    });
  };

  return (
    <>
      <style>{css}</style>
      <div className="root">
        {current === "welcome"        && <WelcomeScreen onLogin={goNext} onRegister={goNext} />}
        {current === "register"       && <RegisterScreen onBack={goBack} onNext={goNext} />}
        {question && (
          <QuestionScreen
            key={current}
            question={question}
            answers={answers}
            onAnswer={setAnswer}
            onBack={goBack}
            onNext={goNext}
          />
        )}
        {current === "loading"         && <LoadingScreen onDone={goNext} />}
        {current === "profile_result"  && <ProfileResultScreen answers={answers} onNext={goNext} />}
        {current === "features"        && <FeaturesScreen onNext={goNext} />}
        {current === "pricing"         && <PricingScreen onNext={(plan) => { setFormData(f => ({...f, plan})); goNext(); }} />}
        {current === "completion"      && <CompletionScreen answers={answers} onDone={handleComplete} />}
      </div>
    </>
  );
}

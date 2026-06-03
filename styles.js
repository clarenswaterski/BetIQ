/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────────── */
export const tokens = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

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
`;

/* ─── SHARED COMPONENT STYLES ─────────────────────────────────────────────── */
export const sharedStyles = `
  body { font-family: var(--font); background: var(--navy-1); color: var(--text); }

  /* Buttons */
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
  .btn-outline { background: transparent; color: var(--text); border: 1.5px solid var(--border-2); }
  .btn-outline:hover { border-color: var(--electric-2); color: var(--electric-2); }
  .btn-ghost { background: var(--navy-3); border: 1px solid var(--border); color: var(--text-2); }
  .btn-ghost:hover { background: var(--navy-4); }
  .btn-gold {
    background: linear-gradient(135deg, #D97706, #F59E0B, #FCD34D);
    color: #1a0a00; box-shadow: 0 4px 24px rgba(245,158,11,0.3);
  }
  .btn-full { width: 100%; }
  .btn-lg { padding: 16px 24px; font-size: 16px; border-radius: 12px; }
  .btn-sm { padding: 9px 16px; font-size: 13px; border-radius: 8px; }

  /* Typography */
  .title-xl  { font-size: 32px; font-weight: 800; letter-spacing: -1px; line-height: 1.1; }
  .title-lg  { font-size: 26px; font-weight: 800; letter-spacing: -0.7px; line-height: 1.15; }
  .title-md  { font-size: 20px; font-weight: 700; letter-spacing: -0.4px; }
  .title-sm  { font-size: 16px; font-weight: 700; }
  .body      { font-size: 15px; color: var(--text-2); line-height: 1.6; }
  .body-sm   { font-size: 13px; color: var(--text-3); line-height: 1.6; }
  .label     { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--text-4); font-family: var(--mono); }

  .text-blue  { color: var(--electric-2); }
  .text-green { color: var(--green); }
  .text-gold  { color: var(--gold); }
  .text-muted { color: var(--text-3); }
  .grad-text {
    background: linear-gradient(135deg, var(--electric-2), var(--cyan-2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Animations */
  @keyframes slideInRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideInUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn       { from { opacity:0; } to { opacity:1; } }
  @keyframes scaleIn      { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
  @keyframes pulseRing    { 0%{transform:scale(1);opacity:0.6;} 100%{transform:scale(1.8);opacity:0;} }
  @keyframes spin         { to { transform:rotate(360deg); } }
  @keyframes blink        { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
  @keyframes float        { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

  .anim-slide { animation: slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both; }
  .anim-up    { animation: slideInUp 0.4s cubic-bezier(0.4,0,0.2,1) both; }
  .anim-fade  { animation: fadeIn 0.4s ease both; }
  .anim-scale { animation: scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
  .anim-float { animation: float 3s ease-in-out infinite; }

  .delay-1{animation-delay:.05s} .delay-2{animation-delay:.1s} .delay-3{animation-delay:.15s}
  .delay-4{animation-delay:.2s}  .delay-5{animation-delay:.25s} .delay-6{animation-delay:.3s}
  .delay-7{animation-delay:.35s} .delay-8{animation-delay:.4s}

  /* Inputs */
  .input {
    width: 100%; padding: 13px 16px; border-radius: var(--r-sm);
    background: var(--navy-3); border: 1.5px solid var(--border);
    color: var(--text); font-size: 15px; font-family: var(--font); outline: none; transition: all 0.15s;
  }
  .input:focus { border-color: var(--electric-2); background: var(--navy-4); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
  .input::placeholder { color: var(--text-4); }

  /* Chips */
  .chip {
    display: flex; align-items: center; gap: 5px; padding: 7px 14px;
    border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;
    white-space: nowrap; border: 1px solid var(--border); background: var(--navy-2);
    color: var(--text-3); transition: all 0.15s; font-family: var(--font);
  }
  .chip.active { background: rgba(37,99,235,0.14); border-color: rgba(37,99,235,0.35); color: var(--electric-2); }
  .chip:hover:not(.active) { border-color: var(--border-2); color: var(--text-2); }

  /* Utils */
  .w-full { width: 100%; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .text-center { text-align: center; }
  .relative { position: relative; }
  .flex-1 { flex: 1; }
  .gap-8  { gap: 8px; }
  .gap-12 { gap: 12px; }
  .gap-16 { gap: 16px; }
  .mt-8  { margin-top: 8px;  }
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
  .mt-20 { margin-top: 20px; }
  .mt-24 { margin-top: 24px; }
  .mt-32 { margin-top: 32px; }
  .mb-4  { margin-bottom: 4px;  }
  .mb-8  { margin-bottom: 8px;  }
  .mb-12 { margin-bottom: 12px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-20 { margin-bottom: 20px; }
  .mb-24 { margin-bottom: 24px; }
  .mb-32 { margin-bottom: 32px; }
`;

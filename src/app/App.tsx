import { useEffect, useRef, useState } from "react";
import rawHtml from "../imports/index__1_.html?raw";

const ENHANCEMENT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  /* ── OVERRIDE FONT STACK ── */
  body {
    font-family: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif !important;
  }

  .header-title h1, .section-title {
    font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif !important;
  }

  /* ── ANIMATED BACKGROUND ORBS ── */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background:
      radial-gradient(ellipse 900px 600px at 10% 20%, rgba(0,109,255,0.13), transparent),
      radial-gradient(ellipse 700px 500px at 90% 10%, rgba(124,58,237,0.12), transparent),
      radial-gradient(ellipse 600px 400px at 60% 80%, rgba(0,194,255,0.10), transparent),
      radial-gradient(ellipse 500px 350px at 20% 90%, rgba(0,168,107,0.08), transparent);
    animation: orbDrift 18s ease-in-out infinite alternate;
  }

  @keyframes orbDrift {
    0%   { transform: translate(0px, 0px) scale(1); }
    33%  { transform: translate(18px, -12px) scale(1.03); }
    66%  { transform: translate(-10px, 8px) scale(0.97); }
    100% { transform: translate(6px, -6px) scale(1.01); }
  }

  /* ── GRID SHIMMER ── */
  body::before {
    animation: gridPulse 8s ease-in-out infinite alternate !important;
  }

  @keyframes gridPulse {
    0%   { opacity: 0.25; }
    100% { opacity: 0.42; }
  }

  /* ── HEADER GLOW LINE ── */
  .header::after {
    animation: glowLine 4s ease-in-out infinite alternate !important;
    opacity: 0.7 !important;
  }

  @keyframes glowLine {
    0%   { opacity: 0.4; filter: blur(0px); }
    100% { opacity: 0.85; filter: blur(1px); }
  }

  /* ── LOGO PULSE ── */
  .logo-icon {
    animation: logoPulse 6s ease-in-out infinite alternate !important;
  }

  @keyframes logoPulse {
    0%   { box-shadow: 0 10px 30px rgba(0,109,255,.35), inset 0 1px 0 rgba(255,255,255,.28); }
    100% { box-shadow: 0 14px 42px rgba(0,194,255,.55), inset 0 1px 0 rgba(255,255,255,.38); }
  }

  /* ── CARDS: gradient border on hover ── */
  .quick-stat,
  .card,
  .kpi-card,
  .exec-card,
  .chart-box,
  .benchmark-card,
  .simulador-card,
  .test-card {
    transition: transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s cubic-bezier(.2,.8,.2,1), border-color 0.28s ease !important;
    will-change: transform;
  }

  .quick-stat:hover,
  .kpi-card:hover,
  .exec-card:hover,
  .chart-box:hover,
  .benchmark-card:hover,
  .simulador-card:hover,
  .test-card:hover {
    border-color: rgba(0,194,255,0.55) !important;
    box-shadow:
      0 30px 80px rgba(0,109,255,0.20),
      0 0 0 1px rgba(0,194,255,0.22),
      inset 0 1px 0 rgba(255,255,255,0.18) !important;
  }

  .card:hover {
    border-color: rgba(0,194,255,0.28) !important;
    box-shadow:
      0 26px 70px rgba(0,109,255,0.14),
      0 0 0 1px rgba(0,194,255,0.14) !important;
  }

  /* ── KPI VALUE COUNTER ANIMATION ── */
  .kpi-value {
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.2,.8,.2,1);
  }

  .kpi-card:hover .kpi-value {
    transform: scale(1.04);
  }

  /* ── KPI CARD: colored left accent strip ── */
  .kpi-card {
    border-left: 3px solid transparent !important;
    background-clip: padding-box;
    transition: border-left-color 0.3s ease, transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s cubic-bezier(.2,.8,.2,1) !important;
  }

  .kpi-card:nth-child(3n+1) { border-left-color: rgba(0,109,255,0.6) !important; }
  .kpi-card:nth-child(3n+2) { border-left-color: rgba(0,194,255,0.6) !important; }
  .kpi-card:nth-child(3n+3) { border-left-color: rgba(124,58,237,0.5) !important; }

  /* ── BADGE PULSE for critical ── */
  .badge-critical {
    animation: badgePulse 2.2s ease-in-out infinite;
    box-shadow: 0 0 0 0 rgba(217,61,82,0.4);
  }

  @keyframes badgePulse {
    0%   { box-shadow: 0 0 0 0 rgba(217,61,82,0.35); }
    70%  { box-shadow: 0 0 0 7px rgba(217,61,82,0); }
    100% { box-shadow: 0 0 0 0 rgba(217,61,82,0); }
  }

  /* ── BADGE GLOW for good ── */
  .badge-good {
    box-shadow: 0 2px 10px rgba(0,168,107,0.25);
    transition: box-shadow 0.3s ease;
  }

  /* ── ACTIVE NAV TAB: animated glow ── */
  .nav-tab.active {
    animation: tabGlow 3s ease-in-out infinite alternate !important;
  }

  @keyframes tabGlow {
    0%   { box-shadow: 0 14px 28px rgba(0,109,255,0.28); }
    100% { box-shadow: 0 18px 38px rgba(0,194,255,0.42); }
  }

  /* ── BUTTON: shimmer sweep ── */
  .btn {
    position: relative;
    overflow: hidden;
    transition: transform 0.22s cubic-bezier(.2,.8,.2,1), box-shadow 0.22s ease, background 0.22s ease !important;
  }

  .btn:hover {
    transform: translateY(-3px) scale(1.025) !important;
  }

  .btn:active {
    transform: translateY(-1px) scale(1.01) !important;
    transition: transform 0.1s !important;
  }

  /* ── INPUT FOCUS: animated ring ── */
  .form-group input {
    transition: border-color 0.2s ease, box-shadow 0.3s cubic-bezier(.2,.8,.2,1), background 0.2s ease !important;
  }

  .form-group input:focus {
    box-shadow:
      0 0 0 4px rgba(0,194,255,0.18),
      0 2px 16px rgba(0,109,255,0.12),
      inset 0 1px 0 rgba(255,255,255,0.25) !important;
    transform: none;
  }

  /* ── TAB CONTENT ENTRANCE ── */
  .tab-content.active {
    animation: tabEnter 0.4s cubic-bezier(.2,.8,.2,1) both !important;
  }

  @keyframes tabEnter {
    0%   { opacity: 0; transform: translateY(16px) scale(0.99); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── QUICK STATS: staggered entrance ── */
  .quick-stat:nth-child(1) { animation: statEnter 0.5s 0.05s cubic-bezier(.2,.8,.2,1) both; }
  .quick-stat:nth-child(2) { animation: statEnter 0.5s 0.12s cubic-bezier(.2,.8,.2,1) both; }
  .quick-stat:nth-child(3) { animation: statEnter 0.5s 0.19s cubic-bezier(.2,.8,.2,1) both; }
  .quick-stat:nth-child(4) { animation: statEnter 0.5s 0.26s cubic-bezier(.2,.8,.2,1) both; }

  @keyframes statEnter {
    0%   { opacity: 0; transform: translateY(20px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── QUICK STAT ICON: refined gradient circles ── */
  .quick-stat .qs-icon {
    background: linear-gradient(135deg, var(--accent-blue, #006dff), var(--accent-cyan, #00c2ff)) !important;
    box-shadow: 0 8px 24px rgba(0,109,255,0.3), inset 0 1px 0 rgba(255,255,255,0.3) !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease !important;
  }

  .quick-stat:hover .qs-icon {
    transform: scale(1.1) rotate(-4deg);
    box-shadow: 0 12px 32px rgba(0,194,255,0.45), inset 0 1px 0 rgba(255,255,255,0.35) !important;
  }

  /* ── SECTION TITLE: gradient text ── */
  .section-title {
    background: linear-gradient(135deg, var(--text-primary, #071827) 0%, var(--accent-blue, #006dff) 55%, var(--accent-cyan, #00c2ff) 100%) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    color: transparent !important;
    font-weight: 800 !important;
    letter-spacing: -0.04em !important;
  }

  /* ── RANKING ITEMS: hover glow ── */
  .ranking-item {
    transition: all 0.22s cubic-bezier(.2,.8,.2,1) !important;
    cursor: default;
  }

  .ranking-item:hover {
    transform: translateX(6px) !important;
    border-color: rgba(0,194,255,0.35) !important;
    box-shadow: 0 4px 20px rgba(0,109,255,0.12) !important;
  }

  /* ── DIAGNOSTIC HIGHLIGHT: shimmer ── */
  .diagnostic-highlight {
    position: relative;
    overflow: hidden;
  }

  .diagnostic-highlight::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,194,255,0.06), transparent);
    animation: diagShimmer 5s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes diagShimmer {
    0%   { left: -80%; }
    100% { left: 160%; }
  }

  /* ── STATUS INDICATORS: pulse ── */
  .meta-table .status-indicator.good {
    box-shadow: 0 0 0 0 rgba(0,168,107,0.4);
    animation: indicatorPulse 2.5s ease-in-out infinite;
  }

  .meta-table .status-indicator.critical {
    box-shadow: 0 0 0 0 rgba(217,61,82,0.4);
    animation: indicatorPulseCrit 2s ease-in-out infinite;
  }

  @keyframes indicatorPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,168,107,0.35); }
    50%       { box-shadow: 0 0 0 5px rgba(0,168,107,0); }
  }

  @keyframes indicatorPulseCrit {
    0%, 100% { box-shadow: 0 0 0 0 rgba(217,61,82,0.4); }
    50%       { box-shadow: 0 0 0 5px rgba(217,61,82,0); }
  }

  /* ── TOAST: refined entrance ── */
  .toast {
    animation: toastIn 0.42s cubic-bezier(.2,.8,.2,1) both !important;
    border-left-width: 4px !important;
  }

  @keyframes toastIn {
    0%   { opacity: 0; transform: translateX(28px) scale(0.97); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }

  /* ── THEME TOGGLE: orbit glow ── */
  .theme-toggle {
    transition: all 0.25s cubic-bezier(.2,.8,.2,1) !important;
  }

  .theme-toggle:hover {
    transform: translateY(-2px) scale(1.04) !important;
    box-shadow: 0 12px 32px rgba(0,109,255,0.18) !important;
  }

  /* ── CHART BOX: inner glow ── */
  .chart-box::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,194,255,0.25), transparent);
    border-radius: 50%;
  }

  /* ── BENCHMARK BAR: animated fill ── */
  .benchmark-bar .bar-fill {
    transition: width 1.1s cubic-bezier(.2,.8,.2,1) !important;
    background: linear-gradient(90deg, var(--accent-blue, #006dff), var(--accent-cyan, #00c2ff)) !important;
    box-shadow: 0 2px 12px rgba(0,194,255,0.35) !important;
    position: relative;
    overflow: hidden;
  }

  .benchmark-bar .bar-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: rgba(255,255,255,0.28);
    animation: barSheen 2.5s ease-in-out infinite;
  }

  @keyframes barSheen {
    0%   { left: -60%; }
    100% { left: 140%; }
  }

  /* ── TEST CARDS: pass/fail entrance ── */
  .test-card {
    animation: testCardEnter 0.4s cubic-bezier(.2,.8,.2,1) both;
  }

  .test-card:nth-child(1)  { animation-delay: 0.04s; }
  .test-card:nth-child(2)  { animation-delay: 0.09s; }
  .test-card:nth-child(3)  { animation-delay: 0.14s; }
  .test-card:nth-child(4)  { animation-delay: 0.19s; }
  .test-card:nth-child(5)  { animation-delay: 0.24s; }
  .test-card:nth-child(6)  { animation-delay: 0.29s; }
  .test-card:nth-child(7)  { animation-delay: 0.34s; }
  .test-card:nth-child(8)  { animation-delay: 0.39s; }
  .test-card:nth-child(9)  { animation-delay: 0.44s; }
  .test-card:nth-child(10) { animation-delay: 0.49s; }
  .test-card:nth-child(11) { animation-delay: 0.54s; }
  .test-card:nth-child(12) { animation-delay: 0.59s; }

  @keyframes testCardEnter {
    0%   { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* ── EMPTY STATE: floating ── */
  .empty-state {
    animation: emptyFloat 4s ease-in-out infinite alternate;
  }

  @keyframes emptyFloat {
    0%   { transform: translateY(0px); }
    100% { transform: translateY(-6px); }
  }

  /* ── SCROLLBAR: gradient ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(0,109,255,0.5), rgba(0,194,255,0.5));
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #006dff, #00c2ff);
  }

  /* ── KPI GRID: staggered card entrance ── */
  .kpi-grid .kpi-card {
    animation: kpiEnter 0.45s cubic-bezier(.2,.8,.2,1) both;
  }

  .kpi-grid .kpi-card:nth-child(1)  { animation-delay: 0.04s; }
  .kpi-grid .kpi-card:nth-child(2)  { animation-delay: 0.10s; }
  .kpi-grid .kpi-card:nth-child(3)  { animation-delay: 0.16s; }
  .kpi-grid .kpi-card:nth-child(4)  { animation-delay: 0.22s; }
  .kpi-grid .kpi-card:nth-child(5)  { animation-delay: 0.28s; }
  .kpi-grid .kpi-card:nth-child(6)  { animation-delay: 0.34s; }
  .kpi-grid .kpi-card:nth-child(7)  { animation-delay: 0.40s; }
  .kpi-grid .kpi-card:nth-child(8)  { animation-delay: 0.46s; }
  .kpi-grid .kpi-card:nth-child(9)  { animation-delay: 0.52s; }

  @keyframes kpiEnter {
    0%   { opacity: 0; transform: translateY(18px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── EXEC SUMMARY CARDS ── */
  .exec-summary .exec-card {
    animation: execEnter 0.5s cubic-bezier(.2,.8,.2,1) both;
  }

  .exec-summary .exec-card:nth-child(1) { animation-delay: 0.05s; }
  .exec-summary .exec-card:nth-child(2) { animation-delay: 0.12s; }
  .exec-summary .exec-card:nth-child(3) { animation-delay: 0.19s; }
  .exec-summary .exec-card:nth-child(4) { animation-delay: 0.26s; }

  @keyframes execEnter {
    0%   { opacity: 0; transform: translateY(14px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── EXEC VALUE: big number glow ── */
  .exec-card .exec-value {
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.04em;
    font-weight: 800;
    transition: transform 0.25s ease;
  }

  .exec-card:hover .exec-value {
    transform: scale(1.06);
  }

  /* ── CARD HEADER: subtle separator ── */
  .card-header {
    padding-bottom: 14px !important;
    border-bottom: 1px solid rgba(0,194,255,0.08) !important;
    margin-bottom: 18px !important;
  }

  /* ── NAV TAB hover: lift ── */
  .nav-tab:not(.active):hover {
    transform: translateY(-1px) !important;
  }

  /* ── FORM LABEL: micro uppercase ── */
  .form-group label {
    font-size: 0.69rem !important;
    letter-spacing: 0.075em !important;
    font-weight: 700 !important;
  }

  /* ── SECTION SUB: refined ── */
  .section-sub {
    font-size: 0.92rem !important;
    line-height: 1.65 !important;
    max-width: 700px !important;
    opacity: 0.88 !important;
  }

  /* ── PESOS TOTAL: highlight ── */
  .pesos-total {
    background: linear-gradient(135deg, var(--accent-blue, #006dff), var(--accent-cyan, #00c2ff));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ── CLEAR BTN: danger glow on hover ── */
  .clear-btn:hover {
    box-shadow: 0 8px 24px rgba(217,61,82,0.25) !important;
    transform: translateY(-2px) !important;
  }

  /* ── RANKING POSITION: gradient number ── */
  .ranking-item .rank-pos {
    background: linear-gradient(135deg, var(--accent-blue, #006dff), var(--accent-cyan, #00c2ff));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 900 !important;
  }

  /* ── FORMULA TOOLTIP: smooth entry ── */
  .formula-tooltip {
    transition: opacity 0.18s ease !important;
    border-radius: 16px !important;
    backdrop-filter: blur(16px) !important;
  }

  /* ── META TABLE: striped rows ── */
  .meta-table tr:nth-child(even) td {
    background: rgba(0,109,255,0.03);
  }

  .meta-table tr:hover td {
    background: rgba(0,194,255,0.06);
    transition: background 0.2s ease;
  }

  /* ── DARK THEME: deeper shadows ── */
  [data-theme="dark"] .kpi-card:hover,
  [data-theme="dark"] .exec-card:hover,
  [data-theme="dark"] .quick-stat:hover {
    border-color: rgba(0,194,255,0.45) !important;
    box-shadow:
      0 32px 90px rgba(0,0,0,0.55),
      0 0 0 1px rgba(0,194,255,0.28),
      inset 0 1px 0 rgba(255,255,255,0.08) !important;
  }

  [data-theme="dark"] body::after {
    background:
      radial-gradient(ellipse 900px 600px at 10% 20%, rgba(0,109,255,0.18), transparent),
      radial-gradient(ellipse 700px 500px at 90% 10%, rgba(124,58,237,0.15), transparent),
      radial-gradient(ellipse 600px 400px at 60% 80%, rgba(0,194,255,0.14), transparent),
      radial-gradient(ellipse 500px 350px at 20% 90%, rgba(0,168,107,0.10), transparent);
  }
`;

function injectEnhancements(html: string): string {
  const styleTag = `<style>${ENHANCEMENT_CSS}</style>`;
  return html.replace("</head>", `${styleTag}\n</head>`);
}

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string>("");

  useEffect(() => {
    const enhanced = injectEnhancements(rawHtml);
    const blob = new Blob([enhanced], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#0f172a" }}>
      {blobUrl && (
        <iframe
          ref={iframeRef}
          src={blobUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
          title="Painel de Inteligência Logística"
          sandbox="allow-scripts allow-same-origin allow-downloads allow-forms"
        />
      )}
    </div>
  );
}

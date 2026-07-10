  // ══════════════════════════════════════════════
  // DATA, COLORS
  // ══════════════════════════════════════════════

// ══════════════════════════════════════════════════════
// GRÜNDE FÜR/GEGEN VERTEIDIGUNGSJOBS
// ══════════════════════════════════════════════════════

  const gruendeJa = [
      { label: "Technische Innovation und interessante Projekte",   pct: 52 },
      { label: "Finanzielle Günde",  pct: 47 },
      { label: "Schutz demokratischer Werte und Sicherheit",  pct: 37 },
      { label: "Berufliche Perspektiven (Karrierechancen)",                     pct: 36 },
      { label: "Geopolitische Verantwortung Deutschlands/Europas",  pct: 26 },
  ];

  const gruendeNein = [
      { label: "Moralische/Ethische Bedenken",               pct: 41 },
      { label: "Politische Überzeugung",  pct: 16 },
      { label: "Sicherheitsbedenken (Geheimhaltung, eingeschränkte Mobilität)", pct: 16 },
      { label: "Unklare rechtliche Verantwortung",         pct: 14 },
      { label: "Soziales Umfeld / Stigmatisierung / Erwartungen anderer",            pct: 11 },
  ];

const colorJa   = "var(--accent-light)";
const colorNein = "#c8441a";


 // ══════════════════════════════════════════════════════
 // TENSION-SLIDER (ZUSTIMMUNG + SZENARIO)
// ══════════════════════════════════════════════════════

    // Zustimmung
const messagesZustimmung = [
  'Stimme überhaupt nicht zu',
  'Stimme eher nicht zu',
  'teils-teils',
  'Stimme eher zu',
  'Stimme voll und ganz zu',
];
const studyDataZustimmung = [29, 22, 16, 16, 17];

    // Szenario
const messagesSzenario = [
  'Ich würde Angebot A (Ziviles Unternehmen) nehmen',
  'Ich würde Angebot A (Ziviles Unternehmen) nehmen, aber der Gehaltsunterschied lässt mich zögern',
  'Ich würde intensiv abwägen und beide Angebote in Betracht ziehen',
  'Ich würde Angebot B (Rüstungsunternehmen) nehmen, weil das Gehalt ein legitimer Grund ist',
  'Ich würde Angebot B (Rüstungsunternehmen) aus anderen Gründen wählen',
];
const studyDataSzenario = [10,16, 5, 41, 28];

const sliderConfigs = {
  zustimmung: {
    messages: messagesZustimmung,
    data: studyDataZustimmung,
    ids: {
      slider: 'tensionSlider',
      fill: 'sliderFill',
      num: 'tensionNum',
      text: 'tensionText',
      bars: 'comparisonBars',
      compText: 'comparisonText',
      resultBlock: 'tensionResultBlock'
    }
  },
  szenario: {
    messages: messagesSzenario,
    data: studyDataSzenario,
    ids: {
      slider: 'tensionSliderScenario',
      fill: 'sliderFillScenario',
      num: 'tensionNumScenario',
      text: 'tensionTextScenario',
      bars: 'comparisonBarsScenario',
      compText: 'comparisonTextScenario',
      resultBlock: 'tensionResultBlockScenario'
    }
  }
};
// ══════════════════════════════════════════════════════
// PRIORITÄTEN – VERGLEICH DE vs USA (FLIP-Animation)
// ══════════════════════════════════════════════════════

const combinedPriorityData = [
  { label: "Interesse & Spaß\nan der Tätigkeit", de: 82, usa: 54 },
  { label: "Gehalt",                              de: 76, usa: 66 },
  { label: "Work-Life-Balance",                   de: 56, usa: 63 },
  { label: "Gutes Arbeitsklima",                  de: 55, usa: 52 },
  { label: "Jobsicherheit",                       de: 54, usa: 68 },
  { label: "Karriere &\nAufstiegsmöglichkeiten",  de: 43, usa: 30 },
  { label: "Übereinstimmung mit\nmoralischen Werten", de: 26, usa: 47 },
  { label: "Gesellschaftlicher\nBeitrag",         de: 10, usa: 30 },
];

let colorPrimary   = "#c8441a";
let colorSecondary = "#e0815f";
let currentViewDE  = 'de';

 // ══════════════════════════════════════════════════════
    // DEUTSCHLAND KARTE
 // ══════════════════════════════════════════════════════
  const bundeslaender = {
    "Hamburg": "29 Hochschulen, davon 3 mit Zivilklauseln.",
    "Berlin": "49 Hochschulen, davon 2 mit Zivilklauseln.",
    "Nordrhein-Westfalen": "79 Hochschulen. In Nordrhein-Westfalen ist die Situation rund um die Zivilklauseln durch eine dynamische politische Vergangenheit geprägt. 33 Hochschulen haben eine Zivilklausel.",
    "Hessen": "43 Hochschulen, davon 5 mit Zivilklauseln.",
    "Bayern": "59 Hochschulen. In Bayern wurde 2024 ein Verbot für Zivilklauseln an Hochschulen ausgesprochen.",
    "Baden-Württemberg": "74 Hochschulen, davon 4 mit Zivilklauseln.",
    "Schleswig-Holstein": "15 Hochschulen, davon 2 mit Zivilklauseln.",
    "Mecklenburg-Vorpommern": "10 Hochschulen, davon eine mit Zivilklausel.",
    "Brandenburg": "20 Hochschulen, davon 2 mit Zivilklauseln.",
    "Sachsen-Anhalt": "11 Hochschulen, davon 2 mit Zivilklauseln. Staatliche Hochschulen sollen sich mit den Folgen ihrer Forschungsergebnisse auseinander setzen.",
    "Sachsen": "25 Hochschulen, davon eine mit Zivilklausel.",
    "Thüringen": "14 Hochschulen, davon 9 mit Zivilklauseln. Staatliche Hochschulen sollen geben sich selbstbestimmt eine Zivilklausel.",
    "Rheinland-Pfalz": "23 Hochschulen, davon keine mit Zivilklausel.",
    "Saarland": "7 Hochschulen, davon keine mit Zivilklausel.",
    "Bremen": "9 Hochschulen, davon 3 mit Zivilklausel. Staatliche Hochschulen sind zu einer Zivilklausel verpflichtet.",
    "Niedersachsen": "32 Hochschulen, davon 4 mit Zivilklauseln."
  };

  // Zivilklausel-Abdeckung pro Bundesland (Prozentsatz)
  const zivilklauselDaten = {
    "Hamburg": 3/29,
    "Berlin": 2/49,
    "Nordrhein-Westfalen": 33/79,
    "Hessen": 5/43,
    "Bayern": 0/59,
    "Baden-Württemberg": 4/74,
    "Schleswig-Holstein": 2/15,
    "Mecklenburg-Vorpommern": 1/10,
    "Brandenburg": 2/20,
    "Sachsen-Anhalt": 2/11,
    "Sachsen": 1/25,
    "Thüringen": 9/14,
    "Rheinland-Pfalz": 0/23,
    "Saarland": 0/7,
    "Bremen": 3/9,
    "Niedersachsen": 4/32
  };

// ══════════════════════════════════════════════
// ── UMFRAGE DIAGRAMM ──
// ══════════════════════════════════════════════
const umfrageData = [
  { label: 'Gesamt',                     group: 'all',        garNicht: 9,  eherNicht: 8,  ambivalent: 33, eherZu: 28, sehrStark: 22 },
  { label: 'Männer',                     group: 'geschlecht', garNicht: 9,  eherNicht: 7,  ambivalent: 24, eherZu: 31, sehrStark: 29 },
  { label: 'Frauen',                     group: 'geschlecht', garNicht: 9,  eherNicht: 9,  ambivalent: 42, eherZu: 25, sehrStark: 14 },
  { label: '16–34 Jahre',                group: 'alter',      garNicht: 9,  eherNicht: 10, ambivalent: 37, eherZu: 29, sehrStark: 15 },
  { label: '35–64 Jahre',                group: 'alter',      garNicht: 10, eherNicht: 7,  ambivalent: 33, eherZu: 27, sehrStark: 23 },
  { label: '65 Jahre und älter',         group: 'alter',      garNicht: 8,  eherNicht: 9,  ambivalent: 27, eherZu: 29, sehrStark: 27 },
];
const COLORS = ['#c8441a','#d4623d','#e0815f','#eba98e','#f5d4c4'];
let umfrageCurrentGroup = 'all';
let umfrageCurrentView  = 'stacked';

// ══════════════════════════════════════════════
// ── NUTZEN VS. RISIKO: BUTTERFLY-DIAGRAMM ──
// ══════════════════════════════════════════════

const nutzenRisikoData = [
  { label: 'Männer',             group: 'geschlecht', nuetzlich: 22, riskant: 4 },
  { label: 'Frauen',             group: 'geschlecht', nuetzlich: 14, riskant: 4 },
  { label: '16–34 Jahre',        group: 'alter',       nuetzlich: 13, riskant: 4 },
  { label: '35–64 Jahre',        group: 'alter',       nuetzlich: 18, riskant: 3 },
  { label: '65 Jahre und älter', group: 'alter',       nuetzlich: 25, riskant: 5 },
];

let nutzenRisikoCurrentGroup = 'all';


// ══════════════════════════════════════════════════════
// DUMBBELL-CHART: VOLLE ZUSTIMMUNG NACH GESCHLECHT
// ══════════════════════════════════════════════════════
const gewissenLabels = [
    '„Ich kann mir vorstellen, im Rüstungs-/Verteidigungsbereich zu arbeiten."',
    '„Ich hätte Gewissenskonflikte, wenn ich im Defense-Bereich arbeiten würde."',
    '„(Berufs)ethik bietet für mich eine Orientierung für mein Handeln."',
];
const gewissenMaenner = [40.1, 12.3, 6.8];
const gewissenFrauen  = [11.3, 28.8, 17.5];
const DUMBBELL_SCALE_MAX = 45;

// ══════════════════════════════════════════════════════
// ── HEATMAP ──
// ══════════════════════════════════════════════════════

 const HM_COLS = ['Ja','Nur am Rande','Nein'];

 const HM_RAW = [
   {sg:'Social Data Science',   n:40, vals:{Ja:19,'Nur am Rande':19,Nein:2}},
   {sg:'Int. Business',   n:43, vals:{Ja:17,'Nur am Rande':22,Nein:4}},
   {sg:'Wirtschafts-/informatik', n:30, vals:{Ja:1, 'Nur am Rande':7, Nein:22}},
   {sg:'Elektrotechnik',        n:44, vals:{Ja:1, 'Nur am Rande':5, Nein:38}},
   {sg:'Maschinenbau',          n:64, vals:{Ja:1, 'Nur am Rande':8, Nein:55}},
 ];


// ══════════════════════════════════════════════════════
// ── DOT PLOT: Dual-Use Frage ──
// ══════════════════════════════════════════════════════


const DOTPLOT_GROUPS = [
  { key: 'gesamt',       label: 'Gesamt',               mean: 2.76, color: '#1a1814',  shape: 'circle', },
  { key: 'frauen',       label: 'Frauen',               mean: 3.64, color: '#c8441a',  shape: 'circle', group: 'geschlecht' },
  { key: 'maenner',      label: 'Männer',               mean: 2.29, color: '#d4623d',  shape: 'circle', group: 'geschlecht' },
  { key: 'maschinenbau', label: 'Maschinenbau',         mean: 2.46, color: '#c8441a',  shape: 'circle', group: 'studiengang' },
  { key: 'elektro',      label: 'Elektrotechnik',       mean: 2.64, color: '#d4623d',  shape: 'circle', group: 'studiengang' },
  { key: 'informatik',   label: '(Wirtschafts-)informatik', mean: 3.26, color: '#e0815f',  shape: 'circle', group: 'studiengang' },
  { key: 'bwl',          label: 'BWL / Wirtschaft',     mean: 2.82, color: '#eba98e',  shape: 'circle', group: 'studiengang' },
  { key: 'sds',          label: 'Social Data Science',  mean: 3.14, color: '#f5d4c4',  shape: 'circle', group: 'studiengang' },
];

const DOTPLOT_MIN = 1, DOTPLOT_MAX = 5;
let dotplotActiveGroup = null; // 'geschlecht' | 'studiengang' | null

const dotplotFiltersEl  = document.getElementById('dotplotFilters');
const dotplotAxisEl     = document.getElementById('dotplotAxis');
const dotplotGesamtLine = document.getElementById('dotplotGesamtLine');
let dotplotTooltip    = document.getElementById('dotplotTooltip');

// ── DOT PLOT 2: Einstellung hat sich verändert ──
const DOTPLOT2_GROUPS = [
  { key: 'gesamt',        label: 'Gesamt',               mean: 2.59, color: '#1a1814',  shape: 'circle' },
  { key: 'frauen2',       label: 'Frauen',               mean: 2.51, color: '#c8441a',  shape: 'circle', group: 'geschlecht' },
  { key: 'maenner2',      label: 'Männer',               mean: 2.76, color: '#d4623d',  shape: 'circle', group: 'geschlecht' },
  { key: 'maschinenbau2', label: 'Maschinenbau',         mean: 2.49, color: '#c8441a',  shape: 'circle', group: 'studiengang' },
  { key: 'elektro2',      label: 'Elektrotechnik',       mean: 2.38, color: '#d4623d',  shape: 'circle', group: 'studiengang' },
  { key: 'informatik2',   label: '(Wirtschafts-)Informatik', mean: 2.10, color: '#e0815f',  shape: 'circle', group: 'studiengang' },
  { key: 'bwl2',          label: 'BWL / Wirtschaft',     mean: 3.09, color: '#eba98e',  shape: 'circle', group: 'studiengang' },
  { key: 'sds2',          label: 'Social Data Science',  mean: 2.93, color: '#f5d4c4',  shape: 'circle', group: 'studiengang' },
];

const DOTPLOT2_MIN = 1, DOTPLOT2_MAX = 5;
let dotplot2ActiveGroup = 'geschlecht';

const dotplot2FiltersEl   = document.getElementById('dotplot2Filters');
const dotplot2AxisEl      = document.getElementById('dotplot2Axis');
const dotplot2GesamtLine  = document.getElementById('dotplot2GesamtLine');
let dotplot2Tooltip     = document.getElementById('dotplot2Tooltip');

  // ══════════════════════════════════════════════
  // FUNCTIONS
  // ══════════════════════════════════════════════

 // ══════════════════════════════════════════════
 // Ethik Counter Animation (Zahlen hochzählen beim Scrollen)
 // ══════════════════════════════════════════════

  function safeTooltipPos(tooltip, clientX, clientY) {
  const isMobile = window.innerWidth <= 600;
  if (isMobile) {
    tooltip.style.left   = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.top    = 'auto';
    tooltip.style.bottom = '16px';
    tooltip.style.position = 'fixed';
  } else {
    tooltip.style.transform = '';
    tooltip.style.bottom = 'auto';
    tooltip.style.left = (clientX + 14) + 'px';
    tooltip.style.top  = (clientY - 40) + 'px';
  }
}
  (function () {
    function animateCounter(el, target, duration) {
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const cards = document.querySelectorAll('.ethik-counter-card');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add('visible');
          const target = parseInt(card.dataset.target);
          const countEl = card.querySelector('.ethik-count');
          animateCounter(countEl, target, 1800);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(c => observer.observe(c));
  })();

// ══════════════════════════════════════════════
// BAR-CHART-AUFBAU-ANIMATION BEIM SCROLLEN
// Balken werden mit width/height:0 gerendert und
// tragen ihren Zielwert in data-target-width/-height.
// Diese Funktion füllt sie (leicht versetzt) auf,
// sobald ihr Container in den Viewport scrollt.
// ══════════════════════════════════════════════
function animateBarFills(root) {
    if (!root) return;
    root.querySelectorAll('[data-target-width]').forEach((bar, i) => {
        const target = bar.getAttribute('data-target-width');
        setTimeout(() => { bar.style.width = target + '%'; }, i * 100);
    });
    root.querySelectorAll('[data-target-height]').forEach((bar, i) => {
        const target = bar.getAttribute('data-target-height');
        setTimeout(() => { bar.style.height = target + '%'; }, i * 80);
    });
    root.querySelectorAll('.dumbbell-row').forEach((row, i) => {
        setTimeout(() => animateDumbbellRow(row), i * 170);
    });
}

// Lässt eine einzelne Dumbbell-Zeile von der Mitte aus "aufklappen":
// beide Punkte starten übereinander in der Zeilenmitte und wandern
// zu ihrer echten Position, die Verbindungslinie wächst synchron mit.
function animateDumbbellRow(row) {
    if (!row || row.classList.contains('visible')) return;
    row.classList.add('visible');
    const line = row.querySelector('.dumbbell-line');
    const dots = row.querySelectorAll('.dumbbell-dot');
    requestAnimationFrame(() => {
        if (line) {
            line.style.left  = line.getAttribute('data-final-left')  + '%';
            line.style.width = line.getAttribute('data-final-width') + '%';
        }
        dots.forEach(dot => {
            dot.style.left = dot.getAttribute('data-final-left') + '%';
        });
    });
}

// ══════════════════════════════════════════════
// GRÜNDE FÜR/GEGEN VERTEIDIGUNGSJOBS
// ══════════════════════════════════════════════
function buildReasonBars(containerId, data, color) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('buildReasonBars: container not found', containerId);
        return;
    }
    data.forEach(item => {
        const row = document.createElement('div');
        row.className = 'gruende-row';
   const isMobile = window.innerWidth <= 600;
const isNarrow = isMobile && item.pct <= 50;

row.innerHTML = `
    <div class="gruende-label">${item.label}</div>
    <div class="gruende-track" style="overflow:visible; position:relative;">
        <div class="gruende-fill" style="width:0%; background:${color}; overflow:visible; position:relative;" data-target-width="${item.pct}">
            ${!isNarrow
              ? `<span style="padding-right:8px;color:rgba(255,255,255,0.85);font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;">${item.pct}%</span>`
              : `<span style="position:absolute;left:calc(100% + 6px);top:50%;transform:translateY(-50%);color:${color};font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;white-space:nowrap;">${item.pct}%</span>`
            }
        </div>
    </div>
`;
        container.appendChild(row);
    });
}

buildReasonBars('bars-ja',   gruendeJa,   colorJa);
buildReasonBars('bars-nein', gruendeNein, colorNein);

function showGruende(which) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.gruende-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('btn-' + which).classList.add('active');
    document.getElementById('panel-' + which).classList.add('active');
}

// Ja standardmäßig aktiv
showGruende('ja');

// zeigt beim ersten Erscheinen, dass die Buttons klickbar sind
if ('IntersectionObserver' in window) {
    const toggleDemoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => showGruende('nein'), 700);
                setTimeout(() => showGruende('ja'), 1600);
                toggleDemoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    toggleDemoObserver.observe(document.querySelector('.toggle-question'));
}


// ══════════════════════════════════════
// TENSION SLIDERS (ZUSTIMMUNG + SZENARIO)
// ══════════════════════════════════════
window.addEventListener("DOMContentLoaded", () => {
    setActiveOpinion(null);

  // Beim initialisieren — Ergebnis-Block verstecken
  const tensionResultelement = document.getElementById('tensionResult');
  if (tensionResultelement){
      tensionResultelement.style.opacity = '0';
      tensionResultelement.style.transition = 'opacity 0.6s ease';
  }

  let tensionTouched = false;

  function updateTension(val) {
    if (!tensionTouched) {
      tensionTouched = true;
      const resultBlock = document.getElementById('tensionResult');
      resultBlock.classList.add('touched');
      resultBlock.style.opacity = '1';
    }
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setActiveOpinion(null);
  });
});

// INTERACTION
// ══════════════════════════════════════
function setActiveOpinion(id) {
  activeOpinion = id;

  const circles = document.querySelectorAll(".opinion-circle");

  const isReset = id === null;

  circles.forEach(c => {
    const match = parseInt(c.dataset.id);
    if (isReset) {
      c.classList.remove("dim", "active", 'hover');
      c.setAttribute('aria-pressed', 'false');
    } else {
      const activeNow = match === id;
      c.classList.toggle("active", activeNow);
      c.classList.toggle("dim", !activeNow);
      c.setAttribute('aria-pressed', activeNow ? 'true' : 'false');
    }
  });
  updateInsight(id);

  const floatEl = document.getElementById('opinion-float-insight');
  if (!floatEl) return;
  if (id === null) {
    floatEl.classList.remove('visible');
  } else {
    const activeCircle = document.querySelector(`.opinion-circle[data-id="${id}"]`);
    if (activeCircle) positionFloatingInsight(activeCircle);
    const f = document.getElementById('opinion-float-insight');
    if (f) ensureVisibleInViewport(f);
  }
}

const chapterBreak = document.querySelector('.chapter-break');
if (chapterBreak) {
  const cbObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        cbObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  cbObs.observe(chapterBreak);
}

// INSIGHT TEXT (Story Layer)
// ══════════════════════════════════════
function updateInsight(id) {
  const target = document.getElementById("stacked-legend");
  if (target) target.innerHTML = ""; // clear legacy legend content

  const floatEl = document.getElementById('opinion-float-insight');
  if (!floatEl) return;

  if (id === null) {
    floatEl.innerHTML = `<div class="opinion-insight">Klicken Sie auf eine Kategorie, um Details zu sehen.</div>`;
    floatEl.classList.remove('visible');
    return;
  }

  const item = opinionData[id];
  floatEl.innerHTML = `
    <div class="opinion-insight active">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
        <div style="width:12px;height:12px;background:${item.color};border-radius:3px;flex-shrink:0"></div>
        <div style="font-weight:700">${item.title}</div>
      </div>
      <div><strong>${item.value}%</strong> der Befragten:<br>${item.desc}</div>
    </div>
  `;
}

function buildComparisonBarsFor(containerId, data, prefix) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const max = Math.max(...data);
  wrap.innerHTML = data.map((val, i) => {
    const h = Math.round((val / max) * 100);
    return `<div class="comp-bar" id="${containerId}-bar-${i}" style="height:0%" data-target-height="${h}"></div>`;
  }).join('');
}

function updateTensionFor(key, v) {

  const cfg = sliderConfigs[key];
  if (!cfg) return;
  const messages = cfg.messages;
  const studyData = cfg.data;
  const ids = cfg.ids;

  const scaleMin = 1;
  const scaleMax = messages.length;

  if (typeof v === 'undefined' || v === null || v === '') {
    const s = document.getElementById(ids.slider);
    v = s ? parseInt(s.value) : Math.round((scaleMin + scaleMax) / 2);
  } else {
    v = parseInt(v);
    if (ids.resultBlock) {
      const resultBlock = document.getElementById(ids.resultBlock);
      if (resultBlock && !resultBlock.classList.contains('touched')) {
        resultBlock.classList.add('touched');
      }
    }
  }
  let idx = v - scaleMin;
  if (idx < 0) idx = 0;
  if (idx > messages.length - 1) idx = messages.length - 1;

  const span = scaleMax - scaleMin;
  const fillEl = document.getElementById(ids.fill);
  if (fillEl) {
    const sliderEl = document.getElementById(ids.slider);
    let trackEl = null;
    if (sliderEl) {
      const wrap = sliderEl.closest('.slider-track-wrap');
      if (wrap) trackEl = wrap.querySelector('.slider-track');
    }
    let thumbWidth = 18;
    if (sliderEl) {
      try {
        const h = sliderEl.getBoundingClientRect().height;
        if (h && !Number.isNaN(h)) thumbWidth = Math.max(8, Math.round(h * 0.75));
      } catch (e) {
      }
    }

    if (trackEl) {
      const trackRect = trackEl.getBoundingClientRect();
      const trackW = trackRect.width;
      const ratio = span > 0 ? ((v - scaleMin) / span) : 1;
      let posPx = Math.round(ratio * trackW);
      let adj = posPx - Math.round(thumbWidth / 2);
      if (adj < 0) adj = 0;
      if (adj > trackW) adj = trackW;
      fillEl.style.width = adj + 'px';
    } else {
      const fillPct = span > 0 ? Math.round(((v - scaleMin) / span) * 100) : 100;
      fillEl.style.width = fillPct + '%';
    }
  }

  const numEl = document.getElementById(ids.num);
  if (numEl) numEl.textContent = v;

const textEl = document.getElementById(ids.text);
if (textEl && textEl.dataset.touched === 'true') {
  textEl.textContent = `${messages[idx] || ''}`;
}

  // Balken aktualisieren; ids for bars are namespaced
  studyData.forEach((_, i) => {
    const bar = document.getElementById(`${ids.bars}-bar-${i}`);
    if (bar) bar.classList.toggle('active', i === idx);
  });

  const pct = studyData[idx] || 0;
  const comp = document.getElementById(ids.compText);
  if (comp) comp.innerHTML = `<strong>${pct}% der Befragten</strong> haben das ebenfalls angegeben.`;
}

window.addEventListener('load', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    if ('IntersectionObserver' in window) {
      const fadeObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            animateBarFills(e.target);
            fadeObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });
      fadeEls.forEach(el => fadeObs.observe(el));
    } else {
      fadeEls.forEach(el => { el.classList.add('visible'); animateBarFills(el); });
    }
  }
  Object.keys(sliderConfigs).forEach(key => {
    const cfg = sliderConfigs[key];
    const ids = cfg.ids;
    const messages = cfg.messages;
    const scaleMinLocal = 1;
    const scaleMaxLocal = messages.length;

    const sliderEl = document.getElementById(ids.slider);
    if (sliderEl) {
      sliderEl.min = scaleMinLocal;
      sliderEl.max = scaleMaxLocal;
      if (!sliderEl.value) sliderEl.value = Math.round((scaleMinLocal + scaleMaxLocal) / 2);
      sliderEl.addEventListener('input', (e) => {
  const textEl = document.getElementById(ids.text);
  if (textEl) textEl.dataset.touched = 'true';
  updateTensionFor(key, e.target.value);
});
    }
    buildComparisonBarsFor(ids.bars, cfg.data, key);
    updateTensionFor(key);
  });

  // ── Fade-in für alle fullscreen-inner Elemente (sichtbar machen, wenn sie in den Viewport kommen)
  const fullscreenInners = document.querySelectorAll('.fullscreen-inner');
  if (fullscreenInners.length) {
    const innerObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.classList.contains('visible')) {
          e.target.classList.add('visible');
          animateBarFills(e.target);
        }
      });
    }, { threshold: 0.15 });
    fullscreenInners.forEach(el => innerObserver.observe(el));
    // Fallback: falls IntersectionObserver nicht feuert (z. B. in älteren Browsern), machen wir die Elemente sichtbar
    setTimeout(() => {
      fullscreenInners.forEach(el => {
        if (!el.classList.contains('visible')) { el.classList.add('visible'); animateBarFills(el); }
      });
    }, 300);
  }
const compassBreak = document.querySelector('.chapter-break');
if (compassBreak) {
    const needleObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                document.getElementById('compass-needle').classList.add('swing');
                needleObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    needleObs.observe(compassBreak);
}
  // ── Navigation ausblenden beim Reinscrolle UND beim Scroll-Down (wie auf der anderen Seite)
  const nav = document.querySelector('nav');
  const block = document.querySelector('.fullscreen-block');
  if (nav) {
    // Wenn die fullscreen-block in Sicht ist, verberge die Nav (IntersectionObserver)
    if (block) {
      const navObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) nav.classList.add('nav-hidden');
          else nav.classList.remove('nav-hidden');
        });
      }, { threshold: 0.2 });
      navObserver.observe(block);
    }

    let lastY = window.scrollY;
    let ticking = false;
    const SCROLL_DELTA = 8;

    function handleScroll() {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < SCROLL_DELTA) return;
      if (y > lastY && y > 80) {
        // Scrollt nach unten: verstecken
        nav.classList.add('nav-hidden');
      } else {
        // Scrollt nach oben: zeigen
        nav.classList.remove('nav-hidden');
      }
      lastY = y;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { handleScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
  }
});


// ══════════════════════════════════════════════
// PRIORITÄTEN – VERGLEICH DE vs USA (FLIP-Animation)
// ══════════════════════════════════════════════

const chartDE = document.getElementById('priority-chart-de');
if (chartDE) {

  const chartBlock  = chartDE.closest('.chart-block');
  const chartHeader = chartBlock?.querySelector('.chart-header');
  if (chartHeader) {
    const tabRow = document.createElement('div');
    tabRow.className = 'tab-row';
    tabRow.style.marginTop = '12px';
    tabRow.innerHTML = `
      <button class="tab-btn active" id="tab-de2">Deutsche Studierende</button>
      <button class="tab-btn"        id="tab-usa2">US Tech Workers</button>
    `;
    chartHeader.appendChild(tabRow);

    tabRow.querySelector('#tab-de2').addEventListener('click', function () {
      if (currentViewDE === 'de') return;
      currentViewDE  = 'de';
      colorPrimary   = "#c8441a";
      colorSecondary = "#e0815f";
      this.classList.add('active');
      tabRow.querySelector('#tab-usa2').classList.remove('active');
      flipSort('de');
    });
    tabRow.querySelector('#tab-usa2').addEventListener('click', function () {
      if (currentViewDE === 'usa') return;
      currentViewDE  = 'usa';
      colorPrimary   = "#e0815f";
      colorSecondary = "#c8441a";
      this.classList.add('active');
      tabRow.querySelector('#tab-de2').classList.remove('active');
      flipSort('usa');
    });
  }

  // Wrapper für animierbare Rows
  const rowWrapper = document.createElement('div');
  rowWrapper.id = 'priority-de-rows';
  rowWrapper.style.position = 'relative';
  chartDE.appendChild(rowWrapper);

  buildRows('de');
}

function buildRows(view, instant = false) {
  const chartDE2   = document.getElementById('priority-chart-de');
  const rowWrapper = document.getElementById('priority-de-rows');
  if (!rowWrapper || !chartDE2) return;

  // Alle alten Header entfernen
  chartDE2.querySelectorAll('.priority-de-header').forEach(el => el.remove());

  rowWrapper.innerHTML = '';

  const deColor  = colorPrimary;
  const usaColor = colorSecondary;

  // Header neu einfügen
  const headerEl = document.createElement('div');
  headerEl.className = 'priority-de-header';
  headerEl.style.cssText = 'display:grid; grid-template-columns:160px 1fr 1fr; gap:8px; margin-bottom:8px;';
  headerEl.innerHTML = `
    <div></div>
    <div class="priority-header-label" style="color:${deColor}; text-align:left;">DE</div>
    <div class="priority-header-label" style="color:${usaColor}; text-align:left;">USA</div>
  `;
  chartDE2.insertBefore(headerEl, rowWrapper);

  // Rows sortieren und rendern
  const sorted = [...combinedPriorityData].sort((a, b) =>
    view === 'de' ? b.de - a.de : b.usa - a.usa
  );

  sorted.forEach((item) => {
    const block = document.createElement('div');
    block.dataset.key = item.label;
    block.style.marginBottom = '20px';
    block.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    
    const deOutside = window.innerWidth <= 768 ? item.de <= 50 : item.de <= 10;
    const usaOutside = window.innerWidth <= 768 ? item.usa <= 50 : item.usa <= 10;

block.innerHTML = `
  <div class="priority-row" style="margin-bottom:2px;">
    <div class="priority-label">${item.label.replace('\n','<br>')}</div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <div class="priority-bar-track" style="background:rgba(0,0,0,0.05); overflow:visible; position:relative;">
        <div class="priority-bar-fill" style="width:${instant ? item.de : 0}%;background:${deColor};position:relative;overflow:visible;" data-target-width="${item.de}">
          <span style="${deOutside ? `position:absolute;left:calc(100% + 6px);top:50%;transform:translateY(-50%);color:${deColor};white-space:nowrap;font-weight:700;` : 'color:white;padding-right:7px;'}">${item.de}%</span>
        </div>
      </div>
      <div class="priority-bar-track" style="background:rgba(0,0,0,0.05); overflow:visible; position:relative;">
        <div class="priority-bar-fill" style="width:${instant ? item.usa : 0}%;background:${usaColor};position:relative;overflow:visible;" data-target-width="${item.usa}">
          <span style="${usaOutside ? `position:absolute;left:calc(100% + 6px);top:50%;transform:translateY(-50%);color:${usaColor};white-space:nowrap;font-weight:700;` : 'color:white;padding-right:7px;'}">${item.usa}%</span>
        </div>
      </div>
    </div>
  </div>
`;
    rowWrapper.appendChild(block);
  });

  if (instant) return;

  // Scroll-triggered Balken-Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rowWrapper.querySelectorAll('[data-target-width]').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-target-width') + '%';
          }, i * 40);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(rowWrapper);
}

function flipSort(view) {
  const rowWrapper = document.getElementById('priority-de-rows');
  if (!rowWrapper) return;

  const blocks = [...rowWrapper.querySelectorAll('[data-key]')];

  const before = {};
  blocks.forEach(b => { before[b.dataset.key] = b.getBoundingClientRect().top; });
  const sorted = [...combinedPriorityData].sort((a, b) =>
    view === 'de' ? b.de - a.de : b.usa - a.usa
  );
  sorted.forEach(item => {
    const block = blocks.find(b => b.dataset.key === item.label);
    if (block) rowWrapper.appendChild(block);
  });
  const after = {};
  blocks.forEach(b => { after[b.dataset.key] = b.getBoundingClientRect().top; });
  blocks.forEach(b => {
    const delta = before[b.dataset.key] - after[b.dataset.key];
    b.style.transition = 'none';
    b.style.transform  = `translateY(${delta}px)`;
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      blocks.forEach(b => {
        b.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
        b.style.transform  = 'translateY(0)';
      });
    });
  });
  setTimeout(() => {
    buildRows(view, true);
  }, 600);
}

 // ══════════════════════════════════════════════════════
 // DEUTSCHLAND KARTE (MIT TOOLTIP)
// ══════════════════════════════════════════════════════

const svgEl = document.getElementById('deutschland-svg');
const tooltip = document.getElementById('map-tooltip');
const tooltipCity = document.getElementById('tooltip-city');
const tooltipText = document.getElementById('tooltip-text');
const mapBlock = document.getElementById('map-block');
const svgNS = "http://www.w3.org/2000/svg";

const padding = 24;

fetch("https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json")
  .then(r => r.json())
  .then(geojson => {
    if (!svgEl) {
      console.warn('deutschland-svg not found; aborting map render');
      return;
    }
    const fc = { type: "FeatureCollection", features: geojson.features };

    const projection = d3.geoMercator().fitSize([500, 560], fc);
    const path = d3.geoPath().projection(projection);

    const [[x0, y0], [x1, y1]] = d3.geoPath().projection(projection).bounds(fc);
    svgEl.setAttribute("viewBox", [
      x0 - padding, y0 - padding,
      (x1 - x0) + padding * 2, (y1 - y0) + padding * 2
    ].join(" "));

    const svg = d3.select("#deutschland-svg");

    // SVG Pattern für gestrichelte Fläche (Verbot)
    svg.append("defs")
      .append("pattern")
      .attr("id", "verbot-pattern")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 6)
      .attr("height", 6)
      .attr("patternTransform", "rotate(-45)")
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 6)
      .attr("stroke", "#c8441a")
      .attr("stroke-width", 2);

    // Farbskala für Zivilklausel-Abdeckung: hell (0%) → dunkel (50%+)
    const colorScale = d3.scaleLinear()
      .domain([0, 0.5])
      .range(["#faf7f2", "#c8441a"])
      .clamp(true);
    
    svg.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("class", (d) => {
        const props = d && d.properties ? d.properties : {};
        const name = props.NAME || props.name || props.NAME_1 || props.GEN || props.name_de;
        return name === "Bayern" ? "bundesland verbot" : "bundesland";
      })
      .attr("d", path)
      .attr("fill", (d) => {
        const props = d && d.properties ? d.properties : {};
        const name = props.NAME || props.name || props.NAME_1 || props.GEN || props.name_de;
        if (name === "Bayern") {
          return "url(#verbot-pattern)";
        }
        const coverage = zivilklauselDaten[name] || 0;
        return colorScale(coverage);
      });

    svg.selectAll('path.bundesland')
      .on('mouseenter', (event, d) => {
        const props = (d && d.properties) ? d.properties : {};
        const name = props.NAME || props.name || props.NAME_1 || props.GEN || props.name_de || 'Bundesland';
        if (tooltipCity) tooltipCity.textContent = name;
        tooltipText.textContent =
          bundeslaender[name] || 'Keine Informationen verfügbar';
        if (tooltip) tooltip.classList.add('visible');
        positionTooltip(event);
      })
      .on('mousemove', (event) => positionTooltip(event))
      .on('mouseleave', () => { if (tooltip) tooltip.classList.remove('visible'); });
  })
  .catch(err => {
    if (svgEl) svgEl.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#7a77aa" font-family="DM Sans,sans-serif" font-size="13">Karte konnte nicht geladen werden</text>';
    console.error('Fehler beim Laden der Karte:', err);
  });

function positionTooltip(e) {
  const rect = mapBlock.getBoundingClientRect();
  const ttW = 230;
  const ttH = tooltip.offsetHeight || 80;
  
  let x = e.clientX - rect.left + 14;
  let y = e.clientY - rect.top - 10;

  if (x + ttW > rect.width) x = rect.width - ttW - 8;
  if (x < 8) x = 8;
  if (y + ttH > rect.height) y = rect.height - ttH - 8;
  if (y < 8) y = 8;

  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}
window.addEventListener('scroll', () => {
  if (tooltip) tooltip.classList.remove('visible');
}, { passive: true });


// ══════════════════════════════════════════════
// UMFRAGE-CHART (BALKEN + NETTO)
// ══════════════════════════════════════════════

function umfrageGetFiltered() {
  if (umfrageCurrentGroup === 'all') return umfrageData;
  return umfrageData.filter(d => d.group === umfrageCurrentGroup || d.group === 'all');
}

function animateUmfrageChart(root) {
  if (!root) return;

  const rows = root.querySelectorAll('.bar-row');
  rows.forEach((row, rowIndex) => {
    const segments = row.querySelectorAll('[data-target-width]');
    segments.forEach((segment, segIndex) => {
      const target = segment.getAttribute('data-target-width');
      const delay = rowIndex * 160 + segIndex * 80;
      segment.style.width = '0%';
      segment.style.transition = 'width 1800ms cubic-bezier(0.22, 1, 0.36, 1)';
      segment.style.transitionDelay = `${delay}ms`;
      segment.style.willChange = 'width';
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          segment.style.width = `${target}%`;
        }, delay);
      });
    });
  });
}

function umfrageRender() {
  const data = umfrageGetFiltered();
  const container = document.getElementById('umfrage-rows');
  const nettoNote = document.getElementById('umfrage-netto-note');
  container.innerHTML = '';
const COLORS = ['#c8441a','#d4623d','#e0815f','#eba98e','#f5d4c4'];
  if (umfrageCurrentView === 'netto') {
    nettoNote.style.display = 'block';
    const max = 60;
    data.forEach(d => {
      const netto = (d.eherZu + d.sehrStark) - (d.garNicht + d.eherNicht);
      const pos   = netto >= 0;
      const pct   = Math.min(Math.abs(netto) / max * 100, 100);
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <div class="bar-label-text">${d.label}</div>
        <div style="flex:1;display:flex;align-items:center;gap:8px;">
          <div style="flex:1;height:28px;background:#eeebe6;border-radius:4px;overflow:hidden;position:relative;">
            <div style="
              position:absolute;
              ${pos ? 'left' : 'right'}:0;
              width:0%;
              height:100%;
              background:${pos ? '#f5d4c4' : '#c8441a'};
              border-radius:4px;
              display:flex;align-items:center;
              transition:width 1800ms cubic-bezier(0.22, 1, 0.36, 1);
              ${pos ? 'justify-content:flex-end;padding-right:8px;' : 'justify-content:flex-start;padding-left:8px;'}
            " data-target-width="${pct}">
              <span style="font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:white;">${netto > 0 ? '+' : ''}${netto}%</span>
            </div>
          </div>
        </div>`;
          container.appendChild(row);
            });
            return;
          }
  nettoNote.style.display = 'none';
  const fields = ['garNicht','eherNicht','ambivalent','eherZu','sehrStark'];
  data.forEach(d => {
    const row = document.createElement('div');
    row.className = 'bar-row';
    let segments = '';
   fields.forEach((f, i) => {
  const pct = d[f];
  if (pct === 0) return;
  const isMobile = window.innerWidth <= 600;
  const hideOnMobile = isMobile && pct <= 10;
  segments += `<div style="width:0%;height:100%;background:${COLORS[i]};display:flex;align-items:center;justify-content:center;transition:width 900ms cubic-bezier(0.22, 1, 0.36, 1);position:relative;overflow:visible;" data-target-width="${pct}">
    ${!hideOnMobile && pct >= 7
      ? `<span style="font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:white;position:relative;z-index:1;">${pct}%</span>`
      : ''}
  </div>`;
});
    row.innerHTML = `
      <div class="bar-label-text">${d.label}</div>
      <div style="flex:1;height:30px;background:#eeebe6;border-radius:4px;overflow:hidden;display:flex;">
        ${segments}
      </div>`;
    container.appendChild(row);
  });
}
function umfrageFilter(group, btn) {
  umfrageCurrentGroup = group;
  document.querySelectorAll('#umfrage-chart .tab-btn').forEach(b => {
    if (['all','geschlecht','alter','bildung'].includes(b.getAttribute('onclick').match(/'([^']+)'/)[1])) b.classList.remove('active');
  });
  btn.classList.add('active');
  umfrageRender();
  animateUmfrageChart(document.getElementById('umfrage-chart'));
}

function umfrageView(view, btn) {
  umfrageCurrentView = view;
  document.querySelectorAll('#umfrage-chart .tab-btn').forEach(b => {
    if (['stacked','netto'].includes(b.getAttribute('onclick').match(/'([^']+)'/)[1])) b.classList.remove('active');
  });
  btn.classList.add('active');
  umfrageRender();
  animateUmfrageChart(document.getElementById('umfrage-chart'));
}

umfrageRender();
animateUmfrageChart(document.getElementById('umfrage-chart'));

// ══════════════════════════════════════════════
// ── NUTZEN VS. RISIKO: BUTTERFLY-DIAGRAMM ──
// ══════════════════════════════════════════════

function nutzenRisikoGetFiltered() {
  if (nutzenRisikoCurrentGroup === 'all') return nutzenRisikoData;
  return nutzenRisikoData.filter(d => d.group === nutzenRisikoCurrentGroup);
}

function nutzenRisikoRender() {
  const data = nutzenRisikoGetFiltered();
  const container = document.getElementById('nutzenrisiko-rows');
  container.innerHTML = '';

  const maxVal = Math.max(...data.flatMap(d => [d.nuetzlich, d.riskant]), 1);
  const scale = 90 / maxVal;

  data.forEach(d => {
    const wLeft  = (d.nuetzlich * scale).toFixed(1);
    const wRight = (d.riskant   * scale).toFixed(1);

    const row = document.createElement('div');
    row.className = 'bar-row';
    row.style.cssText = 'display:flex;align-items:center;gap:0;margin-bottom:6px;';
    row.innerHTML = `
      <div style="flex:1;display:flex;align-items:center;justify-content:flex-end;gap:8px;">
        <span style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--ink-light);white-space:nowrap;">${d.nuetzlich}%</span>
        <div style="width:0%;height:28px;border-radius:4px 0 0 4px;background:#F2AC97;transition:width 0.7s cubic-bezier(0.16,1,0.3,1);" data-target-width="${wLeft}"></div>
      </div>
      <div class="bar-label-text" style="width:150px;text-align:center;flex-shrink:0;">${d.label}</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:flex-start;gap:8px;">
        <div style="width:0%;height:28px;border-radius:0 4px 4px 0;background:#c8441a;transition:width 0.7s cubic-bezier(0.16,1,0.3,1);" data-target-width="${wRight}"></div>
        <span style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--ink-light);white-space:nowrap;">${d.riskant}%</span>
      </div>`;
    container.appendChild(row);
  });
}

function nutzenRisikoFilter(group, btn) {
  nutzenRisikoCurrentGroup = group;
  document.querySelectorAll('#nutzenrisiko-chart .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  nutzenRisikoRender();
  animateBarFills(document.getElementById('nutzenrisiko-chart'));
}
nutzenRisikoRender();


// ══════════════════════════════════════════════════════
// DUMBBELL-CHART: VOLLE ZUSTIMMUNG NACH GESCHLECHT
//   Frage 12: "Ich kann mir vorstellen, in einem Unternehmen oder
//              Projekt mit Bezug zum Rüstungs-/Verteidigungsbereich
//              zu arbeiten."
//   Frage 19: "Ich hätte Gewissenskonflikte, wenn ich im
//              Defense-Bereich arbeiten würde."
//   Frage 11: "(Berufs)ethik bietet für mich eine Orientierung
//              für mein Handeln."
// ══════════════════════════════════════════════════════

function gewissenCalloutText(m, f) {
    const diff = m - f;
    const abs = Math.round(Math.abs(diff));
    if (abs < 2) {
        return { abs, text: 'Männer und Frauen stimmen hier fast gleich häufig voll zu.', dominant: 'neutral' };
    }
    if (diff > 0) {
        return { abs, text: `${abs} Prozentpunkte mehr Männer als Frauen stimmen hier voll zu.`, dominant: 'm' };
    }
    return { abs, text: `${abs} Prozentpunkte mehr Frauen als Männer stimmen hier voll zu.`, dominant: 'f' };
}

function buildGewissenDumbbell() {
    const container = document.getElementById('gewissen-dumbbell-rows');
    if (!container) return;

    gewissenLabels.forEach((label, i) => {
        const m = gewissenMaenner[i];
        const f = gewissenFrauen[i];
        const leftM = (m / DUMBBELL_SCALE_MAX * 100);
        const leftF = (f / DUMBBELL_SCALE_MAX * 100);
        const lineLeft  = Math.min(leftM, leftF).toFixed(1);
        const lineWidth = Math.abs(leftF - leftM).toFixed(1);
        const mid = ((leftM + leftF) / 2).toFixed(1);
        const callout = gewissenCalloutText(m, f);
        const calloutColor = callout.dominant === 'm' ? 'var(--accent)'
                            : callout.dominant === 'f' ? 'var(--accent-light)'
                            : 'var(--rule)';

        const row = document.createElement('div');
        row.className = 'dumbbell-row';
        row.innerHTML = `
            <div class="dumbbell-row-label">
                <span>${label}</span>
                <span class="dumbbell-chevron">›</span>
            </div>
            <div class="dumbbell-track">
                <div class="dumbbell-line" style="left:${mid}%; width:0%"
                     data-final-left="${lineLeft}" data-final-width="${lineWidth}"></div>
                <div class="dumbbell-dot dumbbell-dot--m" style="left:${mid}%" data-final-left="${leftM.toFixed(1)}">
                    <span class="dumbbell-value dumbbell-value--m">${Math.round(m)}%</span>
                </div>
                <div class="dumbbell-dot dumbbell-dot--f" style="left:${mid}%" data-final-left="${leftF.toFixed(1)}">
                    <span class="dumbbell-value dumbbell-value--f">${Math.round(f)}%</span>
                </div>
            </div>
            <div class="dumbbell-callout" style="border-left-color:${calloutColor}">
                <span class="dumbbell-callout-delta">Δ ${callout.abs} pp</span>
                <span class="dumbbell-callout-text">${callout.text}</span>
            </div>
        `;
        row.addEventListener('click', () => row.classList.toggle('open'));
        container.appendChild(row);
    });
}

buildGewissenDumbbell(); 

// ══════════════════════════════════════════════
// DATEN UND VISUALISIERUNG FÜR VERANTWORTUNG
// ══════════════════════════════════════════════

const CSV_PATH = 'data/rohdaten.csv';

const VERANTWORTUNG_COLS = [
  { key: 'ingenieur',    label: 'Ingenieur*in selbst' },
  { key: 'arbeitgeber',  label: 'Arbeitgeber' },
  { key: 'gesetzgeber',  label: 'Gesetzgeber / Politik' },
  { key: 'auftraggeber', label: 'Auftraggeber' },
  { key: 'gesellschaft', label: 'Gesellschaft als Ganzes' },
];
let allRows = [];

// Aktive Filter — mehrere gleichzeitig möglich
let activeFilters = { geschlecht: null, studiengang: null, alter: null };

const COL_GESCHLECHT  = 2;
const COL_ALTER       = 3;
const COL_STUDIENGANG = 14;
const COL_V_START     = 34;


Papa.parse(CSV_PATH, {
  download: true,
  header: false,
  skipEmptyLines: true,
  complete: (results) => {
    const rows = results.data;
    const header = rows[0];

    allRows = rows.slice(1).filter(r => {
      const g = r[COL_GESCHLECHT]?.trim().toLowerCase();
      if (g === 'divers') return false;  // nur Divers raus
      return true;
    });

    buildFilterButtons();
    renderChart(getFilteredRows());
  },
  error: (err) => console.error('CSV Fehler:', err)
});

function buildFilterButtons() {
  const geschlechter = [...new Set(allRows.map(r => r[COL_GESCHLECHT]).filter(Boolean))].sort();

  // Informatik + Wirtschaftsinformatik zusammenführen
  const studiengaengeRaw = allRows.map(r => r[COL_STUDIENGANG]).filter(Boolean);
  const studiengaenge = [...new Set(studiengaengeRaw.map(s => {
    if (s.toLowerCase().includes('informatik')) return 'Informatik / Wirtschaftsinformatik';
    return s;
  }))].sort();

  const alterGruppen = ['< 23', '23–26', '27–30'];

  renderFilterBtns('filter-geschlecht', geschlechter, 'geschlecht');
  renderFilterBtns('filter-studiengang', studiengaenge, 'studiengang');
  renderFilterBtns('filter-alter', alterGruppen, 'alter');
}

function renderFilterBtns(containerId, values, type) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = values.map(v => `
    <button class="race-btn" data-filter="${type}" data-value="${v}"
      onclick="toggleFilter('${type}','${v}',this)">${v}</button>
  `).join('');
}

function toggleFilter(type, value, btn) {
  if (type === 'all') {
    // Alle Filter zurücksetzen
    activeFilters = { geschlecht: null, studiengang: null, alter: null };
    document.querySelectorAll('.race-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderChart(getFilteredRows());
    return;
  }

  if (activeFilters[type] === value) {
    activeFilters[type] = null;
    btn.classList.remove('active');
  } else {
    document.querySelectorAll(`.race-btn[data-filter="${type}"]`)
      .forEach(b => b.classList.remove('active'));
    activeFilters[type] = value;
    btn.classList.add('active');
  }

  // Gesamt-Button deaktivieren wenn irgendein Filter aktiv
  const anyActive = Object.values(activeFilters).some(v => v !== null);
  const gesamtBtn = document.querySelector('.race-btn[data-value="all"]');
  if (gesamtBtn) gesamtBtn.classList.toggle('active', !anyActive);

  renderChart(getFilteredRows());
}

function getFilteredRows() {
  return allRows.filter(r => {
    // Geschlecht
    if (activeFilters.geschlecht && r[COL_GESCHLECHT] !== activeFilters.geschlecht) return false;
    // Studiengang
    if (activeFilters.studiengang) {
      const sg = r[COL_STUDIENGANG]?.trim() || '';
      const mapped = (sg.toLowerCase().includes('informatik') || sg.toLowerCase().includes('wirtschafts'))
        ? 'Informatik / Wirtschaftsinformatik'
        : sg;
      if (mapped !== activeFilters.studiengang) return false;
    }
    // Alter
    if (activeFilters.alter) {
      const age = parseInt(r[COL_ALTER]);
      if (isNaN(age)) return false;
     if (activeFilters.alter === '< 23') {
       const raw = r[COL_ALTER]?.trim();
       const age = parseInt(raw);
       if (raw === 'Unter 18') return true;
       if (isNaN(age) || age >= 23) return false;
     }
     if (activeFilters.alter === '23–26' && !(age >= 23 && age <= 26)) return false;
     if (activeFilters.alter === '27–30' && !(age >= 27 && age <= 30)) return false;
    }
    return true;
  });
}

function renderChart(rows) {
  const n = rows.length;
  const nEl    = document.getElementById('race-n');
  const barsEl = document.getElementById('race-bars');
  const absEl  = document.getElementById('race-absolute');
  if (!barsEl || !absEl) return;

  if (nEl) nEl.textContent = `n = ${n}`;

  if (n === 0) {
    barsEl.innerHTML = `
      <div style="padding:32px 0;text-align:center;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--ink-faint);line-height:1.6;">
        Leider sind für deine Auswahl<br>keine Daten vorhanden.
      </div>
    `;
    absEl.innerHTML = '';
    return;
  }

  const counts = VERANTWORTUNG_COLS.map((col, i) => {
    const validRows = rows.filter(r => {
      const val = parseInt(r[COL_V_START + i]);
      return !isNaN(val) && val >= 1 && val <= 5;
    });
    const sum = validRows.reduce((acc, r) => acc + parseInt(r[COL_V_START + i]), 0);
    const avg = validRows.length > 0 ? (sum / validRows.length) : 5;
    return { key: col.key, label: col.label, count: validRows.length, avg: Math.round(avg * 10) / 10 };
  });

  counts.sort((a, b) => a.avg - b.avg);
  const maxAvg = 5;

  // ── FLIP ──
  const existing = {};
  barsEl.querySelectorAll('.race-row[data-key]').forEach(el => {
    existing[el.dataset.key] = el;
    // FIRST — Position vor dem Umsortieren merken
    existing[el.dataset.key]._firstRect = el.getBoundingClientRect();
  });

  // Neu aufbauen / umsortieren
  counts.forEach((item, rank) => {
    let row = existing[item.key];

    if (!row) {
      row = document.createElement('div');
      row.className = 'race-row';
      row.dataset.key = item.key;
      row.innerHTML = `
        <div class="race-rank">${rank + 1}</div>
        <div class="race-label">${item.label}</div>
        <div class="race-track">
          <div class="race-fill" style="width:0%"><span></span></div>
        </div>
      `;
      barsEl.appendChild(row);
      existing[item.key] = row;
    }

    barsEl.appendChild(row);
    row.querySelector('.race-rank').textContent = rank + 1;
    row.querySelector('.race-rank').style.color = rank === 0 ? 'var(--accent)' : 'var(--ink-faint)';
  });

  // LAST + INVERT + PLAY
  counts.forEach((item) => {
    const row = existing[item.key];
    if (!row) return;

    const firstRect = row._firstRect;
    const lastRect  = row.getBoundingClientRect();

    if (firstRect) {
      const dy = firstRect.top - lastRect.top;
      if (Math.abs(dy) > 1) {
        // Invert
        row.style.transition = 'none';
        row.style.transform  = `translateY(${dy}px)`;
        // Play
        requestAnimationFrame(() => requestAnimationFrame(() => {
          row.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          row.style.transform  = 'translateY(0)';
        }));
      }
    }

    // Balken animieren
    const fill = row.querySelector('.race-fill');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      fill.style.width = `${((maxAvg - item.avg) / (maxAvg - 1)) * 100}%`;
      fill.querySelector('span').textContent = `Ø ${item.avg}`;
    }));
  });

  absEl.innerHTML = counts.map(item => `
    <div class="race-absolute-item">
      <strong>Ø ${item.avg}</strong> ${item.label}
      <span style="color:var(--ink-faint);font-size:11px">(n=${item.count})</span>
    </div>
  `).join('');
}


// ══════════════════════════════════════════════════════
// ── HEATMAP ──
// ══════════════════════════════════════════════════════

function hmPctToColor(pct) {
  const t = Math.max(0, Math.min(1, pct / 100));
  const start = [250, 247, 242];
  const end = [200, 68, 26];
  const mix = start.map((v, i) => Math.round(v + (end[i] - v) * t));
  return `rgb(${mix[0]},${mix[1]},${mix[2]})`;
}

const hmtt = document.getElementById('hmtt');

function showHmTT(e, sg, col, count, pct) {
  hmtt.innerHTML = `<strong>${sg}</strong>${col}<br>
    Anteil: <span style="color:var(--accent-light)">${pct.toFixed(1)} %</span><br>
    Anzahl: <span style="color:var(--accent-light)">${count} Studierende</span>`;
  hmtt.classList.add('visible');
  moveHmTT(e);
}
function moveHmTT(e) {
  const ttW = hmtt.offsetWidth || 200;
  const ttH = hmtt.offsetHeight || 70;
  const margin = 8;

  let x = e.clientX + 14;
  let y = e.clientY - ttH - 10; // oberhalb des Cursors

  // rechter Rand
  if (x + ttW > window.innerWidth - margin) x = e.clientX - ttW - 14;
  // oberer Rand — dann unterhalb
  if (y < margin) y = e.clientY + 14;
  // unterer Rand
  if (y + ttH > window.innerHeight - margin) y = window.innerHeight - ttH - margin;

  hmtt.style.left = x + 'px';
  hmtt.style.top  = y + 'px';
}

// Tooltip beim Scrollen ausblenden
window.addEventListener('scroll', () => {
  if (hmtt) hmtt.classList.remove('visible');
}, { passive: true });
function hideHmTT() { hmtt.classList.remove('visible'); }

function renderHeatmap() {
  const grid = document.getElementById('hgrid');
  grid.innerHTML = '';

  const empty = document.createElement('div');
  empty.className = 'h-col-head';
  grid.appendChild(empty);

  HM_COLS.forEach(col => {
    const h = document.createElement('div');
    h.className = 'h-col-head';
    h.textContent = col;
    grid.appendChild(h);
  });

  HM_RAW.forEach(row => {
      const lbl = document.createElement('div');
      lbl.className = 'h-row-label';
      lbl.innerHTML = `${row.sg}<span>n = ${row.n}</span>`;
      grid.appendChild(lbl);

      HM_COLS.forEach(col => {
        const count = row.vals[col] || 0;
        const pct   = (count / row.n) * 100;
        const cell  = document.createElement('div');
        cell.className = 'h-cell';
        cell.style.background = hmPctToColor(pct);
        cell.addEventListener('mouseenter', e => showHmTT(e, row.sg, col, count, pct));
        cell.addEventListener('mousemove', moveHmTT);
        cell.addEventListener('mouseleave', hideHmTT);
        grid.appendChild(cell);
      });
    });
  }
  renderHeatmap();

//
// ── DOT PLOT: Dual-Use Frage ──
//

// Verschiebe Tooltip zu body, um overflow:hidden Problem zu beheben
if (dotplotTooltip) {
  dotplotTooltip = dotplotTooltip.cloneNode(true);
  document.body.appendChild(dotplotTooltip);
}

// Rows-Element nicht mehr nötig – alles auf einer Linie

if (dotplotFiltersEl && dotplotAxisEl) {

  function dotplotPct(val) {
    return ((val - DOTPLOT_MIN) / (DOTPLOT_MAX - DOTPLOT_MIN)) * 100;
  }

  function dotplotShapeInner(shape, color) {
    if (shape === 'circle')   return `<circle cx="7" cy="7" r="6" fill="${color}"/>`;
  }

  function dotplotShapeSVG(shape, color) {
    return `<svg width="14" height="14" viewBox="0 0 14 14">${dotplotShapeInner(shape, color)}</svg>`;
  }

  // Tooltip – position relativ zum Viewport
document.addEventListener('mousemove', e => {
  if (!dotplotTooltip) return;
  dotplotTooltip.style.left = (e.clientX + 2) + 'px';
  dotplotTooltip.style.top  = (e.clientY + 2) + 'px';
});

  // Filter-Buttons: Radio-Logik (nur eine Gruppe aktiv)
  const filterGroups = [
    { key: 'geschlecht',  label: 'Nach Geschlecht' },
    { key: 'studiengang', label: 'Nach Studiengang' },
  ];

  const btnRow = document.createElement('div');
  btnRow.className = 'dotplot-filter-group';

  filterGroups.forEach(fg => {
    const btn = document.createElement('button');
    btn.className = 'dotplot-toggle';
    btn.dataset.group = fg.key;
    btn.textContent = fg.label;
    btn.addEventListener('click', () => {
      if (dotplotActiveGroup === fg.key) {
        // nochmal klicken = ausschalten
        dotplotActiveGroup = null;
        btn.classList.remove('active');
      } else {
        dotplotActiveGroup = fg.key;
        btnRow.querySelectorAll('.dotplot-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      dotplotRender();
    });
    btnRow.appendChild(btn);
  });
  dotplotFiltersEl.appendChild(btnRow);

  // Gesamt-Punkt (immer sichtbar)
  const gesamtG  = DOTPLOT_GROUPS.find(g => g.key === 'gesamt');
  const gesamtPt = document.createElement('div');
  gesamtPt.className = 'dotplot-point';
  gesamtPt.style.cssText = `left:${dotplotPct(gesamtG.mean)}%; top:1px; opacity:1;`;
  gesamtPt.innerHTML = dotplotShapeSVG('circle', 'var(--ink)');
  gesamtPt.addEventListener('mouseenter', () => {
    dotplotTooltip.textContent = `Gesamt: Ø ${gesamtG.mean.toFixed(2)}`;
    dotplotTooltip.classList.add('show');
  });
  gesamtPt.addEventListener('mouseleave', () => dotplotTooltip.classList.remove('show'));
  dotplotAxisEl.appendChild(gesamtPt);

  if (dotplotGesamtLine) dotplotGesamtLine.style.left = dotplotPct(gesamtG.mean) + '%';

  // Punkte für alle anderen Gruppen – alle auf der Achse, ein/ausblendbar
  const dotplotPointEls = {};
  DOTPLOT_GROUPS.filter(g => g.key !== 'gesamt').forEach(g => {
    const pt = document.createElement('div');
    pt.className = 'dotplot-point';
    pt.style.cssText = `left:${dotplotPct(g.mean)}%; top:1px; opacity:0; pointer-events:none;`;
    pt.innerHTML = dotplotShapeSVG(g.shape, g.color);
    pt.addEventListener('mouseenter', () => {
      dotplotTooltip.textContent = `${g.label}: Ø ${g.mean.toFixed(2)}`;
      dotplotTooltip.classList.add('show');
    });
    pt.addEventListener('mouseleave', () => dotplotTooltip.classList.remove('show'));
    dotplotAxisEl.appendChild(pt);
    dotplotPointEls[g.key] = pt;
  });

  // Legende unter der Achse
  const legendEl = document.createElement('div');
  legendEl.id = 'dotplotLegend';
  legendEl.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px 16px; margin-top:12px; min-height:20px;';
  dotplotAxisEl.parentElement.insertAdjacentElement('afterend', legendEl);

  function dotplotRender() {
    legendEl.innerHTML = '';

    // Gesamt immer in Legende
    legendEl.innerHTML += `<span style="font-size:12px;color:var(--ink-light);display:flex;align-items:center;gap:5px;">
      ${dotplotShapeSVG('circle','var(--ink)')} Gesamt (Ø ${gesamtG.mean.toFixed(2)})
    </span>`;

    DOTPLOT_GROUPS.filter(g => g.key !== 'gesamt').forEach(g => {
      const on = dotplotActiveGroup === g.group;
      const pt = dotplotPointEls[g.key];
      pt.style.opacity       = on ? '1' : '0';
      pt.style.pointerEvents = on ? 'auto' : 'none';

      if (on) {
        legendEl.innerHTML += `<span style="font-size:12px;color:var(--ink-light);display:flex;align-items:center;gap:5px;">
          ${dotplotShapeSVG(g.shape, g.color)} ${g.label} (Ø ${g.mean.toFixed(2)})
        </span>`;
      }
    });
  }

  dotplotRender();

  // Geschlecht vorausgewählt
dotplotActiveGroup = 'geschlecht';
btnRow.querySelector('[data-group="geschlecht"]').classList.add('active');
dotplotRender();

  // Scroll-fade für die Achse
  const dotplotObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dotplotAxisEl.style.transition = 'opacity 0.6s ease';
        dotplotAxisEl.style.opacity = '1';
        dotplotObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  dotplotAxisEl.style.opacity = '0';
  dotplotObserver.observe(dotplotAxisEl);
}

// ── DOT PLOT 2: Einstellung hat sich verändert ──

// Verschiebe Tooltip zu body, um overflow:hidden Problem zu beheben
if (dotplot2Tooltip) {
  dotplot2Tooltip = dotplot2Tooltip.cloneNode(true);
  document.body.appendChild(dotplot2Tooltip);
}

if (dotplot2FiltersEl && dotplot2AxisEl) {

  function dotplot2Pct(val) {
    return ((val - DOTPLOT2_MIN) / (DOTPLOT2_MAX - DOTPLOT2_MIN)) * 100;
  }

  function dotplot2ShapeSVG(shape, color) {
    return `<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="${color}"/></svg>`;
  }

  // Tooltip
  document.addEventListener('mousemove', e => {
    if (!dotplot2Tooltip) return;
    dotplot2Tooltip.style.left = (e.clientX + 12) + 'px';
    dotplot2Tooltip.style.top  = (e.clientY + 16) + 'px';
  });

  // Filter-Buttons
  const filter2Groups = [
    { key: 'geschlecht',  label: 'Nach Geschlecht' },
    { key: 'studiengang', label: 'Nach Studiengang' },
  ];

  const btn2Row = document.createElement('div');
  btn2Row.className = 'dotplot-filter-group';

  filter2Groups.forEach(fg => {
    const btn = document.createElement('button');
    btn.className = 'dotplot-toggle' + (fg.key === 'geschlecht' ? ' active' : '');
    btn.dataset.group = fg.key;
    btn.textContent = fg.label;
    btn.addEventListener('click', () => {
      if (dotplot2ActiveGroup === fg.key) {
        dotplot2ActiveGroup = null;
        btn.classList.remove('active');
      } else {
        dotplot2ActiveGroup = fg.key;
        btn2Row.querySelectorAll('.dotplot-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      dotplot2Render();
    });
    btn2Row.appendChild(btn);
  });
  dotplot2FiltersEl.appendChild(btn2Row);

  // Gesamt-Punkt
  const gesamt2G  = DOTPLOT2_GROUPS.find(g => g.key === 'gesamt');
  const gesamt2Pt = document.createElement('div');
  gesamt2Pt.className = 'dotplot-point';
  gesamt2Pt.style.cssText = `left:${dotplot2Pct(gesamt2G.mean)}%; top:1px; opacity:1;`;
  gesamt2Pt.innerHTML = dotplot2ShapeSVG('circle', '#1a1814');
  gesamt2Pt.addEventListener('mouseenter', () => {
    dotplot2Tooltip.textContent = `Gesamt: Ø ${gesamt2G.mean.toFixed(2)}`;
    dotplot2Tooltip.classList.add('show');
  });
  gesamt2Pt.addEventListener('mouseleave', () => dotplot2Tooltip.classList.remove('show'));
  dotplot2AxisEl.appendChild(gesamt2Pt);

  if (dotplot2GesamtLine) dotplot2GesamtLine.style.left = dotplot2Pct(gesamt2G.mean) + '%';

  // Alle anderen Punkte
  const dotplot2PointEls = {};
  DOTPLOT2_GROUPS.filter(g => g.key !== 'gesamt').forEach(g => {
    const pt = document.createElement('div');
    pt.className = 'dotplot-point';
    pt.style.cssText = `left:${dotplot2Pct(g.mean)}%; top:1px; opacity:0; pointer-events:none;`;
    pt.innerHTML = dotplot2ShapeSVG('circle', g.color);
    pt.addEventListener('mouseenter', () => {
      dotplot2Tooltip.textContent = `${g.label}: Ø ${g.mean.toFixed(2)}`;
      dotplot2Tooltip.classList.add('show');
    });
    pt.addEventListener('mouseleave', () => dotplot2Tooltip.classList.remove('show'));
    dotplot2AxisEl.appendChild(pt);
    dotplot2PointEls[g.key] = pt;
  });

  // Legende
  const legend2El = document.createElement('div');
  legend2El.id = 'dotplot2Legend';
  legend2El.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px 16px; margin-top:12px; min-height:20px;';
  dotplot2AxisEl.parentElement.insertAdjacentElement('afterend', legend2El);

  function dotplot2Render() {
    legend2El.innerHTML = '';

    legend2El.innerHTML += `<span style="font-size:12px;color:var(--ink-light);display:flex;align-items:center;gap:5px;">
      ${dotplot2ShapeSVG('circle','#1a1814')} Gesamt (Ø ${gesamt2G.mean.toFixed(2)})
    </span>`;

    DOTPLOT2_GROUPS.filter(g => g.key !== 'gesamt').forEach(g => {
      const on = dotplot2ActiveGroup === g.group;
      const pt = dotplot2PointEls[g.key];
      pt.style.opacity       = on ? '1' : '0';
      pt.style.pointerEvents = on ? 'auto' : 'none';

      if (on) {
        legend2El.innerHTML += `<span style="font-size:12px;color:var(--ink-light);display:flex;align-items:center;gap:5px;">
          ${dotplot2ShapeSVG('circle', g.color)} ${g.label} (Ø ${g.mean.toFixed(2)})
        </span>`;
      }
    });
  }

  dotplot2Render();

  // Scroll-fade
  const dotplot2Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dotplot2AxisEl.style.transition = 'opacity 0.6s ease';
        dotplot2AxisEl.style.opacity = '1';
        dotplot2Observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  dotplot2AxisEl.style.opacity = '0';
  dotplot2Observer.observe(dotplot2AxisEl);
}
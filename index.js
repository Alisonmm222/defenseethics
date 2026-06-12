// ══════════════════════════════════════════════
// DATEN FÜR GRÜNDE FÜR/GEGEN VERTEIDIGUNGSJOBS
// ══════════════════════════════════════════════
const gruendeJa = [
    { label: "Gesellschaftliche Verantwortung",   pct: 71 },
    { label: "Interessante technische Aufgaben",  pct: 64 },
    { label: "Gute Vergütung",                    pct: 58 },
    { label: "Jobsicherheit",                     pct: 47 },
    { label: "Beitrag zur nationalen Sicherheit", pct: 43 },
];

const gruendeNein = [
    { label: "Moralische Bedenken",               pct: 76 },
    { label: "Angst vor Dual-Use-Verantwortung",  pct: 61 },
    { label: "Gesellschaftliche Stigmatisierung", pct: 54 },
    { label: "Persönliche Überzeugungen",         pct: 49 },
    { label: "Fehlende Informationen",            pct: 38 },
];

const colorJa   = "#7F77DD";
const colorNein = "#c8441a";

function buildReasonBars(containerId, data, color) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('buildReasonBars: container not found', containerId);
        return;
    }
    data.forEach(item => {
        const row = document.createElement('div');
        row.className = 'gruende-row';
        row.innerHTML = `
            <div class="gruende-label">${item.label}</div>
            <div class="gruende-track">
                <div class="gruende-fill" style="width:${item.pct}%; background:${color}">
                    <span>${item.pct}%</span>
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

// ══════════════════════════════════════════════
// OPINION EXPLORER (REPLACEMENT für STACKED CHART)
// ══════════════════════════════════════════════

const opinionData = [
  {
    id: 0,
    value: 48,
    title: "Auch auf dem Schlachtfeld",
    desc: "Ich unterstütze militärische Nutzung aktiv.",
    color: "#3d2d6e"
  },
  {
    id: 1,
    value: 31,
    title: "Nur defensive Nutzung",
    desc: "Ich unterstütze nur nicht-kampforientierte Anwendungen.",
    color: "#7F77DD"
  },
  {
    id: 2,
    value: 21,
    title: "Lehnt ab",
    desc: "Ich lehne Rüstungsaufträge grundsätzlich ab.",
    color: "#AFA9EC"
  }
];

let activeOpinion = null;

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
window.addEventListener("DOMContentLoaded", () => {
  renderOpinionExplorer();
  setActiveOpinion(null);

  // allow keyboard users to reset selection with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setActiveOpinion(null);
  });
});

// ══════════════════════════════════════
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

  // position the floating insight under the active circle (if any)
  const floatEl = document.getElementById('opinion-float-insight');
  if (!floatEl) return;
  if (id === null) {
    floatEl.classList.remove('visible');
  } else {
    const activeCircle = document.querySelector(`.opinion-circle[data-id="${id}"]`);
    if (activeCircle) positionFloatingInsight(activeCircle);
    // after positioning, ensure the floating box is visible in the viewport
    const f = document.getElementById('opinion-float-insight');
    if (f) ensureVisibleInViewport(f);
  }
}

// ══════════════════════════════════════
// INSIGHT TEXT (Story Layer)
// ══════════════════════════════════════
function updateInsight(id) {
  // We no longer render details under #stacked-legend — show them only in the floating insight
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
  // write the original detailed HTML into the floating insight only
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

// ── Tension sliders (zwei separate Skalen) ──
// Zustimmung
const messagesZustimmung = [
  'Stimme überhaupt nicht zu',
  'Stimme eher nicht zu',
  'teils-teils',
  'Stimme eher zu',
  'Stimme voll und ganz zu',
];
const studyDataZustimmung = [10, 20, 30, 30, 20];

// Szenario
const messagesSzenario = [
  'Ich würde Angebot A nehmen',
  'Ich würde Angebot A nehmen, aber der Gehaltsunterschied lässt mich zögern',
  'Ich würde intensiv abwägen und beide Angebote in Betracht ziehen',
  'Ich würde Angebot B nehmen, weil das Gehalt ein legitimer Grund ist',
  'Ich würde Angebot B aus anderen Gründen wählen',
];
const studyDataSzenario = [5, 15, 30, 35, 15];

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
      compText: 'comparisonText'
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
      compText: 'comparisonTextScenario'
    }
  }
};

function buildComparisonBarsFor(containerId, data, prefix) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const max = Math.max(...data);
  wrap.innerHTML = data.map((val, i) => {
    const h = Math.round((val / max) * 100);
    // id namespaced by prefix to avoid collision
    return `<div class="comp-bar" id="${containerId}-bar-${i}" style="height:${h}%"></div>`;
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
  }

  // clamp index to valid range to avoid undefined messages or studyData
  let idx = v - scaleMin;
  if (idx < 0) idx = 0;
  if (idx > messages.length - 1) idx = messages.length - 1;

  const span = scaleMax - scaleMin;
  const fillEl = document.getElementById(ids.fill);
  if (fillEl) {
    // Scope the track to this slider's wrapper so multiple sliders don't interfere
    const sliderEl = document.getElementById(ids.slider);
    let trackEl = null;
    if (sliderEl) {
      const wrap = sliderEl.closest('.slider-track-wrap');
      if (wrap) trackEl = wrap.querySelector('.slider-track');
    }

    // Compute thumb width dynamically from slider height (robust across browsers)
    let thumbWidth = 18;
    if (sliderEl) {
      try {
        const h = sliderEl.getBoundingClientRect().height;
        if (h && !Number.isNaN(h)) thumbWidth = Math.max(8, Math.round(h * 0.75));
      } catch (e) {
        // fallback to default
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
  if (textEl) textEl.textContent = `von ${scaleMax} — ${messages[idx] || ''}`;

  // Balken aktualisieren; ids for bars are namespaced
  studyData.forEach((_, i) => {
    const bar = document.getElementById(`${ids.bars}-bar-${i}`);
    if (bar) bar.classList.toggle('active', i === idx);
  });

  const pct = studyData[idx] || 0;
  const comp = document.getElementById(ids.compText);
  if (comp) comp.innerHTML = `<strong>${pct}% der Befragten</strong> haben ebenfalls <strong>${v} von ${scaleMax}</strong> angegeben.`;
}

window.addEventListener('load', () => {
  // ── Fade-in observer for general elements with class .fade-in (make content appear while scrolling)
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(el => fadeObs.observe(el));
    // fallback: ensure they become visible after a short delay if observer doesn't fire
    setTimeout(() => {
      fadeEls.forEach(el => { if (!el.classList.contains('visible')) el.classList.add('visible'); });
    }, 350);
  }
  // Setup für beide Slider-Konfigurationen
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
      // attach inline change handler to call update function (also supports keyboard)
      sliderEl.addEventListener('input', (e) => updateTensionFor(key, e.target.value));
    }

    buildComparisonBarsFor(ids.bars, cfg.data, key);
    updateTensionFor(key);
  });

  // ── Fade-in für alle fullscreen-inner Elemente (sichtbar machen, wenn sie in den Viewport kommen)
  const fullscreenInners = document.querySelectorAll('.fullscreen-inner');
  if (fullscreenInners.length) {
    const innerObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    fullscreenInners.forEach(el => innerObserver.observe(el));
    // Fallback: falls IntersectionObserver nicht feuert (z. B. in älteren Browsern), machen wir die Elemente sichtbar
    setTimeout(() => {
      fullscreenInners.forEach(el => {
        if (!el.classList.contains('visible')) el.classList.add('visible');
      });
    }, 300);
  }

  // ── Nav ausblenden beim Reinscrolle UND beim Scroll-Down (wie auf der anderen Seite)
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

  // PRIORITÄTEN
const priorityData = [
    { label: "Jobsicherheit", usa: 68 },
    { label: "Gehalt", usa: 66 },
    { label: "Work-Life-Balance", usa: 63 },
    { label: "Im Einklang\nmit meinen Interessen", usa: 54 },
    { label: "Gutes Arbeitsklima", usa: 52 },
    { label: "Im Einklang\nmit meinen Werten", usa: 47 },
    { label: "Karriere\nAufstieg", usa: 30 },
    { label: "Gesellschaftlicher\nBeitrag", usa: 30 },
];

const colorUSA = "#3d2d6e";

const chart = document.getElementById('priority-chart');
if (chart) {
  // Header
  const header = document.createElement('div');
  header.className = 'priority-header-row';
  header.innerHTML = `
    <div></div>
    <div class="priority-header-label" style="color:#AFA9EC"> USA</div>
  `;
  chart.appendChild(header);

  // Rows

  priorityData.forEach(item => {
      const row = document.createElement('div');
      row.className = 'priority-row';

      row.innerHTML = `
          <div class="priority-label">${item.label.replace('\n','<br>')}</div>

          <div class="priority-bar-wrap">
              <div class="priority-bar-track">
                  <div class="priority-bar-fill" style="width:${item.usa}%; background:${colorUSA}">
                      <span>${item.usa}%</span>
                  </div>
              </div>
          </div>
      `;

      chart.appendChild(row);
  });
} else {
  console.warn('priority-chart element not found; skipping priority chart render');
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
    svg.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("class", "bundesland")
      .attr("d", path);

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

function positionTooltip(e) {
  const rect = mapBlock.getBoundingClientRect();
  let x = e.clientX - rect.left + 14;
  let y = e.clientY - rect.top - 10;
  if (x + 230 > rect.width) x -= 240;
  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}
   // ── UMFRAGE DIAGRAMM ──

const umfrageData = [
  { label: 'Gesamt',                     group: 'all',        garNicht: 9,  eherNicht: 8,  ambivalent: 33, eherZu: 28, sehrStark: 22 },
  { label: 'Männer',                     group: 'geschlecht', garNicht: 9,  eherNicht: 7,  ambivalent: 24, eherZu: 31, sehrStark: 29 },
  { label: 'Frauen',                     group: 'geschlecht', garNicht: 9,  eherNicht: 9,  ambivalent: 42, eherZu: 25, sehrStark: 14 },
  { label: '16–34 Jahre',                group: 'alter',      garNicht: 9,  eherNicht: 10, ambivalent: 37, eherZu: 29, sehrStark: 15 },
  { label: '35–64 Jahre',                group: 'alter',      garNicht: 10, eherNicht: 7,  ambivalent: 33, eherZu: 27, sehrStark: 23 },
  { label: '65 Jahre und älter',         group: 'alter',      garNicht: 8,  eherNicht: 9,  ambivalent: 27, eherZu: 29, sehrStark: 27 },
];
const COLORS = ['#2F1B69','#5D3BAD','#6D5BD0','#978AE6','#BDB4FA'];
let umfrageCurrentGroup = 'all';
let umfrageCurrentView  = 'stacked';

function umfrageGetFiltered() {
  if (umfrageCurrentGroup === 'all') return umfrageData;
  return umfrageData.filter(d => d.group === umfrageCurrentGroup || d.group === 'all');
}

function umfrageRender() {
  const data = umfrageGetFiltered();
  const container = document.getElementById('umfrage-rows');
  const nettoNote = document.getElementById('umfrage-netto-note');
  container.innerHTML = '';

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
              width:${pct}%;
              height:100%;
              background:${pos ? '#0d6b5e' : '#b03a2e'};
              border-radius:4px;
              display:flex;align-items:center;
              ${pos ? 'justify-content:flex-end;padding-right:8px;' : 'justify-content:flex-start;padding-left:8px;'}
            ">
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
      segments += `<div style="width:${pct}%;height:100%;background:${COLORS[i]};display:flex;align-items:center;justify-content:center;transition:width 0.7s cubic-bezier(0.16,1,0.3,1);">
        ${pct >= 7 ? `<span style="font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:white;">${pct}%</span>` : ''}
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
}

function umfrageView(view, btn) {
  umfrageCurrentView = view;
  document.querySelectorAll('#umfrage-chart .tab-btn').forEach(b => {
    if (['stacked','netto'].includes(b.getAttribute('onclick').match(/'([^']+)'/)[1])) b.classList.remove('active');
  });
  btn.classList.add('active');
  umfrageRender();
}

umfrageRender();

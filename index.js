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
// RENDER CARDS + BAR
// ══════════════════════════════════════
function renderOpinionExplorer() {
  const container = document.getElementById("chart-pairs");
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "opinion-wrapper";

  // Section heading (Überschrift) for the opinion explorer
  const sectionHead = document.createElement('div');
  sectionHead.className = 'opinion-section-head';
  sectionHead.textContent = 'USA Tech Worker';
  wrapper.appendChild(sectionHead);

  // Note: we intentionally do not render the card list here — UI shows only radial badges (circles)

  // Chart -> replace bars with compact radial badges (circles) to save vertical space and be more distinctive
  const chart = document.createElement("div");
  chart.className = "opinion-chart";

  opinionData.forEach(item => {
    const circleWrap = document.createElement('div');
    circleWrap.className = 'opinion-circle';
    circleWrap.dataset.id = item.id;
    circleWrap.setAttribute('role', 'button');
    circleWrap.setAttribute('tabindex', '0');
    circleWrap.setAttribute('aria-label', `${item.title} ${item.value}%`);

    // SVG donut — radius 16 for easy math
    const size = 36;
    const r = 16;
    const c = Math.PI * 2 * r;
    const pct = Math.max(0, Math.min(100, item.value));
    const dash = Math.round((pct / 100) * c);

    // ring-fg starts with 0 length; we store target dash/c in data attributes for animation
    circleWrap.innerHTML = `
      <svg viewBox="0 0 ${size} ${size}" class="opinion-svg" aria-hidden="true">
        <circle class="ring-bg" cx="18" cy="18" r="${r}" stroke="rgba(255,255,255,0.06)" stroke-width="3" fill="none"></circle>
        <circle class="ring-fg" cx="18" cy="18" r="${r}" stroke="${item.color}" stroke-width="3" fill="none" stroke-linecap="round"
          data-dash="${dash}" data-c="${c}" style="stroke-dasharray: 0 ${c}; stroke-dashoffset: 0; transition: stroke-dasharray 900ms cubic-bezier(.22,1,.36,1);"></circle>
      </svg>
      <div class="opinion-circle-label">${item.value}%</div>
    `;

    // interactions
    circleWrap.addEventListener('click', () => setActiveOpinion(item.id));
    circleWrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveOpinion(item.id); } });
    circleWrap.addEventListener('mouseenter', () => { circleWrap.classList.add('hover'); });
    circleWrap.addEventListener('mouseleave', () => { circleWrap.classList.remove('hover'); });

    chart.appendChild(circleWrap);
  });

  wrapper.appendChild(chart);

  // floating insight box — will be positioned under the active circle
  const floatInsight = document.createElement('div');
  floatInsight.id = 'opinion-float-insight';
  floatInsight.className = 'opinion-insight-floating';
  floatInsight.innerHTML = `
    <div class="opinion-insight">
      Klicken Sie auf eine Kategorie, um Details zu sehen.
    </div>
  `;
  wrapper.appendChild(floatInsight);

  container.appendChild(wrapper);

  // initial animation: expand donut strokes to their target dash values
  requestAnimationFrame(() => {
    opinionData.forEach(item => {
      const fg = chart.querySelector(`[data-id="${item.id}"] .ring-fg`);
      if (fg) {
        const dash = fg.getAttribute('data-dash');
        const cVal = fg.getAttribute('data-c');
        fg.style.strokeDasharray = `${dash} ${cVal}`;
      }
    });
  });
}

// Position the floating insight under the clicked circle (clamped inside wrapper)
function positionFloatingInsight(circleEl) {
  const floatEl = document.getElementById('opinion-float-insight');
  if (!floatEl || !circleEl) return;

  const wrapper = circleEl.closest('.opinion-wrapper');
  if (!wrapper) return;

  // ensure wrapper is positioned for absolute child
  wrapper.style.position = wrapper.style.position || 'relative';

  const wrapRect = wrapper.getBoundingClientRect();
  const cirRect = circleEl.getBoundingClientRect();

  // temporarily make visible to measure size
  floatEl.classList.add('visible');
  floatEl.style.left = '0px';
  floatEl.style.top = '0px';
  const fRect = floatEl.getBoundingClientRect();

  // compute center of circle relative to wrapper
  let left = (cirRect.left - wrapRect.left) + (cirRect.width / 2) - (fRect.width / 2);
  const top = (cirRect.bottom - wrapRect.top) + 12; // 12px gap

  // clamp within wrapper
  const minLeft = 8;
  const maxLeft = wrapRect.width - fRect.width - 8;
  if (left < minLeft) left = minLeft;
  if (left > maxLeft) left = Math.max(minLeft, maxLeft);

  floatEl.style.left = Math.round(left) + 'px';
  floatEl.style.top = Math.round(top) + 'px';
  floatEl.classList.add('visible');
}

// ensure the floating element is fully visible in the viewport; scrolls the window smoothly if needed
function ensureVisibleInViewport(el) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const padding = 16; // keep some breathing room
  let delta = 0;
  if (rect.top < padding) {
    // element is above viewport top — scroll up
    delta = rect.top - padding;
  } else if (rect.bottom > window.innerHeight - padding) {
    // element is below viewport bottom — scroll down
    delta = rect.bottom - (window.innerHeight - padding);
  }
  if (delta !== 0) {
    // animate scroll; use window.scrollBy relative movement
    window.scrollBy({ top: delta, left: 0, behavior: 'smooth' });
  }
}

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

    // Zusätzlich: zeige/verstecke Nav beim Scrollen (runter = verstecken, hoch = zeigen)
    let lastY = window.scrollY;
    let ticking = false;
    const SCROLL_DELTA = 8; // minimale Bewegung, bevor wir reagieren

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
    { label: "Jobsicherheit",                       usa: 68, de: 30 },
    { label: "Gehalt",                              usa: 66, de: 30 },
    { label: "Work-Life-Balance",                   usa: 63, de: 30 },
    { label: "Im Einklang\nmit meinen Werten",      usa: 47, de: 30 },
    { label: "Im Einklang\n mit meinen Interessen", usa: 54, de: 30 },
    { label: "Gutes Arbeitsklima",                  usa: 52, de: 30 },
    { label: "Karriere\nAufsteig",                  usa: 30, de: 30 },
    { label: "Gesellschaftlicher\nBeitrag",         usa: 30, de: 30 },
];

const colorUSA = "#3d2d6e";
const colorDE  = "#7F77DD";

const chart = document.getElementById('priority-chart');
if (chart) {
  // Header
  const header = document.createElement('div');
  header.className = 'priority-header-row';
  header.innerHTML = `
    <div></div>
    <div class="priority-header-label" style="color:#AFA9EC"> USA</div>
    <div class="priority-header-label" style="color:#7F77DD"> DE</div>
  `;
  chart.appendChild(header);

  // Rows
  priorityData.forEach(item => {
      const row = document.createElement('div');
      row.className = 'priority-row';

      row.innerHTML = `
          <div class="priority-label">${item.label.replace('\n','<br>')}</div>
          <div class="priority-side">
              <div class="priority-bar-wrap">
                  <div class="priority-bar-track">
                      <div class="priority-bar-fill" style="width:${item.usa}%; background:${colorUSA}">
                          <span>${item.usa}%</span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="priority-side">
              <div class="priority-bar-wrap">
                  <div class="priority-bar-track">
                      <div class="priority-bar-fill" style="width:${item.de}%; background:${colorDE}">
                          <span>${item.de}%</span>
                      </div>
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
    // PUNKTE — Koordinaten in [Längengrad, Breitengrad]
    // ══════════════════════════════════════════════════════
   const punkte = [
  { coords: [10.000, 53.550], city: "Hamburg",   text: "Platzhaltertext für Hamburg" },
  { coords: [13.405, 52.520], city: "Berlin",    text: "Platzhaltertext für Berlin" },
  { coords: [6.960,  50.938], city: "Köln",      text: "Platzhaltertext für Köln" },
  { coords: [8.682,  50.110], city: "Frankfurt", text: "Platzhaltertext für Frankfurt" },
  { coords: [11.078, 49.448], city: "Nürnberg",  text: "TH Nürnberg — Standort der Studie" },
  { coords: [9.182,  48.776], city: "Stuttgart", text: "Platzhaltertext für Stuttgart" },
  { coords: [11.576, 48.137], city: "München",   text: "Platzhaltertext für München" },
  { coords: [7.011,  51.462], city: "Dortmund",  text: "Platzhaltertext für Dortmund" },
];

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

    // Auto-fit projection to GeoJSON
    const projection = d3.geoMercator().fitSize([500, 560], fc);
    const path = d3.geoPath().projection(projection);

    // Recalculate exact bounds and update viewBox
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

    // Instead of rendering separate point markers we attach tooltip handlers
    // to each Bundesland path so a single tooltip appears for the whole state.
    svg.selectAll('path.bundesland')
      .on('mouseenter', (event, d) => {
        const props = (d && d.properties) ? d.properties : {};
        const name = props.NAME || props.name || props.NAME_1 || props.GEN || props.name_de || 'Bundesland';
        if (tooltipCity) tooltipCity.textContent = name;
        if (tooltipText) tooltipText.textContent = `Platzhaltertext für ${name}`;
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
  let x = e.clientX - rect.left + 14;
  let y = e.clientY - rect.top - 10;
  if (x + 230 > rect.width) x -= 240;
  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}
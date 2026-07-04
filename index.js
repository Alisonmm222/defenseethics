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
        setTimeout(() => { bar.style.width = target + '%'; }, i * 45);
    });
    root.querySelectorAll('[data-target-height]').forEach((bar, i) => {
        const target = bar.getAttribute('data-target-height');
        setTimeout(() => { bar.style.height = target + '%'; }, i * 30);
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
// DATEN FÜR GRÜNDE FÜR/GEGEN VERTEIDIGUNGSJOBS
// ══════════════════════════════════════════════
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

const colorJa   = "#e8a172";
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
                <div class="gruende-fill" style="width:0%; background:${color}" data-target-width="${item.pct}">
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

// ══════════════════════════════════════════════
// OPINION EXPLORER
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

// Zum bestehenden IntersectionObserver hinzufügen
// oder als eigenen Block einfügen:
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



function buildComparisonBarsFor(containerId, data, prefix) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const max = Math.max(...data);
  wrap.innerHTML = data.map((val, i) => {
    const h = Math.round((val / max) * 100);
    // id namespaced by prefix to avoid collision
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
    // Wenn der Slider bewegt wird, füge .touched Klasse hinzu
    if (ids.resultBlock) {
      const resultBlock = document.getElementById(ids.resultBlock);
      if (resultBlock && !resultBlock.classList.contains('touched')) {
        resultBlock.classList.add('touched');
      }
    }
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
  if (textEl) textEl.textContent = `${messages[idx] || ''}`;

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
  // ── Fade-in observer for general elements with class .fade-in (make content appear while scrolling)
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

const colorUSA = "#c8441a";

const chart = document.getElementById('priority-chart');
if (chart) {
  // Header
  const header = document.createElement('div');
  header.className = 'priority-header-row';
  header.innerHTML = `
    <div></div>
    <div class="priority-header-label" style="color:#1a1814"> USA</div>
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
                  <div class="priority-bar-fill" style="width:0%; background:${colorUSA}" data-target-width="${item.usa}">
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
const COLORS = ['#c8441a','#d4623d','#e0815f','#eba98e','#f5d4c4'];
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
              transition:width 0.7s cubic-bezier(0.16,1,0.3,1);
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
      segments += `<div style="width:0%;height:100%;background:${COLORS[i]};display:flex;align-items:center;justify-content:center;transition:width 0.7s cubic-bezier(0.16,1,0.3,1);" data-target-width="${pct}">
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
  animateBarFills(document.getElementById('umfrage-chart'));
}

function umfrageView(view, btn) {
  umfrageCurrentView = view;
  document.querySelectorAll('#umfrage-chart .tab-btn').forEach(b => {
    if (['stacked','netto'].includes(b.getAttribute('onclick').match(/'([^']+)'/)[1])) b.classList.remove('active');
  });
  btn.classList.add('active');
  umfrageRender();
  animateBarFills(document.getElementById('umfrage-chart'));
}

umfrageRender();
   // ── NUTZEN VS. RISIKO: BUTTERFLY-DIAGRAMM ──
   // Quelle: acatech/TechnikRadar 2025, N = 2.003 — Anteil "sehr nützlich" vs. "sehr riskant"

const nutzenRisikoData = [
  { label: 'Männer',             group: 'geschlecht', nuetzlich: 22, riskant: 4 },
  { label: 'Frauen',             group: 'geschlecht', nuetzlich: 14, riskant: 4 },
  { label: '16–34 Jahre',        group: 'alter',       nuetzlich: 13, riskant: 4 },
  { label: '35–64 Jahre',        group: 'alter',       nuetzlich: 18, riskant: 3 },
  { label: '65 Jahre und älter', group: 'alter',       nuetzlich: 25, riskant: 5 },
];

let nutzenRisikoCurrentGroup = 'all';

function nutzenRisikoGetFiltered() {
  if (nutzenRisikoCurrentGroup === 'all') return nutzenRisikoData;
  return nutzenRisikoData.filter(d => d.group === nutzenRisikoCurrentGroup);
}

function nutzenRisikoRender() {
  const data = nutzenRisikoGetFiltered();
  const container = document.getElementById('nutzenrisiko-rows');
  container.innerHTML = '';

  // größter Wert füllt 90% der Halbspur, Rest ist Luft für die Prozent-Beschriftung
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
// DUMBBELL-CHART: GEWISSENSKONFLIKTE NACH GESCHLECHT
// Frage 19: "Ich hätte Gewissenskonflikte, wenn ich im
// Defense-Bereich arbeiten würde." — gleiche Frage wie beim
// Spannungs-Slider oben, hier aufgeschlüsselt nach Geschlecht.
// Quelle: Eigene Umfrage, n = 242 (162 männlich / 80 weiblich).
// 1 Person "Divers" wird aus Anonymitätsgründen bei dieser
// Zwei-Gruppen-Aufschlüsselung nicht separat ausgewiesen.
// ══════════════════════════════════════════════════════
const gewissenLabels = [
    'Stimme überhaupt nicht zu',
    'Stimme eher nicht zu',
    'Teils-teils',
    'Stimme eher zu',
    'Stimme voll und ganz zu',
];
const gewissenMaenner = [36.4, 24.7, 16.7, 9.9, 12.3];
const gewissenFrauen  = [12.5, 16.3, 15.0, 27.5, 28.8];
const DUMBBELL_SCALE_MAX = 45; // Achsen-Obergrenze in %

// Erzeugt Delta-Betrag + erklärenden Satz für den Tap-Callout einer Zeile
function gewissenCalloutText(m, f) {
    const diff = m - f; // positiv = mehr Männer, negativ = mehr Frauen
    const abs = Math.round(Math.abs(diff));
    if (abs < 2) {
        return { abs, text: 'Männer und Frauen antworten hier fast identisch.', dominant: 'neutral' };
    }
    if (diff > 0) {
        return { abs, text: `${abs} Prozentpunkte mehr Männer als Frauen wählen diese Antwort.`, dominant: 'm' };
    }
    return { abs, text: `${abs} Prozentpunkte mehr Frauen als Männer wählen diese Antwort.`, dominant: 'f' };
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

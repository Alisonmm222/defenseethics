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


    // ══════════════════════════════════════════════════════
    // STACKED BAR CHART DATA
    // ══════════════════════════════════════════════════════
const categories = [
    { name: "Kategorie 1", desc: "Ich unterstütze meinen Arbeitgeber dabei, sich um Rüstungsaufträge zu bewerben, auch wenn die Ergebnisse auf dem Schlachtfeld zum Einsatz kommen", color: "#3d2d6e" },
    { name: "Kategorie 2", desc: "Ich unterstütze meinen Arbeitgeber dabei, sich um Rüstungsaufträge zu bewerben, solange die Ergebnisse nicht auf dem Schlachtfeld zum Einsatz kommen", color: "#7F77DD" },
    { name: "Kategorie 3", desc: "Ich bin nicht damit einverstanden, dass mein Arbeitgeber sich um Rüstungsaufträge bemüht", color: "#AFA9EC" }
];

const rows = [
    { label: "Fast die Hälfte der Befragten TechWorkern aus dem USA sind damit einverstanden, dass ihre Produkte auf dem Schlachtfeld verwendet werden", values: [48, 31, 21] }
];

function makeStackedBar(values) {
    const track = document.createElement('div');
    track.className = 'stacked-track';
    values.forEach((pct, i) => {
        const seg = document.createElement('div');
        seg.className = 'segment';
        seg.style.width = pct + '%';
        seg.style.background = categories[i].color;
        seg.title = categories[i].name + ': ' + pct + '%';
        if (pct >= 10) seg.innerHTML = '<span class="segment-pct">' + pct + '%</span>';
        track.appendChild(seg);
    });
    return track;
}

const container = document.getElementById('chart-pairs');
rows.forEach(row => {
    const pair = document.createElement('div');
    pair.className = 'pair';
    const label = document.createElement('div');
    label.className = 'pair-label';
    label.textContent = row.label;
    pair.appendChild(label);
    pair.appendChild(makeStackedBar(row.values));
    container.appendChild(pair);
});

const legendEl = document.getElementById('stacked-legend');
categories.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'stacked-legend-item';
    item.innerHTML = `
        <div class="stacked-legend-dot" style="background:${cat.color}"></div>
        <div>
            <div class="stacked-legend-name">${cat.name}</div>
            <div class="stacked-legend-desc">${cat.desc}</div>
        </div>
    `;
    legendEl.appendChild(item);
});

    // ── Scroll fade-in ──
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

    // ── Chart tabs ──
    function switchTab(key, btn) {
        document.querySelectorAll('.bars').forEach(b => b.style.display = 'none');
        document.getElementById('bars-' + key).style.display = 'flex';
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

// ── Tension slider ──
const messages = [
  'Ich sehe hier kein Problem.',
  'Eine leise Frage im Hinterkopf.',
  'Ich denke gelegentlich daran.',
  'Es beschäftigt mich manchmal.',
  'Eine gewisse Ambivalenz ist da.',
  'Die Frage lässt mich nicht los.',
  'Ich spüre einen deutlichen Konflikt.',
  'Es bereitet mir echtes Unbehagen.',
  'Das würde ich kaum akzeptieren.',
  'Eine starke innere Ablehnung.',
  'Diesen Job würde ich nicht annehmen.'
];

// Beispieldaten — ersetze mit echten Prozentwerten (Summe = 100)
const studyData = [3, 4, 5, 8, 10, 18, 20, 10, 5, 3];

function buildComparisonBars() {
  const wrap = document.getElementById('comparisonBars');
  if (!wrap) return;
  const max = Math.max(...studyData);
  wrap.innerHTML = studyData.map((val, i) => {
    const h = Math.round((val / max) * 100);
    return `<div class="comp-bar" id="bar-${i}" style="height:${h}%"></div>`;
  }).join('');
}

function updateTension(v) {
  v = parseInt(v);
  document.getElementById('sliderFill').style.width = (v * 10) + '%';
  document.getElementById('tensionNum').textContent = v;
  document.getElementById('tensionText').textContent = 'von 10 — ' + messages[v];

  // Balken aktualisieren
  studyData.forEach((_, i) => {
    const bar = document.getElementById('bar-' + i);
    if (bar) bar.classList.toggle('active', i === v);
  });

  // Vergleichstext
  const pct = studyData[v];
  document.getElementById('comparisonText').innerHTML =
    `<strong>${pct}% der Befragten</strong> haben ebenfalls <strong>${v} von 10</strong> angegeben.`;
}

window.addEventListener('load', () => {
  buildComparisonBars();
  updateTension(5);

  // ── Fade-in beim Reinscrolle ──
  const el = document.getElementById('tensionInner');
  if (el) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    fadeObserver.observe(el);
  }

  // ── Nav ausblenden beim Reinscrolle ──
  const nav = document.querySelector('nav');
  const block = document.querySelector('.fullscreen-block');
  if (nav && block) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        nav.style.opacity = e.isIntersecting ? '0' : '1';
        nav.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
      });
    }, { threshold: 0.2 });
    navObserver.observe(block);
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

    // Punkte
    const g = document.createElementNS(svgNS, 'g');
    svgEl.appendChild(g);

    punkte.forEach(p => {
      const [x, y] = projection(p.coords);
      const group = document.createElementNS(svgNS, 'g');
      group.classList.add('map-punkt');

      const ring = document.createElementNS(svgNS, 'circle');
      ring.classList.add('ring');
      ring.setAttribute('cx', x);
      ring.setAttribute('cy', y);
      ring.setAttribute('r', 5);
      ring.style.animationDelay = (Math.random() * 2.5).toFixed(2) + 's';

      const dot = document.createElementNS(svgNS, 'circle');
      dot.classList.add('dot');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', 5);

      group.appendChild(ring);
      group.appendChild(dot);
      g.appendChild(group);

      group.addEventListener('mouseenter', (e) => {
        tooltipCity.textContent = p.city;
        tooltipText.textContent = p.text;
        tooltip.classList.add('visible');
        positionTooltip(e);
      });
      group.addEventListener('mousemove', positionTooltip);
      group.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
    });
  })
  .catch(err => {
    svgEl.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#7a77aa" font-family="DM Sans,sans-serif" font-size="13">Karte konnte nicht geladen werden</text>';
    console.error(err);
  });

function positionTooltip(e) {
  const rect = mapBlock.getBoundingClientRect();
  let x = e.clientX - rect.left + 14;
  let y = e.clientY - rect.top - 10;
  if (x + 230 > rect.width) x -= 240;
  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}
# Defense Ethik

Eine statische Projektseite zur Berufsethik von Ingenieur:innen in Deutschland. Das Projekt verknüpft visuelles Storytelling, interaktive Datenvisualisierungen und Forschungsergebnisse zum Thema Verteidigung, Hochschule und ethische Verantwortung.

## Projektbeschreibung

Dieses Projekt dokumentiert und visualisiert:

- die Wahrnehmung ethischer Spannungen zwischen ziviler Arbeit und Rüstungsaufträgen
- Meinungsbilder zur Sicherheitslage und den öffentlichen Prioritäten in Deutschland
- Ergebnisse einer eigenen Studierendenbefragung der Technischen Hochschule Nürnberg 2026
- internationale Vergleiche zur Relevanz von Berufsethik in Tech-Berufen
- aktuelle Debatten zu Zivilklauseln an Hochschulen

Die Seite ist als responsive, statische HTML/CSS/JavaScript-Anwendung umgesetzt.

## Projektstruktur

```
├── data/          # Datenquelle
├── icons/          # Favicons und Bildsymbole
├── index.html      # Einstiegspunkt der Website
├── style.css       # Layout, Typografie und responsive Regeln
├── index.js        # Interaktive Komponenten, Daten-Rendering und Observer-Logik
├── README.md       # Projektbeschreibung und Reproduzierbarkeit
```

## Reproduzierbarkeit

### Voraussetzungen

- moderner Webbrowser (Chrome, Firefox, Edge, Safari)
- kein Build-Prozess erforderlich

### Lokale Vorschau

1. Repository klonen:

```bash
git clone https://github.com/Alisonmm222/defenseethics.git
cd defenseethics
```

2. Die Seite lokal öffnen:

- direkt im Browser: `index.html`
- oder mit einem lokalen Server:

```bash
python -m http.server 8000
```

3. Im Browser öffnen:

```text
http://localhost:8000
```

### Hinweise

Da die Anwendung statisch ist, reichen die lokalen Dateien. JavaScript wird clientseitig ausgeführt, daher ist ein Webserver optional, aber empfohlen für zuverlässiges Laden externer Ressourcen.

### Live-Version

Die veröffentlichte Website ist über GitHub Pages erreichbar:

https://alisonmm222.github.io/defenseethics/

## Datengrundlage

- **Eigene Umfrage (2026):** Basis für die eigenen Visualisierungen zu Verteidigungsjobs, Meinungen und Spannungswerten.
- **acatech/TechnikRadar (2025):** Grundlage für das Nutzen-vs-Risiko-Butterfly-Diagramm.
- **Zivilklausel-Recherchen:** Quellen zur Verbreitung von Zivilklauseln an staatlichen Hochschulen.
- **Literatur und Meinungsumfragen:** Weitere Hintergrunddaten zur Berufsethik und gesellschaftlichen Wahrnehmung.

## Technische Details

- `index.html` stellt semantische Inhalte, Abschnitte und interaktive Bereiche bereit.
- `style.css` definiert das visuelle Erscheinungsbild, Grid-Layouts, Animationen und responsive Anpassungen.
- `index.js` sorgt für:
  - Fade-in-Effekte mit `IntersectionObserver`
  - Slider-Interaktionen und Vergleichsbalken
  - dynamisch erzeugte Diagramme und Karten
  - Tooltip-Logik und Panel-Schalter

## Team

- **Lea Nettersheim**
- **Alison Moldovan Mauer**
- **Veronika Ni**
- **Nico Laubner**

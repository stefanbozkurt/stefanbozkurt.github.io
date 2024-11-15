# stefanbozkurt.github.io

Dies ist die persönliche Website von Stefan Bozkurt, gehostet auf GitHub Pages.

## Überblick

Dieses Projekt verwendet einfache HTML-, CSS- und JavaScript-Dateien, um eine statische Website zu erstellen. Es werden keine externen Frameworks verwendet, sondern nur Basiswerkzeuge wie Node.js, npm und einige nützliche Tools zur Automatisierung und Minifizierung von Ressourcen.

## Struktur des Projekts

- `src/` - Der Quellcodeordner, in dem alle deine ursprünglichen HTML-, CSS- und JavaScript-Dateien gespeichert sind.
- `dist/` - Der Zielordner, der die minifizierten und optimierten Dateien enthält. Dieser Ordner wird nach jedem Build aktualisiert und dann auf GitHub Pages bereitgestellt.
- `scripts/` - Enthält benutzerdefinierte Skripte wie `build.js` und `watch.js`, um den Build-Prozess zu automatisieren und die Dateien zu überwachen.

## Technologien

- **HTML** - Struktur der Website.
- **CSS** - Styling der Website (mit Sass).
- **JavaScript** - Funktionalität der Website.
- **Node.js** - Zur Automatisierung von Build-Prozessen.
- **npm** - Zur Verwaltung der Abhängigkeiten und Skripte.
- **Terser** - Zum Minifizieren von JavaScript.
- **Clean-CSS** - Zum Minifizieren von CSS.
- **Chokidar** - Zum Überwachen von Dateiänderungen (für den Watch-Modus).
- **GitHub Pages** - Zum Hosten der Website.
- **BrowserSync** - Zum Überwachen der Änderungen im Browser und automatischen Neuladen der Seite.

## Setup und Installation

1. **Klonen des Repositories:**

    ```bash
    git clone https://github.com/stefanbozkurt/stefanbozkurt.github.io.git
    cd stefanbozkurt.github.io
    ```

2. **Installiere die benötigten Abhängigkeiten:**

    ```bash
    npm install
    ```

3. **Führe das Watch-Skript aus, um Änderungen zu überwachen:**

    ```bash
    npm run watch
    ```

    Dies wird alle CSS-, JavaScript- und HTML-Dateien überwachen und die Änderungen in den `dist/` Ordner kopieren und minifizieren.

4. **Führe den Build-Befehl aus, um die minifizierten Dateien zu erstellen:**

    ```bash
    npm run build
    ```

    Dieser Befehl wird alle Dateien minifizieren und die optimierten Dateien im `dist/` Ordner ablegen.

5. **Starte den lokalen Webserver, um die Website anzusehen:**

    ```bash
    npm run serve
    ```

    Dies startet einen lokalen Server mit **BrowserSync**, der alle Änderungen im Browser automatisch anzeigt.

6. **Push die Änderungen in das GitHub-Repository, um die Website zu veröffentlichen.**

    ```bash
    git add .
    git commit -m "Update Website"
    git push origin main
    ```

## GitHub Pages

Deine Website wird automatisch auf GitHub Pages gehostet. Die `dist/`-Ordnerdateien werden in den `gh-pages`-Branch gepusht, um die Veröffentlichung zu ermöglichen.

Besuche die Website unter:

[https://stefanbozkurt.github.io](https://stefanbozkurt.github.io)

## Contribution

Wenn du zu diesem Projekt beitragen möchtest, kannst du Forken und Pull Requests erstellen. Bitte achte darauf, dass der Code sauber und gut strukturiert bleibt.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für weitere Informationen.

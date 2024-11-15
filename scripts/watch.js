const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// Definiere Quell- und Zielordner
const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

// Hilfsfunktion zum Kopieren von Dateien
const copyFile = (filePath) => {
  const targetPath = filePath.replace(srcDir, distDir);
  const targetDir = path.dirname(targetPath);

  // Sicherstellen, dass das Zielverzeichnis existiert
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Datei kopieren
  try {
    fs.copyFileSync(filePath, targetPath);
    console.log(`${path.extname(filePath).toUpperCase()} kopiert: ${filePath}`);
  } catch (err) {
    console.error(`Fehler beim Kopieren der Datei ${filePath}: ${err.message}`);
  }
};

// Überwache den `src`-Ordner auf Änderungen, einschließlich HTML-, CSS- und JS-Dateien
const watcher = chokidar.watch([
  path.join(srcDir, '**/*.html'),
  path.join(srcDir, 'css/**/*.css'),
  path.join(srcDir, 'js/**/*.js')
], { persistent: true });

// Reagiert auf Änderungen
watcher.on('change', (filePath) => {
  console.log(`Datei geändert: ${filePath}`);

  // Wenn eine Datei geändert wurde, kopiere sie ins dist-Verzeichnis
  copyFile(filePath);
});

// Reagiert auf das Hinzufügen neuer Dateien
watcher.on('add', (filePath) => {
  console.log(`Neue Datei hinzugefügt: ${filePath}`);

  // Wenn eine neue Datei hinzugefügt wurde, kopiere sie ins dist-Verzeichnis
  copyFile(filePath);
});

console.log('Überwache HTML, CSS und JS Dateien...');

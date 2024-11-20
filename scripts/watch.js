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

  console.log(`Überprüfe Kopiervorgang: Quelle: ${filePath}, Ziel: ${targetPath}`);

  // Sicherstellen, dass das Zielverzeichnis existiert
  if (!fs.existsSync(targetDir)) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Zielverzeichnis erstellt: ${targetDir}`);
    } catch (err) {
      console.error(`Fehler beim Erstellen des Zielverzeichnisses: ${err.message}`);
      return;
    }
  }

  // Datei kopieren
  try {
    fs.copyFileSync(filePath, targetPath);
    console.log(`${path.extname(filePath).toUpperCase()} erfolgreich kopiert: ${filePath} nach ${targetPath}`);
  } catch (err) {
    console.error(`Fehler beim Kopieren der Datei ${filePath} nach ${targetPath}: ${err.message}`);
  }
};

// Überwache den `src`-Ordner auf Änderungen, einschließlich HTML-, CSS- und JS-Dateien
const watcher = chokidar.watch([
  path.join(srcDir, '**/*.html'),
  path.join(srcDir, 'css/**/*.css'),
  path.join(srcDir, 'js/**/*.js')
], { persistent: true, ignoreInitial: false });

// Reagiert auf Änderungen
watcher.on('change', (filePath) => {
  console.log(`Datei geändert: ${filePath}`);
  copyFile(filePath);
});

// Reagiert auf das Hinzufügen neuer Dateien
watcher.on('add', (filePath) => {
  console.log(`Neue Datei hinzugefügt: ${filePath}`);
  copyFile(filePath);
});

// Reagiert auf das Entfernen von Dateien
watcher.on('unlink', (filePath) => {
  console.log(`Datei entfernt: ${filePath}`);
  const targetPath = filePath.replace(srcDir, distDir);
  try {
    fs.unlinkSync(targetPath);
    console.log(`Datei entfernt: ${targetPath}`);
  } catch (err) {
    console.error(`Fehler beim Entfernen der Datei ${targetPath}: ${err.message}`);
  }
});

// Überwache den `src`-Ordner für das Hinzufügen, Entfernen und Ändern von Dateien
watcher.on('ready', () => {
  console.log('Watcher ist bereit und überwacht Änderungen an HTML, CSS und JS Dateien...');
});

watcher.on('error', (error) => {
  console.error(`Fehler im Watcher: ${error.message}`);
});

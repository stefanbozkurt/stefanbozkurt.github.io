const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// Definiere Quell- und Zielordner
const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

// Definiere die Quell- und Zielordner für die Bilder
const imgSource = path.join(srcDir, 'img');
const imgDest = path.join(distDir, 'img');

// Überwache den `src`-Ordner auf Änderungen, inklusive des `img`-Ordners
const watcher = chokidar.watch([
  path.join(srcDir, '**/*.html'),
  path.join(srcDir, 'css/**/*.css'),
  path.join(srcDir, 'js/**/*.js'),
  path.join(srcDir, 'img/**/*')  // Überwacht alle Bilddateien
]);

// Reagiert auf Änderungen
watcher.on('change', (filePath) => {
  console.log(`Datei geändert: ${filePath}`);

  // Wenn eine HTML-Datei geändert wurde, kopiere sie ins dist-Verzeichnis
  if (filePath.endsWith('.html')) {
    const targetPath = filePath.replace(srcDir, distDir);
    fs.copyFileSync(filePath, targetPath);
    console.log(`HTML kopiert: ${filePath}`);
  }

  // Wenn eine CSS-Datei geändert wurde, kopiere sie ins dist-Verzeichnis
  if (filePath.endsWith('.css')) {
    const targetPath = filePath.replace(srcDir, distDir);
    fs.copyFileSync(filePath, targetPath);
    console.log(`CSS kopiert: ${filePath}`);
  }

  // Wenn eine JavaScript-Datei geändert wurde, kopiere sie ins dist-Verzeichnis
  if (filePath.endsWith('.js')) {
    const targetPath = filePath.replace(srcDir, distDir);
    fs.copyFileSync(filePath, targetPath);
    console.log(`JS kopiert: ${filePath}`);
  }

  // Wenn eine Bild-Datei geändert oder hinzugefügt wurde, kopiere sie ins dist-Verzeichnis
  if (filePath.startsWith(imgSource)) {
    const targetPath = filePath.replace(srcDir, distDir);
    fs.copyFileSync(filePath, targetPath);
    console.log(`Bild kopiert: ${filePath}`);
  }
});

// Reagiert auf das Hinzufügen neuer Dateien
watcher.on('add', (filePath) => {
  console.log(`Neue Datei hinzugefügt: ${filePath}`);
  
  // Wenn eine Bild-Datei hinzugefügt wurde, kopiere sie ins dist-Verzeichnis
  if (filePath.startsWith(imgSource)) {
    const targetPath = filePath.replace(srcDir, distDir);
    fs.copyFileSync(filePath, targetPath);
    console.log(`Neues Bild kopiert: ${filePath}`);
  }
});

console.log('Überwache Dateien...');

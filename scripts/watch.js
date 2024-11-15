const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Quelle und Ziel definieren
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Kopiere eine Datei vom src-Ordner zum dist-Ordner
function copyFile(srcPath, destPath) {
  // Überprüfen, ob die Datei existiert, und dann kopieren
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    //console.log(`Kopiert: ${srcPath} nach ${destPath}`);
  } else {
    console.error(`Fehler: Datei nicht gefunden - ${srcPath}`);
  }
}

// Beobachte Änderungen an der index.html-Datei
chokidar.watch(path.join(srcDir, 'index.html'))
  .on('change', (filePath) => {
    console.log(`Änderung festgestellt an ${filePath}`);
    copyFile(path.join(srcDir, 'index.html'), path.join(distDir, 'index.html'));
  });

// Beobachte Änderungen an den CSS-Dateien
chokidar.watch(path.join(srcDir, 'css/**/*.css'))
  .on('change', (filePath) => {
    console.log(`Änderung festgestellt an CSS-Datei: ${filePath}`);
    execSync('npm run minify-css'); // Minifiziere CSS
    copyFile(path.join(srcDir, filePath), path.join(distDir, path.basename(filePath))); // Nur Datei kopieren, nicht den gesamten Pfad
  });

// Beobachte Änderungen an den JS-Dateien
chokidar.watch(path.join(srcDir, 'js/**/*.js'))
  .on('change', (filePath) => {
    console.log(`Änderung festgestellt an JS-Datei: ${filePath}`);
    execSync('npm run minify-js'); // Minifiziere JS
    copyFile(path.join(srcDir, filePath), path.join(distDir, path.basename(filePath))); // Nur Datei kopieren, nicht den gesamten Pfad
  });

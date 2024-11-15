const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Definiere die Quell- und Zielordner
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Funktion zum Kopieren der index.html in den dist-Ordner
function copyIndexHTML() {
  const srcFile = path.join(srcDir, 'index.html'); // Nur die index.html-Datei
  const destFile = path.join(distDir, 'index.html'); // Zielort im dist-Ordner

  fs.copyFile(srcFile, destFile, (err) => {
    if (err) {
      console.error('Fehler beim Kopieren der index.html:', err);
    } else {
      console.log('index.html erfolgreich nach dist kopiert!');
    }
  });
}

// Watch für Änderungen an der index.html
chokidar.watch(path.join(srcDir, 'index.html')).on('change', (event, path) => {
  console.log(`index.html wurde geändert: ${path}`);
  copyIndexHTML(); // Kopiere die index.html, wenn sie geändert wurde
});

// Watch für JS-Dateien und Minifizierung
chokidar.watch(path.join(srcDir, 'js/*.js')).on('change', (event, path) => {
  console.log(`JavaScript-Datei geändert: ${path}`);
  exec('npm run minify-js', (err, stdout, stderr) => {
    if (err) {
      console.error('Fehler beim Minifizieren von JS:', err);
      return;
    }
    console.log(stdout);
  });
});

// Watch für CSS-Dateien und Minifizierung
chokidar.watch(path.join(srcDir, 'css/*.css')).on('change', (event, path) => {
  console.log(`CSS-Datei geändert: ${path}`);
  exec('npm run minify-css', (err, stdout, stderr) => {
    if (err) {
      console.error('Fehler beim Minifizieren von CSS:', err);
      return;
    }
    console.log(stdout);
  });
});

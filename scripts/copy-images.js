const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// Definiere Quell- und Zielordner
const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

// Definiere die Quell- und Zielordner für die Bilder
const imgSource = path.join(srcDir, 'img');
const imgDest = path.join(distDir, 'img');

// Stelle sicher, dass der Zielordner existiert
if (!fs.existsSync(imgDest)) {
  fs.mkdirSync(imgDest, { recursive: true });
}

// Überwache den `src`-Ordner auf Änderungen, einschließlich Bilder
const watcher = chokidar.watch([
  path.join(srcDir, '**/*.html'),
  path.join(srcDir, 'css/**/*.css'),
  path.join(srcDir, 'js/**/*.js'),
  path.join(srcDir, 'img/**/*') // Hier überwachen wir jetzt auch den `img`-Ordner
]);

// Funktion zum Kopieren von Bilddateien
const copyImage = (filePath) => {
  const targetPath = filePath.replace(srcDir, distDir);
  const targetDir = path.dirname(targetPath);

  // Sicherstellen, dass das Zielverzeichnis existiert
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Datei kopieren
  try {
    fs.copyFileSync(filePath, targetPath);
    console.log(`Bild kopiert: ${filePath} -> ${targetPath}`);
  } catch (err) {
    console.error(`Fehler beim Kopieren des Bildes: ${err.message}`);
  }
};

// Wenn eine Datei geändert wurde
watcher.on('change', (filePath) => {
  console.log(`Datei geändert: ${filePath}`);

  if (filePath.startsWith(imgSource)) {
    // Wenn eine Bild-Datei geändert wurde, kopiere sie ins dist-Verzeichnis
    copyImage(filePath);
  }
});

// Wenn eine Datei hinzugefügt wird
watcher.on('add', (filePath) => {
  console.log(`Neue Datei hinzugefügt: ${filePath}`);
  
  if (filePath.startsWith(imgSource)) {
    // Wenn eine neue Bild-Datei hinzugefügt wurde, kopiere sie ins dist-Verzeichnis
    copyImage(filePath);
  }
});

// Wenn eine Datei entfernt wurde
watcher.on('unlink', (filePath) => {
  console.log(`Datei entfernt: ${filePath}`);
  
  if (filePath.startsWith(imgSource)) {
    // Wenn eine Bild-Datei entfernt wurde, entferne sie auch aus dist
    const targetPath = filePath.replace(srcDir, distDir);
    try {
      fs.unlinkSync(targetPath);
      console.log(`Bild entfernt: ${targetPath}`);
    } catch (err) {
      console.error(`Fehler beim Entfernen des Bildes: ${err.message}`);
    }
  }
});

// Initiale Übertragung von bestehenden Bilddateien
const initialCopyImages = () => {
  const files = fs.readdirSync(imgSource);
  files.forEach((file) => {
    const filePath = path.join(imgSource, file);
    if (fs.lstatSync(filePath).isFile()) {
      copyImage(filePath);
    }
  });
};

// Starte die initiale Kopie für alle Bilder im `src/img/` Ordner
initialCopyImages();

console.log('Überwache Bilddateien...');

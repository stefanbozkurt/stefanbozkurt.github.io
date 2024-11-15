const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// Definiere Quell- und Zielordner
const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

// Definiere die Quell- und Zielordner für die Bilder
const imgSource = path.join(srcDir, 'img');
const imgDest = path.join(distDir, 'img');

// Stelle sicher, dass der Zielordner existiert (nur einmal zu Beginn)
if (!fs.existsSync(imgDest)) {
  fs.mkdirSync(imgDest, { recursive: true });
}

// Funktion zum Kopieren von Bilddateien (asynchron)
const copyImage = async (filePath) => {
  const targetPath = filePath.replace(srcDir, distDir);
  const targetDir = path.dirname(targetPath);

  // Sicherstellen, dass das Zielverzeichnis existiert
  try {
    await fs.promises.mkdir(targetDir, { recursive: true });
    // Datei kopieren
    await fs.promises.copyFile(filePath, targetPath);
    console.log(`Bild kopiert: ${filePath} -> ${targetPath}`);
  } catch (err) {
    console.error(`Fehler beim Kopieren des Bildes: ${err.message}`);
  }
};

// Wenn eine Datei geändert wurde
const handleChange = (filePath) => {
  console.log(`Datei geändert: ${filePath}`);
  if (filePath.startsWith(imgSource)) {
    copyImage(filePath);
  }
};

// Wenn eine Datei hinzugefügt wird
const handleAdd = (filePath) => {
  console.log(`Neue Datei hinzugefügt: ${filePath}`);
  if (filePath.startsWith(imgSource)) {
    copyImage(filePath);
  }
};

// Wenn eine Datei entfernt wurde
const handleUnlink = (filePath) => {
  console.log(`Datei entfernt: ${filePath}`);
  if (filePath.startsWith(imgSource)) {
    const targetPath = filePath.replace(srcDir, distDir);
    fs.promises.unlink(targetPath)
      .then(() => {
        console.log(`Bild entfernt: ${targetPath}`);
      })
      .catch((err) => {
        console.error(`Fehler beim Entfernen des Bildes: ${err.message}`);
      });
  }
};

// Initiale Übertragung von bestehenden Bilddateien
const initialCopyImages = async () => {
  try {
    const files = await fs.promises.readdir(imgSource);
    for (const file of files) {
      const filePath = path.join(imgSource, file);
      const stat = await fs.promises.lstat(filePath);
      if (stat.isFile()) {
        await copyImage(filePath);
      }
    }
  } catch (err) {
    console.error(`Fehler bei der initialen Kopie der Bilder: ${err.message}`);
  }
};

// Überwache den `img`-Ordner auf Änderungen
const watcher = chokidar.watch(path.join(imgSource, '**/*'), { persistent: true });

// Ereignisse für Dateiänderungen
watcher.on('change', handleChange);
watcher.on('add', handleAdd);
watcher.on('unlink', handleUnlink);

// Starte die initiale Kopie für alle Bilder im `src/img/` Ordner
initialCopyImages().then(() => {
  console.log('Initiale Bildkopie abgeschlossen. Überwache Bilddateien...');
});


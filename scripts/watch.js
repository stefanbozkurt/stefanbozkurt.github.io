const chokidar = require('chokidar');
const { exec } = require('child_process');

// Zu überwachende Dateien/Ordner
const watcher = chokidar.watch('./src', {
  ignored: /(^|[\/\\])\../, // Ignoriere versteckte Dateien
  persistent: true,
});

// Event-Handler für Änderungen
watcher.on('change', (path) => {
  console.log(`File ${path} has been changed. Rebuilding...`);
  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Build output:\n${stdout}`);
  });
});

console.log('Watching for file changes...');

// combine.js

const fs = require('fs');
const path = require('path');

// Liste der Module, die du kombinieren möchtest
const files = [
    path.join(__dirname, '../src/js/modules/tab-list.js'),
    path.join(__dirname, '../src/js/modules/accordion.js'),
    path.join(__dirname, '../src/js/global/main.js')
];

// Kombinierter Inhalt
let combinedCode = '';

// Lese jedes Modul und füge es zum kombinierten Code hinzu
files.forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');
    combinedCode += code + '\n\n';  // Füge das Modul mit einem Zeilenumbruch hinzu
});

// Schreibe den kombinierten Code in eine neue Datei
fs.writeFileSync(path.join(__dirname, '../dist/js/main.js'), combinedCode);
console.log('JavaScript-Dateien erfolgreich kombiniert!');
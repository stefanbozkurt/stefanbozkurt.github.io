const { execSync } = require('child_process');

console.log('Minifying JS...');
execSync('npm run minify-js', { stdio: 'inherit' });

console.log('Minifying CSS...');
execSync('npm run minify-css', { stdio: 'inherit' });

console.log('Copying index.html...');
execSync('copyfiles src/index.html dist', { stdio: 'inherit' });

console.log('Build completed successfully!');
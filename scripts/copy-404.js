const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(distDir, 'index.html');
const notFoundFile = path.join(distDir, '404.html');

try {
  if (fs.existsSync(indexFile)) {
    fs.copyFileSync(indexFile, notFoundFile);
    console.log('Copied index.html to 404.html');
  } else {
    console.warn('index.html not found in dist — run build first');
  }
} catch (err) {
  console.error('Failed to copy index.html to 404.html', err);
  process.exit(1);
}

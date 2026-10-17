import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

const CHROME_PATH =
  process.env.CHROME_BIN ||
  '/home/bruno/.cache/puppeteer/chrome/linux-152.0.7977.75/chrome-linux64/chrome';

if (!fs.existsSync(CHROME_PATH)) {
  console.error(`Chrome binary not found at ${CHROME_PATH}`);
  process.exit(1);
}

// Simple static file handler
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url.split('?')[0]);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(43219, '127.0.0.1', async () => {
  const port = server.address().port;
  console.log(`[generate-pdf] Local server listening on http://127.0.0.1:${port}`);

  const targets = [
    {
      url: `http://127.0.0.1:${port}/pt-br/resume/`,
      output: path.join(publicDir, 'bruno-bispo-cv.pdf'),
      label: 'PT-BR CV',
    },
    {
      url: `http://127.0.0.1:${port}/en/resume/`,
      output: path.join(publicDir, 'bruno-bispo-cv-en.pdf'),
      label: 'EN CV',
    },
  ];

  for (const target of targets) {
    console.log(`[generate-pdf] Generating ${target.label} -> ${path.relative(rootDir, target.output)}`);
    await new Promise((resolve, reject) => {
      execFile(
        CHROME_PATH,
        [
          '--headless=new',
          '--no-sandbox',
          '--disable-gpu',
          '--no-pdf-header-footer',
          '--run-all-compositor-stages-before-draw',
          '--virtual-time-budget=4000',
          `--print-to-pdf=${target.output}`,
          target.url,
        ],
        (error, _stdout, stderr) => {
          if (error) {
            console.error(`Error generating ${target.label}:`, error);
            return reject(error);
          }
          if (stderr) console.log(stderr.trim());
          resolve();
        }
      );
    });

    const stat = fs.statSync(target.output);
    console.log(`[generate-pdf] ✓ ${target.label} generated (${Math.round(stat.size / 1024)} KB)`);
  }

  // Also copy to dist if dist exists so preview/deploy has updated files
  for (const file of ['bruno-bispo-cv.pdf', 'bruno-bispo-cv-en.pdf']) {
    const src = path.join(publicDir, file);
    const dst = path.join(distDir, file);
    if (fs.existsSync(src) && fs.existsSync(distDir)) {
      fs.copyFileSync(src, dst);
    }
  }

  server.close(() => {
    console.log('[generate-pdf] All PDFs successfully updated and copied to public/ and dist/.');
    process.exit(0);
  });
});

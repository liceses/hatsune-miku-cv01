import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('D:/developing/DSH-plugin/dsh-cosplay/miku');
const port = Number(process.env.MIKU_PORT || 8899);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json'
};

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const fp = path.resolve(path.join(root, p));
  if (!fp.startsWith(root)) { res.writeHead(403).end('blocked'); return; }
  fs.readFile(fp, (err, buf) => {
    if (err) { res.writeHead(404, { 'content-type': 'text/plain' }).end('404 ' + p); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(buf);
  });
}).listen(port, '127.0.0.1', () => console.log('MIKU_PREVIEW http://127.0.0.1:' + port + '/'));

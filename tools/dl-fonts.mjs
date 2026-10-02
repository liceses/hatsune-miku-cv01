import fs from 'node:fs';
import path from 'node:path';

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' };
const root = 'D:/developing/DSH-plugin/dsh-cosplay/miku/assets/fonts';
const log = (m) => { fs.appendFileSync(path.join(root, '_log.txt'), m + '\n'); console.log(m); };
fs.mkdirSync(root, { recursive: true });

const fams = [
  ['Dela Gothic One', 'Dela+Gothic+One:wght@400', 'delagothic'],
  ['M PLUS Rounded 1c', 'M+PLUS+Rounded+1c:wght@400;800', 'mplusrounded'],
  ['Noto Sans SC', 'Noto+Sans+SC:wght@400;900', 'notosanssc'],
  ['Orbitron', 'Orbitron:wght@500;700;900', 'orbitron'],
  ['Zen Dots', 'Zen+Dots', 'zendots'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tryFetch(url, isText) {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return isText ? await r.text() : Buffer.from(await r.arrayBuffer());
    } catch (e) {
      log('  retry ' + i + ' :: ' + e.message);
      await sleep(400 * (i + 1));
    }
  }
  return null;
}

const cssOut = [];
let totalBytes = 0, totalFiles = 0;

for (const [label, q, slug] of fams) {
  const css = await tryFetch('https://fonts.googleapis.com/css2?family=' + q + '&display=swap', true);
  if (!css) { log('CSS FAIL ' + label); continue; }
  const dir = path.join(root, slug);
  fs.mkdirSync(dir, { recursive: true });
  const queue = [];
  for (const b of css.split('@font-face').slice(1).map((x) => '@font-face' + x)) {
    const m = b.match(/url\((https:[^)]+\.woff2)\)/);
    if (m) queue.push([b, m[1]]);
  }
  log('FAMILY ' + label + ' blocks=' + queue.length);
  const newBlocks = [];
  const CONC = 10;
  for (let i = 0; i < queue.length; i += CONC) {
    const chunk = queue.slice(i, i + CONC);
    const results = await Promise.all(chunk.map(async ([b, url]) => {
      const name = slug + '-' + path.basename(new URL(url).pathname);
      const fp = path.join(dir, name);
      if (!fs.existsSync(fp)) {
        const buf = await tryFetch(url, false);
        if (!buf) return null;
        fs.writeFileSync(fp, buf);
        totalBytes += buf.length; totalFiles++;
      }
      return b.replace(/url\(https:[^)]+\.woff2\)/, 'url(./' + slug + '/' + name + ')').trim();
    }));
    for (const r of results) if (r) newBlocks.push(r);
    await sleep(10);
  }
  cssOut.push('/* ===== ' + label + ' ===== */\n' + newBlocks.join('\n'));
  log('DONE ' + label + ' kept=' + newBlocks.length);
}

fs.writeFileSync(path.join(root, 'fonts.css'), cssOut.join('\n'));
log('TOTAL files=' + totalFiles + ' bytes=' + (totalBytes / 1048576).toFixed(2) + 'MB');

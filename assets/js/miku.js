/* =========================================================================
   HATSUNE MIKU / CV01 — 交互层
   39 · みくみくにしてあげる
   ========================================================================= */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- TOAST */
  const toastEl = $('#toast');
  let toastTimer;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2400);
  };

  /* ---------------------------------------------------------------- BOOT */
  const boot = $('#boot'), bootBar = $('#boot-bar'), bootPct = $('#boot-pct');
  let bp = 0;
  const bootTick = setInterval(() => {
    bp = Math.min(100, bp + rand(6, 19));
    if (bootBar) bootBar.style.width = bp + '%';
    if (bootPct) bootPct.textContent = String(Math.floor(bp)).padStart(3, '0') + '%';
    if (bp >= 100) {
      clearInterval(bootTick);
      setTimeout(() => {
        boot && boot.classList.add('done');
        document.body.classList.add('ready');
        toast('CV01 上线 —— 39 / 初音ミク');
      }, 320);
    }
  }, 130);

  /* ---------------------------------------------------------------- CLOCK */
  const clock = $('#clock');
  const tickClock = () => {
    if (!clock) return;
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    clock.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  };
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------------------------------------------------------------- CURSOR */
  const ring = $('#c-ring'), dot = $('#c-dot');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (dot) dot.style.transform = `translate(${mx}px, ${my}px)`;
    trail(e.clientX, e.clientY);
  }, { passive: true });

  const loopCursor = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    if (ring) ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loopCursor);
  };
  loopCursor();

  document.addEventListener('mouseover', (e) => {
    const hot = e.target.closest('a, button, .song, .gal, .chip, .stat, .tl-item, .spec-row, .story');
    ring && ring.classList.toggle('hot', !!hot);
  });

  let trailAt = 0;
  const LEEKISH = ['🥬', '♪', '♫', '✿'];
  function trail(x, y) {
    const now = performance.now();
    if (reduced || now - trailAt < 46) return;
    trailAt = now;
    if (Math.random() > 0.55) return;
    const s = document.createElement('span');
    s.className = 'leek-trail';
    s.textContent = LEEKISH[(Math.random() * LEEKISH.length) | 0];
    s.style.left = x + rand(-8, 8) + 'px';
    s.style.top = y + rand(-6, 6) + 'px';
    s.style.color = Math.random() > 0.5 ? '#7ff5e8' : '#ff86cd';
    s.style.fontSize = rand(11, 22) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }

  /* ---------------------------------------------------------------- CANVAS FIELD */
  const cv = $('#miku-canvas');
  const ctx = cv ? cv.getContext('2d', { alpha: true }) : null;
  let W = 0, H = 0, DPR = 1;
  const parts = [];
  const GLYPHS = ['♪', '♫', '♬', '39', '01', 'ネギ', '✦'];

  function sizeCanvas() {
    if (!cv) return;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = Math.floor(innerWidth * DPR);
    H = cv.height = Math.floor(innerHeight * DPR);
    cv.style.width = innerWidth + 'px';
    cv.style.height = innerHeight + 'px';
  }

  function seedParticles() {
    if (!ctx) return;
    parts.length = 0;
    const n = window.innerWidth < 760 ? 46 : 108;
    for (let i = 0; i < n; i++) {
      parts.push({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.22, 0.22) * DPR, vy: rand(-0.55, -0.12) * DPR,
        r: rand(1, 3.4) * DPR,
        a: rand(0.14, 0.62),
        hue: Math.random() > 0.82 ? 330 : 174,
        glyph: Math.random() > 0.9 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null,
        size: rand(11, 24) * DPR,
        rot: rand(-0.3, 0.3), spin: rand(-0.012, 0.012)
      });
    }
  }

  let px = 0, py = 0, tpx = 0, tpy = 0;
  window.addEventListener('mousemove', (e) => {
    tpx = (e.clientX / innerWidth - 0.5) * 34 * DPR;
    tpy = (e.clientY / innerHeight - 0.5) * 22 * DPR;
  }, { passive: true });

  const drawField = (t) => {
    if (!ctx) return;
    px += (tpx - px) * 0.05;
    py += (tpy - py) * 0.05;
    ctx.clearRect(0, 0, W, H);
    const flick = 0.72 + Math.sin(t / 620) * 0.28;

    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.rot += p.spin;
      if (p.y < -40 * DPR) { p.y = H + 30 * DPR; p.x = rand(0, W); }
      if (p.x < -40 * DPR) p.x = W + 20 * DPR;
      if (p.x > W + 40 * DPR) p.x = -20 * DPR;

      const gx = p.x + px * (0.4 + p.r / (4 * DPR));
      const gy = p.y + py * (0.4 + p.r / (4 * DPR));
      ctx.globalAlpha = p.a * flick;
      ctx.fillStyle = p.hue === 330 ? '#ff86cd' : '#8ff8ec';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 12 * DPR;

      if (p.glyph) {
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(p.rot);
        ctx.font = `${p.size}px system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(gx, gy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  sizeCanvas();
  seedParticles();
  window.addEventListener('resize', () => { sizeCanvas(); seedParticles(); });

  let raf = null;
  const startLoop = () => { if (!raf && ctx) raf = requestAnimationFrame(frame); };
  const stopLoop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };
  let frame;
  frame = (t) => { drawField(t); raf = requestAnimationFrame(frame); };
  startLoop();
  document.addEventListener('visibilitychange', () => (document.hidden ? stopLoop() : startLoop()));

  /* ---------------------------------------------------------------- REVEAL */
  const io = new IntersectionObserver((es) => {
    for (const e of es) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

  /* ---------------------------------------------------------------- COUNTERS */
  const cio = new IntersectionObserver((es) => {
    for (const e of es) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      cio.unobserve(el);
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        const v = Math.floor(target * eased);
        el.innerHTML = v.toLocaleString('en-US') + (suffix ? `<i>${suffix}</i>` : '');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.4 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------------------------------------------------------------- TICKER CLONE */
  $$('.ticker-track[data-clone]').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------------------------------------------------------------- 3D TILT */
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    $$('.tilt').forEach((el) => {
      let rafId = 0, tx = 0, ty = 0, cx = 0, cy = 0;
      const run = () => {
        cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
        el.style.transform = `perspective(900px) rotateY(${cx}deg) rotateX(${cy}deg) translateZ(0)`;
        if (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) rafId = requestAnimationFrame(run);
        else rafId = 0;
      };
      el.style.willChange = 'transform';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 16;
        ty = -((e.clientY - r.top) / r.height - 0.5) * 14;
        if (!rafId) rafId = requestAnimationFrame(run);
      });
      el.addEventListener('mouseleave', () => {
        tx = 0; ty = 0;
        if (!rafId) rafId = requestAnimationFrame(run);
      });
    });
  }

  /* ---------------------------------------------------------------- HERO PARALLAX */
  const fig = $('#hero-fig');
  if (fig && !reduced) {
    let fx = 0, fy = 0, dx = 0, dy = 0;
    const heroLoop = () => {
      dx += (fx - dx) * 0.07; dy += (fy - dy) * 0.07;
      const sc = 1 + Math.min(0.03, Math.abs(dx) / 900);
      fig.style.transform = `perspective(1200px) rotateY(${dx}deg) rotateX(${-dy}deg) scale(${sc}) translateY(${dy * 0.35}px)`;
      requestAnimationFrame(heroLoop);
    };
    window.addEventListener('mousemove', (e) => {
      fx = ((e.clientX / innerWidth) - 0.5) * 13;
      fy = ((e.clientY / innerHeight) - 0.5) * 9;
    }, { passive: true });
    heroLoop();
  }

  /* ---------------------------------------------------------------- SCRAMBLE LABELS */
  const GLYPHSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/*+-';
  function scramble(el, finalText) {
    let i = 0;
    const total = finalText.length;
    const id = setInterval(() => {
      el.textContent = finalText
        .split('')
        .map((ch, k) => (k < i ? ch : (ch === ' ' ? ' ' : GLYPHSET[(Math.random() * GLYPHSET.length) | 0] || ch)))
        .join('');
      i += 1;
      if (i > total) { clearInterval(id); el.textContent = finalText; }
    }, 34);
  }
  const sio = new IntersectionObserver((es) => {
    for (const e of es) {
      if (!e.isIntersecting) continue;
      sio.unobserve(e.target);
      const txt = e.target.textContent.trim();
      if (txt.length < 4 || txt.length > 22) continue;
      scramble(e.target, txt);
    }
  }, { threshold: 0.6 });
  $$('.sec-en').forEach((el) => sio.observe(el));

  /* ---------------------------------------------------------------- DOTS + PROGRESS */
  const prog = $('#prog');
  const dots = $$('#dots a');
  const sections = dots.map((d) => $(d.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? (scrollY / max) * 100 : 0;
    if (prog) prog.style.width = p + '%';
    let active = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= innerHeight * 0.42) active = i; });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $$('[data-scroll]').forEach((b) => b.addEventListener('click', () => {
    const t = $(b.dataset.scroll);
    t && t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  /* ---------------------------------------------------------------- LEEK RAIN */
  let raining = false;
  function leekBurst(count = 34) {
    const items = ['🥬', '♪', '♫', 'ネギ', '39'];
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'leek-drop';
      s.textContent = items[(Math.random() * items.length) | 0];
      s.style.left = rand(-4, 100) + '%';
      s.style.fontSize = rand(18, 54) + 'px';
      s.style.animationDuration = rand(2.6, 6.2) + 's';
      s.style.animationDelay = rand(0, 0.9) + 's';
      s.style.filter = Math.random() > 0.6 ? 'drop-shadow(0 0 12px #39c5bb)' : 'drop-shadow(0 0 12px #ff86cd)';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 7400);
    }
  }
  const leekBtn = $('#btn-leek');
  leekBtn && leekBtn.addEventListener('click', () => {
    leekBurst(56);
    toast('ネギ、降ってきた 🥬');
    if (!raining) { raining = true; setTimeout(() => (raining = false), 3000); }
  });

  addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const k = e.key.toLowerCase();
    if (k === 'm') { leekBurst(40); toast('M for MIKU —— 39!'); }
    if (k === '3') { leekBurst(9); toast('39'); }
  });

  /* ---------------------------------------------------------------- AUDIO (39 motif) */
  let actx = null;
  function arp() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const master = actx.createGain();
      master.gain.value = 0.0001;
      master.connect(actx.destination);
      const t0 = actx.currentTime + 0.03;
      // A-pentatonic-ish motif: ミ → ク → 39
      const mel = [
        [0.00, 83.99, 0.30], [0.22, 110.00, 0.30], [0.44, 123.47, 0.30],
        [0.66, 110.00, 0.22], [0.88, 98.00, 0.34], [1.10, 123.47, 0.26],
        [1.32, 146.83, 0.42], [1.62, 123.47, 0.30], [1.84, 110.00, 0.30],
        [2.06, 83.99, 0.60]
      ];
      const filter = actx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, t0);
      filter.frequency.exponentialRampToValueAtTime(900, t0 + 2.8);
      filter.Q.value = 6;
      filter.connect(master);

      master.gain.setValueAtTime(0.0001, t0);
      master.gain.exponentialRampToValueAtTime(0.24, t0 + 0.06);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.0);

      for (const [dt, f, len] of mel) {
        const o = actx.createOscillator();
        const g = actx.createGain();
        o.type = 'square';
        o.frequency.value = f * 2;
        g.gain.setValueAtTime(0.0001, t0 + dt);
        g.gain.exponentialRampToValueAtTime(0.30, t0 + dt + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + len);
        o.connect(g); g.connect(filter);
        o.start(t0 + dt); o.stop(t0 + dt + len + 0.05);
      }
      // bass
      [[0, 41.99, 1.0], [0.9, 46.25, 1.1], [2.0, 55.0, 1.0]].forEach(([dt, f, len]) => {
        const o = actx.createOscillator();
        const g = actx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + dt);
        g.gain.exponentialRampToValueAtTime(0.32, t0 + dt + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + len);
        o.connect(g); g.connect(master);
        o.start(t0 + dt); o.stop(t0 + dt + len + 0.05);
      });
      // sparkle
      for (let i = 0; i < 26; i++) {
        const o = actx.createOscillator();
        const g = actx.createGain();
        const dt = rand(0, 2.7);
        o.type = 'sine';
        o.frequency.value = rand(1400, 4200);
        g.gain.setValueAtTime(0.0001, t0 + dt);
        g.gain.exponentialRampToValueAtTime(0.05, t0 + dt + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.12);
        o.connect(g); g.connect(master);
        o.start(t0 + dt); o.stop(t0 + dt + 0.16);
      }
    } catch (err) {
      /* audio optional */
    }
  }
  const s1 = $('#btn-song'), s2 = $('#btn-song2');
  [s1, s2].forEach((b) => b && b.addEventListener('click', () => {
    arp();
    toast('♪ 39 —— ミク、歌います');
    leekBurst(18);
  }));

  /* ---------------------------------------------------------------- GALLERY DRAG */
  const strip = $('.gallery-strip');
  if (strip) {
    let down = false, sx = 0, sl = 0;
    strip.addEventListener('pointerdown', (e) => { down = true; sx = e.clientX; sl = strip.scrollLeft; strip.style.cursor = 'grabbing'; });
    addEventListener('pointerup', () => { down = false; if (strip) strip.style.cursor = ''; });
    strip.addEventListener('pointermove', (e) => {
      if (!down) return;
      strip.scrollLeft = sl - (e.clientX - sx);
    });
  }

  /* ---------------------------------------------------------------- WELCOME */
  setTimeout(() => toast('按 M 键 —— 有惊喜 🥬'), 4200);
})();

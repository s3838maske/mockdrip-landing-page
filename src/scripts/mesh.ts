// Hero "horizon" dot mesh: a perspective wave field that lifts under the cursor
// and ripples on click. Pauses when off screen.
import { prefersReducedMotion } from './motion';
import { currentTheme } from './theme';

export function initMesh(c: HTMLCanvasElement) {
  const ctx = c.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let W = 1, H = 1;
  const size = () => {
    const r = c.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();

  const COLS = 120, ROWS = 48;
  const mouse = { x: -9999, y: -9999, a: 0 };
  let rings: { x: number; y: number; t: number }[] = [];

  window.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  window.addEventListener('pointerdown', (e) => {
    const r = c.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (x >= 0 && y >= 0 && x <= W && y <= H) {
      rings.push({ x, y, t: performance.now() });
      if (rings.length > 6) rings.shift();
    }
  });
  window.addEventListener('resize', size);

  let visible = true;
  new IntersectionObserver((en) => (visible = en[0].isIntersecting)).observe(c);

  const reduce = prefersReducedMotion();
  const t0 = performance.now();

  const frame = (now: number) => {
    requestAnimationFrame(frame);
    if (!visible) return;
    if (Math.abs(c.getBoundingClientRect().width - W) > 1) size();
    const light = currentTheme() === 'light';
    const DOT = light ? '#23382C' : '#C9E6D4';
    const ACC = light ? '#16A34A' : '#BEF264';
    const amul = light ? 0.75 : 1;
    const t = reduce ? 0 : (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const horizon = H * 0.5, cx = W / 2, camH = 1.15, f = H * 0.62;
    const mIn = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= W && mouse.y <= H;
    mouse.a += ((mIn ? 1 : 0) - mouse.a) * 0.06;
    rings = rings.filter((r) => now - r.t < 2400);

    for (let j = 0; j < ROWS; j++) {
      const zf = j / (ROWS - 1), Z = 0.9 + zf * zf * 15, span = 3.2 + Z * 1.3, depth = 1 - zf;
      for (let i = 0; i < COLS; i++) {
        const X = (i / (COLS - 1) - 0.5) * 2 * span;
        const sx = cx + (X * f) / Z;
        if (sx < -6 || sx > W + 6) continue;
        const wave =
          Math.sin(X * 0.9 + t * 0.9 + Z * 0.55) * 0.16 +
          Math.sin(X * 0.35 - t * 0.6 + Z * 0.9) * 0.12 +
          Math.cos(Z * 0.7 - t * 1.1) * 0.1;
        let sy = horizon + ((camH - wave) * f) / Z;
        let lift = 0;
        if (mouse.a > 0.01) {
          const mx = sx - mouse.x, my = (sy - mouse.y) * 1.4;
          lift = Math.exp(-(mx * mx + my * my) / 39200) * mouse.a;
        }
        let ring = 0;
        for (const r of rings) {
          const age = (now - r.t) / 1000, rad = age * 460, rx = sx - r.x, ry = (sy - r.y) * 1.4;
          const w = Math.exp(-Math.pow((Math.hypot(rx, ry) - rad) / 34, 2)) * (1 - age / 2.4);
          if (w > ring) ring = w;
        }
        sy -= (lift * 52 + ring * 24) / Math.sqrt(Z);
        if (sy < horizon - 50 || sy > H + 6) continue;
        const crest = Math.max(0, (wave - 0.2) / 0.18);
        const acc = Math.min(1, lift * 1.3 + ring + crest * 0.45);
        const a = (0.06 + 0.6 * depth * depth + 0.45 * lift + 0.5 * ring) * amul;
        const sz = 0.6 + 2 * depth + lift * 1.3;
        ctx.globalAlpha = a > 1 ? 1 : a;
        ctx.fillStyle = acc > 0.35 ? ACC : DOT;
        ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz);
      }
    }
    ctx.globalAlpha = 1;
  };
  requestAnimationFrame(frame);
}

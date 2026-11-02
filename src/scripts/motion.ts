// Northline scroll FX: reveal-on-enter, blur-in, glass nav, liquid buttons,
// stacking cards and the horizontal journey.
// One rAF loop reads layout once per frame and writes transforms only.

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
// Per-frame smoothing factor tuned at 60fps, rescaled so 120Hz and throttled tabs feel the same.
export const damp = (k: number, dtMs: number) => 1 - Math.pow(1 - k, dtMs / (1000 / 60));

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initMotion() {
  const mm = $('.mm');
  if (!mm) return;
  const reduce = prefersReducedMotion();

  // The pinned sections size themselves off --vh, capped so tall screens don't over-scroll.
  let vh = 800;
  const setVH = () => {
    vh = Math.min(window.innerHeight || 800, 1000);
    mm.style.setProperty('--vh', `${vh}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);

  /* reveal-on-enter */
  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const x of entries) {
        if (!x.isIntersecting) continue;
        x.target.classList.add('is-in');
        revealIO.unobserve(x.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  $$('.n9-io').forEach((el) => revealIO.observe(el));

  /* "Why" section: counters + word cascade start once it's on screen */
  const why = $('[data-n9="why"]');
  if (why) {
    const whyIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          why.classList.add('in');
          whyIO.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    whyIO.observe(why);
  }

  /* liquid buttons follow the cursor */
  window.addEventListener('pointermove', (e) => {
    const b = (e.target as Element | null)?.closest?.<HTMLElement>('.n9-liquid');
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    b.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  });

  /* glass nav squeezes on scroll */
  const nav = $('[data-n9="nav"]');
  const onScroll = () => nav?.classList.toggle('squeeze', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* blur-in: every text block and component, first time it enters the viewport */
  if (!reduce) initBlurIn();

  /* per-frame scroll choreography */
  const cards = $$('[data-n9="sc"]');
  const jr = $('[data-n9="jr"]');
  const track = $('[data-n9="track"]');
  const tl = $('[data-n9="tl"]');
  const line = $('[data-n9="line"]');
  const jdot = $('[data-n9="jdot"]');
  const milestones = $$('[data-n9="ms"]');

  const sm = { jr: 0 };
  let last = performance.now();

  const tick = (now: number) => {
    requestAnimationFrame(tick);
    const dt = Math.min(100, now - last);
    last = now;
    const vw = window.innerWidth;

    /* stacking cards: each card shrinks and darkens as the next one slides over it */
    for (let i = 0; i < cards.length - 1; i++) {
      const c = cards[i];
      const cr = c.getBoundingClientRect();
      const nx = cards[i + 1].getBoundingClientRect();
      const t = clamp((cr.top + cr.height - nx.top) / cr.height, 0, 1);
      if (!reduce) c.style.transform = `scale(${(1 - 0.08 * t).toFixed(4)})`;
      const shade = c.firstElementChild as HTMLElement | null;
      if (shade) shade.style.opacity = (0.65 * t).toFixed(3);
    }

    /* horizontal journey: vertical scroll drives the track sideways */
    if (jr && track) {
      const jrr = jr.getBoundingClientRect();
      if (jrr.bottom > 0 && jrr.top < vh) {
        const end = jrr.height * 0.92 - vh;
        const jp = clamp(-jrr.top / Math.max(1, end), 0, 1);
        sm.jr += (jp - sm.jr) * (reduce ? 1 : damp(0.14, dt));
        const shift = Math.max(0, track.scrollWidth - vw);
        track.style.transform = `translate3d(${(-shift * sm.jr).toFixed(1)}px,0,0)`;
        if (tl) {
          const tr = tl.getBoundingClientRect();
          const mark = vw * (vw <= 900 ? 0.8 : 0.62);
          const lf = clamp((mark - tr.left) / tr.width, 0, 1);
          if (line) line.style.transform = `scaleX(${lf.toFixed(4)})`;
          if (jdot) jdot.style.left = `${(lf * 100).toFixed(2)}%`;
          milestones.forEach((m) => m.classList.toggle('on', m.getBoundingClientRect().left < mark));
        }
      }
    }
  };
  requestAnimationFrame(tick);
}

function initBlurIn() {
  const SEL =
    'h2,h3,h4,p,li,blockquote,figure,table,.e-kicker,.kicker,.e-chip,.e-card,.e-btn-primary,.e-btn-ghost,.btn,.n9-link,.n9-liquid,.e-lvl,.e-fq,.tabs,.e-tile,.e-dash,.e-note,.e-bub,.e-guar,.e-pill,.e-trust,.e-fbot,.e-logo,.n9-foot-word,.e-marq-t,.q';
  const SKIP = '.ai-wrap,[data-n9="jr"],#top,#product,.n9-enter,.n9-nav,.m-card,.m-w,.reveal';
  const picked: HTMLElement[] = [];
  $$('.mm > main > section, .mm > footer').forEach((sec) => {
    $$(SEL, sec).forEach((el) => {
      if (el.closest(SKIP)) return;
      if (el.parentElement?.closest('.n9-b')) return;
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed' || cs.display === 'none') return;
      el.classList.add('n9-b');
      picked.push(el);
    });
  });

  // Elements entering in the same frame are staggered as one batch.
  let batch: HTMLElement[] = [];
  let batchT = 0;
  const flush = () => {
    batch.forEach((el, n) => {
      const delay = Math.min(n * 55, 440);
      el.style.setProperty('--bd', `${delay}ms`);
      el.classList.add('n9-bin');
      setTimeout(() => {
        el.classList.remove('n9-b', 'n9-bin');
        el.style.removeProperty('--bd');
      }, 1500 + delay);
    });
    batch = [];
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const x of entries) {
        if (!x.isIntersecting) continue;
        batch.push(x.target as HTMLElement);
        io.unobserve(x.target);
      }
      clearTimeout(batchT);
      batchT = window.setTimeout(flush, 16);
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
  );
  picked.forEach((el) => io.observe(el));
}

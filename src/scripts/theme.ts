// Light/dark switch. The new theme grows out of the toggle in a circle
// (View Transitions API, with a clip-circle fallback). The choice is remembered.
import { prefersReducedMotion } from './motion';

export type Theme = 'dark' | 'light';
export const THEME_KEY = 'mockdrip-theme';

export const currentTheme = (): Theme =>
  document.querySelector('.mm')?.classList.contains('e-light') ? 'light' : 'dark';

export function initThemeSwitch() {
  const tt = document.querySelector<HTMLButtonElement>('[data-n9="theme"]');
  const mm = document.querySelector<HTMLElement>('.mm');
  if (!tt || !mm) return;
  const reduce = prefersReducedMotion();

  const sync = () => {
    const light = currentTheme() === 'light';
    tt.classList.toggle('on', light);
    tt.setAttribute('aria-pressed', String(light));
    tt.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  };
  const apply = (next: Theme) => {
    mm.classList.toggle('e-light', next === 'light');
    mm.classList.toggle('e-dark', next !== 'light');
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked: theme still applies */ }
  };
  sync();

  let busy = false;
  tt.addEventListener('click', () => {
    if (busy) return;
    const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
    const r = tt.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const R = Math.ceil(Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)));

    // 1 · the knob slides across
    tt.classList.toggle('on', next === 'light');
    if (reduce) { apply(next); sync(); return; }
    busy = true;
    const done = () => { busy = false; sync(); };

    setTimeout(() => {
      // 2 · the new theme grows out of the toggle
      if (document.startViewTransition) {
        const t = document.startViewTransition(() => apply(next));
        t.ready
          .then(() => {
            document.documentElement.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] },
              { duration: 900, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
            );
          })
          .catch(() => {});
        t.finished.then(done, done);
      } else {
        const cover = document.createElement('div');
        cover.className = 'n9-vt-fallback';
        cover.style.background = next === 'light' ? '#F6F8F6' : '#050505';
        cover.style.setProperty('--x', `${x}px`);
        cover.style.setProperty('--y', `${y}px`);
        cover.style.setProperty('--r', `${R}px`);
        document.body.appendChild(cover);
        requestAnimationFrame(() => requestAnimationFrame(() => cover.classList.add('go')));
        setTimeout(() => {
          apply(next);
          cover.style.transition = 'opacity .35s';
          cover.style.opacity = '0';
          setTimeout(() => { cover.remove(); done(); }, 380);
        }, 860);
      }
    }, 240);
  });
}

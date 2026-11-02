// Small stateful widgets: product-preview tabs, bridge levels, FAQ accordion, mobile menu.
// Markup is server-rendered with the default state, so these only swap state on input.
import { levels } from '../data/content';

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

function initPreviewTabs() {
  const group = document.querySelector<HTMLElement>('[data-tabs]');
  const title = document.querySelector<HTMLElement>('[data-tab-title]');
  if (!group) return;
  const tabs = $$<HTMLButtonElement>('[data-tab]', group);
  const panels = $$('[data-panel]');
  const select = (id: string) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.classList.toggle('on', on);
      t.setAttribute('aria-pressed', String(on));
      if (on && title) title.textContent = t.dataset.title ?? '';
    });
    panels.forEach((p) => (p.hidden = p.dataset.panel !== id));
  };
  tabs.forEach((t) => t.addEventListener('click', () => select(t.dataset.tab!)));
}

function initLevels() {
  const group = document.querySelector<HTMLElement>('[data-levels]');
  if (!group) return;
  const buttons = $$<HTMLButtonElement>('[data-level]', group);
  const slots = $$('[data-lvl]');
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const lvl = levels.find((l) => l.key === b.dataset.level);
      if (!lvl) return;
      buttons.forEach((x) => {
        const on = x === b;
        x.classList.toggle('on', on);
        x.setAttribute('aria-pressed', String(on));
      });
      slots.forEach((s) => (s.textContent = lvl[s.dataset.lvl as keyof typeof lvl]));
    }),
  );
}

function initFaq() {
  const items = $$('[data-faq]');
  items.forEach((item) => {
    const btn = item.querySelector('button')!;
    btn.addEventListener('click', () => {
      const opening = !item.classList.contains('open');
      // Single-open accordion, as in the design.
      items.forEach((other) => {
        const open = other === item && opening;
        other.classList.toggle('open', open);
        other.querySelector('button')!.setAttribute('aria-expanded', String(open));
        other.querySelector<HTMLElement>('.ans')!.hidden = !open;
      });
    });
  });
}

function initMenu() {
  const nav = document.querySelector<HTMLElement>('[data-n9="nav"]');
  const btn = document.querySelector<HTMLButtonElement>('[data-n9="menu"]');
  if (!nav || !btn) return;
  const set = (open: boolean) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  $$('.n9-drawer a', nav).forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); btn.focus(); }
  });
}

export function initInteractions() {
  initPreviewTabs();
  initLevels();
  initFaq();
  initMenu();
}

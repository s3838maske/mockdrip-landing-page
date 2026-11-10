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

export interface StartRequest { name: string; college: string; drive: string; phone: string }

// Hand-off point for the sign-up backend. Until it exists the form only validates
// and confirms on the page; replace the body with a POST to your API.
async function submitStart(_req: StartRequest): Promise<void> {}

const FIELD_LABELS: Record<string, string> = { name: 'your name', college: 'your college', phone: 'a 10-digit mobile number' };

function initStartForm() {
  const form = document.querySelector<HTMLFormElement>('[data-start]');
  const status = document.getElementById('start-status');
  if (!form || !status) return;
  const fields = $$<HTMLInputElement>('input', form);
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  // Clear an error as soon as the blank is fixed.
  fields.forEach((f) => f.addEventListener('input', () => {
    if (f.getAttribute('aria-invalid') === 'true' && f.checkValidity()) f.removeAttribute('aria-invalid');
  }));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    fields.forEach((f) => (f.value = f.value.trim()));
    const invalid = fields.filter((f) => !f.checkValidity());
    fields.forEach((f) => (invalid.includes(f) ? f.setAttribute('aria-invalid', 'true') : f.removeAttribute('aria-invalid')));
    if (invalid.length) {
      status.dataset.state = 'error';
      const missing = new Intl.ListFormat('en', { type: 'conjunction' }).format(invalid.map((f) => FIELD_LABELS[f.name]));
      status.textContent = `Add ${missing} to start.`;
      invalid[0].focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form)) as unknown as StartRequest;
    button.disabled = true;
    status.dataset.state = '';
    status.textContent = 'Setting up your mock…';
    try {
      await submitStart(data);
      status.dataset.state = 'ok';
      status.textContent = `You’re set, ${data.name}. Your free mock link goes to ${data.phone}.`;
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'That didn’t go through. Check your connection and try again.';
      button.disabled = false;
    }
  });
}

export function initInteractions() {
  initPreviewTabs();
  initLevels();
  initFaq();
  initMenu();
  initStartForm();
}

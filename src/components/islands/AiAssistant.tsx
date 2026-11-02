// MockDrip AI: the orb that starts in the hero, arcs into a corner as you scroll,
// follows the cursor with its eyes, explains any selected word, and opens a coach chat.
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GREETING, SECTION_TIPS, SUGGESTIONS, lookup, localAnswer, type Gloss,
} from '../../data/assistant';
import { damp } from '../../scripts/motion';

interface Msg { role: 'ai' | 'me'; text: string; typing?: boolean }
type Word = Gloss & { w: string; loading: boolean };

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Replace with a fetch to your own LLM endpoint to get real answers; the
// local rules keep the widget useful with no backend.
async function askCoach(text: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 450));
  return localAnswer(text);
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
);

export default function AiAssistant() {
  const [chatOpen, setChatOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [word, setWord] = useState<Word | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [docked, setDocked] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', text: GREETING }]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLButtonElement>(null);
  const dockEyesRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The animation loops read the latest state without re-subscribing.
  const live = useRef({ chatOpen, word, docked });
  live.current = { chatOpen, word, docked };

  const askChat = useCallback(async (text: string) => {
    if (busy) return;
    setBusy(true);
    setWord(null);
    setTip(null);
    setChatOpen(true);
    setMsgs((m) => [...m, { role: 'me', text }, { role: 'ai', text: '', typing: true }]);
    const reply = await askCoach(text);
    setMsgs((m) => [...m.slice(0, -1), { role: 'ai', text: reply }]);
    setBusy(false);
  }, [busy]);

  const toggleChat = useCallback(() => {
    setChatOpen((open) => !open);
    setWord(null);
    setTip(null);
  }, []);

  useEffect(() => { if (chatOpen) inputRef.current?.focus(); }, [chatOpen]);
  useEffect(() => {
    if (chatOpen && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, chatOpen]);

  // The hero's replica orb opens the chat too.
  useEffect(() => {
    const rep = document.querySelector<HTMLButtonElement>('[data-ai="hero-rep"]');
    rep?.addEventListener('click', toggleChat);
    return () => rep?.removeEventListener('click', toggleChat);
  }, [toggleChat]);

  // Escape closes whichever panel is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (live.current.word) setWord(null);
      else if (live.current.chatOpen) { setChatOpen(false); orbRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Select a short phrase anywhere on the page to see what it means.
  const askRef = useRef(askChat);
  askRef.current = askChat;
  useEffect(() => {
    const explain = (raw: string) => {
      const w = raw.replace(/[“”"()[\],.!?;:]/g, '').trim();
      if (!w || !/[a-z]/i.test(w)) return;
      if (live.current.word?.w.toLowerCase() === w.toLowerCase()) return;
      if (live.current.chatOpen) { askRef.current(`What does “${w}” mean?`); return; }
      const g = lookup(w);
      setTip(null);
      setWord(g
        ? { w, loading: false, ...g }
        : { w, loading: false, ipa: '', pos: 'not saved yet', meaning: 'I don’t have this word saved offline. Tap below and I’ll explain it in chat.', hi: '—', ex: '—' });
    };
    const onUp = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('.ai-wrap, input, textarea, button')) return;
      setTimeout(() => {
        const txt = String(window.getSelection() ?? '').trim();
        if (!txt || txt.length > 40 || txt.split(/\s+/).length > 4) return;
        explain(txt);
      }, 20);
    };
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
    return () => {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };
  }, []);

  // A short tip the first time each section reaches mid-screen.
  useEffect(() => {
    const seen = new Set<string>();
    let hide = 0;
    const io = new IntersectionObserver((entries) => {
      for (const x of entries) {
        if (!x.isIntersecting) continue;
        const id = x.target.id;
        if (!SECTION_TIPS[id] || seen.has(id) || live.current.chatOpen || live.current.word) continue;
        seen.add(id);
        setTip(SECTION_TIPS[id]);
        clearTimeout(hide);
        hide = window.setTimeout(() => setTip(null), 5200);
      }
    }, { rootMargin: '-45% 0px -45% 0px' });
    const start = setTimeout(() => {
      Object.keys(SECTION_TIPS).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    }, 800);
    return () => { clearTimeout(start); clearTimeout(hide); io.disconnect(); };
  }, []);

  // Eyes follow the pointer; the orb flies from the hero slot to its dock.
  useEffect(() => {
    const ptr = { x: 0, y: 0, has: false };
    const onMove = (e: PointerEvent) => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.has = true; };
    window.addEventListener('pointermove', onMove);

    const heroSlot = document.querySelector<HTMLElement>('[data-ai="hero-slot"]');
    const heroRep = document.querySelector<HTMLElement>('[data-ai="hero-rep"]');
    const heroStatus = document.querySelector<HTMLElement>('[data-ai="hero-status"]');
    const hero = document.getElementById('top');
    const eyes = [document.querySelector<HTMLElement>('[data-ai="eyes"]'), dockEyesRef.current];
    const eyeState = eyes.map(() => ({ x: 0, y: 0 }));
    const fly = { e: 0 };
    const reduce = reduceMotion();
    let raf = 0;
    let wasDocked = false;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(100, now - last);
      last = now;

      eyes.forEach((el, i) => {
        const r = el?.parentElement?.getBoundingClientRect();
        if (!el || !r?.width) return;
        const st = eyeState[i];
        let tx = 0, ty = 0;
        if (ptr.has) {
          const dx = ptr.x - (r.left + r.width / 2), dy = ptr.y - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy) || 1, max = r.width * 0.14, k = Math.min(1, d / 220);
          tx = (dx / d) * max * k;
          ty = (dy / d) * max * k * 0.85;
        }
        const ke = damp(0.16, dt);
        st.x += (tx - st.x) * ke;
        st.y += (ty - st.y) * ke;
        el.style.transform = `translate(${st.x.toFixed(2)}px,${(st.y - r.width * 0.03).toFixed(2)}px)`;
      });

      const wrap = wrapRef.current, orb = orbRef.current;
      if (!wrap || !orb) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      let sx = vw - 56, sy = vh - 56, big = 120, p = 1;
      if (heroSlot) {
        const r = heroSlot.getBoundingClientRect();
        const hr = hero?.getBoundingClientRect() ?? r;
        p = Math.min(1, Math.max(0, -hr.top / Math.max(1, hr.height * 0.45)));
        sx = r.left + r.width / 2;
        sy = r.top + r.height / 2;
        big = r.width || 120;
      }
      const { chatOpen: open, word: w } = live.current;
      const pinned = open || !!w;
      // Once out of the hero, the orb always parks bottom-right.
      const tx = vw - 56;
      const ty = vh - 56;
      const pe = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const goal = pinned ? 1 : pe;
      fly.e += (goal - fly.e) * (reduce ? 1 : damp(0.14, dt));
      if (Math.abs(goal - fly.e) < 0.001) fly.e = goal;
      const e = fly.e;
      const cx = sx + (tx - sx) * e;
      const cy = sy + (ty - sy) * e - Math.sin(e * Math.PI) * 140;
      const size = big + (56 - big) * e;
      wrap.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      wrap.style.setProperty('--r', `${(size / 2).toFixed(1)}px`);
      orb.style.transform = `scale(${(size / 120).toFixed(4)})`;
      const nowDocked = e > 0.97;
      if (nowDocked !== wasDocked) { wasDocked = nowDocked; setDocked(nowDocked); }
      if (heroStatus) heroStatus.style.opacity = String(Math.max(0, 1 - e * 2.5));
      if (heroRep) {
        heroRep.style.opacity = Math.min(1, e * 8).toFixed(3);
        heroRep.style.transform = `scale(${(0.86 + 0.14 * Math.min(1, e * 3)).toFixed(3)})`;
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, []);

  const send = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const input = inputRef.current;
    const v = input?.value.trim();
    if (!input || !v) return;
    input.value = '';
    askChat(v);
  };

  const showTip = !!tip && docked && !chatOpen && !word;

  return (
    <div ref={wrapRef} className={`ai-wrap side-r ${docked ? 'docked' : 'hero'}`} style={{ left: 0, top: -5 }}>
      <div className="ai-stack">
        {showTip && <div className="ai-tip" role="status">{tip}</div>}

        {word && (
          <div className="ai-pop" role="dialog" aria-label="Word meaning">
            <div className="ai-pop-h">
              <span className="ai-k">Meaning</span>
              <button type="button" className="ai-x" aria-label="Close meaning" onClick={() => setWord(null)}><CloseIcon /></button>
            </div>
            <div className="ai-word"><em>{word.w}</em><span className="ai-ipa">{word.ipa}</span></div>
            {word.loading ? (
              <div className="ai-skel" aria-label="Looking up"><i /><i /><i /></div>
            ) : (
              <div className="ai-def">
                <span className="ai-pos">{word.pos}</span>
                <p className="ai-mean">{word.meaning}</p>
                <div className="ai-row"><span className="ai-k">Hinglish</span><span>{word.hi}</span></div>
                <div className="ai-row"><span className="ai-k">In an interview</span><span className="ai-ex">“{word.ex}”</span></div>
              </div>
            )}
            <button type="button" className="ai-more" onClick={() => askChat(`Explain “${word.w}” with an interview example.`)}>
              Ask MockDrip AI about it
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        )}

        {chatOpen && (
          <section className="ai-panel" aria-label="MockDrip AI chat">
            <header className="ai-ph">
              <span className="ai-mini" aria-hidden="true"><span className="ai-mini-eyes"><i /><i /></span></span>
              <div className="ai-ph-t"><b>MockDrip AI</b><small><i />Interview coach</small></div>
              <button type="button" className="ai-x" aria-label="Close chat" onClick={() => setChatOpen(false)}><CloseIcon /></button>
            </header>
            <div className="ai-body" ref={bodyRef} aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={`ai-msg ${m.role}`}>
                  {m.typing && !m.text && <span className="ai-typing" aria-label="Typing"><i /><i /><i /></span>}
                  <span className="ai-text">{m.text}</span>
                </div>
              ))}
              {msgs.length <= 1 && (
                <div className="ai-sugg">
                  {SUGGESTIONS.map((t) => <button key={t} type="button" onClick={() => askChat(t)}>{t}</button>)}
                </div>
              )}
            </div>
            <form className="ai-form" onSubmit={send}>
              <input ref={inputRef} type="text" placeholder="Ask about interviews, or any word…" aria-label="Message MockDrip AI" autoComplete="off" />
              <button type="submit" className="ai-send" aria-label="Send message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5" /><path d="M5.5 11.5L12 5l6.5 6.5" /></svg>
              </button>
            </form>
            <div className="ai-foot">Select any word on the page to see what it means.</div>
          </section>
        )}
      </div>

      <button
        type="button"
        ref={orbRef}
        className={`ai-dock ${chatOpen ? 'open' : ''} ${busy ? 'busy' : ''}`}
        aria-label={chatOpen ? 'Close MockDrip AI' : 'Open MockDrip AI — ask anything'}
        aria-expanded={chatOpen}
        onClick={toggleChat}
      >
        <span className="ai-face"><span className="ai-dock-eyes" ref={dockEyesRef} aria-hidden="true"><i /><i /></span></span>
      </button>
      <span className="ai-hello" aria-hidden="true">Hi! I’m your interviewer.</span>
    </div>
  );
}

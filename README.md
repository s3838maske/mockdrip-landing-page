# MockDrip landing page

Production build of **Page 9 — Northline motion (scroll FX)** from the MockDrip Landing Page design canvas
(https://claude.ai/artifact/N5S41PNw8cKrEgMqPL41PM, board `MockMate-p9.dc.html`), styled with the
**Page 13 — Dashboard theme** (board `MockDrip-p13.dc.html`): neutral surfaces, navy/blue accents,
black/white pill actions, Geist type, light theme by default.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into dist/
npm run preview  # serve the built site
```

## Tech stack, and why

| Layer | Choice | Why it helps UX |
| --- | --- | --- |
| Framework | **Astro 5** (static output) | A landing page is mostly content. Astro ships it as plain HTML/CSS, so the first paint doesn't wait on a JS framework. That keeps LCP and INP fast on the mid-range Android phones on campus Wi-Fi that this audience uses. It also deploys anywhere as static files (Vercel, Netlify, Cloudflare Pages, S3). |
| Interactivity | **React 19 island**, only for the AI assistant | The assistant is the one stateful widget (chat, word lookup, tips). It hydrates with `client:idle` after the page is usable. Everything else uses small vanilla TS modules. |
| Scroll FX | **Framework-free TypeScript**: one `requestAnimationFrame` loop plus `IntersectionObserver` | The design's effects (stacking cards, pinned 3D spotlight, horizontal journey) read layout once per frame and write only `transform`/`opacity`, so they stay on the compositor. Smoothing is frame-rate independent, so it feels the same at 60 Hz and 120 Hz. |
| Smooth scroll | **Lenis** | Inertial scrolling makes the pinned and scrubbed sections feel continuous. It drives the native scroll position, so `position: sticky`, observers and anchor links still work. It is turned off under `prefers-reduced-motion`. |
| Theme | CSS classes + **View Transitions API** | The circular light/dark reveal (with a fallback). The choice is saved and applied before first paint, so the theme never flashes. |
| Styling | One global stylesheet ported from the design | Pixel-faithful to the design. Rules belonging to other page variants are pruned (194 KB → 161 KB raw, ~29 KB gzipped). |
| Types | TypeScript strict + `astro check` | Runs on every `npm run build`. |

### Accessibility and quality details added on top of the design
- A skip link, a `<main>` landmark and visible `:focus-visible` rings in both themes.
- The tabs and level pickers keep `aria-pressed` in sync. The FAQ uses `aria-expanded`/`aria-controls`, and Escape closes the mobile menu, the chat and the word popup.
- Every motion path respects `prefers-reduced-motion`.
- Section content is rendered at build time from `src/data/content.ts`, so it is all in the HTML for SEO.

## Project map

```
src/
  pages/index.astro            page composition + script bootstrap
  layouts/Base.astro           <head>, fonts, meta
  components/sections/*.astro  one file per section (Nav, Hero, Marquee, Why, Features, Preview,
                               How, Levels, Spotlight, Journey, Audience, Testimonials, Pricing,
                               Faq, Start, Footer)
  components/islands/AiAssistant.tsx   flying orb, chat, select-a-word glossary, section tips
  data/content.ts              questions, tabs, levels, testimonials, FAQs
  data/assistant.ts            glossary, local coach answers, tips
  scripts/motion.ts            scroll choreography (reveal, blur-in, nav, cards, spotlight, journey)
  scripts/interactions.ts      tabs, levels, FAQ, mobile menu
  scripts/theme.ts             light/dark switch
  scripts/mesh.ts              hero dot-mesh canvas
  scripts/smooth-scroll.ts     Lenis
  styles/global.css            design stylesheet
```

## Before launch
- **AI answers**: the assistant uses offline, rule-based answers. Replace `askCoach()` in `AiAssistant.tsx` with a call to your own backend endpoint to use an LLM. Never call a model API from the browser with a key.
- **Start form**: the "fill in the blanks" inputs in `Start.astro` are not wired to anything yet.
- **Placeholders**: testimonials use `[Student name]` / `[Pilot college]`, and the batch dashboard shows `[N] mocks taken`.
- **Optional, smaller JS**: React is 67 KB gzipped and loads at idle. Swapping in Preact (`@astrojs/preact` with `compat: true`) would cut it to about 10 KB with no code changes.

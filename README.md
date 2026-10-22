# ROSH Elevators — Marketing Site

React 19 + Vite 8 + Tailwind CSS v4 + framer-motion v14. The luxury home
elevator marketing site for ROSH Elevators Pvt. Ltd. (Hyderabad).

Live: https://rosh-site-tau.vercel.app

## Build & deploy

```bash
npm install
npm run build      # → dist/
vercel deploy --prod
```

The project is deployed with `framework: null` in `vercel.json` — Vite builds
to `dist/` and Vercel serves it as a static SPA with a `/(.*)` → `/index.html`
rewrite.

## ⚠️ Known build quirks (read before touching `vite.config.js`)

This project deliberately does **not** use Vite's default ESM output. The default
`<script type="module" crossorigin>` bundle **does not execute** under the
browser tooling used to verify this site (external ES modules with
`import.meta` never fire load/error events), so the page renders blank.

### The working config

- **Output format: `iife`** (`format: 'iife'`, `name: 'RosheApp'`) — a single
  self-executing function. This is what actually runs.
- **`minify: 'esbuild'`, `target: 'es2015'`** — keeps the bundle small and
  broadly compatible.
- **`modulePreload.polyfill: false`** — the polyfill injects `import.meta`
  syntax that is invalid inside an IIFE.
- **`closeBundle` hook** rewrites the emitted script tag in `dist/index.html`:
  `<script type="module" crossorigin src="/assets/index-…">` →
  `<script defer src="/assets/index-…">`. The `defer` is **mandatory** — a
  classic script in `<head>` without `defer` executes before `<body>` parses,
  so `document.getElementById('root')` returns `null` and React never mounts
  (the page looks blank). `type="module"` was already implicitly deferred; the
  classic script needs `defer` to recover that behaviour.

### framer-motion v14 gotcha

`useMotionValueEvent` is **undefined** in the bundled output (a known issue with
framer-motion v14 under this build). Do **not** reintroduce it. Use the
`MotionValue.on('change', …)` pattern instead, wrapped in `useEffect` with a
cleanup `.off('change', …)`:

```jsx
useEffect(() => {
  const handler = (v) => setX(v)
  mv.on('change', handler)
  return () => mv.off('change', handler)
}, [mv])
```

## Hero scroll behaviour

The hero (`#voyage`) is a scroll-driven experience — a lift car climbs one
storey per scroll and the matching cabin scheme swaps in. The visible viewport
is a **`sticky top-0 h-[100svh]`** div inside a `relative h-[500svh] md:h-[600vh]`
section. Do **not** remove `sticky` from that inner div — without it the whole
section scrolls past and the hero content starts hidden (`opacity: 0`,
`translateY(-70px)`), leaving the page looking blank at scroll 0.

## Structure

```
src/
  main.jsx            # entry: createRoot + [ROSH] diagnostic logs
  App.jsx             # BrowserRouter + routes
  components/         # Header, Hero, StatsBar, ClientLogos, Testimonials, Footer
  proposal/           # Proposal configurator page
  data/site.js        # cabin schemes, zones, products, clients
public/               # served verbatim (logos, images, Rosh_Brochure.pdf)
```
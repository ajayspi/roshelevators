import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  Clapperboard,
  Cpu,
  Crown,
  Filter,
  Gem,
  Globe2,
  MapPin,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Volume2,
  VolumeX,
} from 'lucide-react'

/* ---------- elevator chime (synthesized, no audio file) ---------- */
let audioCtx = null
let muted = false
const isMuted = () => muted
const setMuted = (m) => {
  muted = m
}

function ensureCtx() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {})
  return audioCtx.state === 'running' ? audioCtx : null
}

function tone(ctx, freq, at, dur) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(0.25, at + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  osc.connect(gain).connect(ctx.destination)
  osc.start(at)
  osc.stop(at + dur + 0.05)
}

// classic lift "ding-dong": E5 then C5
function playChime() {
  if (muted) return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  const ctx = ensureCtx()
  if (!ctx) return // no user gesture yet — browsers block audio until then
  const t = ctx.currentTime
  tone(ctx, 659.25, t, 0.7)
  tone(ctx, 523.25, t + 0.45, 1.1)
}

const SPRING_HEAVY = { type: 'spring', stiffness: 42, damping: 16 }
const SPRING_SOFT = { type: 'spring', stiffness: 70, damping: 20 }

// ponytail: single-file proposal; split into per-floor modules only if it grows past ~800 lines.
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/* single source of truth: floor name = section name (1-indexed floors) */
const FLOOR_NAMES = ['Lobby', 'Market Gap', 'Competitors', 'Execution', 'Ad Spend']

const HERO_LINES = [
  "Luxury home lifts for Hyderabad's finest villas.",
  'Jetta Belt Drive. Near-silent. Rose-gold.',
  '2,500+ lifts. Since 2004. 0.5% breakdown.',
]

function AnimatedNumber({ value, format = inr }) {
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { stiffness: 70, damping: 18 })
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    mv.set(value)
  }, [value, mv])
  useEffect(() => {
    const handle = (v) => setDisplay(Math.round(v))
    const unsub = spring.on('change', handle)
    return () => unsub()
  }, [])
  return <>{format(display)}</>
}

function Eyebrow({ icon, children }) {
  return (
    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
      {icon}
      {children}
    </p>
  )
}

/* ---------- fixed elevator cabin chrome ---------- */
function Cabin({ floor, progress, mutedUi, onToggleMute }) {
  const go = (n) => document.getElementById(`floor-${n}`)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {/* glass reflections */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
      <div className="absolute inset-y-0 left-0 w-2 md:w-5 bg-gradient-to-r from-[#5a4036] via-[#1b1412] to-transparent opacity-90" />
      <div className="absolute inset-y-0 right-0 w-2 md:w-5 bg-gradient-to-l from-[#5a4036] via-[#1b1412] to-transparent opacity-90" />
      {/* top console */}
      <div className="absolute left-1/2 top-3 md:top-5 w-[min(92vw,560px)] -translate-x-1/2">
        <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl md:px-6 md:py-3">
          <div className="flex items-center gap-2">
            <img src="/rosh-logo.png" alt="Rosh Elevators" className="h-6 w-auto md:h-7" />
            <span className="hidden text-[10px] uppercase tracking-[0.25em] text-dim sm:inline">
              · Designjoom.com
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {FLOOR_NAMES.map((name, i) => (
              <button
                key={name}
                onClick={() => go(i + 1)}
                aria-label={`Go to floor ${i + 1} · ${name}`}
                title={name}
                className={`h-7 w-7 rounded-full border text-[11px] font-bold transition-all md:h-8 md:w-8 ${
                  floor === i + 1
                    ? 'border-gold bg-gold/20 text-gold-soft shadow-[0_0_18px_rgba(200,164,93,0.55)]'
                    : 'border-white/15 text-dim hover:border-gold/50 hover:text-gold-soft'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex items-baseline gap-1 tabular-nums">
            <span className="font-display text-2xl text-gold-soft md:text-3xl">
              {String(floor).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-dim">fl</span>
          </div>
          <button
            onClick={onToggleMute}
            aria-label={mutedUi ? 'Unmute lift chime' : 'Mute lift chime'}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-dim transition-colors hover:border-gold/50 hover:text-gold-soft md:h-8 md:w-8"
          >
            {mutedUi ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      {/* floor ticker */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-dim md:flex">
        <ArrowDown className="h-3 w-3 animate-bounce text-gold" />
        descending · {FLOOR_NAMES[floor - 1]?.toLowerCase()}
      </div>
      {/* scroll rail */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
        <motion.div className="h-full origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft" style={{ scaleX: progress }} />
      </div>
    </div>
  )
}

/* ---------- scrolling shaft backdrop ---------- */
function Shaft({ smooth }) {
  const y = useTransform(smooth, [0, 1], ['2%', '-22%'])
  const glow = useTransform(smooth, [0, 1], [0.5, 1])
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink" aria-hidden>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[140%]">
        {/* brutalist pilasters */}
        <div className="absolute inset-0 flex justify-between px-[8vw]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-px bg-gradient-to-b from-transparent via-white/12 to-transparent md:w-[2px]" />
          ))}
        </div>
        {/* shaft floor ticks */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-[10vw]" style={{ marginTop: i === 0 ? '4vh' : '11vh' }}>
            <span className="font-display text-xs text-dim/70 tabular-nums">
              {String(14 - i).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>
        ))}
        {/* passing light bands */}
        {[18, 52, 84].map((top) => (
          <div
            key={top}
            className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-gold/[0.05] to-transparent"
            style={{ top: `${top}%` }}
          />
        ))}
      </motion.div>
      <motion.div style={{ opacity: glow }} className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_110%,rgba(200,164,93,0.10),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(200,164,93,0.07),transparent_60%)]" />
    </div>
  )
}

/* ---------- travelling side lift with rolling Jetta belt ---------- */
function SideLift({ progress }) {
  const top = useTransform(progress, [0, 1], ['6vh', '80vh'])
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none fixed inset-y-0 right-2 z-30 w-8 sm:right-3 md:right-7 md:w-12" aria-hidden>
      {/* shaft track */}
      <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-white/10" />
      {/* rolling belt */}
      <div className="belt-roll absolute inset-y-4 left-1/2 w-[3px] -translate-x-[8px] opacity-70" />
      {/* floor stops — one per section */}
      {[12, 28, 44, 60, 76].map((t) => (
        <div key={t} className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" style={{ top: `${t}%` }} />
      ))}
      {/* cabin travels with the user's scroll (+ idle bob so it's alive pre-scroll) */}
      <motion.div
        style={{ top }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-7 rounded-[6px] border border-gold-soft/70 bg-gradient-to-b from-gold/30 to-transparent shadow-[0_0_20px_rgba(217,156,125,0.45)] backdrop-blur-sm md:h-16 md:w-9">
          <div className="mx-auto mt-1 h-5 w-4 rounded-[3px] bg-gold-soft/85 shadow-[0_0_12px_rgba(246,207,184,0.8)] md:mt-1.5 md:h-7 md:w-5" />
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- door reveal wrapper ---------- */
function Floor({ id, children, immediate = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })
  const [heroOpen, setHeroOpen] = useState(false)
  const wasOpen = useRef(false)
  // hero (floor 1): one-time opening reveal on mount — never gated by scroll, never re-closes
  useEffect(() => {
    if (!immediate) return
    const t = setTimeout(() => {
      setHeroOpen(true)
      playChime()
    }, 500)
    return () => clearTimeout(t)
  }, [immediate])
  useEffect(() => {
    if (immediate) return
    if (inView && !wasOpen.current) {
      // doors start parting — chime slightly before content reveals
      const t = setTimeout(playChime, 350)
      wasOpen.current = true
      return () => clearTimeout(t)
    }
    if (!inView) wasOpen.current = false
  }, [inView, immediate])
  const open = immediate ? heroOpen : inView
  return (
    <section id={id} ref={ref} className={`relative z-10 flex items-center justify-center px-4 py-28 md:px-10 ${immediate ? 'min-h-[100svh]' : 'min-h-[115vh]'}`}>
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl">
        {/* content sits behind the doors */}
        <motion.div
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 50 }}
          transition={{ ...SPRING_SOFT, delay: open ? 0.45 : 0 }}
          className="rounded-3xl border border-white/10 bg-panel/70 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-12"
        >
          {children}
        </motion.div>
        {/* sliding steel doors */}
        <motion.div
          animate={{ x: open ? '-104%' : '0%' }}
          transition={SPRING_HEAVY}
          className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-end rounded-l-3xl border-y border-l border-white/15 bg-gradient-to-r from-[#2a2126] via-[#54402f] to-[#1a1512] pr-4"
        >
          <div className="h-3/4 w-px bg-gold/40" />
        </motion.div>
        <motion.div
          animate={{ x: open ? '104%' : '0%' }}
          transition={SPRING_HEAVY}
          className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-start rounded-r-3xl border-y border-r border-white/15 bg-gradient-to-l from-[#2a2126] via-[#54402f] to-[#1a1512] pl-4"
        >
          <div className="h-3/4 w-px bg-gold/40" />
        </motion.div>
      </div>
    </section>
  )
}

function GlassCard({ icon, title, body, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ ...SPRING_SOFT, delay }}
      whileHover={{ y: -6, boxShadow: '0 18px 60px rgba(200,164,93,0.18)' }}
      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-gold/40 md:p-6"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-soft shadow-[0_0_24px_rgba(200,164,93,0.25)]">
        {icon}
      </div>
      <h3 className="font-display text-lg text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
    </motion.div>
  )
}

/* ---------- floors ---------- */
function HeroFloor() {
  const [line, setLine] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setLine((l) => (l + 1) % HERO_LINES.length), 3200)
    return () => clearInterval(t)
  }, [reduce])
  return (
    <div>
      <div className="grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
        <div className="text-center md:text-left">
          <Eyebrow icon={<Sparkles className="h-3.5 w-3.5" />}>
            <span className="mx-auto md:mx-0">Floor 01 · Lobby — Designjoom.com · HFI-certified UX engineering</span>
          </Eyebrow>
          <div className="mx-auto mt-5 min-h-[7.5rem] max-w-3xl md:mx-0 md:min-h-[10.5rem]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={line}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', textShadow: ['0 0 24px rgba(217,156,125,0.25)', '0 0 60px rgba(217,156,125,0.5)', '0 0 24px rgba(217,156,125,0.25)'] }}
                exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                transition={{ ...SPRING_SOFT, duration: 0.6 }}
                className="gold-gradient-text font-display text-4xl font-semibold leading-[1.05] md:text-6xl"
              >
                {HERO_LINES[line]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-mist md:mx-0 md:text-lg">
            Moving beyond Indiamart and BNI to capture Hyderabad&apos;s HNI luxury residential market.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {['Jubilee Hills', 'Kokapet', 'Mokila'].map((a) => (
              <span key={a} className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-soft">
                <MapPin className="h-3 w-3" /> {a}
              </span>
            ))}
          </div>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3 md:mx-0">
            {[
              ['0.5%', 'breakdown rate'],
              ['2004', 'operating since'],
              ['2,500+', 'lifts installed'],
            ].map(([stat, label], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ ...SPRING_SOFT, delay: 0.6 + i * 0.12 }}
                className="rounded-2xl border border-gold/25 bg-gold/[0.06] px-2 py-4 backdrop-blur-xl"
              >
                <p className="font-display text-2xl text-gold-soft tabular-nums md:text-3xl">{stat}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-dim md:text-[11px]">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* in-hero lift: Jetta belt shaft with a cabin riding up and down */}
        <div className="relative mx-auto flex h-64 w-full max-w-[220px] items-stretch justify-center" aria-hidden>
          <div className="w-24 rounded-lg border border-gold/30 bg-black/50" />
          <div className="belt-roll absolute inset-y-2 left-1/2 w-[3px] -translate-x-[52px] opacity-80" />
          <div className="absolute left-1/2 top-2 h-5 w-5 -translate-x-[52px] rounded-full border-2 border-gold-soft bg-ink" />
          <motion.div
            animate={reduce ? undefined : { y: [0, 96, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 h-14 w-[72px] rounded-md border border-gold-soft/60 bg-gradient-to-br from-gold/25 to-transparent shadow-[0_0_30px_rgba(217,156,125,0.35)] backdrop-blur-sm"
          >
            <div className="mx-auto mt-1.5 h-7 w-11 rounded-[3px] bg-gold-soft/85 shadow-[0_0_12px_rgba(246,207,184,0.8)]" />
          </motion.div>
          <span className="absolute right-0 top-4 text-[10px] uppercase tracking-widest text-gold-soft">jetta belt</span>
        </div>
      </div>
      <p className="mt-10 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.4em] text-dim">
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-gold" /> you are in the cabin · scroll to descend
      </p>
    </div>
  )
}

const COMPETITORS = [
  {
    icon: <Crown className="h-5 w-5" />,
    name: 'Elite Elevators',
    tag: 'Ultra-luxury · heavy Meta video ads',
    points: ['Capturing the ultra-luxury segment with heavy Meta video spend', 'Missing local SEO depth', 'No conversational-AI presence — invisible to Gemini / Perplexity answers'],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    name: 'Cube / Bharat Elevators',
    tag: 'Budget · industrial aesthetic',
    points: ['Competing purely on budget with an industrial look', 'Generic local SEO, zero lifestyle appeal', 'No B2C aspiration — invisible to villa buyers scrolling Instagram'],
  },
  {
    icon: <Gem className="h-5 w-5" />,
    name: 'The Rosh Advantage',
    tag: 'Premium Local Authority',
    hot: true,
    points: ['Positioned directly in the gap competitors leave open', 'Luxury aesthetics + immediate local engineering support', 'The villa buyer never has to choose between premium and nearby'],
  },
]

function MarketGapFloor() {
  return (
    <div>
      <Eyebrow icon={<TrendingUp className="h-3.5 w-3.5" />}>Floor 02 · Market gap</Eyebrow>
      <h2 className="mt-3 font-display text-3xl text-fg md:text-4xl">The gap Rosh was built to own.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist md:text-base">
        Indiamart and BNI capped Rosh at industrial buyers. Hyderabad&apos;s villa boom buys on aspiration —
        and nobody local owns that lane.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Lead sources capped', d: 'Indiamart delivers price-shoppers, BNI delivers handshakes. Neither scales villa demand.' },
          { t: 'Zero villa aspiration', d: 'Budget players sell specs in grey boxes. HNI buyers scroll past them to lifestyle reels.' },
          { t: 'Invisible to AI answers', d: 'No structured content means Gemini and Perplexity never recommend Rosh — competitors win by default.' },
        ].map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...SPRING_SOFT, delay: i * 0.12 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6"
          >
            <h3 className="font-display text-xl text-fg">{g.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{g.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CompetitorsFloor() {
  return (
    <div>
      <Eyebrow icon={<TrendingUp className="h-3.5 w-3.5" />}>Floor 03 · Competitors</Eyebrow>
      <h2 className="mt-3 font-display text-3xl text-fg md:text-4xl">Two rivals. One opening.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {COMPETITORS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...SPRING_SOFT, delay: i * 0.12 }}
            className={`rounded-2xl border p-5 md:p-6 ${
              c.hot
                ? 'border-gold/50 bg-gold/[0.08] shadow-[0_0_50px_rgba(200,164,93,0.2)]'
                : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.hot ? 'bg-gold text-ink' : 'border border-white/15 text-mist'}`}>
              {c.icon}
            </div>
            <h3 className="font-display text-xl text-fg">{c.name}</h3>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-widest ${c.hot ? 'text-gold-soft' : 'text-dim'}`}>{c.tag}</p>
            <ul className="mt-4 space-y-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-mist">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.hot ? 'bg-gold' : 'bg-dim'}`} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const SERVICES = [
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: 'AEO & GEO',
    body: 'Answer & Generative Engine Optimization — structuring data so AI models (Gemini, Perplexity) recommend Rosh for “best local villa lifts in Hyderabad.”',
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: 'SEO & Web Creation',
    body: 'Replacing the legacy .html static site with a rapid Next.js build — engineered for speed, search, and premium first impressions.',
  },
  {
    icon: <Filter className="h-5 w-5" />,
    title: 'Sales Funnel',
    body: 'Eliminating dead-end contact forms. Model-specific funnels for the Jetta Belt Drive and Vegam MRL (Machine Room Less) systems turn villa browsers into booked site visits — starting with the “Villa Lift Space Estimator” lead magnet.',
  },
  {
    icon: <Clapperboard className="h-5 w-5" />,
    title: 'Social Media (SMO)',
    body: 'Pivoting from industrial B2B graphics to B2C spatial elegance — vertical architectural reels, installation time-lapses, plus LinkedIn authority for architects.',
  },
]

function ServicesFloor() {
  return (
    <div>
      <Eyebrow icon={<Sparkles className="h-3.5 w-3.5" />}>Floor 04 · The execution engine</Eyebrow>
      <h2 className="mt-3 font-display text-3xl text-fg md:text-4xl">Four systems. One growth engine.</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <GlassCard key={s.title} {...s} delay={(i % 2) * 0.12} />
        ))}
      </div>
      {/* safety — the HNI buying trigger */}
      <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/[0.05] p-5 md:p-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          <ShieldCheck className="h-3.5 w-3.5" /> Engineered so you never get stuck
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { icon: <ShieldCheck className="h-4 w-4" />, t: 'Auto Rescue Device (ARD)', d: 'Power cut mid-ride? ARD drives the cabin to the nearest floor and opens the doors — automatically.' },
            { icon: <Cpu className="h-4 w-4" />, t: 'CE Certified Controllers', d: 'European-grade control systems, certified for safety-critical operation in every home lift.' },
            { icon: <ScanLine className="h-4 w-4" />, t: 'WECO Full-Door Sensors', d: 'A curtain of infrared light across the full doorway — doors never close on a child, a pet, or a hand.' },
          ].map((s) => (
            <div key={s.t} className="flex gap-3">
              <span className="text-gold-soft">{s.icon}</span>
              <div>
                <p className="text-sm font-bold text-fg">{s.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist md:text-sm">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Jetta Belt Drive technology showcase */}
      <div className="mt-4 grid gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[1fr_1.2fr] md:p-6">
        <div className="relative mx-auto flex h-56 w-full max-w-[240px] items-stretch justify-center md:h-64">
          <div className="w-28 rounded-lg border border-gold/30 bg-black/50" />
          <motion.div
            animate={{ y: [0, -34, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 h-16 w-20 rounded-md border border-gold-soft/60 bg-gradient-to-br from-gold/25 to-transparent shadow-[0_0_30px_rgba(217,156,125,0.35)] backdrop-blur-sm"
          />
          <div className="absolute inset-y-2 left-1/2 w-[3px] -translate-x-[68px] rounded bg-gradient-to-b from-gold-soft via-gold to-gold-deep" />
          <div className="absolute left-1/2 top-3 h-5 w-5 -translate-x-[68px] rounded-full border-2 border-gold-soft bg-ink" />
          <span className="absolute right-0 top-4 text-[10px] uppercase tracking-widest text-gold-soft">belt drive</span>
          <span className="absolute bottom-4 right-0 text-[10px] uppercase tracking-widest text-dim">Vegam MRL · no machine room</span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">B2C funnel spotlight</p>
          <h3 className="mt-2 font-display text-2xl text-fg">Jetta Belt Drive for luxury villas.</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Near-silent belt traction in a rose-gold, mirror-finish cabin — the hero of the villa funnel,
            paired with the Space Estimator lead magnet. Where no machine room fits, the Vegam MRL
            (Machine Room Less) system carries the same promise.
          </p>
        </div>
      </div>
    </div>
  )
}

const CHANNELS = [
  { name: 'Meta (Instagram / FB)', spend: 2000, note: 'Geofencing luxury corridors · HNI interests: home automation, interior design', icon: <Clapperboard className="h-4 w-4" /> },
  { name: 'Google Search', spend: 1500, note: 'High-intent bottom-funnel queries, e.g. “retrofit home lift cost”', icon: <Search className="h-4 w-4" /> },
  { name: 'Retargeting / Boosting', spend: 500, note: 'Boosting installation reels · 30-day brand omnipresence', icon: <TrendingUp className="h-4 w-4" /> },
]

function BudgetFloor() {
  const max = 4500
  return (
    <div>
      <Eyebrow icon={<TrendingUp className="h-3.5 w-3.5" />}>Floor 05 · Ad strategy & budget</Eyebrow>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-3xl text-fg md:text-4xl">Every rupee aimed at intent.</h2>
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-2 font-display text-xl text-gold-soft tabular-nums">
          <AnimatedNumber value={3000} /> – <AnimatedNumber value={4500} />
          <span className="ml-1 text-xs uppercase tracking-widest text-dim">/ day</span>
        </p>
      </div>
      <div className="mt-8 space-y-4">
        {CHANNELS.map((c, i) => (
          <div key={c.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-sm font-bold text-fg">
                <span className="text-gold-soft">{c.icon}</span> {c.name}
              </p>
              <p className="font-display text-lg text-gold-soft tabular-nums">
                <AnimatedNumber value={c.spend} />
                <span className="text-xs text-dim"> /day</span>
              </p>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(c.spend / max) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ ...SPRING_HEAVY, delay: 0.5 + i * 0.15 }}
                className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft shadow-[0_0_16px_rgba(200,164,93,0.5)]"
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-dim md:text-sm">{c.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Finale() {
  return (
    <footer className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-4 text-center md:px-10">
      <div className="rounded-3xl border border-white/10 bg-panel/70 p-8 backdrop-blur-2xl md:p-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Designjoom.com</p>
        <p className="mt-2 font-display text-2xl text-fg md:text-3xl">Let&apos;s take Rosh to the top floor.</p>
        <a
          href="#floor-5"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('floor-5')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep px-7 py-3 text-sm font-bold text-ink shadow-[0_0_40px_rgba(200,164,93,0.4)] transition-transform hover:scale-105"
        >
          <Sparkles className="h-4 w-4" /> Approve the ascent
        </a>
        <p className="mt-4 text-[11px] text-dim">Proposal for Rosh Elevators, Hyderabad · prepared by an HFI-certified UX engineering team</p>
        <a
          href="https://rosh-site-tau.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gold-soft underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          View the main Rosh Elevators website <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  )
}

export default function Proposal() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 18 })
  const [floor, setFloor] = useState(1)
  const [mutedUi, setMutedUi] = useState(false)
  useEffect(() => {
    const handle = (v) => setFloor(Math.min(FLOOR_NAMES.length, Math.floor(v * FLOOR_NAMES.length) + 1))
    const unsub = scrollYProgress.on('change', handle)
    return () => unsub()
  }, [])
  // browsers gate audio behind a user gesture — unlock the chime on first tap/keypress
  useEffect(() => {
    const unlock = () => ensureCtx()
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])
  const toggleMute = () => {
    const next = !mutedUi
    setMutedUi(next)
    setMuted(next)
    if (!next) playChime()
  }
  return (
    <div className="noise relative min-h-screen bg-ink text-fg">
      <Shaft smooth={smooth} />
      <Cabin floor={floor} progress={smooth} mutedUi={mutedUi} onToggleMute={toggleMute} />
      <SideLift progress={smooth} />
      <main className="relative">
        <Floor id="floor-1" immediate><HeroFloor /></Floor>
        <Floor id="floor-2"><MarketGapFloor /></Floor>
        <Floor id="floor-3"><CompetitorsFloor /></Floor>
        <Floor id="floor-4"><ServicesFloor /></Floor>
        <Floor id="floor-5"><BudgetFloor /></Floor>
      </main>
      <Finale />
    </div>
  )
}

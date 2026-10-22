import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cabinSchemes } from '../data/site.js'

/* Five storey-zones — the car climbs one storey at a time and the matching
   milestone swaps in. Same five schemes as the cabin finishes. */
const ZONES = [
  {
    n: '01',
    schemeId: 'glass',
    title: 'Panorama glass',
    body: 'A full-view car that turns the shaft into theatre — polished rails, studio light, and the house on display.',
    stat: '272–680 kg · up to 36 m',
  },
  {
    n: '02',
    schemeId: 'steel',
    title: 'Brushed steel',
    body: 'Inside: the RCUBE integrated controller & drive — cloud-managed, keyless entry, plug-and-play harness.',
    stat: '535 × 422 × 195 mm RCUBE',
  },
  {
    n: '03',
    schemeId: 'walnut',
    title: 'Walnut veneer',
    body: 'Since 2004. The same family rails have carried 2,500+ Rosh lifts through Hyderabad and beyond.',
    stat: '0.5% breakdown ratio',
  },
  {
    n: '04',
    schemeId: 'obsidian',
    title: 'Obsidian glass',
    body: 'Five series, one standard — Jetta belt drive, Comfort geared, Vegam MRL, Diamond high-rise, Home Ride.',
    stat: '5 series · 12 solutions',
  },
  {
    n: '05',
    schemeId: 'brass',
    title: 'Brass & marble',
    body: 'Real installations, finished to the millimetre — villas, hospitals, towers and the clients who ride them.',
    stat: '2,500+ happy installations',
  },
]

const SCHEMES = {
  glass: {
    label: 'Panorama Glass',
    interior: 'linear-gradient(to bottom, #24317a 0%, #1a2460 45%, #0c1238 100%)',
    floor: 'repeating-linear-gradient(90deg, #16206b 0 8px, #1e2b80 8px 16px)',
    trim: 'linear-gradient(to bottom, #4966d4, #16206b)',
    light: '#c9d4ff',
    glow: 'rgba(73,102,212,0.55)',
    glass: 'linear-gradient(115deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 28%, rgba(168,196,226,0.12) 52%, rgba(255,255,255,0.02) 68%, rgba(120,150,190,0.16) 100%)',
  },
  steel: {
    label: 'Brushed Steel',
    interior: 'linear-gradient(to bottom, #3b4257 0%, #262b3d 45%, #10131f 100%)',
    floor: 'repeating-linear-gradient(90deg, #1d2233 0 8px, #2a3047 8px 16px)',
    trim: 'linear-gradient(to bottom, #5d76e0, #1d274d)',
    light: '#a9b6f2',
    glow: 'rgba(93,118,224,0.5)',
    glass: 'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 30%, rgba(150,165,220,0.12) 55%, rgba(255,255,255,0.02) 70%, rgba(110,130,200,0.15) 100%)',
  },
  walnut: {
    label: 'Walnut Veneer',
    interior: 'linear-gradient(to bottom, #54422a 0%, #382a18 45%, #141008 100%)',
    floor: 'repeating-linear-gradient(90deg, #241c10 0 8px, #30261a 8px 16px)',
    trim: 'linear-gradient(to bottom, #273891, #101a4d)',
    light: '#e8dcc0',
    glow: 'rgba(232,220,192,0.35)',
    glass: 'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 30%, rgba(216,200,160,0.10) 55%, rgba(255,255,255,0.02) 72%, rgba(160,140,100,0.14) 100%)',
  },
  obsidian: {
    label: 'Obsidian Glass',
    interior: 'linear-gradient(to bottom, #151a33 0%, #0c0f22 45%, #05060f 100%)',
    floor: 'repeating-linear-gradient(90deg, #0a0d1c 0 8px, #141930 8px 16px)',
    trim: 'linear-gradient(to bottom, #7d92ea, #101844)',
    light: '#8f9bd8',
    glow: 'rgba(125,146,234,0.55)',
    glass: 'linear-gradient(115deg, rgba(160,180,255,0.22) 0%, rgba(160,180,255,0.05) 30%, rgba(120,140,220,0.12) 55%, rgba(255,255,255,0.02) 70%, rgba(140,160,240,0.16) 100%)',
  },
  brass: {
    label: 'Brass & Marble',
    interior: 'linear-gradient(to bottom, #4a3b20 0%, #2e2312 45%, #140e06 100%)',
    floor: 'repeating-linear-gradient(90deg, #1a1307 0 8px, #2a2010 8px 16px)',
    trim: 'linear-gradient(to bottom, #4966d4, #16206b)',
    light: '#fff3d6',
    glow: 'rgba(255,243,214,0.35)',
    glass: 'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 30%, rgba(240,220,180,0.12) 55%, rgba(255,255,255,0.02) 70%, rgba(200,170,120,0.15) 100%)',
  },
  roseGold: {
    label: 'Rose Gold',
    interior: 'linear-gradient(to bottom, #4a2323 0%, #3a1818 45%, #1f0c0c 100%)',
    floor: 'repeating-linear-gradient(90deg, #2a1815 0 8px, #3a2220 8px 16px)',
    trim: 'linear-gradient(to bottom, #b76e79, #6e3a42)',
    light: '#f2c8cd',
    glow: 'rgba(183,110,121,0.55)',
    glass: 'linear-gradient(115deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 30%, rgba(220,170,160,0.12) 55%, rgba(255,255,255,0.03) 70%, rgba(190,120,130,0.16) 100%)',
  },
}

/* How long each storey holds before the car climbs to the next one. */
const STOREY_MS = 4200

/** The cabin itself — parameterised by scheme, interior crossfades on scheme change. */
function Cabin({ scheme, dims, doors = false, doorOpen = false }) {
  return (
    <div className={`relative ${dims}`} style={{ perspective: 900 }}>
      <div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg)' }}
      >
        {/* interior — crossfades as the scheme changes */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={scheme.label}
            className="absolute inset-0 overflow-hidden rounded-[5px]"
            style={{ background: scheme.interior }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* ceiling light bar + soft glow */}
            <div
              className="absolute inset-x-2 top-[7%] h-[5px] rounded-full"
              style={{ background: `linear-gradient(to right, ${scheme.light}cc, ${scheme.light}ff, ${scheme.light}cc)` }}
            />
            <div
              className="absolute inset-x-1 top-[9%] h-[42%] rounded-full opacity-40"
              style={{ background: `radial-gradient(60% 90% at 50% 0%, ${scheme.light}88, transparent)` }}
            />
            {/* passenger silhouette */}
            <svg
              viewBox="0 0 40 60"
              className="absolute left-1/2 top-[26%] h-[48%] -translate-x-1/2 text-[#0a0908]"
              fill="currentColor"
              aria-hidden
            >
              <circle cx="20" cy="9" r="6.5" />
              <path d="M13 22c0-3.5 3-6 7-6s7 2.5 7 6l2.5 22c0 2-1.5 3.5-3.5 3.5h-12c-2 0-3.5-1.5-3.5-3.5z" />
              <path d="M16 47l-1.5 9M24 47l1.5 9" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </AnimatePresence>

        {/* floor plate */}
        <div
          className="absolute inset-x-0 bottom-[9%] top-[82%] rounded-b-[5px]"
          style={{ background: scheme.floor }}
        />
        {/* front glass wall */}
        <div
          className="absolute inset-0 rounded-[5px] border border-white/25"
          style={{ background: scheme.glass }}
        />
        {/* vertical mullions */}
        <div className="absolute inset-y-1 left-[12%] w-[2px] bg-white/15" />
        <div className="absolute inset-y-1 right-[12%] w-[2px] bg-white/15" />
        <div
          className="absolute inset-y-1 left-1/2 w-[2px] -translate-x-1/2"
          style={{ background: `linear-gradient(to bottom, ${scheme.light}99, ${scheme.light}ff, ${scheme.light}66)` }}
        />
        {/* header + kick plate */}
        <div
          className="absolute inset-x-0 top-0 h-[9%] rounded-t-[4px]"
          style={{ background: scheme.trim }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[9%] rounded-b-[4px]"
          style={{ background: 'linear-gradient(to top, #0a0f2e, #273891)' }}
        />
        {/* sweeping glass reflection */}
        <div
          className="pointer-events-none absolute inset-[6%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: 'rosh-sheen 4.5s ease-in-out infinite' }}
        />
        {/* navy corner posts (doubling as guide rails) */}
        <div
          className="absolute -left-[5px] inset-y-0 w-[6px] rounded-[2px]"
          style={{ background: 'linear-gradient(to right, #16206b, #4966d4, #273891)' }}
        />
        <div
          className="absolute -right-[5px] inset-y-0 w-[6px] rounded-[2px]"
          style={{ background: 'linear-gradient(to left, #16206b, #4966d4, #273891)' }}
        />
        {/* undercarriage + twin cables */}
        <div
          className="absolute -bottom-1 inset-x-[-4px] h-[7px] rounded-[2px]"
          style={{ background: 'linear-gradient(to bottom, #273891, #0a0f2e)' }}
        />
        <div
          className="absolute -top-1 left-[28%] h-3 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${scheme.glow})` }}
        />
        <div
          className="absolute -top-1 right-[28%] h-3 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${scheme.glow})` }}
        />
        {/* sliding doors — only when the parent opts in (center lift) */}
        {doors && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[5px]">
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 border-r border-white/25"
              style={{ background: scheme.glass }}
              animate={{ x: doorOpen ? '-104%' : '0%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2"
              style={{ background: scheme.glass }}
              animate={{ x: doorOpen ? '104%' : '0%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        )}
        {/* sweeping glass reflection */}
        <div
          className="pointer-events-none absolute inset-[6%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: 'rosh-sheen 4.5s ease-in-out infinite' }}
        />
        {/* navy corner posts (doubling as guide rails) */}
        <div
          className="absolute -left-[5px] inset-y-0 w-[6px] rounded-[2px]"
          style={{ background: 'linear-gradient(to right, #16206b, #4966d4, #273891)' }}
        />
        <div
          className="absolute -right-[5px] inset-y-0 w-[6px] rounded-[2px]"
          style={{ background: 'linear-gradient(to left, #16206b, #4966d4, #273891)' }}
        />
        {/* undercarriage + twin cables */}
        <div
          className="absolute -bottom-1 inset-x-[-4px] h-[7px] rounded-[2px]"
          style={{ background: 'linear-gradient(to bottom, #273891, #0a0f2e)' }}
        />
        <div
          className="absolute -top-1 left-[28%] h-3 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${scheme.glow})` }}
        />
        <div
          className="absolute -top-1 right-[28%] h-3 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${scheme.glow})` }}
        />
      </div>
    </div>
  )
}

/** Mobile-only rose-gold lift: climbs with the storey (scroll-driven), belt
    reels in as it rises, doors pulse open on each storey change. */
function CenterLift({ storey, scheme }) {
  const reduceMotion = useReducedMotion()
  const [doorOpen, setDoorOpen] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    setDoorOpen(true)
    const t = setTimeout(() => setDoorOpen(false), 1000)
    return () => clearTimeout(t)
  }, [storey, reduceMotion])

  // rose-gold frame, but the cabin interior follows the current model
  const roseScheme = { ...SCHEMES.roseGold, interior: scheme.interior, floor: scheme.floor, light: scheme.light, glow: scheme.glow }
  const bottom = 4 + storey * 15
  const belt = 'linear-gradient(to bottom, rgba(183,110,121,0.15), rgba(183,110,121,0.7))'

  return (
    <div className="relative h-[220px] w-full max-w-[300px] md:hidden" data-center-lift aria-hidden>
      <div
        className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 transition-[height] duration-700"
        style={{ height: `calc(100% - ${bottom}% - 110px)`, background: belt }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-[bottom] duration-700 ease-out"
        style={{ bottom: `${bottom}%` }}
      >
        <Cabin scheme={roseScheme} dims="h-[110px] w-[64px]" doors doorOpen={doorOpen} />
      </div>
    </div>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const [storey, setStorey] = useState(0)

  // Scroll-driven hero: one viewport per storey, five storeys total. Section
  // height is 500svh mobile / 600vh desktop so each storey gets one screen.
  // Track window scroll progress through the hero section.
  const { scrollY } = useScroll()
  useEffect(() => {
    const handleChange = () => {
      const el = sectionRef.current
      if (!el) return
      const sectionHeight = el.offsetHeight
      const viewportHeight = window.innerHeight
      const maxScrollY = Math.max(1, sectionHeight - viewportHeight)
      // Progress 0→1 as window scrolls through section
      const progress = Math.max(0, Math.min(1, scrollY.get() / maxScrollY))
      const i = Math.min(Math.floor(progress * ZONES.length), ZONES.length - 1)
      setStorey((prev) => (prev === i ? prev : i))
    }
    const scrollYRef = scrollY
    const unsub = scrollYRef.on('change', handleChange)
    return () => unsub()
  }, [])

  const goStorey = (i) => {
    const el = sectionRef.current
    if (!el) return
    const range = el.scrollHeight - window.innerHeight
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / 4) * range, behavior: 'smooth' })
  }

  const zone = ZONES[storey]
  const finish = cabinSchemes[storey]
  const scheme = SCHEMES[zone.schemeId]
  const next = cabinSchemes[(storey + 1) % cabinSchemes.length]

  return (
    <section id="voyage" ref={sectionRef} className="relative h-[500svh] md:h-[600vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* depth layer — faint building grid behind everything */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(rgba(150,152,162,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(150,152,162,0.08) 1px, transparent 1px)',
            backgroundSize: '80px 96px',
            maskImage: 'radial-gradient(80% 70% at 50% 45%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(80% 70% at 50% 45%, black, transparent)',
          }}
        />

        {/* pinned viewport — the hero scrolls through 5 storeys, each getting a
            full viewport of scroll; the car climbs and the card swaps in place */}
        <div className="relative mx-auto flex h-full w-full max-w-[1240px] flex-col justify-center gap-3 px-6 py-6 lg:flex-row lg:items-center lg:gap-10 lg:px-6 lg:py-24 lg:pl-[100px] xl:pl-[210px]">
          {/* lift lane — takes the full height of the section */}
          <div data-lane className="pointer-events-none absolute bottom-6 left-6 top-[104px] hidden w-[64px] lg:block xl:w-[150px]" aria-hidden>
            <div
              className="absolute inset-y-0 left-1/2 -ml-px w-[2px]"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(73,102,212,0.5) 18%, rgba(73,102,212,0.75) 50%, rgba(73,102,212,0.5) 82%, transparent)',
                boxShadow: '0 0 24px rgba(73,102,212,0.45)',
              }}
            />
            {/* anchored by its bottom edge: the layout box is the visual box, so
                the car can never leave a phantom box hanging out of the section */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-[bottom] duration-1000 ease-out"
              style={{ bottom: `${4 + storey * 15}%` }}
            >
              <Cabin scheme={scheme} dims="h-32 w-[48px] lg:h-40 lg:w-[72px]" />
            </div>
          </div>

          <div className="grid w-full gap-3 lg:grid-cols-2 lg:gap-10 lg:items-center lg:gap-x-20">
            {/* the words */}
            <div className="flex flex-col justify-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
                {finish.zone} · {finish.name}
              </div>
              <h1 className="mt-3 font-display text-lg font-light leading-[1.1] text-fg sm:text-xl md:text-4xl lg:text-[3.5rem]">
                Ride the house
                <br />
                <span className="gold-gradient-text">to the sky.</span>
              </h1>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-mist md:mt-4 md:text-[15px]">
                ROSH builds home elevators that move like architecture — belt drive, MRL, geared
                and gearless, finished in five signature cabin schemes.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center rounded-full border border-line px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-mist transition-colors hover:border-gold/50 hover:text-gold-soft"
              >
                Explore the collection →
              </Link>
            </div>

            {/* mobile-only rose-gold lift — climbs with scroll, doors pulse per storey */}
            <CenterLift storey={storey} scheme={scheme} className="lg:hidden" />

            {/* the storey — one finish at a time, swapped as the car climbs */}
            <div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={zone.n}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <div className="hidden overflow-hidden rounded-2xl border border-line bg-panel lg:block">
                    <img
                      src={finish.material}
                      alt={`${finish.name} cabin interior — ROSH home elevator`}
                      className="h-[clamp(240px,38svh,420px)] w-full object-cover"
                      decoding="async"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2 md:mt-5">
                    <span className="font-display text-base italic text-gold md:text-2xl">{zone.n}</span>
                    <h2 className="font-display text-lg font-light leading-tight text-fg sm:text-xl md:text-3xl lg:text-4xl">
                      {zone.title}
                    </h2>
                  </div>
                  <p className="mt-2 max-w-md text-xs leading-relaxed text-mist sm:text-sm md:text-base">{zone.body}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-soft md:text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {zone.stat}
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* storey index — doubles as the control. min-w-6 keeps each dot a
                  24px touch target even though the pill itself stays thin */}
              <div className="mt-7 flex items-center gap-1.5">
                {ZONES.map((z, i) => (
                  <button
                    key={z.n}
                    type="button"
                    onClick={() => goStorey(i)}
                    aria-label={`Show ${z.title}`}
                    aria-current={i === storey}
                    className="flex h-6 min-w-6 items-center justify-center"
                  >
                    <span
                      className="block h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: i === storey ? 28 : 8,
                        background: i === storey ? 'var(--color-gold)' : 'var(--color-line)',
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* warm the next frame so a swap never shows a blank card */}
              <img src={next.material} alt="" aria-hidden className="hidden" />
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes rosh-sheen { 0%,100% { transform: translateX(-140%); } 55% { transform: translateX(140%); } }`}</style>
    </section>
  )
}
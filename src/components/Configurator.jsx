import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MATERIALS = [
  {
    id: 'steel',
    label: 'Brushed Steel',
    img: '/cabin/brushed-steel.jpg',
    tag: 'Satin stainless',
    desc: 'Vertical-brushed 304 stainless with mirror edges and a halo cove light. The quiet workhorse look, refined.',
    spec: '304 SS · hairline finish · mirror trim',
  },
  {
    id: 'glass',
    label: 'Obsidian Glass',
    img: '/cabin/obsidian-glass.jpg',
    tag: 'Smoked glass',
    desc: 'Backlit smoked glass panels framed in bronze — deep, reflective, and almost weightless at speed.',
    spec: 'Tempered 8 mm · bronze frame · edge-lit',
  },
  {
    id: 'walnut',
    label: 'Walnut Veneer',
    img: '/cabin/walnut-veneer.jpg',
    tag: 'Warm timber',
    desc: 'American black walnut veneer with bronze inlays and warm ambient strip lighting. Energy designed into wood.',
    spec: 'Walnut veneer · bronze inlays · amb. LED',
  },
]

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function Configurator() {
  const [active, setActive] = useState(MATERIALS[0])

  return (
    <section id="studio" className="relative border-t border-line-soft bg-ink-2/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:py-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* left — fixed text + chips */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: spring }}
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
              Cabin studio
            </div>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
              Finish the cabin <span className="gold-gradient-text">to your interior.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
              Every ROSH cabin is Photoboxed to your room — pick a material, then our
              design studio ships a full-size mock of the finish before production.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m)}
                className={`rounded-full border px-4.5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                  active.id === m.id
                    ? 'border-gold/60 bg-gold/10 text-gold-soft'
                    : 'border-line text-mist hover:border-gold/30 hover:text-fg'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: spring }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
              className="mt-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  {active.tag}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist">{active.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[11px] tracking-wider text-dim">{active.spec}</span>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
              >
                Enquire about {active.label}
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* right — cabin frame with cross-fade + scaling brackets */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-panel">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.img}
                alt={`${active.label} cabin interior`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1, transition: spring }}
                exit={{ opacity: 0, scale: 0.985, transition: { duration: 0.2 } }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* scaling geometric brackets */}
            {(['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r']).map(
              (pos, i) => (
                <motion.div
                  key={pos}
                  className={`pointer-events-none absolute border-gold ${pos}`}
                  style={{ width: `${26 + i * 6}%`, height: `${26 + i * 6}%` }}
                  animate={{ width: `${14 + i * 9}%`, height: `${14 + i * 9}%`, opacity: [0.5, 0.95] }}
                  transition={spring}
                />
              ),
            )}

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent px-5 py-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-gold-soft">
                {active.label}
              </span>
              <span className="font-mono text-[11px] tracking-widest text-dim">N / 422 · 3</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {['Cove light', 'Full-height mirror', 'Anti-drift stabiliser', 'Ceramic floor'].map((f) => (
              <div key={f} className="rounded-lg border border-line bg-panel px-2 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-mist">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
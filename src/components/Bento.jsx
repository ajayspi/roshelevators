import { useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cell = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 25 },
  },
}

function FloorCounter() {
  const [n, setN] = useState(0)
  const run = (to) =>
    animate(0, to, {
      duration: to === 10 ? 0.9 : 0.5,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    })
  return (
    <motion.div
      variants={cell}
      onHoverStart={() => run(10)}
      onHoverEnd={() => run(1)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel p-6"
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dim">
        Live floor counter
      </div>
      <div className="mt-6 flex items-end justify-between">
        <motion.span className="font-display text-7xl font-light tabular-nums text-fg transition-colors group-hover:text-gold-soft">
          {String(n).padStart(2, '0')}
        </motion.span>
        <span className="mb-2 text-[11px] tracking-[0.25em] text-dim">FLOOR</span>
      </div>
      <div className="mt-6 h-px w-full bg-line">
        <div className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-mist">
        Hover to run the counter — every ROSH drive reports its position in real time.
      </p>
    </motion.div>
  )
}

function BrakeSchematic() {
  return (
    <motion.div
      variants={cell}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel p-6"
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dim">
        Emergency braking · 3D cutaway
      </div>
      <div className="my-8 flex justify-center" style={{ perspective: 600 }}>
        <motion.div
          className="relative h-32 w-32"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute inset-0 rounded-full"
              style={{
                transform: `rotateY(${deg}deg) translateZ(2px)`,
                border: '1px solid rgba(73,102,212,0.5)',
                background:
                  'conic-gradient(from 0deg, rgba(73,102,212,0.05), rgba(73,102,212,0.25) 20%, rgba(73,102,212,0.05) 40%, rgba(255,255,255,0.06) 70%, rgba(73,102,212,0.05))',
              }}
            />
          ))}
          <div className="absolute inset-[38%] rounded-full border border-gold/60 bg-gold/10 shadow-[0_0_24px_rgba(73,102,212,0.4)]" />
        </motion.div>
      </div>
      <p className="text-xs leading-relaxed text-mist">
        Twin-caliper electromagnetic brake and guided rails — the safety gear behind a
        0.5% fleet breakdown ratio.
      </p>
    </motion.div>
  )
}

function Connectivity() {
  return (
    <motion.div
      variants={cell}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel p-6"
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dim">
        24 / 7 Cloud link
      </div>
      <div className="relative my-8 flex items-center justify-center gap-4">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute h-14 w-14 rounded-full border border-gold/40"
            animate={{ scale: [0.8, 2.1], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
          />
        ))}
        <motion.span
          className="relative h-14 w-14 rounded-full"
          animate={{ boxShadow: ['0 0 12px rgba(73,102,212,0.35)', '0 0 34px rgba(73,102,212,0.7)', '0 0 12px rgba(73,102,212,0.35)'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(circle at 50% 30%, #e5e9ff, #4966d4 55%, #16206b)',
          }}
        />
      </div>
      <p className="text-xs leading-relaxed text-mist">
        Managed by the RCUBE integrated controller — cloud telemetry, keyless entry and a
        plug-and-play harness, straight from our Hyderabad NOC.
      </p>
    </motion.div>
  )
}

function Stat({ k, v, l }) {
  return (
    <motion.div
      variants={cell}
      className="flex flex-col justify-between rounded-2xl border border-line bg-panel p-6"
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dim">{k}</div>
      <div className="mt-6 font-display text-5xl font-light text-fg">
        <span className="gold-gradient-text">{v}</span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-mist">{l}</p>
    </motion.div>
  )
}

export default function Bento() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <section id="specs" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 25 } }}
        viewport={{ once: true, margin: '-10% 0px' }}
        className="max-w-2xl"
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
          Engineering specs
        </div>
        <h2 className="mt-4 font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
          Quiet where it counts, <span className="gold-gradient-text">smart everywhere else.</span>
        </h2>
      </motion.div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <FloorCounter />
        <BrakeSchematic />
        <Connectivity />
        <Stat k="Rated speed" v="0.32–8 m/s" l="Geared and gearless traction across the fleet — belt drive, MRL and high-rise configurations." />
        <Stat k="Capacity" v="272–680 kg" l="From the compact Home Ride to full passenger and goods cars." />
        <Stat k="Breakdown" v="0.5 %" l="Fleet-wide breakdown ratio held through continuous research and development." />
      </motion.div>
    </section>
  )
}
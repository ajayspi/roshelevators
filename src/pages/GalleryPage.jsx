import { motion } from 'framer-motion'
import Gallery from '../components/Gallery.jsx'
import { Section, CtaButton, Magnetic } from '../components/atoms.jsx'
import { clients } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

const SPECS = [
  ['Maximum rise', '36 m'],
  ['Speed', '1 – 2 m/s'],
  ['Duty load', '272 – 680 kg'],
  ['Maximum stops', '12'],
  ['Power supply', '1 & 3 phase'],
  ['Pit depth', '300 mm'],
  ['Overhead', '3,000 mm'],
]

export default function GalleryPage() {
  return (
    <>
      <Section
        eyebrow="Customers' achievement gallery"
        title="Real shafts, real builds."
        kicker="From the first Rosh lift in 2004 to the installs going in this month — every photo below is a client we built for."
        className="pt-40 md:pt-48"
      />

      {/* client portfolio strip */}
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 gap-5 md:grid-cols-3"
        >
          {clients.map((c) => (
            <motion.figure
              key={c.src}
              variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: spring } }}
              className="group overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-gold/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[0.3] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-semibold text-fg">{c.name}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-dim">{c.place}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {/* baseline spec band */}
      <Section eyebrow="By the numbers" title="Every Rosh lift, on the same baseline.">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-8% 0px' }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-7"
        >
          {SPECS.map(([k, v]) => (
            <div key={k} className="bg-panel px-5 py-6">
              <div className="font-mono text-lg font-semibold text-fg">{v}</div>
              <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-dim">{k}</div>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* live installs — video + photos */}
      <Gallery />

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-ink-2/60 p-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl font-light text-fg">Want your build here next?</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
              We photograph every project we commission — villas, hospitals and towers alike.
            </p>
          </div>
          <Magnetic>
            <CtaButton to="/contact">Start your project</CtaButton>
          </Magnetic>
        </div>
      </section>
    </>
  )
}
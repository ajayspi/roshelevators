import { motion } from 'framer-motion'
import Configurator from '../components/Configurator.jsx'
import { CtaButton, Magnetic } from '../components/atoms.jsx'
import { cabinSchemes } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function Studio() {
  return (
    <>
      <div className="pt-32" />
      <Configurator />

      {/* the five schemes */}
      <section className="mx-auto max-w-6xl px-5 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-2xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">Signature schemes</div>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
            The five cabins of <span className="gold-gradient-text">the Rosh house.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {cabinSchemes.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { ...spring, delay: i * 0.06 } }}
              viewport={{ once: true, margin: '-8% 0px' }}
              className="group overflow-hidden rounded-2xl border border-line bg-panel"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={s.material}
                  alt={s.finish}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-soft backdrop-blur-sm">
                  {s.zone}
                </span>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-fg">{s.name}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-dim">{s.finish}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Magnetic>
            <CtaButton to="/contact">Design one with us</CtaButton>
          </Magnetic>
        </div>
      </section>
    </>
  )
}
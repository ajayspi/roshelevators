import { motion } from 'framer-motion'
import { Section, CtaButton, Magnetic } from '../components/atoms.jsx'
import { services, stats } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function Services() {
  return (
    <>
      <Section
        eyebrow="Services"
        title="After the ride, the care."
        kicker="Installation, maintenance, modernization and repair — one accountable team for the life of your lift."
        className="pt-40 md:pt-48"
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0, transition: spring }}
              viewport={{ once: true, margin: '-8% 0px' }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-panel p-9 transition-colors hover:border-gold/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm italic text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-soft">
                  {s.slug}
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl font-light text-fg">{s.name}</h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/90">{s.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist">{s.blurb}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-mist">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      {/* trust band */}
      <Section eyebrow="The record" title="Numbers the service desk lives by.">
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-panel px-6 py-8">
              <div className="font-display text-3xl font-light gold-gradient-text sm:text-4xl">
                {s.value.toLocaleString('en-IN')}
                {s.suffix}
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-ink-2/60 p-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl font-light text-fg">Lift acting up?</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
              Our 66+ engineers cover Hyderabad and beyond — breakdowns handled efficiently,
              parts genuine, warranties honoured.
            </p>
          </div>
          <Magnetic>
            <CtaButton to="/contact">Book a service visit</CtaButton>
          </Magnetic>
        </div>
      </section>
    </>
  )
}
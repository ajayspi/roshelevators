import { motion } from 'framer-motion'
import { Counter, CtaButton, Magnetic, Section } from '../components/atoms.jsx'
import { brand, mission, vision, stats, products } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function About() {
  return (
    <>
      {/* hero */}
      <section className="relative mx-auto max-w-6xl px-5 pt-40 md:pt-48">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0, transition: spring }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
              Heritage · {brand.established}
            </div>
            <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight text-fg sm:text-7xl">
              Two decades of
              <br />
              <span className="gold-gradient-text">quiet ascent.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.1 } }}
            className="max-w-md text-[15px] leading-relaxed text-mist"
          >
            ROSH ELEVATORS PVT LTD is Hyderabad&apos;s premier home-elevator manufacturer
            since 2004 — a team of seasoned professionals driven by a shared passion for
            innovation and technical excellence.
          </motion.p>
        </div>
      </section>

      {/* odds + ends band */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-panel px-8 py-10">
              <div className="font-display text-5xl font-light gold-gradient-text sm:text-6xl">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-dim">{s.label}</div>
              <p className="mt-2 text-xs leading-relaxed text-mist">{s.note}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* story */}
      <Section
        eyebrow="The story"
        title="From our first lift in 2004 to 2,500+ installations today."
        kicker="A breakdown ratio of just 0.5% is not luck — it comes from relentless research and development, and a fleet that never stops being watched."
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0, transition: spring }}
            viewport={{ once: true, margin: '-8% 0px' }}
            className="rounded-3xl border border-line bg-panel p-8 lg:col-span-2 lg:row-span-2"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Industries we serve</div>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              Our reputation travels well beyond the villa gate. Rosh lifts are trusted
              across automobile plants, pharmaceutical facilities, hospitals, hotels and
              residential towers — every environment where a ride must be flawless,
              day after day.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {[...brand.industries, 'Residential towers', 'Commercial offices', 'Villas & duplexes'].map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-[12px] font-semibold text-gold-soft"
                >
                  {ind}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-ink-2/60 p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-dim">Our mission</div>
                <p className="mt-3 font-display text-lg font-light leading-relaxed text-fg">{mission}</p>
              </div>
              <div className="rounded-2xl bg-ink-2/60 p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-dim">Our vision</div>
                <p className="mt-3 font-display text-lg font-light leading-relaxed text-fg">{vision}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.08 } }}
            viewport={{ once: true, margin: '-8% 0px' }}
            className="rounded-3xl border border-line bg-panel p-8"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Founder</div>
            <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 font-display text-2xl text-gold-soft">
              SF
            </div>
            <h3 className="mt-5 font-display text-2xl font-light text-fg">{brand.founder}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-mist">
              Founder of Rosh Elevators — still the standard-bearer for the family craftsmanship
              that built the company&apos;s name across Telangana and beyond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.16 } }}
            viewport={{ once: true, margin: '-8% 0px' }}
            className="rounded-3xl border border-line bg-panel p-8"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">The fleet</div>
            <h3 className="mt-4 font-display text-2xl font-light text-fg">0.32 – 8 m/s</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-mist">
              Geared and gearless traction, with and without machine rooms — from the
              compact Home Ride to goods lifts for high-rise buildings.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {products.map((p) => (
                <span key={p.slug} className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-mist">
                  {p.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* studios */}
      <Section eyebrow="Where we work" title="Two addresses, one standard.">
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            ['Corporate office', brand.corporate, 'Design, sales and the RCUBE monitoring desk — Jubilee Hills.'],
            ['Manufacturing unit', brand.factory, 'The floor where drive trains, cabins and controllers are built — Kukatpally, Balanagar.'],
          ].map(([t, addr, blurb], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0, transition: { ...spring, delay: i * 0.1 } }}
              viewport={{ once: true, margin: '-8% 0px' }}
              className="rounded-3xl border border-line bg-panel p-9"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{t}</div>
              <p className="mt-4 font-display text-xl font-light leading-relaxed text-fg">{addr}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-mist">{blurb}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-8% 0px' }}
          className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-ink-2/60 p-10 sm:flex-row sm:items-center"
        >
          <div>
            <h3 className="font-display text-2xl font-light text-fg">Experience the difference.</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
              Every Rosh lift represents the pinnacle of safety, comfort and reliability.
              Talk to the team behind 2,500+ rides.
            </p>
          </div>
          <Magnetic>
            <CtaButton to="/contact">Get in touch</CtaButton>
          </Magnetic>
        </motion.div>
      </Section>
    </>
  )
}
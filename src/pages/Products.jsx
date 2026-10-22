import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section, CtaButton, Magnetic } from '../components/atoms.jsx'
import { products, solutions } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function Products() {
  return (
    <>
      <Section
        eyebrow="The collection"
        title={
          <>
            Five series.
            <br />
            Every drive family we build.
          </>
        }
        kicker="From the 272 kg compact home lift to twelve-stop high-rises — the same rails, the same finish, the same quiet."
        className="pt-40 md:pt-48"
      />

      {/* flagship series */}
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: spring }}
              viewport={{ once: true, margin: '-8% 0px' }}
              className={`group relative overflow-hidden rounded-3xl border border-line bg-panel ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <Link to={`/products/${p.slug}`} className="block">
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.family}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/40 to-transparent opacity-90" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                    <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold-soft">
                      {String(i + 1).padStart(2, '0')} · {p.family}
                    </span>
                    <h3 className="mt-2 font-display text-4xl font-light text-fg sm:text-5xl">{p.name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{p.tagline}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      {/* every solution */}
      <Section
        eyebrow="Beyond the series"
        title="Twelve ways we move people."
        kicker="Passenger, villa, hospital, goods and panoramic — plus every traction family, from 0.32 to 8 m/s."
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {solutions.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: spring } }}
              className="group rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-gold/40"
            >
              <div className="h-1 w-8 rounded-full bg-gold/60 transition-all duration-300 group-hover:w-14 group-hover:bg-gold" />
              <h4 className="mt-5 font-display text-xl font-light text-fg">{s.label}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-mist">{s.blurb}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-ink-2/60 p-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-3xl font-light text-fg">Not sure which series?</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
              Send us your floor plan or shaft size — our engineers will match the right drive
              and cabin to your building.
            </p>
          </div>
          <Magnetic>
            <CtaButton to="/contact">Talk to an engineer</CtaButton>
          </Magnetic>
        </div>
      </section>
    </>
  )
}
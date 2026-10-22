import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, stats } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function Collection() {
  return (
    <section id="collection" className="relative border-t border-line-soft bg-ink-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-2xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
            The collection
          </div>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
            Five series. <span className="gold-gradient-text">One standard — silence.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-mist">
            Every ROSH drive is engineered in Hyderabad, from the 272 kg home lift to the
            twelve-stop high-rise — the same rails, the same finish, the same quiet.
          </p>
        </motion.div>

        {/* stats band — real numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-panel px-6 py-6">
              <div className="font-display text-3xl font-light gold-gradient-text sm:text-4xl">
                {s.value.toLocaleString('en-IN')}
                {s.suffix}
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-dim">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* series grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((p, i) => (
            <motion.article
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: 36 },
                show: { opacity: 1, y: 0, transition: spring },
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-300 hover:border-gold/40"
            >
              <Link to={`/products/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.family}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80" />
                <span className="absolute left-4 top-4 font-display text-sm italic text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute bottom-3 right-4 rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-soft backdrop-blur-sm">
                  {p.family}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-light text-fg">{p.name}</h3>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/90">
                  {p.tagline}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{p.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                  {p.specGrid.slice(0, 4).map(([k, v]) => (
                    <span key={k} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] font-semibold text-fg">
                      {v} <span className="text-dim normal-case">{k}</span>
                    </span>
                  ))}
                </div>
                <Link
                  to={`/products/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft transition-colors hover:text-gold"
                >
                  View series
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
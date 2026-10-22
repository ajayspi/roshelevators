import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CtaButton, Magnetic, Section } from '../components/atoms.jsx'
import { products, brand } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function ProductDetail() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  if (!p) {
    return (
      <Section eyebrow="Collection" title="Series not found." className="pt-44">
        <Link to="/products" className="mt-8 inline-block text-gold-soft underline">
          Back to the collection
        </Link>
      </Section>
    )
  }
  const others = products.filter((x) => x.slug !== slug)

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-36 md:pt-44">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-mist transition-colors hover:text-gold-soft"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          The collection
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: spring }}
            className="relative overflow-hidden rounded-3xl border border-line bg-panel lg:sticky lg:top-24 lg:self-start"
          >
            <img
              src={p.image}
              alt={`${p.name} — ${p.family}`}
              className="aspect-[4/3] w-full object-cover lg:aspect-[3/3.4]"
            />
            <div className="absolute left-5 top-5 rounded-full border border-gold/30 bg-ink/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-soft backdrop-blur-sm">
              {p.family}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-6 pt-16">
              <p className="text-sm text-mist">{p.material}</p>
            </div>
          </motion.div>

          {/* facts */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.05 } }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold-soft">
                {String(products.indexOf(p) + 1).padStart(2, '0')} / {products.length}
              </div>
              <h1 className="mt-3 font-display text-5xl font-light leading-none tracking-tight text-fg sm:text-6xl">
                {p.name}
              </h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-gold/90">
                {p.tagline}
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-mist">{p.blurb}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.12 } }}
              className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel"
            >
              <div className="border-b border-line px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-dim">
                Specifications
              </div>
              <dl className="divide-y divide-line">
                {p.specGrid.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-6 py-3.5">
                    <dt className="text-[12px] uppercase tracking-[0.18em] text-dim">{k}</dt>
                    <dd className="font-mono text-[14px] font-semibold text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.18 } }}
              className="mt-6 space-y-2.5"
            >
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-mist">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </motion.ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <CtaButton to={`/contact?series=${p.slug}`}>Quote this series</CtaButton>
              </Magnetic>
              <a
                href={`tel:${brand.phones[0].replace(/\s/g, '')}`}
                className="inline-block py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-mist transition-colors hover:text-gold-soft"
              >
                or call {brand.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* other series */}
      <Section eyebrow="Keep exploring" title="The rest of the collection." className="pb-28">
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {others.map((o, i) => (
            <motion.div
              key={o.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { ...spring, delay: i * 0.06 } }}
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              <Link to={`/products/${o.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-line bg-panel">
                  <img
                    src={o.image}
                    alt={`${o.name} — ${o.family}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-3 px-1">
                  <div className="font-display text-lg font-light text-fg">{o.name}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-dim">{o.family}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  )
}
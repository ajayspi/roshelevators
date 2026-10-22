import { motion } from 'framer-motion'

const PHOTOS = [
  '/gallery/1.jpg',
  '/gallery/2.jpg',
  '/gallery/3.jpg',
  '/gallery/4.jpg',
  '/gallery/5.jpg',
]

const spring = { type: 'spring', stiffness: 90, damping: 25 }

export default function Gallery() {
  return (
    <section id="gallery" className="relative border-t border-line-soft bg-ink-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
              In the field
            </div>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
              Lifts we've <span className="gold-gradient-text">put in the ground.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            From Jubilee Hills villas to Kukatpally high-rises — the cars, the shafts,
            the city.
          </p>
        </motion.div>

        {/* featured video */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="group mt-12 overflow-hidden rounded-2xl border border-line bg-panel"
        >
          <video
            className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            src="/gallery/video.mp4"
            poster="/gallery/1.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* photos */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PHOTOS.map((src, i) => (
            <motion.figure
              key={src}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: spring },
              }}
              className="group overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-300 hover:border-gold/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={`ROSH installation ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0 grayscale-[0.25]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
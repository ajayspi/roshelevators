import { motion } from 'framer-motion'
import Hero from '../components/Hero.jsx'
import Collection from '../components/Collection.jsx'
import Bento from '../components/Bento.jsx'
import StatsBar from '../components/StatsBar.jsx'
import Testimonials from '../components/Testimonials.jsx'
import { CtaButton, Magnetic, Marquee, Section } from '../components/atoms.jsx'
import { brand } from '../data/site.js'

const TICKER = [
  '20+ years of craft',
  '2,500+ installations',
  '0.5% breakdown ratio',
  'RCUBE cloud control',
  'Belt drive · MRL · geared & gearless',
  'Hyderabad engineered',
]

const spring = { type: 'spring', stiffness: 90, damping: 25 }

function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 600px at 20% 20%, rgba(73,102,212,0.35), transparent 60%), radial-gradient(900px 500px at 85% 90%, rgba(22,32,107,0.5), transparent 65%), linear-gradient(140deg, #16206b 0%, #273891 55%, #16206b 100%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-[11px] font-semibold uppercase tracking-[0.45em] text-white/70"
        >
          {brand.established} · {brand.legal}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-5 font-display text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-7xl"
        >
          Your floor
          <br />
          is waiting.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/80"
        >
          Tell us about your building — within a week our engineers share a shaft survey,
          a quote and a cabin design for your floor.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <CtaButton to="/contact" className="bg-white! text-[#16206b]! hover:bg-[#e5e9ff]!">
              Get a quote
            </CtaButton>
          </Magnetic>
          <CtaButton href={`tel:${brand.phones[0].replace(/\s/g, '')}`} variant="ghost" className="border-white/40! text-white! hover:border-white/80!">
            {brand.phones[0]}
          </CtaButton>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Marquee items={TICKER} className="border-y border-line-soft bg-panel py-4" />
      <Collection />
      <Bento />
      <Testimonials />
      <FinalCta />
    </>
  )
}
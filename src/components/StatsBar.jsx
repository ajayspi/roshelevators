import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion'
import { stats } from '../data/site.js'

export default function StatsBar() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  // Scroll-triggered animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const handle = (v) => { if (v > 0.1 && !isVisible) setIsVisible(true) }
    const unsub = scrollYProgress.on('change', handle)
    return () => unsub()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || reduceMotion) {
      if (!reduceMotion) setAnimatedValues(stats.map(s => s.value))
      return
    }

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOut cubic

      setAnimatedValues(stats.map(s => s.value * eased))

      if (progress < 1) requestAnimationFrame(animate)
      else setAnimatedValues(stats.map(s => s.value))
    }

    animate()
  }, [isVisible, reduceMotion])

  const formatValue = (value, decimals = 0) => {
    if (decimals > 0) return value.toFixed(decimals)
    return value.toLocaleString('en-IN')
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-line-soft bg-ink py-16 md:py-24"
      aria-label="Company statistics"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-center text-center"
            >
              <div className="font-display text-4xl font-light text-fg md:text-5xl lg:text-6xl">
                {formatValue(animatedValues[i], stat.decimals)}
                <span className="font-light text-gold ml-1">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-gold">
                {stat.label}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-mist max-w-xs mx-auto">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
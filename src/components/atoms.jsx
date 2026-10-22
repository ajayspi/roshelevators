import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

/* ---- route transition wrapper: every page fades/rises in ---- */
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---- standard section block: eyebrow + title + body ---- */
export function Section({ eyebrow, title, kicker, children, className = '' }) {
  return (
    <section className={`relative mx-auto max-w-6xl px-5 py-24 md:py-32 ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={spring}
          className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-soft"
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={spring}
          className="max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-fg md:text-6xl"
        >
          {title}
        </motion.h2>
        {kicker && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={spring}
            className="max-w-sm text-sm leading-relaxed text-mist"
          >
            {kicker}
          </motion.p>
        )}
      </div>
      {children}
    </section>
  )
}

/* ---- count-up number, fires when scrolled into view ---- */
export function Counter({ to, decimals = 0, suffix = '', duration = 1.6, className = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let controls = null
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          controls = animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(v),
          })
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (controls) controls.stop()
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

/* ---- infinite spec ticker ---- */
export function Marquee({ items, className = '' }) {
  const row = [...items, ...items]
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-8 py-1">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.3em] text-mist">
            {t}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold/50">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---- magnetic hover wrapper for CTAs ---- */
export function Magnetic({ strength = 0.35, children, className = '' }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 })
  const sy = useSpring(y, { stiffness: 200, damping: 16 })

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/* ---- shared CTA button ---- */
export function CtaButton({ to, href, children, variant = 'solid', className = '' }) {
  const base =
    'group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors'
  const styles =
    variant === 'solid'
      ? 'bg-gold text-ink hover:bg-gold-soft'
      : 'border border-line text-fg hover:border-gold/50 hover:text-gold-soft'
  const inner = (
    <>
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:translate-x-1"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </>
  )
  if (to) {
    return (
      <Link to={to} className={`${base} ${styles} ${className}`}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {inner}
    </a>
  )
}
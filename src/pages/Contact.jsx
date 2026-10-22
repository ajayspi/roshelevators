import { useState } from 'react'
import { motion } from 'framer-motion'
import { Magnetic } from '../components/atoms.jsx'
import { brand } from '../data/site.js'

const spring = { type: 'spring', stiffness: 90, damping: 25 }

const inputCls =
  'w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm text-fg placeholder:text-dim outline-none transition-colors focus:border-gold/60'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    series: '',
    message: '',
  })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const subject = encodeURIComponent(`Lift enquiry — ${form.series || 'general'}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`,
  )
  const mailto = `mailto:${brand.email}?subject=${subject}&body=${body}`

  return (
    <section className="mx-auto max-w-6xl px-5 pt-40 md:pt-48">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        {/* form */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0, transition: spring }}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">Contact</div>
          <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight text-fg sm:text-6xl">
            We are here
            <br />
            to <span className="gold-gradient-text">help you.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
            Tell us about your building, your floor count or your shaft size — a lift
            engineer will come back within one working day.
          </p>

          <form
            className="mt-10 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = mailto
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-dim">Your name</span>
              <input required value={form.name} onChange={set('name')} className={inputCls} placeholder="Full name" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-dim">Phone</span>
              <input required value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+91 …" inputMode="tel" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-dim">Email</span>
              <input value={form.email} onChange={set('email')} type="email" className={inputCls} placeholder="you@example.com" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-dim">What are you building?</span>
              <select value={form.series} onChange={set('series')} className={inputCls}>
                <option value="">Home / villa lift</option>
                <option value="jetta">Jetta · belt drive</option>
                <option value="vegam">Vegam · MRL</option>
                <option value="comfort">Comfort · geared</option>
                <option value="diamond">Diamond · high-rise</option>
                <option value="home-ride">Home Ride · compact</option>
                <option value="hospital">Hospital / goods lift</option>
                <option value="modernization">Modernization / AMC</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-dim">Message</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={set('message')}
                className={`${inputCls} resize-none`}
                placeholder="Floors, shaft size if you have one, preferred finish…"
              />
            </label>
            <div className="sm:col-span-2">
              <Magnetic>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-soft"
                >
                  Send enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Magnetic>
              <p className="mt-3 text-xs text-dim">
                Opens your mail app with everything pre-filled — or email{' '}
                <a className="inline-block py-1 text-gold-soft" href={`mailto:${brand.email}`}>{brand.email}</a> directly.
              </p>
            </div>
          </form>
        </motion.div>

        {/* info + map */}
        <div className="space-y-5">
          {[
            ['Corporate office', brand.corporate],
            ['Manufacturing unit', brand.factory],
            ['Hours', brand.hours],
          ].map(([t, v], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.1 + i * 0.08 } }}
              className="rounded-2xl border border-line bg-panel p-6"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-fg">{v}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.34 } }}
            className="rounded-2xl border border-line bg-panel p-6"
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Reach us</div>
            <div className="mt-3 space-y-2 text-sm">
              {brand.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block py-1 font-semibold text-fg transition-colors hover:text-gold-soft">
                  {p}
                </a>
              ))}
              <a href={`mailto:${brand.email}`} className="block py-1 text-gold-soft">
                {brand.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.42 } }}
            className="overflow-hidden rounded-2xl border border-line"
          >
            <iframe
              title="Rosh Elevators — Jubilee Hills, Hyderabad"
              src="https://www.google.com/maps?q=Jubilee+Hills,+Hyderabad,+Telangana&output=embed"
              className="h-64 w-full grayscale-[0.4] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.5 } }}
            className="rounded-2xl border border-line bg-panel p-6"
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Download</div>
            <p className="mt-2 text-sm text-mist">Full catalogue with every series and spec sheet.</p>
            <a
              href={brand.brochure}
              download="Rosh_Elevators_Brochure.pdf"
              className="mt-3 inline-flex items-center gap-2 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-gold-soft transition-colors hover:text-gold"
            >
              Rosh_Brochure.pdf
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
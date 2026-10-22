import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brand, products } from '../data/site.js'
import BrochureLink from './BrochureLink.jsx'

const spring = { type: 'spring', stiffness: 90, damping: 25 }
const YEAR = new Date().getFullYear()

const companyLinks = [
  { to: '/about', label: 'Heritage' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/configurator', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
  { to: '/proposal', label: 'Proposal' },
]

// Social media links
const socialLinks = [
  { href: 'https://www.facebook.com/AxiomThemes', label: 'Facebook', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  { href: 'https://x.com/ThemesAxiom', label: 'Twitter', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 13.5-6.28"/></svg>
  )},
  { href: 'https://dribbble.com/AxiomThemes', label: 'Dribbble', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S18.5 2 12 2zm10 0c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm-1 17a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm10-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
  )},
  { href: 'https://www.instagram.com/axiom_themes/', label: 'Instagram', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S18.5 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 2a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm8.7-10a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm-2 10a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6z"/></svg>
  )},
]

const mapLinks = {
  corporate: 'https://maps.app.goo.gl/SuBSnZg9ANtQARP7A',
  factory: 'https://maps.app.goo.gl/SuBSnZg9ANtQARP7A',
}

export default function Footer() {
  return (
    <footer className="relative border-t border-line-soft bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: spring }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-5"
        >
          <div className="max-w-xs lg:col-span-2">
            <img
              src="/logos/brand.png"
              alt="ROSH"
              width="140"
              height="49"
              className="h-10 w-auto dark:hidden"
            />
            <img
              src="/logos/brand-white.png"
              alt="ROSH"
              width="140"
              height="49"
              className="hidden h-10 w-auto dark:block"
            />
            <p className="mt-5 text-sm leading-relaxed text-mist">
              {brand.tagline} {brand.legal} — premium lifts for homes, villas, hospitals and
              high-rises, engineered in Hyderabad {brand.established}.
            </p>
            <BrochureLink variant="footer" className="mt-5" />
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-line-soft bg-panel/50 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.35em] text-dim">Explore</h4>
            <ul className="mt-5 space-y-1">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="block py-1 text-sm text-mist transition-colors hover:text-gold-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.35em] text-dim">Collection</h4>
            <ul className="mt-5 space-y-1">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className="block py-1 text-sm text-mist transition-colors hover:text-gold-soft">
                    {p.name} · {p.family}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.35em] text-dim">Contact</h4>
            <div className="mt-5 space-y-4 text-sm text-mist">
              <p className="leading-relaxed">
                <a href={mapLinks.corporate} target="_blank" rel="noopener noreferrer" className="font-semibold text-fg hover:text-gold-soft transition-colors flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Corporate
                </a>
                <br />
                <span className="ml-6 text-mist">{brand.corporate}</span>
              </p>
              <p className="leading-relaxed">
                <a href={mapLinks.factory} target="_blank" rel="noopener noreferrer" className="font-semibold text-fg hover:text-gold-soft transition-colors flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22h6"/></svg>
                  Factory
                </a>
                <br />
                <span className="ml-6 text-mist">{brand.factory}</span>
              </p>
              <p>
                <a href={`mailto:${brand.email}`} className="inline-block py-1 transition-colors hover:text-gold-soft flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {brand.email}
                </a>
                <br />
                {brand.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="block py-1 transition-colors hover:text-gold-soft flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-12.6 19.79 19.79 0 0 1 3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {p}
                  </a>
                ))}
              </p>
              <p className="text-dim">{brand.hours}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line-soft pt-8 text-[12px] text-dim md:flex-row">
          <p>© {YEAR} {brand.legal} · All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/proposal" className="inline-block py-1 transition-colors hover:text-gold-soft">
              Proposal
            </Link>
            <span aria-hidden>·</span>
            <BrochureLink variant="footer" />
          </p>
        </div>
      </div>
    </footer>
  )
}
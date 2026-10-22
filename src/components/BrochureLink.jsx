import { Link } from 'react-router-dom'
import { brand } from '../data/site.js'

export default function BrochureLink({ className = '', variant = 'default' }) {
  const variants = {
    default: 'inline-flex items-center gap-2 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-gold-soft transition-colors hover:text-gold',
    hero: 'mt-8 inline-flex items-center rounded-full border border-line px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-mist transition-colors hover:border-gold/50 hover:text-gold-soft',
    footer: 'inline-block py-1 text-gold-soft transition-colors hover:text-gold',
  }

  const icon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
    </svg>
  )

  return (
    <a
      href={brand.brochure}
      download="Rosh_Elevators_Brochure.pdf"
      className={`${variants[variant]} ${className}`}
    >
      {variant !== 'footer' && icon}
      {variant === 'hero' ? 'Explore the collection →' : variant === 'footer' ? 'Download brochure' : 'Download Brochure'}
    </a>
  )
}
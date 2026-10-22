import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/site.js'

export default function Testimonials() {
  const reduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reduceMotion])

  const handleTouchStart = (e) => {
    // Touch start handler
  }

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = 0 - touchEnd
    if (Math.abs(diff) > 50) {
      setCurrentIndex((prev) =>
        diff > 0 ? (prev + 1) % testimonials.length : (prev - 1 + testimonials.length) % testimonials.length
      )
    }
  }

  return (
    <section
      className="relative overflow-hidden border-y border-line-soft bg-ink py-16 md:py-24"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-light text-fg md:text-4xl">
            What our clients say
          </h2>
          <p className="mt-3 text-mist max-w-2xl mx-auto">
            Real experiences from homeowners, architects, and project leaders
            who chose Rosh Elevators.
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full px-4 md:w-[calc(100%/3)] px-4"
                >
                  <div className="bg-panel/50 rounded-2xl p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5 4.87L10.89 9.27 0 5.01z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-lg leading-relaxed text-fg mb-6 font-light">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4 pt-4 border-t border-line-soft">
                      <div className="w-12 h-12 rounded-full bg-panel/50 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/40" />
                      </div>
                      <div>
                        <p className="font-medium text-fg">{testimonial.name}</p>
                        <p className="text-sm text-mist">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === currentIndex}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-gold w-8'
                    : 'bg-line hover:bg-gold/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
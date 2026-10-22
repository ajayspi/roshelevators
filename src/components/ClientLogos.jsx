import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Client logos data - placeholder logos (can be replaced with real SVGs)
const clients = [
  { name: 'Hussain Residence', place: 'Villa lift', src: '/clients/Hussainclient.jpg' },
  { name: 'Hussain · Phase II', place: 'Belt drive install', src: '/clients/hussaianclient2.jpg' },
  { name: 'Hussain · Phase III', place: 'Panoramic cabin', src: '/clients/hussianclient3.jpg' },
  { name: 'Santosh Residence', place: 'Home lift', src: '/clients/santoshclient.jpg' },
  { name: 'Heritage install', place: 'Legacy passenger lift', src: '/clients/oldclient.jpg' },
  { name: 'Heritage install II', place: 'Modernized car', src: '/clients/oldclient2.jpg' },
  // Additional placeholder clients from roshelevators.com
  { name: 'Fiat', place: 'Automotive', src: '/clients/fiat.svg' },
  { name: 'Volvo', place: 'Automotive', src: '/clients/volvo.svg' },
  { name: 'Cult Fit', place: 'Fitness', src: '/clients/cultfit.svg' },
  { name: 'Modi Properties', place: 'Real Estate', src: '/clients/modiproperties.svg' },
  { name: 'Dyns', place: 'Logistics', src: '/clients/dyns.svg' },
  { name: 'ARD', place: 'Real Estate', src: '/clients/ard.svg' },
  { name: 'Jeep', place: 'Automotive', src: '/clients/jeep.svg' },
  { name: 'Dyns Logo', place: 'Logistics', src: '/clients/dynslogo.svg' },
]

export default function ClientLogos() {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef(null)
  const [clonedClients, setClonedClients] = useState([])
  const [trackWidth, setTrackWidth] = useState(0)

  useEffect(() => {
    // Clone clients for infinite scroll
    setClonedClients([...clients, ...clients, ...clients])

    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 3) // One third since we cloned 3x
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  if (!reduceMotion) {
    return (
      <section
        className="relative overflow-hidden border-y border-line-soft bg-ink py-12 md:py-16"
        aria-label="Our clients"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-light text-fg md:text-4xl">
              Trusted by leading brands
            </h2>
            <p className="mt-3 text-mist max-w-2xl mx-auto">
              From heritage homes to commercial landmarks, our lifts move people
              across India's most prestigious addresses.
            </p>
          </div>

          <div className="relative" aria-hidden="true">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--color-ink), transparent 20%, transparent 80%, var(--color-ink))',
              }}
            />

            <div className="flex" ref={trackRef} style={{ width: 'max-content' }}>
              {clonedClients.map((client, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[160px] md:w-[180px] px-4 flex flex-col items-center"
                >
                  <div className="relative w-full aspect-[4/3] bg-panel/50 rounded-xl overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={client.src}
                      alt={client.name}
                      className="max-h-[60px] max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-fg truncate">{client.name}</p>
                    <p className="text-xs text-mist truncate">{client.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Reduced motion - static grid
  return (
    <section className="border-y border-line-soft bg-ink py-12 md:py-16" aria-label="Our clients">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-light text-fg md:text-4xl">
            Trusted by leading brands
          </h2>
          <p className="mt-3 text-mist max-w-2xl mx-auto">
            From heritage homes to commercial landmarks, our lifts move people
            across India's most prestigious addresses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {clients.slice(0, 12).map((client, i) => (
            <div key={i} className="flex flex-col items-center p-4 bg-panel/50 rounded-xl">
              <div className="relative w-full aspect-[4/3] bg-panel/50 rounded-xl overflow-hidden flex items-center justify-center p-4">
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-[60px] max-w-full object-contain grayscale opacity-60"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-fg truncate">{client.name}</p>
                <p className="text-xs text-mist truncate">{client.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
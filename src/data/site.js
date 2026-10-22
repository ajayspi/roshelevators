// Single source of truth — every fact here is from the official Rosh site / brand book.

export const brand = {
  name: 'ROSH',
  legal: 'Rosh Elevators Pvt. Ltd.',
  founded: 2004,
  established: 'since 2004',
  tagline: 'We are there where people need to move high.',
  industries: ['Automobile', 'Pharma', 'Hospitals', 'Hotels'],
  founder: 'Seby Francis',
  email: 'info@roshelevators.com',
  emailAlt: 'admin@roshelevators.com',
  phones: ['+91 90520 04318', '+91 77949 80055'],
  phonesAlt: ['+91 90520 01242', '+91 90520 01050'],
  hours: 'Mon – Sat · 9:00 AM – 6:00 PM',
  corporate: '8-2-293/82/A/39, Plot No. 39, 3rd Floor, Road No. 5, Jubilee Hills, Hyderabad.',
  factory: '11-6-56/k, Medplus Lane, Kukatpally, Balanagar, Hyderabad-37.',
  brochure: '/Rosh_Brochure.pdf',
}

export const mission =
  'To maintain our core quality and safety values and provide best-in-class elevators.'
export const vision =
  'To be a significant player in the elevator industry with world-class lifts — a leading elevator company nationwide.'

export const stats = [
  { label: 'Lifts installed', value: 2500, suffix: '+', note: 'since our first lift in 2004' },
  { label: 'Years of craft', value: 20, suffix: '+', note: 'two decades of vertical travel' },
  { label: 'Breakdown ratio', value: 0.5, suffix: '%', decimals: 1, note: 'through continuous R&D' },
  { label: 'Experts on call', value: 66, suffix: '+', note: 'engineers, installers & support' },
]

export const products = [
  {
    slug: 'jetta',
    name: 'Jetta',
    family: 'Belt Drive',
    tagline: 'Machine-room-free, whisper-quiet, energy-smart',
    blurb:
      'Our flagship home lift. The belt drive runs without an overhead machine room, glides on low-noise belt technology and needs just a 300 mm pit — engineered for the modern villa.',
    image: '/products/jetta.jpg',
    material: 'Glass panorama cabin with navy chrome trim',
    rise: 'Up to 36 m',
    specGrid: [
      ['Speed', '1–2 m/s'],
      ['Duty load', '272–680 kg'],
      ['Max rise', '36 m'],
      ['Max stops', '12'],
      ['Pit depth', '300 mm'],
      ['Overhead', '3,000 mm'],
      ['Power', '1 & 3 phase'],
    ],
    features: [
      'No overhead machine room required',
      'Low-noise belt traction drive',
      'Energy-efficient permanent magnet motor',
      '300 mm shallow pit · 3,000 mm floor height',
      'Belt sensors for precision levelling',
    ],
  },
  {
    slug: 'comfort',
    name: 'Comfort',
    family: 'Geared',
    tagline: 'The dependable workhorse for low-to-mid rise',
    blurb:
      'Proven geared traction engineering for buildings that need dependable, cost-effective vertical movement — quiet, robust and built to run for decades.',
    image: '/products/comfort.jpg',
    material: 'Brushed steel cabin, warm royal light',
    rise: 'Up to 36 m',
    specGrid: [
      ['Speed', '1–2 m/s'],
      ['Duty load', '272–680 kg'],
      ['Max rise', '36 m'],
      ['Max stops', '12'],
      ['Power', '1 & 3 phase'],
    ],
    features: [
      'Classic geared traction reliability',
      'Smooth, controlled acceleration',
      'Low first cost, low service cost',
      'Easily serviced drive unit',
    ],
  },
  {
    slug: 'vegam',
    name: 'Vegam',
    family: 'MRL · Machine Room Less',
    tagline: 'All the lift, none of the machine room',
    blurb:
      'The machine-room-less design frees valuable floor area by packing the drive into the shaft — modern, efficient and perfect for space-conscious projects.',
    image: '/products/vegam.jpg',
    material: 'Obsidian glass cabin, icy edge light',
    rise: 'Up to 36 m',
    specGrid: [
      ['Speed', '1–2 m/s'],
      ['Duty load', '272–680 kg'],
      ['Max rise', '36 m'],
      ['Max stops', '12'],
      ['Drive', 'Gearless traction'],
    ],
    features: [
      'No separate machine room needed',
      'Gearless permanent-magnet drive',
      'More usable floor space per storey',
      'Smoother, quieter ride profile',
    ],
  },
  {
    slug: 'diamond',
    name: 'Diamond',
    family: 'High-Rise',
    tagline: 'For buildings that reach for the sky',
    blurb:
      'High-speed, multi-stop vertical transportation for commercial towers and premium residences — engineered for heavy cycles and impeccable ride quality.',
    image: '/products/diamond.jpg',
    material: 'Walnut veneer cabin, warm brass trim',
    rise: 'High-rise',
    specGrid: [
      ['Speed', 'Up to 2 m/s'],
      ['Duty load', '680 kg +'],
      ['Stops', 'High-rise multi-stop'],
      ['Drive', 'Gearless / geared'],
    ],
    features: [
      'High-cycle commercial duty',
      'Precision group controls',
      'Hospital-grade safety railings',
      'Premium cabin finishes',
    ],
  },
  {
    slug: 'home-ride',
    name: 'Home Ride',
    family: 'Compact',
    tagline: 'A private lift for a two-or-three-storey home',
    blurb:
      'The compact home lift — small footprint, big luxury. Made for villas and residences where every square foot matters and style is non-negotiable.',
    image: '/products/home-ride.jpg',
    material: 'Glass & navy chrome, warm white light',
    rise: '2–3 stops',
    specGrid: [
      ['Speed', '0.32–1 m/s'],
      ['Duty load', '272–400 kg'],
      ['Stops', '2–3'],
      ['Power', 'Single phase'],
    ],
    features: [
      'Compact footprint for tight shafts',
      'Runs on single-phase supply',
      'Glass panorama cabin option',
      'Plug-and-play installation',
    ],
  },
]

export const solutions = [
  { label: 'Passenger lifts', blurb: 'Daily-use vertical travel with premium finish' },
  { label: 'Villa lifts', blurb: 'Private lifts crafted around your interior' },
  { label: 'Hospital lifts', blurb: 'Patient-safe beds, stretchers & smooth rides' },
  { label: 'Goods lifts', blurb: 'Heavy loads moved safely, floor after floor' },
  { label: 'Panoramic glass', blurb: 'Full-view cabs that put the architecture on show' },
  { label: 'Geared & gearless', blurb: 'Both traction families, 0.32 to 8 m/s' },
  { label: 'With / without machine room', blurb: 'Task-appropriate drive placement' },
  { label: 'Modernization', blurb: 'Bring an aging lift back to modern standards' },
]

export const services = [
  {
    slug: 'modernization',
    name: 'Modernization',
    tagline: 'An old lift made new again',
    blurb:
      'Upgrade aging cars, controllers and drives to today’s safety, comfort and efficiency standards — often in a fraction of the cost of replacement.',
    features: [
      'Controller & drive retrofit',
      'Cabin interior refresh',
      'New door operators & safety gear',
      'Energy-efficient motor replacement',
    ],
  },
  {
    slug: 'maintenance',
    name: 'AMC & Maintenance',
    tagline: '0.5% breakdown ratio — by design',
    blurb:
      'Scheduled preventive maintenance contracts keep every Rosh lift running at a 0.5% breakdown ratio. Our 66+ engineers respond fast.',
    features: [
      'Scheduled preventive visits',
      'Rapid breakdown response',
      'Genuine spare parts',
      'Annual safety certification support',
    ],
  },
  {
    slug: 'installation',
    name: 'Installation',
    tagline: 'From shaft design to smooth first ride',
    blurb:
      'Civil coordination, shaft survey, installation and commissioning — one accountable team from day one to handover.',
    features: [
      'Shaft survey & civil coordination',
      'Certified commissioning',
      'Operator & caretaker training',
      'Warranty-backed handover',
    ],
  },
  {
    slug: 'repairs',
    name: 'Repairs & Upgrades',
    tagline: 'Expert hands for any lift',
    blurb:
      'Fault diagnosis, spare replacement and performance upgrades for Rosh and third-party lifts alike.',
    features: [
      'On-site fault diagnosis',
      'OEM & compatible spares',
      'Door, drive & controller repairs',
      'Ride-quality tuning',
    ],
  },
]

export const testimonials = [
  {
    quote:
      'One of the best elevators in Telangana. Any breakdown is handled efficiently by their team — highly recommended for home lifts.',
    name: 'Lavanya',
    role: 'Homeowner',
    rating: 5,
  },
  {
    quote:
      'As an architect I specify the Rosh Elevators belt-driven brand several times a year. Professional, precise, and genuinely the best in the market.',
    name: 'Naveen Kumar',
    role: 'Civil Engineer · Architect',
    rating: 5,
  },
  {
    quote:
      'I would recommend Rosh Elevators for all commercial and residential lift requirements. Exceptionally organised and reliable end to end.',
    name: 'Shashidhar Devireddy',
    role: 'Lucid Technologies Inc.',
    rating: 5,
  },
]

export const clients = [
  { src: '/clients/Hussainclient.jpg', name: 'Hussain Residence', place: 'Villa lift' },
  { src: '/clients/hussaianclient2.jpg', name: 'Hussain · Phase II', place: 'Belt drive install' },
  { src: '/clients/hussianclient3.jpg', name: 'Hussain · Phase III', place: 'Panoramic cabin' },
  { src: '/clients/santoshclient.jpg', name: 'Santosh Residence', place: 'Home lift' },
  { src: '/clients/oldclient.jpg', name: 'Heritage install', place: 'Legacy passenger lift' },
  { src: '/clients/oldclient2.jpg', name: 'Heritage install II', place: 'Modernized car' },
]

export const galleryMedia = {
  video: '/gallery/video.mp4',
  poster: '/gallery/1.jpg',
  photos: [
    { src: '/gallery/1.jpg', caption: 'Install — machine & guide rails' },
    { src: '/gallery/2.jpg', caption: 'Shaft build in progress' },
    { src: '/gallery/3.jpg', caption: 'Cabin assembly' },
    { src: '/gallery/4.jpg', caption: 'On-site wiring & controller' },
    { src: '/gallery/5.jpg', caption: 'Finishing the landing door' },
  ],
}

export const cabinSchemes = [
  {
    id: 'glass',
    name: 'Panorama Glass',
    zone: '01 · Voyage',
    finish: 'Glass panorama',
    material: '/cabin/hero-cabin.jpg',
    mullion: '#273891',
    light: '#9db0ff',
    glow: 'rgba(73,102,212,0.22)',
  },
  {
    id: 'steel',
    name: 'Brushed Steel',
    zone: '02 · Science',
    finish: 'Brushed steel',
    material: '/cabin/brushed-steel.jpg',
    mullion: '#3a4a8f',
    light: '#7d92ea',
    glow: 'rgba(39,56,145,0.20)',
  },
  {
    id: 'walnut',
    name: 'Walnut Veneer',
    zone: '03 · Heritage',
    finish: 'Walnut veneer',
    material: '/cabin/walnut-veneer.jpg',
    mullion: '#4c5480',
    light: '#e5e9ff',
    glow: 'rgba(74,58,32,0.18)',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Glass',
    zone: '04 · Collection',
    finish: 'Obsidian glass',
    material: '/cabin/obsidian-glass.jpg',
    mullion: '#16206b',
    light: '#a6b2e8',
    glow: 'rgba(22,32,107,0.24)',
  },
  {
    id: 'brass',
    name: 'Brass & Marble',
    zone: '05 · Gallery',
    finish: 'Brass & marble',
    material: '/cabin/bento-cabin.jpg',
    mullion: '#273891',
    light: '#fff3d6',
    glow: 'rgba(200,164,93,0.18)',
  },
]

export const navLinks = [
  { to: '/', label: 'Voyage', hint: 'The home journey' },
  { to: '/products', label: 'Collection', hint: 'All lift series' },
  { to: '/about', label: 'Heritage', hint: 'Since 2004' },
  { to: '/gallery', label: 'Gallery', hint: 'Real installations' },
  { to: '/configurator', label: 'Studio', hint: 'Design your lift' },
  { to: '/contact', label: 'Contact', hint: 'Talk to us' },
]
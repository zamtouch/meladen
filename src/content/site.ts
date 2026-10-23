/** Source facts from the company profile. Unknowns stay null. */

export const company = {
  name: 'Meladen Energy',
  established: 2019,
  tagline: 'Quality Energy and Efficient Service',
  email: 'meladenenergy21@gmail.com',
  phones: ['+260 977 536 520', '+260 970 510 909', '+260 973 259 631'],
  phoneLinks: ['+260977536520', '+260970510909', '+260973259631'],
  address: [
    'First Floor, Room 103, Bwafwano House',
    'Zambia National Society Building',
    'Buteko Avenue, Ndola, Zambia',
  ],
  logisticsPartner: 'Nurani Transport',
  sector: 'Petroleum retail, trading, distribution and bulk supply',
}

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/solutions', label: 'Products & Supply' },
  { href: '/stations', label: 'Stations' },
  { href: '/responsibility', label: 'Responsibility' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

export const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Meladen' },
  { href: '/solutions', label: 'Products & Bulk Supply' },
  { href: '/stations', label: 'Fuel Stations' },
  { href: '/responsibility', label: 'Quality & Responsibility' },
  { href: '/news', label: 'News & Updates' },
  { href: '/contact', label: 'Contact' },
]

export type StationStatus = 'operational' | 'planned' | 'temporarily-unavailable'

export type StationSeed = {
  slug: string
  name: string
  province: string
  status: StationStatus
  summary: string
  openedLabel: string | null
  address: string | null
  phone: string | null
  hours: string | null
  latitude: number | null
  longitude: number | null
  productsNote: string | null
  amenities: string[]
  sortOrder: number
}

export const stations: StationSeed[] = [
  {
    slug: 'mwense',
    name: 'Mwense',
    province: 'Luapula',
    status: 'operational',
    summary:
      "Meladen's first fuel service station, opened in 2024. It marked the company's expansion from commercial fuel supply into fuel station retailing.",
    openedLabel: '2024',
    address: null,
    phone: null,
    hours: null,
    latitude: null,
    longitude: null,
    productsNote: null,
    amenities: [],
    sortOrder: 1,
  },
  {
    slug: 'musangu',
    name: 'Musangu',
    province: 'Luapula',
    status: 'operational',
    summary: 'Established as a supplementary station to serve motorists travelling between Mwense and Nchelenge.',
    openedLabel: null,
    address: null,
    phone: null,
    hours: null,
    latitude: null,
    longitude: null,
    productsNote: null,
    amenities: [],
    sortOrder: 2,
  },
  {
    slug: 'kabompo',
    name: 'Kabompo',
    province: 'North-Western',
    status: 'operational',
    summary:
      'Commissioned in December 2025, this location combines a Meladen fuel service station with additional convenience facilities, including a supermarket, bakery and restaurant.',
    openedLabel: 'December 2025',
    address: null,
    phone: null,
    hours: null,
    latitude: null,
    longitude: null,
    productsNote: null,
    amenities: ['Supermarket', 'Bakery', 'Restaurant'],
    sortOrder: 3,
  },
  {
    slug: 'chienge',
    name: 'Chienge',
    province: 'Luapula',
    status: 'operational',
    summary: "The company profile identifies Chienge as Meladen's fourth fuel service station.",
    openedLabel: null,
    address: null,
    phone: null,
    hours: null,
    latitude: null,
    longitude: null,
    productsNote: null,
    amenities: [],
    sortOrder: 4,
  },
  {
    slug: 'sesheke',
    name: 'Sesheke',
    province: 'Western',
    status: 'planned',
    summary:
      'Identified for future service station development. Construction had not commenced in the company profile. This is not an operating station.',
    openedLabel: null,
    address: null,
    phone: null,
    hours: null,
    latitude: null,
    longitude: null,
    productsNote: null,
    amenities: [],
    sortOrder: 5,
  },
  {
    slug: 'solwezi',
    name: 'Solwezi',
    province: 'North-Western',
    status: 'planned',
    summary:
      'Identified for future service station development. Construction had not commenced in the company profile. This is not an operating station.',
    openedLabel: null,
    address: null,
    phone: null,
    hours: null,
    latitude: null,
    longitude: null,
    productsNote: null,
    amenities: [],
    sortOrder: 6,
  },
]

export const timeline = [
  { sortOrder: 1, yearLabel: '2019', detail: 'Meladen Energy begins supplying low-sulphur gas oil commercially.' },
  { sortOrder: 2, yearLabel: '2024', detail: 'First company service station opens in Mwense, Luapula Province.' },
  {
    sortOrder: 3,
    yearLabel: 'Date to be confirmed',
    detail: 'Additional station opens in Musangu, serving the Mwense–Nchelenge corridor.',
  },
  {
    sortOrder: 4,
    yearLabel: 'December 2025',
    detail: 'Kabompo service station commissioned with supermarket, bakery and restaurant amenities.',
  },
  {
    sortOrder: 5,
    yearLabel: 'Date to be confirmed',
    detail: 'Chienge service station opens in Luapula Province, described as the company’s fourth.',
  },
  {
    sortOrder: 6,
    yearLabel: 'Planned',
    detail: 'Service stations identified for future development in Sesheke and Solwezi. These are not operating stations.',
  },
]

export const values = [
  { title: 'Quality', detail: 'Prioritising suitable petroleum products and quality assurance.' },
  { title: 'Customer Commitment', detail: 'Putting customer needs at the centre of service.' },
  { title: 'Reliability', detail: 'Building arrangements that support consistent supply.' },
  { title: 'Safety', detail: 'Maintaining clean and safe operating environments.' },
  { title: 'Accessibility', detail: 'Growing in communities that need better petroleum access.' },
  { title: 'Responsibility', detail: 'Building constructive relationships with people and communities.' },
]

export const homeServices = [
  {
    title: 'Retail Fuel',
    body: 'We market and distribute Unleaded Premium petrol and Low Sulphur Gasoil through our service station network.',
    action: 'Explore Stations',
    href: '/stations',
  },
  {
    title: 'Bulk Diesel',
    body: 'We provide 50ppm low-sulphur diesel for commercial requirements, with bulk supply and delivery arrangements.',
    action: 'Request a Quote',
    href: '/solutions#request-quote',
  },
  {
    title: 'Transportation & Logistics',
    body: 'Our operations are supported by sister company Nurani Transport, which provides tanker transportation for petroleum products.',
    action: 'Discover Our Supply Capabilities',
    href: '/solutions#logistics',
  },
  {
    title: 'Convenience Facilities',
    body: 'Selected service stations offer additional facilities including supermarkets, bakeries and restaurants.',
    action: 'View Station Amenities',
    href: '/stations?amenity=any',
  },
]

export const bulkCapabilities = [
  'Premium-quality 50ppm diesel.',
  'Bulk product supply and delivery.',
  'On-site product testing.',
  'Supply of established tanks and equipment, subject to scope and commercial confirmation.',
  'Countrywide bulk delivery, subject to operational confirmation for each request.',
  'Service and logistics coordination.',
]

export const quoteSteps = [
  'Describe the product and estimated volume required.',
  'Specify the delivery location and preferred delivery date.',
  'Provide your business and contact details.',
  'Meladen’s team reviews the enquiry and contacts you to discuss availability and commercial terms.',
]

export const faqs = [
  {
    q: 'What diesel specification is available for bulk supply?',
    a: 'Meladen supplies 50ppm low-sulphur diesel for bulk orders.',
  },
  {
    q: 'Can deliveries be arranged to remote locations?',
    a: 'Meladen arranges countrywide bulk delivery, including remote markets. The location, lead time and conditions are confirmed for each enquiry.',
  },
  {
    q: 'Can Meladen support recurring orders?',
    a: 'Customers can submit recurring requirements for commercial discussion. Any contractual terms must be agreed directly.',
  },
  {
    q: 'Are tanks and equipment available?',
    a: 'Meladen can supply tanks and equipment. Availability, ownership, installation and commercial arrangements are confirmed with the team.',
  },
  {
    q: 'Can I request quality testing information?',
    a: 'Meladen carries out on-site product testing. The testing method and documents for a specific order are confirmed with the team.',
  },
]

export const visitorGuidance = [
  'Follow station instructions.',
  'Observe no-smoking signage.',
  'Switch off engines during refuelling when instructed.',
  'Report hazards to site personnel.',
]

export const newsCategories = [
  { slug: 'milestones', label: 'Company Milestones', detail: 'Announcements about how the business has developed.' },
  { slug: 'stations', label: 'Station Developments', detail: 'Updates on operating stations and planned locations.' },
  { slug: 'supply', label: 'Fuel & Supply Insights', detail: 'Explanations of products and bulk supply, kept separate from company announcements.' },
  { slug: 'quality', label: 'Quality & Safety', detail: 'Information on product quality and visiting a station safely.' },
  { slug: 'community', label: 'Community News', detail: 'Community stories, published only when a factual account has been approved.' },
]

export const articleDrafts = [
  {
    title: 'Our Journey Since 2019',
    slug: 'our-journey',
    category: 'milestones',
    kind: 'insight',
    excerpt: 'How Meladen Energy moved from commercial low-sulphur gas oil supply into service station operations.',
    body: 'Meladen Energy was established in 2019 and began by supplying low-sulphur gas oil to commercial customers. The first company service station opened in Mwense, Luapula Province, in 2024. The network reported in the company profile now includes operating stations at Mwense, Musangu, Kabompo and Chienge, with Sesheke and Solwezi identified for future development.',
  },
  {
    title: 'Bringing Fuel Access Closer to Communities',
    slug: 'fuel-access',
    category: 'stations',
    kind: 'insight',
    excerpt: 'Why the company describes its station growth around places with limited petroleum access.',
    body: 'Meladen’s growth story, as set out in the company profile, prioritises petroleum access where supply infrastructure has been limited. Operating stations are reported in Mwense, Musangu, Kabompo and Chienge. Sesheke and Solwezi remain planned locations, not open stations.',
  },
  {
    title: 'Inside Meladen Kabompo',
    slug: 'kabompo-station',
    category: 'stations',
    kind: 'announcement',
    excerpt: 'The December 2025 Kabompo station is described with a supermarket, bakery and restaurant.',
    body: 'The company profile states that the Kabompo service station in North-Western Province was commissioned in December 2025. It combines a fuel station with a supermarket, bakery and restaurant. Street address, coordinates, station phone and opening hours are still to be confirmed before they are published.',
  },
  {
    title: 'Understanding 50ppm Low Sulphur Diesel',
    slug: 'understanding-50ppm',
    category: 'supply',
    kind: 'insight',
    excerpt: 'What the company profile says about the bulk diesel specification, without extra technical claims.',
    body: 'Meladen Energy’s company profile identifies premium-quality 50ppm low-sulphur diesel as part of its bulk offering, alongside Unleaded Premium and Low Sulphur Gasoil. Customers who need test methods or product documents should confirm those with the team for the specific order. This note does not add a laboratory certification.',
  },
  {
    title: 'Planning Bulk Fuel Requirements',
    slug: 'planning-bulk-fuel',
    category: 'supply',
    kind: 'insight',
    excerpt: 'What to prepare before sending a bulk fuel enquiry.',
    body: 'A bulk enquiry is more useful when it names the product, an estimated volume in litres, the delivery town or district, and a business contact. A preferred date and supply frequency can be included. They are not a confirmed delivery slot or a price. The team reviews the saved enquiry and replies using the contact details supplied.',
  },
  {
    title: 'Safety at the Fuel Station',
    slug: 'station-safety',
    category: 'quality',
    kind: 'insight',
    excerpt: 'General guidance for people visiting a Meladen station.',
    body: 'The company profile says facilities have trained first aiders available when needed, and that Meladen aims to keep sites clean, safe and secure. Visitors should follow station instructions, observe no-smoking signage, switch off engines during refuelling when instructed, and report hazards to site personnel.',
  },
  {
    title: 'How Petroleum Logistics Support Supply Continuity',
    slug: 'petroleum-logistics',
    category: 'supply',
    kind: 'insight',
    excerpt: 'How the profile describes Nurani Transport, without fleet counts or live tracking.',
    body: 'Meladen operates alongside its sister company, Nurani Transport. The profile states that Nurani Transport has invested in petroleum tankers that support delivery to Meladen stations. The arrangement is intended to contribute to supply continuity. It is not a live tracking service, and it does not publish a fleet size.',
  },
] as const

export const contactCategories = [
  { value: 'station', label: 'Fuel Station Enquiry' },
  { value: 'bulk', label: 'Bulk Fuel Supply' },
  { value: 'partnership', label: 'Partnership or Business Enquiry' },
  { value: 'general', label: 'General Enquiry' },
  { value: 'feedback', label: 'Feedback' },
]

export const quoteProducts = [
  { value: '50ppm', label: '50ppm Low Sulphur Diesel' },
  { value: 'other', label: 'Other Requirement' },
]

export const quoteFrequencies = [
  { value: 'one-off', label: 'One-off' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'discuss', label: 'To be discussed' },
]

export const publicRoutes = ['/', '/about', '/solutions', '/stations', '/responsibility', '/news', '/contact']

export const pendingLabel = 'Details being confirmed'

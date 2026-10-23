export type PublicStory = {
  slug: string
  title: string
  excerpt: string
  body: string
  category: 'milestones' | 'stations' | 'supply' | 'quality' | 'community'
  kind: 'announcement' | 'insight'
  publishedOn: string
  dateLabel: string
  image: string
  imageAlt: string
}

export const categoryVisuals: Record<string, { url: string; alt: string }> = {
  milestones: { url: '/visuals/about-nozzle.webp', alt: 'A Meladen fuel nozzle with a tanker behind it' },
  stations: { url: '/visuals/about-landscape.webp', alt: 'A Meladen fuel station set among trees' },
  supply: { url: '/visuals/close-tanker.webp', alt: 'A Meladen tanker on the road at sunset' },
  quality: { url: '/visuals/hero-forecourt.jpg', alt: 'A Meladen forecourt at dusk' },
  community: { url: '/visuals/attendant.webp', alt: 'A Meladen attendant fuelling a vehicle' },
}

/** Public stories built from confirmed company facts. */
export const publicStories: PublicStory[] = [
  {
    slug: 'stations-open-and-still-planned',
    title: 'Four stations are open. Two are still planned',
    excerpt: 'Mwense, Musangu, Kabompo and Chienge are operating. Sesheke and Solwezi are planned and are not yet open.',
    dateLabel: 'December 2025',
    publishedOn: '2025-12-01',
    category: 'stations',
    kind: 'announcement',
    image: '/visuals/about-landscape.webp',
    imageAlt: 'A Meladen fuel station set among trees',
    body: [
      'Four Meladen stations are open. Mwense, Musangu, Kabompo and Chienge sell fuel to motorists. Sesheke and Solwezi are planned locations and are not yet operating.',
      'Mwense, in Luapula Province, was the first station. It opened in 2024. Musangu, also in Luapula, serves motorists travelling between Mwense and Nchelenge.',
      'Kabompo, in North-Western Province, was commissioned in December 2025. The site combines a fuel station with a supermarket, bakery and restaurant.',
      'Chienge is the fourth operating station, in Luapula Province. Sesheke, in Western Province, and Solwezi, in North-Western Province, are identified for future development. Neither is an open station.',
    ].join('\n\n'),
  },
  {
    slug: 'from-supply-to-the-first-station',
    title: 'From commercial supply to the first station',
    excerpt: 'Meladen started in 2019 by supplying low-sulphur gas oil. The first station opened in Mwense in 2024.',
    dateLabel: '2024',
    publishedOn: '2024-01-01',
    category: 'milestones',
    kind: 'insight',
    image: '/visuals/station-day.webp',
    imageAlt: 'A Meladen station in daylight',
    body: [
      'Meladen Energy was established in 2019. The company began by supplying low-sulphur gas oil to commercial customers, before it operated any service station.',
      'The first station opened in Mwense, Luapula Province, in 2024. That opening moved the business from commercial supply into fuel retailing for motorists.',
      'The head office is in Ndola, at Bwafwano House on Buteko Avenue. From there the company coordinates retail stations and bulk supply.',
      'The same standard runs through both sides of the business: suitable product, a clear point of contact, and a station network that is still growing.',
    ].join('\n\n'),
  },
  {
    slug: '50ppm-diesel-for-bulk-supply',
    title: '50ppm diesel for bulk supply',
    excerpt: 'Stations sell Unleaded Premium and Low Sulphur Gasoil. Bulk orders are 50ppm low-sulphur diesel.',
    dateLabel: 'Supply note',
    publishedOn: '2026-01-15',
    category: 'supply',
    kind: 'insight',
    image: '/visuals/close-tanker.webp',
    imageAlt: 'A Meladen tanker on the road at sunset',
    body: [
      'Meladen supplies 50ppm low-sulphur diesel for bulk orders. Stations sell Unleaded Premium petrol and Low Sulphur Gasoil. Bulk supply is the 50ppm diesel.',
      'A bulk enquiry is reviewed for the product, the quantity, the delivery town and the timing. Sending a request does not confirm a price, a delivery slot or stock.',
      'Customers who need testing information for a specific order can ask the team. The method and the documents are confirmed for that order.',
      'Deliveries can be arranged countrywide, including remote markets. The location, lead time and conditions are agreed for each enquiry. Recurring requirements can be discussed, and any contract is agreed directly.',
    ].join('\n\n'),
  },
]

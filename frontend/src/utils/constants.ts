// Shared constants used across components

export const FOOTER_CONTACT = {
  phone: '+44 (0) 207 730 2122',
  address: {
    line1: '95-97 Pimlico Rd',
    line2: 'London SW1W 8PH',
  },
  email: 'hello@jamb.co.uk',
} as const

export const DEFAULT_CATEGORIES = [
  {_key: '1', label: 'Fireplaces', href: '#fireplaces'},
  {_key: '2', label: 'Lighting', href: '#lighting'},
  {_key: '3', label: 'Furniture', href: '#furniture'},
  {_key: '4', label: 'Journal', href: '#journal'},
] as const

export const IMAGE_PLACEHOLDERS = {
  collection: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop',
  hero: '/homepageImage1.png',
  furniture: '/furniture.png',
  story: '/jambmostprizedpossion.jpg',
  product: '/chair.png',
  generic: '/images/placeholder.jpg',
} as const

export const COLORS = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F3F0',
    tertiary: '#E3E3E3',
    quaternary: '#ECEAE7',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#9C9C9D',
    muted: '#9C9C9D',
  },
} as const

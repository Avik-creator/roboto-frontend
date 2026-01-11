import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PageBuilder } from '@/components/page-builder'
import FireplaceImage from '@/../public/fireplaceimage.png'
import LightingImage from '@/../public/lighting.png'
import MarbleJambImage from '@/../public/marblejamb.jpg'
import LightSmallJambImage from '@/../public/lightsmalljamb.jpg'
import MirrorImage from '@/../public/mirror.png'
import FurnitureImage from '@/../public/furniture.png'
import TableImage from '@/../public/table.png'
import ChairImage from '@/../public/chair.png'
import Chair2Image from '@/../public/chair2.png'
import SofaImage from '@/../public/sofa.png'

// Demo data to render the page builder with placeholder content
// In production, this would come from Sanity
const demoPageContent = [
  {
    _key: 'hero-1',
    _type: 'heroSection' as const,
    image: {
      alt: 'Elegant fireplace mantelpiece with antique decorations',
    },
  },
  {
    _key: 'nav-1',
    _type: 'categoryNavigation' as const,
    categories: [
      { _key: 'cat-1', label: 'Fireplaces', href: '#fireplaces' },
      { _key: 'cat-2', label: 'Lighting', href: '#lighting' },
      { _key: 'cat-3', label: 'Furniture', href: '#furniture' },
      { _key: 'cat-4', label: 'Journal', href: '#journal' },
    ],
  },
  {
    _key: 'feature-fireplaces',
    _type: 'featureSection' as const,
    title: 'Fireplaces',
    description:
      'Lorem ipsum dolor sit amet, eu labore vulputate at labore in dolore consequatur adipiscing erat, aute do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sunt labore et dolore magna aliqua vel ipsum.',
    refineLabel: 'Explore our Fireplaces',
    ctaHref: '/fireplaces',
    image: FireplaceImage,
    imagePosition: 'right' as const,
    secondaryButton: {
      label: 'Sell an Antique Chimneypiece',
      href: '/sell-antiques',
    },
  },
  {
    _key: 'feature-lighting',
    _type: 'featureSection' as const,
    title: 'Lighting',
    description:
      'Lorem ipsum dolor sit amet, eu labore vulputate at labore in dolore consequatur adipiscing erat, aute do eiusmod tempor incididunt ut labore. Eu ante cum alia tum rem, incididunt ut labore labore incididunt.',
    refineLabel: 'Explore our Lighting',
    ctaHref: '/lighting',
    image: LightingImage,
    imagePosition: 'left' as const,
  },
  {
    _key: 'grid-chimneypieces',
    _type: 'productGrid' as const,
    sectionTitle: 'Our latest chimneypieces',
    columns: 4 as const,
    products: [
      {
        _key: 'p1',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: MarbleJambImage,
      },
      {
        _key: 'p2',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: MarbleJambImage,
      },
      {
        _key: 'p3',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: MarbleJambImage,
      },
      {
        _key: 'p4',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: MarbleJambImage,
      },
    ],
  },
  {
    _key: 'grid-lighting',
    _type: 'productGrid' as const,
    sectionTitle: 'Our latest lighting',
    columns: 5 as const,
    variant: 'mixed-aspect' as const,
    products: [
      {
        _key: 'l1',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: LightSmallJambImage,
      },
      {
        _key: 'l2',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: LightSmallJambImage,
      },
      {
        _key: 'l3',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: LightSmallJambImage,
      },
      {
        _key: 'l4',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: LightSmallJambImage,
      },
      {
        _key: 'l5',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'portrait' as const,
        image: LightSmallJambImage,
      },
    ],
  },
  {
    _key: 'full-furniture',
    _type: 'fullWidthFeature' as const,
    title: 'Furniture',
    description:
      'Lorem ipsum dolor sit amet, eu labore vulputate at labore in dolore consequatur adipiscing erat, aute do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ctaLabel: 'Explore our Furniture',
    ctaHref: '/furniture',
    image: FurnitureImage,
    contentPosition: 'left' as const,
  },
  {
    _key: 'grid-furniture',
    _type: 'productGrid' as const,
    sectionTitle: 'Our latest furniture',
    columns: 5 as const,
    products: [
      {
        _key: 'f1',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'square' as const,
        image: SofaImage
      },
      {
        _key: 'f2',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'square' as const,
        image: TableImage,
      },
      {
        _key: 'f3',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'square' as const,
        image: MirrorImage,
      },
      {
        _key: 'f4',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'square' as const,
        image: ChairImage,
      },
      {
        _key: 'f5',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        aspectRatio: 'square' as const,
        image: Chair2Image,
      },
    ],
  },
  {
    _key: 'grand-collection',
    _type: 'grandCollection' as const,
    eyebrow: 'ANTIQUES',
    title: 'The Grand Collection',
    description:
      'Lorem ipsum dolor sit amet, eu labore vulputate at labore in dolore consequatur adipiscing erat, aute do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ante labore et dolore magna aliqua vel ipsum.',
    ctaLabel: 'Explore Collection',
    ctaHref: '/collection',
  },
  {
    _key: 'stories',
    _type: 'storiesGrid' as const,
    sectionTitle: 'See more of our latest stories',
    stories: [
      { _key: 's1', title: 'Lorem Ipsum', subtitle: 'Subtitle' },
      { _key: 's2', title: 'Lorem Ipsum', subtitle: 'Subtitle' },
      { _key: 's3', title: 'Lorem Ipsum', subtitle: 'Subtitle' },
      { _key: 's4', title: 'Lorem Ipsum', subtitle: 'Subtitle' },
      { _key: 's5', title: 'Lorem Ipsum', subtitle: 'Subtitle' },
    ],
  },
  {
    _key: 'newsletter',
    _type: 'newsletterSection' as const,
    title: 'Subscribe to the Jamb Journal',
    description:
      'Lorem ipsum dolor sit amet, eu labore vulputate at labore in dolore consequatur adipiscing erat, aute do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sunt labore et dolore magna aliqua vel ipsum.',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="pt-14 md:pt-16">
        <PageBuilder content={demoPageContent} />
      </div>
      <Footer />
    </>
  )
}

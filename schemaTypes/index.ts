import {
  heroSection,
  categoryNavigation,
  featureSection,
  productGrid,
  fullWidthFeature,
  grandCollection,
  storiesGrid,
  newsletterSection,
} from './blocks'
import { pageBuilder } from './page-builder'
import { homePage } from './home-page'
import { settings } from './settings'

export const schemaTypes = [
  // Block types (objects)
  heroSection,
  categoryNavigation,
  featureSection,
  productGrid,
  fullWidthFeature,
  grandCollection,
  storiesGrid,
  newsletterSection,
  // Page builder array type
  pageBuilder,
  // Document types
  homePage,
  settings,
]

import { groq } from 'next-sanity'

// Homepage query
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    _id,
    title,
    pageBuilder[] {
      _key,
      _type,
      ...,
      _type == "heroSection" => {
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions { width, height }
            }
          },
          alt,
          hotspot,
          crop
        }
      },
      _type == "featureSection" => {
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions { width, height }
            }
          },
          alt,
          hotspot,
          crop
        }
      },
      _type == "productGrid" => {
        products[] {
          _key,
          title,
          subtitle,
          image {
            asset->{
              _id,
              url,
              metadata {
                lqip,
                dimensions { width, height }
              }
            },
            alt,
            hotspot,
            crop
          },
          aspectRatio
        }
      },
      _type == "fullWidthFeature" => {
        backgroundImage {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions { width, height }
            }
          },
          alt,
          hotspot,
          crop
        }
      },
      _type == "grandCollection" => {
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions { width, height }
            }
          },
          alt,
          hotspot,
          crop
        }
      },
      _type == "storiesGrid" => {
        stories[] {
          _key,
          title,
          subtitle,
          image {
            asset->{
              _id,
              url,
              metadata {
                lqip,
                dimensions { width, height }
              }
            },
            alt,
            hotspot,
            crop
          }
        }
      }
    }
  }
`

// Settings query for header/footer
export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    _id,
    siteName,
    logo {
      asset->{
        _id,
        url
      },
      alt
    },
    mainNavigation[] {
      _key,
      label,
      href
    },
    footerNavigation[] {
      _key,
      title,
      links[] {
        _key,
        label,
        href
      }
    },
    newsletterTitle,
    newsletterDescription
  }
`

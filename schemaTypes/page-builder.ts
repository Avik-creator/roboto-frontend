import { defineType, defineArrayMember } from 'sanity'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'heroSection' }),
    defineArrayMember({ type: 'categoryNavigation' }),
    defineArrayMember({ type: 'featureSection' }),
    defineArrayMember({ type: 'productGrid' }),
    defineArrayMember({ type: 'fullWidthFeature' }),
    defineArrayMember({ type: 'grandCollection' }),
    defineArrayMember({ type: 'storiesGrid' }),
    defineArrayMember({ type: 'newsletterSection' }),
  ],
  options: {
    insertMenu: {
      views: [
        { name: 'grid', previewImageUrl: (type) => `/block-previews/${type}.png` },
        { name: 'list' },
      ],
    },
  },
})
